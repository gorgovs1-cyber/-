import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

export default function HeroSection({ onExplore }) {
  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      {/* Background layers */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #1a1209 0%, #2d1f0e 30%, #0d0d0d 70%, #050505 100%)' }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-20 pb-24 max-w-2xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
          className="block text-[0.62rem] tracking-[0.35em] uppercase text-[#c9a96e] mb-5"
        >
          Luxury Makeup Artistry
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="font-editorial text-[clamp(3rem,6vw,5.5rem)] font-light leading-[1.05] tracking-[0.01em] text-white mb-6"
        >
          The Art of<br />
          <em className="text-[#e8d5b0] not-italic font-light italic">Curated Beauty</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.7 }}
          className="text-[0.875rem] font-light leading-[1.75] text-white/55 max-w-md mb-10"
        >
          Each look is a carefully composed portrait. Discover the products behind every brushstroke — available across Israel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.9 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            onClick={onExplore}
            className="px-9 py-[0.9rem] bg-[#c9a96e] text-black text-[0.67rem] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#e8d5b0] hover:-translate-y-0.5"
          >
            Explore the Looks
          </button>
          <button
            onClick={onExplore}
            className="px-9 py-[0.9rem] border border-white/25 text-white/75 text-[0.67rem] font-light tracking-[0.2em] uppercase transition-all duration-300 hover:border-white/70 hover:text-white"
          >
            View All Styles
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 right-8 md:right-20 flex flex-col items-center gap-2"
      >
        <span className="text-[0.55rem] tracking-[0.3em] uppercase text-white/30 -rotate-90 mb-2">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  )
}
