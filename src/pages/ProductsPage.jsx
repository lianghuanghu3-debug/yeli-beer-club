import { useRef, useEffect, useState } from "react";

const products = [
  {
    name: "经典黄啤", tag: "招牌",
    desc: "色泽金黄透亮，泡沫细腻持久，口感清爽醇和",
    spec: "12°P / ≥4.5%vol",
    liquid: "#E8A820", foamColor: "#F5D078",
    bubbles: "#FFF8DC",
  },
  {
    name: "德式白啤", tag: "人气",
    desc: "小麦比例超50%，酯香浓郁，入口丝滑柔和",
    spec: "11°P / ≥4.2%vol",
    liquid: "#D4B870", foamColor: "#F0E0B8",
    bubbles: "#FFFEF0",
  },
  {
    name: "深色黑啤", tag: "经典",
    desc: "烘焙麦芽酿造，咖啡巧克力香气交织",
    spec: "14°P / ≥5.2%vol",
    liquid: "#3C1A0A", foamColor: "#A08070",
    bubbles: "#D0C0B0",
  },
  {
    name: "果味精酿", tag: "新品",
    desc: "百香果西柚冷萃入酒，果香清新爽口",
    spec: "10°P / ≥3.8%vol",
    liquid: "#E87050", foamColor: "#F0A890",
    bubbles: "#FFE0D8",
  },
];

function BeerGlass({ product, active, index }) {
  return (
    <div className="relative flex justify-center">
      <div className="relative w-16 h-40 sm:w-18 sm:h-44 md:w-20 md:h-48">
        {/* Glass body */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 sm:w-18 md:w-20 h-34 sm:h-38 md:h-44 border-2 border-white/25 rounded-b-3xl rounded-t-xl overflow-hidden bg-black/30">
          
          {/* Beer liquid - using inline style for exact color */}
          <div className="absolute bottom-0 left-0 right-0 transition-all duration-[2000ms] rounded-b-3xl"
            style={{
              height: active ? "70%" : "0%",
              background: `linear-gradient(to top, ${product.liquid}, ${product.liquid}88)`,
            }}
          />

          {/* Foam head */}
          <div className="absolute left-0 right-0 transition-all duration-[2000ms] delay-300 rounded-t-lg"
            style={{
              height: active ? "16%" : "0%",
              bottom: active ? "70%" : "0%",
              opacity: active ? 1 : 0,
              background: `linear-gradient(to bottom, #FFFFFFcc, ${product.foamColor}88)`,
            }}>
            {/* Foam bubbles */}
            {active && [...Array(10)].map((_, i) => (
              <div key={i} className="absolute rounded-full animate-bubble"
                style={{
                  width: `${3+Math.random()*6}px`,
                  height: `${3+Math.random()*6}px`,
                  left: `${5+Math.random()*85}%`,
                  top: `${10+Math.random()*70}%`,
                  animationDelay: `${i*0.2}s`,
                  animationDuration: `${1.2+Math.random()*2}s`,
                  background: `radial-gradient(circle, #FFFFFF, ${product.bubbles})`,
                }}
              />
            ))}
          </div>

          {/* Rising bubbles in liquid */}
          {active && [...Array(15)].map((_, i) => (
            <div key={`b-${i}`} className="absolute rounded-full animate-rise"
              style={{
                width: `${2+Math.random()*4}px`,
                height: `${2+Math.random()*4}px`,
                left: `${10+Math.random()*75}%`,
                bottom: `${5+Math.random()*55}%`,
                animationDelay: `${i*0.3}s`,
                animationDuration: `${1.8+Math.random()*3}s`,
                background: `radial-gradient(circle, #FFFFFFcc, ${product.bubbles}44)`,
              }}
            />
          ))}

          {/* Glass highlight */}
          <div className="absolute bottom-4 left-[62%] w-[2px] h-24 md:h-28 bg-white/10 rounded-full" />
          <div className="absolute bottom-6 left-[28%] w-[1px] h-16 md:h-20 bg-white/5 rounded-full" />
          
          {/* Rim highlight */}
          <div className="absolute top-0 left-2 right-2 h-[2px] bg-white/15 rounded-full" />
        </div>

        {/* Glass base */}
        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-10 sm:w-11 md:w-12 h-1.5 border-2 border-white/20 rounded-full" />
        
        {/* Handle */}
        <div className="absolute -right-1 top-4 w-7 h-14 md:w-8 md:h-16 border-[2px] border-white/20 rounded-r-2xl rounded-l-md" />
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
    if (active) { const t = setTimeout(() => setShowBubbles(true), 400); return () => clearTimeout(t); }
    else setShowBubbles(false);
  }, [active]);

  return (
    <section
      ref={ref}
      className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#040a04] via-[#0a150a] to-[#040a04] overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-6 w-full overflow-y-auto py-8">
        <div className={`transition-all duration-1000 max-w-5xl w-full ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          
          <div className="text-center mb-6 md:mb-10">
            <span className="text-amber-400/30 text-[10px] md:text-xs tracking-[0.5em] font-light">PRODUCTS · 产品系列</span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-[0.03em] text-white mt-3 mb-1">总有一款</h2>
            <p className="text-white/20 text-xs tracking-[0.3em] font-light">野里扎啤四大鲜啤系列</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            {products.map((p, i) => (
              <div key={p.name}
                className="group relative p-3 md:p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-500 text-center">
                <div className="mb-3 flex justify-center">
                  <BeerGlass product={p} active={showBubbles} index={i} />
                </div>
                <span className="inline-block text-[9px] md:text-[10px] px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400/60 mb-2 tracking-wider">{p.tag}</span>
                <h3 className="text-white/85 text-sm md:text-base font-semibold tracking-wide mb-1">{p.name}</h3>
                <p className="text-white/30 text-[10px] md:text-xs leading-relaxed mb-1 font-light">{p.desc}</p>
                <p className="text-white/15 text-[9px] md:text-[10px] tracking-wider">{p.spec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
