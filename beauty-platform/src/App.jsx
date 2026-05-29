import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/home/HeroSection'
import LooksGallery from './components/home/LooksGallery'
import LookDetailPage from './components/look/LookDetailPage'
import { LOOKS } from './data/looks'

function FeatureStrip() {
  const items = [
    { num: '12', label: 'Curated Looks' },
    { num: '60+', label: 'Premium Products' },
    { num: '100%', label: 'Available in Israel' },
    { num: 'AI', label: 'Generated Models' },
  ]
  return (
    <div className="bg-[#0a0a0a] flex flex-wrap items-center justify-center gap-8 md:gap-0 py-12 px-8">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center">
          <div className="text-center px-8 md:px-12">
            <span className="block font-editorial text-[2.5rem] font-light text-[#c9a96e]">{item.num}</span>
            <span className="block text-[0.6rem] tracking-[0.25em] uppercase text-white/35 mt-1">{item.label}</span>
          </div>
          {i < items.length - 1 && <div className="hidden md:block w-px h-10 bg-white/8" />}
        </div>
      ))}
    </div>
  )
}

function AboutSection() {
  return (
    <section id="about-section" className="bg-[#0a0a0a] text-center px-8 md:px-20 py-28">
      <span className="block text-[0.62rem] tracking-[0.35em] uppercase text-[#c9a96e] mb-5">The Philosophy</span>
      <h2 className="font-editorial text-[clamp(1.8rem,3.5vw,3rem)] font-light text-white max-w-2xl mx-auto leading-[1.15] mb-5">
        Beauty is a language.<br />
        <em className="italic">We translate it into products.</em>
      </h2>
      <p className="text-[0.8rem] font-light leading-[1.85] text-white/30 max-w-md mx-auto">
        LUMIÈRE curates AI-crafted makeup inspirations and pairs each look with real, purchasable products available in Israel — bridging the gap between inspiration and reality.
      </p>
    </section>
  )
}

export default function App() {
  const [activeLookSlug, setActiveLookSlug] = useState(null)

  const activeLook = activeLookSlug ? LOOKS.find(l => l.slug === activeLookSlug) : null

  const handleLookClick = useCallback((slug) => {
    setActiveLookSlug(slug)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const handleBack = useCallback(() => {
    setActiveLookSlug(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleGalleryScroll = useCallback(() => {
    if (activeLookSlug) {
      setActiveLookSlug(null)
      setTimeout(() => document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' }), 100)
    } else {
      document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [activeLookSlug])

  return (
    <>
      <Navbar onLogoClick={handleBack} onGalleryClick={handleGalleryScroll} />

      <AnimatePresence mode="wait">
        {activeLook ? (
          <LookDetailPage key="detail" look={activeLook} onBack={handleBack} />
        ) : (
          <main key="home">
            <HeroSection onExplore={handleGalleryScroll} />
            <FeatureStrip />
            <LooksGallery onLookClick={handleLookClick} />
            <AboutSection />
          </main>
        )}
      </AnimatePresence>

      <Footer onLogoClick={handleBack} />
    </>
  )
}
