"use client";

import { useState } from "react";

type Thickness = "6" | "10" | "19";

interface ThicknessData {
  value: Thickness;
  label: string;
  clearGreenHex: string;
  clearGreenHue: string;
  lowIronHex: string;
  lowIronHue: string;
  perceivedShift: string;
}

const THICKNESS_DATA: Record<Thickness, ThicknessData> = {
  "6": {
    value: "6",
    label: "6 mm",
    clearGreenHex: "#D7E8DC",
    clearGreenHue: "Slight green tint, visible on white backgrounds only",
    lowIronHex: "#F2F7F4",
    lowIronHue: "Near-colorless, water-clear",
    perceivedShift: "At 6 mm the green edge is subtle. Most retail clients will not notice unless the two samples sit next to each other on a white tabletop.",
  },
  "10": {
    value: "10",
    label: "10 mm",
    clearGreenHex: "#9CC3A6",
    clearGreenHue: "Clear bottle-green edge, visible across a lit showroom",
    lowIronHex: "#E6F0E9",
    lowIronHue: "Very faint hint of blue-white at the edge",
    perceivedShift: "At 10 mm the clear-glass edge reads as unmistakably green under showroom lighting. Jewelry displays and museum vitrines fail the aesthetic check with clear glass at this thickness.",
  },
  "19": {
    value: "19",
    label: "19 mm (jumbo lami, aquarium)",
    clearGreenHex: "#4F8C66",
    clearGreenHue: "Deep bottle-green, visually opaque at the edge",
    lowIronHex: "#CDE2D5",
    lowIronHue: "Faint cool tint, still reads as clear",
    perceivedShift: "At 19 mm (typical for aquarium viewing panels or thick laminated balustrades), clear glass turns the edge into a bottle-green band. Low iron is the only option that preserves true color perception through the glass.",
  },
};

export default function EdgeColorViewer() {
  const [thickness, setThickness] = useState<Thickness>("10");
  const data = THICKNESS_DATA[thickness];

  return (
    <div className="my-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">
          Edge Color Viewer: Clear vs Low Iron
        </h3>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
          Interactive
        </span>
      </div>

      <p className="mb-5 text-sm text-slate-600">
        Choose a glass thickness to see how the characteristic green edge of
        standard clear float glass intensifies with thickness, while low iron
        glass stays near-colorless at every thickness. Edge color comes from
        iron oxide (Fe2O3) in the glass; thicker glass means a longer light
        path and more absorbed red wavelengths.
      </p>

      <div className="mb-6 flex gap-2">
        {(Object.keys(THICKNESS_DATA) as Thickness[]).map((t) => {
          const active = thickness === t;
          return (
            <button
              key={t}
              onClick={() => setThickness(t)}
              className={
                "rounded-lg border px-4 py-2 text-sm font-medium transition " +
                (active
                  ? "border-amber-500 bg-amber-50 text-amber-800"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300")
              }
            >
              {THICKNESS_DATA[t].label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">
              Standard Clear Float
            </span>
            <span className="text-xs text-slate-500">Fe2O3 approx 0.10%</span>
          </div>
          <svg viewBox="0 0 300 160" className="w-full">
            <defs>
              <linearGradient id={"clear-face-" + thickness} x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#F8FAFC" />
                <stop offset="1" stopColor="#F1F5F9" />
              </linearGradient>
            </defs>
            <rect x="20" y="40" width="200" height="80" fill={"url(#clear-face-" + thickness + ")"} stroke="#CBD5E1" />
            <rect x="220" y="40" width={thickness === "6" ? "6" : thickness === "10" ? "14" : "28"} height="80" fill={data.clearGreenHex} stroke="#64748B" strokeWidth="0.5" />
            <text x="160" y="140" textAnchor="middle" fill="#64748B" fontSize="11">Front face</text>
            <text x={thickness === "6" ? "223" : thickness === "10" ? "227" : "234"} y="140" textAnchor="middle" fill="#64748B" fontSize="11">Edge</text>
          </svg>
          <p className="mt-3 text-xs text-slate-600">{data.clearGreenHue}</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Low Iron Glass</span>
            <span className="text-xs text-slate-500">Fe2O3 under 0.015%</span>
          </div>
          <svg viewBox="0 0 300 160" className="w-full">
            <defs>
              <linearGradient id={"lowiron-face-" + thickness} x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#FAFCFB" />
                <stop offset="1" stopColor="#F4F8F6" />
              </linearGradient>
            </defs>
            <rect x="20" y="40" width="200" height="80" fill={"url(#lowiron-face-" + thickness + ")"} stroke="#CBD5E1" />
            <rect x="220" y="40" width={thickness === "6" ? "6" : thickness === "10" ? "14" : "28"} height="80" fill={data.lowIronHex} stroke="#64748B" strokeWidth="0.5" />
            <text x="160" y="140" textAnchor="middle" fill="#64748B" fontSize="11">Front face</text>
            <text x={thickness === "6" ? "223" : thickness === "10" ? "227" : "234"} y="140" textAnchor="middle" fill="#64748B" fontSize="11">Edge</text>
          </svg>
          <p className="mt-3 text-xs text-slate-600">{data.lowIronHue}</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-amber-300">
          What this means for your project
        </span>
        {data.perceivedShift}
      </div>
    </div>
  );
}
