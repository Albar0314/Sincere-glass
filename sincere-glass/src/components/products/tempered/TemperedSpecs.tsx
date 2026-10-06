"use client";
import { useInView } from "@/lib/useInView";

const specs = [
  { label: "Thickness Range", value: "3.8mm – 19mm", detail: "Common: 5, 6, 8, 10, 12, 15, 19mm" },
  { label: "Max Panel Size", value: "3,000 × 15,000mm", detail: "Among the largest in Hubei province" },
  { label: "Impact Strength", value: "4-5× annealed glass", detail: "Per GB 15763.2-2005 testing" },
  { label: "Thermal Resistance", value: "3× standard float", detail: "Withstands 250°C temperature differential" },
  { label: "Edge Work", value: "Flat, beveled, pencil, OG", detail: "Must be completed before tempering" },
  { label: "Processing", value: "Flat & bent tempering", detail: "Custom curves per project requirements" },
  { label: "Surface Options", value: "Clear, tinted, Low-E, reflective", detail: "Can be combined with coating" },
  { label: "Certification", value: "CCC (3C) Certified", detail: "National technical inspection approved" },
];

export default function TemperedSpecs() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-10"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          Technical Specifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((s, i) => (
            <div
              key={s.label}
              className="bg-white rounded-xl p-5 border border-brand-light hover:border-brand-secondary/20 hover:shadow-sm transition-all duration-300"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(16px)",
                transition: "all 500ms ease-out",
                transitionDelay: (100 + i * 60) + "ms",
              }}
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-brand-dark">{s.label}</span>
                <span className="text-sm font-semibold text-brand-accent">{s.value}</span>
              </div>
              <p className="mt-1.5 text-xs text-brand-muted">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
