"use client";

import { useMemo, useState } from "react";

type ComplexityTier = "basic" | "mid" | "premium";
type FreightMode = "fcl" | "lcl" | "air";

interface ComplexityDef {
  id: ComplexityTier;
  label: string;
  examples: string;
  fobLow: number;
  fobHigh: number;
}

interface FreightDef {
  id: FreightMode;
  label: string;
  usdPerM2Low: number;
  usdPerM2High: number;
  note: string;
}

const COMPLEXITY: ComplexityDef[] = [
  {
    id: "basic",
    label: "Basic",
    examples: "6–10 mm clear tempered, flat edges, no coating",
    fobLow: 18,
    fobHigh: 32,
  },
  {
    id: "mid",
    label: "Mid",
    examples: "Low-E IGU, 6+12A+6 tempered, standard sizes",
    fobLow: 42,
    fobHigh: 68,
  },
  {
    id: "premium",
    label: "Premium",
    examples: "SGP laminated jumbo, curved tempered, triple IGU",
    fobLow: 95,
    fobHigh: 160,
  },
];

const FREIGHT: FreightDef[] = [
  {
    id: "fcl",
    label: "FCL (Full Container, sea)",
    usdPerM2Low: 4,
    usdPerM2High: 9,
    note:
      "Lowest unit cost. Only economic above ~250 m² per shipment. Standard for architectural glass.",
  },
  {
    id: "lcl",
    label: "LCL (Shared Container, sea)",
    usdPerM2Low: 10,
    usdPerM2High: 22,
    note:
      "Economic below 250 m². Most factories refuse LCL for jumbo panels due to handling risk.",
  },
  {
    id: "air",
    label: "Air Freight (samples / urgent only)",
    usdPerM2Low: 85,
    usdPerM2High: 180,
    note:
      "Reserved for sample panels or emergency replacement. Not used for production shipments.",
  },
];

// Duty + port fee is roughly 8-15% of FOB+freight for most destinations.
// US tempered glass HS 7005: 4.9% base duty + variable fees.
// EU laminated HS 7007: 3.0% base duty.
// Here we use a mid-range 10-18% composite for landed cost estimation.
const DUTY_PCT_LOW = 0.1;
const DUTY_PCT_HIGH = 0.18;

export default function SourcingBudgetEstimator() {
  const [area, setArea] = useState<number>(300);
  const [complexity, setComplexity] = useState<ComplexityTier>("mid");
  const [freight, setFreight] = useState<FreightMode>("fcl");

  const complexityDef =
    COMPLEXITY.find((c) => c.id === complexity) || COMPLEXITY[1];
  const freightDef = FREIGHT.find((f) => f.id === freight) || FREIGHT[0];

  const breakdown = useMemo(() => {
    const safeArea = Math.max(1, area);
    const fobLow = complexityDef.fobLow * safeArea;
    const fobHigh = complexityDef.fobHigh * safeArea;
    const freightLow = freightDef.usdPerM2Low * safeArea;
    const freightHigh = freightDef.usdPerM2High * safeArea;
    const dutyLow = (fobLow + freightLow) * DUTY_PCT_LOW;
    const dutyHigh = (fobHigh + freightHigh) * DUTY_PCT_HIGH;
    const landedLow = fobLow + freightLow + dutyLow;
    const landedHigh = fobHigh + freightHigh + dutyHigh;
    const perM2Low = landedLow / safeArea;
    const perM2High = landedHigh / safeArea;

    return {
      fobLow,
      fobHigh,
      freightLow,
      freightHigh,
      dutyLow,
      dutyHigh,
      landedLow,
      landedHigh,
      perM2Low,
      perM2High,
    };
  }, [area, complexityDef, freightDef]);

  function fmt(n: number): string {
    if (n >= 10000) return `$${Math.round(n / 100) / 10}k`;
    return `$${Math.round(n).toLocaleString()}`;
  }

  function fmtPerM2(n: number): string {
    return `$${n.toFixed(0)}/m²`;
  }

  const warnings: string[] = [];
  if (freight === "fcl" && area < 150) {
    warnings.push(
      "FCL below ~150 m² usually loses cost advantage to LCL. Confirm with your freight forwarder.",
    );
  }
  if (freight === "lcl" && area > 400) {
    warnings.push(
      "LCL above ~400 m² starts costing more than FCL on a 20'DC. Request a side-by-side quote.",
    );
  }
  if (freight === "air") {
    warnings.push(
      "Air freight for a production run is almost never cost-justified. If you need urgent delivery, consider splitting the order and air-shipping only the critical panels.",
    );
  }

  return (
    <div className="my-10 rounded-2xl bg-[#3A4250]/15 border border-[#3A4250]/40 p-5 md:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
          Interactive · Sourcing Budget Estimator
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-[#F2F0ED] m-0">
          Rough landed-cost estimate for China-sourced architectural glass
        </h3>
        <p className="text-sm text-[#8B95A5] leading-relaxed mt-2 m-0">
          Enter your project area, pick a complexity tier and freight mode. The estimator shows FOB, freight, duty, and landed cost ranges in USD. These are reference ranges, not quotes.
        </p>
        <p className="text-xs text-[#8B95A5]/70 italic mt-2 m-0">
          Data verified: 2026-10-19 · Based on Wuhan FOB pricing and typical ocean rates to US/EU main ports. Actual pricing varies with USD/CNY, bunker surcharges, port congestion, and quarterly rate changes.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* Area input */}
        <div>
          <label
            htmlFor="budget-area"
            className="block text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2"
          >
            Project area (m²)
          </label>
          <input
            id="budget-area"
            type="number"
            min={10}
            max={10000}
            step={10}
            value={area}
            onChange={(e) => setArea(Number(e.target.value) || 0)}
            className="w-full px-4 py-2.5 rounded-lg bg-[#1C1F26] border border-[#3A4250] text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]"
          />
          <p className="text-xs text-[#8B95A5]/70 mt-2 m-0">
            Total m² of glass in the order (not building area).
          </p>
        </div>

        {/* Complexity selector */}
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
            Complexity tier
          </label>
          <div className="space-y-1.5">
            {COMPLEXITY.map((c) => (
              <button
                key={c.id}
                onClick={() => setComplexity(c.id)}
                aria-pressed={complexity === c.id}
                className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors ${
                  complexity === c.id
                    ? "border-[#DAA745] bg-[#DAA745]/10 text-[#F2F0ED]"
                    : "border-[#3A4250]/40 bg-[#1C1F26] text-[#8B95A5] hover:border-[#8B95A5]/60"
                }`}
              >
                <div className="font-semibold mb-0.5">{c.label}</div>
                <div className="text-[11px] text-[#8B95A5]/80 leading-tight">
                  {c.examples}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Freight selector */}
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
            Freight mode
          </label>
          <div className="space-y-1.5">
            {FREIGHT.map((f) => (
              <button
                key={f.id}
                onClick={() => setFreight(f.id)}
                aria-pressed={freight === f.id}
                className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors ${
                  freight === f.id
                    ? "border-[#DAA745] bg-[#DAA745]/10 text-[#F2F0ED]"
                    : "border-[#3A4250]/40 bg-[#1C1F26] text-[#8B95A5] hover:border-[#8B95A5]/60"
                }`}
              >
                <div className="font-semibold">{f.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="mb-6 space-y-2">
          {warnings.map((w, i) => (
            <div
              key={i}
              className="flex gap-2 p-3 rounded-lg bg-[#DAA745]/5 border border-[#DAA745]/30 text-xs text-[#F2F0ED]/90 leading-relaxed"
            >
              <span className="text-[#DAA745] flex-shrink-0">⚠</span>
              <span>{w}</span>
            </div>
          ))}
        </div>
      )}

      {/* Headline landed cost */}
      <div className="mb-6 p-5 rounded-xl bg-[#1C1F26]/60 border border-[#DAA745]/40">
        <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
          Estimated landed cost range
        </div>
        <div className="flex items-baseline flex-wrap gap-x-4 gap-y-1 mb-2">
          <div className="text-2xl md:text-3xl font-bold text-[#F2F0ED]">
            {fmt(breakdown.landedLow)}
          </div>
          <div className="text-xl text-[#8B95A5]">—</div>
          <div className="text-2xl md:text-3xl font-bold text-[#F2F0ED]">
            {fmt(breakdown.landedHigh)}
          </div>
        </div>
        <div className="text-sm text-[#8B95A5]">
          Per m²:{" "}
          <span className="text-[#F2F0ED] font-semibold">
            {fmtPerM2(breakdown.perM2Low)} – {fmtPerM2(breakdown.perM2High)}
          </span>{" "}
          landed at destination port+duty
        </div>
      </div>

      {/* Breakdown */}
      <div>
        <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-3">
          Cost breakdown
        </div>
        <div className="space-y-2">
          <BreakdownRow
            label="FOB Wuhan (ex-factory)"
            low={breakdown.fobLow}
            high={breakdown.fobHigh}
            fmt={fmt}
            note={`${complexityDef.label} tier: $${complexityDef.fobLow}–$${complexityDef.fobHigh}/m²`}
          />
          <BreakdownRow
            label="Ocean/air freight + port"
            low={breakdown.freightLow}
            high={breakdown.freightHigh}
            fmt={fmt}
            note={freightDef.note}
          />
          <BreakdownRow
            label="Duty + destination charges"
            low={breakdown.dutyLow}
            high={breakdown.dutyHigh}
            fmt={fmt}
            note="Assumes 10–18% of (FOB+freight). Confirm your HS code and duty rate with your customs broker."
          />
        </div>
      </div>

      <p className="text-xs text-[#8B95A5]/70 italic mt-5 m-0">
        Note: This estimator intentionally shows a range, not a single number. Any factory handing you a one-number quote without asking about edge-work, hole positions, coating, interlayer brand, and packing crate type is quoting on assumptions you have not seen.
      </p>
    </div>
  );
}

interface BreakdownRowProps {
  label: string;
  low: number;
  high: number;
  fmt: (n: number) => string;
  note: string;
}

function BreakdownRow({ label, low, high, fmt, note }: BreakdownRowProps) {
  return (
    <div className="p-3 rounded-lg bg-[#1C1F26]/40 border border-[#3A4250]/30">
      <div className="flex justify-between items-baseline mb-1 flex-wrap gap-2">
        <div className="text-sm font-semibold text-[#F2F0ED]">{label}</div>
        <div className="text-sm text-[#DAA745] font-mono">
          {fmt(low)} – {fmt(high)}
        </div>
      </div>
      <p className="text-xs text-[#8B95A5] leading-relaxed m-0">{note}</p>
    </div>
  );
}
