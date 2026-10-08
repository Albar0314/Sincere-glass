"use client";

import { useInView } from "@/lib/useInView";
import { useQuote } from "@/lib/QuoteContext";
export default function TemperedCTA() {
  const {
    ref,
    isInView
  } = useInView();
  const {
    openQuote
  } = useQuote();
  return <section className="py-20 md:py-28 bg-brand-dark" ref={ref}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center" style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? "translateY(0)" : "translateY(24px)",
      transition: "all 700ms"
    }}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">¿Necesita vidrio templado para su proyecto?</h2>
        <p className="mt-4 text-white/60 text-lg leading-relaxed">
          Indíquenos sus especificaciones — espesor, tamaño, cantidad, tratamiento de bordes, plano o curvado. Nuestro equipo responde en 24 horas.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => openQuote("tempered")} className="px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors">
            Obtener Cotización Gratuita
          </button>
          <a href="mailto:xcglass@sina.cn" className="px-7 py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors">
            Escríbanos Directamente
          </a>
        </div>
      </div>
    </section>;
}