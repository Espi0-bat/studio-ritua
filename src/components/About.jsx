import photo from '../assets/images/ritua-3040.webp'
import './About.css'
export default function About() {
  return (
    <section id="sobre" className="about section">
      <div className="container about__inner">
        <figure className="about__photo">
          <img src={photo} alt="Cuias verdes e rosa, chaveiros estampados e cases de isqueiro com cogumelos e coração, sobre uma bandeja dourada" width="844" height="1500" loading="lazy" />
          <figcaption>Cuias, chaveiros e cases do studio.</figcaption>
        </figure>
        <div className="about__text">
          <p className="eyebrow">O studio</p>
          <h2>Feitas à mão{' '}<br />na Rituá.</h2>
          <p>Criamos cuias em cerâmica plástica, explorando formas, cores e combinações em cada peça.</p>
          <p>Nas cuias, os desenhos se espalham pelo fundo e pelas bordas. Nos acessórios, aparecem cogumelos, corações e outros detalhes em relevo. As fotos mostram algumas dessas combinações.</p>
          <a href="#galeria" className="text-link">Veja os detalhes nas fotos <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}
