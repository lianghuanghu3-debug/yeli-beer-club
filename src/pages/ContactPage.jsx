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
      className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#1a2a18] via-[#0e1a0c] to-[#0a1408] overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center px-4 w-full overflow-y-auto py-8">
        <div className={`transition-all duration-1000 delay-200 max-w-2xl w-full text-center ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          
          <span className="text-amber-400/30 text-[10px] md:text-xs tracking-[0.5em] font-light">CONTACT · 联系我们</span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-[0.03em] text-white mt-4 mb-8 md:mb-10">
            期待与您野里相聚
          </h2>

          <div className="space-y-6 mb-10">
            <div>
              <div className="text-white/20 text-[10px] tracking-[0.3em] mb-1">咨询热线</div>
              <div className="text-white/80 text-2xl md:text-3xl font-semibold tracking-wider">17789888188</div>
            </div>
            <div>
              <div className="text-white/20 text-[10px] tracking-[0.3em] mb-1">电子邮箱</div>
              <div className="text-white/50 text-base tracking-wide">952169931@qq.com</div>
            </div>
            <div>
              <div className="text-white/20 text-[10px] tracking-[0.3em] mb-1">公司地址</div>
              <div className="text-white/50 text-base tracking-wide">海南省海口市秀英区永万路108号</div>
              <div className="text-white/20 text-sm">展兴高新花园旁</div>
            </div>
          </div>

          <div className="border-t border-white/[0.04] pt-6">
            <div className="text-white/15 text-[10px] tracking-[0.3em] mb-3">关注我们</div>
            <div className="flex items-center justify-center gap-6 text-white/35 text-xs font-light">
              <span>微信 L-H-rain-Apr7</span>
              <span className="text-white/10">|</span>
              <span>抖音 野里扎啤俱乐部</span>
              <span className="text-white/10">|</span>
              <span>小红书 野里扎啤娱乐部</span>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/[0.04]">
            <p className="text-white/10 text-[10px] tracking-[0.3em] font-light">
              © 2025 野里扎啤俱乐部 · 野里相聚 · 扎啤相伴
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
