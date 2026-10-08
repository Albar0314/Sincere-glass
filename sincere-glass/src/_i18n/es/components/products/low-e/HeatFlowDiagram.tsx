"use client";

import { useInView } from "@/lib/useInView";
export default function HeatFlowDiagram() {
  const {
    ref,
    isInView
  } = useInView();
  return <section id="how-low-e-works" className="py-16 md:py-24 bg-white scroll-mt-20" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
        transition: "all 600ms"
      }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Cómo Funciona el Recubrimiento Low-E</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">El recubrimiento actúa como un filtro selectivo: refleja el calor infrarrojo invisible mientras transmite la luz visible.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Without Low-E */}
          <div className="bg-brand-lighter rounded-2xl p-6 text-center" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateX(0)" : "translateX(-20px)",
          transition: "all 700ms"
        }}>
            <p className="text-xs text-brand-muted uppercase tracking-wider mb-4">Sin recubrimiento Low-E</p>
            <svg viewBox="0 0 240 180" className="w-full max-w-[240px] mx-auto mb-4">
              <text x="20" y="15" className="text-[10px] fill-red-500">Calor exterior</text>
              <text x="170" y="15" className="text-[10px] fill-blue-500">Indoor</text>
              {/* Glass */}
              <rect x="110" y="25" width="12" height="130" rx="2" fill="#8B95A5" opacity="0.3" stroke="#8B95A5" strokeWidth="1" />
              {/* Heat arrows passing through */}
              {[50, 80, 110].map((y, i) => <g key={i}>
                  <line x1="30" y1={y} x2="200" y2={y} stroke="#EF4444" strokeWidth="1.5" opacity="0.6" markerEnd="url(#arrowR)">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin={i * 0.4 + "s"} repeatCount="indefinite" />
                  </line>
                </g>)}
              <text x="70" y="145" className="text-[9px] fill-red-400" textAnchor="middle">84% de calor</text>
              <text x="70" y="157" className="text-[9px] fill-red-400" textAnchor="middle">atraviesa el vidrio</text>
              <defs><marker id="arrowR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M2 2L8 5L2 8" fill="none" stroke="#EF4444" strokeWidth="1.5" /></marker></defs>
            </svg>
            <p className="text-sm text-brand-muted">El vidrio estándar transmite la mayor parte del calor infrarrojo — altos costes de refrigeración en verano.</p>
          </div>

          {/* With Low-E */}
          <div className="bg-brand-dark rounded-2xl p-6 text-center" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateX(0)" : "translateX(20px)",
          transition: "all 700ms 150ms"
        }}>
            <p className="text-xs text-brand-accent uppercase tracking-wider mb-4">Con recubrimiento Low-E</p>
            <svg viewBox="0 0 240 180" className="w-full max-w-[240px] mx-auto mb-4">
              <text x="20" y="15" className="text-[10px] fill-red-400">Calor exterior</text>
              <text x="170" y="15" className="text-[10px] fill-blue-300">Indoor</text>
              {/* Glass with Low-E */}
              <rect x="110" y="25" width="12" height="130" rx="2" fill="#DAA745" opacity="0.3" stroke="#DAA745" strokeWidth="1" />
              {/* Reflected arrows */}
              {[50, 80].map((y, i) => <g key={i}>
                  <line x1="30" y1={y} x2="108" y2={y} stroke="#EF4444" strokeWidth="1.5" opacity="0.5" />
                  <line x1="108" y1={y} x2="40" y2={y + (i === 0 ? 20 : -15)} stroke="#DAA745" strokeWidth="1" opacity="0.6" strokeDasharray="4 3">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin={i * 0.5 + "s"} repeatCount="indefinite" />
                  </line>
                </g>)}
              {/* Light passing through */}
              <line x1="60" y1="110" x2="200" y2="110" stroke="#60A5FA" strokeWidth="1.5" opacity="0.5" strokeDasharray="6 3">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite" />
              </line>
              <text x="50" y="145" className="text-[9px] fill-brand-accent" textAnchor="middle">Calor reflejado</text>
              <text x="180" y="125" className="text-[9px] fill-blue-300" textAnchor="middle">Luz transmitida</text>
            </svg>
            <p className="text-sm text-white/50">El vidrio de baja emisividad (Low-E) refleja el calor infrarrojo pero transmite la luz visible — menores costos de energía.</p>
          </div>
        </div>
      </div>
    </section>;
}