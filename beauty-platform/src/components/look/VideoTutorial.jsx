export default function VideoTutorial({ look }) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(look.videoSearch)}`
  return (
    <div className="mt-10">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-[0.58rem] tracking-[0.35em] uppercase text-[#c9a96e]">הדרכת איפור</span>
        <div className="flex-1 h-px bg-black/6"/>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer"
        className="group relative flex overflow-hidden bg-[#0a0a0a]" style={{aspectRatio:'16/7'}}>
        <div className="absolute inset-0 opacity-60" style={{background:look.gradient}}/>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-full border border-white/30 bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
            <div className="w-0 h-0 border-t-[9px] border-b-[9px] border-l-[16px] border-transparent border-l-white ml-1"/>
          </div>
          <div className="text-center">
            <p className="text-white text-[0.85rem] font-light">צפי בהדרכת האיפור</p>
            <p className="text-white/40 text-[0.62rem] tracking-[0.15em] mt-1">יוטיוב ←</p>
          </div>
        </div>
        <span className="absolute bottom-3 left-4 text-white/20 text-[0.55rem] tracking-widest font-light">YOUTUBE</span>
      </a>
      <p className="text-[0.68rem] font-light text-mid mt-3 text-center">לחצי לצפייה בסרטוני הדרכה ל{look.title}</p>
    </div>
  )
}
