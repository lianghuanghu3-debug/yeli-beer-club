import { useRef, useEffect, useState } from "react";

export default function MenuPage({ active, onWheel }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => onWheel(e, 3);
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [onWheel]);

  useEffect(() => {
    if (active) { const t = setTimeout(() => setShow(true), 300); return () => clearTimeout(t); }
    else setShow(false);
  }, [active]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center bg-gradient-to-b from-[#060f06] via-[#0a1408] to-[#060f06] overflow-hidden py-10"
    >
      {/* Grass at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[20vh] pointer-events-none opacity-[0.05]">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="absolute bottom-0 w-px bg-[#4a8c5a]"
            style={{ left: `${i}%`, height: `${20 + Math.random() * 70}px`, transform: `rotate(${(Math.random() - 0.5) * 12}deg)` }} />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
        <div className={`transition-all duration-1000 ${active ? "opacity-100" : "opacity-0 translate-y-8"}`}>
          {/* Header */}
          <div className="text-center mb-14">
            <span className="text-amber-400/40 text-xs tracking-[0.5em] font-light border border-amber-400/10 px-6 py-2">
              MENU · 团购套餐
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-[0.03em] text-white mt-6 mb-3">
              野里特惠
            </h2>
            <p className="text-white/20 text-sm tracking-[0.3em] font-light">
              鲜扎啤 · 畅快饮
            </p>
          </div>

          {/* Two套餐 cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {/* 尝鲜套餐 */}
            <div className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-8 md:p-10 transition-all duration-700 hover:border-amber-400/20 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: "200ms" }}>
              {/* Glow blob */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />

              <div className="relative z-10 text-center">
                <div className="text-amber-400/40 text-xs tracking-[0.4em] mb-4 font-light">尝鲜首选</div>

                {/* Price */}
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-amber-400/60 text-lg font-light">¥</span>
                  <span className="text-white text-7xl md:text-8xl font-extrabold tracking-tighter leading-none">9</span>
                  <span className="text-white/80 text-4xl md:text-5xl font-bold">.9</span>
                </div>

                <h3 className="text-white/90 text-2xl md:text-3xl font-bold tracking-wide mb-4">
                  四款扎啤
                </h3>
                <p className="text-white/40 text-base font-light mb-6">
                  选择尝鲜
                </p>

                {/* Beer icons row */}
                <div className="flex justify-center gap-3 mb-6">
                  {["黄啤", "白啤", "黑啤", "果啤"].map((b, i) => (
                    <div key={b} className={`w-10 h-16 rounded-b-xl rounded-t-md border border-white/15 relative overflow-hidden transition-all duration-500 ${show ? "opacity-100" : "opacity-0"}`}
                      style={{ transitionDelay: `${600 + i * 100}ms` }}>
                      <div className="absolute bottom-0 left-0 right-0 h-[65%] rounded-b-xl"
                        style={{ background: `linear-gradient(to top, ${["#D4A843","#C4B078","#4A3020","#D4785A"][i]}cc, ${["#D4A843","#C4B078","#4A3020","#D4785A"][i]}33)` }} />
                      <div className="absolute top-[35%] left-0 right-0 h-2 bg-gradient-to-b from-white/30 to-white/5 rounded-t" />
                    </div>
                  ))}
                </div>

                <div className="inline-block px-6 py-2.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400/70 text-sm tracking-wider font-medium hover:bg-amber-400/15 transition-colors cursor-pointer">
                  立即尝鲜
                </div>
              </div>
            </div>

            {/* 畅饮套餐 */}
            <div className={`group relative overflow-hidden rounded-2xl border border-amber-400/15 bg-gradient-to-b from-amber-400/[0.03] to-transparent p-8 md:p-10 transition-all duration-700 hover:border-amber-400/30 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: "400ms" }}>
              {/* Glow blob */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-amber-400/8 blur-3xl pointer-events-none" />
              {/* 推荐标签 */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-400/20 text-amber-400/80 text-xs tracking-wider font-medium">
                推荐
              </div>

              <div className="relative z-10 text-center">
                <div className="text-amber-400/50 text-xs tracking-[0.4em] mb-4 font-light">聚会必备</div>

                {/* Price */}
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-amber-400/70 text-lg font-light">¥</span>
                  <span className="text-amber-400 text-7xl md:text-8xl font-extrabold tracking-tighter leading-none">39</span>
                  <span className="text-amber-400/80 text-4xl md:text-5xl font-bold">.9</span>
                </div>

                <h3 className="text-amber-400/90 text-2xl md:text-3xl font-bold tracking-wide mb-1">
                  无限畅饮
                </h3>
                <p className="text-amber-400/50 text-base font-light mb-6">
                  无限续杯
                </p>

                {/* Feature list */}
                <div className="space-y-3 mb-8 text-center">
                  {["全系列扎啤任选", "无限次数续杯", "适合聚会团建", "赠送佐酒小食"].map((f, i) => (
                    <div key={f} className="text-white/40 text-sm font-light flex items-center justify-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-amber-400/40" />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="inline-block px-6 py-2.5 rounded-full bg-amber-400 text-black text-sm tracking-wider font-semibold hover:bg-amber-300 transition-colors cursor-pointer shadow-lg shadow-amber-400/20">
                  立即畅饮
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
