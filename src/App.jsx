import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Gallery from './components/Gallery'
import About from './components/About'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <Ticker />
        <Gallery />
        <About />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
