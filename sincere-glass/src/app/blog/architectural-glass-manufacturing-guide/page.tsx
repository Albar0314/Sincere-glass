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
import ProcessSelector from '@/components/blog/pillar-tech/ProcessSelector';
import ProcessFamilyMap from '@/components/blog/pillar-tech/ProcessFamilyMap';

const SLUG = 'architectural-glass-manufacturing-guide';
const article: BlogArticle = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata = generateArticleMetadata(article);

const toc: TOCItem[] = [
  { id: 'selector', text: 'Start Here: Which Process Does Your Glass Need?', level: 2 },
  { id: 'three-processes', text: 'The 3 Fabrication Processes', level: 2 },
  { id: 'tempering', text: '1. Tempering — Thermal Strengthening', level: 3 },
  { id: 'lamination', text: '2. Lamination — Chemical Bonding', level: 3 },
  { id: 'igu', text: '3. IGU Assembly — Sealed-System Engineering', level: 3 },
  { id: 'process-map', text: 'How 3 Processes Create 5 Product Families', level: 2 },
  { id: 'one-factory', text: 'Three Lines, One Factory', level: 2 },
  { id: 'audit-checklist', text: "Supplier Audit Checklist", level: 2 },
  { id: 'faq', text: 'FAQ', level: 2 },
];

const faqItems = [
  {
    q: 'What are the main fabrication processes for architectural glass?',
    a: 'Three primary processes convert raw annealed float glass into finished architectural products: (1) tempering — thermal strengthening by heating to 620°C and quenching; (2) lamination — chemical bonding of two glass lites with a polymer interlayer in an autoclave at 140°C and 12 bar; (3) IGU assembly — building sealed insulated glass units with argon-filled cavities and dual-seal perimeters. Most modern architectural glass combines two or three of these processes.',
  },
  {
    q: 'Can a single factory handle all three processes in-house?',
    a: 'Yes, but it is less common than buyers assume. Many mid-tier factories specialize in one or two processes and subcontract the rest, which creates handling damage risk and extended lead times. Our 20,000 m² Wuhan facility runs all three processes on dedicated lines in parallel — 2 tempering furnaces (largest 3m × 15m), 2 lamination autoclaves (largest 3m × 15m), and 2 IGU assembly lines (one with ultra-large automatic argon fill). This matters most for combined products like laminated-IGU, where cross-handling between factories would introduce quality risk.',
  },
  {
    q: 'What is the typical production time from order to shipping?',
    a: 'Standard production cycles from order confirmation at our facility: annealed cuts 3-7 working days, tempered 7-12 days, laminated 10-15 days, insulated glass units 10-15 days, combined laminated-IGU 15-20 days. Low-E coating availability for specialty variants can add 5-7 days. These exclude ocean freight transit time to international destinations.',
  },
  {
    q: 'How do I verify that a supplier can actually produce what they claim?',
    a: "The supplier audit checklist later in this guide covers it, but the short version: (1) ask for recent batch records with autoclave or furnace cycle data; (2) ask for test reports per GB 15763.2 (tempered), GB 15763.3 (laminated), and GB/T 11944 (IGU); (3) if possible, visit the facility and confirm the production lines match the capability claimed. Beware of 'factories' that are actually trading companies subcontracting production — they cannot answer production detail questions.",
  },
  {
    q: 'Can I order combined products (laminated-IGU, Low-E tempered) from one supplier?',
    a: 'This is where factory-vs-trader matters most. A trading company cannot guarantee process compatibility across subcontracted lines. A full-service factory like ours runs the processes in sequence on compatible production lines — our tempered-laminated-IGU workflow goes tempering → lamination → IGU assembly on panels sized for all three lines, with full batch traceability. For high-performance facades, specify "single-source production" in your RFQ.',
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
          'Three main fabrication processes convert raw annealed glass into finished architectural products: tempering (thermal), lamination (chemical bonding), and IGU assembly (sealed system).',
          'Each process targets a different buyer concern: tempering for safety strength, lamination for fragment retention and acoustic, IGU for energy performance.',
          'Most modern buildings use glass that has been through 2-3 of these processes — a Low-E laminated IGU, for example, goes through all three.',
          "Few mid-tier factories run all three in-house. Single-source production matters for combined products — cross-factory handling creates quality risk.",
          'Our 20,000 m² Wuhan facility runs all 3 processes on dedicated lines (2 tempering furnaces, 2 lamination autoclaves, 2 IGU lines) — among the largest multi-process capability in Hubei province.',
        ]} />

        <p>
          Most buyer-facing content treats architectural glass as a <em>product</em> — tempered,
          laminated, Low-E, IGU. But every one of those products is defined by the{' '}
          <em>fabrication process</em> that creates it. Understanding the three processes
          matters for two reasons: it tells you which supplier capabilities to look for, and
          it explains why some products are cheap and others are expensive.
        </p>

        <p>
          This guide is the entry point to our Technical Guides series on glass manufacturing.
          Three in-depth articles walk through each process in detail; this guide maps them
          to the buyer's decision — what you need to buy, which process creates it, and what
          to look for in a supplier. For a parallel framework on product selection rather
          than fabrication, see our{' '}
          <a href="/blog/architectural-glass-types-guide">complete architectural glass types
          guide</a>.
        </p>

        <h2 id="selector">Start Here: Which Process Does Your Glass Need?</h2>

        <p>
          If you want the fastest answer without reading the full guide, use the selector
          below. One question, four possible paths — each links to the deep-dive article
          and the relevant product page.
        </p>

        <ProcessSelector />

        <TechNote type="tip" title="The selector's logic">
          <p>
            The four options map to the four most common architectural glass orders: single-process
            tempered (safety only), single-process laminated (fragment retention), single-process
            IGU (thermal only), or the combined laminated-IGU that premium facades need. The
            selector tells you which production lines must be involved — which, in turn, tells
            you which suppliers can actually make it.
          </p>
        </TechNote>

        <h2 id="three-processes">The 3 Fabrication Processes</h2>

        <p>
          Each process addresses a fundamentally different engineering problem. Understanding
          what each one does — and does not do — is the foundation for every glass specification
          decision.
        </p>

        <h3 id="tempering">1. Tempering — Thermal Strengthening</h3>

        <p>
          Tempering takes ordinary annealed float glass and gives it 4-5× the strength plus a
          safe granular breakage pattern. The process: heat the glass to approximately 620°C
          in a horizontal roller furnace, then quench both surfaces simultaneously with
          high-pressure air jets. The surface freezes while the core remains hot; when the core
          finishes contracting, it pulls against the frozen surface, locking in compressive
          stress of 100-180 MPa.
        </p>

        <p>
          This stress profile is why tempered glass is "safety glass" — any external force must
          first overcome the surface compression before the glass can fail, and when it does
          finally break, it fragments into small granules instead of large shards. Required by
          building codes in nearly every country for doors, shower enclosures, low windows,
          railings, and other impact-prone locations.
        </p>

        <p className="text-sm">
          <strong>Deep dive:</strong>{' '}
          <a href="/blog/how-is-tempered-glass-made">
            How Is Tempered Glass Made? A Factory-Floor Walk-Through of the 7-Phase Production Line
          </a>
        </p>

        <h3 id="lamination">2. Lamination — Chemical Bonding</h3>

        <p>
          Lamination permanently bonds two or more glass lites with a polymer interlayer —
          most commonly PVB (polyvinyl butyral) or SGP (SentryGlas ionoplast). The process runs
          in an autoclave: a cylindrical pressure vessel that holds the assembled sandwich at
          approximately 140°C and 12 bar for 30-40 minutes. During this hold, the PVB flows
          into every micro-cavity between the glass surfaces and forms a chemical bond with
          the hydroxyl groups on the glass.
        </p>

        <p>
          The resulting panel has two critical properties beyond plain glass: when broken,
          fragments stay adhered to the interlayer (no falling shards), and the interlayer
          dampens airborne sound. Required by code for overhead glazing, structural glass
          floors, and most storefronts. SGP variant is standard for hurricane and
          cyclone-prone regions.
        </p>

        <p className="text-sm">
          <strong>Deep dive:</strong>{' '}
          <a href="/blog/how-is-laminated-glass-made">
            How Is Laminated Glass Made? Inside the Autoclave That Chemically Fuses Glass to PVB
          </a>
        </p>

        <LeadMagnetCTA variant="inline" articleSlug="architectural-glass-manufacturing-guide" />

        <h3 id="igu">3. IGU Assembly — Sealed-System Engineering</h3>

        <p>
          IGU assembly builds an insulated glass unit: two or more glass lites separated by a
          sealed cavity filled with inert gas (typically argon), bounded by a desiccant-filled
          spacer bar and a dual-seal perimeter. The process runs on an 8-station assembly line
          — glass prep, spacer frame assembly, primary butyl seal, assembly press, gas fill,
          fill-hole sealing, secondary silicone seal, and cure.
        </p>

        <p>
          Unlike tempering or lamination (both single thermal events), IGU assembly is a
          sequential discipline where five components must work together over 25+ years in a
          sealed system that can never be opened for maintenance. The thermal performance
          comes from the gas fill and Low-E coating; the lifespan comes from the dual seal
          system. Baseline specification for commercial office towers, residential windows in
          temperate and cold climates, and any building with meaningful HVAC loads.
        </p>

        <p className="text-sm">
          <strong>Deep dive:</strong>{' '}
          <a href="/blog/how-is-insulated-glass-made">
            How Is Insulated Glass Made? Inside the 25-Year Sealed System That Cuts Heat Loss by 70%
          </a>
        </p>

        <h2 id="process-map">How 3 Processes Create 5 Product Families</h2>

        <p>
          The three processes combine in different sequences to produce the five families of
          architectural glass. Click any process pill below to see which products flow from it:
        </p>

        <ProcessFamilyMap />

        <p>
          Two observations worth drawing out:
        </p>

        <ul>
          <li>
            <strong>Tempering touches almost everything.</strong> Even products that look like
            they are about something else (laminated glass, enameled glass, Low-E IGU) usually
            start with tempered lites — because safety glass is code-required in most
            architectural applications.
          </li>
          <li>
            <strong>Combined products need all three lines.</strong> A laminated-IGU — the
            premium facade specification for high-end projects — runs through tempering first
            (both lites tempered), then lamination (outer lite laminated), then IGU assembly
            (laminated outer + Low-E tempered inner assembled into the final unit). A supplier
            without all three lines cannot make this product in-house.
          </li>
        </ul>

        <h2 id="one-factory">Three Lines, One Factory</h2>

        <p>
          Here is what matters about producing all three processes under one roof, and why we
          invested in it:
        </p>

        <ul>
          <li>
            <strong>Combined products stay in one facility.</strong> Our laminated-IGU
            workflow goes tempering → lamination → IGU assembly on panels sized for all three
            lines, with full batch traceability. Cross-factory handling introduces handling
            damage risk, timing uncertainty, and finger-pointing when quality issues arise.
          </li>
          <li>
            <strong>Jumbo capability across all three.</strong> Our tempering furnace handles
            panels up to 3m × 15m. Our lamination autoclave handles panels up to 3m × 15m.
            Our ultra-large automatic argon-fill IGU line can accommodate the resulting
            jumbo laminated panels. Mid-tier factories typically have jumbo capability in
            one process but not all three.
          </li>
          <li>
            <strong>Single-source quality accountability.</strong> If a laminated-IGU fails
            in the field, we can trace the issue to a specific batch, cycle, and raw material
            lot across all three processes. A multi-factory supply chain cannot provide this.
          </li>
          <li>
            <strong>15+ years domestic track record.</strong> Our two facilities (武汉欣城 and
            湖北欣之城) have operated these lines for the Chinese domestic market since the
            early 2010s. The export-market offering is new, but the production capability is
            mature.
          </li>
        </ul>

        <h2 id="audit-checklist">Supplier Audit Checklist</h2>

        <p>
          When evaluating any architectural glass supplier — including us — these are the
          questions whose answers separate a real factory from a trading company subcontracting
          production:
        </p>

        <ul>
          <li>
            <strong>How many tempering furnaces do you operate, and what is the maximum
            panel size?</strong> A real factory can answer immediately with specific
            numbers. A trading company gives vague answers or quotes "any size."
          </li>
          <li>
            <strong>Do you produce laminated glass in-house, or subcontract it?</strong> If
            subcontracted, who is the subcontractor and what is their quality system?
          </li>
          <li>
            <strong>Can you produce combined laminated-IGU in one facility?</strong> If yes,
            which production lines are involved and what is the typical lead time?
          </li>
          <li>
            <strong>What certifications ship with export orders?</strong> Minimum expected:
            3C (CCC) certification per Chinese national standards, with test reports per the
            relevant GB standards (15763.2 for tempered, 15763.3 for laminated, 11944 for
            IGU). For export, test reports suitable for ASTM C1048, EN 12150, or AS/NZS 2208
            compliance review.
          </li>
          <li>
            <strong>Can you provide batch records for a representative recent order?</strong>{' '}
            This is the diagnostic test — a real factory maintains production records; a
            trading company cannot produce them because they didn't produce the glass.
          </li>
          <li>
            <strong>What is your QC process for IGU gas fill percentage?</strong> Any factory
            claiming "argon-filled IGUs" without a measurement capability is guessing.
          </li>
          <li>
            <strong>What is the standard dual-seal system?</strong> PIB + silicone is the
            premium standard; PIB + polysulfide is mid-tier; single-seal is budget residential
            only.
          </li>
          <li>
            <strong>Do you offer heat-soak testing for tempered glass?</strong> Required for
            high-rise curtain wall applications to mitigate spontaneous NiS breakage risk.
          </li>
          <li>
            <strong>What is the MOQ, lead time, and shipping terms?</strong> A real factory
            can quote these per product category without consulting a third party.
          </li>
        </ul>

        <TechNote type="warning" title="Red flags from supplier responses">
          <p>
            Watch for: inability to specify tempering furnace size, vague answers about
            "any production capability," no test reports available, no batch records available,
            no QC data for IGU gas fill, no willingness to accept facility visits, prices
            dramatically below market, or quotes that mix "FOB any port in China" (suggests
            trader, not factory). Any of these should prompt a deeper audit before placing
            orders.
          </p>
        </TechNote>

        <FAQ items={faqItems} />

        <RelatedProductsCards slugs={['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="architectural-glass-manufacturing-guide" />
      </BlogArticleLayout>
    </>
  );
}
