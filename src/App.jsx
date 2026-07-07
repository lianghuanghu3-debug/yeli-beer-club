import { useState, useCallback, useRef } from "react";
import ParticleEngine, { directionRef } from "./ParticleEngine";
import HeroPage from "./pages/HeroPage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import MenuPage from "./pages/MenuPage";
import ContactPage from "./pages/ContactPage";

const TOTAL_PAGES = 5;

export default function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const touchStartY = useRef(0);
  const mouseRef = useRef(null);

  const goToPage = useCallback((newIndex) => {
    if (newIndex < 0 || newIndex >= TOTAL_PAGES) return;
    if (transitioning) return;
    setTransitioning(true);
    directionRef.current = newIndex > pageIndex ? "down" : "up";
    setPageIndex(newIndex);
    setTimeout(() => setTransitioning(false), 800);
  }, [pageIndex, transitioning]);

  const handleWheel = useCallback((e, pageIdx) => {
    if (pageIdx !== pageIndex) return;
    if (transitioning) return;
    const delta = e.deltaY;
    if (Math.abs(delta) < 30) return;
    if (delta > 0) goToPage(pageIdx + 1);
    else goToPage(pageIdx - 1);
  }, [pageIndex, transitioning, goToPage]);

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) < 50 || transitioning) return;
    if (delta > 0) goToPage(pageIndex + 1);
    else goToPage(pageIndex - 1);
  }, [pageIndex, transitioning, goToPage]);

  return (
    <main
      ref={mouseRef}
      className="relative w-screen h-screen overflow-hidden bg-[#040a04]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ transform: `translateY(-${pageIndex * 100}vh)` }}
      >
        <HeroPage active={pageIndex === 0 && !transitioning} onWheel={handleWheel} />
        <AboutPage active={pageIndex === 1 && !transitioning} onWheel={handleWheel} />
        <ProductsPage active={pageIndex === 2 && !transitioning} onWheel={handleWheel} />
        <MenuPage active={pageIndex === 3 && !transitioning} onWheel={handleWheel} />
        <ContactPage active={pageIndex === 4 && !transitioning} onWheel={handleWheel} />
      </div>

      <ParticleEngine pageIndex={pageIndex} direction={directionRef.current} mouseRef={mouseRef} />

      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {[...Array(TOTAL_PAGES)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              i === pageIndex ? "bg-amber-400/60 scale-150" : "bg-white/10 hover:bg-white/20"
            }`}
          />
        ))}
      </div>
    </main>
  );
}
