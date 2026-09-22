import { whatsappUrl } from '../config'
import './FAQ.css'
const questions = [
  { question: 'De que são feitas as cuias?', answer: 'As cuias Rituá são feitas à mão em cerâmica plástica.' },
  { question: 'As fotos mostram as peças da Rituá?', answer: 'Sim. A galeria reúne fotos das cuias e dos acessórios do studio. Algumas imagens mostram várias peças juntas; você pode ampliar cada foto para observar os detalhes.' },
  { question: 'As cores mudam de uma foto para outra?', answer: 'A iluminação muda a aparência das cores. Na galeria, há fotos em luz natural e sob iluminação colorida. A tela em que você vê as imagens também pode alterar os tons.' },
]
export default function FAQ() {
  const contact = whatsappUrl('Olá! Gostaria de saber quais peças da Rituá estão disponíveis, os valores e as medidas.')
  return (
    <section id="faq" className="faq section">
      <div className="container faq__inner">
        <div>
          <p className="eyebrow">Antes de escolher</p>
          <h2>Sobre as peças.</h2>
          {contact && <p className="faq__contact">Quer saber sobre uma peça?<br /><a className="text-link" href={contact} target="_blank" rel="noopener noreferrer">Converse com a Rituá <span aria-hidden="true">↗</span></a></p>}
        </div>
        <div className="faq__list">
          {questions.map(({ question, answer }) => (
            <details className="faq__item" key={question}>
              <summary>{question}<span aria-hidden="true" className="faq__icon">+</span></summary><p>{answer}</p>
            </details>
          ))}
          {contact && <details className="faq__item">
            <summary>Como consultar uma peça?<span aria-hidden="true" className="faq__icon">+</span></summary>
            <p>Envie a foto pelo WhatsApp para consultar disponibilidade, valor e medidas antes de escolher. <a href={contact} target="_blank" rel="noopener noreferrer">Falar com a Rituá</a>.</p>
          </details>}
        </div>
      </div>
    </section>
  )
}
