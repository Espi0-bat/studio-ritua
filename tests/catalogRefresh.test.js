import test from 'node:test'
import assert from 'node:assert/strict'
import { startCatalogRefresh } from '../src/services/catalogRefresh.js'

// Dublê de document/window: guarda os ouvintes para o teste disparar e conferir a remoção.
function alvo(extra = {}) {
  const ouvintes = new Map()
  return { ...extra,
    addEventListener(tipo, fn) { ouvintes.set(tipo, [...(ouvintes.get(tipo) || []), fn]) },
    removeEventListener(tipo, fn) { ouvintes.set(tipo, (ouvintes.get(tipo) || []).filter(o => o !== fn)) },
    disparar(tipo) { for (const fn of [...(ouvintes.get(tipo) || [])]) fn() },
    quantos() { return [...ouvintes.values()].reduce((total, lista) => total + lista.length, 0) },
  }
}

function setup(hidden = false) {
  let relogio = 0
  let proximo = 1
  const timers = new Map()
  const chamadas = []
  const doc = alvo({ hidden })
  const win = alvo()
  const stop = startCatalogRefresh(() => chamadas.push(relogio), { doc, win, now: () => relogio,
    setTimer: (fn, ms) => { const id = proximo++; timers.set(id, { fn, ms, proxima: relogio + ms }); return id },
    clearTimer: id => timers.delete(id) })
  const avancar = ms => {
    const fim = relogio + ms
    for (;;) {
      const devido = [...timers.values()].filter(t => t.proxima <= fim).sort((a, b) => a.proxima - b.proxima)[0]
      if (!devido) break
      relogio = devido.proxima
      devido.proxima += devido.ms
      devido.fn()
    }
    relogio = fim
  }
  return { chamadas, doc, win, stop, avancar }
}

test('atualiza ao montar e a cada minuto enquanto a aba está à vista', () => {
  const { chamadas, stop, avancar } = setup()
  assert.equal(chamadas.length, 1)
  avancar(120000)
  assert.equal(chamadas.length, 3)
  stop()
  avancar(120000)
  assert.equal(chamadas.length, 3)
})

test('aba oculta não consulta, e o retorno atualiza uma vez só', () => {
  const { chamadas, doc, win, stop, avancar } = setup()
  doc.hidden = true
  doc.disparar('visibilitychange')
  avancar(600000)
  assert.equal(chamadas.length, 1, 'aba oculta não deve consultar')
  doc.hidden = false
  doc.disparar('visibilitychange')
  win.disparar('focus') // o par visibilitychange + focus do retorno não pode render duas consultas
  assert.equal(chamadas.length, 2)
  avancar(60000)
  assert.equal(chamadas.length, 3, 'o ciclo volta a correr depois do retorno')
  stop()
})

test('aberta já oculta, carrega uma vez e só inicia o ciclo quando aparece', () => {
  const { chamadas, doc, stop, avancar } = setup(true)
  assert.equal(chamadas.length, 1)
  avancar(600000)
  assert.equal(chamadas.length, 1)
  doc.hidden = false
  doc.disparar('visibilitychange')
  assert.equal(chamadas.length, 2, 'ao aparecer, atualiza na hora para não mostrar peça vencida')
  avancar(60000)
  assert.equal(chamadas.length, 3, 'e só então retoma o ciclo de um minuto')
  stop()
})

test('focos seguidos na mesma janela curta não viram consultas repetidas', () => {
  const { chamadas, win, stop, avancar } = setup()
  win.disparar('focus')
  win.disparar('focus')
  assert.equal(chamadas.length, 1)
  avancar(6000)
  win.disparar('focus')
  assert.equal(chamadas.length, 2)
  stop()
})

test('encerrar remove os dois ouvintes', () => {
  const { doc, win, stop } = setup()
  assert.equal(doc.quantos() + win.quantos(), 2)
  stop()
  assert.equal(doc.quantos() + win.quantos(), 0)
})
