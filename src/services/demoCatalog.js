import { validateProduct, stockChange } from './inventory.js'
const KEY = 'ritua-admin-demo-v1'
const seed = () => ({ version: 1, products: [
  { id: 'demo-cuia', name: 'Cuia Aurora · exemplo', category: 'Cuia', description: 'Peça fictícia para experimentar o painel.', priceCents: 8500, photos: [], published: true, stock: 1, reserved: 0, revision: 0 },
  { id: 'demo-case', name: 'Case Jardim · exemplo', category: 'Case', description: 'Cadastro fictício para testar um novo drop.', priceCents: 4500, photos: [], published: false, stock: 3, reserved: 0, revision: 0 },
], events: [] })
export function createDemoCatalog(storage, lock, uuid = () => crypto.randomUUID()) {
  function read() {
    const raw = storage.getItem(KEY)
    if (!raw) return seed()
    try {
      const data = JSON.parse(raw)
      if (data.version !== 1 || !Array.isArray(data.products) || !Array.isArray(data.events)) throw new Error()
      for (const p of data.products) {
        validateProduct(p)
        if (!Number.isInteger(p.stock) || !Number.isInteger(p.reserved) || p.stock < p.reserved || p.reserved < 0 || p.stock > 9999 || !Number.isInteger(p.revision)) throw new Error()
      }
      return data
    } catch { throw new Error('Não foi possível ler a demonstração salva. Exporte seus dados antes de limpar o armazenamento do navegador.') }
  }
  async function write(fn) {
    return lock(async () => {
      const state = read()
      fn(state)
      try { storage.setItem(KEY, JSON.stringify(state)) } catch { throw new Error('Não foi possível salvar neste navegador. O armazenamento pode estar cheio ou bloqueado. Remova algumas fotos e tente novamente.') }
      return state
    })
  }
  function find(state, id, revision) {
    const p = state.products.find(p => p.id === id)
    if (!p) throw new Error('Peça não encontrada.')
    if (p.revision !== revision) throw new Error('Esta peça mudou em outra ação ou aba. Feche esta janela e confira os dados atualizados.')
    return p
  }
  return {
    load: async () => read(),
    save: (input, revision) => write(state => {
      const fields = validateProduct(input)
      if (input.id) { const p = find(state, input.id, revision); Object.assign(p, fields, { revision: p.revision + 1 }) }
      else {
        const quantity = Number(input.quantity)
        if (!Number.isInteger(quantity) || quantity < 0 || quantity > 9999) throw new Error('Informe uma quantidade de 0 a 9.999.')
        const id = uuid()
        state.products.unshift({ ...fields, id, stock: quantity, reserved: 0, revision: 0 })
        state.events.unshift({ id: uuid(), productId: id, action: 'initial', quantity, stockDelta: quantity, reservedDelta: 0, at: new Date().toISOString() })
      }
    }),
    move: (id, revision, action, quantity, operationId) => write(state => {
      const existing = state.events.find(e => e.id === operationId)
      if (existing) {
        if (existing.productId !== id || existing.action !== action || existing.quantity !== quantity) throw new Error('Esta operação já foi usada. Reabra a ação e tente novamente.')
        return
      }
      const p = find(state, id, revision)
      const change = stockChange(p, action, quantity)
      Object.assign(p, { stock: change.stock, reserved: change.reserved, revision: p.revision + 1 })
      state.events.unshift({ id: operationId, productId: id, action, quantity, stockDelta: change.stockDelta, reservedDelta: change.reservedDelta, at: new Date().toISOString() })
    }),
    undo: (id, revision, eventId, operationId) => write(state => {
      const existing = state.events.find(e => e.id === operationId)
      if (existing) {
        if (existing.productId !== id || existing.action !== 'undo' || existing.reverses !== eventId) throw new Error('Esta operação já foi usada. Reabra a ação e tente novamente.')
        return
      }
      const p = find(state, id, revision)
      const last = state.events.find(e => e.productId === id)
      if (!last || last.id !== eventId || ['undo', 'initial'].includes(last.action)) throw new Error('Só é possível desfazer a última movimentação de estoque da peça.')
      p.stock -= last.stockDelta; p.reserved -= last.reservedDelta; p.revision++
      state.events.unshift({ id: operationId, productId: id, action: 'undo', quantity: last.quantity, stockDelta: -last.stockDelta, reservedDelta: -last.reservedDelta, reverses: last.id, at: new Date().toISOString() })
    }),
  }
}
export const demoCatalog = createDemoCatalog({ getItem: key => localStorage.getItem(key), setItem: (key, value) => localStorage.setItem(key, value) }, fn => {
  if (!navigator.locks) throw new Error('Use uma versão atual do Safari, Chrome ou Firefox para salvar a demonstração.')
  return navigator.locks.request(KEY, fn)
})
