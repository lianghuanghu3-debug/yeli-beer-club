import { useRef, useEffect, useState } from "react";

const products = [
  { name: "经典黄啤", tag: "招牌", desc: "色泽金黄透亮，泡沫细腻持久，口感清爽醇和", spec: "12°P / ≥4.5%vol",
    liquid: "from-amber-400 to-yellow-600", foam: "from-white/90 to-amber-200/60" },
  { name: "德式白啤", tag: "人气", desc: "小麦比例超50%，酯香浓郁，入口丝滑柔和", spec: "11°P / ≥4.2%vol",
    liquid: "from-yellow-200 to-amber-400", foam: "from-white/90 to-yellow-100/60" },
  { name: "深色黑啤", tag: "经典", desc: "烘焙麦芽酿造，咖啡巧克力香气交织", spec: "14°P / ≥5.2%vol",
    liquid: "from-stone-900 to-stone-700", foam: "from-white/60 to-stone-400/40" },
  { name: "果味精酿", tag: "新品", desc: "百香果西柚冷萃入酒，果香清新爽口", spec: "10°P / ≥3.8%vol",
    liquid: "from-pink-400 to-orange-500", foam: "from-white/90 to-pink-200/60" },
];

function BeerGlass({ product, active }) {
  return (
    <div className="relative flex justify-center">
      <div className="relative w-14 h-36 sm:w-16 sm:h-40 md:w-20 md:h-48">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 sm:w-16 md:w-20 h-32 sm:h-36 md:h-44 border-2 border-white/20 rounded-b-3xl rounded-t-xl overflow-hidden bg-black/20 backdrop-blur-sm">
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t transition-all duration-[2000ms]"
            style={{ height: active ? "70%" : "0%", background: `linear-gradient(to top, var(--tw-gradient-stops))` }}
            className={product.liquid} />
          <div className={`absolute left-0 right-0 bg-gradient-to-b ${product.foam} transition-all duration-[2000ms] delay-300 rounded-t-lg`}
            style={{ height: active ? "16%" : "0%", bottom: active ? "70%" : "0%", opacity: active ? 1 : 0 }}>
            {active && [...Array(6)].map((_, i) => (
              <div key={i} className="absolute rounded-full bg-white/40 animate-bubble"
                style={{ width: `${2+Math.random()*4}px`, height: `${2+Math.random()*4}px`, left: `${10+i*12}%`, top: `${15+Math.random()*55}%`, animationDelay: `${i*0.25}s`, animationDuration: `${1.5+Math.random()*2}s` }} />
            ))}
          </div>
          {active && [...Array(8)].map((_, i) => (
            <div key={`b-${i}`} className="absolute rounded-full bg-white/30 animate-rise"
              style={{ width: `${1+Math.random()*2}px`, height: `${1+Math.random()*2}px`, left: `${15+Math.random()*60}%`, bottom: `${5+Math.random()*50}%`, animationDelay: `${i*0.35}s`, animationDuration: `${2+Math.random()*3}s` }} />
          ))}
          <div className="absolute bottom-4 left-[60%] w-0.5 h-20 md:h-28 bg-white/5 rounded-full" />
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-9 sm:w-10 md:w-12 h-1.5 border-2 border-white/15 rounded-full" />
        <div className="absolute right-1 top-3 w-6 h-12 md:w-8 md:h-16 border-2 border-white/15 rounded-r-2xl rounded-l-md" />
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
      className="relative w-full h-screen flex items-center bg-gradient-to-b from-[#060f06] via-[#0a150a] to-[#060f06] overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 right-0 h-[15vh] pointer-events-none opacity-[0.05]">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-full">
          {[...Array(100)].map((_, i) => (
            <line key={i} x1={i*14} y1="200" x2={i*14+(Math.sin(i*0.6)*20)} y2={80+Math.random()*60}
              stroke="#4a8c5a" strokeWidth="1.5" strokeLinecap="round" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-3 sm:px-6 md:px-12 overflow-y-auto max-h-screen py-8">
        <div className={`transition-all duration-1000 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          
          <div className="text-center mb-8 md:mb-10">
            <span className="text-amber-400/30 text-[10px] md:text-xs tracking-[0.5em] font-light">PRODUCTS · 产品系列</span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-[0.03em] text-white mt-3 mb-1">总有一款</h2>
            <p className="text-white/20 text-xs tracking-[0.3em] font-light">野里扎啤四大鲜啤系列</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {products.map((p, i) => (
              <div key={p.name}
                className="group relative p-4 md:p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-500 text-center"
                style={{ transitionDelay: `${i*100}ms` }}>
                <div className="mb-4">
                  <BeerGlass product={p} active={showBubbles} />
                </div>
                <span className="inline-block text-[9px] md:text-[10px] px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400/60 mb-2 tracking-wider">{p.tag}</span>
                <h3 className="text-white/85 text-sm md:text-base font-semibold tracking-wide mb-1">{p.name}</h3>
                <p className="text-white/30 text-[11px] md:text-xs leading-relaxed mb-1 font-light">{p.desc}</p>
                <p className="text-white/15 text-[9px] md:text-[10px] tracking-wider">{p.spec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
