"use client";

import { useMemo, useState } from "react";
type MakeUp = "mono" | "laminated" | "igu";
type Verdict = "pass" | "limited" | "fail";
interface GateResult {
  gate: string;
  verdict: Verdict;
  note: string;
}
interface ThicknessOption {
  value: string;
  label: string;
  make: MakeUp;
}

// Industry context (used in gate reasoning):
// - Standard tempering furnace envelope:  2.6 x 5.0 m  (what most Chinese shops have)
// - Mid-jumbo furnace:                     3.0 x 8.0 m  (notable upgrade; smaller supplier set)
// - Full jumbo furnace:                    3.0 x 15.0 m (Sincere Wuhan tier; globally rare)
// - Ultra-jumbo furnace:                   3.3+ x 18+ m (handful worldwide; Northern Europe / specialty Asia)
//
// - Standard laminating autoclave:        ~2.5 x 6.0 m
// - Jumbo dry-laminating autoclave:        3.0 x 15.0 m (Sincere Wuhan)
//
// - Standard sealed IG line:              ~2.5 x 4.0 m
// - Jumbo sealed IG line:                  3.0 x 6.0 m (Sincere Wuhan ultra-large auto gas-fill)
//
// - Transport longest-side bands:
//    <= 5.8  m  -> fits 20'DC
//    <= 11.8 m  -> fits 40'HQ (with A-frame)
//    <= 12.0 m  -> fits 40' flat rack
//    >  12.0 m  -> breakbulk / project cargo

const SINCERE_FURNACE_W = 3000; // mm, short side
const SINCERE_FURNACE_L = 15000; // mm, long side
const STANDARD_FURNACE_W = 2600;
const STANDARD_FURNACE_L = 5000;
const SINCERE_AUTOCLAVE_W = 3000;
const SINCERE_AUTOCLAVE_L = 15000;
const STANDARD_AUTOCLAVE_W = 2500;
const STANDARD_AUTOCLAVE_L = 6000;
const SINCERE_IG_W = 3000;
const SINCERE_IG_L = 6000;
const STANDARD_IG_W = 2500;
const STANDARD_IG_L = 4000;
const THICKNESS_OPTIONS: ThicknessOption[] = [{
  value: "6",
  label: "6 mm",
  make: "mono"
}, {
  value: "8",
  label: "8 mm",
  make: "mono"
}, {
  value: "10",
  label: "10 mm",
  make: "mono"
}, {
  value: "12",
  label: "12 mm",
  make: "mono"
}, {
  value: "15",
  label: "15 mm",
  make: "mono"
}, {
  value: "19",
  label: "19 mm",
  make: "mono"
}, {
  value: "6+6",
  label: "6+6 mm",
  make: "laminated"
}, {
  value: "8+8",
  label: "8+8 mm",
  make: "laminated"
}, {
  value: "10+10",
  label: "10+10 mm",
  make: "laminated"
}, {
  value: "12+12",
  label: "12+12 mm",
  make: "laminated"
}, {
  value: "6+12A+6",
  label: "6+12A+6",
  make: "igu"
}, {
  value: "8+12A+8",
  label: "8+12A+8",
  make: "igu"
}, {
  value: "10+12A+10",
  label: "10+12A+10",
  make: "igu"
}];
const MAKEUP_LABEL: Record<MakeUp, string> = {
  mono: "Monolithic tempered",
  laminated: "Laminated (PVB or SGP)",
  igu: "Insulated glass unit"
};
function orient(w: number, h: number): [short: number, long: number] {
  return w <= h ? [w, h] : [h, w];
}
function fits(short: number, long: number, limW: number, limL: number): boolean {
  return short <= limW && long <= limL;
}
function checkFurnace(w: number, h: number, make: MakeUp): GateResult {
  if (make === "igu") {
    return {
      gate: "Tempering furnace",
      verdict: "pass",
      note: "IGU constituent lites are tempered individually; see IG line gate for the sealed unit."
    };
  }
  const [s, l] = orient(w, h);
  if (fits(s, l, STANDARD_FURNACE_W, STANDARD_FURNACE_L)) {
    return {
      gate: "Tempering furnace",
      verdict: "pass",
      note: "Fits a standard 2.6 x 5 m furnace. Most tempering shops worldwide can run this."
    };
  }
  if (fits(s, l, SINCERE_FURNACE_W, SINCERE_FURNACE_L)) {
    return {
      gate: "Tempering furnace",
      verdict: "limited",
      note: "Needs a jumbo furnace (>5 m length or >2.6 m width). Fits inside the Sincere Wuhan 3 x 15 m line."
    };
  }
  return {
    gate: "Tempering furnace",
    verdict: "fail",
    note: "Exceeds 3 x 15 m. Only a handful of ultra-jumbo furnaces worldwide (typically Northern European or specialty Asian plants) can run this."
  };
}
function checkAutoclave(w: number, h: number, make: MakeUp): GateResult {
  if (make !== "laminated") {
    return {
      gate: "Laminating autoclave",
      verdict: "pass",
      note: "Not applicable for this make-up."
    };
  }
  const [s, l] = orient(w, h);
  if (fits(s, l, STANDARD_AUTOCLAVE_W, STANDARD_AUTOCLAVE_L)) {
    return {
      gate: "Laminating autoclave",
      verdict: "pass",
      note: "Fits a standard 2.5 x 6 m autoclave. Common across qualified laminating lines."
    };
  }
  if (fits(s, l, SINCERE_AUTOCLAVE_W, SINCERE_AUTOCLAVE_L)) {
    return {
      gate: "Laminating autoclave",
      verdict: "limited",
      note: "Needs a jumbo autoclave. Sincere Wuhan runs a 3 x 15 m dry-laminating autoclave that accepts this panel."
    };
  }
  return {
    gate: "Laminating autoclave",
    verdict: "fail",
    note: "Exceeds 3 x 15 m autoclave envelope. Options narrow to vacuum-bag lamination or ultra-rare oversized autoclaves."
  };
}
function checkIG(w: number, h: number, make: MakeUp): GateResult {
  if (make !== "igu") {
    return {
      gate: "IG line",
      verdict: "pass",
      note: "Not applicable for this make-up."
    };
  }
  const [s, l] = orient(w, h);
  if (fits(s, l, STANDARD_IG_W, STANDARD_IG_L)) {
    return {
      gate: "IG line",
      verdict: "pass",
      note: "Fits a standard 2.5 x 4 m sealed-IGU line."
    };
  }
  if (fits(s, l, SINCERE_IG_W, SINCERE_IG_L)) {
    return {
      gate: "IG line",
      verdict: "limited",
      note: "Needs a jumbo IG line (>4 m length or >2.5 m width). Sincere Wuhan runs an ultra-large auto gas-fill line that accepts this panel."
    };
  }
  return {
    gate: "IG line",
    verdict: "fail",
    note: "Exceeds 3 x 6 m sealed-IGU envelope. Spacer bending radius, dual-seal gantry reach, and warm-edge availability collapse the global supplier set to a handful."
  };
}
function checkTransport(w: number, h: number): GateResult {
  const [, l] = orient(w, h);
  if (l <= 5800) {
    return {
      gate: "Transport",
      verdict: "pass",
      note: "Longest side under 5.8 m fits a standard 20'DC container."
    };
  }
  if (l <= 11800) {
    return {
      gate: "Transport",
      verdict: "pass",
      note: "Fits a 40'HQ container with A-frame cradle. Standard ocean freight."
    };
  }
  if (l <= 12000) {
    return {
      gate: "Transport",
      verdict: "limited",
      note: "Needs a 40' flat rack or open-top. Rate carries an oversized-cargo surcharge but still liner-booked."
    };
  }
  return {
    gate: "Transport",
    verdict: "limited",
    note: "Beyond 12 m: breakbulk / project cargo on a dedicated vessel with purpose-built A-frame crates. Add 2 to 4 weeks and a project-cargo quote."
  };
}
const VERDICT_RANK: Record<Verdict, number> = {
  pass: 0,
  limited: 1,
  fail: 2
};
function worstVerdict(results: GateResult[]): Verdict {
  let worst: Verdict = "pass";
  for (const r of results) {
    if (VERDICT_RANK[r.verdict] > VERDICT_RANK[worst]) {
      worst = r.verdict;
    }
  }
  return worst;
}
const VERDICT_STYLE: Record<Verdict, {
  bg: string;
  border: string;
  text: string;
  dot: string;
  label: string;
}> = {
  pass: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/40",
    text: "text-emerald-300",
    dot: "bg-emerald-400",
    label: "Pass"
  },
  limited: {
    bg: "bg-[#DAA745]/10",
    border: "border-[#DAA745]/40",
    text: "text-[#DAA745]",
    dot: "bg-[#DAA745]",
    label: "Jumbo-only"
  },
  fail: {
    bg: "bg-red-500/10",
    border: "border-red-500/40",
    text: "text-red-300",
    dot: "bg-red-400",
    label: "Blocked"
  }
};
export default function JumboCapabilityExplorer() {
  const [make, setMake] = useState<MakeUp>("mono");
  const [thickness, setThickness] = useState<string>("12");
  const [w, setW] = useState<number>(2800);
  const [h, setH] = useState<number>(8000);

  // When make changes, reset thickness to the first option that matches.
  function changeMake(next: MakeUp) {
    setMake(next);
    const firstMatch = THICKNESS_OPTIONS.find(o => o.make === next);
    if (firstMatch) setThickness(firstMatch.value);
  }
  const availableThickness = useMemo(() => THICKNESS_OPTIONS.filter(o => o.make === make), [make]);
  const gates = useMemo<GateResult[]>(() => {
    return [checkFurnace(w, h, make), checkAutoclave(w, h, make), checkIG(w, h, make), checkTransport(w, h)];
  }, [w, h, make]);
  const overall = useMemo<Verdict>(() => worstVerdict(gates), [gates]);

  // Sincere capability check: all gates pass or limited (not fail) AND panel fits
  // the Sincere envelope (3 x 15 m for mono/laminated; 3 x 6 m for IGU).
  const sincereCanDo = useMemo(() => {
    const [s, l] = orient(w, h);
    if (make === "igu") {
      return s <= SINCERE_IG_W && l <= SINCERE_IG_L;
    }
    return s <= SINCERE_FURNACE_W && l <= SINCERE_FURNACE_L;
  }, [w, h, make]);
  const style = VERDICT_STYLE[overall];
  const [shortSide, longSide] = orient(w, h);
  const area = (w * h / 1_000_000).toFixed(2);
  return <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 md:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
          Verificación Interactiva de Capacidad
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          ¿Es fabricable el panel objetivo?
        </h3>
        <p className="text-sm text-[#8B95A5] mt-2 mb-0">
          Seleccione una composición, elija una configuración de espesor e introduzca las dimensiones finales del panel.
          Los cuatro controles que se muestran a continuación indican qué etapa del proceso limita el panel y
          si la línea Sincere Wuhan puede producirlo.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
            Make-up
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["mono", "laminated", "igu"] as MakeUp[]).map(m => <button key={m} type="button" onClick={() => changeMake(m)} className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors border leading-tight ${make === m ? "bg-[#DAA745] text-[#1C1F26] border-[#DAA745]" : "bg-[#3A4250]/20 text-[#F2F0ED] border-[#3A4250]/40 hover:border-[#DAA745]/60"}`}>
                {m === "mono" ? "Mono" : m === "laminated" ? "Laminated" : "IGU"}
              </button>)}
          </div>
          <p className="text-[11px] text-[#8B95A5] mt-2 m-0">
            {MAKEUP_LABEL[make]}
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
            Build-up
          </label>
          <select value={thickness} onChange={e => setThickness(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]">
            {availableThickness.map(o => <option key={o.value} value={o.value}>
                {o.label}
              </option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
            Ancho (mm)
          </label>
          <input type="number" min={300} max={5000} step={10} value={w} onChange={e => setW(Math.max(300, Math.min(5000, Number(e.target.value) || 0)))} className="w-full px-3 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
            Alto (mm)
          </label>
          <input type="number" min={300} max={20000} step={10} value={h} onChange={e => setH(Math.max(300, Math.min(20000, Number(e.target.value) || 0)))} className="w-full px-3 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]" />
        </div>
      </div>

      {/* Panel summary */}
      <div className="mb-4 rounded-lg bg-[#3A4250]/10 border border-[#3A4250]/30 p-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="text-[#8B95A5]">
          Panel:{" "}
          <span className="text-[#F2F0ED] font-mono">
            {shortSide} x {longSide} mm
          </span>{" "}
          <span className="text-[#8B95A5]">({area} m2)</span>
        </div>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${style.border} ${style.bg} ${style.text}`}>
          <span className={`w-2 h-2 rounded-full ${style.dot}`} />
          General: {style.label}
        </div>
      </div>

      {/* Four gates */}
      <div className="grid gap-3 md:grid-cols-2 mb-5">
        {gates.map(g => {
        const s = VERDICT_STYLE[g.verdict];
        return <div key={g.gate} className={`rounded-lg border p-4 ${s.border} ${s.bg}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold text-[#F2F0ED] uppercase tracking-wider">
                  {g.gate}
                </div>
                <div className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${s.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                  {s.label}
                </div>
              </div>
              <p className="text-xs text-[#8B95A5] leading-relaxed m-0">
                {g.note}
              </p>
            </div>;
      })}
      </div>

      {/* Sincere capability line */}
      <div className={`rounded-lg p-4 border text-sm ${sincereCanDo ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-200" : "bg-[#3A4250]/20 border-[#3A4250]/40 text-[#8B95A5]"}`}>
        {sincereCanDo ? <>
            <strong className="text-emerald-300">
              Sincere Wuhan puede fabricar este panel.
            </strong>{" "}
            Está dentro de nuestra envolvente de horno de templado de 3 x 15 m y autoclave de laminado en seco (o envolvente de UVA (Unidad de Vidrio Aislante) sellada de 3 x 6 m para composiciones de UVA). Puede solicitar cotización directamente.
          </> : <>
            <strong className="text-[#F2F0ED]">
              Esto supera la envolvente de Sincere Wuhan.
            </strong>{" "}
            Los paneles que superan 3 x 15 m (monolítico / laminado) o 3 x 6 m (UVA sellada) los derivamos a líneas especializadas asociadas. El plazo de entrega y el costo aumentan de forma significativa.
          </>}
      </div>
    </div>;
}