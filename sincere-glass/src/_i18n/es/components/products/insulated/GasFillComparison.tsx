"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/lib/useInView";
const fills = [{
  name: "Relleno de Aire",
  tag: "Standard",
  thermal: "Good",
  uValue: "~2.8 W/m²K",
  cost: "Base cost",
  best: "Budget-conscious projects, mild climates",
  detail: "Las UVA (Unidad de Vidrio Aislante) estándar rellenas de aire ofrecen una mejora de aislamiento significativa respecto al acristalamiento simple. Adecuadas para proyectos donde el rendimiento térmico es importante, pero no el factor principal.",
  color: "bg-brand-secondary/10 border-brand-secondary/20"
}, {
  name: "Relleno de Argón",
  tag: "Recommended",
  thermal: "Excellent",
  uValue: "~2.3 W/m²K",
  cost: "+5–10%",
  best: "Commercial buildings, energy-rated projects",
  detail: "El argón es un 34% menos conductor que el aire. Nuestra línea de llenado automatizada garantiza tasas de llenado consistentes superiores al 90%. La opción más popular para proyectos comerciales modernos y residenciales de alta gama.",
  color: "bg-brand-accent/10 border-brand-accent/20"
}];
export default function GasFillComparison() {
  const {
    ref,
    isInView
  } = useInView();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!isInView || paused) return;
    const t = setInterval(() => setActive(prev => (prev + 1) % fills.length), 4500);
    return () => clearInterval(t);
  }, [isInView, paused]);
  function select(i: number) {
    setActive(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  }
  return <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
        transition: "all 600ms"
      }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Opciones de Relleno de Gas</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">El gas entre las hojas marca una diferencia medible en el rendimiento térmico.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fills.map((fill, i) => <button key={fill.name} onClick={() => select(i)} className={"text-left p-6 rounded-xl border-2 transition-all duration-300 " + (active === i ? fill.color + " shadow-md" : "border-brand-light bg-brand-lighter hover:border-brand-secondary/20")} style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(16px)",
          transition: "all 500ms",
          transitionDelay: 200 + i * 120 + "ms"
        }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-lg font-bold text-brand-dark">{fill.name}</h3>
                <span className={"text-xs font-bold px-2.5 py-1 rounded-full " + (i === 1 ? "bg-brand-accent/20 text-brand-accent" : "bg-brand-secondary/10 text-brand-secondary")}>{fill.tag}</span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-4">
                <div><span className="text-brand-muted">Térmico:</span> <span className="text-brand-dark font-medium">{fill.thermal}</span></div>
                <div><span className="text-brand-muted">Valor U:</span> <span className="text-brand-dark font-medium">{fill.uValue}</span></div>
                <div><span className="text-brand-muted">Costo:</span> <span className="text-brand-dark font-medium">{fill.cost}</span></div>
                <div><span className="text-brand-muted">Ideal para:</span> <span className="text-brand-dark font-medium">{fill.best}</span></div>
              </div>
              <p className={"text-sm leading-relaxed transition-all duration-300 " + (active === i ? "text-brand-muted max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden")}>{fill.detail}</p>
            </button>)}
        </div>
      </div>
    </section>;
}