"use client";

import { useState } from "react";
import { useInView } from "@/lib/useInView";
const specs = [{
  label: "Colors",
  value: "Custom RAL / Pantone color matching",
  detail: "Paleta estándar de 16 colores en stock. Formulación personalizada disponible con un plazo de entrega adicional de 5 a 7 días. Se proporcionan muestras de color para aprobación antes de la producción."
}, {
  label: "Patterns",
  value: "Dots, lines, gradients, custom designs",
  detail: "Patrones de serigrafía estándar: puntos redondos (varios tamaños y espaciados), líneas horizontales, líneas verticales, líneas diagonales, degradados, tablero de ajedrez. Pantallas personalizadas disponibles (se aplica tarifa de fabricación de pantalla)."
}, {
  label: "Durability",
  value: "Will not fade, peel, or delaminate",
  detail: "El esmalte cerámico inorgánico se fusiona al vidrio a la temperatura de templado. Pasa a formar parte de la superficie del vidrio — inmune a la degradación por UV, a la intemperie y al envejecimiento."
}, {
  label: "Resistance",
  value: "Acid, alkali, and abrasion resistant",
  detail: "La superficie cerámica fusionada resiste agentes de limpieza químicos, contaminantes ambientales y abrasión física sin sufrir daños."
}, {
  label: "Control Solar",
  value: "Absorbs & reflects partial solar energy",
  detail: "La densidad de cobertura determina el coeficiente de sombreado. Mayor densidad de puntos = mayor rechazo solar. Puede combinarse con vidrio de baja emisividad (Low-E) para un rendimiento máximo."
}, {
  label: "Standard",
  value: "GB 15763.2-2005",
  detail: "Cumple con la norma de vidrio de seguridad para edificios. Toda la producción cuenta con certificación 3C (CCC) y documentación completa de ensayos."
}];
export default function EnamelSpecs() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight mb-10" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
        transition: "all 600ms"
      }}>
          Especificaciones Técnicas
        </h2>

        <div className="space-y-2">
          {specs.map((s, i) => {
          const isOpen = openIdx === i;
          return <button key={s.label} onClick={() => setOpenIdx(isOpen ? null : i)} className={"w-full text-left rounded-xl border transition-all duration-300 " + (isOpen ? "border-brand-accent/30 bg-brand-lighter shadow-sm" : "border-brand-light bg-brand-lighter hover:border-brand-secondary/20")} style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(8px)",
            transition: "all 400ms",
            transitionDelay: 100 + i * 50 + "ms"
          }}>
                <div className="flex items-center justify-between p-4">
                  <span className="text-sm font-medium text-brand-dark">{s.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-brand-accent font-medium hidden sm:block">{s.value}</span>
                    <svg className={"w-4 h-4 transition-transform duration-200 " + (isOpen ? "rotate-180 text-brand-accent" : "text-brand-muted")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className={"overflow-hidden transition-all duration-300 " + (isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0")}>
                  <div className="px-4 pb-4">
                    <p className="text-sm text-brand-accent font-medium mb-1 sm:hidden">{s.value}</p>
                    <p className="text-sm text-brand-muted leading-relaxed">{s.detail}</p>
                  </div>
                </div>
              </button>;
        })}
        </div>
      </div>
    </section>;
}