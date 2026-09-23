import test from 'node:test'
import assert from 'node:assert/strict'
import { groupCatalog, toGalleryProduct } from '../src/services/catalogSections.js'
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
