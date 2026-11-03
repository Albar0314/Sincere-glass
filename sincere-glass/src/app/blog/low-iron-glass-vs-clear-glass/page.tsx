import type { Metadata } from "next";
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from "@/components/blog/BlogArticleLayout";
import TLDRBox from "@/components/blog/TLDRBox";
import FAQ from "@/components/blog/blocks/FAQ";
import TechNote from "@/components/blog/blocks/TechNote";
import CostDisclaimer from "@/components/blog/CostDisclaimer";
import LeadMagnetCTA from "@/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/components/blog/RelatedProductsCards";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";
import { blogArticles } from "@/lib/blog-registry";
import { makeAlternates } from "@/lib/i18n";
import EdgeColorViewer from "@/components/blog/article-25/EdgeColorViewer";
import LightTransmittanceComparator from "@/components/blog/article-25/LightTransmittanceComparator";
import CostPremiumCalculatorV2 from "@/components/blog/article-25/CostPremiumCalculatorV2";

const SLUG = "low-iron-glass-vs-clear-glass";
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc: TOCItem[] = [
  { id: "verdict", text: "The 15-Second Verdict", level: 2 },
  { id: "edge-test", text: "See It Side by Side: The Green Edge Test", level: 2 },
  { id: "iron-story", text: "Why Clear Glass Is Not Actually Clear", level: 2 },
  { id: "transmittance", text: "Light Transmittance: The 91% vs 83% Gap", level: 2 },
  { id: "where-low-iron", text: "Where Low Iron Earns Its 15 to 40% Premium", level: 2 },
  { id: "where-clear", text: "Where Clear Glass Is Still the Right Call", level: 2 },
  { id: "cost", text: "The Real Cost Delta: Not Just Material", level: 2 },
  { id: "procurement", text: "Procurement Reality: MOQ, Lead Time, Brand Tiers", level: 2 },
  { id: "faq", text: "Frequently Asked Questions", level: 2 },
];

const faqItems = [
  {
    q: "Is low iron glass the same as Starphire or Optiwhite?",
    a: "Starphire (Vitro) and Optiwhite (Pilkington) are brand-name low iron glass products. The underlying material is the same category: soda-lime float glass with Fe2O3 content reduced to under 0.015% from the roughly 0.10% in standard clear. Chinese and other Asian producers (including Sincere Glass) supply low iron substrates that meet or beat the same optical specs at a different price tier.",
  },
  {
    q: "Can I temper low iron glass? Can I laminate it?",
    a: "Yes to both. Low iron glass tempers and laminates the same way as standard clear. The low iron substrate carries through the fabrication step, so a 10 mm low iron tempered panel has the same breakage behavior as a 10 mm clear tempered panel but keeps its near-colorless edge. Processing adders (tempering, PVB or SGP lamination) are identical to clear.",
  },
  {
    q: "What is the minimum order quantity for low iron glass from a Chinese factory?",
    a: "Low iron MOQ is typically higher than clear because fewer factories stock the raw substrate. For Sincere Glass the practical MOQ is a 20 ft container for processed low iron (approximately 350 m2 of 10 mm panels). Below that we can still quote but lead time stretches to 5 to 7 weeks while we batch with other low iron orders.",
  },
  {
    q: "What is the lead time for low iron glass vs clear?",
    a: "For in-stock substrates, lead time for processed clear glass is 3 to 4 weeks. Low iron typically runs 4 to 6 weeks because raw substrate inventory is thinner. For jumbo sizes above 3 m x 6 m, add 1 to 2 weeks to either timeline.",
  },
  {
    q: "Does low iron glass have a certification standard?",
    a: "There is no dedicated ISO or ASTM standard for low iron glass. Low iron substrates are tested to the same optical and mechanical standards as standard clear: EN 410 for optical properties, EN 572 for soda-lime silicate float glass, and GB 11614 in China. The low iron designation refers specifically to iron oxide content; certifications cover the glass itself.",
  },
  {
    q: "How can a buyer verify a shipment is actually low iron and not standard clear?",
    a: "Three practical checks: compare the edge color of a sample to a known clear sample under daylight (clear shows green, low iron shows faint blue-white or near-colorless at 10 mm and up); request the raw substrate mill test report (MTR) from the factory, which lists Fe2O3 content; and if the project is high-value, specify third-party VLT and color measurement to EN 410 as a shipment release condition. Honest factories will provide the MTR without pushback.",
  },
];

export default function Page() {
  const schemas = articleJsonLd(article, faqItems);

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox
          takeaways={[
            "Clear float glass is not actually clear. Standard soda-lime glass carries roughly 0.10% iron oxide (Fe2O3), which absorbs red wavelengths and produces the characteristic green edge visible on any thicker piece.",
            "Low iron glass cuts Fe2O3 to under 0.015%. The result is a near-colorless substrate with 91% VLT (vs 83 to 89% for clear) and CRI near 99 (vs 95 to 97 for clear).",
            "The price premium is 15 to 40% at the raw substrate level and grows in absolute terms with thickness and quantity. For 10 mm tempered at mid-sized panels and 50 units it is often in the $8 to $15 per m2 range.",
            "Low iron is the correct spec for showroom vitrines, aquariums, art frames, high-end retail, jewelry displays and any laminated or IGU build-up thicker than roughly 15 mm.",
            "For most curtain wall, back-painted spandrel, interior partition and non-safety applications where the glass is viewed face-on and not edge-on, standard clear is the honest choice.",
          ]}
        />

        <h2 id="verdict">The 15-Second Verdict</h2>
        <p>
          <strong>If you can see the edge of the glass, or if color fidelity through the glass matters, specify low iron.</strong>
          Otherwise clear glass is the honest choice. The premium ranges from 15 to 40%, driven almost entirely by raw substrate cost.
          Processing adders (tempering, lamination, IGU assembly) are the same for both.
        </p>
        <p>
          Low iron matters most in two scenarios: when the viewer sees the edge (vitrines, balustrades, aquariums, floor glass), and
          when the glass is thick enough that the longer light path through it turns clear noticeably green (anything above roughly
          10 mm monolithic, or any laminated build-up above 12 mm).
        </p>

        <h2 id="edge-test">See It Side by Side: The Green Edge Test</h2>
        <p>
          The fastest way to tell low iron from clear is the edge test. Stand both samples upright on a white surface, look at them from the
          side under daylight, and compare the color of light passing through the glass edge-on. Clear glass shows a progression from pale
          green at 6 mm to bottle-green at 19 mm. Low iron shows a near-colorless edge at every thickness, with only a faint cool tint at
          the thickest substrates.
        </p>
        <p>
          The viewer below lets you flip through 6 mm, 10 mm, and 19 mm thicknesses and read how the edge color shifts for each. The 10 mm
          case is the one that trips up most interior designers who assumed clear was clear enough. Edge color at 10 mm is unmistakably
          green under showroom lighting and visibly degrades jewelry, cosmetic, and art displays.
        </p>

        <EdgeColorViewer />

        <h2 id="iron-story">Why Clear Glass Is Not Actually Clear: The Iron Oxide Story</h2>
        <p>
          Soda-lime glass is roughly 72% silica (SiO2), 14% sodium oxide (Na2O), 10% calcium oxide (CaO), and a few percent of other
          oxides. Among those others is iron oxide (Fe2O3), present in standard clear float at roughly 0.08 to 0.12%. Iron is not added
          deliberately; it enters as a contaminant in the silica sand and other raw materials.
        </p>
        <p>
          Iron oxide absorbs selectively in the red and near-infrared bands of the visible spectrum. The eye perceives this as a shift
          toward green. In a thin pane the shift is subtle. In a thick pane or a laminated stack the longer light path magnifies the
          absorption and the green becomes dominant at the edge.
        </p>
        <p>
          Low iron glass solves this by starting from purified silica sand (iron content under 0.02%) and controlling other raw material
          inputs to keep total Fe2O3 under 0.015%. The result is a substrate with 2 to 6 percentage points higher visible light
          transmittance, a near-perfect color rendering index, and a near-colorless edge.
        </p>

        <TechNote type="note" title="Fe2O3 content at a glance">
          Standard clear float: 0.08 to 0.12% Fe2O3. Low iron float: under 0.015% Fe2O3. Ultra-low iron (jewelry-grade): under 0.008% Fe2O3,
          available but rarely needed outside museum and scientific applications.
        </TechNote>

        <h2 id="transmittance">Light Transmittance: The 91% vs 83% Gap</h2>
        <p>
          Visible light transmittance (VLT) is the single most-cited spec in low iron marketing. At 6 mm, standard clear is around 89% and
          low iron is around 91%. That 2-point gap sounds small until you add thickness or an interlayer. At a 10 mm monolithic pane the
          gap widens to roughly 4 points. At a 6-1.52-6 PVB laminated build-up (12.5 mm total) it is 5 points. At an IGU with soft-coat
          Low-E on surface 2, the Low-E coating dominates and the gap narrows again to around 4 points.
        </p>
        <p>
          The comparator below walks through three representative constructions. Note how the Color Rendering Index (CRI) tracks the same
          pattern: low iron maintains CRI near 99 across constructions, which is why high-end retailers and museums specify it. For
          curtain-wall-grade IGUs with Low-E, the CRI gap narrows but is still perceptible to color-critical interior lighting designers.
        </p>

        <LightTransmittanceComparator />

        <h2 id="where-low-iron">Where Low Iron Earns Its 15 to 40% Premium</h2>
        <p>Low iron is the correct spec in these four scenarios:</p>
        <ol>
          <li>
            <strong>Edge-visible glass.</strong> Vitrines, display cases, museum frames, jewelry counters, back-painted spandrel used
            edge-first, floor glass, aquarium viewing panels. Anywhere the viewer sees the glass thickness, not just the glass face.
          </li>
          <li>
            <strong>Thick laminated or IGU build-ups.</strong> Any lami over 15 mm total, any IGU over 32 mm total. The compound thickness
            through two or three lites plus interlayers amplifies the green bias of clear.
          </li>
          <li>
            <strong>Color-critical displays.</strong> Luxury retail (handbags, cosmetics, watches), art galleries, high-end automotive
            showrooms, premium food retail (bakery, patisserie, meat counters). CRI below 97 shifts color on the goods.
          </li>
          <li>
            <strong>Transparent architecture.</strong> All-glass storefronts, glass fins, glass staircases, overhead glazing where the glass
            is seen edge-on from street level. In these builds low iron reads as a quality signal; clear reads as a cost cut.
          </li>
        </ol>

        <InlineQuoteCTA variant="default" />

        <h2 id="where-clear">Where Clear Glass Is Still the Right Call</h2>
        <p>
          The industry has drifted toward specifying low iron by reflex. For a working factory selling into real projects, we think that is
          wasteful. Clear glass remains the honest choice in these cases:
        </p>
        <ol>
          <li>
            <strong>Spandrel glass with opaque back coating.</strong> The viewer never sees through the glass. Low iron is money burned.
          </li>
          <li>
            <strong>Standard commercial curtain wall with Low-E IGU.</strong> At 6 or 8 mm panes with a Low-E coating, the coating
            dominates the optical character and the iron content gap is barely perceptible from the sidewalk.
          </li>
          <li>
            <strong>Back-painted glass for kitchen or bath splashes.</strong> The paint reads through the glass face; iron edge color is
            not visible unless the installer chamfers the exposed edge.
          </li>
          <li>
            <strong>Industrial or warehouse glazing.</strong> Where the brief is daylight and weather closure, not aesthetic.
          </li>
          <li>
            <strong>Interior partitions with tempered 10 or 12 mm.</strong> If the design detail hides the edge in a floor shoe or ceiling
            channel, the green edge does not read; clear is 20 to 30% cheaper and performs identically.
          </li>
        </ol>

        <h2 id="cost">The Real Cost Delta: Not Just Material</h2>
        <p>
          The low iron premium at the raw substrate is roughly 30 to 50% for a given thickness. In a finished panel the premium shrinks
          because processing adders (tempering, lamination, IGU assembly, edge polish, holes and notches) are the same for both substrates.
          A quick way to think about it: the thicker the glass and the simpler the processing, the closer the finished panel premium stays
          to the raw substrate premium. The thinner the glass and the heavier the processing, the more the premium gets diluted by shared
          process costs.
        </p>
        <p>
          Try the calculator below with your real panel size, quantity, thickness, and processing to see the delta on your project. The
          numbers are FOB Wuhan benchmarks for Sincere Glass orders in late 2026; they will differ for other suppliers and other
          shipping terms, but the ratios are structural.
        </p>

        <CostPremiumCalculatorV2 />

        <CostDisclaimer variant="default" />

        <LeadMagnetCTA
          variant="inline"
          articleSlug={SLUG}
          title="Global Architectural Glass Building Codes Comparison"
          description="Download our 11-page reference covering US IBC/ASTM, EU EN, China GB, and Australia AS code requirements for tempered, laminated, insulated, and Low-E glass applications."
        />

        <h2 id="procurement">Procurement Reality: MOQ, Lead Time, Brand Tiers</h2>
        <p>
          Low iron glass procurement differs from standard clear in three practical ways that affect schedule and budget.
        </p>
        <p>
          <strong>Brand tiers.</strong> The industry splits roughly into three price bands. Vitro Starphire and Pilkington Optiwhite sit at
          the top tier, priced at a 60 to 80% premium over the equivalent clear product and typically specified for North American and
          European flagship projects. Guardian UltraClear and NSG Pilkington Optiwhite sit in a middle tier at 40 to 60% premium.
          Chinese-sourced low iron (CSG, Xinyi, Taiwan Glass, and smaller fabricators who buy their raw substrate from these mills) sits
          at a 20 to 40% premium for equivalent optical performance. The spec sheet differences between tiers are measurable but small;
          the project brief dictates which tier is defensible.
        </p>
        <p>
          <strong>MOQ and lead time.</strong> Standard clear is stocked almost everywhere. Low iron substrate is stocked by fewer mills and
          fewer fabricators carry it as inventory. Expect MOQ to be higher (typically a 20 ft container of processed panels, roughly 350
          to 400 m2 of 10 mm) and lead time to be 1 to 2 weeks longer than clear. For jumbo sizes above our 3.3 m x 15 m furnace limit the
          lead time penalty grows further.
        </p>
        <p>
          <strong>Verification.</strong> Because the price gap between low iron and clear is 15 to 40%, the temptation to substitute is
          real. Reputable factories (ours included) will supply the raw substrate mill test report (MTR) listing Fe2O3 content on request.
          For high-value projects the project team should specify MTR submission as a shipment release condition and keep sample panels on
          file for comparison.
        </p>

        <section className="my-10 overflow-x-auto">
          <table className="w-full border-collapse text-sm" aria-label="Low iron glass vs clear glass procurement comparison">
            <caption className="mb-3 text-left text-xs italic text-slate-500">
              Procurement comparison: Low iron vs standard clear for a typical 10 mm tempered order. FOB Wuhan, 2026 Q3-Q4. Data verified: 2026-11.
            </caption>
            <thead>
              <tr className="border-b-2 border-slate-300 text-left">
                <th scope="col" className="py-2 pr-4">Attribute</th>
                <th scope="col" className="py-2 pr-4">Standard Clear</th>
                <th scope="col" className="py-2">Low Iron</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <th scope="row" className="py-2 pr-4 text-left font-medium text-slate-700">Raw substrate price delta</th>
                <td className="py-2 pr-4">Baseline</td>
                <td className="py-2">+30 to 50%</td>
              </tr>
              <tr className="border-b border-slate-200">
                <th scope="row" className="py-2 pr-4 text-left font-medium text-slate-700">Finished panel premium (typical)</th>
                <td className="py-2 pr-4">Baseline</td>
                <td className="py-2">+15 to 40%</td>
              </tr>
              <tr className="border-b border-slate-200">
                <th scope="row" className="py-2 pr-4 text-left font-medium text-slate-700">Practical MOQ (processed)</th>
                <td className="py-2 pr-4">1 pallet (roughly 20 m2)</td>
                <td className="py-2">1 x 20 ft container (roughly 350 m2 of 10 mm)</td>
              </tr>
              <tr className="border-b border-slate-200">
                <th scope="row" className="py-2 pr-4 text-left font-medium text-slate-700">Lead time (processed)</th>
                <td className="py-2 pr-4">3 to 4 weeks</td>
                <td className="py-2">4 to 6 weeks</td>
              </tr>
              <tr className="border-b border-slate-200">
                <th scope="row" className="py-2 pr-4 text-left font-medium text-slate-700">Jumbo panel availability</th>
                <td className="py-2 pr-4">Up to 3.3 m x 15 m</td>
                <td className="py-2">Up to 3.3 m x 15 m (longer lead time)</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 pr-4 text-left font-medium text-slate-700">Verification method</th>
                <td className="py-2 pr-4">Not usually required</td>
                <td className="py-2">Request MTR; specify EN 410 VLT measurement as release condition</td>
              </tr>
            </tbody>
          </table>
        </section>

        <h2 id="faq">Frequently Asked Questions</h2>
        <FAQ items={faqItems} />

        <section className="my-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="mb-3 text-base font-semibold text-slate-900">Keep reading in the Low Iron cluster</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/blog/low-iron-glass-complete-guide" className="text-amber-700 hover:underline">
                Low Iron Glass: The Complete Guide (Pillar)
              </a>
              <span className="text-slate-500"> - what it is, where it belongs, when to specify it</span>
            </li>
            <li>
              <a href="/blog/architectural-glass-types-guide" className="text-amber-700 hover:underline">
                Architectural Glass Types: Buyer Guide
              </a>
              <span className="text-slate-500"> - five families, nine products, one decision framework</span>
            </li>
            <li>
              <a href="/blog/architectural-glass-china-buyer-guide" className="text-amber-700 hover:underline">
                Sourcing Architectural Glass from China
              </a>
              <span className="text-slate-500"> - supplier tiers, MOQ, QC, shipping</span>
            </li>
          </ul>
        </section>

        <RelatedProductsCards
          slugs={["laminated-glass", "tempered-glass", "insulated-glass"]}
          heading="Products commonly specified with Low Iron substrate"
        />
      </BlogArticleLayout>
    </>
  );
}
