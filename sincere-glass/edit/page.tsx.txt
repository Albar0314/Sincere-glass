import Link from '@/components/LocalizedLink';
import type { Metadata } from 'next';
import { blogArticles } from '@/lib/blog-registry';
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from '@/components/blog/BlogArticleLayout';
import TLDRBox from '@/components/blog/TLDRBox';
import LeadMagnetCTA from '@/components/blog/LeadMagnetCTA';
import RelatedProductsCards from '@/components/blog/RelatedProductsCards';
import CostDisclaimer from '@/components/blog/CostDisclaimer';
import { FAQ } from '@/components/blog/blocks';
import ThicknessCalculator from '@/components/blog/article-10/ThicknessCalculator';
import HardwareLoadVisualizer from '@/components/blog/article-10/HardwareLoadVisualizer';
import GlobalCodeMatrix from '@/components/blog/article-10/GlobalCodeMatrix';
import { makeAlternates } from '@/lib/hreflang';

const SLUG = 'shower-glass-thickness-guide';
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc: TOCItem[] = [
  { id: 'the-problem', text: 'Why the "right thickness" question keeps coming back', level: 2 },
  { id: 'four-variables', text: 'The four variables that actually decide thickness', level: 2 },
  { id: 'decision-matrix', text: 'Thickness-by-configuration decision matrix', level: 2 },
  { id: 'code-minimums', text: 'Code minimums you cannot negotiate', level: 2 },
  { id: 'hardware-weight', text: 'The hardware weight problem nobody mentions', level: 2 },
  { id: 'tempered-or-laminated', text: 'When tempered is not enough (and laminated takes over)', level: 2 },
  { id: 'supplier-checklist', text: 'Supplier verification checklist before you order', level: 2 },
  { id: 'buyer-faq', text: 'Buyer FAQ: MOQ, certification, lead time, shipping', level: 2 },
];

const buyerFaq = article.buyerFaq ?? [
  {
    q: 'What is the MOQ for shower glass export orders from Sincere Glass?',
    a: 'Our standard MOQ for shower glass panels is 1 × 20\' FCL (approximately 450–600 m² depending on thickness mix). For sample orders or small test shipments, we accept LCL combined with other product lines — contact us for consolidation options.',
  },
  {
    q: 'Which certifications do you provide with export shower glass orders?',
    a: 'Every shipment includes GB 15763.2 (China 3C) certification by default. Upon request we add CPSC 16 CFR 1201 Category II marking (US), CE marking with EN 12150-1 declaration of performance (EU), or AS/NZS 2208 marking (AU/NZ). Specify the destination market at quotation stage so we laser-etch the correct permanent mark during tempering.',
  },
  {
    q: 'What is the lead time for 10 mm clear tempered shower glass?',
    a: 'For stock sizes with standard CNC cutouts (handle holes, hinge cutouts), 10–15 working days from order confirmation. Custom shapes, specific coatings (e.g., ClearShield easy-clean), or large frameless panels add 3–5 days. Our 20,000 m² Wuhan facility runs 4 cutting lines and 2 tempering furnaces simultaneously to compress lead time.',
  },
  {
    q: 'Can you temper and ship oversized frameless walk-in panels (e.g., 2400 × 1200 mm single slab) without seams?',
    a: 'Yes. Our 3m × 15m tempering furnace handles jumbo panels well beyond standard shower geometry — a 2400 × 1200 mm walk-in panel is routine, not special-order. Shipping uses A-frame racks with foam-lined seaboxes to prevent edge impact in transit.',
  },
  {
    q: 'What is the warranty on tempered shower glass?',
    a: 'Standard 2-year warranty against spontaneous breakage from NiS inclusions (we offer heat-soak-tested glass as an upgrade for an additional 10–15 working days), delamination of any applied coatings, and fabrication defects. Warranty excludes impact damage, incorrect installation, and water-stain etching from hard-water areas without regular cleaning.',
  },
];

const specFaq = [
  {
    q: 'Is 10 mm the standard thickness for frameless shower doors worldwide?',
    a: 'Yes, 10 mm clear tempered is the global industry baseline for frameless shower doors up to 760 mm wide and 2000 mm tall. Below those dimensions, 8 mm is sometimes used in Europe; above them, 12 mm becomes necessary to control deflection and give the hinge enough moment arm. The dividing line is almost always panel geometry, not aesthetics.',
  },
  {
    q: 'Can shower glass be anything other than tempered?',
    a: 'In almost every jurisdiction, shower glazing must be a safety glass — tempered or laminated. CPSC 16 CFR 1201 (US), EN 14428 (EU), GB 15763.2 (CN), and AS 1288 §5.14 (AU/NZ) all mandate this. Annealed float glass is prohibited in shower enclosures everywhere these codes apply, which is effectively every modern construction market.',
  },
  {
    q: 'Why does my supplier keep offering 8 mm when I asked for 10 mm?',
    a: 'Two reasons: cost (8 mm panels are roughly 20% cheaper) and hardware economics (6–8 mm clamps and hinges are far cheaper than 10–12 mm). This is fine for small framed enclosures but risky for frameless geometry over 1.6 m². Insist on 10 mm minimum for frameless doors and tie the quote to the thickness so there is no substitution at the factory.',
  },
  {
    q: 'Does thicker glass actually feel more "premium" to the end-user?',
    a: 'Yes, and this is a legitimate selling point for hotel bathrooms and high-end residential. Thicker glass has less visible deflection when the door swings, less audible resonance when it closes, and a weightier mechanical sound. 12 mm panels in luxury properties are specified as much for perceived quality as for structural need.',
  },
  {
    q: 'What is the difference between tempered and heat-strengthened glass for showers?',
    a: 'Only tempered (fully toughened) glass is a safety glass. Heat-strengthened glass is 2× stronger than annealed but breaks in large shards, not safe granules — it fails CPSC 16 CFR 1201 and EN 12600 impact classification. Heat-strengthened is appropriate for curtain wall and spandrel glass, never for shower enclosures.',
  },
  {
    q: 'How much does 12 mm shower glass cost versus 10 mm?',
    a: 'As a reference, 12 mm clear tempered is typically 25–35% more expensive per square meter than 10 mm, before hardware. Add 20–30% for heavier-rated hinges and clamps. For a standard frameless shower (1.5 m² glass + hardware), the total upgrade from 10 mm to 12 mm is roughly 25–30% on the finished enclosure cost.',
  },
];

const faqForSchema = [...buyerFaq, ...specFaq];

export default function Page() {
  const schemas = articleJsonLd(article, faqForSchema);
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox
          takeaways={[
            '10 mm clear tempered is the global default for frameless shower doors up to 760 × 2000 mm — thinner only if the panel is framed, thicker only if the panel is oversized or hinged on one side.',
            'Four variables set thickness: support type (framed / semi-frameless / frameless), panel use (door / fixed / walk-in), geometry (height × width), and local code (CPSC / EN / GB / AS).',
            'Shower glass must always be a safety glass. Tempered meets every major code; annealed is prohibited in every jurisdiction with modern building codes.',
            'Hardware ratings drive thickness more than most buyers realize: a 12 mm door needs hinges rated for 12 mm, not just "heavy duty" — mismatched hinges deflect and loosen within 12 months of daily cycling.',
            'Minimum spec checklist for an export quote: thickness + edge finish (polished arris minimum) + CNC cutout drawing + required certification mark (CPSC / CE / 3C / AS) + heat-soak-test status for jumbo panels.',
          ]}
        />

        <h2 id="the-problem">Why the "right thickness" question keeps coming back</h2>

        <p>
          Every month, a dozen buyers reach out with the same opening message: <em>"We need shower glass. What thickness should we quote?"</em> The question looks simple, but the answer is almost never a single number. It depends on how the glass is held, what the glass does inside the enclosure, how big the panel is, and which country's safety code the project is being signed off against. A quote for a hotel in Dubai answers one way; a residential refurbishment in Berlin answers another.
        </p>

        <p>
          This guide walks through the four decision variables, maps them against a working thickness matrix, and spells out the code minimums that override anything else. It is written from a factory floor — in our 20,000 m² Wuhan plant, every shower glass panel that leaves the tempering line is marked with its thickness, its certification standard, and its destination country code. If any of those three is missing, the panel does not ship. That is the discipline the rest of this article is organized around.
        </p>

        <ThicknessCalculator />

        <h2 id="four-variables">The four variables that actually decide thickness</h2>

        <p>
          Ignore any supplier who recommends thickness without asking about these four things first. Each one, independently, can push the minimum up or down by one full step (6 mm → 8 mm → 10 mm → 12 mm).
        </p>

        <h3>1. Support type: framed, semi-frameless, or frameless</h3>

        <p>
          A fully framed enclosure uses an aluminum frame that carries nearly all the deflection load. Here the glass can be as thin as 5–6 mm — the frame prevents the panel from oscillating when the door swings. A semi-frameless enclosure has top and bottom U-channels (or wall clips) but no vertical frame, so the glass carries lateral deflection; 8 mm becomes the realistic minimum. A frameless enclosure is 100% glass — the panel <em>is</em> the structure — and 10 mm is the global baseline, climbing to 12 mm as panel size grows.
        </p>

        <h3>2. Use case: door, fixed panel, return panel, or single-slab walk-in</h3>

        <p>
          A hinged door introduces a bending moment at the hinge pivot that a fixed panel never sees. For the same geometry, a door needs one step thicker glass than a fixed panel. A 90° return panel (glass-to-glass joint at the corner) needs to match its mating door's thickness because the glass-clip hardware is thickness-specific. A single-slab walk-in enclosure with no door is the easiest case structurally, but at 2 m² or above, it benefits from 12 mm to reduce the "oil-can" visual effect (visible flexure when touched).
        </p>

        <h3>3. Geometry: height × width (and therefore area and aspect ratio)</h3>

        <p>
          Larger glass flexes more under its own weight and under external pressure (shower-door slam, condensation, cleaning). Height matters more than width because the panel is cantilevered from the hinge or clipped at top and bottom. A 2200 mm tall panel at 800 mm wide needs more thickness than a 1800 mm tall panel at 900 mm wide, even though the latter has more area. Over 2000 mm tall is the common inflection point from 10 mm to 12 mm.
        </p>

        <h3>4. Local building code and safety glazing requirement</h3>

        <p>
          Shower enclosures are classified as a hazardous glazing location in essentially every modern building code. In the US, <a href="https://www.cpsc.gov/Regulations-Laws--Standards/Statutes/Safety-Standard-for-Architectural-Glazing-Materials" target="_blank" rel="noopener noreferrer">CPSC 16 CFR 1201 Category II</a> is the controlling standard, requiring a 400 ft-lb impact-resistance test. The EU uses EN 14428 (shower-specific) and EN 12600 (impact classification). China mandates GB 15763.2 safety glass and 3C certification. Australia and New Zealand follow AS 1288 §5.14 with AS/NZS 2208 Grade A safety glass. All of these effectively require tempered or laminated construction — annealed glass is prohibited.
        </p>

        <h2 id="decision-matrix">Thickness-by-configuration decision matrix</h2>

        <p>
          The interactive selector above runs the full logic. Below is the condensed decision table buyers can use at quotation stage.
        </p>

        <div className="my-6 overflow-hidden rounded-lg border border-[#3A4250]/40">
          <table className="w-full text-sm">
            <thead className="bg-[#3A4250]/30">
              <tr>
                <th className="text-left p-3 text-[#DAA745] font-semibold text-xs uppercase tracking-wider">Configuration</th>
                <th className="text-left p-3 text-[#DAA745] font-semibold text-xs uppercase tracking-wider">Panel size</th>
                <th className="text-left p-3 text-[#DAA745] font-semibold text-xs uppercase tracking-wider">Recommended</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A4250]/40 text-[#F2F0ED]">
              <tr><td className="p-3">Framed sliding or pivot door</td><td className="p-3 text-[#8B95A5]">≤1850 × 900 mm</td><td className="p-3 font-semibold">5 mm tempered</td></tr>
              <tr><td className="p-3">Framed oversized door</td><td className="p-3 text-[#8B95A5]">&gt; above</td><td className="p-3 font-semibold">6 mm tempered</td></tr>
              <tr><td className="p-3">Semi-frameless door or fixed</td><td className="p-3 text-[#8B95A5]">≤2000 × 800 mm</td><td className="p-3 font-semibold">8 mm tempered</td></tr>
              <tr><td className="p-3">Semi-frameless oversized</td><td className="p-3 text-[#8B95A5]">&gt; above</td><td className="p-3 font-semibold">10 mm tempered</td></tr>
              <tr><td className="p-3"><strong>Frameless hinged door</strong></td><td className="p-3 text-[#8B95A5]">≤2000 × 760 mm</td><td className="p-3 font-semibold text-[#DAA745]">10 mm tempered</td></tr>
              <tr><td className="p-3"><strong>Frameless wide/tall door</strong></td><td className="p-3 text-[#8B95A5]">&gt; above</td><td className="p-3 font-semibold text-[#DAA745]">12 mm tempered</td></tr>
              <tr><td className="p-3">Frameless fixed panel</td><td className="p-3 text-[#8B95A5]">≤2 m²</td><td className="p-3 font-semibold">10 mm tempered</td></tr>
              <tr><td className="p-3">Frameless walk-in single slab</td><td className="p-3 text-[#8B95A5]">≤2 m²</td><td className="p-3 font-semibold">10 mm tempered</td></tr>
              <tr><td className="p-3">Jumbo walk-in slab</td><td className="p-3 text-[#8B95A5]">&gt;2 m² or &gt;2100 mm tall</td><td className="p-3 font-semibold">12 mm tempered (or 6+6 laminated)</td></tr>
            </tbody>
          </table>
        </div>

        <p>
          This matrix is based on our 15+ years of domestic shower-glass production. Most repeat orders — hotels, residential developments, retail bathroom suites — settle on <Link href="/products/tempered-glass">10 mm clear tempered</Link> as the house standard and move to 12 mm only on the jumbo panels. For a background on the tempering process that creates these panels, see our walk-through on <Link href="/blog/how-is-tempered-glass-made">how tempered glass is made</Link>.
        </p>

        <h2 id="code-minimums">Code minimums you cannot negotiate</h2>

        <p>
          Thickness is a performance recommendation. Safety-glass classification is a legal requirement. Below is the regulatory map across the four code systems most Sincere Glass export shipments reference. These minimums apply regardless of panel size, hardware, or aesthetic preference — if the glass does not carry the required mark, it fails inspection.
        </p>

        <GlobalCodeMatrix />

        <p>
          The practical implication: at quotation stage, specify the destination country, and ask the fabricator to confirm which permanent mark will be applied. For our export shipments, we laser-etch the CPSC / CE / 3C / AS marking during the tempering process so the mark is as durable as the glass itself. See our broader walk-through of <Link href="/blog/curtain-wall-glass-specification">curtain wall glass specification</Link> for how these same code systems apply to facade glazing, and our <Link href="/blog/architectural-glass-types-guide">architectural glass types guide</Link> for the five families of glass products that all live under these certifications.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug={SLUG} />

        <h2 id="hardware-weight">The hardware weight problem nobody mentions</h2>

        <p>
          Here is the quietest failure mode in shower-glass sourcing: the glass is specified correctly, but the hinges and clamps are undersized. A 10 mm door with 6 mm-rated clips passes installation inspection, then drifts out of alignment three months into daily use because the hinge pivot cannot hold the moment load. The glass does not fail — the hardware fails first, and the glass follows.
        </p>

        <p>
          The weight numbers are not intuitive. A 2000 × 760 mm frameless shower door — the industry baseline — weighs <strong>30.4 kg at 10 mm</strong> and <strong>36.5 kg at 12 mm</strong>. The top pivot hinge carries roughly 70% of that load because of the moment arm. Below is the mechanical picture.
        </p>

        <HardwareLoadVisualizer />

        <p>
          Spec hardware against the glass thickness, not against generic descriptors like "heavy-duty" or "premium." Reputable hinge manufacturers (Dorma, FSB, Sugatsune) publish load charts tied to glass thickness and panel weight — use them. A 12 mm door hinged with 10 mm-rated pivots is a warranty claim waiting to happen.
        </p>

        <h2 id="tempered-or-laminated">When tempered is not enough (and laminated takes over)</h2>

        <p>
          Tempered glass is the universal shower default because it is strong (4–5× annealed), safe (fragments into harmless cuboid granules), and the cheapest safety-glass option. But tempered glass has one failure mode worth naming: <strong>spontaneous breakage from nickel sulfide (NiS) inclusions</strong>. The failure rate is low — roughly 1 in 10,000 panels per year of service — but when it happens, the panel disintegrates in one event with no warning.
        </p>

        <p>
          For most residential and commercial shower enclosures, this risk is acceptable. For high-traffic or high-liability installations — hotels, hospitals, schools, luxury residences with impact-resistance requirements — the correct answer is often <Link href="/products/laminated-glass">tempered laminated glass</Link> (two tempered plies bonded with PVB or SGP interlayer). If one ply fractures, the interlayer retains the fragments; the enclosure stays intact until it can be replaced. A 6+6 laminated tempered construction is 12 mm nominal — same thickness, dramatically different post-breakage behavior.
        </p>

        <p>
          Heat-soak-tested tempered (HST) is a middle ground: the glass is held at 290°C for several hours after tempering to force any NiS-contaminated panels to break in the factory rather than in the field. HST reduces field spontaneous breakage by roughly 95%. Our tempering lines offer HST as a standard upgrade; it adds 3–5 days to lead time and ~15% to cost per m².
        </p>

        <h2 id="supplier-checklist">Supplier verification checklist before you order</h2>

        <p>
          If you take one actionable thing from this guide, make it this checklist. Every item here has, at some point, been the reason an export shower-glass order failed inspection, missed its install window, or triggered a warranty claim. Verify every point in writing before confirming the order.
        </p>

        <div className="my-6 rounded-lg bg-[#3A4250]/20 border-l-4 border-[#DAA745] p-5">
          <ol className="space-y-3 pl-5 text-sm text-[#F2F0ED] leading-relaxed">
            <li><strong>Thickness spec is tied to each panel in the quote</strong> — not a blanket "tempered glass" line. The quote should list panel #, dimensions, and nominal thickness.</li>
            <li><strong>Edge finish is at minimum polished arris</strong> (preferably flat polished for frameless). Raw cut edges fail impact tests and etch water stains.</li>
            <li><strong>CNC cutout drawing is attached to the quote</strong>, with every hinge hole, clamp cutout, and handle hole dimensioned. Drilling after tempering is impossible.</li>
            <li><strong>Required certification mark is specified in writing</strong> (CPSC Cat II / CE EN 12150-1 / 3C / AS 2208). "Will be certified" is not a specification — the exact standard and marking method must be named.</li>
            <li><strong>Heat-soak-test (HST) status is confirmed</strong> for all panels over 2 m² or in high-liability applications. Default is non-HST unless requested.</li>
            <li><strong>Packaging specification</strong>: A-frame racks with foam-lined dividers, individual panel protection film, moisture-barrier wrap. Steel seaboxes for sea freight.</li>
            <li><strong>Fabricator agrees to inspection</strong> at tempering stage (not just post-pack) so defects are caught before the panel enters the container.</li>
          </ol>
        </div>

        <CostDisclaimer />

        <RelatedProductsCards slugs={article.relatedProductSlugs || ['tempered-glass', 'laminated-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug={SLUG} />

        <FAQ items={buyerFaq} title="Buyer FAQ: MOQ, certification, lead time, shipping" />

        <h2 id="buyer-faq" className="sr-only">Buyer FAQ</h2>

        <FAQ items={specFaq} title="Specification FAQ" />
      </BlogArticleLayout>
    </>
  );
}
