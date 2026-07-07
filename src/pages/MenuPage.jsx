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
      className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#040a04] via-[#0a1408] to-[#040a04] overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center px-4 w-full overflow-y-auto py-8">
        <div className={`transition-all duration-1000 max-w-3xl w-full ${active ? "opacity-100" : "opacity-0 translate-y-6"}`}>
          
          <div className="text-center mb-8 md:mb-10">
            <span className="text-amber-400/40 text-[10px] md:text-xs tracking-[0.5em] font-light border border-amber-400/10 px-5 py-1.5">
              MENU · 团购套餐
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-[0.03em] text-white mt-4 mb-1">
              野里特惠
            </h2>
            <p className="text-white/20 text-xs tracking-[0.3em] font-light">鲜扎啤 · 畅快饮</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* ¥9.9 */}
            <div className={`group relative rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-6 md:p-8 text-center transition-all duration-700 hover:border-amber-400/20 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="text-amber-400/40 text-[10px] tracking-[0.4em] mb-3 font-light">尝鲜首选</div>
              <div className="flex items-baseline justify-center gap-0.5 mb-1">
                <span className="text-amber-400/60 text-base font-light">¥</span>
                <span className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none">9</span>
                <span className="text-white/80 text-3xl md:text-4xl font-bold">.9</span>
              </div>
              <h3 className="text-white/90 text-xl md:text-2xl font-bold tracking-wide mb-1">四款扎啤</h3>
              <p className="text-white/40 text-sm font-light mb-4">选择尝鲜</p>
              <div className="flex justify-center gap-2 mb-4">
                {["黄啤","白啤","黑啤","果啤"].map((b,i) => (
                  <div key={b} className={`w-8 h-14 rounded-b-xl rounded-t-md border border-white/15 relative overflow-hidden ${show ? "opacity-100" : "opacity-0"}`}
                    style={{ transitionDelay: `${500+i*80}ms` }}>
                    <div className="absolute bottom-0 left-0 right-0 h-[65%] rounded-b-xl"
                      style={{ background: `linear-gradient(to top, ${["#D4A843","#C4B078","#4A3020","#D4785A"][i]}cc, ${["#D4A843","#C4B078","#4A3020","#D4785A"][i]}33)` }} />
                    <div className="absolute top-[35%] left-0 right-0 h-1.5 bg-gradient-to-b from-white/30 to-white/5 rounded-t" />
                  </div>
                ))}
              </div>
              <div className="inline-block px-5 py-2 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400/70 text-xs tracking-wider font-medium">
                立即尝鲜
              </div>
            </div>

            {/* ¥39.9 */}
            <div className={`group relative rounded-2xl border border-amber-400/15 bg-gradient-to-b from-amber-400/[0.03] to-transparent p-6 md:p-8 text-center transition-all duration-700 hover:border-amber-400/30 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "300ms" }}>
              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-400/80 text-[10px] tracking-wider font-medium">推荐</div>
              <div className="text-amber-400/50 text-[10px] tracking-[0.4em] mb-3 font-light">聚会必备</div>
              <div className="flex items-baseline justify-center gap-0.5 mb-1">
                <span className="text-amber-400/70 text-base font-light">¥</span>
                <span className="text-amber-400 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none">39</span>
                <span className="text-amber-400/80 text-3xl md:text-4xl font-bold">.9</span>
              </div>
              <h3 className="text-amber-400/90 text-xl md:text-2xl font-bold tracking-wide mb-1">无限畅饮</h3>
              <p className="text-amber-400/50 text-sm font-light mb-4">无限续杯</p>
              <div className="space-y-2 mb-5">
                {["全系列扎啤任选","无限次数续杯","适合聚会团建","赠送佐酒小食"].map(f => (
                  <div key={f} className="text-white/40 text-xs font-light flex items-center justify-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-amber-400/40" />{f}
                  </div>
                ))}
              </div>
              <div className="inline-block px-5 py-2 rounded-full bg-amber-400 text-black text-xs tracking-wider font-semibold shadow-lg shadow-amber-400/20">
                立即畅饮
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
