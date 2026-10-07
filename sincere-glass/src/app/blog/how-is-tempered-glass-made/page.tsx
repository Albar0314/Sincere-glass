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
import ProductionLineTimeline from '@/components/blog/article-4/ProductionLineTimeline';
import TemperatureCurveChart from '@/components/blog/article-4/TemperatureCurveChart';
import StressVisualization from '@/components/blog/article-4/StressVisualization';

const SLUG = 'how-is-tempered-glass-made';
const article: BlogArticle = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata = generateArticleMetadata(article);

const toc: TOCItem[] = [
  { id: 'raw-material', text: 'It Starts With Ordinary Glass', level: 2 },
  { id: 'production-line', text: 'The Full 7-Phase Production Line', level: 2 },
  { id: 'temperature-curve', text: 'The Temperature Journey', level: 2 },
  { id: 'why-stress-matters', text: 'Why the Stress Pattern Matters', level: 2 },
  { id: 'cannot-be-reversed', text: 'Why Tempered Glass Can\'t Be Cut or Drilled', level: 2 },
  { id: 'spontaneous-breakage', text: 'The One Risk: Spontaneous Breakage from NiS', level: 2 },
  { id: 'what-good-looks-like', text: 'What Good Tempering Looks Like', level: 2 },
  { id: 'faq', text: 'Buyer FAQ', level: 2 },
];

const buyerFaqItems = [
  {
    q: 'How long does tempered glass take to produce?',
    a: 'A single sheet of 6mm glass takes about 7-10 minutes from entering the furnace to exiting the quench — but total production time including cutting, edge finishing, washing, and QC is typically 1-2 days from order confirmation for a standard batch. At our Wuhan facility, standard tempered glass orders ship in 7-12 working days.',
  },
  {
    q: 'What\'s the maximum size tempered glass we can produce?',
    a: 'Our larger tempering furnace accepts panels up to 3m × 15m — one of the largest in Hubei province. The practical maximum for most architectural projects is dictated by handling and shipping, not production capability. For panels over 2.5m × 6m, we recommend discussing crating and transport logistics early in the quote process.',
  },
  {
    q: 'Can tempered glass be re-tempered or heat-strengthened after production?',
    a: 'No. Once a glass sheet has been tempered, it cannot be re-processed thermally without destroying it. If a project needs modification, the glass must be re-cut from new annealed stock and tempered again. This is why spec drawings must be finalized before placing a tempered glass order.',
  },
  {
    q: 'How can I verify a batch is actually tempered and not just annealed?',
    a: 'Three ways: (1) Polarized light test — tempered glass shows characteristic stress patterns ("quench marks" or "polka dots") when viewed through polarizing film. (2) Breakage test — if a corner is broken off a sample, tempered glass fragments into small granules; annealed produces large shards. (3) Edge inspection — tempered glass has a slight edge profile change from the quench. Legitimate suppliers provide test reports with every batch; we provide these with all 3C-certified orders.',
  },
  {
    q: 'What\'s the MOQ for custom tempered glass orders from China?',
    a: 'Our standard MOQ is 50 square meters per order, with no restriction on panel sizes up to our furnace maximum. Smaller trial orders are accepted at a nominal setup fee for new buyers. For complex custom shapes or coatings, we recommend consulting on feasibility before finalizing the quote.',
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
          'Tempered glass is made by heating ordinary annealed glass to ~620°C and then rapidly cooling (quenching) the surface with high-pressure air.',
          'The quench freezes the surface while the core is still hot — when the core finishes contracting, it pulls against the frozen surface, locking in compressive stress.',
          'Total time from raw sheet to tempered panel: ~7 minutes in the furnace + 60-90 seconds of quenching, within a 1-2 day production cycle.',
          'Because the stress pattern is baked in, tempered glass CANNOT be cut, drilled, or modified after production — any attempt causes complete shattering.',
          'Rare risk: NiS (nickel sulfide) inclusions in the raw glass can cause spontaneous breakage years later. Reputable factories (ours included) inspect for this before tempering.',
        ]} />

        <p>
          "How is tempered glass made?" is a question with a one-sentence answer and a
          twenty-page answer. The one-sentence version: <strong>heat glass to 620°C, then
          cool its surface fast while the core is still hot</strong>. The twenty-page
          version involves CNC cutting tolerances, edge micro-crack theory, roller-wave
          distortion, air-jet nozzle geometry, and nickel sulfide inclusion risk.
        </p>

        <p>
          This article walks through what actually happens, step by step, in a working
          tempering line — specifically ours in Wuhan, Hubei province. Not a textbook
          explanation; a factory-floor walk-through. If you've read our{' '}
          <a href="/blog/tempered-glass-vs-annealed-glass">tempered vs annealed glass
          comparison</a>, you know what the end result is; this is how it gets there.
          For a broader selection framework, see our{' '}
          <a href="/blog/architectural-glass-types-guide">complete architectural glass
          types guide</a>.
        </p>

        <h2 id="raw-material">It Starts With Ordinary Glass</h2>

        <p>
          Every piece of tempered glass starts life as a plain{' '}
          <strong>annealed float glass sheet</strong> — the standard output of a float
          glass line. Molten glass is poured onto a bed of molten tin, drawn across to
          thickness, cooled slowly through an annealing lehr, and shipped out as flat
          sheets to downstream processors like us.
        </p>

        <p>
          We don't make float glass ourselves. We buy it from certified upstream float
          mills in large lots, inspect each lot for optical defects and NiS inclusion
          indicators, and feed it into our production line. Everything described below
          is what we do to <em>convert</em> that raw annealed glass into a tempered,
          safety-rated final product.
        </p>

        <TechNote type="note" title="Why not just make float glass too?">
          <p>
            Float glass production requires a continuous 24/7 furnace running at ~1500°C
            with a tin bath, consuming the energy of a small town. The economics only
            work at massive scale (minimum ~500 tons/day output). Mid-size downstream
            factories like ours — and most tempering operations worldwide — source raw
            float from a handful of specialized mills, then focus on the value-added
            processing: cutting, tempering, laminating, coating.
          </p>
        </TechNote>

        <h2 id="production-line">The Full 7-Phase Production Line</h2>

        <p>
          Click through the phases below. Each click shows what happens at that stage,
          how long it takes, what temperature the glass is at, and where our specific
          facility capabilities fit in.
        </p>

        <ProductionLineTimeline />

        <p>
          Most people think of "tempering" as just the furnace step (Phase 04) and the
          quench (Phase 05). In reality, the preceding four phases determine whether
          those two will succeed. A badly ground edge, a smudge from Phase 03 washing,
          or a non-uniform load spacing in Phase 04 — any of these can cause a sheet
          to crack inside the furnace, or produce distorted output that fails QC. The
          furnace is the dramatic step, but the preparation is where quality is won
          or lost.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug="how-is-tempered-glass-made" />

        <h2 id="temperature-curve">The Temperature Journey</h2>

        <p>
          The entire thermal cycle, visualized. Hover any point on the curve to see
          what's happening to the glass at that temperature:
        </p>

        <TemperatureCurveChart />

        <p>
          Three details that matter for buyers understanding this chart:
        </p>

        <ul>
          <li>
            <strong>The target is 620°C, not higher.</strong> Pushing closer to the
            softening point (~650-700°C) increases distortion risk without improving
            temper quality. Our furnace is calibrated for ~620°C sustained temperature.
          </li>
          <li>
            <strong>The quench is a seconds-level event.</strong> From exit (580°C) to
            surface freeze (300°C) in roughly 15 seconds. This is the moment that
            creates the "temper." Everything else is preparation and recovery.
          </li>
          <li>
            <strong>The cooling-to-ambient phase matters too.</strong> Rapid handling
            while the core is still hot can cause secondary stresses or warping. Finished
            panels sit on the output conveyor until they're truly below 100°C.
          </li>
        </ul>

        <h2 id="why-stress-matters">Why the Stress Pattern Matters</h2>

        <p>
          Here's what the quench actually does, at the material level. Toggle between
          plain annealed glass and tempered glass to see the difference in internal
          stress distribution:
        </p>

        <StressVisualization />

        <p>
          This stress profile is why tempered glass is 4-5× stronger than annealed —
          any external bending force must first overcome the ~180 MPa of locked-in
          surface compression before the glass can enter net tension and fail. It's
          also why tempered glass shatters into granules: when the surface finally
          does fail, it releases the stored core tension catastrophically across the
          whole pane in milliseconds.
        </p>

        <p>
          Per <strong>GB 15763.2-2005 §4.2</strong>, Chinese safety glass standard
          requires minimum surface compressive stress of 90 MPa for architectural
          tempered glass. International standards similarly: EN 12150-1 requires 69 MPa
          minimum; ANSI Z97.1 and ASTM C1048 specify through fragmentation testing
          rather than direct stress measurement, but calibrate to similar levels. Our
          production targets 100-180 MPa to comfortably exceed all four standards.
        </p>

        <h2 id="cannot-be-reversed">Why Tempered Glass Can't Be Cut or Drilled</h2>

        <p>
          This is the single most expensive mistake buyers make: specifying tempered
          glass and then expecting to drill holes or cut it to fit at the job site.
          <strong> Any attempt to cut, drill, grind, or notch tempered glass causes
          it to explode into granules immediately.</strong>
        </p>

        <p>
          The reason comes directly from the stress profile shown above. The outer
          "skin" of compressed glass is holding the inner "core" of tensioned glass in
          equilibrium. The moment you break that skin — even with a glass cutter wheel
          scoring 0.1mm deep — you release the core tension, and the entire pane
          disintegrates in milliseconds. There is no partial break; there is no
          careful cut.
        </p>

        <TechNote type="warning" title="Spec your glass completely before ordering">
          <p>
            Every hole, every notch, every bevel, every polished edge must be specified
            on the drawings BEFORE the glass enters our furnace. We'll build it exactly
            to drawing — but field modifications are impossible. If dimensions change
            after production, the glass must be scrapped and re-ordered from new raw
            stock. Design confirmation is the slowest step for most buyers; we strongly
            recommend thorough review before order placement.
          </p>
        </TechNote>

        <p>
          This also explains the price differential (see our{' '}
          <a href="/blog/tempered-glass-vs-annealed-glass">tempered vs annealed cost
          comparison</a>). Annealed glass is cheap partly because the buyer absorbs the
          fabrication flexibility. Tempered glass costs ~3× annealed partly because
          the factory absorbs the risk of specification errors — once tempered, it
          cannot be reworked.
        </p>

        <h2 id="spontaneous-breakage">The One Risk: Spontaneous Breakage from NiS</h2>

        <p>
          Tempered glass has one rare but notorious failure mode: <strong>spontaneous
          breakage from nickel sulfide (NiS) inclusions</strong>. Microscopic NiS
          particles that happened to be in the raw glass can undergo a slow phase
          transition over months or years, expanding by about 4% in volume. This
          expansion inside the tensioned core of a tempered pane can trigger
          catastrophic failure — the pane explodes with no apparent cause, sometimes
          years after installation.
        </p>

        <p>
          The failure rate is low — industry estimates range from 1 in 10,000 to 1 in
          100,000 tempered panels — but when it happens in a high-rise curtain wall,
          it's a liability event. Mitigations exist:
        </p>

        <ul>
          <li>
            <strong>Source control:</strong> We only buy from upstream float mills with
            documented NiS screening. Suspect lots are rejected before entering our line.
          </li>
          <li>
            <strong>Heat-soak testing (HST):</strong> After tempering, suspect panels can
            be reheated to ~290°C and held for 2-4 hours. Panels with NiS inclusions
            tend to fail during this test rather than in the field. HST adds ~$5-10/m²
            to the price but is standard for high-rise curtain wall work.
          </li>
          <li>
            <strong>Spec laminated tempered instead:</strong> If a panel does spontaneously
            break, the PVB interlayer holds the fragments in place — no falling glass.
            See our <a href="/blog/tempered-glass-vs-laminated-glass">tempered vs
            laminated comparison</a> for when to upgrade.
          </li>
        </ul>

        <p>
          For most architectural applications below 10 storeys and non-overhead, standard
          3C-certified tempered glass is appropriate without HST. For high-rise facades,
          overhead glazing, or any application where a falling pane could injure someone,
          we recommend either heat-soaked tempered or laminated tempered configurations.
        </p>

        <h2 id="what-good-looks-like">What Good Tempering Looks Like</h2>

        <p>
          For buyers evaluating tempered glass quality from any supplier — including us —
          here are the specific things to check:
        </p>

        <ul>
          <li>
            <strong>Fragmentation test report</strong> per batch — showing ≥40 fragments
            per 50mm × 50mm square, no shard longer than 100mm
          </li>
          <li>
            <strong>Surface compressive stress</strong> measurement (via GASP or SCALP
            meter) ≥90 MPa for 3C-certified product
          </li>
          <li>
            <strong>Roller wave</strong> within tolerance per ASTM C1048 — visible as
            ripples under raking light
          </li>
          <li>
            <strong>Bow / overall warp</strong> under 3mm per meter for architectural
            tempered
          </li>
          <li>
            <strong>Edge quality</strong> — no chips, no raw cut marks, polish grade
            matches spec
          </li>
          <li>
            <strong>3C certification mark</strong> (CCC logo) etched or screened onto
            the glass, with batch traceability
          </li>
          <li>
            <strong>For high-stakes applications:</strong> heat-soak test certificate per
            EN 14179 or equivalent
          </li>
        </ul>

        <p>
          Our tempered glass product page covers the standard options and spec sheet:{' '}
          <a href="/products/tempered-glass">Tempered Glass product details</a>. For
          project-specific quotes or spec reviews, use the Request Quote button in
          the header.
        </p>

        {/* Pillar back-link */}
        <TechNote type="note" title="Zoom out to the full picture">
          <p>
            This article is the first in our Technical Guides series. For a full
            overview of all 5 architectural glass families and when to specify each,
            see our <a href="/blog/architectural-glass-types-guide">complete architectural
            glass types buyer's guide</a>.
          </p>
        </TechNote>

        <FAQ items={buyerFaqItems} />

        
        <TechNote type="note" title="Companion read">
          <p>
            Now that you know how tempered glass is made, see how its companion safety
            product is produced in our{' '}
            <a href="/blog/how-is-laminated-glass-made">
              laminated glass production walk-through
            </a>{' '}
            — autoclave chemistry, PVB vs SGP interlayer selection, and the defects that
            trace back to process discipline.
          </p>
        </TechNote>

        <RelatedProductsCards slugs={['tempered-glass', 'laminated-glass', 'low-e-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="how-is-tempered-glass-made" />
      </BlogArticleLayout>
    </>
  );
}
