export const categories = ['Cuia', 'Case', 'Piteira']
export const actionLabels = { reserve: 'Reserva', release: 'Reserva cancelada', sell: 'Venda', sellReserved: 'Venda de reserva', restock: 'Reposição', remove: 'Retirada', undo: 'Correção' }
export function validateProduct(input) {
  const name = String(input.name || '').trim()
  if (!name || name.length > 100) throw new Error('Informe um nome com até 100 caracteres.')
  if (!categories.includes(input.category)) throw new Error('Escolha a categoria da peça.')
  if (!Number.isSafeInteger(input.priceCents) || input.priceCents < 0) throw new Error('Informe um preço válido.')
  if (String(input.description || '').length > 2000) throw new Error('Use até 2.000 caracteres na descrição.')
  if (!Array.isArray(input.photos) || input.photos.length > 4 || input.photos.some(p => typeof p !== 'string' || !/^data:image\/(jpeg|png|webp);base64,/.test(p))) throw new Error('Selecione até quatro fotos JPG, PNG ou WebP.')
  return { name, category: input.category, priceCents: input.priceCents, description: String(input.description || '').trim(), photos: input.photos, published: Boolean(input.published) }
}
export function stockChange(product, action, quantity) {
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 9999) throw new Error('Informe uma quantidade inteira entre 1 e 9.999.')
  const deltas = { reserve: [0, quantity], release: [0, -quantity], sell: [-quantity, 0], sellReserved: [-quantity, -quantity], restock: [quantity, 0], remove: [-quantity, 0] }
  if (!deltas[action]) throw new Error('Ação inválida.')
  const [stockDelta, reservedDelta] = deltas[action]
  const stock = product.stock + stockDelta
  const reserved = product.reserved + reservedDelta
  if (stock < 0 || reserved < 0 || reserved > stock || stock > 9999) throw new Error('Quantidade indisponível. Confira as unidades livres e reservadas.')
  return { stock, reserved, stockDelta, reservedDelta }
}
export function statusOf(p) { return !p.published ? 'Rascunho' : p.stock === 0 ? 'Esgotado' : p.stock === p.reserved ? 'Reservado' : 'Disponível' }
