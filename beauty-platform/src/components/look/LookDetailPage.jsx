import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../ui/ProductCard'
import FaceModel from './FaceModel'
import VideoTutorial from './VideoTutorial'

export default function LookDetailPage({ look, onBack }) {
  if (!look) return null
  const total = look.products.reduce((n,c)=>n+c.items.length,0)
  return (
    <AnimatePresence mode="wait">
      <motion.div key={look.slug} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}}>
        {/* Hero */}
        <section className="relative h-[80vh] min-h-[520px] overflow-hidden">
          <motion.div className="absolute inset-0" style={{background:look.gradient}} initial={{scale:1.05}} animate={{scale:1}} transition={{duration:1.2,ease:[0.16,1,0.3,1]}}/>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/65"/>
          <button onClick={onBack} className="absolute top-24 right-8 md:right-20 z-10 flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors group">
            <span className="text-[#c9a96e] group-hover:translate-x-1 transition-transform">→</span>
            חזרה לגלריה
          </button>
          <motion.div className="absolute bottom-12 right-8 md:right-20 z-10 text-right" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.9,ease:[0.16,1,0.3,1],delay:0.2}}>
            <span className="block text-[0.62rem] tracking-[0.35em] uppercase text-[#c9a96e] mb-3">{look.tag}</span>
            <h1 className="font-editorial text-[clamp(2.5rem,5vw,4.5rem)] font-light text-white leading-[1.05] mb-4">{look.titleHe}</h1>
            <p className="text-[0.8rem] font-light text-white/50 max-w-sm leading-[1.75]">{look.subtitle}</p>
          </motion.div>
        </section>

        {/* Face model + video */}
        <section className="bg-[#faf8f5] px-8 md:px-20 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <FaceModel slug={look.slug}/>
            <div className="flex flex-col justify-center pt-4">
              <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#c9a96e] mb-3">הלוק</span>
              <h2 className="font-editorial text-[2.2rem] font-light mb-3">{look.titleHe}</h2>
              <p className="text-[0.82rem] font-light text-mid leading-[1.8] mb-6">{look.subtitle}</p>
              <div className="flex items-center gap-4">
                <span className="font-editorial text-[2.5rem] font-light text-black/8">{String(total).padStart(2,'0')}</span>
                <span className="text-[0.68rem] font-light text-mid">מוצרים בלוק זה</span>
              </div>
              <VideoTutorial look={look}/>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="px-8 md:px-20 py-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-8 border-b border-black/6">
              <div>
                <h2 className="font-editorial text-[2rem] font-light mb-1">המוצרים בלוק הזה</h2>
                <p className="text-[0.78rem] font-light text-mid">כל המוצרים זמינים בחנויות המובילות בישראל</p>
              </div>
              <span className="font-editorial text-[3.5rem] font-light text-black/5 leading-none">{String(total).padStart(2,'0')}</span>
            </div>
            {look.products.map((cat,ci) => {
              let base = look.products.slice(0,ci).reduce((n,c)=>n+c.items.length,0)
              return (
                <div key={cat.category} className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-black/6"/>
                    <span className="text-[0.58rem] tracking-[0.35em] uppercase text-[#c9a96e]">{cat.category}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {cat.items.map((p,i)=>(
                      <ProductCard key={`${p.brand}-${p.name}`} product={p} index={base+i}/>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  )
}
