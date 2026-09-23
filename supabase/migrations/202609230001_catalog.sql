-- Preparação: aplicar somente em um projeto Supabase de desenvolvimento.
-- A conta inicial autorizada é cadastrada por um administrador via SQL, nunca pelo cliente.
begin;
create table public.ritua_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.ritua_admins enable row level security;
revoke all on public.ritua_admins from anon, authenticated;

create function public.ritua_is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.ritua_admins where user_id = auth.uid());
$$;
revoke all on function public.ritua_is_admin() from public, anon;
grant execute on function public.ritua_is_admin() to authenticated;

create table public.ritua_products (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 1 and 100),
  category text not null check (category in ('Cuia', 'Case', 'Piteira')),
  description text not null default '' check (length(description) <= 2000),
  price_cents integer not null default 0 check (price_cents >= 0),
  published boolean not null default false,
  stock integer not null default 0 check (stock between 0 and 9999),
  reserved integer not null default 0 check (reserved >= 0 and reserved <= stock),
  created_at timestamptz not null default now()
);
alter table public.ritua_products enable row level security;
revoke all on public.ritua_products from anon, authenticated;
grant select on public.ritua_products to anon, authenticated;
grant insert (name, category, description, price_cents, published),
  update (name, category, description, price_cents, published)
  on public.ritua_products to authenticated;
create policy "Published catalog" on public.ritua_products for select to anon, authenticated using (published);
create policy "Admins read drafts" on public.ritua_products for select to authenticated using ((select public.ritua_is_admin()));
create policy "Admins create products" on public.ritua_products for insert to authenticated with check ((select public.ritua_is_admin()));
create policy "Admins edit products" on public.ritua_products for update to authenticated using ((select public.ritua_is_admin())) with check ((select public.ritua_is_admin()));

create table public.ritua_stock_events (
  sequence bigint generated always as identity unique,
  id uuid primary key,
  product_id uuid not null references public.ritua_products(id),
  action text not null check (action in ('reserve','release','sell','sellReserved','restock','remove','undo')),
  quantity integer not null check (quantity between 1 and 9999),
  stock_delta integer not null,
  reserved_delta integer not null,
  reverses uuid unique references public.ritua_stock_events(id),
  actor uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);
create index on public.ritua_stock_events(product_id, sequence desc);
alter table public.ritua_stock_events enable row level security;
revoke all on public.ritua_stock_events from anon, authenticated;
grant select on public.ritua_stock_events to authenticated;
create policy "Admins read history" on public.ritua_stock_events for select to authenticated using ((select public.ritua_is_admin()));

-- Todas as baixas passam por esta função: trava a peça, valida saldo e registra
-- o histórico na mesma transação. O cliente reutiliza operation_id ao repetir uma requisição.
create function public.ritua_move_stock(
  product_id uuid, operation_id uuid, action text, quantity integer, undo_event_id uuid default null
) returns public.ritua_products
language plpgsql security definer set search_path = '' as $$
declare
  p public.ritua_products;
  previous public.ritua_stock_events;
  existing public.ritua_stock_events;
  ds integer;
  dr integer;
begin
  if not public.ritua_is_admin() then raise exception 'Acesso não autorizado'; end if;
  if operation_id is null then raise exception 'Identificador obrigatório'; end if;
  select * into p from public.ritua_products where id = product_id for update;
  if not found then raise exception 'Peça não encontrada'; end if;
  select * into existing from public.ritua_stock_events where id = operation_id;
  if found then
    if existing.product_id <> product_id or existing.action <> action or existing.quantity <> quantity
      or existing.reverses is distinct from undo_event_id then raise exception 'Identificador já utilizado'; end if;
    return p;
  end if;
  if quantity is null or quantity < 1 or quantity > 9999 then raise exception 'Quantidade inválida'; end if;
  if action = 'undo' then
    select * into previous from public.ritua_stock_events e where e.product_id = p.id order by sequence desc limit 1;
    if previous.id is null or previous.id is distinct from undo_event_id or previous.action = 'undo'
      or quantity <> previous.quantity then raise exception 'Só a última movimentação pode ser desfeita'; end if;
    ds := -previous.stock_delta; dr := -previous.reserved_delta;
  else
    if undo_event_id is not null then raise exception 'Referência de correção inválida'; end if;
    case action
      when 'reserve' then ds := 0; dr := quantity;
      when 'release' then ds := 0; dr := -quantity;
      when 'sell' then ds := -quantity; dr := 0;
      when 'sellReserved' then ds := -quantity; dr := -quantity;
      when 'restock' then ds := quantity; dr := 0;
      when 'remove' then ds := -quantity; dr := 0;
      else raise exception 'Ação inválida';
    end case;
  end if;
  if p.stock + ds < 0 or p.stock + ds > 9999 or p.reserved + dr < 0 or p.reserved + dr > p.stock + ds
    then raise exception 'Quantidade indisponível'; end if;
  update public.ritua_products set stock = stock + ds, reserved = reserved + dr where id = p.id returning * into p;
  insert into public.ritua_stock_events(id, product_id, action, quantity, stock_delta, reserved_delta, reverses, actor)
    values (operation_id, p.id, action, quantity, ds, dr, undo_event_id, auth.uid());
  return p;
end;
$$;
revoke all on function public.ritua_move_stock(uuid, uuid, text, integer, uuid) from public, anon;
grant execute on function public.ritua_move_stock(uuid, uuid, text, integer, uuid) to authenticated;

-- Bucket privado: fotos de rascunhos não têm URLs públicas permanentes.
insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
  values ('ritua-products', 'ritua-products', false, 5242880, array['image/jpeg','image/png','image/webp']);
create table public.ritua_product_photos (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.ritua_products(id),
  object_path text not null unique,
  position integer not null check (position between 0 and 3),
  unique(product_id, position)
);
alter table public.ritua_product_photos enable row level security;
revoke all on public.ritua_product_photos from anon, authenticated;
grant select on public.ritua_product_photos to anon;
grant select, insert, update, delete on public.ritua_product_photos to authenticated;
create policy "Public photo metadata" on public.ritua_product_photos for select to anon, authenticated
  using (exists (select 1 from public.ritua_products p where p.id = product_id and p.published));
create policy "Admins manage photo metadata" on public.ritua_product_photos for all to authenticated
  using ((select public.ritua_is_admin())) with check ((select public.ritua_is_admin()));
create policy "Admins manage product files" on storage.objects for all to authenticated
  using (bucket_id = 'ritua-products' and (select public.ritua_is_admin()))
  with check (bucket_id = 'ritua-products' and (select public.ritua_is_admin()));
create policy "Read published product files" on storage.objects for select to anon, authenticated
  using (bucket_id = 'ritua-products' and exists (
    select 1 from public.ritua_product_photos photo
    join public.ritua_products p on p.id = photo.product_id
    where photo.object_path = storage.objects.name and p.published
  ));
commit;
