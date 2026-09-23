import { useEffect, useRef, useState } from 'react'
import { instagramDirectUrl, instagramUrl } from '../config'
import { staticProducts } from '../data/catalog'
import { groupCatalog } from '../services/catalogSections'
import './Gallery.css'
import ProductCarousel from './ProductCarousel'

const formatPrice = cents => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function ProductMedia({ product, detail = false, reducedMotion }) {
  const { media, alt } = product
  if (!media) return <div className="gallery__placeholder" role="img" aria-label="Peça sem foto">Foto em breve</div>
  if (media.type === 'video') {
    return <video src={media.src} poster={media.poster} autoPlay={!reducedMotion}
      muted loop playsInline controls={detail} preload="metadata" aria-label={alt}
      className={detail ? 'gallery__detail-video' : undefined} />
  }
  return <img src={media.src} alt={alt} width={media.width} height={media.height}
    loading={detail ? 'eager' : 'lazy'} />
}

export default function Gallery({ products = staticProducts, preview = false }) {
  const sections = groupCatalog(products)
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
  useEffect(() => { if (selected && !products.some(p => p.id === selected)) setSelected(null) }, [products, selected])
  const product = products.find(item => item.id === selected)
  const contact = product?.reference ? instagramUrl : instagramDirectUrl
  return (
    <section id="galeria" className="gallery section">
      <div className="container">
        {sections.map(section => (
          <section className={`gallery__category gallery__category--${section.category.toLowerCase()}`} key={section.category} aria-label={section.title}>
            <div className="gallery__heading">
              <div>{section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}<h2>{section.title}</h2></div>
              <p>{section.description}</p>
            </div>
            {section.items.some(item => item.reference) && <h3 className="gallery__premium">Piteiras Premium</h3>}
            {section.items.length ? <ProductCarousel items={section.items} label={section.title} reducedMotion={reducedMotion} renderItem={(item, index, duplicate) => (
              <>
                <button className={`gallery__open${item.reference ? ' gallery__open--reference' : ''}`} tabIndex={duplicate ? -1 : 0}
                  onClick={event => {
                    trigger.current = event.currentTarget.closest('.gallery__track').querySelector(`[data-carousel-copy="1"][data-carousel-index="${index}"] button`)
                    setSelected(item.id)
                  }} aria-label={`Ampliar foto: ${item.gridLabel}`} aria-haspopup="dialog">
                  <ProductMedia product={item} reducedMotion={reducedMotion} />
                  {(item.status || item.available === false) && <span className="gallery__stock">{item.status || 'Indisponível'}</span>}
                  <span className="gallery__zoom" aria-hidden="true">Ampliar foto ↗</span>
                </button>
                <figcaption><span className="gallery__number">{String(index + 1).padStart(2, '0')}</span><h3>{item.gridLabel}</h3></figcaption>
                {Number.isInteger(item.priceCents) && <p className="gallery__card-price">{formatPrice(item.priceCents)}</p>}
              </>
            )} /> : <p className="gallery__empty">{preview ? 'Nenhuma peça publicada nesta categoria. Selecione este tipo no cadastro para adicioná-la aqui.' : 'Novas peças serão apresentadas por aqui.'}</p>}
            {section.items.some(item => item.reference) && <p className="gallery__feature-caption">Piteiras em breve. A peça da foto é um modelo de exemplo.</p>}
          </section>
        ))}
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
            {Number.isInteger(product.priceCents) && <p className="gallery__price">{formatPrice(product.priceCents)}</p>}
            {product.reference && <p className="gallery__reference">Modelo de exemplo, sem disponibilidade na Rituá. Foto e medidas: <a href={product.reference} target="_blank" rel="noopener noreferrer">Madruga Shop</a>. A referência não especifica se o diâmetro é interno ou externo.</p>}
            <a className="btn" href={contact} target="_blank" rel="noopener noreferrer">{product.reference ? 'Acompanhar no Instagram' : 'Falar pelo direct'} <span aria-hidden="true">↗</span></a>
          </div>
        </div>}
      </dialog>
    </section>
  )
}
