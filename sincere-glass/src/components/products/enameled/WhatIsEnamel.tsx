"use client";
import { useInView } from "@/lib/useInView";

export default function WhatIsEnamel() {
  const { ref, isInView } = useInView();
  return (
    <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10 items-start">
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(24px)", transition: "all 700ms" }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">What Is Enameled Glass?</h2>
            <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg">
              <p>Enameled glass — also called <strong className="text-brand-dark font-medium">ceramic frit glass</strong> — is produced by screen-printing inorganic ceramic enamel onto the glass surface, then permanently fusing it at tempering temperature (around 620°C).</p>
              <p>The result is a decorative surface that is <strong className="text-brand-dark font-medium">abrasion-resistant, acid-resistant, alkali-resistant</strong>, and will never fade, peel, or change color — even after decades of sun exposure. The enamel becomes part of the glass itself.</p>
              <p>Beyond aesthetics, the enamel layer absorbs and reflects solar energy, providing measurable <strong className="text-brand-dark font-medium">shading and energy savings</strong>. In curtain wall systems, enameled spandrel panels hide floor slabs and structural elements while contributing to the building’s thermal performance.</p>
            </div>
          </div>
          {/* Decorative color strip (RIGHT on desktop) */}
          <div className="hidden md:flex flex-col gap-2 pt-16" style={{ opacity: isInView ? 1 : 0, transition: "opacity 600ms 400ms" }}>
            {["#D94040","#E88C30","#DAA745","#4CAF50","#2196F3","#3F51B5","#1C1F26","#F5F5F5"].map((c, i) => (
              <div key={c} className="h-6 rounded-md shadow-sm transition-all duration-300 hover:scale-x-110 origin-left" style={{ backgroundColor: c, transitionDelay: (i * 60) + "ms" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
