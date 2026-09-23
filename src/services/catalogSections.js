import { productSpecs } from './productDetails.js'
import { statusOf } from './inventory.js'
export const piteiraLineSections = [
  { key: 'Premium', title: 'Piteiras Premium' },
  { key: 'Classica', title: 'Piteiras Clássicas' },
]
export const catalogSections = [
  { category: 'Piteira', title: 'Piteiras de vidro', description: 'Mais conforto na sessão, fluxo mais limpo e sabor preservado do início ao fim.', lines: piteiraLineSections },
  { category: 'Case', title: 'Cases de isqueiro', description: 'Cases de isqueiro com pequenos detalhes em relevo.' },
  { category: 'Cuia', title: 'Nossas cuias.', eyebrow: 'Também fazem parte do ritual', description: 'Uma cuia feita para ser só sua — e deixar a sua sessão ainda mais especial.' },
]
export function groupCatalog(products) {
  return catalogSections.map(section => {
    const items = products.filter(p => p.published === true && p.category === section.category)
    if (!section.lines) return { ...section, items }
    // Piteiras sem linha definida (cadastros antigos) entram na última linha da lista, hoje "Clássica".
    const fallbackKey = section.lines[section.lines.length - 1].key
    const groups = section.lines.map(line => ({ ...line, items: items.filter(item => item.line === line.key || (line.key === fallbackKey && !section.lines.some(l => l.key === item.line))) }))
    return { ...section, items, groups }
  })
}
export function toGalleryProduct(p) {
  return { id: p.id, category: p.category, published: p.published, gridLabel: p.name, title: p.name,
    stock: p.stock, isUnique: p.isUnique === true, line: p.line ?? null, tag: `${p.category}${p.isUnique ? ' · Peça única' : ''} · Studio Rituá`, specs: productSpecs(p), subtitle: p.description, alt: p.name, priceCents: p.priceCents,
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
