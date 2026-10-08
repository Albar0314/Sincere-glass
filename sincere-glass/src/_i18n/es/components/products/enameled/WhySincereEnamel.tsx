"use client";

import { useInView } from "@/lib/useInView";
import InlineQuoteCTA from "@/_i18n/es/components/products/InlineQuoteCTA";
const advantages = [{
  icon: "🎨",
  title: "Cualquier Color que Necesite",
  desc: "Correspondencia total con RAL y Pantone. Formulamos y probamos colores personalizados antes de la producción. Su marca, su edificio, su tono exacto."
}, {
  icon: "⚙️",
  title: "Producción Integrada",
  desc: "El corte, la serigrafía, el templado y los ensayos de calidad se realizan bajo un mismo techo. Sin demoras por subcontratación ni riesgos en la transferencia de calidad."
}, {
  icon: "📏",
  title: "Paneles de Gran Formato",
  desc: "Nuestras líneas de esmaltado y templado procesan paneles de hasta 3m × 15m — reduciendo juntas y creando fachadas más limpias en proyectos de gran escala."
}, {
  icon: "📄",
  title: "Certificación Completa",
  desc: "Con certificación 3C y reportes de ensayo completos. El esmalte cumple la norma GB 15763.2-2005 para vidrio de seguridad — su proyecto supera la inspección a la primera."
}];
export default function WhySincereEnamel() {
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
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">¿Por Qué Adquirir Vidrio Esmaltado con Nosotros?</h2>
        </div>

        {/* Horizontal scrolling cards on all viewports (unique layout) */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 md:mx-0 md:px-0">
          {advantages.map((a, i) => <div key={a.title} className="flex-shrink-0 w-64 md:w-72 bg-white rounded-xl p-6 border border-brand-light hover:border-brand-accent/20 hover:shadow-md transition-all duration-300" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 500ms",
          transitionDelay: 200 + i * 100 + "ms"
        }}>
              <span className="text-3xl">{a.icon}</span>
              <h3 className="mt-4 font-display font-bold text-brand-dark">{a.title}</h3>
              <p className="mt-2 text-sm text-brand-muted leading-relaxed">{a.desc}</p>
            </div>)}
        </div>

        <div className="mt-8">
          <InlineQuoteCTA text="Send us your color code and design — we will produce a sample for approval." product="enameled" />
        </div>
      </div>
    </section>;
}