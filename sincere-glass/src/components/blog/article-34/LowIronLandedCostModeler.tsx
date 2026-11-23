"use client";

import { useMemo, useState } from "react";

type LaneKey = "us-west" | "us-east" | "eu-rotterdam" | "me-jebel-ali" | "au-sydney";

const LANES: Record<
  LaneKey,
  { label: string; freightPer20Gp: number; dutyRate: number; portClearancePer20Gp: number; note: string }
> = {
  "us-west": {
    label: "US West Coast (Los Angeles / Long Beach)",
    freightPer20Gp: 2650,
    dutyRate: 0.049,
    portClearancePer20Gp: 1150,
    note: "4.9% MFN base duty per USITC HTSUS 7007 (verify Section 301 tariffs with broker).",
  },
  "us-east": {
    label: "US East Coast (Savannah / New York)",
    freightPer20Gp: 3550,
    dutyRate: 0.049,
    portClearancePer20Gp: 1250,
    note: "All-water Panama transit adds ocean freight, further diluting glass % gap.",
  },
  "eu-rotterdam": {
    label: "EU North (Rotterdam / Antwerp)",
    freightPer20Gp: 2900,
    dutyRate: 0.03,
    portClearancePer20Gp: 1050,
    note: "3.0% EU TARIC CN 7007 base duty; VAT recoverable for VAT-registered importers.",
  },
  "me-jebel-ali": {
    label: "Middle East (Jebel Ali / Dammam)",
    freightPer20Gp: 1850,
    dutyRate: 0.05,
    portClearancePer20Gp: 750,
    note: "5.0% GCC common customs tariff; shortest ocean transit from Wuhan/Shanghai.",
  },
  "au-sydney": {
    label: "Australia (Sydney / Melbourne)",
    freightPer20Gp: 2100,
    dutyRate: 0.0,
    portClearancePer20Gp: 950,
    note: "0% ChAFTA preferential duty with Certificate of Origin (verify AS/NZS 2208).",
  },
};

export default function LowIronLandedCostModeler() {
  const [lane, setLane] = useState<LaneKey>("us-west");
  const [area, setArea] = useState<number>(600);
  const [thicknessMm, setThicknessMm] = useState<number>(10);
  const [stdFob, setStdFob] = useState<number>(22);
  const [liFob, setLiFob] = useState<number>(34);

  const model = useMemo(() => {
    const l = LANES[lane];
    // Glass density: 2.5 kg per m2 per mm thickness
    const totalGlassKg = area * thicknessMm * 2.5;
    // Standard 20' GP safe payload for architectural glass crates: 20,000 kg
    const containers = Math.max(1, Math.ceil(totalGlassKg / 20000));
    // Export A-frame / plywood end-cap crating (~10 crates per 20' GP @ $180)
    const cratingUsd = Math.max(2, Math.ceil(totalGlassKg / 2000)) * 180;
    const freightUsd = containers * l.freightPer20Gp;
    const portUsd = containers * l.portClearancePer20Gp;

    const stdGoods = area * stdFob;
    const liGoods = area * liFob;

    const stdDuty = stdGoods * l.dutyRate;
    const liDuty = liGoods * l.dutyRate;

    const fixedLogistics = cratingUsd + freightUsd + portUsd;

    const stdLandedTotal = stdGoods + fixedLogistics + stdDuty;
    const liLandedTotal = liGoods + fixedLogistics + liDuty;

    const stdLandedUnit = stdLandedTotal / area;
    const liLandedUnit = liLandedTotal / area;

    const fobPremiumPct = Math.round(((liFob - stdFob) / stdFob) * 100);
    const landedPremiumPct = Math.round(((liLandedUnit - stdLandedUnit) / stdLandedUnit) * 100);
    const compressionPoints = Math.max(0, fobPremiumPct - landedPremiumPct);

    return {
      totalGlassKg,
      containers,
      fixedLogistics,
      stdLandedUnit,
      liLandedUnit,
      fobPremiumPct,
      landedPremiumPct,
      compressionPoints,
      laneNote: l.note,
    };
  }, [lane, area, thicknessMm, stdFob, liFob]);

  return (
    <div className="my-10 rounded-2xl border border-[#3A4250]/50 bg-[#1C1F26] p-6 sm:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#DAA745] mb-1">
          Interactive Export Logistics Model
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          FOB vs. Landed-Cost Premium Compression Calculator
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="lane-select" className="block text-xs uppercase tracking-wider text-[#8B95A5] mb-1.5">
            Destination Trade Lane
          </label>
          <select
            id="lane-select"
            aria-label="Destination trade lane"
            value={lane}
            onChange={(e) => setLane(e.target.value as LaneKey)}
            className="w-full rounded-lg bg-[#111419] border border-[#3A4250]/60 px-3 py-2.5 text-sm text-[#F2F0ED]"
          >
            {(Object.keys(LANES) as LaneKey[]).map((k) => (
              <option key={k} value={k}>
                {LANES[k].label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="landed-area" className="block text-xs uppercase tracking-wider text-[#8B95A5] mb-1.5">
              Order Area (m2)
            </label>
            <input
              id="landed-area"
              type="number"
              min={50}
              max={10000}
              step={50}
              value={area}
              aria-label="Order area in square meters"
              onChange={(e) => setArea(Math.max(50, Number(e.target.value) || 50))}
              className="w-full rounded-lg bg-[#111419] border border-[#3A4250]/60 px-3 py-2 text-sm font-mono text-[#F2F0ED]"
            />
          </div>
          <div>
            <label htmlFor="landed-thick" className="block text-xs uppercase tracking-wider text-[#8B95A5] mb-1.5">
              Total Glass (mm)
            </label>
            <input
              id="landed-thick"
              type="number"
              min={6}
              max={38}
              step={2}
              value={thicknessMm}
              aria-label="Total glass thickness in millimeters"
              onChange={(e) => setThicknessMm(Math.max(6, Number(e.target.value) || 6))}
              className="w-full rounded-lg bg-[#111419] border border-[#3A4250]/60 px-3 py-2 text-sm font-mono text-[#F2F0ED]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="std-fob-input" className="block text-xs uppercase tracking-wider text-[#8B95A5] mb-1.5">
            Standard Clear FOB Rate (USD/m2)
          </label>
          <input
            id="std-fob-input"
            type="number"
            min={8}
            max={250}
            value={stdFob}
            aria-label="Standard clear FOB rate in USD per square meter"
            onChange={(e) => setStdFob(Math.max(8, Number(e.target.value) || 8))}
            className="w-full rounded-lg bg-[#111419] border border-[#3A4250]/60 px-3 py-2 text-sm font-mono text-[#F2F0ED]"
          />
        </div>

        <div>
          <label htmlFor="li-fob-input" className="block text-xs uppercase tracking-wider text-[#8B95A5] mb-1.5">
            Low Iron FOB Rate (USD/m2)
          </label>
          <input
            id="li-fob-input"
            type="number"
            min={12}
            max={350}
            value={liFob}
            aria-label="Low iron FOB rate in USD per square meter"
            onChange={(e) => setLiFob(Math.max(12, Number(e.target.value) || 12))}
            className="w-full rounded-lg bg-[#111419] border border-[#3A4250]/60 px-3 py-2 text-sm font-mono text-[#F2F0ED]"
          />
        </div>
      </div>

      <div className="rounded-xl bg-[#111419] border border-[#3A4250]/40 p-5">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-[11px] uppercase text-[#8B95A5]">Cargo Weight</div>
            <div className="text-lg font-bold font-mono text-[#F2F0ED]">
              {(model.totalGlassKg / 1000).toFixed(1)} MT
            </div>
            <div className="text-xs text-[#8B95A5]">{model.containers} x 20&apos; GP</div>
          </div>
          <div>
            <div className="text-[11px] uppercase text-[#8B95A5]">Fixed Freight + Crating</div>
            <div className="text-lg font-bold font-mono text-[#F2F0ED]">
              ${Math.round(model.fixedLogistics / area)}/m2
            </div>
            <div className="text-xs text-[#8B95A5]">Identical for Clear &amp; LI</div>
          </div>
          <div>
            <div className="text-[11px] uppercase text-[#8B95A5]">FOB Premium Gap</div>
            <div className="text-lg font-bold font-mono text-[#F2F0ED]">
              +{model.fobPremiumPct}%
            </div>
            <div className="text-xs text-[#8B95A5]">Ex-Wuhan factory</div>
          </div>
          <div>
            <div className="text-[11px] uppercase text-[#DAA745]">Landed Premium Gap</div>
            <div className="text-lg font-bold font-mono text-[#DAA745]">
              +{model.landedPremiumPct}%
            </div>
            <div className="text-xs text-[#F2F0ED]">
              Compressed by -{model.compressionPoints} pts
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#3A4250]/30 text-xs text-[#8B95A5] flex flex-wrap justify-between gap-2">
          <span>
            Est. Landed Rate: <strong className="text-[#F2F0ED]">${model.stdLandedUnit.toFixed(2)}/m2</strong> (Clear) vs.{" "}
            <strong className="text-[#DAA745]">${model.liLandedUnit.toFixed(2)}/m2</strong> (Low Iron)
          </span>
          <span>{model.laneNote}</span>
        </div>
      </div>
    </div>
  );
}
