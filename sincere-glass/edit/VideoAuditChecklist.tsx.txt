'use client';

import { useState } from 'react';

interface Station {
  id: string;
  title: string;
  duration: string;
  purpose: string;
  cameraRequests: string[];
  passCriteria: string[];
  photoRequirements: string[];
  redFlag: string;
}

const STATIONS: Station[] = [
  {
    id: 'reception',
    title: '1. Reception & office tour',
    duration: '~10 min',
    purpose: 'Confirm you are talking to a real factory, not a trader renting a conference room.',
    cameraRequests: [
      'Walk camera from street gate to office — show the factory name on the gate, address plate on the building, and the compound layout.',
      'Pan around the sales office — look for product samples, physical certification plaques on the wall, filing cabinets with test reports.',
      'Ask to see the business licence (营业执照) framed on the wall. Zoom in on the registered scope line.',
    ],
    passCriteria: [
      'Address matches the licence AND matches Baidu Maps street view.',
      'Registered scope explicitly includes 生产 (production) or 制造 (manufacturing), not just 销售 (sales).',
      'Compound has visible production shed(s) with raw-glass stacks or finished product crates.',
    ],
    photoRequirements: [
      'Business licence (full page, legible registration no.).',
      'Factory gate with company name sign.',
      'Office exterior with building number visible.',
    ],
    redFlag: 'Office is in a residential or office tower with no visible production area nearby.',
  },
  {
    id: 'cutting',
    title: '2. Cutting floor',
    duration: '~8 min',
    purpose: 'Verify basic fabrication capability and raw-material stock.',
    cameraRequests: [
      'Walk the camera along a cutting line in operation. Point at the brand name on the machine (Lisec, Bystronic, Bavelloni, HHH, Benteler).',
      'Pan to raw glass storage racks. Count the stacks and read the thickness labels (should see 5mm, 6mm, 8mm, 10mm, 12mm minimum).',
      'Ask the operator to show the cutting plan on the control screen — this proves the line is actually processing, not staged.',
    ],
    passCriteria: [
      'Cutting line is running, not powered off for the video.',
      'Raw glass inventory covers at least the common thicknesses (5–12mm).',
      'Cutting software (Optima, A+W, Lisec) is on the screen with real work orders.',
    ],
    photoRequirements: [
      'Machine nameplate (brand + serial).',
      'Raw glass stacks with thickness labels visible.',
      'Cutting optimization screen with timestamps.',
    ],
    redFlag: 'Only one machine, idle, with no raw material in frame.',
  },
  {
    id: 'edging',
    title: '3. Edging & drilling',
    duration: '~6 min',
    purpose: 'Edge quality is where cheap tempering shops cut corners. Micro-cracks here cause spontaneous breakage later.',
    cameraRequests: [
      'Walk along a straight-line edger. Camera close on the diamond wheels — they should be wet (coolant running), not dry.',
      'Ask the operator to pick up a finished edged piece and show the edge in daylight. Look for a uniform ground finish, no visible chips.',
      'If your product has holes, cutouts, or notches, confirm the drilling/CNC machine is on-site, not outsourced.',
    ],
    passCriteria: [
      'Edging is wet-process (water-cooled). Dry edging = micro-crack risk.',
      'Multiple edging lines (straight + double-edger + bevel if applicable).',
      'Drilling/CNC machines present if your SKU needs them.',
    ],
    photoRequirements: [
      'Edger in operation with water coolant visible.',
      'A finished edged piece, close-up on the ground edge.',
      'Finished parts awaiting tempering.',
    ],
    redFlag: '"We outsource the complex edges" — fine for small shops, but your QC chain just doubled.',
  },
  {
    id: 'tempering',
    title: '4. Tempering furnace',
    duration: '~10 min',
    purpose: 'The core capability for most architectural orders.',
    cameraRequests: [
      'Show the furnace brand nameplate (Glaston, LandGlass, NorthGlass, Keraglass).',
      'Open the operator viewing window — camera on glowing glass panels inside, orange around 620°C.',
      'Ask to see the furnace control screen — tempering recipe, time-at-temperature, quench pressure.',
      'Pan to the maximum glass size the furnace handles. Ask the operator the max panel dimensions and bench-check it against the furnace width.',
    ],
    passCriteria: [
      'Furnace is a known brand with model number visible.',
      'Recipe-based control (not manual on-off).',
      'Max size claim matches furnace physical width.',
      'Finished tempered panels on roller conveyor after quench.',
    ],
    photoRequirements: [
      'Furnace nameplate.',
      'Operator screen with recipe + current cycle.',
      'A loaded tempered panel exiting the furnace.',
    ],
    redFlag: '"Our furnace can do any size" with no visible max-width markings or roller measurements.',
  },
  {
    id: 'lamination',
    title: '5. Lamination line (if laminated glass in your order)',
    duration: '~10 min',
    purpose: 'PVB lamination needs a clean room and an autoclave. Both are expensive — fakers skip them.',
    cameraRequests: [
      'Walk the camera into the PVB assembly room. Air should feel still, floor and walls visibly cleaner than the rest of the plant. Workers should be in dust gowns and shoe covers.',
      'Show the autoclave door and gauges. The autoclave should be at least 3m diameter for architectural panels.',
      'Ask to see the lamination cycle log — temperature peak (around 140°C), pressure peak (12 bar), hold time (around 2.5 hours).',
    ],
    passCriteria: [
      'Dedicated clean-room enclosure, HEPA filtered air visible via sign or clipboard log.',
      'Autoclave is sized for your panels.',
      'Cycle log shows real recipes, not a template.',
      'PVB interlayer stock visible, refrigerated storage room nearby.',
    ],
    photoRequirements: [
      'Clean room entrance with cleaning protocol posted.',
      'Autoclave gauges mid-cycle.',
      'PVB roll stock in cold storage.',
    ],
    redFlag: 'No autoclave on site, or the "lamination room" is an open warehouse corner with ambient dust.',
  },
  {
    id: 'igu',
    title: '6. IGU assembly line (if insulated glass in your order)',
    duration: '~8 min',
    purpose: 'IGU durability depends on dual-seal + argon fill + warm-edge spacer. Shortcuts here cause early failure.',
    cameraRequests: [
      'Show the spacer-bar bending station. Warm-edge spacer (plastic composite) is better than aluminium for thermal; both are acceptable, but confirm the type.',
      'Camera on the butyl primary seal application nozzle — this is the dark, sticky bead on the spacer edge.',
      'Ask the operator to show the argon fill station and the argon concentration meter reading (target ≥ 90 %).',
      'Finish on the robotic silicone secondary seal application.',
    ],
    passCriteria: [
      'Dual-seal construction (butyl primary + silicone/polysulfide secondary).',
      'Argon fill meter present and reading ≥ 90 % on completed units.',
      'Warm-edge spacer option available.',
      'Finished IGU showing clean, uniform secondary seal.',
    ],
    photoRequirements: [
      'Butyl primary seal application.',
      'Argon concentration meter reading.',
      'Finished IGU with secondary seal visible along the edge.',
    ],
    redFlag: 'Single-seal only, or no argon meter on site (they will claim argon-filled with no way to verify).',
  },
  {
    id: 'qc-lab',
    title: '7. QC lab',
    duration: '~8 min',
    purpose: 'A real factory tests in-house. No lab = no quality claims hold up.',
    cameraRequests: [
      'Walk camera into the QC lab room. Expect fragmentation test table (steel punch), 4-point bending rig, pendulum impact rig for safety glass.',
      'For IGU: dew-point tester, UV chamber, fogging test.',
      'Open a desk drawer and show recent inspection records (handwritten or printed logs with dates in the last 30 days).',
    ],
    passCriteria: [
      'Multiple test rigs matched to the products you are buying.',
      'Current QC logs on paper or screen with recent dates.',
      'Lab technician in a lab coat, actively working.',
    ],
    photoRequirements: [
      'Lab overview wide shot.',
      'Specific test rig for your product type.',
      'QC log with latest entry visible (dated).',
    ],
    redFlag: '"We send everything to a third-party lab" — fine, but then they must produce current reports on request, with lab seals.',
  },
  {
    id: 'warehouse',
    title: '8. Warehouse & shipping dock',
    duration: '~5 min',
    purpose: 'How they protect finished goods tells you how your container will arrive.',
    cameraRequests: [
      'Walk the finished-goods warehouse. Panels should be stored vertical, in metal A-frames or wooden crates, with rubber or foam separators between sheets.',
      'Show the loading dock. Confirm forklift capacity (for jumbo panels, 5-ton minimum).',
      'If your container is being prepped, ask to see the crating in progress — moisture bags, foam padding, ratchet straps.',
    ],
    passCriteria: [
      'Vertical storage with separators (horizontal stacking kills tempered glass).',
      'Loading dock with container access and forklift of sufficient capacity.',
      'Crating method matches what you specified in the PO (steel frames, wooden crates, or your custom spec).',
    ],
    photoRequirements: [
      'Warehouse overview with vertical panel storage.',
      'Loading dock with container height clearance visible.',
      'Any crated finished goods awaiting shipment.',
    ],
    redFlag: 'Panels stacked horizontally on wooden pallets or on bare concrete.',
  },
];

export default function VideoAuditChecklist() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([STATIONS[0].id]));

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function expandAll() {
    setOpenIds(new Set(STATIONS.map((s) => s.id)));
  }
  function collapseAll() {
    setOpenIds(new Set());
  }

  const totalMin = 65;

  return (
    <div className="my-10 rounded-2xl border border-[#3A4250]/40 bg-[#3A4250]/15 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-[#3A4250]/40">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
          <div>
            <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-1">
              Interactive · Video audit script
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#F2F0ED] m-0">
              The 90-minute video audit
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={expandAll}
              className="text-xs px-3 py-1.5 rounded-full border border-[#3A4250]/60 text-[#8B95A5] hover:text-[#F2F0ED] hover:border-[#DAA745]/60 transition-colors"
            >
              Expand all
            </button>
            <button
              onClick={collapseAll}
              className="text-xs px-3 py-1.5 rounded-full border border-[#3A4250]/60 text-[#8B95A5] hover:text-[#F2F0ED] hover:border-[#DAA745]/60 transition-colors"
            >
              Collapse
            </button>
          </div>
        </div>
        <p className="text-sm text-[#8B95A5] m-0 leading-relaxed">
          Eight stations, roughly {totalMin} minutes of camera time plus Q&amp;A buffer. Walk the
          supplier through this on a live WeChat / WhatsApp call. Record it. Each station gives you
          the three things to request, the pass bar, and the photos you keep for your file.
        </p>
      </div>

      <ol className="list-none pl-0 m-0 divide-y divide-[#3A4250]/40">
        {STATIONS.map((s) => {
          const isOpen = openIds.has(s.id);
          return (
            <li key={s.id} className="m-0">
              <button
                onClick={() => toggle(s.id)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-[#3A4250]/20 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="text-base font-semibold text-[#F2F0ED]">{s.title}</span>
                  <span className="text-xs text-[#8B95A5] whitespace-nowrap">{s.duration}</span>
                </div>
                <svg
                  className={`w-4 h-4 text-[#8B95A5] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 bg-[#1C1F26]/40">
                  <p className="text-sm text-[#8B95A5] italic leading-relaxed mb-4 m-0">
                    {s.purpose}
                  </p>

                  <SubBlock title="Ask the camera operator to show you">
                    <ol className="space-y-1.5 list-decimal pl-5 text-sm text-[#F2F0ED] leading-relaxed">
                      {s.cameraRequests.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ol>
                  </SubBlock>

                  <SubBlock title="Pass criteria">
                    <ul className="space-y-1.5 list-none pl-0 text-sm text-[#F2F0ED] leading-relaxed">
                      {s.passCriteria.map((c, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-emerald-400 flex-shrink-0">✓</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </SubBlock>

                  <SubBlock title="Save these photos for your file">
                    <ul className="space-y-1 list-disc pl-5 text-sm text-[#8B95A5] leading-relaxed">
                      {s.photoRequirements.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </SubBlock>

                  <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3">
                    <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">
                      Walk-away signal
                    </div>
                    <p className="text-sm text-[#F2F0ED] leading-relaxed m-0">{s.redFlag}</p>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function SubBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
        {title}
      </div>
      {children}
    </div>
  );
}
