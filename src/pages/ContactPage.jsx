import { useRef, useEffect } from "react";

export default function ContactPage({ active, onWheel }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => onWheel(e, 4);
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [onWheel]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center bg-gradient-to-b from-[#060f06] via-[#040a04] to-[#020502] overflow-hidden py-10"
    >
      {/* Tree silhouette at edges */}
      <div className="absolute left-0 top-0 bottom-0 w-[20vw] pointer-events-none opacity-[0.03]">
        <div className="absolute bottom-0 left-4 w-[8vw] h-[60vh] bg-[#152010] rounded-t-lg" />
        <div className="absolute bottom-0 left-[20%] w-[5vw] h-[45vh] bg-[#152010] rounded-t-lg" />
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-[20vw] pointer-events-none opacity-[0.03]">
        <div className="absolute bottom-0 right-4 w-[6vw] h-[55vh] bg-[#152010] rounded-t-lg" />
      </div>

      {/* Grass bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[20vh] pointer-events-none opacity-[0.04]">
        {[...Array(80)].map((_, i) => (
          <div key={i} className="absolute bottom-0 w-px bg-[#4a8c5a]"
            style={{
              left: `${(i / 80) * 100}%`,
              height: `${15 + Math.random() * 60}px`,
              transform: `rotate(${(Math.random() - 0.5) * 15}deg)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
        <div className={`transition-all duration-1000 delay-200 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-amber-400/30 text-xs tracking-[0.5em] font-light">
              CONTACT · 联系我们
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[0.05em] text-white mt-4 mb-2">
              期待与您野里相聚
            </h2>
          </div>

          {/* Contact grid */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Left: main contact */}
            <div className="space-y-8">
              <div>
                <div className="text-white/20 text-[10px] tracking-[0.3em] mb-2">咨询热线</div>
                <div className="text-white/80 text-2xl md:text-3xl font-semibold tracking-wider">17789888188</div>
              </div>
              <div>
                <div className="text-white/20 text-[10px] tracking-[0.3em] mb-2">电子邮箱</div>
                <div className="text-white/50 text-base tracking-wide">952169931@qq.com</div>
              </div>
              <div>
                <div className="text-white/20 text-[10px] tracking-[0.3em] mb-2">公司地址</div>
                <div className="text-white/50 text-base tracking-wide">海南省海口市秀英区永万路108号</div>
                <div className="text-white/20 text-sm mt-1">展兴高新花园旁</div>
              </div>
            </div>

            {/* Right: social */}
            <div className="space-y-8">
              <div>
                <div className="text-white/20 text-[10px] tracking-[0.3em] mb-4">关注我们</div>
                <div className="space-y-4">
                  {[
                    { label: "微信号", value: "L-H-rain-Apr7" },
                    { label: "抖音", value: "野里扎啤俱乐部" },
                    { label: "小红书", value: "野里扎啤娱乐部" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400/20" />
                      <span className="text-white/15 text-sm w-16 font-light">{s.label}</span>
                      <span className="text-white/35 text-sm font-light">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-white/[0.04] text-center">
            <p className="text-white/10 text-xs tracking-[0.3em] font-light">
              © 2025 野里扎啤俱乐部 · 野里相聚 · 扎啤相伴
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
