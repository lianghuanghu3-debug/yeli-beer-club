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
      {/* Glass */}
      <div className="relative w-20 h-48">
        {/* Glass outline */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-44 border-2 border-white/20 rounded-b-3xl rounded-t-xl overflow-hidden bg-black/20 backdrop-blur-sm">
          {/* Glass rim highlight */}
          <div className="absolute top-0 left-2 right-2 h-1 bg-white/10 rounded-full" />

          {/* Beer liquid */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${product.liquid} transition-all duration-[2000ms]`}
            style={{ height: active ? "70%" : "0%" }} />

          {/* Foam head */}
          <div className={`absolute left-0 right-0 bg-gradient-to-b ${product.foam} transition-all duration-[2000ms] delay-300 rounded-t-lg`}
            style={{
              height: active ? "16%" : "0%",
              bottom: active ? "70%" : "0%",
              opacity: active ? 1 : 0,
            }}>
            {/* Foam bubbles */}
            {active && [...Array(8)].map((_, i) => (
              <div key={i} className="absolute rounded-full bg-white/40 animate-bubble"
                style={{
                  width: `${2 + Math.random() * 5}px`,
                  height: `${2 + Math.random() * 5}px`,
                  left: `${10 + i * 10}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${1.5 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Rising bubbles */}
          {active && [...Array(12)].map((_, i) => (
            <div key={`b-${i}`} className="absolute rounded-full bg-white/30 animate-rise"
              style={{
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
                left: `${15 + Math.random() * 65}%`,
                bottom: `${5 + Math.random() * 55}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}

          {/* Glass highlight stripe */}
          <div className="absolute bottom-4 left-[60%] w-0.5 h-28 bg-white/5 rounded-full" />
          <div className="absolute bottom-4 left-[25%] w-0.5 h-16 bg-white/3 rounded-full" />
        </div>

        {/* Glass base */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-2 border-2 border-white/15 rounded-full" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 border-2 border-white/10 rounded-full" />

        {/* Handle */}
        <div className="absolute right-2 top-4 w-8 h-16 border-2 border-white/15 rounded-r-2xl rounded-l-md" />
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
    if (active) {
      const t = setTimeout(() => setShowBubbles(true), 400);
      return () => clearTimeout(t);
    } else {
      setShowBubbles(false);
    }
  }, [active]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center bg-gradient-to-b from-[#060f06] via-[#0a150a] to-[#060f06] overflow-hidden py-10"
    >
      {/* Grass at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[25vh] pointer-events-none">
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="w-full h-full opacity-[0.06]">
          {[...Array(150)].map((_, i) => (
            <line key={i} x1={i * 10} y1="300" x2={i * 10 + (Math.sin(i * 0.8) * 30)} y2={100 + Math.random() * 120}
              stroke="#4a8c5a" strokeWidth={1 + Math.random() * 3} strokeLinecap="round" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className={`transition-all duration-1000 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-amber-400/30 text-xs tracking-[0.5em] font-light">
              PRODUCTS · 产品系列
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[0.05em] text-white mt-4 mb-2">
              总有一款
            </h2>
            <p className="text-white/20 text-sm tracking-[0.3em] font-light">
              野里扎啤四大鲜啤系列
            </p>
          </div>

          {/* Product cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <div
                key={p.name}
                className="group relative p-6 pt-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-500 text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Beer glass */}
                <div className="mb-6">
                  <BeerGlass product={p} active={showBubbles} />
                </div>

                {/* Tag */}
                <span className="inline-block text-[10px] px-3 py-0.5 rounded-full bg-amber-400/10 text-amber-400/60 mb-3 tracking-wider">
                  {p.tag}
                </span>

                {/* Name */}
                <h3 className="text-white/85 text-lg font-semibold tracking-wide mb-2">
                  {p.name}
                </h3>

                {/* Description */}
                <p className="text-white/30 text-xs leading-relaxed mb-2 font-light">
                  {p.desc}
                </p>

                {/* Specs */}
                <p className="text-white/15 text-[10px] tracking-wider">
                  {p.spec}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
