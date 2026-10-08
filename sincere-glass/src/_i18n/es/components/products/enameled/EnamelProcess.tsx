"use client";

import { useInView } from "@/lib/useInView";
const steps = [{
  num: "1",
  title: "Corte de vidrio",
  desc: "Cortado al tamaño final — no puede modificarse tras el esmaltado"
}, {
  num: "2",
  title: "Serigrafía",
  desc: "Esmalte cerámico aplicado mediante serigrafía en el patrón seleccionado"
}, {
  num: "3",
  title: "Drying",
  desc: "El vidrio impreso se seca para eliminar los solventes del esmalte"
}, {
  num: "4",
  title: "Templado / Semitemplado",
  desc: "Calentado a ~620 °C, fusionando permanentemente el esmalte al vidrio"
}, {
  num: "5",
  title: "Inspección de calidad",
  desc: "Verificación de precisión de color, uniformidad de cobertura y resistencia"
}];
export default function EnamelProcess() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  return <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
        transition: "all 600ms"
      }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Cómo se fabrica el vidrio esmaltado</h2>
        </div>

        {/* Horizontal timeline on desktop, vertical on mobile */}
        <div className="hidden md:flex items-start justify-between relative">
          {/* Connecting line */}
          <div className="absolute top-5 left-[10%] right-[10%] h-px bg-brand-light" />

          {steps.map((s, i) => <div key={s.num} className="flex flex-col items-center text-center flex-1 relative" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(16px)",
          transition: "all 500ms",
          transitionDelay: 200 + i * 120 + "ms"
        }}>
              <div className="w-10 h-10 rounded-full bg-brand-accent/10 border-2 border-brand-accent text-brand-accent font-bold text-sm flex items-center justify-center relative z-10 bg-white">
                {s.num}
              </div>
              <h3 className="mt-3 font-semibold text-brand-dark text-sm px-2">{s.title}</h3>
              <p className="mt-1 text-xs text-brand-muted px-2 leading-relaxed">{s.desc}</p>
            </div>)}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-4">
          {steps.map((s, i) => <div key={s.num} className="flex gap-4 items-start" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateX(0)" : "translateX(-12px)",
          transition: "all 500ms",
          transitionDelay: 200 + i * 80 + "ms"
        }}>
              <div className="w-8 h-8 rounded-full bg-brand-accent/10 border-2 border-brand-accent text-brand-accent font-bold text-xs flex items-center justify-center flex-shrink-0">{s.num}</div>
              <div>
                <h3 className="font-semibold text-brand-dark text-sm">{s.title}</h3>
                <p className="text-xs text-brand-muted mt-0.5">{s.desc}</p>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}