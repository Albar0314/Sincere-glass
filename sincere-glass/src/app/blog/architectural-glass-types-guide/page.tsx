import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from '@/components/blog/BlogArticleLayout';
import TLDRBox from '@/components/blog/TLDRBox';
import LeadMagnetCTA from '@/components/blog/LeadMagnetCTA';
import RelatedProductsCards from '@/components/blog/RelatedProductsCards';
import { FAQ, TechNote } from '@/components/blog/blocks';
import GlassSelectorFlowchart from '@/components/blog/pillar/GlassSelectorFlowchart';
import GlassFamilyMap from '@/components/blog/pillar/GlassFamilyMap';

const SLUG = 'architectural-glass-types-guide';
const article: BlogArticle = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata = generateArticleMetadata(article);

const toc: TOCItem[] = [
  { id: 'why-pillar', text: 'Why This Guide Exists', level: 2 },
  { id: 'family-map', text: 'The Five Families of Architectural Glass', level: 2 },
  { id: 'selector', text: 'Interactive Selector: Find Your Glass in 3 Clicks', level: 2 },
  { id: 'annealed-section', text: '1. Annealed Glass — The Starting Point', level: 2 },
  { id: 'tempered-section', text: '2. Tempered Glass — The Default Safety Upgrade', level: 2 },
  { id: 'laminated-section', text: '3. Laminated Glass — Fragment Retention + Sound', level: 2 },
  { id: 'insulated-section', text: '4. Insulated Glass (IGU) — Thermal Performance', level: 2 },
  { id: 'coated-section', text: '5. Low-E & Enameled — Functional Coatings', level: 2 },
  { id: 'application-matrix', text: 'By Application: What to Spec Where', level: 2 },
  { id: 'procurement', text: 'Procurement Checklist', level: 2 },
  { id: 'faq', text: 'FAQ', level: 2 },
];

const faqItems = [
  {
    q: 'What is the single most important factor when choosing architectural glass?',
    a: 'It is almost always "where will this glass fail if it breaks, and who will be near it?" Building codes answer this question for you in most hazardous locations (doors, showers, overhead, railings), but for the remaining 50% of a project the question is cost vs performance across thermal, acoustic, and solar dimensions. Our 3-click selector above walks through this systematically.',
  },
  {
    q: 'Can one glass product do everything?',
    a: 'No — but a combined laminated IGU comes closest. It bundles the fragment-retention safety of laminated glass, the thermal insulation of an IGU, and the solar control of a Low-E coating into a single build-up. This is why it is the default spec for premium facades. The trade-off is cost (roughly 2× a plain tempered IGU) and lead time (15-20 working days vs 10-15 for single-process orders).',
  },
  {
    q: 'How do Chinese GB standards compare to US/EU standards for architectural glass?',
    a: 'For tempered glass: GB 15763.2-2005 and ASTM C1048 define surface stress thresholds within 10% of each other. For laminated: GB 15763.3-2009 aligns closely with EN 14449 and ANSI Z97.1. For IGU: GB/T 11944-2012 covers similar durability tests to EN 1279. Export-grade Chinese factories (ours included) manufacture to the stricter of the applicable standards. Buyers should request third-party test reports for the specific standard required in their market.',
  },
  {
    q: "What is the MOQ for custom architectural glass orders from Sincere Glass?",
    a: 'Standard MOQ is 50 square meters per product configuration. For jumbo panels (up to 3m × 15m), we can handle smaller volumes on the same production line since the setup effort is similar. For trial orders from new buyers we accept smaller MOQs with a nominal setup fee. Contact us with your drawings for a specific quote.',
  },
];

export default function Page() {
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
        <TLDRBox takeaways={[
          'Architectural glass divides into 5 families: base material (annealed), strengthened (tempered, heat-strengthened), composite safety (laminated), thermal (insulated/IGU), and functional coatings (Low-E, enameled).',
          'The right glass is a function of location, not preference — building codes dictate safety glass in doors, showers, overhead, and railings; thermal performance matters in most climates.',
          'For most buyer scenarios the answer is a stack: a laminated outer lite + Low-E coated IGU + warm-edge spacer. This is the premium facade standard.',
          'Each category below links to a dedicated deep-dive article and the matching product page.',
          'Chinese GB standards align closely with US ASTM and EU EN standards — export-grade factories manufacture to the stricter of the applicable thresholds.',
        ]} />

        <h2 id="why-pillar">Why This Guide Exists</h2>

        <p>
          "Which glass should I spec?" is the question we get more than any other. The honest
          answer is: there is no universal best glass — there is only the right <em>stack</em> of
          glass products for a specific location, climate, and budget. This guide gives you the
          decision framework and routes you to the detailed comparisons for whichever branch of
          the decision tree is relevant to your project.
        </p>

        <p>
          If you have landed here searching for "architectural glass types," what you actually
          need is probably one of these three answers:
        </p>

        <ul>
          <li>
            <strong>A quick decision</strong> — use the interactive selector below (3 clicks)
          </li>
          <li>
            <strong>A category overview</strong> — read the 5 family sections below, each ~200
            words with links to deeper material
          </li>
          <li>
            <strong>A deep technical comparison</strong> — follow the "Deep dive" links to our
            full comparison articles
          </li>
        </ul>

        <h2 id="family-map">The Five Families of Architectural Glass</h2>

        <p>
          Every architectural glass product is built from a base of annealed float glass with one
          or more secondary processes applied. The processes stack: a product can be tempered,
          then laminated, then assembled into an IGU with a Low-E coating. The map below shows
          the five categories and which products belong to each.
        </p>

        <GlassFamilyMap />

        <h2 id="selector">Interactive Selector: Find Your Glass in 3 Clicks</h2>

        <p>
          Answer three questions below. We will recommend a specific product configuration based
          on your scenario — and route you to the detailed article or product page that goes
          deeper.
        </p>

        <GlassSelectorFlowchart />

        <h2 id="annealed-section">1. Annealed Glass — The Starting Point</h2>

        <p>
          Annealed glass is plain float glass straight off the production line — slowly cooled
          to equalize internal stresses, resulting in a flat, optically clear sheet with almost
          no residual compressive stress. It is the raw material from which every other glass
          product is made. It is also the cheapest and fastest-lead-time option.
        </p>

        <p>
          The catch: annealed glass is <strong>not legal</strong> in most code-defined safety
          locations. It breaks into large, dagger-shaped shards. Modern building codes (IBC §2406,
          GB 50210, EN 12600) forbid annealed glass in doors, shower enclosures, railings,
          low-sill windows, and overhead glazing. It is still the correct choice for interior
          framed artwork, mirrors, non-impact interior partitions, and any location that
          doesn't qualify as code-defined "hazardous."
        </p>

        <TechNote type="tip" title="Deep dive available">
          <p>
            Read our full comparison:{' '}
            <a href="/blog/tempered-glass-vs-annealed-glass">
              Tempered Glass vs Annealed Glass: Why 'Regular' Glass Isn't Safe Enough for Most
              Modern Buildings
            </a>{' '}
            — covers code requirements, breakage patterns, and the specific scenarios where
            annealed remains the right pick.
          </p>
        </TechNote>

        <h2 id="tempered-section">2. Tempered Glass — The Default Safety Upgrade</h2>

        <p>
          Tempered glass takes annealed glass through a secondary heat-treatment: heated to
          ~620°C, then rapidly quenched with high-pressure air jets. The surface cools faster
          than the core, creating 90+ MPa of surface compressive stress. The result: 4-5× the
          strength of annealed, with a safe granular breakage pattern that satisfies code "safety
          glass" requirements.
        </p>

        <p>
          Tempered is the default upgrade when a location requires safety glass but the specific
          performance needs are modest. Shower enclosures, interior partition glass doors,
          storefronts, low-rise curtain walls, furniture glass — all typically specced as
          monolithic tempered. Our 3m × 15m tempering furnace in Wuhan is among the largest in
          Hubei province, so we can handle both standard-size orders and jumbo architectural
          panels.
        </p>

        <TechNote type="tip" title="Deep dives available">
          <p>
            <a href="/products/tempered-glass">Tempered Glass product page</a> — full specs,
            thickness range, standards, applications. <br />
            <a href="/blog/tempered-glass-vs-annealed-glass">Tempered vs Annealed</a> — when to
            step up from annealed. <br />
            <a href="/blog/tempered-glass-vs-laminated-glass">Tempered vs Laminated</a> — when
            tempered is NOT enough and you need laminated instead.
          </p>
        </TechNote>

        <LeadMagnetCTA variant="inline" articleSlug="architectural-glass-types-guide" />

        <h2 id="laminated-section">3. Laminated Glass — Fragment Retention + Sound</h2>

        <p>
          Laminated glass is two or more glass lites permanently bonded by a polymer interlayer
          — PVB (polyvinyl butyral) as standard, SGP (SentryGlas) for structural and
          hurricane-rated applications. When the glass breaks, the shards remain adhered to the
          interlayer instead of becoming airborne.
        </p>

        <p>
          This changes what laminated solves for. First, it is <em>required</em> by code for
          overhead glazing and most structural balustrades — any location where falling glass
          would be dangerous. Second, the PVB interlayer is a mechanical damper that absorbs
          airborne sound, raising STC by 3-5 points vs plain glass of equal thickness. Third,
          PVB inherently blocks 99% of UV radiation. For urban residential, acoustic-critical
          commercial, and any high-exposure location, laminated is the default choice.
        </p>

        <TechNote type="tip" title="Deep dives available">
          <p>
            <a href="/products/laminated-glass">Laminated Glass product page</a> — PVB vs SGP
            selection, interlayer thickness options, standards. <br />
            <a href="/blog/tempered-glass-vs-laminated-glass">Tempered vs Laminated</a> — side-by-side
            comparison across 7 dimensions. <br />
            <a href="/blog/insulated-glass-vs-laminated-glass">Insulated vs Laminated</a> — when to
            pick laminated over IGU for the same project.
          </p>
        </TechNote>

        <h2 id="insulated-section">4. Insulated Glass (IGU) — Thermal Performance</h2>

        <p>
          An insulated glass unit is two or more glass lites with a sealed cavity between them,
          filled with argon (standard) or krypton (premium) gas, and perimeter-sealed with a
          warm-edge spacer to minimize thermal bridging. The IGU does one thing extremely well:
          it reduces heat transfer across the glazing. A standard 6+12A+6 IGU achieves U-value
          ~2.6 W/m²·K; with Low-E coating and argon fill, U-value drops to ~1.4-1.8.
        </p>

        <p>
          IGU is the thermal performance workhorse of modern facades. It is also the baseline
          energy-code requirement in cold climates — single glazing is not permitted in most
          jurisdictions for exterior residential or commercial glazing. In our Wuhan facility
          we run two IGU production lines, including an ultra-large automatic argon-fill line
          that handles jumbo panels for high-rise facades.
        </p>

        <TechNote type="tip" title="Deep dives available">
          <p>
            <a href="/products/insulated-glass">Insulated Glass product page</a> — build-up
            configurations, U-value tables, SHGC values. <br />
            <a href="/blog/insulated-glass-vs-laminated-glass">IGU vs Laminated</a> — buyer-scenario
            decision guide for when to pick thermal vs safety glass (and when to combine them).
          </p>
        </TechNote>

        <h2 id="coated-section">5. Low-E &amp; Enameled — Functional Coatings</h2>

        <p>
          The fifth family is not standalone glass but <em>coatings applied to glass</em>, which
          are then assembled into IGU or laminated units. Two main types:
        </p>

        <ul>
          <li>
            <strong>Low-E (low-emissivity) coating</strong> — a microscopically thin metal-oxide
            layer (sputtered soft-coat or pyrolytic hard-coat) that reflects long-wave infrared
            heat radiation while transmitting visible light. Applied to the inner surface of a
            glass lite within an IGU cavity. Does not change the appearance of the glass. Can
            cut heating/cooling energy use by 30-50%.
          </li>
          <li>
            <strong>Enameled (ceramic frit) coating</strong> — ceramic ink printed onto the
            glass surface and fused in the tempering furnace. Used for solid color panels
            (spandrel glass), decorative patterns, solar shading, and privacy. Fully opaque or
            partially translucent based on dot pattern.
          </li>
        </ul>

        <TechNote type="tip" title="Product pages">
          <p>
            <a href="/products/low-e-glass">Low-E Glass product page</a> —
            soft-coat vs hard-coat, emissivity ranges, SHGC values. <br />
            <a href="/products/enameled-glass">Enameled Glass product page</a> —
            color options, pattern catalog, standards.
          </p>
        </TechNote>

        <h2 id="application-matrix">By Application: What to Spec Where</h2>

        <p>
          Working backwards from building location — the most common framework buyers actually
          use:
        </p>

        <ul>
          <li>
            <strong>Entrance doors and sidelights</strong>: Tempered minimum (code). Laminated
            if sound or forced-entry resistance matters.
          </li>
          <li>
            <strong>Curtain wall facades</strong>: Low-E coated IGU minimum. Add laminated
            outer lite in acoustic-critical or seismic/wind zones.
          </li>
          <li>
            <strong>Shower enclosures</strong>: Tempered (code requires safety glass; monolithic
            tempered is standard).
          </li>
          <li>
            <strong>Skylights and overhead glazing</strong>: Laminated required by code. Add
            IGU for thermal performance.
          </li>
          <li>
            <strong>Structural balustrades</strong>: Laminated with SGP interlayer (code
            requires post-breakage structural retention).
          </li>
          <li>
            <strong>Hurricane / impact zones</strong>: Laminated with SGP, tested per ASTM E1996
            (US) or equivalent.
          </li>
          <li>
            <strong>Spandrel panels</strong>: Enameled (ceramic frit) tempered. Backs opaque,
            front matches adjacent vision glass tint.
          </li>
          <li>
            <strong>Interior partitions and furniture</strong>: Tempered monolithic. Annealed if
            no impact risk and no code requirement.
          </li>
        </ul>

        <h2 id="procurement">Procurement Checklist</h2>

        <p>
          When you issue an RFQ to any glass supplier (us included), the following details
          minimize back-and-forth and get you accurate pricing:
        </p>

        <ol>
          <li><strong>Panel dimensions</strong> — width × height per panel, quantity per size</li>
          <li><strong>Glass build-up</strong> — thickness of each lite, interlayer type &amp; thickness, cavity width &amp; gas, coating type &amp; surface position</li>
          <li><strong>Edge treatment</strong> — polished flat, polished arrissed, pencil, bevel</li>
          <li><strong>Holes and cutouts</strong> — all drill-through dimensions and cutout coordinates (must be done pre-tempering)</li>
          <li><strong>Standards and certifications required</strong> — 3C, CE, SGCC, specific country compliance</li>
          <li><strong>Delivery terms</strong> — FOB which port, DDP which address</li>
          <li><strong>Target lead time</strong> — critical for jumbo orders where our furnace scheduling matters</li>
        </ol>

        <FAQ items={faqItems} />

        <RelatedProductsCards slugs={['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass']} heading="Explore the full product range" />

        <LeadMagnetCTA variant="footer" articleSlug="architectural-glass-types-guide" />
      </BlogArticleLayout>
    </>
  );
}
