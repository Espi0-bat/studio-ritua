import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import About from './components/About'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  const [galleryOpen, setGalleryOpen] = useState(false)
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <Gallery onDialogChange={setGalleryOpen} />
        <About />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
