begin;
alter table public.ritua_products
  add column line text check (line in ('Premium','Classica')),
  add constraint ritua_piteira_line_details check (category='Piteira' or line is null);

create or replace function public.ritua_save_product(payload jsonb, operation_id uuid)
returns public.ritua_products language plpgsql security definer set search_path = '' as $$
declare
  p public.ritua_products;
  previous public.ritua_save_requests;
  product_id uuid := coalesce((payload->>'id')::uuid, operation_id);
  quantity integer := coalesce((payload->>'quantity')::integer, 0);
  photo text;
  pos integer := 0;
  v_unique boolean;
  v_length numeric;
  v_diameter numeric;
  v_unit text;
  v_model text;
  v_line text;
  v_compatible text;
  v_lighter boolean;
begin
  if not public.ritua_is_admin() then raise exception 'Acesso não autorizado'; end if;
  if operation_id is null or product_id is null then raise exception 'Identificador obrigatório'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(product_id::text, 0));
  select * into previous from public.ritua_save_requests where id = operation_id;
  if found then
    if previous.payload <> payload then raise exception 'Requisição já utilizada'; end if;
    select * into p from public.ritua_products where id = previous.product_id; return p;
  end if;
  if jsonb_typeof(payload->'photos') is distinct from 'array' or jsonb_array_length(payload->'photos') > 4 then raise exception 'Use até quatro fotos'; end if;
  if payload->>'id' is not null then
    select * into p from public.ritua_products where id = product_id for update;
    if not found then raise exception 'Peça não encontrada'; end if;
    if p.revision is distinct from (payload->>'revision')::integer then raise exception 'Esta peça mudou. Feche a janela e confira os dados atualizados.'; end if;
  end if;
  if payload->>'category' is null or payload->>'category' not in ('Case','Piteira','Cuia') then raise exception 'Escolha o tipo da peça'; end if;
  -- Chaves omitidas por clientes antigos preservam os campos; null explícito limpa.
  v_unique := case when payload ? 'isUnique' then (payload->>'isUnique')::boolean else p.is_unique end;
  if payload->>'category' = 'Piteira' then
    v_length := case when payload ? 'lengthCm' then nullif(trim(payload->>'lengthCm'),'')::numeric else p.length_cm end;
    v_diameter := case when payload ? 'diameter' then nullif(trim(payload->>'diameter'),'')::numeric else p.diameter end;
    v_unit := case when payload ? 'diameterUnit' then nullif(trim(payload->>'diameterUnit'),'') else p.diameter_unit end;
    v_model := case when payload ? 'model' then nullif(trim(payload->>'model'),'') else p.model end;
    v_line := case when payload ? 'line' then nullif(trim(payload->>'line'),'') else p.line end;
  elsif payload->>'category' = 'Case' then
    v_compatible := case when payload ? 'compatibleWith' then nullif(trim(payload->>'compatibleWith'),'') else p.compatible_with end;
    v_lighter := case when payload ? 'includesLighter' then (payload->>'includesLighter')::boolean else p.includes_lighter end;
  end if;
  if v_length is not null and not (v_length > 0 and v_length <= 10000) then raise exception 'Comprimento inválido'; end if;
  if v_diameter is not null and not (v_diameter > 0 and v_diameter <= 10000) then raise exception 'Diâmetro inválido'; end if;
  if (v_diameter is null) <> (v_unit is null) or (v_unit is not null and v_unit not in ('cm','mm')) then raise exception 'Informe o diâmetro e sua unidade (cm ou mm)'; end if;
  if length(v_model) > 120 or length(v_compatible) > 200 then raise exception 'Texto da ficha técnica muito longo'; end if;
  if v_line is not null and v_line not in ('Premium','Classica') then raise exception 'Selecione a linha da piteira: Premium ou Clássica'; end if;
  if payload->>'id' is not null then
    update public.ritua_products set name=trim(payload->>'name'), category=payload->>'category', description=coalesce(payload->>'description',''),
      price_cents=(payload->>'priceCents')::integer, published=coalesce((payload->>'published')::boolean,false),
      is_unique=v_unique, length_cm=v_length, diameter=v_diameter, diameter_unit=v_unit,
      model=v_model, line=v_line, compatible_with=v_compatible, includes_lighter=v_lighter
      where id = product_id returning * into p;
  else
    if quantity < 0 or quantity > 9999 then raise exception 'Quantidade inválida'; end if;
    insert into public.ritua_products(id,name,category,description,price_cents,published,is_unique,length_cm,diameter,diameter_unit,model,line,compatible_with,includes_lighter)
      values (product_id,trim(payload->>'name'),payload->>'category',coalesce(payload->>'description',''),(payload->>'priceCents')::integer,coalesce((payload->>'published')::boolean,false),v_unique,v_length,v_diameter,v_unit,v_model,v_line,v_compatible,v_lighter) returning * into p;
    if quantity > 0 then select * into p from public.ritua_move_stock(product_id, operation_id, 'restock', quantity); end if;
  end if;
  delete from public.ritua_product_photos pp where pp.product_id = p.id;
  for photo in select jsonb_array_elements_text(payload->'photos') loop
    if photo not like (p.id::text || '/%') or not exists (select 1 from storage.objects o where o.bucket_id='ritua-products' and o.name=photo)
      then raise exception 'Foto inválida ou envio incompleto'; end if;
    insert into public.ritua_product_photos(product_id,object_path,position) values(p.id,photo,pos); pos := pos + 1;
  end loop;
  insert into public.ritua_save_requests(id,payload,product_id) values(operation_id,payload,p.id);
  return p;
end;
$$;
revoke all on function public.ritua_save_product(jsonb, uuid) from public, anon;
grant execute on function public.ritua_save_product(jsonb, uuid) to authenticated;

commit;
