// Configure the official contacts in .env.local before publishing.
const phone = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')
const instagram = (import.meta.env.VITE_INSTAGRAM_HANDLE || '').replace(/^@/, '').trim()

export const instagramUrl = /^[a-zA-Z0-9._]+$/.test(instagram)
  ? `https://www.instagram.com/${instagram}/`
  : null

export function whatsappUrl(message = 'Olá! Vim pelo site da Rituá e gostaria de conhecer as peças disponíveis.') {
  return /^55\d{10,11}$/.test(phone)
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : null
}
