"use client";

import { useInView } from "@/lib/useInView";
export default function WhatIs() {
  const {
    ref,
    isInView
  } = useInView();
  return <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(24px)",
        transition: "all 700ms ease-out"
      }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            ¿Qué es el Vidrio Templado?
          </h2>
          <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg">
            <p>
              El vidrio templado — también denominado vidrio templado — es un tipo de <strong className="text-brand-dark font-medium">vidrio de seguridad</strong> producido mediante tratamiento térmico controlado. El vidrio flotado de alta calidad se calienta a aproximadamente 620°C (cerca de su punto de ablandamiento) y luego se enfría rápidamente mediante chorros de aire en un proceso denominado enfriamiento rápido.
            </p>
            <p>
              Esto genera un perfil de tensiones característico: <strong className="text-brand-dark font-medium">tensión de compresión</strong> en la superficie y <strong className="text-brand-dark font-medium">tensión de tracción</strong> en el núcleo. El equilibrio entre estas fuerzas opuestas es lo que confiere al vidrio templado su resistencia extraordinaria: de 4 a 5 veces superior a la del vidrio recocido ordinario del mismo espesor.
            </p>
            <p>
              Quizás lo más relevante es que, cuando el vidrio templado se rompe, se fragmenta en pequeños trozos granulares de bordes relativamente romos, en lugar de los fragmentos irregulares y cortantes propios del vidrio ordinario. Este patrón de fragmentación característico es la razón por la que el vidrio templado se clasifica como vidrio de seguridad según los códigos internacionales de construcción.
            </p>
          </div>
        </div>
      </div>
    </section>;
}