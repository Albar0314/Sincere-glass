"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-brand-dark">
      {/* Background with Ken Burns */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[12s] ease-out ${loaded ? "scale-105" : "scale-100"}`}
        style={{ backgroundImage: "url('/images/hero-factory.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-2xl">
          <h1
            className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.12] tracking-tight transition-all duration-700 ease-out ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            Your Trusted Architectural Glass Manufacturer in China
          </h1>

          <p
            className={`mt-5 text-lg md:text-xl text-white/80 leading-relaxed max-w-xl transition-all duration-700 ease-out delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            Custom tempered, insulated, laminated &amp; enameled glass for global construction projects.
          </p>

          <div
            className={`mt-9 flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out delay-[400ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <a href="#quote" className="inline-flex items-center justify-center px-7 py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors duration-300 text-base">
              Get a Free Quote
            </a>
            <a href="/products" className="inline-flex items-center justify-center px-7 py-3.5 border border-white/30 hover:border-white/60 text-white font-medium rounded-md transition-colors duration-300 text-base">
              Explore Products
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-[800ms] ${loaded ? "opacity-100" : "opacity-0"}`}>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <div className="w-1 h-2.5 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
