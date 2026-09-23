import { useEffect, useRef, useState } from 'react'
import { demoCatalog } from '../services/demoCatalog'
import { actionLabels, categories, statusOf } from '../services/inventory'
import { preparePhotos } from './photos'
import './Admin.css'
const money = cents => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const blank = () => ({ name: '', category: 'Cuia', priceCents: 0, description: '', photos: [], published: false, quantity: 1 })
function Modal({ title, children, onClose, busy }) {
  const ref = useRef(null)
  useEffect(() => { const dialog = ref.current; dialog.showModal(); return () => dialog.close() }, [])
  return <dialog ref={ref} className="admin-modal" aria-labelledby="admin-modal-title" onCancel={e => { e.preventDefault(); if (!busy) onClose() }}>
    <header><h2 id="admin-modal-title">{title}</h2><button type="button" disabled={busy} onClick={onClose} aria-label="Fechar janela">✕</button></header>{children}
  </dialog>
}
function Editor({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial)
  const [price, setPrice] = useState((initial.priceCents / 100).toFixed(2))
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const guard = useRef(false)
  const change = (key, value) => setForm(old => ({ ...old, [key]: value }))
  async function submit(e) {
    e.preventDefault()
    if (guard.current) return
    guard.current = true; setBusy(true); setError('')
    try { await onSave({ ...form, priceCents: Math.round(Number(price.replace(',', '.')) * 100) }, initial.revision); onClose() }
    catch (e) { setError(e.message) }
    finally { guard.current = false; setBusy(false) }
  }
  async function upload(e) {
    const files = Array.from(e.target.files); e.target.value = ''
    if (!files.length) return
    setBusy(true); setError('')
    try { if (form.photos.length + files.length > 4) throw new Error('Você pode usar até quatro fotos.'); change('photos', [...form.photos, ...await preparePhotos(files)]) }
    catch (e) { setError(e.message) } finally { setBusy(false) }
  }
  return <Modal title={form.id ? 'Editar peça' : 'Nova peça'} onClose={onClose} busy={busy}>
    <form onSubmit={submit}><fieldset disabled={busy}>
      <label>Nome da peça<input autoFocus required maxLength={100} value={form.name} onChange={e => change('name', e.target.value)} placeholder="Ex.: Cuia Aurora" /></label>
      <div className="admin-fields"><label>Categoria<select value={form.category} onChange={e => change('category', e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select></label>
      <label>Preço (R$)<input type="number" min="0" step="0.01" required value={price} onChange={e => setPrice(e.target.value)} /></label></div>
      <label>Descrição<textarea rows={3} maxLength={2000} value={form.description} onChange={e => change('description', e.target.value)} placeholder="Cores, materiais e detalhes da peça" /></label>
      {!form.id && <label>Quantidade inicial<input type="number" min="0" max="9999" step="1" required value={form.quantity} onChange={e => change('quantity', e.target.value)} /></label>}
      <label>Fotos · até 4<input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={upload} /></label>
      <p className="admin-help">JPG, PNG ou WebP. A primeira foto será a capa.</p>
      <div className="admin-photos">{form.photos.map((photo, i) => <div key={i}><img src={photo} alt={`Foto ${i + 1} da peça`} /><button type="button" onClick={() => change('photos', form.photos.filter((_, n) => n !== i))}>Remover foto {i + 1}</button></div>)}</div>
      <label className="admin-check"><input type="checkbox" checked={form.published} onChange={e => change('published', e.target.checked)} />Exibir na vitrine de demonstração</label>
      <p className="admin-help">Desmarcada, a peça fica como rascunho. O site público não muda nesta demonstração.</p>
      <button className="admin-primary" type="submit">{busy ? 'Salvando…' : 'Salvar peça'}</button>
    </fieldset>{error && <p className="admin-error" role="alert">{error}</p>}</form>
  </Modal>
}
function Movement({ product, action, event, onClose, onSave }) {
  const [quantity, setQuantity] = useState(1)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const guard = useRef(false)
  const operationId = useRef(crypto.randomUUID())
  const title = action === 'undo' ? 'Desfazer movimentação' : actionLabels[action]
  async function submit(e) {
    e.preventDefault(); if (guard.current) return
    guard.current = true; setBusy(true); setError('')
    try { await onSave(product, action, Number(quantity), operationId.current, event); onClose() }
    catch (e) { setError(e.message) } finally { guard.current = false; setBusy(false) }
  }
  return <Modal title={title} onClose={onClose} busy={busy}><form onSubmit={submit}>
    <p><strong>{product.name}</strong></p><p className="admin-help">{product.stock - product.reserved} livres · {product.reserved} reservadas</p>
    {action === 'undo' ? <p>A última movimentação de estoque será revertida e a correção ficará no histórico.</p> : <label>Quantidade<input autoFocus required disabled={busy} type="number" min="1" max="9999" step="1" value={quantity} onChange={e => setQuantity(e.target.value)} /></label>}
    {error && <p role="alert" className="admin-error">{error}</p>}<button disabled={busy} className="admin-primary">{busy ? 'Salvando…' : 'Confirmar'}</button>
  </form></Modal>
}
export default function Admin() {
  const [state, setState] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [view, setView] = useState('pieces')
  const [filter, setFilter] = useState('Todas')
  const [search, setSearch] = useState('')
  const [editor, setEditor] = useState(null)
  const [movement, setMovement] = useState(null)
  async function reload() { try { setState(await demoCatalog.load()); setError('') } catch (e) { setError(e.message) } }
  useEffect(() => { reload(); const handler = () => reload(); window.addEventListener('storage', handler); return () => window.removeEventListener('storage', handler) }, [])
  async function save(input, revision) { try { setState(await demoCatalog.save(input, revision)); setNotice('Peça salva na demonstração.') } catch (e) { await reload(); throw e } }
  async function move(p, action, quantity, operationId, event) {
    try { setState(action === 'undo' ? await demoCatalog.undo(p.id, p.revision, event.id, operationId) : await demoCatalog.move(p.id, p.revision, action, quantity, operationId)); setNotice('Estoque atualizado na demonstração.') }
    catch (e) { await reload(); throw e }
  }
  function exportData() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }))
    const a = document.createElement('a'); a.href = url; a.download = 'ritua-demonstracao.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  const products = state?.products || []
  const visible = products.filter(p => p.name.toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR')) && (view !== 'showcase' || p.published) && (filter === 'Todas' || (filter === 'Reservado' ? p.reserved > 0 : statusOf(p) === filter)))
  return <main className="admin">
    <header className="admin-header"><a className="admin-brand" href="#/admin">studio rituá<span>Seu painel de peças</span></a><a href="#">Ver site ↗</a></header>
    <aside className="admin-banner"><strong>Modo de demonstração</strong><p>Experimente à vontade. Os dados ficam só neste navegador, não são enviados ao site e não aparecem em outros celulares. O acesso com login será conectado depois.</p></aside>
    <div className="admin-title"><div><p className="admin-kicker">Tudo no seu ritmo</p><h1>Suas peças, seu controle.</h1></div><button className="admin-primary" onClick={() => setEditor(blank())} disabled={!state}>+ Nova peça</button></div>
    {error && <p className="admin-error" role="alert">{error} <button onClick={reload}>Tentar novamente</button></p>}
    <p role="status" className="admin-notice">{notice}</p>
    {!state && !error && <p>Carregando suas peças…</p>}
    {state && <>
      <div className="admin-stats"><div><strong>{products.reduce((n, p) => n + p.stock - p.reserved, 0)}</strong>Unidades livres</div><div><strong>{products.reduce((n, p) => n + p.reserved, 0)}</strong>Reservadas</div><div><strong>{products.filter(p => !p.published).length}</strong>Rascunhos</div></div>
      <nav className="admin-tabs" aria-label="Áreas do painel">{[['pieces', 'Minhas peças'], ['history', 'Histórico'], ['showcase', 'Vitrine de demonstração']].map(([key, label]) => <button key={key} aria-pressed={view === key} onClick={() => { setView(key); setFilter('Todas') }}>{label}</button>)}</nav>
      {view === 'history' ? <section aria-label="Histórico de estoque"><div className="admin-history-head"><h2>Movimentações</h2><button onClick={exportData}>Exportar demonstração</button></div>{state.events.length === 0 ? <p className="admin-empty">Suas reservas, vendas e reposições aparecerão aqui.</p> : <ol className="admin-history">{state.events.map(event => {
        const p = products.find(p => p.id === event.productId)
        const last = state.events.find(e => e.productId === event.productId)
        return <li key={event.id}><div><strong>{p?.name || 'Peça'}</strong><p>{actionLabels[event.action] || 'Estoque inicial'} · {event.quantity} unidade(s)</p><small>{new Date(event.at).toLocaleString('pt-BR')}</small></div>{last.id === event.id && !['undo', 'initial'].includes(event.action) && <button onClick={() => setMovement({ product: p, action: 'undo', event })}>Desfazer</button>}</li>
      })}</ol>}</section> : <>
        {view === 'showcase' && <p className="admin-help">Prévia das peças marcadas para exibição. Esta lista não altera o site público.</p>}
        <div className="admin-filters"><label>Buscar peça<input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Nome da peça" /></label><label>Mostrar<select value={filter} onChange={e => setFilter(e.target.value)}>{['Todas', 'Disponível', 'Reservado', 'Esgotado', ...(view === 'showcase' ? [] : ['Rascunho'])].map(f => <option key={f}>{f}</option>)}</select></label></div>
        <div className="admin-grid">{visible.map(p => <article className="admin-card" key={p.id}>
          {p.photos[0] ? <img className="admin-cover" src={p.photos[0]} alt={p.name} /> : <div className="admin-cover admin-placeholder" aria-label="Peça sem foto"><span>✦</span>Adicione uma foto</div>}
          <div className="admin-card-body"><div className="admin-card-meta"><span>{p.category}</span><span className="admin-badge">{statusOf(p)}</span></div><h2>{p.name}</h2><p>{money(p.priceCents)}</p>
            {view === 'showcase' ? <p className="admin-description">{p.description}</p> : <><p className="admin-help">{p.stock - p.reserved} livres · {p.reserved} reservadas</p>
              <div className="admin-actions"><button onClick={() => setEditor(p)}>Editar</button><button onClick={() => setEditor({ ...p, id: undefined, revision: undefined, name: `${p.name.slice(0, 90)} (cópia)`, quantity: 1, published: false })}>Duplicar</button></div>
              <details><summary>Movimentar estoque</summary><div className="admin-actions">{[['reserve', 'Reservar', p.stock > p.reserved], ['sell', 'Registrar venda', p.stock > p.reserved], ['sellReserved', 'Vender reserva', p.reserved > 0], ['release', 'Cancelar reserva', p.reserved > 0], ['restock', 'Adicionar unidades', p.stock < 9999], ['remove', 'Retirar unidades', p.stock > p.reserved]].map(([action, label, enabled]) => <button key={action} disabled={!enabled} onClick={() => setMovement({ product: p, action })}>{label}</button>)}</div></details></>}
          </div></article>)}</div>{visible.length === 0 && <p className="admin-empty">Nenhuma peça por aqui. Adicione uma peça ou mude os filtros.</p>}
      </>}
    </>}
    {editor && <Editor initial={editor} onClose={() => setEditor(null)} onSave={save} />}
    {movement && <Movement {...movement} onClose={() => setMovement(null)} onSave={move} />}
  </main>
}
