"use client";

import { useInView } from "@/lib/useInView";
const highlights = [{
  num: "99%",
  label: "UV bloqueado",
  desc: "Protege los acabados interiores contra la decoloración"
}, {
  num: "5×",
  label: "Resistencia al desgarro SGP (SentryGlas Plus)",
  desc: "vs lámina intermedia estándar de PVB (polivinil butiral)"
}, {
  num: "35–45",
  label: "dB de reducción acústica",
  desc: "Efectivo entre 1000–2000 Hz"
}];
export default function WhatIsLaminated() {
  const {
    ref,
    isInView
  } = useInView();
  return <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center" style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? "translateY(0)" : "translateY(24px)",
      transition: "all 700ms"
    }}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">¿Qué es el vidrio laminado?</h2>
        <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg text-left md:text-center">
          <p>El vidrio laminado une dos o más hojas mediante una resistente lámina intermedia de plástico, generalmente <strong className="text-brand-dark font-medium">PVB</strong> (polivinil butiral) o <strong className="text-brand-dark font-medium">SGP</strong> (SGP (SentryGlas Plus)). Cuando un impacto rompe el vidrio, la lámina intermedia mantiene cada fragmento en su lugar.</p>
          <p>Este comportamiento de "permanencia en el marco" es lo que convierte al vidrio laminado en la opción predilecta para acristalamientos en altura, zonas de huracanes, aplicaciones de seguridad y cualquier entorno donde la caída de fragmentos pudiera poner en peligro a las personas.</p>
        </div>
      </div>

      {/* 3-column highlight cards */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {highlights.map((h, i) => <div key={h.label} className="bg-white rounded-xl p-6 text-center border border-brand-light" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(16px)",
          transition: "all 500ms",
          transitionDelay: 300 + i * 120 + "ms"
        }}>
              <span className="font-display text-3xl md:text-4xl font-bold text-brand-accent">{h.num}</span>
              <p className="text-sm font-medium text-brand-dark mt-1">{h.label}</p>
              <p className="text-xs text-brand-muted mt-1">{h.desc}</p>
            </div>)}
        </div>
      </div>
    </section>;
}