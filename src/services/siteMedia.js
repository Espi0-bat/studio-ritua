import { supabase } from './supabase'
import { siteMediaError } from './siteMediaErrors.js'
import { siteMediaSlots } from '../data/siteMedia'

const bucket = 'ritua-site'
// Hero e About pedem a mesma tabela: a promessa é reaproveitada para não fazer duas consultas.
let pending = null

const publicUrl = path => supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl

const toMedia = row => ({
  path: row.object_path, src: publicUrl(row.object_path),
  caption: row.caption, alt: row.alt, width: row.width, height: row.height,
})

export async function loadSiteMedia(refresh = false) {
  if (!supabase) return {}
  if (!pending || refresh) {
    pending = supabase.from('ritua_site_media').select('*').then(({ data, error }) => {
      if (error) { pending = null; throw new Error('Não foi possível carregar as imagens do site.') }
      return Object.fromEntries(data.map(row => [row.slot, toMedia(row)]))
    })
  }
  return pending
}

// photo: { dataUrl, width, height } vindo de prepareSitePhoto, ou null para mudar só os textos.
export async function saveSiteMedia(slot, { photo = null, current = null, caption = '', alt = '' }) {
  if (!siteMediaSlots.includes(slot)) throw new Error('Espaço inválido.')
  let path = current?.path || null
  if (photo) {
    const blob = await (await fetch(photo.dataUrl)).blob()
    if (blob.size > 5 * 1024 * 1024) throw new Error('A foto ficou grande demais depois do preparo. Tente outra imagem.')
    path = `${slot}/${crypto.randomUUID()}.jpg`
    const { error } = await supabase.storage.from(bucket).upload(path, blob, { upsert: false, contentType: blob.type })
    if (error) throw new Error(siteMediaError(error, 'Não foi possível enviar a foto. Confira a conexão e tente novamente.'))
  }
  if (!path) throw new Error('Escolha uma foto para este espaço.')
  const { error } = await supabase.rpc('ritua_save_site_media', {
    p_slot: slot, p_path: path, p_caption: caption.trim(), p_alt: alt.trim(),
    p_width: photo?.width ?? current?.width ?? null, p_height: photo?.height ?? current?.height ?? null,
  })
  if (error) throw new Error(siteMediaError(error, 'Não foi possível salvar esta imagem. Tente novamente.'))
  // A foto antiga só sai depois que a tabela deixa de apontar para ela.
  if (photo && current?.path && current.path !== path) await supabase.storage.from(bucket).remove([current.path])
  return loadSiteMedia(true)
}
