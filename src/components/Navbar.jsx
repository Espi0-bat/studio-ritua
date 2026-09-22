import { useEffect, useState } from 'react'
import { whatsappUrl } from '../config'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const contact = whatsappUrl()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const close = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner container" aria-label="Navegação principal">

        <a href="#inicio" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          Studio <em>Rituá</em>
        </a>

        <button
          className="navbar__toggle"
          aria-controls="navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Fechar' : 'Menu'}
        </button>

        <ul id="navigation" className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <li><a href="#galeria" onClick={() => setMenuOpen(false)}>As peças</a></li>
          <li><a href="#sobre"   onClick={() => setMenuOpen(false)}>O studio</a></li>
          <li><a href="#faq"     onClick={() => setMenuOpen(false)}>Dúvidas</a></li>
          {contact && (
            <li>
              <a
                className="navbar__contact"
                href={contact}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com a Rituá ↗
              </a>
            </li>
          )}
        </ul>

      </nav>
    </header>
  )
}
