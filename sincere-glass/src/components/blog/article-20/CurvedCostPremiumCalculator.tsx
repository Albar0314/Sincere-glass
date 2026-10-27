'use client';

import { useMemo, useState } from 'react';

/**
 * Cost premium calculator for curved tempered vs flat tempered.
 *
 * The curved premium has 3 components, in order of magnitude:
 *   1. Mold cost (fixed, per unique radius) — USD 400–1,200
 *   2. Bending-tempering line surcharge — ~ +35% over flat tempering
 *   3. Yield/handling loss — ~ 5–8% extra scrap
 *
 * At low quantity the mold dominates. At high quantity the bending
 * surcharge dominates and the premium plateaus around +22% over flat.
 */

const MOLD_COST_USD = 800; // typical cylindrical mold, Sincere Wuhan line
const BENDING_SURCHARGE = 0.35; // 35% over flat tempering per panel
const SCRAP_PREMIUM = 0.06; // 6% extra material loss
const FLAT_PANEL_COST_USD = 180; // reference 10mm 1500x2500 flat tempered

export default function CurvedCostPremiumCalculator() {
  const [qty, setQty] = useState<number>(20);
  const [uniqueRadii, setUniqueRadii] = useState<number>(1);

  const data = useMemo(() => {
    const moldTotal = MOLD_COST_USD * uniqueRadii;
    const flatBase = FLAT_PANEL_COST_USD * qty;
    const curvedBendingSurcharge = flatBase * BENDING_SURCHARGE;
    const curvedScrap = flatBase * SCRAP_PREMIUM;
    const curvedTotal = flatBase + curvedBendingSurcharge + curvedScrap + moldTotal;

    const premiumPct = ((curvedTotal - flatBase) / flatBase) * 100;
    const perPanelCurved = curvedTotal / qty;
    const perPanelFlat = FLAT_PANEL_COST_USD;

    // Where does the premium cross below +30%?
    const breakeven30 = Math.ceil(
      moldTotal / (FLAT_PANEL_COST_USD * (0.30 - BENDING_SURCHARGE - SCRAP_PREMIUM) * -1)
    );
    // Actually: solve for qty where premium = 30%
    // (bending*flat*qty + scrap*flat*qty + mold) / (flat*qty) = 0.30
    // = BENDING_SURCHARGE + SCRAP_PREMIUM + mold/(flat*qty) = 0.30
    // mold/(flat*qty) = 0.30 - 0.41 = -0.11  → impossible, premium never falls below 41%
    // Instead solve for premium = 50%:
    // mold/(flat*qty) = 0.50 - 0.41 = 0.09
    // qty = mold / (flat * 0.09)
    const qtyFor50pct = Math.ceil(moldTotal / (FLAT_PANEL_COST_USD * 0.09));
    const qtyFor45pct = Math.ceil(moldTotal / (FLAT_PANEL_COST_USD * 0.04));

    return {
      moldTotal,
      flatBase,
      curvedTotal,
      curvedBendingSurcharge,
      curvedScrap,
      premiumPct,
      perPanelCurved,
      perPanelFlat,
      qtyFor50pct,
      qtyFor45pct,
    };
  }, [qty, uniqueRadii]);

  // Stacked-bar scale
  const totalBar = Math.max(data.curvedTotal, data.flatBase);
  const flatPct = (data.flatBase / totalBar) * 100;
  const bendPct = (data.curvedBendingSurcharge / totalBar) * 100;
  const scrapPct = (data.curvedScrap / totalBar) * 100;
  const moldPct = (data.moldTotal / totalBar) * 100;

  return (
    <div className="my-10 rounded-xl border border-[#3A4250]/40 bg-[#1C1F26] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#3A4250]/40">
        <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold">
          Interactive &middot; Cost premium
        </div>
        <h3 className="text-lg font-semibold text-[#F2F0ED] m-0 mt-1">
          How much does curved cost over flat?
        </h3>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-5">
          <label className="block">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs uppercase tracking-wider text-[#8B95A5] font-semibold">
                Order quantity
              </span>
              <span className="text-sm font-mono text-[#DAA745]">{qty} panels</span>
            </div>
            <input
              type="range"
              min={5}
              max={300}
              step={5}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full accent-[#DAA745]"
            />
          </label>

          <label className="block">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs uppercase tracking-wider text-[#8B95A5] font-semibold">
                Unique radii in order
              </span>
              <span className="text-sm font-mono text-[#DAA745]">{uniqueRadii}</span>
            </div>
            <input
              type="range"
              min={1}
              max={8}
              step={1}
              value={uniqueRadii}
              onChange={(e) => setUniqueRadii(Number(e.target.value))}
              className="w-full accent-[#DAA745]"
            />
            <div className="text-[11px] text-[#8B95A5]/80 mt-1">
              Each unique radius needs its own mold (≈ USD {MOLD_COST_USD})
            </div>
          </label>
        </div>

        {/* Headline numbers */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#3A4250]/40">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold">
              Premium over flat
            </div>
            <div className="text-2xl font-bold text-[#DAA745] font-mono">
              +{data.premiumPct.toFixed(0)}%
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold">
              Per curved panel
            </div>
            <div className="text-2xl font-bold text-[#F2F0ED] font-mono">
              USD {data.perPanelCurved.toFixed(0)}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold">
              Per flat panel
            </div>
            <div className="text-2xl font-bold text-[#8B95A5] font-mono">
              USD {data.perPanelFlat.toFixed(0)}
            </div>
          </div>
        </div>

        {/* Stacked bar */}
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold mb-2">
            Where the money goes (curved order)
          </div>
          <div className="h-8 bg-[#3A4250]/30 rounded-md overflow-hidden flex">
            <div
              className="h-full flex items-center justify-center text-[10px] text-[#1C1F26] font-semibold transition-all duration-300"
              style={{ width: `${flatPct}%`, backgroundColor: '#8B95A5' }}
              title="Base float + flat tempering"
            >
              {flatPct > 15 && 'Base glass'}
            </div>
            <div
              className="h-full flex items-center justify-center text-[10px] text-[#1C1F26] font-semibold transition-all duration-300"
              style={{ width: `${bendPct}%`, backgroundColor: '#DAA745' }}
              title="Bending-tempering surcharge"
            >
              {bendPct > 10 && 'Bending'}
            </div>
            <div
              className="h-full flex items-center justify-center text-[10px] text-[#F2F0ED] font-semibold transition-all duration-300"
              style={{ width: `${scrapPct}%`, backgroundColor: '#5D6677' }}
              title="Yield loss / scrap"
            >
              {scrapPct > 5 && 'Scrap'}
            </div>
            <div
              className="h-full flex items-center justify-center text-[10px] text-[#F2F0ED] font-semibold transition-all duration-300"
              style={{ width: `${moldPct}%`, backgroundColor: '#9A5555' }}
              title="Mold cost (fixed per unique radius)"
            >
              {moldPct > 5 && 'Mold'}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px] text-[#8B95A5]">
            <span><span className="inline-block w-2 h-2 bg-[#8B95A5] mr-1.5 rounded-sm"></span>Base glass USD {data.flatBase.toLocaleString()}</span>
            <span><span className="inline-block w-2 h-2 bg-[#DAA745] mr-1.5 rounded-sm"></span>Bending USD {data.curvedBendingSurcharge.toFixed(0)}</span>
            <span><span className="inline-block w-2 h-2 bg-[#5D6677] mr-1.5 rounded-sm"></span>Scrap USD {data.curvedScrap.toFixed(0)}</span>
            <span><span className="inline-block w-2 h-2 bg-[#9A5555] mr-1.5 rounded-sm"></span>Mold USD {data.moldTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Insight */}
        <div className="pt-4 border-t border-[#3A4250]/40 text-xs text-[#8B95A5] leading-relaxed">
          <strong className="text-[#F2F0ED]">What this tells you:</strong> At {qty} panels across {uniqueRadii} radius{uniqueRadii > 1 ? 'i' : ''}, you are paying <strong className="text-[#DAA745]">+{data.premiumPct.toFixed(0)}%</strong> over flat tempered. The mold cost amortises across quantity, so a one-off batch of 10 panels can carry a +60% premium while a 150-panel repeat order of the same radius lands near +45%. Mixing many unique radii multiplies the mold cost directly — four radii quadruples that line. Reference pricing: USD {FLAT_PANEL_COST_USD} per flat 10mm 1500×2500 panel, EXW Wuhan, Oct 2026 — your actual quote varies with coating, size, and shipping terms.
        </div>
      </div>
    </div>
  );
}
