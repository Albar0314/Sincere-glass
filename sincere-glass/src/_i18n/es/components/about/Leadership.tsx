"use client";

import { useInView } from "@/lib/useInView";
export default function Leadership() {
  const {
    ref,
    isInView
  } = useInView();
  return <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="transition-all duration-700" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(24px)"
      }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Leadership</h2>

          <div className="mt-10 p-8 bg-brand-lighter rounded-xl border border-brand-light">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-display text-2xl font-bold text-brand-primary">李</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-brand-dark">Li Chuanren · 李传仁</h3>
                <p className="text-brand-accent text-sm font-medium mt-1">Presidente y Fundador</p>
                <div className="mt-4 space-y-3 text-brand-muted leading-relaxed">
                  <p>
                    Bajo el liderazgo del Presidente Li, Sincere Glass ha evolucionado de un taller de vidrio templado de producto único
a una empresa de fabricación de múltiples líneas que abarca vidrio templado plano y curvado,
vidrio aislante, vidrio laminado y vidrio esmaltado.
                  </p>
                  <p>
                    Su filosofía — "perseguir la excelencia, servir a la sociedad" — ha guiado a la empresa a lo largo de más de 15 años
de inversión continua en equipamiento avanzado, sistemas de calidad y desarrollo del talento. En 2010,
fue reconocido como uno de los 10 Emprendedores Destacados de Wuhan.
                  </p>
                  <p>
                    Hoy, la empresa colabora con los principales fabricantes nacionales de vidrio flotado y mantiene sistemas integrales de gestión del proceso productivo y control de calidad en ambas fábricas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}