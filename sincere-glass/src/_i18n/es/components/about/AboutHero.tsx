"use client";

import { useEffect, useState } from "react";
export default function AboutHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return <section className="relative h-[50vh] min-h-[360px] flex items-center bg-brand-dark overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-out" style={{
      backgroundImage: "url('/images/factory-exterior.jpg')",
      transform: loaded ? "scale(1.05)" : "scale(1)"
    }} />
      <div className="absolute inset-0 bg-brand-dark/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <p className={`text-brand-accent text-sm font-semibold uppercase tracking-wider mb-3 transition-all duration-600 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Sobre Nosotros
        </p>
        <h1 className={`font-display text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight transition-all duration-700 delay-100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Dos Fábricas, Una Misión
        </h1>
        <p className={`mt-4 text-lg text-white/70 max-w-xl transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          De un solo taller en Wuhan a dos modernas instalaciones de producción — más de 15 años construyendo confianza a través del vidrio.
        </p>
      </div>
    </section>;
}