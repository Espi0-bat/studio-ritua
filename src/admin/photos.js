// WebP guarda a mesma foto em menos bytes que JPEG. Onde o navegador não sabe codificar
// (Safari anterior ao 16.4), `toDataURL` devolve um PNG caladamente — e PNG de fotografia
// é bem maior que o JPEG de hoje. Por isso quem decide é o que voltou, não o que foi pedido.
function melhorFormato(canvas) {
  const webp = canvas.toDataURL('image/webp', 0.8)
  return webp.startsWith('data:image/webp') ? webp : canvas.toDataURL('image/jpeg', 0.75)
}

// O tipo declarado pelo arquivo não decide nada: foto de iPhone chega como HEIC, e pela folha de
// compartilhamento chega sem tipo nenhum. Quem decide é tentar abrir — o Safari 17 em diante abre
// HEIC e o canvas reexporta JPEG, então ela envia direto do celular; onde o navegador não abre, o
// erro já sabe dizer o que fazer. A lista antiga recusava antes de tentar.
function prepare(file, max) {
  return new Promise((resolve, reject) => {
    if (file.type && (!file.type.startsWith('image/') || file.type.includes('svg'))) return reject(new Error('Escolha uma foto. Vídeo, PDF e desenho em SVG não servem aqui.'))
    if (file.size > 15 * 1024 * 1024) return reject(new Error('Cada foto deve ter até 15 MB.'))
    const heic = /hei[cf]/i.test(file.type) || /\.hei[cf]$/i.test(file.name)
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error(heic
      ? 'Esta foto está em HEIC e este navegador não abre HEIC. Abra a foto e exporte como JPG, ou mude Ajustes > Câmera > Formatos para "Mais Compatível".'
      : 'Não foi possível abrir esta foto.')) }
    image.onload = () => {
      try {
        const scale = Math.min(1, max / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(image.width * scale)); canvas.height = Math.max(1, Math.round(image.height * scale))
        const ctx = canvas.getContext('2d'); ctx.fillStyle = '#FAEAD3'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve({ dataUrl: melhorFormato(canvas), width: canvas.width, height: canvas.height })
      } catch { reject(new Error('Não foi possível preparar esta foto.')) }
      finally { URL.revokeObjectURL(url) }
    }
    image.src = url
  })
}
export async function preparePhotos(files) {
  if (files.length > 4) throw new Error('Escolha até quatro fotos por peça.')
  return (await Promise.all(Array.from(files, file => prepare(file, 1000)))).map(photo => photo.dataUrl)
}
// A foto da abertura ocupa metade da tela num monitor grande: precisa de mais pixels que a de uma peça.
export const prepareSitePhoto = file => prepare(file, 1600)
