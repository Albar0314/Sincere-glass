"use client";

import { useState } from "react";

/**
 * Interactive curvature visualizer. User drags a slider to set the curve
 * radius (300-5000mm) and sees a glass panel bend to that radius in real
 * time. The viewer sees four zones: below 500mm the radius is beyond
 * Sincere's capability (red); 500-800mm requires a custom mold and sits
 * inside Sincere's specialty window (green, highlighted); 800-3000mm is
 * standard furnace work (green); above 3000mm cold-bending becomes an
 * option (blue). Rendered as SVG so it is crawlable by AI readers that
 * do not execute JavaScript.
 */

type Zone = {
  label: string;
  verdict: string;
  color: string;
  bg: string;
  process: string;
};
function getZone(r: number): Zone {
  if (r < 500) {
    return {
      label: "Below capability",
      verdict: "Radius below our 500 mm minimum. Request a feasibility review.",
      color: "#dc2626",
      bg: "rgba(220,38,38,0.1)",
      process: "Not available"
    };
  }
  if (r < 800) {
    return {
      label: "Tight-radius specialty",
      verdict: "Hot-bending with a dedicated mold. Our tightest achievable range.",
      color: "#DAA745",
      bg: "rgba(218,167,69,0.15)",
      process: "Hot-bend + custom mold"
    };
  }
  if (r < 3000) {
    return {
      label: "Standard hot-bending",
      verdict: "Routine hot-bending in our tempering furnace. Short lead time.",
      color: "#059669",
      bg: "rgba(5,150,105,0.1)",
      process: "Hot-bend furnace"
    };
  }
  if (r < 5000) {
    return {
      label: "Gentle curve",
      verdict: "Either hot-bending or cold-bending on site, depending on load case.",
      color: "#0369a1",
      bg: "rgba(3,105,161,0.1)",
      process: "Hot-bend or cold-bend"
    };
  }
  return {
    label: "Shallow curve",
    verdict: "Cold-bending on site is usually the most economical choice.",
    color: "#0369a1",
    bg: "rgba(3,105,161,0.1)",
    process: "Cold-bend on site"
  };
}
export default function CurvatureVisualizer() {
  const [radius, setRadius] = useState<number>(500);
  const zone = getZone(radius);

  // Convert radius (mm) to an on-canvas curve. The SVG viewBox is 400×240.
  // Chord length is fixed at 320 so visual comparison between radii is intuitive.
  const chord = 320;
  const rNorm = Math.max(radius, 300);
  // Approximate sagitta for display; clamp so the arc stays inside the viewBox.
  const sag = Math.min(110, rNorm - Math.sqrt(Math.max(rNorm * rNorm - chord * chord / 4, 0)) * (320 / Math.max(rNorm, 320)));
  const sagClamped = Math.max(4, sag);
  const startX = 40;
  const endX = startX + chord;
  const baseY = 180;
  const topY = baseY - sagClamped;
  // Quadratic curve control-point X at midpoint
  const ctrlX = (startX + endX) / 2;
  const ctrlY = topY - sagClamped;
  return <div className="rounded-2xl bg-white border border-gray-200 p-6 md:p-8 shadow-sm">
      <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
        <div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-brand-dark">
            Visualizador de Curvatura
          </h3>
          <p className="text-sm text-brand-muted mt-1">
            Desplace el control deslizante de radio. El vidrio se curva en tiempo real; el panel de resultados se actualiza con el proceso recomendado.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider" style={{
        color: zone.color,
        backgroundColor: zone.bg
      }}>
          {zone.label}
        </div>
      </div>

      {/* SVG canvas */}
      <div className="rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 p-4">
        <svg viewBox="0 0 400 240" className="w-full h-auto" role="img" aria-label={"Curved glass panel preview at " + radius + " millimeter radius"}>
          {/* Reference ground line */}
          <line x1="20" y1="200" x2="380" y2="200" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" />

          {/* Center axis marker */}
          <line x1="200" y1="30" x2="200" y2="210" stroke="#F3F4F6" strokeWidth="1" />

          {/* Glass panel - curved as quadratic bezier */}
          <path d={`M ${startX} ${baseY} Q ${ctrlX} ${ctrlY} ${endX} ${baseY}`} fill="none" stroke={zone.color} strokeWidth="6" strokeLinecap="round" />
          {/* Transparent gradient fill below the curve for 'glass' effect */}
          <path d={`M ${startX} ${baseY} Q ${ctrlX} ${ctrlY} ${endX} ${baseY} L ${endX} ${baseY + 12} Q ${ctrlX} ${ctrlY + 12} ${startX} ${baseY + 12} Z`} fill={zone.color} opacity="0.15" />

          {/* Chord dimension line */}
          <line x1={startX} y1={baseY + 24} x2={endX} y2={baseY + 24} stroke="#9CA3AF" strokeWidth="1" />
          <line x1={startX} y1={baseY + 20} x2={startX} y2={baseY + 28} stroke="#9CA3AF" strokeWidth="1" />
          <line x1={endX} y1={baseY + 20} x2={endX} y2={baseY + 28} stroke="#9CA3AF" strokeWidth="1" />
          <text x={(startX + endX) / 2} y={baseY + 38} textAnchor="middle" className="text-[10px]" fill="#6B7280">
            chord
          </text>

          {/* Sagitta measurement (dashed) */}
          <line x1={ctrlX + 4} y1={baseY} x2={ctrlX + 4} y2={topY + sagClamped / 2} stroke="#9CA3AF" strokeWidth="1" strokeDasharray="2 2" />
          <text x={ctrlX + 10} y={(baseY + topY) / 2 + 4} className="text-[10px]" fill="#6B7280">
            sag
          </text>

          {/* Radius label */}
          <text x="200" y="25" textAnchor="middle" className="text-sm font-semibold" fill={zone.color}>
            R = {radius} mm
          </text>
        </svg>
      </div>

      {/* Slider */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-brand-muted mb-2 font-medium">
          <span>300 mm (no alcanzable)</span>
          <span>5000 mm (curvatura suave)</span>
        </div>
        <input type="range" min={300} max={5000} step={25} value={radius} onChange={e => setRadius(parseInt(e.target.value, 10))} className="w-full accent-brand-accent cursor-pointer" aria-label="Radio de curvatura en milímetros" />

        {/* Zone bands under slider */}
        <div className="relative mt-2 h-2 rounded-full overflow-hidden bg-gray-100">
          {/* 300-500 red (200/4700 width) */}
          <div className="absolute left-0 h-full bg-red-500/60" style={{
          width: `${200 / 4700 * 100}%`
        }} />
          {/* 500-800 amber (sincere specialty) */}
          <div className="absolute h-full bg-brand-accent/80" style={{
          left: `${200 / 4700 * 100}%`,
          width: `${300 / 4700 * 100}%`
        }} />
          {/* 800-3000 green */}
          <div className="absolute h-full bg-emerald-500/60" style={{
          left: `${500 / 4700 * 100}%`,
          width: `${2200 / 4700 * 100}%`
        }} />
          {/* 3000-5000 blue */}
          <div className="absolute h-full bg-sky-500/60" style={{
          left: `${2700 / 4700 * 100}%`,
          width: `${2000 / 4700 * 100}%`
        }} />
        </div>
        <div className="flex justify-between text-[10px] text-brand-muted mt-1">
          <span>{"<500"}</span>
          <span>500-800 (especialidad)</span>
          <span>800-3000 (estándar)</span>
          <span>{">3000 (suave)"}</span>
        </div>
      </div>

      {/* Verdict panel */}
      <div className="mt-6 rounded-lg p-4 border-l-4" style={{
      borderLeftColor: zone.color,
      backgroundColor: zone.bg
    }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-brand-muted mb-1">
              Proceso recomendado
            </p>
            <p className="text-base font-semibold text-brand-dark">{zone.process}</p>
          </div>
          <div className="text-sm text-brand-dark/80 max-w-md">{zone.verdict}</div>
        </div>
      </div>

      {/* Footnote */}
      <p className="mt-4 text-xs text-brand-muted leading-relaxed">
        Nuestro radio mínimo alcanzable es <strong>500 mm</strong> para hojas de 6 mm. Los radios más cerrados requieren vidrio de menor espesor o una construcción en dos piezas. Verificado: 2026-10-23.
      </p>
    </div>;
}