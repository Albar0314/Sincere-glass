"use client";

import { useInView } from "@/lib/useInView";
const advantages = [{
  icon: '<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>',
  title: "Dos Fábricas Modernas",
  badge: "Cost-Effective",
  description: "20,000㎡ entre Wuhan y Honghu con líneas de producción completas, desde el corte hasta el ensamblaje final. La capacidad de doble fábrica mantiene los plazos de entrega reducidos."
}, {
  icon: '<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" /></svg>',
  title: "Gama Completa de Productos",
  badge: "One-Stop",
  description: "Vidrio templado, vidrio aislante, vidrio laminado, vidrio de baja emisividad (Low-E), vidrio esmaltado y vidrio con recubrimiento personalizado — todo producido internamente. Sin intermediarios, sin complicaciones de coordinación."
}, {
  icon: '<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>',
  title: "Calidad Certificada",
  badge: "Tranquilidad Total",
  description: "Todos los productos superan la certificación 3C obligatoria de China y la inspección técnica nacional. Cada lote es verificado antes del envío."
}, {
  icon: '<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>',
  title: "Capacidad para Vidrio de Gran Formato",
  badge: "Hard-to-Find",
  description: "El horno de templado procesa paneles de hasta 3m × 15m. Unidades de vidrio aislante y vidrio laminado de gran formato que la mayoría de las fábricas no puede producir."
}];
export default function WhyUs() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  return <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto transition-all duration-600 ease-out" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)"
      }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Por qué Fabricantes y Contratistas Eligen Sincere Glass
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {advantages.map((adv, i) => <div key={adv.title} className="relative p-6 rounded-lg border border-gray-100 hover:border-brand-secondary/20 hover:shadow-md transition-all duration-300" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(24px)",
          transitionProperty: "opacity, transform, border-color, box-shadow",
          transitionDuration: "600ms",
          transitionDelay: `${200 + i * 120}ms`
        }}>
              <span className="absolute -top-3 right-4 px-2.5 py-0.5 bg-brand-accent/10 text-brand-accent text-xs font-semibold rounded-full border border-brand-accent/20">
                {adv.badge}
              </span>
              <div className="w-12 h-12 rounded-lg bg-brand-light flex items-center justify-center text-brand-secondary" dangerouslySetInnerHTML={{
            __html: adv.icon
          }} />
              <h3 className="mt-5 font-display text-lg font-semibold text-brand-dark">{adv.title}</h3>
              <p className="mt-2 text-sm text-brand-muted leading-relaxed">{adv.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
}