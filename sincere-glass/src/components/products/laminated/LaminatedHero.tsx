"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuote } from "@/lib/QuoteContext";

export default function LaminatedHero() {
  const [loaded, setLoaded] = useState(false);
  const { openQuote } = useQuote();
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center bg-brand-dark overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[12s] ease-out"
        style={{ backgroundImage: "url('/images/products/laminated.jpg')", transform: loaded ? "scale(1.06)" : "scale(1)" }} />
      <div className="absolute inset-0 bg-brand-dark/85" />

      {/* Center-aligned layout (different from left-aligned tempered/insulated) */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full py-16 md:py-20 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-white/40 mb-5" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 100ms" }}>
          <Link href="/products" className="hover:text-white/70 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white/70">Laminated Glass</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 700ms ease-out 200ms" }}>
          Laminated Glass
        </h1>

        <p className="mt-4 md:mt-5 text-base md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 700ms ease-out 350ms" }}>
          Holds together when broken. Blocks 99% UV. Reduces noise. Your safest glazing option.
        </p>

        {/* Layered glass visual indicator */}
        <div className="mt-8 flex justify-center gap-1 items-center" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 500ms" }}>
          <div className="w-3 h-16 bg-white/20 rounded-sm" />
          <div className="w-2 h-14 bg-brand-accent/40 rounded-sm" />
          <div className="w-3 h-16 bg-white/20 rounded-sm" />
          <span className="ml-3 text-xs text-white/40">Glass + Interlayer + Glass</span>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 500ms" }}>
          {["PVB & SGP", "99% UV Block", "3C Certified", "Max 3m×15m"].map(tag => (
            <span key={tag} className="px-2.5 md:px-3 py-1 md:py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-xs md:text-sm rounded-full">{tag}</span>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)", transition: "all 600ms ease-out 600ms" }}>
          <button onClick={() => openQuote("laminated")} className="px-6 md:px-7 py-3 md:py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors text-sm md:text-base">
            Get a Quote
          </button>
          <a href="#layer-builder" className="px-6 md:px-7 py-3 md:py-3.5 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-sm md:text-base text-center">
            Build Your Configuration
          </a>
        </div>
      </div>
    </section>
  );
}
