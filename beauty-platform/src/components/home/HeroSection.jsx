import { motion } from 'framer-motion'
const ease = [0.16,1,0.3,1]
export default function HeroSection({ onExplore }) {
  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      <div className="absolute inset-0" style={{background:'linear-gradient(160deg,#1a1209 0%,#2d1f0e 30%,#0d0d0d 70%,#050505 100%)'}}/>
      <div className="absolute inset-0 opacity-50" style={{backgroundImage:'url(https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1800&q=80)',backgroundSize:'cover',backgroundPosition:'center 20%'}}/>
      <div className="absolute inset-0" style={{background:'linear-gradient(to top,rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.1) 55%,transparent 100%)'}}/>
      <div className="relative z-10 px-8 md:px-20 pb-24 max-w-2xl w-full text-right mr-0 ml-auto">
        <motion.span initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:1,ease,delay:0.3}} className="block text-[0.62rem] tracking-[0.35em] uppercase text-[#c9a96e] mb-5">
          אמנות איפור יוקרתית
        </motion.span>
        <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:1,ease,delay:0.5}} className="font-editorial text-[clamp(3rem,6vw,5.5rem)] font-light leading-[1.05] text-white mb-6">
          אמנות<br/><em className="text-[#e8d5b0] not-italic italic font-light">היופי הנבחר</em>
        </motion.h1>
        <motion.p initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:1,ease,delay:0.7}} className="text-[0.875rem] font-light leading-[1.75] text-white/55 max-w-md mb-10 mr-0 ml-auto">
          כל לוק הוא פורטרט שנבחר בקפידה. גלי את המוצרים מאחורי כל מכחול — זמינים בכל רחבי ישראל.
        </motion.p>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:1,ease,delay:0.9}} className="flex flex-wrap items-center justify-end gap-4">
          <button onClick={onExplore} className="px-9 py-[0.9rem] bg-[#c9a96e] text-black text-[0.67rem] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#e8d5b0] hover:-translate-y-0.5">גלי את הלוקים</button>
          <button onClick={onExplore} className="px-9 py-[0.9rem] border border-white/25 text-white/75 text-[0.67rem] font-light tracking-[0.2em] uppercase transition-all duration-300 hover:border-white/70 hover:text-white">כל הסגנונות</button>
        </motion.div>
      </div>
    </section>
  )
}
