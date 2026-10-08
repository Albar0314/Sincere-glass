"use client";

import { useInView } from "@/lib/useInView";
const specs = [{
  label: "Tipos de recubrimiento",
  value: "Soft-coat (sputtered), Hard-coat (pyrolytic)"
}, {
  label: "Emissivity",
  value: "0.05 – 0.15 (vs 0.84 uncoated)"
}, {
  label: "Transmitancia visible",
  value: "60% – 80%"
}, {
  label: "Coeficiente de Ganancia de Calor Solar",
  value: "0.22 – 0.49"
}, {
  label: "Bloqueo UV",
  value: "75% – 95%"
}, {
  label: "Valor U (en UVA)",
  value: "1.4 – 2.3 W/m²K"
}, {
  label: "Standard",
  value: "GB/T 18915-2013"
}, {
  label: "Certification",
  value: "CCC (3C) Certified"
}];
export default function LowESpecs() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  return <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight mb-10" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
        transition: "all 600ms"
      }}>Especificaciones Técnicas</h2>
        <div className="overflow-hidden rounded-xl border border-brand-light">
          {specs.map((s, i) => <div key={s.label} className={"flex justify-between items-center px-6 py-4 " + (i % 2 === 0 ? "bg-brand-lighter" : "bg-white")} style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(8px)",
          transition: "all 400ms",
          transitionDelay: 100 + i * 50 + "ms"
        }}>
              <span className="text-sm font-medium text-brand-dark">{s.label}</span>
              <span className="text-sm text-brand-accent font-medium text-right">{s.value}</span>
            </div>)}
        </div>
      </div>
    </section>;
}