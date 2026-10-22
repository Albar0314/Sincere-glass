"use client";
import { useMemo, useState } from "react";

/**
 * Transport feasibility for jumbo architectural glass.
 * Longest-side bands pick a container / vessel class.
 * All freight numbers are planning ranges, FOB Wuhan to major Western ports,
 * verified 2026-10 against public NVOCC rate boards. Not a quotation.
 */

type Mode =
  | "20dc"
  | "40hq"
  | "40fr"
  | "40ot"
  | "breakbulk";

interface ModeSpec {
  label: string;
  usableLenMm: number;
  usableWidthMm: number;
  usableHeightMm: number;
  crateOrientation: string;
  freightRangeUSD: [number, number];
  note: string;
}

const MODES: Record<Mode, ModeSpec> = {
  "20dc": {
    label: "20 ft dry (20'DC)",
    usableLenMm:   5800,
    usableWidthMm: 2350,
    usableHeightMm: 2390,
    crateOrientation:
      "A-frame crate against the long wall, panels vertical, 10 to 20 panels per crate.",
    freightRangeUSD: [1600, 2600],
    note: "Standard liner-haul. The default when the longest side is under 5.8 m.",
  },
  "40hq": {
    label: "40 ft high-cube (40'HQ)",
    usableLenMm:   11800,
    usableWidthMm: 2350,
    usableHeightMm: 2690,
    crateOrientation:
      "A-frame crate down the center, panels vertical. Larger panels loaded one per crate with foam separators.",
    freightRangeUSD: [2200, 3600],
    note: "The workhorse for 6 to 11.8 m panels. Still a standard container service.",
  },
  "40fr": {
    label: "40 ft flat rack",
    usableLenMm:   12000,
    usableWidthMm: 2900,
    usableHeightMm: 2200,
    crateOrientation:
      "A-frame crate open to sky and sides. Panels vertical, tarp-wrapped. Over-width approval needed above 2.9 m.",
    freightRangeUSD: [3800, 6500],
    note: "For panels exceeding standard container width or needing side loading. Over-sized surcharges apply.",
  },
  "40ot": {
    label: "40 ft open top",
    usableLenMm:   12000,
    usableWidthMm: 2340,
    usableHeightMm: 2600,
    crateOrientation:
      "Panels loaded through the roof via crane. Vertical in A-frame. Tarp over the top.",
    freightRangeUSD: [2600, 4200],
    note: "Alternative to flat rack when width stays within container footprint but overhead crane access is needed at origin.",
  },
  "breakbulk": {
    label: "Breakbulk / project cargo",
    usableLenMm:   99999,
    usableWidthMm: 99999,
    usableHeightMm: 99999,
    crateOrientation:
      "Purpose-built A-frame crate on cradle. Panel vertical or slightly tilted. Loaded by stevedores onto a conventional or multi-purpose vessel.",
    freightRangeUSD: [15000, 40000],
    note: "For panels beyond 12 m length. Rate is per shipment, not per container. Lead time adds 2 to 4 weeks for vessel scheduling.",
  },
};

function orient(w: number, h: number): [short: number, long: number] {
  return w <= h ? [w, h] : [h, w];
}

function pickMode(w: number, h: number): Mode {
  const [s, l] = orient(w, h);
  if (l > 12000) return "breakbulk";
  if (s > 2340) {
    return "40fr"; // over-width -> flat rack
  }
  if (l <= 5800) return "20dc";
  if (l <= 11800) return "40hq";
  return "40fr"; // 11.8 to 12 m -> flat rack
}

function panelsPerContainer(
  panelW: number,
  panelH: number,
  mode: Mode
): number | null {
  if (mode === "breakbulk") return null;
  const spec = MODES[mode];
  const [s, l] = orient(panelW, panelH);
  // Panels stacked vertically in A-frame, long side along container length.
  const alongLen = Math.floor(spec.usableLenMm / 50); // one slot = ~50 mm (panel + separator)
  const fitsAtAll = l <= spec.usableLenMm && s <= spec.usableHeightMm;
  if (!fitsAtAll) return 0;
  // Realistic practical cap: 20 panels per standard crate, 10 per flat rack over-width.
  const cap = mode === "40fr" ? 10 : 20;
  return Math.min(cap, alongLen);
}

function fmtRange(r: [number, number]): string {
  return "$" + r[0].toLocaleString() + " - $" + r[1].toLocaleString();
}

export default function TransportCrateVisualizer() {
  const [w, setW] = useState<number>(2800);
  const [h, setH] = useState<number>(8000);

  const mode = useMemo<Mode>(() => pickMode(w, h), [w, h]);
  const spec = MODES[mode];
  const [shortSide, longSide] = orient(w, h);
  const perContainer = useMemo(
    () => panelsPerContainer(w, h, mode),
    [w, h, mode]
  );

  // SVG scale: container drawn at a fixed box, panel scaled relative to it.
  const SVG_W = 480;
  const SVG_H = 160;
  const PADDING = 20;
  const containerLenMm = Math.min(
    spec.usableLenMm === 99999 ? 15000 : spec.usableLenMm,
    15000
  );
  const containerHMm = Math.min(
    spec.usableHeightMm === 99999 ? 3000 : spec.usableHeightMm,
    3000
  );
  const scaleX = (SVG_W - 2 * PADDING) / containerLenMm;
  const scaleY = (SVG_H - 2 * PADDING) / containerHMm;
  const panelLenPx = Math.min(longSide * scaleX, SVG_W - 2 * PADDING);
  const panelHPx = Math.min(shortSide * scaleY, SVG_H - 2 * PADDING);

  return (
    <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 md:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
          Interactive Transport Check
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          Which container (or vessel) does the panel need?
        </h3>
        <p className="text-sm text-[#8B95A5] mt-2 mb-0">
          Enter finished panel size. The tool picks the smallest feasible
          transport mode by longest-side and width band, draws the panel inside
          that container to scale, and gives a planning-grade sea-freight range
          FOB Wuhan to a major Western port.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-5">
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
            Panel width (mm)
          </label>
          <input
            type="number"
            min={300}
            max={5000}
            step={10}
            value={w}
            onChange={(e) =>
              setW(Math.max(300, Math.min(5000, Number(e.target.value) || 0)))
            }
            className="w-full px-3 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
            Panel height (mm)
          </label>
          <input
            type="number"
            min={300}
            max={20000}
            step={10}
            value={h}
            onChange={(e) =>
              setH(Math.max(300, Math.min(20000, Number(e.target.value) || 0)))
            }
            className="w-full px-3 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]"
          />
        </div>
      </div>

      {/* SVG scale drawing */}
      <div className="mb-5 rounded-lg bg-[#0f1116] border border-[#3A4250]/40 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-[#8B95A5] uppercase tracking-wider">
            Panel inside {spec.label} (side elevation, to scale)
          </div>
          <div className="text-[11px] text-[#8B95A5] font-mono">
            {shortSide} x {longSide} mm
          </div>
        </div>
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full h-auto"
          role="img"
          aria-label={`Scale drawing of a ${shortSide} by ${longSide} mm glass panel inside a ${spec.label}.`}
        >
          {/* Container outline */}
          <rect
            x={PADDING}
            y={PADDING}
            width={SVG_W - 2 * PADDING}
            height={SVG_H - 2 * PADDING}
            fill="none"
            stroke="#8B95A5"
            strokeWidth={1.5}
            strokeDasharray={mode === "breakbulk" ? "6 4" : "0"}
          />
          {/* Container floor shading */}
          <rect
            x={PADDING}
            y={SVG_H - PADDING - 6}
            width={SVG_W - 2 * PADDING}
            height={6}
            fill="#3A4250"
            opacity={0.5}
          />
          {/* Panel (positioned on floor, vertical) */}
          <rect
            x={PADDING + 10}
            y={SVG_H - PADDING - panelHPx - 6}
            width={panelLenPx}
            height={panelHPx}
            fill="#DAA745"
            fillOpacity={0.25}
            stroke="#DAA745"
            strokeWidth={1.5}
          />
          {/* Container label */}
          <text
            x={SVG_W - PADDING - 4}
            y={PADDING + 14}
            textAnchor="end"
            fontSize={11}
            fill="#8B95A5"
            fontFamily="monospace"
          >
            {spec.label}
          </text>
          {/* Panel label */}
          {panelLenPx > 60 && panelHPx > 24 && (
            <text
              x={PADDING + 10 + panelLenPx / 2}
              y={SVG_H - PADDING - panelHPx / 2 - 2}
              textAnchor="middle"
              fontSize={10}
              fill="#F2F0ED"
              fontFamily="monospace"
            >
              Panel
            </text>
          )}
        </svg>
      </div>

      {/* Verdict + freight */}
      <div className="grid gap-4 md:grid-cols-2 mb-4">
        <div className="rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 p-4">
          <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-2">
            Recommended mode
          </div>
          <div className="text-base font-semibold text-[#F2F0ED] mb-2">
            {spec.label}
          </div>
          <p className="text-xs text-[#8B95A5] leading-relaxed m-0">
            {spec.note}
          </p>
        </div>
        <div className="rounded-lg bg-[#DAA745]/10 border border-[#DAA745]/40 p-4">
          <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-2">
            Planning freight range
          </div>
          <div className="text-base font-semibold text-[#DAA745] font-mono mb-1">
            {fmtRange(spec.freightRangeUSD)}
          </div>
          <p className="text-[11px] text-[#8B95A5] mb-2 m-0">
            FOB Wuhan to a major Western port, 2026-10 reference bands.
            Excludes duties, inland haul, and oversized-cargo surcharges beyond
            the published tariff.
          </p>
          {perContainer !== null && perContainer > 0 && (
            <p className="text-[11px] text-[#F2F0ED] m-0">
              Approx <span className="font-mono">{perContainer}</span> panel(s)
              per unit at this size.
            </p>
          )}
          {perContainer === 0 && (
            <p className="text-[11px] text-red-300 m-0">
              Panel does not fit this mode cleanly. Review inputs.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-lg bg-[#3A4250]/10 border border-[#3A4250]/30 p-4">
        <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-2">
          Crate orientation
        </div>
        <p className="text-xs text-[#F2F0ED] leading-relaxed m-0">
          {spec.crateOrientation}
        </p>
      </div>

      <p className="text-[11px] text-[#8B95A5] italic mt-4 m-0">
        Freight ranges are planning estimates and move with contract season,
        booking lead time, and bunker surcharge. Site crane access and overland
        haul to the destination port often add more cost than the ocean leg
        itself — raise them in the RFQ.
      </p>
    </div>
  );
}
