import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Factory, Users, Leaf } from "lucide-react";

const stats = [
  { icon: Award, value: "鲜扎啤", label: "匠心酿造" },
  { icon: Factory, value: "海口", label: "秀英直供" },
  { icon: Users, value: "聚会", label: "首选之地" },
  { icon: Leaf, value: "100%", label: "优质原料" },
];

function StatCard({ icon: Icon, value, label, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-beer-gold/20 transition-all group"
    >
      <Icon className="w-8 h-8 text-beer-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-white/50">{label}</div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-beer-gold text-xs tracking-[0.3em] uppercase">
            关于我们
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6">
            野里相聚，扎啤相伴
          </h2>
          <p className="text-white/50 max-w-3xl mx-auto text-lg leading-relaxed">
            野里扎啤俱乐部坐落于海南省海口市秀英区永万路108号，展兴高新花园旁。
            我们坚持鲜扎啤直供，精选优质麦芽与啤酒花，以匠心工艺确保每一杯都拥有醇厚口感
            与绵密泡沫，为海口的朋友们带来极致的鲜啤体验。
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "鲜啤直供",
              desc: "从酿造到上桌全程冷链锁鲜，确保每一杯扎啤都在最佳赏味期内，鲜爽直达你的味蕾。",
            },
            {
              title: "聚会首选",
              desc: "宽敞舒适的环境，丰富的扎啤品类，是朋友聚会、公司团建、生日派对的理想去处。",
            },
            {
              title: "品质严选",
              desc: "精选进口麦芽与啤酒花，严格控制酿造温度与时间，只为呈现最纯正的鲜扎啤风味。",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="p-8 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-beer-gold/10 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-beer-gold/10 flex items-center justify-center mb-5">
                <span className="text-beer-gold font-bold text-lg">{i + 1}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-white/50 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
