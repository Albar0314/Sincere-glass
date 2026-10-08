"use client";

import Image from "next/image";
import { useInView } from "@/lib/useInView";
const factories = [{
  name: "Fábrica de Wuhan",
  label: "Fundada en 2005",
  location: "Parque Industrial Wujin, Distrito Hannan, Wuhan",
  area: "17,000㎡",
  image: "/images/hero-factory.jpg",
  features: ["Hornos de templado, corte CNC, pulido de bordes", "Autoclaves de alta presión para vidrio laminado", "120+ empleados, 10 ingenieros técnicos", "Atiende la provincia de Hubei y regiones circundantes"]
}, {
  name: "Fábrica de Honghu",
  label: "Fundada en 2019",
  location: "Parque Industrial de Xintan Town, Honghu, Hubei",
  area: "20,000㎡",
  image: "/images/factory-exterior.jpg",
  features: ["4 líneas de corte inteligentes, 4 líneas de pulido de bordes", "2 hornos de templado (paneles de hasta 3m × 15m)", "Línea automatizada de vidrio aislante con relleno de gas", "2 autoclaves de alta presión (una de hasta 3m × 15m)"]
}];
export default function DualFactories() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  return <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14 transition-all duration-600" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)"
      }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Nuestras Instalaciones
          </h2>
          <p className="mt-4 text-brand-muted text-lg">Dos fábricas, capacidades completas, un único estándar de calidad.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {factories.map((f, i) => <div key={f.name} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(24px)",
          transition: "all 600ms ease-out",
          transitionDelay: `${200 + i * 150}ms`
        }}>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={f.image} alt={f.name} fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-brand-accent/90 text-brand-dark text-xs font-semibold rounded-full">{f.label}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-brand-dark">{f.name}</h3>
                <p className="mt-1 text-sm text-brand-muted">{f.location}</p>
                <p className="mt-1 text-sm text-brand-accent font-medium">{f.area} superficie total</p>
                <ul className="mt-4 space-y-2">
                  {f.features.map(feat => <li key={feat} className="flex items-start gap-2 text-sm text-brand-muted">
                      <svg className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feat}
                    </li>)}
                </ul>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}