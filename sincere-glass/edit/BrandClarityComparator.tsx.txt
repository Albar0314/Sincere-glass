"use client";

import { useState } from "react";

type BrandKey = "starphire" | "optiwhite" | "diamant" | "generic" | "clear";

interface Brand {
  key: BrandKey;
  label: string;
  maker: string;
  fe2o3: string; // % by weight
  ppm: number; // iron, approx ppm for the bar
  vlt: number; // % visible light transmittance at 6mm
  edge: string; // edge appearance
  swatch: string; // tailwind bg for edge swatch
  note: string;
}

// Figures are typical published ranges for ~6 mm glass; iron shown as Fe2O3.
// Starphire, Optiwhite and Diamant are all branded low-iron and sit in one
// optical class; generic low-iron matches them; standard clear is the outlier.
const BRANDS: Brand[] = [
  {
    key: "starphire",
    label: "Starphire",
    maker: "Vitro (ex-PPG)",
    fe2o3: "~0.007%",
    ppm: 70,
    vlt: 91,
    edge: "Near-colorless, faint cool cast",
    swatch: "bg-sky-50",
    note: "The best-known brand name. Premium is consistency and spec paperwork, not a visible edge over other low-iron.",
  },
  {
    key: "optiwhite",
    label: "Optiwhite",
    maker: "Pilkington / NSG",
    fe2o3: "~0.01%",
    ppm: 100,
    vlt: 91,
    edge: "Near-colorless",
    swatch: "bg-sky-50",
    note: "Pilkington's low-iron. Optically indistinguishable from Starphire in normal use.",
  },
  {
    key: "diamant",
    label: "Diamant",
    maker: "Saint-Gobain",
    fe2o3: "~0.01%",
    ppm: 100,
    vlt: 91,
    edge: "Near-colorless",
    swatch: "bg-sky-50",
    note: "Saint-Gobain's low-iron. Same optical class as Starphire.",
  },
  {
    key: "generic",
    label: "Generic low-iron",
    maker: "Various (incl. Sincere)",
    fe2o3: "~0.01%",
    ppm: 110,
    vlt: 90,
    edge: "Near-colorless, very slight green at thick edges",
    swatch: "bg-emerald-50",
    note: "Unbranded ultra-clear from a reputable float line. Where no brand is specified, this is the value pick.",
  },
  {
    key: "clear",
    label: "Standard clear float",
    maker: "Any",
    fe2o3: "~0.10%",
    ppm: 1000,
    vlt: 86,
    edge: "Distinct green edge, deepens with thickness",
    swatch: "bg-green-200",
    note: "Ten times the iron of low-iron. The green is obvious on thick or stacked panels.",
  },
];

export default function BrandClarityComparator() {
  const [active, setActive] = useState<BrandKey>("starphire");
  const b = BRANDS.find((x) => x.key === active) || BRANDS[0];
  const maxPpm = 1000;
  const barPct = Math.max(4, Math.round((b.ppm / maxPpm) * 100));

  return (
    <div className="my-8 rounded-2xl border border-slate-700 bg-slate-900/60 p-5 sm:p-6">
      <h4 className="text-base font-semibold text-slate-100">
        Brand clarity comparator
      </h4>
      <p className="mt-1 text-sm text-slate-400">
        Switch brands to see iron content, light transmittance and edge color.
        The point is visible fast: the branded low-irons overlap, and generic
        low-iron sits with them — standard clear is the only real outlier.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {BRANDS.map((x) => (
          <button
            key={x.key}
            type="button"
            onClick={() => setActive(x.key)}
            className={
              "rounded-lg border px-3 py-1.5 text-sm transition " +
              (active === x.key
                ? "border-sky-400 bg-sky-400/10 text-slate-100"
                : "border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-600")
            }
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Iron (Fe2O3)
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-100">{b.fe2o3}</p>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-700">
            <div
              className="h-2 rounded-full bg-sky-400"
              style={{ width: barPct + "%" }}
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            lower is clearer — scaled vs standard clear
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Light transmittance
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-100">{b.vlt}%</p>
          <p className="mt-2 text-xs text-slate-500">
            visible light at 6 mm (higher = brighter, truer color)
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Edge color
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={"inline-block h-8 w-8 rounded border border-slate-600 " + b.swatch}
              aria-hidden="true"
            />
            <span className="text-sm text-slate-200">{b.edge}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800/30 p-4">
        <p className="text-sm text-slate-200">
          <span className="font-semibold">{b.label}</span>{" "}
          <span className="text-slate-500">({b.maker})</span>
        </p>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">{b.note}</p>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Typical published figures for ~6 mm glass; exact values vary by maker and
        batch. Reference only, not a specification.
      </p>
    </div>
  );
}
