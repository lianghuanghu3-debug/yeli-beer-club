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
      className="relative w-full h-screen flex items-center bg-gradient-to-b from-[#0a1208] via-[#0d180a] to-[#0a1508] overflow-hidden"
    >
      {/* Left - forest tree silhouettes */}
      <div className="absolute left-0 top-0 bottom-0 w-[30vw] pointer-events-none opacity-[0.06]">
        <svg viewBox="0 0 300 900" preserveAspectRatio="none" className="w-full h-full">
          <path d="M150,200 L200,800 L100,800 Z" fill="#4a8c5a" />
          <path d="M120,300 L170,800 L70,800 Z" fill="#3a7048" />
          <path d="M180,250 L230,800 L130,800 Z" fill="#5a9c6a" />
          <path d="M90,350 L140,800 L40,800 Z" fill="#2a5a38" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 w-full">
        <div className={`transition-all duration-1000 delay-200 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-amber-400/50 text-xs tracking-[0.4em] font-light">ABOUT</span>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.1em] text-white/85 mt-4 mb-8">
            野里相聚<br />
            <span className="text-amber-400/60">扎啤相伴</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 text-white/40 text-sm leading-relaxed font-light">
              <p>
                野里扎啤俱乐部坐落于海南省海口市秀英区永万路108号，
                展兴高新花园旁。这里不是城市的喧嚣角落，而是我们为你
                在钢铁森林中开辟的一方野境。
              </p>
              <p>
                精选进口麦芽与啤酒花，严格控制发酵温度与时间，
                只为呈现最纯正、最鲜爽的扎啤风味。
              </p>
            </div>
            <div className="space-y-6 text-white/30 text-xs leading-relaxed font-light">
              <div className="border-l border-amber-400/10 pl-4">
                <div className="text-amber-400/50 text-lg font-light">鲜啤直供</div>
                <div className="mt-1">从酿造到上桌全程冷链锁鲜</div>
              </div>
              <div className="border-l border-amber-400/10 pl-4">
                <div className="text-amber-400/50 text-lg font-light">聚会首选</div>
                <div className="mt-1">宽敞舒适的环境，啤酒品类丰富</div>
              </div>
              <div className="border-l border-amber-400/10 pl-4">
                <div className="text-amber-400/50 text-lg font-light">品质严选</div>
                <div className="mt-1">精选原料，匠心酿造每一杯</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right - grass texture hint */}
      <div className="absolute right-0 bottom-0 w-[50vw] h-[50vh] pointer-events-none opacity-[0.03]">
        <svg viewBox="0 0 600 500" className="w-full h-full">
          {[...Array(40)].map((_, i) => (
            <line key={i}
              x1={10 + i * 15} y1={500}
              x2={10 + i * 15 + (Math.random() - 0.5) * 10}
              y2={300 + Math.random() * 150}
              stroke="#4a8c5a" strokeWidth={1 + Math.random() * 2}
            />
          ))}
        </svg>
      </div>
    </section>
  );
}
