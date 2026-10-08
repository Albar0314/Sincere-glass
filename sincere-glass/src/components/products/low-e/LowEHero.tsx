"use client";
import { useEffect, useState } from "react";
import Link from "@/components/LocalizedLink";
import { useQuote } from "@/lib/QuoteContext";

export default function LowEHero() {
  const [loaded, setLoaded] = useState(false);
  const { openQuote } = useQuote();
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center overflow-hidden">
      {/* Warm-to-cool gradient background (unique to Low-E — represents heat reflection) */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 via-brand-dark to-blue-900/90" />
      <div className="absolute inset-0 bg-brand-dark/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-white/40 mb-5" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 100ms" }}>
            <Link href="/products" className="hover:text-white/70 transition-colors">Products</Link>
            <span>/</span><span className="text-white/70">Low-E Glass</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 700ms 200ms" }}>
            Low-E Glass
          </h1>
          <p className="mt-4 text-base md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 700ms 350ms" }}>
            Reflects heat. Transmits light. Saves 30–50% on building energy costs.
          </p>

          {/* Warm | Cool visual divider */}
          <div className="mt-8 flex items-center justify-center gap-4" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 500ms" }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 rounded-full bg-gradient-to-r from-orange-400 to-red-400" />
              <span className="text-xs text-white/40">Heat reflected</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300" />
              <span className="text-xs text-white/40">Light transmitted</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2" style={{ opacity: loaded ? 1 : 0, transition: "opacity 600ms 500ms" }}>
            {["Soft & Hard Coat", "0.05–0.15 Emissivity", "3C Certified", "IGU Compatible"].map(tag => (
              <span key={tag} className="px-2.5 py-1 bg-white/10 border border-white/10 text-white/80 text-xs rounded-full">{tag}</span>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)", transition: "all 600ms 600ms" }}>
            <button onClick={() => openQuote("low-e")} className="px-6 py-3 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors text-sm">Get a Quote</button>
            <a href="#how-low-e-works" className="px-6 py-3 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-sm text-center">How It Works</a>
          </div>
        </div>
      </div>
    </section>
  );
}
