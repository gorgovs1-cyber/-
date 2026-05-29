import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../ui/ProductCard'

export default function LookDetailPage({ look, onBack }) {
  if (!look) return null

  const totalProducts = look.products.reduce((n, c) => n + c.items.length, 0)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={look.slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero */}
        <section className="relative h-[85vh] min-h-[560px] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ background: look.gradient }}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/65" />

          {/* Back button */}
          <button
            onClick={onBack}
            className="absolute top-24 left-8 md:left-20 z-10 flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300 group"
          >
            <span className="text-[#c9a96e] group-hover:-translate-x-1 transition-transform duration-300">←</span>
            Back to Gallery
          </button>

          {/* Info */}
          <motion.div
            className="absolute bottom-12 left-8 md:left-20 z-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <span className="block text-[0.62rem] tracking-[0.35em] uppercase text-[#c9a96e] mb-3">{look.tag}</span>
            <h1 className="font-editorial text-[clamp(2.5rem,5vw,4.5rem)] font-light text-white leading-[1.05] mb-4">
              {look.title}
            </h1>
            <p className="text-[0.8rem] font-light text-white/50 max-w-sm leading-[1.75]">{look.subtitle}</p>
          </motion.div>
        </section>

        {/* Products */}
        <section className="px-8 md:px-20 py-20 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-8 border-b border-black/6">
              <div>
                <h2 className="font-editorial text-[2rem] font-light mb-1">Products Used in This Look</h2>
                <p className="text-[0.78rem] font-light text-mid">All products available at leading retailers across Israel</p>
              </div>
              <span className="font-editorial text-[3.5rem] font-light text-black/5 leading-none mt-2 md:mt-0">
                {String(totalProducts).padStart(2, '0')}
              </span>
            </div>

            {/* Categories */}
            {look.products.map((cat) => {
              let globalIndex = 0
              look.products.slice(0, look.products.indexOf(cat)).forEach(c => { globalIndex += c.items.length })
              return (
                <div key={cat.category} className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[0.58rem] tracking-[0.35em] uppercase text-[#c9a96e]">{cat.category}</span>
                    <div className="flex-1 h-px bg-black/6" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {cat.items.map((product, i) => (
                      <ProductCard key={`${product.brand}-${product.name}`} product={product} index={globalIndex + i} />
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
