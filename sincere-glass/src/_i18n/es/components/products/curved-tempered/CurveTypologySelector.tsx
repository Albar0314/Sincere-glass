"use client";

import { useState } from "react";

/**
 * Three canonical curve typologies for architectural glass: single-axis
 * cylindrical (one direction, most common), double-axis spherical (dome-like,
 * harder to produce), and free-form (sculpted panels for signature facades).
 * Click a tile to see the SVG geometry, typical applications, achievable
 * tolerance, mold requirement, and MOQ. Rendered as SVG so the geometry is
 * crawlable to AI readers even without JavaScript execution.
 */

type Typology = {
  key: string;
  name: string;
  oneLine: string;
  svg: React.ReactNode;
  applications: string[];
  tolerance: string;
  mold: string;
  moq: string;
  leadTime: string;
  cost: "Lower" | "Medium" | "Higher";
};
const typologies: Typology[] = [{
  key: "cylindrical",
  name: "Cilíndrico (un solo eje)",
  oneLine: "Glass curves in one direction only — like a sheet rolled into a tube.",
  svg: <svg viewBox="0 0 160 100" className="w-full h-full">
        <defs>
          <linearGradient id="cyl-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#DAA745" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#DAA745" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#DAA745" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path d="M 20 70 Q 80 20 140 70 L 140 85 Q 80 35 20 85 Z" fill="url(#cyl-grad)" stroke="#DAA745" strokeWidth="1.5" />
        <path d="M 20 70 Q 80 20 140 70" fill="none" stroke="#DAA745" strokeWidth="2" />
        <text x="80" y="98" textAnchor="middle" fill="#8B95A5" className="text-[9px]">un eje de curvatura</text>
      </svg>,
  applications: ["Núcleos de ascensores y elevadores panorámicos", "Escaparates curvos y vitrinas", "Fachadas cilíndricas de edificios", "Mesas de conferencias redondas y mostradores de recepción"],
  tolerance: "±2 mm on chord, ±1° on angle",
  mold: "Reusable steel mold per radius",
  moq: "Low — single panels possible",
  leadTime: "15-25 days",
  cost: "Lower"
}, {
  key: "spherical",
  name: "Esférico (doble eje)",
  oneLine: "Glass curves in both directions — like a shallow dish or dome segment.",
  svg: <svg viewBox="0 0 160 100" className="w-full h-full">
        <defs>
          <radialGradient id="sph-grad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#DAA745" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#DAA745" stopOpacity="0.05" />
          </radialGradient>
        </defs>
        <ellipse cx="80" cy="55" rx="60" ry="30" fill="url(#sph-grad)" stroke="#DAA745" strokeWidth="1.5" />
        <ellipse cx="80" cy="55" rx="60" ry="8" fill="none" stroke="#DAA745" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
        <ellipse cx="80" cy="55" rx="20" ry="30" fill="none" stroke="#DAA745" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
        <text x="80" y="98" textAnchor="middle" fill="#8B95A5" className="text-[9px]">dos ejes de curvatura</text>
      </svg>,
  applications: ["Claraboyas de cúpula y cubiertas con óculo", "Cerramientos de miradores y plataformas de observación", "Fachadas escultóricas esféricas", "Instalaciones para planetarios y museos"],
  tolerance: "±4 mm on chord, ±2° on angle",
  mold: "Custom-cast refractory mold per piece",
  moq: "Project-based — mold cost amortized across quantity",
  leadTime: "35-55 days (mold casting dominant)",
  cost: "Higher"
}, {
  key: "freeform",
  name: "Forma libre (asimétrico)",
  oneLine: "Panels follow a non-standard curve generated from the architect's 3D model.",
  svg: <svg viewBox="0 0 160 100" className="w-full h-full">
        <defs>
          <linearGradient id="ff-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DAA745" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#DAA745" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path d="M 20 75 C 40 20, 80 90, 100 40 S 140 60, 145 70 L 145 85 C 140 75, 100 55, 100 55 C 80 100, 40 35, 20 90 Z" fill="url(#ff-grad)" stroke="#DAA745" strokeWidth="1.5" />
        <path d="M 20 75 C 40 20, 80 90, 100 40 S 140 60, 145 70" fill="none" stroke="#DAA745" strokeWidth="2" />
        <text x="80" y="98" textAnchor="middle" fill="#8B95A5" className="text-[9px]">perfil asimétrico</text>
      </svg>,
  applications: ["Fachadas singulares de edificios emblemáticos (aeropuertos, museos)", "Marquesinas escultóricas y elementos de entrada", "Muros cortina paramétricos", "Acristalamiento para yates y embarcaciones de lujo"],
  tolerance: "±3 mm along defined profile",
  mold: "CNC-cut mold matched to architect's 3D model",
  moq: "Each panel unique — minimum 4 panels per profile",
  leadTime: "45-70 days from approved 3D model",
  cost: "Higher"
}];
export default function CurveTypologySelector() {
  const [active, setActive] = useState<string>("cylindrical");
  const current = typologies.find(t => t.key === active) || typologies[0];
  return <div className="rounded-2xl bg-white border border-gray-200 p-6 md:p-8 shadow-sm">
      <div className="mb-5">
        <h3 className="font-display text-xl md:text-2xl font-bold text-brand-dark">
          Tres Tipologías de Curvatura
        </h3>
        <p className="text-sm text-brand-muted mt-1">
          Las distintas geometrías de curvatura requieren diferentes utillajes y establecen distintos costos base. Seleccione una para ver sus especificaciones.
        </p>
      </div>

      {/* Tile selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {typologies.map(t => {
        const isActive = t.key === active;
        return <button key={t.key} onClick={() => setActive(t.key)} className={"text-left rounded-xl border-2 p-4 transition-all " + (isActive ? "border-brand-accent bg-brand-accent/5 shadow-md" : "border-gray-200 bg-white hover:border-gray-300")}>
              <div className="aspect-[8/5] mb-3 rounded-md bg-gradient-to-br from-gray-50 to-white border border-gray-100 overflow-hidden">
                {t.svg}
              </div>
              <div className="font-semibold text-brand-dark text-sm leading-tight">{t.name}</div>
            </button>;
      })}
      </div>

      {/* Detail panel */}
      <div className="rounded-xl bg-brand-lighter/40 p-5 border border-gray-100">
        <p className="text-brand-dark/80 mb-4 text-sm leading-relaxed italic">{current.oneLine}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-brand-muted mb-2">
              Aplicaciones típicas
            </p>
            <ul className="space-y-1.5">
              {current.applications.map(app => <li key={app} className="flex items-start gap-2 text-sm text-brand-dark/85">
                  <span className="text-brand-accent mt-0.5">▸</span>
                  <span>{app}</span>
                </li>)}
            </ul>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-brand-muted mb-1">
                Tolerancia dimensional
              </p>
              <p className="text-sm text-brand-dark/85">{current.tolerance}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-brand-muted mb-1">
                Requisito de molde
              </p>
              <p className="text-sm text-brand-dark/85">{current.mold}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-brand-muted mb-1">
                  MOQ
                </p>
                <p className="text-sm text-brand-dark/85">{current.moq}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-brand-muted mb-1">
                  Plazo de entrega
                </p>
                <p className="text-sm text-brand-dark/85">{current.leadTime}</p>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-brand-muted mb-1">
                Costo relativo
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-brand-dark">{current.cost}</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3].map(i => <div key={i} className={"w-6 h-1.5 rounded-full " + (current.cost === "Lower" && i === 1 ? "bg-emerald-500" : current.cost === "Medium" && i <= 2 ? "bg-brand-accent" : current.cost === "Higher" ? "bg-red-400" : "bg-gray-200")} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}