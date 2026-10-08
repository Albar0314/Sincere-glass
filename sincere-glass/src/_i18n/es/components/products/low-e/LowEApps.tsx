"use client";

import { useInView } from "@/lib/useInView";
const apps = [{
  name: "Torres de oficinas",
  desc: "Reduzca los costos de climatización en grandes fachadas acristaladas"
}, {
  name: "Ventanas residenciales",
  desc: "Confort durante todo el año con menores facturas energéticas"
}, {
  name: "Muros cortina",
  desc: "Fachadas de alto rendimiento con máxima luminosidad"
}, {
  name: "Skylights",
  desc: "Reduzca la ganancia de calor solar por la parte superior"
}, {
  name: "Casa pasiva",
  desc: "Cumple con estrictos estándares de eficiencia energética"
}, {
  name: "Certificaciones Ecológicas",
  desc: "LEED, BREEAM y códigos energéticos locales"
}];
export default function LowEApps() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  return <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-10 text-center" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
        transition: "all 600ms"
      }}>Applications</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {apps.map((a, i) => <div key={a.name} className="bg-white rounded-xl p-5 border border-brand-light hover:border-brand-accent/20 hover:shadow-sm transition-all duration-300 text-center" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(12px)",
          transition: "all 500ms",
          transitionDelay: 150 + i * 60 + "ms"
        }}>
              <h3 className="font-semibold text-brand-dark text-sm">{a.name}</h3>
              <p className="mt-1 text-xs text-brand-muted">{a.desc}</p>
            </div>)}
        </div>
      </div>
    </section>;
}