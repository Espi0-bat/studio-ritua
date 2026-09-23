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
