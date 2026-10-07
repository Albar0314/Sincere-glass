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
import GlassFamilyMap from '@/components/blog/pillar-arch-glass/GlassFamilyMap';
import GlassSelectorFlowchart from '@/components/blog/pillar-arch-glass/GlassSelectorFlowchart';

const SLUG = 'architectural-glass-types-guide';
const article: BlogArticle = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata = generateArticleMetadata(article);

const toc: TOCItem[] = [
  { id: 'selector', text: 'Start Here: Glass Selector', level: 2 },
  { id: 'families', text: 'The 5 Families of Architectural Glass', level: 2 },
  { id: 'annealed-family', text: '1. Annealed Float Glass', level: 3 },
  { id: 'tempered-family', text: '2. Tempered Glass', level: 3 },
  { id: 'laminated-family', text: '3. Laminated Glass', level: 3 },
  { id: 'insulated-family', text: '4. Insulated Glass (IGU)', level: 3 },
  { id: 'coated-family', text: '5. Coated Glass (Low-E / Enameled)', level: 3 },
  { id: 'by-application', text: 'By Application: What to Spec Where', level: 2 },
  { id: 'checklist', text: "Buyer's Procurement Checklist", level: 2 },
  { id: 'faq', text: 'FAQ', level: 2 },
];

const faqItems = [
  {
    q: 'What is the most common type of architectural glass?',
    a: 'Tempered glass is the most commonly specified architectural glass worldwide because most building codes require safety glass in doors, shower enclosures, low windows, railings, and other impact-prone locations. For commercial facades and energy-efficient buildings, insulated glass units (IGUs) with Low-E coating are now the baseline specification.',
  },
  {
    q: 'Can I combine multiple types of glass in a single pane?',
    a: 'Yes — the most common combinations are tempered laminated (impact strength + fragment retention) and laminated IGU (safety + thermal). Our 20,000 m² Wuhan facility runs both tempering and lamination lines in parallel, so we can produce combined units in one production flow. This is standard for high-end facades and overhead installations.',
  },
  {
    q: 'How do I know which glass type my building code requires?',
    a: 'Most national building codes (IBC in the US, GB 50210 in China, EN 12600 in EU, AS 1288 in Australia) define "hazardous locations" where safety glass is mandatory — doors, shower enclosures, low windows, railings, overhead glazing. Our free "Global Architectural Glass Building Codes Comparison" PDF covers all four systems side by side (link in the article above).',
  },
  {
    q: 'Does Sincere Glass handle both domestic and export orders?',
    a: 'Our two Wuhan facilities (武汉欣城 and 湖北欣之城) have 15+ years of domestic market experience and are now building export capability. We produce 3C-certified glass per Chinese national standards, with test reports available for ASTM C1048, EN 12150, and AS/NZS 2208 compliance review. MOQ for export orders is 50 m².',
  },
  {
    q: "What's the typical lead time for custom architectural glass orders?",
    a: 'Our standard production cycles from order confirmation: annealed cuts 3-7 working days, tempered 7-12 days, laminated 10-15 days, insulated glass units 10-15 days, combined laminated IGU 15-20 days. Low-E coating availability can add 5-7 days for specialty coatings. All lead times exclude ocean freight transit.',
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
          'Architectural glass splits into 5 functional families: annealed (raw), tempered (safety strength), laminated (safety retention), insulated (energy), and coated (Low-E / decorative).',
          'The selection logic is not about "which is best" — it is about which failure mode you cannot accept: impact injury, falling fragments, heat loss, or UV damage.',
          'Most modern buildings use 2-3 types in combination (e.g., tempered doors + laminated overhead + insulated windows). Few projects spec a single type throughout.',
          'Our 20,000 m² facility produces all 5 families in-house, including combined laminated-IGU on our 3m × 15m jumbo lines — among the largest in Hubei province.',
          'This guide covers all 5 families, links to deep-dive comparison articles, and ends with an interactive selector tool and a procurement checklist.',
        ]} />

        <p>
          "What type of glass should I use?" is a question with no universal answer — it depends
          on what the glass needs to do. A shower screen, a curtain wall, a skylight, and a
          decorative spandrel panel all have different failure modes, different code requirements,
          and different performance economics. Choosing wrong wastes money at best and risks
          lives at worst.
        </p>

        <p>
          This guide is the entry point for architectural glass selection: a map of the 5
          functional families, an interactive selector that asks the right questions, deep-dive
          links to our full comparison articles, and a procurement checklist you can hand to
          your supplier. It is written from the perspective of a mid-size Chinese float-glass
          converter that produces all 5 families in one facility — not from a product-brochure
          perspective of "every glass is premium."
        </p>

        <h2 id="selector">Start Here: Interactive Glass Selector</h2>

        <p>
          If you want the fastest answer without reading the full guide, use the selector below.
          It walks through three questions and recommends a glass type based on your primary
          concern. Each result links to the relevant product page and deep-dive article.
        </p>

        <GlassSelectorFlowchart />

        <TechNote type="tip" title="The selector's logic">
          <p>
            The three top-level branches — safety, energy, appearance — correspond to the three
            dominant engineering goals in architectural glazing. Nearly every real project is
            dominated by one of these, with the other two as secondary constraints. Starting
            there, rather than at "what thickness do I need?", avoids 90% of specification
            mistakes.
          </p>
        </TechNote>

        <h2 id="families">The 5 Families of Architectural Glass</h2>

        <p>
          All architectural glass products descend from one of these five families. Hover each
          circle below for a brief description and a link to go deeper:
        </p>

        <GlassFamilyMap />

        <p>
          The connections in the map above are not arbitrary. <strong>Annealed</strong> at the
          top is the raw material — every other family starts life as an annealed float glass
          sheet. <strong>Tempered</strong> and <strong>laminated</strong> are the two safety-glass
          upgrades, each addressing a different failure mode. <strong>Insulated</strong> units
          are built from tempered or laminated lites (never annealed, for safety reasons).{' '}
          <strong>Coated</strong> glass is a surface treatment that can be applied to any of
          the other families but is most commonly deployed as Low-E inside an IGU.
        </p>

        <h3 id="annealed-family">1. Annealed Float Glass — The Raw Material</h3>

        <p>
          Annealed glass is the direct output of a float glass line: molten glass drawn across
          a bed of molten tin, cooled slowly through an annealing lehr, and shipped as flat
          sheets. It has essentially zero residual stress, which makes it easy to cut and
          process — but also means it breaks into large, dangerous shards on impact.
        </p>

        <p>
          Annealed glass is the correct choice for interior framed artwork, upper-story windows
          above code-defined hazardous locations, greenhouse glazing (where thermal cycling
          would stress tempered glass to spontaneous breakage), and any application where the
          buyer needs to cut or drill the glass after purchase.
        </p>

        <p className="text-sm">
          <strong>Deep dive:</strong>{' '}
          <a href="/blog/tempered-glass-vs-annealed-glass">
            Tempered Glass vs Annealed Glass: Why "Regular" Glass Isn't Safe Enough for Most
            Modern Buildings
          </a>
        </p>

        <h3 id="tempered-family">2. Tempered Glass — The Safety Workhorse</h3>

        <p>
          Tempered glass is annealed glass that has been reheated to approximately 620°C and
          then quenched with high-pressure air jets. This creates compressive stress on the
          surface (~180 MPa) and tensile stress in the core, giving the glass 4-5× the strength
          of annealed and — more importantly — a safe granular breakage pattern instead of
          large shards.
        </p>

        <p>
          Our 3m × 15m tempering furnace is among the largest in Hubei province, which allows
          us to supply tempered glass for jumbo curtain walls and oversized facades that
          smaller factories cannot handle. Tempered is the mandatory specification for doors,
          shower enclosures, low windows, and railings in nearly every building code worldwide.
        </p>

        <p className="text-sm">
          <strong>Product page:</strong>{' '}
          <a href="/products/tempered-glass">Tempered Glass product details and specifications</a>
        </p>

        <h3 id="laminated-family">3. Laminated Glass — Fragment Retention</h3>

        <p>
          Laminated glass is two or more glass lites permanently bonded by a polymer interlayer
          — most commonly PVB (Polyvinyl Butyral) or SGP (SentryGlas, DuPont's structural
          interlayer). The interlayer provides a dual function: it dampens airborne sound
          (improving STC rating by 3-5 points vs plain glass) and it holds broken glass
          fragments in place after impact.
        </p>

        <p>
          Laminated glass is code-required for overhead glazing (IBC §2405.5), hurricane and
          cyclone-prone regions, structural glass floors, and most storefronts. The SGP variant
          resists forced entry well enough to be classified as burglar-resistant glazing.
        </p>

        <p className="text-sm">
          <strong>Deep dive:</strong>{' '}
          <a href="/blog/tempered-glass-vs-laminated-glass">
            Tempered Glass vs Laminated Glass: 7 Differences Buyers Must Know
          </a>{' '}
          · <strong>Product page:</strong>{' '}
          <a href="/products/laminated-glass">Laminated Glass details</a>
        </p>

        <LeadMagnetCTA variant="inline" articleSlug="architectural-glass-types-guide" />

        <h3 id="insulated-family">4. Insulated Glass (IGU) — Energy Performance</h3>

        <p>
          An insulated glass unit (IGU) is two or more glass lites separated by a sealed cavity
          filled with inert gas (typically argon) and bounded by a warm-edge spacer. The
          engineering problem it solves is heat transfer: a basic 6+12A+6 IGU achieves U-value
          of 2.6-2.8 W/m²·K; with Low-E coating, this drops to 1.4-1.8 — a 70% improvement
          over single-pane glazing.
        </p>

        <p>
          IGUs are the baseline specification for commercial office towers, residential windows
          in temperate and cold climates, and any building where HVAC costs are a significant
          operating expense. For premium facades combining IGU with laminated safety glass, the
          result is a "laminated IGU" — the configuration we recommend for high-end projects.
        </p>

        <p className="text-sm">
          <strong>Deep dive:</strong>{' '}
          <a href="/blog/insulated-glass-vs-laminated-glass">
            Insulated Glass vs Laminated Glass: Which One Does Your Project Actually Need?
          </a>{' '}
          · <strong>Product page:</strong>{' '}
          <a href="/products/insulated-glass">Insulated Glass details</a>
        </p>

        <h3 id="coated-family">5. Coated Glass — Low-E and Enameled</h3>

        <p>
          Coated glass is a category defined by surface treatment rather than structural method.
          The two most important categories for architectural buyers are:
        </p>

        <ul>
          <li>
            <strong>Low-E (low-emissivity) coating</strong> — a microscopically thin metallic
            layer (sputtered soft-coat or pyrolytic hard-coat) that reflects infrared heat
            while transmitting visible light. Used almost exclusively as surface #2 or #3 of
            an IGU to boost thermal performance.
          </li>
          <li>
            <strong>Enameled (ceramic frit) glass</strong> — ceramic ink baked onto the glass
            surface at tempering temperature, creating a permanent decorative color or pattern.
            Used for spandrel panels (opaque areas of a curtain wall hiding floor slabs),
            feature walls, and decorative applications.
          </li>
        </ul>

        <p className="text-sm">
          <strong>Product pages:</strong>{' '}
          <a href="/products/low-e-glass">Low-E Glass</a>{' '}·{' '}
          <a href="/products/enameled-glass">Enameled Glass</a>
        </p>

        <h2 id="by-application">By Application: What to Spec Where</h2>

        <p>
          Reverse-mapped from the 5 families: here is what architects and specifiers typically
          choose for common building applications. These are our recommendations based on
          production experience — they align with code requirements but go beyond the minimum
          where quality warrants.
        </p>

        <ul>
          <li>
            <strong>Curtain walls (high-rise commercial):</strong> Laminated IGU with Low-E
            coating. Thermal performance for HVAC savings; laminated outer lite for
            fall-arrest safety and wind-load reserve.
          </li>
          <li>
            <strong>Residential windows (temperate climate):</strong> Insulated glass with
            Low-E coating. Argon fill if budget allows. No laminated layer unless street noise
            is a specific issue.
          </li>
          <li>
            <strong>Shower enclosures and glass doors:</strong> Tempered glass, minimum 8mm,
            with polished edges. Laminated upgrade adds UV protection and shatter-stay for
            frameless designs.
          </li>
          <li>
            <strong>Skylights and overhead glazing:</strong> Laminated glass (mandatory per
            IBC §2405.5) — typically laminated tempered for both impact strength and fragment
            retention.
          </li>
          <li>
            <strong>Railings and balustrades:</strong> Laminated tempered glass is the standard.
            Code requires both safety strength and fragment retention for structural glazing.
          </li>
          <li>
            <strong>Spandrel panels (opaque facade areas):</strong> Enameled tempered glass
            with ceramic frit on surface #2 (interior-facing). Color-matched to facade design.
          </li>
          <li>
            <strong>Storefronts and retail glazing:</strong> Laminated glass with SGP
            interlayer for security; tempered as cost-conscious alternative in low-crime areas.
          </li>
          <li>
            <strong>Interior partitions (non-safety):</strong> Annealed glass if location is
            above code-defined hazardous zones; tempered if partition includes a door or is
            within 24in of a traffic path.
          </li>
        </ul>

        <h2 id="checklist">Buyer's Procurement Checklist</h2>

        <p>
          When you request a quote for architectural glass — from Sincere Glass or any supplier
          — these are the specifications your drawings should include. Missing any of these
          typically leads to a quote based on assumptions, which creates problems at delivery:
        </p>

        <ul>
          <li>
            <strong>Glass type</strong> — annealed / tempered / laminated / IGU / combined
            configuration (e.g., "tempered laminated IGU: 6mm Low-E tempered + 12mm argon +
            6mm clear tempered + 1.52mm PVB + 6mm clear tempered")
          </li>
          <li>
            <strong>Thickness per lite</strong> — each glass lite in the assembly separately
          </li>
          <li>
            <strong>Overall dimensions</strong> — W × H per panel, and total quantity
          </li>
          <li>
            <strong>Edge treatment</strong> — polished / ground / arrissed / exposed
          </li>
          <li>
            <strong>Hole locations and sizes</strong> — if any; must be specified before tempering
          </li>
          <li>
            <strong>Coating specification</strong> — Low-E type (soft-coat / hard-coat), coating
            surface (#2 or #3), U-value and SHGC targets
          </li>
          <li>
            <strong>Interlayer specification</strong> — PVB / SGP / acoustic PVB; thickness in mm
          </li>
          <li>
            <strong>Gas fill</strong> — air / argon / krypton (for IGUs)
          </li>
          <li>
            <strong>Spacer type</strong> — aluminum / warm-edge (TPS, Super Spacer, etc.)
          </li>
          <li>
            <strong>Compliance target</strong> — which standard (IBC, EN, GB, AS) and which clauses
          </li>
          <li>
            <strong>Delivery terms</strong> — FOB / CIF / DDP; port of destination
          </li>
          <li>
            <strong>Packaging</strong> — pine crate standard; A-frame or L-frame for jumbo panels
          </li>
        </ul>

        <TechNote type="warning" title="A note on sample orders">
          <p>
            For first-time buyers of any architectural glass product, we strongly recommend
            ordering a small sample (typically 500mm × 500mm, 2-4 pieces) before placing a
            production order. This verifies dimensional accuracy, edge quality, coating
            uniformity, and visual appearance match your expectations. Sample orders ship in
            5-7 days at nominal cost.
          </p>
        </TechNote>

        <FAQ items={faqItems} />

        <RelatedProductsCards slugs={['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="architectural-glass-types-guide" />
      </BlogArticleLayout>
    </>
  );
}