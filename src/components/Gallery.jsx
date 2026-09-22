import { useEffect, useRef, useState } from 'react'
import { whatsappUrl } from '../config'
import photo1672 from '../assets/images/ritua-1672.webp'
import photo2200 from '../assets/images/ritua-2200.webp'
import photo2219 from '../assets/images/ritua-2219.webp'
import photo2374 from '../assets/images/ritua-2374.webp'
import photo3040 from '../assets/images/ritua-3040.webp'
import photo9895 from '../assets/images/ritua-9895.webp'
import './Gallery.css'
// Keep the supplied photos until the real videos arrive. Import future files from
// src/assets/videos/ and use media: { type: 'video', src: videoFile, poster: photo }.
// These photos show groups of pieces, not confirmed individual SKUs. Preserve
// their descriptive names until the client provides the product/photo mapping.
// DEMO DATA: measures, model names and prices below are illustrative, as requested.
// Replace them with the client's values and set illustrative: false per product.
// Comparable cuia references (consulted 2026-09-21; NOT specs of Rituá products):
// https://www.mobydickheadshop.com.br/produtos/cuia-elevation-laranja-print-d0dl7/ (7 cm)
// https://www.culturadab.com.br/produtos/cuia-de-ceramica-plastica-i-darko-edition1/ (7.5–8 x 3.5–4 cm)
// https://www.loubackstreet.com.br/cuias/ (R$100 small, R$120 medium)
// https://www.loubackstreet.com.br/produtos/cuia-de-ceramica-artesanal-grande-5gle9/ (R$140)
// Case measurements/price are fictional layout values, not taken from cuia specs.
const products = [
  {
    id: 'cores-em-mistura',
    media: { type: 'image', src: photo2200, width: 844, height: 1500 },
    gridLabel: 'Cores em mistura', title: 'Cores em mistura', tag: 'Cuias · Studio Rituá',
    subtitle: 'Cuias facetadas, com cores mescladas, fotografadas em luz natural.',
    alt: 'Sete cuias coloridas em rosa, azul, laranja e vinho sobre uma mesa de madeira',
    specs: { 'Diâmetro': '7 cm', Altura: '3,5 cm', Cor: 'Rosa, azul, laranja e vinho', Modelo: 'Facetada' },
    price: 'R$ 120,00', illustrative: true, available: null,
  },
  {
    id: 'entre-rosas-e-laranjas',
    media: { type: 'image', src: photo2219, width: 844, height: 1500 },
    gridLabel: 'Entre rosas e laranjas', title: 'Entre rosas e laranjas', tag: 'Cuias · Studio Rituá',
    subtitle: 'Combinações de cores vistas de cima, entre folhas verdes.',
    alt: 'Cuias rosas, vermelhas e laranjas com bordas facetadas sobre folhagens',
    specs: { 'Diâmetro': '8 cm', Altura: '4 cm', Cor: 'Rosa, vermelho e laranja', Modelo: 'Facetada' },
    price: 'R$ 140,00', illustrative: true, available: null,
  },
  {
    id: 'um-canto-do-ritual',
    media: { type: 'image', src: photo2374, width: 844, height: 1500 },
    gridLabel: 'Um canto do ritual', title: 'Um canto do ritual', tag: 'Cuias · Studio Rituá',
    subtitle: 'Uma cuia rosa entre os objetos da mesa, sob luz colorida.',
    alt: 'Cuia rosa sobre uma bandeja com acessórios, iluminada em rosa e roxo',
    specs: { 'Diâmetro': '7 cm', Altura: '3,5 cm', Cor: 'Rosa, sob luz colorida', Modelo: 'Mesclada' },
    price: 'R$ 100,00', illustrative: true, available: null,
  },
  {
    id: 'detalhes-sobre-a-mesa',
    media: { type: 'image', src: photo3040, width: 844, height: 1500 },
    gridLabel: 'Detalhes sobre a mesa', title: 'Detalhes sobre a mesa', tag: 'Peças · Studio Rituá',
    subtitle: 'Cuias e acessórios lado a lado: cores mescladas e detalhes modelados. Os cases de isqueiro desta foto estão esgotados.',
    alt: 'Cuias verdes e rosas ao lado de acessórios com cogumelos e desenhos figurativos',
    specs: { 'Diâmetro': '8 cm', Altura: '4 cm', Cor: 'Verde e rosa', Modelo: 'Cuia facetada' },
    price: 'R$ 140,00', illustrative: true, available: null,
  },
  {
    id: 'sob-outra-luz',
    media: { type: 'image', src: photo1672, width: 1125, height: 1500 },
    gridLabel: 'Sob outra luz', title: 'Sob outra luz', tag: 'Cuias · Studio Rituá',
    subtitle: 'As cores das cuias sob iluminação azul.',
    alt: 'Conjunto de cuias coloridas fotografado sob luz azul intensa',
    specs: { 'Diâmetro': '7,5 cm', Altura: '3,5 cm', Cor: 'Variadas, sob luz azul', Modelo: 'Facetada' },
    price: 'R$ 120,00', illustrative: true, available: null,
  },
  {
    id: 'outras-formas',
    media: { type: 'image', src: photo9895, width: 1125, height: 1500 },
    gridLabel: 'Outras formas', title: 'Cases de isqueiro', tag: 'Acessórios · Studio Rituá',
    subtitle: 'Cases de isqueiro com pequenos detalhes em relevo. As unidades desta seleção acabaram.',
    alt: 'Cases de isqueiro coloridos decorados com cogumelos, rostos e personagens sobre uma mesa clara',
    specs: { Comprimento: '8 cm', Largura: '3 cm', Cor: 'Variadas, conforme a peça', Modelo: 'Case de isqueiro' },
    price: 'R$ 60,00', illustrative: true, available: false,
    whatsappMsg: 'Olá! Vi que os cases de isqueiro da seleção “Outras formas” estão esgotados. Vocês têm previsão de novas peças?',
  },
]

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
      trigger.current?.focus()
    }
  }, [selected])
  const product = products.find(item => item.id === selected)
  const contact = product ? whatsappUrl(product.whatsappMsg || `Olá! Vi “${product.title}” no site da Rituá. Gostaria de consultar disponibilidade, valores e medidas das peças dessa foto.`) : null
  return (
    <section id="galeria" className="gallery section">
      <div className="container">
        <div className="gallery__heading">
          <div><p className="eyebrow">As peças</p><h2>Conheça as cuias.</h2></div>
          <p>Um pouco do que fazemos por aqui.<br />Abra as fotos para consultar os detalhes.</p>
        </div>
        <div className="gallery__grid">
          {products.map((item, index) => (
            <figure className="gallery__item" key={item.id}>
              <button className="gallery__open" onClick={(event) => { trigger.current = event.currentTarget; setSelected(item.id) }}
                aria-label={`Ver detalhes: ${item.gridLabel}${item.available === false ? ' — cases esgotados' : ''}`} aria-haspopup="dialog">
                <ProductMedia product={item} reducedMotion={reducedMotion} />
                {item.available === false && <span className="gallery__stock">Cases esgotados</span>}
                <span className="gallery__zoom" aria-hidden="true">Ver detalhes ↗</span>
              </button>
              <figcaption><span className="gallery__number">0{index + 1}</span><h3>{item.gridLabel}</h3></figcaption>
            </figure>
          ))}
        </div>
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
            {product.available === false && <p className="gallery__availability">Cases esgotados</p>}
            <dl className="gallery__specs" aria-label="Especificações das peças">
              {Object.entries(product.specs).map(([label, value]) => (
                <div className="gallery__spec-row" key={label}>
                  <dt>{label}</dt><dd>{value ?? 'Sob consulta'}</dd>
                </div>
              ))}
            </dl>
            {product.illustrative && <p className="gallery__reference">Medidas e preço ilustrativos para esta prévia.</p>}
            <p className={`gallery__price${product.price === null ? ' gallery__price--consult' : ''}`}>
              {product.price ?? 'Consulte o valor'}
            </p>
            {contact && <a className="btn" href={contact} target="_blank" rel="noopener noreferrer">{product.available === false ? 'Perguntar sobre reposição' : 'Consultar disponibilidade'} <span aria-hidden="true">↗</span></a>}
          </div>
        </div>}
      </dialog>
    </section>
  )
}
