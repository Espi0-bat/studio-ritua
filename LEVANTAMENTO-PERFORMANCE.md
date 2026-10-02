# Levantamento de desempenho — Studio Rituá

Data: 02/10/2026. Diagnóstico do código local, do build de produção e do site publicado em https://studioritua.com.br/#inicio, sem alterações no código da aplicação.

## Alcance e limitações

`npm run build` passou; os 25 testes existentes passaram na análise local. Isso confirma a compilação e os comportamentos cobertos pelos testes. Após receber a URL pública, foram feitas requisições HTTP e medições no Opera instalado, em sessões temporárias automatizadas pelo Playwright. A consulta ao PageSpeed Insights retornou HTTP 429 por limite de cota; portanto não há nota Lighthouse nem dados de campo de usuários reais. As medições abaixo são de laboratório e não medem INP.

Os valores abaixo são tamanhos de arquivos gerados localmente, em kB decimais. Não representam a soma transferida na primeira visita: carregamento adiado, cache e conteúdo remoto mudam essa conta. Gzip é uma estimativa do Vite; depende da configuração da hospedagem.

## Medições

| Recurso | Tamanho | Observação |
| --- | ---: | --- |
| JavaScript principal | 395,84 kB; 114,92 kB gzip | Inclui React, código público e cliente Supabase |
| CSS principal | 19,72 kB; 4,89 kB gzip | Não é o maior alvo por volume |
| JavaScript do painel separado | 26,82 kB; 8,19 kB gzip | Importação adiada já implementada |
| Fonte Caveat | 173,40 kB | Maior fonte do projeto |
| Fonte Source Sans 3 | 65,68 kB | Precarregada pelo HTML |
| Fonte Shrikhand | 17,42 kB | Precarregada pelo HTML |
| Foto padrão da abertura | 69,54 kB | Já usa WebP e prioridade alta |
| Foto padrão da seção Sobre | 305,97 kB | Boa candidata a versões menores |
| Logo | 65,52 kB | Pode ter versão ajustada ao tamanho exibido |
| Carimbo da mão | 86,97 kB | Avaliar compressão preservando transparência |

O favicon também merece atenção: 193,80 kB, com 829 × 829 pixels, desproporcional ao uso como ícone pequeno. Medir o tamanho final das variantes antes de definir a economia.

## Melhorias por prioridade

### 1. Reduzir arquivos sem mudar o desenho — risco baixo

- Gerar favicon pequeno e um arquivo próprio para o ícone Apple, preservando a arte. Hoje os dois apontam para o mesmo PNG.
- Criar um subconjunto da Caveat com os caracteres necessários em português, preservando acentos, pontuação e licença. Não limitar apenas às frases atuais: o painel permite textos novos. Comparar todos os pesos utilizados antes de substituir.
- Criar variantes de imagens e usar `srcSet` e `sizes` para celulares e computadores. Preservar a versão maior para ampliação e manter as dimensões/proporções no layout. Começar pela foto de 305,97 kB; a abertura já tem peso relativamente pequeno.

A documentação do Chrome recomenda [subconjuntos de fontes](https://web.dev/articles/font-best-practices) e [imagens responsivas](https://web.dev/learn/design/responsive-images). A economia específica deste projeto precisa ser medida após gerar os arquivos e validar sua qualidade.

### 2. Corrigir antecipação de fotos remotas — risco moderado

Em `src/components/useSiteMedia.js`, os dois componentes consultam as mídias ao montar. Quando há foto salva no painel, `new Image()` com `image.src = saved.src` inicia o download imediatamente. Isso também ocorre na seção Sobre, mesmo que seu elemento visível tenha `loading="lazy"`.

Adiar o preparo da foto remota de Sobre até a seção se aproximar da tela; manter a abertura prioritária e preservar a imagem de reserva em caso de falha. Quando a abertura é substituída pelo painel, há potencial download da imagem padrão e depois da imagem remota. Medir essa sequência antes de adicionar preload: antecipar a imagem errada pode aumentar o tráfego.

Referência: [carregamento adiado de imagens](https://web.dev/articles/browser-level-image-lazy-loading).

### 3. Reduzir trabalho nas atualizações do catálogo — risco moderado

`src/components/LiveGallery.jsx` atualiza ao abrir a página, a cada 60 segundos e ao receber foco. Cada atualização consulta produtos/fotos e depois solicita URLs assinadas; a galeria aguarda essa sequência para aparecer.

- Pausar consultas periódicas enquanto a aba estiver oculta e atualizar ao retornar, preservando a verificação de disponibilidade.
- Avaliar reutilizar URLs ainda válidas, com margem antes de sua expiração de 900 segundos; invalidar quando houver mudanças nas fotos.
- Selecionar apenas campos necessários na leitura pública. Hoje o serviço usa `select('*')` e percorre todas as páginas retornadas pelas permissões do banco.
- Com catálogo maior, agrupar fotos por produto uma vez, substituindo a filtragem completa repetida para cada produto.

Não tornar o bucket público só para evitar a assinatura nem alterar regras de estoque/permissões. A quantidade de requisições e a latência precisam ser verificadas no ambiente publicado.

### 4. Avaliar JavaScript e estabilidade visual após medir — risco moderado

O painel já tem carregamento adiado, mas Supabase é dependência direta da página pública. Só separar um arquivo em chunks não garante menos bytes iniciais. Avaliar adiar serviços sem criar uma espera adicional perceptível para o catálogo ou quebrar recuperação de sessão.

A galeria troca um texto de carregamento por várias seções, podendo deslocar o conteúdo abaixo. Verificar CLS em celular e reservar espaço compatível se necessário. O carrossel gera três cópias dos cards quando tem mais de um item: isso aumenta o DOM, mas não significa automaticamente três downloads por foto. Otimizar apenas se uma medição mostrar custo relevante.

## O que já está bem encaminhado

- Fotos estáticas usadas pela página em WebP; originais grandes não aparecem no build analisado.
- Fontes locais em WOFF2 com `font-display: swap`.
- Imagem principal com `fetchPriority="high"`, sem lazy loading.
- Imagens de galeria com carregamento adiado e dimensões declaradas no componente.
- Consulta de mídias compartilhada entre abertura e Sobre.
- Uploads do painel já redimensionam imagens e geram JPEG com qualidade 0,75.
- CSS e JavaScript minificados no build, painel em importação dinâmica.

## Como validar uma implementação

Aplicar uma categoria de melhoria por vez, mantendo os originais. Comparar build e bytes transferidos antes/depois; executar testes existentes e revisar abertura, acentos, fotos, carrossel, ampliação, painel e retorno de autenticação em celular e desktop.

Na URL pública, medir pelo menos três execuções móveis equivalentes e comparar a mediana; verificar cache frio/quente, compressão HTTP, cache dos assets, tempo do servidor e sequência de consultas/imagens. Registrar LCP, CLS e trabalho de JavaScript; INP de usuários reais exige dados de campo. Não atribuir nota ou ganho percentual sem essas medições.

Recomendação inicial da análise local: favicon, subconjunto da Caveat e imagens responsivas; depois carregamento de Sobre e atualização do catálogo. A medição publicada abaixo refina essa ordem, dando prioridade às fotos remotas.

## Verificação do site publicado

### Hospedagem e transferência

- HTML retornou HTTP 200, servido pelo GitHub Pages com CDN. JavaScript e CSS publicados são idênticos, byte a byte após descompressão, aos arquivos do build local analisado.
- HTTP/2 e gzip já estão ativos. Transferência do corpo: HTML 584 bytes comprimidos, JavaScript 116.069 bytes, CSS 4.948 bytes. Não é necessário implementar compressão no código React.
- HTML, JavaScript e CSS retornaram `Cache-Control: max-age=600` (10 minutos). Os assets têm nomes com hash; cache mais longo pode ajudar visitas futuras, caso a camada de entrega permita configurá-lo. Não aplicar cache longo indiscriminadamente ao HTML. Referência: [cache HTTP da MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching).
- Uma coleta HTTP inicial teve TTFB de 1,47 s. Outra sequência teve 0,73 s, 0,26 s e 0,11 s, com conexão reutilizada nas duas últimas. Esses tempos incluem rede/TLS e não são o tempo total para o site aparecer nem provam lentidão do servidor de origem.

### Principal descoberta: fotos publicadas maiores que as reservas

| Recurso publicado | Corpo transferido |
| --- | ---: |
| Foto atual da abertura, no Supabase | 480,34 kB |
| Foto atual da seção Sobre, no Supabase | 556,12 kB |
| Favicon | 193,80 kB |
| Fonte Caveat | 173,40 kB |

As duas fotos do painel somam **1,04 MB**, antes de contar fontes, catálogo e imagens de reserva. A abertura remota pesa aproximadamente 6,9 vezes a reserva WebP local. Isso torna a otimização das fotos publicadas mais relevante que apenas reduzir a imagem padrão.

O navegador confirmou o download da reserva da abertura seguido pela foto remota. Também confirmou a requisição da foto remota de Sobre sem rolagem, embora a seção estivesse milhares de pixels abaixo da área visível. Isso comprova a antecipação identificada em `useSiteMedia.js`.

No navegador de teste, o favicon foi solicitado duas vezes com cache desabilitado. Isso é uma observação deste ambiente, não uma garantia de que todos os visitantes baixem o ícone duas vezes.

### Prioridade revista

1. Otimizar as fotos atuais do painel e gerar versões adequadas à tela, preservando nitidez, cor, enquadramento e os originais. Medir o resultado; não prometer economia antes da comparação visual.
2. Adiar o download remoto de Sobre até a seção se aproximar da tela. Manter prioridade para a abertura e o comportamento de reserva quando houver falha.
3. Reduzir favicon e Caveat. São alterações pequenas, com validação simples e sem necessidade de reescrever componentes.
4. Rever a sequência de carregamento da abertura, que hoje passa por JavaScript, consulta de mídias e download de outra foto. Evitar uma solução que antecipe ainda mais a imagem de reserva errada.
5. Depois, avaliar cache da hospedagem e consultas do catálogo. Não há evidência suficiente para recomendar migração de hospedagem neste momento.

### Medições de renderização

Três visitas móveis em contextos novos do Opera headless, automatizado via Playwright/CDP: viewport 390 × 844, escala 2, emulação móvel/toque, download limitado a 200.000 bytes/s (1,6 Mbps), upload a 93.750 bytes/s, latência adicional de 150 ms e CPU com fator de desaceleração 4. Cache do navegador desabilitado. Sessões compartilham o processo do navegador e podem se beneficiar de conexões/DNS/CDN aquecidos; não representam três visitas inteiramente frias em todos os níveis. Não foi aplicado user-agent Android personalizado.

A coleta final aguardou a imagem remota da abertura estar completa e mais cinco segundos. Não houve rolagem nem interação. LCP, mudanças de layout e tarefas longas foram observados com `PerformanceObserver`; CLS usa janelas de sessão. Não é uma execução Lighthouse, não produz nota oficial e não substitui dados de usuários reais.

| Medida | Móvel 1 | Móvel 2 | Móvel 3 | Mediana móvel |
| --- | ---: | ---: | ---: | ---: |
| TTFB da navegação | 0,35 s | 1,37 s | 0,43 s | 0,43 s |
| Primeiro conteúdo visível (FCP) | 2,33 s | 5,88 s | 3,54 s | 3,54 s |
| Maior conteúdo visível (LCP observado) | 12,88 s | 6,22 s | 14,65 s | **12,88 s** |
| Deslocamento visual (CLS observado) | 0,031 | 0,031 | 0,031 | **0,031** |
| Bytes de requisições concluídas, incluindo cabeçalhos | 2,39 MB | 2,69 MB | 2,39 MB | 2,39 MB |

Nas visitas 1 e 3, o último candidato de LCP foi a foto remota da abertura; na visita 2, o navegador manteve a imagem de reserva como último candidato, mesmo com a foto remota já carregada ao encerrar a coleta. Portanto, LCP não é uma medida exata do instante da troca de foto em todas as execuções. A variação entre as visitas é relevante e os números não devem ser tratados como uma promessa de tempo para todos os celulares.

Os bytes são o que terminou de transferir na janela observada, não o peso total de todos os produtos após rolagem. Imagens lazy ainda não carregadas não são necessariamente falhas. Não foram capturadas exceções de JavaScript nessas sessões.

Uma visita desktop exploratória, viewport 1440 × 900 e sem limite artificial de CPU/rede, registrou FCP 3,06 s, LCP 4,69 s e CLS 0,015. Como foi uma única visita e um protocolo de espera diferente, serve apenas de observação complementar, não de comparação controlada com o móvel.

Referência de interpretação: [Web Vitals](https://web.dev/articles/vitals) considera bons LCP até 2,5 s e CLS até 0,1, avaliados em dados de campo no percentil 75. Nesta amostra de laboratório, o deslocamento visual é pequeno e o carregamento do conteúdo principal é o alvo prioritário. Não há dados para classificar o percentil 75 real do site.

As primeiras três coletas exploratórias móveis encerravam a observação 12 segundos após o evento `load`, enquanto a foto definitiva ainda baixava. Seus LCPs parciais (9,10 s, 3,66 s e 4,63 s) foram substituídos por esta coleta completa e não devem ser usados como resultado final.

Nenhuma otimização foi aplicada ou publicada nesta etapa. O único arquivo do projeto alterado por esta análise da URL foi este relatório; as medições não exigiram mudança em dependências, componentes, estoque ou painel.

## Otimizações aplicadas — 02/10/2026

Esta seção registra o que saiu do diagnóstico acima e virou código, com os números medidos nesta máquina. Nada foi publicado ainda: o deploy continua sendo o procedimento manual da seção 19.6 do plano.

### O que entrou

**Fotos publicadas pelo painel não são mais antecipadas.** A seção Sobre deixou de pré-carregar a foto remota. O endereço do painel passa a ser trocado assim que a consulta responde, e quem decide a hora do download é o `loading="lazy"` que o `<img>` já tinha. Numa visita que não rola até Sobre, a foto de 556,12 kB deixa de ser pedida; em quem rola, baixa uma foto só, nunca a reserva e a remota. A abertura não mudou: continua com pré-carregamento e `fetchPriority="high"`, porque ali a reserva está na tela e a troca não pode piscar.

O desenho anterior desta correção usava `IntersectionObserver`. Foi descartado depois de três revisões independentes mostrarem que o portão abriria logo na montagem — enquanto a galeria ainda é o parágrafo "Carregando as peças…", a seção Sobre fica a cerca de 1.300 px do topo, não "milhares" — e que qualquer margem menor que o limite do lazy nativo faria o visitante baixar reserva **e** remota.

**Ícones.** `favicon-32.png` (2.231 B) e `apple-touch-icon.png` (18.053 B) substituem o PNG único de 829 × 829 px e 193.796 B. A arte saiu de `public/`, que o Vite publica inteira, e foi para `src/assets/favicon-ritua-source.png`. `public/favicon.png` foi removido: eram 65.521 B idênticos byte a byte a `src/assets/logo.png`, o logotipo horizontal, sem nenhuma referência no projeto e ilegível como ícone de aba.

**Caveat.** Subconjunto latino com todos os acentos do português: 173.404 B → 71.120 B (−59%). O eixo variável 400–700 foi preservado, o que importa porque `src/index.css` usa `font-synthesis: none`. Procedência e comando em `src/assets/fonts/README.md`.

**Marca e carimbo em WebP com alfa.** Logo 65.521 → 19.126 B; carimbo da mão 86.971 → 24.444 B. O logo da barra superior está acima da dobra, então esses 46 kB saem da primeira visita.

**Imagens responsivas.** As três fotos que o site realmente mostra ganharam uma largura menor, escolhida a partir dos breakpoints do CSS (um celular de 430 px lógicos em 2x pede 560 px na galeria, 600 px em Sobre e 700 px na abertura). O `sizes` de cada lugar foi derivado do CSS, inclusive a ampliação no modal, que ocupa 54,5% de um diálogo de no máximo 1000 px. `srcSet` e `sizes` são removidos quando a foto do painel assume o espaço: as variantes são da reserva e serviriam a foto errada.

**Catálogo.** A consulta de um minuto para enquanto a aba está oculta e atualiza no retorno — uma vez só, apesar de `visibilitychange` e `focus` chegarem quase juntos. As fotos passaram a ser agrupadas por peça numa passada, no lugar de um `filter` por produto.

**Envios futuros em WebP.** `src/admin/photos.js` passa a pedir WebP ao canvas e só cai para JPEG quando o navegador não codifica — a decisão olha o que voltou, porque onde o WebP não existe o `toDataURL` devolve um PNG caladamente, e PNG de fotografia é pior que o JPEG de hoje. A extensão gravada no storage passou a seguir o formato real, em vez do `.jpg` fixo. Os dois buckets já aceitavam `image/webp` desde a criação.

### Achado não previsto no diagnóstico

`createSignedUrls` devolve um token novo a cada chamada. Como a vitrine reassinava a cada atualização, o endereço de **toda** foto do catálogo mudava de minuto em minuto — e endereço diferente é recurso diferente para o cache do navegador. A assinatura agora é reaproveitada enquanto vale, com 180 s de folga antes dos 900 s. É seguro porque o caminho no bucket é imutável: o envio usa `upsert: false` com nome novo, e caminho removido sai da tabela. O painel continua assinando na hora, porque duplicar uma peça rebusca a foto pela própria URL.

O efeito esperado é o navegador parar de rebaixar as fotos do catálogo a cada ciclo. Isso é raciocínio sobre o cache HTTP, não medição: precisa ser confirmado no painel Rede do site publicado.

### Medições que mudaram uma decisão

Reencodar as fotos locais na largura cheia **não** foi feito, porque não compensa. Comparando cada candidato com uma referência sem perda gerada pelo mesmo caminho, o arquivo publicado hoje já está em PSNR 35,50 dB; o `cwebp -m 6` só alcança essa qualidade por volta de q86, e aí entrega 283 kB contra os 306 kB atuais numa foto e **mais** bytes em duas outras. Os arquivos já estavam bem comprimidos. O ganho real estava nas variantes menores, não na recompressão.

A troca de JPEG por WebP foi medida, não estimada: na mesma qualidade objetiva, o WebP fica entre 6% e 29% menor, conforme o esforço do codificador e a foto. Não são os "25% a 35%" que se costuma repetir.

A largura máxima do preparo **não** foi reduzida. A abertura usa `object-fit: cover` num quadro de altura fixa (`Hero.css`): numa foto deitada é a altura que precisa cobrir 1.164 px em tela 2x, então cortar a largura faria o navegador ampliar a foto e perder nitidez — o oposto do objetivo.

### O que isto deve economizar, e o que não dá para prometer

Numa primeira visita em celular, sem rolagem, deixam de ser baixados cerca de **932 kB**: favicon (191,6 kB), Caveat (102,3 kB), logo (46,4 kB), foto remota de Sobre (556,1 kB) e a reserva menor da abertura (35,8 kB). Essa é a soma dos arquivos, não uma nova medição dos 2,39 MB da tabela acima — esse número só pode ser refeito no site publicado, pelo mesmo protocolo de três execuções móveis.

As duas fotos de 1,04 MB que estão no ar continuam como estão. Não mexemos em dados de produção da cliente: o pipeline novo vale para envios futuros, e o painel agora avisa que reenviar a mesma foto aplica a versão mais leve. Enquanto isso não acontecer, o LCP da abertura continua sendo dominado por uma foto de 480,34 kB.

### Peso morto que ficou de propósito

`ritua-1672.webp`, `ritua-2200.webp` e `ritua-2219.webp` somam 674 kB, são importadas por `src/data/catalog.js` e vão para o `dist`, mas nunca aparecem: as peças delas ficam fora de `staticProducts`, que só exporta `outras-formas` e `um-canto-do-ritual`. Não custam nada a quem visita, porque o navegador nunca as pede, mas pesam no repositório e no deploy. Apagá-las significa apagar textos de peça escritos à mão, o que é decisão da loja, não de uma otimização.

### Como conferir antes de publicar

`npm run test` sai de 27 para 42 testes. `npm run build` precisa passar. No navegador, com a aba Rede aberta: (1) carregar a página sem rolar e confirmar que nenhuma URL do Supabase para a foto de Sobre aparece, nem logo no primeiro quadro nem depois da galeria pintar; (2) rolar até Sobre e confirmar que baixa uma foto só; (3) clicar em "O studio" no menu e conferir que a foto chega sem a seção ficar muito tempo com a reserva; (4) deixar a aba oculta por dois minutos e confirmar que não há consulta ao catálogo, e uma só no retorno; (5) comparar dois ciclos de 60 s e confirmar que a URL assinada de cada foto não mudou; (6) conferir ícone na aba, acentos nas legendas manuscritas, carrossel, ampliação e o painel inteiro (salvar peça, duplicar, excluir, trocar as duas fotos do site).
