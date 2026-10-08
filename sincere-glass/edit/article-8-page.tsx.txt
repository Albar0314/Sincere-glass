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
import CurtainWallSpecSelector from '@/components/blog/article-8/CurtainWallSpecSelector';
import BuildupCrossSection from '@/components/blog/article-8/BuildupCrossSection';
import RegionalCodeTable from '@/components/blog/article-8/RegionalCodeTable';

const SLUG = 'curtain-wall-glass-specification';
const article: BlogArticle = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata = generateArticleMetadata(article);

const toc: TOCItem[] = [
  { id: 'what-qualifies', text: 'What Qualifies as "Curtain Wall Glass"?', level: 2 },
  { id: 'four-objectives', text: 'The 4 Design Objectives', level: 2 },
  { id: 'selector', text: 'Interactive Spec Selector', level: 2 },
  { id: 'buildups', text: 'Typical Build-ups by Building Type', level: 2 },
  { id: 'cross-section', text: 'Build-up Cross-Section Explorer', level: 2 },
  { id: 'code', text: 'Code Requirements by Region', level: 2 },
  { id: 'limits', text: 'Thickness and Panel Size Limits', level: 2 },
  { id: 'procurement', text: 'Procurement Pitfalls to Avoid', level: 2 },
  { id: 'faq', text: 'Buyer FAQ', level: 2 },
];

const buyerFaqItems = [
  {
    q: "What's the maximum curtain wall panel size you can produce?",
    a: 'Our 3m × 15m tempering furnace and 3m × 15m lamination autoclave accept panels up to 3m × 15m — among the largest in Hubei province. Our IGU assembly line accommodates the same jumbo size for insulated units. The practical ceiling for most curtain wall projects is dictated by shipping and installation handling rather than production capability. For panels over 2.5m × 6m, we recommend early coordination on crating and transport logistics.',
  },
  {
    q: 'Do you offer heat-soak testing (HST) for high-rise curtain wall orders?',
    a: 'Yes. For high-rise applications (typically 10+ storeys), we strongly recommend specifying heat-soak tested tempered glass per EN 14179. HST reheats the tempered glass to ~290°C and holds for 2-4 hours, forcing any NiS inclusion defects to fail in the test oven rather than years later in the installed facade. Adds approximately $8-12/m² but mitigates the single largest liability risk in tempered curtain wall.',
  },
  {
    q: "What's the MOQ for curtain wall glass orders?",
    a: 'Our standard MOQ is 50 square meters per order. For curtain wall projects, we recommend ordering in whole facade sets rather than small batches — this ensures consistent production parameters (same furnace run, same coating lot, same spacer batch) across the project. Small facade samples can be produced at nominal setup fee for mockup and testing purposes.',
  },
  {
    q: 'Which certifications do you provide for export curtain wall orders?',
    a: 'All architectural glass we produce is 3C (CCC) certified per Chinese national standards (GB 15763.2 tempered, GB 15763.3 laminated, GB/T 11944 IGU). For export orders, we provide third-party test reports suitable for compliance review per ASTM C1048/C1172/E2190 (US), EN 12150/14449/1279 (EU), and AS/NZS 2208/4666 (Australia). For hurricane-rated applications requiring Miami-Dade NOA, specify this at the quote stage.',
  },
  {
    q: 'What is a realistic production lead time for a full curtain wall order?',
    a: 'For a typical mid-rise curtain wall order (laminated-IGU with Low-E coating): 15-20 working days from order confirmation, excluding ocean freight. For larger projects with multiple glass specifications, we recommend staged production and shipping aligned with installation schedule — we can typically produce 500-1000 m² per week per spec on a sustained basis.',
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
          'Curtain wall glass must satisfy 4 simultaneous objectives: safety, thermal performance, wind load capacity, and (increasingly) acoustic performance.',
          'The modern baseline spec is a Low-E tempered IGU (6+12A+6 Low-E) at ~$55-68/m². Premium facades use laminated IGUs at ~$95-120/m²; hurricane zones use SGP-laminated at ~$140-180/m².',
          'Codes in all four major regions (IBC, EN, GB, AS) converge on the same categories of requirements — safety glass in all positions, laminated for overhead, Low-E in cold/hot climates — but specific thresholds vary.',
          'For high-rise (10+ storeys), heat-soak tested tempered glass should be mandatory in your spec. The ~$8-12/m² added cost mitigates the single largest liability risk in tempered curtain wall (spontaneous NiS breakage).',
          "Common procurement pitfall: ordering from suppliers who subcontract production. For laminated-IGU especially, insist on single-source production — cross-factory handling introduces damage risk and quality disputes.",
        ]} />

        <p>
          Curtain wall is the single largest consumer of architectural glass. For most mid-rise
          to high-rise commercial projects, the curtain wall facade is where 60-80% of the
          project's glass budget lives, and where the glass specification has the longest
          downstream consequence — a wrong spec is baked into the building for decades.
        </p>

        <p>
          This guide covers what qualifies as curtain wall glass, the four design objectives
          every spec must satisfy, typical build-ups by building type, regional code requirements,
          and the procurement pitfalls that cause expensive problems later. It's written from
          the production side — we fabricate curtain wall glass at our Wuhan facility across
          all three major processes (<a href="/blog/how-is-tempered-glass-made">tempering</a>,{' '}
          <a href="/blog/how-is-laminated-glass-made">lamination</a>, and{' '}
          <a href="/blog/how-is-insulated-glass-made">IGU assembly</a>) — so the content focuses
          on what actually matters for the physical product rather than architectural theory.
        </p>

        <h2 id="what-qualifies">What Qualifies as "Curtain Wall Glass"?</h2>

        <p>
          Technically, "curtain wall" refers to a non-load-bearing exterior wall system where
          the facade hangs from the building structure like a curtain. The glass itself is held
          in an aluminum (or sometimes steel/wood) framing system, which transfers wind load to
          the structural slabs rather than the facade carrying its own weight.
        </p>

        <p>
          For glass specification purposes, "curtain wall glass" means <strong>any glass intended
          for use in a curtain wall framing system</strong>. This is distinct from:
        </p>

        <ul>
          <li>
            <strong>Window glass</strong> — framed opening in a solid wall; smaller panels,
            simpler engineering requirements.
          </li>
          <li>
            <strong>Structural glass</strong> — glass that itself carries load (point-fixed
            glass walls, glass fins, glass floors). Requires different engineering treatment.
          </li>
          <li>
            <strong>Spandrel glass</strong> — the opaque portion of a curtain wall that hides
            floor slabs between windows. Usually enameled or back-painted. See our{' '}
            <a href="/products/enameled-glass">enameled glass product page</a>.
          </li>
        </ul>

        <h2 id="four-objectives">The 4 Design Objectives</h2>

        <p>
          Curtain wall glass must simultaneously satisfy four engineering requirements. Every
          build-up specification is a decision about how to balance these:
        </p>

        <ul>
          <li>
            <strong>Safety</strong> — Resistance to human impact (interior and exterior) plus
            fragment retention if breakage occurs. For curtain wall this almost always means
            tempered glass minimum; laminated for overhead and fall-arrest-critical positions.
            Code-mandatory in all major jurisdictions.
          </li>
          <li>
            <strong>Thermal performance (U-value)</strong> — Resistance to heat transfer
            through the glass. Driven by HVAC cost and energy code requirements. Baseline:
            IGU with Low-E coating. Premium: laminated-IGU with argon fill, warm-edge spacer.
          </li>
          <li>
            <strong>Wind load capacity</strong> — Resistance to lateral force from wind
            pressure. Driven by building height, exposure category, and local wind code.
            Determines glass thickness and whether laminated construction is required for
            fail-safe behavior.
          </li>
          <li>
            <strong>Acoustic (STC rating)</strong> — Resistance to airborne sound transmission.
            Increasingly important for urban residential, hotels, hospitals. PVB interlayer
            is the single largest acoustic improvement available; laminated IGU with
            acoustic PVB can reach STC 38+.
          </li>
        </ul>

        <p>
          A fifth objective — <strong>solar heat gain (SHGC)</strong> — matters in hot climates
          and is handled through tinted glass or spectrally selective Low-E coating. Not
          separately engineered for most buildings but worth checking in regions where cooling
          dominates heating.
        </p>

        <h2 id="selector">Interactive Spec Selector</h2>

        <p>
          Walk through 2 questions below to get a recommended build-up for your project
          scenario. The selector covers the four most common curtain wall orders — low-rise
          to high-rise, mild to harsh climates, and hurricane zones.
        </p>

        <CurtainWallSpecSelector />

        <LeadMagnetCTA variant="inline" articleSlug="curtain-wall-glass-specification" />

        <h2 id="buildups">Typical Build-ups by Building Type</h2>

        <p>
          Across hundreds of curtain wall projects, buyers converge on roughly four build-up
          families. Each has a dominant application pattern:
        </p>

        <ul>
          <li>
            <strong>Low-rise commercial (1-3 storeys, mild climate):</strong>{' '}
            Tempered IGU 6+12A+6 clear or with Low-E. Minimum code compliance, lowest cost
            per m², fastest production. Typical: offices, retail, schools in temperate zones.
          </li>
          <li>
            <strong>Mid-rise commercial (4-10 storeys, standard):</strong>{' '}
            Low-E tempered IGU with argon fill (6+12Ar+6 Low-E) + warm-edge spacer. The
            modern commercial baseline. Covers the majority of ordinary office tower and
            mixed-use projects.
          </li>
          <li>
            <strong>Premium mid-rise (acoustic or luxury):</strong>{' '}
            Laminated IGU with Low-E (6+1.52+6 lami outer / 12Ar / 6 Low-E tempered inner).
            Luxury residential, hotels, high-end commercial, urban facades with street noise
            concerns.
          </li>
          <li>
            <strong>High-rise or hurricane-prone (10+ storeys, coastal):</strong>{' '}
            Heat-soaked SGP-laminated IGU (6+1.52 SGP+6 HS / 12Ar / 6 Low-E HS). Maximum
            safety spec. Industry standard for 20+ storey facades and Miami-Dade NOA-rated
            hurricane applications.
          </li>
        </ul>

        <h2 id="cross-section">Build-up Cross-Section Explorer</h2>

        <p>
          Click through the four build-up types below and hover any layer to see its specific
          function and spec:
        </p>

        <BuildupCrossSection />

        <p>
          A few observations across these build-ups:
        </p>

        <ul>
          <li>
            <strong>Low-E coating position matters.</strong> On surface #2 (inner face of
            outer lite) for warm climates to reflect solar heat outward. On surface #3 (inner
            face of inner lite) for cold climates to retain heat inside. Most modern IGUs
            specify surface #2.
          </li>
          <li>
            <strong>Argon vs air changes U-value by ~20%.</strong> At $2-3/m² added cost, this
            is one of the best cost/performance decisions in all of architectural glazing.
            Default to argon unless explicitly cost-constrained.
          </li>
          <li>
            <strong>PVB vs SGP interlayer is a project-specific decision.</strong> PVB works
            for standard safety requirements. SGP is required for hurricane zones, structural
            glazing, and any application where the panel must continue to carry load after
            glass failure.
          </li>
        </ul>

        <h2 id="code">Code Requirements by Region</h2>

        <p>
          Four major code regions govern most international curtain wall projects. The specific
          thresholds vary, but the categories of requirements converge. Click any topic below
          to compare how the four regions handle it:
        </p>

        <RegionalCodeTable />

        <TechNote type="warning" title="Code review is not optional">
          <p>
            This table is a navigation aid, not a substitute for code review. Local amendments,
            city-level overlays, and project-specific authority-having-jurisdiction (AHJ)
            interpretations can modify any of these requirements. Always verify current local
            regulations with your project's code consultant before finalizing glass spec.
          </p>
        </TechNote>

        <h2 id="limits">Thickness and Panel Size Limits</h2>

        <p>
          Glass thickness for curtain wall is not a free parameter — it is dictated by wind
          load engineering per ASTM E1300 (US), EN 16612 (EU), or GB 50009 (China). Thicker
          glass is heavier and more expensive; thinner glass fails under wind load. Typical
          thicknesses by application:
        </p>

        <ul>
          <li>
            <strong>Low-rise, protected exposure:</strong> 5-6mm lites standard; total IGU
            thickness ~22-24mm.
          </li>
          <li>
            <strong>Mid-rise, standard exposure:</strong> 6-8mm lites; total ~24-30mm.
          </li>
          <li>
            <strong>High-rise or exposed:</strong> 8-10mm lites or laminated construction;
            total 30-36mm.
          </li>
          <li>
            <strong>Hurricane-rated:</strong> 6+1.52 SGP+6 lami minimum per Miami-Dade;
            typically 6+1.52+6 or thicker.
          </li>
        </ul>

        <p>
          Panel size limits come from four constraints: production (furnace / autoclave /
          IGU line capacity), handling (crane and lifting), shipping (container dimensions),
          and installation (crane access on site). Our production ceiling is 3m × 15m across
          all three processes; most projects are limited by shipping (standard 40ft container
          internal 2.35m × 12m usable) and installation handling rather than production.
        </p>

        <h2 id="procurement">Procurement Pitfalls to Avoid</h2>

        <p>
          Based on common issues we see in RFQs:
        </p>

        <ul>
          <li>
            <strong>Spec'ing without code reference.</strong> "Tempered IGU with Low-E" is
            not a spec — it's a direction. Include GB/EN/ASTM/AS test standards, U-value and
            SHGC targets, acoustic rating if applicable, and build-up thickness/configuration.
          </li>
          <li>
            <strong>Mixing single-source and multi-source suppliers for one project.</strong>{' '}
            Combined products (laminated IGU) should come from one factory running all three
            production lines. Cross-factory handling creates damage risk, timing issues, and
            quality disputes. See our{' '}
            <a href="/blog/architectural-glass-manufacturing-guide">manufacturing process
            guide</a> for the supplier audit checklist.
          </li>
          <li>
            <strong>Skipping heat-soak testing on high-rise orders.</strong> Spontaneous NiS
            breakage is rare (~1 in 10,000 to 1 in 100,000 panels) but catastrophic when it
            happens in a high-rise facade. HST per EN 14179 is cheap insurance.
          </li>
          <li>
            <strong>Underestimating lead time for Low-E coating specifications.</strong>{' '}
            Standard soft-coat Low-E is usually in stock, but hard-coat or specialty coatings
            can add 5-7 days to the production cycle. Factor this into project schedule.
          </li>
          <li>
            <strong>Not ordering mockup / sample panels.</strong> For projects over 1000 m²,
            we strongly recommend ordering a small sample batch (typically 2-4 full-size
            panels) for installation mockup and visual approval before full production. Catches
            color consistency issues, coating uniformity, and edge quality before they become
            a project-wide problem.
          </li>
        </ul>

        <p>
          For project-specific quotes or spec reviews, use the Request Quote button in the
          header. We can also review draft specifications and flag constructibility issues
          before you issue the final RFQ to the market.
        </p>

        {/* Pillar back-links */}
        <TechNote type="note" title="Related reading">
          <p>
            For the broader product selection framework, see our{' '}
            <a href="/blog/architectural-glass-types-guide">complete architectural glass types
            guide</a>. For how curtain wall glass is actually manufactured, see our{' '}
            <a href="/blog/architectural-glass-manufacturing-guide">architectural glass
            manufacturing guide</a>.
          </p>
        </TechNote>

        <FAQ items={buyerFaqItems} />

        <RelatedProductsCards slugs={['insulated-glass', 'laminated-glass', 'tempered-glass', 'low-e-glass', 'enameled-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="curtain-wall-glass-specification" />
      </BlogArticleLayout>
    </>
  );
}
