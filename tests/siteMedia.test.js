import test from 'node:test'
import assert from 'node:assert/strict'
import { siteMediaError } from '../src/services/siteMediaErrors.js'
const upload = 'Não foi possível enviar a foto. Confira a conexão e tente novamente.'
const gravacao = 'Não foi possível salvar esta imagem. Tente novamente.'
test('sessão vencida manda entrar de novo em vez de culpar a conexão', () => {
  // O storage erra com status/statusCode; o PostgREST, com code. Sessão morta vira recusa por permissão.
  assert.match(siteMediaError({ status: 403, statusCode: '403' }, upload), /Entre novamente/)
  assert.match(siteMediaError({ status: 401, statusCode: '401' }, upload), /Entre novamente/)
  assert.match(siteMediaError({ code: '42501' }, gravacao), /Entre novamente/)
  assert.match(siteMediaError({ code: 'PGRST301' }, gravacao), /Entre novamente/)
  assert.match(siteMediaError({ statusCode: '42501' }, upload), /Entre novamente/)
})
test('mensagem do banco chega inteira e o resto cai no texto da etapa', () => {
  assert.equal(siteMediaError({ code: 'P0001', message: 'Foto inválida ou envio incompleto' }, gravacao), 'Foto inválida ou envio incompleto')
  assert.equal(siteMediaError({ message: 'fetch failed' }, upload), upload)
  assert.equal(siteMediaError({ status: 500 }, gravacao), gravacao)
  assert.equal(siteMediaError(null, upload), '')
})
