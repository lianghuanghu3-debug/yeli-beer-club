import { useRef, useEffect } from "react";
import { Beer, Wheat, GlassWater, Droplets } from "lucide-react";

const products = [
  { icon: Beer, name: "经典黄啤", desc: "色泽金黄透亮，泡沫细腻持久，口感清爽醇和", spec: "12°P / ≥4.5%vol", color: "#d4a843" },
  { icon: Wheat, name: "德式白啤", desc: "小麦比例超50%，酯香浓郁，入口丝滑", spec: "11°P / ≥4.2%vol", color: "#c4b078" },
  { icon: GlassWater, name: "深色黑啤", desc: "烘焙麦芽酿造，咖啡巧克力香气交织", spec: "14°P / ≥5.2%vol", color: "#6b4a2a" },
  { icon: Droplets, name: "果味精酿", desc: "百香果西柚冷萃入酒，果香清新爽口", spec: "10°P / ≥3.8%vol", color: "#d4785a" },
];

export default function ProductsPage({ active, onWheel }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => onWheel(e, 2);
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [onWheel]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center bg-gradient-to-b from-[#0a1508] via-[#0c1808] to-[#0a1208] overflow-hidden py-16"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 w-full">
        <div className={`transition-all duration-1000 delay-200 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-amber-400/50 text-xs tracking-[0.4em] font-light">PRODUCTS</span>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.1em] text-white/85 mt-4 mb-3">
            总有一款
          </h2>
          <p className="text-white/25 text-sm tracking-[0.2em] font-light mb-12">
            野里扎啤四大鲜啤系列
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <div
                key={p.name}
                className="group relative p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-500"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Glass illustration */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-16 h-28">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-24 border border-white/10 rounded-b-2xl rounded-t-lg overflow-hidden">
                      <div
                        className="absolute bottom-0 left-0 right-0 h-[75%] rounded-b-2xl"
                        style={{
                          background: `linear-gradient(to top, ${p.color}cc, ${p.color}33)`,
                        }}
                      />
                      <div className="absolute top-[25%] left-0 right-0 h-3 bg-gradient-to-b from-white/30 to-white/5 rounded-t" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <p.icon className="w-4 h-4 text-amber-400/50" />
                  <h3 className="text-white/80 font-light tracking-wide">{p.name}</h3>
                </div>
                <p className="text-white/25 text-xs leading-relaxed mb-2 font-light">{p.desc}</p>
                <p className="text-white/15 text-[10px] tracking-wider">{p.spec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
