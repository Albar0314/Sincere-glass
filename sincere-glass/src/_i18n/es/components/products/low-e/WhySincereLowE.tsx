"use client";

import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";
import InlineQuoteCTA from "@/_i18n/es/components/products/InlineQuoteCTA";
const advantages = [{
  stat: 50,
  suffix: "%",
  label: "Potencial de ahorro energético",
  desc: "Una UVA (Unidad de Vidrio Aislante) Low-E con relleno de argón puede reducir a la mitad los costes de climatización en comparación con el vidrio monolítico sin recubrimiento. Le ayudamos a especificar la combinación adecuada para su zona climática."
}, {
  stat: 2,
  suffix: "",
  label: "Opciones de recubrimiento disponibles",
  desc: "Vidrio de baja emisividad (Low-E) tanto en capa blanda (pulverización catódica al vacío) como en capa dura (recubrimiento pirolítico). Adaptamos el tipo de recubrimiento a los requisitos de su proyecto: rendimiento frente a versatilidad."
}, {
  stat: 15,
  suffix: "m",
  label: "Longitud máxima del panel de UVA (Unidad de Vidrio Aislante)",
  desc: "Recubrimiento de baja emisividad (Low-E) integrado en nuestra línea de producción de UVA (Unidad de Vidrio Aislante) de gran formato. Paneles de hasta 3m × 15m — menos juntas, fachadas más limpias."
}, {
  stat: 100,
  suffix: "%",
  label: "Producción integrada",
  desc: "Recubrimiento, corte, templado, ensamblaje de UVA (Unidad de Vidrio Aislante) y ensayos de calidad: todo ocurre en nuestras fábricas. Sin subcontratación — entrega más rápida y calidad uniforme."
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
  return <div className="p-5 rounded-xl bg-brand-lighter border border-brand-light hover:border-brand-accent/20 transition-all duration-300" style={{
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(20px)",
    transition: "all 600ms",
    transitionDelay: 200 + i * 120 + "ms"
  }}>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="font-display text-3xl font-bold text-brand-accent tabular-nums">{count}</span>
        <span className="font-display text-lg font-bold text-brand-accent">{s.suffix}</span>
      </div>
      <h3 className="font-semibold text-brand-dark text-sm">{s.label}</h3>
      <p className="mt-1.5 text-xs text-brand-muted leading-relaxed">{s.desc}</p>
    </div>;
}
export default function WhySincereLowE() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  return <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
        transition: "all 600ms"
      }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">¿Por qué adquirir vidrio de baja emisividad (Low-E) con nosotros?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {advantages.map((s, i) => <Stat key={s.label} s={s} active={isInView} i={i} />)}
        </div>
        <div className="mt-8"><InlineQuoteCTA text="Need help choosing the right Low-E configuration? Our team can recommend based on your climate and building orientation." product="low-e" /></div>
      </div>
    </section>;
}