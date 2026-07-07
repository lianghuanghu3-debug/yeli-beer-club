import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-beer-gold text-xs tracking-[0.3em] uppercase">
            联系我们
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6">
            期待与您相聚
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            无论您是个人品鉴、朋友聚会还是商务合作，欢迎随时联系我们
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              {
                icon: Phone,
                label: "咨询热线",
                value: "17789888188",
                sub: "欢迎来电咨询，随时为您服务",
              },
              {
                icon: Mail,
                label: "电子邮箱",
                value: "952169931@qq.com",
                sub: "我们将在 24 小时内回复",
              },
              {
                icon: MapPin,
                label: "公司地址",
                value: "海南省海口市秀英区永万路108号",
                sub: "展兴高新花园旁",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-beer-gold/10 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-beer-gold/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-beer-gold" />
                </div>
                <div>
                  <div className="text-xs text-beer-gold uppercase tracking-wider mb-1">
                    {item.label}
                  </div>
                  <div className="text-lg font-semibold mb-1">{item.value}</div>
                  <div className="text-sm text-white/40">{item.sub}</div>
                </div>
              </motion.div>
            ))}

            {/* Social media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
            >
              <div className="text-xs text-beer-gold uppercase tracking-wider mb-4">
                关注我们
              </div>
              <div className="flex flex-col gap-3 text-sm text-white/60">
                <div>微信号：L-H-rain-Apr7</div>
                <div>抖音：野里扎啤俱乐部</div>
                <div>小红书：野里扎啤娱乐部</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm space-y-5"
          >
            <div>
              <label className="block text-sm text-white/60 mb-2">您的称呼</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="请输入姓名"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-beer-gold/50 outline-none transition-colors text-white placeholder:text-white/20"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">联系电话</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="请输入手机号码"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-beer-gold/50 outline-none transition-colors text-white placeholder:text-white/20"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">留言内容</label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="请描述您的需求，如订座、活动、合作等"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-beer-gold/50 outline-none transition-colors text-white placeholder:text-white/20 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitted}
              className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                submitted
                  ? "bg-green-600 text-white"
                  : "bg-beer-gold text-black hover:bg-beer-amber hover:scale-[1.02] shadow-lg shadow-beer-gold/20"
              }`}
            >
              {submitted ? (
                <>
                  <CheckCircle className="w-5 h-5" /> 提交成功
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> 提交留言
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
