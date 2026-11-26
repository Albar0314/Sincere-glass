"use client";

import { useState } from "react";

type Mode = "monolithic" | "laminated-equivalent";

interface MonoSpec {
  mm: string;
  weight: string;
  tolerance: string;
  maxTempered: string;
  stock: string;
  useCases: string;
}

const MONO_SPECS: MonoSpec[] = [
  {
    mm: "4 mm",
    weight: "10.0 kg/m2",
    tolerance: "+/- 0.2 mm",
    maxTempered: "2,400 x 3,300 mm",
    stock: "Mill order (200 m2 MOQ)",
    useCases: "Picture frames, white kitchen splashbacks, solar covers",
  },
  {
    mm: "5 mm",
    weight: "12.5 kg/m2",
    tolerance: "+/- 0.2 mm",
    maxTempered: "2,440 x 3,660 mm",
    stock: "Limited stock (150 m2 MOQ)",
    useCases: "Residential IGUs, furniture tabletops, display shelves",
  },
  {
    mm: "6 mm",
    weight: "15.0 kg/m2",
    tolerance: "+/- 0.2 mm",
    maxTempered: "3,300 x 8,000 mm",
    stock: "Wuhan floor stock (100 m2 MOQ)",
    useCases: "Commercial Low-E IGUs, white ceramic-frit spandrels, 6+6 laminated",
  },
  {
    mm: "8 mm",
    weight: "20.0 kg/m2",
    tolerance: "+/- 0.3 mm",
    maxTempered: "3,300 x 10,000 mm",
    stock: "Wuhan floor stock (100 m2 MOQ)",
    useCases: "Large IGUs, semi-frameless showers, 8+8 balustrade laminates",
  },
  {
    mm: "10 mm",
    weight: "25.0 kg/m2",
    tolerance: "+/- 0.3 mm",
    maxTempered: "3,300 x 12,000 mm",
    stock: "Wuhan floor stock (100 m2 MOQ)",
    useCases: "Frameless shower doors, office partitions, 10+10 SGP guards",
  },
  {
    mm: "12 mm",
    weight: "30.0 kg/m2",
    tolerance: "+/- 0.3 mm",
    maxTempered: "3,300 x 15,000 mm",
    stock: "Wuhan floor stock (100 m2 MOQ)",
    useCases: "Heavy frameless doors, retail storefronts, tall office walls",
  },
  {
    mm: "15 mm",
    weight: "37.5 kg/m2",
    tolerance: "+/- 0.5 mm",
    maxTempered: "3,300 x 15,000 mm",
    stock: "Mill batch order (200-300 m2)",
    useCases: "Jumbo lobby walls, freestanding storefronts, glass fins",
  },
  {
    mm: "19 mm",
    weight: "47.5 kg/m2",
    tolerance: "+/- 1.0 mm",
    maxTempered: "3,300 x 15,000 mm",
    stock: "Mill batch order (300-500 m2)",
    useCases: "Monumental fins, oversized aquariums, heavy structural glazing",
  },
];

interface LamiPair {
  buildUp: string;
  totalMm: string;
  weight: string;
  vlt: string;
  vsMono: string;
}

const LAMI_PAIRS: LamiPair[] = [
  {
    buildUp: "5T + 1.52 PVB + 5T (Low Iron)",
    totalMm: "11.52 mm",
    weight: "26.5 kg/m2",
    vlt: "~88.5%",
    vsMono: "Replaces 10mm mono where overhead retention or acoustic STC 36+ is required.",
  },
  {
    buildUp: "6T + 1.52 PVB + 6T (Low Iron)",
    totalMm: "13.52 mm",
    weight: "31.5 kg/m2",
    vlt: "~88.0%",
    vsMono: "Replaces 12mm mono for museum vitrines, skylight canopies, and retail security.",
  },
  {
    buildUp: "8T + 1.52 SGP + 8T (Low Iron)",
    totalMm: "17.52 mm",
    weight: "41.5 kg/m2",
    vlt: "~87.2%",
    vsMono: "Code-compliant frameless balustrade standard (IBC 2407 / EN 12600) with near-zero edge greenness.",
  },
  {
    buildUp: "10T + 1.52 SGP + 10T (Low Iron)",
    totalMm: "21.52 mm",
    weight: "51.5 kg/m2",
    vlt: "~86.4%",
    vsMono: "High-load cantilevered guards and commercial atrium railings where 19mm mono fails post-breakage code.",
  },
];

export default function LowIronThicknessToleranceMatrix() {
  const [mode, setMode] = useState<Mode>("monolithic");

  return (
    <div className="my-10 rounded-2xl border border-[#3A4250]/50 bg-[#1C1F26] p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#DAA745] mb-1">
            Wuhan Factory Processing Envelope
          </div>
          <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
            Monolithic Thicknesses vs. Laminated Low Iron Equivalents
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode("monolithic")}
            className={
              "px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors " +
              (mode === "monolithic"
                ? "bg-[#DAA745] text-[#1C1F26]"
                : "bg-[#111419] text-[#8B95A5] border border-[#3A4250]/50")
            }
          >
            Monolithic (4-19mm)
          </button>
          <button
            type="button"
            onClick={() => setMode("laminated-equivalent")}
            className={
              "px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors " +
              (mode === "laminated-equivalent"
                ? "bg-[#DAA745] text-[#1C1F26]"
                : "bg-[#111419] text-[#8B95A5] border border-[#3A4250]/50")
            }
          >
            Laminated Equivalents (5+5 to 10+10)
          </button>
        </div>
      </div>

      {mode === "monolithic" ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#3A4250]/60 text-left text-[11px] uppercase tracking-wider text-[#DAA745]">
                <th className="py-2.5 pr-3">Thickness</th>
                <th className="py-2.5 px-3">Weight</th>
                <th className="py-2.5 px-3">Tolerance (GB/EN)</th>
                <th className="py-2.5 px-3">Max Tempered</th>
                <th className="py-2.5 px-3">Wuhan Stock Status</th>
                <th className="py-2.5 pl-3">Primary Applications</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A4250]/30 text-[#F2F0ED]">
              {MONO_SPECS.map((s) => (
                <tr key={s.mm}>
                  <td className="py-2.5 pr-3 font-mono font-bold text-[#DAA745]">{s.mm}</td>
                  <td className="py-2.5 px-3 font-mono">{s.weight}</td>
                  <td className="py-2.5 px-3 font-mono">{s.tolerance}</td>
                  <td className="py-2.5 px-3 font-mono">{s.maxTempered}</td>
                  <td className="py-2.5 px-3">{s.stock}</td>
                  <td className="py-2.5 pl-3 text-[#8B95A5]">{s.useCases}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-3">
          {LAMI_PAIRS.map((p) => (
            <div
              key={p.buildUp}
              className="rounded-xl bg-[#111419] border border-[#3A4250]/40 p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
            >
              <div className="md:col-span-4">
                <div className="font-mono font-bold text-sm text-[#DAA745]">{p.buildUp}</div>
                <div className="text-xs text-[#8B95A5] mt-0.5">
                  Nominal {p.totalMm} | {p.weight} | VLT {p.vlt}
                </div>
              </div>
              <div className="md:col-span-8 text-xs text-[#F2F0ED] leading-relaxed">{p.vsMono}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
