import type { Metadata } from 'next';
import Link from '@/components/LocalizedLink';
import { FAQ } from '@/components/blog/blocks';
import InlineQuoteCTA from '@/components/InlineQuoteCTA';
import RadiusEnvelopeExplorer from '@/components/products/curved-tempered/RadiusEnvelopeExplorer';
import BendingProductionTimeline from '@/components/products/curved-tempered/BendingProductionTimeline';
import CurvedApplicationShowcase from '@/components/products/curved-tempered/CurvedApplicationShowcase';
import { makeAlternates } from '@/lib/i18n';

const CANONICAL = '/products/curved-tempered-glass';

export const metadata: Metadata = {
  title: 'Curved Tempered Glass | Sincere Glass — Rₘᵢₙ 500mm at 6mm, Up to 2.6m Tall',
  description:
    'Single-axis curved tempered glass manufactured on our Wuhan bending-tempering line. Minimum radius 500mm at 6mm, maximum panel height 2.6m, arc length up to 3m. Full specs, production journey, and application envelope from a 20,000 m² architectural glass factory.',
  keywords: [
    'curved tempered glass',
    'bent tempered glass',
    'cylindrical tempered glass',
    'curved toughened glass',
    'bent glass manufacturer',
    'minimum bend radius',
    'architectural curved glass',
    '弯钢玻璃',
    '弯曲钢化玻璃',
  ],
  alternates: makeAlternates(CANONICAL),
  openGraph: {
    title: 'Curved Tempered Glass | Sincere Glass',
    description:
      'Single-axis curved tempered glass. Rₘᵢₙ 500mm at 6mm. Up to 2.6m tall, 3m arc length. Produced on our Wuhan bending-tempering line.',
    type: 'website',
    images: ['/images/products/curved-tempered.jpg'],
  },
};

const faqItems = [
  {
    q: 'What is the minimum bend radius you can produce in tempered glass?',
    a: 'On our Wuhan bending-tempering line, the minimum achievable radius is 500 mm at 6 mm thickness. The floor scales with thickness: 650 mm at 8 mm, 850 mm at 10 mm, 1,100 mm at 12 mm, 1,600 mm at 15 mm, and 2,200 mm at 19 mm. Below these values the quench cracks the inner curve. For tighter radii you need cold-bent laminated construction, which we can supply the flat tempered plies for.',
  },
  {
    q: 'What is the maximum curved panel size you can produce?',
    a: 'Maximum panel height is 2,600 mm perpendicular to the curve. Maximum single-panel arc length (developed, not chord) is 3,000 mm at 10 mm thickness and above, dropping to 2,400 mm at 6 mm. Panels larger than this must be split into segments and butt-glazed with structural silicone at mullion joints.',
  },
  {
    q: 'Is curved tempered glass as strong as flat tempered glass?',
    a: 'Yes. Curved tempered glass is produced on the same bending-tempering line via the same heat-and-quench process as flat tempered, achieving the same 4–5× strength over annealed glass and the same safe granule fragmentation. It is certified to the same China GB 15763.2-2005 standard. The only production difference is the mold step during heating; the surface compressive stress and bulk tensile stress are equivalent.',
  },
  {
    q: 'Can curved tempered glass be laminated or combined into an IGU?',
    a: 'Yes. Curved tempered plies can be laminated with matching-radius partners using PVB or SGP interlayer in our autoclave, and curved laminated units can be assembled into curved IGUs using CNC-bent aluminum spacer bars that match the panel radius. All combinations extend the lead time (typically 35–45 working days for a curved tempered-laminated-IGU unit) because each fabrication step runs on a separate line.',
  },
  {
    q: 'What tolerance can I expect on radius and dimensions?',
    a: 'Standard radius tolerance is ±1 mm for radii above 1,000 mm, widening to ±1.5 mm near the minimum radius for a given thickness. Chord and arc dimensions hold ±1 mm. Panel-to-panel radius variance across a 20-panel order is typically ±1.5 mm end-to-end. Specifying ±3 mm fit tolerance at mullion joints absorbs this comfortably.',
  },
  {
    q: 'What is the lead time for a curved tempered glass order?',
    a: '18–25 working days from PO confirmation to ready-for-pickup for a single-radius order of 20–100 panels, EXW Wuhan. Mold fabrication (4–6 days) runs in parallel with glass procurement; bending-tempering runs 7–10 days; inspection and crating 2–3 days. Mixed-radii orders add roughly 3–4 days per additional unique radius. Sea freight to Europe or the US adds 30–40 days.',
  },
  {
    q: 'What certifications does your curved tempered glass carry?',
    a: 'All curved tempered glass we produce is certified to China GB 15763.2-2005 (Safety Glass for Buildings, Part 2: Tempered Glass) and carries China 3C (CCC) marking. For heat-soaked panels per EN 14179 (common in EU curtain-wall projects), we route panels through our heat-soak oven on request — add 48 hours to lead time. We can provide third-party test reports from CNAS-accredited laboratories on request.',
  },
  {
    q: 'Can you produce double-curved (spherical) tempered glass?',
    a: 'No tempering line in the industry can. Thermal gradients during the air quench cannot be balanced across two axes of curvature — the panel either cracks on the quench or arrives with warped optics unfit for architectural use. For true double-curved panels (dome segments, spherical skylights), the industry workaround is cold-bent laminated: flat tempered plies bent against the structure on site, locked by SGP interlayer. We supply the flat tempered plies and spec guidance for your facade contractor.',
  },
];

// Service JSON-LD (B2B custom-manufacture; not Product per preferences)
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Curved Tempered Glass Manufacturing',
  serviceType: 'Architectural Glass Manufacturing',
  category: 'Architectural Glass',
  description:
    'Single-axis curved tempered glass custom-manufactured on a dedicated bending-tempering line. Minimum radius 500mm at 6mm thickness, maximum panel height 2,600mm, developed arc length up to 3,000mm. Certified to GB 15763.2-2005.',
  provider: {
    '@type': 'Organization',
    name: 'Sincere Glass',
    url: 'https://sincereglass.com',
    logo: 'https://sincereglass.com/images/logo.png',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Worldwide',
  },
  audience: {
    '@type': 'BusinessAudience',
    name: 'Architects, facade contractors, glazing specifiers, construction procurement',
  },
  url: `https://sincereglass.com${CANONICAL}`,
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function CurvedTemperedGlassPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-[#1C1F26] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <path
              d="M 0 350 Q 600 50 1200 350"
              fill="none"
              stroke="#DAA745"
              strokeWidth="2"
            />
            <path
              d="M 0 380 Q 600 100 1200 380"
              fill="none"
              stroke="#DAA745"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <path
              d="M 0 410 Q 600 150 1200 410"
              fill="none"
              stroke="#DAA745"
              strokeWidth="1"
              opacity="0.3"
            />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          <nav className="text-xs text-[#8B95A5] mb-6">
            <Link href="/" className="hover:text-[#DAA745]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-[#DAA745]">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-[#F2F0ED]">Curved Tempered Glass</span>
          </nav>

          <div className="inline-block px-3 py-1 rounded-full bg-[#DAA745]/10 border border-[#DAA745]/30 text-xs font-semibold uppercase tracking-wider text-[#DAA745] mb-4">
            Architectural safety glass &middot; GB 15763.2
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F2F0ED] leading-[1.1] mb-6 max-w-4xl">
            Curved Tempered Glass
          </h1>
          <p className="text-lg md:text-xl text-[#8B95A5] leading-relaxed max-w-3xl mb-10">
            Single-axis curved tempered glass with the same 4–5× strength and safe-granule breakage of flat tempered, plus the geometric freedom to wrap a facade, canopy, or balustrade in a continuous curve. Manufactured on our dedicated bending-tempering line in Wuhan.
          </p>

          {/* Stat strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-b border-[#3A4250]/40 py-6">
            {[
              { v: '500 mm', l: 'Min radius @ 6 mm' },
              { v: '2,600 mm', l: 'Max panel height' },
              { v: '3,000 mm', l: 'Max arc length' },
              { v: '4–5×', l: 'Strength vs annealed' },
            ].map((s) => (
              <div key={s.l} className="text-center px-3 border-r last:border-r-0 border-[#3A4250]/40">
                <div className="text-2xl md:text-3xl font-bold text-[#DAA745] font-mono mb-1">{s.v}</div>
                <div className="text-[10px] uppercase tracking-wider text-[#8B95A5]/80 font-semibold">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#quote"
              className="inline-block px-6 py-3 bg-[#DAA745] hover:bg-[#c4952e] text-[#1C1F26] rounded-full text-sm font-semibold transition-colors"
            >
              Request a curved glass quote
            </a>
            <a
              href="#specs"
              className="inline-block px-6 py-3 border border-[#3A4250]/60 text-[#F2F0ED] hover:border-[#DAA745] rounded-full text-sm font-semibold transition-colors"
            >
              View full specifications
            </a>
          </div>
        </div>
      </section>

      {/* ─── What is curved tempered ───────────────────────────── */}
      <section className="bg-[#FAFAF8] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-3">
              What it actually is
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F26] mb-5">
              Tempered glass, shaped during the quench
            </h2>
            <p className="text-[#3A4250] leading-relaxed">
              Curved tempered glass starts life as a flat float panel. It is heated to roughly 620 °C in a horizontal roller-hearth furnace, slumped against a bespoke cylindrical steel mold while it softens, then air-quenched in the curved position. The quench locks compressive stress into the outer surface and tensile stress into the core — identical to flat tempering. The only difference is the geometry when the stress freezes in.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                k: 'Equivalent strength',
                v: 'Same 4–5× strength over annealed glass as flat tempered. Same safe-granule breakage per GB 15763.2. The curvature does not weaken the panel.',
              },
              {
                k: 'Mold-formed geometry',
                v: 'A dedicated steel mold per unique radius, cut on CNC and hand-finished. Mold life: 300–500 panels. One-time cost amortized across order quantity.',
              },
              {
                k: 'Single-axis only',
                v: 'Curves in one direction (cylindrical or conical). Double-curved (spherical) panels cannot be made on any tempering line — the quench physics forbid it.',
              },
            ].map((item) => (
              <div
                key={item.k}
                className="p-6 rounded-xl bg-white border border-[#3A4250]/10 shadow-sm"
              >
                <div className="text-sm font-semibold text-[#DAA745] mb-2 uppercase tracking-wider">
                  {item.k}
                </div>
                <p className="text-sm text-[#3A4250] leading-relaxed m-0">{item.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Production journey ────────────────────────────────── */}
      <section className="bg-[#1C1F26] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-3">
              Production journey
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-5">
              From float stock to crated curved panel
            </h2>
            <p className="text-[#8B95A5] leading-relaxed">
              Six stages, 18–25 working days for a typical 20–100 panel single-radius order. The mold step is the one that is unique to curved production — it runs in parallel with glass procurement so it does not add to the critical path on a first order.
            </p>
          </div>
          <BendingProductionTimeline />
        </div>
      </section>

      {/* ─── Radius envelope ───────────────────────────────────── */}
      <section className="bg-[#1C1F26] py-16 border-t border-[#3A4250]/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-3">
              Production envelope
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-5">
              What we can actually make, by thickness
            </h2>
            <p className="text-[#8B95A5] leading-relaxed">
              Click through the thickness options to see the minimum radius, maximum arc, and typical applications our line handles. These are production floors — not aspirations. Specify inside this envelope and the quote lands within standard tolerance.
            </p>
          </div>
          <RadiusEnvelopeExplorer />
        </div>
      </section>

      <section className="bg-[#1C1F26] py-6 border-t border-[#3A4250]/40">
        <div className="max-w-5xl mx-auto px-6">
          <InlineQuoteCTA variant="compact" />
        </div>
      </section>

      {/* ─── Applications ──────────────────────────────────────── */}
      <section className="bg-[#1C1F26] py-20 border-t border-[#3A4250]/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-3">
              Applications
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-5">
              Projects that get curved tempered
            </h2>
            <p className="text-[#8B95A5] leading-relaxed">
              Five common application categories, each with the typical radius range and thickness we see in RFQs. The pattern across all five: curved tempered is specified where faceted flat panels would be visibly segmented, or where the structure behind the glass is already curved.
            </p>
          </div>
          <CurvedApplicationShowcase />
        </div>
      </section>

      {/* ─── Specifications ────────────────────────────────────── */}
      <section id="specs" className="bg-[#FAFAF8] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-3">
              Specifications
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F26] mb-5">
              Full technical specifications
            </h2>
          </div>

          <div className="rounded-2xl border border-[#3A4250]/20 bg-white overflow-hidden">
            <table className="w-full text-sm" aria-label="Curved tempered glass specifications">
              <caption className="sr-only">
                Full technical specifications for Sincere Glass curved tempered glass. Data verified Oct 2026.
              </caption>
              <tbody>
                {[
                  ['Glass type', 'Single-axis curved tempered (cylindrical or conical)'],
                  ['Base glass', 'High-quality clear or tinted float glass'],
                  ['Thickness range', '6, 8, 10, 12, 15, 19 mm'],
                  ['Minimum radius', '500 mm at 6mm → 2,200 mm at 19mm'],
                  ['Maximum panel height', '2,600 mm perpendicular to curve'],
                  ['Maximum developed arc length', '3,000 mm (2,400 mm at 6mm)'],
                  ['Radius tolerance', '±1 mm (±1.5 mm near Rₘᵢₙ)'],
                  ['Chord & arc dimension tolerance', '±1 mm'],
                  ['Edge finish options', 'Pencil, flat-polish, chamfer'],
                  ['Hole / cutout capability', 'Yes, with CAD specification'],
                  ['Strength', '4–5× annealed glass (per GB 15763.2)'],
                  ['Breakage pattern', 'Safe cuboid granules (fragmentation test per GB 15763.2)'],
                  ['Thermal resistance', '~ 3× ordinary float glass'],
                  ['Standard', 'GB 15763.2-2005 (China); meets ASTM C1048 & EN 12150 equivalents'],
                  ['Certification', 'China 3C (CCC); EN 14179 heat-soaking available on request'],
                  ['Downstream processing', 'Can be laminated (PVB/SGP) or assembled into curved IGU'],
                  ['Typical lead time', '18–25 working days (single radius, 20–100 panels)'],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-[#3A4250]/10 last:border-b-0">
                    <th scope="row" className="text-left py-3 px-5 text-[#3A4250] font-semibold w-1/3 bg-[#FAFAF8]/60">
                      {k}
                    </th>
                    <td className="py-3 px-5 text-[#1C1F26]">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Why Sincere ───────────────────────────────────────── */}
      <section className="bg-[#1C1F26] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-3">
              Why source curved from Sincere
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-5">
              Four reasons architects route curved RFQs here
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                k: '500 mm Rₘᵢₙ at 6 mm',
                v: 'Tight-radius capability sits well below many Chinese factory lines. We quote radii other suppliers reject outright.',
              },
              {
                k: 'Dual fabrication under one roof',
                v: 'Curved tempered + laminated autoclave + IGU assembly on adjacent lines in the same 20,000 m² facility. One supplier, one lead time, one shipment — not a three-vendor chain.',
              },
              {
                k: 'Flat jumbo + curved on same site',
                v: 'Our sister flat line runs panels up to 3.3 m × 15 m. Projects that mix flat jumbo spandrels with curved feature glazing ship from one consolidated container.',
              },
              {
                k: 'Pre-RFQ feasibility review',
                v: 'Send CAD before the RFQ and we run it against our line envelope first. You get a feasibility verdict before the clock starts, not after you have committed design.',
              },
            ].map((item) => (
              <div
                key={item.k}
                className="p-6 rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40"
              >
                <div className="text-base font-semibold text-[#DAA745] mb-2">
                  {item.k}
                </div>
                <p className="text-sm text-[#8B95A5] leading-relaxed m-0">{item.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────── */}
      <section className="bg-[#1C1F26] py-16 border-t border-[#3A4250]/40">
        <div className="max-w-4xl mx-auto px-6">
          <FAQ items={faqItems} title="Curved tempered glass FAQ" />
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────────── */}
      <section id="quote" className="bg-[#1C1F26] py-20 border-t border-[#3A4250]/40">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-4">
            Have a curved glass drawing?
          </h2>
          <p className="text-[#8B95A5] max-w-2xl mx-auto mb-8">
            Send us the CAD or a dimensioned sketch and we will return a feasibility verdict against our bending-tempering envelope, plus an indicative EXW Wuhan price, within two working days.
          </p>
          <InlineQuoteCTA variant="default" />

          <div className="mt-10 pt-8 border-t border-[#3A4250]/40 text-sm text-[#8B95A5]">
            Related reading: <Link href="/blog/curved-tempered-glass-vs-flat-tempered-glass" className="text-[#DAA745] underline">When curved beats flat tempered</Link> &middot; <Link href="/products/tempered-glass" className="text-[#DAA745] underline">Flat tempered glass</Link> &middot; <Link href="/products/laminated-glass" className="text-[#DAA745] underline">Laminated glass</Link>
          </div>
        </div>
      </section>
    </>
  );
}
