import Header from './components/Header'
import Hero from './components/Hero'
import WhyCompass from './components/why/WhyCompass'
import JourneyMap from './components/JourneyMap'
import About from './components/About'
import Features from './components/Features'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-night">
      <Header />
      <main>
        <div className="universe-canvas">
          <Hero />
          <WhyCompass />
          <JourneyMap />
        </div>
        <About />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
