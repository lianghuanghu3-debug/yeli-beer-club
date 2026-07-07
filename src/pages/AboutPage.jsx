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
      className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#040a04] via-[#0a150a] to-[#040a04] overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center text-center px-6 w-full overflow-y-auto py-12">
        <div className={`transition-all duration-1000 delay-200 max-w-lg w-full ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          
          <span className="text-amber-400/30 text-[10px] md:text-xs tracking-[0.5em] font-light">
            ABOUT · 关于我们
          </span>

          <h2 className="text-2xl md:text-4xl font-bold tracking-[0.03em] text-white mt-6 mb-2">
            野里相聚
          </h2>
          <h2 className="text-2xl md:text-4xl font-bold tracking-[0.03em] mb-10"
            style={{
              background: "linear-gradient(180deg, #D4A843 0%, #8B6914 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            扎啤相伴
          </h2>

          <p className="text-white/35 text-sm md:text-base leading-relaxed font-light mb-16">
            坐落于海口市秀英区永万路108号，展兴高新花园旁
          </p>

          <div className="space-y-10">
            <div className="text-left">
              <div className="text-amber-400/25 text-[10px] tracking-[0.3em] mb-1">01</div>
              <div className="text-white/70 text-lg font-medium tracking-wide mb-1">鲜啤直供</div>
              <div className="text-white/25 text-sm leading-relaxed font-light">从酿造到上桌全程冷链锁鲜</div>
            </div>
            <div className="text-left">
              <div className="text-amber-400/25 text-[10px] tracking-[0.3em] mb-1">02</div>
              <div className="text-white/70 text-lg font-medium tracking-wide mb-1">聚会首选</div>
              <div className="text-white/25 text-sm leading-relaxed font-light">宽敞舒适环境，丰富扎啤品类</div>
            </div>
            <div className="text-left">
              <div className="text-amber-400/25 text-[10px] tracking-[0.3em] mb-1">03</div>
              <div className="text-white/70 text-lg font-medium tracking-wide mb-1">品质严选</div>
              <div className="text-white/25 text-sm leading-relaxed font-light">精选进口麦芽与啤酒花，匠心酿造</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
