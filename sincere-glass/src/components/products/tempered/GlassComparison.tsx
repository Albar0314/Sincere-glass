"use client";
import { useInView } from "@/lib/useInView";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";

const rows = [
  { property: "Strength", tempered: "4-5× annealed", laminated: "2× annealed", annealed: "1× (baseline)" },
  { property: "Breakage", tempered: "Blunt granules", laminated: "Cracks, stays in frame", annealed: "Sharp shards" },
  { property: "Post-Break", tempered: "Falls out", laminated: "Holds together", annealed: "Falls as shards" },
  { property: "Thermal", tempered: "250°C diff.", laminated: "70°C diff.", annealed: "80°C diff." },
  { property: "UV Block", tempered: "Minimal", laminated: "> 99%", annealed: "Minimal" },
  { property: "Sound", tempered: "Standard", laminated: "Superior", annealed: "Standard" },
  { property: "Cut After?", tempered: "No", laminated: "No", annealed: "Yes" },
  { property: "Cost", tempered: "Medium", laminated: "Higher", annealed: "Lowest" },
  { property: "Best For", tempered: "Doors, facades", laminated: "Skylights, security", annealed: "Interior (non-safety)" },
];

export default function GlassComparison() {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Tempered vs. Laminated vs. Annealed
          </h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">
            Choosing the right glass depends on your project. Here is how they compare.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-brand-muted border-b border-brand-light w-[140px]">Property</th>
                <th className="text-left py-3 px-4 text-sm font-bold text-brand-accent border-b-2 border-brand-accent bg-brand-accent/5">Tempered</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-brand-dark border-b border-brand-light">Laminated</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-brand-dark border-b border-brand-light">Annealed</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.property} className={i % 2 === 0 ? "bg-white" : "bg-brand-lighter"}
                  style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(8px)", transition: "all 400ms", transitionDelay: (200 + i * 50) + "ms" }}>
                  <td className="py-3 px-4 text-sm font-medium text-brand-dark">{row.property}</td>
                  <td className="py-3 px-4 text-sm text-brand-dark bg-brand-accent/5 font-medium">{row.tempered}</td>
                  <td className="py-3 px-4 text-sm text-brand-muted">{row.laminated}</td>
                  <td className="py-3 px-4 text-sm text-brand-muted">{row.annealed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card view */}
        <div className="md:hidden space-y-3">
          {rows.map((row, i) => (
            <div key={row.property} className="bg-white rounded-xl p-4 border border-brand-light"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(8px)", transition: "all 400ms", transitionDelay: (100 + i * 40) + "ms" }}>
              <p className="text-xs font-medium text-brand-muted uppercase tracking-wider mb-2">{row.property}</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-brand-accent/5 rounded-lg p-2 border border-brand-accent/20">
                  <p className="text-[10px] text-brand-accent font-bold mb-0.5">Tempered</p>
                  <p className="text-brand-dark font-medium">{row.tempered}</p>
                </div>
                <div className="bg-brand-lighter rounded-lg p-2">
                  <p className="text-[10px] text-brand-muted font-bold mb-0.5">Laminated</p>
                  <p className="text-brand-muted">{row.laminated}</p>
                </div>
                <div className="bg-brand-lighter rounded-lg p-2">
                  <p className="text-[10px] text-brand-muted font-bold mb-0.5">Annealed</p>
                  <p className="text-brand-muted">{row.annealed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <InlineQuoteCTA text="Not sure which glass type you need? Tell us your project and we will recommend." product="" />
        </div>
      </div>
    </section>
  );
}
