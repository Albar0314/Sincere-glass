"use client";

// src/components/tools/ContainerLoadTool.tsx
// Standalone /tools port of article-14 ContainerLoadingLab.
// The weight/density/container/strategy model is COPIED VERBATIM from
// src/components/blog/article-14/ContainerLoadingLab.tsx so the numbers on the
// tool page and the blog guide never diverge. Standalone additions only:
//   - useHashState so a load plan is shareable via URL hash (zero crawl-budget)
//   - "Get a quote for this load plan" -> QuoteModal prefill
//   - an assumptions footnote (buyer-facing numbers must show their basis)
// If you change a figure here, change it in ContainerLoadingLab.tsx too.

import { useMemo } from "react";
import { useHashState } from "@/lib/useHashState";
import { useQuote } from "@/lib/QuoteContext";

type ContainerKey = "20dc" | "40hq" | "40ot";
type ThicknessKey = "6" | "8" | "10" | "12" | "igu" | "laminated";
type CrateStrategy = "a-frame" | "l-type" | "wooden-box";

interface ContainerSpec {
  key: ContainerKey;
  name: string;
  payloadKg: number;
  internalLengthM: number;
  internalWidthM: number;
  internalHeightM: number;
  volumeCbm: number;
}

const CONTAINERS: Record<ContainerKey, ContainerSpec> = {
  "20dc": { key: "20dc", name: "20′ DC", payloadKg: 28200, internalLengthM: 5.9, internalWidthM: 2.35, internalHeightM: 2.39, volumeCbm: 33 },
  "40hq": { key: "40hq", name: "40′ HQ", payloadKg: 28800, internalLengthM: 12.03, internalWidthM: 2.35, internalHeightM: 2.69, volumeCbm: 76 },
  "40ot": { key: "40ot", name: "40′ Open-Top", payloadKg: 26500, internalLengthM: 12.03, internalWidthM: 2.33, internalHeightM: 2.35, volumeCbm: 66 },
};

const THICKNESS_WEIGHT_KG_PER_M2: Record<ThicknessKey, number> = {
  "6": 15, "8": 20, "10": 25, "12": 30,
  igu: 32, // approx 6+12A+6 IGU
  laminated: 36, // approx 6+1.52PVB+6 laminated
};

const THICKNESS_LABEL: Record<ThicknessKey, string> = {
  "6": "6 mm monolithic",
  "8": "8 mm monolithic",
  "10": "10 mm monolithic",
  "12": "12 mm monolithic",
  igu: "IGU (6+12A+6)",
  laminated: "Laminated (6+1.52PVB+6)",
};

// Approx effective packing density per strategy (m2 per m of container floor length)
const STRATEGY: Record<CrateStrategy, { label: string; densityM2PerM: number; crateWeightShare: number }> = {
  "a-frame": { label: "A-frame crates (vertical, back-tilt)", densityM2PerM: 18, crateWeightShare: 0.12 },
  "l-type": { label: "L-type crates (vertical, back-lean)", densityM2PerM: 14, crateWeightShare: 0.18 },
  "wooden-box": { label: "Fumigated wooden boxes (stacked)", densityM2PerM: 10, crateWeightShare: 0.28 },
};

const CONTAINER_KEYS: ContainerKey[] = ["20dc", "40hq", "40ot"];
const THICKNESS_KEYS: ThicknessKey[] = ["6", "8", "10", "12", "igu", "laminated"];
const STRATEGY_KEYS: CrateStrategy[] = ["a-frame", "l-type", "wooden-box"];

function isContainer(v: string | undefined): v is ContainerKey {
  return !!v && (CONTAINER_KEYS as string[]).includes(v);
}
function isThickness(v: string | undefined): v is ThicknessKey {
  return !!v && (THICKNESS_KEYS as string[]).includes(v);
}
function isStrategy(v: string | undefined): v is CrateStrategy {
  return !!v && (STRATEGY_KEYS as string[]).includes(v);
}

const DEFAULTS: Record<string, string> = {
  container: "40hq",
  thickness: "igu",
  strategy: "l-type",
};

const containerOpts: Record<ContainerKey, string> = {
  "20dc": "20′ Dry (28.2 t payload)",
  "40hq": "40′ High-Cube (28.8 t payload)",
  "40ot": "40′ Open-Top (26.5 t payload)",
};
const stratOpts: Record<CrateStrategy, string> = {
  "a-frame": "A-frame crates (vertical)",
  "l-type": "L-type crates (vertical)",
  "wooden-box": "Fumigated wooden boxes",
};

function Bar({ pct, label, warn }: { pct: number; label: string; warn?: boolean }) {
  const clamped = Math.min(100, Math.max(0, pct));
  const color = warn && clamped > 95 ? "#ef4444" : clamped > 85 ? "#DAA745" : "#8B95A5";
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[#8B95A5]">{label}</span>
        <span className="text-[#F2F0ED] font-semibold">{clamped.toFixed(0)}%</span>
      </div>
      <div className="h-2 rounded-full bg-[#1C1F26] overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${clamped}%`, background: color }} />
      </div>
    </div>
  );
}

export default function ContainerLoadTool() {
  const { openQuote } = useQuote();

  const [hash, setHash] = useHashState<Record<string, string>>(DEFAULTS, (raw, fb) => ({
    container: isContainer(raw.container) ? raw.container : fb.container,
    thickness: isThickness(raw.thickness) ? raw.thickness : fb.thickness,
    strategy: isStrategy(raw.strategy) ? raw.strategy : fb.strategy,
  }));

  const container = hash.container as ContainerKey;
  const thickness = hash.thickness as ThicknessKey;
  const strategy = hash.strategy as CrateStrategy;

  const result = useMemo(() => {
    const c = CONTAINERS[container];
    const kgPerM2 = THICKNESS_WEIGHT_KG_PER_M2[thickness];
    const strat = STRATEGY[strategy];

    // Available payload for glass only (after crate weight share)
    const glassPayloadKg = c.payloadKg * (1 - strat.crateWeightShare);
    const weightLimitedM2 = glassPayloadKg / kgPerM2;

    // Volume-limited glass: usable floor length (minus 0.3 m door clearance) * density
    const usableLengthM = Math.max(0, c.internalLengthM - 0.3);
    const volumeLimitedM2 = usableLengthM * strat.densityM2PerM;

    const limiting = weightLimitedM2 < volumeLimitedM2 ? "weight" : "volume";
    const maxM2 = Math.min(weightLimitedM2, volumeLimitedM2);
    const totalKg = maxM2 * kgPerM2;
    const totalKgWithCrate = totalKg / (1 - strat.crateWeightShare);

    const weightUtil = (totalKgWithCrate / c.payloadKg) * 100;
    const volumeUtil = (maxM2 / volumeLimitedM2) * 100;

    let riskTier: "Low" | "Moderate" | "High" = "Low";
    let riskNote = "Properly braced vertical loading.";
    if (strategy === "wooden-box" && (thickness === "igu" || thickness === "laminated")) {
      riskTier = "Low";
      riskNote = "Enclosed box isolates panels from humidity and door shock.";
    }
    if (strategy === "l-type" && limiting === "weight") {
      riskTier = "Moderate";
      riskNote = "Weight-limited loads shift during sea roll if ratchet tension drops.";
    }
    if (container === "20dc" && (thickness === "laminated" || thickness === "igu")) {
      riskTier = "Moderate";
      riskNote = "20′ DC fills on weight first; residual volume often invites improper top-stacking.";
    }
    if (container === "20dc" && strategy === "wooden-box" && (thickness === "laminated" || thickness === "igu")) {
      riskTier = "High";
      riskNote = "Enclosed boxes in a weight-limited 20′DC create stacking compression on the lower box — switch to a 40′HQ or use L-type crates.";
    }
    if (container === "40ot" && (thickness === "laminated" || thickness === "igu")) {
      riskTier = "High";
      riskNote = "Open-top containers lose the roof restraint path; heavy laminated or IGU loads should not ship 40′OT without engineered top bracing.";
    }

    return {
      maxM2: Math.round(maxM2),
      totalKg: Math.round(totalKgWithCrate),
      limiting,
      weightUtil,
      volumeUtil,
      riskTier,
      riskNote,
      recommendation:
        limiting === "weight"
          ? "Weight-limited — move to a 40′ HQ only if a second thickness batch fills the floor; otherwise 20′ DC is more economical."
          : "Volume-limited — you have headroom to add 6–8 mm panels or request a 40′ HQ for the next shipment.",
    };
  }, [container, thickness, strategy]);

  function requestQuote() {
    const msg = [
      "Container load plan (from the loading calculator):",
      `- Container: ${CONTAINERS[container].name}`,
      `- Product: ${THICKNESS_LABEL[thickness]}`,
      `- Crate strategy: ${STRATEGY[strategy].label}`,
      `- Est. glass area per container: ${result.maxM2} m2`,
      `- Est. loaded weight: ${(result.totalKg / 1000).toFixed(1)} t`,
      `- Limiting factor: ${result.limiting}`,
      "",
      "Please confirm real capacity and freight for this configuration.",
    ].join("\n");
    openQuote(undefined, msg);
  }

  function Select<T extends string>({
    label, value, options, onChange,
  }: { label: string; value: T; options: Record<T, string>; onChange: (v: T) => void }) {
    return (
      <label className="block">
        <span className="block text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">{label}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className="w-full px-4 py-2.5 rounded-lg bg-[#1C1F26] border border-[#3A4250] text-[#F2F0ED] text-sm focus:outline-none focus:border-[#DAA745] transition-colors"
        >
          {(Object.entries(options) as [T, string][]).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <section className="rounded-2xl border border-[#3A4250]/50 bg-[#3A4250]/10 overflow-hidden">
      <header className="px-6 py-5 border-b border-[#3A4250]/40">
        <h2 className="text-lg font-semibold text-[#F2F0ED] m-0">Container loading calculator</h2>
        <p className="text-sm text-[#8B95A5] m-0 mt-1">
          Weight-vs-volume math for a single-product container load. Figures are indicative; your packing list controls the final number.
        </p>
      </header>

      <div className="grid md:grid-cols-[280px_1fr]">
        <div className="p-6 space-y-4 border-b md:border-b-0 md:border-r border-[#3A4250]/40">
          <Select label="Container" value={container} options={containerOpts} onChange={(v) => setHash({ container: v })} />
          <Select label="Product thickness" value={thickness} options={THICKNESS_LABEL} onChange={(v) => setHash({ thickness: v })} />
          <Select label="Crate strategy" value={strategy} options={stratOpts} onChange={(v) => setHash({ strategy: v })} />
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg bg-[#1C1F26] p-4 border border-[#3A4250]/40">
              <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-1">Est. glass area</div>
              <div className="text-2xl font-semibold text-[#DAA745]">{result.maxM2} m²</div>
            </div>
            <div className="rounded-lg bg-[#1C1F26] p-4 border border-[#3A4250]/40">
              <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-1">Loaded weight</div>
              <div className="text-2xl font-semibold text-[#F2F0ED]">{(result.totalKg / 1000).toFixed(1)} t</div>
            </div>
          </div>

          <div className="space-y-3 mb-5">
            <Bar label="Weight utilisation (vs payload)" pct={result.weightUtil} warn />
            <Bar label="Volume utilisation (vs crate footprint)" pct={result.volumeUtil} warn />
          </div>

          <div className="rounded-lg bg-[#1C1F26] p-4 border border-[#3A4250]/40 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-[#DAA745] uppercase tracking-wider font-semibold">Limiting factor</span>
              <span className="text-xs text-[#F2F0ED] font-medium capitalize">{result.limiting}</span>
            </div>
            <p className="text-xs text-[#8B95A5] leading-relaxed m-0">{result.recommendation}</p>
          </div>

          <div
            className="rounded-lg p-4 border mb-4"
            style={{
              background: result.riskTier === "Low" ? "#1C1F26" : "#3A4250",
              borderColor: result.riskTier === "High" ? "#ef4444" : result.riskTier === "Moderate" ? "#DAA745" : "#3A4250",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs uppercase tracking-wider font-semibold"
                style={{ color: result.riskTier === "High" ? "#ef4444" : result.riskTier === "Moderate" ? "#DAA745" : "#8B95A5" }}
              >
                Damage risk
              </span>
              <span className="text-xs text-[#F2F0ED] font-medium">{result.riskTier}</span>
            </div>
            <p className="text-xs text-[#8B95A5] leading-relaxed m-0">{result.riskNote}</p>
          </div>

          <button
            type="button"
            onClick={requestQuote}
            className="w-full py-3 rounded-lg bg-[#DAA745] text-[#1C1F26] font-bold text-sm hover:bg-[#c4963e] transition-colors"
          >
            Get a quote for this load plan
          </button>
        </div>
      </div>

      <footer className="px-6 py-4 border-t border-[#3A4250]/40">
        <p className="text-[11px] text-[#8B95A5] leading-relaxed m-0">
          Assumptions (industry defaults, not a quote): glass weight by thickness at 2,500 kg/m³ float density
          (6/8/10/12 mm = 15/20/25/30 kg/m²; IGU 6+12A+6 ≈ 32; laminated 6+1.52+6 ≈ 36); container payloads
          20′DC 28.2 t, 40′HQ 28.8 t, 40′OT 26.5 t; 0.3 m door clearance; crate weight share 12–28% by strategy.
          Real capacity depends on your exact panel sizes, crate build and the carrier&rsquo;s tare and road-weight
          limits. Use the quote button to have us confirm against your packing list.
        </p>
      </footer>
    </section>
  );
}
