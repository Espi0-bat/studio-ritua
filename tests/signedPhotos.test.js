import test from 'node:test'
import assert from 'node:assert/strict'
import { createSignedPhotos, signedMargin, signedSeconds } from '../src/services/signedPhotos.js'

function setup() {
  let relogio = 0
  let rodada = 0
  const chamadas = []
  const sign = async (paths, seconds) => {
    chamadas.push({ paths, seconds })
    rodada += 1
    return paths.map(path => ({ path, signedUrl: `https://exemplo/${path}?token=${rodada}` }))
  }
  return { chamadas, avancar: seconds => { relogio += seconds * 1000 },
    signedUrls: createSignedPhotos(sign, { now: () => relogio }) }
}

test('a mesma foto mantém o endereço entre atualizações, em vez de ser reassinada', async () => {
  // É isto que faz o navegador reusar a imagem já baixada: antes o token mudava a cada ciclo.
  const { chamadas, signedUrls, avancar } = setup()
  const primeira = await signedUrls(['p1/a.jpg', 'p1/b.jpg'])
  avancar(60)
  assert.deepEqual(await signedUrls(['p1/a.jpg', 'p1/b.jpg']), primeira)
  assert.equal(chamadas.length, 1)
  assert.equal(chamadas[0].seconds, signedSeconds)
})

test('foto nova é assinada sozinha, sem reassinar as que já valem', async () => {
  const { chamadas, signedUrls } = setup()
  const primeira = await signedUrls(['p1/a.jpg'])
  const segunda = await signedUrls(['p1/a.jpg', 'p2/c.jpg'])
  assert.equal(segunda['p1/a.jpg'], primeira['p1/a.jpg'])
  assert.deepEqual(chamadas.map(c => c.paths), [['p1/a.jpg'], ['p2/c.jpg']])
})

test('a assinatura é trocada antes de vencer, com folga para a foto adiada baixar', async () => {
  const { chamadas, signedUrls, avancar } = setup()
  const primeira = await signedUrls(['p1/a.jpg'])
  avancar(signedSeconds - signedMargin - 1)
  assert.equal((await signedUrls(['p1/a.jpg']))['p1/a.jpg'], primeira['p1/a.jpg'])
  avancar(2)
  assert.notEqual((await signedUrls(['p1/a.jpg']))['p1/a.jpg'], primeira['p1/a.jpg'])
  assert.equal(chamadas.length, 2)
  assert.ok(signedMargin > 0 && signedMargin < signedSeconds)
})

test('caminho que saiu do catálogo é esquecido e assinado de novo se voltar', async () => {
  const { chamadas, signedUrls } = setup()
  await signedUrls(['p1/a.jpg', 'p2/c.jpg'])
  await signedUrls(['p1/a.jpg'])
  await signedUrls(['p1/a.jpg', 'p2/c.jpg'])
  assert.deepEqual(chamadas.map(c => c.paths), [['p1/a.jpg', 'p2/c.jpg'], ['p2/c.jpg']])
})

test('catálogo sem fotos não pede assinatura nenhuma', async () => {
  const { chamadas, signedUrls } = setup()
  assert.deepEqual(await signedUrls([]), {})
  assert.equal(chamadas.length, 0)
})

test('falha ao assinar sobe sem apagar o que já estava guardado', async () => {
  let quebrar = false
  let rodada = 0
  const sign = async paths => {
    if (quebrar) throw new Error('Não foi possível carregar algumas fotos. Tente novamente.')
    rodada += 1
    return paths.map(path => ({ path, signedUrl: `https://exemplo/${path}?token=${rodada}` }))
  }
  const signedUrls = createSignedPhotos(sign, { now: () => 0 })
  const primeira = await signedUrls(['p1/a.jpg'])
  quebrar = true
  await assert.rejects(() => signedUrls(['p1/a.jpg', 'p2/c.jpg']), /Não foi possível carregar algumas fotos/)
  quebrar = false
  assert.equal((await signedUrls(['p1/a.jpg']))['p1/a.jpg'], primeira['p1/a.jpg'])
})
