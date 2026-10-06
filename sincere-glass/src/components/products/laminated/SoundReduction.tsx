"use client";
import { useState, useEffect } from "react";
import { useInView } from "@/lib/useInView";

const configs = [
  { label: "Single pane (6mm)", db: 28, desc: "Basic noise reduction" },
  { label: "Laminated (6.4mm PVB)", db: 35, desc: "Effective at speech frequencies" },
  { label: "Multi-layer laminated", db: 40, desc: "Significant urban noise reduction" },
  { label: "Laminated + insulated", db: 45, desc: "Maximum acoustic performance" },
];

export default function SoundReduction() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isInView || paused) return;
    const t = setInterval(() => setActive(prev => (prev + 1) % configs.length), 3500);
    return () => clearInterval(t);
  }, [isInView, paused]);

  function select(i: number) { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 8000); }

  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: noise meter visualization */}
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(-20px)", transition: "all 700ms" }}>
            <div className="bg-brand-dark rounded-2xl p-6 md:p-8">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-6">Sound reduction rating</p>

              {/* Big number */}
              <div className="text-center mb-6">
                <span className="font-display text-6xl md:text-7xl font-bold text-brand-accent tabular-nums">{configs[active].db}</span>
                <span className="font-display text-2xl text-brand-accent ml-1">dB</span>
                <p className="text-sm text-white/50 mt-2">{configs[active].desc}</p>
              </div>

              {/* Meter bars */}
              <div className="flex items-end justify-center gap-1 h-16">
                {Array.from({ length: 20 }).map((_, i) => {
                  const threshold = (configs[active].db / 50) * 20;
                  const isActive = i < threshold;
                  return (
                    <div key={i}
                      className={"w-2 rounded-t transition-all duration-300 " + (isActive ? (i < 10 ? "bg-green-400" : i < 15 ? "bg-brand-accent" : "bg-red-400") : "bg-white/10")}
                      style={{ height: (12 + i * 2.5) + "px", transitionDelay: i * 30 + "ms" }} />
                  );
                })}
              </div>
            </div>

            {/* Config selector */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {configs.map((c, i) => (
                <button key={c.label} onClick={() => select(i)}
                  className={"text-left p-3 rounded-lg border text-xs transition-all duration-200 " +
                    (active === i ? "border-brand-accent bg-brand-accent/5 text-brand-dark font-medium" : "border-brand-light bg-white text-brand-muted hover:border-brand-secondary/30")}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: text */}
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(20px)", transition: "all 700ms 150ms" }}>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
              Superior Sound Insulation
            </h2>
            <div className="mt-6 space-y-4 text-brand-muted leading-relaxed">
              <p>Laminated glass is one of the most effective glazing solutions for noise control. The PVB interlayer acts as a sound-dampening membrane, absorbing acoustic energy that would pass through ordinary glass.</p>
              <p>It is particularly effective in the <strong className="text-brand-dark font-medium">1,000–2,000Hz frequency range</strong> — the frequencies of speech, traffic noise, and common urban sounds that cause the most disturbance.</p>
              <p>For maximum acoustic performance, combine laminated glass with an insulated glass unit. The combination of interlayer damping + sealed air gap delivers the highest noise reduction available in architectural glazing.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
