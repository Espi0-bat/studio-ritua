import { instagramUrl, whatsappUrl } from '../config'
import './Footer.css'

export default function Footer() {
  const contact = whatsappUrl()
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="contato">
      <div className="container footer__inner">

        <div className="footer__brand">
          <a href="#inicio" className="footer__logo">Studio <em>Rituá</em></a>
          <p>Cuias feitas à mão em cerâmica plástica.</p>
        </div>

        <nav className="footer__links" aria-label="Navegação do rodapé">
          <a href="#galeria">As peças</a>
          <a href="#sobre">O studio</a>
          <a href="#faq">Dúvidas</a>
        </nav>

        {(contact || instagramUrl) && (
          <div className="footer__contact">
            <p>A conversa continua por aqui.</p>
            {contact && (
              <a href={contact} target="_blank" rel="noopener noreferrer">
                WhatsApp <span aria-hidden="true">↗</span>
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}

      </div>
      <div className="container footer__bottom">
        <p>© {year} Studio Rituá</p>
        <a href="#inicio">Voltar ao início ↑</a>
      </div>
    </footer>
  )
}
