import { instagramDirectUrl, instagramUrl } from '../config'
import './FAQ.css'
const questions = [
  { question: 'Sobre as piteiras', answer: 'São feitas em vidro borossilicato de alta qualidade. As versões Premium têm acabamentos mais elaborados e detalhes exclusivos, como detalhes em prata 925, além de designs e técnicas diferenciadas.' },
  { question: 'Sobre as cuias', answer: 'As cuias são feitas em cerâmica plástica, um material levemente maleável e resistente, que permite criar formatos, cores e detalhes diferentes em cada peça.' },
  { question: 'Quero uma cuia, como faço?', answer: 'As cuias saem em drops, e sempre que um está acabando, já tem outro vindo por aí. As disponíveis ficam no destaque “Disponíveis”. Para comprar ou pedir uma personalizada, é só chamar na DM e escolher as cores que mais combinam com seu kit.' },
  { question: 'Como faço uma encomenda personalizada?', answer: 'Dá pra encomendar cuia e case de isqueiro do jeitinho que você quiser. É só chamar a gente na DM do Instagram, mandar sua inspiração ou contar sua ideia. A partir disso, passamos o orçamento. Com 50% do pagamento, a encomenda começa a ser produzida; os outros 50% são pagos na finalização. O prazo é de até 6 dias.' },
  {
    question: 'Como funciona o pagamento?',
    answer: [
      'Aceitamos Pix, dinheiro e cartão. Dinheiro e cartão valem para quem retira a peça pessoalmente. Também é possível reservar uma peça com 50% do valor. O restante deve ser pago antes do envio ou da retirada.',
      'Após a confirmação do pagamento, a reserva não pode ser cancelada e o valor pago não é reembolsável.',
      'Encomendas personalizadas seguem os 50% no início e 50% na finalização.',
    ],
  },
  {
    question: 'Como funciona o envio?',
    answer: [
      'Para entregas em Boa Vista (RR), os pedidos são enviados por motoboy. Após o envio do endereço, calculamos o frete e informamos o valor. O pedido é enviado em até 30 minutos, e o pagamento é realizado no momento da entrega. Assim que sair, você receberá a localização do motoboy.',
      'Para demais localidades, basta informar o CEP pela DM. O frete é calculado de acordo com o destino e o tamanho do pedido, e você pode escolher a forma de envio que preferir.',
    ],
  },
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
              <summary>{question}<span aria-hidden="true" className="faq__icon">+</span></summary>
              {[].concat(answer).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
