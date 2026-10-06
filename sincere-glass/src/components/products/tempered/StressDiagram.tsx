"use client";
import { useInView } from "@/lib/useInView";

export default function StressDiagram() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-16 md:py-24 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* SVG Diagram */}
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(-20px)", transition: "all 700ms" }}>
            <svg viewBox="0 0 300 260" className="w-full max-w-[300px] mx-auto" aria-label="Tempered glass stress distribution cross-section">
              {/* Glass cross-section */}
              <rect x="50" y="40" width="200" height="160" rx="4" fill="#3A4250" opacity="0.1" stroke="#3A4250" strokeWidth="1"/>

              {/* Compression zones (top and bottom) */}
              <rect x="50" y="40" width="200" height="35" rx="4" fill="#DAA745" opacity="0.25"/>
              <rect x="50" y="165" width="200" height="35" rx="4" fill="#DAA745" opacity="0.25"/>

              {/* Tension zone (center) */}
              <rect x="50" y="85" width="200" height="70" fill="#8B95A5" opacity="0.15"/>

              {/* Arrows — compression (inward) */}
              <line x1="30" y1="57" x2="48" y2="57" stroke="#DAA745" strokeWidth="2" markerEnd="url(#arrowG)"/>
              <line x1="270" y1="57" x2="252" y2="57" stroke="#DAA745" strokeWidth="2" markerEnd="url(#arrowG)"/>
              <line x1="30" y1="183" x2="48" y2="183" stroke="#DAA745" strokeWidth="2" markerEnd="url(#arrowG)"/>
              <line x1="270" y1="183" x2="252" y2="183" stroke="#DAA745" strokeWidth="2" markerEnd="url(#arrowG)"/>

              {/* Arrows — tension (outward) */}
              <line x1="148" y1="120" x2="130" y2="120" stroke="#8B95A5" strokeWidth="1.5" markerEnd="url(#arrowT)"/>
              <line x1="152" y1="120" x2="170" y2="120" stroke="#8B95A5" strokeWidth="1.5" markerEnd="url(#arrowT)"/>

              {/* Labels */}
              <text x="150" y="62" textAnchor="middle" className="fill-brand-accent text-[11px] font-medium">Compressive stress</text>
              <text x="150" y="124" textAnchor="middle" className="fill-brand-muted text-[10px]">Tensile stress</text>
              <text x="150" y="190" textAnchor="middle" className="fill-brand-accent text-[11px] font-medium">Compressive stress</text>

              {/* Dimension labels */}
              <text x="150" y="230" textAnchor="middle" className="fill-brand-muted text-[10px]">Glass cross-section</text>
              <text x="150" y="245" textAnchor="middle" className="fill-brand-muted text-[9px]">3.8mm – 19mm thickness</text>

              {/* Arrow markers */}
              <defs>
                <marker id="arrowG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M2 2L8 5L2 8" fill="none" stroke="#DAA745" strokeWidth="1.5" strokeLinecap="round"/>
                </marker>
                <marker id="arrowT" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M2 2L8 5L2 8" fill="none" stroke="#8B95A5" strokeWidth="1.5" strokeLinecap="round"/>
                </marker>
              </defs>
            </svg>
          </div>

          {/* Explanation */}
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(20px)", transition: "all 700ms 150ms" }}>
            <h3 className="font-display text-xl md:text-2xl font-bold text-brand-dark">The Science Behind the Strength</h3>
            <div className="mt-4 space-y-3 text-sm text-brand-muted leading-relaxed">
              <p>
                Rapid quenching creates <span className="text-brand-accent font-medium">compressive stress</span> on
                both surfaces of the glass, while the core retains <span className="text-brand-secondary font-medium">tensile stress</span>.
              </p>
              <p>
                These opposing forces are perfectly balanced. Any external impact must first overcome the compressive
                layer before the glass can break — which is why tempered glass withstands 4-5× more force than
                untreated glass.
              </p>
              <p>
                When that threshold is exceeded, the stored energy releases all at once — shattering the entire
                panel into small, blunt granules instead of a few lethal shards. This is by design: it is the safest
                possible failure mode.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
