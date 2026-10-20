"use client";

import { useState } from "react";
type PhaseId = "define" | "shortlist" | "vet" | "rfq" | "produce" | "ship";
interface Phase {
  id: PhaseId;
  num: number;
  label: string;
  shortLabel: string;
  owner: string;
  timeWeeks: string;
  summary: string;
  keyRisks: string[];
  deepDiveSlug: string | null;
  deepDiveLabel: string | null;
}
const PHASES: Phase[] = [{
  id: "define",
  num: 1,
  label: "Definir la especificación",
  shortLabel: "Define Spec",
  owner: "You (buyer / architect)",
  timeWeeks: "1–2 weeks",
  summary: "Redacte una especificación contra la cual la fábrica pueda cotizar: composición del vidrio, dimensiones, trabajo de bordes, clase de templado, tipo de lámina intermedia, recubrimiento, normas que debe cumplir (IBC (Código Internacional de Construcción), EN, GB, AS) y régimen de inspección. Las especificaciones vagas producen cotizaciones vagas, y la variación de cotizaciones entre proveedores en esta etapa suele ser un problema de especificación, no un problema del proveedor.",
  keyRisks: ["Scope creep after RFQ sent — forces re-quoting", "Missing standard references invite the cheapest factory to bid", "Edge finish and hole positions omitted → surcharges mid-production"],
  deepDiveSlug: null,
  deepDiveLabel: null
}, {
  id: "shortlist",
  num: 2,
  label: "Preseleccionar fábricas candidatas",
  shortLabel: "Shortlist",
  owner: "You (buyer)",
  timeWeeks: "1–3 weeks",
  summary: "Elabore una lista corta de 4–8 fábricas chinas que fabriquen la línea de productos específica que necesita (no todas las fábricas de vidrio arquitectónico producen UVA (Unidad de Vidrio Aislante) de gran formato; no todas laminan con SGP (SentryGlas Plus)). Fuentes: Alibaba, Made-in-China, LinkedIn, ferias comerciales, referencias de clientes. El objetivo es una lista de candidatos plausibles; la verificación es la siguiente fase.",
  keyRisks: ["Trading company presenting as factory (common on Alibaba)", "Factory capability mismatch — they take the order and sub-contract it", "English-only marketing site with no verifiable Chinese registration"],
  deepDiveSlug: null,
  deepDiveLabel: null
}, {
  id: "vet",
  num: 3,
  label: "Verificar cada fábrica preseleccionada",
  shortLabel: "Vet Suppliers",
  owner: "You (buyer) + third-party inspector",
  timeWeeks: "2–4 weeks",
  summary: "Verifique la entidad legal (licencia comercial, registro de fábrica, NIF), las certificaciones (ISO 9001, CE, certificación 3C, SGCC según corresponda), la capacidad de producción (auditoría en video de las líneas que coincidan con su especificación) y la reputación (referencias de clientes, historial de disputas). Aquí es donde los 5 riesgos de aprovisionamiento se detectan o se pasan por alto.",
  keyRisks: ["Fake or expired certifications", "Rented factory floor shown as owned", "Production capability demo on sample lines, not production lines", "Reference customers that cannot be independently reached"],
  deepDiveSlug: "architectural-glass-supplier-china-vetting",
  deepDiveLabel: "Deep-dive: Supplier Vetting Threat Model"
}, {
  id: "rfq",
  num: 4,
  label: "Solicitud de cotización, muestras y contrato",
  shortLabel: "RFQ + Sample",
  owner: "You + factory sales",
  timeWeeks: "3–6 weeks",
  summary: "Envíe la especificación a 3 fábricas verificadas y compare las cotizaciones punto por punto (no solo el precio unitario: evalúe el trabajo de bordes, el embalaje, la gestión portuaria y el plazo de entrega). Encargue una muestra de pago. Firme un contrato que contemple: Incoterm, calendario de pagos, derechos de inspección, tolerancia de defectos, daños y perjuicios pactados por retraso en la entrega y foro de resolución de disputas.",
  keyRisks: ["Lowest-quote supplier wins on undisclosed thickness tolerance", "No sample ordered → first production batch is also the first inspection", "Payment terms outside buyer's risk tolerance (100% T/T upfront)", "No contractual inspection right → factory refuses pre-shipment audit later"],
  deepDiveSlug: "how-to-import-glass-from-china",
  deepDiveLabel: "Deep-dive: 5-Stage Import Journey"
}, {
  id: "produce",
  num: 5,
  label: "Inspección durante la producción y previa al embarque",
  shortLabel: "Produce + Inspect",
  owner: "Factory, with your inspector",
  timeWeeks: "4–10 weeks",
  summary: "La fábrica produce. Usted programa una verificación a mitad de producción (líneas ejecutando su pedido en el equipo acordado) y una inspección previa al embarque (muestra aleatoria de los embalajes, control dimensional y visual de calidad contra especificación). Este es el último punto en el que solucionar un problema cuesta semanas, no meses.",
  keyRisks: ["Factory substitutes thinner glass or cheaper interlayer when buyer skips mid-production check", "Pre-shipment inspection waived to meet shipping deadline → defects discovered on arrival", "Edge-chipping or color variance not caught before crating"],
  deepDiveSlug: null,
  deepDiveLabel: null
}, {
  id: "ship",
  num: 6,
  label: "Embarque, despacho aduanero y entrega",
  shortLabel: "Ship + Land",
  owner: "Factory + freight forwarder + you",
  timeWeeks: "4–8 weeks (sea)",
  summary: "Embalaje en cajas, carga del contenedor, reserva, conocimiento de embarque, seguro marítimo, despacho aduanero en el puerto de destino, transporte terrestre interior e inspección de llegada. El riesgo de rotura alcanza su punto máximo en los traspasos de caja a contenedor y de contenedor a camión. El seguro solo cubre si existen fotografías de las cajas y registros de inspección.",
  keyRisks: ["FCL vs LCL decision made on freight cost alone, ignoring handling risk", "Marine insurance clause (ICC A/B/C) chosen without reading what glass claims actually pay", "HS code misclassified → container held at port for weeks", "No pre-seal container photos → damaged-on-arrival claim denied"],
  deepDiveSlug: "glass-shipping-container-loading-guide",
  deepDiveLabel: "Deep-dive: Container Loading Playbook"
}];
export default function SourcingLifecycleMap() {
  const [activeId, setActiveId] = useState<PhaseId>("define");
  const active = PHASES.find(p => p.id === activeId) || PHASES[0];
  return <div className="my-10 rounded-2xl bg-[#3A4250]/15 border border-[#3A4250]/40 p-5 md:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
          Interactivo · El Ciclo de Abastecimiento desde China
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-[#F2F0ED] m-0">
          Seis fases, desde la especificación inicial hasta el vidrio instalado en obra
        </h3>
        <p className="text-sm text-[#8B95A5] leading-relaxed mt-2 m-0">
          Haga clic en cualquier fase para ver qué ocurre en ella, quién es el responsable y qué guía especializada la cubre.
        </p>
      </div>

      {/* SVG pipeline */}
      <div className="overflow-x-auto -mx-5 md:-mx-8 px-5 md:px-8 pb-2">
        <svg viewBox="0 0 720 140" className="w-full min-w-[640px] h-auto" role="img" aria-label="Ciclo de abastecimiento desde China en seis fases">
          {/* Connector line */}
          <line x1="60" y1="70" x2="660" y2="70" stroke="#3A4250" strokeWidth="2" />

          {PHASES.map((p, i) => {
          const cx = 60 + i * 120;
          const isActive = p.id === activeId;
          const circleFill = isActive ? "#DAA745" : "#3A4250";
          const circleStroke = isActive ? "#DAA745" : "#8B95A5";
          const numColor = isActive ? "#1C1F26" : "#F2F0ED";
          const labelColor = isActive ? "#DAA745" : "#8B95A5";
          return <g key={p.id} onClick={() => setActiveId(p.id)} style={{
            cursor: "pointer"
          }} role="button" tabIndex={0} aria-label={`Phase ${p.num}: ${p.label}`} aria-pressed={isActive} onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveId(p.id);
            }
          }}>
                <circle cx={cx} cy={70} r={isActive ? 24 : 20} fill={circleFill} stroke={circleStroke} strokeWidth="2" />
                <text x={cx} y={70} textAnchor="middle" dominantBaseline="middle" fill={numColor} fontSize="14" fontWeight="700">
                  {p.num}
                </text>
                <text x={cx} y={115} textAnchor="middle" fill={labelColor} fontSize="11" fontWeight={isActive ? "600" : "500"}>
                  {p.shortLabel}
                </text>
              </g>;
        })}
        </svg>
      </div>

      {/* Active phase detail */}
      <div key={active.id} className="mt-6 bg-[#1C1F26]/60 rounded-xl p-5 md:p-6 border border-[#3A4250]/30 animate-fadeUp">
        <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div>
            <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-1">
              Phase {active.num} de 6
            </div>
            <h4 className="text-lg md:text-xl font-bold text-[#F2F0ED] m-0">
              {active.label}
            </h4>
          </div>
          <div className="flex gap-4 text-xs text-[#8B95A5]">
            <div>
              <div className="text-[#8B95A5]/60 uppercase tracking-wider mb-0.5">Owner</div>
              <div className="text-[#F2F0ED]">{active.owner}</div>
            </div>
            <div>
              <div className="text-[#8B95A5]/60 uppercase tracking-wider mb-0.5">Time</div>
              <div className="text-[#F2F0ED]">{active.timeWeeks}</div>
            </div>
          </div>
        </div>

        <p className="text-sm text-[#F2F0ED]/90 leading-relaxed mb-4 m-0">
          {active.summary}
        </p>

        <div className="mb-4">
          <div className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase mb-2">
            Riesgos clave en esta fase
          </div>
          <ul className="space-y-1.5 list-none pl-0 m-0">
            {active.keyRisks.map((risk, i) => <li key={i} className="flex gap-2 text-xs text-[#8B95A5] leading-relaxed">
                <span className="text-[#DAA745] flex-shrink-0 mt-0.5">▸</span>
                <span>{risk}</span>
              </li>)}
          </ul>
        </div>

        {active.deepDiveSlug && <a href={`/blog/${active.deepDiveSlug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#DAA745] hover:text-[#c4952e] transition-colors no-underline">
            {active.deepDiveLabel} →
          </a>}
      </div>
    </div>;
}