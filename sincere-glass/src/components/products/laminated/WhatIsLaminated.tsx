"use client";
import { useInView } from "@/lib/useInView";

const highlights = [
  { num: "99%", label: "UV blocked", desc: "Protects furnishings from fading" },
  { num: "5×", label: "SGP tear resistance", desc: "vs standard PVB interlayer" },
  { num: "35–45", label: "dB noise reduction", desc: "Effective at 1000–2000Hz" },
];

export default function WhatIsLaminated() {
  const { ref, isInView } = useInView();
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center"
        style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transition: "all 700ms" }}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">What Is Laminated Glass?</h2>
        <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg text-left md:text-center">
          <p>Laminated glass bonds two or more panes together with a tough plastic interlayer — typically <strong className="text-brand-dark font-medium">PVB</strong> (polyvinyl butyral) or <strong className="text-brand-dark font-medium">SGP</strong> (SentryGlas Plus). When impact shatters the glass, the interlayer holds every fragment in place.</p>
          <p>This “stay-in-frame” behavior is what makes laminated glass the go-to choice for overhead glazing, hurricane zones, security applications, and anywhere falling glass shards would endanger people below.</p>
        </div>
      </div>

      {/* 3-column highlight cards */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {highlights.map((h, i) => (
            <div key={h.label} className="bg-white rounded-xl p-6 text-center border border-brand-light"
              style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(16px)", transition: "all 500ms", transitionDelay: (300 + i * 120) + "ms" }}>
              <span className="font-display text-3xl md:text-4xl font-bold text-brand-accent">{h.num}</span>
              <p className="text-sm font-medium text-brand-dark mt-1">{h.label}</p>
              <p className="text-xs text-brand-muted mt-1">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
