// src/components/tools/MaxPanelSizeTool.tsx
// Standalone version of MaxPanelSizeCalculator for /tools/ pages.
// Adds hash state and QuoteModal pre-fill compared to the blog-embedded version.

"use client";

import { useHashState } from "@/lib/useHashState";
import { useQuote } from "@/lib/QuoteContext";

type Support = "fourEdge" | "twoEdge" | "point";
type Wind = "low" | "medium" | "high";

type State = { support: Support; wind: Wind };

const DEFAULT_STATE: State = { support: "fourEdge", wind: "low" };

const LIMITS: Record<Support, Record<Wind, { w: number; h: number; note: string }>> = {
  fourEdge: {
    low: { w: 3000, h: 15000, note: "Our 3,000 x 15,000 mm jumbo envelope (tempering furnace and lamination autoclave both support this size)." },
    medium: { w: 2800, h: 6000, note: "Common mid-rise curtain-wall envelope at 12mm monolithic." },
    high: { w: 2200, h: 4500, note: "Coastal or high-wind-zone single-pane limit. Consider laminated 12+12 or upsize to 15mm for larger panels." },
  },
  twoEdge: {
    low: { w: 1800, h: 4500, note: "Horizontal 2-edge (top and bottom clamp) is typical for fin-and-mullion storefront systems." },
    medium: { w: 1600, h: 3500, note: "Deflection becomes governing. Check span/180 limit per EN 13830 for curtain-wall glass." },
    high: { w: 1400, h: 3000, note: "Narrow envelope. Most high-wind projects upsize to 15mm or move to laminated glass at 2-edge spans." },
  },
  point: {
    low: { w: 2400, h: 3600, note: "4-point spider fitting. Countersunk holes required; edge-to-hole distance >= 2x thickness (24 mm minimum for 12mm)." },
    medium: { w: 2000, h: 3000, note: "Edge-to-hole distance >= 2x thickness per GB 15763.2 section 5.5. Hole-to-hole spacing also >= 2x thickness." },
    high: { w: 1800, h: 2400, note: "Rotation at point fixings governs. Consider SGP-laminated 12+12 for structural robustness." },
  },
};

const SUPPORT_LABELS: [Support, string][] = [
  ["fourEdge", "4-edge supported (framed)"],
  ["twoEdge", "2-edge supported (clamped top and bottom)"],
  ["point", "Point-fixed (spider or countersunk)"],
];

const WIND_LABELS: [Wind, string][] = [
  ["low", "Low (interior or sheltered, below 1.0 kPa)"],
  ["medium", "Medium (standard mid-rise, 1.0 to 2.5 kPa)"],
  ["high", "High (coastal or high-rise, above 2.5 kPa)"],
];

const SUPPORT_VALUES = new Set<Support>(["fourEdge", "twoEdge", "point"]);
const WIND_VALUES = new Set<Wind>(["low", "medium", "high"]);

function parseState(raw: Record<string, string>, fallback: State): State {
  const support = SUPPORT_VALUES.has(raw.support as Support)
    ? (raw.support as Support)
    : fallback.support;
  const wind = WIND_VALUES.has(raw.wind as Wind)
    ? (raw.wind as Wind)
    : fallback.wind;
  return { support, wind };
}

export default function MaxPanelSizeTool() {
  const [state, setState] = useHashState<State>(DEFAULT_STATE, parseState);
  const { openQuote } = useQuote();

  const result = LIMITS[state.support][state.wind];
  const area = (result.w * result.h) / 1_000_000;
  const withinJumbo = result.w <= 3000 && result.h <= 15000;

  function handleQuote() {
    const supportLabel = SUPPORT_LABELS.find((s) => s[0] === state.support)?.[1] ?? state.support;
    const windLabel = WIND_LABELS.find((w) => w[0] === state.wind)?.[1] ?? state.wind;
    const msg =
      "Quote request for 12mm tempered glass, generated from the Max Panel Size Calculator.\n\n" +
      "Support condition: " + supportLabel + "\n" +
      "Wind-load class: " + windLabel + "\n" +
      "Target max width: " + result.w.toLocaleString() + " mm\n" +
      "Target max height: " + result.h.toLocaleString() + " mm\n" +
      "Panel area: " + area.toFixed(1) + " m2\n" +
      (withinJumbo
        ? "Within our standard 3,000 x 15,000 mm production envelope."
        : "Exceeds standard envelope - requesting custom feasibility review.") +
      "\n\nPlease advise on price and lead time.";
    openQuote("Tempered Glass", msg);
  }

  return (
    <div className="rounded-xl border border-[#3A4250]/40 bg-[#3A4250]/15 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#F2F0ED] m-0 mb-1">
          Max panel size calculator (12mm tempered)
        </h2>
        <p className="text-sm text-[#8B95A5] m-0">
          Pick a support condition and wind-load class to see the indicative dimensional envelope for 12mm single-pane tempered glass.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] mb-2 uppercase tracking-wider">
            Support condition
          </label>
          <div className="space-y-2">
            {SUPPORT_LABELS.map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setState({ support: val })}
                className={
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors " +
                  (state.support === val
                    ? "bg-[#DAA745] text-[#1C1F26] font-semibold"
                    : "bg-[#1C1F26] text-[#8B95A5] border border-[#3A4250]/50 hover:border-[#DAA745]/50")
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#DAA745] mb-2 uppercase tracking-wider">
            Wind-load class
          </label>
          <div className="space-y-2">
            {WIND_LABELS.map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setState({ wind: val })}
                className={
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors " +
                  (state.wind === val
                    ? "bg-[#DAA745] text-[#1C1F26] font-semibold"
                    : "bg-[#1C1F26] text-[#8B95A5] border border-[#3A4250]/50 hover:border-[#DAA745]/50")
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-[#1C1F26] border border-[#DAA745]/40 p-5">
        <div className="flex flex-wrap items-baseline gap-5 mb-3">
          <div>
            <div className="text-[10px] text-[#8B95A5] uppercase tracking-wider mb-0.5">
              Max width
            </div>
            <div className="text-2xl font-bold text-[#DAA745] tabular-nums">
              {result.w.toLocaleString()} <span className="text-sm text-[#8B95A5] font-normal">mm</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[#8B95A5] uppercase tracking-wider mb-0.5">
              Max height
            </div>
            <div className="text-2xl font-bold text-[#DAA745] tabular-nums">
              {result.h.toLocaleString()} <span className="text-sm text-[#8B95A5] font-normal">mm</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[#8B95A5] uppercase tracking-wider mb-0.5">
              Area
            </div>
            <div className="text-2xl font-bold text-[#F2F0ED] tabular-nums">
              {area.toFixed(1)} <span className="text-sm text-[#8B95A5] font-normal">m2</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-[#8B95A5] m-0 mb-4 leading-relaxed">{result.note}</p>

        <div className="flex flex-wrap items-center gap-3">
          <div
            className={
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium " +
              (withinJumbo
                ? "bg-[#DAA745]/20 text-[#DAA745]"
                : "bg-red-500/15 text-red-300")
            }
          >
            {withinJumbo
              ? "Within our 3,000 x 15,000 mm production envelope"
              : "Exceeds standard envelope - custom review required"}
          </div>

          <button
            type="button"
            onClick={handleQuote}
            className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-[#DAA745] text-[#1C1F26] text-sm font-bold rounded-lg hover:bg-[#c4963e] transition-colors"
          >
            Get quote for this spec
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-[11px] text-[#8B95A5]/70 mt-4 m-0 leading-relaxed">
        Indicative only, based on GB 15763.2-2005 section 5 and ASTM E1300 principles. A licensed structural engineer should verify the specific wind, support, and deflection limits for your project before procurement.
      </p>
    </div>
  );
}
