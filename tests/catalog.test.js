import test from 'node:test'
import assert from 'node:assert/strict'
import { groupCatalog, toGalleryProduct, selectShowcase } from '../src/services/catalogSections.js'
test('categorias têm ordem fixa e cada produto publicado vai apenas para seu tipo', () => {
  const products = ['Cuia', 'Case', 'Piteira'].map((category, id) => ({ id, category, published: true }))
  products.push({ id: 3, category: 'Case', published: false })
  const groups = groupCatalog(products)
  assert.deepEqual(groups.map(g => g.category), ['Case', 'Piteira', 'Cuia'])
  assert.deepEqual(groups.map(g => g.items.map(p => p.id)), [[1], [2], [0]])
})
test('editar tipo move a peça sem duplicar e mantém seções vazias', () => {
  const piece = { id: 'a', category: 'Case', published: true }
  assert.equal(groupCatalog([piece])[0].items.length, 1)
  const groups = groupCatalog([{ ...piece, category: 'Piteira' }])
  assert.deepEqual(groups.map(g => g.items.length), [0, 1, 0])
})
test('adaptador preserva nome, foto, preço, descrição e saldo disponível', () => {
  const p = toGalleryProduct({ id: 'a', name: 'Teste', category: 'Cuia', published: true, photos: ['foto'], description: 'Descrição', priceCents: 5000, stock: 1, reserved: 1 })
  assert.equal(p.media.src, 'foto'); assert.equal(p.priceCents, 5000); assert.equal(p.subtitle, 'Descrição')
  assert.equal(p.available, false); assert.equal(p.status, 'Reservado')
  assert.equal(toGalleryProduct({ ...p, name: 'Sem foto', photos: [], stock: 0, reserved: 0 }).media, null)
})

const showcases = ['Case', 'Piteira', 'Cuia'].map(category => ({ id: `vitrine-${category}`, category, published: true }))
const piece = { id: 'real', category: 'Case', published: true, stock: 1, reserved: 0 }
test('vitrine é independente por categoria e rascunhos não a ocultam', () => {
  assert.deepEqual(selectShowcase([piece], showcases).map(p => p.id), ['real', 'vitrine-Piteira', 'vitrine-Cuia'])
  assert.deepEqual(selectShowcase([{ ...piece, published: false }], showcases), showcases)
})
test('reserva mantém produto real; última venda recupera vitrine e reposição a oculta', () => {
  assert.equal(selectShowcase([{ ...piece, reserved: 1 }], showcases)[0].id, 'real')
  assert.equal(selectShowcase([{ ...piece, stock: 0 }], showcases)[0].id, 'vitrine-Case')
  assert.equal(selectShowcase([{ ...piece, stock: 2 }], showcases)[0].id, 'real')
  assert.equal(piece.stock, 1)
})
test('vender um produto não recupera vitrine enquanto outro tiver estoque', () => {
  const remaining = { ...piece, id: 'outra' }
  assert.equal(selectShowcase([{ ...piece, stock: 0 }, remaining], showcases)[0].id, 'outra')
  assert.equal(selectShowcase([], [...showcases, ...showcases]).length, 3)
})
