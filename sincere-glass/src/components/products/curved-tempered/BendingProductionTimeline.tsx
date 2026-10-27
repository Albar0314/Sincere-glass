'use client';

import { useEffect, useState } from 'react';

const STAGES = [
  {
    id: 'mold',
    label: 'Mold fabrication',
    duration: '4–6 days',
    detail: 'Bespoke steel mold cut to your radius. One mold per unique radius; subsequent radii run in parallel. Mold life: 300–500 panels.',
  },
  {
    id: 'cut',
    label: 'Precision cut',
    duration: '~ 2 hours',
    detail: 'Flat annealed float cut to developed arc length (not chord). Edge micro-cracks are the #1 cause of quench failure — we run a seaming pass before edging.',
  },
  {
    id: 'edge',
    label: 'Edge grinding',
    duration: '~ 4 hours',
    detail: 'Pencil, flat-polish, or chamfered per spec. Curved-panel edges cost ~30% more to polish because the head follows the radius.',
  },
  {
    id: 'wash',
    label: 'Wash & dry',
    duration: '~ 1 hour',
    detail: 'Multi-stage DI-water wash + hot-air dry. Any residue bakes into the surface at 620°C — QC rejects panels with wash marks before they enter the furnace.',
  },
  {
    id: 'bend',
    label: 'Bending-tempering',
    duration: '~ 15 min / cycle',
    detail: 'Flat panel loaded onto mold, heated to ~620°C, slumped against the mold as it softens, then air-quenched in position. Quench nozzles re-balanced for curve geometry.',
  },
  {
    id: 'qc',
    label: 'Inspection & crate',
    duration: '2–3 days',
    detail: 'Radius gauge check, fragmentation sample test (per GB 15763.2), optical distortion visual QC, bespoke A-frame crating sized to the radius.',
  },
];

export default function BendingProductionTimeline() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % STAGES.length);
    }, 3200);
    return () => clearInterval(id);
  }, [playing]);

  const stage = STAGES[active];

  return (
    <div className="rounded-2xl border border-[#3A4250]/40 bg-[#1C1F26] overflow-hidden">
      <div className="px-6 py-5 border-b border-[#3A4250]/40 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-1">
            Production journey
          </div>
          <h3 className="text-xl font-semibold text-[#F2F0ED] m-0">
            Six stages from float stock to crated curved panel
          </h3>
        </div>
        <button
          onClick={() => setPlaying(!playing)}
          className="text-xs text-[#8B95A5] hover:text-[#DAA745] transition-colors border border-[#3A4250]/60 px-3 py-1.5 rounded-md"
        >
          {playing ? 'Pause' : 'Resume'}
        </button>
      </div>

      {/* Stage dots */}
      <div className="px-6 py-4 border-b border-[#3A4250]/40">
        <div className="flex items-center justify-between gap-1">
          {STAGES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setActive(i); setPlaying(false); }}
              className="flex-1 flex flex-col items-center group"
            >
              <div
                className={`w-full h-1 rounded-full mb-2 transition-colors ${
                  i === active ? 'bg-[#DAA745]' : i < active ? 'bg-[#DAA745]/40' : 'bg-[#3A4250]/40'
                }`}
              />
              <div
                className={`text-[10px] uppercase tracking-wider font-semibold transition-colors text-center ${
                  i === active ? 'text-[#DAA745]' : 'text-[#8B95A5]/60 group-hover:text-[#8B95A5]'
                }`}
              >
                {i + 1}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active stage detail */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <h4 className="text-2xl font-semibold text-[#F2F0ED] m-0">
            {stage.label}
          </h4>
          <div className="text-sm font-mono text-[#DAA745] bg-[#DAA745]/10 border border-[#DAA745]/30 px-3 py-1 rounded-full">
            {stage.duration}
          </div>
        </div>
        <p className="text-sm text-[#8B95A5] leading-relaxed m-0">
          {stage.detail}
        </p>
      </div>
    </div>
  );
}
