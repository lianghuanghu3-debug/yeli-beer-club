import { useRef, useEffect } from "react";
import { Beer } from "lucide-react";

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
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0f0a] via-[#0d1a0d] to-[#0a1208]"
    >
      {/* Forest silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] pointer-events-none">
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="forestGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d1a0d" stopOpacity="0" />
              <stop offset="100%" stopColor="#0a1508" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path d="M0,400 L0,280 Q100,200 200,260 Q250,220 320,250 Q380,180 450,230 Q500,190 560,240 Q620,170 700,220 Q750,180 820,240 Q880,160 960,210 Q1020,180 1080,230 Q1140,160 1200,220 Q1260,190 1320,240 Q1380,180 1440,230 L1440,400 Z"
            fill="url(#forestGrad)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <div className={`transition-all duration-1000 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Beer className="w-5 h-5 text-amber-400/60" />
            <span className="text-amber-400/60 text-xs tracking-[0.5em] font-light">YELI BEER CLUB</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-[0.15em] text-white/90 leading-tight mb-4">
            于城市之中
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-[0.15em] text-amber-400/70 leading-tight mb-8">
            寻找一方野境
          </h1>

          <p className="text-white/30 text-xs md:text-sm tracking-[0.4em] font-light leading-relaxed max-w-md mx-auto">
            野里扎啤俱乐部 · 鲜扎啤 · 野里相聚
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500 ${active ? "opacity-40" : "opacity-0"}`}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/20 text-[10px] tracking-[0.3em]">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
