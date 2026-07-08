import { useRef, useEffect, useState } from "react";

const products = [
  { name: "经典黄啤", tag: "招牌", desc: "色泽金黄透亮，泡沫细腻持久，口感清爽醇和", spec: "12°P / ≥4.5%vol",
    liquid: "#F0B830", foam: "#FFE8A0", bubble: "#FFF8DC", dark: false },
  { name: "德式白啤", tag: "人气", desc: "小麦比例超50%，酯香浓郁，入口丝滑柔和", spec: "11°P / ≥4.2%vol",
    liquid: "#E8D090", foam: "#FFF8D8", bubble: "#FFFFF0", dark: false },
  { name: "深色黑啤", tag: "经典", desc: "烘焙麦芽酿造，咖啡巧克力香气交织", spec: "14°P / ≥5.2%vol",
    liquid: "#5C3A1E", foam: "#C8B090", bubble: "#D8C8B0", dark: true },
  { name: "果味精酿", tag: "新品", desc: "百香果西柚冷萃入酒，果香清新爽口", spec: "10°P / ≥3.8%vol",
    liquid: "#F08060", foam: "#FFB8A0", bubble: "#FFE8E0", dark: false },
];

function BeerGlass({ product, active }) {
  return (
    <div className="flex justify-center">
      <div className="relative w-16 h-40 sm:w-18 sm:h-44 md:w-20 md:h-48">
        {/* Glass body */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 sm:w-18 md:w-20 h-[8.5rem] sm:h-[9.5rem] md:h-44 border-2 border-white/25 rounded-b-3xl rounded-t-xl overflow-hidden"
          style={{ background: "rgba(0,0,0,0.15)" }}>
          
          {/* Beer liquid - SOLID color, no transparency */}
          <div className="absolute bottom-0 left-0 right-0 rounded-b-3xl transition-all duration-[1500ms] ease-out"
            style={{
              height: active ? "68%" : "0%",
              background: product.liquid,
            }}
          />

          {/* Foam */}
          <div className="absolute left-0 right-0 rounded-t-lg transition-all duration-[1500ms] delay-200 ease-out"
            style={{
              height: active ? "14%" : "0%",
              bottom: active ? "68%" : "0%",
              opacity: active ? 1 : 0,
              background: product.foam,
            }}>
            {active && [...Array(8)].map((_, i) => (
              <div key={i} className="absolute rounded-full animate-bubble"
                style={{
                  width: `${3+Math.random()*5}px`,
                  height: `${3+Math.random()*5}px`,
                  left: `${5+Math.random()*85}%`,
                  top: `${10+Math.random()*65}%`,
                  animationDelay: `${i*0.2}s`,
                  animationDuration: `${1+Math.random()*1.5}s`,
                  background: "white",
                  opacity: 0.9,
                }}
              />
            ))}
          </div>

          {/* Bubbles in liquid */}
          {active && [...Array(12)].map((_, i) => (
            <div key={`b-${i}`} className="absolute rounded-full animate-rise"
              style={{
                width: `${2+Math.random()*3}px`,
                height: `${2+Math.random()*3}px`,
                left: `${8+Math.random()*78}%`,
                bottom: `${3+Math.random()*50}%`,
                animationDelay: `${i*0.25}s`,
                animationDuration: `${1.5+Math.random()*2.5}s`,
                background: product.dark ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.9)",
              }}
            />
          ))}

          {/* Glass reflections */}
          <div className="absolute bottom-3 left-[60%] w-[3px] h-20 md:h-24 rounded-full"
            style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="absolute bottom-5 left-[25%] w-[2px] h-14 md:h-16 rounded-full"
            style={{ background: "rgba(255,255,255,0.04)" }} />
          <div className="absolute top-1 left-2 right-2 h-[2px] rounded-full"
            style={{ background: "rgba(255,255,255,0.1)" }} />
        </div>

        {/* Base */}
        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-10 md:w-12 h-1.5 rounded-full"
          style={{ border: "2px solid rgba(255,255,255,0.2)" }} />
        
        {/* Handle */}
        <div className="absolute -right-2 top-4 w-7 h-14 md:w-8 md:h-16 rounded-r-2xl rounded-l-md"
          style={{ border: "2px solid rgba(255,255,255,0.2)", borderLeft: "none" }} />
      </div>
    </div>
  );
}

export default function ProductsPage({ active, onWheel }) {
  const ref = useRef(null);
  const [showBubbles, setShowBubbles] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => onWheel(e, 2);
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [onWheel]);

  useEffect(() => {
    if (active) { setShowBubbles(true); }
    else { setShowBubbles(false); }
  }, [active]);

  return (
    <section
      ref={ref}
      className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#1a2a18] via-[#243822] to-[#1a2a18] overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-6 w-full overflow-y-auto py-8">
        <div className={`transition-all duration-800 max-w-5xl w-full ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          
          <div className="text-center mb-6 md:mb-8">
            <span className="text-amber-400/30 text-[10px] md:text-xs tracking-[0.5em] font-light">PRODUCTS · 产品系列</span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-[0.03em] text-white mt-3 mb-1">总有一款</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            {products.map((p, i) => (
              <div key={p.name}
                className="p-3 md:p-4 rounded-2xl border border-white/[0.04] bg-white/[0.01] text-center">
                <div className="mb-2 flex justify-center">
                  <BeerGlass product={p} active={showBubbles} />
                </div>
                <span className="inline-block text-[9px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400/60 mb-1.5 tracking-wider">{p.tag}</span>
                <h3 className="text-white/85 text-sm md:text-base font-semibold tracking-wide mb-0.5">{p.name}</h3>
                <p className="text-white/30 text-[10px] leading-relaxed mb-0.5 font-light">{p.desc}</p>
                <p className="text-white/15 text-[9px] tracking-wider">{p.spec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
