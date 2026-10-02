import { useEffect, useState } from 'react'
import { siteMediaDefaults, siteMediaSlots } from '../data/siteMedia'
import { loadSiteMedia, saveSiteMedia } from '../services/siteMedia'
import { prepareSitePhoto } from './photos'

// Dois avisos separados de propósito: o que dá errado ao escolher a foto nasce colado no campo de
// arquivo, e o que dá errado ao gravar nasce colado no botão. Antes era um só, no fim do bloco:
// quem escolhia uma foto recusada não via nada, porque a mensagem ficava uma tela abaixo.
function Slot({ slot, current, saved, onSave }) {
  const fallback = siteMediaDefaults[slot]
  const [photo, setPhoto] = useState(null)
  const [fileName, setFileName] = useState('')
  const [caption, setCaption] = useState(current?.caption ?? fallback.caption)
  const [alt, setAlt] = useState(current?.alt ?? fallback.alt)
  const [stage, setStage] = useState('')
  const [pickError, setPickError] = useState('')
  const [saveError, setSaveError] = useState('')
  const [dirty, setDirty] = useState(false)
  const busy = stage !== ''
  const preview = photo?.dataUrl || current?.src || fallback.src
  const picked = stage === 'preparando' ? `Preparando ${fileName || 'a foto'}… pode levar alguns segundos.`
    : photo ? `Foto escolhida${fileName ? `: ${fileName}` : ''}. Salve para publicar no site.` : ''
  async function pick(event) {
    const [file] = event.target.files
    // Limpar aqui é o que permite escolher o mesmo arquivo de novo depois de uma recusa: sem isso,
    // a segunda escolha não dispara onChange e a tela fica muda. O File já está na mão.
    event.target.value = ''
    if (!file) return
    setDirty(true); setFileName(file.name); setPhoto(null); setPickError(''); setSaveError(''); setStage('preparando')
    try { setPhoto(await prepareSitePhoto(file)) }
    catch (e) { setPickError(e.message) } finally { setStage('') }
  }
  async function submit(event) {
    event.preventDefault()
    if (busy) return
    setStage('salvando'); setSaveError('')
    try { await onSave(slot, { photo, current, caption, alt }); setPhoto(null); setFileName(''); setPickError(''); setDirty(false) }
    catch (e) { setSaveError(e.message); setDirty(true) } finally { setStage('') }
  }
  return <form className="admin-media-slot" onSubmit={submit}>
    <fieldset disabled={busy}>
      <h2>{fallback.label}</h2>
      <p className="admin-help">{fallback.place}</p>
      <img className="admin-media-preview" src={preview} alt={`Prévia da ${fallback.label.toLowerCase()}`} />
      <p className="admin-help">{photo ? 'Prévia da foto nova, ainda não publicada.' : current ? 'Esta é a foto publicada hoje.' : 'O site está mostrando a foto que veio no projeto. Envie uma foto sua para assumir este espaço.'}</p>
      {/* Nunca listar image/heic no accept: o Safari 17 em diante passa a converter o JPG dela em HEIC. */}
      <label>Trocar a foto<input type="file" accept="image/*" onChange={pick} /></label>
      {picked && <p className="admin-media-state" role="status">{picked}</p>}
      {pickError && <p className="admin-error" role="alert">{pickError}</p>}
      <p className="admin-help">Foto do iPhone serve, de preferência em pé. A foto é reduzida antes de subir.</p>
      <label>Legenda<input maxLength={120} value={caption} onChange={e => { setDirty(true); setCaption(e.target.value) }} placeholder="Texto pequeno embaixo da foto" /></label>
      <p className="admin-help">Deixe em branco para o site ficar sem legenda nesta foto.</p>
      <label>Descrição da foto<input maxLength={300} value={alt} onChange={e => { setDirty(true); setAlt(e.target.value) }} placeholder="O que aparece na foto" /></label>
      <p className="admin-help">Quem não enxerga a foto ouve esta descrição, e ela aparece se a imagem não carregar.</p>
      <button className="admin-primary" disabled={busy || (!photo && !current)}>{stage === 'preparando' ? 'Preparando a foto…' : stage === 'salvando' ? 'Salvando…' : photo ? 'Salvar a foto nova' : 'Salvar legenda e descrição'}</button>
      {!photo && !current && <p className="admin-help">O botão libera assim que você escolher uma foto para este espaço.</p>}
      {!dirty && saved && <p className="admin-media-state" data-kind="ok" role="status">{saved}</p>}
    </fieldset>
    {saveError && <p className="admin-error" role="alert">{saveError}</p>}
  </form>
}

export default function SiteMedia({ onNotice }) {
  const [media, setMedia] = useState(null)
  const [saved, setSaved] = useState({})
  const [error, setError] = useState('')
  async function reload() { try { setMedia(await loadSiteMedia(true)); setError('') } catch (e) { setError(e.message) } }
  useEffect(() => { reload() }, [])
  // A confirmação mora aqui, e não dentro do espaço: trocar a foto muda o caminho no storage, muda a
  // chave e remonta o espaço, que perderia o aviso justamente na vez em que ele mais importa.
  async function save(slot, input) {
    setMedia(await saveSiteMedia(slot, input))
    const { label } = siteMediaDefaults[slot]
    const message = input.photo ? `${label} trocada. Recarregue o site para conferir.`
      : `Legenda e descrição salvas. A ${label.toLowerCase()} continua a mesma.`
    setSaved(old => ({ ...old, [slot]: message })); onNotice(message)
  }
  if (error) return <p className="admin-error" role="alert">{error} <button onClick={reload}>Tentar novamente</button></p>
  if (!media) return <p role="status">Carregando as imagens do site…</p>
  return <section className="admin-media" aria-label="Imagens do site">
    <p className="admin-help">São as duas fotos fixas do site. As fotos das peças continuam em “Minhas peças”.</p>
    <div className="admin-media-grid">
      {siteMediaSlots.map(slot => <Slot key={`${slot}-${media[slot]?.path || 'padrao'}`} slot={slot} current={media[slot] || null} saved={saved[slot] || ''} onSave={save} />)}
    </div>
  </section>
}
