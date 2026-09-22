import { whatsappUrl } from '../config'

export default function WhatsAppLink({ children, placement, message, onClick, ...props }) {
  const href = whatsappUrl(message)
  if (!href) return null
  return (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      {children}
    </a>
  )
}
