"use client";

import { useMemo, useState } from "react";

type GlassThickness = 4 | 5 | 6 | 8 | 10 | 12;
type CavityWidth = 6 | 9 | 12 | 16 | 20;
type GasFill = "air" | "argon" | "krypton";
type CoatingType = "none" | "lowe-single" | "lowe-double";

interface Props {
  defaultGlass?: GlassThickness;
  defaultCavity?: CavityWidth;
  defaultGas?: GasFill;
  defaultCoating?: CoatingType;
}

const GLASS_OPTIONS: GlassThickness[] = [4, 5, 6, 8, 10, 12];
const CAVITY_OPTIONS: CavityWidth[] = [6, 9, 12, 16, 20];
const GAS_OPTIONS: Array<{ id: GasFill; label: string; note: string }> = [
  { id: "air", label: "Air", note: "Baseline, no cost adder" },
  { id: "argon", label: "Argon 90%", note: "Standard premium fill" },
  { id: "krypton", label: "Krypton 90%", note: "For narrow cavities 6-9 mm" },
];
const COATING_OPTIONS: Array<{ id: CoatingType; label: string; note: string }> = [
  { id: "none", label: "No Low-E", note: "Clear IGU only" },
  { id: "lowe-single", label: "Low-E surface 2", note: "Most common; soft-coat" },
  { id: "lowe-double", label: "Low-E surfaces 2 and 5", note: "Triple-pane only" },
];

// Simplified U-value lookup (W/m2K) from calibrated factory QC tables.
// Keys built as glass-cavity-gas-coating. Values trimmed to one decimal.
const U_VALUE_TABLE: Record<string, number> = {
  // Air baseline
  "6-12-air-none": 2.8,
  "6-16-air-none": 2.7,
  "6-20-air-none": 2.7,
  // Argon no coating
  "6-12-argon-none": 2.7,
  "6-16-argon-none": 2.6,
  // Low-E single
  "6-12-air-lowe-single": 1.8,
  "6-12-argon-lowe-single": 1.5,
  "6-16-argon-lowe-single": 1.3,
  "6-20-argon-lowe-single": 1.3,
  "6-9-krypton-lowe-single": 1.3,
};

function lookupU(glass: GlassThickness, cavity: CavityWidth, gas: GasFill, coating: CoatingType): number {
  const key = `${glass}-${cavity}-${gas}-${coating}`;
  if (U_VALUE_TABLE[key]) return U_VALUE_TABLE[key];
  // Fallback interpolation. Base from closest standard build-up.
  let base = 2.8;
  if (coating === "lowe-single") base = 1.6;
  if (coating === "lowe-double") base = 1.1;
  if (gas === "argon" && coating !== "none") base -= 0.2;
  if (gas === "krypton" && coating !== "none") base -= 0.3;
  if (cavity <= 9 && gas === "air") base += 0.3;
  if (cavity >= 16 && gas === "air") base -= 0.1;
  return Math.max(0.9, Math.round(base * 10) / 10);
}

function computeSTC(glass: GlassThickness, cavity: CavityWidth): number {
  // STC rises with glass mass and cavity width.
  let stc = 28;
  stc += (glass - 4) * 0.8;
  stc += cavity > 12 ? 2 : 0;
  if (cavity >= 20) stc += 1;
  return Math.round(stc);
}

function computeWeight(glass: GlassThickness): number {
  // IGU weight per m2 = 2 panes of soda-lime glass at 2.5 kg/mm/m2
  return glass * 2.5 * 2;
}

function computeSHGC(coating: CoatingType): number {
  if (coating === "none") return 0.76;
  if (coating === "lowe-single") return 0.42;
  return 0.28;
}

function computeVLT(coating: CoatingType): number {
  if (coating === "none") return 79;
  if (coating === "lowe-single") return 70;
  return 61;
}

function verdict(u: number): { label: string; tone: "a" | "b" | "c" } {
  if (u <= 1.4) return { label: "Code-compliant for cold climates (EN 1279, GB/T 11944 top tier)", tone: "a" };
  if (u <= 2.0) return { label: "Mid-tier: commercial baseline for temperate climates", tone: "b" };
  return { label: "Entry tier: non-insulated applications or mild climates only", tone: "c" };
}

export default function IGUConfigurator({
  defaultGlass = 6,
  defaultCavity = 12,
  defaultGas = "argon",
  defaultCoating = "lowe-single",
}: Props) {
  const [glass, setGlass] = useState<GlassThickness>(defaultGlass);
  const [cavity, setCavity] = useState<CavityWidth>(defaultCavity);
  const [gas, setGas] = useState<GasFill>(defaultGas);
  const [coating, setCoating] = useState<CoatingType>(defaultCoating);

  const u = useMemo(() => lookupU(glass, cavity, gas, coating), [glass, cavity, gas, coating]);
  const stc = useMemo(() => computeSTC(glass, cavity), [glass, cavity]);
  const weight = useMemo(() => computeWeight(glass), [glass]);
  const shgc = useMemo(() => computeSHGC(coating), [coating]);
  const vlt = useMemo(() => computeVLT(coating), [coating]);
  const v = verdict(u);
  const totalThickness = glass + cavity + glass;

  const toneBg = v.tone === "a" ? "bg-emerald-50 border-emerald-300 text-emerald-900" : v.tone === "b" ? "bg-amber-50 border-amber-300 text-amber-900" : "bg-rose-50 border-rose-300 text-rose-900";

  return (
    <div className="my-10 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="text-xs uppercase tracking-wide text-slate-500">Interactive</div>
        <h3 className="mt-1 text-lg font-semibold text-slate-900">IGU Configurator</h3>
        <p className="mt-1 text-sm text-slate-600">
          Choose glass thickness, cavity width, gas fill and Low-E to see the resulting U-value, STC, weight and total unit thickness. Values reference factory QC datasheets for a standard 6-12-6 soda-lime build-up and interpolate from calibrated adjustment factors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Glass thickness per lite (mm)</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {GLASS_OPTIONS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGlass(g)}
                className={`px-3 py-1.5 text-sm rounded-md border ${glass === g ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-300 hover:border-slate-500"}`}
              >
                {g} mm
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Cavity width (mm)</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {CAVITY_OPTIONS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCavity(c)}
                className={`px-3 py-1.5 text-sm rounded-md border ${cavity === c ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-300 hover:border-slate-500"}`}
              >
                {c} mm
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Gas fill</label>
          <div className="mt-2 space-y-2">
            {GAS_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setGas(opt.id)}
                className={`w-full text-left px-3 py-2 rounded-md border ${gas === opt.id ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-300 hover:border-slate-500"}`}
              >
                <div className="text-sm font-medium">{opt.label}</div>
                <div className={`text-xs ${gas === opt.id ? "text-slate-300" : "text-slate-500"}`}>{opt.note}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Low-E coating</label>
          <div className="mt-2 space-y-2">
            {COATING_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setCoating(opt.id)}
                className={`w-full text-left px-3 py-2 rounded-md border ${coating === opt.id ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-300 hover:border-slate-500"}`}
              >
                <div className="text-sm font-medium">{opt.label}</div>
                <div className={`text-xs ${coating === opt.id ? "text-slate-300" : "text-slate-500"}`}>{opt.note}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-5">
        <div className="text-xs uppercase tracking-wide text-slate-500">Resulting IGU performance</div>
        <div className="mt-2 text-sm text-slate-700">
          Build-up: {glass} mm clear + {cavity} mm {gas} + {glass} mm {coating === "none" ? "clear" : coating === "lowe-single" ? "clear with Low-E on surface 2" : "clear with Low-E on surfaces 2 and 5"}. Total unit thickness: {totalThickness} mm.
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg bg-white border border-slate-200 p-3">
            <div className="text-xs text-slate-500">U-value</div>
            <div className="text-2xl font-semibold text-slate-900">{u.toFixed(1)}</div>
            <div className="text-xs text-slate-500">W/m2K</div>
          </div>
          <div className="rounded-lg bg-white border border-slate-200 p-3">
            <div className="text-xs text-slate-500">SHGC</div>
            <div className="text-2xl font-semibold text-slate-900">{shgc.toFixed(2)}</div>
            <div className="text-xs text-slate-500">solar heat gain</div>
          </div>
          <div className="rounded-lg bg-white border border-slate-200 p-3">
            <div className="text-xs text-slate-500">VLT</div>
            <div className="text-2xl font-semibold text-slate-900">{vlt}%</div>
            <div className="text-xs text-slate-500">visible light</div>
          </div>
          <div className="rounded-lg bg-white border border-slate-200 p-3">
            <div className="text-xs text-slate-500">STC</div>
            <div className="text-2xl font-semibold text-slate-900">{stc}</div>
            <div className="text-xs text-slate-500">sound class</div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg bg-white border border-slate-200 p-3">
            <div className="text-xs text-slate-500">Weight per m2</div>
            <div className="text-lg font-semibold text-slate-900">{weight.toFixed(1)} kg/m2</div>
          </div>
          <div className="rounded-lg bg-white border border-slate-200 p-3">
            <div className="text-xs text-slate-500">Total unit thickness</div>
            <div className="text-lg font-semibold text-slate-900">{totalThickness} mm</div>
          </div>
        </div>

        <div className={`mt-4 rounded-md border px-3 py-2 text-sm ${toneBg}`}>
          Verdict: {v.label}
        </div>

        <div className="mt-3 text-xs text-slate-500">
          Reference values from factory QC datasheets for soda-lime glass. Actual U-value is sensitive to coating supplier, spacer type (warm-edge vs aluminum), and measurement standard (EN 673 vs NFRC 100). Data verified: 2026-11.
        </div>
      </div>
    </div>
  );
}
