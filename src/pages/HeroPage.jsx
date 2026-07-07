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

  // Generate random tree trunks
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
      {/* Tree trunks - left silhouettes */}
      <div className="absolute left-0 top-0 bottom-0 w-[35vw] pointer-events-none">
        {trunks.slice(0, 4).map((t, i) => (
          <div key={i} className="absolute bottom-0" style={{ left: `${t.left}%`, opacity: t.opacity }}>
            <div className="bg-[#1a2a15] rounded-t-md" style={{ width: `${t.width}vw`, height: `${t.height}vh` }} />
            {[...Array(t.branches)].map((_, j) => (
              <div key={j} className="absolute bg-[#1a2a15] h-[2px] origin-left"
                style={{
                  width: `${4 + j * 2}vw`,
                  top: `${20 + j * 12}%`,
                  left: '50%',
                  transform: `rotate(${-20 + j * 10}deg)`,
                  opacity: 0.5 + j * 0.1,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Tree trunks - right silhouettes */}
      <div className="absolute right-0 top-0 bottom-0 w-[35vw] pointer-events-none">
        {trunks.slice(4).map((t, i) => (
          <div key={i} className="absolute bottom-0" style={{ left: `${t.left}%`, opacity: t.opacity }}>
            <div className="bg-[#1a2a15] rounded-t-md" style={{ width: `${t.width}vw`, height: `${t.height}vh` }} />
            {[...Array(t.branches)].map((_, j) => (
              <div key={j} className="absolute bg-[#1a2a15] h-[2px] origin-right"
                style={{
                  width: `${4 + j * 2}vw`,
                  top: `${25 + j * 12}%`,
                  right: '50%',
                  transform: `rotate(${20 - j * 10}deg)`,
                  opacity: 0.5 + j * 0.1,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Grassland at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[35vh] pointer-events-none">
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="grassGrad1" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#0a1508" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0d1a0a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0d1a0a" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grass layers */}
          <path d="M0,400 L0,300 Q80,250 160,310 Q240,260 320,320 Q400,240 480,310 Q560,230 640,300 Q720,220 800,290 Q880,240 960,310 Q1040,220 1120,300 Q1200,250 1280,310 Q1360,230 1440,290 L1440,400 Z"
            fill="url(#grassGrad1)" />
          {/* Individual grass blades */}
          {[...Array(200)].map((_, i) => (
            <line key={i}
              x1={i * 7.2} y1="400"
              x2={i * 7.2 + (Math.sin(i * 0.7) * 20)}
              y2={280 - Math.random() * 80}
              stroke="#0d1a0a" strokeWidth="1.5"
              opacity={0.3 + Math.random() * 0.5}
            />
          ))}
        </svg>
      </div>

      {/* Content - centered */}
      <div className="relative z-10 text-center px-6 w-full">
        <div className={`transition-all duration-1200 ${active ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          {/* Top label */}
          <div className="mb-12">
            <span className="text-amber-400/40 text-xs md:text-sm tracking-[0.6em] font-light border border-amber-400/10 px-6 py-2">
              野 里 扎 啤 俱 乐 部
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.08em] text-white leading-none mb-6">
            于城市之中
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.08em] leading-none mb-10"
            style={{
              background: "linear-gradient(180deg, #D4A843 0%, #8B6914 50%, #5C3A0A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            寻找一方野境
          </h1>

          {/* Subtitle */}
          <div className="space-y-2 mb-14">
            <p className="text-white/35 text-sm md:text-base tracking-[0.3em] font-light">
              鲜扎啤 · 野里相聚
            </p>
            <p className="text-white/15 text-xs tracking-[0.4em] font-extralight">
              FRESH DRAFT BEER · YELI BEER CLUB
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/15 text-[10px] tracking-[0.4em]">向下滑动</span>
            <div className="w-4 h-7 rounded-full border border-white/10 flex justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-amber-400/40 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
