import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/home/HeroSection'
import LooksGallery from './components/home/LooksGallery'
import LookDetailPage from './components/look/LookDetailPage'
import { LOOKS } from './data/looks'

function FeatureStrip() {
  const items = [
    {num:'12',label:'לוקים נבחרים'},
    {num:'60+',label:'מוצרים יוקרתיים'},
    {num:'100%',label:'זמין בישראל'},
    {num:'AI',label:'דוגמניות מחשב'},
  ]
  return (
    <div className="bg-[#0a0a0a] flex flex-wrap items-center justify-center py-12 px-8">
      {items.map((item,i)=>(
        <div key={item.label} className="flex items-center">
          <div className="text-center px-8 md:px-12">
            <span className="block font-editorial text-[2.5rem] font-light text-[#c9a96e]">{item.num}</span>
            <span className="block text-[0.6rem] tracking-[0.25em] uppercase text-white/35 mt-1">{item.label}</span>
          </div>
          {i<items.length-1&&<div className="hidden md:block w-px h-10 bg-white/8"/>}
        </div>
      ))}
    </div>
  )
}

function AboutSection() {
  return (
    <section id="about-section" className="bg-[#0a0a0a] text-center px-8 md:px-20 py-28">
      <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.9,ease:[0.16,1,0.3,1]}}>
        <span className="block text-[0.62rem] tracking-[0.35em] uppercase text-[#c9a96e] mb-5">הפילוסופיה</span>
        <h2 className="font-editorial text-[clamp(1.8rem,3.5vw,3rem)] font-light text-white max-w-2xl mx-auto leading-[1.15] mb-5">
          יופי הוא שפה.<br/><em className="italic">אנחנו מתרגמים אותה למוצרים.</em>
        </h2>
        <p className="text-[0.8rem] font-light leading-[1.85] text-white/30 max-w-md mx-auto">
          LUMIÈRE אוצרת השראות איפור בנות AI ומתאימה לכל לוק מוצרים אמיתיים לרכישה — גישרי על הפער בין השראה למציאות.
        </p>
      </motion.div>
    </section>
  )
}

export default function App() {
  const [slug, setSlug] = useState(null)
  const look = slug ? LOOKS.find(l=>l.slug===slug) : null
  const handleLook = useCallback((s)=>{ setSlug(s); window.scrollTo({top:0,behavior:'instant'}) },[])
  const handleBack = useCallback(()=>{ setSlug(null); window.scrollTo({top:0,behavior:'smooth'}) },[])
  const handleGallery = useCallback(()=>{
    if(slug){ setSlug(null); setTimeout(()=>document.getElementById('gallery-section')?.scrollIntoView({behavior:'smooth'}),100) }
    else document.getElementById('gallery-section')?.scrollIntoView({behavior:'smooth'})
  },[slug])
  return (
    <>
      <Navbar onLogoClick={handleBack} onGalleryClick={handleGallery}/>
      <AnimatePresence mode="wait">
        {look
          ? <LookDetailPage key="detail" look={look} onBack={handleBack}/>
          : <main key="home">
              <HeroSection onExplore={handleGallery}/>
              <FeatureStrip/>
              <LooksGallery onLookClick={handleLook}/>
              <AboutSection/>
            </main>
        }
      </AnimatePresence>
      <Footer onLogoClick={handleBack}/>
    </>
  )
}
