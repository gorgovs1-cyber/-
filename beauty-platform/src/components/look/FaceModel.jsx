import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const MAKEUP = {
  'evening-glam':  { lid:'rgba(180,130,50,0.75)', crease:'rgba(80,40,10,0.8)',  liner:'#050505', blush:'rgba(185,70,60,0.35)',  hl:'rgba(255,215,120,0.55)', lip:'#85151f', steps:['בסיס','צלליות מוזהבות','אייליינר','סומק','הייליית','שפתון כהה'] },
  'natural-glow':  { lid:'rgba(190,155,115,0.5)', crease:'rgba(150,115,75,0.35)',liner:'rgba(70,45,20,0.65)',blush:'rgba(225,150,135,0.4)',hl:'rgba(255,240,205,0.55)',lip:'#c47860',steps:['לחות','צלליות טבעיות','אייליינר עדין','סומק אפרסקי','הייליית','גלוס'] },
  'bridal':        { lid:'rgba(205,180,160,0.55)',crease:'rgba(175,140,115,0.4)',liner:'rgba(55,35,15,0.7)',blush:'rgba(225,160,150,0.4)',hl:'rgba(255,248,235,0.65)',lip:'#c46878',steps:['בסיס','צלליות ורודות','אייליינר','סומק רך','הייליית','שפתון ורדרד'] },
  'bold-red':      { lid:'rgba(110,85,75,0.35)', crease:'rgba(75,50,40,0.25)', liner:'#0a0a0a',             blush:'rgba(175,90,75,0.3)',  hl:'rgba(255,235,210,0.45)',lip:'#cc0f1e',steps:['בסיס','צלליות עדינות','אייליינר','סומק','הייליית','שפתון אדום'] },
  'smoky-eye':     { lid:'rgba(25,20,35,0.85)',  crease:'rgba(10,8,20,0.9)',   liner:'#030308',             blush:'rgba(155,90,80,0.25)', hl:'rgba(195,188,215,0.35)',lip:'#b86a70',steps:['בסיס','צלליות כהות','אייליינר דרמטי','סומק','הייליית','שפתון נייד'] },
  'sun-kissed':    { lid:'rgba(185,125,55,0.65)',crease:'rgba(140,80,20,0.55)',liner:'rgba(100,60,15,0.7)', blush:'rgba(215,145,75,0.5)', hl:'rgba(255,215,130,0.65)',lip:'#d47848',steps:['בסיס','צלליות ברונז','אייליינר חום','סומק שזוף','הייליית זהב','שפתון אפרסק'] },
}

const fi = (d) => ({ initial:{opacity:0}, animate:{opacity:1}, transition:{delay:d,duration:0.7} })
const di = (d) => ({ initial:{pathLength:0,opacity:0}, animate:{pathLength:1,opacity:1}, transition:{delay:d,duration:0.55} })

export default function FaceModel({ slug }) {
  const c = MAKEUP[slug] || MAKEUP['natural-glow']
  const [step, setStep] = useState(-1)

  useEffect(() => {
    setStep(-1)
    const ts = [200,600,1000,1400,1800,2200].map((t,i) => setTimeout(()=>setStep(i), t))
    return () => ts.forEach(clearTimeout)
  }, [slug])

  return (
    <div className="flex flex-col items-center gap-5 py-10 bg-[#faf8f5]">
      <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#c9a96e]">דוגמנית AI — סימולציית איפור</span>
      <svg viewBox="0 0 300 420" className="w-full max-w-[240px]" xmlns="http://www.w3.org/2000/svg">
        {/* Hair */}
        <ellipse cx="150" cy="118" rx="113" ry="98" fill="#231810"/>
        <path d="M37,185 Q34,295 46,362 Q86,402 150,407 Q214,402 254,362 Q266,295 263,185" fill="#231810"/>
        {/* Face */}
        <ellipse cx="150" cy="218" rx="100" ry="124" fill="#f2d0a8"/>
        {/* Neck */}
        <path d="M122,332 Q120,378 127,392 Q139,397 150,397 Q161,397 173,392 Q180,378 178,332" fill="#f2d0a8"/>
        {/* Ears */}
        <ellipse cx="50" cy="220" rx="11" ry="15" fill="#e8c098"/>
        <ellipse cx="250" cy="220" rx="11" ry="15" fill="#e8c098"/>
        {/* Cheek contour */}
        <ellipse cx="79" cy="242" rx="27" ry="31" fill="#d8a878" opacity="0.12" transform="rotate(-12 79 242)"/>
        <ellipse cx="221" cy="242" rx="27" ry="31" fill="#d8a878" opacity="0.12" transform="rotate(12 221 242)"/>
        {/* Eyebrows */}
        <path d="M85,163 Q104,154 123,160" stroke="#231810" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d="M177,160 Q196,154 215,163" stroke="#231810" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        {/* Eye whites */}
        <ellipse cx="104" cy="182" rx="20" ry="11" fill="white"/>
        <ellipse cx="196" cy="182" rx="20" ry="11" fill="white"/>
        {/* Eyelid skin cover */}
        <path d="M84,182 Q104,169 124,182" fill="#f2d0a8"/>
        <path d="M176,182 Q196,169 216,182" fill="#f2d0a8"/>
        {/* Shadow base */}
        <ellipse cx="104" cy="175" rx="21" ry="9" fill="#e0bfa0" opacity="0.45"/>
        <ellipse cx="196" cy="175" rx="21" ry="9" fill="#e0bfa0" opacity="0.45"/>

        {/* STEP 1 - Eyeshadow lid */}
        <motion.ellipse cx="104" cy="175" rx="20" ry="8" fill={c.lid} {...fi(0.2)}/>
        <motion.ellipse cx="196" cy="175" rx="20" ry="8" fill={c.lid} {...fi(0.2)}/>
        {/* STEP 2 - Eyeshadow crease */}
        <motion.path d="M84,170 Q104,162 124,170 Q114,177 104,177 Q94,177 84,170" fill={c.crease} {...fi(0.55)}/>
        <motion.path d="M176,170 Q196,162 216,170 Q206,177 196,177 Q186,177 176,170" fill={c.crease} {...fi(0.55)}/>

        {/* Iris L */}
        <circle cx="104" cy="182" r="9" fill="#5a3d20"/>
        <circle cx="104" cy="182" r="5" fill="#2a1808"/>
        <circle cx="106" cy="179" r="2.5" fill="white"/>
        {/* Iris R */}
        <circle cx="196" cy="182" r="9" fill="#5a3d20"/>
        <circle cx="196" cy="182" r="5" fill="#2a1808"/>
        <circle cx="198" cy="179" r="2.5" fill="white"/>
        {/* Eyelid overlay */}
        <path d="M84,182 Q104,171 124,182" fill="#f2d0a8" opacity="0.45"/>
        <path d="M176,182 Q196,171 216,182" fill="#f2d0a8" opacity="0.45"/>

        {/* STEP 3 - Eyeliner */}
        <motion.path d="M84,178 Q104,171 124,178" stroke={c.liner} strokeWidth="2.2" fill="none" strokeLinecap="round" {...di(0.9)}/>
        <motion.path d="M176,178 Q196,171 216,178" stroke={c.liner} strokeWidth="2.2" fill="none" strokeLinecap="round" {...di(0.9)}/>
        <motion.path d="M124,178 Q128,174 131,171" stroke={c.liner} strokeWidth="1.8" fill="none" strokeLinecap="round" {...di(1.1)}/>
        <motion.path d="M216,178 Q220,174 223,171" stroke={c.liner} strokeWidth="1.8" fill="none" strokeLinecap="round" {...di(1.1)}/>
        {/* Lashes */}
        <path d="M84,178 L80,171 M89,176 L86,168 M94,174 L92,166 M99,173 L98,165 M104,172 L104,164 M109,172 L110,164 M114,173 L116,166 M119,175 L122,168 M123,178 L126,173" stroke="#231810" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M176,178 L173,171 M181,176 L178,168 M186,174 L184,166 M191,173 L190,165 M196,172 L196,164 M201,172 L202,164 M206,173 L208,166 M211,175 L214,168 M215,178 L218,173" stroke="#231810" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

        {/* Nose */}
        <path d="M144,202 Q139,224 132,236 Q142,242 150,241 Q158,242 168,236 Q161,224 156,202" fill="#e5ba8a" opacity="0.55"/>
        <ellipse cx="137" cy="235" rx="5" ry="4" fill="#e5ba8a"/>
        <ellipse cx="163" cy="235" rx="5" ry="4" fill="#e5ba8a"/>
        <path d="M137,236 Q150,241 163,236" stroke="#c89060" strokeWidth="1" fill="none" opacity="0.45"/>
        {/* Base lips */}
        <path d="M118,259 Q133,252 150,256 Q167,252 182,259 Q174,270 150,273 Q126,270 118,259" fill="#c08878"/>
        <path d="M118,259 Q150,263 182,259" stroke="#a07060" strokeWidth="0.8" fill="none"/>

        {/* STEP 4 - Blush */}
        <motion.ellipse cx="73" cy="230" rx="30" ry="18" fill={c.blush} {...fi(1.3)} transform="rotate(-10 73 230)"/>
        <motion.ellipse cx="227" cy="230" rx="30" ry="18" fill={c.blush} {...fi(1.3)} transform="rotate(10 227 230)"/>
        {/* STEP 5 - Highlight */}
        <motion.ellipse cx="79" cy="212" rx="17" ry="10" fill={c.hl} {...fi(1.7)} transform="rotate(-15 79 212)"/>
        <motion.ellipse cx="221" cy="212" rx="17" ry="10" fill={c.hl} {...fi(1.7)} transform="rotate(15 221 212)"/>
        <motion.ellipse cx="104" cy="166" rx="14" ry="5" fill={c.hl} opacity="0.7" {...fi(1.7)}/>
        <motion.ellipse cx="196" cy="166" rx="14" ry="5" fill={c.hl} opacity="0.7" {...fi(1.7)}/>
        {/* STEP 6 - Lip color */}
        <motion.path d="M118,259 Q133,252 150,256 Q167,252 182,259 Q174,270 150,273 Q126,270 118,259" fill={c.lip} {...fi(2.1)}/>
        <motion.path d="M118,259 Q150,263 182,259" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" fill="none" {...fi(2.1)}/>
        <motion.ellipse cx="143" cy="265" rx="14" ry="5" fill="rgba(255,255,255,0.18)" {...fi(2.3)}/>
      </svg>

      {/* Progress bar */}
      <div className="w-full max-w-[240px] flex flex-col gap-2.5">
        <div className="flex gap-1.5">
          {c.steps.map((_,i) => (
            <div key={i} className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${i<=step?'bg-[#c9a96e]':'bg-black/10'}`}/>
          ))}
        </div>
        {step>=0 && step<c.steps.length && (
          <motion.p key={step} initial={{opacity:0,y:4}} animate={{opacity:1,y:0}}
            className="text-[0.65rem] tracking-[0.12em] text-mid text-center font-light">
            שלב {step+1} — {c.steps[step]}
          </motion.p>
        )}
      </div>
    </div>
  )
}
