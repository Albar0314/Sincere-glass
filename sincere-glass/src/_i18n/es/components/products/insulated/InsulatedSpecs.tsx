"use client";

import { useInView } from "@/lib/useInView";
const specs = [{
  label: "Opciones de Perfil Separador",
  value: "6, 9, 12, 15, 20mm",
  detail: "Perfiles separadores de aluminio o de borde cálido"
}, {
  label: "Opciones de Vidrio",
  value: "Clear, Low-E, tinted, reflective",
  detail: "Cualquier combinación de tipos de hoja"
}, {
  label: "Relleno de Gas",
  value: "Air or Argon",
  detail: "Línea de llenado de argón automatizada (tasa de llenado superior al 90%)"
}, {
  label: "Tipo de Sello",
  value: "Dual seal (PIB + silicone)",
  detail: "Sello primario de retención de gas + sello secundario estructural"
}, {
  label: "Resistencia al Viento",
  value: "1.5× single pane",
  detail: "Según ensayos GB/T 11944-2012"
}, {
  label: "Rango de Valor U",
  value: "1.4 – 2.8 W/m²K",
  detail: "Depende de la configuración y el recubrimiento"
}, {
  label: "Reducción Acústica",
  value: "Up to 35 dB",
  detail: "Mejora significativa en entornos urbanos"
}, {
  label: "Certification",
  value: "CCC (3C) Certified",
  detail: "Conforme a GB/T 11944-2012"
}];
export default function InsulatedSpecs() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  return <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-10" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
        transition: "all 600ms"
      }}>
          Especificaciones Técnicas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((s, i) => <div key={s.label} className="bg-brand-lighter rounded-xl p-5 border border-brand-light hover:border-brand-secondary/20 hover:shadow-sm transition-all duration-300" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(16px)",
          transition: "all 500ms",
          transitionDelay: 100 + i * 60 + "ms"
        }}>
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-brand-dark">{s.label}</span>
                <span className="text-sm font-semibold text-brand-accent text-right">{s.value}</span>
              </div>
              <p className="mt-1.5 text-xs text-brand-muted">{s.detail}</p>
            </div>)}
        </div>
      </div>
    </section>;
}