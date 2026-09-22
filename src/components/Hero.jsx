import photo from '../assets/images/ritua-2219.webp'
import './Hero.css'
import WhatsAppLink from './WhatsAppLink'
export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="eyebrow">Cuias artesanais · Studio Rituá</p>
          <h1>Seu momento,{' '}<span>seu ritual.</span></h1>
          <p className="hero__sub">Cuias feitas à mão em cerâmica plástica. Cor, forma e um pouco de nós em cada peça.</p>
          <div className="hero__actions">
            <WhatsAppLink className="btn" placement="hero">Consultar cuias no WhatsApp <span aria-hidden="true">↗</span></WhatsAppLink>
            <a href="#galeria" className="text-link">Ver as peças</a>
          </div>
          <p className="hero__note"><svg viewBox="0 0 72 42" aria-hidden="true"><path d="M3 6C14 34 37 39 64 14M48 14l18-3-5 18" /></svg>Feitas à mão. Uma a uma.</p>
        </div>
        <figure className="hero__photo">
          <img src={photo} alt="Seleção de cuias com bordas recortadas e desenhos em rosa, laranja, azul e vinho, sobre fundo de folhagens" width="844" height="1500" fetchPriority="high" />
          <figcaption>um pouco de cor pro seu ritual</figcaption>
        </figure>
      </div>
    </section>
  )
}
