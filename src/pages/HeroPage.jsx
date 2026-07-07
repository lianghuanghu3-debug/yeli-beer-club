import { useRef, useEffect } from "react";

export default function HeroPage({ active, onWheel }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => onWheel(e, 0);
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [onWheel]);

  return (
    <section
      ref={ref}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0f0a] via-[#081208] to-[#061006]"
    >
      {/* Grassland only - bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none">
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="hg" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#0a1508" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#0d1a0a" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0d1a0a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,400 L0,300 Q80,250 160,310 Q240,260 320,320 Q400,240 480,310 Q560,230 640,300 Q720,220 800,290 Q880,240 960,310 Q1040,220 1120,300 Q1200,250 1280,310 Q1360,230 1440,290 L1440,400 Z" fill="url(#hg)" />
          {[...Array(150)].map((_, i) => (
            <line key={i} x1={i*9.6} y1="400" x2={i*9.6+(Math.sin(i*0.7)*18)} y2={300-Math.random()*60}
              stroke="#0d1a0a" strokeWidth="1.5" opacity={0.3+Math.random()*0.4} />
          ))}
        </svg>
      </div>

      {/* Content - centered */}
      <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
        <div className={`transition-all duration-1200 ${active ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          
          <div className="mb-10 md:mb-14">
            <span className="text-amber-400/40 text-[11px] md:text-sm tracking-[0.6em] font-light border border-amber-400/10 px-6 md:px-8 py-2 md:py-3">
              野 里 扎 啤 俱 乐 部
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] text-white leading-[1.05] mb-2">
            于城市之中
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] leading-[1.05] mb-8 md:mb-12"
            style={{
              background: "linear-gradient(180deg, #E8C55A 0%, #D4A843 30%, #8B6914 70%, #5C3A0A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            寻找一方野境
          </h1>

          <div className="space-y-2 md:space-y-3 mb-12 md:mb-16">
            <p className="text-white/40 text-sm md:text-lg tracking-[0.3em] font-light">鲜扎啤 · 野里相聚</p>
            <p className="text-white/15 text-[11px] md:text-sm tracking-[0.5em] font-extralight">FRESH DRAFT BEER · YELI BEER CLUB</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <span className="text-white/15 text-[10px] md:text-[11px] tracking-[0.4em] font-light">向下滑动探索</span>
            <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-1.5">
              <div className="w-1.5 h-3 rounded-full bg-amber-400/40 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
