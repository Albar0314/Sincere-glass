"use client";

import { useMemo, useState } from "react";

const DENSITY = 2500; // kg per cubic metre of soda-lime float glass
const CRATE_OVERHEAD = 0.18; // ~18% weight added by A-frame crates, dunnage, moisture bags

// Container payload limits are regulated by road weight limits, not container cube.
// Typical practical payload for architectural glass:
const CONTAINERS = [
  {
    code: "20DC",
    name: "20' Dry Container",
    maxPayloadKg: 24000, // common road-legal cap for a 20' heavy load; higher is possible with specialty permits
    cubeM3: 33,
    note: "Preferred for heavy glass: payload is the limit, not volume.",
  },
  {
    code: "40HQ",
    name: "40' High Cube",
    maxPayloadKg: 26000, // more cube, similar weight cap in most jurisdictions
    cubeM3: 76,
    note: "Only chosen when panels are very large and fit poorly in a 20'.",
  },
] as const;

// Rough end-of-2026 all-in FOB-to-port range per 20' equivalent unit (TEU) sailing from Shanghai or Ningbo
const LANES = [
  { lane: "US West Coast (LAX / LGB)", low: 1700, high: 3400 },
  { lane: "US East Coast (NYC / SAV)", low: 2600, high: 4800 },
  { lane: "North Europe (RTM / HAM)", low: 1500, high: 3100 },
  { lane: "Middle East (JEA / DXB)", low: 1200, high: 2400 },
  { lane: "Australia (SYD / MEL)", low: 1800, high: 3300 },
];

function fmt(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export default function ContainerLoadCalculator() {
  const [width, setWidth] = useState(1500); // mm
  const [height, setHeight] = useState(2500); // mm
  const [thickness, setThickness] = useState(10); // mm (e.g. 10mm temp, or sum of lites in a laminate / IGU)
  const [count, setCount] = useState(100);

  const result = useMemo(() => {
    const panelVolM3 = (width / 1000) * (height / 1000) * (thickness / 1000);
    const panelKg = panelVolM3 * DENSITY;
    const totalGlassKg = panelKg * count;
    const totalShippedKg = totalGlassKg * (1 + CRATE_OVERHEAD);

    const containers = CONTAINERS.map((c) => {
      const needed = Math.ceil(totalShippedKg / c.maxPayloadKg);
      return { ...c, needed };
    });

    return { panelKg, totalGlassKg, totalShippedKg, containers };
  }, [width, height, thickness, count]);

  const twentyFt = result.containers.find((c) => c.code === "20DC")!;

  return (
    <div className="my-10 rounded-2xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 md:p-8">
      <h3 className="text-base font-semibold text-[#DAA745] uppercase tracking-wider mb-1">
        Interactive
      </h3>
      <h4 className="text-xl font-bold text-[#F2F0ED] mb-5">
        Container Load & Freight Estimator
      </h4>
      <p className="text-sm text-[#8B95A5] leading-relaxed mb-6">
        A rough budget tool. Glass crates travel at weight limits, not cube — adjust panel size and count to see how many 20' containers your order needs.
      </p>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
            Panel width (mm)
          </label>
          <input
            type="number"
            min={300}
            max={6000}
            step={50}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value) || 0)}
            className="w-full bg-[#3A4250]/20 border border-[#3A4250]/40 rounded-lg px-3 py-2 text-[#F2F0ED] focus:outline-none focus:border-[#DAA745]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
            Panel height (mm)
          </label>
          <input
            type="number"
            min={300}
            max={15000}
            step={50}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value) || 0)}
            className="w-full bg-[#3A4250]/20 border border-[#3A4250]/40 rounded-lg px-3 py-2 text-[#F2F0ED] focus:outline-none focus:border-[#DAA745]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
            Total glass thickness (mm)
          </label>
          <input
            type="number"
            min={3}
            max={60}
            step={1}
            value={thickness}
            onChange={(e) => setThickness(Number(e.target.value) || 0)}
            className="w-full bg-[#3A4250]/20 border border-[#3A4250]/40 rounded-lg px-3 py-2 text-[#F2F0ED] focus:outline-none focus:border-[#DAA745]"
          />
          <p className="text-[11px] text-[#8B95A5]/80 mt-1">
            Sum of all lites (e.g. 6+6 laminate = 12)
          </p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
            Panel count
          </label>
          <input
            type="number"
            min={1}
            step={1}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 0)}
            className="w-full bg-[#3A4250]/20 border border-[#3A4250]/40 rounded-lg px-3 py-2 text-[#F2F0ED] focus:outline-none focus:border-[#DAA745]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg bg-[#3A4250]/15 border border-[#3A4250]/30 p-4 text-center">
          <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-1">
            Per panel
          </div>
          <div className="text-2xl font-bold text-[#F2F0ED]">
            {fmt(result.panelKg)} <span className="text-sm font-normal text-[#8B95A5]">kg</span>
          </div>
        </div>
        <div className="rounded-lg bg-[#3A4250]/15 border border-[#3A4250]/30 p-4 text-center">
          <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-1">
            Total glass
          </div>
          <div className="text-2xl font-bold text-[#F2F0ED]">
            {fmt(result.totalGlassKg)} <span className="text-sm font-normal text-[#8B95A5]">kg</span>
          </div>
        </div>
        <div className="rounded-lg bg-[#DAA745]/10 border border-[#DAA745]/30 p-4 text-center">
          <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-1">
            Shipped (incl. crates)
          </div>
          <div className="text-2xl font-bold text-[#DAA745]">
            {fmt(result.totalShippedKg)} <span className="text-sm font-normal text-[#DAA745]/70">kg</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {result.containers.map((c) => (
          <div
            key={c.code}
            className="rounded-xl border border-[#3A4250]/40 bg-[#3A4250]/10 p-5"
          >
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-sm font-semibold text-[#F2F0ED]">{c.name}</div>
              <div className="text-xs text-[#8B95A5]">max {fmt(c.maxPayloadKg)} kg</div>
            </div>
            <div className="text-3xl font-bold text-[#DAA745] mb-2">
              {c.needed} <span className="text-sm font-normal text-[#8B95A5]">container{c.needed === 1 ? "" : "s"}</span>
            </div>
            <p className="text-xs text-[#8B95A5] leading-relaxed">{c.note}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-[#1C1F26] border border-[#3A4250]/40 p-5">
        <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-3">
          Indicative ocean freight (2026 — all-in per 20' container, FOB Shanghai)
        </div>
        <div className="space-y-2">
          {LANES.map((l) => {
            const low = l.low * twentyFt.needed;
            const high = l.high * twentyFt.needed;
            return (
              <div key={l.lane} className="flex items-baseline justify-between text-sm">
                <span className="text-[#F2F0ED]">{l.lane}</span>
                <span className="text-[#DAA745] font-mono">
                  USD {fmt(low)} – {fmt(high)}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-[#8B95A5] italic mt-4 leading-relaxed">
          Indicative only. Rates fluctuate weekly with capacity, bunker fuel, and seasonal peaks (Chinese New Year, pre-holiday US volumes). Request a live rate from your forwarder before quoting.
        </p>
      </div>
    </div>
  );
}
