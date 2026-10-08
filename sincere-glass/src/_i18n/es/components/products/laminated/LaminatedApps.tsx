"use client";

import { useInView } from "@/lib/useInView";
const apps = [{
  name: "Acristalamiento Cenital",
  desc: "Claraboyas, marquesinas, atrios — los fragmentos permanecen unidos en caso de rotura",
  icon: "☀"
}, {
  name: "Ventanas para huracanes",
  desc: "Resiste los impactos de escombros arrastrados por el viento en zonas costeras de tormenta",
  icon: "🌪️"
}, {
  name: "Acristalamiento de seguridad",
  desc: "Mostradores bancarios, joyerías, edificios gubernamentales",
  icon: "🔒"
}, {
  name: "Pisos de Vidrio",
  desc: "La lámina intermedia SGP (SentryGlas Plus) mantiene la capacidad estructural tras la rotura",
  icon: "🏛️"
}, {
  name: "Vitrinas de Museo",
  desc: "El bloqueo del 99% de radiación UV protege obras de arte y artefactos",
  icon: "🏨"
}, {
  name: "Barreras Acústicas",
  desc: "Autopistas, aeropuertos, pantallas acústicas urbanas",
  icon: "🔇"
}, {
  name: "Automotive",
  desc: "Parabrisas y techos solares",
  icon: "🚗"
}];
export default function LaminatedApps() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.05
  });
  return <section className="py-20 md:py-28 bg-brand-lighter overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8" style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? "translateY(0)" : "translateY(16px)",
      transition: "all 600ms"
    }}>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Applications</h2>
      </div>

      {/* Horizontal scroll (different from grid in tempered/insulated) */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-6 md:px-12 pb-4" style={{
        minWidth: "max-content"
      }}>
          {apps.map((app, i) => <div key={app.name} className="w-52 md:w-60 flex-shrink-0 bg-white rounded-xl p-5 border border-brand-light hover:border-brand-accent/20 hover:shadow-sm transition-all duration-300" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(16px)",
          transition: "all 500ms",
          transitionDelay: 100 + i * 60 + "ms"
        }}>
              <span className="text-2xl">{app.icon}</span>
              <h3 className="mt-3 font-semibold text-brand-dark text-sm">{app.name}</h3>
              <p className="mt-1 text-xs text-brand-muted leading-relaxed">{app.desc}</p>
            </div>)}
        </div>
      </div>
    </section>;
}