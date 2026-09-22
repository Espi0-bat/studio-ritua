# Studio Rituá

Site em React + Vite.

## Desenvolvimento

```sh
npm install
npm run dev
```

`npm run build` gera a versão de produção em `dist`.

## Contatos oficiais

O WhatsApp oficial (+55 95 99123-9170) está configurado em `.env` e é incluído no build. Para alterar os contatos ou adicionar o Instagram, copie `.env.example` para `.env.local` e preencha os campos. Reinicie o Vite depois da alteração. Variáveis configuradas no ambiente de publicação podem substituir esses valores antes do build.

Os links só aparecem quando os valores estão configurados em formato válido. Não há número provisório, formulário de cadastro ou coleta de dados no navegador. As variáveis `VITE_` são públicas: não use segredos nesses campos.

## Conteúdo e imagens

- A galeria apresenta fotografias do trabalho do studio, com ampliação; não representa um inventário de produtos disponíveis.
- Valores, medidas, prazos, cuidados de uso e condições de encomenda precisam de confirmação da marca antes de serem publicados.
- As imagens usadas no site são versões WebP; os arquivos originais foram preservados. Quatro arquivos originais com extensão `.JPG` contêm dados HEIF e não devem ser usados diretamente no navegador.
- O logo é a arte oficial fornecida no projeto. A amostra visual chamada “Poppins” no guia usa Retrock; os arquivos completos de Retrock, Bubbleboddy Neue e Holiday não estão no projeto. Shrikhand e Caveat são aproximações provisórias para títulos e legendas, com Poppins apenas no texto de leitura e controles. Veja `src/assets/fonts/README.md` para fontes, licenças e substituição pelas famílias oficiais.

## Verificação desta revisão

Build de produção aprovado. Conferência em navegador nas larguras 320, 390, 768 e 1440 px: imagens, ausência de overflow horizontal, abertura das seis fotos, fechamento com botão e Escape, retorno de foco, FAQ pelo teclado e menu mobile. Sem erros de execução detectados.
