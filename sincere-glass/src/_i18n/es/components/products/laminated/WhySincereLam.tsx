"use client";

import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";
const advantages = [{
  stat: 15,
  suffix: "m",
  label: "Longitud máxima de autoclave",
  desc: "Nuestros autoclaves de alta presión procesan paneles de hasta 3 m × 15 m — ideales para claraboyas de gran formato y paredes de diseño que los fabricantes más pequeños no pueden producir."
}, {
  stat: 2,
  suffix: "",
  label: "Unidades de autoclave",
  desc: "Los dos autoclaves nos permiten procesar trabajos estándar y de gran formato de forma simultánea. Sin cuellos de botella, plazos de entrega consistentes incluso en temporada alta."
}, {
  stat: 25,
  suffix: "%",
  label: "Por debajo de los precios de las empresas comercializadoras",
  desc: "Realizamos el laminado internamente desde materias primas. Sin subcontratación, sin cadena de márgenes. Usted obtiene precios de fabricante en cada panel."
}, {
  stat: 100,
  suffix: "%",
  label: "Producción con certificación 3C",
  desc: "Documentación completa por cada lote: certificados 3C, informes de ensayo, cartas de conformidad. Su proyecto supera la inspección a la primera."
}];
function Stat({
  s,
  active,
  i
}: {
  s: typeof advantages[0];
  active: boolean;
  i: number;
}) {
  const count = useCountUp(s.stat, active);
  return <div className="flex gap-5 items-start p-5 rounded-xl bg-brand-lighter border border-brand-light hover:border-brand-accent/20 hover:shadow-sm transition-all duration-300" style={{
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(20px)",
    transition: "all 600ms",
    transitionDelay: 200 + i * 120 + "ms"
  }}>
      <div className="flex-shrink-0 w-16 text-right">
        <span className="font-display text-3xl font-bold text-brand-accent tabular-nums">{count}</span>
        <span className="font-display text-lg font-bold text-brand-accent">{s.suffix}</span>
      </div>
      <div>
        <h3 className="font-semibold text-brand-dark text-sm">{s.label}</h3>
        <p className="mt-1 text-xs text-brand-muted leading-relaxed">{s.desc}</p>
      </div>
    </div>;
}
export default function WhySincereLam() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  return <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
        transition: "all 600ms"
      }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">¿Por qué adquirir vidrio laminado con nosotros?</h2>
        </div>
        {/* Single column stacked (different from 2-col grid in tempered/insulated) */}
        <div className="space-y-4">
          {advantages.map((s, i) => <Stat key={s.label} s={s} active={isInView} i={i} />)}
        </div>
      </div>
    </section>;
}