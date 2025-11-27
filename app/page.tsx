import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import StockPortfolio from '@/components/StockPortfolio'
import StockTicker from '@/components/StockTicker'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <StockPortfolio />
      <StockTicker />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
