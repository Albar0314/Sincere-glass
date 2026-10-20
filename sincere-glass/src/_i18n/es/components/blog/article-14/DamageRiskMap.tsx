'use client';

import { useState } from 'react';
interface Hotspot {
  id: string;
  label: string;
  cx: number; // on 400 x 220 viewBox
  cy: number;
  prevalence: string;
  cause: string;
  prevention: string;
}
const HOTSPOTS: Hotspot[] = [{
  id: 'edge-chip',
  label: "Astillado de bordes",
  cx: 110,
  cy: 170,
  prevalence: 'Industry baseline: 1–2 % of panels',
  cause: 'Crate edge contact without foam between panel and strap, or panel-to-panel contact during roll.',
  prevention: 'Full-perimeter foam gasket on every panel; non-woven interleaf sheets; strap tension checked at 2 % elongation.'
}, {
  id: 'corner-impact',
  label: "Impacto en esquinas",
  cx: 340,
  cy: 180,
  prevalence: 'Door-end panels: 2–4 %',
  cause: 'Forklift tine impact during unload, or door-slam shock at the destination port before container is spotted.',
  prevention: 'Door-end panels get corner-post guards; the loading diagram puts lowest-value SKUs at the door end.'
}, {
  id: 'stacking-crush',
  label: "Aplastamiento por apilamiento",
  cx: 200,
  cy: 55,
  prevalence: 'Horizontal pallet loads: 3–5 %',
  cause: 'Horizontal stacking of large panels places compression load on bottom panels; 20′ roll amplifies micro-cracks.',
  prevention: 'Ban horizontal stacking over 1.5 m longest side; mandate vertical crating for anything above 6 mm.'
}, {
  id: 'condensation',
  label: "Condensación / manchas",
  cx: 200,
  cy: 30,
  prevalence: 'Trans-Pacific laminated: 1–3 %',
  cause: 'Diurnal temperature swing in a sealed container reaches 25 °C; moisture condenses on the ceiling and drips onto glass.',
  prevention: 'Minimum 2 kg desiccant bags per 20′ (4 kg per 40′); ceiling vapor liner; interleaf acidity-paper barrier.'
}, {
  id: 'humidity',
  label: "Hinchazón por humedad",
  cx: 200,
  cy: 200,
  prevalence: 'Wooden-box shipments to tropical ports: 0.5–1 %',
  cause: 'Pinewood crates absorb moisture, expand, and press on panels inside the enclosure.',
  prevention: 'Kiln-dried pinewood only (<18 % MC); internal foam liner that compresses rather than resists.'
}, {
  id: 'door-slam',
  label: "Golpe por cierre brusco de puerta",
  cx: 360,
  cy: 110,
  prevalence: 'Any shipment with no load bars: up to 2 %',
  cause: 'Even properly tensioned ratchet straps go slack during the first 300 km of road transport.',
  prevention: 'Install 2 load bars at the door end; re-tension straps after road arrival but before container seal.'
}];
export default function DamageRiskMap() {
  const [active, setActive] = useState<Hotspot | null>(HOTSPOTS[0]);
  return <section className="my-10 rounded-2xl border border-[#3A4250]/50 bg-[#3A4250]/10 overflow-hidden">
      <header className="px-6 py-5 border-b border-[#3A4250]/40">
        <h3 className="text-lg font-semibold text-[#F2F0ED] m-0">Mapa de Riesgo de Daños</h3>
        <p className="text-sm text-[#8B95A5] m-0 mt-1">Las 6 zonas de daño dentro de un contenedor cargado, sus causas de origen y cómo diseñamos el embalaje para eliminar cada una.</p>
      </header>

      <div className="grid md:grid-cols-[1fr_300px]">
        <div className="p-6 border-b md:border-b-0 md:border-r border-[#3A4250]/40">
          <div className="relative w-full">
            <svg viewBox="0 0 400 220" className="w-full h-auto" role="img" aria-label="Sección transversal del contenedor con 6 puntos críticos de daño">
              {/* Container outline */}
              <rect x="30" y="25" width="340" height="170" fill="none" stroke="#3A4250" strokeWidth="2" rx="6" />
              <line x1="30" y1="40" x2="370" y2="40" stroke="#3A4250" strokeWidth="1" opacity="0.5" />
              <line x1="30" y1="180" x2="370" y2="180" stroke="#3A4250" strokeWidth="1" opacity="0.5" />
              {/* Door end */}
              <line x1="350" y1="25" x2="350" y2="195" stroke="#DAA745" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
              <text x="358" y="110" fill="#8B95A5" fontSize="8" transform="rotate(90 358 110)">EXTREMO DE PUERTAS</text>
              {/* Glass stack silhouettes */}
              <rect x="60" y="60" width="18" height="110" fill="#8B95A5" opacity="0.3" />
              <rect x="85" y="60" width="18" height="110" fill="#8B95A5" opacity="0.3" />
              <rect x="140" y="55" width="18" height="115" fill="#8B95A5" opacity="0.35" />
              <rect x="165" y="55" width="18" height="115" fill="#8B95A5" opacity="0.35" />
              <rect x="220" y="60" width="18" height="110" fill="#8B95A5" opacity="0.3" />
              <rect x="245" y="60" width="18" height="110" fill="#8B95A5" opacity="0.3" />
              <rect x="300" y="65" width="18" height="105" fill="#8B95A5" opacity="0.3" />

              {/* Hotspots */}
              {HOTSPOTS.map(h => {
              const isActive = active?.id === h.id;
              return <g key={h.id} className="cursor-pointer" onClick={() => setActive(h)} onMouseEnter={() => setActive(h)}>
                    <circle cx={h.cx} cy={h.cy} r={isActive ? 10 : 7} fill="#DAA745" opacity={isActive ? 0.9 : 0.6} />
                    <circle cx={h.cx} cy={h.cy} r={isActive ? 14 : 11} fill="none" stroke="#DAA745" strokeWidth="1.5" opacity={isActive ? 0.6 : 0.3} />
                    <text x={h.cx} y={h.cy + 3} textAnchor="middle" fontSize="8" fill="#1C1F26" fontWeight="700">{HOTSPOTS.indexOf(h) + 1}</text>
                  </g>;
            })}
            </svg>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5">
            {HOTSPOTS.map((h, i) => <button key={h.id} onClick={() => setActive(h)} onMouseEnter={() => setActive(h)} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-left text-xs transition-colors ${active?.id === h.id ? 'border-[#DAA745] bg-[#DAA745]/10 text-[#F2F0ED]' : 'border-[#3A4250]/40 bg-[#1C1F26] text-[#8B95A5] hover:border-[#DAA745]/40'}`}>
                <span className="w-5 h-5 rounded-full bg-[#DAA745] text-[#1C1F26] text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <span className="truncate">{h.label}</span>
              </button>)}
          </div>
        </div>

        <div className="p-6">
          {active && <div>
              <div className="text-xs text-[#DAA745] uppercase tracking-wider font-semibold mb-2">Zone {HOTSPOTS.indexOf(active) + 1}</div>
              <h4 className="text-lg font-semibold text-[#F2F0ED] m-0 mb-2">{active.label}</h4>
              <div className="text-xs text-[#8B95A5] mb-4">{active.prevalence}</div>

              <div className="mb-4">
                <div className="text-xs text-[#8B95A5] uppercase tracking-wider font-semibold mb-1">Cause</div>
                <p className="text-sm text-[#F2F0ED] leading-relaxed m-0">{active.cause}</p>
              </div>

              <div>
                <div className="text-xs text-[#DAA745] uppercase tracking-wider font-semibold mb-1">Nuestra prevención</div>
                <p className="text-sm text-[#F2F0ED] leading-relaxed m-0">{active.prevention}</p>
              </div>
            </div>}
        </div>
      </div>
    </section>;
}