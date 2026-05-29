import { motion } from 'framer-motion'
import LookCard from './LookCard'
import { LOOKS } from '../../data/looks'

export default function LooksGallery({ onLookClick }) {
  return (
    <section id="gallery-section" className="bg-[#f5f2ee] px-8 md:px-20 py-24 md:py-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <span className="block text-[0.62rem] tracking-[0.35em] uppercase text-[#c9a96e] mb-4">The Collection</span>
        <h2 className="font-editorial text-[clamp(2rem,3.5vw,3rem)] font-light tracking-[0.02em] leading-[1.12] mb-4">
          Define Your <em className="italic">Signature Look</em>
        </h2>
        <p className="text-[0.8rem] font-light leading-[1.8] text-mid max-w-md mx-auto">
          From dramatic evening statements to effortless daylight radiance — every look, entirely shoppable.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
        {LOOKS.map((look, i) => (
          <LookCard key={look.slug} look={look} index={i} onClick={() => onLookClick(look.slug)} />
        ))}
      </div>
    </section>
  )
}
