import { Beer } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-beer-gold font-bold text-lg mb-4">
              <Beer className="w-6 h-6" />
              <span>野里扎啤俱乐部</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              坐落于海口市秀英区永万路108号，专注鲜扎啤酿造与直供。
              野里相聚，扎啤相伴，用心做好每一杯。
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">快速链接</h4>
            <div className="flex flex-col gap-2 text-sm text-white/40">
              <a href="#hero" className="hover:text-beer-gold transition-colors">首页</a>
              <a href="#about" className="hover:text-beer-gold transition-colors">关于我们</a>
              <a href="#products" className="hover:text-beer-gold transition-colors">产品系列</a>
              <a href="#contact" className="hover:text-beer-gold transition-colors">联系我们</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">关注我们</h4>
            <div className="flex flex-col gap-2 text-sm text-white/40">
              <span>微信号：L-H-rain-Apr7</span>
              <span>抖音：野里扎啤俱乐部</span>
              <span>小红书：野里扎啤娱乐部</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20">
          <span>© 2025 野里扎啤俱乐部 版权所有</span>
          <span>地址：海南省海口市秀英区永万路108号 展兴高新花园旁</span>
        </div>
      </div>
    </footer>
  );
}
