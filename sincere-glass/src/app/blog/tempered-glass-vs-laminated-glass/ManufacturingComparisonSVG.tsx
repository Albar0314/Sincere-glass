'use client';

export default function ManufacturingComparisonSVG() {
  return (
    <div className="my-12 grid md:grid-cols-2 gap-6">
      <div className="bg-[#FAFAF8] rounded-2xl p-6 border border-[#F2F0ED]">
        <h4 className="text-sm font-semibold text-[#DAA745] mb-4 tracking-wide">TEMPERED GLASS PROCESS</h4>
        <div className="space-y-4">
          {[
            { step: 'Cut & Edge', desc: 'Glass cut to final size, edges ground smooth' },
            { step: 'Heat to ~620\u00b0C', desc: 'Raised to near softening point in furnace' },
            { step: 'Rapid Air Quench', desc: 'Jets of cold air cool the surface instantly' },
            { step: 'Compression Lock', desc: 'Surface compresses, core stays in tension' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F26] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
              <div>
                <p className="text-sm font-semibold text-[#1C1F26]">{item.step}</p>
                <p className="text-xs text-[#8B95A5] mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-[#F2F0ED]">
          <p className="text-xs text-[#8B95A5]">Result: 4\u20135\u00d7 stronger than annealed glass. Cannot be cut after tempering.</p>
        </div>
      </div>
      <div className="bg-[#FAFAF8] rounded-2xl p-6 border border-[#F2F0ED]">
        <h4 className="text-sm font-semibold text-[#DAA745] mb-4 tracking-wide">LAMINATED GLASS PROCESS</h4>
        <div className="space-y-4">
          {[
            { step: 'Prepare Plies', desc: 'Two or more glass sheets cleaned & aligned' },
            { step: 'Insert Interlayer', desc: 'PVB or SGP film placed between layers' },
            { step: 'Pre-laminate', desc: 'Air expelled via heated rollers (nip roll)' },
            { step: 'Autoclave Bond', desc: 'High pressure + heat fuses the sandwich' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-lg bg-[#1C1F26] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
              <div>
                <p className="text-sm font-semibold text-[#1C1F26]">{item.step}</p>
                <p className="text-xs text-[#8B95A5] mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-[#F2F0ED]">
          <p className="text-xs text-[#8B95A5]">Result: Holds together on impact. Can incorporate tinted, Low-E, or tempered plies.</p>
        </div>
      </div>
    </div>
  );
}
