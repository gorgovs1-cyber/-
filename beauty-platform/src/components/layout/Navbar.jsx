import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
export default function Navbar({ onLogoClick, onGalleryClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(()=>{
    const fn = ()=>setScrolled(window.scrollY>60)
    window.addEventListener('scroll',fn,{passive:true})
    return ()=>window.removeEventListener('scroll',fn)
  },[])
  const sc = scrolled
  return (
    <nav className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-8 md:px-12 h-[72px] transition-all duration-500 ${sc?'bg-white/92 backdrop-blur-md border-b border-black/5':''}`}>
      <ul className="hidden md:flex gap-10 list-none">
        {[{label:'הלוקים',action:onGalleryClick},{label:'אודות',action:()=>document.getElementById('about-section')?.scrollIntoView({behavior:'smooth'})}].map(({label,action})=>(
          <li key={label}><button onClick={action} className={`text-[0.65rem] tracking-[0.2em] uppercase font-normal relative group transition-colors duration-300 ${sc?'text-mid hover:text-black':'text-white/80 hover:text-white'}`}>
            {label}<span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#c9a96e] transition-all duration-300 group-hover:w-full"/>
          </button></li>
        ))}
      </ul>
      <button onClick={onLogoClick} className={`font-editorial text-[1.4rem] font-normal tracking-[0.22em] uppercase transition-colors duration-500 ${sc?'text-black':'text-white'}`}>LUMIÈRE</button>
      <button onClick={()=>setOpen(m=>!m)} className="md:hidden flex flex-col gap-[5px] p-1">
        <span className={`block w-5 h-px transition-all duration-300 ${sc?'bg-black':'bg-white'} ${open?'rotate-45 translate-y-[6px]':''}`}/>
        <span className={`block w-5 h-px transition-all duration-300 ${sc?'bg-black':'bg-white'} ${open?'opacity-0':''}`}/>
        <span className={`block w-5 h-px transition-all duration-300 ${sc?'bg-black':'bg-white'} ${open?'-rotate-45 -translate-y-[6px]':''}`}/>
      </button>
      {open&&<motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} className="absolute top-[72px] inset-x-0 bg-white border-b border-black/5 flex flex-col">
        <button onClick={()=>{onGalleryClick();setOpen(false)}} className="px-8 py-3 text-right text-[0.7rem] tracking-[0.2em] uppercase text-mid">הלוקים</button>
        <button onClick={()=>{document.getElementById('about-section')?.scrollIntoView({behavior:'smooth'});setOpen(false)}} className="px-8 py-3 text-right text-[0.7rem] tracking-[0.2em] uppercase text-mid">אודות</button>
      </motion.div>}
    </nav>
  )
}
