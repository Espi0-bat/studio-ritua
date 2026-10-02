import { useEffect, useState } from 'react'
import { siteMediaDefaults } from '../data/siteMedia'
import { loadSiteMedia } from '../services/siteMedia'

// A foto que veio no build aparece de imediato; a do painel entra só depois de
// carregada, para a página não piscar nem mudar de altura durante a leitura.
//
// Essa espera é o `preload`, e só faz sentido acima da dobra. Na seção Sobre ela custava
// caro: o `new Image()` baixava a foto do painel em toda visita, mesmo sem ninguém rolar
// até lá. Sem pré-carregamento, o endereço é trocado assim que a consulta responde — bem
// antes de alguém rolar — e quem decide a hora do download é o `loading="lazy"` do `<img>`.
// Quem não desce não baixa nada; quem desce baixa a foto do painel, e não as duas.
//
// A reserva do build tem duas larguras; a foto do painel é um arquivo só. Por isso `srcSet`
// e `sizes` saem junto com a troca: herdados da reserva, fariam o navegador escolher a foto
// do build pela lista de larguras.
export default function useSiteMedia(slot, { preload = true } = {}) {
  const [media, setMedia] = useState(siteMediaDefaults[slot])
  useEffect(() => {
    let active = true
    const fallback = siteMediaDefaults[slot]
    loadSiteMedia().then(all => {
      const saved = all[slot]
      if (!saved || !active) return
      const next = { ...fallback, ...saved, srcSet: undefined, sizes: undefined }
      // Sem medir a foto, as medidas gravadas no painel sustentam a altura do bloco.
      if (!preload) return setMedia({ ...next, width: saved.width || fallback.width, height: saved.height || fallback.height })
      const image = new Image()
      image.onload = () => {
        if (active) setMedia({ ...next,
          width: saved.width || image.naturalWidth, height: saved.height || image.naturalHeight })
      }
      image.src = saved.src
    }).catch(() => {})
    return () => { active = false }
  }, [slot, preload])
  // Sem pré-carregamento não existe quem segure uma foto que não baixa: se o endereço do
  // painel falhar, o `<img>` avisa e a reserva do build volta para a tela.
  const restoreFallback = () => setMedia(current =>
    current === siteMediaDefaults[slot] ? current : siteMediaDefaults[slot])
  return [media, restoreFallback]
}
