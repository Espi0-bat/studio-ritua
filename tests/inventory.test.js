import test from 'node:test'
import assert from 'node:assert/strict'
import { stockChange } from '../src/services/inventory.js'
import { createDemoCatalog } from './demoCatalog.js'
function setup() {
  let data
  let queue = Promise.resolve()
  let i = 0
  const storage = { getItem: () => data, setItem: (_, value) => { data = value } }
  const lock = fn => { const next = queue.then(fn); queue = next.catch(() => {}); return next }
  return { catalog: createDemoCatalog(storage, lock, () => `id-${++i}`), storage }
}
test('reserva não reduz estoque físico, venda reservada reduz ambos', () => {
  const reserved = stockChange({ stock: 2, reserved: 0 }, 'reserve', 1)
  assert.equal(reserved.stock, 2); assert.equal(reserved.reserved, 1)
  const sold = stockChange(reserved, 'sellReserved', 1)
  assert.equal(sold.stock, 1); assert.equal(sold.reserved, 0)
})
test('rejeita venda de unidades reservadas, cancelamento excessivo e números inválidos', () => {
  for (const [action, quantity] of [['sell', 1], ['release', 3], ['reserve', 1], ['restock', 0.5], ['restock', -1], ['sell', NaN]]) {
    assert.throws(() => stockChange({ stock: 2, reserved: 2 }, action, quantity))
  }
})
test('requisições simultâneas não vendem a mesma peça duas vezes', async () => {
  const { catalog } = setup()
  const results = await Promise.allSettled([catalog.move('demo-cuia', 0, 'sell', 1, 'a'), catalog.move('demo-cuia', 0, 'sell', 1, 'b')])
  assert.equal(results.filter(r => r.status === 'fulfilled').length, 1)
  assert.equal((await catalog.load()).products[0].stock, 0)
})
test('repetir operação não duplica baixa e desfazer preserva histórico', async () => {
  const { catalog } = setup()
  await catalog.move('demo-cuia', 0, 'sell', 1, 'a')
  await catalog.move('demo-cuia', 0, 'sell', 1, 'a')
  const before = await catalog.load(); assert.equal(before.events.length, 1)
  const after = await catalog.undo('demo-cuia', 1, 'a', 'b')
  assert.equal(after.products[0].stock, 1); assert.equal(after.events.length, 2)
  await assert.rejects(catalog.undo('demo-cuia', 2, 'a', 'c'))
})
test('somente última movimentação pode ser revertida', async () => {
  const { catalog } = setup()
  await catalog.move('demo-cuia', 0, 'reserve', 1, 'a')
  await catalog.move('demo-cuia', 1, 'release', 1, 'b')
  await assert.rejects(catalog.undo('demo-cuia', 2, 'a', 'c'))
})
test('cadastro persiste e edição não permite alterar estoque diretamente', async () => {
  const { catalog } = setup()
  await catalog.save({ name: 'Nova cuia', category: 'Cuia', priceCents: 8500, description: '', photos: [], published: false, quantity: 1 })
  const p = (await catalog.load()).products[0]
  await catalog.save({ ...p, name: 'Cuia editada', stock: 99 }, p.revision)
  const saved = (await catalog.load()).products[0]
  assert.equal(saved.stock, 1); assert.equal(saved.name, 'Cuia editada')
  await assert.rejects(catalog.save({ ...saved, priceCents: -1 }, saved.revision))
})
test('falha de armazenamento não confirma a movimentação', async () => {
  const { catalog, storage } = setup()
  storage.setItem = () => { throw new Error('quota') }
  await assert.rejects(catalog.move('demo-cuia', 0, 'sell', 1, 'a'), /Não foi possível salvar/)
  assert.equal((await catalog.load()).products[0].stock, 1)
})
test('dados corrompidos não são sobrescritos silenciosamente', async () => {
  const { catalog, storage } = setup(); storage.getItem = () => '{broken'
  await assert.rejects(catalog.load(), /Não foi possível ler/)
  await assert.rejects(catalog.move('demo-cuia', 0, 'sell', 1, 'a'))
})
test('identificador repetido com ação diferente é rejeitado', async () => {
  const { catalog } = setup()
  await catalog.move('demo-cuia', 0, 'reserve', 1, 'a')
  await assert.rejects(catalog.move('demo-cuia', 1, 'release', 1, 'a'), /já foi usada/)
  assert.equal((await catalog.load()).products[0].reserved, 1)
})
