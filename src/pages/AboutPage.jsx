import { useRef, useEffect, useMemo } from "react";

export default function AboutPage({ active, onWheel }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => onWheel(e, 1);
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [onWheel]);

  const trunks = useMemo(() =>
    [...Array(6)].map(() => ({
      left: 2 + Math.random() * 96,
      width: 2 + Math.random() * 5,
      height: 30 + Math.random() * 50,
      opacity: 0.02 + Math.random() * 0.04,
    })), []
  );

  return (
    <section
      ref={ref}
      className="relative w-full h-screen flex items-center bg-gradient-to-b from-[#061006] via-[#0a150a] to-[#060f06] overflow-hidden"
    >
      {/* Background tree trunks */}
      <div className="absolute inset-0 pointer-events-none">
        {trunks.map((t, i) => (
          <div key={i} className="absolute bottom-0" style={{ left: `${t.left}%`, opacity: t.opacity }}>
            <div className="bg-[#152010] rounded-t-sm" style={{ width: `${t.width}vw`, height: `${t.height}vh` }} />
          </div>
        ))}
      </div>

      {/* Side grassland SVG */}
      <div className="absolute right-0 top-[20vh] w-[30vw] h-[60vh] pointer-events-none opacity-[0.04]">
        <svg viewBox="0 0 300 600" className="w-full h-full">
          {[...Array(30)].map((_, i) => (
            <line key={i} x1={10 + i * 10} y1="600" x2={10 + i * 10} y2={200 + Math.random() * 300}
              stroke="#4a8c5a" strokeWidth="1.5" strokeLinecap="round" />
          ))}
        </svg>
      </div>

      {/* Content - centered grid */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full">
        <div className={`transition-all duration-1000 delay-200 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {/* Section label */}
          <div className="text-center mb-16">
            <span className="text-amber-400/30 text-xs tracking-[0.5em] font-light">
              ABOUT · 关于我们
            </span>
          </div>

          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-[0.05em] text-white leading-tight">
              野里相聚
            </h2>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-[0.05em] leading-tight mt-2"
              style={{
                background: "linear-gradient(180deg, #D4A843 0%, #8B6914 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              扎啤相伴
            </h2>
          </div>

          {/* Description */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-white/40 text-sm md:text-base leading-relaxed font-light">
              野里扎啤俱乐部坐落于海口市秀英区永万路108号，展兴高新花园旁。
              我们坚持鲜扎啤直供，精选优质麦芽与啤酒花，以匠心工艺确保每一杯
              都拥有醇厚口感与绵密泡沫。
            </p>
          </div>

          {/* Three pillars */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 text-center">
            {[
              { num: "01", title: "鲜啤直供", desc: "从酿造到上桌全程冷链锁鲜" },
              { num: "02", title: "聚会首选", desc: "宽敞舒适环境，品类丰富" },
              { num: "03", title: "品质严选", desc: "精选原料，匠心酿造每一杯" },
            ].map((item) => (
              <div key={item.num} className="space-y-3">
                <div className="text-amber-400/30 text-xs tracking-[0.3em]">{item.num}</div>
                <div className="text-white/70 text-sm md:text-lg font-medium tracking-wide">{item.title}</div>
                <div className="text-white/20 text-xs font-light">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
