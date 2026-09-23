import test from 'node:test'
import assert from 'node:assert/strict'
import { groupCatalog, toGalleryProduct, selectShowcase } from '../src/services/catalogSections.js'
test('categorias têm ordem fixa e cada produto publicado vai apenas para seu tipo', () => {
  const products = ['Cuia', 'Case', 'Piteira'].map((category, id) => ({ id, category, published: true }))
  products.push({ id: 3, category: 'Case', published: false })
  const groups = groupCatalog(products)
  assert.deepEqual(groups.map(g => g.category), ['Piteira', 'Case', 'Cuia'])
  assert.deepEqual(groups.map(g => g.items.map(p => p.id)), [[2], [1], [0]])
})
test('editar tipo move a peça sem duplicar e mantém seções vazias', () => {
  const piece = { id: 'a', category: 'Case', published: true }
  assert.equal(groupCatalog([piece])[1].items.length, 1)
  const groups = groupCatalog([{ ...piece, category: 'Piteira' }])
  assert.deepEqual(groups.map(g => g.items.length), [1, 0, 0])
})
test('piteiras sem linha entram em Clássicas; Premium fica separada', () => {
  const products = [
    { id: 'p1', category: 'Piteira', published: true, line: 'Premium' },
    { id: 'p2', category: 'Piteira', published: true, line: 'Classica' },
    { id: 'p3', category: 'Piteira', published: true },
  ]
  const [piteiraSection] = groupCatalog(products)
  assert.deepEqual(piteiraSection.groups.map(g => g.key), ['Premium', 'Classica'])
  assert.deepEqual(piteiraSection.groups[0].items.map(p => p.id), ['p1'])
  assert.deepEqual(piteiraSection.groups[1].items.map(p => p.id), ['p2', 'p3'])
  assert.equal(groupCatalog(products)[1].groups, undefined)
})
test('adaptador preserva a linha da piteira e limpa em outras categorias', () => {
  assert.equal(toGalleryProduct({ id: 'a', category: 'Piteira', published: true, photos: [], stock: 1, reserved: 0, line: 'Premium' }).line, 'Premium')
  assert.equal(toGalleryProduct({ id: 'b', category: 'Case', published: true, photos: [], stock: 1, reserved: 0 }).line, null)
})
test('adaptador preserva nome, foto, preço, descrição e saldo disponível', () => {
  const p = toGalleryProduct({ id: 'a', name: 'Teste', category: 'Cuia', published: true, photos: ['foto'], description: 'Descrição', priceCents: 5000, stock: 1, reserved: 1 })
  assert.equal(p.media.src, 'foto'); assert.equal(p.priceCents, 5000); assert.equal(p.subtitle, 'Descrição')
  assert.equal(p.available, false); assert.equal(p.status, 'Reservado')
  assert.equal(toGalleryProduct({ ...p, name: 'Sem foto', photos: [], stock: 0, reserved: 0 }).media, null)
})

const showcases = ['Piteira', 'Case', 'Cuia'].map(category => ({ id: `vitrine-${category}`, category, published: true }))
const piece = { id: 'real', category: 'Case', published: true, stock: 1, reserved: 0 }
const caseSlot = products => selectShowcase(products, showcases).find(p => p.category === 'Case').id
test('vitrine é independente por categoria e rascunhos não a ocultam', () => {
  assert.deepEqual(selectShowcase([piece], showcases).map(p => p.id), ['vitrine-Piteira', 'real', 'vitrine-Cuia'])
  assert.deepEqual(selectShowcase([{ ...piece, published: false }], showcases), showcases)
})
test('reserva mantém produto real; última venda recupera vitrine e reposição a oculta', () => {
  assert.equal(caseSlot([{ ...piece, reserved: 1 }]), 'real')
  assert.equal(caseSlot([{ ...piece, stock: 0 }]), 'vitrine-Case')
  assert.equal(caseSlot([{ ...piece, stock: 2 }]), 'real')
  assert.equal(piece.stock, 1)
})
test('vender um produto não recupera vitrine enquanto outro tiver estoque', () => {
  const remaining = { ...piece, id: 'outra' }
  assert.equal(caseSlot([{ ...piece, stock: 0 }, remaining]), 'outra')
  assert.equal(selectShowcase([], [...showcases, ...showcases]).length, 3)
})
