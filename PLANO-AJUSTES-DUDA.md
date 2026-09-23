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
- Selo de peça única e aviso técnico de privacidade implementados. Sem banner de consentimento para rastreadores inexistentes.
- 20 testes automatizados aprovados, incluindo publicação por categoria, reserva, última venda, reposição e múltiplos produtos.
- Build de produção aprovado. Teste de navegador com respostas simuladas em 390 e 1440 px aprovado: selo, ocultação/retorno de demonstrativo, retenção do catálogo após erro, abertura do aviso e ausência de transbordamento horizontal.
- Pendências de informações legais e direitos de imagem continuam abertas na seção 15.4. Não foram inventados dados do fornecedor nem regras comerciais.
- Alterações desta etapa ainda não publicadas no GitHub Pages.
