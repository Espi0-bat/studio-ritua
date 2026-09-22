import photo from '../assets/images/ritua-3040.webp'
import handprint from '../assets/images/handprint-ritua.png'
import './About.css'
export default function About() {
  return (
    <section id="sobre" className="about section">
      <div className="container about__inner">
        <figure className="about__photo">
          <img src={photo} alt="Cuias verdes e rosa, chaveiros estampados e cases de isqueiro com cogumelos e coração, sobre uma bandeja dourada" width="844" height="1500" loading="lazy" />
          <figcaption>formas, cores e nossas pequenas invenções.</figcaption>
        </figure>
        <div className="about__text">
          <p className="eyebrow">O studio</p>
          <div className="about__heading">
            <h2>Feitas à mão.<br /><span>De verdade.</span></h2>
            <div className="about__stamp">
              <img src={handprint} alt="" width="300" height="300" loading="lazy" />
              <span>uma a uma</span>
            </div>
          </div>
          <p>Cor misturada, forma criada, uma peça de cada vez. É assim que as cuias ganham vida aqui na Rituá.</p>
          <p>Trabalhamos a cerâmica plástica à mão, explorando combinações que carregam o nosso jeito de criar. Dos desenhos nas bordas aos pequenos relevos, o cuidado mora nos detalhes.</p>
          <a href="#galeria" className="text-link">Veja os detalhes nas fotos <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}
