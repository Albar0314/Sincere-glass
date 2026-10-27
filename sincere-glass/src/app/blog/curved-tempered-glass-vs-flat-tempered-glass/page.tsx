import type { Metadata } from 'next';
import Link from 'next/link';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd, type TOCItem } from '@/components/blog/BlogArticleLayout';
import TLDRBox from '@/components/blog/TLDRBox';
import { FAQ } from '@/components/blog/blocks';
import LeadMagnetCTA from '@/components/blog/LeadMagnetCTA';
import RelatedProductsCards from '@/components/blog/RelatedProductsCards';
import CostDisclaimer from '@/components/blog/CostDisclaimer';
import InlineQuoteCTA from '@/components/InlineQuoteCTA';
import BendFeasibilityCalculator from '@/components/blog/article-20/BendFeasibilityCalculator';
import CurvedCostPremiumCalculator from '@/components/blog/article-20/CurvedCostPremiumCalculator';
import CurvatureTypeExplorer from '@/components/blog/article-20/CurvatureTypeExplorer';
import { blogArticles } from '@/lib/blog-registry';
import { makeAlternates } from '@/lib/i18n';

const SLUG = 'curved-tempered-glass-vs-flat-tempered-glass';
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc: TOCItem[] = [
  { id: 'tldr', text: 'The 30-second answer', level: 2 },
  { id: 'what-is-curved', text: 'What curved tempered actually is', level: 2 },
  { id: 'when-curved-beats-flat', text: 'When curved beats flat: 5 project triggers', level: 2 },
  { id: 'min-bend-radius', text: 'Minimum bend radius: the spec that kills most designs', level: 2 },
  { id: 'cost-reality', text: 'What a curved tempered panel actually costs', level: 2 },
  { id: 'curvature-types', text: 'Three types of curves — and the one you cannot have', level: 2 },
  { id: 'spec-sheet', text: 'What your drawing must contain', level: 2 },
  { id: 'logistics', text: 'Lead time, molds, and shipping', level: 2 },
  { id: 'when-flat-wins', text: 'When flat still wins', level: 2 },
  { id: 'faq', text: 'FAQ', level: 2 },
  { id: 'from-wuhan', text: 'From our Wuhan line', level: 2 },
];

const faqItems = [
  {
    q: 'What is the minimum bend radius for curved tempered glass?',
    a: 'On our Wuhan line, 500 mm at 6 mm thickness, 650 mm at 8 mm, 850 mm at 10 mm, 1,100 mm at 12 mm. These are production floors, not marketing numbers — beyond them the quench cracks the inner curve or the mold distorts. For radii below these values you need a cold-bent laminated build-up, which is a different product category.',
  },
  {
    q: 'How much more does curved tempered cost than flat tempered?',
    a: 'Expect +45–65% at project level for typical facade orders of 20–50 panels on a single radius. The premium is 3 line items: a one-time mold cost around USD 800 per unique radius, a bending-tempering surcharge of roughly +35% on the per-panel glass cost, and 5–8% extra scrap from quench yield loss. At quantities above 150 panels on one radius, mold amortizes and the premium can settle near +45%. Prices are indicative Oct 2026, EXW Wuhan.',
  },
  {
    q: 'Can tempered glass be bent in two directions (spherical)?',
    a: 'No, not on a tempering line. Thermal gradients during the quench cannot be balanced across two axes of curvature — the panel either cracks or arrives with warped optics. For true spherical or double-curved panels (dome segments, Apple-store style skylights), the industry uses cold-bent laminated construction: flat tempered plies bent against the structure on site, locked by SGP interlayer. Sincere supplies the flat plies; the facade contractor laminates and bends on site.',
  },
  {
    q: 'What tolerance can I expect on radius and dimensions?',
    a: 'Standard radius tolerance is ±1 mm for radii above 1,000 mm, widening to ±1.5 mm as you approach Rₘᵢₙ for that thickness. Chord dimensions hold ±1 mm. Panel-to-panel variance across a 20-panel order is typically ±1.5 mm radius end-to-end. We recommend specifying ±3 mm fit tolerance at mullion joints to absorb this.',
  },
  {
    q: 'What is the minimum order quantity for curved tempered glass?',
    a: 'No panel-count minimum, but the economics change below 10 panels on one radius. The mold cost (USD 400–1,200 depending on radius and panel size) is one-time and doesn’t scale — at 5 panels it dominates the invoice. For architectural prototypes or sample panels, we can quote 1–4 units at a higher per-panel price. Mixed radii in one order multiply the mold cost linearly.',
  },
  {
    q: 'What certifications apply to curved tempered glass?',
    a: 'Curved tempered glass is still tempered glass under GB 15763.2-2005 (China), ASTM C1048 (US), and EN 12150 (EU) — the standards do not distinguish curved from flat panels. All curved tempered we produce carries China 3C (CCC) certification. For international markets requiring CE marking under EN 14179 (heat-soaked tempered), we can route panels through our heat-soak oven on request; this adds 48 hours to lead time.',
  },
  {
    q: 'What is the lead time for curved tempered glass?',
    a: 'Typical production lead time is 18–25 working days for an order of 20–100 panels on a single radius. Breakdown: 4–6 days for mold fabrication (first radius, parallel with glass procurement), 7–10 days for cutting-edging-tempering on the bending line, 2–3 days for inspection and packing. Mixed-radii orders add 3–4 days per additional unique radius. Sea freight to Europe and the US adds 30–40 days on top of that.',
  },
  {
    q: 'Can curved tempered be combined with laminated or IGU?',
    a: 'Yes. Curved tempered plies can be laminated with matching-radius partners using PVB or SGP interlayer, and curved laminated units can be assembled into curved IGUs with matching-radius spacers. All three fabrication steps happen on separate lines and compound the lead time — a curved tempered-laminated-IGU unit typically runs 35–45 working days. The spacer bars must be CNC-bent to the same radius, which adds 2–3 days on their own.',
  },
];

export default function ArticlePage() {
  return (
    <>
      {articleJsonLd(article, faqItems).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <BlogArticleLayout article={article} toc={toc}>
        {/* TL;DR */}
        <TLDRBox takeaways={article.tldr || []} />

        <h2 id="what-is-curved" className="scroll-mt-24">What curved tempered actually is</h2>
        <p>
          Curved tempered glass is single-axis-curved float glass that has been heated to ~620°C, slumped against a cylindrical mold during the heating phase, then air-quenched in the curved position. The quench locks compressive stress into the outer surface and tensile stress into the core — same mechanism as flat tempering, same 4–5× strength multiplier, same safe-granule breakage pattern per GB 15763.2-2005. The only thing that differs from a flat panel is the geometry at the moment the stress freezes in.
        </p>
        <p>
          That one difference changes everything downstream. The mold is a bespoke steel tool for your project. The bending-tempering cycle takes ~30% longer than flat because the furnace has to accommodate the curvature of the mold bed. Quench airflow has to be re-balanced to compensate for the fact that the inner and outer surfaces of a curve present different distances to the quench nozzles. Yield is lower. Handling is harder. And unlike flat tempered, you cannot stack curved panels tightly on a shipping rack.
        </p>
        <p>
          None of that makes curved tempered rare or exotic. On our Wuhan line it runs alongside flat panels every week. But it does mean that <strong className="text-[#DAA745]">specifying curved as if it were just “flat with a radius”</strong> is how projects end up over budget and over schedule.
        </p>

        <h2 id="when-curved-beats-flat" className="scroll-mt-24">When curved beats flat: 5 project triggers</h2>
        <p>
          A curved panel is more expensive than a flat panel. Always. The question is whether the design intent earns that premium. These are the five project situations where it does:
        </p>
        <ol>
          <li>
            <strong>Faceting a continuous curve with flat panels would look bad.</strong> The threshold is about 15° of chord-to-chord angle. Below that, the eye reads the facade as segmented and dated. Above it, the client stops caring. If your facade curve is gentler than ~R=8,000 mm with 1,500 mm wide flat panels, people will see the facets. Curved panels dissolve them.
          </li>
          <li>
            <strong>You need to maintain water-tight continuous mullion joints along a curve.</strong> Flat-panel segmentation adds a joint at every chord-to-chord transition. Each joint is a sealant failure point and a line in the facade pattern. On curved rotunda balustrades or feature-wall glazing, continuous curved panels cut joint count by 60–80%.
          </li>
          <li>
            <strong>The structure behind the glass is already curved.</strong> Historic restorations, cylindrical elevator shafts, boat hulls, revolving-door enclosures. Flat panels against a curved frame mean either faceting or bespoke faceted framing — both ugly, both expensive.
          </li>
          <li>
            <strong>The glass is itself the design.</strong> Entrance canopies, bay-window features, retail shopfronts where the brand asks for “something that looks custom.” Curved tempered reads as deliberate; flat tempered reads as default.
          </li>
          <li>
            <strong>Code or acoustics push you to a thicker, laminated build-up on a curve.</strong> Curved laminated with SGP interlayer is one of the few assemblies that holds both overhead-glazing safety requirements and structural curvature at the same time. Flat-and-faceted does not satisfy some IBC Chapter 24 overhead provisions.
          </li>
        </ol>
        <p>
          If none of those five triggers apply, the honest advice is: specify flat tempered. We would rather sell you flat than see you discover the mold cost after your budget is signed off.
        </p>

        <h2 id="min-bend-radius" className="scroll-mt-24">Minimum bend radius: the spec that kills most designs</h2>
        <p>
          Every curved tempered glass drawing we review has a minimum bend radius problem in it somewhere. Architects spec tight curves because they look dramatic; the furnace cannot physically produce them below a floor set by the glass thickness.
        </p>
        <p>
          The rule of thumb: minimum bend radius scales roughly 100× the glass thickness, with a sharper floor at thinner glass because 6 mm cannot survive the thermal gradient of a very tight curve. In practice our line produces <strong className="text-[#DAA745]">Rₘᵢₙ 500 mm at 6 mm, 1,100 mm at 12 mm, 2,200 mm at 19 mm</strong>. Other factories vary ±15% around these numbers depending on furnace age and nozzle layout.
        </p>
        <p>
          If your drawing calls for 12 mm tempered at R=800 mm, three things can happen. One, you downgrade to 10 mm (Rₘᵢₙ 850 mm) and lose structural capacity. Two, you redesign the curve to R≥1,100 mm and the architect loses the look. Three, you switch to cold-bent laminated with two 6 mm tempered plies and gain cost + lead time but keep both the thickness and the curve. We see all three outcomes monthly.
        </p>
        <p>
          Figure this out at the design stage, not after RFQ. The calculator below is the same decision tool our estimators use when a drawing lands on our desk — enter your thickness, radius, arc length, and application, and it tells you whether we can quote the panel as specified.
        </p>

        {/* SSR shadow for C21 — plain-prose methodology for AI crawlers */}
        <p className="sr-only">
          The following tool is a feasibility checker for curved tempered glass. It takes four inputs: glass thickness (choose from 6, 8, 10, 12, 15, or 19 mm), target radius (300–5,000 mm), arc length (500–5,000 mm), and application (facade, balustrade, door, or canopy). It returns one of three verdicts — “Go” (your radius is at least 1.3× the minimum for that thickness), “Tight, proceed with sample” (feasible but near limit, requires sample panel sign-off), or “Not feasible as drawn” (radius below minimum, or arc length exceeds single-panel maximum). When radius is too tight for the selected thickness, the tool suggests the thinnest glass that would fit the radius. Minimum radii: 500 mm (6 mm), 650 mm (8 mm), 850 mm (10 mm), 1,100 mm (12 mm), 1,600 mm (15 mm), 2,200 mm (19 mm). Maximum single-panel arc length: 2,400–3,000 mm depending on thickness. All values are production floors on Sincere Glass’s Wuhan bending-tempering line as of October 2026.
        </p>
        <BendFeasibilityCalculator />

        <InlineQuoteCTA variant="compact" />

        <h2 id="cost-reality" className="scroll-mt-24">What a curved tempered panel actually costs</h2>
        <p>
          The honest answer: on top of what a flat tempered panel would cost, curved adds three line items.
        </p>
        <ol>
          <li>
            <strong>Mold cost.</strong> One-time, per unique radius, typically USD 400–1,200. Smaller molds for 1×1.5 m panels sit at the low end; large architectural molds (2.6 m tall) run USD 1,000–1,500. The mold is amortized across your panel count, so 5 panels on one radius carry USD 160 per panel of mold cost while 100 panels carry USD 8.
          </li>
          <li>
            <strong>Bending-tempering surcharge.</strong> Approximately +35% over flat tempering per panel. This covers the longer furnace cycle, the quench re-balancing, and the slower panel-per-hour throughput on the bending line.
          </li>
          <li>
            <strong>Yield loss.</strong> 5–8% of panels scrap during the quench vs 1–2% for flat. The scrap is priced into the per-panel number.
          </li>
        </ol>
        <p>
          Mixing multiple unique radii in one order multiplies mold cost directly — four radii means four molds, not amortized. We often recommend consolidating a facade’s curves to 2–3 radius families during design-review to control this.
        </p>

        {/* SSR shadow for C21 */}
        <p className="sr-only">
          The following tool models the project-level cost premium of curved tempered glass over flat tempered glass. It takes two inputs: order quantity (5–300 panels) and number of unique radii in the order (1–8). It calculates the total curved order cost as the sum of: base glass cost (USD 180 per flat 10 mm 1,500×2,500 panel reference, Oct 2026 EXW Wuhan) × quantity, plus a 35% bending-tempering surcharge, plus a 6% scrap premium, plus USD 800 × unique radii mold cost. It reports the overall premium percentage over flat, the per-panel curved price, and a stacked bar visualising base glass, bending surcharge, scrap, and mold shares of the total. At low quantity the mold cost dominates (a 5-panel single-radius order can land at +90% premium); at 150+ panels on a single radius the premium plateaus around +45% as mold cost amortizes. Mixed radii multiply mold cost linearly — four radii quadruples that line item.
        </p>
        <CurvedCostPremiumCalculator />

        <CostDisclaimer />

        <h2 id="curvature-types" className="scroll-mt-24">Three types of curves — and the one you cannot have</h2>
        <p>
          Not every curve a drawing shows can be produced in tempered glass. The feasibility depends entirely on how many axes of curvature are involved.
        </p>
        <ul>
          <li>
            <strong>Cylindrical (single-axis)</strong> is 95% of what we make and the only type most factories call simply “curved tempered.” The glass wraps around an invisible cylinder in one direction only. Standard production, standard lead time, standard cost premium.
          </li>
          <li>
            <strong>Conical (tapered single-axis)</strong> is still single-axis but the radius varies along the panel height — wider at the bottom than at the top, say, as the glass follows a tapered tower. The mold is more complex, cost is ~1.8× standard cylindrical. Still produceable, but on specialty orders.
          </li>
          <li>
            <strong>Spherical (double-axis)</strong> — glass curved in two directions at once, like a dome segment — cannot be made on a tempering line. The thermal physics of the quench cannot be balanced across two axes of curvature. If your drawing shows a double-curved panel in tempered glass, the specification is physically impossible. The industry workaround is cold-bent laminated: flat tempered plies that are bent on site against the structure during lamination. Sincere supplies the plies; your facade contractor runs the on-site cold-bending.
          </li>
        </ul>
        <p>
          Before anyone issues an RFQ, confirm which of the three your geometry actually is. We have seen six-figure budgets wasted on “curved tempered” quotes for geometries that no factory anywhere can produce.
        </p>

        {/* SSR shadow for C21 */}
        <p className="sr-only">
          The following tool is a curvature-type selector. It shows three options with iconographic SVG previews — cylindrical (single-axis curvature, wraps around an invisible cylinder), conical (tapered single-axis, radius varies along panel height), and spherical (double-axis, dome segment). Clicking each type reveals: feasibility status (Standard production / Specialty, longer lead / Not available in tempered glass), a one-line definition, a detailed explanation of production constraints, typical applications, and the radius envelope on our line. Cylindrical is standard with Rₘᵢₙ 500 mm at 6 mm thickness. Conical requires a compound mold (~1.8× the cost of cylindrical) and is limited to 40% radius variance top-to-bottom. Spherical is physically impossible on tempering lines due to thermal gradient imbalance during the quench; the workaround is cold-bent laminated construction using flat tempered plies bent on site, with SGP interlayer locking the curvature — Sincere Glass supplies the plies, the facade contractor handles on-site lamination.
        </p>
        <CurvatureTypeExplorer />

        <h2 id="spec-sheet" className="scroll-mt-24">What your drawing must contain</h2>
        <p>
          A quotable curved tempered specification needs seven pieces of information. Missing any one of them will come back to you as a clarifying email, which costs 2–4 working days against your project schedule.
        </p>
        <ol>
          <li><strong>Nominal glass thickness</strong> (6, 8, 10, 12, 15, or 19 mm). State whether this is single tempered, laminated, or part of an IGU.</li>
          <li><strong>Radius of curvature</strong> (in mm). If radius varies, provide top-radius and bottom-radius for conical panels. For complex profiles, provide a CAD file — Rhino, STEP, or DWG are all fine.</li>
          <li><strong>Developed arc length</strong> (not chord length). The arc length is the dimension of the glass before it is bent.</li>
          <li><strong>Panel height</strong> perpendicular to the curve.</li>
          <li><strong>Chord length</strong> — straight-line distance between the two ends of the curve. We cross-check this against radius + arc length to catch drawing errors.</li>
          <li><strong>Edge finish</strong> (ground, polished, pencil, chamfered). Curved edges cost more to polish than flat because the polishing head follows the curve.</li>
          <li><strong>Any holes, cutouts, or notches</strong>, including their positions relative to the inside of the curve, not just the panel edges.</li>
        </ol>

        <h2 id="logistics" className="scroll-mt-24">Lead time, molds, and shipping</h2>
        <p>
          Expect 18–25 working days from order confirmation to ready-for-pickup for a single-radius order of 20–100 panels. The breakdown: 4–6 days to fabricate the mold (first radius; subsequent radii in the same order add 2–3 days each in parallel), 7–10 days for cutting-edging-tempering on the bending line, and 2–3 days for inspection and crating.
        </p>
        <p>
          Shipping is where curved orders go sideways. Curved panels cannot stack flat, so they ship in bespoke A-frame or custom-radius-matched crates. A 20-ft container that would carry 180 flat panels carries 60–90 curved panels of the same base dimension. If you are moving the glass by sea freight, this doubles the cubic meters per panel and your freight cost scales with it, not with weight.
        </p>
        <p>
          For architectural projects, we usually recommend consolidating curved panels into dedicated containers rather than mixing with flat glass — the crating is incompatible, and mixed loads lead to higher damage rates.
        </p>

        {/* Lead magnet */}
        <LeadMagnetCTA variant="inline" articleSlug={SLUG} />

        <h2 id="when-flat-wins" className="scroll-mt-24">When flat still wins</h2>
        <p>
          Three honest situations where flat tempered is the right answer even if you were originally planning curved:
        </p>
        <ol>
          <li>
            <strong>Your radius is above R=12,000 mm.</strong> The curve is so gentle that flat panels with 1,000–1,200 mm chords will faceted it below perceptual threshold. No one will see the segments. Save the money and the lead time.
          </li>
          <li>
            <strong>Your panel count is below 10 and your radius is unique.</strong> Mold cost dominates and the per-panel economics do not recover. If the design permits, either batch with a future order on the same radius or switch to flat with articulated framing.
          </li>
          <li>
            <strong>Your spec requires double-axis curvature.</strong> No tempering line can produce it. You are not choosing curved vs flat tempered — you are choosing cold-bent laminated or faceted flat. Cold-bent carries its own complication; faceted flat is usually the honest answer.
          </li>
        </ol>

        <FAQ items={faqItems} />

        <h2 id="from-wuhan" className="scroll-mt-24">From our Wuhan line</h2>
        <p>
          Our bending-tempering line at the Wuhan facility runs curved panels up to 2,600 mm tall and 3,000 mm developed arc length. The furnace footprint is 20,000 m² across the two factories; the bending line itself occupies one of the four tempering bays. Rₘᵢₙ 500 mm at 6 mm thickness is a line-level envelope, not a per-order aspiration — it is the floor we quote against, every week, on every curved RFQ. We also run flat tempered up to 3.3 m × 15 m on the sister line, so curved + flat combination orders ship together when the structural assembly needs both.
        </p>
        <p>
          If you are designing a curved facade, canopy, or feature-wall assembly, send the CAD and we will run it against this envelope and quote accordingly. For context on how curved tempered compares to its most common alternative, see our deep-dive on <Link href="/blog/tempered-glass-vs-laminated-glass" className="text-[#DAA745] underline">tempered glass vs laminated glass</Link>, and for a project-level view of safety-glass selection start with the <Link href="/blog/architectural-glass-types-guide" className="text-[#DAA745] underline">architectural glass types pillar guide</Link>. For process context on how any tempered panel — flat or curved — is actually produced, our <Link href="/blog/how-is-tempered-glass-made" className="text-[#DAA745] underline">how is tempered glass made</Link> walk-through covers the shared physics.
        </p>

        <RelatedProductsCards slugs={article.relatedProductSlugs || []} />
      </BlogArticleLayout>
    </>
  );
}
