"use client";

import { useInView } from "@/lib/useInView";
const patterns = [{
  name: "Puntos pequeños",
  svg: "M5 5h2v2H5zM13 5h2v2h-2zM5 13h2v2H5zM13 13h2v2h-2zM9 9h2v2H9z",
  desc: "El más popular para paneles spandrel"
}, {
  name: "Puntos grandes",
  svg: "M4 4h4v4H4zM12 4h4v4h-4zM4 12h4v4H4zM12 12h4v4h-4z",
  desc: "Mayor cobertura opaca"
}, {
  name: "Líneas horizontales",
  svg: "M0 4h20M0 8h20M0 12h20M0 16h20",
  type: "line",
  desc: "Estética lineal limpia"
}, {
  name: "Líneas verticales",
  svg: "M4 0v20M8 0v20M12 0v20M16 0v20",
  type: "line",
  desc: "Enfatiza la altura"
}, {
  name: "Diagonal",
  svg: "M0 0L20 20M5 0L20 15M0 5L15 20",
  type: "line",
  desc: "Movimiento visual dinámico"
}, {
  name: "Puntos en degradado",
  svg: "M3 3h1v1H3zM7 3h1.5v1.5H7zM12 3h2v2h-2zM3 8h1v1H3zM7 8h1.5v1.5H7zM12 8h2v2h-2z",
  desc: "Efecto de transparencia difuminada"
}, {
  name: "Checkerboard",
  svg: "M0 0h5v5H0zM5 5h5v5H5zM10 0h5v5h-5zM0 10h5v5H0zM10 10h5v5h-5z",
  desc: "Declaración geométrica de impacto"
}, {
  name: "Diseño personalizado",
  svg: "M10 2L18 18H2L10 2z",
  desc: "Su logotipo, marca o obra de arte"
}];
export default function PatternGallery() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  return <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-10" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
        transition: "all 600ms"
      }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Patrones de serigrafía</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">Patrones estándar disponibles en pantallas de stock. Los patrones personalizados requieren una nueva pantalla (costo adicional y plazo de entrega adicional).</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {patterns.map((p, i) => <div key={p.name} className="bg-white rounded-xl p-4 border border-brand-light hover:border-brand-accent/30 hover:shadow-md transition-all duration-300 group" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(16px)",
          transition: "all 500ms",
          transitionDelay: 150 + i * 60 + "ms"
        }}>
              <div className="aspect-square rounded-lg bg-brand-lighter border border-brand-light flex items-center justify-center mb-3 overflow-hidden">
                <svg viewBox="0 0 20 20" className="w-full h-full p-2 text-brand-primary/30 group-hover:text-brand-accent/50 transition-colors">
                  {p.type === "line" ? <g stroke="currentColor" strokeWidth="0.8" fill="none"><path d={p.svg} /></g> : <path d={p.svg} fill="currentColor" />}
                </svg>
              </div>
              <h3 className="font-semibold text-brand-dark text-xs">{p.name}</h3>
              <p className="text-[10px] text-brand-muted mt-0.5">{p.desc}</p>
            </div>)}
        </div>
      </div>
    </section>;
}