import { instagramDirectUrl, instagramUrl } from '../config'
import './FAQ.css'
const questions = [
  { question: 'Sobre as piteiras', answer: 'São feitas em vidro borossilicato de alta qualidade. As versões Premium têm acabamentos mais elaborados e detalhes exclusivos, como detalhes em prata 925, além de designs e técnicas diferenciadas.' },
  { question: 'Sobre as cuias', answer: 'As cuias são feitas em cerâmica plástica, um material levemente maleável e resistente, que permite criar formatos, cores e detalhes diferentes em cada peça.' },
  { question: 'Quero uma cuia, como faço?', answer: 'As cuias saem em drops, e sempre que um está acabando, já tem outro vindo por aí. As disponíveis ficam no destaque “Disponíveis”. Para comprar ou pedir uma personalizada, é só chamar na DM e escolher as cores que mais combinam com seu kit.' },
  { question: 'Como faço uma encomenda personalizada?', answer: 'Dá pra encomendar cuia e case de isqueiro do jeitinho que você quiser. É só chamar a gente na DM do Instagram, mandar sua inspiração ou contar sua ideia. A partir disso, passamos o orçamento. Com 50% do pagamento, a encomenda começa a ser produzida; os outros 50% são pagos na finalização. O prazo é de até 6 dias.' },
  { question: 'Como funciona o envio?', answer: 'Por motoboy, o valor do frete é calculado por quilômetro até o seu endereço. Por transportadora, a cotação é feita conforme o destino e o tamanho da peça. Nos dois casos o envio é combinado na DM do Instagram: você manda o endereço, a gente calcula e passa o valor antes de fechar o pedido.' },
  { question: 'As peças voltam ao estoque?', answer: 'Depende da peça. Algumas fazem parte de drops limitados e podem não voltar, então se gostou, não deixa pra depois.' },
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
