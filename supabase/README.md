# Backend da Rituá

Projeto: `zyytoorozczdlqgcqwpe` (Studio Ritua). O frontend usa URL e chave publicável de `.env.local`; veja `.env.example`. Nunca colocar senha do banco, chave secreta ou `service_role` no frontend ou no Git.

## Acesso

`/#/admin` usa Supabase Auth: o usuário informa seu e-mail, recebe o link padrão e volta para `?admin=1`; após a sessão ser recuperada, o endereço é limpo para `/#/admin`. Não é necessário cadastrar senha. O link vence em 10 minutos. A autorização vem de `ritua_admin_emails`, associada ao e-mail confirmado em `auth.users`, ou de um UUID em `ritua_admins`. Metadados editáveis pelo usuário não concedem acesso.

A proprietária e o usuário temporário de teste foram autorizados conforme a conversa, em registros no banco (não em uma lista no frontend). Para retirar o acesso temporário depois da aprovação, excluir a linha correspondente em `ritua_admin_emails`. A checagem no banco impede novas consultas privadas e alterações mesmo que o usuário ainda tenha uma sessão válida. Dados já carregados no navegador não podem ser apagados remotamente.

A rota de demonstração `/#/admin/demo` foi removida. Sem configuração, o painel mostra indisponibilidade em vez de dados fictícios.

## Dados e operações

- `ritua_products`: cadastro, estoque físico, unidades reservadas e revisão de concorrência.
- `ritua_stock_events`: histórico, identificadores de operação e reversões.
- `ritua_save_requests`: idempotência das gravações de cadastro.
- `ritua_product_photos`: ordem e caminhos das fotos; bucket privado `ritua-products`.
- `ritua_save_product`: salva cadastro, referências das fotos e saldo inicial na mesma transação; rejeita edição com revisão antiga.
- `ritua_move_stock`: trava o produto e grava baixa/reserva/reposição e histórico na mesma transação. Repetições com o mesmo UUID não duplicam a operação.

As tabelas não permitem escrita direta pelo navegador. Todas as operações reais validam o administrador no backend. Fotos de rascunhos são privadas; fotos publicadas recebem URLs assinadas de 15 minutos, renovadas nas consultas do catálogo. Uma URL emitida antes de ocultar uma peça pode continuar válida até expirar.

Uploads precedem a transação do cadastro. Uma falha pode deixar arquivos privados sem referência; uma nova tentativa reutiliza o caminho da operação. Fotos removidas de um cadastro são excluídas após o salvamento; a política impede apagar arquivos ainda referenciados. Arquivos órfãos de operações abandonadas podem precisar de limpeza administrativa posterior.

## Catálogo público

As peças publicadas no banco aparecem automaticamente em cases, piteiras ou cuias. As fotos/editoriais já existentes em `src/data/catalog.js` continuam na galeria, separados do estoque real e fora do painel. Não são SKUs confirmados e não foram transformados em estoque fictício. O catálogo consulta o banco ao abrir, ao voltar à aba e a cada minuto. Se houver erro, preserva a galeria e orienta confirmar a disponibilidade pelo direct.

## Migrações e configuração

As migrações `202609230001_catalog.sql`, `202609230002_live_catalog.sql` e `202609230003_product_details.sql` foram aplicadas via `supabase db query --linked --project-ref ... --file ...`. Não reaplicar esses arquivos em banco existente: a execução direta não registra automaticamente o histórico do comando `db push`. Novas mudanças devem ter novas migrações; antes de adotar `db push`, registrar as versões já aplicadas com o mecanismo de reparação do CLI.

`supabase/config.toml` mantém o endereço do site e os retornos locais/autenticados. `supabase config push` foi usado para configurar os retornos e a expiração do link, preservando MFA e o intervalo de envio. O plano gratuito com remetente padrão rejeitou a personalização do template; usamos os templates padrão, sem exigir upgrade. O serviço padrão tem limites de envio e elegibilidade de destinatários; a entrega real na caixa de entrada precisa ser conferida pelos usuários autorizados. Nenhum teste automatizado deve enviar e-mail sem autorização explícita.

## Verificação

`npm test` verifica estoque e classificação. O build é `npm run build -- --base=/studio-ritua/`, com `.env.local` configurado. Testes SQL locais usam PGlite com Auth/Storage simulados; testes reais devem cobrir usuário administrador, visitante, rascunhos/fotos, publicação, concorrência, repetição, reversão e saída. Nunca deixar peças de teste publicadas depois da verificação.

Referências: https://supabase.com/docs/guides/database/functions, https://supabase.com/docs/guides/database/postgres/row-level-security, https://supabase.com/docs/guides/storage/security/access-control, https://supabase.com/docs/guides/auth/auth-email-passwordless.


## Ficha técnica

A terceira migração adiciona campos opcionais: `is_unique`, `length_cm`, `diameter`, `diameter_unit`, `model`, `compatible_with` e `includes_lighter`. Medidas devem ser positivas e até 10.000; o diâmetro exige unidade cm/mm. Textos têm limite de 120 caracteres para modelo e 200 para compatibilidade. A inclusão do isqueiro distingue null (não informado), true e false. Peça única não modifica saldo.

A RPC mantém valores omitidos por clientes antigos e aceita null para limpar explicitamente. Ao trocar de tipo, limpa campos incompatíveis na mesma transação. Produtos antigos recebem null, sem inferir medidas ou características. O novo frontend exige a seleção do tipo em cadastros novos e aceita vírgula decimal na interface.
