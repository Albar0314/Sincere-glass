"use client";

import { useInView } from "@/lib/useInView";
export default function SolarControl() {
  const {
    ref,
    isInView
  } = useInView();
  return <section className="py-20 md:py-28 bg-brand-dark" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* SVG sun diagram — LEFT */}
          <div className="flex justify-center" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "scale(1)" : "scale(0.9)",
          transition: "all 700ms"
        }}>
            <svg viewBox="0 0 280 220" className="w-full max-w-[280px]" aria-label="Diagrama de control solar">
              {/* Sun */}
              <circle cx="60" cy="40" r="22" fill="#DAA745" opacity="0.8">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* Sun rays */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => <line key={i} x1={60 + 28 * Math.cos(angle * Math.PI / 180)} y1={40 + 28 * Math.sin(angle * Math.PI / 180)} x2={60 + 38 * Math.cos(angle * Math.PI / 180)} y2={40 + 38 * Math.sin(angle * Math.PI / 180)} stroke="#DAA745" strokeWidth="1.5" opacity="0.5" strokeLinecap="round">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" begin={i * 0.25 + "s"} repeatCount="indefinite" />
                </line>)}

              {/* Incoming rays */}
              <line x1="80" y1="55" x2="170" y2="110" stroke="#DAA745" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
              <line x1="75" y1="60" x2="170" y2="130" stroke="#DAA745" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
              <line x1="70" y1="65" x2="170" y2="150" stroke="#DAA745" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />

              {/* Glass pane */}
              <rect x="170" y="80" width="12" height="120" rx="2" fill="#8B95A5" opacity="0.3" stroke="#8B95A5" strokeWidth="1" />
              {/* Enamel dots on glass */}
              {[90, 105, 120, 135, 150, 165, 180].map((y, i) => <circle key={i} cx="176" cy={y} r="3" fill="#DAA745" opacity="0.5" />)}

              {/* Reflected rays (bouncing back) */}
              <line x1="170" y1="115" x2="120" y2="90" stroke="#DAA745" strokeWidth="0.8" opacity="0.4" />
              <line x1="170" y1="135" x2="130" y2="160" stroke="#DAA745" strokeWidth="0.8" opacity="0.4" />
              <text x="110" y="80" className="text-[9px] fill-brand-accent" opacity="0.7">Reflected</text>

              {/* Transmitted (reduced) */}
              <line x1="182" y1="120" x2="240" y2="120" stroke="#8B95A5" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 3" />
              <text x="200" y="112" className="text-[9px] fill-white" opacity="0.4">Reduced</text>
              <text x="200" y="124" className="text-[9px] fill-white" opacity="0.4">transmission</text>

              {/* Labels */}
              <text x="45" y="85" className="text-[9px] fill-brand-accent">Solar</text>
              <text x="45" y="96" className="text-[9px] fill-brand-accent">radiation</text>
              <text x="190" y="210" className="text-[9px] fill-white" opacity="0.5">Vidrio esmaltado</text>
            </svg>
          </div>

          {/* Text — RIGHT */}
          <div style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateX(0)" : "translateX(20px)",
          transition: "all 700ms 150ms"
        }}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">Control Solar Integrado</h2>
            <div className="mt-5 space-y-4 text-white/60 leading-relaxed">
              <p>La capa de esmalte cerámico hace más que decorar: absorbe y refleja una parte significativa de la radiación solar entrante, reduciendo la ganancia de calor en el interior del edificio.</p>
              <p>Ajustando el <span className="text-brand-accent font-medium">patrón de cobertura</span> (tamaño de punto, espaciado, densidad del degradado), los arquitectos pueden ajustar con precisión el equilibrio entre la transmisión de luz natural y el sombreado solar.</p>
              <p>Combinado con recubrimiento de baja emisividad (Low-E) en una unidad de vidrio aislante, el vidrio esmaltado ofrece tanto <span className="text-brand-accent font-medium">impacto estético e impacto estético y ahorro energético medible</span>.</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}