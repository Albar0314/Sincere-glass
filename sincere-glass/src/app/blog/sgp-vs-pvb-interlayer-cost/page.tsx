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

import InterlayerCostCalculator from '@/components/blog/article-17/InterlayerCostCalculator';
import PerformanceVsCostMatrix from '@/components/blog/article-17/PerformanceVsCostMatrix';
import UseCaseMatcher from '@/components/blog/article-17/UseCaseMatcher';

const SLUG = 'sgp-vs-pvb-interlayer-cost';
const article = blogArticles.find((a) => a.slug === SLUG) as BlogArticle;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc = [
  { id: 'why-interlayer-cost',  text: 'Why interlayer selection is 15-40% of laminated glass cost', level: 2 },
  { id: 'material-economics',   text: 'The material economics of PVB vs SGP',                       level: 2 },
  { id: 'cost-calculator',      text: 'Calculate your interlayer cost delta',                       level: 2 },
  { id: 'sgp-uplift',           text: 'What SGP actually delivers for the premium',                 level: 2 },
  { id: 'performance-matrix',   text: 'Performance per dollar, side by side',                        level: 2 },
  { id: 'scenarios',            text: 'Six real-world specification scenarios',                      level: 2 },
  { id: 'matcher',              text: 'Match your project to the right interlayer',                  level: 2 },
  { id: 'hidden-costs',         text: 'Hidden costs most buyers miss',                               level: 2 },
  { id: 'lifecycle-roi',        text: 'A lifecycle ROI framework',                                   level: 2 },
  { id: 'faq',                  text: 'FAQ',                                                         level: 2 },
];

const faqItems = [
  {
    q: 'Can I mix PVB and SGP in the same project?',
    a: 'Yes, and we recommend it. On a typical commercial project the balustrade and overhead glass need SGP for structural and safety reasons, while facade IGU and interior partitions are better served by standard PVB on cost grounds. Our Wuhan line runs both daily, and consolidating the order under one supplier means matched glass tint across marks, consistent certification paperwork, and a single bill of lading.',
  },
  {
    q: 'What is the minimum order quantity for SGP laminated glass?',
    a: 'SGP material is often stock-limited and the autoclave cycle is longer, so our standard MOQ for SGP export orders is 200 m². Standard PVB laminated runs at 100 m² MOQ. Below those thresholds, interlayer material lead time or line-change-over cost makes the per-m² price step up noticeably.',
  },
  {
    q: 'How long does an SGP laminated order take vs PVB?',
    a: 'Standard PVB laminated ships 25-35 days from PO. SGP typically runs 35-45 days: SGP material lead time at the supplier (Kuraray or Trosifol) is 2-3 weeks longer, and the SGP autoclave cycle is approximately 30 percent longer than PVB. For time-critical orders we recommend placing the SGP material reservation at PO signing rather than at production start.',
  },
  {
    q: 'Does an SGP laminate need heat-soaked tempered glass?',
    a: 'For balustrade, overhead, and any safety-critical application, yes. Heat-soak (EN 14179) does not change the SGP decision but is non-negotiable for the glass itself in those applications. Spontaneous NiS failure in a bonded SGP laminate takes a structural panel out of service with no warning, and the ~15 percent heat-soak cost premium eliminates that risk.',
  },
  {
    q: 'What is the typical US HTSUS duty rate on SGP vs PVB laminated glass?',
    a: 'Both PVB and SGP laminated architectural glass classify under HTSUS 7007.29 (laminated safety glass, other). The MFN duty rate is 4.9 percent at the time of writing. The interlayer type does not change the HTS classification. Always verify the current rate at hts.usitc.gov before building a landed-cost estimate.',
  },
  {
    q: 'Can SGP be reworked or recycled like PVB?',
    a: 'No. Standard PVB laminates can be de-laminated and the glass recycled with established industrial processes. SGP ionoplast forms a near-permanent chemical bond with the glass surface; a cracked SGP laminate goes to landfill or construction aggregate rather than back into the float-glass stream. This matters for projects with embodied-carbon or circular-economy specifications — raise it with your sustainability consultant early.',
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

        <h2 id="why-interlayer-cost">
          Why interlayer selection is 15 to 40 percent of laminated glass cost
        </h2>
        <p>
          On a quote sheet, laminated glass looks like a single line item. In
          our Wuhan plant it is three line items glued together: two tempered
          glass lites and the interlayer in between. For a 6-0.76-6 clear
          laminate, the two glass lites account for roughly 85 percent of the
          FOB cost and the standard PVB interlayer carries the remaining 15
          percent. Swap that same interlayer for a 1.52 mm SGP ionoplast and
          the interlayer share jumps to about 35-40 percent of the finished
          laminate. The glass has not changed; the economics have.
        </p>
        <p>
          That is the practical reason buyers get burned on interlayer
          decisions. A specification that casually calls out "SGP interlayer"
          on a facade where standard PVB would meet every performance
          requirement can add 20 to 35 percent to the glass budget for zero
          project benefit. The reverse — specifying standard PVB on a frameless
          balustrade or a long-span overhead glass — can save 20 percent now
          and cost ten times that in year-three remedial work. The interlayer
          choice is small on paper and large on the invoice.
        </p>
        <p>
          This article is the cost-driven decision chain we walk our export
          buyers through. We start with the raw material economics, then layer
          in the performance each type actually buys, then map specific
          project types to the right pick. If you want the manufacturing
          backstory first, read{' '}
          <a href="/blog/how-is-laminated-glass-made">
            How laminated glass is made
          </a>{' '}
          before coming back here.
        </p>

        <h2 id="material-economics">
          The material economics of PVB vs SGP
        </h2>
        <p>
          PVB (polyvinyl butyral) has been the dominant architectural
          interlayer since the 1960s. The world's three main suppliers —
          Eastman (Saflex), Kuraray (Trosifol), and EVERLAM — produce it in
          multi-thousand-tonne annual volumes. Standard 0.76 mm PVB currently
          runs an FOB-China interlayer cost of around USD 3 per m² of
          laminate, with acoustic PVB (a trilayer with a softer core) running
          about USD 5 per m². Price moves with the resin index, not with the
          project.
        </p>
        <p>
          SGP (SentryGlas, now a Kuraray product line) is a different polymer
          family: an ionoplast rather than a vinyl. The chemistry gives it 100
          times the shear modulus of PVB at 24-hour load, plus near-permanent
          chemical bonding to the glass. The trade-off is cost — around USD 13
          per m² of laminate at 1.52 mm, roughly 4 times standard PVB — and
          stock. SGP is produced at far lower volumes than PVB, lead times to
          our Wuhan line can stretch to 3 weeks on uncommon thicknesses, and
          the autoclave cycle itself runs about 30 percent longer.
        </p>
        <p>
          A quick way to orient yourself: the interlayer alone is PVB at USD
          3, acoustic PVB at USD 5, and SGP at USD 13 per m². Those three
          numbers do more work than any datasheet.
        </p>

        <section aria-labelledby="material-cost-ref" className="my-8">
          <h3 id="material-cost-ref" className="sr-only">
            Material cost reference
          </h3>
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="Interlayer material cost and finished laminate cost reference"
            >
              <caption className="text-xs text-[#8B95A5] italic text-left mb-3">
                Material cost reference — FOB China 2026, data verified:
                2026-10-21.{' '}
                <a
                  href="https://www.kuraray.com/products/sentryglas"
                  rel="nofollow noopener"
                  target="_blank"
                >
                  Kuraray SentryGlas
                </a>
                ,{' '}
                <a
                  href="https://www.saflex.com/"
                  rel="nofollow noopener"
                  target="_blank"
                >
                  Eastman Saflex
                </a>
                . Finished laminate indicative, excludes freight.
              </caption>
              <thead>
                <tr className="border-b border-[#3A4250]/40">
                  <th scope="col" className="text-left py-2 pr-4">
                    Build-up
                  </th>
                  <th scope="col" className="text-right py-2 pr-4">
                    Glass (2 lites)
                  </th>
                  <th scope="col" className="text-right py-2 pr-4">
                    PVB
                  </th>
                  <th scope="col" className="text-right py-2 pr-4">
                    Acoustic PVB
                  </th>
                  <th scope="col" className="text-right py-2">
                    SGP
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono">
                <tr className="border-b border-[#3A4250]/20">
                  <th scope="row" className="text-left py-2 pr-4 font-normal">
                    6+6 mm
                  </th>
                  <td className="text-right py-2 pr-4">$22</td>
                  <td className="text-right py-2 pr-4">$25</td>
                  <td className="text-right py-2 pr-4">$27</td>
                  <td className="text-right py-2">$35</td>
                </tr>
                <tr className="border-b border-[#3A4250]/20">
                  <th scope="row" className="text-left py-2 pr-4 font-normal">
                    8+8 mm
                  </th>
                  <td className="text-right py-2 pr-4">$30</td>
                  <td className="text-right py-2 pr-4">$33</td>
                  <td className="text-right py-2 pr-4">$35</td>
                  <td className="text-right py-2">$43</td>
                </tr>
                <tr className="border-b border-[#3A4250]/20">
                  <th scope="row" className="text-left py-2 pr-4 font-normal">
                    10+10 mm
                  </th>
                  <td className="text-right py-2 pr-4">$40</td>
                  <td className="text-right py-2 pr-4">$43</td>
                  <td className="text-right py-2 pr-4">$45</td>
                  <td className="text-right py-2">$53</td>
                </tr>
                <tr>
                  <th scope="row" className="text-left py-2 pr-4 font-normal">
                    12+12 mm
                  </th>
                  <td className="text-right py-2 pr-4">$52</td>
                  <td className="text-right py-2 pr-4">$55</td>
                  <td className="text-right py-2 pr-4">$57</td>
                  <td className="text-right py-2">$65</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <h2 id="cost-calculator">Calculate your interlayer cost delta</h2>
        <p>
          The calculator below sits on top of a simple model with three
          inputs: the glass build-up (two symmetric lites), the interlayer
          type, and the order area in square meters. It multiplies the FOB
          per-m² glass index by two, adds the FOB per-m² interlayer index for
          the type you pick, and compares that number against a standard-PVB
          baseline at the same build-up. The output tells you both the
          per-m² subtotal and the dollar premium — or saving — across the
          whole order. It is a planning estimate, not a quotation; actual
          contract prices depend on panel size, order volume, specification
          detail, and the current float-glass and interlayer markets.
        </p>

        <InterlayerCostCalculator />

        <CostDisclaimer />

        <h2 id="sgp-uplift">
          What SGP actually delivers for the premium
        </h2>
        <p>
          The question we get most often is: why would anyone pay 4 times the
          interlayer cost? The short answer is three things that PVB cannot
          deliver at any thickness.
        </p>
        <p>
          <strong>Composite action under long load.</strong> At 24-hour load
          and room temperature, PVB has a shear modulus of roughly 0.6 MPa —
          soft enough that the two glass lites behave almost independently.
          SGP sits at 65 to 100 MPa, nearly two orders of magnitude stiffer,
          and the laminate acts as a single composite plate. For a given
          thickness, that composite action can halve the deflection of a
          structural glass fin, a canopy, or a frameless balustrade. The
          analysis method is spelled out in{' '}
          <a
            href="https://www.astm.org/e1300-16.html"
            rel="nofollow noopener"
            target="_blank"
          >
            ASTM E1300
          </a>
          's effective thickness approach.
        </p>
        <p>
          <strong>Post-breakage retention.</strong> When both lites of a PVB
          laminate crack, the PVB stretches and the panel sags visibly within
          minutes — the fragments stay in place but the panel is structurally
          finished. SGP, bonded chemically to the glass surface, keeps a
          cracked panel standing rigid for hours. In our bench tests at the
          Wuhan plant a 10-1.52-10 SGP balustrade panel, broken on both lites
          with a center-impact test, stayed cantilevered within its base shoe
          for the duration of the inspection — more than 4 hours. The same
          panel in PVB had sagged visibly before we finished taking photos.
        </p>
        <p>
          <strong>Edge durability.</strong> PVB is hygroscopic — it absorbs
          moisture — and at an exposed edge in a humid or coastal climate it
          will cloud and then delaminate within 3 to 7 years. SGP is
          hydrophobic. Open-edge SGP details have been in service in tropical
          Asia for 15 to 20 years without visible edge degradation. If the
          spec includes exposed edges or the climate is humid, SGP is often
          not a performance upgrade — it is the only option that will survive
          the warranty period.
        </p>
        <p>
          What SGP does not do: it is not an acoustic upgrade. Standard PVB
          outperforms SGP at the same build-up on STC rating; acoustic PVB
          outperforms both. If the driving requirement is noise, SGP is the
          wrong tool.
        </p>

        <h2 id="performance-matrix">
          Performance per dollar, side by side
        </h2>
        <p>
          Five metrics decide most interlayer specifications in practice:
          post-breakage retention, long-duration shear modulus, edge
          weathering, STC rating at a reference 6+6 build-up, and interlayer
          material cost itself. The matrix below plots all five across the
          three interlayer types using indicative values from our Wuhan line
          and published supplier datasheets. SGP wins decisively on retention,
          stiffness, and edge durability. Standard PVB wins on cost. Acoustic
          PVB wins on STC. No interlayer wins on everything — which is why
          this article exists.
        </p>

        <PerformanceVsCostMatrix />

        <h2 id="scenarios">Six real-world specification scenarios</h2>
        <p>
          Abstract trade-offs land better against concrete projects. Here are
          six scenarios from the last two years of our export work, with the
          interlayer we specified and the reason.
        </p>
        <ol>
          <li>
            <strong>Office tower facade, 6 to 12 story commercial.</strong>{' '}
            Standard PVB laminated outer lite in Low-E IGU. Driving reason:
            safety glazing with no structural or acoustic premium required.
            SGP would add roughly 25 percent to the facade glass budget for
            no measurable project benefit.
          </li>
          <li>
            <strong>Frameless mezzanine balustrade, public building.</strong>{' '}
            10-1.52-10 SGP laminated, heat-soaked. Driving reasons:
            cantilever load case plus EN 12600 Class 1(B)1 impact plus
            open-top edge detail plus 15-year warranty requirement. Standard
            PVB would meet none of these. Read{' '}
            <a href="/blog/balustrade-glass-specification">
              our balustrade specification guide
            </a>{' '}
            for the full load-case math.
          </li>
          <li>
            <strong>Overhead glass canopy, 2.4 m span.</strong> 8-1.52-8 SGP,
            heat-soaked. Driving reasons: overhead safety requires both lites
            fully retained post-breakage, and the span is too long for PVB
            composite action under snow load. SGP is the default for overhead
            structural glass in every code we work to.
          </li>
          <li>
            <strong>Airport-adjacent office partition.</strong> 6-0.76-6
            acoustic PVB. Driving reason: STC 40 target drove the choice.
            Standard PVB maxed out at STC 36 in the mock-up test; SGP tested
            at 35 and failed; acoustic PVB delivered 39-40 on the specific
            glass build-up. Pure acoustic-driven selection, cost difference
            was secondary.
          </li>
          <li>
            <strong>Coastal villa frameless shower enclosure.</strong>{' '}
            10 mm monolithic tempered, not laminated. Driving reason: enclosed
            edge-sealed detail with gaskets removed the humidity issue, and a
            single-ply tempered meets the thickness and safety spec. This is
            a case where neither PVB nor SGP are the answer — a reminder that
            not every project needs a laminate. See{' '}
            <a href="/blog/shower-glass-thickness-guide">
              our shower glass thickness guide
            </a>{' '}
            for the full decision tree.
          </li>
          <li>
            <strong>Museum display case, high-value exhibit.</strong>{' '}
            12-1.52-12 SGP laminated, low-iron glass. Driving reasons:
            curator required a 20-year warranty against delamination and the
            specification called for structural glass fins supporting
            cross-panels at open-edge joints. Standard PVB would have failed
            the warranty requirement and the open-edge detail.
          </li>
        </ol>

        <h2 id="matcher">Match your project to the right interlayer</h2>
        <p>
          The matcher below takes those six scenarios and generalizes them
          into a weighted question flow. Each of the six questions —
          application type, panel span, load case, long-term edge exposure,
          acoustic target, and warranty period — contributes points to the
          score of each interlayer. The matcher does not let any single
          question decide; the final recommendation is the highest-scoring
          interlayer across all six answers. If you want to challenge the
          output, change one answer at a time and watch the score band shift.
        </p>

        <UseCaseMatcher />

        <h2 id="hidden-costs">Hidden costs most buyers miss</h2>
        <p>
          The interlayer line on a quotation is the visible part of the cost.
          Three line items that rarely appear on the quote matter just as
          much:
        </p>
        <p>
          <strong>Edge sealing.</strong> A PVB laminate at an exposed edge in
          a humid environment typically needs a structural silicone edge seal
          to delay delamination — add roughly USD 2 to 4 per linear meter of
          edge, plus the labor to apply it on site, plus the inspection
          regime. An SGP laminate at the same edge needs no sealant. On a
          project with 300 linear meters of exposed-edge glass, that is a
          USD 600 to 1,200 line item that silently disappears in the SGP
          scenario. Spec it in the comparison or you will under-price PVB.
        </p>
        <p>
          <strong>Delamination risk and warranty remediation.</strong> We
          have replaced open-edge PVB balustrade panels in year 4 to 6 of
          service on three projects. The replacement glass is a small fraction
          of the all-in cost — removal, replacement, scaffolding, downtime,
          and consultant fees typically run 3 to 5 times the glass itself.
          Baking in a reasonable probability of early PVB replacement in a
          humid open-edge detail usually swings the lifetime cost toward SGP.
        </p>
        <p>
          <strong>Panel-size uplift from thinner build-ups.</strong> SGP
          composite action often lets you specify a thinner laminate for the
          same deflection target. A 10-1.52-10 PVB balustrade may need to
          become 12-1.52-12 to meet the deflection limit; the same panel in
          SGP can stay at 10-1.52-10 and still pass. The thinner SGP panel
          weighs less, costs less to ship, and sometimes allows slimmer
          hardware. Add this effect to your comparison when the glass is
          structurally loaded, not just safety-glazed.
        </p>

        <h2 id="lifecycle-roi">A lifecycle ROI framework</h2>
        <p>
          A fair cost comparison looks at year 0 (purchase and install),
          year 5 (first likely PVB edge issue in a humid detail), and year 15
          (SGP warranty horizon). On a frameless balustrade project with
          exposed edges, the typical ten-year cost math our export buyers see
          is:
        </p>
        <ul>
          <li>
            PVB laminate year 0: lowest cost. Year 5: likely edge delamination
            on a fraction of panels; remediation cost often matches 30-50
            percent of original glass budget. Year 10: full re-glaze
            increasingly likely.
          </li>
          <li>
            SGP laminate year 0: 20-30 percent cost premium at the glass line
            item, offset partly by thinner build-up and no edge sealant.
            Year 5: no edge issue. Year 10: no edge issue, well inside the
            warranty horizon.
          </li>
        </ul>
        <p>
          The framework we use with clients is simple: if the application is
          structural or safety-critical, or if the edge is exposed or the
          climate is humid, or if the warranty is 10 years or longer, SGP
          nearly always wins on lifecycle cost even where PVB wins on day 0.
          Everywhere else — framed facade IGUs, interior partitions,
          dry-interior safety glazing — standard PVB is the right call. The
          grey zone is the 1.5 to 2.5 m span, medium-load, moderate-exposure
          project; that is exactly where the matcher above earns its keep.
        </p>

        <LeadMagnetCTA
          variant="inline"
          articleSlug={SLUG}
          title="Free: Global Architectural Glass Building Codes Comparison"
          description="A side-by-side 11-page PDF covering US IBC, EU EN, China GB, and Australia AS requirements for laminated glass across all common applications. Free for architects, specifiers, and procurement teams."
        />

        <p className="text-sm text-[#8B95A5] mt-6">
          For the pillar view of how this product-level decision fits into a complete architectural glass specification, see our <a href="/blog/architectural-glass-specification-guide" className="text-[#DAA745] hover:underline">architectural glass specification guide</a>.
        </p>

        <FAQ items={faqItems} />

        <RelatedProductsCards
          slugs={article.relatedProductSlugs || ['laminated-glass', 'tempered-glass', 'insulated-glass']}
        />
      </BlogArticleLayout>
    </>
  );
}
