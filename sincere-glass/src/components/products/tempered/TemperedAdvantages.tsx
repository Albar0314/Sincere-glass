"use client";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";

const advantages = [
  { stat: 5, suffix: "×", label: "Stronger", desc: "Impact resistance and bending strength compared to ordinary annealed glass." },
  { stat: 3, suffix: "×", label: "Thermal resistance", desc: "Withstands temperature differentials that would shatter standard float glass." },
  { stat: 250, suffix: "°C", label: "Temp differential", desc: "Maximum temperature difference tempered glass can withstand without cracking." },
  { stat: 15, suffix: "m", label: "Max length", desc: "Our furnace handles panels up to 3m wide × 15m long — oversized capacity." },
];

function AdvCard({ stat, suffix, label, desc, isActive, index }: {
  stat: number; suffix: string; label: string; desc: string; isActive: boolean; index: number;
}) {
  const count = useCountUp(stat, isActive);
  return (
    <div
      className="p-6 rounded-xl border border-brand-light bg-white hover:shadow-md transition-all duration-300"
      style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(24px)", transition: "all 600ms ease-out", transitionDelay: (200 + index * 120) + "ms" }}
    >
      <div className="font-display text-4xl font-bold text-brand-accent tabular-nums">
        {count}<span className="text-2xl">{suffix}</span>
      </div>
      <h3 className="mt-2 font-semibold text-brand-dark">{label}</h3>
      <p className="mt-1 text-sm text-brand-muted leading-relaxed">{desc}</p>
    </div>
  );
}

export default function TemperedAdvantages() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight mb-12 text-center"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          Key Performance Numbers
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {advantages.map((a, i) => (
            <AdvCard key={a.label} {...a} isActive={isInView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
