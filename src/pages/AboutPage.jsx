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
      <div className="absolute inset-0 flex items-center justify-center text-center px-4 w-full overflow-y-auto py-10">
        <div className={`transition-all duration-1000 delay-200 max-w-xl w-full ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          
          <span className="text-amber-400/30 text-[10px] md:text-xs tracking-[0.5em] font-light">
            ABOUT · 关于我们
          </span>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-[0.03em] text-white leading-tight mt-4 mb-2">
            野里相聚
          </h2>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-[0.03em] leading-tight mb-10"
            style={{
              background: "linear-gradient(180deg, #D4A843 0%, #8B6914 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            扎啤相伴
          </h2>

          <p className="text-white/35 text-sm md:text-base leading-relaxed font-light mb-14">
            野里扎啤俱乐部坐落于海口市秀英区永万路108号，展兴高新花园旁。
            坚持鲜扎啤直供，精选优质麦芽与啤酒花，匠心酿造每一杯。
          </p>

          {/* Three pillars - stacked with more space */}
          <div className="space-y-8">
            {[
              { num: "01", title: "鲜啤直供", desc: "从酿造到上桌全程冷链锁鲜，确保每一杯扎啤都在最佳赏味期" },
              { num: "02", title: "聚会首选", desc: "宽敞舒适的环境，丰富的扎啤品类，朋友相聚的理想去处" },
              { num: "03", title: "品质严选", desc: "精选进口麦芽与啤酒花，严格控制酿造温度与时间" },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-5 text-left">
                <div className="text-amber-400/30 text-lg md:text-xl font-light tracking-wider shrink-0 mt-0.5">
                  {item.num}
                </div>
                <div>
                  <div className="text-white/70 text-base md:text-lg font-medium tracking-wide mb-1">
                    {item.title}
                  </div>
                  <div className="text-white/25 text-sm leading-relaxed font-light">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
