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
      {/* Brand name at top */}
      <div className="absolute top-6 md:top-10 left-0 right-0 text-center z-10">
        <h2 className="text-white/80 text-xl md:text-3xl font-bold tracking-[0.15em]">
          野里扎啤俱乐部
        </h2>
        <div className="w-12 h-[2px] bg-amber-400/40 mx-auto mt-2" />
      </div>

      {/* Main content */}
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

      {/* Scroll hint */}
      <div className="absolute bottom-8 md:bottom-10 left-0 right-0 text-center z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/50 text-sm md:text-base tracking-[0.3em] font-medium animate-pulse">
            向下滑动探索
          </span>
          <div className="w-[2px] h-10 bg-gradient-to-b from-amber-400/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
