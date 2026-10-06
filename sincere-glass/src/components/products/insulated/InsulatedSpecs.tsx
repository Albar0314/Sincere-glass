"use client";
import { useInView } from "@/lib/useInView";

const specs = [
  { label: "Spacer Options", value: "6, 9, 12, 15, 20mm", detail: "Aluminum or warm-edge spacer bars" },
  { label: "Glass Options", value: "Clear, Low-E, tinted, reflective", detail: "Any combination of pane types" },
  { label: "Gas Fill", value: "Air or Argon", detail: "Automated argon filling line (90%+ fill rate)" },
  { label: "Seal Type", value: "Dual seal (PIB + silicone)", detail: "Primary gas retention + structural secondary seal" },
  { label: "Wind Resistance", value: "1.5× single pane", detail: "Per GB/T 11944-2012 testing" },
  { label: "U-Value Range", value: "1.4 – 2.8 W/m²K", detail: "Depends on configuration and coating" },
  { label: "Sound Reduction", value: "Up to 35 dB", detail: "Significant improvement in urban environments" },
  { label: "Certification", value: "CCC (3C) Certified", detail: "Compliant with GB/T 11944-2012" },
];

export default function InsulatedSpecs() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-10"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          Technical Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((s, i) => (
            <div key={s.label} className="bg-brand-lighter rounded-xl p-5 border border-brand-light hover:border-brand-secondary/20 hover:shadow-sm transition-all duration-300"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 500ms", transitionDelay: (100 + i * 60) + "ms" }}>
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-brand-dark">{s.label}</span>
                <span className="text-sm font-semibold text-brand-accent text-right">{s.value}</span>
              </div>
              <p className="mt-1.5 text-xs text-brand-muted">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
