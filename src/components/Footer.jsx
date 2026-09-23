import { instagramUrl, instagramDirectUrl } from '../config'
import logo from '../assets/logo.png'
import './Footer.css'

// Texto de trocas e devoluções escrito pela Duda, publicado a pedido do usuário com apenas
// correções de português. Conflitos com os prazos do CDC registrados na seção 19.5 do PLANO-AJUSTES-DUDA.md.
const reservationPolicy = [
  'Para garantir a peça, é necessário o pagamento de 50% do valor. O restante deve ser pago antes do envio ou da retirada do pedido.',
  'Após a confirmação do pagamento, não é possível desistir da compra ou solicitar o reembolso do valor pago.',
]
const returnsPolicy = [
  {
    title: 'Cases de isqueiro',
    paragraphs: [
      'Os cases de isqueiro têm garantia de 7 dias após o recebimento. Em caso de defeito de fabricação dentro desse período, entre em contato conosco pela DM do Instagram para que possamos avaliar e solucionar o caso.',
    ],
  },
  {
    title: 'Cuias',
    paragraphs: [
      'As cuias têm garantia de 30 dias após o recebimento. A garantia cobre defeitos de fabricação dentro desse período.',
      'Após a avaliação, se for constatado defeito de fabricação, você poderá escolher entre:',
    ],
    options: [
      'receber uma nova peça disponível do mesmo valor da peça original;',
      'receber 15% de desconto em uma próxima compra; ou',
      'receber o reembolso do valor pago.',
    ],
  },
  {
    title: 'Piteiras',
    paragraphs: [
      'Todas as piteiras são cuidadosamente verificadas antes do envio.',
      'Por serem peças delicadas e muitas vezes exclusivas, não realizamos trocas após o recebimento ou uso. Confira o modelo escolhido antes de finalizar o pedido.',
      'Caso a piteira chegue quebrada ou com algum problema aparente, entre em contato conosco pela DM e envie fotos e vídeos para avaliação.',
    ],
  },
  {
    title: 'Frete',
    paragraphs: [
      'O frete é pago pelo cliente no recebimento da peça. Caso a peça precise voltar, o frete de retorno também é por conta do cliente.',
    ],
  },
]

export default function Footer() {
  const contact = instagramDirectUrl
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="contato">
      <div className="container footer__inner">

        <div className="footer__brand">
          <a href="#inicio" className="footer__logo brand"><img src={logo} alt="Studio Rituá — início" width="1024" height="1024" loading="lazy" /></a>
          <p>Piteiras, cases e cuias para o seu ritual.</p>
        </div>

        <nav className="footer__links" aria-label="Navegação do rodapé">
          <a href="#galeria">As peças</a>
          <a href="#sobre">O studio</a>
          <a href="#faq">Dúvidas</a>
        </nav>

        {(contact || instagramUrl) && (
          <div className="footer__contact">
            <p>A conversa continua por aqui.</p>
            {contact && (
              <a href={contact} target="_blank" rel="noopener noreferrer">
                Falar pelo direct <span aria-hidden="true">↗</span>
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}

      </div>
      <div className="container footer__legal">
        <details id="reserva">
          <summary>Reserva de peças</summary>
          {reservationPolicy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </details>
        <details id="devolucoes">
          <summary>Trocas e devoluções</summary>
          {returnsPolicy.map(({ title, paragraphs, options }) => (
            <div className="footer__legal-piece" key={title}>
              <h3>{title}</h3>
              {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {options && <ul>{options.map((option) => <li key={option}>{option}</li>)}</ul>}
            </div>
          ))}
        </details>
        <details id="privacidade">
          <summary>Privacidade e dados</summary>
          <p>Este aviso explica como a Studio Rituá trata os dados neste site. Para dúvidas ou pedidos sobre seus dados, escreva para <a href="mailto:studioritua@gmail.com">studioritua@gmail.com</a>.</p>
          <p>O catálogo pode ser consultado sem cadastro. Não usamos ferramentas de publicidade nem de análise de comportamento. O site não recebe pagamentos e não tem formulário de pedido: o botão de contato abre uma conversa no Instagram, sujeita também à política de privacidade daquela plataforma.</p>
          <p>O site é hospedado no GitHub Pages e o catálogo fica no Supabase. Quando você acessa o site, dados técnicos como endereço IP, navegador e registros de acesso podem ser processados para entregar o conteúdo e proteger o serviço.</p>
          <p>No painel da loja, o e-mail identifica quem está autorizado e a sessão fica guardada no navegador para manter o acesso. Esse armazenamento tem finalidade funcional, não publicitária. Use “Sair” ao terminar; apagar os dados do site nas configurações do navegador também encerra a sessão.</p>
          <p>Você pode solicitar informações sobre o tratamento dos seus dados, bem como o acesso, a correção ou a exclusão deles, observadas as obrigações legais aplicáveis. Este aviso será revisto se novos usos de dados forem adicionados.</p>
        </details>
      </div>
      <div className="container footer__bottom">
        <p>© {year} Studio Rituá</p>
        <p>Engenharia do site por <a href="https://pixelry.com.br" target="_blank" rel="noopener noreferrer">PIXELRY</a></p>
        <a href="#inicio">Voltar ao início ↑</a>
      </div>
    </footer>
  )
}
