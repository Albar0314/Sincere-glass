"use client";

import { useMemo, useState } from "react";
type SubstrateKey = "clear" | "ultra-clear" | "tinted" | "reflective";
type ProcessingKey = "annealed" | "tempered" | "heat-strengthened" | "laminated-pvb" | "laminated-sgp" | "temp-laminated";
type ThicknessKey = "6" | "8" | "10" | "12" | "15" | "19";
type AssemblyKey = "mono" | "igu-2" | "igu-3";
type CoatingKey = "none" | "low-e-soft" | "low-e-hard" | "solar-control" | "enameled";
type SizeKey = "standard" | "large" | "jumbo";
const SUBSTRATES: Record<SubstrateKey, {
  label: string;
  code: string;
  note: string;
}> = {
  "clear": {
    label: "Flotado transparente",
    code: "C",
    note: "Sodo-cálcico estándar. ~88% de transmitancia visible a 6mm de espesor."
  },
  "ultra-clear": {
    label: "Ultra-transparente (bajo contenido en hierro)",
    code: "UC",
    note: "~91% de transmitancia visible, sin tinte verdoso. Prima de ~15%."
  },
  "tinted": {
    label: "Tintado (bronce/gris/azul)",
    code: "T",
    note: "Tintado en masa para control solar; transmitancia visible del 40-70% según el color."
  },
  "reflective": {
    label: "Con recubrimiento reflectante",
    code: "R",
    note: "Recubrimiento pirolítico; aspecto exterior espejado."
  }
};
const PROCESSING: Record<ProcessingKey, {
  label: string;
  code: string;
  note: string;
}> = {
  "annealed": {
    label: "Vidrio recocido (flotado en bruto)",
    code: "A",
    note: "Sin tratamiento térmico. No cumple como acristalamiento de seguridad según la mayoría de normativas."
  },
  "tempered": {
    label: "Vidrio templado (totalmente)",
    code: "T",
    note: "Resistencia 4-5 veces superior al vidrio recocido; seguridad conforme a GB 15763.2 / EN 12150."
  },
  "heat-strengthened": {
    label: "Heat-strengthened",
    code: "HS",
    note: "~2 veces la resistencia del vidrio recocido; no es vidrio de seguridad, pero con bajo riesgo de NiS; preferido para la hoja exterior de UVA (Unidad de Vidrio Aislante)."
  },
  "laminated-pvb": {
    label: "Vidrio laminado (PVB (polivinil butiral))",
    code: "L-PVB",
    note: "Retención de fragmentos + reducción acústica."
  },
  "laminated-sgp": {
    label: "Laminado (SGP (SentryGlas Plus))",
    code: "L-SGP",
    note: "100 veces más rígido que el PVB (polivinil butiral) tras la rotura; requerido para barandillas estructurales."
  },
  "temp-laminated": {
    label: "Tempered-laminated",
    code: "T+L",
    note: "Combina la fragmentación de seguridad con la retención."
  }
};
const THICKNESS: Record<ThicknessKey, {
  label: string;
  note: string;
}> = {
  "6": {
    label: "6 mm",
    note: "Particiones interiores, barandillas de vidrio ligeras, mamparas de ducha pequeñas."
  },
  "8": {
    label: "8 mm",
    note: "Mamparas de ducha estándar, escaparates ligeros."
  },
  "10": {
    label: "10 mm",
    note: "Barandilla de vidrio estándar, escaparates de vano intermedio."
  },
  "12": {
    label: "12 mm",
    note: "Punto óptimo: marquesinas de gran vano, barandillas de vidrio de 1,1 m, escaparates de exposición."
  },
  "15": {
    label: "15 mm",
    note: "Aletas estructurales, fijación puntual para alta carga de viento, cerramiento de piscinas >1,2 m."
  },
  "19": {
    label: "19 mm",
    note: "Vidrio de suelo transitable (generalmente laminado), aletas pesadas."
  }
};
const ASSEMBLY: Record<AssemblyKey, {
  label: string;
  code: string;
  note: string;
}> = {
  "mono": {
    label: "Monolítico (hoja única)",
    code: "",
    note: "Sin cámara. Coste base."
  },
  "igu-2": {
    label: "UVA (Unidad de Vidrio Aislante) doble (dos hojas + cámara)",
    code: "+12A+",
    note: "Térmico estándar; valor U 1,1-1,6 con vidrio de baja emisividad (Low-E) y relleno de argón."
  },
  "igu-3": {
    label: "UVA (Unidad de Vidrio Aislante) triple (tres hojas + dos cámaras)",
    code: "+12A+6+12A+",
    note: "Nivel casa pasiva; valor U <0,8."
  }
};
const COATING: Record<CoatingKey, {
  label: string;
  code: string;
  note: string;
}> = {
  "none": {
    label: "Sin recubrimiento",
    code: "",
    note: "Rendimiento óptico base."
  },
  "low-e-soft": {
    label: "Vidrio de baja emisividad (Low-E) (capa blanda, por pulverización catódica)",
    code: " Low-E#2",
    note: "Máximo rendimiento térmico. Debe ubicarse en el interior de la UVA (Unidad de Vidrio Aislante); no puede quedar expuesto."
  },
  "low-e-hard": {
    label: "Vidrio de baja emisividad (Low-E) (capa dura, pirolítica)",
    code: " Low-E-h",
    note: "Puede usarse en vidrio monolítico o en la cara exterior. Rendimiento inferior al de la capa blanda."
  },
  "solar-control": {
    label: "Recubrimiento de control solar",
    code: " SC",
    note: "Reduce la ganancia de calor solar; frecuentemente combinado con vidrio de baja emisividad (Low-E)."
  },
  "enameled": {
    label: "Vidrio con frita cerámica / vidrio esmaltado",
    code: " CF",
    note: "Opaco o con patrón; pintado por el reverso para vidrio spandrel."
  }
};
const SIZE: Record<SizeKey, {
  label: string;
  note: string;
}> = {
  "standard": {
    label: "Estándar (hasta 2,4 x 3,0 m)",
    note: "Enviado en cajas universales; eficiencia estándar de contenedor."
  },
  "large": {
    label: "Grande (hasta 2,4 x 6,0 m)",
    note: "Requiere embalaje en bastidor tipo A; cabe en contenedor estándar de 40' HQ."
  },
  "jumbo": {
    label: "Jumbo (hasta 3,0 x 15,0 m)",
    note: "Nuestro límite máximo de dimensiones. Requiere plataforma plana o techo abierto; envío diseñado por proyecto."
  }
};
type Step = {
  key: string;
  title: string;
  question: string;
};
const STEPS: Step[] = [{
  key: "substrate",
  title: "Substrate",
  question: "¿Qué vidrio base está especificando?"
}, {
  key: "processing",
  title: "Processing",
  question: "¿Cómo se somete el vidrio a tratamiento térmico o laminado?"
}, {
  key: "thickness",
  title: "Thickness",
  question: "¿Cuál es el espesor nominal por hoja?"
}, {
  key: "assembly",
  title: "Assembly",
  question: "¿Monolítico o UVA (Unidad de Vidrio Aislante)?"
}, {
  key: "coating",
  title: "Coating",
  question: "¿Qué recubrimiento funcional se aplica?"
}, {
  key: "size",
  title: "Tamaño del panel",
  question: "¿Cuál es el formato máximo del panel?"
}];
export default function SpecificationBuilder() {
  const [step, setStep] = useState(0);
  const [substrate, setSubstrate] = useState<SubstrateKey>("clear");
  const [processing, setProcessing] = useState<ProcessingKey>("tempered");
  const [thickness, setThickness] = useState<ThicknessKey>("12");
  const [assembly, setAssembly] = useState<AssemblyKey>("mono");
  const [coating, setCoating] = useState<CoatingKey>("none");
  const [size, setSize] = useState<SizeKey>("standard");
  const [copied, setCopied] = useState(false);
  const code = useMemo(() => {
    const sub = SUBSTRATES[substrate].code;
    const t = thickness;
    const proc = PROCESSING[processing].code;
    const asm = ASSEMBLY[assembly].code;
    const coat = COATING[coating].code;
    if (assembly === "mono") {
      return `${t}${proc === "A" ? "" : proc}${coat}`.trim();
    }
    if (assembly === "igu-2") {
      return `${t}${proc === "A" ? "" : proc}${asm}${t}${proc === "A" ? "" : proc}${coat}`.trim();
    }
    return `${t}${proc === "A" ? "" : proc}+12A+6+12A+${t}${proc === "A" ? "" : proc}${coat}`.trim();
  }, [substrate, thickness, processing, assembly, coating]);
  const fullDescriptor = useMemo(() => {
    return [SUBSTRATES[substrate].label, PROCESSING[processing].label, `${THICKNESS[thickness].label} per lite`, ASSEMBLY[assembly].label, COATING[coating].label, SIZE[size].label].join(" / ");
  }, [substrate, processing, thickness, assembly, coating, size]);
  function handleCopy() {
    const payload = `Spec: ${code}\n${fullDescriptor}`;
    try {
      navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API unavailable - no-op.
    }
  }
  return <div className="my-10 rounded-2xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 sm:p-8">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-1">
          Interactivo: Configurador de Especificaciones
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          Cree una especificación de vidrio en 6 pasos
        </h3>
      </div>

      {/* Step progress */}
      <div className="flex gap-1 mb-6" role="progressbar" aria-valuemin={0} aria-valuemax={STEPS.length} aria-valuenow={step + 1}>
        {STEPS.map((s, i) => <button key={s.key} type="button" onClick={() => setStep(i)} className={`flex-1 h-1.5 rounded-full transition-colors ${i <= step ? "bg-[#DAA745]" : "bg-[#3A4250]/60"}`} aria-label={`Go to step ${i + 1}: ${s.title}`} />)}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Left: question + options */}
        <div>
          <div className="text-xs text-[#8B95A5] mb-1">
            Step {step + 1} of {STEPS.length} &mdash; {STEPS[step].title}
          </div>
          <h4 className="text-base font-semibold text-[#F2F0ED] mb-4 m-0">
            {STEPS[step].question}
          </h4>

          <div className="space-y-2">
            {step === 0 && Object.entries(SUBSTRATES).map(([key, v]) => <OptionRow key={key} active={substrate === key} onClick={() => setSubstrate(key as SubstrateKey)} label={v.label} note={v.note} />)}
            {step === 1 && Object.entries(PROCESSING).map(([key, v]) => <OptionRow key={key} active={processing === key} onClick={() => setProcessing(key as ProcessingKey)} label={v.label} note={v.note} />)}
            {step === 2 && Object.entries(THICKNESS).map(([key, v]) => <OptionRow key={key} active={thickness === key} onClick={() => setThickness(key as ThicknessKey)} label={v.label} note={v.note} />)}
            {step === 3 && Object.entries(ASSEMBLY).map(([key, v]) => <OptionRow key={key} active={assembly === key} onClick={() => setAssembly(key as AssemblyKey)} label={v.label} note={v.note} />)}
            {step === 4 && Object.entries(COATING).map(([key, v]) => <OptionRow key={key} active={coating === key} onClick={() => setCoating(key as CoatingKey)} label={v.label} note={v.note} />)}
            {step === 5 && Object.entries(SIZE).map(([key, v]) => <OptionRow key={key} active={size === key} onClick={() => setSize(key as SizeKey)} label={v.label} note={v.note} />)}
          </div>

          <div className="flex items-center justify-between mt-6">
            <button type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="text-sm px-4 py-2 rounded-lg border border-[#3A4250]/60 text-[#8B95A5] hover:text-[#F2F0ED] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              ← Volver
            </button>
            <button type="button" onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))} disabled={step === STEPS.length - 1} className="text-sm px-4 py-2 rounded-lg bg-[#DAA745] text-[#1C1F26] font-bold hover:bg-[#c4963e] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              Siguiente →
            </button>
          </div>
        </div>

        {/* Right: live spec output */}
        <div className="rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 p-5 h-fit lg:sticky lg:top-6">
          <div className="text-xs uppercase tracking-wider text-[#8B95A5] mb-2">
            Su especificación
          </div>
          <div className="font-mono text-lg text-[#DAA745] break-all mb-4 min-h-[2.4em]">
            {code || "—"}
          </div>

          <div className="space-y-2 text-xs text-[#8B95A5] mb-5">
            <RowKV k="Substrate" v={SUBSTRATES[substrate].label} />
            <RowKV k="Processing" v={PROCESSING[processing].label} />
            <RowKV k="Thickness" v={THICKNESS[thickness].label} />
            <RowKV k="Assembly" v={ASSEMBLY[assembly].label} />
            <RowKV k="Coating" v={COATING[coating].label} />
            <RowKV k="Size" v={SIZE[size].label} />
          </div>

          <button type="button" onClick={handleCopy} className="w-full text-sm px-4 py-2.5 rounded-lg bg-[#DAA745] text-[#1C1F26] font-bold hover:bg-[#c4963e] transition-colors">
            {copied ? "Copied ✓" : "Copy spec"}
          </button>
          <p className="text-[11px] text-[#8B95A5] mt-3 leading-relaxed">
            Pegue esto en su RFQ o correo electrónico. Emitimos cotización a partir del código más sus planos en un día hábil.
          </p>
        </div>
      </div>
    </div>;
}
function OptionRow({
  active,
  onClick,
  label,
  note
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  note: string;
}) {
  return <button type="button" onClick={onClick} className={`w-full text-left rounded-lg border p-3 transition-colors ${active ? "border-[#DAA745] bg-[#DAA745]/10" : "border-[#3A4250]/60 bg-[#3A4250]/10 hover:border-[#8B95A5]/60"}`}>
      <div className={`text-sm font-semibold mb-0.5 ${active ? "text-[#DAA745]" : "text-[#F2F0ED]"}`}>
        {label}
      </div>
      <div className="text-xs text-[#8B95A5] leading-relaxed">{note}</div>
    </button>;
}
function RowKV({
  k,
  v
}: {
  k: string;
  v: string;
}) {
  return <div className="flex justify-between gap-3">
      <span className="text-[#8B95A5] flex-shrink-0">{k}</span>
      <span className="text-[#F2F0ED] text-right">{v}</span>
    </div>;
}