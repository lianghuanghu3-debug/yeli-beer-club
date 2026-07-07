import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Overlay() {
  const [loaded, setLoaded] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000);
    const t2 = setTimeout(() => setPhase(1), 5000);
    const t3 = setTimeout(() => setPhase(2), 9000);
    return () => {
      clearTimeout(timer);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      {/* Brand name - top center */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -10 }}
        transition={{ duration: 2, delay: 3, ease: "easeOut" }}
        className="absolute top-8 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-[0.5em] font-light"
      >
        YELI · BEER CLUB
      </motion.div>

      {/* Center title */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5 }}
            className="absolute bottom-24 left-8 md:left-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="text-white/90 text-4xl md:text-6xl lg:text-7xl font-extralight tracking-[0.15em] leading-none"
            >
              野里扎啤
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 2, delay: 1.2 }}
              className="text-white/50 text-xs md:text-sm tracking-[0.4em] mt-3 font-light"
            >
              野里相聚 · 扎啤相伴
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom subtle line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: loaded ? 1 : 0 }}
        transition={{ duration: 3, delay: 6, ease: "easeOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-px bg-white/10 origin-center"
      />

      {/* Side hint - contact */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute right-8 md:right-12 bottom-32 text-right"
          >
            <div className="text-white/30 text-[10px] tracking-[0.3em] font-light space-y-4">
              <div className="text-white/50 mb-2">CONTACT</div>
              <div>17789888188</div>
              <div>952169931@qq.com</div>
              <div className="pt-4 text-white/25">
                <div>微信 L-H-rain-Apr7</div>
                <div>抖音 野里扎啤俱乐部</div>
                <div>小红书 野里扎啤娱乐部</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
