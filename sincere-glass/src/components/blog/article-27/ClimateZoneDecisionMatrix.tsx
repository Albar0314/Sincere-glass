"use client";

import { useState } from "react";

type Zone = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type Priority = "energy" | "comfort" | "noise" | "condensation";

interface Verdict {
  recommendation: "recommended" | "worth-considering" | "not-recommended";
  headline: string;
  reasoning: string;
  alternative?: string;
}

const ZONE_INFO: Record<Zone, { name: string; examples: string; hdd: number }> = {
  1: { name: "Zone 1 (very hot)",   examples: "Miami, Singapore, Dubai",     hdd: 300 },
  2: { name: "Zone 2 (hot)",        examples: "Houston, Phoenix, Mumbai",    hdd: 700 },
  3: { name: "Zone 3 (warm)",       examples: "Los Angeles, Atlanta, Sydney", hdd: 1800 },
  4: { name: "Zone 4 (mixed)",      examples: "Washington DC, Tokyo, Madrid", hdd: 3200 },
  5: { name: "Zone 5 (cool)",       examples: "Chicago, Boston, Berlin",      hdd: 5200 },
  6: { name: "Zone 6 (cold)",       examples: "Minneapolis, Moscow, Stockholm", hdd: 7000 },
  7: { name: "Zone 7 (very cold)",  examples: "Winnipeg, Helsinki, Edmonton",  hdd: 8500 },
  8: { name: "Zone 8 (subarctic)",  examples: "Fairbanks, Yakutsk, Norilsk",   hdd: 10000 },
};

function verdictFor(zone: Zone, priority: Priority): Verdict {
  // Priority: energy
  if (priority === "energy") {
    if (zone >= 6) return {
      recommendation: "recommended",
      headline: "Triple pane is the energy-optimal choice",
      reasoning: "With 7,000+ heating degree days, the conductive heat loss through a double-pane IGU is large enough that the ~50% U-factor reduction pays back inside 8-12 years at typical fuel prices.",
    };
    if (zone === 5) return {
      recommendation: "worth-considering",
      headline: "Triple pane is justifiable; marginal on strict ROI",
      reasoning: "Zone 5 (~5,200 HDD) sits on the boundary. Triple pays back in 12-18 years at typical North American gas prices, faster where gas is expensive or electricity is the heating fuel.",
      alternative: "A premium double-pane IGU (low-E on surface 3 + argon + warm-edge spacer) can hit U = 1.4 and is often the smarter spend in Zone 5.",
    };
    if (zone === 4) return {
      recommendation: "worth-considering",
      headline: "Marginal case; cooling benefit helps slightly",
      reasoning: "Zone 4 has significant heating and cooling demand. Triple pane's benefit is diluted by cooling-dominated hours; payback typically 15-25 years.",
      alternative: "Look at window-to-wall ratio and shading first. A quality double-pane with Low-E tuned to climate (low SHGC south-facing) often wins.",
    };
    if (zone === 3) return {
      recommendation: "not-recommended",
      headline: "Energy savings do not justify the premium",
      reasoning: "Zone 3 has ~1,800 HDD and dominant cooling demand. Triple pane saves little heating energy and the reduced VT can increase daylight-driven lighting load.",
      alternative: "Invest in a solar-control Low-E double-pane IGU with low SHGC. Better performance per dollar in cooling-dominated climates.",
    };
    return {
      recommendation: "not-recommended",
      headline: "Avoid triple pane in hot climates",
      reasoning: "Zones 1-2 are cooling-dominated. Triple pane blocks slightly more solar heat but the premium is better spent on a tuned solar-control coating, external shading, or higher-performance frames.",
      alternative: "Spectrally-selective Low-E double-pane IGU with SHGC 0.25-0.30 and VT 0.65+. Match the glazing to the sun, not the cold.",
    };
  }

  // Priority: comfort (cold-surface radiant discomfort near windows)
  if (priority === "comfort") {
    if (zone >= 5) return {
      recommendation: "recommended",
      headline: "Triple pane noticeably improves window-side comfort",
      reasoning: "In zones 5+, winter interior pane surface stays 3-5 C warmer with triple pane vs double. The 'cold wall' radiant effect near windows largely disappears; you can place seating or desks right by the glass.",
    };
    if (zone === 4) return {
      recommendation: "worth-considering",
      headline: "Comfort improvement is real but modest",
      reasoning: "The warmer pane surface is noticeable during cold snaps. If occupants spend hours seated near large glass areas, it may be worth the premium.",
    };
    return {
      recommendation: "not-recommended",
      headline: "Comfort benefit is negligible in warm climates",
      reasoning: "Interior pane surface temperatures are already comfortable with a quality double-pane IGU in zones 1-3.",
    };
  }

  // Priority: noise
  if (priority === "noise") {
    return {
      recommendation: "not-recommended",
      headline: "Triple pane is the wrong tool for noise reduction",
      reasoning: "Adding a third symmetric pane barely moves STC (32 to 35 at best). Noise reduction needs mass asymmetry, not more identical lites.",
      alternative: "A laminated-glass IGU (6mm laminated + 12mm air + 6mm, or dissimilar thicknesses) delivers STC 38-42. For heavy noise, use acoustic PVB interlayer.",
    };
  }

  // Priority: condensation
  if (priority === "condensation") {
    if (zone >= 5) return {
      recommendation: "recommended",
      headline: "Triple pane effectively eliminates window condensation",
      reasoning: "Warmer interior pane surface stays above dew point in all but extreme humid-cold conditions. The #1 reason northern European and Canadian specs go triple.",
    };
    if (zone === 4) return {
      recommendation: "worth-considering",
      headline: "Helpful if indoor humidity runs high",
      reasoning: "Spaces with high internal moisture (kitchens, bathrooms, swimming pools, humidified residences in winter) benefit. Standard residential in Zone 4 is usually fine with premium double-pane + warm-edge spacer.",
    };
    return {
      recommendation: "not-recommended",
      headline: "Condensation is rarely a problem here",
      reasoning: "Warm climates see condensation only in extreme indoor-cool / outdoor-warm cases (over-cooled stores in humid summers). Double pane handles it.",
    };
  }

  return {
    recommendation: "not-recommended",
    headline: "No verdict",
    reasoning: "No matching rule.",
  };
}

const toneClass: Record<Verdict["recommendation"], string> = {
  "recommended":       "border-emerald-500 bg-emerald-50",
  "worth-considering": "border-amber-500 bg-amber-50",
  "not-recommended":   "border-slate-400 bg-slate-50",
};
const badgeClass: Record<Verdict["recommendation"], string> = {
  "recommended":       "bg-emerald-600 text-white",
  "worth-considering": "bg-amber-600 text-white",
  "not-recommended":   "bg-slate-500 text-white",
};
const badgeLabel: Record<Verdict["recommendation"], string> = {
  "recommended":       "Recommended",
  "worth-considering": "Worth considering",
  "not-recommended":   "Not recommended",
};

export default function ClimateZoneDecisionMatrix() {
  const [zone, setZone] = useState<Zone>(5);
  const [priority, setPriority] = useState<Priority>("energy");

  const result = verdictFor(zone, priority);

  return (
    <div className="my-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-1 text-lg font-semibold text-slate-900">Triple Pane: Climate Zone x Priority Decision Matrix</h3>
      <p className="mb-5 text-sm text-slate-600">
        Pick your climate zone and your top priority. Verdict reflects the dominant reason to spend (or not spend) the triple-pane premium.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div>
          <div className="text-xs font-medium text-slate-700 mb-2">Climate zone (IECC)</div>
          <div className="grid grid-cols-4 gap-1">
            {([1, 2, 3, 4, 5, 6, 7, 8] as Zone[]).map((z) => (
              <button
                key={z}
                onClick={() => setZone(z)}
                className={`rounded-lg border px-2 py-2 text-sm font-medium transition ${
                  zone === z
                    ? "border-amber-500 bg-amber-500 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                {z}
              </button>
            ))}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            <strong>{ZONE_INFO[zone].name}:</strong> {ZONE_INFO[zone].examples}
            <br />Approx. {ZONE_INFO[zone].hdd.toLocaleString()} heating degree days.
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-700 mb-2">Top priority</div>
          <div className="grid grid-cols-2 gap-2">
            {([
              { key: "energy",       label: "Energy / cost" },
              { key: "comfort",      label: "Window-side comfort" },
              { key: "noise",        label: "Noise reduction" },
              { key: "condensation", label: "No condensation" },
            ] as const).map((p) => (
              <button
                key={p.key}
                onClick={() => setPriority(p.key)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium text-left transition ${
                  priority === p.key
                    ? "border-amber-500 bg-amber-500 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`rounded-xl border-2 p-5 ${toneClass[result.recommendation]}`}>
        <div className="mb-2 flex items-center gap-2 flex-wrap">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass[result.recommendation]}`}>
            {badgeLabel[result.recommendation]}
          </span>
          <span className="text-sm text-slate-600">
            Zone {zone} / Priority: {priority}
          </span>
        </div>
        <div className="text-base font-semibold text-slate-900 mb-2">{result.headline}</div>
        <div className="text-sm text-slate-700 mb-2">{result.reasoning}</div>
        {result.alternative && (
          <div className="mt-3 rounded-lg bg-white/70 p-3 text-sm">
            <strong>Alternative spend:</strong> {result.alternative}
          </div>
        )}
      </div>

      <div className="mt-3 text-xs text-slate-500 italic">
        Verdicts reflect typical specification practice in each zone. Project-specific factors (passive house targets, net-zero codes, premium frames)
        can shift the answer. For custom specs, request a project quote.
      </div>
    </div>
  );
}
