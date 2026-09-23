import { useEffect, useRef, useState } from 'react'
import { instagramDirectUrl, instagramUrl } from '../config'
import piteiraExample from '../assets/images/piteira-exemplo-mona-brisa.jpg'
import photo1672 from '../assets/images/ritua-1672.webp'
import photo2200 from '../assets/images/ritua-2200.webp'
import photo2219 from '../assets/images/ritua-2219.webp'
import photo2374 from '../assets/images/ritua-2374.webp'
import photo3040 from '../assets/images/ritua-3040.webp'
import photo9895 from '../assets/images/ritua-9895.webp'
import './Gallery.css'
import ProductCarousel from './ProductCarousel'
// Keep the supplied photos until the real videos arrive. Import future files from
// src/assets/videos/ and use media: { type: 'video', src: videoFile, poster: photo }.
// These photos show groups of pieces, not confirmed individual SKUs. Preserve
// their descriptive names until the client provides the product/photo mapping.
const cuias = [
  {
    id: 'cores-em-mistura',
    media: { type: 'image', src: photo2200, width: 844, height: 1500 },
    gridLabel: 'Cores em mistura', title: 'Cores em mistura', tag: 'Cuias · Studio Rituá',
    subtitle: 'Cuias facetadas, com cores mescladas, fotografadas em luz natural.',
    alt: 'Sete cuias coloridas em rosa, azul, laranja e vinho sobre uma mesa de madeira',
  },
  {
    id: 'entre-rosas-e-laranjas',
    media: { type: 'image', src: photo2219, width: 844, height: 1500 },
    gridLabel: 'Entre rosas e laranjas', title: 'Entre rosas e laranjas', tag: 'Cuias · Studio Rituá',
    subtitle: 'Combinações de cores vistas de cima, entre folhas verdes.',
    alt: 'Cuias rosas, vermelhas e laranjas com bordas facetadas sobre folhagens',
  },
  {
    id: 'um-canto-do-ritual',
    media: { type: 'image', src: photo2374, width: 844, height: 1500 },
    gridLabel: 'Um canto do ritual', title: 'Um canto do ritual', tag: 'Cuias · Studio Rituá',
    subtitle: 'Uma cuia rosa entre os objetos da mesa, sob luz colorida.',
    alt: 'Cuia rosa sobre uma bandeja com acessórios, iluminada em rosa e roxo',
  },
  {
    id: 'detalhes-sobre-a-mesa',
    media: { type: 'image', src: photo3040, width: 844, height: 1500 },
    gridLabel: 'Detalhes sobre a mesa', title: 'Detalhes sobre a mesa', tag: 'Peças · Studio Rituá',
    subtitle: 'Cuias e acessórios lado a lado: cores mescladas e detalhes modelados. Os cases de isqueiro desta foto estão esgotados.',
    alt: 'Cuias verdes e rosas ao lado de acessórios com cogumelos e desenhos figurativos',
  },
  {
    id: 'sob-outra-luz',
    media: { type: 'image', src: photo1672, width: 1125, height: 1500 },
    gridLabel: 'Sob outra luz', title: 'Sob outra luz', tag: 'Cuias · Studio Rituá',
    subtitle: 'As cores das cuias sob iluminação azul.',
    alt: 'Conjunto de cuias coloridas fotografado sob luz azul intensa',
  },

]

const featured = [
  {
    id: 'piteira-exemplo',
    media: { type: 'image', src: piteiraExample, width: 1000, height: 1000 },
    gridLabel: 'Piteiras', title: 'Mona Brisa · Cápsula Coração', tag: 'Piteiras · Modelo de exemplo',
    subtitle: 'Uma referência para conhecer os detalhes de uma piteira. As piteiras da Rituá estão para chegar; os modelos da seleção serão apresentados em breve.',
    alt: 'Piteira de vidro Mona Brisa Cápsula Coração, modelo de exemplo da Madruga Shop',
    status: 'Em breve · exemplo',
    specs: { Comprimento: '113 mm (11,3 cm)', 'Diâmetro informado': '4,8 mm' },
    reference: 'https://www.madrugashop.com/acessorios-headshop/piteiras-de-vidro/piteira-de-vidro-mona-brisa-capsula-coracao',
  },
  {
    id: 'outras-formas', available: false,
    media: { type: 'image', src: photo9895, width: 1125, height: 1500 },
    gridLabel: 'Outras formas', title: 'Cases de isqueiro', tag: 'Acessórios · Studio Rituá',
    subtitle: 'Cases de isqueiro com pequenos detalhes em relevo. As unidades desta seleção acabaram.',
    alt: 'Cases de isqueiro coloridos decorados com cogumelos, rostos e personagens sobre uma mesa clara',
  },
]
const products = [...featured, ...cuias]

function ProductMedia({ product, detail = false, reducedMotion }) {
  const { media, alt } = product
  if (media.type === 'video') {
    return <video src={media.src} poster={media.poster} autoPlay={!reducedMotion}
      muted loop playsInline controls={detail} preload="metadata" aria-label={alt}
      className={detail ? 'gallery__detail-video' : undefined} />
  }
  return <img src={media.src} alt={alt} width={media.width} height={media.height}
    loading={detail ? 'eager' : 'lazy'} />
}

export default function Gallery() {
  const [selected, setSelected] = useState(null)
  const [reducedMotion, setReducedMotion] = useState(true)
  const dialog = useRef(null)
  const closeButton = useRef(null)
  const trigger = useRef(null)
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(preference.matches)
    update()
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (selected === null) return
    const element = dialog.current
    const previousOverflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    return () => {
      element.close()
      document.body.style.overflow = previousOverflow
      trigger.current?.focus({ preventScroll: true })
    }
  }, [selected])
  const product = products.find(item => item.id === selected)
  const contact = product?.reference ? instagramUrl : instagramDirectUrl
  return (
    <section id="galeria" className="gallery section">
      <div className="container">
        <p className="eyebrow">As peças</p>
        <div className="gallery__featured">
          {featured.map(item => (
            <article className="gallery__feature" key={item.id}>
              <div className="gallery__feature-heading">
                <h2>{item.reference ? 'Piteiras de vidro' : 'Cases de isqueiro'}</h2>
                <p>{item.reference ? 'Mais conforto na sessão, fluxo mais limpo e sabor preservado do início ao fim.' : 'As últimas peças foram vendidas. Novos cases serão apresentados por aqui.'}</p>
              </div>
              {item.reference && <h3>Piteiras Premium</h3>}
              <button className="gallery__open" onClick={event => { trigger.current = event.currentTarget; setSelected(item.id) }} aria-haspopup="dialog" aria-label={`Ver detalhes: ${item.gridLabel}`}>
                <ProductMedia product={item} reducedMotion={reducedMotion} />
                <span className="gallery__stock">{item.status || 'Indisponível'}</span>
                <span className="gallery__zoom">Ver detalhes ↗</span>
              </button>
              {item.reference && <p className="gallery__feature-caption">Piteiras em breve. A peça da foto é um modelo de exemplo.</p>}
            </article>
          ))}
        </div>
        <div className="gallery__heading gallery__cuia-heading">
          <div><p className="eyebrow">Também fazem parte do ritual</p><h2>Nossas cuias.</h2></div>
          <p>Uma cuia feita para ser só sua — e deixar a sua sessão ainda mais especial.</p>
        </div>
        <ProductCarousel items={cuias} reducedMotion={reducedMotion} renderItem={(item, index, duplicate) => (
          <>
            <button className="gallery__open" tabIndex={duplicate ? -1 : 0}
              onClick={event => {
                trigger.current = event.currentTarget.closest('.gallery__track').querySelector(`[data-carousel-copy="1"][data-carousel-index="${index}"] button`)
                setSelected(item.id)
              }} aria-label={`Ampliar foto: ${item.gridLabel}`} aria-haspopup="dialog">
              <ProductMedia product={item} reducedMotion={reducedMotion} />
              <span className="gallery__zoom" aria-hidden="true">Ampliar foto ↗</span>
            </button>
            <figcaption><span className="gallery__number">0{index + 1}</span><h3>{item.gridLabel}</h3></figcaption>
          </>
        )} />
      </div>
      <dialog className="gallery__dialog" ref={dialog} aria-labelledby="photo-title" aria-describedby="photo-description"
        onCancel={(event) => { event.preventDefault(); setSelected(null) }}
        onClick={(event) => { if (event.target === event.currentTarget) setSelected(null) }}>
        {product && <div className="gallery__detail">
          <div className="gallery__toolbar">
            <button ref={closeButton} className="gallery__close" onClick={() => setSelected(null)} aria-label="Fechar detalhes">Fechar <span aria-hidden="true">×</span></button>
          </div>
          <ProductMedia product={product} detail reducedMotion={reducedMotion} />
          <div className="gallery__detail-text">
            <p className="eyebrow">{product.tag}</p>
            <h2 id="photo-title">{product.title}</h2>
            <p id="photo-description" className="gallery__subtitle">{product.subtitle}</p>
            {product.available === false && <p className="gallery__availability">Indisponível</p>}
            {product.specs && <dl className="gallery__specs" aria-label="Especificações das peças">
              {Object.entries(product.specs).map(([label, value]) => (
                <div className="gallery__spec-row" key={label}>
                  <dt>{label}</dt><dd>{value ?? 'Sob consulta'}</dd>
                </div>
              ))}
            </dl>}
            {product.reference && <p className="gallery__reference">Modelo de exemplo, sem disponibilidade na Rituá. Foto e medidas: <a href={product.reference} target="_blank" rel="noopener noreferrer">Madruga Shop</a>. A referência não especifica se o diâmetro é interno ou externo.</p>}
            <a className="btn" href={contact} target="_blank" rel="noopener noreferrer">{product.reference ? 'Acompanhar no Instagram' : 'Falar pelo direct'} <span aria-hidden="true">↗</span></a>
          </div>
        </div>}
      </dialog>
    </section>
  )
}
