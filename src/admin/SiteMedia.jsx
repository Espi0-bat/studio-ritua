import { useEffect, useState } from 'react'
import { siteMediaDefaults, siteMediaSlots } from '../data/siteMedia'
import { loadSiteMedia, saveSiteMedia } from '../services/siteMedia'
import { prepareSitePhoto } from './photos'

function Slot({ slot, current, onSave }) {
  const fallback = siteMediaDefaults[slot]
  const [photo, setPhoto] = useState(null)
  const [caption, setCaption] = useState(current?.caption ?? fallback.caption)
  const [alt, setAlt] = useState(current?.alt ?? fallback.alt)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const preview = photo?.dataUrl || current?.src || fallback.src
  async function pick(event) {
    const [file] = event.target.files
    event.target.value = ''
    if (!file) return
    setBusy(true); setError('')
    try { setPhoto(await prepareSitePhoto(file)) }
    catch (e) { setError(e.message) } finally { setBusy(false) }
  }
  async function submit(event) {
    event.preventDefault()
    if (busy) return
    setBusy(true); setError('')
    try { await onSave(slot, { photo, current, caption, alt }); setPhoto(null) }
    catch (e) { setError(e.message) } finally { setBusy(false) }
  }
  return <form className="admin-media-slot" onSubmit={submit}>
    <fieldset disabled={busy}>
      <h2>{fallback.label}</h2>
      <p className="admin-help">{fallback.place}</p>
      <img className="admin-media-preview" src={preview} alt={`Prévia da ${fallback.label.toLowerCase()}`} />
      <p className="admin-help">{photo ? 'Foto nova escolhida. Salve para publicar no site.' : current ? 'Esta é a foto publicada hoje.' : 'O site está mostrando a foto que veio no projeto. Envie uma foto sua para assumir este espaço.'}</p>
      <label>Trocar a foto<input type="file" accept="image/jpeg,image/png,image/webp" onChange={pick} /></label>
      <p className="admin-help">JPG, PNG ou WebP, de preferência em pé. A foto é reduzida antes de subir.</p>
      <label>Legenda<input maxLength={120} value={caption} onChange={e => setCaption(e.target.value)} placeholder="Texto pequeno embaixo da foto" /></label>
      <p className="admin-help">Deixe em branco para o site ficar sem legenda nesta foto.</p>
      <label>Descrição da foto<input maxLength={300} value={alt} onChange={e => setAlt(e.target.value)} placeholder="O que aparece na foto" /></label>
      <p className="admin-help">Quem não enxerga a foto ouve esta descrição, e ela aparece se a imagem não carregar.</p>
      <button className="admin-primary" disabled={busy || (!photo && !current)}>{busy ? 'Salvando…' : 'Salvar esta imagem'}</button>
    </fieldset>
    {error && <p className="admin-error" role="alert">{error}</p>}
  </form>
}

export default function SiteMedia({ onNotice }) {
  const [media, setMedia] = useState(null)
  const [error, setError] = useState('')
  async function reload() { try { setMedia(await loadSiteMedia(true)); setError('') } catch (e) { setError(e.message) } }
  useEffect(() => { reload() }, [])
  async function save(slot, input) {
    setMedia(await saveSiteMedia(slot, input))
    onNotice('Imagem do site atualizada. Recarregue o site para conferir.')
  }
  if (error) return <p className="admin-error" role="alert">{error} <button onClick={reload}>Tentar novamente</button></p>
  if (!media) return <p role="status">Carregando as imagens do site…</p>
  return <section className="admin-media" aria-label="Imagens do site">
    <p className="admin-help">São as duas fotos fixas do site. As fotos das peças continuam em “Minhas peças”.</p>
    <div className="admin-media-grid">
      {siteMediaSlots.map(slot => <Slot key={`${slot}-${media[slot]?.path || 'padrao'}`} slot={slot} current={media[slot] || null} onSave={save} />)}
    </div>
  </section>
}
