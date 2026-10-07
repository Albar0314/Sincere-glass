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
import IGUAnatomyExplorer from '@/components/blog/article-6/IGUAnatomyExplorer';
import GasConductivityChart from '@/components/blog/article-6/GasConductivityChart';
import SealLifespanTimeline from '@/components/blog/article-6/SealLifespanTimeline';

const SLUG = 'how-is-insulated-glass-made';
const article: BlogArticle = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata = generateArticleMetadata(article);

const toc: TOCItem[] = [
  { id: 'not-just-two-panes', text: 'An IGU Is Not Just "Two Panes With a Gap"', level: 2 },
  { id: 'anatomy', text: 'The 5 Components of an IGU', level: 2 },
  { id: 'production', text: 'The Full Production Line', level: 2 },
  { id: 'spacer-decision', text: 'The Spacer Decision: Aluminum vs Warm-Edge', level: 2 },
  { id: 'argon-fill', text: 'The Argon Fill: Why It Matters and How It\'s Done', level: 2 },
  { id: 'dual-seal', text: 'Dual Seal: The 25-Year Lifespan Question', level: 2 },
  { id: 'qc', text: 'QC: Dew Point, Gas Content, Seal Integrity', level: 2 },
  { id: 'faq', text: 'Buyer FAQ', level: 2 },
];

const buyerFaqItems = [
  {
    q: "What's the production lead time for insulated glass units?",
    a: 'Our standard IGU production cycle is 10-15 working days from order confirmation, matching our laminated glass line. For IGUs that require Low-E coated glass or laminated outer lites, the lead time extends to 15-20 working days because the lites must be fully processed before IGU assembly can begin.',
  },
  {
    q: 'What\'s the typical lifespan of an insulated glass unit?',
    a: 'A properly sealed dual-seal IGU with PIB + silicone seals should maintain its gas fill and remain condensation-free for 25-30 years. Our standard IGUs ship with a 10-year seal warranty; 15-year warranty is available for projects using premium silicone secondary seals. Lifespan is dominated by seal quality, not by the glass itself.',
  },
  {
    q: 'Can IGUs be shipped by sea without seal damage?',
    a: 'Yes, if the production quality is correct. Properly sealed dual-seal IGUs are stable in sea transit; the pressure change at altitude (for air freight) is actually more stressful than ocean shipping. We package IGUs in pine A-frame crates with corner protection and desiccant packs. For destinations above 1500m elevation (Denver, Mexico City, La Paz), we recommend specifying pressure-equalizing capillary tubes to prevent seal stress.',
  },
  {
    q: 'What does "argon-filled" actually mean — is it 100% argon?',
    a: 'Industry standard "argon-filled" means approximately 90-95% argon concentration at time of manufacture, with the remaining 5-10% being residual air that could not be fully displaced during the fill process. Over 25 years, slow permeation through the seal typically reduces this by about 1% per year, so a 25-year-old argon IGU may have 65-70% argon remaining. We test fill percentage at QC and provide fill-rate certificates for high-performance specifications.',
  },
  {
    q: "What's the MOQ for insulated glass orders from Sincere Glass?",
    a: 'Standard MOQ is 50 square meters per order, with no restriction on panel sizes within our 3m × 15m line capacity. For high-performance IGUs (laminated outer lite + Low-E + argon + warm-edge spacer), we recommend ordering in whole facade sets rather than small batches to maintain consistent production parameters across the project.',
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
          'An IGU (insulated glass unit) is 2+ glass lites separated by a sealed cavity filled with inert gas, with a desiccant-filled spacer bar and a dual-seal perimeter.',
          'The thermal performance comes from the gas fill (argon vs air cuts U-value by ~20%) and Low-E coating (another 40-50% reduction) — not the glass itself.',
          'The lifespan comes from the dual seal system: primary butyl (PIB) for moisture/gas barrier + secondary silicone or polysulfide for structural strength. Properly sealed: 25-30 years.',
          'Production cycle: ~2 hours from assembly to seal cure, but requires strict humidity control (under 30% RH) throughout — a wet IGU is a dead IGU.',
          'Common failure mode: seal degradation leading to desiccant saturation and internal condensation (visible fog between panes). Not repairable — the IGU must be replaced.',
        ]} />

        <p>
          Of the three major glass fabrication processes — tempering, lamination, and IGU
          assembly — IGU production is the most <strong>system-engineering</strong>-oriented.
          Tempering is a thermal event; lamination is a chemical bonding; IGU production is
          an assembly discipline where five components must work together over 25+ years in
          a sealed system that can never be opened for maintenance.
        </p>

        <p>
          This article walks through what happens on an IGU production line — specifically
          ours, which includes an ultra-large automatic argon-fill line among our 2 IGU
          lines. It's the companion to our{' '}
          <a href="/blog/how-is-tempered-glass-made">tempered glass production walk-through</a>{' '}
          and{' '}
          <a href="/blog/how-is-laminated-glass-made">laminated glass production
          walk-through</a>, completing the trilogy on how modern architectural glass is
          actually fabricated. For a broader framework on glass selection, see our{' '}
          <a href="/blog/architectural-glass-types-guide">complete architectural glass
          types guide</a>.
        </p>

        <h2 id="not-just-two-panes">An IGU Is Not Just "Two Panes With a Gap"</h2>

        <p>
          The intuition "insulated glass is two panes with air between" is like saying "a
          car engine is pistons that go up and down." Technically correct, operationally
          misleading. The <strong>sealed cavity</strong> is what makes the system work —
          not the gap itself. Once air can freely move in and out, the thermal insulation
          collapses and condensation forms. The entire production discipline exists to
          create and maintain that seal.
        </p>

        <p>
          Three things must be true for an IGU to function:
        </p>

        <ul>
          <li>
            <strong>The cavity must stay sealed</strong> for decades, surviving UV
            exposure, thermal cycling, and building movement.
          </li>
          <li>
            <strong>The gas fill must stay in</strong> — argon escapes 1-2× faster than air
            through any seal defect, so poor seals degrade thermal performance before
            visible fog appears.
          </li>
          <li>
            <strong>Internal humidity must stay low</strong> — residual moisture in the
            cavity causes condensation at the first cold morning, visible as fog between
            the panes.
          </li>
        </ul>

        <p>
          Each requirement maps to a specific component of the IGU, which we'll walk
          through next.
        </p>

        <h2 id="anatomy">The 5 Components of an IGU</h2>

        <p>
          Click any component in the diagram below to see what it does, what options
          exist, and what we specify as our standard:
        </p>

        <IGUAnatomyExplorer />

        <p>
          Most buyers focus on the glass itself (outer lite, inner lite, Low-E coating) and
          treat the spacer and seals as commodity items. This gets the priorities exactly
          backwards. <strong>The glass is the easy part</strong> — any float glass supplier
          can give you clear 6mm with a Low-E coating. The spacer, desiccant, and seal
          system determine whether that glass is still performing as designed in 25 years
          or has fogged up by year 8.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug="how-is-insulated-glass-made" />

        <h2 id="production">The Full Production Line</h2>

        <p>
          Unlike tempering (a continuous furnace) or lamination (a batch autoclave), IGU
          assembly is a <strong>sequential station line</strong>. Each unit moves through
          8 stations in sequence, typically completing in about 2 hours per unit (though
          the full line runs continuously):
        </p>

        <ol>
          <li>
            <strong>Glass preparation</strong> — Both lites arrive from upstream (tempering
            or lamination lines). Washed with deionized water, air-knife dried, inspected
            for surface defects. For Low-E glass, coating orientation is verified (coating
            must face into the cavity, surface #2 or #3).
          </li>
          <li>
            <strong>Spacer frame assembly</strong> — Spacer bars are cut to length, bent
            at corners (or butt-joined for warm-edge composites), and filled with fresh
            desiccant. The frame perimeter must be dimensionally accurate within 1mm or
            glass alignment fails downstream.
          </li>
          <li>
            <strong>Primary seal application</strong> — Hot-melt butyl (PIB) is applied as
            a continuous bead on both faces of the spacer frame. This is the gas and
            moisture barrier.
          </li>
          <li>
            <strong>Assembly press</strong> — The sandwich (outer lite + spacer frame +
            inner lite) is pressed together under light pressure to seat the PIB without
            squeeze-out. The spacer must be perfectly parallel to both lites — any skew
            compromises the seal.
          </li>
          <li>
            <strong>Gas fill (if specified)</strong> — Argon or krypton is injected
            through two holes in the spacer corner, displacing air through a second hole.
            On our automatic line, this is a controlled process that targets 90%+ fill
            rate.
          </li>
          <li>
            <strong>Fill hole sealing</strong> — The injection holes are plugged with
            butyl and the exterior sealed over. This is the single most common failure
            point if production quality is weak.
          </li>
          <li>
            <strong>Secondary seal</strong> — Silicone (our standard) or polysulfide is
            injected around the entire perimeter in the channel between the glass edges
            and the exterior face of the spacer. This provides structural strength and
            UV protection to the primary seal.
          </li>
          <li>
            <strong>Cure + QC</strong> — Secondary seal cures for 24-48 hours. QC tests
            dew point, gas fill percentage, and dimensional accuracy before packaging.
          </li>
        </ol>

        <h2 id="spacer-decision">The Spacer Decision: Aluminum vs Warm-Edge</h2>

        <p>
          The spacer bar is the biggest thermal bridging element in an IGU. In a 1.4
          W/m²·K Low-E IGU, the edge seal can account for 15-25% of total heat loss
          through the window. The spacer material choice is therefore a significant
          performance decision:
        </p>

        <ul>
          <li>
            <strong>Aluminum spacer (standard):</strong> Highest thermal conductivity
            (~220 W/m·K), creates the largest thermal bridge. Cheapest option. Appropriate
            for budget residential glazing in mild climates. Edge temperature in winter
            can drop below dew point, causing visible condensation on the glass near the
            spacer.
          </li>
          <li>
            <strong>Stainless steel spacer:</strong> Middle option (~16 W/m·K). Modest
            improvement over aluminum at modest cost premium. Common in European
            residential markets.
          </li>
          <li>
            <strong>Warm-edge composite (TPS, Super Spacer, Swiggle):</strong> Lowest
            thermal conductivity (~0.1-0.3 W/m·K). The industry's premium option for
            high-performance glazing. Can improve center-of-glass U-value by 0.1-0.2
            W/m²·K and dramatically reduce edge condensation risk.
          </li>
        </ul>

        <p>
          For any IGU with Low-E coating, warm-edge spacer is strongly recommended — the
          thermal bridging of an aluminum spacer undoes much of the Low-E benefit at the
          perimeter. We specify warm-edge composite spacers as our standard for all Low-E
          IGU orders.
        </p>

        <h2 id="argon-fill">The Argon Fill: Why It Matters and How It's Done</h2>

        <p>
          Argon costs less than $2-3/m² to add during production and reduces U-value by
          about 20% compared to dry air. This is one of the best cost/performance upgrades
          in all of architectural glazing. Click through the gas options to see why:
        </p>

        <GasConductivityChart />

        <p>
          The physics is straightforward: thermal conductivity through a gas depends on
          the mean free path of molecules between collisions. Argon atoms are heavier and
          larger than air (N₂ and O₂), so they collide more frequently and transfer less
          energy. Krypton and xenon are even larger and more effective, but the cost
          escalates dramatically.
        </p>

        <p>
          Our fill process uses a two-port method: an injection port and a vent port
          located at diagonal corners of the spacer. Argon enters at ~5-10 L/min while
          displaced air exits the vent. The process typically runs 30-60 seconds per IGU
          and achieves 90-95% argon concentration verified by oxygen sensor at the vent.
          Both ports are then sealed with butyl followed by secondary silicone.
        </p>

        <TechNote type="tip" title="High-altitude IGUs">
          <p>
            For projects at elevation (Denver, Mexico City, Johannesburg) or anywhere
            the IGU will be shipped by air freight across significant pressure change,
            we recommend specifying <strong>capillary tubes</strong> — small vent tubes
            embedded in the spacer that allow pressure equalization during transit, then
            get crimped shut after installation. Without them, the pressure differential
            can stress the seal and cause premature failure. Not needed for ocean
            shipping or installations below 1500m.
          </p>
        </TechNote>

        <h2 id="dual-seal">Dual Seal: The 25-Year Lifespan Question</h2>

        <p>
          The seal system is why an IGU lasts 10 years or 30 years. Toggle the systems
          below to see the lifespan projections:
        </p>

        <SealLifespanTimeline />

        <p>
          Single-seal IGUs still exist in the budget residential window market but should
          not be considered for any commercial project. Among dual-seal systems, the
          choice between polysulfide and silicone secondary is driven by application:
        </p>

        <ul>
          <li>
            <strong>Polysulfide secondary:</strong> Lower cost, 20-25 year expected
            life. Suitable for standard commercial glazing. Not UV-stable — must be
            protected from direct sunlight by framing.
          </li>
          <li>
            <strong>Silicone secondary:</strong> Higher cost, 30+ year expected life.
            UV-stable, suitable for structural glazing where the seal may be exposed.
            Required for structural silicone glazing (SSG) where the IGU is bonded to
            the curtain wall frame via the secondary seal itself.
          </li>
        </ul>

        <p>
          Our standard is PIB primary + silicone secondary. For projects where cost
          sensitivity is high and the IGU will be inside standard aluminum framing, we
          can quote PIB + polysulfide as an alternative.
        </p>

        <h2 id="qc">QC: Dew Point, Gas Content, Seal Integrity</h2>

        <p>
          IGU quality control is unusual because the critical performance characteristics
          are <strong>invisible</strong>. A finished IGU looks exactly like a non-functional
          IGU to the naked eye — both are two panes with a gap. Testing is required:
        </p>

        <ul>
          <li>
            <strong>Dew point test</strong> — A small IGU sample from each lot is
            frozen to -40°C and inspected for internal frost formation. Properly dried
            desiccant should keep the dew point below -40°C. Any visible frost means
            desiccant was spent or moisture penetrated during assembly.
          </li>
          <li>
            <strong>Gas content measurement</strong> — Spark emission spectroscopy or
            oxygen-sensor sampling verifies argon fill percentage. We test every 20th
            unit in a run and provide fill-rate certificates for high-performance
            specifications.
          </li>
          <li>
            <strong>Seal continuity inspection</strong> — Visual + probe inspection of
            the primary and secondary seal around the full perimeter. Discontinuities
            or voids are flagged for repair or rejection.
          </li>
          <li>
            <strong>Dimensional accuracy</strong> — Overall thickness, spacer squareness,
            and offset between the two glass lites are measured. Tolerances per EN 1279-6
            or GB/T 11944-2012.
          </li>
          <li>
            <strong>Visual optical inspection</strong> — No scratches, no debris in the
            cavity, no spacer defects visible through the glass. Any contamination inside
            the cavity is a reject — cannot be cleaned once sealed.
          </li>
        </ul>

        <p>
          Our product page for insulated glass covers the standard build-up options and
          spec sheet:{' '}
          <a href="/products/insulated-glass">Insulated Glass product details</a>. For
          project-specific quotes, use the Request Quote button in the header.
        </p>

        {/* Pillar back-link */}
        <TechNote type="note" title="Zoom out to the full picture">
          <p>
            This article completes our Technical Guides trilogy on glass fabrication —
            see also our walk-throughs of{' '}
            <a href="/blog/how-is-tempered-glass-made">tempered glass production</a> and{' '}
            <a href="/blog/how-is-laminated-glass-made">laminated glass production</a>.
            For a broader framework of all 5 architectural glass families, see our{' '}
            <a href="/blog/architectural-glass-types-guide">complete architectural glass
            types buyer's guide</a>.
          </p>
        </TechNote>

        <FAQ items={buyerFaqItems} />

        <RelatedProductsCards slugs={['insulated-glass', 'low-e-glass', 'laminated-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="how-is-insulated-glass-made" />
      </BlogArticleLayout>
    </>
  );
}
