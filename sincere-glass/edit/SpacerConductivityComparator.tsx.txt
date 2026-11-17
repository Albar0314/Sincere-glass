"use client";
// Article #30 interactive #1: edge-of-glass temperature by spacer type vs outdoor temp.
// ASCII-only. Renders real default DOM at SSR (outdoor -10 C selected).
import { useState } from "react";

type Spacer = { key: string; name: string; psi: number; fRsi: number; note: string };

const SPACERS: Spacer[] = [
  { key: "alu", name: "Aluminum", psi: 0.08, fRsi: 0.6, note: "Conductive metal bar - the thermal bridge at the edge" },
  { key: "ss", name: "Stainless steel", psi: 0.05, fRsi: 0.66, note: "Thinner, less conductive metal - entry-level warm edge" },
  { key: "tgi", name: "TGI hybrid", psi: 0.035, fRsi: 0.71, note: "Plastic body with a thin steel foil vapor barrier" },
  { key: "tps", name: "TPS", psi: 0.033, fRsi: 0.74, note: "Applied as a warm polymer bead, no rigid bar" },
  { key: "foam", name: "Silicone foam", psi: 0.03, fRsi: 0.75, note: "Flexible foam, lowest conductivity in this set" },
];

const INDOOR = 21;

export default function SpacerConductivityComparator() {
  const [outdoor, setOutdoor] = useState(-10);
  const rows = SPACERS.map((s) => ({
    ...s,
    edge: Math.round((outdoor + s.fRsi * (INDOOR - outdoor)) * 10) / 10,
  }));
  const temps = rows.map((r) => r.edge);
  const lo = Math.min(...temps, outdoor);
  const hi = Math.max(...temps, INDOOR);
  const span = hi - lo || 1;

  return (
    <div className="my-8 rounded-xl border border-black/10 bg-white p-5 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-brand-accent font-semibold">Interactive</p>
          <h3 className="font-display text-lg font-bold text-brand-dark">Edge-of-glass temperature by spacer</h3>
        </div>
        <label className="text-sm text-brand-muted">
          Outdoor temperature: <span className="font-semibold text-brand-dark">{outdoor} C</span>
          <input
            type="range"
            min={-20}
            max={10}
            step={1}
            value={outdoor}
            onChange={(e) => setOutdoor(Number(e.target.value))}
            className="mt-1 block w-full sm:w-56"
            aria-label="Outdoor temperature in Celsius"
          />
        </label>
      </div>
      <p className="mt-3 text-sm text-brand-muted">
        Indoor air is held at {INDOOR} C. A warmer edge resists condensation and loses less heat. Values are indicative,
        from typical temperature factors for a Low-E argon double unit.
      </p>
      <div className="mt-5 space-y-3">
        {rows.map((r) => {
          const pct = Math.round(((r.edge - lo) / span) * 100);
          return (
            <div key={r.key}>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-brand-dark">{r.name}</span>
                <span className="text-brand-dark">{r.edge} C &middot; psi {r.psi} W/mK</span>
              </div>
              <div className="mt-1 h-3 w-full rounded bg-black/5">
                <div
                  className={"h-3 rounded " + (r.key === "alu" ? "bg-brand-muted" : "bg-brand-accent")}
                  style={{ width: pct + "%" }}
                />
              </div>
              <p className="mt-1 text-xs text-brand-muted">{r.note}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-brand-muted">
        psi (linear thermal transmittance) is the heat lost along the glass edge per metre of perimeter per degree.
        Lower is better. Reference values only; the real number depends on glass build-up, frame and modelling method.
      </p>
    </div>
  );
}
