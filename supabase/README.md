# Backend da Rituá

Projeto: `zyytoorozczdlqgcqwpe` (Studio Ritua). O frontend usa URL e chave publicável de `.env.local`; veja `.env.example`. Nunca colocar senha do banco, chave secreta ou `service_role` no frontend ou no Git.

## Acesso

`/#/admin` usa Supabase Auth com e-mail e senha (`signInWithPassword`). O link mágico foi abandonado porque o serviço de e-mail padrão do Supabase não entrega para quem não é membro da organização, e nenhum SMTP próprio está configurado; o painel ficava inacessível por falta de e-mail, não por falta de permissão. A própria administradora troca a senha pelo painel, em "Trocar senha", e o endereço de login tem "Esqueci minha senha", que envia o link de redefinição e volta para `?admin=1`. O marcador `type=recovery` é lido em `services/supabase.js` antes de `createClient`, porque o cliente limpa o endereço e o evento `PASSWORD_RECOVERY` pode disparar antes de o painel montar. A redefinição por e-mail depende da entrega do serviço padrão do Supabase, limitada a 4 mensagens por hora e sem garantia para destinatários fora da organização; a troca pelo painel, com sessão ativa, não depende de e-mail nenhum. A rota ainda aceita o retorno `?admin=1` e limpa o endereço para `/#/admin`. A autorização vem de `ritua_admin_emails`, associada ao e-mail confirmado em `auth.users`, ou de um UUID em `ritua_admins`. Metadados editáveis pelo usuário não concedem acesso.

A proprietária e o usuário temporário de teste foram autorizados em registros no banco (não em uma lista no frontend). O acesso temporário `moutinhoezer@gmail.com` foi removido de `ritua_admin_emails` em 23/09/2026, após a aprovação; o usuário continua em `auth.users`, mas sem autorização `ritua_is_admin` não lê nem grava nada. `ritua_admins` (por UUID) está vazia: hoje a autorização é toda por e-mail. A checagem no banco impede novas consultas privadas e alterações mesmo que o usuário ainda tenha uma sessão válida. Dados já carregados no navegador não podem ser apagados remotamente.

A rota de demonstração `/#/admin/demo` foi removida. Sem configuração, o painel mostra indisponibilidade em vez de dados fictícios.

## Segurança do acesso

Revisão de 23/09/2026, com os resultados medidos contra o projeto em produção.

Política de senha no servidor: `minimum_password_length = 12` e `password_requirements = "lower_upper_letters_digits"`. Verificado: a API recusa senha de 6 caracteres e recusa 12 caracteres sem maiúscula, com `422 weak_password`. A política vale para senhas novas; a senha em uso antes da mudança continua válida no login até ser trocada.

Limites em `[auth.rate_limit]`: `email_sent = 4` por hora (segura a redefinição de senha, que é o caminho que um atacante usaria para inundar a caixa da administradora), `sign_in_sign_ups = 10`, `token_verifications = 10` e `token_refresh = 150` por 5 minutos por IP. O link de redefinição expira em 10 minutos (`otp_expiry`), o mesmo do antigo link mágico.

**Limitação confirmada, não resolvida:** `sign_in_sign_ups` não protege o login por senha na plataforma gerenciada. Foram feitas 43 tentativas seguidas de senha errada, do mesmo IP, contra `/auth/v1/token?grant_type=password`, e nenhuma recebeu `429`. Ou seja, não há freio efetivo de força bruta no endpoint de login. As defesas reais disponíveis são CAPTCHA (`captcha_enabled`/`captcha_provider`/`captcha_secret`, com hCaptcha ou Turnstile, exigindo widget no frontend e o segredo via `env(...)`, nunca no Git) e MFA TOTP, já habilitada na configuração mas ainda sem tela de ativação no painel. Enquanto nenhuma das duas existir, a força da senha é a única barreira.

`supabase db advisors --type security` aponta três `SECURITY DEFINER` chamáveis por `authenticated`: `ritua_is_admin`, `ritua_move_stock` e `ritua_save_product`. É intencional — elas precisam de `SECURITY DEFINER` para escrever, e cada uma valida `ritua_is_admin()` na entrada (`raise exception 'Acesso não autorizado'`), com as políticas de RLS repetindo a checagem. O quarto aviso, "Leaked Password Protection Disabled", continua aberto: ligar em Authentication > Providers > Email no dashboard e conferir depois, com um `config push` seguido de novo `advisors`, se a opção sobrevive ao push.

Os retornos de autenticação do GitHub Pages (`espi0-bat.github.io`) foram removidos da lista; sobraram o domínio próprio e os endereços locais de desenvolvimento.

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

Cuidado com os dois `enable_signup`, verificado na prática em 23/09/2026: o de `[auth.email]` é o que liga o provedor de e-mail (`external_email_enabled`), e o de `[auth]` é o que fecha o cadastro público (`disable_signup`). O campo `enabled` de `[auth.email]` é ignorado pelo CLI, apesar do que sugere o comentário antigo. Enquanto `[auth.email] enable_signup` esteve `false`, todo `supabase config push` desligava o provedor e derrubava o login de todos — inclusive o de senha —, com `422 email_provider_disabled` na API e "Não foi possível enviar o link" no painel. Religar pelo dashboard resolvia o provedor mas reabria o cadastro público, e o push seguinte derrubava tudo de novo. A configuração atual (`[auth.email] enable_signup = true` com `[auth] enable_signup = false`) mantém os dois corretos em qualquer push. Para conferir sem enviar e-mail: `GET <url>/auth/v1/settings` com a chave publicável; `external.email` precisa ser `true` e `disable_signup` também.

## Verificação

`npm test` verifica estoque e classificação. O build é `npm run build -- --base=/studio-ritua/`, com `.env.local` configurado. Testes SQL locais usam PGlite com Auth/Storage simulados; testes reais devem cobrir usuário administrador, visitante, rascunhos/fotos, publicação, concorrência, repetição, reversão e saída. Nunca deixar peças de teste publicadas depois da verificação.

Referências: https://supabase.com/docs/guides/database/functions, https://supabase.com/docs/guides/database/postgres/row-level-security, https://supabase.com/docs/guides/storage/security/access-control, https://supabase.com/docs/guides/auth/auth-email-passwordless.


## Ficha técnica

A terceira migração adiciona campos opcionais: `is_unique`, `length_cm`, `diameter`, `diameter_unit`, `model`, `compatible_with` e `includes_lighter`. Medidas devem ser positivas e até 10.000; o diâmetro exige unidade cm/mm. Textos têm limite de 120 caracteres para modelo e 200 para compatibilidade. A inclusão do isqueiro distingue null (não informado), true e false. Peça única não modifica saldo.

A RPC mantém valores omitidos por clientes antigos e aceita null para limpar explicitamente. Ao trocar de tipo, limpa campos incompatíveis na mesma transação. Produtos antigos recebem null, sem inferir medidas ou características. O novo frontend exige a seleção do tipo em cadastros novos e aceita vírgula decimal na interface.
