"use client";

import Image from "next/image";
import Link from "@/_i18n/es/components/LocalizedLink";
import { useInView } from "@/lib/useInView";
export default function CompanySnapshot() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.15
  });
  return <section className="py-20 md:py-28 bg-brand-light overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateX(0)" : "translateX(-40px)",
          transition: "opacity 700ms ease-out, transform 700ms ease-out"
        }}>
            <Image src="/images/factory-exterior.jpg" alt="Fábrica de Sincere Glass en Hubei, China" fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" />
          </div>

          <div style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateX(0)" : "translateX(40px)",
          transition: "opacity 700ms ease-out 150ms, transform 700ms ease-out 150ms"
        }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
              Una Década de Excelencia en Fabricación de Vidrio
            </h2>
            <div className="mt-6 space-y-4 text-brand-muted leading-relaxed">
              <p>Fundada en 2005 en Wuhan y ampliada en 2019 con una segunda fábrica en Honghu, Sincere Glass se ha consolidado como una empresa de procesamiento de vidrio arquitectónico de servicio completo, con actividad en el procesamiento profundo y el comercio exterior.</p>
              <p>Nuestras dos instalaciones abarcan 20,000㎡ y cuentan con 4 líneas de corte inteligentes, 4 líneas de pulido de bordes, 2 hornos de templado (hasta 3m×15m), 2 líneas de vidrio aislante con sistema automatizado de llenado de gas, y 2 autoclaves de alta presión para la producción de vidrio laminado.</p>
              <p>Bajo el liderazgo del Presidente Li Chuanren — reconocido como uno de los 10 Empresarios Destacados de Wuhan — hemos forjado alianzas con productores nacionales de vidrio y hemos participado en más de 2,600 proyectos emblemáticos.</p>
            </div>
            <Link href="/about" className="inline-flex items-center mt-8 text-brand-secondary hover:text-brand-accent font-medium transition-colors">
              Sobre Nosotros
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>;
}