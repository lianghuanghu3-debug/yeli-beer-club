import { Suspense } from "react";
import Experience from "./scene/Experience";
import Overlay from "./ui/Overlay";

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 rounded-full border border-white/10 animate-pulse" />
        <p className="text-white/20 text-xs tracking-[0.5em]">LOADING</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <main className="w-screen h-screen bg-black overflow-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <Experience />
      </Suspense>
      <Overlay />
    </main>
  );
}
