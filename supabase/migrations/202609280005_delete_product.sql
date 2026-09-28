begin;
-- Exclusão definitiva pedida pela Duda: a peça sai do painel e do site junto com as
-- fotos, o histórico de estoque e os registros de gravação. Não há restauração.
-- Os arquivos no storage são apagados pelo painel depois desta função, quando as
-- linhas de ritua_product_photos já não existem (policy "Admins delete unused product files").
create function public.ritua_delete_product(product_id uuid, expected_revision integer default null)
returns void language plpgsql security definer set search_path = '' as $$
declare
  p public.ritua_products;
begin
  if not public.ritua_is_admin() then raise exception 'Acesso não autorizado'; end if;
  if product_id is null then raise exception 'Identificador obrigatório'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(product_id::text, 0));
  select * into p from public.ritua_products t where t.id = product_id for update;
  -- Repetir o pedido depois da exclusão não é erro: o resultado já é o esperado.
  if not found then return; end if;
  if expected_revision is not null and p.revision is distinct from expected_revision
    then raise exception 'Esta peça mudou. Feche a janela e confira os dados atualizados.'; end if;
  delete from public.ritua_product_photos ph where ph.product_id = p.id;
  delete from public.ritua_stock_events e where e.product_id = p.id;
  delete from public.ritua_save_requests r where r.product_id = p.id;
  delete from public.ritua_products t where t.id = p.id;
end;
$$;
revoke all on function public.ritua_delete_product(uuid, integer) from public, anon;
grant execute on function public.ritua_delete_product(uuid, integer) to authenticated;
commit;
