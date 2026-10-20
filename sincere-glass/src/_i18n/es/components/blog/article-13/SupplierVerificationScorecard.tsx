"use client";

import { useMemo, useState } from "react";
type ItemKey = "iso9001" | "ccc" | "en" | "license" | "exportRights" | "furnaceSize" | "capacity" | "portfolio" | "responseTime" | "sampling";
interface Item {
  key: ItemKey;
  label: string;
  weight: number;
  detail: string;
  group: "credentials" | "capability" | "communication";
}
const ITEMS: Item[] = [{
  key: "iso9001",
  group: "credentials",
  weight: 10,
  label: "Gestión de Calidad ISO 9001:2015",
  detail: "Auditoría independiente del sistema de gestión de calidad. Requisito mínimo para un proveedor serio."
}, {
  key: "ccc",
  group: "credentials",
  weight: 10,
  label: "Certificado 3C (CCC) de China",
  detail: "Obligatoria para vidrio de seguridad arquitectónico vendido o exportado desde China. Sin certificación 3C = fábrica sin habilitación legal."
}, {
  key: "en",
  group: "credentials",
  weight: 10,
  label: "EN 12150-1 / EN 14449 (para exportación a la UE)",
  detail: "Obligatorio para el marcado CE en Europa. Solicite el informe de ensayo, no el folleto comercial."
}, {
  key: "license",
  group: "credentials",
  weight: 5,
  label: "Licencia comercial y domicilio de fábrica verificados",
  detail: "Confirme que el nombre en la licencia coincide con la entidad emisora de la factura. Las empresas comercializadoras son aceptables; las opacas, no."
}, {
  key: "exportRights",
  group: "credentials",
  weight: 5,
  label: "Derechos de exportación independientes (sin intermediarios)",
  detail: "Los exportadores directos emiten su propia factura comercial y conocimiento de embarque, lo que simplifica las reclamaciones."
}, {
  key: "furnaceSize",
  group: "capability",
  weight: 15,
  label: "El horno / autoclave puede manejar su panel de mayor tamaño",
  detail: "Un horno de 2,5 m no puede templar un panel de 2,8 m. Confirme las dimensiones máximas del equipo por escrito antes de solicitar cotización."
}, {
  key: "capacity",
  group: "capability",
  weight: 10,
  label: "Capacidad mensual ≥ 3× el volumen de su pedido",
  detail: "Nunca conviene representar más de un tercio de la producción de una fábrica. El plazo de entrega se alarga cuando llega un pedido mayor."
}, {
  key: "portfolio",
  group: "capability",
  weight: 10,
  label: "Al menos 3 proyectos de referencia en una categoría de producto similar",
  detail: "Solicite fotografías, nombres de proyecto y la composición del vidrio especificada. Las respuestas vagas indican ausencia de un portafolio real."
}, {
  key: "responseTime",
  group: "communication",
  weight: 15,
  label: "Respuesta técnica en menos de 24 h en su idioma de trabajo",
  detail: "Las preguntas de especificación deben recibir una respuesta de especificación, no un \"sí, podemos hacerlo\". Compruébelo antes de firmar."
}, {
  key: "sampling",
  group: "communication",
  weight: 10,
  label: "Dispuesto a enviar una muestra de pago antes de la orden de compra",
  detail: "Una fábrica real enviará una muestra (a veces gratuita, con frecuencia de pago). Un intermediario duda porque la muestra no le pertenece."
}];
const GROUP_LABELS: Record<Item["group"], string> = {
  credentials: "Credentials (40 pts)",
  capability: "Capability (35 pts)",
  communication: "Communication (25 pts)"
};
function tier(score: number) {
  if (score >= 81) return {
    label: "Preferred Supplier",
    color: "#DAA745",
    ring: "#DAA745",
    note: "Strong match. Proceed to RFQ."
  };
  if (score >= 61) return {
    label: "Qualified",
    color: "#8CB369",
    ring: "#8CB369",
    note: "Qualified for shortlist. Verify the open items before PO."
  };
  if (score >= 31) return {
    label: "Caution",
    color: "#D4A24C",
    ring: "#D4A24C",
    note: "Risk is real. Only proceed with a factory audit and payment safeguards."
  };
  return {
    label: "High Risk",
    color: "#C06060",
    ring: "#C06060",
    note: "Walk away or restart due diligence from the credentials row."
  };
}
export default function SupplierVerificationScorecard() {
  const [checked, setChecked] = useState<Record<ItemKey, boolean>>({
    iso9001: false,
    ccc: false,
    en: false,
    license: false,
    exportRights: false,
    furnaceSize: false,
    capacity: false,
    portfolio: false,
    responseTime: false,
    sampling: false
  });
  const score = useMemo(() => ITEMS.reduce((sum, item) => checked[item.key] ? sum + item.weight : sum, 0), [checked]);
  const t = tier(score);
  const dashOffset = 2 * Math.PI * 70 * (1 - score / 100);
  const groups: Item["group"][] = ["credentials", "capability", "communication"];
  return <div className="my-10 rounded-2xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 md:p-8">
      <div className="grid md:grid-cols-[1fr_240px] gap-8">
        <div>
          <h3 className="text-base font-semibold text-[#DAA745] uppercase tracking-wider mb-1">
            Interactive
          </h3>
          <h4 className="text-xl font-bold text-[#F2F0ED] mb-5">
            Ficha de verificación de proveedores
          </h4>
          <p className="text-sm text-[#8B95A5] leading-relaxed mb-6">
            Marque lo que haya verificado por escrito. La puntuación se actualiza en tiempo real y el nivel cambia en 31, 61 y 81.
          </p>

          <div className="space-y-5">
            {groups.map(g => <div key={g}>
                <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
                  {GROUP_LABELS[g]}
                </div>
                <ul className="space-y-2">
                  {ITEMS.filter(i => i.group === g).map(item => <li key={item.key}>
                      <label className="flex gap-3 items-start cursor-pointer group">
                        <input type="checkbox" checked={checked[item.key]} onChange={e => setChecked({
                    ...checked,
                    [item.key]: e.target.checked
                  })} className="mt-1 accent-[#DAA745] flex-shrink-0 w-4 h-4" />
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-medium text-[#F2F0ED] group-hover:text-[#DAA745] transition-colors">
                              {item.label}
                            </span>
                            <span className="text-xs text-[#DAA745]/80 font-mono">
                              +{item.weight}
                            </span>
                          </div>
                          <p className="text-xs text-[#8B95A5] mt-0.5 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </label>
                    </li>)}
                </ul>
              </div>)}
          </div>
        </div>

        <div className="md:sticky md:top-24 self-start">
          <div className="relative w-full aspect-square max-w-[220px] mx-auto">
            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
              <circle cx="80" cy="80" r="70" fill="none" stroke="#3A4250" strokeOpacity="0.35" strokeWidth="10" />
              <circle cx="80" cy="80" r="70" fill="none" stroke={t.ring} strokeWidth="10" strokeLinecap="round" strokeDasharray={2 * Math.PI * 70} strokeDashoffset={dashOffset} style={{
              transition: "stroke-dashoffset 400ms ease, stroke 300ms ease"
            }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-[#F2F0ED] leading-none">{score}</div>
              <div className="text-xs text-[#8B95A5] mt-1 tracking-wider">/ 100</div>
            </div>
          </div>
          <div className="mt-5 text-center rounded-xl p-4" style={{
          background: `${t.color}18`,
          border: `1px solid ${t.color}55`
        }}>
            <div className="text-sm font-semibold" style={{
            color: t.color
          }}>
              {t.label}
            </div>
            <p className="text-xs text-[#8B95A5] mt-2 leading-relaxed">{t.note}</p>
          </div>
        </div>
      </div>
    </div>;
}