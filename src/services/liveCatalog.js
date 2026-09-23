import { normalizeDetails } from './productDetails.js'
import { supabase } from './supabase'
import { categories } from './inventory'
const bucket = 'ritua-products'
function fail(error) {
  if (!error) return
  if (error.code === 'P0001') throw new Error(error.message)
  if (error.code === '42501' || error.status === 403) throw new Error('Seu acesso não permite esta ação. Entre novamente ou fale com o administrador.')
  throw new Error('Não foi possível concluir a operação. Confira a conexão e tente novamente.')
}
async function allRows(table, order, publicOnly = false) {
  const all = []
  for (let offset = 0; ; offset += 200) {
    let query = supabase.from(table).select('*').order(order, { ascending: table === 'ritua_product_photos' }).range(offset, offset + 199)
    if (publicOnly && table === 'ritua_products') query = query.eq('published', true)
    const { data, error } = await query; fail(error); all.push(...data)
    if (data.length < 200) return all
  }
}
async function load(publicOnly = false) {
  const [rows, photos, events] = await Promise.all([
    allRows('ritua_products', 'created_at', publicOnly), allRows('ritua_product_photos', 'position'),
    publicOnly ? [] : allRows('ritua_stock_events', 'sequence'),
  ])
  const paths = photos.map(p => p.object_path)
  let signed = []
  if (paths.length) {
    const { data, error } = await supabase.storage.from(bucket).createSignedUrls(paths, 900)
    fail(error); if (data.some(p => p.error)) throw new Error('Não foi possível carregar algumas fotos. Tente novamente.'); signed = data
  }
  const urls = Object.fromEntries(signed.map(p => [p.path, p.signedUrl]))
  return { products: rows.map(p => {
    const productPhotos = photos.filter(photo => photo.product_id === p.id)
    return { id: p.id, name: p.name, category: p.category, description: p.description, priceCents: p.price_cents,
      isUnique: p.is_unique, lengthCm: p.length_cm, diameter: p.diameter, diameterUnit: p.diameter_unit,
      model: p.model, compatibleWith: p.compatible_with, includesLighter: p.includes_lighter,
      published: p.published, stock: p.stock, reserved: p.reserved, revision: p.revision,
      photos: productPhotos.map(photo => urls[photo.object_path]),
      photoMap: Object.fromEntries(productPhotos.map(photo => [urls[photo.object_path], photo.object_path])) }
  }), events: events.map(e => ({ id: e.id, productId: e.product_id, action: e.action, quantity: e.quantity,
    stockDelta: e.stock_delta, reservedDelta: e.reserved_delta, reverses: e.reverses, at: e.created_at })) }
}
export const liveCatalog = {
  load: () => load(false),
  publicLoad: () => load(true),
  async save(input, revision, operationId) {
    const id = input.id || operationId
    const name = String(input.name || '').trim()
    if (!name || name.length > 100 || !categories.includes(input.category)) throw new Error('Confira o nome e o tipo da peça.')
    if (!Number.isSafeInteger(input.priceCents) || input.priceCents < 0 || input.priceCents > 2147483647) throw new Error('Informe um preço válido.')
    if (input.photos.length > 4) throw new Error('Escolha até quatro fotos.')
    if (!input.id && (!Number.isInteger(Number(input.quantity)) || Number(input.quantity) < 0 || Number(input.quantity) > 9999)) throw new Error('Confira a quantidade inicial.')
    const details = normalizeDetails(input)
    const paths = []
    for (const [index, photo] of input.photos.entries()) {
      const existing = input.photoMap?.[photo]
      if (existing?.startsWith(`${id}/`)) { paths.push(existing); continue }
      const response = await fetch(photo)
      if (!response.ok) throw new Error('Não foi possível ler uma das fotos. Reabra o cadastro e tente novamente.')
      const blob = await response.blob()
      const extension = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[blob.type]
      if (!extension || blob.size > 5 * 1024 * 1024) throw new Error('Use fotos JPG, PNG ou WebP de até 5 MB após a preparação.')
      const path = `${id}/${operationId}-${index}.${extension}`
      const { error } = await supabase.storage.from(bucket).upload(path, blob, { upsert: false, contentType: blob.type })
      if (error && !['409', 'Duplicate'].includes(String(error.statusCode || error.error))) fail(error)
      paths.push(path)
    }
    const payload = { ...details, id: input.id || null, name, category: input.category, description: input.description,
      priceCents: input.priceCents, published: input.published, photos: paths, revision: revision ?? null, quantity: input.id ? 0 : Number(input.quantity) }
    const { error } = await supabase.rpc('ritua_save_product', { payload, operation_id: operationId }); fail(error)
    const removed = Object.values(input.photoMap || {}).filter(path => path.startsWith(`${id}/`) && !paths.includes(path))
    if (removed.length) await supabase.storage.from(bucket).remove(removed)
    return load()
  },
  async move(id, revision, action, quantity, operationId) {
    const { error } = await supabase.rpc('ritua_move_stock', { product_id: id, operation_id: operationId, action, quantity }); fail(error)
    return load()
  },
  async undo(id, revision, eventId, operationId, quantity) {
    const { error } = await supabase.rpc('ritua_move_stock', { product_id: id, operation_id: operationId, action: 'undo', quantity, undo_event_id: eventId }); fail(error)
    return load()
  },
}
