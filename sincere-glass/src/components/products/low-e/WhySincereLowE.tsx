"use client";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

const advantages = [
  { stat: 50, suffix: "%", label: "Energy savings potential", desc: "Low-E + argon IGU can cut HVAC costs in half compared to single-pane uncoated glass. We help you specify the right combination for your climate zone." },
  { stat: 2, suffix: "", label: "Coating options available", desc: "Both soft-coat (vacuum sputtered) and hard-coat (pyrolytic) Low-E. We match the coating type to your project requirements — performance vs versatility." },
  { stat: 15, suffix: "m", label: "Max IGU panel length", desc: "Low-E coating integrated into our oversized IGU production line. Panels up to 3m × 15m — fewer joints, cleaner facades." },
  { stat: 100, suffix: "%", label: "Integrated production", desc: "Coating, cutting, tempering, IGU assembly, and quality testing all happen in our factories. No outsourced steps — faster delivery and consistent quality." },
];

function Stat({ s, active, i }: { s: typeof advantages[0]; active: boolean; i: number }) {
  const count = useCountUp(s.stat, active);
  return (
    <div className="p-5 rounded-xl bg-brand-lighter border border-brand-light hover:border-brand-accent/20 transition-all duration-300"
      style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(20px)", transition: "all 600ms", transitionDelay: (200 + i * 120) + "ms" }}>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="font-display text-3xl font-bold text-brand-accent tabular-nums">{count}</span>
        <span className="font-display text-lg font-bold text-brand-accent">{s.suffix}</span>
      </div>
      <h3 className="font-semibold text-brand-dark text-sm">{s.label}</h3>
      <p className="mt-1.5 text-xs text-brand-muted leading-relaxed">{s.desc}</p>
    </div>
  );
}

export default function WhySincereLowE() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Why Source Low-E Glass from Us?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {advantages.map((s, i) => <Stat key={s.label} s={s} active={isInView} i={i} />)}
        </div>
        <div className="mt-8"><InlineQuoteCTA text="Need help choosing the right Low-E configuration? Our team can recommend based on your climate and building orientation." product="low-e" /></div>
      </div>
    </section>
  );
}
