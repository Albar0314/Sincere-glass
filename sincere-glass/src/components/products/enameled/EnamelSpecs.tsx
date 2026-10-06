"use client";
import { useState } from "react";
import { useInView } from "@/lib/useInView";

const specs = [
  { label: "Colors", value: "Custom RAL / Pantone color matching", detail: "Standard palette of 16 colors in stock. Custom formulation available with 5–7 day additional lead time. Color samples provided for approval before production." },
  { label: "Patterns", value: "Dots, lines, gradients, custom designs", detail: "Standard screen patterns: round dots (various sizes/spacing), horizontal lines, vertical lines, diagonal lines, gradients, checkerboard. Custom screens available (screen-making fee applies)." },
  { label: "Durability", value: "Will not fade, peel, or delaminate", detail: "Inorganic ceramic enamel is fused to the glass at tempering temperature. It becomes part of the glass surface — immune to UV degradation, weather, and aging." },
  { label: "Resistance", value: "Acid, alkali, and abrasion resistant", detail: "The fused ceramic surface withstands chemical cleaning agents, environmental pollutants, and physical abrasion without damage." },
  { label: "Solar Control", value: "Absorbs & reflects partial solar energy", detail: "Coverage density determines shading coefficient. Higher dot density = more solar rejection. Can be combined with Low-E for maximum performance." },
  { label: "Standard", value: "GB 15763.2-2005", detail: "Compliant with Safety Glass for Buildings standard. All output 3C (CCC) certified with full test documentation." },
];

export default function EnamelSpecs() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight mb-10"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          Technical Specifications
        </h2>

        <div className="space-y-2">
          {specs.map((s, i) => {
            const isOpen = openIdx === i;
            return (
              <button key={s.label} onClick={() => setOpenIdx(isOpen ? null : i)}
                className={"w-full text-left rounded-xl border transition-all duration-300 " +
                  (isOpen ? "border-brand-accent/30 bg-brand-lighter shadow-sm" : "border-brand-light bg-brand-lighter hover:border-brand-secondary/20")}
                style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(8px)", transition: "all 400ms", transitionDelay: (100 + i * 50) + "ms" }}>
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
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
