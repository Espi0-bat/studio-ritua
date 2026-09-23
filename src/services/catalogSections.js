import { productSpecs } from './productDetails.js'
import { statusOf } from './inventory.js'
export const catalogSections = [
  { category: 'Case', title: 'Cases de isqueiro', description: 'Cases de isqueiro com pequenos detalhes em relevo.' },
  { category: 'Piteira', title: 'Piteiras de vidro', description: 'Mais conforto na sessão, fluxo mais limpo e sabor preservado do início ao fim.' },
  { category: 'Cuia', title: 'Nossas cuias.', eyebrow: 'Também fazem parte do ritual', description: 'Uma cuia feita para ser só sua — e deixar a sua sessão ainda mais especial.' },
]
export function groupCatalog(products) {
  return catalogSections.map(section => ({ ...section, items: products.filter(p => p.published === true && p.category === section.category) }))
}
export function toGalleryProduct(p) {
  return { id: p.id, category: p.category, published: p.published, gridLabel: p.name, title: p.name,
    stock: p.stock, isUnique: p.isUnique === true, tag: `${p.category}${p.isUnique ? ' · Peça única' : ''} · Studio Rituá`, specs: productSpecs(p), subtitle: p.description, alt: p.name, priceCents: p.priceCents,
    media: p.photos[0] ? { type: 'image', src: p.photos[0] } : null,
    status: statusOf(p), available: p.stock - p.reserved > 0 }
}

// A reservation still owns stock: only a completed sale removes the piece.
export function selectShowcase(products, fallbacks) {
  return catalogSections.flatMap(({ category }) => {
    const stocked = products.filter(p => p.category === category && p.published === true && p.stock > 0)
    return stocked.length ? stocked : fallbacks.filter(p => p.category === category).slice(0, 1)
  })
}
