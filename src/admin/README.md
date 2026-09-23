# Painel da Rituá

- Painel: `/#/admin`, configurado por `.env.local`, com login pelo link de e-mail do Supabase.
- Local: `npm run dev` e a porta exibida pelo Vite.

## Recursos

Cadastro, edição, duplicação, até quatro fotos por peça, rascunhos, publicação, filtros, estoque, reservas, vendas, reposição, retirada, histórico com reversão e exportação JSON. Selecionar o tipo coloca a peça em piteiras, cases ou cuias. JPG/PNG/WebP são reduzidos para até 1.000px antes do envio.

O painel real atualiza os dados ao abrir, ao voltar à aba e a cada minuto. Conflitos de edição pedem que o cadastro seja reaberto. Operações usam UUID para evitar duplicação em novas tentativas. A exportação é uma cópia de consulta, sem importação automática; os links de foto nela são temporários.

Reservas são contagens por produto, não pedidos individuais. O filtro “Reservado” inclui peças com reserva parcial. As fotos editoriais anteriores do site continuam fora do controle de estoque: não eram produtos individuais confirmados.

## Testes

`npm test` e `npm run build -- --base=/studio-ritua/`. A documentação do banco, autorização temporária de testes e remoção de acesso está em `supabase/README.md`.


## Ficha técnica por tipo

Novos cadastros exigem escolher o tipo. Piteiras podem informar comprimento em cm, diâmetro com unidade cm/mm, modelo e linha (Premium/Clássica); cases podem informar compatibilidade e se acompanham isqueiro (Não informado/Sim/Não). Piteiras sem linha definida aparecem em "Piteiras Clássicas" no site. A marcação “Peça única” vale para todos os tipos e não altera estoque. Campos vazios não aparecem no site. Ao trocar de tipo e salvar, os campos da categoria anterior são limpos; a duplicação preserva os campos aplicáveis. A ficha fica entre a descrição e o preço nos detalhes.
