import { motion } from 'framer-motion'

export default function LookCard({ look, index, onClick }) {
  const isFeatured = index === 0
  const totalProducts = look.products.reduce((n, c) => n + c.items.length, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer group ${isFeatured ? 'row-span-2' : ''}`}
    >
      {/* Image / gradient */}
      <div
        className={`w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${isFeatured ? 'h-full min-h-[580px]' : 'h-[320px] md:h-[340px]'}`}
        style={{ background: look.gradient }}
      >
        {/* Decorative glyph */}
        <div className="w-full h-full flex items-center justify-center font-editorial text-white/10 text-[5rem] select-none">
          ✦
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex flex-col justify-end p-7">
        <span className="text-[0.58rem] tracking-[0.3em] uppercase text-[#c9a96e] mb-1.5">{look.tag}</span>
        <h3 className="font-editorial text-[1.65rem] font-light leading-tight text-white mb-2">{look.title}</h3>
        <span className="flex items-center gap-2 text-[0.68rem] font-light text-white/45">
          <span className="block w-5 h-px bg-[#c9a96e]" />
          {totalProducts} products
        </span>
      </div>

      {/* Hover arrow */}
      <div className="absolute top-5 right-5 w-9 h-9 border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-2 group-hover:translate-x-0">
        <span className="text-white text-sm">→</span>
      </div>
    </motion.div>
  )
}
