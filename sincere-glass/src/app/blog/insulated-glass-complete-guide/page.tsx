import type { Metadata } from "next";
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from "@/components/blog/BlogArticleLayout";
import TLDRBox from "@/components/blog/TLDRBox";
import FAQ from "@/components/blog/blocks/FAQ";
import TechNote from "@/components/blog/blocks/TechNote";
import LeadMagnetCTA from "@/components/blog/LeadMagnetCTA";
import CostDisclaimer from "@/components/blog/CostDisclaimer";
import RelatedProductsCards from "@/components/blog/RelatedProductsCards";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";
import { blogArticles } from "@/lib/blog-registry";
import { makeAlternates } from "@/lib/i18n";

import IGUConfigurator from "@/components/blog/article-26/IGUConfigurator";
import ThermalPerformanceChart from "@/components/blog/article-26/ThermalPerformanceChart";
import CondensationRiskSimulator from "@/components/blog/article-26/CondensationRiskSimulator";

const SLUG = "insulated-glass-complete-guide";
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc: TOCItem[] = [
  { id: "verdict", text: "The 60-Second Verdict", level: 2 },
  { id: "what-is-igu", text: "What Is an Insulated Glass Unit", level: 2 },
  { id: "anatomy", text: "IGU Anatomy: Five Components That Decide 25-Year Life", level: 2 },
  { id: "performance", text: "Performance: U-Value, SHGC, VLT, STC", level: 2 },
  { id: "buildup", text: "Build-Up Decision by Climate", level: 2 },
  { id: "condensation", text: "Condensation: The Spec Most People Skip", level: 2 },
  { id: "standards", text: "Standards and Certifications", level: 2 },
  { id: "jumbo", text: "Jumbo IGU: When Panel Size Changes the Rulebook", level: 2 },
  { id: "procurement", text: "Procurement Reality", level: 2 },
  { id: "faq", text: "Frequently Asked Questions", level: 2 },
];

const faqItems = [
  {
    q: "Is insulated glass the same as double pane glass?",
    a: "Yes, in the consumer window market the terms are used interchangeably. In architectural and commercial contexts, Insulated Glass Unit (IGU) is the precise term. An IGU is any multi-pane sealed unit with a gas-filled or air-filled cavity. Double pane is the most common form; triple pane IGUs are increasingly specified in cold climates and for passive-house construction.",
  },
  {
    q: "How long does an IGU last before seal failure?",
    a: "A properly manufactured dual-seal IGU (PIB primary seal plus silicone or polysulfide secondary seal) lasts 20 to 30 years. Single-seal budget IGUs typically fail at 10 to 15 years with visible fogging between panes. Edge-of-glass temperature swings, UV degradation of the secondary seal, and manufacturing defects (incomplete seal coverage, wet desiccant, improper argon fill) are the three main failure drivers.",
  },
  {
    q: "What is the right cavity width for an IGU?",
    a: "For air fill, 12 to 16 mm is optimal: below 12 mm conduction dominates, above 16 mm convection currents reduce performance. For argon fill, 12 to 16 mm is also the sweet spot. For krypton fill (used in slim cavities), 6 to 9 mm is optimal because krypton's lower thermal conductivity offsets the reduced cavity width. Triple pane IGUs typically use two cavities of 12 to 14 mm each.",
  },
  {
    q: "Can I temper insulated glass? Can I laminate it?",
    a: "You do not temper or laminate the IGU as a finished unit. Instead, you temper or laminate the individual glass lites before IGU assembly. A standard specification might read 6TT-12Ar-6TT, meaning two 6 mm tempered lites with a 12 mm argon-filled cavity. Laminated lites in IGUs are common for safety glazing requirements or added sound attenuation; a typical spec is 66.2-12Ar-6TT, meaning a 6-1.52-6 PVB laminated outer lite plus a 6 mm tempered inner lite.",
  },
  {
    q: "What is the minimum order quantity for IGU from a Chinese factory?",
    a: "For Sincere Glass the practical MOQ for a fully processed IGU order is a 20 ft container, approximately 300 to 400 m2 of 6-12-6 units. Below that we can still quote but lead time stretches as we batch with other orders. For jumbo sizes above 3 m x 6 m, the MOQ is lower in panel count but the per-m2 price is higher due to handling complexity.",
  },
  {
    q: "What is the lead time for IGU from a Chinese factory?",
    a: "Standard commercial IGU (6-12A-6 or 6-12A-6 with Low-E) lead time from Sincere Glass is 4 to 6 weeks for a 20 ft container, starting after design freeze and drawing approval. Lead time grows with complexity: adding lamination adds 1 week, triple pane adds 1 to 2 weeks, jumbo sizes (above 3.3 m x 6 m) add 2 to 3 weeks. Shipping time is additional: 30 to 45 days ocean to US West Coast, 35 to 50 days to US East Coast or Europe.",
  },
  {
    q: "Is argon fill really worth the premium?",
    a: "For a build-up that already has Low-E coating, argon fill improves U-value by roughly 0.2 to 0.3 W/m2K at a cost adder of about 5 to 10%. For code compliance in cold climates (U below 1.4 W/m2K), argon is nearly mandatory. For warm climates where U is not the binding constraint, argon adds little real-world value and air fill is the honest choice. Krypton is typically only justified in slim-cavity applications where overall thickness is constrained.",
  },
  {
    q: "What is the difference between warm-edge spacer and aluminum spacer?",
    a: "Aluminum spacer is the industry baseline: conductive but mechanically simple. Warm-edge spacer uses a thermally broken material (stainless steel, structural foam, or thermoplastic) that reduces edge heat transfer by 30 to 50%. The practical impact is a 2 to 4 degree C warmer edge-of-glass surface, which reduces condensation risk at perimeter and improves the center-of-glass U-value marginally. Warm edge is standard on premium IGU specifications and adds roughly 10 to 15% to the IGU material cost.",
  },
];

export default function Page() {
  const schemas = articleJsonLd(article, faqItems);
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox
          takeaways={[
            "An IGU (Insulated Glass Unit) is a sealed multi-pane assembly with a gas or air cavity. The sealed cavity is the entire point: it adds thermal resistance that monolithic glass cannot.",
            "U-value is the single most-cited spec. A plain double IGU runs around 2.7 W/m2K. Add Low-E and argon and it drops to 1.3. Triple IGU with dual Low-E hits 0.6 to 0.8.",
            "The five components (2 to 3 glass lites, spacer bar, desiccant, primary PIB seal, secondary silicone seal) each decide a different failure mode. The secondary seal decides 25-year life.",
            "For cold climates (Zone 5 and above, or Chinese severe-cold regions) the right spec is triple IGU with argon and dual Low-E (U below 1.0). For temperate climates, double IGU with Low-E and argon (U around 1.3) is the honest choice. Hot climates optimize for low SHGC, not low U.",
            "Jumbo IGUs above 3 m x 6 m require upgraded spacer rigidity, structural glass, and certified autoclave bonding. Our Wuhan facility manufactures to 3.3 m x 15 m on dedicated jumbo lines.",
          ]}
        />

        <h2 id="verdict">The 60-Second Verdict</h2>
        <p>
          <strong>Specify an insulated glass unit when the glass is a thermal boundary between two different environments.</strong> That covers nearly all facade, window, and rooflight applications in heated or cooled buildings. Choose the build-up based on climate and function: double IGU with Low-E and argon for temperate climates (U around 1.3 W/m2K), triple IGU with dual Low-E and argon or krypton for cold climates and passive-house projects (U below 1.0), double IGU with solar-control coating for hot climates (optimize SHGC, not U).
        </p>
        <p>
          The 25-year reliability of the IGU is decided at the edge seal, not at the glass. A dual-seal (PIB primary plus silicone secondary) IGU from a certified line lasts 20 to 30 years. A single-seal budget IGU fogs between panes at 10 to 15 years, often sooner in harsh climates. The seal choice is invisible on a spec sheet but decides whether the project needs reglazing in year 12 or year 28.
        </p>

        <h2 id="what-is-igu">What Is an Insulated Glass Unit (and What Isn't)</h2>
        <p>
          An insulated glass unit is two or three parallel glass lites separated by a hermetically sealed cavity of dry gas (air, argon, or krypton). The cavity is the functional part: it blocks conduction and convection far better than solid glass, which has a thermal conductivity of about 1 W/mK. A 24 mm thick monolithic glass panel has roughly the same U-value as a 6-12-6 air-filled IGU, but at eight times the weight and without the acoustic or coating flexibility.
        </p>
        <p>
          Terminology varies by market. In North American commercial contexts the term is IGU (Insulated Glass Unit). In European standards it is MIGU (Multi-pane Insulating Glass Unit). In Chinese standards it is zhong-kong boli (literally hollow glass). In consumer window retail the same product is called double pane or triple pane window. All refer to the same sealed-cavity construction; the spec sheets converge once you read past the branding.
        </p>
        <p>
          A laminated glass panel is not an IGU, even though it also has two lites. Laminated uses a solid PVB or SGP interlayer with no gas cavity; it is safety glass, not insulating glass. The two often appear in combination (a laminated lite inside an IGU is a common safety plus thermal spec for curtain wall), but they solve different problems.
        </p>

        <h2 id="anatomy">IGU Anatomy: Five Components That Decide 25-Year Life</h2>
        <p>
          An IGU is deceptively simple on a drawing: two glass lites with a spacer between them. On the production floor it is a five-component sealed system, and each component owns a different failure mode.
        </p>
        <ol>
          <li>
            <strong>Glass lites (2 for double, 3 for triple).</strong> Can be clear, tinted, Low-E coated, tempered, heat-strengthened, or laminated. Each lite is selected for its role: outer for solar control, inner for safety and sound.
          </li>
          <li>
            <strong>Spacer bar.</strong> Holds the lites parallel at the specified cavity width. Aluminum is the industry baseline; warm-edge spacer (thermally broken) cuts edge heat transfer by 30 to 50% and reduces perimeter condensation.
          </li>
          <li>
            <strong>Desiccant.</strong> Molecular-sieve beads packed inside the spacer bar. Absorbs residual moisture in the cavity during the first year of service. Prevents internal fogging when the gas cools.
          </li>
          <li>
            <strong>Primary seal (PIB, polyisobutylene).</strong> A thin black butyl seal applied directly between the glass and the spacer. Its job is gas-tightness: it prevents argon loss and moisture ingress. PIB has excellent gas-barrier properties but zero structural strength.
          </li>
          <li>
            <strong>Secondary seal (silicone or polysulfide).</strong> A structural seal applied around the perimeter outside the spacer. It carries all the mechanical load from differential pressure, thermal cycling, and installation stress. The secondary seal is what decides whether the IGU survives 25 years of climate cycling.
          </li>
        </ol>
        <p>
          Budget IGUs from entry-tier suppliers use a single hot-melt seal that tries to do both jobs. It fails at either gas retention or mechanical durability within 10 to 15 years. The dual-seal construction is the industry standard for architectural applications and the one a specifier should insist on.
        </p>

        <TechNote type="tip" title="How to spot a dual-seal IGU on a sample">
          Look at the edge of the glass. You will see a thin black line immediately adjacent to the glass (the PIB primary seal) and a wider silver-grey or black band outside it (the secondary structural seal). A single uniform black strip from glass to glass edge is a single-seal unit; decline it for architectural work.
        </TechNote>

        <h2 id="performance">Performance: U-Value, SHGC, VLT, STC</h2>
        <p>
          Four numbers decide IGU selection. The chart below compares six representative build-ups across all four; switch between metrics to see how each construction trades off against the others. Use these numbers to narrow a spec, not as the final word: coating supplier, spacer type, and edge treatment shift results by 10 to 20% in either direction.
        </p>

        <ThermalPerformanceChart />

        <p>
          <strong>U-value</strong> measures heat transfer through the assembly per degree of temperature difference. Lower is better. Code minimums vary: US IECC 2024 Zone 5 (cold) requires U at or below 1.5 W/m2K for window assemblies; EN standards for Passive House require U at or below 0.8. Chinese GB 50189 for severe-cold regions requires U at or below 1.5 for commercial curtain wall.
        </p>
        <p>
          <strong>SHGC</strong> (Solar Heat Gain Coefficient) measures how much of the sun's heat passes through the glass. In cold climates you want SHGC above 0.5 to capture free winter heating. In hot climates you want SHGC below 0.3 to minimize cooling load. The conflict between U-value and SHGC optimization is why there is no single "best" IGU: the right spec depends on climate zone.
        </p>
        <p>
          <strong>VLT</strong> (Visible Light Transmittance) is the fraction of visible light that passes through. High-VLT units (above 70%) read as bright and airy; low-VLT units (below 40%) read as tinted. Low-E coatings reduce VLT by 10 to 20 points relative to clear. Low iron substrates recover 2 to 6 points of that loss. For museum, gallery, and high-end retail applications, specify low iron with high-performance Low-E to balance light quality against energy performance.
        </p>
        <p>
          <strong>STC</strong> (Sound Transmission Class) measures acoustic performance. A standard double IGU scores STC 32 to 34. Asymmetric lite thickness (for example 4-12-6 instead of 6-12-6) adds 2 to 3 STC points by breaking the resonance frequency match. Adding a laminated lite with acoustic PVB can push STC above 40 for urban or airport-adjacent facades.
        </p>

        <h2 id="buildup">Build-Up Decision by Climate</h2>
        <p>
          The configurator below lets you set glass thickness, cavity width, gas fill and Low-E coating to see the resulting U-value, SHGC, VLT and STC. Use it to converge on a spec for your climate and function, then verify against local code in the standards section further down.
        </p>

        <IGUConfigurator />

        <h3>Climate guidance</h3>
        <ul>
          <li>
            <strong>Severe cold (ASHRAE Zone 6-8, Chinese severe-cold):</strong> Triple IGU, 4-12Ar-4-12Ar-4 with Low-E on surfaces 2 and 5. Target U below 1.0 W/m2K. Specify warm-edge spacer.
          </li>
          <li>
            <strong>Cold (ASHRAE Zone 4-5, Chinese cold):</strong> Double IGU, 6-16Ar-6 with Low-E on surface 2. Target U at or below 1.4 W/m2K.
          </li>
          <li>
            <strong>Temperate (ASHRAE Zone 3, Chinese hot-summer cold-winter):</strong> Double IGU, 6-12Ar-6 with Low-E on surface 2. Target U around 1.5 to 1.8.
          </li>
          <li>
            <strong>Hot-humid (ASHRAE Zone 1-2, Chinese hot-summer warm-winter):</strong> Double IGU with solar-control Low-E on surface 2. Optimize for SHGC below 0.3, not for U. Argon still advisable to prevent cavity convection in high outdoor temperatures.
          </li>
          <li>
            <strong>Passive House certified:</strong> Triple IGU, krypton-filled in slim cavities, dual Low-E. Target U below 0.8 and whole-window U below 0.85.
          </li>
        </ul>

        <InlineQuoteCTA variant="default" />

        <h2 id="condensation">Condensation: The Spec Most People Skip</h2>
        <p>
          A curtain wall that meets code on U-value can still develop winter condensation on the room-side glass if the specification ignores dew-point math. Condensation forms when the inner glass surface temperature falls below the indoor dew point. Dew point rises with indoor humidity; surface temperature falls with poor glass performance and extreme outdoor cold. The simulator below shows how the three variables interact.
        </p>

        <CondensationRiskSimulator />

        <TechNote type="warning" title="Edge-of-glass is colder than center-of-glass">
          The simulator above estimates the center-of-glass surface temperature. The edge of the glass, within 60 mm of the spacer, is 2 to 4 degrees C colder due to conductive heat loss through the spacer and frame. For projects with high indoor humidity (laboratories, swimming pools, residential bathrooms) or severe outdoor cold, a build-up that passes center-of-glass dew-point math can still condense at the perimeter. Specify warm-edge spacer and consider the dew-point margin at the edge, not just the center.
        </TechNote>

        <h2 id="standards">Standards and Certifications</h2>
        <p>
          IGU performance is measured and certified against regional standards. Understanding which standard applies prevents the common procurement failure of specifying a European-certified unit for a US project (or vice versa) and discovering the certification does not transfer.
        </p>
        <ul>
          <li>
            <strong>IGCC (US):</strong> Insulating Glass Certification Council, administers ASTM E2190 testing for IGU durability. Certified units pass accelerated weather cycling simulating 20 to 25 years of service. Required by many US specifications and building codes.
          </li>
          <li>
            <strong>IGMA (US and Canada):</strong> Insulating Glass Manufacturers Alliance. Publishes IGMA TM-4100 technical manual that defines dual-seal construction and acceptable materials. Voluntary but widely followed.
          </li>
          <li>
            <strong>EN 1279 (EU):</strong> Seven-part European standard covering durability, gas leakage, gas concentration, and system description. Most comprehensive IGU standard globally. EN 1279-3 limits annual gas loss to 1% per year.
          </li>
          <li>
            <strong>GB/T 11944 (China):</strong> Chinese national standard for IGU. Specifies dew point, gas concentration, seal durability and dimensional tolerances. Required for Chinese commercial construction.
          </li>
          <li>
            <strong>NFRC 100 (US):</strong> National Fenestration Rating Council procedure for U-value measurement on whole-window assemblies. The number on a US window label.
          </li>
          <li>
            <strong>EN 673 (EU):</strong> European procedure for U-value calculation on center-of-glass. The number on a European IGU technical data sheet.
          </li>
        </ul>
        <p>
          Specifications often cite the regional standard and a U-value measured under that standard. Do not substitute an EN 673 number for an NFRC 100 number without a conversion: the test boundary conditions differ (EN uses 0 to 20 deg C, NFRC uses minus 18 to 21 deg C), so the same physical IGU returns different U-values in each test.
        </p>

        <h2 id="jumbo">Jumbo IGU: When Panel Size Changes the Rulebook</h2>
        <p>
          Standard IGU production tops out at around 3 m x 6 m on most lines. Above that size three things change: the spacer bar must become structurally rigid (standard aluminum spacers deflect), the glass lites typically must be tempered or heat-strengthened to resist wind load, and the secondary seal must be applied on a dedicated large-format assembly line to avoid partial coverage.
        </p>
        <p>
          Our Wuhan facility manufactures jumbo IGU up to 3.3 m x 15 m on dedicated lines, with jumbo tempering furnace and jumbo autoclave capacity matched to the IGU assembly. Projects specifying jumbo IGU should plan for 1 to 2 week lead time penalty, 30 to 50% per-m2 price premium over standard sizes, and crated land transport constraints (jumbo IGU shipping requires air-ride suspension flatbed with standing A-frame; container-only shipments cap at roughly 3 m x 6 m).
        </p>

        <h2 id="procurement">Procurement Reality: MOQ, Lead Time, Cost</h2>
        <p>
          IGU procurement from Chinese factories differs from retail glass in three practical ways: minimum order quantity is container-scale rather than pallet-scale, lead time is driven by autoclave batching and glass coating availability, and the cost reality is dominated by factory capacity and sea freight more than raw material.
        </p>
        <table>
          <caption>Procurement benchmarks: standard 6-12Ar-6 IGU with Low-E on surface 2. FOB Wuhan, 2026 Q3-Q4. Data verified: 2026-11.</caption>
          <thead>
            <tr>
              <th scope="col">Attribute</th>
              <th scope="col">Standard commercial IGU</th>
              <th scope="col">Premium IGU (triple pane, warm edge)</th>
              <th scope="col">Jumbo IGU (above 3 m x 6 m)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MOQ</td>
              <td>20 ft container, approx 300 m2</td>
              <td>20 ft container, approx 250 m2</td>
              <td>Negotiable, project-based</td>
            </tr>
            <tr>
              <td>Lead time (after design freeze)</td>
              <td>4 to 6 weeks</td>
              <td>5 to 8 weeks</td>
              <td>7 to 10 weeks</td>
            </tr>
            <tr>
              <td>FOB Wuhan reference price (USD per m2)</td>
              <td>45 to 65</td>
              <td>90 to 130</td>
              <td>140 to 220</td>
            </tr>
            <tr>
              <td>Shipping (ocean, to US East Coast)</td>
              <td>35 to 50 days, container</td>
              <td>35 to 50 days, container</td>
              <td>Breakbulk or air-ride flatbed</td>
            </tr>
            <tr>
              <td>Typical seal construction</td>
              <td>Dual seal, PIB + silicone</td>
              <td>Dual seal, PIB + silicone, warm-edge spacer</td>
              <td>Dual seal, structural silicone, reinforced spacer</td>
            </tr>
          </tbody>
        </table>

        <CostDisclaimer />

        <LeadMagnetCTA
          articleSlug={SLUG}
          variant="inline"
          title="Global Architectural Glass Building Codes Comparison"
          description="11-page reference covering US IBC/ASTM, EU EN, China GB and Australia AS requirements for tempered, laminated, insulated, and Low-E glass applications."
        />

        <h2 id="faq">Frequently Asked Questions</h2>
        {/* GROK-INSERT-V1:triple-pane */}
        <p className="my-6 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-slate-700">
          <strong>Related:</strong> Choosing between double and triple pane for your IGU spec? Full decision matrix, ROI calculator, and climate-zone guide:{" "}
          <a href="/blog/double-pane-vs-triple-pane-glass" className="font-semibold text-amber-700 underline underline-offset-2">
            Double Pane vs Triple Pane Glass: Is the Upgrade Worth It?
          </a>
        </p>

        <FAQ items={faqItems} title="Frequently Asked Questions" />

        <RelatedProductsCards slugs={["insulated-glass", "low-e-glass", "laminated-glass"]} heading="Products commonly specified as or with IGU construction" />
      </BlogArticleLayout>
    </>
  );
}
