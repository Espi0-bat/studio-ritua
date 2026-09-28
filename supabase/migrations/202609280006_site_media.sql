begin;
-- A Duda pediu para trocar sozinha a foto da abertura e a do bloco "Feitas à mão",
-- com as legendas. Bucket público: são fotos de vitrine, sem rascunho e sem URL assinada,
-- para o site abrir a imagem sem depender de sessão.
insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
  values ('ritua-site', 'ritua-site', true, 5242880, array['image/jpeg','image/png','image/webp']);

create table public.ritua_site_media (
  slot text primary key check (slot in ('abertura', 'studio')),
  object_path text not null,
  caption text not null default '' check (length(caption) <= 120),
  alt text not null default '' check (length(alt) <= 300),
  width integer check (width between 1 and 10000),
  height integer check (height between 1 and 10000),
  updated_at timestamptz not null default now()
);
alter table public.ritua_site_media enable row level security;
revoke all on public.ritua_site_media from anon, authenticated;
grant select on public.ritua_site_media to anon, authenticated;
create policy "Public site media" on public.ritua_site_media for select to anon, authenticated using (true);

-- A gravação passa pela função: confere o administrador e recusa caminho de foto
-- que não tenha chegado ao storage, como já acontece com as fotos das peças.
create function public.ritua_save_site_media(p_slot text, p_path text, p_caption text, p_alt text,
  p_width integer default null, p_height integer default null)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not public.ritua_is_admin() then raise exception 'Acesso não autorizado'; end if;
  if p_slot is null or p_slot not in ('abertura', 'studio') then raise exception 'Espaço inválido'; end if;
  if p_path is null or p_path not like (p_slot || '/%')
    or not exists (select 1 from storage.objects o where o.bucket_id = 'ritua-site' and o.name = p_path)
    then raise exception 'Foto inválida ou envio incompleto'; end if;
  insert into public.ritua_site_media as m (slot, object_path, caption, alt, width, height)
    values (p_slot, p_path, coalesce(p_caption, ''), coalesce(p_alt, ''), p_width, p_height)
  on conflict (slot) do update set object_path = excluded.object_path, caption = excluded.caption,
    alt = excluded.alt, width = coalesce(excluded.width, m.width), height = coalesce(excluded.height, m.height),
    updated_at = now();
end;
$$;
revoke all on function public.ritua_save_site_media(text, text, text, text, integer, integer) from public, anon;
grant execute on function public.ritua_save_site_media(text, text, text, text, integer, integer) to authenticated;

create policy "Admins read site files" on storage.objects for select to authenticated
  using (bucket_id = 'ritua-site' and (select public.ritua_is_admin()));
create policy "Admins upload site files" on storage.objects for insert to authenticated
  with check (bucket_id = 'ritua-site' and (select public.ritua_is_admin()));
-- A foto substituída só pode ser apagada depois que a tabela deixa de apontar para ela.
create policy "Admins delete unused site files" on storage.objects for delete to authenticated
  using (bucket_id = 'ritua-site' and (select public.ritua_is_admin())
    and not exists (select 1 from public.ritua_site_media m where m.object_path = storage.objects.name));
commit;
