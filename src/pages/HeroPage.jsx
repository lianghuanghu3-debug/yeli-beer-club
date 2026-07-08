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
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1e301c] via-[#1e301c] to-[#1a2a18]"
    >
      {/* Brand name - at top, same style as original */}
      <div className="absolute top-8 md:top-12 left-0 right-0 text-center z-10">
        <span className="text-amber-400/40 text-[11px] md:text-sm tracking-[0.6em] font-light border border-amber-400/10 px-6 md:px-8 py-2 md:py-3">
          野 里 扎 啤 俱 乐 部
        </span>
      </div>

      {/* Main content - centered */}
      <div className="flex-1 flex items-center justify-center text-center px-4 w-full">
        <div className={`transition-all duration-1200 ${active ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] text-white leading-[1.05] mb-2">
            于城市之中
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] leading-[1.05] mb-8 md:mb-10"
            style={{
              background: "linear-gradient(180deg, #E8C55A 0%, #D4A843 30%, #8B6914 70%, #5C3A0A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            寻找一方野境
          </h1>

          <p className="text-white/40 text-sm md:text-lg tracking-[0.3em] font-light">鲜扎啤 · 野里相聚</p>
          <p className="text-white/15 text-[11px] md:text-sm tracking-[0.5em] font-extralight">FRESH DRAFT BEER · YELI BEER CLUB</p>
        </div>
      </div>

      {/* Scroll hint - clearer, same layout as original */}
      <div className="absolute bottom-8 md:bottom-10 left-0 right-0 text-center z-10">
        <div className="flex flex-col items-center gap-3">
          <span className="text-white/40 text-[11px] md:text-sm tracking-[0.4em] font-medium animate-pulse">
            向下滑动探索
          </span>
          <div className="w-5 h-8 rounded-full border border-white/15 flex justify-center pt-1.5">
            <div className="w-1.5 h-3 rounded-full bg-amber-400/50 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
