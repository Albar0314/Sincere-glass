"use client";

import { useState } from "react";

// Article #31 (W3-#11) interactive #1
// Thickness x application -> can it be tempered, is heat soak advised,
// and the low-iron note. Renders real DOM at SSR with default state
// (6mm / frameless shower). ASCII-only per project rule.

type AppKey =
  | "shower"
  | "railing"
  | "overhead"
  | "storefront"
  | "furniture"
  | "floor";

const APPLICATIONS: { key: AppKey; label: string; heatSoak: "required" | "advised" | "optional" }[] = [
  { key: "shower", label: "Frameless shower / partition", heatSoak: "advised" },
  { key: "railing", label: "Glass railing / balustrade", heatSoak: "required" },
  { key: "overhead", label: "Overhead / skylight / canopy", heatSoak: "required" },
  { key: "storefront", label: "Storefront / display window", heatSoak: "optional" },
  { key: "furniture", label: "Furniture / tabletop", heatSoak: "optional" },
  { key: "floor", label: "Glass floor / stair tread", heatSoak: "required" },
];

// Practical max size we temper per thickness (planning reference, mm thickness -> m2)
const THICKNESS_TABLE: { mm: number; maxSize: string; temperable: boolean }[] = [
  { mm: 4, maxSize: "2.0 x 1.2 m", temperable: true },
  { mm: 5, maxSize: "2.4 x 1.5 m", temperable: true },
  { mm: 6, maxSize: "3.0 x 2.0 m", temperable: true },
  { mm: 8, maxSize: "3.6 x 2.4 m", temperable: true },
  { mm: 10, maxSize: "4.2 x 2.4 m", temperable: true },
  { mm: 12, maxSize: "4.5 x 2.4 m", temperable: true },
  { mm: 15, maxSize: "5.0 x 2.5 m", temperable: true },
  { mm: 19, maxSize: "5.0 x 2.5 m", temperable: true },
];

const HEAT_SOAK_TEXT: Record<"required" | "advised" | "optional", string> = {
  required:
    "Heat soak test (EN 14179) strongly recommended. Any spontaneous breakage from nickel sulfide is a safety event here, so we soak by default on this application.",
  advised:
    "Heat soak advised. Breakage risk is low but the glass is near people; we recommend soaking frameless shower panels.",
  optional:
    "Heat soak optional. Framed, low-level or non-overhead use; soak only if the specifier calls for it.",
};

export default function TemperThicknessSelector() {
  const [mm, setMm] = useState<number>(6);
  const [app, setApp] = useState<AppKey>("shower");

  const row = THICKNESS_TABLE.find((r) => r.mm === mm) ?? THICKNESS_TABLE[2];
  const appInfo = APPLICATIONS.find((a) => a.key === app) ?? APPLICATIONS[0];

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Low iron tempering qualifier
      </h4>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Thickness</span>
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-800"
            value={mm}
            onChange={(e) => setMm(Number(e.target.value))}
          >
            {THICKNESS_TABLE.map((r) => (
              <option key={r.mm} value={r.mm}>
                {r.mm} mm
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">Application</span>
          <select
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-800"
            value={app}
            onChange={(e) => setApp(e.target.value as AppKey)}
          >
            {APPLICATIONS.map((a) => (
              <option key={a.key} value={a.key}>
                {a.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
        <p>
          <span className="font-semibold text-slate-900">
            {row.mm} mm low iron can be tempered.
          </span>{" "}
          Practical panel size at this thickness: up to {row.maxSize}. Larger
          than this moves to a project quote.
        </p>
        <p className="mt-2">
          <span className="font-semibold text-slate-900">
            Heat soak: {appInfo.heatSoak}.
          </span>{" "}
          {HEAT_SOAK_TEXT[appInfo.heatSoak]}
        </p>
        <p className="mt-2">
          Low iron does not change how the glass tempers. It changes what you
          see: no green cast and a near-colorless edge, which is why it is worth
          the premium on {appInfo.label.toLowerCase()}.
        </p>
      </div>

      <table className="mt-5 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-300 text-slate-500">
            <th className="py-2 pr-3 font-medium">Thickness</th>
            <th className="py-2 pr-3 font-medium">Temperable</th>
            <th className="py-2 font-medium">Practical max panel</th>
          </tr>
        </thead>
        <tbody>
          {THICKNESS_TABLE.map((r) => (
            <tr
              key={r.mm}
              className={
                r.mm === mm
                  ? "border-b border-slate-200 bg-sky-50"
                  : "border-b border-slate-200"
              }
            >
              <td className="py-2 pr-3 font-medium text-slate-800">{r.mm} mm</td>
              <td className="py-2 pr-3 text-slate-700">Yes</td>
              <td className="py-2 text-slate-700">{r.maxSize}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-3 text-xs text-slate-500">
        Panel sizes are Sincere Glass line capability, planning reference only.
        Confirm against your drawing before ordering.
      </p>
    </div>
  );
}
