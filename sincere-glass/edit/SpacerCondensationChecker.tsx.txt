"use client";
// Article #30 interactive #2: does the glass edge hit dew point, aluminum vs warm edge.
// ASCII-only. Renders real default DOM at SSR (RH 55, outdoor -5 C).
import { useState } from "react";

const INDOOR = 21;

// Representative edge temperature factors.
const ALU_F = 0.6;
const WARM_F = 0.75;

function dewPoint(tC: number, rh: number): number {
  const a = 17.625;
  const b = 243.04;
  const g = Math.log(rh / 100) + (a * tC) / (b + tC);
  return (b * g) / (a - g);
}

export default function SpacerCondensationChecker() {
  const [rh, setRh] = useState(55);
  const [outdoor, setOutdoor] = useState(-5);

  const dp = Math.round(dewPoint(INDOOR, rh) * 10) / 10;
  const aluEdge = Math.round((outdoor + ALU_F * (INDOOR - outdoor)) * 10) / 10;
  const warmEdge = Math.round((outdoor + WARM_F * (INDOOR - outdoor)) * 10) / 10;
  const aluWet = aluEdge < dp;
  const warmWet = warmEdge < dp;

  function Card(props: { label: string; edge: number; wet: boolean }) {
    return (
      <div className={"rounded-lg border p-4 " + (props.wet ? "border-red-300 bg-red-50" : "border-emerald-300 bg-emerald-50")}>
        <p className="text-sm font-semibold text-brand-dark">{props.label}</p>
        <p className="mt-1 text-sm text-brand-dark">Edge temperature: {props.edge} C</p>
        <p className={"mt-2 text-sm font-semibold " + (props.wet ? "text-red-700" : "text-emerald-700")}>
          {props.wet ? "Condensation likely" : "Edge stays dry"}
        </p>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-xl border border-black/10 bg-white p-5 md:p-6">
      <p className="text-xs uppercase tracking-wider text-brand-accent font-semibold">Interactive</p>
      <h3 className="font-display text-lg font-bold text-brand-dark">Will the glass edge fog up?</h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="text-sm text-brand-muted">
          Indoor humidity: <span className="font-semibold text-brand-dark">{rh}%</span>
          <input type="range" min={30} max={70} step={1} value={rh} onChange={(e) => setRh(Number(e.target.value))} className="mt-1 block w-full" aria-label="Indoor relative humidity percent" />
        </label>
        <label className="text-sm text-brand-muted">
          Outdoor temperature: <span className="font-semibold text-brand-dark">{outdoor} C</span>
          <input type="range" min={-20} max={10} step={1} value={outdoor} onChange={(e) => setOutdoor(Number(e.target.value))} className="mt-1 block w-full" aria-label="Outdoor temperature in Celsius" />
        </label>
      </div>
      <p className="mt-3 text-sm text-brand-muted">
        Indoor air {INDOOR} C. At {rh}% humidity the dew point is {dp} C: any surface colder than that collects water.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card label="Aluminum spacer" edge={aluEdge} wet={aluWet} />
        <Card label="Warm edge spacer" edge={warmEdge} wet={warmWet} />
      </div>
      <p className="mt-4 text-xs text-brand-muted">
        Indicative model using fixed edge temperature factors (aluminum {ALU_F}, warm edge {WARM_F}). Real edge
        temperature depends on frame, glass build-up and install. Use it to see the direction, not to certify a design.
      </p>
    </div>
  );
}
