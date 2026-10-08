"use client";

import { useInView } from "@/lib/useInView";
export default function WhatIsEnamel() {
  const {
    ref,
    isInView
  } = useInView();
  return <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10 items-start">
          <div style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(24px)",
          transition: "all 700ms"
        }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">¿Qué Es el Vidrio Esmaltado?</h2>
            <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg">
              <p>El vidrio esmaltado — también llamado <strong className="text-brand-dark font-medium">vidrio con frita cerámica</strong> — se produce serigrafíando esmalte cerámico inorgánico sobre la superficie del vidrio y fundiéndolo permanentemente a la temperatura de templado (aproximadamente 620 °C).</p>
              <p>El resultado es una superficie decorativa que es <strong className="text-brand-dark font-medium">resistente a la abrasión, resistente a los ácidos, resistente a los álcalis</strong>, y que nunca se desvanece, descascara ni cambia de color, incluso tras décadas de exposición solar. El esmalte pasa a formar parte del propio vidrio.</p>
              <p>Más allá de la estética, la capa de esmalte absorbe y refleja la energía solar, aportando <strong className="text-brand-dark font-medium">sombreado y ahorro energético mensurables</strong>. En sistemas de muro cortina, los paneles spandrel esmaltados ocultan los forjados y los elementos estructurales, al tiempo que contribuyen al comportamiento térmico del edificio.</p>
            </div>
          </div>
          {/* Decorative color strip (RIGHT on desktop) */}
          <div className="hidden md:flex flex-col gap-2 pt-16" style={{
          opacity: isInView ? 1 : 0,
          transition: "opacity 600ms 400ms"
        }}>
            {["#D94040", "#E88C30", "#DAA745", "#4CAF50", "#2196F3", "#3F51B5", "#1C1F26", "#F5F5F5"].map((c, i) => <div key={c} className="h-6 rounded-md shadow-sm transition-all duration-300 hover:scale-x-110 origin-left" style={{
            backgroundColor: c,
            transitionDelay: i * 60 + "ms"
          }} />)}
          </div>
        </div>
      </div>
    </section>;
}