import { instagramUrl, instagramDirectUrl } from '../config'
import logo from '../assets/logo.png'
import './Footer.css'

export default function Footer() {
  const contact = instagramDirectUrl
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="contato">
      <div className="container footer__inner">

        <div className="footer__brand">
          <a href="#inicio" className="footer__logo brand"><img src={logo} alt="Studio Rituá — início" width="1024" height="1024" loading="lazy" /></a>
          <p>Piteiras, cases e cuias para o seu ritual.</p>
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
                Falar pelo direct <span aria-hidden="true">↗</span>
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
        <p>Engenharia do site por <a href="https://pixelry.com.br" target="_blank" rel="noopener noreferrer">PIXELRY</a></p>
        <a href="#inicio">Voltar ao início ↑</a>
      </div>
    </footer>
  )
}
