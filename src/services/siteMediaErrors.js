// Módulo sem import nenhum: assim o `node --test` alcança a tradução de erro, que é a única parte
// do envio de imagem com regra de verdade. O resto de siteMedia.js só existe dentro do navegador.
// As duas camadas erram com formatos diferentes: o storage devolve `status` (número) e `statusCode`
// (texto) e não tem `code`; o PostgREST devolve `code` e não tem `status`. Conferimos os dois.
const negado = 'Seu acesso não permite esta ação. Entre novamente ou fale com o administrador.'

// Sessão vencida não chega como token expirado: o cliente passa a mandar a chave pública, e aí o
// banco recusa por permissão. Por isso "entre novamente" vale para 401, 403, 42501 e PGRST301.
export function siteMediaError(error, generic) {
  if (!error) return ''
  if (error.code === 'P0001') return error.message
  if (['42501', 'PGRST301'].includes(error.code) || ['42501', '401', '403'].includes(error.statusCode)) return negado
  if ([401, 403].includes(error.status)) return negado
  return generic
}
