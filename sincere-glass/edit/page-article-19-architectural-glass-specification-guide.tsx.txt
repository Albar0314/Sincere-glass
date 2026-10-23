import type { Metadata } from "next";
import Script from "next/script";
import { blogArticles, type BlogArticle } from "@/lib/blog-registry";
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
} from "@/components/blog/BlogArticleLayout";
import TLDRBox from "@/components/blog/TLDRBox";
import FAQ from "@/components/blog/blocks/FAQ";
import LeadMagnetCTA from "@/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/components/blog/RelatedProductsCards";
import CostDisclaimer from "@/components/blog/CostDisclaimer";
import { makeAlternates } from "@/lib/i18n";

import SpecificationBuilder from "@/components/blog/pillar-product/SpecificationBuilder";
import AttributeCascadeDiagram from "@/components/blog/pillar-product/AttributeCascadeDiagram";
import CapabilityEnvelopeMatrix from "@/components/blog/pillar-product/CapabilityEnvelopeMatrix";

const SLUG = "architectural-glass-specification-guide";
const article = blogArticles.find((a) => a.slug === SLUG) as BlogArticle;

const toc = [
  { id: "what-is-a-spec",      text: "What a complete architectural glass specification contains", level: 2 },
  { id: "six-attributes",      text: "The 6 decision attributes",                                    level: 2 },
  { id: "attribute-cascade",   text: "How the attributes cascade",                                    level: 2 },
  { id: "glass-codes",         text: "Reading and writing glass codes",                              level: 2 },
  { id: "capability-envelope", text: "Capability envelope: Sincere Glass vs industry",               level: 2 },
  { id: "pitfalls",            text: "Five specification pitfalls that cost real money",             level: 2 },
  { id: "spec-to-rfq",         text: "From spec sheet to RFQ",                                        level: 2 },
  { id: "faq",                 text: "Buyer FAQ",                                                     level: 2 },
  { id: "product-deep-dives",  text: "Product deep dives and other pillars",                          level: 2 },
];

const faqItems = [
  {
    q: "What is a typical MOQ when the architectural glass specification is custom?",
    a: "Our standard MOQ is one 20-foot container, which fits roughly 18 to 22 tonnes depending on thickness, assembly, and crating. Mixed-thickness and mixed-assembly orders are accepted inside a single container, so a project that needs 60% tempered IGU plus 40% laminated monolithic ships as one PO. For sub-container volumes we quote LCL consolidation to common ocean hubs.",
  },
  {
    q: "How accurate are the capability envelopes you publish versus what you can actually deliver?",
    a: "Our Sincere Standard column reflects what we commit to on a normal container order from stock float, verified against ISO 9001 quality records and our last four quarters of production data. Sincere Max is what we deliver on project-scale engagements with lead-time adjustment and raw-glass procurement. If a dimension sits above Sincere Max, we tell you before quoting rather than after.",
  },
  {
    q: "Can you quote from a spec sheet in a non-standard format (DWG, PDF, email paragraph)?",
    a: "Yes. We quote from whatever format the specifier works in: DWG shop drawings, Revit exports, PDF spec sections, Excel schedules, or a plain-text email that gives us the six attributes (substrate, processing, thickness, assembly, coating, size). Turnaround is one working day for a priced quotation. Specs that reference a jurisdiction (IBC, EN, GB) or a specific standard (ASTM E1300, EN 12150-2) get back a code-compliant quote; specs without that cross-reference get back our recommended default plus questions.",
  },
  {
    q: "Do you charge for revised specification iterations?",
    a: "The first two spec revisions on any project are free. We expect iteration, especially when the architect, engineer, and buyer are still aligning on wind-load class or thermal targets. From the third revision we charge our engineering hourly rate (invoiced only if the project proceeds, waived if the final PO is placed with us). This is published upfront in our quotation terms.",
  },
  {
    q: "Can you supply a filled specification template or sample spec document for our tender?",
    a: "Yes. We maintain a specification template library covering curtain wall glass, balustrade glass, shower glass, skylight glass, and spandrel glass, each with the clauses and standards your tender needs to reference. Request access through our contact form and we send the editable Word and PDF versions, along with sample product cut sheets from the Sincere Glass product library. Nothing in the template is Sincere-specific; it is designed to let you tender to any qualified supplier.",
  },
];

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates("/blog/" + SLUG),
};

export default function Page() {
  const schemas = articleJsonLd(article, faqItems);

  return (
    <>
      {schemas.map((s, i) => (
        <Script
          key={i}
          id={`article-jsonld-${i}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox
          takeaways={[
            "A complete architectural glass specification is six decisions, not one: substrate, processing, thickness, assembly, coating, and panel size. Everything else (weight, cost, U-value, hardware, shipping) is derived from those six.",
            "Thickness is the single highest-leverage attribute. It drives weight, strength, cost, and shipping density simultaneously. Get it wrong and three downstream line items move.",
            "Glass codes like 6T+12A(Ar)+6T Low-E#2 are read left-to-right as a stack. T means tempered, 12A is a 12 mm argon-filled cavity, Low-E#2 means the coating sits on surface 2 of the stack. Writing the code correctly removes most RFQ ambiguity.",
            "Our Wuhan factory envelope: up to 3,000 x 15,000 mm panels, up to 19 mm tempered, up to 4-ply SGP lamination, up to 24 mm IGU cavity. These exceed mid-tier industry typical on every dimension, with 10-15 day standard lead time.",
            "The five most common specification pitfalls that cost real money: tolerance ambiguity, coating surface position, unit-system mismatch, missing edge treatment, and missing code jurisdiction. Each is a line in the spec; each is also a change order waiting to happen.",
          ]}
        />

        <p>
          An architectural glass specification is not a product description, it is a decision tree. Six decisions, taken in roughly this order, determine every meaningful property of the finished panel: substrate, processing, thickness, assembly, coating, and size. Everything downstream, from weight and break load to U-value, shipping container count, and installer hardware, is computed from those six. Get the six right and a factory can quote your project in one working day. Get even one wrong and your quotation comes back with a question that costs a week.
        </p>

        <p>
          This pillar is the map. We walk through what belongs in a complete architectural glass specification, how the six attributes cascade into the twelve derived outputs that matter to buyers, how to read and write the compact glass codes (<code>6T+12A(Ar)+6T Low-E#2</code>) that appear on every schedule in the industry, and where our Wuhan production envelope sits against industry typical. We close with the five specification pitfalls that we see cost real money on real projects, and the handoff from a finished spec sheet to a priced RFQ. Where this pillar makes a product-level decision point, we link to the deep dives in our Product cluster: <a href="/blog/12mm-tempered-glass-specifications" className="text-[#DAA745] hover:underline">12mm tempered specifications</a>, <a href="/blog/sgp-vs-pvb-interlayer-cost" className="text-[#DAA745] hover:underline">SGP vs PVB interlayer cost</a>, and <a href="/blog/jumbo-architectural-glass-panels" className="text-[#DAA745] hover:underline">jumbo architectural glass panels</a>.
        </p>

        <h2 id="what-is-a-spec">What a complete architectural glass specification contains</h2>
        <p>
          A specification that lets a factory quote without follow-up questions carries three layers of information, and most problems trace to one of these layers being thin.
        </p>
        <p>
          <strong>Layer one: the product itself.</strong> This is the six attributes we unpack below. It is the compact code (<code>6T+12A(Ar)+6T Low-E#2</code>) plus any extras the code cannot capture: edge treatment, hole and cutout positions, custom shape profiles. A spec that stops at this layer gets you a per-square-meter quotation and a lead-time estimate.
        </p>
        <p>
          <strong>Layer two: the compliance envelope.</strong> This is the jurisdiction the panel will be installed under and the specific standards that govern it. GB 15763.2 and GB 50113 for China. EN 12150-2, EN 14449, and EN 13830 for Europe. ASTM E1300 and the applicable IBC chapter for the United States. AS 1288 for Australia. Buyers who leave this layer out get back a quote that is correct for Chinese code and a change order when the destination tolerances turn out to be tighter.
        </p>
        <p>
          <strong>Layer three: the project constraints.</strong> Delivery address, port of discharge, loading timeline, drawing revision control, packaging class (export sea-worthy versus truck-worthy), inspection terms (whether a third-party inspection like SGS or BV is required pre-shipment), and payment terms. Nothing in this layer changes the glass, but every item changes the quotation. We cover the buyer-side of this layer in detail in our Buyer-Guide cluster, especially the <a href="/blog/how-to-import-glass-from-china" className="text-[#DAA745] hover:underline">step-by-step import guide</a>.
        </p>

        <h2 id="six-attributes">The 6 decision attributes</h2>
        <p>
          Every architectural glass specification resolves to six decisions. The order below is also roughly the order they should be made in; later decisions depend on earlier ones. A specification builder that walks through these in sequence will not get stuck.
        </p>
        <ol>
          <li>
            <strong>Substrate.</strong> The raw float glass that everything else is built on top of. Clear, ultra-clear (low-iron), tinted (bronze, grey, blue, green), or reflective (pyrolytic coating). Substrate determines base visible light transmission, color appearance, and base cost. Ultra-clear carries a 10 to 15% premium over clear and is specified where color fidelity matters: luxury retail, museum display, high-end residential.
          </li>
          <li>
            <strong>Processing.</strong> How the substrate is heat-treated or laminated. Annealed is raw float, acceptable only where safety glazing is not required. Tempered gives 4 to 5x the strength of annealed and produces the small-cuboid safe-break pattern. Heat-strengthened is roughly 2x annealed, non-safety but with a much lower nickel-sulfide failure risk than tempered, so it is preferred for the outer lite of IGUs that will see thermal cycling. Laminated bonds two or more panes with PVB, SGP, or EVA interlayer, giving fragment retention and (with SGP) post-break stiffness. Tempered-laminated combines both. See our <a href="/blog/tempered-glass-vs-laminated-glass" className="text-[#DAA745] hover:underline">tempered vs laminated comparison</a> for the decision matrix.
          </li>
          <li>
            <strong>Thickness.</strong> 6, 8, 10, 12, 15, or 19 mm per lite. Thickness is the single highest-leverage specification attribute: it drives weight, break load, stiffness, raw-glass cost, and shipping density all at once. 12mm is the architectural sweet spot where most mid-weight work converges; our <a href="/blog/12mm-tempered-glass-specifications" className="text-[#DAA745] hover:underline">12mm specifications deep dive</a> covers why.
          </li>
          <li>
            <strong>Assembly.</strong> Monolithic (single pane), double IGU (two panes separated by a sealed cavity), or triple IGU (three panes, two cavities). Assembly governs thermal performance. A monolithic 6mm has a U-value of roughly 5.8 W/m&sup2;K; a double IGU with Low-E and argon drops to 1.1 to 1.6; a triple IGU with two Low-E coatings and two argon fills drops below 0.8, the passive-house threshold.
          </li>
          <li>
            <strong>Coating.</strong> None, Low-E (soft coat sputtered or hard coat pyrolytic), solar control, or ceramic frit (enameled, used for spandrels and opaque applications). Soft-coat Low-E has the best thermal performance but must sit inside an IGU; it cannot be exposed to atmosphere. Hard-coat Low-E can be used on monolithic or on the outer face of an IGU but delivers worse U-value. Coating surface position matters enormously: Low-E on surface 2 (outer lite, cavity side) gives a different thermal profile than Low-E on surface 3 (inner lite, cavity side).
          </li>
          <li>
            <strong>Panel size.</strong> Standard (up to 2.4 x 3.0 m, fits universal crating), large (up to 2.4 x 6.0 m, needs A-frame crating but fits a 40-foot high-cube container), or jumbo (up to 3.0 x 15.0 m, needs flat-rack or open-top ocean containers and project-scale planning). Size interacts with everything downstream: hardware class, container plan, installer method. Our <a href="/blog/jumbo-architectural-glass-panels" className="text-[#DAA745] hover:underline">jumbo panels deep dive</a> walks through the capability gates.
          </li>
        </ol>
        <p>
          Six decisions, six multi-choice selectors. The interactive builder below walks through them in order and outputs the glass code at the end.
        </p>

        <p>
          <strong>How the builder works:</strong> the component below is a six-step guided selector, one attribute per step. Each step shows the common options for that attribute with a one-line note on when to pick each. As you make choices, the right-hand panel updates the compact glass code and the full descriptor in real time. At the end you can copy both to clipboard and paste into an RFQ or email. The code output follows the industry convention of thickness, processing suffix, cavity notation, and coating position; defaults are chosen to match the most common Sincere Glass export orders rather than extremes.
        </p>

        <SpecificationBuilder />

        <h2 id="attribute-cascade">How the attributes cascade</h2>
        <p>
          The six inputs are what the specifier controls. The derived outputs are what the factory, the installer, the shipping agent, and the structural engineer compute from those inputs. Six derived outputs matter in practice: weight per square meter, break load, U-value, cost per square meter, hardware class, and container plan.
        </p>
        <p>
          The cascade is not symmetric. Thickness alone drives four of the six outputs; coating only moves one (U-value, plus a secondary effect on cost). Panel size looks innocuous but drives three (shipping, hardware, cost). Understanding which inputs have the longest downstream reach is what lets a buyer prioritize where to invest spec effort and where defaults are safe.
        </p>

        <p>
          <strong>How the cascade diagram works:</strong> the component below is a two-column node graph. The left column lists the six input attributes you specify. The right column lists the six derived outputs the factory and installer compute. Hovering any input highlights every downstream output it influences; hovering a derived output traces back to see every input that feeds it. The detail panel below the graph shows the active node and the quantitative rule connecting the two sides. The graph is static (no state) and the hover highlights are read-only; it is a map, not a calculator.
        </p>

        <AttributeCascadeDiagram />

        <h2 id="glass-codes">Reading and writing glass codes</h2>
        <p>
          The industry convention for a compact glass specification code reads left to right as a physical stack, starting with the outboard lite and working toward the interior. The components are concatenated with plus signs for cavities and spaces for coating annotation. A typical commercial facade spec might read:
        </p>
        <p className="my-6 text-center">
          <code className="text-lg text-[#DAA745] bg-[#3A4250]/30 px-4 py-2 rounded-lg inline-block">6T + 12A(Ar) + 6T Low-E#2</code>
        </p>
        <p>
          Parsed left to right: a 6 mm tempered lite (outboard), a 12 mm cavity filled with argon, a 6 mm tempered lite (inboard), with a Low-E coating on surface 2 of the stack. Surface numbering counts from the exterior face inward: surface 1 is the outer face of the outboard lite, surface 2 is the cavity-facing face of the outboard lite, surface 3 is the cavity-facing face of the inboard lite, surface 4 is the interior face of the inboard lite.
        </p>

        <div className="overflow-x-auto my-6">
          <table
            aria-label="Glass code token reference showing common notation and meaning"
            className="w-full text-sm"
          >
            <caption className="text-xs text-[#8B95A5] mb-2 text-left caption-top">
              Glass code token reference &mdash; common notation across GB, EN, and ASTM-aligned schedules. Data verified: 2026-10-23.
            </caption>
            <thead>
              <tr className="border-b border-[#3A4250]/40">
                <th scope="col" className="text-left text-[#DAA745] text-xs uppercase tracking-wider py-2 pr-4">Token</th>
                <th scope="col" className="text-left text-[#DAA745] text-xs uppercase tracking-wider py-2 pr-4">Meaning</th>
                <th scope="col" className="text-left text-[#DAA745] text-xs uppercase tracking-wider py-2">Example</th>
              </tr>
            </thead>
            <tbody className="text-[#8B95A5]">
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]"><code>N</code> (bare number)</th>
                <td className="py-2 pr-4">Thickness in millimeters, annealed by default</td>
                <td className="py-2"><code>6</code> = 6 mm annealed float</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]"><code>NT</code></th>
                <td className="py-2 pr-4">N millimeter tempered (fully toughened)</td>
                <td className="py-2"><code>12T</code> = 12 mm tempered</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]"><code>NHS</code></th>
                <td className="py-2 pr-4">N millimeter heat-strengthened</td>
                <td className="py-2"><code>6HS</code> = 6 mm heat-strengthened</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]"><code>NA</code> or <code>NAr</code></th>
                <td className="py-2 pr-4">N millimeter cavity, air or argon fill</td>
                <td className="py-2"><code>12A(Ar)</code> = 12 mm argon cavity</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]"><code>N.NN PVB</code></th>
                <td className="py-2 pr-4">PVB interlayer thickness (0.38 / 0.76 / 1.52 mm standard)</td>
                <td className="py-2"><code>6T + 1.52PVB + 6T</code></td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]"><code>N.NN SGP</code></th>
                <td className="py-2 pr-4">SGP (SentryGlas) ionoplast interlayer, structural grade</td>
                <td className="py-2"><code>12T + 1.52SGP + 12T</code></td>
              </tr>
              <tr>
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]"><code>Low-E#N</code></th>
                <td className="py-2 pr-4">Low-E coating on surface N of the stack (count exterior-inward)</td>
                <td className="py-2"><code>Low-E#2</code> = cavity-side of outer lite</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          A buyer who writes the code correctly in the RFQ removes about 70% of the ambiguity we normally resolve on first-reply. A buyer who writes a description instead (&quot;double-glazed with Low-E&quot;) gets back a quote that is correct only by coincidence. The glass code is the universal interface between specifier and factory, and it is worth learning to read and write even if your project schedule includes a glazing consultant.
        </p>

        <h2 id="capability-envelope">Capability envelope: Sincere Glass vs industry</h2>
        <p>
          The specification only matters if the factory can actually build it. Capability envelope is the published upper bound of what a fabricator can produce; it is distinct from the lead time and the price. Below we compare our Wuhan production envelope against mid-tier industry typical across the six dimensions that most frequently gate a project. These numbers come from our last four quarters of production records and our ISO 9001 QC data, cross-referenced against public spec sheets of other mid-tier Chinese fabricators and feedback from our export buyers.
        </p>

        <p>
          <strong>How the matrix works:</strong> the component below shows six specification dimensions in two views. The table view lists the industry typical, Sincere Standard (what we commit to on a normal container order), and Sincere Max (what we deliver on project-scale engagements) for each dimension, with a note explaining the physical or process reason behind the number. The radar view normalizes each dimension to its upper bound so you can see the shape of our envelope at a glance; for lead time, shorter is better, so a longer axis-reach means a faster delivery. Toggle between views with the buttons at the top right.
        </p>

        <CapabilityEnvelopeMatrix />

        <CostDisclaimer />

        <h2 id="pitfalls">Five specification pitfalls that cost real money</h2>
        <p>
          Patterns we see repeatedly on inbound RFQs. Each one is a one-line fix in the spec sheet; each one is also a five-figure change order if it reaches production unchallenged.
        </p>
        <ol>
          <li>
            <strong>Tolerance ambiguity.</strong> A spec that says &quot;12 mm&quot; without naming the standard inherits whatever tolerance the factory defaults to. GB 11614 allows &plusmn;0.3 mm for 10 to 12 mm; EN 572-2 tightens that to &plusmn;0.2 mm; ASTM C1036 Class 1 allows &plusmn;0.4 mm. On a tight glazing pocket, 0.5 mm is the difference between a panel that drops in and one that gets re-cut on site. Fix: name the standard in the spec (&quot;12 mm per EN 572-2 tolerance&quot;). We cover this in detail in the <a href="/blog/12mm-tempered-glass-specifications" className="text-[#DAA745] hover:underline">12mm deep dive</a>.
          </li>
          <li>
            <strong>Coating surface position.</strong> A Low-E spec without a surface number is ambiguous. In a double IGU, Low-E on surface 2 (outer lite, cavity side) is the dominant choice for heating-dominated climates in the northern hemisphere; Low-E on surface 3 (inner lite, cavity side) is more common in cooling-dominated climates. The U-value difference is small; the solar heat gain coefficient difference is large. Fix: always write <code>Low-E#2</code> or <code>Low-E#3</code>, not just &quot;Low-E coated&quot;.
          </li>
          <li>
            <strong>Unit-system mismatch.</strong> Shop drawings in millimeters and a spec sheet listing panels in inches, or the reverse, gets you panels cut to one dimension and framing cut to the other. The error is small per panel (1 inch = 25.4 mm; a spec that says &quot;48 x 72&quot; for 1,219 x 1,829 mm sometimes gets built to 48 x 72 mm). Fix: pick one unit system per project and lock it on the title block of every drawing.
          </li>
          <li>
            <strong>Missing edge treatment on exposed-edge panels.</strong> As-cut edges are not acceptable for frameless balustrades, shower doors, point-fixed canopies, or anything else where the glass edge is visible or touched. The micro-cracks from scoring become stress concentrators in the tempering furnace and raise in-furnace breakage risk. A spec that says &quot;12 mm tempered&quot; without an edge treatment line gets quoted at as-cut, and the installer discovers the problem on site. Fix: name ground or polished edges explicitly, with the polish grade (flat-polished, pencil-polished, beveled) if the application needs it.
          </li>
          <li>
            <strong>Missing code jurisdiction.</strong> A quote without a named jurisdiction gets built to Chinese code (GB 15763.2). For projects shipping to the EU, the US, or Australia, this may still pass local inspection, but any required third-party certification, CE marking, ANSI Z97.1, CPSC 1201, or AS/NZS 2208 must be arranged pre-production with the correct testing protocols. Fix: state the destination jurisdiction and any additional required certifications in the spec header.
          </li>
        </ol>

        <LeadMagnetCTA
          variant="inline"
          articleSlug={SLUG}
          title="Free: Architectural glass specification template library"
          description="Editable Word and PDF templates for curtain wall, balustrade, shower, skylight, and spandrel glass specifications. Pre-filled with the clauses and standards your tender needs to reference across GB, EN, ASTM, and AS jurisdictions."
        />

        <h2 id="spec-to-rfq">From spec sheet to RFQ</h2>
        <p>
          A finished specification turns into a quotation in three steps. First, the factory parses the glass code and the compliance envelope to confirm feasibility against the production envelope. Second, it computes per-panel pricing from the raw-glass cost, processing surcharges, coating premium, and crating class. Third, it layers in the project-level overlays: inland transport to the port of loading, export documentation, inspection coordination, and payment-term adjustments.
        </p>
        <p>
          A spec that passes all three steps on first read gets a one-working-day turnaround on a priced quotation. A spec that stalls on step one (feasibility outside envelope) comes back with a scoping question. A spec that stalls on step two (processing ambiguity) comes back with a tolerance or edge-treatment question. A spec that stalls on step three (compliance mismatch) comes back with a certification cost or a lead-time adjustment.
        </p>
        <p>
          Our quotation includes the parsed spec at the top of the first page, so buyers can verify the factory read the specification the way they intended before any numbers get discussed. This surfaces most interpretation errors before they become production errors. For specs that cross unfamiliar territory, we recommend running them through our free specification template (above) and the <a href="/blog/architectural-glass-china-buyer-guide" className="text-[#DAA745] hover:underline">buyer-guide pillar</a> as a pre-flight check.
        </p>

        <p className="text-sm text-[#8B95A5] mt-6">
          For a comprehensive view of how specification writing fits inside the full procurement cycle, see our <a href="/blog/architectural-glass-china-buyer-guide" className="text-[#DAA745] hover:underline">buyer-guide pillar</a>. For the manufacturing processes that make each specified product possible, see the <a href="/blog/architectural-glass-manufacturing-guide" className="text-[#DAA745] hover:underline">manufacturing pillar</a>. For how specifications map to real building applications, see the <a href="/blog/architectural-glass-applications-guide" className="text-[#DAA745] hover:underline">applications pillar</a>.
        </p>

        <FAQ items={faqItems} />

        <LeadMagnetCTA
          variant="footer"
          articleSlug={SLUG}
          title="Free: Global Architectural Glass Building Codes Comparison"
          description="A side-by-side 11-page PDF comparing US IBC, EU EN, China GB, and Australia AS requirements for architectural glass across tempered, laminated, insulated, and Low-E products. Free for architects, specifiers, and procurement teams."
        />

        <h2 id="product-deep-dives">Product deep dives and other pillars</h2>
        <p>
          This pillar sits above the Product cluster deep dives, each of which takes one specification decision from the six above and walks it to the ground.
        </p>
        <ul>
          <li>
            <a href="/blog/12mm-tempered-glass-specifications" className="text-[#DAA745] hover:underline">12mm tempered glass specifications</a> &mdash; the thickness sweet spot for mid-weight architectural work; performance envelope, panel-size limits, cost drivers, certifications.
          </li>
          <li>
            <a href="/blog/sgp-vs-pvb-interlayer-cost" className="text-[#DAA745] hover:underline">SGP vs PVB interlayer cost</a> &mdash; the interlayer decision that moves laminated glass pricing by 2 to 3x and governs structural performance post-break.
          </li>
          <li>
            <a href="/blog/jumbo-architectural-glass-panels" className="text-[#DAA745] hover:underline">Jumbo architectural glass panels</a> &mdash; the size decision that triggers the biggest changes in shipping, hardware, and installer method.
          </li>
        </ul>
        <p>
          For the comparison framework that decides between product families, see the <a href="/blog/architectural-glass-types-guide" className="text-[#DAA745] hover:underline">glass types pillar</a>. For the fabrication processes behind each product, see the <a href="/blog/architectural-glass-manufacturing-guide" className="text-[#DAA745] hover:underline">manufacturing pillar</a>. For how glass specifications map to real building zones, see the <a href="/blog/architectural-glass-applications-guide" className="text-[#DAA745] hover:underline">applications pillar</a>. For the procurement cycle around the specification, see the <a href="/blog/architectural-glass-china-buyer-guide" className="text-[#DAA745] hover:underline">buyer-guide pillar</a>.
        </p>

        <RelatedProductsCards
          slugs={article.relatedProductSlugs || ["tempered-glass", "laminated-glass", "insulated-glass", "low-e-glass", "enameled-glass"]}
        />
      </BlogArticleLayout>
    </>
  );
}
