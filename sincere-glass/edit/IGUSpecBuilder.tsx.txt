"use client";
// SG-IGU-PRODUCT-UPGRADE-V1 - IGU spec builder for /products/insulated-glass
// ASCII-only source. Renders real default values at SSR (6T Low-E#2 + 12Ar + 6T).
import { useState } from "react";
import { useQuote } from "@/lib/QuoteContext";

const THICKNESSES: number[] = [4, 5, 6, 8, 10, 12];
const CAVITIES: number[] = [6, 9, 12, 15, 20];

// Indicative center-of-glass U-values (W/m2K), EN 673 method, by cavity width index.
const U_TABLE: Record<string, Record<string, Record<string, number[]>>> = {
  double: {
    none: { air: [3.3, 3.0, 2.8, 2.7, 2.8], argon: [3.1, 2.8, 2.7, 2.6, 2.6] },
    single: { air: [2.5, 2.1, 1.8, 1.6, 1.7], argon: [2.1, 1.7, 1.6, 1.4, 1.4] },
    double: { air: [2.4, 1.9, 1.6, 1.4, 1.4], argon: [1.9, 1.5, 1.3, 1.1, 1.1] },
  },
  triple: {
    none: { air: [2.4, 2.1, 1.9, 1.8, 1.8], argon: [2.2, 2.0, 1.8, 1.7, 1.7] },
    single: { air: [1.8, 1.4, 1.1, 1.0, 1.0], argon: [1.4, 1.1, 1.0, 0.9, 0.9] },
    double: { air: [1.7, 1.3, 1.0, 0.9, 0.9], argon: [1.3, 0.9, 0.7, 0.6, 0.6] },
  },
};

const COATING_LABEL: Record<string, string> = {
  none: "No coating",
  single: "Single-silver Low-E",
  double: "Double-silver Low-E",
};

function OptionGroup(props: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-brand-muted font-semibold mb-2">{props.label}</p>
      <div className="flex flex-wrap gap-2">
        {props.options.map((o) => {
          const active = o.value === props.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => props.onChange(o.value)}
              className={
                "px-3 py-1.5 rounded-md text-sm border transition-colors " +
                (active
                  ? "bg-brand-dark text-white border-brand-dark"
                  : "bg-white text-brand-dark border-black/10 hover:border-brand-accent")
              }
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function IGUSpecBuilder() {
  const { openQuote } = useQuote();
  const [panes, setPanes] = useState("double");
  const [outer, setOuter] = useState("6");
  const [inner, setInner] = useState("6");
  const [treatment, setTreatment] = useState("T");
  const [coating, setCoating] = useState("single");
  const [cavity, setCavity] = useState("12");
  const [gas, setGas] = useState("argon");
  const [copied, setCopied] = useState(false);

  const tOuter = Number(outer);
  const tInner = Number(inner);
  const cav = Number(cavity);
  const isTriple = panes === "triple";
  const gasCode = gas === "argon" ? "Ar" : "A";
  const hasCoating = coating !== "none";

  const cavIndex = Math.max(0, CAVITIES.indexOf(cav));
  const uValue = U_TABLE[panes][coating][gas][cavIndex];
  const uImperial = Math.round((uValue / 5.678) * 100) / 100;

  const outerPart = String(tOuter) + treatment + (hasCoating ? " Low-E#2" : "");
  const cavPart = String(cav) + gasCode;
  const innerPart = String(tInner) + treatment;
  const spec = isTriple
    ? outerPart + " + " + cavPart + " + " + innerPart + " + " + cavPart + " + " + innerPart + (hasCoating ? " Low-E#5" : "")
    : outerPart + " + " + cavPart + " + " + innerPart;

  const glassMm = isTriple ? tOuter + tInner * 2 : tOuter + tInner;
  const totalMm = glassMm + (isTriple ? cav * 2 : cav);
  const weight = Math.round(glassMm * 2.5 * 10) / 10;

  let note = "If the unit is a standard window or storefront lite, then this make-up is a balanced default.";
  if (!hasCoating) {
    note = "If there is no Low-E coating, then cavity width and gas fill change the U-value very little. Add Low-E first.";
  } else if (gas === "argon" && cav <= 6) {
    note = "If the cavity is only 6 mm, then argon adds limited benefit. A 12 to 15 mm cavity is the efficient range.";
  } else if (isTriple) {
    note = "If you specify triple glazing, then check frame depth and hardware capacity for " + String(totalMm) + " mm and " + String(weight) + " kg/m2.";
  } else if (cav >= 20) {
    note = "If the cavity is 20 mm, then convection inside the gap cancels most of the gain over 15 mm.";
  }

  const message = [
    "IGU spec from the product page builder:",
    "Make-up: " + spec,
    "Coating: " + COATING_LABEL[coating],
    "Glass: " + (treatment === "T" ? "Tempered" : "Annealed"),
    "Overall thickness: " + String(totalMm) + " mm, about " + String(weight) + " kg/m2",
    "Indicative U-value: " + String(uValue) + " W/m2K (center of glass)",
    "",
    "Sizes and quantity: ",
    "Destination port: ",
  ].join("\n");

  function copySpec() {
    try {
      navigator.clipboard.writeText(spec);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      setCopied(false);
    }
  }

  const thicknessOptions = THICKNESSES.map((t) => ({ value: String(t), label: String(t) + " mm" }));
  const cavityOptions = CAVITIES.map((c) => ({ value: String(c), label: String(c) + " mm" }));

  return (
    <section id="igu-spec-builder" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <p className="text-xs uppercase tracking-wider text-brand-accent font-semibold mb-2">Spec builder</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight">Build your IGU specification</h2>
        <p className="mt-3 text-brand-muted max-w-3xl">
          Pick the pane count, glass thickness, coating, cavity width and gas fill. The builder writes the make-up
          string a glazing schedule uses, then estimates overall thickness, weight (2.5 kg per m2 for each mm of glass)
          and an indicative center-of-glass U-value from an EN 673 lookup. The default shown is 6T Low-E#2 + 12Ar + 6T:
          24 mm overall, 30 kg/m2, about 1.6 W/m2K.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-5">
            <OptionGroup
              label="Pane count"
              value={panes}
              onChange={setPanes}
              options={[
                { value: "double", label: "Double glazed" },
                { value: "triple", label: "Triple glazed" },
              ]}
            />
            <OptionGroup label="Outer pane" value={outer} onChange={setOuter} options={thicknessOptions} />
            <OptionGroup
              label={isTriple ? "Middle and inner panes" : "Inner pane"}
              value={inner}
              onChange={setInner}
              options={thicknessOptions}
            />
            <OptionGroup
              label="Glass treatment"
              value={treatment}
              onChange={setTreatment}
              options={[
                { value: "T", label: "Tempered (T)" },
                { value: "A", label: "Annealed (A)" },
              ]}
            />
            <OptionGroup
              label="Low-E coating"
              value={coating}
              onChange={setCoating}
              options={[
                { value: "none", label: "None" },
                { value: "single", label: "Single silver" },
                { value: "double", label: "Double silver" },
              ]}
            />
            <OptionGroup label="Cavity width" value={cavity} onChange={setCavity} options={cavityOptions} />
            <OptionGroup
              label="Gas fill"
              value={gas}
              onChange={setGas}
              options={[
                { value: "air", label: "Dry air" },
                { value: "argon", label: "Argon" },
              ]}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl bg-brand-dark text-white p-6 lg:sticky lg:top-24">
              <p className="text-xs uppercase tracking-wider text-brand-accent font-semibold">Your make-up</p>
              <p className="mt-2 font-display text-xl font-bold break-words">{spec}</p>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Overall thickness</dt>
                  <dd className="font-semibold">{totalMm} mm</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Weight</dt>
                  <dd className="font-semibold">{weight} kg/m2</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Indicative U-value</dt>
                  <dd className="font-semibold">{uValue} W/m2K</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">US U-factor</dt>
                  <dd className="font-semibold">{uImperial} Btu/h ft2 F</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/60">Coating</dt>
                  <dd className="font-semibold">{COATING_LABEL[coating]}</dd>
                </div>
              </dl>
              <p className="mt-5 text-sm text-white/70">{note}</p>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => openQuote("insulated", message)}
                  className="px-5 py-3 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold rounded-md transition-colors"
                >
                  Get a quote for this spec
                </button>
                <button
                  type="button"
                  onClick={copySpec}
                  className="px-5 py-3 border border-white/20 hover:border-white/40 text-white font-medium rounded-md transition-colors"
                >
                  {copied ? "Copied" : "Copy make-up string"}
                </button>
              </div>
              <p className="mt-4 text-xs text-white/40">
                Indicative values only. Final U-value, SHGC and glass thickness are confirmed by calculation for your
                size, wind load and code at quote stage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
