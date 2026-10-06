"use client";
import { useInView } from "@/lib/useInView";

const configs = [
  { label: "Single pane", uValue: 5.8, bar: 100, color: "bg-red-400" },
  { label: "Double — air fill", uValue: 2.8, bar: 48, color: "bg-brand-secondary" },
  { label: "Double — argon fill", uValue: 2.3, bar: 40, color: "bg-blue-400" },
  { label: "Double — Low-E + argon", uValue: 1.6, bar: 28, color: "bg-brand-accent" },
  { label: "Triple — Low-E + argon", uValue: 1.0, bar: 17, color: "bg-green-500" },
];

export default function EnergyPerformance() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Energy Performance Comparison
          </h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">
            Lower U-value = less heat escapes = lower energy bills. See how different IGU configurations compare.
          </p>
        </div>

        <div className="space-y-4">
          {configs.map((c, i) => (
            <div key={c.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (200 + i * 100) + "ms" }}>
              <span className="text-sm text-brand-dark font-medium w-full sm:w-48 flex-shrink-0">{c.label}</span>
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 h-8 bg-white rounded-full overflow-hidden border border-brand-light">
                  <div className={c.color + " h-full rounded-full transition-all duration-1000 ease-out"}
                    style={{ width: isInView ? c.bar + "%" : "0%" }} />
                </div>
                <span className="text-sm font-bold text-brand-dark tabular-nums w-20 text-right">{c.uValue} W/m²K</span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-brand-muted">
          * U-values are indicative and depend on glass thickness, spacer type, and coating specifications. Actual values calculated per project.
        </p>
      </div>
    </section>
  );
}
