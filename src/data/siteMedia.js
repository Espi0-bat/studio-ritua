import heroPhoto from '../assets/images/ritua-9895.webp'
import heroPhotoSmall from '../assets/images/ritua-9895-700.webp'
import aboutPhoto from '../assets/images/ritua-3040.webp'
import aboutPhotoSmall from '../assets/images/ritua-3040-600.webp'

// Fotos e legendas que vieram no projeto. Ficam como reserva: se o painel ainda não
// tiver uma foto salva, ou se o catálogo estiver fora do ar, o site mostra estas.
// Cada reserva vem em duas larguras. O `sizes` descreve o espaço que a foto ocupa em
// cada faixa de tela, medido no CSS de Hero.css e About.css: sem ele o navegador
// assumiria a largura da janela e baixaria sempre o arquivo grande no celular.
// A foto enviada pelo painel é um arquivo só, sem variantes — ver useSiteMedia.
export const siteMediaDefaults = {
  abertura: {
    label: 'Foto da abertura',
    place: 'Aparece no topo do site, ao lado de "Seu momento, seu ritual."',
    src: heroPhoto, width: 1125, height: 1500,
    srcSet: `${heroPhotoSmall} 700w, ${heroPhoto} 1125w`,
    sizes: '(min-width: 1376px) 557px, (min-width: 1051px) calc((100vw - 152px) / 2.15), (min-width: 701px) calc((100vw - 124px) / 2.15), calc(100vw - 116px)',
    caption: 'cases Rituá · coleção indisponível',
    alt: 'Cases de isqueiro coloridos com detalhes em relevo da Rituá — peças indisponíveis',
  },
  studio: {
    label: 'Foto do studio',
    place: 'Aparece ao lado do texto "Feitas à mão. De verdade."',
    src: aboutPhoto, width: 844, height: 1500,
    srcSet: `${aboutPhotoSmall} 600w, ${aboutPhoto} 844w`,
    sizes: '(min-width: 1376px) 512px, (min-width: 1051px) calc((100vw - 176px) * 0.45 - 28px), (min-width: 701px) calc((100vw - 136px) * 0.45 - 28px), calc(100vw - 140px)',
    caption: 'formas, cores e nossas pequenas invenções.',
    alt: 'Cuias verdes e rosa, chaveiros estampados e cases de isqueiro com cogumelos e coração, sobre uma bandeja dourada',
  },
}

export const siteMediaSlots = Object.keys(siteMediaDefaults)
