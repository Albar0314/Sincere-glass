"use client";

import { useState } from "react";

/**
 * Project-type advisor. User picks one of six common architectural
 * scenarios where the curved-vs-flat question comes up, and the panel
 * returns a specific recommendation (curved, flat, or hybrid), the
 * reasoning, the typical build-up we quote, and the cost delta range
 * against the flat baseline. Values come from the Sincere Glass export
 * quote history (2023-2026) and are indicative, not quotation-grade.
 * SSR shadow sits in the article prose just before this component.
 */

type Fit = "curved" | "flat" | "hybrid";
type Scenario = {
  key: string;
  label: string;
  description: string;
  fit: Fit;
  recommendation: string;
  buildup: string;
  deltaPct: string;
  reasoning: string[];
};
const SCENARIOS: Scenario[] = [{
  key: "panoramic-lift",
  label: "Ascensor panorámico / ascensor de vidrio",
  description: "Caja de ascensor totalmente acristalada en el atrio de un hotel o vestíbulo de oficinas.",
  fit: "curved",
  recommendation: "Curved tempered, single-axis cylindrical.",
  buildup: "10 mm or 12 mm curved tempered, R = 1,500-2,500 mm",
  deltaPct: "+90-130% vs flat",
  reasoning: ["The shaft geometry physically demands cylindrical panels — no mitred-flat approximation reads correctly from inside the lift car.", "A single panel can span up to 15 m vertically on our line, eliminating horizontal joints.", "This is one of the few applications where curved is almost always the right answer regardless of budget."]
}, {
  key: "curtain-wall",
  label: "Muro cortina curvo de varios pisos",
  description: "Torre de oficinas o fachada de aeropuerto con una geometría de planta curvilínea.",
  fit: "hybrid",
  recommendation: "Hybrid: curved at ground-floor focal zones, faceted flat panels above.",
  buildup: "Ground floor: 8+1.52+8 curved laminated. Upper floors: flat IGU with Low-E.",
  deltaPct: "+25-45% blended vs full-flat",
  reasoning: ["At viewing distances over 15 m the human eye reads faceted flat as curved; the premium is wasted on upper floors.", "Ground-floor street-level glass is where visual continuity actually matters to pedestrians.", "Keeps the project within budget without compromising the design intent at the focal zones."]
}, {
  key: "canopy",
  label: "Marquesina de entrada / porte-cochere",
  description: "Cubierta de curva suave en voladizo sobre la entrada de un edificio.",
  fit: "curved",
  recommendation: "Cold-bent laminated glass (shallow radius).",
  buildup: "6+1.52+6 laminated, R = 5,000-15,000 mm, cold-bent on-site",
  deltaPct: "+30-60% vs flat",
  reasoning: ["The gentle radius is cost-effective because cold-bending uses flat panels bent into curved frames on site.", "Overhead safety requires laminated regardless of flat or curved.", "The visual payoff is high because the canopy sits directly above the viewer and reads prominently from street level."]
}, {
  key: "boutique-shopfront",
  label: "Escaparate de comercio boutique",
  description: "Fachada de tienda de lujo con escaparate curvo.",
  fit: "curved",
  recommendation: "Curved tempered or curved laminated, single-axis.",
  buildup: "10 mm or 12 mm curved tempered, R = 2,000-4,000 mm",
  deltaPct: "+70-110% vs flat",
  reasoning: ["Retail flagship facades are judged by brand positioning, not cost per square meter.", "A single curved panel reads unmistakably premium; faceted flat reads as value engineering.", "The glass area is usually small (10-40 m2) so the absolute premium stays modest."]
}, {
  key: "office-perimeter",
  label: "Fachada perimetral estándar de oficinas",
  description: "Planta rectangular, fachada recta o ligeramente escalonada.",
  fit: "flat",
  recommendation: "Flat tempered or flat laminated IGU with Low-E.",
  buildup: "6+1.52+6 or 8+1.52+8 flat laminated IGU",
  deltaPct: "Baseline (0%)",
  reasoning: ["No geometric or visual demand that curved glass solves.", "Flat Low-E IGU delivers the thermal and acoustic performance the project actually needs.", "Curved glass here would add 60-200 percent cost for zero project benefit."]
}, {
  key: "sculptural-feature",
  label: "Muro de acento escultórico de forma libre",
  description: "Elemento arquitectónico singular, museo o edificio cívico.",
  fit: "curved",
  recommendation: "Free-form curved tempered, custom-mold per panel.",
  buildup: "Varies — custom CNC mold per unique panel profile",
  deltaPct: "+150-250% vs flat",
  reasoning: ["The design intent is the glass itself; the geometry has no flat equivalent.", "Expect a 45-70 day lead time from approved 3D model to delivery because of mold casting.", "MOQ of 4+ panels per unique profile keeps per-unit mold cost reasonable."]
}];
const FIT_STYLE: Record<Fit, {
  label: string;
  color: string;
  bg: string;
}> = {
  curved: {
    label: "Curvado recomendado",
    color: "#DAA745",
    bg: "rgba(218,167,69,0.1)"
  },
  flat: {
    label: "Plano recomendado",
    color: "#059669",
    bg: "rgba(5,150,105,0.1)"
  },
  hybrid: {
    label: "Enfoque híbrido",
    color: "#0369a1",
    bg: "rgba(3,105,161,0.1)"
  }
};
export default function ProjectFitAdvisor() {
  const [activeKey, setActiveKey] = useState<string>(SCENARIOS[0].key);
  const active = SCENARIOS.find(s => s.key === activeKey) || SCENARIOS[0];
  const style = FIT_STYLE[active.fit];
  return <div className="rounded-2xl bg-white border border-gray-200 p-6 md:p-8 shadow-sm my-6">
      <div className="mb-5">
        <p className="text-[#DAA745] text-sm font-semibold uppercase tracking-wider mb-2">
          Adecuación al proyecto
        </p>
        <h3 className="font-display text-xl md:text-2xl font-bold text-[#1C1F26]">
          Seis escenarios, seis veredictos
        </h3>
        <p className="text-sm text-[#8B95A5] mt-2">
          Seleccione el tipo de proyecto más cercano al suyo. El panel se actualiza con la composición recomendada y el rango de variación de costes según nuestro historial de cotizaciones de exportación.
        </p>
      </div>

      {/* Scenario picker */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-5">
        {SCENARIOS.map(s => <button key={s.key} type="button" onClick={() => setActiveKey(s.key)} className={"text-left px-3 py-3 rounded-lg text-xs md:text-sm font-medium transition-all border-2 " + (s.key === activeKey ? "border-[#DAA745] bg-[#DAA745]/5 text-[#1C1F26]" : "border-transparent bg-gray-50 text-[#8B95A5] hover:bg-gray-100 hover:text-[#1C1F26]")}>
            {s.label}
          </button>)}
      </div>

      {/* Detail panel */}
      <div className="rounded-xl p-5 border-l-4" style={{
      borderLeftColor: style.color,
      backgroundColor: style.bg
    }}>
        <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
          <div>
            <p className="text-xs italic text-[#8B95A5] mb-1">{active.description}</p>
            <h4 className="font-display font-bold text-[#1C1F26] text-lg">{active.label}</h4>
          </div>
          <div className="px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider" style={{
          color: style.color,
          backgroundColor: style.color + "22"
        }}>
            {style.label}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-[#8B95A5] font-semibold mb-1">Recommendation</p>
            <p className="text-sm text-[#1C1F26]/85">{active.recommendation}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-[#8B95A5] font-semibold mb-1">Composición típica</p>
            <p className="text-sm text-[#1C1F26]/85 font-mono">{active.buildup}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-[#8B95A5] font-semibold mb-1">Variación de costes</p>
            <p className="text-sm font-semibold" style={{
            color: style.color
          }}>{active.deltaPct}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-black/5">
          <p className="text-[11px] uppercase tracking-wider text-[#8B95A5] font-semibold mb-2">Por qué este veredicto</p>
          <ul className="space-y-1.5">
            {active.reasoning.map((r, i) => <li key={i} className="text-sm text-[#1C1F26]/85 flex items-start gap-2 leading-relaxed">
                <span className="mt-0.5" style={{
              color: style.color
            }}>&#9656;</span>
                <span>{r}</span>
              </li>)}
          </ul>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-[#8B95A5] leading-relaxed">
        Los rangos de variación de costes provienen del historial de cotizaciones de exportación de Sincere Glass 2023-2026 en proyectos comparables. El precio específico de cada proyecto requiere revisión de planos. Datos verificados: 2026-10-26.
      </p>
    </div>;
}