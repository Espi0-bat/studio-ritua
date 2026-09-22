import { useEffect, useState } from 'react'
import Brand from './Brand'
import { whatsappUrl } from '../config'
import './Navbar.css'
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const contact = whatsappUrl()
  useEffect(() => {
    if (!menuOpen) return
    const close = (event) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])
  return (
    <header className="navbar">
      <nav className="navbar__inner container" aria-label="Navegação principal">
        <a href="#inicio" className="navbar__logo" onClick={() => setMenuOpen(false)}><Brand /></a>
        <button className="navbar__toggle" aria-controls="navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Fechar' : 'Menu'}</button>
        <ul id="navigation" className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <li><a href="#galeria" onClick={() => setMenuOpen(false)}>As peças</a></li>
          <li><a href="#sobre" onClick={() => setMenuOpen(false)}>O studio</a></li>
          <li><a href="#faq" onClick={() => setMenuOpen(false)}>Dúvidas</a></li>
          {contact && <li><a className="navbar__contact" href={contact} target="_blank" rel="noopener noreferrer">Fale com a Rituá <span aria-hidden="true">↗</span></a></li>}
        </ul>
      </nav>
    </header>
  )
}
