# Plano de ajustes — feedback da Duda

Status: ajustes confirmados implementados em 22/09/2026. Build de produção e verificação de whitespace (`git diff --check`) concluídos sem erros. Preview local aprovado pelo usuário antes do envio ao GitHub. A verificação automatizada de interações no navegador não foi executada nesta sessão. Os pontos ainda não esclarecidos do vídeo permanecem pendentes.

## 1. Abertura do site

Arquivo principal: `src/components/Hero.jsx`.

- Manter o título “Seu momento, seu ritual.”.
- Acrescentar uma pequena folha de maconha ao lado de “ritual”, conforme o pedido. Usar um elemento gráfico coerente com as cores e o desenho da marca; conferir alinhamento e quebra de linha no celular.
- Substituir a descrição atual pelos dois parágrafos enviados:

  > Se você gosta de peças diferentes e cheias de personalidade, chegou no lugar certo.
  >
  > Piteiras de vidro, cases de isqueiro e cuias artesanais, feitas para quem valoriza exclusividade e qualidade.

- Alterar o botão “Conhecer as peças” para “Conheça nossas peças”, mantendo o destino da galeria.
- Remover a frase “Detalhes que fazem o ritual.” e a seta que a acompanha, conforme a marcação em vermelho.

## 2. Apresentação das piteiras

Arquivo principal: `src/components/Gallery.jsx`.

- Reorganizar a apresentação para destacar o título “Piteiras de vidro”, conforme a anotação do print.
- Usar a descrição curta destacada no site de referência:

  > Mais conforto na sessão, fluxo mais limpo e sabor preservado do início ao fim.

- Inserir “Piteiras Premium” como subtítulo antes dos produtos correspondentes.
- Ajustar a hierarquia para separar a apresentação de piteiras da apresentação de cases. Hoje as duas aparecem juntas em `gallery__featured`, sob uma introdução genérica.
- Preservar as indicações atuais de produto de exemplo, piteiras em breve e cases indisponíveis enquanto não houver novas informações de disponibilidade.
- A posição exata dos novos títulos é uma interpretação das anotações; conferir se o vídeo esclarece essa organização.

## 3. Introdução das cuias

Arquivo principal: `src/components/Gallery.jsx`.

- Manter o título “Nossas cuias.”.
- Substituir “Feitas à mão em cerâmica plástica, com combinações de cores e detalhes que expressam o universo da Rituá.” pela frase destacada:

  > Uma cuia feita para ser só sua — e deixar a sua sessão ainda mais especial.

## 4. Texto completo das cuias na seção “Feitas à mão. De verdade.”

Arquivo principal: `src/components/About.jsx`, seção `#sobre`.

Local confirmado pelo usuário a partir do vídeo: o texto da primeira imagem deve entrar na apresentação “Feitas à mão. De verdade.”. Substituir os parágrafos atuais que começam com “Cor misturada, forma criada...” e “Trabalhamos a cerâmica plástica à mão...” pelo conteúdo abaixo. Manter o título e a composição visual da seção.

Texto a incorporar nessa apresentação:

> Uma cuia feita para ser só sua — e deixar a sua sessão ainda mais especial.
>

> Cada cuia nasce uma por vez, com combinações de cores, formas e detalhes que fazem dela uma peça única.
>
> O material é levemente maleável, não gruda e ajuda a aproveitar melhor a sua crema, evitando desperdícios.
>
> Você também pode personalizar a sua com seu nome e escolher as cores que mais combinam com você e seu kit.

Elementos adicionais presentes na referência, ainda sem pedido inequívoco nos prints:

- Título “Cuias Studio Rituá” e identificação “Peça artesanal”.
- Botão “Pedir minha cuia personalizada”.
- Aviso sobre o destaque do Instagram com peças disponíveis a pronta entrega.

Tratar esses elementos como pontos a esclarecer pelo vídeo, especialmente a disponibilidade a pronta entrega. O pedido confirmado é a substituição do texto na seção de apresentação; não prevê alterações nos modais dos produtos. A frase curta na galeria continua prevista no item 3.

## 5. Complementos do vídeo — pendentes

- [ ] Registrar os novos pedidos quando o usuário trouxer o resumo ou conteúdo do vídeo.
- [ ] Identificar quais pedidos acrescentam, substituem ou esclarecem os itens acima.
- [x] Confirmar o local do texto completo das cuias: seção “Feitas à mão. De verdade.”, em `About.jsx`.
- [ ] Consolidar a estrutura das piteiras.
- [ ] Atualizar eventuais informações sobre produtos, fotos e disponibilidade.

O vídeo mencionado é uma fonte de feedback; ainda não existe pedido para incorporá-lo como mídia no site.

## 6. Sequência de implementação e conferência

1. Consolidar os pedidos dos prints com os pontos do vídeo.
2. Atualizar textos e elementos da abertura.
3. Organizar títulos e descrição das piteiras.
4. Atualizar a introdução das cuias na galeria e substituir o texto da seção “Feitas à mão. De verdade.”.
5. Ajustar os estilos necessários em `Hero.css`, `Gallery.css` e `About.css`, preservando a identidade atual da Rituá.
6. Conferir celular e desktop: quebras de texto, folha junto ao título, espaçamentos e rolagem dos detalhes.
7. Verificar o botão da galeria, links do Instagram, abertura e fechamento dos detalhes e navegação do carrossel.
8. Executar o build antes de concluir a implementação.

Os prints do site anterior orientam os textos destacados. Desconto de 10%, filtros e demais elementos não assinalados não entram automaticamente no escopo.

## 7. Implementação realizada

- [x] Atualizar os dois parágrafos da abertura e o botão “Conheça nossas peças”.
- [x] Adicionar uma folha decorativa em SVG, na cor da marca, junto de “seu ritual.”.
- [x] Remover a frase “Detalhes que fazem o ritual.” e sua seta.
- [x] Separar as apresentações de piteiras e cases, com títulos próprios.
- [x] Inserir “Piteiras de vidro”, a descrição solicitada e “Piteiras Premium” antes do produto.
- [x] Preservar os avisos de exemplo e disponibilidade dos produtos.
- [x] Atualizar a frase de apresentação em “Nossas cuias.”.
- [x] Substituir os parágrafos em “Feitas à mão. De verdade.” pelo texto completo da referência.
- [x] Executar `npm run build` e `git diff --check`.
- [x] Disponibilizar preview local e obter aprovação visual do usuário.
- [ ] Verificar sistematicamente as interações no navegador em celular e desktop.

Botão de personalização, aviso de pronta entrega e mudança do título para “Cuias Studio Rituá” continuam fora da implementação enquanto pendentes de esclarecimento, conforme o item 4.

## 8. Textos da cliente — seção “Sobre as peças”

- [x] Substituir os quatro primeiros itens do FAQ pelos textos enviados pela cliente: “Sobre as piteiras”, “Sobre as cuias”, “Quero uma cuia, como faço?” e “Como faço uma encomenda personalizada?”.
- [x] Informar vidro borossilicato e detalhes das versões Premium, incluindo prata 925.
- [x] Atualizar a descrição da cerâmica plástica e explicar os drops e o destaque “Disponíveis” no Instagram.
- [x] Informar encomendas de cuia e case pela DM, pagamento de 50% no início e 50% na finalização, com prazo de até 6 dias.
- [x] Manter o item de contato e os links existentes para o Instagram.
- [x] Acrescentar “As peças voltam ao estoque?” com o texto enviado sobre drops limitados e a possibilidade de as peças não voltarem.

O texto recebeu apenas correções de acentuação e pontuação e remoção da entidade HTML residual `&#x20;`. As informações de disponibilidade na galeria permanecem como estavam; o envio da cliente atualiza o conteúdo do FAQ.

## 9. Faixa e espaçamento da galeria — novo print da Duda

- [x] Atualizar a faixa para “Feito à mão • Drops exclusivos • Peças únicas • Cases & cuias • Piteiras artísticas”.
- [x] Remover o texto “As peças” acima de “Piteiras de vidro”.
- [x] Reduzir o espaço no topo da galeria para 56px no desktop e 32px no celular.


## 10. Painel de demonstração — branch `feat/painel-ritua`

- [x] Criar uma área separada em `/#/admin`, carregada sob demanda.
- [x] Criar cadastro, edição, duplicação, fotos, filtros, rascunhos e vitrine de demonstração.
- [x] Implementar reservas, vendas, reposição, retirada, cancelamento e histórico com reversão.
- [x] Salvar dados fictícios no navegador e informar os limites do modo de demonstração.
- [x] Preparar migração SQL com permissões, histórico transacional e fotos protegidas para rascunhos.
- [x] Documentar a futura conexão em `supabase/README.md` e o uso em `src/admin/README.md`.
- [x] Validar nove testes automatizados de estoque e build com o caminho do Pages.
- [x] Validar migração, permissões e operações em PostgreSQL local via PGlite, simulando os esquemas Auth e Storage. Não substitui os testes em Supabase.
- [x] Conferir no Chromium os fluxos de cadastro com foto, reserva, venda, reversão, duplicação, persistência e navegação pública, além dos layouts em 390px e 1440px.
- [x] Conectar Auth, Storage e banco ao projeto Supabase (ver item 13).
- [x] Validar permissões e concorrência no Supabase real antes de publicar o painel de produção (ver item 13).

Esta etapa não altera os produtos do site público. A publicação do painel de demonstração no GitHub Pages foi autorizada posteriormente pelo usuário. Reservas nesta versão controlam quantidades; não há cadastro de pedidos ou clientes.

## 11. Correções na prévia local

- [x] Alinhar o início das fotos de piteiras e cases no desktop, compartilhando as linhas do cabeçalho e do subtítulo “Piteiras Premium”. Manter o empilhamento no celular.
- [x] Conferir alinhamento no Chromium em 601, 800, 1440 e 1920px, e empilhamento em 390px. Build aprovado.
- [x] Corrigir a rolagem ao alternar entre painel e site: “Ver site” volta ao topo; destinos de seções continuam respeitados.

Correções incluídas na publicação autorizada do painel de demonstração. O endereço do painel é `https://espi0-bat.github.io/studio-ritua/#/admin`; os dados continuam locais ao navegador, sem login ou sincronização.

## 12. Catálogo organizado por tipo

- [x] Apresentar cases, piteiras e cuias em seções verticais, nesta ordem, com os títulos e a apresentação das cuias preservados.
- [x] Compartilhar a regra de classificação entre a galeria e a vitrine de demonstração do painel. O campo “Tipo de produto” define a seção; editar o tipo move a peça e rascunhos não aparecem.
- [x] Usar um carrossel lateral independente por seção, com repetição circular quando houver duas ou mais peças. Categorias com uma peça exibem o único item sem duplicação artificial; categorias vazias na prévia explicam como adicionar.
- [x] Preservar os avisos de exemplo e indisponibilidade existentes, fotos, modais e conteúdo das demais áreas.
- [x] Validar 12 testes Node e, no navegador, classificação, troca de tipo, rascunhos, carrosséis nos dois sentidos em celular e desktop, modais e ausência de overflow.

O painel ainda usa dados locais de demonstração. A integração do catálogo real depende do projeto Supabase; entrar na organização não conecta automaticamente o site.


## 13. Painel conectado ao Supabase

- [x] Aplicar tabelas, RLS, bucket privado e funções transacionais no projeto Studio Ritua.
- [x] Autorizar o e-mail da proprietária e o e-mail temporário de teste fornecido pelo usuário, sem expor a lista no frontend.
- [x] Implementar acesso pelo link padrão enviado pelo Supabase, retorno ao painel e saída. A personalização de template por código foi rejeitada pelo plano gratuito; o acesso usa link, sem senha.
- [x] Conectar cadastro, revisão de edição, fotos, reservas, vendas, reposição e histórico ao banco.
- [x] Conectar as peças publicadas às categorias do site, preservando a galeria editorial existente sem inventar estoque para suas fotos.
- [x] Manter a demonstração isolada em `/#/admin/demo`.
- [x] Conferir login real sem enviar e-mail, foto privada de rascunho, publicação, acesso público, bloqueio de escrita direta, reserva, venda, reversão, persistência e logout.
- [x] Conferir duas vendas concorrentes e repetição de requisição no Supabase real. Remover os produtos técnicos após os testes.
- [x] Executar 12 testes Node, build e verificação de whitespace.
- [ ] Conferir com os usuários a entrega do link na caixa de entrada e o primeiro acesso pelos próprios e-mails.
- [ ] Retirar a autorização temporária do usuário depois da aprovação dos testes, conforme solicitado.

O teste de login usou geração de link pela API administrativa sem envio de mensagem. Nenhuma chave secreta foi incluída no código ou no Git. A galeria pública consulta novidades ao abrir, ao voltar à aba e a cada minuto. As fotos editoriais antigas continuam separadas dos produtos gerenciados no painel.
