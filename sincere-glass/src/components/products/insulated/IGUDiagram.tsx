"use client";
import { useInView } from "@/lib/useInView";

export default function IGUDiagram() {
  const { ref, isInView } = useInView();

  return (
    <section id="how-igu-works" className="py-16 md:py-24 bg-white scroll-mt-20" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(-20px)", transition: "all 700ms" }}>
            <svg viewBox="0 0 320 300" className="w-full max-w-[320px] mx-auto" aria-label="Insulated glass unit cross-section diagram">
              {/* Outer pane */}
              <rect x="40" y="30" width="30" height="240" rx="2" fill="#8B95A5" opacity="0.3" stroke="#8B95A5" strokeWidth="1"/>
              <text x="55" y="158" textAnchor="middle" transform="rotate(-90, 55, 158)" className="fill-brand-dark text-[10px] font-medium">Outer pane</text>

              {/* Spacer bar */}
              <rect x="70" y="30" width="8" height="240" rx="1" fill="#DAA745" opacity="0.5" stroke="#DAA745" strokeWidth="0.5"/>
              <rect x="182" y="30" width="8" height="240" rx="1" fill="#DAA745" opacity="0.5" stroke="#DAA745" strokeWidth="0.5"/>

              {/* Gas fill area */}
              <rect x="78" y="30" width="104" height="240" fill="#4A9DB8" opacity="0.08"/>
              <text x="130" y="145" textAnchor="middle" className="fill-brand-secondary text-[11px]">Air or Argon</text>
              <text x="130" y="162" textAnchor="middle" className="fill-brand-secondary text-[9px] opacity-60">gas fill</text>

              {/* Inner pane */}
              <rect x="190" y="30" width="30" height="240" rx="2" fill="#8B95A5" opacity="0.3" stroke="#8B95A5" strokeWidth="1"/>
              <text x="205" y="158" textAnchor="middle" transform="rotate(-90, 205, 158)" className="fill-brand-dark text-[10px] font-medium">Inner pane</text>

              {/* Seal indicators */}
              <rect x="70" y="30" width="120" height="6" rx="1" fill="#DAA745" opacity="0.3"/>
              <rect x="70" y="264" width="120" height="6" rx="1" fill="#DAA745" opacity="0.3"/>
              <text x="130" y="24" textAnchor="middle" className="fill-brand-accent text-[9px]">Dual seal (PIB + silicone)</text>
              <text x="130" y="284" textAnchor="middle" className="fill-brand-accent text-[9px]">Dual seal (PIB + silicone)</text>

              {/* Low-E coating indicator */}
              <line x1="188" y1="50" x2="188" y2="250" stroke="#DAA745" strokeWidth="1.5" strokeDasharray="4 3"/>
              <text x="240" y="90" className="fill-brand-accent text-[9px]">Low-E</text>
              <text x="240" y="102" className="fill-brand-accent text-[9px]">coating</text>
              <line x1="222" y1="96" x2="190" y2="96" stroke="#DAA745" strokeWidth="0.5" strokeDasharray="2 2"/>

              {/* Dimension */}
              <line x1="70" y1="290" x2="190" y2="290" stroke="#8B95A5" strokeWidth="0.5"/>
              <line x1="70" y1="286" x2="70" y2="294" stroke="#8B95A5" strokeWidth="0.5"/>
              <line x1="190" y1="286" x2="190" y2="294" stroke="#8B95A5" strokeWidth="0.5"/>
              <text x="130" y="300" textAnchor="middle" className="fill-brand-muted text-[9px]">6–20mm spacer</text>
            </svg>
          </div>

          <div style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateX(0)" : "translateX(20px)", transition: "all 700ms 150ms" }}>
            <h3 className="font-display text-xl md:text-2xl font-bold text-brand-dark">How an IGU Works</h3>
            <div className="mt-4 space-y-3 text-sm text-brand-muted leading-relaxed">
              <p>Two or more glass panes are separated by a spacer bar and hermetically sealed. The sealed cavity traps a layer of still air or inert gas (argon) that resists heat conduction and convection.</p>
              <p>The <span className="text-brand-accent font-medium">dual-seal system</span> uses a PIB (polyisobutylene) primary seal for gas retention and a structural silicone secondary seal for mechanical strength and moisture resistance.</p>
              <p>An optional <span className="text-brand-accent font-medium">Low-E coating</span> on surface #3 (inner face of the outer pane) reflects long-wave infrared radiation back into the room in winter and away from the building in summer.</p>
              <p>The result: U-values as low as <span className="text-brand-dark font-medium">1.4 W/m²·K</span> — a 60–70% improvement over single glazing.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
