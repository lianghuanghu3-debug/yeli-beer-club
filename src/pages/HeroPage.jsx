import { useRef, useEffect, useMemo } from "react";

export default function HeroPage({ active, onWheel }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => onWheel(e, 0);
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [onWheel]);

  const trunks = useMemo(() =>
    [...Array(8)].map(() => ({
      left: 5 + Math.random() * 90,
      width: 3 + Math.random() * 8,
      height: 40 + Math.random() * 55,
      opacity: 0.03 + Math.random() * 0.06,
      branches: Math.floor(Math.random() * 4),
    })), []
  );

  return (
    <section
      ref={ref}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0f0a] via-[#081208] to-[#061006]"
    >
      {/* Tree trunks */}
      <div className="absolute inset-0 pointer-events-none">
        {trunks.map((t, i) => (
          <div key={i} className="absolute bottom-0" style={{ left: `${t.left}%`, opacity: t.opacity }}>
            <div className="bg-[#1a2a15] rounded-t-md" style={{ width: `${t.width}vw`, height: `${t.height}vh` }} />
          </div>
        ))}
      </div>

      {/* Grassland */}
      <div className="absolute bottom-0 left-0 right-0 h-[35vh] pointer-events-none">
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="g1" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#0a1508" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0d1a0a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0d1a0a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,400 L0,300 Q80,250 160,310 Q240,260 320,320 Q400,240 480,310 Q560,230 640,300 Q720,220 800,290 Q880,240 960,310 Q1040,220 1120,300 Q1200,250 1280,310 Q1360,230 1440,290 L1440,400 Z" fill="url(#g1)" />
          {[...Array(200)].map((_, i) => (
            <line key={i} x1={i * 7.2} y1="400" x2={i * 7.2 + (Math.sin(i * 0.7) * 20)} y2={280 - Math.random() * 80}
              stroke="#0d1a0a" strokeWidth="1.5" opacity={0.3 + Math.random() * 0.5} />
          ))}
        </svg>
      </div>

      {/* Content - extra bold centered */}
      <div className="relative z-10 text-center px-6 w-full">
        <div className={`transition-all duration-1200 ${active ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          
          {/* Brand label */}
          <div className="mb-14">
            <span className="text-amber-400/40 text-xs md:text-sm tracking-[0.6em] font-light border border-amber-400/10 px-8 py-3">
              野 里 扎 啤 俱 乐 部
            </span>
          </div>

          {/* Main titles - bigger and bolder */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-[0.03em] text-white leading-[0.9] mb-4">
            于城市之中
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-[0.03em] leading-[0.9] mb-12"
            style={{
              background: "linear-gradient(180deg, #E8C55A 0%, #D4A843 30%, #8B6914 70%, #5C3A0A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            寻找一方野境
          </h1>

          {/* Subtitle */}
          <div className="space-y-3 mb-16">
            <p className="text-white/40 text-base md:text-lg tracking-[0.3em] font-light">
              鲜扎啤 · 野里相聚
            </p>
            <p className="text-white/15 text-sm tracking-[0.5em] font-extralight">
              FRESH DRAFT BEER · YELI BEER CLUB
            </p>
          </div>

          {/* Scroll */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/15 text-[11px] tracking-[0.4em] font-light">向下滑动探索</span>
            <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-1.5">
              <div className="w-1.5 h-3 rounded-full bg-amber-400/40 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
