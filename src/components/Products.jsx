import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Wheat, Beer, GlassWater, Droplets } from "lucide-react";

const products = [
  {
    icon: Beer,
    name: "经典黄啤",
    tag: "招牌",
    desc: "色泽金黄透亮，泡沫细腻持久，口感清爽醇和，是野里扎啤最受欢迎的经典之选。",
    specs: "原麦汁浓度 12°P · 酒精度 ≥4.5%vol",
    color: "from-amber-400 to-yellow-500",
  },
  {
    icon: Wheat,
    name: "德式白啤",
    tag: "人气",
    desc: "小麦比例超过50%，带有香蕉与丁香酯香，酒体浑浊如云雾，入口丝滑柔和。",
    specs: "原麦汁浓度 11°P · 酒精度 ≥4.2%vol",
    color: "from-yellow-200 to-amber-300",
  },
  {
    icon: GlassWater,
    name: "深色黑啤",
    tag: "经典",
    desc: "烘焙麦芽酿造，咖啡与巧克力香气交织，酒体醇厚饱满，余味悠长。",
    specs: "原麦汁浓度 14°P · 酒精度 ≥5.2%vol",
    color: "from-stone-800 to-stone-950",
  },
  {
    icon: Droplets,
    name: "果味精酿",
    tag: "新品",
    desc: "百香果与西柚冷萃入酒，果香浓郁而不掩麦芽风味，清新爽口，深受年轻人喜爱。",
    specs: "原麦汁浓度 10°P · 酒精度 ≥3.8%vol",
    color: "from-pink-400 to-orange-400",
  },
];

export default function Products() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState(null);

  return (
    <section id="products" className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-black to-beer-dark/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-beer-gold text-xs tracking-[0.3em] uppercase">
            产品系列
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6">
            总有一款，适合你
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            野里扎啤俱乐部，四大鲜啤系列满足不同口味需求
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 hover:border-beer-gold/20 transition-all duration-500"
            >
              <div className="relative mb-6 flex justify-center">
                <div className="relative w-20 h-32">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-28 border-2 border-white/20 rounded-b-2xl rounded-t-lg overflow-hidden">
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${p.color}`}
                      initial={{ height: "0%" }}
                      animate={inView ? { height: "75%" } : {}}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    />
                    <motion.div
                      className="absolute top-[25%] left-0 right-0 h-4 bg-gradient-to-b from-white/90 to-white/40 rounded-t-lg"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                    />
                    {[...Array(5)].map((_, j) => (
                      <motion.div
                        key={j}
                        className="absolute w-1 h-1 rounded-full bg-white/40"
                        style={{
                          left: `${20 + j * 15}%`,
                          bottom: `${20 + j * 8}%`,
                        }}
                        animate={{ y: [0, -8, 0], opacity: [0.3, 0.8, 0.3] }}
                        transition={{
                          duration: 2 + j * 0.3,
                          repeat: Infinity,
                          delay: j * 0.4,
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute bottom-4 left-[calc(50%+10px)] w-1 h-20 bg-white/10 rounded-full" />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <p.icon className="w-5 h-5 text-beer-gold" />
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-beer-gold/20 text-beer-gold">
                  {p.tag}
                </span>
              </div>

              <p className="text-white/50 text-sm leading-relaxed mb-3">
                {p.desc}
              </p>
              <p className="text-xs text-white/30">{p.specs}</p>

              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-t ${p.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
