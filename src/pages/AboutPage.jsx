import { useRef, useEffect } from "react";

export default function AboutPage({ active, onWheel }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => onWheel(e, 1);
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [onWheel]);

  return (
    <section
      ref={ref}
      className="relative w-full h-screen flex items-center bg-gradient-to-b from-[#061006] via-[#0a150a] to-[#060f06] overflow-hidden"
    >
      <div className="absolute right-0 top-[20vh] w-[25vw] h-[50vh] pointer-events-none opacity-[0.03]">
        <svg viewBox="0 0 200 500" className="w-full h-full">
          {[...Array(25)].map((_, i) => (
            <line key={i} x1={5+i*8} y1="500" x2={5+i*8} y2={200+Math.random()*200}
              stroke="#4a8c5a" strokeWidth="1.5" strokeLinecap="round" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 py-10 text-center">
        <div className={`transition-all duration-1000 delay-200 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          
          <span className="text-amber-400/30 text-[10px] md:text-xs tracking-[0.5em] font-light">
            ABOUT · 关于我们
          </span>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-[0.03em] text-white leading-tight mt-4 mb-2">
            野里相聚
          </h2>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-[0.03em] leading-tight mb-8"
            style={{
              background: "linear-gradient(180deg, #D4A843 0%, #8B6914 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            扎啤相伴
          </h2>

          <p className="text-white/35 text-sm md:text-base leading-relaxed font-light max-w-xl mx-auto mb-12 px-2">
            野里扎啤俱乐部坐落于海口市秀英区永万路108号，展兴高新花园旁。
            坚持鲜扎啤直供，精选优质麦芽与啤酒花，匠心酿造每一杯。
          </p>

          <div className="grid grid-cols-3 gap-4 md:gap-10">
            {[
              { num: "01", title: "鲜啤直供", desc: "全程冷链锁鲜" },
              { num: "02", title: "聚会首选", desc: "环境舒适品类丰富" },
              { num: "03", title: "品质严选", desc: "精选原料匠心酿造" },
            ].map((item) => (
              <div key={item.num} className="space-y-2">
                <div className="text-amber-400/25 text-[10px] md:text-xs tracking-[0.3em]">{item.num}</div>
                <div className="text-white/70 text-sm md:text-lg font-medium tracking-wide">{item.title}</div>
                <div className="text-white/20 text-[11px] md:text-xs font-light">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
