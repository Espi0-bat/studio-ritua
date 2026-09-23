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

## 14. Novo feedback da Duda — ficha técnica e classificação dos produtos

**Status: implementado e validado.** Campos integrados ao painel, demonstração, Supabase e ficha pública. Publicação incluída nesta entrega.

### 14.1. Pedidos identificados nos prints

1. Permitir indicar se o produto é uma **peça única**, na identificação curta acima do nome (hoje “PITEIRA · STUDIO RITUÁ”).
2. Acrescentar às piteiras os campos **comprimento**, **diâmetro** e **modelo**.
3. Acrescentar aos cases os campos **compatível com** e **acompanha isqueiro**.
4. Corrigir o caso do produto “Case Cogumelo”, que apareceu em “Nossas cuias.” e com a identificação “CUIA · STUDIO RITUÁ”.

Preservar a identidade visual, a apresentação das cuias, a ordem cases → piteiras → cuias, os carrosséis laterais circulares, as fotos, os preços e o botão de contato. Os prints não solicitam reformulação do layout nem uma nova categoria “Isqueiro”: a peça apresentada é um case, e a inclusão do isqueiro deve ser uma informação própria.

### 14.2. Prioridade 1 — tornar explícita a escolha do tipo

**Constatação no código:** o formulário de produto novo começa com `category: 'Cuia'` em `src/admin/Admin.jsx`. A seção e a identificação do detalhe usam o mesmo campo `category` em `src/services/catalogSections.js`.

Isso é compatível com o print: um case cadastrado sem trocar o tipo seria mostrado como cuia. É uma hipótese sustentada pelo código, não uma confirmação de como a Duda preencheu o formulário. Antes de corrigir o registro, consultar a categoria salva no Supabase e reproduzir o cadastro. Não classificar automaticamente pelo nome ou pela foto.

- [x] Fazer produtos novos começarem com “Selecione o tipo”, sem categoria pré-selecionada.
- [x] Exigir uma escolha entre Case, Piteira e Cuia antes de salvar.
- [x] Mostrar uma orientação curta após a seleção: por exemplo, “Esta peça aparecerá em Cases de isqueiro”.
- [x] Manter a categoria atual ao editar ou duplicar uma peça, deixando o seletor visível.
- [x] Conferir o registro “Case Cogumelo”; se estiver salvo como Cuia, corrigir somente seu tipo para Case, preservando fotos, preço, descrição e histórico de estoque.
- Alternativa não necessária: a consulta confirmou o tipo Cuia no registro. Não houve evidência de falha no agrupamento.

**Aceite:** a mesma categoria aparece no cadastro, na seção pública e na identificação do detalhe. Alterar o tipo move a peça entre as seções sem duplicar o cadastro.

### 14.3. Prioridade 2 — campos específicos no cadastro

Mostrar os campos conforme o tipo selecionado, para não sobrecarregar o formulário.

| Aplicação | Campo no painel | Comportamento proposto |
| --- | --- | --- |
| Todos os tipos | Peça única | Marcação opcional; quando marcada, acrescentar “Peça única” à identificação acima do nome. Desmarcada, não exibir uma frase negativa. |
| Piteira | Comprimento (cm) | Número decimal positivo, opcional. Aceitar entrada com vírgula e apresentar a unidade no site. |
| Piteira | Diâmetro | Número decimal positivo com unidade explícita, cm ou mm. Não inferir se a medida é interna ou externa. |
| Piteira | Modelo | Texto curto opcional; não criar uma lista fechada sem os modelos reais fornecidos pela Duda. |
| Case | Compatível com | Texto curto opcional para marca/modelo/tamanho do isqueiro, conforme informação da Duda. |
| Case | Acompanha isqueiro? | Seleção “Não informado”, “Sim” ou “Não”. Não assumir “Não” nos cadastros antigos. |
| Cuia | Sem campos técnicos novos nesta etapa | Manter os campos atuais e oferecer a indicação de peça única. |

“Peça única” é uma informação editorial, independente do saldo atual: um produto com estoque 1 não deve ser marcado automaticamente como único. A marcação também não deve alterar estoque, reservas ou vendas.

As unidades e o formato de “Modelo” acima são propostas de interface. O pedido confirmado é poder informar as medidas e o modelo; os prints não definem a unidade do diâmetro nem uma lista de opções para modelo.

### 14.4. Prioridade 3 — apresentação nos detalhes

- [x] Usar a área já existente de especificações (`gallery__specs`) em `src/components/Gallery.jsx`, sem criar um novo desenho para o modal.
- [x] Apresentar os dados entre a descrição e o preço, seguidos do botão de contato.
- [x] Piteira: Comprimento, Diâmetro e Modelo, nessa ordem.
- [x] Case: Compatível com e Acompanha isqueiro, nessa ordem.
- [x] Mostrar somente informações preenchidas; preservar valores explícitos como “Não” para a inclusão do isqueiro.
- [x] Usar uma identificação como “PITEIRA · PEÇA ÚNICA · STUDIO RITUÁ” quando a marcação estiver ativa; manter a identificação atual quando não estiver.
- [x] Permitir quebra de linha dessa identificação no celular sem encobrir o nome do produto.
- [x] Ao trocar o tipo, renderizar e validar somente os campos aplicáveis à categoria atual; não exibir medidas de piteira em um case.

### 14.5. Persistência e compatibilidade

- [x] Criar uma **nova migração** Supabase, sem reaplicar as migrações já executadas.
- [x] Adicionar campos opcionais para peça única, comprimento em cm, valor/unidade de diâmetro, modelo, compatibilidade e inclusão do isqueiro. Cadastros antigos permanecem sem informação técnica até edição.
- [x] Atualizar `ritua_save_product` para salvar os campos na mesma transação, preservando autorização, revisão concorrente e idempotência.
- [x] Validar números positivos, combinações de valor/unidade e limites dos textos também no banco.
- [x] Atualizar leitura e gravação em `src/services/liveCatalog.js`, formulário/duplicação em `src/admin/Admin.jsx` e montagem de `tag`/`specs` em `src/services/catalogSections.js`.
- [x] Atualizar o modo de demonstração e sua validação em `src/services/demoCatalog.js` e `src/services/inventory.js`, aceitando registros locais antigos sem os novos campos.
- [x] Incluir os campos na exportação e preservá-los ao editar estoque ou duplicar produtos.
- [x] Manter intactas as especificações e referências dos exemplos editoriais já existentes no site.

### 14.6. Sequência de execução e conferência

1. Conferir o tipo salvo do case apontado e ajustar o formulário para exigir seleção explícita.
2. Preparar a migração e as validações para os novos campos opcionais.
3. Atualizar formulário, adaptadores e demonstração.
4. Exibir ficha técnica e identificação de peça única nos detalhes.
5. Testar cadastro e edição de cada tipo, troca de categoria, duplicação, vírgula decimal, campos vazios, unidade do diâmetro e os três estados de “Acompanha isqueiro”.
6. Testar cadastros antigos, persistência após recarregar, conflitos de edição e manutenção do estoque/histórico.
7. Conferir celular e desktop: identificação longa, especificações, preço, contato e carrosséis. A marcação de peça única não pode alterar a disponibilidade.
8. Aplicar a migração antes de publicar o frontend que depende dos campos novos; verificar no banco real com registros de teste identificados e limpar somente esses registros.
9. Publicar a atualização e conferir os dois exemplos apontados pela Duda, sem inventar medidas ou compatibilidade ausentes nos prints.

**Fora deste pedido:** alterar regras de preço/estoque por ser peça única, classificar produtos pelo nome/foto, cadastrar novas categorias, redesenhar o site ou remover o acesso temporário de testes antes da aprovação combinada.


### 14.7. Resultado da implementação

- Confirmado no banco: “Case Cogumelo” estava com categoria Cuia. Corrigido para Case, alterando somente o tipo (e a revisão automática), sem modificar fotos, descrição, preço ou histórico.
- Criada e aplicada a migração `202609230003_product_details.sql`. Clientes antigos podem omitir os campos novos sem apagar valores existentes; campos explicitamente vazios são removidos.
- 17 testes Node aprovados; três migrações verificadas em PostgreSQL local via PGlite, incluindo validação, idempotência e conflitos.
- Conferência no Chromium em celular e desktop: tipo obrigatório, medidas com vírgula, ficha antes do preço, peça única, troca de categoria e “Acompanha isqueiro: Não”.
- Teste real no Supabase com produto técnico próprio: foto privada, gravação dos campos, publicação por categoria, troca de tipo, estoque, persistência e saída. Produto técnico removido ao terminar, sem remover produtos da Duda.
- Build e whitespace dos arquivos-fonte aprovados. Medidas/modelo/compatibilidade das peças existentes continuam em branco até serem preenchidos pela Duda.

## 15. Vitrine demonstrativa por categoria e destaque de peça única

**Status: implementação autorizada e concluída localmente; pendências jurídicas detalhadas abaixo.**

### 15.1. Demonstrativos como alternativa ao catálogo disponível

- [x] Manter apenas um demonstrativo por categoria: Case, Piteira e Cuia; reduzir as cinco imagens editoriais de cuias à foto “Um canto do ritual”.
- [x] Ocultar o demonstrativo quando existir produto real publicado com estoque na mesma categoria. Exemplo: o Case Cogumelo deve ocultar “Outras formas”.
- [x] Quando a última unidade do último produto publicado da categoria for vendida, reapresentar seu demonstrativo. Novo estoque volta a ocultá-lo.
- [x] Rascunhos não ocultam demonstrativos. Produtos reservados continuam visíveis como “Reservado”; reserva não equivale a venda.
- [x] Proposta: retirar produtos vendidos da vitrine pública, preservando cadastro e histórico no painel.
- [x] Identificar o demonstrativo como “Vitrine · Sem disponibilidade”, sem preço ou indicação de venda imediata.
- [x] Remover avisos de exemplo ou “Piteiras em breve” quando houver produtos reais na seção.
- [x] Preservar o desenho e a ordem das seções. Manter a rolagem lateral infinita com vários itens; com apenas um, dispensar controles e convite para deslizar.
- [x] Não interpretar carregamento ou falha de conexão como estoque esgotado.

### 15.2. Destaque visual de “Peça única”

**Pedido do usuário:** diferenciar “Peça única” do restante da identificação, usando vermelho ou outro tratamento que chame atenção.

- [x] Proposta visual: apresentar “Peça única” como um pequeno selo com fundo vermelho da marca e texto creme, acima do nome do produto, junto da identificação de categoria e Studio Rituá.
- [x] Manter categoria e nome do studio com o tratamento discreto atual, destacando somente o selo.
- [x] Exibir o selo apenas quando a opção “Peça única” estiver marcada no painel, para qualquer categoria. Não inferir exclusividade pela quantidade em estoque.
- [x] Preservar o texto explícito, garantir contraste e acomodar a identificação no celular sem sobreposição ou corte.
- [x] A mudança é visual: não altera preço, estoque, reserva ou regras de venda.

### 15.3. Conferência prevista após autorização

Validar as transições por categoria (publicar, vender última unidade, repor, reservar e despublicar), preservação do histórico, ausência de demonstrativos duplicados e apresentação do selo em celular e desktop. Foto de cuia definida na seção 15.5; execução e validação registradas na seção 15.6.


### 15.4. Privacidade, cookies e informações da loja

Implementação autorizada pelo usuário junto com a seção 15. A revisão abaixo é técnica e preliminar, não certifica conformidade jurídica integral.

- Auditoria do código: sem analytics, pixel, embeds sociais ou fontes remotas. Supabase mantém sessão administrativa no navegador; demonstração usa armazenamento local. GitHub Pages e Supabase recebem requisições e podem tratar dados técnicos de conexão.
- Não adicionar banner genérico de consentimento ao cenário atual. Se houver rastreadores opcionais no futuro, revisar bases legais, bloqueio prévio quando aplicável, recusa e revogação, antes de ativá-los.
- Adicionar aviso acessível no rodapé com finalidades, serviços usados, armazenamento funcional e contato para direitos: studioritua@gmail.com.
- **Pendente com Duda:** identificação legal do fornecedor, documento aplicável e endereço de atendimento/publicação; confirmar condições de pagamento, frete, entrega, troca, defeito, cancelamento e arrependimento. Vendas por direct não dispensam automaticamente informações de oferta e direitos do consumidor. Não inventar esses dados nem exceções para peças personalizadas.
- **Pendente de revisão:** completar identificação do controlador, bases legais, retenção efetiva, compartilhamentos e transferências internacionais conforme a operação e os contratos dos provedores. O aviso técnico inicial não substitui essa revisão.
- **Foto de terceiro:** confirmar licença/autorização da foto de piteira da Madruga Shop ou substituí-la por foto própria autorizada; crédito não comprova licença.
- Fontes consultadas: [Guia ANPD de cookies](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais), [LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm), [Decreto 7.962/2013, arts. 2 e 5](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm).

### 15.5. Decisões de implementação

- Usar a foto existente “Um canto do ritual”, com uma cuia rosa, como único demonstrativo de cuias. Arquivos e demais fotos originais são preservados.
- Filtrar somente a apresentação pública: estoque positivo (incluindo reservado) e publicação ativa ocultam o demonstrativo da categoria; estoque zero não aparece na vitrine. Histórico e painel permanecem intactos.
- Aguardar a primeira leitura bem-sucedida antes de escolher demonstrativos. Em erro posterior, preservar o último catálogo carregado.
- Selo vermelho com texto creme apenas em peças marcadas como únicas; manter a identificação acessível e responsiva.


### 15.6. Resultado local

- Vitrine condicional por categoria implementada, com um único demonstrativo de cuia e sem alteração no banco ou nos estoques reais.
- Selo de peça única e aviso técnico de privacidade implementados. Sem banner de consentimento para rastreadores inexistentes. **Atualização:** o aviso de privacidade foi removido do rodapé pelo usuário em 23/09/2026 (commit `d2d1073`) e reescrito na seção 19.
- 20 testes automatizados aprovados, incluindo publicação por categoria, reserva, última venda, reposição e múltiplos produtos.
- Build de produção aprovado. Teste de navegador com respostas simuladas em 390 e 1440 px aprovado: selo, ocultação/retorno de demonstrativo, retenção do catálogo após erro, abertura do aviso e ausência de transbordamento horizontal.
- Pendências de informações legais e direitos de imagem continuam abertas na seção 15.4. Não foram inventados dados do fornecedor nem regras comerciais.
- Alterações desta etapa ainda não publicadas no GitHub Pages.

## 16. Separação das piteiras por linha (Premium / Clássica) e nova ordem das seções

**Status: implementado localmente em 23/09/2026; migração Supabase ainda não aplicada e alterações ainda não publicadas.** Pedido recebido pela Duda no WhatsApp em 23/09/2026. Resultado detalhado na seção 16.7.

### 16.1. Pedido da Duda (texto original)

> da p gnt separar as piteiras? pq tem as "premium" e outras mais simples q são as classicas
>
> ai seria tipo
>
> Piteiras de vidro
>
> Piteiras Premium
> Piteiras Classicas
>
> Cases de isqueiro

E, em seguida: "vou catalogar lá pra ficar mais fácil" e "ai acho q seria bom ser as piteiras antes da cases, pq é oq mais vou ter quando chegar".

Leitura do pedido:
1. Dentro da seção "Piteiras de vidro", separar os produtos em duas subseções: **Piteiras Premium** e **Piteiras Clássicas**.
2. Duda vai classificar cada piteira no painel (`/#/admin`) — ou seja, precisa existir um campo para isso no cadastro.
3. Trocar a ordem das seções na vitrine: piteiras devem aparecer **antes** dos cases de isqueiro (hoje a ordem é cases → piteiras → cuias, fixada na seção 12 deste plano; este pedido substitui aquela decisão de ordem, não a de agrupar por tipo).

### 16.2. Constatação no código atual

- `src/services/inventory.js` define `categories = ['Cuia', 'Case', 'Piteira']` — enum fixo, sem subcategoria/linha.
- `src/services/catalogSections.js` define título e ordem das seções; ordem atual: Case → Piteira → Cuia.
- O subtítulo "Piteiras Premium", hoje exibido em `src/components/Gallery.jsx` (linha ~61), **não é um dado real do produto**: aparece automaticamente quando o item tem um campo `reference` (usado só na foto de referência da Madruga Shop). Não existe hoje nenhuma forma de a Duda marcar uma piteira como Premium ou Clássica.
- Não existe campo de material/linha (`vidro`, `premium`, `clássica`) no banco (`ritua_products`), na RPC `ritua_save_product` nem no formulário do painel (`src/admin/Admin.jsx`).
- Este pedido não estava previsto nem no escopo da seção 14 (que listava "cadastrar novas categorias" como fora do pedido daquela rodada).

### 16.3. Mudanças propostas

1. **Campo novo — linha da piteira.** Adicionar campo opcional (aplicável somente à categoria Piteira), com valores "Premium", "Clássica" ou não informado. Produtos antigos ficam sem valor até a Duda editar.
2. **Painel (`Admin.jsx`).** Quando a categoria selecionada for Piteira, mostrar um seletor "Linha: Premium / Clássica / Não informado", seguindo o mesmo padrão dos campos condicionais já existentes (comprimento, diâmetro, modelo).
3. **Persistência.** Nova migração Supabase (sem reaplicar as existentes), atualizando `ritua_products`, a RPC `ritua_save_product`, `src/services/liveCatalog.js`, `src/services/demoCatalog.js` e a validação em `src/services/productDetails.js`/`src/services/inventory.js`. Cadastros antigos sem o campo continuam válidos.
4. **Ordem das seções (`catalogSections.js`).** Trocar a ordem para **Piteira → Case → Cuia**. As cuias continuam por último — não fazem parte deste pedido.
5. **Agrupamento na vitrine (`Gallery.jsx`).** Remover a regra atual baseada em `item.reference` e passar a agrupar de verdade dentro da seção "Piteiras de vidro": subtítulo "Piteiras Premium" primeiro, depois "Piteiras Clássicas", usando o novo campo de linha. Peças sem linha definida (inclusive as antigas) entram em "Piteiras Clássicas" por padrão, para não desaparecerem da vitrine enquanto a Duda não reclassifica cada uma.
6. **Estilo.** Reaproveitar o CSS do subtítulo "Piteiras Premium" já existente para a nova subseção "Piteiras Clássicas", sem redesenhar o layout.
7. **Preservar** carrosséis laterais por seção/subseção, avisos de exemplo/indisponibilidade, fotos, modais, selo de peça única e ficha técnica (comprimento/diâmetro/modelo) já implementados na seção 14.

### 16.4. Sequência de execução e conferência

1. Preparar e aplicar a migração Supabase com o novo campo de linha, validando valores aceitos.
2. Atualizar formulário do painel, adaptadores (`liveCatalog.js`, `demoCatalog.js`) e validação (`inventory.js`, `productDetails.js`).
3. Atualizar `catalogSections.js` (nova ordem) e `Gallery.jsx` (agrupamento real por linha, remoção da regra baseada em `reference`).
4. Ajustar estilos herdados do subtítulo "Piteiras Premium" para a subseção "Piteiras Clássicas".
5. Testar cadastro/edição de piteira com cada valor de linha, produtos antigos sem linha (devem cair em Clássicas), troca de categoria, e os dois modos (demonstração e Supabase real).
6. Conferir celular e desktop: nova ordem das seções, subtítulos dentro de piteiras, carrosséis, ausência de overflow.
7. Executar `npm run build` e a suíte de testes Node antes de concluir.

### 16.5. Fora deste pedido

Alterar a ordem das cuias, criar categoria nova além da subdivisão de piteiras, mudar preço/estoque por linha, ou classificar automaticamente por nome/foto. Não inventar quais peças existentes são Premium ou Clássicas — a classificação é responsabilidade da Duda, feita no painel.

### 16.6. Confirmação adicional da Duda — campos de comprimento, diâmetro e modelo

Print recebido em 23/09/2026 (mensagem antiga da Duda, reenviada por ela para reforçar o pedido junto com a separação por linha): "ficou faltando só aquela parte p colocar os Cm e o diâmetro dela" + "e a opção Modelo" + lista "comprimento / diâmetro / modelo".

**Isto não é um pedido novo.** Comprimento (cm), diâmetro (com unidade cm/mm) e modelo para piteiras já constam como implementados e validados na seção 14.3–14.7 deste plano, no cadastro (`Admin.jsx`), na ficha pública (`Gallery.jsx`) e no banco (migração `202609230003_product_details.sql`).

- [x] Verificado no código e no histórico: os campos existem em `Admin.jsx` (linhas 54–63, condicionais a `category === 'Piteira'`), em `productDetails.js` (`normalizeDetails`/`productSpecs`) e na migração `202609230003_product_details.sql`. O commit `24889e6` ("Adiciona ficha técnica por tipo e indicação de peça única") é ancestral do HEAD atual da branch `feat/painel-ritua` (`d2d1073`), e o `gh-pages` já publicou esse HEAD (deploy `3a14804`, 23/09/2026 17:19). **Os campos já estão em produção.**
- [x] Conclusão: não é regressão nem escopo novo. A Duda provavelmente só não preencheu comprimento/diâmetro/modelo em cada piteira já cadastrada. Orientar: editar cada piteira no painel (`/#/admin`) e preencher os três campos — eles já aparecem no formulário quando o tipo é "Piteira".

### 16.7. Resultado da implementação

- Campo `line` (Premium / Classica) criado como opcional e exclusivo de piteiras, validado em `normalizeDetails` (`src/services/productDetails.js`) e exportado como `piteiraLines`. Trocar o tipo da peça limpa o campo, como já acontece com as demais informações por categoria.
- Migração `supabase/migrations/202609230004_piteira_line.sql` criada: coluna `line` com `check (line in ('Premium','Classica'))`, restrição `ritua_piteira_line_details` (só piteiras podem ter linha) e `ritua_save_product` atualizada para gravar o campo na mesma transação, preservando autorização, revisão concorrente e idempotência. Clientes antigos que omitem a chave preservam o valor salvo.
- Painel (`src/admin/Admin.jsx`): seletor "Linha" com Premium, Clássica e "Não informado", exibido apenas quando o tipo é Piteira. A dica abaixo do tipo agora informa também a linha: "Esta peça aparecerá em Piteiras de vidro, na linha Piteiras Premium."
- Ordem das seções alterada para **Piteira → Case → Cuia** em `src/services/catalogSections.js`, substituindo a ordem fixada no item 12. As cuias continuam por último.
- `groupCatalog` passou a devolver subgrupos (`groups`) para categorias com linhas configuradas. Piteiras sem linha definida entram em "Piteiras Clássicas", a última da lista, para não sumirem da vitrine antes da reclassificação.
- Galeria (`src/components/Gallery.jsx`): cada linha vira uma subseção com título próprio e carrossel independente. A regra antiga que mostrava "Piteiras Premium" com base no campo `reference` foi removida; o aviso "Vitrine demonstrativa" agora acompanha apenas o subgrupo que contém a peça de exemplo.
- A peça editorial `piteira-exemplo` (referência Madruga Shop) recebeu `line: 'Premium'` em `src/data/catalog.js`, preservando a apresentação atual.
- 23 testes Node aprovados, incluindo os novos casos de agrupamento por linha, adaptador e validação. Os testes de vitrine deixaram de depender da posição da categoria na lista. Build de produção e `git diff --check` aprovados.
- Migração `202609230004_piteira_line.sql` **aplicada no Supabase em 23/09/2026** via `supabase db query --linked --file`, seguindo o mesmo procedimento das anteriores (sem `db push`). Conferido no banco: coluna `line` criada e há 1 piteira cadastrada, que segue em "Piteiras Clássicas" até receber uma linha.
- Acesso temporário de teste reativado para `moutinhoezer@gmail.com` em `ritua_admin_emails`, com `temporary = true`, a pedido do usuário.
- Aprovado pelo usuário e publicado em 23/09/2026: commit `869c02f` na branch `feat/painel-ritua` e build publicado no GitHub Pages (`gh-pages`, commit `2d0bd09`), pelo procedimento manual das entregas anteriores (`npm run build -- --base=/studio-ritua/` e cópia do `dist`).
- **Pendente:** conferir no navegador em celular e desktop; a Duda classificar cada piteira no painel; e **retirar o acesso temporário** (`delete from public.ritua_admin_emails where email='moutinhoezer@gmail.com';`) depois da aprovação.

## 17. Incidente — login do painel desativado para todos

**Status: causa identificada e corrigida no repositório; correção ainda não aplicada no Supabase.**

Ao tentar entrar no painel em 23/09/2026, o pedido de link falhou. A API do Supabase respondeu `HTTP 422 email_provider_disabled` ("Email logins are disabled") — ou seja, não é problema de e-mail, de destinatário ou de limite de envio.

**Causa: não confirmada.** A primeira hipótese foi que o commit `437787a` ("chore: desativa signup e configura timeout de sessao") teria desligado o provedor junto com o cadastro, ao rodar `supabase config push` sem declarar `enabled` em `[auth.email]`. **Essa hipótese foi testada e não se sustenta:** com `enabled = true` declarado, o `supabase config push` responde "Remote Auth config is up to date" e o provedor continua desligado. O CLI não envia o liga/desliga do provedor de e-mail para projetos hospedados — esse campo do `config.toml` vale para o ambiente local. Logo, o push do commit também não teria como ter desligado o provedor, e a desativação provavelmente veio de uma alteração no painel do Supabase. Não há registro de quem ou quando.

**Efeito:** ninguém consegue entrar no painel, incluindo a proprietária (`studioritua@gmail.com`). A Duda está sem acesso ao painel dela desde esse push e não consegue cadastrar nem classificar as piteiras. As peças já publicadas e o site público não foram afetados.

**Correção — só pelo painel do Supabase.** Authentication → Sign In / Providers → Email → **Enable email provider**, deixando "Allow new users to sign up" desligado. O CLI não resolve: não existe subcomando para esse campo e o `config push` o ignora em projeto hospedado.

`enabled = true` ficou declarado em `[auth.email]` (commit `869c02f`) para o ambiente local e como documentação da intenção, mas não substitui o ajuste no painel.

Conferir depois com `GET /auth/v1/settings`: `external.email` deve voltar a `true` e `disable_signup` deve continuar `true`.

**Aprendizado:** o `config.toml` não descreve por completo a configuração de um projeto hospedado. Alterações feitas no painel não aparecem no repositório e não são detectadas por `config push`, que reporta "up to date" mesmo com divergência real.

**Resolvido em 23/09/2026** pelo usuário, no painel do Supabase. Conferido em `GET /auth/v1/settings`: `external.email` voltou a `true` e o login funciona.

**Pendência aberta:** no mesmo ajuste, `disable_signup` passou a `false` — o cadastro de novos usuários ficou liberado, ao contrário da intenção do commit `437787a`. Um cadastro novo **não** dá acesso ao painel (a autorização continua exigindo o e-mail em `ritua_admin_emails`), mas permite que estranhos criem contas e consumam a cota de e-mail do projeto. Desligar "Allow new users to sign up" no mesmo painel.

## 18. Remoção da peça de referência e da rota de demonstração

**Status: implementado em 23/09/2026, a pedido do usuário.**

### 18.1. Peça de exemplo da Madruga Shop

Removida a peça `piteira-exemplo` (foto e medidas da Madruga Shop) e sua imagem `piteira-exemplo-mona-brisa.jpg`. O site passa a usar apenas imagens da própria Rituá, encerrando a pendência de licença de imagem de terceiro registrada na seção 15.4.

Sem efeito visual: a "Piteira Artística" da Duda já está publicada com estoque, e a vitrine por categoria (seção 15) já ocultava a foto de exemplo. Se todas as piteiras forem vendidas, a seção passa a exibir "Novas peças serão apresentadas por aqui." em vez da foto de terceiro.

Com a peça saiu todo o código dependente do campo `reference`: classe de imagem própria, legenda "Vitrine demonstrativa", parágrafo de crédito e o botão que levava ao perfil do Instagram em vez do direct. O contato dos detalhes agora é sempre o direct.

### 18.2. Rota `/#/admin/demo`

Removidos a rota, o modo de demonstração e os textos condicionais do painel ("Modo de demonstração", "Exportar demonstração", "Vitrine de demonstração", "Peça salva na demonstração"). O painel agora existe só conectado ao Supabase; sem configuração, mostra indisponibilidade.

`createDemoCatalog` passou de `src/services/` para `tests/demoCatalog.js`, onde continua servindo de implementação em memória para os testes de estoque. O singleton que gravava em `localStorage` foi removido. O bundle do painel caiu de 22,2 kB para 18,3 kB.

### 18.3. Conferência

23 testes Node aprovados e build de produção aprovado após as remoções. Documentação atualizada em `src/admin/README.md` e `supabase/README.md`.

## 19. Envio na FAQ e informações legais do site

**Status: envio, privacidade e devoluções publicados em 23/09/2026; identificação legal pendente com a Duda.**

### 19.1. Pedido

Repassado pelo usuário: informar que envios por motoboy têm o valor calculado por quilômetro e que envios por transportadora têm cotação feita no privado — em ambos os casos, o combinado acontece na DM do Instagram. Junto disso, voltar a tratar as informações de privacidade do site para reduzir exposição jurídica. A Duda ainda vai escrever e enviar o texto de devoluções.

Formato escolhido pelo usuário: **envio na seção de Dúvidas** (onde o cliente procura) e **privacidade no rodapé**; devoluções entram no rodapé junto da privacidade quando o texto chegar.

### 19.2. Implementado

- `src/components/FAQ.jsx`: nova pergunta "Como funciona o envio?", entre a encomenda personalizada e a volta ao estoque. O texto informa o cálculo por quilômetro no motoboy, a cotação por destino e tamanho na transportadora, e que o valor é passado na DM antes de fechar o pedido. Não foram inventados valores, taxa mínima, cidade-base, prazos nem transportadoras.
- `src/components/Footer.jsx` e `Footer.css`: bloco "Privacidade e dados" reescrito e devolvido ao rodapé, como `<details>` com âncora `#privacidade`. O texto foi atualizado para a operação atual — a menção ao modo de demonstração saiu, porque a rota `/#/admin/demo` foi removida na seção 18.2. Estilo alinhado à escala discreta do rodapé, em faixa própria acima da linha de crédito.
- `Footer.jsx`: seção "Trocas e devoluções" (âncora `#devolucoes`) com o texto enviado pela Duda, dividido por tipo de peça — cases, cuias e piteiras —, acima do bloco de privacidade.
- 23 testes Node, build de produção e `git diff --check` aprovados.

### 19.3. Pendente com a Duda

A seção 15.4 continua aberta nestes pontos. Nada aqui deve ser preenchido por suposição.

1. **Identificação legal:** nome completo ou razão social, CPF ou CNPJ (MEI serve) e cidade/UF. Confirmar `studioritua@gmail.com` como e-mail oficial de atendimento.
2. **Envio:** cidade de onde sai o motoboy, se existe taxa mínima ou raio de atendimento, se há retirada em mãos, prazo para postar/despachar, e se a transportadora envia código de rastreio.
3. **Pagamento:** formas aceitas. A regra de 50% + 50% para encomendas já está publicada na FAQ.
4. **Devoluções:** falta definir quem paga o frete de retorno e como fica a peça personalizada. O texto principal chegou e está na seção 19.5.

**Alerta jurídico a repassar:** venda por DM é venda a distância. O direito de arrependimento em 7 dias (art. 49 do CDC) e os prazos de vício do produto (art. 26 do CDC — 90 dias para bem durável) valem mesmo sem estarem escritos no site, e não deixam de valer por a peça ser personalizada ou feita sob encomenda. Uma cláusula que negue isso é nula e aumenta o risco em vez de reduzir. O texto da Duda pode explicar o processo, não excluir esses direitos.

### 19.4. Fora deste pedido

Banner de consentimento (não há rastreadores), página separada de políticas, alteração de preços, estoque ou layout da vitrine.

### 19.5. Texto de devoluções — decisão do usuário

Texto recebido da Duda em 23/09/2026 e publicado **como ela escreveu**, com apenas correções de português: "com a conosco" → "conosco", "Dm" → "DM", "de mesmo valor" → "do mesmo valor", e "As cases" → "Os cases", para acompanhar o gênero já usado no site (`src/data/catalog.js`). O título "Capinhas p isqueiro" virou "Cases de isqueiro", nome usado nas demais seções. Nenhuma condição comercial foi alterada, removida ou acrescentada.

**Conflitos com o CDC apontados ao usuário antes da publicação:**

1. **Garantia de 7 dias (cases) e 30 dias (cuias).** O prazo legal para reclamar de vício em bem durável é de 90 dias (art. 26, II). A garantia contratual é complementar à legal (art. 50) — pode ampliar, não reduzir. Prazo menor não vincula o consumidor.
2. **"Não realizamos trocas após o recebimento ou uso" (piteiras).** Colide com o direito de arrependimento de 7 dias em compra a distância (art. 49), que independe de defeito ou justificativa, e com a garantia legal por vício. Peça delicada ou exclusiva não é exceção prevista em lei.
3. **"15% de desconto em uma próxima compra" como uma das três opções.** As alternativas do art. 18, § 1º são substituição, restituição do valor pago ou abatimento proporcional do preço. O desconto pode ser oferecido a mais, não no lugar de uma delas.

**Decisão:** o usuário foi informado dos três pontos, avaliou o risco e optou por publicar o texto na íntegra ("pode botar mesmo com os riscos"). Registro feito para que a origem da redação e a ciência do risco fiquem rastreáveis. Uma versão alternativa, que preservava a lógica por peça da Duda sem as cláusulas nulas, chegou a ser escrita e foi descartada a pedido do usuário; está no histórico desta conversa caso queiram retomá-la.

Revisão por advogado continua recomendada e não foi feita. Esta análise é técnica e não substitui parecer jurídico.

### 19.6. Publicação

- Commit `ba83fe1` na branch `feat/painel-ritua`, publicado na `gh-pages` pelo commit `2f7e19b`.
- **Correção do procedimento de deploy.** A seção 16.7 registra `npm run build -- --base=/studio-ritua/`, que está desatualizado desde a migração para domínio próprio (`CNAME` = `studioritua.com.br`, commit `f0651bb` da `gh-pages`). O site é servido na raiz do domínio, então o build correto é **`npm run build`** sem `--base`; usar a base antiga quebraria o carregamento de todos os assets.
- `CNAME` e `.nojekyll` não são gerados pelo build e não estão em `public/`. Precisam ser preservados a cada deploy: apagar só `assets/`, `index.html` e os favicons antes de copiar o `dist`. O diff da publicação confirmou alteração apenas nos bundles e no `index.html`.
- Pendente de conferência visual no site no ar, em celular e desktop.
