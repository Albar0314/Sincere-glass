"use client";
import { useState } from "react";
import { useInView } from "@/lib/useInView";

const interlayers = [
  { id: "pvb", name: "PVB Interlayer", color: "bg-blue-400/60", desc: "Standard safety interlayer. Excellent UV blocking (99%), good sound damping, flexible. The most common choice for architectural laminated glass.", best: "General safety glazing, skylights, facades, residential", thickness: "0.38mm, 0.76mm, 1.14mm, 1.52mm" },
  { id: "sgp", name: "SGP Interlayer", color: "bg-brand-accent/60", desc: "Structural interlayer. 5× stiffer and 100× more tear-resistant than PVB. The glass panel retains structural capacity even after breakage.", best: "Glass floors, balustrades, hurricane glazing, bullet-resistant", thickness: "0.89mm, 1.52mm, 2.28mm" },
];

export default function LayerBuilder() {
  const { ref, isInView } = useInView();
  const [selected, setSelected] = useState(0);
  const layer = interlayers[selected];

  return (
    <section id="layer-builder" className="py-20 md:py-28 bg-white scroll-mt-20" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 600ms" }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Choose Your Interlayer</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">The interlayer defines your laminated glass performance. Pick the right one for your project.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Detail panel (LEFT on desktop — reversed from tempered page) */}
          <div className="order-2 lg:order-1">
            <div className="bg-brand-lighter rounded-2xl p-6 md:p-8">
              <div key={selected} className="animate-fade-up">
                <div className="flex items-center gap-3 mb-4">
                  <div className={"w-4 h-4 rounded-sm " + layer.color} />
                  <h3 className="font-display text-xl md:text-2xl font-bold text-brand-dark">{layer.name}</h3>
                </div>
                <p className="text-brand-muted leading-relaxed">{layer.desc}</p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-brand-light">
                    <p className="text-xs text-brand-muted uppercase tracking-wider mb-1">Best for</p>
                    <p className="text-sm text-brand-dark font-medium">{layer.best}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-brand-light">
                    <p className="text-xs text-brand-muted uppercase tracking-wider mb-1">Available thickness</p>
                    <p className="text-sm text-brand-dark font-medium">{layer.thickness}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual selector (RIGHT on desktop) */}
          <div className="order-1 lg:order-2 flex flex-row lg:flex-col gap-3">
            {interlayers.map((il, i) => (
              <button key={il.id} onClick={() => setSelected(i)}
                className={"flex-1 lg:flex-none p-5 rounded-xl border-2 transition-all duration-300 text-center lg:text-left " +
                  (selected === i ? "border-brand-accent bg-brand-accent/5 shadow-md" : "border-brand-light bg-white hover:border-brand-secondary/30")}
                style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(12px)", transition: "all 500ms", transitionDelay: (200 + i * 100) + "ms" }}>
                {/* Layered glass mini visual */}
                <div className="flex justify-center lg:justify-start items-center gap-0.5 mb-3">
                  <div className="w-2.5 h-10 bg-brand-secondary/20 rounded-sm" />
                  <div className={"w-1.5 h-8 rounded-sm " + il.color} />
                  <div className="w-2.5 h-10 bg-brand-secondary/20 rounded-sm" />
                </div>
                <h4 className={"text-sm font-semibold " + (selected === i ? "text-brand-dark" : "text-brand-muted")}>{il.name}</h4>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
