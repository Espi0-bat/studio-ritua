# Painel da Rituá

- Painel real: `/#/admin`, configurado por `.env.local`, com login pelo link de e-mail do Supabase.
- Demonstração isolada: `/#/admin/demo`, sem login e sem alterar dados reais.
- Local: `npm run dev` e a porta exibida pelo Vite.

## Recursos

Cadastro, edição, duplicação, até quatro fotos por peça, rascunhos, publicação, filtros, estoque, reservas, vendas, reposição, retirada, histórico com reversão e exportação JSON. Selecionar o tipo coloca a peça em cases, piteiras ou cuias. JPG/PNG/WebP são reduzidos para até 1.000px antes do envio.

O painel real atualiza os dados ao abrir, ao voltar à aba e a cada minuto. Conflitos de edição pedem que o cadastro seja reaberto. Operações usam UUID para evitar duplicação em novas tentativas. A exportação é uma cópia de consulta, sem importação automática; os links de foto nela são temporários.

Reservas são contagens por produto, não pedidos individuais. O filtro “Reservado” inclui peças com reserva parcial. As fotos editoriais anteriores do site continuam fora do controle de estoque: não eram produtos individuais confirmados.

## Demonstração

Dados locais na chave `ritua-admin-demo-v1`, independentes da sessão real e do Supabase. Limpar o armazenamento apaga a demonstração. Fotos demais podem esgotar o espaço; nesse caso o salvamento falha com aviso. Não há migração automática dos exemplos para o banco real.

## Testes

`npm test` e `npm run build -- --base=/studio-ritua/`. A documentação do banco, autorização temporária de testes e remoção de acesso está em `supabase/README.md`.
