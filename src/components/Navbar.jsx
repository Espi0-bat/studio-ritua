import { useEffect, useState } from 'react'
import { instagramDirectUrl } from '../config'
import logo from '../assets/logo.png'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const contact = instagramDirectUrl

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

        <a href="#inicio" className="navbar__logo brand" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Studio Rituá — início" width="1024" height="1024" />
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
                Falar pelo direct ↗
              </a>
            </li>
          )}
        </ul>

      </nav>
    </header>
  )
}
