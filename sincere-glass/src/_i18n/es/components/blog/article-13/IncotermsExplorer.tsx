"use client";

import { useState } from "react";
type Term = "EXW" | "FOB" | "CIF" | "DDP";
interface TermData {
  key: Term;
  name: string;
  summary: string;
  sellerCovers: string;
  buyerCovers: string;
  riskTransfer: string;
  bestFor: string;
  /** Index of the last segment the seller is responsible for (0..5) */
  sellerLastSegment: number;
}
const TERMS: TermData[] = [{
  key: "EXW",
  name: "Ex Works (EXW)",
  summary: "Usted recoge el vidrio en la puerta de la fábrica en Wuhan. La responsabilidad del vendedor termina cuando los embalajes están listos en el muelle de carga.",
  sellerCovers: "Production, packing, crates ready at factory.",
  buyerCovers: "Inland trucking, export clearance, port fees, ocean freight, insurance, import clearance, destination delivery.",
  riskTransfer: "At the factory gate, before the truck is loaded.",
  bestFor: "Buyers with a strong China-side forwarder who want full control over logistics.",
  sellerLastSegment: 0
}, {
  key: "FOB",
  name: "Free On Board (FOB Shanghái / Ningbo)",
  summary: "El vendedor coloca la mercancía a bordo del buque en un puerto chino designado. El Incoterm más habitual para el vidrio en contenedor exportado desde China.",
  sellerCovers: "Production, packing, inland trucking to port, export clearance, port handling, loaded onto vessel.",
  buyerCovers: "Ocean freight, insurance, import clearance, destination port fees, inland delivery.",
  riskTransfer: "Once goods are on board the vessel at the port of loading.",
  bestFor: "Buyers who already have a freight forwarder quoting ocean rates and want apples-to-apples factory comparisons.",
  sellerLastSegment: 2
}, {
  key: "CIF",
  name: "Cost, Insurance & Freight (CIF Puerto de Destino)",
  summary: "El vendedor paga el flete marítimo y el seguro mínimo hasta el puerto de destino designado. El comprador sigue siendo responsable del despacho aduanero y del transporte en destino.",
  sellerCovers: "Everything through to arrival at the destination port, including ocean freight and basic marine insurance.",
  buyerCovers: "Import duty, VAT/GST, customs clearance, destination port handling fees, inland delivery to site.",
  riskTransfer: "Still at the port of loading in China (not at the destination port — a common buyer misunderstanding).",
  bestFor: "Buyers who want a single landed-at-port number but accept the risk transfer stays in China.",
  sellerLastSegment: 3
}, {
  key: "DDP",
  name: "Delivered Duty Paid (DDP Obra de Destino)",
  summary: "El vendedor entrega la mercancía, despachada en aduana de importación con aranceles pagados, en el lugar acordado. Poco frecuente en vidrio arquitectónico — verifique qué está realmente incluido.",
  sellerCovers: "Full chain through import clearance, duty, VAT, and final delivery to the site.",
  buyerCovers: "Unloading at site, local permits, onsite handling.",
  riskTransfer: "At the agreed delivery location in the buyer's country.",
  bestFor: "Buyers who want a single invoice number and are willing to pay a premium for the seller to carry risk end-to-end.",
  sellerLastSegment: 5
}];
const SEGMENTS = [{
  label: "Factory",
  x: 60
}, {
  label: "Transporte terrestre interior",
  x: 160
}, {
  label: "Puerto de exportación",
  x: 260
}, {
  label: "Flete marítimo",
  x: 400
}, {
  label: "Puerto de importación",
  x: 540
}, {
  label: "Site",
  x: 640
}];
export default function IncotermsExplorer() {
  const [active, setActive] = useState<Term>("FOB");
  const term = TERMS.find(t => t.key === active)!;
  return <div className="my-10 rounded-2xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 md:p-8">
      <h3 className="text-base font-semibold text-[#DAA745] uppercase tracking-wider mb-1">
        Interactive
      </h3>
      <h4 className="text-xl font-bold text-[#F2F0ED] mb-5">
        Incoterms 2020 para Embarques de Vidrio
      </h4>

      <div className="flex flex-wrap gap-2 mb-6">
        {TERMS.map(t => {
        const isActive = active === t.key;
        return <button key={t.key} onClick={() => setActive(t.key)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${isActive ? "bg-[#DAA745] text-[#1C1F26]" : "bg-[#3A4250]/30 text-[#F2F0ED] hover:bg-[#3A4250]/50"}`}>
              {t.key}
            </button>;
      })}
      </div>

      <div className="rounded-xl bg-[#3A4250]/15 border border-[#3A4250]/30 p-5 mb-5 overflow-x-auto">
        <svg viewBox="0 0 700 180" className="w-full h-auto min-w-[560px]">
          {/* Base route line */}
          <line x1="60" y1="90" x2="640" y2="90" stroke="#3A4250" strokeWidth="4" strokeLinecap="round" />
          {/* Seller segment overlay */}
          <line x1="60" y1="90" x2={SEGMENTS[term.sellerLastSegment].x} y2="90" stroke="#DAA745" strokeWidth="4" strokeLinecap="round" style={{
          transition: "all 350ms ease"
        }} />
          {/* Risk transfer marker */}
          <g style={{
          transition: "transform 350ms ease"
        }} transform={`translate(${SEGMENTS[term.sellerLastSegment].x}, 90)`}>
            <circle r="10" fill="#1C1F26" stroke="#DAA745" strokeWidth="2.5" />
            <circle r="4" fill="#DAA745" />
          </g>
          {/* Segment pins */}
          {SEGMENTS.map((seg, i) => {
          const isSeller = i <= term.sellerLastSegment;
          return <g key={seg.label} transform={`translate(${seg.x}, 90)`}>
                <circle r="6" fill={isSeller ? "#DAA745" : "#3A4250"} stroke="#1C1F26" strokeWidth="2" style={{
              transition: "fill 350ms ease"
            }} />
                <text y="30" textAnchor="middle" fill={isSeller ? "#F2F0ED" : "#8B95A5"} fontSize="11" fontWeight="500" style={{
              transition: "fill 350ms ease"
            }}>
                  {seg.label}
                </text>
              </g>;
        })}
          {/* Legend */}
          <g transform="translate(60, 150)">
            <line x1="0" y1="0" x2="24" y2="0" stroke="#DAA745" strokeWidth="4" strokeLinecap="round" />
            <text x="32" y="4" fontSize="11" fill="#8B95A5">El vendedor asume el costo y el riesgo</text>
            <line x1="200" y1="0" x2="224" y2="0" stroke="#3A4250" strokeWidth="4" strokeLinecap="round" />
            <text x="232" y="4" fontSize="11" fill="#8B95A5">El comprador asume el costo y el riesgo</text>
          </g>
        </svg>
      </div>

      <div>
        <h5 className="text-lg font-bold text-[#F2F0ED] mb-2">{term.name}</h5>
        <p className="text-sm text-[#8B95A5] leading-relaxed mb-5">{term.summary}</p>

        <div className="grid md:grid-cols-2 gap-4 mb-5">
          <div className="rounded-lg bg-[#DAA745]/10 border border-[#DAA745]/30 p-4">
            <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
              El vendedor cubre
            </div>
            <p className="text-sm text-[#F2F0ED] leading-relaxed">{term.sellerCovers}</p>
          </div>
          <div className="rounded-lg bg-[#3A4250]/20 border border-[#3A4250]/40 p-4">
            <div className="text-xs font-semibold text-[#8B95A5] uppercase tracking-wider mb-2">
              El comprador cubre
            </div>
            <p className="text-sm text-[#F2F0ED] leading-relaxed">{term.buyerCovers}</p>
          </div>
        </div>

        <div className="rounded-lg bg-[#1C1F26] border border-[#3A4250]/40 p-4 mb-3">
          <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1">
            Transferencia de riesgo
          </div>
          <p className="text-sm text-[#F2F0ED] leading-relaxed">{term.riskTransfer}</p>
        </div>

        <div className="rounded-lg bg-[#1C1F26] border border-[#3A4250]/40 p-4">
          <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1">
            Idóneo para
          </div>
          <p className="text-sm text-[#F2F0ED] leading-relaxed">{term.bestFor}</p>
        </div>
      </div>
    </div>;
}