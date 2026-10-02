// A URL assinada vale 900 s e cada assinatura devolve um token novo. Como o catálogo
// reassina a cada atualização, o endereço de TODA foto mudava de minuto em minuto — e
// endereço diferente é recurso diferente para o cache do navegador, que então rebaixava
// as mesmas fotos. Reaproveitar a assinatura enquanto ela vale mantém o endereço estável.
//
// Reaproveitar é seguro porque o caminho no bucket é imutável: cada envio grava
// `${id}/${operationId}-${index}.ext` com `upsert: false`, e o caminho removido sai de
// `ritua_product_photos`. A URL guardada nunca passa a apontar para outra foto.
export const signedSeconds = 900
// Folga antes do vencimento: as fotos da galeria carregam de forma adiada, e a URL
// entregue precisa continuar válida quando a imagem for enfim baixada.
export const signedMargin = 180

export function createSignedPhotos(sign, { seconds = signedSeconds, margin = signedMargin, now = Date.now } = {}) {
  const guardadas = new Map()
  return async function signedUrls(paths) {
    const urls = {}
    const faltando = []
    for (const path of paths) {
      const guardada = guardadas.get(path)
      if (guardada && guardada.until > now()) urls[path] = guardada.url
      else faltando.push(path)
    }
    if (faltando.length) {
      // Uma falha ao assinar sobe antes de mexer no que já estava guardado.
      const assinadas = await sign(faltando, seconds)
      const until = now() + (seconds - margin) * 1000
      for (const item of assinadas) {
        guardadas.set(item.path, { url: item.signedUrl, until })
        urls[item.path] = item.signedUrl
      }
    }
    // Caminho que saiu do catálogo não fica guardado ocupando memória.
    for (const path of guardadas.keys()) if (!(path in urls)) guardadas.delete(path)
    return urls
  }
}
