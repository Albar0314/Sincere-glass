"use client";

import { useInView } from "@/lib/useInView";
export default function WhatIsLowE() {
  const {
    ref,
    isInView
  } = useInView();
  return <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12" style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? "translateY(0)" : "translateY(24px)",
      transition: "all 700ms"
    }}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">¿Qué es el vidrio de baja emisividad (Low-E)?</h2>
        <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg">
          <p><strong className="text-brand-dark font-medium">Low-E</strong> significa <strong className="text-brand-dark font-medium">baja emisividad</strong>. La emisividad es una medida de cuánto calor infrarrojo irradia una superficie. El vidrio sin recubrimiento tiene una emisividad de aproximadamente 0,84, lo que significa que irradia el 84% de la energía calorífica absorbida.</p>
          <p>Un recubrimiento de baja emisividad (Low-E) — una capa microscópicamente delgada de óxido metálico — reduce esa emisividad a tan solo <strong className="text-brand-dark font-medium">0.05–0.15</strong>. La superficie con recubrimiento refleja la radiación infrarroja en lugar de transmitirla, permitiendo aun así el paso de <strong className="text-brand-dark font-medium">60–80% de la luz visible</strong> a través del vidrio.</p>
          <p>En la práctica: los edificios con acristalamiento de vidrio de baja emisividad (Low-E) se mantienen más frescos en verano (el calor se refleja hacia el exterior) y más cálidos en invierno (el calor interior se refleja hacia adentro). Son habituales ahorros energéticos de <strong className="text-brand-dark font-medium">30–50%</strong> en costes de climatización.</p>
        </div>
      </div>
    </section>;
}