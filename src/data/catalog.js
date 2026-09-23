import piteiraExample from '../assets/images/piteira-exemplo-mona-brisa.jpg'
import photo1672 from '../assets/images/ritua-1672.webp'
import photo2200 from '../assets/images/ritua-2200.webp'
import photo2219 from '../assets/images/ritua-2219.webp'
import photo2374 from '../assets/images/ritua-2374.webp'
import photo3040 from '../assets/images/ritua-3040.webp'
import photo9895 from '../assets/images/ritua-9895.webp'
// Keep the supplied photos until the real videos arrive. Import future files from
// src/assets/videos/ and use media: { type: 'video', src: videoFile, poster: photo }.
// These photos show groups of pieces, not confirmed individual SKUs. Preserve
// their descriptive names until the client provides the product/photo mapping.
const cuias = [
  {
    id: 'cores-em-mistura',
    media: { type: 'image', src: photo2200, width: 844, height: 1500 },
    gridLabel: 'Cores em mistura', title: 'Cores em mistura', tag: 'Cuias · Studio Rituá',
    subtitle: 'Cuias facetadas, com cores mescladas, fotografadas em luz natural.',
    alt: 'Sete cuias coloridas em rosa, azul, laranja e vinho sobre uma mesa de madeira',
  },
  {
    id: 'entre-rosas-e-laranjas',
    media: { type: 'image', src: photo2219, width: 844, height: 1500 },
    gridLabel: 'Entre rosas e laranjas', title: 'Entre rosas e laranjas', tag: 'Cuias · Studio Rituá',
    subtitle: 'Combinações de cores vistas de cima, entre folhas verdes.',
    alt: 'Cuias rosas, vermelhas e laranjas com bordas facetadas sobre folhagens',
  },
  {
    id: 'um-canto-do-ritual',
    media: { type: 'image', src: photo2374, width: 844, height: 1500 },
    gridLabel: 'Um canto do ritual', title: 'Um canto do ritual', tag: 'Cuias · Studio Rituá',
    subtitle: 'Uma cuia rosa entre os objetos da mesa, sob luz colorida.',
    alt: 'Cuia rosa sobre uma bandeja com acessórios, iluminada em rosa e roxo',
  },
  {
    id: 'detalhes-sobre-a-mesa',
    media: { type: 'image', src: photo3040, width: 844, height: 1500 },
    gridLabel: 'Detalhes sobre a mesa', title: 'Detalhes sobre a mesa', tag: 'Peças · Studio Rituá',
    subtitle: 'Cuias e acessórios lado a lado: cores mescladas e detalhes modelados. Os cases de isqueiro desta foto estão esgotados.',
    alt: 'Cuias verdes e rosas ao lado de acessórios com cogumelos e desenhos figurativos',
  },
  {
    id: 'sob-outra-luz',
    media: { type: 'image', src: photo1672, width: 1125, height: 1500 },
    gridLabel: 'Sob outra luz', title: 'Sob outra luz', tag: 'Cuias · Studio Rituá',
    subtitle: 'As cores das cuias sob iluminação azul.',
    alt: 'Conjunto de cuias coloridas fotografado sob luz azul intensa',
  },

]

const featured = [
  {
    id: 'piteira-exemplo',
    media: { type: 'image', src: piteiraExample, width: 1000, height: 1000 },
    gridLabel: 'Piteiras', title: 'Mona Brisa · Cápsula Coração', tag: 'Piteiras · Modelo de exemplo',
    subtitle: 'Uma referência para conhecer os detalhes de uma piteira. As piteiras da Rituá estão para chegar; os modelos da seleção serão apresentados em breve.',
    alt: 'Piteira de vidro Mona Brisa Cápsula Coração, modelo de exemplo da Madruga Shop',
    status: 'Em breve · exemplo',
    specs: { Comprimento: '113 mm (11,3 cm)', 'Diâmetro informado': '4,8 mm' },
    reference: 'https://www.madrugashop.com/acessorios-headshop/piteiras-de-vidro/piteira-de-vidro-mona-brisa-capsula-coracao',
  },
  {
    id: 'outras-formas', available: false,
    media: { type: 'image', src: photo9895, width: 1125, height: 1500 },
    gridLabel: 'Outras formas', title: 'Cases de isqueiro', tag: 'Acessórios · Studio Rituá',
    subtitle: 'Cases de isqueiro com pequenos detalhes em relevo. As unidades desta seleção acabaram.',
    alt: 'Cases de isqueiro coloridos decorados com cogumelos, rostos e personagens sobre uma mesa clara',
  },
]
export const staticProducts = [...featured.map(item => ({ ...item, category: item.reference ? 'Piteira' : 'Case', published: true })), ...cuias.map(item => ({ ...item, category: 'Cuia', published: true }))]

