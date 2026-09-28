import { useEffect, useState } from 'react'
import { siteMediaDefaults } from '../data/siteMedia'
import { loadSiteMedia } from '../services/siteMedia'

// A foto que veio no build aparece de imediato; a do painel entra só depois de
// carregada, para a página não piscar nem mudar de altura durante a leitura.
export default function useSiteMedia(slot) {
  const [media, setMedia] = useState(siteMediaDefaults[slot])
  useEffect(() => {
    let active = true
    loadSiteMedia().then(all => {
      const saved = all[slot]
      if (!saved || !active) return
      const image = new Image()
      image.onload = () => {
        if (active) setMedia({ ...siteMediaDefaults[slot], ...saved,
          width: saved.width || image.naturalWidth, height: saved.height || image.naturalHeight })
      }
      image.src = saved.src
    }).catch(() => {})
    return () => { active = false }
  }, [slot])
  return media
}
