export default function Footer({ onLogoClick }) {
  return (
    <footer className="bg-[#111111] px-8 md:px-20 pt-16 pb-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="text-right">
          <div className="font-editorial text-xl tracking-[0.2em] uppercase text-white mb-3">LUMIÈRE</div>
          <p className="text-[0.75rem] font-light text-white/30 leading-relaxed max-w-xs mr-0 ml-auto">פלטפורמת יופי יוקרתית. כל לוק, כל מוצר — זמין בישראל.</p>
        </div>
        <div className="flex flex-col gap-3 text-right">
          <button onClick={onLogoClick} className="text-[0.68rem] tracking-[0.15em] uppercase text-white/30 hover:text-[#c9a96e] transition-colors duration-300">הלוקים</button>
          <a href="#" className="text-[0.68rem] tracking-[0.15em] uppercase text-white/30 hover:text-[#c9a96e] transition-colors duration-300">גילוי נאות שותפות</a>
          <a href="#" className="text-[0.68rem] tracking-[0.15em] uppercase text-white/30 hover:text-[#c9a96e] transition-colors duration-300">צור קשר</a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <span className="text-[0.62rem] text-white/15">חלק מהקישורים עשויים להיות קישורי שותפות.</span>
        <span className="text-[0.62rem] text-white/20 tracking-wider">© 2025 LUMIÈRE. כל הזכויות שמורות.</span>
      </div>
    </footer>
  )
}
