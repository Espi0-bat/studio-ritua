# Tipografia da Rituá

Na página 25 do guia, o exemplo visual identificado como “Poppins” usa a fonte incorporada `RetrockRegular`. As outras amostras usam `BubbleboddyNeue-Regular` e `HolidayRegular`. Os arquivos incorporados ao PDF são subconjuntos com poucos caracteres; não são fontes completas para uso no site.

Até receber os arquivos completos da marca, os títulos usam Shrikhand como aproximação visual provisória do estilo retrô e volumoso. Caveat ocupa o papel manuscrito nas pequenas legendas. Poppins fica nos textos de leitura e controles. O logotipo continua sendo a arte oficial, sem substituição tipográfica.

- Shrikhand: https://github.com/google/fonts/tree/main/ofl/shrikhand
- Caveat: https://github.com/google/fonts/tree/main/ofl/caveat

Arquivos obtidos do repositório oficial Google Fonts. As licenças OFL acompanham cada família nesta pasta. Ambas são servidas localmente.

Os papéis tipográficos estão centralizados nas variáveis `--font-display` e `--font-note` de `src/index.css`, permitindo substituir as fontes provisórias pelas oficiais quando os arquivos completos estiverem disponíveis.

## Subconjunto da Caveat

`Caveat-Latin.woff2` (71.120 bytes) é um subconjunto de `Caveat.ttf` (173.404 bytes no `.woff2` completo anterior), gerado para o português do Brasil. Segue a mesma convenção de `Shrikhand-Latin.woff2` e `SourceSans3-Latin.woff2`, que já eram subconjuntos.

O eixo variável `wght` 400–700 foi preservado: `src/index.css` declara `font-weight: 400 700` e `font-synthesis: none`, então instanciar pesos estáticos deixaria os títulos sem o peso que o CSS pede. A OFL da Caveat não declara *Reserved Font Name*, então o nome da família continua `Caveat`.

Gerado com `fonttools` (ambiente descartável, não é dependência do projeto):

```
pyftsubset src/assets/fonts/Caveat.ttf \
  --output-file=src/assets/fonts/Caveat-Latin.woff2 --flavor=woff2 \
  --unicodes="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+20AC,U+2122,U+2190-2193,U+2197,U+2212" \
  --layout-features="kern,liga,clig,calt,ccmp,locl,mark,mkmk,rlig,rvrn" \
  --no-hinting --name-IDs="*" --name-legacy
```

O conjunto não se limita às frases de hoje: a Duda escreve legendas novas pelo painel, então entram maiúsculas, minúsculas, dígitos, pontuação e todos os acentos do português. São 220 códigos pedidos e 215 no arquivo — as cinco setas (`←` `↑` `→` `↓` `↗`) não existem na Caveat original e o `pyftsubset` as descarta. Isso não afeta o site: as setas aparecem em links e botões, que usam a fonte de texto.

A Caveat não é precarregada no `index.html` de propósito. Ela veste legendas decorativas e tem `font-display: swap`; precarregá-la disputaria banda com a foto da abertura, que é o conteúdo principal.
