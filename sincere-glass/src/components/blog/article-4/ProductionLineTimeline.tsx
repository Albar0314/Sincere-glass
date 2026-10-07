'use client';

import { useState } from 'react';

interface Phase {
  id: string;
  num: string;
  title: string;
  duration: string;
  temp: string;
  summary: string;
  details: string[];
  factoryNote?: string;
  color: string;
}

const phases: Phase[] = [
  {
    id: 'raw',
    num: '00',
    title: 'Raw Material Intake',
    duration: 'Pre-production',
    temp: 'Ambient',
    summary: 'Annealed float glass sheets arrive from upstream float plants and are inspected for optical defects.',
    details: [
      'Each lot is checked for thickness tolerance (±0.2mm for 6mm glass per GB 11614)',
      'Surface defects graded against GB 11614 Appendix A — bubbles, inclusions, scratches',
      'Glass with NiS (nickel sulfide) inclusions is risky for tempering — causes spontaneous breakage years later',
    ],
    factoryNote: 'We source float glass from certified upstream mills and reject any lot with visible NiS indicators before it enters our production flow.',
    color: '#64748B',
  },
  {
    id: 'cut',
    num: '01',
    title: 'Precision Cutting',
    duration: '30-60 sec per sheet',
    temp: 'Ambient',
    summary: 'CNC-controlled carbide wheels score the glass to final dimensions, which are then snapped apart.',
    details: [
      'Modern lines use CNC cutting with ±0.5mm tolerance across 3m × 15m jumbo sheets',
      'All holes, notches, and edge shapes must be in this step — nothing can be cut after tempering',
      'Spec drawings are finalized before this step; field modifications after tempering are impossible',
    ],
    factoryNote: 'We run 4 intelligent cutting lines capable of handling jumbo panels up to 3m × 15m — the maximum our tempering furnace will accept.',
    color: '#60A5FA',
  },
  {
    id: 'edge',
    num: '02',
    title: 'Edge Finishing',
    duration: '2-5 min per edge',
    temp: 'Ambient',
    summary: 'Freshly cut edges are ground, arrissed, or polished to remove micro-cracks that would initiate failure during tempering.',
    details: [
      'Raw cut edges have micro-cracks that stress-concentrate during the thermal shock of tempering',
      'Minimum finish: "arrissed" (sharp corners knocked off); better: "ground" or "flat polished"',
      'Edge quality is the #1 predictor of in-furnace breakage',
    ],
    factoryNote: 'Our 4 edge-grinding lines produce polished edges that meet the EN 12150 edge-strength requirement for structural glazing applications.',
    color: '#34D399',
  },
  {
    id: 'wash',
    num: '03',
    title: 'Washing & Drying',
    duration: '3-5 min per sheet',
    temp: 'Ambient',
    summary: 'Glass passes through a multi-brush washer with deionized water, then air-knife drying before entering the furnace.',
    details: [
      'Any residue — oil, fingerprints, cutting fluid — leaves permanent marks when fired at 620°C',
      'Deionized water prevents mineral spotting',
      'Visual inspection under raking light catches contamination the washer missed',
    ],
    color: '#06B6D4',
  },
  {
    id: 'heat',
    num: '04',
    title: 'The Furnace (Heating)',
    duration: '2-4 min, depending on thickness',
    temp: 'Ramping to 620°C',
    summary: 'Glass rides through a horizontal roller furnace, heated to its softening point by overhead and underside radiant elements.',
    details: [
      'Temperature target: ~620°C (just below the softening point of 650-700°C)',
      'Must heat uniformly — hot spots cause distortion, cold spots cause failed tempering',
      'Rollers rotate continuously; sitting still creates "roller wave" distortion',
      'Furnace length determines throughput: our furnace handles panels up to 15m long',
    ],
    factoryNote: 'We operate 2 tempering furnaces; the larger one accepts panels up to 3m × 15m — among the largest in Hubei province.',
    color: '#F59E0B',
  },
  {
    id: 'quench',
    num: '05',
    title: 'Quench (The Critical Step)',
    duration: '60-90 seconds',
    temp: '620°C → 300°C in seconds',
    summary: 'Immediately after exiting the furnace, high-pressure air jets strike both surfaces simultaneously, freezing the surface while the core remains hot.',
    details: [
      'The quench creates the stress profile: surface compression (~180 MPa), core tension',
      'Air jets must hit both surfaces simultaneously and evenly — asymmetric quench warps the panel',
      'Air pressure is ~5000 Pa, moving ~100,000 m³/hour through nozzle arrays',
      'This is the step that makes tempered glass "tempered" — everything before is preparation',
    ],
    factoryNote: 'Our quenching sections use optimized nozzle geometry calibrated for each glass thickness, achieving the compressive stress required by GB 15763.2 (≥90 MPa).',
    color: '#EF4444',
  },
  {
    id: 'qc',
    num: '06',
    title: 'QC & Breakage Test',
    duration: 'Per lot',
    temp: 'Ambient',
    summary: 'Finished panels pass through automated optical inspection; sample pieces are destructively tested to verify fragmentation pattern.',
    details: [
      'Each lot: one sample is intentionally broken and the fragment count in a 50mm × 50mm square is counted',
      'Standard requires ≥40 fragments per square (GB 15763.2 §6.6)',
      'Automated optical scanning checks for roller wave, bow, and surface distortion',
      'Pieces that pass are packaged in A-frame crates for shipping',
    ],
    factoryNote: 'We maintain complete batch records per order so that any field issue can be traced back to a specific production run.',
    color: '#8B5CF6',
  },
];

export default function ProductionLineTimeline() {
  const [active, setActive] = useState<string>('heat');
  const current = phases.find((p) => p.id === active)!;

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-6">
        Production Line Walk-Through
      </p>

      {/* Phase navigation */}
      <div className="grid grid-cols-7 gap-1 mb-8 relative">
        {/* Timeline connector */}
        <div className="absolute top-5 left-0 right-0 h-px bg-[#3A4250]/40 -z-0" />

        {phases.map((p) => {
          const isActive = active === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className="flex flex-col items-center group relative z-10"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-semibold transition-all ${
                  isActive
                    ? 'scale-110 text-white'
                    : 'bg-[#1C1F26] text-[#8B95A5] border border-[#3A4250]/60 hover:border-[#DAA745]/50'
                }`}
                style={isActive ? { backgroundColor: current.color, borderColor: current.color } : {}}
              >
                {p.num}
              </div>
              <span
                className={`text-[9px] mt-1.5 text-center leading-tight transition-colors hidden md:block ${
                  isActive ? 'text-[#F2F0ED]' : 'text-[#8B95A5]'
                }`}
              >
                {p.title.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Phase detail */}
      <div className="bg-[#1C1F26]/40 rounded-lg p-5 border border-[#3A4250]/20">
        <div className="flex items-start justify-between mb-3 gap-4">
          <div>
            <h3
              className="text-xl font-bold m-0 mb-1"
              style={{ color: current.color }}
            >
              Phase {current.num} · {current.title}
            </h3>
            <div className="flex gap-4 text-xs text-[#8B95A5]">
              <span>⏱ {current.duration}</span>
              <span>🌡 {current.temp}</span>
            </div>
          </div>
        </div>

        <p className="text-[#F2F0ED] leading-relaxed mb-4 text-sm">
          {current.summary}
        </p>

        <ul className="list-none pl-0 space-y-2 mb-4">
          {current.details.map((d, i) => (
            <li key={i} className="text-xs text-[#8B95A5] flex gap-2">
              <span style={{ color: current.color }}>▸</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>

        {current.factoryNote && (
          <div className="mt-4 pt-4 border-t border-[#3A4250]/30">
            <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-1">
              In our Wuhan facility
            </p>
            <p className="text-xs text-[#F2F0ED]/90 italic leading-relaxed m-0">
              {current.factoryNote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
