"use client";

import { useState } from "react";
import { useInView } from "@/lib/useInView";
import { useQuote } from "@/lib/QuoteContext";
const colors = [{
  name: "Rojo señal",
  hex: "#D94040",
  ral: "RAL 3001"
}, {
  name: "Naranja puro",
  hex: "#E88C30",
  ral: "RAL 2004"
}, {
  name: "Amarillo dorado",
  hex: "#DAA745",
  ral: "RAL 1004"
}, {
  name: "Verde hierba",
  hex: "#4CAF50",
  ral: "RAL 6010"
}, {
  name: "Azul claro",
  hex: "#64B5F6",
  ral: "RAL 5012"
}, {
  name: "Azul señal",
  hex: "#2196F3",
  ral: "RAL 5005"
}, {
  name: "Ultramarine",
  hex: "#3F51B5",
  ral: "RAL 5002"
}, {
  name: "Negro Azabache",
  hex: "#1C1F26",
  ral: "RAL 9005"
}, {
  name: "Anthracite",
  hex: "#4A4E54",
  ral: "RAL 7016"
}, {
  name: "Gris Plata",
  hex: "#8B95A5",
  ral: "RAL 7001"
}, {
  name: "Blanco Tráfico",
  hex: "#F5F5F5",
  ral: "RAL 9016"
}, {
  name: "Cream",
  hex: "#F5E6C8",
  ral: "RAL 9001"
}, {
  name: "Turquesa Pastel",
  hex: "#7ECDC0",
  ral: "RAL 6034"
}, {
  name: "Rosa Salmón",
  hex: "#E8978C",
  ral: "RAL 3022"
}, {
  name: "Verde Oliva",
  hex: "#6B7F3E",
  ral: "RAL 6003"
}, {
  name: "Rojo Vino",
  hex: "#8C2A3C",
  ral: "RAL 3005"
}];
export default function ColorPalette() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  const [selected, setSelected] = useState<number | null>(null);
  const {
    openQuote
  } = useQuote();
  return <section id="colors" className="py-20 md:py-28 bg-white scroll-mt-20" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
        transition: "all 600ms"
      }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Paleta de Colores Estándar</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">Elija entre nuestros colores listos para producción, o envíenos cualquier código RAL / Pantone para una igualación personalizada.</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 md:gap-3">
          {colors.map((c, i) => <button key={c.hex} onClick={() => setSelected(selected === i ? null : i)} className={"aspect-square rounded-xl transition-all duration-300 border-2 " + (selected === i ? "border-brand-dark scale-110 shadow-lg z-10" : "border-transparent hover:scale-105 hover:shadow-md")} style={{
          backgroundColor: c.hex,
          opacity: isInView ? 1 : 0,
          transform: isInView ? "scale(1)" : "scale(0.8)",
          transition: "all 0.4s ease-out",
          transitionDelay: i * 30 + "ms"
        }} title={c.name + " (" + c.ral + ")"} />)}
        </div>

        {/* Selected color detail */}
        {selected !== null && <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 p-5 bg-brand-lighter rounded-xl border border-brand-light animate-fade-up">
            <div className="w-16 h-16 rounded-xl shadow-md flex-shrink-0" style={{
          backgroundColor: colors[selected].hex
        }} />
            <div className="text-center sm:text-left flex-1">
              <h3 className="font-semibold text-brand-dark">{colors[selected].name}</h3>
              <p className="text-sm text-brand-muted">{colors[selected].ral} • {colors[selected].hex}</p>
            </div>
            <button onClick={() => openQuote("enameled")} className="px-5 py-2 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors text-sm flex-shrink-0">
              Cotizar Este Color
            </button>
          </div>}

        <p className="mt-6 text-xs text-brand-muted">Colores personalizados disponibles con código RAL o Pantone. La formulación personalizada añade 5–7 días al plazo de entrega.</p>
      </div>
    </section>;
}