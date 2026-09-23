export async function preparePhotos(files) {
  if (files.length > 4) throw new Error('Escolha até quatro fotos por peça.')
  return Promise.all(Array.from(files, file => new Promise((resolve, reject) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return reject(new Error('Use fotos JPG, PNG ou WebP. Se estiver em HEIC, exporte como JPG.'))
    if (file.size > 15 * 1024 * 1024) return reject(new Error('Cada foto deve ter até 15 MB.'))
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Não foi possível abrir esta foto.')) }
    image.onload = () => {
      try {
        const scale = Math.min(1, 1000 / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(image.width * scale)); canvas.height = Math.max(1, Math.round(image.height * scale))
        const ctx = canvas.getContext('2d'); ctx.fillStyle = '#FAEAD3'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.75))
      } catch { reject(new Error('Não foi possível preparar esta foto.')) }
      finally { URL.revokeObjectURL(url) }
    }
    image.src = url
  })))
}
