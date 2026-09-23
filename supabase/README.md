# Backend preparado para a Rituá

O painel atual é uma demonstração local, sem autenticação e sem conexão com Supabase. Nada é enviado ao catálogo público. Não publicar este modo como ferramenta de produção.

## Estrutura

- `ritua_products`: cadastro, quantidade física e quantidade reservada.
- `ritua_stock_events`: histórico imutável para o cliente; operações identificadas por UUID.
- `ritua_admins`: lista de usuários autorizados, mantida apenas pelo administrador do banco.
- `ritua_product_photos` e bucket privado `ritua-products`: até quatro posições de foto por peça, com leitura pública apenas para peças publicadas.
- `ritua_move_stock`: reserva, cancelamento, venda livre, venda reservada, reposição, retirada e reversão da última movimentação. A função trava a linha da peça, valida o saldo e grava histórico na mesma transação. Repetir a mesma requisição com o mesmo UUID não duplica a operação.

O cliente não recebe permissão para escrever `stock` ou `reserved` diretamente. Peças novas começam com saldo zero; a quantidade inicial será registrada como reposição. O acesso de administrador depende de `auth.uid()` estar na lista autorizada, não de metadados editáveis pelo usuário.

## Quando houver a conta

1. Criar um projeto de desenvolvimento e aplicar a migração com Supabase CLI ou SQL Editor.
2. Criar/convidar os usuários pelo Auth. Inserir os UUIDs autorizados em `ritua_admins` pelo SQL Editor, sem liberar cadastro de administradores pelo cliente.
3. Implementar login, recuperação de acesso e saída no painel. Não existe login simulado nesta demonstração.
4. Criar um adaptador Supabase no lugar de `demoCatalog`, preservando os métodos `load`, `save`, `move` e `undo`. Mapear campos camelCase para snake_case e normalizar os erros. Implementar controle de edição concorrente também para os metadados.
5. Usar UUID estável por operação de estoque e chamar `ritua_move_stock` via RPC. A criação com estoque inicial deve receber uma RPC transacional própria antes da integração, para evitar cadastro parcial caso a reposição falhe.
6. Enviar fotos ao bucket com caminhos únicos, salvar metadados e tratar limpeza de uploads incompletos. Usar downloads autenticados/URLs assinadas de curta duração; não usar `getPublicUrl` para o bucket privado. Uma URL assinada já emitida pode funcionar até expirar após ocultar a peça.
7. Conectar a galeria ao catálogo publicado, incluindo carregamento, erro e estados sem produtos. Manter os exemplos locais fora dos dados reais.
8. Validar em Supabase: visitante, usuário autenticado sem autorização e administrador; rascunhos e suas fotos; duas vendas simultâneas; repetição da mesma requisição; reversão; falhas de rede; limites de upload.

A URL e a chave publicável podem estar no frontend. Segredos, senha do banco e `service_role` nunca devem entrar no bundle ou no Git. O painel e o catálogo reais só devem ser publicados depois dos testes com Auth, RLS e Storage no projeto de desenvolvimento.

## Referências de implementação

- https://supabase.com/docs/guides/database/functions
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/storage/security/access-control
