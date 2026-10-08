"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/lib/useInView";
export default function SeasonalPerformance() {
  const {
    ref,
    isInView
  } = useInView();
  const [isSummer, setIsSummer] = useState(true);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!isInView || paused) return;
    const t = setInterval(() => setIsSummer(prev => !prev), 4500);
    return () => clearInterval(t);
  }, [isInView, paused]);
  function select(val: boolean) {
    setIsSummer(val);
    setPaused(true);
    setTimeout(() => setPaused(false), 10000);
  }
  return <section className="py-20 md:py-28 bg-brand-dark" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-10" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
        transition: "all 600ms"
      }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">Rendimiento durante todo el año</h2>
          <p className="mt-4 text-white/60 text-base md:text-lg">El vidrio de baja emisividad (Low-E) actúa en ambas direcciones — manteniendo su edificio confortable en cada estación.</p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          <button onClick={() => select(true)} className={"px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 " + (isSummer ? "bg-orange-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/15")}>
            ☀️ Verano
          </button>
          <button onClick={() => select(false)} className={"px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 " + (!isSummer ? "bg-blue-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/15")}>
            ❄️ Invierno
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl min-h-[280px] flex items-center justify-center p-8 md:p-12">
          {isSummer ? <div key="summer" className="text-center animate-fade-up">
              <div className="text-5xl mb-4">☀️</div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white">Verano: El calor se queda afuera</h3>
              <p className="mt-3 text-white/50 max-w-lg mx-auto leading-relaxed">El recubrimiento de baja emisividad (Low-E) refleja la radiación infrarroja solar hacia el exterior, reduciendo la ganancia de calor solar hasta en un 70%. Los espacios interiores permanecen más frescos con menos aire acondicionado.</p>
              <div className="mt-6 flex justify-center gap-6">
                <div className="text-center"><span className="font-display text-2xl font-bold text-orange-400">70%</span><p className="text-xs text-white/40 mt-1">Calor rechazado</p></div>
                <div className="text-center"><span className="font-display text-2xl font-bold text-blue-300">75%</span><p className="text-xs text-white/40 mt-1">Luz transmitida</p></div>
              </div>
            </div> : <div key="winter" className="text-center animate-fade-up">
              <div className="text-5xl mb-4">❄️</div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white">Invierno: El calor se queda dentro</h3>
              <p className="mt-3 text-white/50 max-w-lg mx-auto leading-relaxed">El mismo recubrimiento refleja la energía calorífica interior de vuelta al ambiente, reduciendo la pérdida de calor a través de las ventanas. Se necesita menos energía para mantener temperaturas confortables.</p>
              <div className="mt-6 flex justify-center gap-6">
                <div className="text-center"><span className="font-display text-2xl font-bold text-brand-accent">85%</span><p className="text-xs text-white/40 mt-1">Calor retenido</p></div>
                <div className="text-center"><span className="font-display text-2xl font-bold text-blue-300">75%</span><p className="text-xs text-white/40 mt-1">Luz transmitida</p></div>
              </div>
            </div>}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <div className={"w-2 h-2 rounded-full transition-colors " + (isSummer ? "bg-orange-400" : "bg-white/20")} />
          <div className={"w-2 h-2 rounded-full transition-colors " + (!isSummer ? "bg-blue-400" : "bg-white/20")} />
        </div>
      </div>
    </section>;
}