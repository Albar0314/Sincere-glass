"use client";

import { useInView } from "@/lib/useInView";
const specs = [{
  label: "Configuration",
  value: "2-layer, multi-layer, jumbo"
}, {
  label: "Opciones de lámina intermedia",
  value: "PVB (standard), SGP (structural)"
}, {
  label: "Bloqueo UV",
  value: "> 99% ultraviolet radiation"
}, {
  label: "Aislamiento acústico",
  value: "1,000–2,000Hz effective range"
}, {
  label: "Tamaño Máximo de Panel",
  value: "3,000 × 15,000mm (autoclave)"
}, {
  label: "Standard",
  value: "GB 15763.3-2009"
}, {
  label: "Certification",
  value: "CCC (3C) Certified"
}];
export default function LaminatedSpecs() {
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
      }}>
          Especificaciones Técnicas
        </h2>
        {/* Alternating row table (different from card grid) */}
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