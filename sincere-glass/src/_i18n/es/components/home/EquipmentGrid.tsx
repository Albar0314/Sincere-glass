"use client";

import { useState } from "react";
import { useInView } from "@/lib/useInView";
const equipment = [{
  name: "Líneas de Corte Inteligentes",
  count: "4 lines",
  desc: "Corte de precisión controlado por CNC para vidrio plano de hasta tamaño jumbo. Software de carga automatizada y optimización para minimizar el desperdicio.",
  icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, {
  name: "Líneas de Pulido de Bordes",
  count: "4 lines",
  desc: "Máquinas de rectificado y pulido de doble canto para bordes rectos, biselados y OG. Trabaja con vidrio de 3 mm a 25 mm de espesor.",
  icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.764m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
}, {
  name: "Hornos de Templado",
  count: "2 furnaces",
  desc: "Templado plano y curvado. Tamaño máximo de panel 3m × 15m — una de las mayores capacidades en la provincia de Hubei.",
  icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.963-6.078A8.94 8.94 0 0012 3c-1.04 0-2.042.188-2.963.535"
}, {
  name: "Líneas de Vidrio Aislante",
  count: "2 lines",
  desc: "Incluye una línea de producción automatizada de gran formato con llenado de gas. Tecnología de perfil separador con doble sellado para un rendimiento duradero.",
  icon: "M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
}, {
  name: "Autoclaves de Laminado",
  count: "2 units",
  desc: "Autoclaves de alta presión para vidrio laminado con PVB (polivinil butiral) y SGP (SentryGlas Plus). Una unidad con capacidad de 3m × 15m para paneles arquitectónicos de gran formato.",
  icon: "M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313"
}, {
  name: "Esmaltado / Serigrafía",
  count: "Full line",
  desc: "Serigrafía con frita cerámica en colores y patrones personalizados. Integrada con el horno de templado para fusión permanente.",
  icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.764m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
}];
export default function EquipmentGrid() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto transition-all duration-600" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)"
      }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Equipamiento Avanzado, Producción Confiable
          </h2>
          <p className="mt-4 text-brand-muted text-lg">
            Capacidades de procesamiento completas en una sola planta — desde la hoja en bruto hasta el producto terminado.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment.map((eq, i) => {
          const isOpen = openIdx === i;
          return <button key={eq.name} onClick={() => setOpenIdx(isOpen ? null : i)} className={`text-left p-5 rounded-xl border transition-all duration-300 ${isOpen ? "bg-brand-dark border-brand-dark shadow-lg" : "bg-white border-brand-light hover:border-brand-secondary/30 hover:shadow-sm"}`} style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transitionDelay: `${150 + i * 80}ms`,
            transitionProperty: "opacity, transform, background-color, border-color, box-shadow"
          }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isOpen ? "bg-brand-accent/20" : "bg-brand-light"}`}>
                      <svg className={`w-5 h-5 ${isOpen ? "text-brand-accent" : "text-brand-primary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={eq.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${isOpen ? "text-white" : "text-brand-dark"}`}>{eq.name}</h3>
                      <span className={`text-xs ${isOpen ? "text-brand-accent" : "text-brand-muted"}`}>{eq.count}</span>
                    </div>
                  </div>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-white/40" : "text-brand-muted"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className={`text-sm leading-relaxed ${isOpen ? "text-white/60" : "text-brand-muted"}`}>{eq.desc}</p>
                </div>
              </button>;
        })}
        </div>
      </div>
    </section>;
}