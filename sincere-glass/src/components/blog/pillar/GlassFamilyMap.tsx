'use client';

import { useState } from 'react';

interface GlassNode {
  id: string;
  name: string;
  purpose: string;
  productHref?: string;
  articleHref?: string;
}

const families: { category: string; color: string; items: GlassNode[] }[] = [
  {
    category: 'Base Material',
    color: '#64748B',
    items: [
      { id: 'annealed', name: 'Annealed (Float)', purpose: 'The raw sheet. Cheap, cuttable, dangerous when broken.', articleHref: '/blog/tempered-glass-vs-annealed-glass' },
    ],
  },
  {
    category: 'Strengthened',
    color: '#FBBF24',
    items: [
      { id: 'heat-strengthened', name: 'Heat-Strengthened', purpose: '2× stronger than annealed; thermal stress resistant. Not safety glass.' },
      { id: 'tempered', name: 'Tempered', purpose: '4-5× stronger; safe granular breakage; code-compliant.', productHref: '/products/tempered-glass', articleHref: '/blog/tempered-glass-vs-annealed-glass' },
    ],
  },
  {
    category: 'Composite Safety',
    color: '#F97316',
    items: [
      { id: 'laminated-pvb', name: 'Laminated (PVB)', purpose: 'Fragment retention + sound + UV. Standard for overhead/railings.', productHref: '/products/laminated-glass', articleHref: '/blog/tempered-glass-vs-laminated-glass' },
      { id: 'laminated-sgp', name: 'Laminated (SGP)', purpose: '100× stiffer than PVB. Hurricane, structural, bullet-resistant.', productHref: '/products/laminated-glass' },
    ],
  },
  {
    category: 'Thermal Performance',
    color: '#60A5FA',
    items: [
      { id: 'igu', name: 'Insulated (IGU)', purpose: 'Sealed cavity + argon. Primary thermal insulator.', productHref: '/products/insulated-glass', articleHref: '/blog/insulated-glass-vs-laminated-glass' },
      { id: 'low-e', name: 'Low-E Coated', purpose: 'IR-reflective coating. Deployed inside IGU cavity.', productHref: '/products/low-e-glass' },
    ],
  },
  {
    category: 'Decorative / Specialty',
    color: '#A78BFA',
    items: [
      { id: 'enameled', name: 'Enameled (Ceramic Frit)', purpose: 'Color, pattern, solar control via printed ceramic ink.', productHref: '/products/enameled-glass' },
    ],
  },
];

export default function GlassFamilyMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-1">
          The Architectural Glass Family
        </p>
        <p className="text-sm text-[#8B95A5] m-0">
          Five categories, nine products. Hover any card to see what it solves.
        </p>
      </div>

      <div className="space-y-5">
        {families.map((family) => (
          <div key={family.category} className="relative">
            {/* Category label */}
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-1 h-5 rounded-full"
                style={{ backgroundColor: family.color }}
              />
              <h4 className="text-sm font-semibold text-[#F2F0ED] m-0">
                {family.category}
              </h4>
            </div>

            {/* Items in this family */}
            <div className="grid sm:grid-cols-2 gap-2 ml-4">
              {family.items.map((item) => {
                const active = hoveredId === item.id;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`p-3 rounded-lg border transition-all ${
                      active
                        ? 'border-[#DAA745]/40 bg-[#DAA745]/5'
                        : 'border-[#3A4250]/30 bg-[#1C1F26]/40'
                    }`}
                    style={active ? { borderColor: family.color + '66' } : {}}
                  >
                    <p className={`text-sm font-medium mb-1 m-0 ${
                      active ? 'text-[#DAA745]' : 'text-[#F2F0ED]'
                    }`}>
                      {item.name}
                    </p>
                    <p className="text-xs text-[#8B95A5] leading-relaxed m-0 mb-2">
                      {item.purpose}
                    </p>
                    <div className="flex gap-3">
                      {item.productHref && (
                        <a
                          href={item.productHref}
                          className="text-xs text-[#DAA745] hover:underline"
                        >
                          Product →
                        </a>
                      )}
                      {item.articleHref && (
                        <a
                          href={item.articleHref}
                          className="text-xs text-[#DAA745] hover:underline"
                        >
                          Deep dive →
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
