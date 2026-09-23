# Painel de demonstração

Branch: `feat/painel-ritua`. Iniciar com `npm run dev` e abrir `http://localhost:5173/#/admin` (usar a porta exibida pelo Vite). A raiz continua exibindo o site original; a entrada administrativa é carregada separadamente.

## Recursos

- Cadastro/edição de nome, categoria, preço, descrição e até quatro fotos.
- Fotos JPG/PNG/WebP reduzidas para até 1.000px antes de guardar no navegador.
- Rascunhos, duplicação, busca, filtros e vitrine de demonstração.
- Reservas, venda direta, venda reservada, cancelamento, reposição e retirada.
- Histórico, reversão da última movimentação de cada peça e exportação JSON.
- Bloqueio de gravações concorrentes entre abas com Web Locks, revisão de produto e identificador de operação contra repetição.

## Limites deliberados

Sem conta/login real, sincronização, pagamento ou conexão com o site público. Dados fictícios são guardados em `localStorage` na chave `ritua-admin-demo-v1`; limpar dados do navegador apaga a demonstração. O espaço é limitado: se as fotos excederem a cota, a operação informa o erro e não confirma o salvamento. Exportação é cópia de consulta, não existe importação nesta versão. Abas privadas podem descartar o conteúdo ao fechar.

Não guardar informações pessoais de clientes nesta demonstração. Reservas são contagens por produto; não representam pedidos individuais. Valores dos exemplos são fictícios. O filtro “Reservado” também inclui peças com reserva parcial.

## Conferência

`npm test` verifica invariantes de estoque, idempotência, concorrência, reversão, validação e falha de armazenamento. `npm run build -- --base=/studio-ritua/` valida o build com o caminho do Pages.

O plano de conexão e a migração estão em `supabase/README.md`. O SQL ainda precisa ser validado no Supabase real antes do uso em produção.

Validação realizada: nove testes Node aprovados; build de produção aprovado; fluxo automatizado no Chromium em 390px com foto, reserva, venda, reversão, persistência, duplicação e rascunho oculto da prévia; capturas inspecionadas em 390px e 1440px, sem erros de página. Migração executada em PGlite com Auth/Storage simulados, incluindo testes de acesso e isolamento das fotos. Não houve teste em Safari nem em um projeto Supabase real.
