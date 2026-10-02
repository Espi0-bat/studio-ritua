# Erros do painel da Rituá

Catálogo das mensagens que o painel pode mostrar, o que cada uma significa de verdade e o que fazer.
Serve para atender a Duda sem precisar reabrir o código.

**O painel não guarda registro de erro.** Não há `console.error`, nem tabela de log, nem envio para
serviço externo. A mensagem aparece na tela e se perde ao recarregar. Depois do fato, o que dá para
reconstruir é só o que ficou no banco e no storage — veja a seção 7.

Arquivos onde as mensagens nascem: `src/admin/photos.js`, `src/services/siteMedia.js`,
`src/services/liveCatalog.js`, `src/services/inventory.js`, `src/services/productDetails.js`,
`src/admin/AdminEntry.jsx` e as funções `raise exception` em `supabase/migrations/`.

## 1. Triagem rápida

Antes de investigar, três perguntas resolvem a maioria dos casos:

1. **Ela viu alguma mensagem vermelha?** Peça o print da tela inteira. Desde 02/10/2026 o espaço da
   foto tem dois lugares de mensagem: falha ao **escolher** a foto aparece colada no campo "Trocar a
   foto", e falha ao **gravar** aparece colada no botão. Antes era uma só, no fim do bloco, fora da
   tela de quem tinha acabado de escolher uma foto.
2. **A sessão está viva?** Sair e entrar de novo resolve toda a família de erro 401/403/`42501`/
   `PGRST301`. Desde 02/10/2026 ela tem texto próprio em toda parte — "Seu acesso não permite esta
   ação. Entre novamente ou fale com o administrador." —, e o texto de conexão passou a significar só
   o que é mesmo de conexão. "Acesso não autorizado" continua vindo cru do banco. Veja 2.2.
3. **O dado chegou no banco?** Comandos na seção 7. Se chegou, o problema é de cache ou de tela,
   não de gravação.

## 2. Imagens do site — abertura e studio

### 2.1. Ao escolher a foto (antes de salvar)

Tudo aqui vem de `prepare()` em `src/admin/photos.js`. Quando falha, o arquivo escolhido é
descartado, o campo volta para "nenhum arquivo selecionado" e **a prévia não muda** — é exatamente o
que parece "a foto não está atualizando".

| Mensagem | Causa real | O que fazer |
| --- | --- | --- |
| "Escolha uma foto. Vídeo, PDF e desenho em SVG não servem aqui." | O arquivo se declara como algo que não é imagem, ou é SVG (`photos.js:7`). Live Photo entregue como vídeo, PDF, documento. SVG é recusado de propósito: o canvas rasterizaria no tamanho padrão e publicaria uma foto ruim sem avisar. | Escolher uma foto. Arquivo **sem tipo declarado** passa por esta guarda de propósito: é um dos jeitos de o HEIC do iPhone chegar. |
| "Cada foto deve ter até 15 MB." | Arquivo original acima de 15 MB (`photos.js:8`). ProRAW, PNG gigante, frame de vídeo exportado. | Exportar em qualidade normal. |
| "Esta foto está em HEIC e este navegador não abre HEIC. Abra a foto e exporte como JPG, ou mude Ajustes > Câmera > Formatos para \"Mais Compatível\"." | O arquivo é HEIC/HEIF (por tipo ou por extensão) e a decodificação falhou (`photos.js:12-14`). Acontece em Chrome, Firefox e Edge, que não decodificam HEIC em versão nenhuma, e no Safari até a 16.6. | Seguir a mensagem. No Safari 17+ (iOS 17+) o HEIC passa direto e não cai aqui. |
| "Não foi possível abrir esta foto." | O navegador não decodificou a imagem e ela não é HEIC (`photos.js:14`): arquivo corrompido, extensão que não bate com o conteúdo, ou foto que mora no iCloud e não baixou no aparelho. | Abrir a foto no app Fotos primeiro, para forçar o download, e exportar de novo. |
| "Não foi possível preparar esta foto." | O `canvas` falhou (`photos.js:22`): memória do aparelho, ou bloqueio de canvas por configuração de privacidade do navegador. | Fechar abas e apps, tentar de novo, tentar foto menor. |

### 2.2. Ao salvar

De `saveSiteMedia()` em `src/services/siteMedia.js`.

| Mensagem | Causa real | O que fazer |
| --- | --- | --- |
| "Seu acesso não permite esta ação. Entre novamente ou fale com o administrador." | Sessão vencida ou acesso revogado, no envio ou na gravação. Traduzida por `siteMediaError()` (`src/services/siteMediaErrors.js`) a partir de 401, 403, `42501` ou `PGRST301`. O cliente não manda token vencido: quando a sessão morre ele passa a usar a chave pública, e o banco recusa por permissão. | Sair e entrar de novo. Se repetir, conferir `ritua_admin_emails`. |
| "Não foi possível enviar a foto. Confira a conexão e tente novamente." | Falha no upload que **não** é de permissão (`siteMedia.js:36`): queda de rede, limite de 5 MB do bucket, tipo recusado pelo bucket. Falha de rede chega como `StorageUnknownError`, sem `status`. | Conferir a conexão e repetir. |
| "Acesso não autorizado" | Vem do banco (`202609280006_site_media.sql:28`). `ritua_is_admin()` deu falso: sessão expirada, ou o e-mail saiu de `ritua_admin_emails`. | Entrar de novo. Se repetir, conferir `ritua_admin_emails`. |
| "Foto inválida ou envio incompleto" | Do banco (`:32`). O caminho não começa com o nome do espaço, ou o arquivo não está em `storage.objects` — o upload não chegou de fato. | Repetir o envio. Se repetir, o upload está falhando antes: tratar como a linha de cima. |
| "Espaço inválido" / "Espaço inválido." | Espaço diferente de `abertura`/`studio` (`siteMedia.js:29` e `202609280006_site_media.sql:29`). Pela tela não acontece; indica defeito de código. | Abrir chamado técnico, não é erro de uso. |
| "Não foi possível salvar esta imagem. Tente novamente." | Erro da RPC que não é nem `P0001` nem de permissão (`siteMedia.js:43`): rede, limite de coluna. | Recarregar o painel e repetir. |
| "A foto ficou grande demais depois do preparo. Tente outra imagem." | JPEG preparado acima de 5 MB (`siteMedia.js:33`). Na prática **não acontece**: a 1600 px e qualidade 0,75 as fotos ficam em torno de 500 KB — as duas que estão no ar têm 480 KB e 556 KB. | Se aparecer, é sinal de que o preparo mudou. Investigar. |
| "Escolha uma foto para este espaço." | Sem foto nova e sem foto publicada (`siteMedia.js:38`). Inalcançável pela tela: nesse caso o botão está desabilitado. | — |

### 2.3. Ao abrir a aba

| Mensagem | Causa real | O que fazer |
| --- | --- | --- |
| "Não foi possível carregar as imagens do site." (com "Tentar novamente") | Leitura de `ritua_site_media` falhou (`siteMedia.js:20`): projeto pausado, sem conexão, ou permissão de leitura removida de `anon`. | Tentar de novo; conferir se o projeto Supabase está no ar. |
| "Painel indisponível" / "A conexão do studio precisa ser configurada." | Build feito sem `.env.local` (`src/services/supabase.js:7`, `AdminEntry.jsx:66`). | Refazer o build com as variáveis. |

### 2.4. Falhas que não mostram mensagem nenhuma

- **A foto antiga não foi apagada.** `siteMedia.js:45` chama `remove()` e não confere o resultado. O
  arquivo substituído fica órfão no bucket. Não quebra nada, só ocupa espaço. Limpeza exige conta
  de administrador.
- **O site não troca a foto e ninguém fica sabendo.** `src/components/useSiteMedia.js:20` termina em
  `.catch(() => {})`. Se a leitura falhar no site público, ele segue mostrando a foto que veio no
  build, sem aviso. É o cenário mais difícil de diagnosticar: a troca parece ter dado certo no
  painel e o site continua igual. Conferir pela seção 7.
- ~~**Salvar sem foto nova avisa como se fosse troca de foto.**~~ **Corrigido em 02/10/2026.** O
  botão agora diz "Salvar a foto nova" ou "Salvar legenda e descrição" antes do toque, e a
  confirmação distingue "Foto da abertura trocada." de "Legenda e descrição salvas. A foto da
  abertura continua a mesma." (`SiteMedia.jsx:71-77`).

### 2.5. Quando a foto muda mesmo

A troca aparece no site **ao recarregar a página** — não precisa de novo deploy, porque a foto é lida
do banco em tempo de execução. O `index.html` no GitHub Pages vem com `cache-control: max-age=600`,
então o HTML pode ficar até 10 minutos em cache no celular dela; a foto em si não é cacheada
(`cache-control: no-cache` no storage) e cada troca ganha um endereço novo com UUID.

## 3. Peças, fotos e estoque

A tradução de erro deste fluxo passa por `fail()` (`src/services/liveCatalog.js:5-10`), que é mais
completa que a das imagens do site: `P0001` mostra o texto do banco, `42501` ou 403 vira "Seu acesso
não permite esta ação. Entre novamente ou fale com o administrador.", e o resto vira "Não foi
possível concluir a operação. Confira a conexão e tente novamente."

**Conferidas antes de enviar** (`inventory.js`, `productDetails.js`, `liveCatalog.js:49-62`):
nome até 100 caracteres, categoria obrigatória, preço válido, descrição até 2.000, até quatro fotos,
quantidade inteira de 1 a 9.999, medidas maiores que zero e até 10.000, diâmetro sempre com unidade
cm/mm, modelo até 120 e compatibilidade até 200 caracteres, linha Premium/Clássica.

**Durante o envio das fotos:**

| Mensagem | Causa real | O que fazer |
| --- | --- | --- |
| "Escolha até quatro fotos por peça." / "Você pode usar até quatro fotos." | Mais de quatro no total (`photos.js:29`, `Admin.jsx:49`). | Remover fotos antes de somar novas. |
| "Não foi possível ler uma das fotos. Reabra o cadastro e tente novamente." | O `fetch` do data URL falhou (`liveCatalog.js:59`), normalmente depois de muito tempo com a janela aberta. | Fechar a janela, reabrir o cadastro, escolher as fotos de novo. |
| "Use fotos JPG, PNG ou WebP de até 5 MB após a preparação." | Tipo ou tamanho recusado depois do preparo (`liveCatalog.js:62`). | Trocar a foto. |
| "Não foi possível carregar algumas fotos. Tente novamente." | Falha ao assinar as URLs do bucket privado (`liveCatalog.js:29`). | Recarregar o painel. |

As fotos das peças usam o mesmo `prepare()` da seção 2.1, com limite de 1.000 px em vez de 1.600 —
então as cinco mensagens de 2.1 valem igual aqui, HEIC incluído.

## 4. Acesso e senha

Tudo em `src/admin/AdminEntry.jsx`.

| Mensagem | Causa real | O que fazer |
| --- | --- | --- |
| "E-mail ou senha incorretos. Confira e tente novamente." | Login recusado (`:37`). Cobre senha errada e e-mail inexistente. | Conferir o e-mail; usar "Esqueci minha senha". |
| "Muitas tentativas seguidas. Aguarde alguns minutos e tente de novo." | HTTP 429 no login ou na troca de senha (`:37`, `:56`). | Esperar. O limite é por IP. |
| "Este acesso ainda não foi confirmado. Fale com o administrador." | `email_not_confirmed` (`:37`). | Confirmar o usuário no painel do Supabase. |
| "Sua sessão expirou ou não pôde ser recuperada. Entre novamente." | `getSession()` com erro (`:23`). | Entrar de novo. |
| "Não foi possível verificar seu acesso. Tente novamente." | `ritua_is_admin` falhou na chamada (`:30`). | "Tentar novamente"; conferir se o projeto está no ar. |
| "Seu e-mail não está autorizado a administrar a Rituá." | A conta entrou, mas não está em `ritua_admin_emails` (`:30`). | Incluir o e-mail no banco. Não é erro de senha. |
| "Já foi pedido um link há pouco. Aguarde alguns minutos antes de pedir outro." | 429 na redefinição (`:50`). O limite é de **4 e-mails por hora**. | Esperar. |
| "Não foi possível pedir a redefinição agora. Tente novamente em alguns minutos." | Outro erro no envio (`:50`). | Lembrar que o envio depende do SMTP padrão do Supabase, sem garantia de entrega. |
| "Informe seu e-mail para receber o link de redefinição." | Campo vazio (`:44`). | Preencher o e-mail antes de clicar. |
| "Escolha uma senha diferente da atual." | `same_password` (`:56`). | Escolher outra. |
| "Senha fraca demais. Use no mínimo 12 caracteres, misturando letras e números." | `weak_password` (`:56`). A regra no servidor é 12 caracteres com minúscula, maiúscula e dígito. | Avisar da maiúscula, que a mensagem não cita. |
| "As duas senhas precisam ser iguais." | Confirmação diferente (`:60`, `Admin.jsx:132`). | — |
| "Não foi possível sair. Confira a conexão e tente novamente." | `signOut()` falhou (`:65`). | Recarregar a página. |

## 5. Mensagens que vêm do banco

Chegam cruas na tela, pelo caminho `P0001`. São as únicas que dizem exatamente o que aconteceu.

- **"Acesso não autorizado"** — `ritua_is_admin()` falso. Vale para todas as funções.
- **"Esta peça mudou. Feche a janela e confira os dados atualizados."** — duas edições ao mesmo tempo,
  ou a janela ficou aberta enquanto a peça mudou em outro lugar. Fechar e reabrir.
- **"Peça não encontrada"** — a peça foi excluída enquanto a janela estava aberta.
- **"Foto inválida ou envio incompleto"** — o arquivo não chegou ao storage.
- **"Quantidade indisponível"** — a baixa é maior que o saldo livre. O painel tem a versão mais
  explicativa ("Confira as unidades livres e reservadas."), mas na disputa de dois acessos quem
  aparece é a do banco.
- **"Só a última movimentação pode ser desfeita"** — desfazer fora de ordem.
- **"Requisição já utilizada" / "Identificador já utilizado"** — repetição com o mesmo UUID e dados
  diferentes. É a proteção contra duplicação; recarregar o painel resolve.
- **"Identificador obrigatório"**, **"Referência de correção inválida"**, **"Ação inválida"**,
  **"Use até quatro fotos"**, **"Escolha o tipo da peça"**, **"Quantidade inválida"**,
  **"Comprimento inválido"**, **"Diâmetro inválido"**, **"Informe o diâmetro e sua unidade (cm ou mm)"**,
  **"Texto da ficha técnica muito longo"**, **"Selecione a linha da piteira: Premium ou Clássica"** —
  todas repetem conferências que o painel já faz antes de enviar. Se alguma aparecer, o painel deixou
  passar algo: vale investigar o código, não orientar a Duda.

## 6. Lacunas conhecidas

Levantadas em 02/10/2026, quando qualquer falha virava "não está atualizando". Cinco foram corrigidas
no mesmo dia; uma continua aberta.

- **L1 — A mensagem nascia longe de quem agia. Corrigida.** O erro era um só, no fim do bloco: perto
  de quem tocava o botão, mas a cerca de 500 px de quem acabara de escolher uma foto. Agora são dois,
  cada um ancorado na ação que o causou — falha ao escolher aparece colada no campo "Trocar a foto"
  (`SiteMedia.jsx:49`), falha ao gravar continua colada no botão (`SiteMedia.jsx:59`). O aviso do topo
  (`Admin.jsx:177`) ganhou fundo e borda em `.admin-notice:not(:empty)` (`Admin.css:16`), e a
  confirmação também aparece dentro do próprio espaço, ao lado do botão.
- **L2 — Salvar sem foto nova anunciava troca de foto. Corrigida.** O botão diz o que vai fazer antes
  do toque — "Salvar a foto nova" ou "Salvar legenda e descrição" — e a confirmação distingue os dois
  casos (`SiteMedia.jsx:55`, `:71-77`).
- **L3 — Erro de permissão se disfarçava de erro de conexão. Corrigida.** A tradução saiu para
  `src/services/siteMediaErrors.js`, um módulo sem import nenhum — por isso testável pelo `node --test`
  (`tests/siteMedia.test.js`). Ele reconhece 401, 403, `42501` e `PGRST301` nos dois formatos de erro
  que chegam: o storage erra com `status`/`statusCode` e sem `code`, o PostgREST com `code` e sem
  `status`. Detalhe que explica o desenho: quando a sessão morre, o cliente **não** manda token
  vencido — passa a mandar a chave pública, e o banco recusa por permissão.
- **L4 — O campo de arquivo ficava mudo. Corrigida.** O nome do arquivo é guardado em estado e a tela
  mostra "Preparando IMG_4821.HEIC…" e depois "Foto escolhida: … Salve para publicar no site."
  (`SiteMedia.jsx:21-22`, `:48`). O `event.target.value = ''` continua onde estava, de propósito: sem
  ele, escolher o mesmo arquivo outra vez depois de uma recusa não dispararia nada.
- **L5 — Nada é registrado. CONTINUA ABERTA.** Não há `console.error`, tabela de log nem envio
  externo. Depois do fato, a única reconstrução possível é a da seção 7. Fechar isso exige decidir
  onde guardar o registro e por quanto tempo — é mudança de infraestrutura, não de tela.
- **L6 — HEIC recusado sem tentar. Corrigida.** A lista de tipos deixou de ser porteiro: agora só
  barra o que se declara como não-imagem, e quem decide é a tentativa de decodificar (`photos.js:7`,
  `:12-14`). O Safari **17 em diante** (iOS 17, macOS Sonoma) abre HEIC e o canvas reexporta JPEG, então
  a foto do iPhone passa direto; Chrome, Firefox e Edge não abrem HEIC em versão nenhuma e recebem a
  mensagem que diz como exportar. Dois cuidados que não podem se perder:
  - **Nunca listar `image/heic` no `accept`.** No Safari 17+ isso faz o navegador converter o JPG
    dela **em** HEIC, quebrando o que hoje funciona. Por isso o `accept` é `image/*` e há comentário
    no código, em `SiteMedia.jsx:46` e `Admin.jsx:77`.
  - **O bucket continua só com jpeg/png/webp** (migração `:6`), e está certo: nenhum byte de HEIC
    chega ao storage, porque o preparo sempre reexporta JPEG.

## 7. Como conferir pelo lado de fora

Sem abrir o painel, com a chave publicável de `.env.local`. Tudo somente leitura.

```sh
set -a && . ./.env.local && set +a

# O que o site enxerga hoje — é o mesmo que um visitante lê.
curl -s "$VITE_SUPABASE_URL/rest/v1/ritua_site_media?select=*" \
  -H "apikey: $VITE_SUPABASE_PUBLISHABLE_KEY" \
  -H "Authorization: Bearer $VITE_SUPABASE_PUBLISHABLE_KEY" | python3 -m json.tool

# A foto publicada abre para quem não tem sessão? (esperado: 200 e image/jpeg)
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" \
  "$VITE_SUPABASE_URL/storage/v1/object/public/ritua-site/<object_path>"

# Quando o arquivo subiu — comparar com o updated_at da linha.
curl -sI "$VITE_SUPABASE_URL/storage/v1/object/public/ritua-site/<object_path>" | grep -i last-modified
```

**A comparação que resolve a dúvida "ela trocou a foto ou só o texto":** se o `last-modified` do
arquivo for bem anterior ao `updated_at` da linha, aquela gravação **não** trouxe foto nova — foi
salvamento de legenda ou descrição. Upload e gravação acontecem na mesma chamada, com milissegundos
de diferença, então qualquer distância grande entre os dois significa gravações separadas.

Para conferir se o site no ar tem o código que lê essas fotos:

```sh
curl -s https://studioritua.com.br/ | grep -o 'assets/index-[^"]*\.js'
curl -s https://studioritua.com.br/assets/<arquivo>.js | grep -c ritua_site_media   # esperado: 1
```

Listar o bucket e ler log de erro exigem conta de administrador: a chave publicável recebe lista
vazia, por RLS.
