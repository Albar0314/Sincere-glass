'use client';

import { useMemo, useState } from 'react';

/**
 * Minimum achievable radius (mm) on Sincere Glass's bending tempering line
 * by thickness. These are production-floor values from our Wuhan furnace;
 * other factories vary.
 *
 * R_min scales roughly linearly with thickness due to:
 *   - thermal gradient tolerance of the glass surface during the bending bath
 *   - mold geometry stability at radius
 *   - edge-stress build-up in the inner curve during quench
 */
const R_MIN_BY_THICKNESS: Record<string, number> = {
  '6': 500,
  '8': 650,
  '10': 850,
  '12': 1100,
  '15': 1600,
  '19': 2200,
};

/**
 * Max developed arc length (chord-mode) by thickness, in mm.
 * Beyond this, the panel must be split into segments.
 */
const MAX_ARC_LENGTH: Record<string, number> = {
  '6': 2400,
  '8': 2800,
  '10': 3000,
  '12': 3000,
  '15': 3000,
  '19': 3000,
};

type App = 'facade' | 'balustrade' | 'door' | 'canopy';

const APP_LABELS: Record<App, string> = {
  facade: 'Curtain-wall facade',
  balustrade: 'Balustrade / railing',
  door: 'Entrance door / shopfront',
  canopy: 'Canopy / skylight',
};

const APP_HINT: Record<App, string> = {
  facade: 'Facades usually run 8–12mm. Wind-load zones often push to 10mm.',
  balustrade: 'Load code (EN 1991 / ASCE 7) typically forces 10–12mm, laminated.',
  door: 'Door hardware (patch fittings, overpanels) typically needs 10–12mm.',
  canopy: 'Overhead glazing is laminated by code almost everywhere — 10.76mm minimum.',
};

export default function BendFeasibilityCalculator() {
  const [thickness, setThickness] = useState<string>('10');
  const [radius, setRadius] = useState<number>(1200);
  const [arcLength, setArcLength] = useState<number>(2000);
  const [app, setApp] = useState<App>('facade');

  const result = useMemo(() => {
    const rMin = R_MIN_BY_THICKNESS[thickness];
    const arcMax = MAX_ARC_LENGTH[thickness];

    const radiusOK = radius >= rMin;
    const arcOK = arcLength <= arcMax;

    // Suggest a thinner glass if radius is too tight
    let fallback: string | null = null;
    if (!radiusOK) {
      const thinner = Object.entries(R_MIN_BY_THICKNESS).find(
        ([, r]) => r <= radius
      );
      fallback = thinner ? `${thinner[0]}mm (Rₘᵢₙ = ${thinner[1]}mm)` : null;
    }

    let verdict: 'go' | 'tight' | 'no';
    let headline: string;
    let detail: string;

    if (!radiusOK) {
      verdict = 'no';
      headline = `Not feasible at ${thickness}mm`;
      detail = fallback
        ? `Your radius (${radius}mm) is below our ${thickness}mm minimum of ${rMin}mm. Thinnest glass that fits this radius: ${fallback}. If structural load needs ${thickness}mm, split into shorter chord segments or revise the curve.`
        : `Your radius (${radius}mm) is below the minimum achievable with any tempered glass thickness on our line. This curve needs a cold-bent laminated build-up or site-fit assembly instead.`;
    } else if (!arcOK) {
      verdict = 'tight';
      headline = 'Feasible, but needs segmentation';
      detail = `${thickness}mm handles the ${radius}mm radius comfortably, but your ${arcLength}mm arc exceeds our ${arcMax}mm single-panel maximum. We will split into ${Math.ceil(arcLength / arcMax)} segments — joints visible unless you spec a structural silicone butt-glaze.`;
    } else if (radius < rMin * 1.3) {
      verdict = 'tight';
      headline = 'Feasible, tight tolerance';
      detail = `Your radius (${radius}mm) is close to the ${thickness}mm minimum of ${rMin}mm. Expect ±1.5mm radius variance across panels and plan ±3mm fit tolerance at mullion joints. We recommend a sample panel sign-off before full production.`;
    } else {
      verdict = 'go';
      headline = 'Feasible with standard tolerance';
      detail = `${thickness}mm at R=${radius}mm sits comfortably inside our envelope (Rₘᵢₙ = ${rMin}mm). Standard ±1mm radius tolerance applies. Arc length of ${arcLength}mm fits a single ${arcMax}mm panel — no joints required.`;
    }

    return { verdict, headline, detail, rMin, arcMax };
  }, [thickness, radius, arcLength]);

  const verdictColor =
    result.verdict === 'go'
      ? '#DAA745'
      : result.verdict === 'tight'
      ? '#C8923A'
      : '#9A5555';

  return (
    <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#1C1F26] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#3A4250]/40">
        <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold">
          Interactive &middot; Bend feasibility
        </div>
        <h3 className="text-lg font-semibold text-[#F2F0ED] m-0 mt-1">
          Can your curved tempered glass actually be made?
        </h3>
      </div>

      <div className="grid md:grid-cols-[1fr_1fr] gap-0">
        {/* Inputs */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-[#3A4250]/40 space-y-5">
          <label className="block">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs uppercase tracking-wider text-[#8B95A5] font-semibold">
                Glass thickness
              </span>
              <span className="text-sm font-mono text-[#DAA745]">{thickness}mm</span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {Object.keys(R_MIN_BY_THICKNESS).map((t) => (
                <button
                  key={t}
                  onClick={() => setThickness(t)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    thickness === t
                      ? 'bg-[#DAA745] text-[#1C1F26]'
                      : 'bg-[#3A4250]/40 text-[#8B95A5] hover:bg-[#3A4250]/60'
                  }`}
                >
                  {t}mm
                </button>
              ))}
            </div>
          </label>

          <label className="block">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs uppercase tracking-wider text-[#8B95A5] font-semibold">
                Target radius
              </span>
              <span className="text-sm font-mono text-[#DAA745]">{radius}mm</span>
            </div>
            <input
              type="range"
              min={300}
              max={5000}
              step={50}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-[#DAA745]"
            />
            <div className="flex justify-between text-[10px] text-[#8B95A5]/70 mt-1">
              <span>300mm (tight)</span>
              <span>5000mm (gentle)</span>
            </div>
          </label>

          <label className="block">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs uppercase tracking-wider text-[#8B95A5] font-semibold">
                Arc length (developed)
              </span>
              <span className="text-sm font-mono text-[#DAA745]">{arcLength}mm</span>
            </div>
            <input
              type="range"
              min={500}
              max={5000}
              step={50}
              value={arcLength}
              onChange={(e) => setArcLength(Number(e.target.value))}
              className="w-full accent-[#DAA745]"
            />
          </label>

          <label className="block">
            <div className="text-xs uppercase tracking-wider text-[#8B95A5] font-semibold mb-2">
              Application
            </div>
            <select
              value={app}
              onChange={(e) => setApp(e.target.value as App)}
              className="w-full px-3 py-2 bg-[#3A4250]/40 border border-[#3A4250]/60 rounded text-sm text-[#F2F0ED] focus:outline-none focus:border-[#DAA745]"
            >
              {Object.entries(APP_LABELS).map(([k, v]) => (
                <option key={k} value={k} className="bg-[#1C1F26]">
                  {v}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-[#8B95A5]/80 mt-2 leading-relaxed">
              {APP_HINT[app]}
            </p>
          </label>
        </div>

        {/* Verdict */}
        <div className="p-6 bg-[#3A4250]/10">
          <div className="text-xs uppercase tracking-wider text-[#8B95A5] font-semibold mb-3">
            Factory verdict
          </div>
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{
              backgroundColor: `${verdictColor}20`,
              color: verdictColor,
              border: `1px solid ${verdictColor}50`,
            }}
          >
            {result.verdict === 'go'
              ? 'Go'
              : result.verdict === 'tight'
              ? 'Tight — proceed with sample'
              : 'Not feasible as drawn'}
          </div>
          <h4 className="text-xl font-semibold text-[#F2F0ED] m-0 mb-3">
            {result.headline}
          </h4>
          <p className="text-sm text-[#8B95A5] leading-relaxed m-0 mb-5">
            {result.detail}
          </p>

          <div className="pt-5 border-t border-[#3A4250]/40">
            <div className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold mb-2">
              Sincere Glass line envelope
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <div className="text-[#8B95A5]">Rₘᵢₙ at {thickness}mm</div>
              <div className="text-[#F2F0ED] font-mono text-right">{result.rMin}mm</div>
              <div className="text-[#8B95A5]">Max single-panel arc</div>
              <div className="text-[#F2F0ED] font-mono text-right">{result.arcMax}mm</div>
              <div className="text-[#8B95A5]">Max panel height</div>
              <div className="text-[#F2F0ED] font-mono text-right">2600mm</div>
              <div className="text-[#8B95A5]">Radius tolerance</div>
              <div className="text-[#F2F0ED] font-mono text-right">±1–1.5mm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
