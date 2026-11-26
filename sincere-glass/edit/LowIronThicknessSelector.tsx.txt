"use client";

import { useMemo, useState } from "react";
import { useQuote } from "@/lib/QuoteContext";

type AppZone =
  | "back-painted"
  | "igu-vision"
  | "shower-door"
  | "partition"
  | "balustrade"
  | "storefront"
  | "structural-fin";

interface ZoneRule {
  label: string;
  minMm: number;
  recMm: number;
  heavyMm: number;
  buildUp: string;
  codeRef: string;
  why: string;
  vltAtRec: number;
}

const ZONE_RULES: Record<AppZone, ZoneRule> = {
  "back-painted": {
    label: "White / Pastel Back-Painted Spandrel & Wall Cladding",
    minMm: 4,
    recMm: 6,
    heavyMm: 8,
    buildUp: "Monolithic Tempered + Ceramic Frit / Enamel",
    codeRef: "ASTM C1048-18 / EN 12150-1",
    why: "4mm works for small interior splashbacks, while 6mm is the commercial baseline for architectural wall cladding and spandrels to prevent roller-wave distortion.",
    vltAtRec: 91.2,
  },
  "igu-vision": {
    label: "Double-Glazed IGU Vision Facade / Window",
    minMm: 5,
    recMm: 6,
    heavyMm: 8,
    buildUp: "6T + 12Ar + 6T (Outboard Low Iron or Full Low Iron)",
    codeRef: "ASTM E2190-19 / EN 1279-5 / GB/T 11944",
    why: "5mm suits residential windows under 1.8 m2; 6mm is the global commercial IGU workhorse; step up to 8mm or 10mm when panel height exceeds 2.8m or wind load exceeds 2.0 kPa.",
    vltAtRec: 91.2,
  },
  "shower-door": {
    label: "Frameless Shower Enclosure & Pivot Door",
    minMm: 8,
    recMm: 10,
    heavyMm: 12,
    buildUp: "Monolithic Low Iron Tempered (Flat Polished Edges)",
    codeRef: "CPSC 16 CFR 1201 Cat II / EN 14428 / AS 1288",
    why: "10mm (3/8 in) is the standard frameless door thickness balancing hinge load and rigidity. Step up to 12mm (1/2 in) for doors wider than 850mm or taller than 2,200mm.",
    vltAtRec: 90.4,
  },
  partition: {
    label: "Frameless Interior Office Partition",
    minMm: 10,
    recMm: 12,
    heavyMm: 15,
    buildUp: "Monolithic Tempered or 6+1.52 PVB+6 Acoustic Laminated",
    codeRef: "IBC 2024 Sec 2406 / EN 12600 Class 1B1",
    why: "10mm handles heights up to 2,700mm; 12mm is required for 2,700-3,200mm full-height butt-jointed walls to control lateral flex.",
    vltAtRec: 89.9,
  },
  balustrade: {
    label: "Frameless Glass Balustrade / Guardrail",
    minMm: 12,
    recMm: 15,
    heavyMm: 19,
    buildUp: "8+1.52 SGP+8 or 10+1.52 SGP+10 Laminated (12mm Mono only where code allows)",
    codeRef: "IBC 2024 Sec 2407 / EN 1991-1-1 / AS 1288",
    why: "Modern international codes generally mandate laminated safety glass (e.g., 8+8 or 10+10 SGP) for cantilevered guards; 12mm monolithic is restricted to supported infill panels.",
    vltAtRec: 89.2,
  },
  storefront: {
    label: "Luxury Retail Storefront & Display Vitrine",
    minMm: 10,
    recMm: 12,
    heavyMm: 15,
    buildUp: "12mm Monolithic Tempered or 6+1.52+6 / 8+1.52+8 Laminated",
    codeRef: "ANSI Z97.1-2015 Class A / EN 14449",
    why: "At 10-15mm, standard clear glass casts a heavy green shadow over luxury merchandise; low iron maintains CRI 98-99 and ~90% VLT.",
    vltAtRec: 89.9,
  },
  "structural-fin": {
    label: "Jumbo Lobby Wall & Structural Glass Fin",
    minMm: 15,
    recMm: 19,
    heavyMm: 19,
    buildUp: "15mm/19mm Tempered + HST or Multi-Ply 12+12 / 15+15 SGP Laminated",
    codeRef: "ASTM E1300-16 / EN 14179-1:2016 (HST)",
    why: "15mm and 19mm low iron deliver up to +9.4% VLT gain over standard clear while keeping polished fin edges water-white.",
    vltAtRec: 88.4,
  },
};

export default function LowIronThicknessSelector() {
  const [zone, setZone] = useState<AppZone>("shower-door");
  const [heightMm, setHeightMm] = useState<number>(2400);
  const [widthMm, setWidthMm] = useState<number>(1000);
  const [highLoad, setHighLoad] = useState<boolean>(false);
  const { openQuote } = useQuote();

  const result = useMemo(() => {
    const r = ZONE_RULES[zone];
    const areaM2 = (heightMm / 1000) * (widthMm / 1000);
    let recommendedMm = r.recMm;
    let stepUpReason = "Standard span and load envelope.";

    if (highLoad || heightMm > 2800 || areaM2 > 3.6) {
      recommendedMm = r.heavyMm;
      stepUpReason =
        "Stepped up due to tall span (>2.8m), large panel area (>3.6 m2), or elevated wind/crowd load.";
    } else if (heightMm <= 1600 && areaM2 <= 1.4 && !highLoad) {
      recommendedMm = r.minMm;
      stepUpReason = "Compact panel geometry allows minimum nominal thickness for this application.";
    }

    const weightPerM2 = +(recommendedMm * 2.5).toFixed(1);
    const panelWeightKg = +(weightPerM2 * areaM2).toFixed(1);
    const isStocked = recommendedMm >= 6 && recommendedMm <= 12;
    const stockNote = isStocked
      ? "Wuhan floor stock (MOQ 100 m2, 15-20 working days)"
      : "Mill-order campaign thickness (MOQ 200-500 m2, 20-28 working days)";

    return {
      rule: r,
      recommendedMm,
      areaM2: +areaM2.toFixed(2),
      weightPerM2,
      panelWeightKg,
      stepUpReason,
      isStocked,
      stockNote,
    };
  }, [zone, heightMm, widthMm, highLoad]);

  const handlePrefillQuote = () => {
    const details = [
      `Thickness Recommendation: ${result.recommendedMm}mm Low Iron Glass`,
      `Application: ${result.rule.label}`,
      `Sample Panel Size: ${widthMm}mm x ${heightMm}mm (${result.areaM2} m2, ~${result.panelWeightKg} kg/panel)`,
      `Suggested Build-Up: ${result.rule.buildUp}`,
      `Code Reference: ${result.rule.codeRef}`,
    ].join(" | ");
    openQuote("Low Iron Glass", details);
  };

  return (
    <div className="my-10 rounded-2xl border border-[#3A4250]/50 bg-[#1C1F26] p-6 sm:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#DAA745] mb-1">
          Interactive Engineering Selector (4mm - 19mm)
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          Low Iron Glass Thickness &amp; Panel Weight Calculator
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label
              htmlFor="li-thick-zone"
              className="block text-xs uppercase tracking-wider text-[#8B95A5] mb-1.5"
            >
              1. Architectural Application
            </label>
            <select
              id="li-thick-zone"
              aria-label="Architectural application"
              value={zone}
              onChange={(e) => setZone(e.target.value as AppZone)}
              className="w-full rounded-lg bg-[#111419] border border-[#3A4250]/60 px-3 py-2.5 text-sm text-[#F2F0ED] focus:outline-none focus:border-[#DAA745]"
            >
              {(Object.keys(ZONE_RULES) as AppZone[]).map((k) => (
                <option key={k} value={k}>
                  {ZONE_RULES[k].label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <label htmlFor="li-height" className="uppercase tracking-wider text-[#8B95A5]">
                  2. Panel Height (mm)
                </label>
                <span className="font-mono font-semibold text-[#F2F0ED]">{heightMm} mm</span>
              </div>
              <input
                id="li-height"
                type="range"
                min={800}
                max={4500}
                step={100}
                value={heightMm}
                onChange={(e) => setHeightMm(Number(e.target.value))}
                aria-label="Panel height in millimeters"
                className="w-full accent-[#DAA745]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <label htmlFor="li-width" className="uppercase tracking-wider text-[#8B95A5]">
                  3. Panel Width (mm)
                </label>
                <span className="font-mono font-semibold text-[#F2F0ED]">{widthMm} mm</span>
              </div>
              <input
                id="li-width"
                type="range"
                min={500}
                max={3000}
                step={100}
                value={widthMm}
                onChange={(e) => setWidthMm(Number(e.target.value))}
                aria-label="Panel width in millimeters"
                className="w-full accent-[#DAA745]"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-[#3A4250]/40 bg-[#111419] p-3.5">
            <input
              type="checkbox"
              checked={highLoad}
              onChange={(e) => setHighLoad(e.target.checked)}
              aria-label="High wind load, crowd load, or frameless unsupported edge"
              className="accent-[#DAA745] w-4 h-4"
            />
            <div className="text-xs">
              <div className="font-semibold text-[#F2F0ED]">
                High Wind Load (&gt;2.0 kPa), Heavy Crowd Zone, or Unsupported Frameless Edge
              </div>
              <div className="text-[#8B95A5]">
                Steps thickness up one commercial grade to limit center-of-glass deflection.
              </div>
            </div>
          </label>

          <p className="text-xs text-[#8B95A5] leading-relaxed m-0">
            <strong className="text-[#F2F0ED]">Engineering Basis:</strong> {result.rule.why}
          </p>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl bg-[#111419] border border-[#DAA745]/40 p-5">
          <div className="space-y-4">
            <div className="border-b border-[#3A4250]/40 pb-3">
              <div className="text-[11px] uppercase tracking-wider text-[#DAA745]">
                Recommended Nominal Thickness
              </div>
              <div className="text-3xl font-extrabold text-[#F2F0ED] mt-1">
                {result.recommendedMm} mm{" "}
                <span className="text-sm font-normal text-[#8B95A5]">Low Iron</span>
              </div>
              <div className="text-xs text-[#8B95A5] mt-1">{result.stepUpReason}</div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-[#1C1F26] p-3">
                <div className="text-[#8B95A5]">Single-Lite Weight</div>
                <div className="font-mono font-bold text-[#F2F0ED] mt-0.5">
                  {result.weightPerM2} kg/m2
                </div>
              </div>
              <div className="rounded-lg bg-[#1C1F26] p-3">
                <div className="text-[#8B95A5]">Est. Panel Weight</div>
                <div className="font-mono font-bold text-[#F2F0ED] mt-0.5">
                  {result.panelWeightKg} kg ({result.areaM2} m2)
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-[#8B95A5]">
              <div>
                <strong className="text-[#F2F0ED]">Typical Build-Up:</strong> {result.rule.buildUp}
              </div>
              <div>
                <strong className="text-[#F2F0ED]">Standards:</strong> {result.rule.codeRef}
              </div>
              <div>
                <strong className="text-[#F2F0ED]">Wuhan Supply:</strong> {result.stockNote}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePrefillQuote}
            className="mt-5 w-full rounded-lg bg-[#DAA745] px-4 py-3 text-sm font-bold text-[#1C1F26] transition hover:bg-[#e5b85c]"
          >
            Quote {result.recommendedMm}mm Low Iron for This Spec
          </button>
        </div>
      </div>
    </div>
  );
}
