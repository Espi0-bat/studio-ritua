import photo from '../assets/images/ritua-9895.webp'
import './Hero.css'
import { instagramDirectUrl } from '../config'
export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="eyebrow">Piteiras & cases · Studio Rituá</p>
          <h1>Seu momento,{' '}<span>seu ritual.<svg className="hero__leaf" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M32 52C22 50 14 46 8 38L22 41C13 33 7 24 5 15C17 20 25 28 28 37C25 22 27 10 32 2C37 10 39 22 36 37C39 28 47 20 59 15C57 24 51 33 42 41L56 38C50 46 42 50 32 52Z" /><path d="M32 43V61" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></span></h1>
          <div className="hero__sub">
            <p>Se você gosta de peças diferentes e cheias de personalidade, chegou no lugar certo.</p>
            <p>Piteiras de vidro, cases de isqueiro e cuias artesanais, feitas para quem valoriza exclusividade e qualidade.</p>
          </div>
          <div className="hero__actions">
            <a href="#galeria" className="btn">Conheça nossas peças <span aria-hidden="true">↓</span></a>
            <a href={instagramDirectUrl} className="text-link" target="_blank" rel="noopener noreferrer">Falar pelo direct ↗</a>
          </div>
        </div>
        <figure className="hero__photo">
          <img src={photo} alt="Cases de isqueiro coloridos com detalhes em relevo da Rituá — peças indisponíveis" width="1125" height="1500" fetchPriority="high" />
          <figcaption>cases Rituá · coleção indisponível</figcaption>
        </figure>
      </div>
    </section>
  )
}
