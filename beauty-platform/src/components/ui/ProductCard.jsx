import { motion } from 'framer-motion'

export default function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className="border border-black/7 p-7 flex flex-col bg-white transition-all duration-400 hover:border-[#c9a96e] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] group"
    >
      <div className="text-[0.58rem] tracking-[0.25em] uppercase text-[#b8b8b8] mb-1.5">{product.brand}</div>
      <div className="font-editorial text-[1.15rem] font-normal leading-snug text-black mb-1.5">{product.name}</div>
      <div className="text-[0.72rem] font-light text-mid mb-5">{product.shade}</div>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-editorial text-[1.2rem] font-normal">{product.price}</span>
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-black text-white text-[0.58rem] tracking-[0.2em] uppercase font-normal border border-black transition-all duration-300 hover:bg-[#c9a96e] hover:border-[#c9a96e] hover:text-black"
        >
          Shop Now
        </a>
      </div>
    </motion.div>
  )
}
