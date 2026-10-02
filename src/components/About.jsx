import handprint from '../assets/images/handprint-ritua.webp'
import './About.css'
import useSiteMedia from './useSiteMedia'
export default function About() {
  // Esta foto fica muito abaixo da abertura: sem pré-carregamento, quem decide a hora do
  // download é o `loading="lazy"` do `<img>`, e quem não rola até aqui não baixa foto nenhuma.
  const [photo, restorePhoto] = useSiteMedia('studio', { preload: false })
  return (
    <section id="sobre" className="about section">
      <div className="container about__inner">
        <figure className="about__photo">
          <img src={photo.src} srcSet={photo.srcSet} sizes={photo.sizes} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" onError={restorePhoto} />
          {photo.caption && <figcaption>{photo.caption}</figcaption>}
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
          <p>Uma cuia feita para ser só sua — e deixar a sua sessão ainda mais especial.</p>
          <p>Cada cuia nasce uma por vez, com combinações de cores, formas e detalhes que fazem dela uma peça única.</p>
          <p>O material é levemente maleável, não gruda e ajuda a aproveitar melhor a sua crema, evitando desperdícios.</p>
          <p>Você também pode personalizar a sua com seu nome e escolher as cores que mais combinam com você e seu kit.</p>
          <a href="#cuias" className="text-link">Veja os detalhes nas fotos <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}
