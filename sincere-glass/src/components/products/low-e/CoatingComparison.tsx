"use client";
import { useState, useEffect } from "react";
import { useInView } from "@/lib/useInView";

const coatings = [
  { name: "Soft-Coat (Sputtered)", tag: "Best Performance", emissivity: "0.05–0.10", vlt: "60–75%", durability: "Must be in sealed IGU cavity", process: "Vacuum deposition after glass is made", best: "High-performance facades, energy-rated buildings", performance: 95 },
  { name: "Hard-Coat (Pyrolytic)", tag: "Most Versatile", emissivity: "0.15–0.20", vlt: "70–80%", durability: "Can be exposed — single pane OK", process: "Applied during float glass manufacturing", best: "Renovations, single-pane upgrades, versatile use", performance: 70 },
];

export default function CoatingComparison() {
  const { ref, isInView } = useInView();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isInView || paused) return;
    const t = setInterval(() => setActive(prev => (prev + 1) % 2), 5000);
    return () => clearInterval(t);
  }, [isInView, paused]);

  function select(i: number) { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 10000); }

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Soft-Coat vs. Hard-Coat Low-E</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">Two coating technologies, different trade-offs. Choose based on your project’s needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coatings.map((c, i) => (
            <button key={c.name} onClick={() => select(i)}
              className={"text-left p-6 rounded-xl border-2 transition-all duration-300 " +
                (active === i ? "border-brand-accent bg-white shadow-md" : "border-brand-light bg-white hover:border-brand-secondary/30")}
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 500ms", transitionDelay: (200 + i * 120) + "ms" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-base md:text-lg font-bold text-brand-dark">{c.name}</h3>
                <span className={"text-xs font-bold px-2.5 py-1 rounded-full " + (i === 0 ? "bg-brand-accent/15 text-brand-accent" : "bg-brand-secondary/10 text-brand-secondary")}>{c.tag}</span>
              </div>

              {/* Performance bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-brand-muted mb-1"><span>Thermal performance</span><span>{c.performance}%</span></div>
                <div className="h-2 bg-brand-lighter rounded-full overflow-hidden">
                  <div className={"h-full rounded-full transition-all duration-1000 " + (i === 0 ? "bg-brand-accent" : "bg-brand-secondary")}
                    style={{ width: isInView ? c.performance + "%" : "0%" }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-brand-muted">Emissivity</p><p className="text-brand-dark font-medium">{c.emissivity}</p></div>
                <div><p className="text-xs text-brand-muted">Light transmission</p><p className="text-brand-dark font-medium">{c.vlt}</p></div>
                <div><p className="text-xs text-brand-muted">Durability</p><p className="text-brand-dark font-medium">{c.durability}</p></div>
                <div><p className="text-xs text-brand-muted">Best for</p><p className="text-brand-dark font-medium">{c.best}</p></div>
              </div>

              <div className={"mt-4 overflow-hidden transition-all duration-300 " + (active === i ? "max-h-20 opacity-100" : "max-h-0 opacity-0")}>
                <p className="text-xs text-brand-muted pt-3 border-t border-brand-light">Process: {c.process}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
