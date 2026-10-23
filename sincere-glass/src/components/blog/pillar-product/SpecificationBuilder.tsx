"use client";

import { useMemo, useState } from "react";

type SubstrateKey = "clear" | "ultra-clear" | "tinted" | "reflective";
type ProcessingKey = "annealed" | "tempered" | "heat-strengthened" | "laminated-pvb" | "laminated-sgp" | "temp-laminated";
type ThicknessKey = "6" | "8" | "10" | "12" | "15" | "19";
type AssemblyKey = "mono" | "igu-2" | "igu-3";
type CoatingKey = "none" | "low-e-soft" | "low-e-hard" | "solar-control" | "enameled";
type SizeKey = "standard" | "large" | "jumbo";

const SUBSTRATES: Record<SubstrateKey, { label: string; code: string; note: string }> = {
  "clear": { label: "Clear float", code: "C", note: "Standard soda-lime. ~88% VLT at 6mm." },
  "ultra-clear": { label: "Ultra-clear (low-iron)", code: "UC", note: "~91% VLT, no green tint. ~15% premium." },
  "tinted": { label: "Tinted (bronze/grey/blue)", code: "T", note: "Body-tinted for solar control; VLT 40-70% depending on color." },
  "reflective": { label: "Reflective coated", code: "R", note: "Pyrolytic coating; mirrored exterior appearance." },
};

const PROCESSING: Record<ProcessingKey, { label: string; code: string; note: string }> = {
  "annealed": { label: "Annealed (raw float)", code: "A", note: "No heat treatment. Not safety glazing per most codes." },
  "tempered": { label: "Tempered (fully toughened)", code: "T", note: "4-5x annealed strength; GB 15763.2 / EN 12150 safety." },
  "heat-strengthened": { label: "Heat-strengthened", code: "HS", note: "~2x annealed; non-safety but low NiS risk, favored for IGU outer lite." },
  "laminated-pvb": { label: "Laminated (PVB)", code: "L-PVB", note: "Fragment retention + sound reduction." },
  "laminated-sgp": { label: "Laminated (SGP)", code: "L-SGP", note: "100x stiffer than PVB post-break; required for structural railings." },
  "temp-laminated": { label: "Tempered-laminated", code: "T+L", note: "Combines safety fragmentation with retention." },
};

const THICKNESS: Record<ThicknessKey, { label: string; note: string }> = {
  "6": { label: "6 mm", note: "Interior partitions, light balustrades, smaller shower doors." },
  "8": { label: "8 mm", note: "Standard shower doors, light storefronts." },
  "10": { label: "10 mm", note: "Standard balustrade, mid-span storefronts." },
  "12": { label: "12 mm", note: "Sweet spot: long-span canopies, 1.1m balustrades, display windows." },
  "15": { label: "15 mm", note: "Structural fins, high wind-load point-fixed, pool fencing >1.2m." },
  "19": { label: "19 mm", note: "Walk-on floor glass (usually laminated), heavy fins." },
};

const ASSEMBLY: Record<AssemblyKey, { label: string; code: string; note: string }> = {
  "mono": { label: "Monolithic (single pane)", code: "", note: "No cavity. Baseline cost." },
  "igu-2": { label: "Double IGU (two panes + cavity)", code: "+12A+", note: "Standard thermal; U-value 1.1-1.6 with Low-E and argon." },
  "igu-3": { label: "Triple IGU (three panes + two cavities)", code: "+12A+6+12A+", note: "Passive-house grade; U-value <0.8." },
};

const COATING: Record<CoatingKey, { label: string; code: string; note: string }> = {
  "none": { label: "No coating", code: "", note: "Baseline optical performance." },
  "low-e-soft": { label: "Low-E (soft coat, sputtered)", code: " Low-E#2", note: "Best thermal performance. Must be inside IGU; cannot be exposed." },
  "low-e-hard": { label: "Low-E (hard coat, pyrolytic)", code: " Low-E-h", note: "Can be used on monolithic or outer face. Lower performance than soft coat." },
  "solar-control": { label: "Solar control coating", code: " SC", note: "Reduces solar heat gain; often combined with Low-E." },
  "enameled": { label: "Ceramic frit / enameled", code: " CF", note: "Opaque or patterned; back-painted for spandrels." },
};

const SIZE: Record<SizeKey, { label: string; note: string }> = {
  "standard": { label: "Standard (up to 2.4 x 3.0 m)", note: "Shipped in universal crates; standard container efficiency." },
  "large": { label: "Large (up to 2.4 x 6.0 m)", note: "Requires A-frame crating; still fits standard 40'HQ container." },
  "jumbo": { label: "Jumbo (up to 3.0 x 15.0 m)", note: "Our envelope ceiling. Requires flat-rack or open-top; shipping engineered per project." },
};

type Step = {
  key: string;
  title: string;
  question: string;
};

const STEPS: Step[] = [
  { key: "substrate", title: "Substrate", question: "What base glass are you specifying?" },
  { key: "processing", title: "Processing", question: "How is the glass heat-treated or laminated?" },
  { key: "thickness", title: "Thickness", question: "What nominal thickness per lite?" },
  { key: "assembly", title: "Assembly", question: "Monolithic or IGU?" },
  { key: "coating", title: "Coating", question: "What functional coating is applied?" },
  { key: "size", title: "Panel size", question: "What is the maximum panel size envelope?" },
];

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
    return [
      SUBSTRATES[substrate].label,
      PROCESSING[processing].label,
      `${THICKNESS[thickness].label} per lite`,
      ASSEMBLY[assembly].label,
      COATING[coating].label,
      SIZE[size].label,
    ].join(" / ");
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

  return (
    <div className="my-10 rounded-2xl border border-[#3A4250]/40 bg-[#1C1F26] p-6 sm:p-8">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-1">
          Interactive: Specification Builder
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          Build a glass specification in 6 steps
        </h3>
      </div>

      {/* Step progress */}
      <div className="flex gap-1 mb-6" role="progressbar" aria-valuemin={0} aria-valuemax={STEPS.length} aria-valuenow={step + 1}>
        {STEPS.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setStep(i)}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              i <= step ? "bg-[#DAA745]" : "bg-[#3A4250]/60"
            }`}
            aria-label={`Go to step ${i + 1}: ${s.title}`}
          />
        ))}
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
            {step === 0 && (
              Object.entries(SUBSTRATES).map(([key, v]) => (
                <OptionRow
                  key={key}
                  active={substrate === key}
                  onClick={() => setSubstrate(key as SubstrateKey)}
                  label={v.label}
                  note={v.note}
                />
              ))
            )}
            {step === 1 && (
              Object.entries(PROCESSING).map(([key, v]) => (
                <OptionRow
                  key={key}
                  active={processing === key}
                  onClick={() => setProcessing(key as ProcessingKey)}
                  label={v.label}
                  note={v.note}
                />
              ))
            )}
            {step === 2 && (
              Object.entries(THICKNESS).map(([key, v]) => (
                <OptionRow
                  key={key}
                  active={thickness === key}
                  onClick={() => setThickness(key as ThicknessKey)}
                  label={v.label}
                  note={v.note}
                />
              ))
            )}
            {step === 3 && (
              Object.entries(ASSEMBLY).map(([key, v]) => (
                <OptionRow
                  key={key}
                  active={assembly === key}
                  onClick={() => setAssembly(key as AssemblyKey)}
                  label={v.label}
                  note={v.note}
                />
              ))
            )}
            {step === 4 && (
              Object.entries(COATING).map(([key, v]) => (
                <OptionRow
                  key={key}
                  active={coating === key}
                  onClick={() => setCoating(key as CoatingKey)}
                  label={v.label}
                  note={v.note}
                />
              ))
            )}
            {step === 5 && (
              Object.entries(SIZE).map(([key, v]) => (
                <OptionRow
                  key={key}
                  active={size === key}
                  onClick={() => setSize(key as SizeKey)}
                  label={v.label}
                  note={v.note}
                />
              ))
            )}
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="text-sm px-4 py-2 rounded-lg border border-[#3A4250]/60 text-[#8B95A5] hover:text-[#F2F0ED] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              &larr; Back
            </button>
            <button
              type="button"
              onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))}
              disabled={step === STEPS.length - 1}
              className="text-sm px-4 py-2 rounded-lg bg-[#DAA745] text-[#1C1F26] font-bold hover:bg-[#c4963e] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next &rarr;
            </button>
          </div>
        </div>

        {/* Right: live spec output */}
        <div className="rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 p-5 h-fit lg:sticky lg:top-6">
          <div className="text-xs uppercase tracking-wider text-[#8B95A5] mb-2">
            Your spec
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

          <button
            type="button"
            onClick={handleCopy}
            className="w-full text-sm px-4 py-2.5 rounded-lg bg-[#DAA745] text-[#1C1F26] font-bold hover:bg-[#c4963e] transition-colors"
          >
            {copied ? "Copied ✓" : "Copy spec"}
          </button>
          <p className="text-[11px] text-[#8B95A5] mt-3 leading-relaxed">
            Paste this into your RFQ or email. We quote from the code plus your drawings in one working day.
          </p>
        </div>
      </div>
    </div>
  );
}

function OptionRow({
  active,
  onClick,
  label,
  note,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  note: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-lg border p-3 transition-colors ${
        active
          ? "border-[#DAA745] bg-[#DAA745]/10"
          : "border-[#3A4250]/60 bg-[#3A4250]/10 hover:border-[#8B95A5]/60"
      }`}
    >
      <div className={`text-sm font-semibold mb-0.5 ${active ? "text-[#DAA745]" : "text-[#F2F0ED]"}`}>
        {label}
      </div>
      <div className="text-xs text-[#8B95A5] leading-relaxed">{note}</div>
    </button>
  );
}

function RowKV({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-[#8B95A5] flex-shrink-0">{k}</span>
      <span className="text-[#F2F0ED] text-right">{v}</span>
    </div>
  );
}
