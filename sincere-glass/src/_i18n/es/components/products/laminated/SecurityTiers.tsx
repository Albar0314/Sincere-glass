"use client";

import { useInView } from "@/lib/useInView";
import InlineQuoteCTA from "@/_i18n/es/components/products/InlineQuoteCTA";
const tiers = [{
  level: "Level 1",
  name: "Safety",
  config: "2-ply PVB (0.38mm)",
  protection: "Holds fragments on impact. Prevents fall-through.",
  use: "Skylights, overhead glazing, partitions",
  color: "border-l-green-500"
}, {
  level: "Level 2",
  name: "Security",
  config: "2-ply PVB (0.76–1.52mm)",
  protection: "Resists forced entry. Delays intruder by 60+ seconds.",
  use: "Storefronts, bank counters, ground-floor windows",
  color: "border-l-blue-500"
}, {
  level: "Level 3",
  name: "Hurricane",
  config: "Multi-ply SGP",
  protection: "Withstands windborne debris impact at hurricane speeds.",
  use: "Coastal buildings, storm-rated facades",
  color: "border-l-brand-accent"
}, {
  level: "Level 4",
  name: "Ballistic",
  config: "Multi-ply SGP (3+ layers)",
  protection: "Rated for specific ballistic threats. Tested per standards.",
  use: "Military, government buildings, VIP areas",
  color: "border-l-red-500"
}];
export default function SecurityTiers() {
  const {
    ref,
    isInView
  } = useInView({
    threshold: 0.1
  });
  return <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-12" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(16px)",
        transition: "all 600ms"
      }}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Niveles de Seguridad</h2>
          <p className="mt-4 text-brand-muted text-base md:text-lg">El vidrio laminado puede configurarse desde protección básica de seguridad hasta protección balística. Seleccione el nivel que requiere su proyecto.</p>
        </div>

        {/* Vertical tier cards with escalating left border */}
        <div className="space-y-4">
          {tiers.map((tier, i) => <div key={tier.level} className={"bg-brand-lighter rounded-xl p-5 md:p-6 border-l-4 " + tier.color + " transition-all duration-300 hover:shadow-sm"} style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateX(0)" : "translateX(-20px)",
          transition: "all 500ms",
          transitionDelay: 200 + i * 120 + "ms"
        }}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">{tier.level}</span>
                  <h3 className="font-display text-lg font-bold text-brand-dark">{tier.name}</h3>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-brand-muted mb-0.5">Configuration</p>
                    <p className="text-brand-dark font-medium">{tier.config}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-muted mb-0.5">Protection</p>
                    <p className="text-brand-dark">{tier.protection}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-muted mb-0.5">Uso típico</p>
                    <p className="text-brand-dark">{tier.use}</p>
                  </div>
                </div>
              </div>
            </div>)}
        </div>

        <div className="mt-8">
          <InlineQuoteCTA text="Not sure which security level you need? Describe your project and we will recommend." product="laminated" />
        </div>
      </div>
    </section>;
}