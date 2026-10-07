import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from '@/components/blog/BlogArticleLayout';
import TLDRBox from '@/components/blog/TLDRBox';
import LeadMagnetCTA from '@/components/blog/LeadMagnetCTA';
import CostDisclaimer from '@/components/blog/CostDisclaimer';
import RelatedProductsCards from '@/components/blog/RelatedProductsCards';
import { FAQ, TechNote, ComparisonTable } from '@/components/blog/blocks';
import StrengthSimulator from '@/components/blog/article-3/StrengthSimulator';
import BreakagePatternViewer from '@/components/blog/article-3/BreakagePatternViewer';

const SLUG = 'tempered-glass-vs-annealed-glass';
const article: BlogArticle = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata = generateArticleMetadata(article);

const toc: TOCItem[] = [
  { id: 'what-is-annealed', text: 'What "Annealed Glass" Actually Means', level: 2 },
  { id: 'strength-gap', text: 'The Strength Gap: 1× vs 4-5× vs 10×', level: 2 },
  { id: 'breakage', text: 'How They Break — The Real Difference', level: 2 },
  { id: 'code', text: 'Where Code Forbids Annealed', level: 2 },
  { id: 'when-annealed', text: 'When Annealed Is the Right Choice', level: 2 },
  { id: 'spec-sheet', text: 'Spec Sheet Comparison', level: 2 },
  { id: 'cost', text: 'Cost & Lead Time', level: 2 },
  { id: 'adjacent', text: 'Adjacent Options Worth Knowing', level: 2 },
  { id: 'faq', text: 'Buyer FAQ', level: 2 },
];

const buyerFaqItems = [
  {
    q: "Does Sincere Glass still produce annealed glass, or only tempered?",
    a: "We produce both. Annealed float glass is our raw material for all tempered, laminated, and coated products. We also sell annealed glass directly for applications where tempering is unnecessary or counterproductive — framed artwork, interior partitions in non-safety locations, and buyers who want to cut, drill, or process the glass themselves. Minimum order 50 m² for custom cuts.",
  },
  {
    q: "What's the MOQ for tempered glass orders from China?",
    a: "Our standard MOQ for tempered glass orders is 50 square meters. We can accept smaller trial orders at a nominal setup fee for new buyers. Our 3m × 15m tempering furnace is one of the largest in Hubei province, so we can handle both jumbo architectural panels and smaller volume runs on the same production line.",
  },
  {
    q: "Can tempered glass be cut or drilled after it's tempered?",
    a: "No. Tempered glass must be cut, drilled, edge-finished, and have any holes made BEFORE it goes into the tempering furnace. Any attempt to cut or drill tempered glass causes it to shatter. This is one of the main reasons spec drawings must be finalized before order placement — field modifications are not possible.",
  },
  {
    q: "What certifications ship with tempered glass to international markets?",
    a: "All tempered glass we produce is 3C (CCC) certified under China's mandatory product certification system, tested per GB 15763.2-2005. For export orders, we provide third-party test reports suitable for ASTM C1048 compliance review (US), EN 12150 (EU), and AS/NZS 2208 (Australia/NZ). We cannot ship CE-marked product directly — buyers requiring CE must coordinate with an EU-based assessment body.",
  },
];

export default function Page() {
  return (
    <>
      {articleJsonLd(article, buyerFaqItems).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={[
          'Annealed glass is "regular" float glass — the raw material. It has essentially no residual stress and breaks into dangerous shards.',
          'Tempered glass is annealed glass that has been reheated and rapidly cooled, giving it 4-5× the strength and a safe granular breakage pattern.',
          'Most modern building codes (IBC §2406, GB 50210, EN 12600) forbid annealed glass in "safety glazing hazardous locations" — doors, shower walls, low windows, railings.',
          'Annealed is still the correct choice for interior framed artwork, non-safety-location windows above 4ft from the floor, and when the buyer needs to cut/drill the glass themselves.',
          'FOB Wuhan reference pricing: annealed 6mm ~$5-8/m², tempered 6mm ~$18-22/m² — the premium is roughly 3× for the safety upgrade.',
        ]} />

        <p>
          "What's the difference between tempered and regular glass?" is one of the most common
          questions we get from first-time buyers. The short answer: <strong>regular glass is
          annealed glass</strong> — the raw sheet product that comes off a float line without any
          strengthening treatment. Tempered glass is that same product after a secondary heat
          treatment. The difference matters because building codes in nearly every country draw a
          hard line between the two for safety reasons.
        </p>

        <p>
          This guide walks through what each product actually is, how they fail, where code forces
          your hand, and when annealed is still the right pick despite being "weaker." If you've
          already read our comparisons of{' '}
          <a href="/blog/tempered-glass-vs-laminated-glass">tempered vs laminated</a>{' '}
          or{' '}
          <a href="/blog/insulated-glass-vs-laminated-glass">insulated vs laminated</a>, this one
          goes back one step — to the question of whether you need <em>any</em> safety glass at
          all.
        </p>

        <h2 id="what-is-annealed">What "Annealed Glass" Actually Means</h2>

        <p>
          Annealed glass is the direct output of the float glass process: molten glass is poured
          onto a bed of molten tin, drawn to thickness, and then <em>slowly cooled</em> through
          an annealing lehr. That slow cooling is what makes it "annealed" — the controlled
          temperature descent allows internal stresses to equalize, leaving a glass sheet that is
          flat, optically clear, and <em>mechanically unremarkable</em>.
        </p>

        <p>
          In our 20,000 m² Wuhan facility, we don't make float glass ourselves — we purchase it
          from upstream float plants and use it as the input to every other product we produce.
          Tempered, laminated, Low-E coated, enameled: all of them start life as plain annealed
          glass. In that sense, annealed glass isn't a <em>competitor</em> to tempered — it's
          the raw material that tempered is made from.
        </p>

        <TechNote type="note" title="Terminology that trips buyers up">
          <p>
            "Annealed glass," "float glass," "ordinary glass," and "regular glass" all refer to
            the same product in commercial contexts. "Plate glass" is an older term that
            technically describes a pre-1960s manufacturing method but is still used loosely to
            mean annealed float glass. If a spec sheet says "6mm clear glass" without qualifying
            it, assume it means 6mm clear annealed float.
          </p>
        </TechNote>

        <h2 id="strength-gap">The Strength Gap: 1× vs 4-5× vs 10×</h2>

        <p>
          The simplest way to understand the difference is through surface compressive stress —
          the pressure "baked into" the surface of the glass that any external force must
          overcome before the glass breaks. Hover each bar below:
        </p>

        <StrengthSimulator />

        <p>
          Annealed glass has essentially zero compressive stress — around 40 MPa breaking
          threshold, which is only the inherent strength of the glass bonds themselves. A{' '}
          <a href="/products/tempered-glass">tempered glass</a>{' '}
          pane has been heated to ~620°C and then quenched with high-pressure air jets, creating
          180+ MPa of surface compression. The glass is literally "pre-loaded" against failure.
        </p>

        <p>
          Our 3m × 15m tempering furnace can handle jumbo panels at these stress levels — the
          largest in Hubei province — which is why we can supply tempered glass for curtain walls
          and oversized facades that smaller factories cannot.
        </p>

        <h2 id="breakage">How They Break — The Real Difference</h2>

        <p>
          The strength number matters, but it's not what makes tempered glass "safety glass."
          The decisive factor is <em>what happens when it finally does break</em>. Toggle below:
        </p>

        <BreakagePatternViewer />

        <p>
          This is why code calls tempered glass "safety glass" and annealed glass is explicitly
          not safe for most building applications. An adult walking into a glass door made of
          6mm annealed glass is likely to sustain serious lacerations; the same impact on 6mm
          tempered produces granules that are not dangerous.{' '}
          <a href="https://codes.iccsafe.org/content/IBC2021P2/chapter-24-glass-and-glazing" target="_blank" rel="noopener">IBC 2021 §2406.4</a>{' '}
          enumerates the "hazardous locations" where safety glass is required.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug="tempered-glass-vs-annealed-glass" />

        <h2 id="code">Where Code Forbids Annealed</h2>

        <p>
          Nearly every modern building code includes a list of "safety glazing hazardous
          locations" where annealed glass is prohibited. These are places where human impact is
          likely and failure consequences are severe. The main categories:
        </p>

        <ul>
          <li>
            <strong>Doors and sidelights</strong> — any glass in or within 24 inches (610mm) of
            a door edge (IBC §2406.4.1)
          </li>
          <li>
            <strong>Shower and bathtub enclosures</strong> — all glazing, no exceptions (IBC §2406.4.5)
          </li>
          <li>
            <strong>Low windows</strong> — glass panes larger than 9 sq ft (0.84 m²) whose bottom
            edge is within 18 inches (457mm) of the floor (IBC §2406.4.3)
          </li>
          <li>
            <strong>Railings, guards, balustrades</strong> — all structural glazing (IBC §2407)
          </li>
          <li>
            <strong>Stair treads and landings</strong> — all walking surface glazing
          </li>
          <li>
            <strong>Overhead glazing</strong> — skylights, canopies (usually requires laminated,
            but tempered-only is permitted in limited cases per IBC §2405)
          </li>
        </ul>

        <p>
          China's equivalent is <strong>GB 50210-2018 §15.6</strong> and the national safety
          glazing standard <strong>GB 15763.2-2005</strong>. European code uses{' '}
          <strong>EN 12600</strong> (impact classification) in combination with national building
          regulations. Australia uses <strong>AS 1288</strong>. The specific thresholds vary, but
          the <em>categories</em> of required locations are nearly identical across all these
          codes — codes converge on the same hazard logic.
        </p>

        <TechNote type="warning" title="This isn't a recommendation — it's the law">
          <p>
            Specifying annealed glass in a code-defined safety location is not just risky — it
            can invalidate building permits, void insurance coverage, and expose the specifier
            to personal liability if someone is injured. If you aren't sure whether a location
            qualifies as "hazardous," default to tempered or laminated. The cost difference is
            trivial compared to the risk.
          </p>
        </TechNote>

        <h2 id="when-annealed">When Annealed Is the Right Choice</h2>

        <p>
          Annealed glass is still appropriate — and often <em>preferable</em> — in these cases:
        </p>

        <ul>
          <li>
            <strong>Interior framed artwork and picture frames</strong> — low impact risk, often
            requires anti-reflective coating that is easier to apply to annealed
          </li>
          <li>
            <strong>Upper-story windows above 18in from the floor</strong> — if the location
            doesn't qualify as hazardous per IBC §2406, annealed is permitted and significantly
            cheaper
          </li>
          <li>
            <strong>Buyer wants to cut/drill the glass themselves</strong> — tempered cannot be
            cut after tempering; if your fabricator needs to make modifications, order annealed
          </li>
          <li>
            <strong>Non-safety interior partitions</strong> — fixed interior walls in non-impact
            locations
          </li>
          <li>
            <strong>Greenhouse and horticultural glazing</strong> — thermal cycling exceeds what
            tempered glass can tolerate without spontaneous NiS breakage; annealed is often
            preferred
          </li>
          <li>
            <strong>Mirrors</strong> — residential and commercial mirror backing is typically
            annealed; silvering process is incompatible with tempered glass
          </li>
        </ul>

        <h2 id="spec-sheet">Spec Sheet Comparison</h2>

        <ComparisonTable
          caption="Head-to-head comparison, 6mm clear glass baseline"
          headers={['Property', 'Annealed', 'Tempered']}
          rows={[
            { property: 'Surface compressive stress', values: ['~0 MPa', '≥90 MPa (per GB 15763.2)'], highlight: 1 },
            { property: 'Breaking strength (bending)', values: ['~40 MPa', '~180 MPa'], highlight: 1 },
            { property: 'Thermal shock resistance', values: ['40°C differential', '~200°C differential'], highlight: 1 },
            { property: 'Breakage pattern', values: ['Large shards', 'Small granules'], highlight: 1 },
            { property: 'Can be cut after processing', values: ['Yes', 'No'], highlight: 0 },
            { property: 'Can be drilled after processing', values: ['Yes', 'No'], highlight: 0 },
            { property: 'Code-compliant for doors/showers', values: ['No', 'Yes'], highlight: 1 },
            { property: 'Spontaneous breakage risk', values: ['None', 'Rare (NiS inclusions)'], highlight: 0 },
            { property: 'Typical lead time (Wuhan)', values: ['3-7 days', '7-12 days'], highlight: 0 },
            { property: 'FOB price, 6mm clear', values: ['$5-8/m²', '$18-22/m²'], highlight: 0 },
          ]}
        />

        <h2 id="cost">Cost & Lead Time</h2>

        <p>
          Reference pricing for 6mm clear baseline, FOB Wuhan factory:
        </p>

        <ul>
          <li><strong>Annealed float glass, 6mm:</strong> ~$5-8 /m²</li>
          <li><strong>Tempered glass, 6mm:</strong> ~$18-22 /m²</li>
          <li><strong>Heat-strengthened glass, 6mm:</strong> ~$14-17 /m²</li>
          <li><strong>Tempered laminated, 6+1.52+6:</strong> ~$42-50 /m²</li>
        </ul>

        <CostDisclaimer />

        <p>
          Annealed glass ships faster because it skips the tempering furnace — typical lead time
          is 3-7 working days for standard cuts versus 7-12 days for tempered. For projects where
          most glass can be annealed and only safety-critical locations need tempered, splitting
          the order can save both money and time.
        </p>

        <h2 id="adjacent">Adjacent Options Worth Knowing</h2>

        <p>
          Between annealed and tempered sits a middle option, and above both sits a stronger
          one. Worth knowing when speccing:
        </p>

        <ul>
          <li>
            <strong>Heat-strengthened glass</strong> — ~2× the strength of annealed (vs 4-5× for
            tempered), but it breaks into <em>larger pieces</em> than tempered. It's not legally
            "safety glass" but it resists thermal stress and wind load better than annealed. Used
            where safety glass isn't required but thermal performance matters — spandrel glazing,
            heat-soaked facades.
          </li>
          <li>
            <strong>Chemically strengthened glass</strong> — ion exchange in a potassium salt
            bath creates up to 500 MPa surface compression. Common in smartphone screens
            (Gorilla Glass) and specialty applications. Rare in architectural glass because the
            process is expensive and the strengthening layer is thin.
          </li>
          <li>
            <strong>Laminated annealed glass</strong> — annealed glass + PVB interlayer. The
            interlayer provides the safety retention (broken shards stay stuck to the PVB), so
            laminated annealed can be used in some safety locations where plain annealed cannot.
            See our{' '}
            <a href="/blog/tempered-glass-vs-laminated-glass">tempered vs laminated comparison</a>{' '}
            for when to prefer each.
          </li>
          <li>
            <strong>Tempered laminated glass</strong> — the combination: tempered strength plus
            PVB fragment retention. The default spec for high-end structural glazing and
            overhead installations. See our{' '}
            <a href="/blog/insulated-glass-vs-laminated-glass">insulated vs laminated glass guide</a>{' '}
            for the "both" configuration.
          </li>
        </ul>

        <FAQ items={buyerFaqItems} />

        <RelatedProductsCards slugs={['tempered-glass', 'laminated-glass', 'low-e-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="tempered-glass-vs-annealed-glass" />
      </BlogArticleLayout>
    </>
  );
}
