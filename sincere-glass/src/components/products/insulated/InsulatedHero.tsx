"use client";
import { useEffect, useState } from "react";
import Link from "@/components/LocalizedLink";
import { useQuote } from "@/lib/QuoteContext";

export default function InsulatedHero() {
  const [loaded, setLoaded] = useState(false);
  const { openQuote } = useQuote();
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center bg-brand-dark overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[12s] ease-out"
        style={{ backgroundImage: "url('/images/products/insulated.jpg')", transform: loaded ? "scale(1.06)" : "scale(1)" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16 md:py-20">
        <div className="flex items-center gap-2 text-sm text-white/40 mb-5" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 100ms" }}>
          <Link href="/products" className="hover:text-white/70 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white/70">Insulated Glass</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight max-w-3xl"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 700ms ease-out 200ms" }}>
          Insulated Glass
        </h1>

        <p className="mt-4 md:mt-5 text-base md:text-xl text-white/70 max-w-2xl leading-relaxed"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 700ms ease-out 350ms" }}>
          Superior thermal and acoustic insulation. Dual-sealed spacer technology. Automated argon gas filling.
        </p>

        <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 500ms" }}>
          {["6–20mm Spacer", "Air or Argon", "3C Certified", "1.5× Wind Resistance"].map(tag => (
            <span key={tag} className="px-2.5 md:px-3 py-1 md:py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-xs md:text-sm rounded-full">{tag}</span>
          ))}
        </div>

        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)", transition: "all 600ms ease-out 600ms" }}>
          <button onClick={() => openQuote("insulated")} className="px-6 md:px-7 py-3 md:py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors text-sm md:text-base">
            Get a Quote
          </button>
          <a href="#how-igu-works" className="px-6 md:px-7 py-3 md:py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-sm md:text-base text-center">
            How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
