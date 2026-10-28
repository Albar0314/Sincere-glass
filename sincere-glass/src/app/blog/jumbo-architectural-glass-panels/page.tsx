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

import JumboCapabilityExplorer from '@/components/blog/article-18/JumboCapabilityExplorer';
import TransportCrateVisualizer from '@/components/blog/article-18/TransportCrateVisualizer';
import JumboRFQBuilder from '@/components/blog/article-18/JumboRFQBuilder';

import Link from "@/components/LocalizedLink";
const SLUG = 'jumbo-architectural-glass-panels';
const article = blogArticles.find((a) => a.slug === SLUG) as BlogArticle;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc = [
  { id: 'what-is-jumbo',       text: 'Where jumbo starts, by product type',             level: 2 },
  { id: 'four-gates',          text: 'The four hard gates on jumbo production',         level: 2 },
  { id: 'capability-explorer', text: 'Check if your target panel can be made',          level: 2 },
  { id: 'failure-modes',       text: 'Failure modes that only appear at jumbo scale',   level: 2 },
  { id: 'transport',           text: 'Container, flat rack, or project cargo?',         level: 2 },
  { id: 'project-archetypes',  text: 'Six jumbo project archetypes we see',             level: 2 },
  { id: 'rfq-builder',         text: 'Build a complete jumbo RFQ',                      level: 2 },
  { id: 'procurement-traps',   text: 'Procurement traps on oversized orders',           level: 2 },
  { id: 'faq',                 text: 'FAQ',                                             level: 2 },
];

const faqItems = [
  {
    q: 'What is the practical maximum size for architectural tempered glass today?',
    a: "On a production basis, roughly 3 m x 15 m is the ceiling at the small cohort of global suppliers with full-jumbo tempering lines, including our Wuhan plant. A handful of specialty Northern European and Asian plants run ultra-jumbo furnaces at 3.3 m x 18 m or 3.6 m x 20 m, but those lines handle project-scale orders rather than routine commercial work. Beyond 3 x 15 m, lead time typically steps from 10 to 12 weeks into the 16 to 24 week range and the per-m2 price can double.",
  },
  {
    q: 'Why is a sealed insulated glass unit (IGU) size-limited more severely than a tempered monolithic panel?',
    a: 'Three machinery constraints bite harder on IGU than on tempered mono. Spacer bar bending radius limits the perimeter geometry. Dual-seal (butyl primary, silicone secondary) application gantries have shorter reach than tempering furnace rollers. And warm-edge spacer rolls become harder to source in the longer continuous lengths needed for jumbo units. Our jumbo IGU envelope caps at 3 x 6 m sealed; beyond that we route to specialty partners.',
  },
  {
    q: 'Can jumbo panels be shipped in standard shipping containers?',
    a: 'Up to approximately 11.8 m longest side and 2.35 m width, yes - a 40-foot high-cube container with an A-frame cradle handles it on standard liner service. Beyond that: 11.8 to 12 m needs a 40 ft flat rack or open-top (oversized surcharge, still liner service), and anything beyond 12 m length or 2.9 m width is breakbulk / project cargo on a conventional or multi-purpose vessel. Rate steps up roughly 1.5x into flat rack and 5 to 10x into breakbulk.',
  },
  {
    q: 'What is the lead time for a jumbo tempered laminated panel from your Wuhan plant?',
    a: 'Standard jumbo tempered monolithic ships in 8 to 10 weeks from PO. Jumbo tempered laminated (two tempered lites plus PVB or SGP) adds 2 to 3 weeks for the autoclave cycle and interlayer lead time, so 10 to 13 weeks is typical. Jumbo IGU adds 1 to 2 weeks beyond laminated. These are production lead times only - add 25 to 45 days ocean freight depending on destination, and 1 to 2 weeks for drawing approval before production starts.',
  },
  {
    q: 'What certifications do you supply with jumbo architectural glass?',
    a: 'Standard package includes: mill test certificate for the base float glass, EN 12150 or ASTM C1048 tempering report with surface compressive stress values, EN 14179 heat-soak certificate for tempered lites, EN 12543 or ASTM C1172 lamination certificate with interlayer batch traceability, EN 1279 IGU durability report with argon fill rate, EN 14449 or CE marking documentation for EU shipments, and interlayer certificate of analysis from Kuraray or Trosifol / Eastman. We can also arrange SGCC certification for US bid work on request.',
  },
  {
    q: 'How much does jumbo glass cost compared to standard-size architectural glass?',
    a: 'On a per-m2 basis, jumbo tempered monolithic within the 3 x 15 m envelope typically runs 1.4 to 1.8x the per-m2 price of standard-size 2.4 x 4 m tempered. Jumbo laminated runs 1.5 to 2x. Ultra-jumbo beyond 3 x 15 m can run 2 to 3x and introduces specialty-line surcharges on top. The premium is driven by furnace fill factor, autoclave cycle allocation, handling-rig and transport-rig cost, and the compressed supplier set with pricing power. Specifying one jumbo panel per bay often costs the same as splitting it into two smaller panels, because the jumbo supplier count is small enough that one of them owning the job compresses the premium further.',
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

        <h2 id="what-is-jumbo">Where jumbo starts, by product type</h2>
        <p>
          There is no single number that defines "jumbo" architectural glass.
          The threshold shifts by product type, because each make-up hits a
          different machinery wall. For monolithic tempered glass, we treat
          anything beyond roughly 2.6 m x 5 m as jumbo - that is the standard
          tempering-furnace envelope that most Chinese and European tempering
          shops operate within. For laminated glass, the autoclave diameter
          becomes the first binding constraint, and jumbo starts around 2.5 m
          width or 6 m length. For a sealed insulated glass unit, jumbo starts
          as low as 2.5 m x 4 m because the IG assembly machinery is more
          constrained than tempering or lamination.
        </p>
        <p>
          Mix those thresholds up at the RFQ stage and you get three different
          "no" answers from suppliers who could each handle the panel if the
          spec had been framed around their own gate. A sales email reading
          "we need a 3 m x 8 m insulated unit" filters out IG-only shops that
          could easily have tempered and laminated the lites, but struggle
          with the sealed-unit assembly at that size. The same request split
          as "we need 3 m x 8 m tempered lites, laminated, sent to our local
          IG assembler for the sealed step" opens up a larger supplier base
          and often cuts the quoted price by 20 to 30 percent.
        </p>
        <p>
          For context on the underlying production steps, our walk-through of{' '}
          <a href="/blog/how-is-tempered-glass-made">how tempered glass is made</a>{' '}
          and{' '}
          <a href="/blog/how-is-laminated-glass-made">how laminated glass is made</a>{' '}
          both show the furnace and autoclave constraints that cap jumbo
          sizing. This article picks up where those leave off: the sourcing
          and procurement decisions that follow from the production reality.
        </p>

        <section aria-labelledby="jumbo-threshold-ref" className="my-8">
          <h3 id="jumbo-threshold-ref" className="sr-only">
            Jumbo threshold reference
          </h3>
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="Industry jumbo thresholds by product type and factory tier"
            >
              <caption className="text-xs text-[#8B95A5] italic text-left mb-3">
                Jumbo thresholds by product type - industry-standard supplier
                tiers, data verified 2026-10. Tiers reflect common production
                equipment envelopes; a specific supplier may sit anywhere in
                the range for their class.
              </caption>
              <thead>
                <tr className="border-b border-[#3A4250]/40">
                  <th scope="col" className="text-left py-2 pr-4">
                    Make-up
                  </th>
                  <th scope="col" className="text-left py-2 pr-4">
                    Standard
                  </th>
                  <th scope="col" className="text-left py-2 pr-4">
                    Jumbo
                  </th>
                  <th scope="col" className="text-left py-2">
                    Ultra-jumbo
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono">
                <tr className="border-b border-[#3A4250]/20">
                  <th scope="row" className="text-left py-2 pr-4 font-normal">
                    Tempered mono
                  </th>
                  <td className="py-2 pr-4">2.6 x 5 m</td>
                  <td className="py-2 pr-4">3 x 15 m</td>
                  <td className="py-2">3.3 x 18 m+</td>
                </tr>
                <tr className="border-b border-[#3A4250]/20">
                  <th scope="row" className="text-left py-2 pr-4 font-normal">
                    Laminated
                  </th>
                  <td className="py-2 pr-4">2.5 x 6 m</td>
                  <td className="py-2 pr-4">3 x 15 m</td>
                  <td className="py-2">3.3 x 18 m+</td>
                </tr>
                <tr>
                  <th scope="row" className="text-left py-2 pr-4 font-normal">
                    Sealed IGU
                  </th>
                  <td className="py-2 pr-4">2.5 x 4 m</td>
                  <td className="py-2 pr-4">3 x 6 m</td>
                  <td className="py-2">3.5 x 12 m</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <h2 id="four-gates">The four hard gates on jumbo production</h2>
        <p>
          Capability to produce a jumbo panel is a four-gate filter. All four
          must pass. A supplier blocked at any single gate cannot deliver the
          panel, no matter how good they are at the other three.
        </p>
        <p>
          <strong>Gate 1 - Tempering furnace.</strong> The horizontal
          roller-hearth furnace that heats the glass to roughly 620 degrees C
          and quenches it in 15 seconds has a fixed bed length and width.
          Common Chinese tempering shops operate 2.44 x 4.5 m or 2.6 x 5 m
          furnaces. Mid-jumbo lines reach 3 x 8 m. The full-jumbo envelope is
          3 x 15 m, which is what our Wuhan plant runs on two parallel
          furnaces. Beyond 3 x 15 m, only a handful of specialty plants
          worldwide can handle the panel - most sit in Northern Europe
          (Finland, Germany, Italy) or at a few specialty Asian installations.
        </p>
        <p>
          <strong>Gate 2 - Laminating autoclave.</strong> If the panel is
          laminated, both tempered lites then need to go through the autoclave
          at roughly 140 degrees C and 12 bar for the PVB or SGP interlayer
          to chemically bond. Autoclave capacity is a function of inside
          cylinder diameter and length. A standard 2.5 x 6 m autoclave serves
          the standard-tempered world comfortably but caps out short of
          jumbo tempered. Our Wuhan line runs a 3 x 15 m dry-laminating
          autoclave that was built specifically to match the jumbo tempering
          furnaces upstream.
        </p>
        <p>
          <strong>Gate 3 - Insulated glass line.</strong> IGU assembly adds
          its own ceiling. The spacer bar must be bent and cut, the butyl
          primary seal applied, the glass panes mated together, argon gas
          introduced, and the silicone secondary seal applied - all on a
          machine whose gantry reach, spacer-bending radius, and desiccant
          loading equipment are set at build time. Standard IG lines handle
          2.5 x 4 m. Jumbo IG lines reach 3 x 6 m, including our Wuhan
          ultra-large automatic gas-fill unit. Ultra-jumbo IG at 3.5 x 12 m
          is produced at a handful of specialty plants globally. This gate is
          why many jumbo projects are specified as tempered laminated rather
          than IGU - the IG step is the first ceiling to collapse.
        </p>
        <p>
          <strong>Gate 4 - Transport.</strong> A panel the plant can produce
          but cannot move is not a usable product. Transport feasibility runs
          off longest-side plus width, mapped to container classes: 20-foot
          dry up to 5.8 m longest side, 40-foot high-cube up to 11.8 m,
          40-foot flat rack or open-top up to 12 m with over-width tolerance
          to 2.9 m width, and beyond that into breakbulk or project cargo.
          Flat-rack and breakbulk rates step up materially, and port handling
          plus site crane access often collapse projects before ocean freight
          does. This gate is covered in detail in our{' '}
          <a href="/blog/how-to-import-glass-from-china">
            China glass import guide
          </a>
          .
        </p>

        <h2 id="capability-explorer">Check if your target panel can be made</h2>
        <p>
          The explorer below runs the four-gate check against any
          combination of make-up, build-up, and panel dimensions you enter.
          Each gate independently returns Pass, Jumbo-only (meaning the panel
          needs a dedicated jumbo line), or Blocked (meaning the panel
          exceeds the global production envelope at that gate). The overall
          verdict is the worst of the four, and a separate line below the
          gates flags whether the panel fits inside the Sincere Wuhan
          envelope specifically. The default inputs on load show a 2.8 x 8 m,
          12 mm tempered panel - a typical facade jumbo spec - as a starting
          reference.
        </p>

        <JumboCapabilityExplorer />

        <h2 id="failure-modes">Failure modes that only appear at jumbo scale</h2>
        <p>
          Jumbo panels are not just scaled-up versions of standard panels.
          Three failure modes become materially more serious as panels get
          larger, and they shape what jumbo-capable plants spend their quality
          time on.
        </p>
        <p>
          <strong>Thermal breakage during tempering.</strong> The quench
          phase of tempering is a 15-second blast of ambient air across the
          hot glass surface. On a 2 x 3 m panel the air-nozzle array is
          over-specified for the job and the quench is uniform. On a 3 x 14 m
          panel, every nozzle in the array has to deliver exactly matched
          flow - any under-powered quadrant leaves a hot zone that can
          fracture the panel during cooling or weeks later in service. Our
          jumbo furnace runs with twice the nozzle count of a standard line
          and a fourfold increase in differential-pressure sensors across
          the quench head, specifically to catch this risk.
        </p>
        <p>
          <strong>Roller wave distortion.</strong> As the glass passes through
          the furnace on ceramic rollers at 620 degrees C, it rides a series
          of microscopic wave peaks and troughs that scale with roller
          spacing and panel span. On a 2 m span, the wave is undetectable to
          the eye. On a 10 m span, the roller wave can read as visible
          vertical banding on the finished panel, measurable with a ribbon
          reflectometer at 0.1 mm peak-to-trough on a bad line and under
          0.03 mm on a good one. Jumbo furnaces compensate with
          finer-pitched rollers, higher roller rotation speeds, and
          continuous-wave transport control. A supplier who cannot produce a
          roller-wave measurement with their samples is not jumbo-ready.
        </p>
        <p>
          <strong>Delamination edge creep.</strong> Laminated jumbo panels
          have more edge perimeter per m2 than smaller panels, and the
          autoclave cycle has to drive the interlayer bond uniformly along
          every centimeter of that perimeter. A localized under-pressure or
          temperature variance in a 15 m autoclave cycle produces edge
          delamination that can take 2 to 5 years to show up in service.
          This is why heat-soak-tested glass (EN 14179) and interlayer batch
          traceability become non-negotiable at jumbo scale, and why we
          document the autoclave cycle curve for every jumbo laminated run.
        </p>

        <h2 id="transport">Container, flat rack, or project cargo?</h2>
        <p>
          Transport selection on jumbo is a longest-side-and-width problem.
          Up to 5.8 m longest side a standard 20-foot container works; up to
          11.8 m a 40-foot high-cube with an A-frame cradle works; between
          11.8 and 12 m you move to flat rack or open-top; beyond 12 m or
          2.9 m width the shipment goes to breakbulk on a conventional or
          multi-purpose vessel. The visualizer below picks the smallest
          feasible mode for the dimensions you enter, draws the panel inside
          that container to scale, gives an approximate planning-grade sea
          freight range for FOB Wuhan to a major Western port, and notes the
          crate orientation your supplier should propose at RFQ stage.
        </p>

        <TransportCrateVisualizer />

        <CostDisclaimer />

        <h2 id="project-archetypes">Six jumbo project archetypes we see</h2>
        <p>
          A few project types account for most of our jumbo order volume.
          Reading them as reference lets you anchor your own project against
          what the market is actually buying.
        </p>
        <ol>
          <li>
            <strong>Transportation terminal glazing.</strong> Airport
            concourse, train station headhouse, cruise terminal. Typical spec:
            12 to 15 mm tempered monolithic or 10-1.52SGP-10 laminated at
            2.8 to 3 m width, 6 to 10 m height. Driven by column-free vision
            lines and daylighting. Transport almost always 40 ft flat rack
            with over-width approval. Standards: ASTM E1300 structural plus
            local jurisdiction fire-rating.
          </li>
          <li>
            <strong>Museum and gallery display walls.</strong> Low-iron
            tempered laminated with SGP interlayer, 3 x 8 to 3 x 12 m,
            heat-soaked. Driven by exhibit visibility and seismic performance.
            Lead times tolerate specialty-line routing when size exceeds our
            standard jumbo envelope. See our{' '}
            <a href="/blog/sgp-vs-pvb-interlayer-cost">
              SGP vs PVB cost analysis
            </a>{' '}
            for the interlayer selection detail.
          </li>
          <li>
            <strong>Luxury retail flagship facades.</strong> Full-storey
            frameless glass, often 3 x 9 m per bay. Typically laminated for
            safety, with cast-iron or glass fin structural support. Hard
            schedule from brand launch calendar - production slot on a jumbo
            line is reserved at PO signing. Cost premium of 2 to 3x over
            standard facade glass is accepted budget line.
          </li>
          <li>
            <strong>Jumbo balustrade and glass fin runs.</strong> Observation
            deck guardrails, cantilever rooflight supports, stair balustrades
            with no top rail. Spec usually 12 to 15 mm or 8-1.52SGP-8
            laminated at 2 to 3 m height, 3 to 5 m length. See our{' '}
            <a href="/blog/balustrade-glass-specification">
              balustrade specification guide
            </a>{' '}
            for the load-case math.
          </li>
          <li>
            <strong>Super-tall residential facade bays.</strong> Full-floor
            vision glass, 3 x 3.5 m per bay, Low-E coated IGU with laminated
            inner lite. Driven by uninterrupted view and thermal performance.
            IG assembly is the binding constraint, which is why these
            projects often split the production chain: tempering and
            lamination at one plant, IG assembly at a local jumbo-IG shop
            near the destination.
          </li>
          <li>
            <strong>Industrial facade and cleanroom glazing.</strong>
            Pharmaceutical, semiconductor, data-center cleanroom perimeter
            glazing. Jumbo tempered or jumbo laminated at 2.8 x 7 to 2.8 x
            10 m. Driven by air-handling and vibration isolation. Price
            sensitivity is high on these projects because budget pressure is
            industrial, not architectural - RFQ response time and lead time
            compete head-to-head with cost.
          </li>
        </ol>

        <h2 id="rfq-builder">Build a complete jumbo RFQ</h2>
        <p>
          Every missing field in a jumbo RFQ costs a round-trip of email per
          supplier, and a jumbo RFQ typically goes to four or five suppliers
          at once. The builder below assembles a 10-field RFQ block that
          captures the project, glass spec, standards, and five
          confirm-explicitly questions that a jumbo-capable factory should
          answer in its first reply. Fill the fields, copy the generated
          block, and send it as the body of a single email to each
          shortlisted supplier.
        </p>

        <JumboRFQBuilder />

        <h2 id="procurement-traps">Procurement traps on oversized orders</h2>
        <p>
          Four traps catch repeat buyers on jumbo. Each one quietly expands
          the project budget by 5 to 25 percent before anyone notices.
        </p>
        <p>
          <strong>Trap 1 - Specifying one jumbo panel per bay without
          costing the split.</strong> On a 15-bay facade, four of the bays
          might genuinely need a single 3 x 9 m panel each; the other
          eleven could use split panels at 3 x 4.5 m with no visible loss.
          Mixing one-panel and split-panel bays in the same order often
          saves 15 to 25 percent of the glass budget while keeping the
          landmark bays as the architect intended. Push back on blanket
          one-panel-per-bay specifications unless the architect has
          explicitly reviewed the trade-off.
        </p>
        <p>
          <strong>Trap 2 - Ignoring site crane access.</strong> We have seen
          two projects where the jumbo panels landed at the destination port
          on time and on budget, then sat in the yard for 10 and 14 weeks
          respectively because the site crane could not lift them to their
          installation elevation. Site crane capability is the last gate on
          jumbo, and it is usually not inside the glass supplier's scope.
          Confirm it before PO.
        </p>
        <p>
          <strong>Trap 3 - Not building replacement panel logistics into
          the contract.</strong> A jumbo panel damaged in transit or during
          installation is a 10- to 16-week lead-time problem to replace -
          longer than typical construction schedule slack. Standard practice
          is to order 2 to 5 percent attic stock on jumbo projects, held
          at the plant on reservation or shipped on project vessel. The
          incremental cost is small; the alternative is a visible gap in
          the facade for a quarter.
        </p>
        <p>
          <strong>Trap 4 - Treating the supplier count as larger than it
          is.</strong> Beyond the standard-furnace envelope, the global
          supplier count for jumbo tempered glass is in the low hundreds.
          Beyond our 3 x 15 m envelope, it is in the dozens. A procurement
          plan that assumes a competitive bid with eight responders is
          anchored in the standard-size market. In the jumbo market, three
          to four responders is a healthy bid list, and all three usually
          share a common price floor set by the limited global capacity.
          Build your schedule around that reality from day one.
        </p>

        <LeadMagnetCTA
          variant="inline"
          articleSlug={SLUG}
          title="Free: Global Architectural Glass Building Codes Comparison"
          description="An 11-page PDF covering US IBC, EU EN, China GB, and Australia AS requirements for tempered, laminated, and insulated glass across jumbo and standard sizes. Free for architects, specifiers, and procurement teams."
        />

        <p className="text-sm text-[#8B95A5] mt-6">
          For the pillar view of how this product-level decision fits into a complete architectural glass specification, see our <a href="/blog/architectural-glass-specification-guide" className="text-[#DAA745] hover:underline">architectural glass specification guide</a>.
        </p>

        
        {/* GROK-INSERT-V1:hst */}
        <p className="text-sm text-[#8B95A5] my-6">→ At jumbo scale, nickel-sulfide spontaneous-breakage risk compounds across panel count — see our <Link href="/blog/heat-soaked-tempered-glass-guide" className="text-[#DAA745] underline">heat soak testing guide</Link> for when to specify HST.</p>

        <FAQ items={faqItems} />

        <RelatedProductsCards
          slugs={article.relatedProductSlugs || ['tempered-glass', 'laminated-glass', 'insulated-glass']}
        />
      </BlogArticleLayout>
    </>
  );
}
