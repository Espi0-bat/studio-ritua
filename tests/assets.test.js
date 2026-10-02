import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'

// Lê largura e altura direto do cabeçalho IHDR do PNG: evita dependência só para conferir
// que o ícone da aba continua sendo um ícone, e não a arte de 829 px que era publicada antes.
function png(caminho) {
  const dados = readFileSync(caminho)
  assert.equal(dados.subarray(1, 4).toString('ascii'), 'PNG', `${caminho} não é PNG`)
  return { bytes: dados.length, largura: dados.readUInt32BE(16), altura: dados.readUInt32BE(20) }
}

test('os ícones do index.html são arquivos próprios e do tamanho que declaram', () => {
  const html = readFileSync('index.html', 'utf8')
  assert.match(html, /rel="icon"[^>]*sizes="32x32"[^>]*href="favicon-32\.png"/)
  assert.match(html, /rel="apple-touch-icon"[^>]*sizes="180x180"[^>]*href="apple-touch-icon\.png"/)
  const aba = png('public/favicon-32.png')
  assert.deepEqual([aba.largura, aba.altura], [32, 32])
  assert.ok(aba.bytes < 8_000, `favicon de aba com ${aba.bytes} bytes`)
  const apple = png('public/apple-touch-icon.png')
  assert.deepEqual([apple.largura, apple.altura], [180, 180])
  assert.ok(apple.bytes < 40_000, `ícone da Apple com ${apple.bytes} bytes`)
})

test('tudo em public/ é publicado como está: nada grande pode voltar para lá', () => {
  // A arte de 829 px vivia aqui e ia inteira para o ar a cada deploy, só para virar um
  // ícone de 32 px. O original agora mora em src/assets, que o Vite só copia se for importado.
  for (const nome of readdirSync('public')) {
    const bytes = statSync(`public/${nome}`).size
    assert.ok(bytes < 40_000, `public/${nome} tem ${bytes} bytes; assets grandes não ficam em public/`)
  }
})

test('a Caveat servida é o subconjunto latino, não a fonte inteira', () => {
  assert.match(readFileSync('src/index.css', 'utf8'), /url\('\.\/assets\/fonts\/Caveat-Latin\.woff2'\)/)
  const bytes = statSync('src/assets/fonts/Caveat-Latin.woff2').size
  assert.ok(bytes < 75_000, `Caveat-Latin.woff2 com ${bytes} bytes; a fonte inteira tinha 173.404`)
})

test('cada foto do site tem a variante menor que o srcSet promete', () => {
  // srcSet apontando para arquivo que não existe serve foto quebrada em celular.
  const media = readFileSync('src/data/siteMedia.js', 'utf8')
  const catalogo = readFileSync('src/data/catalog.js', 'utf8')
  for (const [arquivo, grande] of [['ritua-9895-700.webp', 'ritua-9895.webp'],
    ['ritua-3040-600.webp', 'ritua-3040.webp'], ['ritua-2374-560.webp', 'ritua-2374.webp']]) {
    const pequena = statSync(`src/assets/images/${arquivo}`).size
    assert.ok(pequena < statSync(`src/assets/images/${grande}`).size, `${arquivo} não é menor que ${grande}`)
    assert.ok(media.includes(arquivo) || catalogo.includes(arquivo), `${arquivo} não é usado por nenhum srcSet`)
  }
})
