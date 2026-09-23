import { instagramUrl, instagramDirectUrl } from '../config'
import logo from '../assets/logo.png'
import './Footer.css'

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
      <details className="container footer__privacy" id="privacidade">
        <summary>Privacidade e armazenamento no navegador</summary>
        <p>Este aviso descreve o uso de dados neste site da Studio Rituá. Para dúvidas ou solicitações sobre seus dados, escreva para <a href="mailto:studioritua@gmail.com">studioritua@gmail.com</a>.</p>
        <p>O catálogo pode ser consultado sem cadastro. Não instalamos ferramentas de publicidade ou análise de comportamento. O site não recebe pagamentos nem possui formulário de pedidos: o botão de contato abre uma conversa no Instagram, sujeita também à política de privacidade daquela plataforma.</p>
        <p>Usamos GitHub Pages para hospedar o site e Supabase para disponibilizar o catálogo e autenticar quem administra a loja. Ao acessar esses serviços, dados técnicos como endereço IP, navegador e registros de acesso podem ser processados para entregar o conteúdo e proteger o serviço.</p>
        <p>No painel, o e-mail identifica os administradores autorizados e a sessão é armazenada no navegador para manter o acesso. O modo de demonstração salva os cadastros de teste apenas nesse navegador. Esse armazenamento tem finalidade funcional, não publicitária. Use “Sair” ao terminar o acesso ao painel; também é possível apagar os dados do site nas configurações do navegador, o que encerra a sessão local e apaga a demonstração.</p>
        <p>Você pode entrar em contato para solicitar informações sobre tratamento de dados, acesso, correção ou exclusão, observadas as obrigações legais aplicáveis. Este aviso será revisto se forem adicionados novos usos de dados.</p>
      </details>
      <div className="container footer__bottom">
        <p>© {year} Studio Rituá</p>
        <p>Engenharia do site por <a href="https://pixelry.com.br" target="_blank" rel="noopener noreferrer">PIXELRY</a></p>
        <a href="#inicio">Voltar ao início ↑</a>
      </div>
    </footer>
  )
}
