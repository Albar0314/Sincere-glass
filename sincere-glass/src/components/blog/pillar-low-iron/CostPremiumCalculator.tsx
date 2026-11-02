'use client';

import { useState } from 'react';

type Thickness = 6 | 8 | 10 | 12 | 15 | 19;
type Processing = 'float' | 'tempered' | 'laminated' | 'igu';
type Region = 'us' | 'eu' | 'china' | 'middle-east' | 'southeast-asia';

interface BasePrice {
  standard: number;
  lowIron: number;
}

const BASE_FLOAT_USD_PER_SQM: Record<Thickness, BasePrice> = {
  6:  { standard: 8,  lowIron: 14 },
  8:  { standard: 11, lowIron: 19 },
  10: { standard: 14, lowIron: 25 },
  12: { standard: 18, lowIron: 33 },
  15: { standard: 25, lowIron: 46 },
  19: { standard: 36, lowIron: 68 },
};

const PROCESSING_MULTIPLIER: Record<Processing, number> = {
  'float': 1.0,
  'tempered': 1.35,
  'laminated': 1.65,
  'igu': 2.15,
};

const PROCESSING_LABEL: Record<Processing, string> = {
  'float': 'Float (annealed)',
  'tempered': 'Tempered',
  'laminated': 'Laminated (PVB)',
  'igu': 'Insulated Glass Unit',
};

const REGION_MULTIPLIER: Record<Region, number> = {
  'us':             1.35,
  'eu':             1.30,
  'china':          1.00,
  'middle-east':    1.15,
  'southeast-asia': 1.10,
};

const REGION_LABEL: Record<Region, string> = {
  'us':             'United States (delivered)',
  'eu':             'European Union (delivered)',
  'china':          'China (ex-factory)',
  'middle-east':    'Middle East (delivered)',
  'southeast-asia': 'Southeast Asia (delivered)',
};

interface Props {
  initialArea?: number;
  initialThickness?: Thickness;
  initialProcessing?: Processing;
  initialRegion?: Region;
}

function fmtUsd(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US');
}

export default function CostPremiumCalculator({
  initialArea = 500,
  initialThickness = 10,
  initialProcessing = 'tempered',
  initialRegion = 'us',
}: Props) {
  const [area, setArea] = useState<number>(initialArea);
  const [thickness, setThickness] = useState<Thickness>(initialThickness);
  const [processing, setProcessing] = useState<Processing>(initialProcessing);
  const [region, setRegion] = useState<Region>(initialRegion);

  const base = BASE_FLOAT_USD_PER_SQM[thickness];
  const procMult = PROCESSING_MULTIPLIER[processing];
  const regMult = REGION_MULTIPLIER[region];

  const stdUnit = base.standard * procMult * regMult;
  const lowIronUnit = base.lowIron * procMult * regMult;

  const stdTotal = stdUnit * area;
  const lowIronTotal = lowIronUnit * area;
  const premium = lowIronTotal - stdTotal;
  const premiumPct = Math.round((premium / stdTotal) * 100);

  const maxBar = Math.max(stdTotal, lowIronTotal);
  const stdBarWidth = `${(stdTotal / maxBar) * 100}%`;
  const lowIronBarWidth = `${(lowIronTotal / maxBar) * 100}%`;

  return (
    <div className="my-10 rounded-xl bg-[#3A4250]/15 border border-[#3A4250]/40 p-6 md:p-8">
      <div className="mb-5">
        <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1">
          Budget Calculator
        </div>
        <h3 className="text-xl font-bold text-[#F2F0ED] m-0">
          Low Iron Cost Premium Estimator
        </h3>
      </div>

      <div className="space-y-5 mb-6">
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-xs text-[#8B95A5] uppercase tracking-wider">
              Project Area
            </label>
            <div className="text-sm font-semibold text-[#F2F0ED]">
              {area.toLocaleString('en-US')} m2
            </div>
          </div>
          <input
            type="range"
            min={10}
            max={5000}
            step={10}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full accent-[#DAA745]"
            aria-label="Project area in square meters"
          />
          <div className="flex justify-between text-xs text-[#8B95A5] mt-1">
            <span>10 m2</span>
            <span>5,000 m2</span>
          </div>
        </div>

        <div>
          <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-2">Thickness</div>
          <div className="grid grid-cols-6 gap-2">
            {([6, 8, 10, 12, 15, 19] as Thickness[]).map((t) => (
              <button
                key={t}
                onClick={() => setThickness(t)}
                className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                  thickness === t
                    ? 'bg-[#DAA745] text-[#1C1F26]'
                    : 'bg-[#1C1F26] text-[#8B95A5] hover:text-[#F2F0ED] border border-[#3A4250]/40'
                }`}
              >
                {t} mm
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-2">Processing</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(Object.keys(PROCESSING_LABEL) as Processing[]).map((p) => (
              <button
                key={p}
                onClick={() => setProcessing(p)}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                  processing === p
                    ? 'bg-[#DAA745] text-[#1C1F26]'
                    : 'bg-[#1C1F26] text-[#8B95A5] hover:text-[#F2F0ED] border border-[#3A4250]/40'
                }`}
              >
                {PROCESSING_LABEL[p]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-[#8B95A5] uppercase tracking-wider mb-2">Delivery Region</div>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as Region)}
            className="w-full px-4 py-2.5 rounded-lg bg-[#1C1F26] border border-[#3A4250]/40 text-sm text-[#F2F0ED] focus:outline-none focus:border-[#DAA745]"
          >
            {(Object.keys(REGION_LABEL) as Region[]).map((r) => (
              <option key={r} value={r}>
                {REGION_LABEL[r]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-xl bg-[#1C1F26] border border-[#3A4250]/30 p-5 md:p-6">
        <div className="mb-5">
          <div className="flex justify-between items-baseline mb-1">
            <div className="text-xs text-[#8B95A5] uppercase tracking-wider">Standard Clear Total</div>
            <div className="text-base font-semibold text-[#F2F0ED]">{fmtUsd(stdTotal)}</div>
          </div>
          <div className="h-2 bg-[#3A4250]/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8B95A5] transition-all duration-300"
              style={{ width: stdBarWidth }}
            />
          </div>
          <div className="text-xs text-[#8B95A5] mt-1">{fmtUsd(stdUnit)} per m2</div>
        </div>

        <div className="mb-5">
          <div className="flex justify-between items-baseline mb-1">
            <div className="text-xs text-[#DAA745] uppercase tracking-wider font-semibold">
              Low Iron Total
            </div>
            <div className="text-base font-semibold text-[#F2F0ED]">{fmtUsd(lowIronTotal)}</div>
          </div>
          <div className="h-2 bg-[#3A4250]/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#DAA745] transition-all duration-300"
              style={{ width: lowIronBarWidth }}
            />
          </div>
          <div className="text-xs text-[#8B95A5] mt-1">{fmtUsd(lowIronUnit)} per m2</div>
        </div>

        <div className="border-t border-[#3A4250]/40 pt-4">
          <div className="flex justify-between items-baseline">
            <div className="text-sm font-medium text-[#F2F0ED]">Premium for Low Iron</div>
            <div className="text-right">
              <div className="text-lg font-bold text-[#DAA745]">
                plus {fmtUsd(premium)}
              </div>
              <div className="text-xs text-[#8B95A5]">
                plus {premiumPct} percent
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-xs text-[#8B95A5] italic leading-relaxed">
        Illustrative estimates for budget framing only. Not a quotation. Actual pricing depends on panel sizing, edge work, coating, MOQ, lead time, currency, and freight. Request a formal quote from your supplier before committing to a budget. Data verified: 2026-11-02.
      </div>
    </div>
  );
}
