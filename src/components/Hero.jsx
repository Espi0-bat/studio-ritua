import photo from '../assets/images/ritua-9895.webp'
import './Hero.css'
import { instagramDirectUrl } from '../config'
export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="eyebrow">Piteiras & cases · Studio Rituá</p>
          <h1>Seu momento,{' '}<span>seu ritual.</span></h1>
          <p className="hero__sub">Piteiras, cases de isqueiro e cuias. Cor e personalidade nos detalhes do seu ritual.</p>
          <div className="hero__actions">
            <a href="#galeria" className="btn">Conhecer as peças <span aria-hidden="true">↓</span></a>
            <a href={instagramDirectUrl} className="text-link" target="_blank" rel="noopener noreferrer">Falar pelo direct ↗</a>
          </div>
          <p className="hero__note"><svg viewBox="0 0 72 42" aria-hidden="true"><path d="M3 6C14 34 37 39 64 14M48 14l18-3-5 18" /></svg>Detalhes que fazem o ritual.</p>
        </div>
        <figure className="hero__photo">
          <img src={photo} alt="Cases de isqueiro coloridos com detalhes em relevo da Rituá — peças indisponíveis" width="1125" height="1500" fetchPriority="high" />
          <figcaption>cases Rituá · coleção indisponível</figcaption>
        </figure>
      </div>
    </section>
  )
}
