"use client";
import { useInView } from "@/lib/useInView";

export default function WhatIsIGU() {
  const { ref, isInView } = useInView();
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12"
        style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transition: "all 700ms" }}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">What Is Insulated Glass?</h2>
        <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg">
          <p>
            Insulated glass units (IGUs) — also called double glazing or triple glazing — consist of two or more
            glass panes separated by a sealed, gas-filled space. This dead air (or inert gas) layer acts as a thermal
            barrier, dramatically reducing heat transfer between interior and exterior environments.
          </p>
          <p>
            The result: <strong className="text-brand-dark font-medium">buildings stay cooler in summer and warmer in winter</strong>,
            cutting HVAC energy consumption by 30–50% compared to single-pane glazing. IGUs also significantly reduce
            outside noise — a critical consideration for urban commercial and residential projects.
          </p>
          <p>
            Our IGUs use <strong className="text-brand-dark font-medium">dual-seal spacer technology</strong> (PIB primary seal +
            structural silicone secondary seal) for maximum longevity. Wind pressure resistance is 1.5× that of
            single-pane glass. Combined with Low-E coatings, our units deliver some of the lowest U-values available
            from a Chinese manufacturer.
          </p>
        </div>
      </div>
    </section>
  );
}
