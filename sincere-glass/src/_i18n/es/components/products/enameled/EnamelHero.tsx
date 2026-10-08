"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuote } from "@/lib/QuoteContext";
export default function EnamelHero() {
  const [loaded, setLoaded] = useState(false);
  const {
    openQuote
  } = useQuote();
  useEffect(() => {
    setLoaded(true);
  }, []);
  return <section className="relative min-h-[55vh] md:min-h-[60vh] bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[55vh] md:min-h-[60vh]">
          {/* Text — LEFT */}
          <div className="py-16 md:py-20">
            <div className="flex items-center gap-2 text-sm text-white/40 mb-5" style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 600ms 100ms"
          }}>
              <Link href="/products" className="hover:text-white/70 transition-colors">Products</Link>
              <span>/</span><span className="text-white/70">Vidrio esmaltado</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 700ms 200ms"
          }}>
              Vidrio esmaltado
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/70 max-w-lg leading-relaxed" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "all 700ms 350ms"
          }}>
              Color de frita cerámica permanente que nunca se desvanece, descascara ni delaminase. Colores y patrones personalizados para cualquier visión arquitectónica.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 600ms 500ms"
          }}>
              {["Custom RAL/Pantone", "Acid Resistant", "3C Certified", "Solar Control"].map(tag => <span key={tag} className="px-2.5 py-1 bg-white/10 border border-white/10 text-white/80 text-xs rounded-full">{tag}</span>)}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 600ms 600ms"
          }}>
              <button onClick={() => openQuote("enameled")} className="px-6 py-3 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors text-sm">Obtener Cotización</button>
              <a href="#colors" className="px-6 py-3 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors text-sm text-center">Ver Colores</a>
            </div>
          </div>

          {/* Image — RIGHT (visible on desktop) */}
          <div className="hidden lg:block relative h-full min-h-[400px]" style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateX(0)" : "translateX(30px)",
          transition: "all 800ms 300ms"
        }}>
            <Image src="/images/products/enameled.jpg" alt="Muestras de vidrio esmaltado" fill className="object-cover rounded-l-2xl" sizes="50vw" />
          </div>
        </div>
      </div>
    </section>;
}