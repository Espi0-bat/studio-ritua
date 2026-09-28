import heroPhoto from '../assets/images/ritua-9895.webp'
import aboutPhoto from '../assets/images/ritua-3040.webp'

// Fotos e legendas que vieram no projeto. Ficam como reserva: se o painel ainda não
// tiver uma foto salva, ou se o catálogo estiver fora do ar, o site mostra estas.
export const siteMediaDefaults = {
  abertura: {
    label: 'Foto da abertura',
    place: 'Aparece no topo do site, ao lado de "Seu momento, seu ritual."',
    src: heroPhoto, width: 1125, height: 1500,
    caption: 'cases Rituá · coleção indisponível',
    alt: 'Cases de isqueiro coloridos com detalhes em relevo da Rituá — peças indisponíveis',
  },
  studio: {
    label: 'Foto do studio',
    place: 'Aparece ao lado do texto "Feitas à mão. De verdade."',
    src: aboutPhoto, width: 844, height: 1500,
    caption: 'formas, cores e nossas pequenas invenções.',
    alt: 'Cuias verdes e rosa, chaveiros estampados e cases de isqueiro com cogumelos e coração, sobre uma bandeja dourada',
  },
}

export const siteMediaSlots = Object.keys(siteMediaDefaults)
