import { useEffect, useState } from 'react'
import Gallery from './Gallery'
import { staticProducts } from '../data/catalog'
import { liveCatalog } from '../services/liveCatalog'
import { supabase } from '../services/supabase'
import { toGalleryProduct, selectShowcase } from '../services/catalogSections'
export default function LiveGallery() {
  const [products, setProducts] = useState([])
  const [loaded, setLoaded] = useState(!supabase)
  const [error, setError] = useState(false)
  useEffect(() => {
    if (!supabase) return
    let active = true
    let loading = false
    async function refresh() {
      if (loading) return
      loading = true
      try { const state = await liveCatalog.publicLoad(); if (active) { setProducts(state.products.map(toGalleryProduct)); setError(false); setLoaded(true) } }
      catch { if (active) setError(true) }
      finally { loading = false }
    }
    refresh()
    const timer = setInterval(refresh, 60000)
    window.addEventListener('focus', refresh)
    return () => { active = false; clearInterval(timer); window.removeEventListener('focus', refresh) }
  }, [])
  return <>{loaded ? <Gallery products={selectShowcase(products, staticProducts)} /> : <section id="galeria" className="gallery section"><p className="container" role="status">{error ? "Catálogo temporariamente indisponível. Tente novamente em instantes." : "Carregando as peças…"}</p></section>}{error && <p className="catalog-load-note" role="status">Não foi possível atualizar as peças agora. Confirme a disponibilidade pelo direct.</p>}</>
}
