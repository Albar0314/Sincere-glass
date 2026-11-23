"use client";

import { useMemo, useState } from "react";

type Thickness = 6 | 8 | 10 | 12 | 15 | 19;
type Assembly =
  | "annealed"
  | "tempered"
  | "pvb-laminated"
  | "sgp-laminated"
  | "igu-both"
  | "igu-outboard";
type FloatTier = "tier1-cn" | "branded-intl";

interface FloatRate {
  std: number;
  li: number;
}

const RAW_FLOAT_USD: Record<Thickness, FloatRate> = {
  6: { std: 8.5, li: 14.5 },
  8: { std: 11.5, li: 19.5 },
  10: { std: 14.5, li: 25.5 },
  12: { std: 18.5, li: 33.5 },
  15: { std: 26.0, li: 47.0 },
  19: { std: 37.0, li: 69.0 },
};

const ASSEMBLY_META: Record<
  Assembly,
  { label: string; lites: number; liLites: number; fabUsd: number; leadDays: number; note: string }
> = {
  annealed: {
    label: "Raw Annealed Float",
    lites: 1,
    liLites: 1,
    fabUsd: 2.0,
    leadDays: 10,
    note: "Cut-to-size raw sheet with seamed edge only.",
  },
  tempered: {
    label: "Monolithic Tempered",
    lites: 1,
    liLites: 1,
    fabUsd: 7.5,
    leadDays: 17,
    note: "Flat polish + horizontal tempering (ASTM C1048 / EN 12150).",
  },
  "pvb-laminated": {
    label: "PVB Laminated (1.52mm)",
    lites: 2,
    liLites: 2,
    fabUsd: 24.0,
    leadDays: 22,
    note: "Two tempered lites + 1.52mm clear PVB autoclave cycle.",
  },
  "sgp-laminated": {
    label: "SGP Laminated (1.52mm)",
    lites: 2,
    liLites: 2,
    fabUsd: 52.0,
    leadDays: 24,
    note: "Two tempered lites + 1.52mm SentryGlas ionoplast interlayer.",
  },
  "igu-both": {
    label: "Low-E IGU (Both Lites LI)",
    lites: 2,
    liLites: 2,
    fabUsd: 29.0,
    leadDays: 23,
    note: "Dual-seal PIB+silicone, warm-edge spacer, argon fill, soft-coat Low-E.",
  },
  "igu-outboard": {
    label: "Low-E IGU (Outboard LI Only)",
    lites: 2,
    liLites: 1,
    fabUsd: 29.0,
    leadDays: 21,
    note: "Value-engineered hybrid: Low Iron outer lite + Standard Clear inner lite.",
  },
};

function fmtUsd(val: number): string {
  return "$" + val.toFixed(2);
}

function fmtWholeUsd(val: number): string {
  return "$" + Math.round(val).toLocaleString("en-US");
}

export default function LowIronCostStackBuilder() {
  const [thickness, setThickness] = useState<Thickness>(10);
  const [assembly, setAssembly] = useState<Assembly>("tempered");
  const [floatTier, setFloatTier] = useState<FloatTier>("tier1-cn");
  const [yieldPct, setYieldPct] = useState<number>(82);
  const [area, setArea] = useState<number>(300);
  const [includeHst, setIncludeHst] = useState<boolean>(false);

  const calc = useMemo(() => {
    const raw = RAW_FLOAT_USD[thickness];
    const meta = ASSEMBLY_META[assembly];
    const brandMult = floatTier === "branded-intl" ? 1.3 : 1.0;

    // Standard clear runs in continuous nested factory flow (~86% average yield)
    const stdYieldFactor = 1 / 0.86;
    // Low iron runs in dedicated batches, so panel geometry directly hits scrap rate
    const liYieldFactor = 1 / (yieldPct / 100);

    // Small-lot setup surcharge under 100 m2 MOQ
    const moqSurcharge = area < 100 ? 1.14 : 1.0;
    const hstAdd = includeHst && assembly !== "annealed" ? 10.0 * meta.lites : 0;

    const stdSubstrate = raw.std * meta.lites * stdYieldFactor;
    const liSubstrate =
      (raw.li * brandMult * meta.liLites * liYieldFactor +
        raw.std * (meta.lites - meta.liLites) * stdYieldFactor) *
      moqSurcharge;

    const fabCost = meta.fabUsd + hstAdd;

    const stdUnit = stdSubstrate + fabCost;
    const liUnit = liSubstrate + fabCost;
    const deltaUnit = liUnit - stdUnit;
    const effectivePct = Math.round((deltaUnit / stdUnit) * 100);
    const rawPct = Math.round(((raw.li * brandMult - raw.std) / raw.std) * 100);

    const stdTotal = stdUnit * area;
    const liTotal = liUnit * area;
    const deltaTotal = liTotal - stdTotal;

    const leadDays =
      meta.leadDays +
      (floatTier === "branded-intl" ? 7 : 0) +
      (includeHst && assembly !== "annealed" ? 3 : 0) +
      (thickness >= 15 ? 4 : 0);

    let dilutionTier: "low" | "moderate" | "high" = "moderate";
    if (effectivePct <= 28) {
      dilutionTier = "high";
    } else if (effectivePct >= 55) {
      dilutionTier = "low";
    } else {
      dilutionTier = "moderate";
    }

    return {
      stdSubstrate,
      liSubstrate,
      fabCost,
      stdUnit,
      liUnit,
      deltaUnit,
      effectivePct,
      rawPct,
      stdTotal,
      liTotal,
      deltaTotal,
      leadDays,
      dilutionTier,
      moqTriggered: area < 100,
    };
  }, [thickness, assembly, floatTier, yieldPct, area, includeHst]);

  const badgeText =
    calc.dilutionTier === "high"
      ? "Strong Fabrication Dilution (Best Value-to-Clarity Ratio)"
      : calc.dilutionTier === "low"
      ? "Substrate-Dominated Uplift (High Percentage Gap)"
      : "Balanced Processing Dilution";

  return (
    <div className="my-10 rounded-2xl border border-[#3A4250]/50 bg-[#1C1F26] p-6 sm:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#DAA745] mb-1">
          Interactive Cost-Stack Model (FOB Wuhan)
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          How Fabrication, Yield, and Brand Shift the Real Low Iron Premium
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#8B95A5] mb-2">
              Single-Lite Glass Thickness (mm)
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {([6, 8, 10, 12, 15, 19] as Thickness[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setThickness(t)}
                  className={
                    "py-2 rounded-lg text-xs font-semibold transition-colors " +
                    (thickness === t
                      ? "bg-[#DAA745] text-[#1C1F26]"
                      : "bg-[#3A4250]/25 text-[#8B95A5] hover:text-[#F2F0ED] border border-[#3A4250]/40")
                  }
                >
                  {t}mm
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="li-assembly-select"
              className="block text-xs uppercase tracking-wider text-[#8B95A5] mb-2"
            >
              Fabrication Assembly
            </label>
            <select
              id="li-assembly-select"
              aria-label="Fabrication assembly"
              value={assembly}
              onChange={(e) => setAssembly(e.target.value as Assembly)}
              className="w-full rounded-lg bg-[#111419] border border-[#3A4250]/60 px-3 py-2.5 text-sm text-[#F2F0ED] focus:outline-none focus:border-[#DAA745]"
            >
              {(Object.keys(ASSEMBLY_META) as Assembly[]).map((k) => (
                <option key={k} value={k}>
                  {ASSEMBLY_META[k].label}
                </option>
              ))}
            </select>
            <p className="text-xs text-[#8B95A5] mt-1.5 mb-0">
              {ASSEMBLY_META[assembly].note}
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[#8B95A5] mb-2">
              Float Substrate Tier
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFloatTier("tier1-cn")}
                className={
                  "py-2 px-3 rounded-lg text-xs font-semibold transition-colors " +
                  (floatTier === "tier1-cn"
                    ? "bg-[#DAA745] text-[#1C1F26]"
                    : "bg-[#3A4250]/25 text-[#8B95A5] border border-[#3A4250]/40")
                }
              >
                Tier-1 China (CSG / Xinyi / TG)
              </button>
              <button
                type="button"
                onClick={() => setFloatTier("branded-intl")}
                className={
                  "py-2 px-3 rounded-lg text-xs font-semibold transition-colors " +
                  (floatTier === "branded-intl"
                    ? "bg-[#DAA745] text-[#1C1F26]"
                    : "bg-[#3A4250]/25 text-[#8B95A5] border border-[#3A4250]/40")
                }
              >
                Branded (Starphire / Optiwhite +30%)
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <label htmlFor="li-area-range" className="uppercase tracking-wider text-[#8B95A5]">
                Order Volume
              </label>
              <span className="font-mono font-semibold text-[#F2F0ED]">
                {area.toLocaleString("en-US")} m2{" "}
                {calc.moqTriggered ? "(Under 100 m2 MOQ: +14%)" : "(Standard Batch)"}
              </span>
            </div>
            <input
              id="li-area-range"
              type="range"
              min={20}
              max={3000}
              step={20}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              aria-label="Order volume in square meters"
              className="w-full accent-[#DAA745]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <label htmlFor="li-yield-range" className="uppercase tracking-wider text-[#8B95A5]">
                Low Iron Sheet Cutting Yield
              </label>
              <span className="font-mono font-semibold text-[#F2F0ED]">{yieldPct}%</span>
            </div>
            <input
              id="li-yield-range"
              type="range"
              min={70}
              max={88}
              step={1}
              value={yieldPct}
              onChange={(e) => setYieldPct(Number(e.target.value))}
              aria-label="Low iron sheet cutting yield percentage"
              className="w-full accent-[#DAA745]"
            />
            <div className="flex justify-between text-[11px] text-[#8B95A5] mt-1">
              <span>70% (awkward non-modular widths)</span>
              <span>88% (modular 3300mm nesting)</span>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-[#3A4250]/40 bg-[#111419] p-3">
              <input
                type="checkbox"
                checked={includeHst}
                disabled={assembly === "annealed"}
                onChange={(e) => setIncludeHst(e.target.checked)}
                aria-label="Add EN 14179-1 Heat-Soak Testing"
                className="accent-[#DAA745] w-4 h-4"
              />
              <div className="text-xs">
                <div className="font-semibold text-[#F2F0ED]">
                  Add Heat-Soak Test (EN 14179-1, +$10/m2 per lite)
                </div>
                <div className="text-[#8B95A5]">
                  Recommended for high-rise facades and overhead guards; adds 3 working days.
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-[#111419] border border-[#3A4250]/40 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#3A4250]/30">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#DAA745]">
            {badgeText}
          </span>
          <span className="text-xs font-mono text-[#8B95A5]">
            Est. Production Cycle: {calc.leadDays} working days (FOB Wuhan)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div className="rounded-lg bg-[#1C1F26] p-4 border border-[#3A4250]/30">
            <div className="text-[11px] uppercase tracking-wider text-[#8B95A5]">
              Standard Clear Unit Rate
            </div>
            <div className="text-2xl font-bold text-[#F2F0ED] mt-1">
              {fmtUsd(calc.stdUnit)}/m2
            </div>
            <div className="text-xs text-[#8B95A5] mt-1">
              Glass {fmtUsd(calc.stdSubstrate)} + Fab {fmtUsd(calc.fabCost)}
            </div>
          </div>

          <div className="rounded-lg bg-[#1C1F26] p-4 border border-[#DAA745]/40">
            <div className="text-[11px] uppercase tracking-wider text-[#DAA745]">
              Low Iron Unit Rate
            </div>
            <div className="text-2xl font-bold text-[#F2F0ED] mt-1">
              {fmtUsd(calc.liUnit)}/m2
            </div>
            <div className="text-xs text-[#8B95A5] mt-1">
              Glass {fmtUsd(calc.liSubstrate)} + Fab {fmtUsd(calc.fabCost)}
            </div>
          </div>

          <div className="rounded-lg bg-[#DAA745]/10 p-4 border border-[#DAA745]/40">
            <div className="text-[11px] uppercase tracking-wider text-[#DAA745]">
              Effective Finished Premium
            </div>
            <div className="text-2xl font-bold text-[#DAA745] mt-1">
              +{calc.effectivePct}% ({fmtUsd(calc.deltaUnit)}/m2)
            </div>
            <div className="text-xs text-[#F2F0ED] mt-1">
              Down from +{calc.rawPct}% raw sheet gap
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#3A4250]/30 text-sm">
          <div className="text-[#8B95A5]">
            Total FOB Project Delta ({area.toLocaleString("en-US")} m2):
          </div>
          <div className="font-mono font-bold text-[#F2F0ED]">
            {fmtWholeUsd(calc.stdTotal)} (Clear) -&gt; {fmtWholeUsd(calc.liTotal)} (Low Iron) |{" "}
            <span className="text-[#DAA745]">+{fmtWholeUsd(calc.deltaTotal)}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-[#8B95A5] italic mt-4 mb-0">
        2026 reference modeling, FOB Wuhan factory. Subject to formal CAD nesting, coating spec,
        and USD/CNY rate. Data verified: 2026-11-22.
      </p>
    </div>
  );
}
