"use client";
import { useInView } from "@/lib/useInView";

export default function WhatIs() {
  const { ref, isInView } = useInView();
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transition: "all 700ms ease-out" }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            What Is Tempered Glass?
          </h2>
          <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg">
            <p>
              Tempered glass — also called toughened glass — is a type of <strong className="text-brand-dark font-medium">safety glass</strong> produced
              by controlled thermal treatment. High-quality float glass is heated to approximately 620°C (near its softening point),
              then rapidly cooled by jets of air in a process called quenching.
            </p>
            <p>
              This creates a unique stress profile: <strong className="text-brand-dark font-medium">compressive stress</strong> on the surface
              and <strong className="text-brand-dark font-medium">tensile stress</strong> in the core. The balance of these opposing
              forces is what gives tempered glass its remarkable strength — 4 to 5 times greater than ordinary annealed glass
              of the same thickness.
            </p>
            <p>
              Perhaps most importantly, when tempered glass does break, it fractures into small, relatively blunt
              granular chunks rather than the jagged, knife-like shards produced by ordinary glass. This characteristic
              fragmentation pattern is why tempered glass is classified as safety glass under international building codes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
