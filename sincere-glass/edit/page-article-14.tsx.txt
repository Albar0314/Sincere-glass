import type { Metadata } from 'next';
import Script from 'next/script';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd } from '@/components/blog/BlogArticleLayout';
import TLDRBox from '@/components/blog/TLDRBox';
import LeadMagnetCTA from '@/components/blog/LeadMagnetCTA';
import RelatedProductsCards from '@/components/blog/RelatedProductsCards';
import CostDisclaimer from '@/components/blog/CostDisclaimer';
import { FAQ } from '@/components/blog/blocks';
import { blogArticles } from '@/lib/blog-registry';
import { makeAlternates } from '@/lib/i18n';

import CrateTypeSelector from '@/components/blog/article-14/CrateTypeSelector';
import ContainerLoadingLab from '@/components/blog/article-14/ContainerLoadingLab';
import DamageRiskMap from '@/components/blog/article-14/DamageRiskMap';

const SLUG = 'glass-shipping-container-loading-guide';
const article = blogArticles.find((a) => a.slug === SLUG)!;

const faqItems = [
  {
    q: 'What breakage rate is actually acceptable for a China-to-overseas glass shipment?',
    a: 'Industry norms sit at 2–5 % breakage for commodity glass loads, but a properly engineered pack (vertical crating, perimeter foam, ratchet re-tension after road transit, 4 kg desiccant per 40′HQ) routinely runs under 1 %. Suppliers citing "2–3 % is normal" are telling you they do not control for the preventable causes.',
  },
  {
    q: 'Can I ship architectural glass LCL to save freight?',
    a: 'For panels over 1.5 m longest side we refuse LCL. CFS warehouses stack mixed cargo, forklift operators are rotated hourly, and glass crates get moved three to five extra times before vessel loading. The $500–1,500 freight saving disappears into 3–5 × the breakage of an FCL. Cut sizes under 1.5 m with full enclosed boxes are the only safe LCL candidate.',
  },
  {
    q: 'What is the MOQ for a full container order?',
    a: 'A 20′DC fills on weight at roughly 25–27 t net glass (~800–1,000 m² of 10 mm equivalent). A 40′HQ is weight-limited at 26–28 t for monolithic glass but volume-filled at ~1,000–1,200 m² for IGU or laminated. We accept partial-container project orders starting at 300 m² when the specification mix justifies the cost per m².',
  },
  {
    q: 'Who signs the Bill of Lading when the shipment is damaged?',
    a: 'The carrier releases on receipt against a clean B/L. Damage is discovered at destination unpack — which is why clausing the Delivery Order with "subject to tally and condition on unpack" is critical, and why your Marine Insurance (ICC A) must be in force from the moment the container seal is applied at our factory, not from port of loading.',
  },
  {
    q: 'What certifications and paperwork does Sincere Glass include with every export shipment?',
    a: 'For every container we provide the commercial invoice, packing list with per-crate weights, Bill of Lading, Certificate of Origin (Form E for ASEAN destinations), ISPM-15 fumigation certificate for wooden crates, product test reports (GB 15763.2 for tempered, EN 14449 for laminated when the destination asks), and SGS or CCIC pre-shipment inspection if the buyer requests it. CE marking for the EU and SGCC certification for the US are available on request when the project specifies them.',
  },
  {
    q: 'Can you ship DDP to our warehouse, or are you FOB-only?',
    a: 'FOB Shanghai and FOB Shenzhen are our default. DDP is available for most destinations through our forwarder, but we price it transparently line by line (ocean freight, destination THC, duty, broker fee, delivery) rather than bundling, so the buyer can audit each cost. For buyers new to importing, we recommend CIF for the first shipment to let your own broker learn the lane.',
  },
];

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

export default function Page() {
  const toc = [
    { id: 'why-breakage', text: 'Why 2–5 % breakage is "industry acceptable" (and why it is not acceptable here)', level: 2 },
    { id: 'crate-types', text: 'The 4 crate types a glass factory actually uses', level: 2 },
    { id: 'container-math', text: 'How much glass fits in a container (and what the math misses)', level: 2 },
    { id: 'loading-protocol', text: 'The 7-step loading protocol inside our Wuhan warehouse', level: 2 },
    { id: 'damage-map', text: 'The hidden container killers: 6 damage zones', level: 2 },
    { id: 'fcl-vs-lcl', text: 'FCL vs LCL — why most factories refuse LCL for architectural glass', level: 2 },
    { id: 'insurance', text: 'Marine insurance: ICC A, B, C — and what glass claims actually pay out', level: 2 },
    { id: 'paperwork', text: 'HS codes & paperwork that stop containers at port', level: 2 },
    { id: 'pre-seal-photos', text: '5 photos your factory must send before container seal', level: 2 },
    { id: 'faq', text: 'Buyer FAQ', level: 2 },
  ];

  return (
    <>
      <Script
        id={`jsonld-${SLUG}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article, faqItems)) }}
      />

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox
          takeaways={[
            'Vertical crating (A-frame or L-type) is the only acceptable method for architectural glass over 1.5 m. Horizontal pallet stacking triples breakage.',
            'A 40′HQ fills on weight at ~28 t for monolithic glass but on volume at ~1,100 m² for IGU — pick the container by product mix, not by habit.',
            'Four kilograms of desiccant per 40′HQ plus a ceiling vapor liner stops the condensation-staining failure that destroys trans-Pacific laminated shipments.',
            'Marine insurance under ICC A clauses from factory seal to buyer unpack is the only cover that actually pays glass claims. ICC C excludes handling damage.',
            'Factories that quote "2–3 % breakage is normal" are telling you they do not control for the six preventable causes mapped in this guide.',
          ]}
        />

        <p className="lead">
          Every architectural glass order built in China eventually meets its hardest test: a sealed steel box, two to five weeks at sea, and six to twelve handling events between our Wuhan loading dock and your project site. Most of the stories of "China glass arrived broken" are not stories about Chinese glass — they are stories about containers packed by someone who treated glass like tiles. This guide is the operational playbook we hand to every new buyer: how we crate, how we load, how we insure, and the five photos we send before the container is sealed so you know exactly what is inside.
        </p>

        <h2 id="why-breakage">Why 2–5 % breakage is "industry acceptable" (and why it is not acceptable here)</h2>

        <p>
          Walk any trade show and ask a sourcing agent what breakage rate to budget for. The honest ones will tell you 2–5 %. The optimistic ones say "we have insurance for that." Both answers hide the same thing: an un-engineered pack. In our 20,000 m² Wuhan facility we treat the <strong>&lt; 1 % whole-shipment breakage</strong> number not as a stretch goal but as the baseline a serious factory should hit, because every one of the breakage causes we see has a known, cheap, and auditable prevention. The ones we cannot control — a crane dropping a container at the destination port, a trailer rollover — are precisely the ones Marine Insurance was designed to cover. The ones we <em>can</em> control (edge chipping, condensation staining, door-slam shock, humidity swelling, stacking crush, corner impact) are what the rest of this article is about.
        </p>

        <p>
          There is a reason the market tolerates the "2–5 %" story. Breakage inside a sealed container is only discovered on unpack — at which point the carrier has already released on a clean Bill of Lading, the forwarder is out of the chain, and the buyer is negotiating with a factory 10,000 km away. The incentive structure in the whole lane rewards the party who got paid first. We publish our operational protocol in articles like this one for exactly that reason: a buyer who reads it can audit any supplier against it, and a factory that cannot answer the audit should not get the order.
        </p>

        <h2 id="crate-types">The 4 crate types a glass factory actually uses</h2>

        <p>
          Four crate types cover almost every architectural glass shipment: the <strong>A-frame</strong>, the <strong>L-type</strong>, the <strong>fumigated wooden box</strong>, and the <strong>flat pallet</strong>. Each one trades differently between protection, weight efficiency, and cost. The wrong choice is rarely dramatic; it is usually a slow leak — a 2 % breakage rate that compounds into a quarter-million-dollar insurance claim history over three years. The selector below is the same decision rule we run on every new quote.
        </p>

        <p>
          <strong>How the selector works:</strong> you pick product type, panel size, and order volume; the engine returns one of four crate recommendations. The underlying rule is: mirror and ceramic frit always get enclosed wooden boxes (surface-damage sensitivity); jumbo panels over 2.4 m × 6 m force an A-frame because no wooden box fits; standard IGU defaults to L-type (industry baseline for weight-balanced sea transit); sub-10 m² sample loads can use flat pallets. The crate : glass weight ratio and per-m² cost adder shown with each recommendation are what we actually invoice.
        </p>

        <CrateTypeSelector />

        <p>
          The non-obvious entry on that list is the <em>flat pallet</em>. It is cheap, it is familiar, and it is responsible for most of the "China glass arrives broken" complaints we read in buyer forums. Horizontal stacking under sea-roll compression destroys the lower panels through micro-cracks you cannot see until the first thermal cycle at the project site — at which point the panel self-destructs and nobody can prove where the crack started. We do not quote flat-pallet packing for anything over 1.5 m longest side, and when a buyer insists we require a signed liability waiver.
        </p>

        <p>
          For enclosed shipments, ISPM-15 compliance matters more than most buyers realise. Australia, the EU, Canada, Japan, and the US all refuse non-compliant wooden packaging at port — the container is held, re-fumigated, and billed back to the receiver, with 7–14 days of demurrage. Every wooden crate leaving our factory carries the IPPC stamp from a certified fumigation site in the Wuhan free trade zone. (Reference: <a href="https://www.ippc.int/en/core-activities/standards-setting/ispm-15/" target="_blank" rel="noopener">IPPC ISPM-15 Standard</a>, revised 2018, binding on all signatories.)
        </p>

        <h2 id="container-math">How much glass fits in a container (and what the math misses)</h2>

        <p>
          Buyers routinely order "a 40-foot container of 10 mm tempered" and then renegotiate when the packing list comes in short. The reason is almost always a weight-vs-volume mismatch nobody did the math on. A 40′HQ has 76 m³ of usable volume and roughly 28.8 t of payload — but 10 mm monolithic glass weighs 25 kg/m², so the weight ceiling hits at ~1,150 m² while the volume ceiling for L-type crates sits around 1,700 m². You pay for 76 m³ and ship 70 % of it as air. A 20′DC with the same product fills on weight at ~800 m², uses less air, and often lands cheaper per m² delivered.
        </p>

        <p>
          <strong>How the lab works:</strong> pick container type (20′DC / 40′HQ / 40′OT), product thickness (6/8/10/12 mm monolithic, IGU, or laminated), and crate strategy. The lab computes two independent ceilings — payload-weight limit and crate-footprint volume limit — then returns the lower of the two as the realistic ship quantity, along with weight and volume utilisation percentages and a damage risk tier. The one that limits first is the one you optimise against: weight-limited loads want a smaller container; volume-limited loads want to add thicker panels or switch to a 40′HQ.
        </p>

        <ContainerLoadingLab />

        <p>
          The second thing the math misses is <em>payload reservation for the crate itself</em>. Our L-type crates run about 18 % of total shipped weight; wooden boxes run 28 %. On a 28 t payload ceiling, that is 5–8 t <em>not</em> available for glass. Factories that quote you "max glass in a 40′HQ" without subtracting crate weight are quoting a number that will not clear the port scale. Everything in the lab above is net of crate weight, which is why the m² numbers look lower than back-of-envelope calculations.
        </p>

        <h2 id="loading-protocol">The 7-step loading protocol inside our Wuhan warehouse</h2>

        <p>
          Here is the sequence we follow for every container, in order. It takes four workers roughly 90 minutes for a 40′HQ of standard IGU and three hours for a jumbo laminated load. We time-stamp each step and photograph the one marked with (📸):
        </p>

        <ol className="list-decimal pl-6 space-y-3 my-6 text-[#F2F0ED]">
          <li>
            <strong>Container inspection.</strong> Open the container doors, inspect the floor for nails, splinters, and oil stains. Reject any container with holes above the 1.5 m line (water ingress risk). Verify the container number against the Shipping Instructions. <em>(📸 photo 1: empty container floor and ceiling.)</em>
          </li>
          <li>
            <strong>Floor liner install.</strong> Lay a 2 mm EVA foam strip the length of the container floor along the load path, then two load-bearing timber runners (100 × 100 mm) under where the crate feet will land. The runners spread point loads from forklift tines.
          </li>
          <li>
            <strong>Desiccant placement.</strong> 4 kg of calcium chloride desiccant for a 40′HQ (2 kg for a 20′DC), hung from the ceiling tie-down loops in breathable moisture-barrier bags. The ceiling location matters — condensation forms there first.
          </li>
          <li>
            <strong>Crate loading, deepest first.</strong> Forklift crates in from the door end, loading the deepest position first. Each crate is positioned so its weight sits over the floor runners. Panels face inward (two L-crates back-to-back) so the glass surface is never adjacent to a container wall.
          </li>
          <li>
            <strong>Strap tensioning.</strong> Each crate is secured to the container's tie-down rails with ratchet straps rated for 2,500 kg working load. Tension is checked with a strain gauge; straps are set to 2 % elongation, no more.
          </li>
          <li>
            <strong>Load bars at door end.</strong> Two aluminium load bars installed horizontally across the door-end crates, tensioned against the container side walls. These are the single most important investment against door-slam shock in the first 300 km of road transit. <em>(📸 photo 2: load bars in place.)</em>
          </li>
          <li>
            <strong>Final inspection + seal.</strong> QC lead walks the container, photographs each crate from the open door (📸 photo 3), the packing list is pasted inside the door, container doors close, high-security bolt seal applied (📸 photos 4 and 5: seal number close-up and full door shot with seal visible).
          </li>
        </ol>

        <p>
          Every step above has a failure mode we have seen in competitors' shipments. Skipping desiccant produces condensation staining that writes off entire laminated loads. Skipping load bars produces the door-end crate damage that insurers routinely dispute. We do not shortcut any of them, and we timestamp them so a buyer can audit the sequence by requesting the log.
        </p>

        <LeadMagnetCTA
          variant="inline"
          articleSlug={SLUG}
          title="Download: Container Loading Audit Checklist"
          description="The 7-step pre-seal checklist we hand our QC team, adapted as a buyer-side audit tool. Use it to score any factory’s loading protocol before you place a container order."
        />

        <h2 id="damage-map">The hidden container killers: 6 damage zones</h2>

        <p>
          Every piece of broken glass that comes out of a container was damaged in one of six places. The map below shows where each one originates and what the pack has to do about it. The percentages are indicative baselines from our own claim history over 2023–2025 plus three published freight-insurance datasets; your supplier's numbers will vary with lane, product mix, and crate type, but the <em>causes</em> are universal.
        </p>

        <p>
          <strong>How the map works:</strong> hover or click any of the six numbered hotspots on the container cross-section. Each one opens a panel showing the typical prevalence range, the physical cause, and the specific pack countermeasure we apply. Zones 1–2 (edge chipping and corner impact) are strap-and-geometry problems. Zone 3 (stacking crush) is a crate-type decision. Zones 4–5 (condensation and humidity) are environmental and get solved with desiccant plus moisture-barrier liners. Zone 6 (door-slam shock) is why load bars exist.
        </p>

        <DamageRiskMap />

        <h2 id="fcl-vs-lcl">FCL vs LCL — why most factories refuse LCL for architectural glass</h2>

        <p>
          Buyers new to importing see LCL (Less-than-Container-Load) advertised at 60–80 % lower freight cost than a dedicated FCL and reasonably ask why nobody uses it for glass. The answer is handling events. An FCL container is handled roughly six times from factory to buyer: factory loading, truck to port, yard stack, vessel loading, vessel unloading, truck to buyer. LCL cargo passes through two Container Freight Stations — one at origin for consolidation, one at destination for de-consolidation — and typically sees twelve to sixteen handling events, including repeated forklift repositioning in warehouses optimised for shoe cartons and auto parts.
        </p>

        <p>
          The breakage math is unforgiving. Our FCL baseline runs under 1 %. Our rare LCL shipments — against our standing recommendation — run 4–7 %. The $800–1,200 freight savings on an LCL shipment of 15 m³ of glass evaporates after the first broken panel at retail replacement cost. The only architectural glass we will knowingly ship LCL is <a href="/products/tempered-glass">tempered glass</a> cut sizes under 1.5 m, fully enclosed in heat-treated wooden boxes with internal foam dividers, and only to buyers who have signed an LCL risk acknowledgement.
        </p>

        <p>
          If a buyer's order genuinely does not justify an FCL, the better move is almost always to wait — either consolidate with the buyer's next order, or combine with another product line from the same factory to fill a 20′DC. For a longer walk-through of buyer-side container decisions on a new China import, see our <a href="/blog/how-to-import-glass-from-china">complete guide to importing glass from China</a>, which maps the 5-stage buyer journey from supplier vetting through landed cost.
        </p>

        <h2 id="insurance">Marine insurance: ICC A, B, C — and what glass claims actually pay out</h2>

        <p>
          Marine insurance for glass sounds simple until a claim gets filed. There are three Institute Cargo Clauses in common use (<a href="https://www.lmalloyds.com/LMA/Underwriting/Clauses/CL382" target="_blank" rel="noopener">LMA ICC 2009 clauses</a>), each with a very different exclusion list, and most of the surprises on a glass claim trace back to the clause someone picked without reading.
        </p>

        <div className="my-8 overflow-x-auto">
          <table
            className="w-full border-collapse text-sm"
            aria-label="Comparison of Institute Cargo Clauses A, B, and C for architectural glass shipments: coverage scope, premium cost, and typical glass-claim outcomes"
          >
            <caption className="text-left text-xs text-[#8B95A5] italic mb-3">
              Institute Cargo Clauses coverage for architectural glass. Data verified: 2026-10-14. Reference clause texts: <a href="https://www.lmalloyds.com/LMA/Underwriting/Clauses/CL382" target="_blank" rel="noopener">LMA ICC 2009</a>; premium ranges from Chinese export broker quotes Q3 2026.
            </caption>
            <thead>
              <tr className="border-b border-[#3A4250]">
                <th scope="col" className="text-left py-3 px-3 text-[#DAA745] font-semibold">Clause</th>
                <th scope="col" className="text-left py-3 px-3 text-[#DAA745] font-semibold">Coverage scope</th>
                <th scope="col" className="text-left py-3 px-3 text-[#DAA745] font-semibold">Premium (approx.)</th>
                <th scope="col" className="text-left py-3 px-3 text-[#DAA745] font-semibold">Glass claim reality</th>
              </tr>
            </thead>
            <tbody className="text-[#8B95A5]">
              <tr className="border-b border-[#3A4250]/40">
                <th scope="row" className="py-3 px-3 text-[#F2F0ED] font-medium align-top">ICC A</th>
                <td className="py-3 px-3 align-top">All risks except war, strikes, inherent vice, delay, and insolvency of carrier. Includes handling damage.</td>
                <td className="py-3 px-3 align-top">0.3–0.6 % of CIF value</td>
                <td className="py-3 px-3 align-top text-[#F2F0ED]">The only clause that routinely pays glass breakage without dispute. Required for any high-value laminated or IGU shipment.</td>
              </tr>
              <tr className="border-b border-[#3A4250]/40">
                <th scope="row" className="py-3 px-3 text-[#F2F0ED] font-medium align-top">ICC B</th>
                <td className="py-3 px-3 align-top">Named perils: fire, collision, grounding, overturning, jettison, water ingress, container total loss.</td>
                <td className="py-3 px-3 align-top">0.15–0.3 %</td>
                <td className="py-3 px-3 align-top">Handling damage, strap failure, and condensation staining are typically <strong>excluded</strong>. Expect disputes on most glass claims.</td>
              </tr>
              <tr>
                <th scope="row" className="py-3 px-3 text-[#F2F0ED] font-medium align-top">ICC C</th>
                <td className="py-3 px-3 align-top">Catastrophic events only (fire, major collision, vessel loss, jettison).</td>
                <td className="py-3 px-3 align-top">0.08–0.15 %</td>
                <td className="py-3 px-3 align-top">Not usable for glass. Nothing short of the ship sinking produces a payout.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CostDisclaimer variant="compact" />

        <p>
          Two mechanics are easy to get wrong. First, the policy must be in force from the moment the container seal is applied at our factory, not from port of loading. If your buyer takes a FOB Incoterm the responsibility — and the insurable interest — transfers at the ship's rail; make sure your cargo insurer underwrites the inland leg too. Second, the claim procedure requires photographic evidence of damage <em>before</em> unpacking continues. Train your receiving warehouse to stop at the first broken panel, photograph with the container door still open, and keep every piece of foam and strap material; insurers that reject glass claims almost always cite "chain of custody could not be established."
        </p>

        <h2 id="paperwork">HS codes & paperwork that stop containers at port</h2>

        <p>
          Classification is where a well-packed container turns into a port-held container. Architectural glass sits under multiple HS codes depending on processing, and getting the code wrong triggers a line-item hold, a reclassification demurrage charge of USD 100–250/day, and sometimes a full antidumping review in markets like the US and EU.
        </p>

        <div className="my-8 overflow-x-auto">
          <table
            className="w-full border-collapse text-sm"
            aria-label="HS code classification for common architectural glass products and the paperwork required at destination customs"
          >
            <caption className="text-left text-xs text-[#8B95A5] italic mb-3">
              Common HS codes for architectural glass exports from China. Data verified: 2026-10-14. Reference: <a href="https://www.wcoomd.org/en/topics/nomenclature/instrument-and-tools/hs-nomenclature-2022-edition.aspx" target="_blank" rel="noopener">WCO HS 2022 nomenclature</a>; verify destination tariff at your country's customs portal (e.g. <a href="https://hts.usitc.gov/" target="_blank" rel="noopener">HTSUS</a> for the US, <a href="https://ec.europa.eu/taxation_customs/dds2/taric/" target="_blank" rel="noopener">TARIC</a> for the EU).
            </caption>
            <thead>
              <tr className="border-b border-[#3A4250]">
                <th scope="col" className="text-left py-3 px-3 text-[#DAA745] font-semibold">Product</th>
                <th scope="col" className="text-left py-3 px-3 text-[#DAA745] font-semibold">HS code</th>
                <th scope="col" className="text-left py-3 px-3 text-[#DAA745] font-semibold">Key paperwork at destination</th>
              </tr>
            </thead>
            <tbody className="text-[#8B95A5]">
              <tr className="border-b border-[#3A4250]/40">
                <th scope="row" className="py-3 px-3 text-[#F2F0ED] font-medium align-top">Tempered glass</th>
                <td className="py-3 px-3 align-top font-mono text-xs">7007.19</td>
                <td className="py-3 px-3 align-top">GB 15763.2 test report; CE Mark declaration (EU) or SGCC listing (US) if required by project.</td>
              </tr>
              <tr className="border-b border-[#3A4250]/40">
                <th scope="row" className="py-3 px-3 text-[#F2F0ED] font-medium align-top">Laminated glass</th>
                <td className="py-3 px-3 align-top font-mono text-xs">7007.29</td>
                <td className="py-3 px-3 align-top">EN 14449 or ANSI Z97.1 test report; interlayer type on commercial invoice (PVB / SGP / EVA).</td>
              </tr>
              <tr className="border-b border-[#3A4250]/40">
                <th scope="row" className="py-3 px-3 text-[#F2F0ED] font-medium align-top">IGU / insulated glass</th>
                <td className="py-3 px-3 align-top font-mono text-xs">7008.00</td>
                <td className="py-3 px-3 align-top">Spacer and gas-fill declaration on invoice; U-value per EN 673 if specified; Low-E emissivity if coated.</td>
              </tr>
              <tr>
                <th scope="row" className="py-3 px-3 text-[#F2F0ED] font-medium align-top">Mirror</th>
                <td className="py-3 px-3 align-top font-mono text-xs">7009.91 / 7009.92</td>
                <td className="py-3 px-3 align-top">Framed vs unframed classification affects duty rate; declare both on packing list.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Alongside the classification, three documents move the container through customs and three documents protect the buyer. The customs documents are the commercial invoice, the packing list with per-crate weights and container number, and the Bill of Lading or Sea Waybill. The protection documents are the test reports, the Certificate of Origin (Form E for ASEAN under the China–ASEAN FTA brings most tariffs to zero), and the Pre-Shipment Inspection report if the buyer or L/C requires it. Our standard export packet includes all six and is sent as a single PDF three business days before vessel ETD.
        </p>

        <p>
          For buyers specifying glass to a project rather than a stock replenishment, see our pillar guide on <a href="/blog/architectural-glass-types-guide">architectural glass types</a> and the deep dive on <a href="/blog/curtain-wall-glass-specification">curtain wall glass specification</a> — both articles cover the spec-side decisions that drive the HS classification on the invoice.
        </p>

        <h2 id="pre-seal-photos">5 photos your factory must send before container seal</h2>

        <p>
          A container seal is a legally meaningful event: once it is on, the carrier has lawful custody and the loading evidence is frozen. We send five photos to the buyer by email <strong>before</strong> the seal is applied, with an explicit request for the buyer's "go ahead to seal" reply. The five photos are:
        </p>

        <ol className="list-decimal pl-6 space-y-2 my-6 text-[#F2F0ED]">
          <li><strong>Empty container floor + ceiling</strong> (proof of inspection).</li>
          <li><strong>First row loaded, from the door end</strong> (crate orientation and foam placement visible).</li>
          <li><strong>Fully loaded container, straps tensioned</strong> (shows ratchet strap pattern and load bars).</li>
          <li><strong>Packing list taped to inside of door</strong> (so the buyer's broker sees it on first open).</li>
          <li><strong>Seal number close-up + full door shot</strong> (the seal number must match the Bill of Lading).</li>
        </ol>

        <p>
          This five-photo pack is also the single best factory audit tool. Any supplier who cannot produce it on request for a recent shipment is not running a controlled loading operation — and the probability that your container has load bars at the door is low. We publish ours as a matter of course; it is cheaper to earn trust at the loading dock than to defend an insurance claim six months later.
        </p>

        <LeadMagnetCTA
          variant="footer"
          articleSlug={SLUG}
          title="Container audit + glass codes bundle"
          description="Our 7-step container loading audit checklist bundled with the Global Architectural Glass Building Codes PDF — the two reference docs we hand every new buyer before their first FCL."
        />

        <FAQ items={faqItems} />

        <section className="my-14">
          <h2 className="text-sm font-semibold text-[#DAA745] uppercase tracking-wider mb-4 m-0">More in Buyer&apos;s Guide</h2>
          <div className="grid sm:grid-cols-1 gap-3">
            <a href="/blog/how-to-import-glass-from-china" className="block rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 hover:border-[#DAA745]/60 transition-colors p-5 no-underline">
              <div className="text-xs text-[#DAA745] uppercase tracking-wider font-semibold mb-1">Buyer&apos;s Guide</div>
              <div className="text-base font-semibold text-[#F2F0ED] mb-1">How to Import Architectural Glass from China: The 5-Stage Buyer Journey</div>
              <div className="text-xs text-[#8B95A5] leading-relaxed">Supplier vetting, Incoterms, container capacity math, landed cost, and the red flags that end buyer relationships.</div>
            </a>
          </div>
        </section>

        <RelatedProductsCards
          slugs={article.relatedProductSlugs || ['tempered-glass', 'laminated-glass', 'insulated-glass']}
          heading="Products shipped under this protocol"
        />
      </BlogArticleLayout>
    </>
  );
}
