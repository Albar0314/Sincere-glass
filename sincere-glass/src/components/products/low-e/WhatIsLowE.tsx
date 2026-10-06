"use client";
import { useInView } from "@/lib/useInView";

export default function WhatIsLowE() {
  const { ref, isInView } = useInView();
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12"
        style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transition: "all 700ms" }}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">What Is Low-E Glass?</h2>
        <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg">
          <p><strong className="text-brand-dark font-medium">Low-E</strong> stands for <strong className="text-brand-dark font-medium">low emissivity</strong>. Emissivity is a measure of how much infrared heat a surface radiates. Uncoated glass has an emissivity of about 0.84 — meaning it radiates 84% of absorbed heat energy.</p>
          <p>A Low-E coating — a microscopically thin layer of metallic oxide — reduces that emissivity to just <strong className="text-brand-dark font-medium">0.05–0.15</strong>. The coated surface reflects infrared radiation back instead of transmitting it, while still allowing <strong className="text-brand-dark font-medium">60–80% of visible light</strong> to pass through.</p>
          <p>In practice: buildings glazed with Low-E glass stay cooler in summer (heat is reflected outward) and warmer in winter (indoor heat is reflected back in). Energy savings of <strong className="text-brand-dark font-medium">30–50%</strong> on HVAC costs are typical.</p>
        </div>
      </div>
    </section>
  );
}
