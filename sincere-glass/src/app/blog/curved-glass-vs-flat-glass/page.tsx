import type { Metadata } from 'next';
import Script from 'next/script';
import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
} from '@/components/blog/BlogArticleLayout';
import TLDRBox from '@/components/blog/TLDRBox';
import FAQ from '@/components/blog/blocks/FAQ';
import LeadMagnetCTA from '@/components/blog/LeadMagnetCTA';
import RelatedProductsCards from '@/components/blog/RelatedProductsCards';
import CostDisclaimer from '@/components/blog/CostDisclaimer';
import { makeAlternates } from '@/lib/i18n';

import CurvedPremiumCalculator from '@/components/blog/article-20/CurvedPremiumCalculator';
import ShapeRequirementChecker from '@/components/blog/article-20/ShapeRequirementChecker';
import ProjectFitAdvisor from '@/components/blog/article-20/ProjectFitAdvisor';

const SLUG = 'curved-glass-vs-flat-glass';
const article = blogArticles.find((a) => a.slug === SLUG) as BlogArticle;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc = [
  { id: 'the-real-question',    text: 'The real question is not curved vs flat', level: 2 },
  { id: 'where-flat-wins',      text: 'Where flat glass still wins',              level: 2 },
  { id: 'what-curved-unlocks',  text: 'What curved glass unlocks',                level: 2 },
  { id: 'cost-calculator',      text: 'The real cost delta, calculated',          level: 2 },
  { id: 'shape-checker',        text: 'Do you actually need curved glass?',       level: 2 },
  { id: 'project-fit',          text: 'Six project types, six verdicts',          level: 2 },
  { id: 'procurement',          text: 'Lead time, MOQ, and container economics',  level: 2 },
  { id: 'faq',                  text: 'FAQ',                                      level: 2 },
];

const faqItems = [
  {
    q: "Is curved glass stronger or weaker than flat glass?",
    a: "Neither — same base glass, same tempering process, same surface compressive stress (90-110 MPa in our Wuhan furnace), same safe-fragmentation pattern on break. The curve itself does not change structural performance. What does change is how the panel resists wind and point loads in service, because a curved panel has geometric stiffness that a flat panel of the same thickness does not. In practice this often lets specifiers thin a curved panel by one step compared to the flat equivalent.",
  },
  {
    q: "What is the minimum order quantity for curved glass?",
    a: "For single-axis cylindrical panels (the most common geometry) we have no hard MOQ because the hot-bending mold is reusable — single-panel orders are possible, though per-m2 cost is higher at low volumes. For spherical and free-form panels, a 4-panel minimum per unique profile is typical because the mold cost gets amortized across the order. Standard PVB and SGP laminated variants of curved panels follow the same minimums as their flat equivalents (100 m2 for PVB, 200 m2 for SGP).",
  },
  {
    q: "How much more does curved glass cost than flat?",
    a: "At our export line, cylindrical panels in the standard R = 1,500-3,000 mm range run 70-110 percent more per square meter than flat tempered of the same thickness. Tight-radius panels (R < 800 mm) run 120-200 percent more. Spherical adds roughly 50 percent on top of cylindrical for the same radius. Free-form adds another 30 percent. The exact number depends on panel area (mold cost amortizes), so use the calculator in this article for your specific spec.",
  },
  {
    q: "Can I mix curved and flat panels in the same facade?",
    a: "Yes, and we recommend it for most projects over 500 m2 of glass. The sightline logic: at viewing distances over 15 m the human eye reads mitred flat panels as effectively curved — the facet joints disappear. Reserving curved glass for ground-floor focal zones (entrance, street-facing retail, anywhere the viewer stands within 5-10 m of the facade) and using flat panels for upper floors typically keeps the glass premium under 25 percent of a pure-curved budget while preserving the visual impact where it matters.",
  },
  {
    q: "How much longer is the lead time for curved glass vs flat?",
    a: "Flat tempered export orders ship 20-30 days from PO at our Wuhan line. Curved tempered: 25-35 days for standard radius cylindrical (reusable mold, no new tooling), 35-55 days for spherical (custom-cast refractory mold required), and 45-70 days for free-form (CNC mold machining from the architect's 3D model). The lead-time delta on cylindrical is modest; on spherical and free-form the mold casting dominates the schedule and the first-order cost.",
  },
  {
    q: "Does curved glass ship differently than flat in a container?",
    a: "Yes. Flat panels ship vertically in standard A-frame crates at about 650-800 m2 per 40-foot container depending on thickness and spacing. Curved panels require custom nested cradles — the curvature prevents efficient stacking — and typical container loading drops to 350-550 m2 depending on radius and panel size. For projects on tight shipping budgets this is a cost line worth modeling explicitly. We provide loading diagrams at RFQ for any curved order to make the volumetric impact visible.",
  },
  {
    q: "Can curved glass be insulated or laminated?",
    a: "Yes to both. Curved insulated glass units (IGU) use two or more curved panes with a flexible aluminum or stainless spacer bent to match the curvature; dual-seal (PIB + structural silicone) same as flat IGU. Curved laminated glass uses curved tempered panes bonded with PVB or SGP in a shape-matched autoclave cycle. The combinations are common on premium facades: curved + Low-E coated + IGU for thermal, or curved + SGP laminated for structural overhead and safety-critical applications.",
  },
  {
    q: "What is the smallest radius you can achieve on curved tempered?",
    a: "500 mm minimum radius, limited to 6 mm panel thickness. For 10 mm panels the floor rises to approximately 900 mm; for 19 mm, around 2,500 mm. Tighter radii require thinner glass or a two-piece faceted build. Our 500 mm minimum sits well below the 800-1,000 mm floor most Chinese and Southeast Asian plants publish, and is one of the capabilities we built the curved tempered line specifically to deliver.",
  },
];

export default function Page() {
  if (!article) return null;

  return (
    <>
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(article, faqItems)),
        }}
      />

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={article.tldr || []} />

        {/* GROK-INSERT-V1:verdict-and-standards */}

        <div className="not-prose my-8 p-5 rounded-xl border-l-4 border-[#DAA745] bg-[#FAFAF8] dark:bg-[#1C1F26]/40">
          <p className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-2">
            The 30-second verdict
          </p>
          <p className="text-base md:text-lg leading-relaxed text-[#1C1F26] dark:text-[#F2F0ED] m-0">
            <strong>Flat glass is the architectural default.</strong> Pay the curved premium only when your project hits at least two of these four pressure factors:
            <span className="block mt-2 text-sm text-[#3A4250] dark:text-[#8B95A5]">
              (1) geometry physically demands a curved panel ·
              (2) visual continuity matters at the viewing distance ·
              (3) panel size is large enough that facet joints would read ·
              (4) budget can absorb the premium.
            </span>
            <span className="block mt-2 text-sm text-[#3A4250] dark:text-[#8B95A5]">
              Hybrid builds (curved at focal zones, faceted flat elsewhere) typically hold the project premium under +25%.
            </span>
          </p>
        </div>

        <div className="not-prose my-6 flex flex-wrap gap-2">
          {[
            { code: 'GB 15763.2-2005', region: 'China', meaning: 'Safety glass tempered' },
            { code: 'ASTM C1048', region: 'US', meaning: 'Heat-treated flat glass' },
            { code: 'EN 12150', region: 'EU', meaning: 'Thermally toughened' },
            { code: 'EN 14179', region: 'EU', meaning: 'Heat-soaked tempered' },
          ].map((s) => (
            <div
              key={s.code}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#3A4250]/5 dark:bg-white/5 border border-[#3A4250]/15 dark:border-white/10 text-xs"
              title={s.meaning}
            >
              <span className="font-mono font-semibold text-[#1C1F26] dark:text-[#F2F0ED]">{s.code}</span>
              <span className="text-[#8B95A5]">· {s.region}</span>
            </div>
          ))}
        </div>

        <h2 id="the-real-question">The real question is not curved vs flat</h2>
        <p>
          Most buyers come to this comparison asking the wrong question. &quot;Should I use
          curved glass or flat glass?&quot; frames it as a stylistic choice between two
          equivalents. In practice it is not. Flat tempered glass is the default
          architectural product in every modern code and every price list on earth; it
          is what gets specified unless the project forces a reason to deviate. Curved
          glass is what you reach for when a specific constraint — geometric,
          functional, or brand-driven — makes flat unworkable.
        </p>
        <p>
          That reframing matters because it clarifies the burden of proof. The right
          question is not &quot;which looks better here&quot; but &quot;does my project have a
          reason to pay 60 to 200 percent more per square meter of glass?&quot; If the
          answer is yes, this article walks through how to specify curved correctly
          and what the real cost delta looks like. If the answer is no — or you are
          not sure — the first two sections and the decision checker below will save
          you a conversation with your architect you probably want to have before
          going into procurement.
        </p>
        <p>
          Everything that follows is written from our export line in Wuhan, where we
          produce both{' '}
          <a href="/products/tempered-glass">flat tempered glass</a> and{' '}
          <a href="/products/curved-tempered-glass">curved tempered glass</a> on the
          same two furnaces. The economics and the trade-offs are what we quote to
          architects and contractors every week.
        </p>

        <h2 id="where-flat-wins">Where flat glass still wins</h2>
        <p>
          Flat glass is not just cheaper. It has structural, logistical, and
          procurement advantages that compound at scale, and understanding them is
          what makes the curved decision honest rather than aspirational.
        </p>
        <p>
          <strong>Cost per square meter.</strong> At the FOB-China export line, flat
          tempered 10 mm runs around $75-90/m² in container quantities for 2026 Q4.
          The same spec curved at a standard 1,500-3,000 mm radius runs $140-180/m².
          That delta is the entry ticket; it holds across lamination and IGU
          variations in the same proportion.
        </p>
        <p>
          <strong>Panel-size envelope.</strong> Our tempering furnace handles flat
          panels up to 3.3 m × 15 m — among the largest in Hubei province. A curved
          panel at the same furnace cap faces practical constraints: at very large
          sizes the sag during hot-bending becomes harder to control, so the
          working envelope for jumbo curved is tighter than for jumbo flat. If the
          design calls for genuinely jumbo single-piece panels, flat gives you more
          size to work with than curved.
        </p>
        <p>
          <strong>Standards and testing.</strong> Flat tempered glass has decades of
          test data behind it under GB 15763.2 (China), EN 12150 (Europe), ANSI
          Z97.1 (US), and AS 1288 (Australia). Curved tempered is covered under the
          same base standards but the test regime is less uniform across markets —
          not a problem for architectural specification, but it means more
          back-and-forth with the project's certification consultant on export
          jobs.
        </p>
        <p>
          <strong>Repair and replacement.</strong> A flat panel that breaks after
          commissioning is replaceable off-the-shelf. A curved panel means
          re-ordering with mold specs; if the mold has been archived, it is a 25-45
          day lead; if the mold has been scrapped, longer. For high-risk
          applications (ground-floor retail, public circulation) buyers sometimes
          order spare panels at the time of original production — a small cost line
          that is cheaper than an emergency re-order.
        </p>
        <p>
          <strong>Shipping efficiency.</strong> Flat panels ship vertically in
          A-frame crates at 650-800 m² per 40-foot container. Curved panels need
          custom nested cradles and container loading drops to 350-550 m². On
          large orders this logistics delta is often a bigger cost line than the
          per-panel premium itself.
        </p>

        <h2 id="what-curved-unlocks">What curved glass unlocks</h2>
        <p>
          Everything above is the case for flat. Here is what flat cannot do, which
          is why curved glass exists as a product line at all.
        </p>
        <p>
          <strong>True continuous curvature.</strong> At viewing distances under
          10-15 m — which is where ground-floor facades, retail shopfronts, and
          interior installations live — the human eye reads mitred flat panels as
          what they are: a series of flat facets with visible joints. A single
          hot-bent panel reads as a continuous surface. For projects where that
          read matters (hospitality, museum, flagship retail, luxury residential),
          flat is not a cost-saving alternative; it is a visual compromise.
        </p>
        <p>
          <strong>Geometry that flat cannot approximate.</strong> A cylindrical
          lift shaft inside a hotel atrium cannot be built from flat facets without
          making the lift car look like it is inside a polygon. Dome skylights,
          observation enclosures, and spherical sculptural glazing have no flat
          equivalent that reads correctly. The geometry physically demands a
          curve, and the only decision is which curved production method to use
          (hot-bend for tight radii, cold-bend for shallow curves).
        </p>
        <p>
          <strong>Smaller joint count on long sweeping facades.</strong> A 40 m
          sweeping curtain wall built from 3 m-wide flat panels needs about 13
          vertical joints visible from ground level. The same facade built from
          3 m-wide curved panels needs the same joint count — but each joint
          follows the curve rather than kinking at a facet break. The visual
          continuity is subtle but reads as higher-quality architecture at any
          viewing distance.
        </p>
        <p>
          <strong>Geometric stiffness.</strong> This one surprises buyers. A
          curved panel has flexural stiffness that a flat panel of the same
          thickness does not — the curvature acts structurally. On overhead
          glazing and point-supported facades, this often lets us thin a curved
          panel by one step (12 mm flat replaced by 10 mm curved) while meeting
          the same deflection target. It does not eliminate the cost premium, but
          it reduces it. Worth modeling with your structural glass consultant.
        </p>

        <h2 id="cost-calculator">The real cost delta, calculated</h2>

        {/* GROK-INSERT-V1:cost-breakdown-table */}

        <figure className="not-prose my-6 overflow-x-auto">
          <table
            className="w-full text-sm border-collapse"
            aria-label="Cost premium breakdown of curved tempered glass over flat tempered glass"
          >
            <caption className="text-left text-xs text-[#8B95A5] mb-3 italic">
              Reference pricing: Sincere Glass FOB Wuhan quotations, 2023 Q1 – 2026 Q3. Not a formal quote; subject to specification, coating, and FX.
            </caption>
            <thead>
              <tr className="border-b-2 border-[#3A4250]/30 bg-[#FAFAF8] dark:bg-[#3A4250]/20">
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Shape class</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Price (10mm, 1.5×2.5m ref)</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Delta vs flat</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">When it fits</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">Flat tempered</th>
                <td className="py-2.5 px-3 font-mono">USD 75–90 /m²</td>
                <td className="py-2.5 px-3 font-mono">Baseline</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">Default</td>
              </tr>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">Curved cylindrical (standard R)</th>
                <td className="py-2.5 px-3 font-mono">USD 140–180 /m²</td>
                <td className="py-2.5 px-3 font-mono text-[#DAA745]">+70–110%</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">R ≥ 800 mm, reusable molds</td>
              </tr>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">Curved cylindrical (tight R &lt; 800 mm)</th>
                <td className="py-2.5 px-3 font-mono">USD 180–250 /m²</td>
                <td className="py-2.5 px-3 font-mono text-[#DAA745]">+120–200%</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">Yield loss + bespoke mold</td>
              </tr>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">Curved spherical</th>
                <td className="py-2.5 px-3 font-mono">USD 250–380 /m²</td>
                <td className="py-2.5 px-3 font-mono text-[#DAA745]">+230–320%</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">Custom-cast refractory mold</td>
              </tr>
              <tr>
                <th scope="row" className="py-2.5 px-3 font-semibold">Free-form (CNC mold per panel)</th>
                <td className="py-2.5 px-3 font-mono">USD 320–480 /m²</td>
                <td className="py-2.5 px-3 font-mono text-[#DAA745]">+325–435%</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">4-panel MOQ per profile</td>
              </tr>
            </tbody>
          </table>
        </figure>
        <p>
          <strong>How the calculator works:</strong> three inputs — radius in
          millimeters, finished panel area in square meters, and geometry type
          (single-axis cylindrical, double-axis spherical, or free-form). The
          model multiplies our empirical radius-penalty curve (3.5x below the
          500 mm floor, 2.6x at tight radii under 800 mm, 2.1x in the standard
          800-1,500 mm range, 1.75x at 1,500-3,000 mm, 1.5x at 3,000-5,000 mm,
          1.25x in cold-bend territory above 5,000 mm) by a geometry multiplier
          (1.0 single-axis, 1.5 spherical, 1.95 free-form) and adds mold
          amortization that drops as order area rises. The output is a per-m²
          price and a project-total delta against the flat baseline you set.
          Values come from our Wuhan plant's export quote history 2023-2026 and
          are planning estimates, not quotation-grade.
        </p>

        <CurvedPremiumCalculator />

        <CostDisclaimer />

        <h2 id="shape-checker">Do you actually need curved glass?</h2>
        <p>
          <strong>How the checker works:</strong> four binary yes/no questions
          probing the four pressure factors that justify curved glass —
          geometric necessity (would mitred flat panels achieve the shape),
          visual continuity (does reflection and sightline continuity matter at
          the viewing distance), panel scale (are the panels large enough that
          facet joints would be visually prominent), and budget headroom (can
          the project absorb a 60-200 percent glass premium). The rule tree
          combines all four answers into one of three verdicts: &quot;flat suffices&quot;
          (no geometric or visual pressure), &quot;curved justified&quot; (all four
          align), or &quot;mixed strategy&quot; (some factors push to curved but not
          all). Reset and re-answer to see how changing one factor shifts the
          recommendation.
        </p>

        <ShapeRequirementChecker />

        <h2 id="project-fit">Six project types, six verdicts</h2>

        {/* GROK-INSERT-V1:static-scenario-cards */}

        <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
          {[
            {
              name: 'Panoramic lift / glass elevator',
              verdict: 'Curved',
              costDelta: '+90–130% vs flat',
              buildup: '10 mm or 12 mm curved tempered, R = 1,500–2,500 mm',
              reason: 'Shaft geometry physically demands cylindrical panels; one panel spans up to 15 m vertically on our line.',
            },
            {
              name: 'Multi-story curved curtain wall',
              verdict: 'Hybrid',
              costDelta: '+25–45% blended vs full-flat',
              buildup: 'Ground floor: 8+1.52+8 curved laminated. Upper floors: flat IGU with Low-E.',
              reason: 'At viewing distances > 15 m the eye reads faceted flat as curved. Keep the premium where it counts.',
            },
            {
              name: 'Entrance canopy / porte-cochere',
              verdict: 'Curved',
              costDelta: '+30–60% vs flat',
              buildup: '6+1.52+6 laminated, R = 5,000–15,000 mm, cold-bent on-site',
              reason: 'Gentle radius means cold-bending flat panels into curved frames on site — cost-effective.',
            },
            {
              name: 'Boutique retail shopfront',
              verdict: 'Curved',
              costDelta: '+70–110% vs flat',
              buildup: '10 mm or 12 mm curved tempered, R = 2,000–4,000 mm',
              reason: 'Flagship facades judged by brand positioning. Glass area is usually small (10–40 m²) so absolute premium stays modest.',
            },
            {
              name: 'Standard office perimeter facade',
              verdict: 'Flat',
              costDelta: 'Baseline (0%)',
              buildup: '6+1.52+6 or 8+1.52+8 flat laminated IGU',
              reason: 'No geometric or visual demand that curved glass solves. Curved here would add 60–200% cost for zero project benefit.',
              isFallback: true,
            },
            {
              name: 'Sculptural free-form feature wall',
              verdict: 'Curved',
              costDelta: '+150–250% vs flat',
              buildup: 'Varies — custom CNC mold per unique panel profile',
              reason: 'Design intent is the glass itself. 45–70 day lead from approved 3D model. 4-panel MOQ per profile.',
            },
          ].map((s) => (
            <div
              key={s.name}
              className={`p-5 rounded-xl border ${
                s.isFallback
                  ? 'bg-[#F2F0ED]/50 dark:bg-[#3A4250]/20 border-[#3A4250]/20'
                  : 'bg-white dark:bg-[#1C1F26]/60 border-[#DAA745]/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-sm font-semibold text-[#1C1F26] dark:text-[#F2F0ED] m-0">{s.name}</h4>
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded whitespace-nowrap ${
                    s.isFallback
                      ? 'bg-[#3A4250]/10 text-[#3A4250] dark:text-[#8B95A5]'
                      : 'bg-[#DAA745]/15 text-[#DAA745]'
                  }`}
                >
                  {s.verdict}
                </span>
              </div>
              <p className="text-xs text-[#8B95A5] mb-1 font-mono">{s.costDelta}</p>
              <p className="text-xs text-[#3A4250] dark:text-[#8B95A5] font-mono mb-2">{s.buildup}</p>
              <p className="text-sm text-[#3A4250] dark:text-[#8B95A5] leading-relaxed m-0">{s.reason}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#8B95A5] italic -mt-4 mb-4">
          Static scenario cards above. The interactive advisor below walks the same six scenarios one at a time with the full reasoning chain.
        </p>
        <p>
          <strong>How the advisor works:</strong> six common architectural
          scenarios where the curved-vs-flat question comes up most often in
          our export inbox — panoramic lifts, multi-story curved curtain walls,
          entrance canopies, boutique retail shopfronts, standard office
          perimeter facades, and sculptural free-form features. Each returns a
          curved/flat/hybrid verdict with the specific build-up we quote, the
          cost delta range against the flat baseline from our 2023-2026 export
          quote history, and the reasoning for why the verdict comes out that
          way. Pick the scenario closest to yours; it is often the fastest way
          to a defensible first-pass recommendation.
        </p>

        <ProjectFitAdvisor />

        <h2 id="procurement">Lead time, MOQ, and container economics</h2>

        {/* GROK-INSERT-V1:procurement-tables */}

        <figure className="not-prose my-6 overflow-x-auto">
          <table
            className="w-full text-sm border-collapse"
            aria-label="Lead time comparison for flat and curved tempered glass"
          >
            <caption className="text-left text-xs text-[#8B95A5] mb-3 italic">
              Table · Lead time by shape class, EXW Wuhan. Add 30–40 days for sea freight to Europe or North America. Data verified October 2026.
            </caption>
            <thead>
              <tr className="border-b-2 border-[#3A4250]/30 bg-[#FAFAF8] dark:bg-[#3A4250]/20">
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Shape</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Lead time (PO → ready)</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">MOQ</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Tooling</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">Flat tempered</th>
                <td className="py-2.5 px-3 font-mono">20–30 days</td>
                <td className="py-2.5 px-3 font-mono">None</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">No tooling</td>
              </tr>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">Curved cylindrical</th>
                <td className="py-2.5 px-3 font-mono">25–35 days</td>
                <td className="py-2.5 px-3 font-mono">1 panel</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">Reusable steel mold</td>
              </tr>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">Curved spherical</th>
                <td className="py-2.5 px-3 font-mono">35–55 days</td>
                <td className="py-2.5 px-3 font-mono">4 panels / profile</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">Custom-cast refractory mold</td>
              </tr>
              <tr>
                <th scope="row" className="py-2.5 px-3 font-semibold">Free-form</th>
                <td className="py-2.5 px-3 font-mono">45–70 days</td>
                <td className="py-2.5 px-3 font-mono">4 panels / profile</td>
                <td className="py-2.5 px-3 text-[#8B95A5]">CNC-machined per 3D model</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <figure className="not-prose my-6 overflow-x-auto">
          <table
            className="w-full text-sm border-collapse"
            aria-label="Container loading density, flat vs curved tempered glass"
          >
            <caption className="text-left text-xs text-[#8B95A5] mb-3 italic">
              Table · Container loading density. Curved panels require custom nested cradles, so freight cost scales with cubic meters rather than panel weight.
            </caption>
            <thead>
              <tr className="border-b-2 border-[#3A4250]/30 bg-[#FAFAF8] dark:bg-[#3A4250]/20">
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Container</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Flat (m²)</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Curved (m²)</th>
                <th scope="col" className="text-left py-2.5 px-3 font-semibold">Density vs flat</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#3A4250]/10">
                <th scope="row" className="py-2.5 px-3 font-semibold">20' DC</th>
                <td className="py-2.5 px-3 font-mono">320–400 m²</td>
                <td className="py-2.5 px-3 font-mono">160–240 m²</td>
                <td className="py-2.5 px-3 font-mono text-[#DAA745]">~50–60%</td>
              </tr>
              <tr>
                <th scope="row" className="py-2.5 px-3 font-semibold">40' HQ</th>
                <td className="py-2.5 px-3 font-mono">650–800 m²</td>
                <td className="py-2.5 px-3 font-mono">350–550 m²</td>
                <td className="py-2.5 px-3 font-mono text-[#DAA745]">~55–70%</td>
              </tr>
            </tbody>
          </table>
        </figure>
        <p>
          Procurement differences between curved and flat matter as much as the
          per-m² price on real projects. Three areas to budget for:
        </p>
        <p>
          <strong>Lead time delta.</strong> Flat tempered export orders ship
          20-30 days from PO. Curved cylindrical at standard radius: 25-35
          days (reusable mold, no new tooling). Curved spherical: 35-55 days
          because of custom-cast refractory molds. Free-form: 45-70 days
          driven by CNC mold machining from the architect's 3D model. On
          time-critical projects we reserve the curved panels at PO signing
          and start molds in parallel with the flat production.
        </p>
        <p>
          <strong>MOQ.</strong> Flat tempered: no hard minimum, cost steps up
          at small volumes. Curved cylindrical: single-panel orders possible
          because the mold is reusable, but per-m² cost is higher at low
          volume. Curved spherical and free-form: 4-panel minimum per unique
          profile is typical to keep per-unit mold cost reasonable. Mixing
          curved marks with flat marks in the same PO is standard — most of
          our export orders are hybrid.
        </p>
        <p>
          <strong>Container economics.</strong> Flat panels ship vertically at
          650-800 m² per 40-foot container. Curved panels require custom
          nested cradles and typical loading drops to 350-550 m² — a
          significant freight cost delta on large orders. We provide loading
          diagrams at RFQ for every curved order so the volumetric impact is
          visible before PO.
        </p>
        <p>
          <strong>Mold storage.</strong> We archive customer molds for 24
          months by default. For projects likely to need replacement panels
          beyond that horizon (public ground-floor retail, hotel entrances)
          we recommend either extending the mold archive agreement or
          ordering 1-2 spare panels at original production. Both are small
          cost lines compared to an emergency re-order at year 3.
        </p>
        <p>
          If you want to see the full curved tempered specification page with
          interactive feasibility checker and curvature visualizer, head to
          our{' '}
          <a href="/products/curved-tempered-glass">
            curved tempered glass product page
          </a>
          . The three interactive tools there confirm radius, thickness, and
          panel-size feasibility in real time against our 500 mm minimum
          radius and 3.3 m × 15 m envelope.
        </p>

        <LeadMagnetCTA
          variant="inline"
          articleSlug={SLUG}
          title="Free: Global Architectural Glass Building Codes Comparison"
          description="A side-by-side 11-page PDF covering US IBC, EU EN, China GB, and Australia AS requirements for tempered and laminated glass across all common applications. Free for architects, specifiers, and procurement teams."
        />

        <FAQ items={faqItems} />

        <RelatedProductsCards
          slugs={article.relatedProductSlugs || ['curved-tempered-glass', 'tempered-glass', 'laminated-glass']}
        />
      </BlogArticleLayout>
    </>
  );
}
