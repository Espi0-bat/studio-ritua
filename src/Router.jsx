import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import App from './App'
const Admin = lazy(() => import('./admin/AdminEntry'))
export default function Router() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => { const onHash = () => setHash(window.location.hash); window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash) }, [])
  const authReturn = new URLSearchParams(window.location.search).get('admin') === '1'
  const admin = authReturn || hash === '#/admin' || hash.startsWith('#/admin/')
  const previousArea = useRef(admin)
  useLayoutEffect(() => {
    if (previousArea.current === admin) return
    previousArea.current = admin
    const target = !admin && document.getElementById(hash.slice(1))
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [admin, hash])
  useEffect(() => { document.title = admin ? 'Painel — Studio Rituá' : 'Studio Rituá — Piteiras, cases e cuias' }, [admin])
  return admin ? <Suspense fallback={<p style={{ padding: 24, color: 'var(--cream)' }} role="status">Abrindo painel…</p>}><Admin key={hash === '#/admin/demo' ? 'demo' : 'live'} /></Suspense> : <App />
}
