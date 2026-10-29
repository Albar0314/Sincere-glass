"use client";

import { useState } from "react";

type ZoneKey = "slab-edge" | "shear-wall" | "perimeter-column" | "mechanical";

type Zone = {
  key: ZoneKey;
  name: string;
  oneLiner: string;
  typicalDepth: string;
  recommendedMethod: string;
  recommendedThickness: string;
  heatSoakRequired: boolean;
  colorMatchTolerance: string;
  visionGlassPairing: string;
  notes: string;
};

const ZONES: Record<ZoneKey, Zone> = {
  "slab-edge": {
    key: "slab-edge",
    name: "Floor Slab Edge",
    oneLiner:
      "The horizontal band concealing the structural floor slab and ceiling plenum, typically 900-1,500 mm tall between vision glass runs.",
    typicalDepth: "150-250 mm (slab + fireproofing + plenum services)",
    recommendedMethod:
      "Ceramic frit back coating (dark colors), heat-strengthened minimum. Switch to silicone opacifier film on south/west elevations with sealed back-cavity.",
    recommendedThickness: "6 mm or 8 mm monolithic; 6+6 laminated if fall-protection required",
    heatSoakRequired: true,
    colorMatchTolerance: "ΔE ≤ 2.5 vs adjacent vision glass under D65 illumination",
    visionGlassPairing:
      "Match substrate (clear vs low-iron) and coating position of adjacent vision glass. Mismatched substrate shifts color even with identical frit.",
    notes:
      "Highest-risk zone for thermal fracture due to sealed cavity and dark colors. Mandate HST (EN 14179) and consider silicone opacifier if ΔT utilization exceeds 70%.",
  },
  "shear-wall": {
    key: "shear-wall",
    name: "Shear Wall Zone",
    oneLiner:
      "Vertical bands concealing structural shear walls or elevator cores, running floor-to-floor without horizontal breaks.",
    typicalDepth: "300-600 mm (concrete wall + firestopping + finish)",
    recommendedMethod:
      "Insulated spandrel panel (IMP) preferred — the wall itself provides a solid thermal mass that benefits from matched R-value. Ceramic frit acceptable if IMP cost is prohibitive.",
    recommendedThickness: "6 mm face glass over R-20+ insulation core",
    heatSoakRequired: true,
    colorMatchTolerance: "ΔE ≤ 3.0 (vertical runs are more visually tolerant than horizontal bands)",
    visionGlassPairing:
      "Vertical adjacency reduces color-shift perception; standard frit colors sufficient. Verify consistency across floors when panels are fabricated in different batches.",
    notes:
      "Fire-rated applications may require UL 263 certified assembly. Coordinate panel joints with structural movement allowance.",
  },
  "perimeter-column": {
    key: "perimeter-column",
    name: "Perimeter Column Cover",
    oneLiner:
      "Narrow vertical panels covering perimeter structural columns, often expressed as a design feature on the facade.",
    typicalDepth: "100-200 mm (column + fireproofing)",
    recommendedMethod:
      "Ceramic frit on heat-strengthened glass. Narrow panels (<600 mm wide) have favorable aspect ratios that reduce thermal stress concentration.",
    recommendedThickness: "6 mm monolithic; thicker only if structural glazing engages column directly",
    heatSoakRequired: false,
    colorMatchTolerance: "ΔE ≤ 2.0 (narrow adjacency to vision glass makes color drift very visible)",
    visionGlassPairing:
      "Highest color-match scrutiny — the eye catches shifts across narrow adjacencies. Specify same substrate, same frit color, same batch where possible.",
    notes:
      "If column cover is accented as a design element (contrasting color), color-match tolerance relaxes but spec-sheet documentation of the intentional contrast is required.",
  },
  mechanical: {
    key: "mechanical",
    name: "Mechanical Floor",
    oneLiner:
      "Full floors dedicated to mechanical equipment, typically concealed behind spandrel runs taller than slab-edge bands.",
    typicalDepth: "500-2,000 mm (equipment + louvers + maintenance clearance)",
    recommendedMethod:
      "Insulated spandrel panel (IMP) with integrated louvers for intake/exhaust. Ceramic frit alternates where no ventilation is required.",
    recommendedThickness: "6+6 laminated minimum for impact safety near louvers; 8 mm monolithic acceptable for sealed panels",
    heatSoakRequired: true,
    colorMatchTolerance: "ΔE ≤ 3.5 (large uninterrupted expanses, more forgiving than slab-edge bands)",
    visionGlassPairing:
      "Mechanical floors often read as distinct bands at building scale; moderate color drift tolerable but louver blade color must coordinate.",
    notes:
      "Fire-rating and smoke-barrier requirements usually drive the IMP build-up. Verify equipment heat load behind spandrel — mechanical floors have higher back-cavity temperatures than typical slab edges.",
  },
};

export default function FacadeZonePicker() {
  const [selected, setSelected] = useState<ZoneKey>("slab-edge");
  const zone = ZONES[selected];

  return (
    <div className="my-10 rounded-2xl border border-brand-secondary/20 bg-white dark:bg-brand-dark p-6 md:p-8">
      <div className="mb-6">
        <h4 className="text-xl font-bold text-brand-primary dark:text-brand-light">
          Facade Zone Specification Picker
        </h4>
        <p className="mt-1 text-sm text-brand-secondary">
          Click a facade zone on the building section to see the recommended construction, thickness, and vision-glass pairing rules.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Building SVG — 2 cols */}
        <div className="lg:col-span-2">
          <svg
            viewBox="0 0 240 400"
            className="mx-auto w-full max-w-[280px]"
            aria-label="Interactive facade section with four clickable spandrel zones"
          >
            {/* Sky background */}
            <rect x="0" y="0" width="240" height="400" fill="transparent" />

            {/* Building outline */}
            <rect x="40" y="20" width="160" height="370" fill="#1C1F26" stroke="#8B95A5" strokeWidth="1" />

            {/* Vision glass + spandrel pattern — repeat 10 floors */}
            {Array.from({ length: 10 }).map((_, i) => {
              const y = 25 + i * 36;
              const isMechanical = i === 2; // treat floor 3 (from top) as mechanical
              const isSlabEdge = !isMechanical;
              return (
                <g key={i}>
                  {/* Vision glass */}
                  <rect
                    x="45"
                    y={y}
                    width="150"
                    height="22"
                    fill="#5e8ba8"
                    opacity="0.55"
                  />
                  {/* Slab edge spandrel */}
                  {isSlabEdge && (
                    <rect
                      x="45"
                      y={y + 22}
                      width="150"
                      height="10"
                      fill={selected === "slab-edge" ? "#DAA745" : "#3A4250"}
                      className="cursor-pointer transition-colors"
                      onClick={() => setSelected("slab-edge")}
                    />
                  )}
                  {/* Mechanical band */}
                  {isMechanical && (
                    <rect
                      x="45"
                      y={y}
                      width="150"
                      height="32"
                      fill={selected === "mechanical" ? "#DAA745" : "#2a2f3a"}
                      className="cursor-pointer transition-colors"
                      onClick={() => setSelected("mechanical")}
                    />
                  )}
                </g>
              );
            })}

            {/* Perimeter column covers — left and right narrow strips */}
            <rect
              x="42"
              y="25"
              width="6"
              height="360"
              fill={selected === "perimeter-column" ? "#DAA745" : "#4a515e"}
              className="cursor-pointer transition-colors"
              onClick={() => setSelected("perimeter-column")}
            />
            <rect
              x="192"
              y="25"
              width="6"
              height="360"
              fill={selected === "perimeter-column" ? "#DAA745" : "#4a515e"}
              className="cursor-pointer transition-colors"
              onClick={() => setSelected("perimeter-column")}
            />

            {/* Shear wall zone — central vertical strip bottom third */}
            <rect
              x="105"
              y="250"
              width="30"
              height="135"
              fill={selected === "shear-wall" ? "#DAA745" : "#2d323b"}
              className="cursor-pointer transition-colors"
              onClick={() => setSelected("shear-wall")}
            />

            {/* Labels */}
            <text x="120" y="15" fill="#8B95A5" fontSize="9" textAnchor="middle">
              12-story commercial tower
            </text>
          </svg>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            {(Object.keys(ZONES) as ZoneKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setSelected(k)}
                className={`rounded-lg border px-2 py-1.5 text-left transition ${
                  selected === k
                    ? "border-brand-accent bg-brand-accent/15 text-brand-primary dark:text-brand-light"
                    : "border-brand-secondary/30 text-brand-secondary hover:border-brand-accent/50"
                }`}
              >
                {ZONES[k].name}
              </button>
            ))}
          </div>
        </div>

        {/* Zone detail — 3 cols */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border-l-4 border-brand-accent bg-brand-light/40 dark:bg-brand-dark/40 p-5">
            <h5 className="text-lg font-bold text-brand-primary dark:text-brand-light">
              {zone.name}
            </h5>
            <p className="mt-1 text-sm italic text-brand-secondary">{zone.oneLiner}</p>

            <dl className="mt-5 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                  Typical Concealed Depth
                </dt>
                <dd className="mt-0.5 text-brand-primary dark:text-brand-light">
                  {zone.typicalDepth}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                  Recommended Construction
                </dt>
                <dd className="mt-0.5 text-brand-primary dark:text-brand-light">
                  {zone.recommendedMethod}
                </dd>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                    Thickness
                  </dt>
                  <dd className="mt-0.5 text-brand-primary dark:text-brand-light">
                    {zone.recommendedThickness}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                    Heat-Soak (HST)
                  </dt>
                  <dd className="mt-0.5">
                    {zone.heatSoakRequired ? (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
                        Required
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        Optional
                      </span>
                    )}
                  </dd>
                </div>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                  Color-Match Tolerance
                </dt>
                <dd className="mt-0.5 font-mono text-brand-primary dark:text-brand-light">
                  {zone.colorMatchTolerance}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                  Vision-Glass Pairing
                </dt>
                <dd className="mt-0.5 text-brand-primary dark:text-brand-light">
                  {zone.visionGlassPairing}
                </dd>
              </div>
              <div className="rounded-lg bg-brand-primary/10 dark:bg-brand-light/10 p-3">
                <dt className="text-xs font-semibold uppercase tracking-wider text-brand-primary dark:text-brand-accent">
                  Engineering Note
                </dt>
                <dd className="mt-1 text-sm text-brand-primary dark:text-brand-light">
                  {zone.notes}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
