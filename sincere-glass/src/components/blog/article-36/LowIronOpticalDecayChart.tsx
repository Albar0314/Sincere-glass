"use client";

import { useState } from "react";

interface OpticalRow {
  mm: number;
  clearVlt: number;
  liVlt: number;
  clearHex: string;
  liHex: string;
  verdict: string;
}

const ROWS: OpticalRow[] = [
  {
    mm: 4,
    clearVlt: 90.0,
    liVlt: 91.5,
    clearHex: "#9ec4b0",
    liHex: "#e6f2f5",
    verdict: "+1.5% VLT gain. Needed primarily for pure-white back-painted glass and high-efficiency solar covers.",
  },
  {
    mm: 5,
    clearVlt: 89.5,
    liVlt: 91.3,
    clearHex: "#8eba9f",
    liHex: "#e2f1f5",
    verdict: "+1.8% VLT gain. Common residential IGU and interior cabinet shelf thickness.",
  },
  {
    mm: 6,
    clearVlt: 89.0,
    liVlt: 91.2,
    clearHex: "#7eb097",
    liHex: "#dff0f4",
    verdict: "+2.2% VLT gain. Commercial IGU and white spandrel sweet spot; highest global stock availability.",
  },
  {
    mm: 8,
    clearVlt: 87.5,
    liVlt: 90.8,
    clearHex: "#5d9b7e",
    liHex: "#d7ecf2",
    verdict: "+3.3% VLT gain. Green tint becomes unmistakably visible on exposed edges and stacked laminated lites.",
  },
  {
    mm: 10,
    clearVlt: 86.0,
    liVlt: 90.4,
    clearHex: "#3e8364",
    liHex: "#cfe8f0",
    verdict: "+4.4% VLT gain. The commercial tipping point: standard clear turns bottle-green; low iron stays water-white.",
  },
  {
    mm: 12,
    clearVlt: 84.5,
    liVlt: 89.9,
    clearHex: "#2a6e50",
    liHex: "#c6e3ed",
    verdict: "+5.4% VLT gain. Essential for frameless doors, balustrades, and retail storefronts viewed close-up.",
  },
  {
    mm: 15,
    clearVlt: 82.0,
    liVlt: 89.2,
    clearHex: "#1d583e",
    liHex: "#bddfea",
    verdict: "+7.2% VLT gain. Heavy lobby glass and fins; standard clear looks dark emerald on polished edges.",
  },
  {
    mm: 19,
    clearVlt: 79.0,
    liVlt: 88.4,
    clearHex: "#12422d",
    liHex: "#b3dae7",
    verdict: "+9.4% VLT gain. Maximum optical divergence; standard 19mm clear loses over 20% of visible daylight.",
  },
];

export default function LowIronOpticalDecayChart() {
  const [activeMm, setActiveMm] = useState<number>(10);
  const current = ROWS.find((r) => r.mm === activeMm) || ROWS[4];
  const delta = (current.liVlt - current.clearVlt).toFixed(1);

  // SVG coordinate helpers (chart box: x 55..475, y 25..185; VLT range 75..95%)
  const xForIdx = (idx: number) => 60 + idx * 58;
  const yForVlt = (vlt: number) => 185 - ((vlt - 75) / 20) * 155;

  const liPoints = ROWS.map((r, i) => `${xForIdx(i)},${yForVlt(r.liVlt).toFixed(1)}`).join(" ");
  const clPoints = ROWS.map((r, i) => `${xForIdx(i)},${yForVlt(r.clearVlt).toFixed(1)}`).join(" ");

  return (
    <div className="my-10 rounded-2xl border border-[#3A4250]/50 bg-[#1C1F26] p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#DAA745] mb-1">
            Beer-Lambert Absorption Curve (4mm to 19mm)
          </div>
          <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
            How Thickness Amplifies the Clarity Gap Between Low Iron and Clear
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Select thickness on optical chart">
          {ROWS.map((r) => (
            <button
              key={r.mm}
              type="button"
              onClick={() => setActiveMm(r.mm)}
              aria-pressed={activeMm === r.mm}
              className={
                "px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors " +
                (activeMm === r.mm
                  ? "bg-[#DAA745] text-[#1C1F26]"
                  : "bg-[#111419] text-[#8B95A5] border border-[#3A4250]/50 hover:text-[#F2F0ED]")
              }
            >
              {r.mm}mm
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#111419] border border-[#3A4250]/40 p-4">
        <svg
          viewBox="0 0 520 225"
          className="w-full h-auto"
          role="img"
          aria-label="Visible light transmittance decay curve from 4mm to 19mm comparing low iron glass and standard clear float glass"
        >
          {/* Horizontal grid lines */}
          {[75, 80, 85, 90, 95].map((tick) => {
            const y = yForVlt(tick);
            return (
              <g key={tick}>
                <line x1="50" y1={y} x2="490" y2={y} stroke="#3A4250" strokeOpacity="0.35" strokeDasharray="3 3" />
                <text x="42" y={y + 4} textAnchor="end" fill="#8B95A5" fontSize="10">
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* Curves */}
          <polyline fill="none" stroke="#38bdf8" strokeWidth="2.5" points={liPoints} />
          <polyline fill="none" stroke="#34d399" strokeWidth="2.5" strokeDasharray="5 3" points={clPoints} />

          {/* Interactive nodes */}
          {ROWS.map((r, i) => {
            const cx = xForIdx(i);
            const yLi = yForVlt(r.liVlt);
            const yCl = yForVlt(r.clearVlt);
            const isSel = r.mm === activeMm;
            return (
              <g key={r.mm} onClick={() => setActiveMm(r.mm)} style={{ cursor: "pointer" }}>
                {isSel && (
                  <line x1={cx} y1={yLi} x2={cx} y2={yCl} stroke="#DAA745" strokeWidth="2" />
                )}
                <circle
                  cx={cx}
                  cy={yLi}
                  r={isSel ? 5.5 : 3.5}
                  fill={isSel ? "#DAA745" : "#38bdf8"}
                />
                <circle
                  cx={cx}
                  cy={yCl}
                  r={isSel ? 5.5 : 3.5}
                  fill={isSel ? "#DAA745" : "#34d399"}
                />
                <text
                  x={cx}
                  y="207"
                  textAnchor="middle"
                  fill={isSel ? "#DAA745" : "#8B95A5"}
                  fontSize="11"
                  fontWeight={isSel ? "700" : "400"}
                >
                  {r.mm}mm
                </text>
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(275, 14)">
            <line x1="0" y1="0" x2="18" y2="0" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="23" y="4" fill="#F2F0ED" fontSize="10">Low Iron (Fe2O3 &lt; 0.01%)</text>
            <line x1="0" y1="15" x2="18" y2="15" stroke="#34d399" strokeWidth="2.5" strokeDasharray="5 3" />
            <text x="23" y="19" fill="#8B95A5" fontSize="10">Standard Clear (~0.11%)</text>
          </g>
        </svg>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-[#111419] border border-[#3A4250]/40 p-4">
          <div className="text-[11px] uppercase text-[#8B95A5]">Selected Thickness ({current.mm}mm)</div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#38bdf8]">{current.liVlt.toFixed(1)}%</span>
            <span className="text-xs text-[#8B95A5]">vs {current.clearVlt.toFixed(1)}% clear</span>
          </div>
          <div className="text-xs font-semibold text-[#DAA745] mt-1">+{delta}% VLT Advantage</div>
        </div>

        <div className="rounded-xl bg-[#111419] border border-[#3A4250]/40 p-4">
          <div className="text-[11px] uppercase text-[#8B95A5] mb-2">Simulated Polished Edge Swatch</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-block h-4 w-12 rounded border border-sky-400/60" style={{ backgroundColor: current.liHex }} />
              <span className="text-[#F2F0ED]">Low Iron {current.mm}mm</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-block h-4 w-12 rounded border border-white/20" style={{ backgroundColor: current.clearHex }} />
              <span className="text-[#8B95A5]">Standard Clear {current.mm}mm</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[#111419] border border-[#3A4250]/40 p-4 text-xs text-[#F2F0ED] leading-relaxed">
          <strong className="text-[#DAA745]">Specifier Takeaway:</strong> {current.verdict}
        </div>
      </div>
    </div>
  );
}
