# Imagens do projeto

## Variantes para celular

As fotos que o site mostra têm duas larguras, escolhidas pelo `srcSet`/`sizes` dos componentes. A largura menor foi calculada a partir do CSS: um celular de 430 px lógicos em tela 2x pede 560 px na galeria, 600 px na seção Sobre e 700 px na abertura.

| arquivo | largura cheia | variante | onde aparece |
| --- | ---: | ---: | --- |
| `ritua-9895` | 69.536 B | `-700` 33.692 B | reserva da abertura e peça “Outras formas” |
| `ritua-3040` | 305.966 B | `-600` 156.352 B | reserva da seção Sobre |
| `ritua-2374` | 145.696 B | `-560` 83.430 B | peça “Um canto do ritual” |

Geradas com `cwebp` (libwebp 1.5.0, binário avulso — não é dependência do projeto), a partir do JPEG original quando o recorte é escala pura do original, e a partir do próprio `.webp` publicado quando a foto foi recortada (`ritua-9895` e `ritua-1672` vêm de originais deitados):

```
cwebp -q 86 -m 6 -resize <largura> <altura> origem.png -o ritua-<id>-<largura>.webp
```

As larguras cheias **não** foram reencodadas. Medido: na mesma dimensão e na mesma qualidade, o `cwebp` entrega o mesmo tamanho dos arquivos atuais (diferenças de −7% a +3%). Elas já estavam bem comprimidas; trocá-las só acrescentaria perda de geração.

As fotos cujas peças não entram em `staticProducts` — `ritua-1672`, `ritua-2200` e `ritua-2219`, 674 kB somados — continuam importadas por `src/data/catalog.js` e vão para o `dist` sem nunca aparecerem na tela. Não custam bytes a quem visita, porque o navegador nunca as pede, mas pesam no repositório e no deploy. Não ganharam variante por isso.

## Marca e carimbo

`logo.webp` (19.126 B, 600×600) e `handprint-ritua.webp` (24.444 B, 300×300) substituem os PNG de 65.521 B e 86.971 B. O WebP preserva a transparência. Os PNG continuam versionados como original sem perda, fora do build — nada os importa, então o Vite não os copia para o `dist`.

```
cwebp -q 85 -m 6 -resize 600 600 -alpha_q 100 src/assets/logo.png -o src/assets/logo.webp
cwebp -q 85 -m 6 -alpha_q 100 src/assets/images/handprint-ritua.png -o src/assets/images/handprint-ritua.webp
```

## Ícones

`public/favicon-32.png` (2.231 B) e `public/apple-touch-icon.png` (18.053 B) saem da mesma arte, hoje em `src/assets/favicon-ritua-source.png` (829×829, 193.796 B). A arte saiu de `public/` porque o Vite copia aquela pasta inteira para o `dist`: ela era publicada em tamanho cheio só para virar um ícone de 32 px.

```
sips -Z 32 src/assets/favicon-ritua-source.png --out public/favicon-32.png
sips -Z 180 src/assets/favicon-ritua-source.png --out public/apple-touch-icon.png
```

`public/favicon.png` foi removido: era cópia byte a byte de `src/assets/logo.png`, o logotipo horizontal, que ninguém referenciava e que seria ilegível como ícone de aba.
