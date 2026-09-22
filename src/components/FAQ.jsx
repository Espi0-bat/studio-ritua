import { instagramDirectUrl, instagramUrl } from '../config'
import './FAQ.css'
const questions = [
  { question: 'As piteiras já estão disponíveis?', answer: 'As piteiras estão para chegar. A peça apresentada no site é um modelo de exemplo; os modelos e as medidas da seleção Rituá serão publicados quando estiverem confirmados.' },
  { question: 'Os cases estão disponíveis?', answer: 'Os cases apresentados estão indisponíveis. As últimas peças foram vendidas e as próximas criações serão apresentadas por aqui e no Instagram.' },
  { question: 'Como saber se um case serve no meu isqueiro?', answer: 'Cada novo case terá a indicação do modelo de isqueiro compatível, incluindo marca e tamanho. Quando houver efeito no escuro ou sob luz UV, essa informação também estará na descrição da peça.' },
  { question: 'De que são feitas as cuias?', answer: 'As cuias Rituá são feitas à mão em cerâmica plástica. A galeria apresenta as cores, as formas e os detalhes do trabalho do studio.' },
]
export default function FAQ() {
  return (
    <section id="faq" className="faq section">
      <div className="container faq__inner">
        <div>
          <p className="eyebrow">Antes de escolher</p>
          <h2>Sobre as peças.</h2>
          <p className="faq__contact">Quer saber sobre uma peça?<br /><a className="text-link" href={instagramDirectUrl} target="_blank" rel="noopener noreferrer">Falar pelo direct ↗</a></p>
        </div>
        <div className="faq__list">
          {questions.map(({ question, answer }) => (
            <details className="faq__item" key={question}>
              <summary>{question}<span aria-hidden="true" className="faq__icon">+</span></summary><p>{answer}</p>
            </details>
          ))}
          <details className="faq__item">
            <summary>Como falar com a Rituá?<span aria-hidden="true" className="faq__icon">+</span></summary>
            <p>Envie uma mensagem pelo direct do Instagram. Se a conversa não abrir, acesse o perfil <a href={instagramUrl} target="_blank" rel="noopener noreferrer">@studioritua</a> e toque em Mensagem.</p>
          </details>
        </div>
      </div>
    </section>
  )
}
