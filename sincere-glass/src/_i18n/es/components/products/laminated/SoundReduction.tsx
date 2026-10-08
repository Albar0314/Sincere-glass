"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/lib/useInView";
const configs = [{
  label: "Hoja única (6 mm)",
  db: 28,
  desc: "Reducción acústica básica"
}, {
  label: "Laminado (PVB (polivinil butiral) de 6,4 mm)",
  db: 35,
  desc: "Eficaz en frecuencias de voz"
}, {
  label: "Vidrio laminado multicapa",
  db: 40,
  desc: "Reducción significativa del ruido urbano"
}, {
  label: "Laminado + aislante",
  db: 45,
  desc: "Máximo rendimiento acústico"
}];
export default function SoundReduction() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!isInView || paused) return;
    const t = setInterval(() => setActive(prev => (prev + 1) % configs.length), 3500);
    return () => clearInterval(t);
  }, [isInView, paused]);
  function select(i: number) {
    setActive(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  }
  return <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: noise meter visualization */}
          <div style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateX(0)" : "translateX(-20px)",
          transition: "all 700ms"
        }}>
            <div className="bg-brand-dark rounded-2xl p-6 md:p-8">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-6">Índice de reducción acústica</p>

              {/* Big number */}
              <div className="text-center mb-6">
                <span className="font-display text-6xl md:text-7xl font-bold text-brand-accent tabular-nums">{configs[active].db}</span>
                <span className="font-display text-2xl text-brand-accent ml-1">dB</span>
                <p className="text-sm text-white/50 mt-2">{configs[active].desc}</p>
              </div>

              {/* Meter bars */}
              <div className="flex items-end justify-center gap-1 h-16">
                {Array.from({
                length: 20
              }).map((_, i) => {
                const threshold = configs[active].db / 50 * 20;
                const isActive = i < threshold;
                return <div key={i} className={"w-2 rounded-t transition-all duration-300 " + (isActive ? i < 10 ? "bg-green-400" : i < 15 ? "bg-brand-accent" : "bg-red-400" : "bg-white/10")} style={{
                  height: 12 + i * 2.5 + "px",
                  transitionDelay: i * 30 + "ms"
                }} />;
              })}
              </div>
            </div>

            {/* Config selector */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {configs.map((c, i) => <button key={c.label} onClick={() => select(i)} className={"text-left p-3 rounded-lg border text-xs transition-all duration-200 " + (active === i ? "border-brand-accent bg-brand-accent/5 text-brand-dark font-medium" : "border-brand-light bg-white text-brand-muted hover:border-brand-secondary/30")}>
                  {c.label}
                </button>)}
            </div>
          </div>

          {/* Right: text */}
          <div style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateX(0)" : "translateX(20px)",
          transition: "all 700ms 150ms"
        }}>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
              Aislamiento Acústico Superior
            </h2>
            <div className="mt-6 space-y-4 text-brand-muted leading-relaxed">
              <p>El vidrio laminado es una de las soluciones de acristalamiento más eficaces para el control del ruido. La lámina intermedia de PVB (polivinil butiral) actúa como membrana de amortiguación acústica, absorbiendo la energía sonora que atravesaría un vidrio convencional.</p>
              <p>Es especialmente eficaz en el rango de <strong className="text-brand-dark font-medium">frecuencias de 1.000–2.000 Hz</strong> — las frecuencias del habla, el ruido del tráfico y los sonidos urbanos comunes que generan mayor perturbación.</p>
              <p>Para un máximo rendimiento acústico, combine el vidrio laminado con una unidad de vidrio aislante. La combinación de amortiguación por lámina intermedia y cámara de aire sellada ofrece la mayor reducción acústica disponible en acristalamiento arquitectónico.</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}