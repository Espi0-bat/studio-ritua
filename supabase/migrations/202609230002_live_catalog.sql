begin;
create table public.ritua_admin_emails (
  email text primary key check (email = lower(trim(email))),
  temporary boolean not null default false
);
alter table public.ritua_admin_emails enable row level security;
revoke all on public.ritua_admin_emails from public, anon, authenticated;
create or replace function public.ritua_is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.ritua_admins where user_id = auth.uid())
    or exists (select 1 from auth.users u join public.ritua_admin_emails a on a.email = lower(u.email)
      where u.id = auth.uid() and u.email_confirmed_at is not null);
$$;
alter table public.ritua_products add column revision integer not null default 0;
create function public.ritua_product_revision() returns trigger
language plpgsql set search_path = '' as $$
begin new.revision := old.revision + 1; return new; end;
$$;
create trigger ritua_product_revision before update on public.ritua_products for each row execute function public.ritua_product_revision();
revoke all on function public.ritua_product_revision() from public, anon, authenticated;
-- Todas as gravações passam pelas RPCs: metadados, fotos e estoque inicial são atômicos.
revoke insert, update on public.ritua_products from authenticated;
revoke insert (name, category, description, price_cents, published), update (name, category, description, price_cents, published) on public.ritua_products from authenticated;
revoke insert, update, delete on public.ritua_product_photos from authenticated;
create table public.ritua_save_requests (
  id uuid primary key,
  payload jsonb not null,
  product_id uuid not null references public.ritua_products(id)
);
alter table public.ritua_save_requests enable row level security;
revoke all on public.ritua_save_requests from public, anon, authenticated;

create function public.ritua_save_product(payload jsonb, operation_id uuid)
returns public.ritua_products language plpgsql security definer set search_path = '' as $$
declare
  p public.ritua_products;
  previous public.ritua_save_requests;
  product_id uuid := coalesce((payload->>'id')::uuid, operation_id);
  quantity integer := coalesce((payload->>'quantity')::integer, 0);
  photo text;
  pos integer := 0;
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
    update public.ritua_products set name=trim(payload->>'name'), category=payload->>'category', description=coalesce(payload->>'description',''),
      price_cents=(payload->>'priceCents')::integer, published=coalesce((payload->>'published')::boolean,false)
      where id = product_id returning * into p;
  else
    if quantity < 0 or quantity > 9999 then raise exception 'Quantidade inválida'; end if;
    insert into public.ritua_products(id,name,category,description,price_cents,published)
      values (product_id,trim(payload->>'name'),payload->>'category',coalesce(payload->>'description',''),(payload->>'priceCents')::integer,coalesce((payload->>'published')::boolean,false)) returning * into p;
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
-- Bloqueia exclusão de arquivos ainda usados por uma peça.
drop policy "Admins manage product files" on storage.objects;
create policy "Admins read product files" on storage.objects for select to authenticated
  using (bucket_id='ritua-products' and (select public.ritua_is_admin()));
create policy "Admins upload product files" on storage.objects for insert to authenticated
  with check (bucket_id='ritua-products' and (select public.ritua_is_admin()));
create policy "Admins delete unused product files" on storage.objects for delete to authenticated
  using (bucket_id='ritua-products' and (select public.ritua_is_admin()) and not exists (select 1 from public.ritua_product_photos p where p.object_path=storage.objects.name));
commit;
