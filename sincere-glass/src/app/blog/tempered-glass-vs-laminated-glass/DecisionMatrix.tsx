'use client';
import { useState } from 'react';

const scenarios = [
  { scenario: 'Curtain wall / building fa\u00e7ade', tempered: 2, laminated: 4, verdict: 'laminated', note: 'Post-breakage retention prevents falling shards \u2014 critical at height' },
  { scenario: 'Interior partitions & doors', tempered: 4, laminated: 2, verdict: 'tempered', note: 'Strength and cost-efficiency; no overhead fall risk' },
  { scenario: 'Skylights & overhead glazing', tempered: 1, laminated: 5, verdict: 'laminated', note: 'Most building codes mandate laminated for overhead \u2014 broken glass must not fall' },
  { scenario: 'Shower enclosures', tempered: 5, laminated: 1, verdict: 'tempered', note: 'Safe breakage pattern; moisture resistance; easier to clean' },
  { scenario: 'Hurricane / typhoon zones', tempered: 2, laminated: 5, verdict: 'laminated', note: 'Impact-rated laminated glass meets wind-borne debris standards' },
  { scenario: 'Storefronts & security glass', tempered: 2, laminated: 5, verdict: 'laminated', note: 'Interlayer resists forced entry; glass stays in frame when hit' },
  { scenario: 'Balustrades & railings', tempered: 3, laminated: 4, verdict: 'laminated', note: 'Laminated (often with tempered plies) keeps barrier intact if broken' },
  { scenario: 'Acoustic / soundproofing', tempered: 1, laminated: 5, verdict: 'laminated', note: 'PVB/SGP interlayer dampens sound transmission across frequencies' },
];

function Dots({ count, color }: { count: number; color: string }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((n) => (
        <div key={n} className={`w-2.5 h-2.5 rounded-full ${n <= count ? color : 'bg-gray-200'}`} />
      ))}
    </div>
  );
}

export default function DecisionMatrix() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div className="my-12 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-[#F2F0ED]">
            <th className="text-left py-3 pr-4 font-semibold text-[#F2F0ED]">Application</th>
            <th className="text-center py-3 px-4 font-semibold text-[#F2F0ED]">Tempered</th>
            <th className="text-center py-3 px-4 font-semibold text-[#F2F0ED]">Laminated</th>
            <th className="text-left py-3 pl-4 font-semibold text-[#F2F0ED]">Best Pick</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((s, i) => (
            <tr
              key={i}
              className="border-b border-[#3A4250]/30 cursor-pointer hover:bg-[#3A4250]/10 transition-colors"
              onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
            >
              <td className="py-3 pr-4 text-[#8B95A5]">
                <span className="flex items-center gap-2">
                  {s.scenario}
                  <svg className={`w-3.5 h-3.5 text-[#8B95A5] transition-transform ${expandedIdx === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
                {expandedIdx === i && (
                  <p className="mt-2 text-xs text-[#8B95A5]/70">{s.note}</p>
                )}
              </td>
              <td className="py-3 px-4"><div className="flex justify-center"><Dots count={s.tempered} color="bg-[#8B95A5]" /></div></td>
              <td className="py-3 px-4"><div className="flex justify-center"><Dots count={s.laminated} color="bg-[#DAA745]" /></div></td>
              <td className="py-3 pl-4">
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${s.verdict === 'tempered' ? 'bg-[#3A4250] text-white' : 'bg-[#DAA745] text-white'}`}>
                  {s.verdict === 'tempered' ? 'Tempered' : 'Laminated'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
