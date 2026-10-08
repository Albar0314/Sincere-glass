"use client";

import { useInView } from "@/lib/useInView";
export default function StressDiagram() {
  const {
    ref,
    isInView
  } = useInView();
  return <section className="py-16 md:py-24 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* SVG Diagram */}
          <div style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateX(0)" : "translateX(-20px)",
          transition: "all 700ms"
        }}>
            <svg viewBox="0 0 300 260" className="w-full max-w-[300px] mx-auto" aria-label="Sección transversal de la distribución de tensiones del vidrio templado">
              {/* Glass cross-section */}
              <rect x="50" y="40" width="200" height="160" rx="4" fill="#3A4250" opacity="0.1" stroke="#3A4250" strokeWidth="1" />

              {/* Compression zones (top and bottom) */}
              <rect x="50" y="40" width="200" height="35" rx="4" fill="#DAA745" opacity="0.25" />
              <rect x="50" y="165" width="200" height="35" rx="4" fill="#DAA745" opacity="0.25" />

              {/* Tension zone (center) */}
              <rect x="50" y="85" width="200" height="70" fill="#8B95A5" opacity="0.15" />

              {/* Arrows — compression (inward) */}
              <line x1="30" y1="57" x2="48" y2="57" stroke="#DAA745" strokeWidth="2" markerEnd="url(#arrowG)" />
              <line x1="270" y1="57" x2="252" y2="57" stroke="#DAA745" strokeWidth="2" markerEnd="url(#arrowG)" />
              <line x1="30" y1="183" x2="48" y2="183" stroke="#DAA745" strokeWidth="2" markerEnd="url(#arrowG)" />
              <line x1="270" y1="183" x2="252" y2="183" stroke="#DAA745" strokeWidth="2" markerEnd="url(#arrowG)" />

              {/* Arrows — tension (outward) */}
              <line x1="148" y1="120" x2="130" y2="120" stroke="#8B95A5" strokeWidth="1.5" markerEnd="url(#arrowT)" />
              <line x1="152" y1="120" x2="170" y2="120" stroke="#8B95A5" strokeWidth="1.5" markerEnd="url(#arrowT)" />

              {/* Labels */}
              <text x="150" y="62" textAnchor="middle" className="fill-brand-accent text-[11px] font-medium">Tensión de compresión</text>
              <text x="150" y="124" textAnchor="middle" className="fill-brand-muted text-[10px]">Tensión de tracción</text>
              <text x="150" y="190" textAnchor="middle" className="fill-brand-accent text-[11px] font-medium">Tensión de compresión</text>

              {/* Dimension labels */}
              <text x="150" y="230" textAnchor="middle" className="fill-brand-muted text-[10px]">Sección transversal del vidrio</text>
              <text x="150" y="245" textAnchor="middle" className="fill-brand-muted text-[9px]">Espesor de 3.8mm – 19mm</text>

              {/* Arrow markers */}
              <defs>
                <marker id="arrowG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M2 2L8 5L2 8" fill="none" stroke="#DAA745" strokeWidth="1.5" strokeLinecap="round" />
                </marker>
                <marker id="arrowT" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M2 2L8 5L2 8" fill="none" stroke="#8B95A5" strokeWidth="1.5" strokeLinecap="round" />
                </marker>
              </defs>
            </svg>
          </div>

          {/* Explanation */}
          <div style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateX(0)" : "translateX(20px)",
          transition: "all 700ms 150ms"
        }}>
            <h3 className="font-display text-xl md:text-2xl font-bold text-brand-dark">La Ciencia Detrás de la Resistencia</h3>
            <div className="mt-4 space-y-3 text-sm text-brand-muted leading-relaxed">
              <p>
                El enfriamiento rápido genera <span className="text-brand-accent font-medium">tensión de compresión</span> en ambas superficies del vidrio, mientras que el núcleo conserva <span className="text-brand-secondary font-medium">tensión de tracción</span>.
              </p>
              <p>
                Estas fuerzas opuestas están perfectamente equilibradas. Cualquier impacto externo debe primero vencer la capa de compresión antes de que el vidrio pueda romperse — por eso el vidrio templado soporta entre 4 y 5 veces más fuerza que el vidrio recocido.
              </p>
              <p>
                Cuando se supera ese umbral, la energía almacenada se libera de una sola vez — fragmentando el panel completo en pequeños gránulos romos en lugar de unos pocos fragmentos cortantes. Esto es por diseño: es el modo de fallo más seguro posible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}