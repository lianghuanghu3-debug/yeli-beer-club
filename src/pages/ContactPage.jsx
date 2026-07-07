import { useRef, useEffect } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage({ active, onWheel }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => onWheel(e, 3);
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [onWheel]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center bg-gradient-to-b from-[#0a1208] via-[#080f06] to-[#060c04] overflow-hidden py-16"
    >
      {/* Grass at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[20vh] pointer-events-none opacity-[0.04]">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-px bg-[#4a8c5a]"
            style={{
              left: `${(i / 60) * 100}%`,
              height: `${20 + Math.random() * 80}px`,
              transform: `rotate(${(Math.random() - 0.5) * 20}deg)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 w-full">
        <div className={`transition-all duration-1000 delay-200 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-amber-400/50 text-xs tracking-[0.4em] font-light">CONTACT</span>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.1em] text-white/85 mt-4 mb-3">
            期待与您
          </h2>
          <p className="text-white/25 text-sm tracking-[0.2em] font-light mb-12">
            野里相聚
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="space-y-6">
              {[
                { icon: Phone, label: "咨询热线", value: "17789888188" },
                { icon: Mail, label: "电子邮箱", value: "952169931@qq.com" },
                { icon: MapPin, label: "公司地址", value: "海南省海口市秀英区永万路108号", sub: "展兴高新花园旁" },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-amber-400/40" />
                  </div>
                  <div>
                    <div className="text-white/20 text-[10px] tracking-[0.2em] mb-1">{item.label}</div>
                    <div className="text-white/70 font-light tracking-wide">{item.value}</div>
                    {item.sub && <div className="text-white/20 text-xs mt-0.5">{item.sub}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="space-y-6">
              <div className={`transition-all duration-700 delay-300 ${active ? "opacity-100" : "opacity-0"}`}>
                <div className="text-white/20 text-[10px] tracking-[0.3em] mb-4">关注我们</div>
                <div className="space-y-4">
                  {[
                    { icon: MessageCircle, label: "微信号", value: "L-H-rain-Apr7" },
                    { icon: MessageCircle, label: "抖音", value: "野里扎啤俱乐部" },
                    { icon: MessageCircle, label: "小红书", value: "野里扎啤娱乐部" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3 text-white/30 text-sm font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400/20" />
                      <span className="text-white/15 w-16">{s.label}</span>
                      <span>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-8 border-t border-white/[0.04] text-white/10 text-[10px] tracking-wider font-light">
                © 2025 野里扎啤俱乐部
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
