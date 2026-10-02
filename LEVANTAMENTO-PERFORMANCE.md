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
