"use client";

import { useMemo, useState } from "react";

/**
 * Guided RFQ builder for jumbo architectural glass panels.
 * Takes 10 structured fields and outputs a copy-paste RFQ block that
 * includes every detail a jumbo-capable factory needs to quote accurately.
 */

type UseType = "facade" | "overhead" | "balustrade" | "interior" | "shopfront";
type MakeUp = "mono" | "laminated" | "igu";
type Coating = "none" | "lowe-soft" | "lowe-hard" | "enameled";
type EdgeWork = "polished" | "arrissed" | "notched" | "holes";
type Standard = "en" | "astm" | "gb" | "as" | "project";
const USE_LABEL: Record<UseType, string> = {
  facade: "Facade / curtain wall",
  overhead: "Overhead / skylight",
  balustrade: "Balustrade / fin",
  interior: "Interior partition",
  shopfront: "Shopfront / entrance"
};
const COATING_LABEL: Record<Coating, string> = {
  none: "None (clear)",
  "lowe-soft": "Low-E, soft coat",
  "lowe-hard": "Low-E, hard coat",
  enameled: "Enameled / ceramic frit"
};
const EDGE_LABEL: Record<EdgeWork, string> = {
  polished: "Polished",
  arrissed: "Arrissed",
  notched: "Notched",
  holes: "Hole drilling"
};
const STANDARD_LABEL: Record<Standard, string> = {
  en: "EN (EU)",
  astm: "ASTM / CPSC (US)",
  gb: "GB (China)",
  as: "AS (Australia)",
  project: "Project-specific"
};
interface Inputs {
  project: string;
  location: string;
  use: UseType;
  make: MakeUp;
  buildUp: string;
  w: number;
  h: number;
  qty: number;
  coating: Coating;
  edges: EdgeWork[];
  standards: Standard[];
  leadTime: string;
}
function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];
}
function buildRFQ(i: Inputs): string {
  const lines: string[] = [];
  lines.push("Subject: RFQ - Jumbo architectural glass, " + (i.project || "[project name]"));
  lines.push("");
  lines.push("Hello,");
  lines.push("");
  lines.push("Please confirm your production capability for the following panel and send an FOB Wuhan quotation with lead time.");
  lines.push("");
  lines.push("PROJECT");
  lines.push("- Project:            " + (i.project || "[project name]"));
  lines.push("- Site location:      " + (i.location || "[city, country]"));
  lines.push("- Application:        " + USE_LABEL[i.use]);
  lines.push("");
  lines.push("GLASS");
  lines.push("- Make-up:            " + (i.make === "mono" ? "Monolithic tempered" : i.make === "laminated" ? "Laminated (PVB or SGP, please advise)" : "Insulated glass unit (IGU)"));
  lines.push("- Build-up:           " + i.buildUp);
  lines.push("- Panel size:         " + i.w + " mm x " + i.h + " mm");
  lines.push("- Quantity:           " + i.qty + " panel(s)");
  lines.push("- Approx area:        " + (i.w * i.h * i.qty / 1_000_000).toFixed(2) + " m2");
  lines.push("- Coating:            " + COATING_LABEL[i.coating]);
  const edgeStr = i.edges.length ? i.edges.map(e => EDGE_LABEL[e]).join(", ") : "To advise";
  lines.push("- Edge work:          " + edgeStr);
  lines.push("");
  lines.push("STANDARDS AND CERTIFICATION");
  const stdStr = i.standards.length ? i.standards.map(s => STANDARD_LABEL[s]).join(", ") : "To advise";
  lines.push("- Required standards: " + stdStr);
  lines.push("- Heat-soak (EN 14179): required for all tempered lites unless noted");
  lines.push("- Mill test certs:    required with each shipment");
  lines.push("");
  lines.push("COMMERCIAL");
  lines.push("- Lead time target:   " + (i.leadTime || "[weeks or specific date]"));
  lines.push("- Incoterms:          FOB Wuhan / CIF destination (please quote both)");
  lines.push("");
  lines.push("PLEASE CONFIRM EXPLICITLY");
  lines.push("1. Can your tempering furnace process this panel at this size?");
  lines.push("2. If laminated, can your autoclave process this panel at this size?");
  lines.push("3. If IGU, what is your maximum sealed-unit size on this build-up?");
  lines.push("4. What transport mode do you recommend for this panel to this destination?");
  lines.push("5. Lead time from PO signing to FOB Wuhan.");
  lines.push("");
  lines.push("Thank you.");
  return lines.join("\n");
}
export default function JumboRFQBuilder() {
  const [i, setI] = useState<Inputs>({
    project: "",
    location: "",
    use: "facade",
    make: "mono",
    buildUp: "12 mm tempered",
    w: 2800,
    h: 8000,
    qty: 20,
    coating: "lowe-soft",
    edges: ["polished"],
    standards: ["en", "astm"],
    leadTime: "10 to 12 weeks"
  });
  const [copied, setCopied] = useState(false);
  const rfqText = useMemo(() => buildRFQ(i), [i]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(rfqText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore; user can still manually select the textarea
    }
  }
  function set<K extends keyof Inputs>(k: K, v: Inputs[K]) {
    setI(prev => ({
      ...prev,
      [k]: v
    }));
  }
  return <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 md:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
          Constructor Interactivo de Cotización
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          Elabore una solicitud de cotización completa para vidrio jumbo en 10 campos
        </h3>
        <p className="text-sm text-[#8B95A5] mt-2 mb-0">
          Cada campo omitido en una solicitud de cotización de vidrio jumbo representa un intercambio de correos adicional con cada proveedor. Complete los 10 campos a continuación; la herramienta genera un bloque de solicitud de cotización listo para copiar y pegar que incluye las cinco preguntas de confirmación explícita que una fábrica con capacidad para vidrio jumbo debe responder en su primera réplica.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-5">
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1.5">
            Nombre del proyecto
          </label>
          <input type="text" value={i.project} onChange={e => set("project", e.target.value)} placeholder="ej. Terminal Portuaria Fase 2" className="w-full px-3 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1.5">
            Ubicación de la obra
          </label>
          <input type="text" value={i.location} onChange={e => set("location", e.target.value)} placeholder="ej. Dubái, EAU" className="w-full px-3 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1.5">
            Application
          </label>
          <select value={i.use} onChange={e => set("use", e.target.value as UseType)} className="w-full px-3 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]">
            {Object.entries(USE_LABEL).map(([k, v]) => <option key={k} value={k}>
                {v}
              </option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1.5">
            Make-up
          </label>
          <select value={i.make} onChange={e => set("make", e.target.value as MakeUp)} className="w-full px-3 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]">
            <option value="mono">Vidrio templado monolítico</option>
            <option value="laminated">Laminated</option>
            <option value="igu">Unidad de vidrio aislante (UVA)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1.5">
            Detalle de composición
          </label>
          <input type="text" value={i.buildUp} onChange={e => set("buildUp", e.target.value)} placeholder="ej. 10-1.52SGP-10 templado" className="w-full px-3 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1.5">
              Ancho mm
            </label>
            <input type="number" value={i.w} min={300} max={5000} step={10} onChange={e => set("w", Math.max(300, Math.min(5000, Number(e.target.value) || 0)))} className="w-full px-2 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1.5">
              Alto mm
            </label>
            <input type="number" value={i.h} min={300} max={20000} step={10} onChange={e => set("h", Math.max(300, Math.min(20000, Number(e.target.value) || 0)))} className="w-full px-2 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1.5">
              Qty
            </label>
            <input type="number" value={i.qty} min={1} max={2000} step={1} onChange={e => set("qty", Math.max(1, Math.min(2000, Number(e.target.value) || 0)))} className="w-full px-2 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1.5">
            Coating
          </label>
          <select value={i.coating} onChange={e => set("coating", e.target.value as Coating)} className="w-full px-3 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]">
            {Object.entries(COATING_LABEL).map(([k, v]) => <option key={k} value={k}>
                {v}
              </option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1.5">
            Plazo de entrega objetivo
          </label>
          <input type="text" value={i.leadTime} onChange={e => set("leadTime", e.target.value)} placeholder="ej. 10 a 12 semanas desde la OC" className="w-full px-3 py-2 rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745]" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1.5">
            Trabajo de cantos (seleccione todos los que apliquen)
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(EDGE_LABEL) as EdgeWork[]).map(e => {
            const on = i.edges.includes(e);
            return <button key={e} type="button" onClick={() => set("edges", toggle(i.edges, e))} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${on ? "bg-[#DAA745] text-[#1C1F26] border-[#DAA745]" : "bg-[#3A4250]/20 text-[#F2F0ED] border-[#3A4250]/40 hover:border-[#DAA745]/60"}`}>
                  {EDGE_LABEL[e]}
                </button>;
          })}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1.5">
            Normas requeridas (seleccione todas las que apliquen)
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(STANDARD_LABEL) as Standard[]).map(s => {
            const on = i.standards.includes(s);
            return <button key={s} type="button" onClick={() => set("standards", toggle(i.standards, s))} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${on ? "bg-[#DAA745] text-[#1C1F26] border-[#DAA745]" : "bg-[#3A4250]/20 text-[#F2F0ED] border-[#3A4250]/40 hover:border-[#DAA745]/60"}`}>
                  {STANDARD_LABEL[s]}
                </button>;
          })}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-[#0f1116] border border-[#3A4250]/40 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-[#DAA745] uppercase tracking-wider">
            Bloque de solicitud de cotización para copiar y pegar
          </div>
          <button type="button" onClick={copy} className="px-3 py-1.5 bg-[#DAA745] text-[#1C1F26] rounded-full text-xs font-semibold hover:bg-[#c4952e] transition-colors">
            {copied ? "Copied" : "Copy to clipboard"}
          </button>
        </div>
        <textarea readOnly value={rfqText} className="w-full h-80 bg-[#1C1F26] border border-[#3A4250]/60 rounded-lg p-3 text-xs text-[#F2F0ED] font-mono leading-relaxed focus:outline-none focus:border-[#DAA745]" aria-label="Texto de solicitud de cotización generado, listo para copiar." />
      </div>

      <p className="text-[11px] text-[#8B95A5] italic mt-4 m-0">
        Envíe esto a tres o cuatro fábricas con capacidad para formatos jumbo a la vez. Un proveedor que responda afirmativamente todas las preguntas de verificación explícita en el primer correo merece estar en la lista corta. Un proveedor que evite la primera pregunta, no.
      </p>
    </div>;
}