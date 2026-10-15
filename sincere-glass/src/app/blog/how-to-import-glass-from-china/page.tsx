import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from "@/components/blog/BlogArticleLayout";
import TLDRBox from "@/components/blog/TLDRBox";
import { FAQ, TechNote } from "@/components/blog/blocks";
import CostDisclaimer from "@/components/blog/CostDisclaimer";
import LeadMagnetCTA from "@/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/components/blog/RelatedProductsCards";
import SupplierVerificationScorecard from "@/components/blog/article-13/SupplierVerificationScorecard";
import IncotermsExplorer from "@/components/blog/article-13/IncotermsExplorer";
import ContainerLoadCalculator from "@/components/blog/article-13/ContainerLoadCalculator";
import { blogArticles } from "@/lib/blog-registry";
import { makeAlternates } from "@/lib/i18n";

const article = blogArticles.find((a) => a.slug === "how-to-import-glass-from-china")!;

export const metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates("/blog/how-to-import-glass-from-china"),
};

const toc: TOCItem[] = [
  { id: "who-this-is-for", text: "Who this is for", level: 2 },
  { id: "the-five-stages", text: "The 5-stage import journey", level: 2 },
  { id: "stage-1", text: "Stage 1 — Shortlist suppliers", level: 2 },
  { id: "stage-2", text: "Stage 2 — Verify capability", level: 2 },
  { id: "stage-3", text: "Stage 3 — Specify and quote", level: 2 },
  { id: "stage-4", text: "Stage 4 — Logistics and Incoterms", level: 2 },
  { id: "stage-5", text: "Stage 5 — QC and container loading", level: 2 },
  { id: "landed-cost", text: "Full landed-cost build-up", level: 2 },
  { id: "red-flags", text: "7 red flags that signal problems", level: 2 },
  { id: "faq", text: "Frequently asked questions", level: 2 },
];

const faqItems = article.buyerFaq || [];

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
        <TLDRBox takeaways={article.tldr || []} />

        <p>
          Sourcing architectural glass from China can cut a project&apos;s glazing budget by 30–50% versus local supply in North America, Europe or the Gulf — but only if the import process is run with the same discipline the project itself demands. The savings disappear fast when a container of tempered panels arrives with the wrong hardware cut-outs, when a laminated glass unit fails EN testing at port of entry, or when a &quot;jumbo&quot; order gets split across three factories because the first one lied about its furnace size.
        </p>

        <p>
          This guide is written from inside a 20,000 m² Wuhan glass plant. It walks through the five stages every serious buyer runs — shortlisting, capability verification, quoting, logistics, and QC — plus the paperwork, Incoterms and container-loading math that decide whether the glass arrives at your site intact and on budget.
        </p>

        <h2 id="who-this-is-for">Who this is for</h2>

        <p>This playbook assumes you fall into one of four roles:</p>

        <ul>
          <li>
            <strong>Project architects or specifiers</strong> who have decided the glass make-up (e.g. 6-1.52-6 PVB laminate, Low-E #2) and need to source the actual panels from an export market.
          </li>
          <li>
            <strong>Glazing contractors</strong> comparing a direct China buy against a local distributor markup for jobs where panel count exceeds roughly 200 m² — the volume where direct import begins to beat local pricing after freight.
          </li>
          <li>
            <strong>Developers or facade consultants</strong> running early budgets who need realistic FOB and landed numbers to defend the glass line item.
          </li>
          <li>
            <strong>First-time importers</strong> at trading firms who have a buyer lined up but have never run a glass container before.
          </li>
        </ul>

        <p>
          If you need a refresher on glass product selection before sourcing, start with our <a href="/blog/architectural-glass-types-guide">architectural glass types guide</a>. If you&apos;re weighing a specific application, our <a href="/blog/curtain-wall-glass-specification">curtain wall glass specification</a> walk-through covers the spec side before this covers the buy side.
        </p>

        <h2 id="the-five-stages">The 5-stage import journey</h2>

        <p>
          A direct import from a Chinese glass factory takes between 6 and 14 weeks from first contact to glass on site, depending on panel count, make-up complexity, and sea freight transit time. The steps are the same whether you buy ten panels or ten containers:
        </p>

        <ol>
          <li><strong>Shortlist suppliers</strong> — 3 to 5 candidates vetted against a credentials + capability + communication scorecard.</li>
          <li><strong>Verify capability</strong> — paper credentials in hand, physical samples ordered, factory audit (video or on-site) scheduled.</li>
          <li><strong>Specify and quote</strong> — a disciplined RFQ that leaves no interpretation room, cross-compared on apples-to-apples terms.</li>
          <li><strong>Logistics and Incoterms</strong> — the Incoterm choice determines who pays for what and, more importantly, where risk transfers.</li>
          <li><strong>QC and container loading</strong> — pre-shipment inspection, vessel booking, VGM declaration, bill of lading.</li>
        </ol>

        <TechNote type="tip" title="The order matters">
          <p>
            Buyers who try to compress Stage 1 and 2 into one email thread (&quot;send me a quote and your certs&quot;) end up with cheap bids from factories that can&apos;t actually produce the specification. Spend two weeks on supplier vetting; the four weeks of production will go faster for it.
          </p>
        </TechNote>

        <h2 id="stage-1">Stage 1 — Shortlist suppliers</h2>

        <p>
          Alibaba.com, Made-in-China, and trade-show directories (Guangzhou Fair, Fenestration China, Vitrum) will each give you between 20 and 200 candidate factories for a given glass type. That list has to be cut to 3–5 before any serious conversation starts. The scorecard below is the one we recommend buyers run on us and our competitors alike.
        </p>

        <p>
          <strong>How the scorecard works:</strong> ten verification items are grouped into three dimensions — Credentials (40 points: ISO 9001, 3C/CCC, EN tests, business license, export rights), Capability (35 points: furnace or autoclave envelope match for your largest panel, monthly capacity at least 3× your order volume, three or more reference projects in the same product category), and Communication (25 points: 24-hour technical response in your working language, willingness to send a paid sample before PO). Tick what you have verified in writing. The resulting score sits in one of four tiers: 81–100 Preferred Supplier (proceed to RFQ), 61–80 Qualified (resolve open items before PO), 31–60 Caution (only proceed with factory audit and payment safeguards), 0–30 High Risk (walk away). Weightings are deliberately heaviest on equipment-envelope match and technical communication speed — the two attributes most predictive of execution risk.
        </p>

        
      <p className="text-sm text-[#8B95A5] italic my-6">
        For the deep-dive playbook on supplier vetting — the 5-risk threat model, cert verifier, and the 90-minute video audit script —
        see <a href="/blog/architectural-glass-supplier-china-vetting" className="text-[#DAA745]">how to vet a china glass supplier</a>.
      </p>
<SupplierVerificationScorecard />

        <p>
          A supplier below 61 points is not a candidate — move on. A supplier at 61–80 is a candidate with specific open items; those items go on your Stage 2 verification list. Only suppliers scoring above 81 skip ahead to RFQ.
        </p>

        <p>
          The weighting isn&apos;t arbitrary. &quot;Furnace or autoclave can handle your largest panel&quot; carries 15 points because the single most common failure mode in a China glass buy is the factory accepting a drawing it cannot physically produce, then outsourcing the oversize pieces to a plant you&apos;ve never audited. In our Wuhan plant, our 3m × 15m tempering furnace and matching 3m × 15m lamination autoclave let us keep jumbo panels in-house end-to-end — a specific capability the scorecard is designed to force into the open before you quote.
        </p>

        <h2 id="stage-2">Stage 2 — Verify capability</h2>

        <p>
          Credentials on a brochure are not credentials. For each shortlisted supplier, you want to see:
        </p>

        <ul>
          <li>
            <strong>ISO 9001:2015 certificate</strong> — issued by a recognised certification body (SGS, TÜV, BV, Intertek, DNV). Verify the certificate number on the certifier&apos;s website, not just the PDF the factory emails. See the <a href="https://www.iso.org/iso-9001-quality-management.html" target="_blank" rel="noopener noreferrer">ISO 9001 overview</a> for what the standard actually covers.
          </li>
          <li>
            <strong>China 3C (CCC) certificate</strong> under GB 15763.2-2005 for tempered glass, GB 15763.3-2009 for laminated. Legally required for architectural safety glass sold or exported from China. No CCC = the factory is not a legal safety-glass producer.
          </li>
          <li>
            <strong>EN 12150-1:2015 and EN 14449:2005 test reports</strong> if you are shipping into Europe and need CE marking. The test report must name your factory, not a parent group or a &quot;similar&quot; plant.
          </li>
          <li>
            <strong>Project reference list</strong> with photos, project name, and glass make-up. Three real projects beats a glossy portfolio of unlabelled renders.
          </li>
          <li>
            <strong>A physical sample.</strong> This is the step most buyers skip and most regret. A 300×300 mm sample costs USD 20–40 to produce and 60–120 to air-freight. It confirms coating orientation, PVB clarity, edge quality, and whether what the factory calls &quot;Low-E&quot; is actually Low-E. For a six-figure order, this is the cheapest insurance you&apos;ll ever buy.
          </li>
        </ul>

        <p>
          For technical articles that explain what you&apos;re verifying, our deep dives on <a href="/blog/how-is-tempered-glass-made">how tempered glass is made</a> and <a href="/blog/how-is-laminated-glass-made">how laminated glass is made</a> walk through the production steps the factory audit should cover.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug="how-to-import-glass-from-china" />

        <h3>The video factory audit</h3>

        <p>
          An on-site audit by a third-party inspector (SGS, Intertek, QIMA) costs USD 300–600 per factory and is worth it for orders above USD 50,000. For smaller orders, a live video walk-through — scheduled an hour at a time, with the factory contact carrying a phone through specific stations — gets you 80% of the signal at 10% of the cost. Insist on seeing:
        </p>

        <ol>
          <li>The glass-cutting line and edge-grinding station — asking the operator to measure a cut sample with calipers in front of you catches tolerance issues immediately.</li>
          <li>The tempering furnace nameplate (confirms the oven envelope matches what you were told).</li>
          <li>The lamination autoclave and the clean assembly room (lamination defects are 90% a dust-and-humidity story).</li>
          <li>The IGU line, if ordering insulated glass — argon fill station, sealant dispenser, dew-point tester on the QC bench.</li>
          <li>The finished-goods crating area — bad crates destroy more glass than bad production ever will.</li>
        </ol>

        <h2 id="stage-3">Stage 3 — Specify and quote</h2>

        <p>
          A loose RFQ invites loose quotes. Every quote you receive should be built from the same specification sheet so that the three or four returned prices are directly comparable. A production-ready specification includes:
        </p>

        <ul>
          <li>
            <strong>Glass make-up written out in standard notation</strong>, not prose. &quot;6T + 1.52 PVB + 6T, Low-E on #2&quot; is unambiguous. &quot;Laminated tempered glass with Low-E coating&quot; is three questions in a trench coat.
          </li>
          <li><strong>Panel schedule</strong>: for each unique size, the quantity, dimensions (W × H in mm), and any hardware cut-outs or holes with coordinates.</li>
          <li><strong>Edge finish</strong>: flat-ground + arrissed, flat polished, or pencil polished.</li>
          <li><strong>Hardware pre-prep</strong>: holes drilled, hinge cut-outs, patch fitting notches — all with a dimensioned drawing per panel.</li>
          <li><strong>Standards to be met</strong>: cite the clause, not the standard family. &quot;Impact tested per ANSI Z97.1-2015, Class A&quot;, not &quot;ANSI tested.&quot;</li>
          <li><strong>Delivery requirements</strong>: Incoterm (see next section), delivery address or port, latest acceptable arrival date.</li>
          <li><strong>Required documentation</strong>: commercial invoice, packing list, certificate of origin, mill test report, 3C or CE certificate copy, bill of lading.</li>
        </ul>

        <TechNote type="warning" title="Watch the quote comparison">
          <p>
            Three quotes at USD 42, 46, and 58 per m² sound simple. They usually aren&apos;t. Check whether each quote includes crating, inland trucking to the port, export clearance, and what Incoterm it is quoted under before you compare prices. The USD 42 quote is often EXW; the USD 58 is sometimes CIF — which can mean the USD 58 supplier is cheaper landed.
          </p>
        </TechNote>

        <p>
          Standard lead time from our Wuhan plant for a mixed order of <a href="/products/tempered-glass">tempered</a> and <a href="/products/laminated-glass">laminated glass</a> is 25–35 days from PO confirmation to ex-works ready. Low-E coated <a href="/products/insulated-glass">insulated glass units</a> run 30–45 days because the Low-E coating lead time and the IGU dual-seal cure window stack sequentially. Add 1–2 weeks for pre-shipment inspection and container loading. Add transit time per the Incoterm section below.
        </p>

        <h2 id="stage-4">Stage 4 — Logistics and Incoterms</h2>

        <p>
          Incoterms 2020 — the <a href="https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/" target="_blank" rel="noopener noreferrer">International Chamber of Commerce rules</a> that govern who pays, who carries risk, and who clears customs — are the single most-misunderstood part of a China glass buy. The explorer below walks through the four Incoterms you will actually see on a glass invoice.
        </p>

        <p>
          <strong>How the four terms differ:</strong> each successive Incoterm expands the seller&apos;s scope along the shipment chain. <strong>EXW</strong> (Ex Works) ends at the factory gate — the seller crates and the buyer handles everything else. <strong>FOB</strong> (Free On Board) adds inland trucking, export customs clearance and loading at a Chinese port. <strong>CIF</strong> (Cost, Insurance, Freight) further adds ocean freight and minimum marine insurance through arrival at the destination port, but the buyer still clears import customs and handles delivery. <strong>DDP</strong> (Delivered Duty Paid) extends all the way to the project site including import duty and local trucking. One critical nuance: under both FOB and CIF, <em>risk of loss transfers at the Chinese port of loading</em> — not at the destination port — a common buyer misunderstanding that becomes painful when a container is damaged mid-ocean under a CIF quote.
        </p>

        <IncotermsExplorer />

        <p>
          For most architectural glass buyers moving one to five containers, FOB is the right default. It gives you an apples-to-apples factory price, lets your own forwarder shop ocean rates (which can swing 30% between carriers in a single week), and keeps the paperwork simple. CIF is useful when you need a single landed-at-port number for budgeting but can be more expensive than FOB plus your own freight. DDP sounds attractive — one invoice, done — but it buries freight, duty, and clearance costs into a price you cannot verify, and few serious glass exporters have the import-side infrastructure to deliver it reliably.
        </p>

        <TechNote type="note" title="SOLAS VGM — don't be surprised by this">
          <p>
            Under SOLAS Chapter VI, Regulation 2 (as amended by the IMO 2016 VGM rules), the shipper is legally required to declare the Verified Gross Mass of every packed container before the vessel sails. For glass containers, the factory calculates VGM from the panel weights and crate tare and submits it to the forwarder. If this isn&apos;t done, the container doesn&apos;t load. A competent exporter handles it silently; a disorganised one causes last-minute delays. Ask about VGM procedure during supplier vetting.
          </p>
        </TechNote>

        <h2 id="stage-5">Stage 5 — QC and container loading</h2>

        <p>
          Pre-shipment inspection is the last chance to catch a problem before glass is at sea. Two options exist:
        </p>

        <ul>
          <li>
            <strong>Self-inspection by the factory QC team</strong> — the default. The factory issues an inspection report with coverage of flatness, edge quality, dimensional tolerance, coating orientation, laminated interlayer clarity, and IGU seal integrity. Request this report in writing before the goods leave the plant.
          </li>
          <li>
            <strong>Third-party inspection</strong> — SGS, Intertek, QIMA, Bureau Veritas. Costs USD 300–500 per inspection day for a glass factory. Independent and highly recommended on orders above USD 30,000 or for first-time buyers.
          </li>
        </ul>

        <p>
          Either way, the inspection checklist for architectural glass should cover: panel count against packing list; dimensional tolerance (typically ±2mm for cut sizes, ±1mm for toughened); visual defects per <a href="https://www.glass.org/" target="_blank" rel="noopener noreferrer">NGA (National Glass Association)</a> or EN 572-8 limits; edge chipping; laminated interlayer bubbles or delamination; IGU edge seal integrity and desiccant check; coating-orientation verification using a Low-E detector pen; crate integrity and corner-protection presence.
        </p>

        <h3>Container loading math</h3>

        <p>
          <strong>The formula:</strong> each square metre of glass weighs approximately thickness (mm) × 2.5 kg (soda-lime float density = 2500 kg/m³, so 1 mm of glass over 1 m² weighs 2.5 kg). Add roughly 18% to total glass weight to account for A-frame crates, dunnage, moisture bags and corner protection. Divide the resulting shipped weight by the container&apos;s road-legal payload cap to get container count: approximately 24,000 kg for a standard 20&apos; Dry Container, 26,000 kg for a 40&apos; High Cube in most jurisdictions. For architectural glass, the 20&apos;DC fills to its weight cap long before its 33 m³ cube — so container count is driven by kilograms, not panel geometry, and 20&apos;DC is the default except when panel height exceeds roughly 2.6 m.
        </p>

        <ContainerLoadCalculator />

        <p className="text-sm text-[#8B95A5] italic mt-2">
          For the operational pack side of this — crate types, loading protocol, damage prevention, insurance, and the pre-seal photo checklist — see our deep dive on <a href="/blog/glass-shipping-container-loading-guide">glass container shipping</a>.
        </p>

        <p>
          A 20&apos; container is almost always the right choice for architectural glass because the limit is weight, not cube — a loaded 20&apos; of 10mm tempered will hit the 24-tonne payload cap long before it fills the 33 m³ of interior volume. 40&apos; High Cube containers earn their place only when panel heights exceed roughly 2.6 m, where a 20&apos; A-frame crate won&apos;t fit the panels standing up.
        </p>

        <h2 id="landed-cost">Full landed-cost build-up</h2>

        <p>
          A worked example makes the pieces concrete. Assume you&apos;re importing 100 panels of 6-1.52-6 clear laminated glass, 1500 × 2500 mm, destined for Los Angeles. Using the container calculator above the shipment is approximately 2,650 kg of glass + crate overhead = 3,100 kg, well under one 20&apos; container (which can carry up to ~24 tonnes of glass).
        </p>

        <div className="overflow-x-auto my-6">
          <table
            className="w-full border-collapse text-sm"
            aria-label="Worked example — landed cost build-up for 100 panels of 6-1.52-6 laminated glass, Shanghai FOB to Los Angeles, Q4 2026 reference rates"
          >
            <caption className="text-left text-[#8B95A5] text-xs mb-3">
              Indicative landed cost — 100 panels × 1.5m × 2.5m × 6-1.52-6 laminate, Shanghai → Los Angeles. Data verified 2026-10-13; all figures reference pricing in USD, subject to live quotation.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="text-left py-3 px-4 font-medium text-[#F2F0ED] border-b border-[#3A4250]/40">Cost line</th>
                <th scope="col" className="text-right py-3 px-4 font-medium text-[#F2F0ED] border-b border-[#3A4250]/40 bg-[#3A4250]/10">USD (indicative)</th>
                <th scope="col" className="text-left py-3 px-4 font-medium text-[#F2F0ED] border-b border-[#3A4250]/40">Note &amp; source</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#3A4250]/20">
                <td className="py-3 px-4 text-[#8B95A5] font-medium">Glass FOB Shanghai</td>
                <td className="py-3 px-4 text-right text-[#F2F0ED]">8,250</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">100 panels × 3.75 m² × USD 22/m² (Sincere Glass Q4 2026 export reference)</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <td className="py-3 px-4 text-[#8B95A5] font-medium">Export crating</td>
                <td className="py-3 px-4 text-right text-[#F2F0ED]">450</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">A-frame, dunnage, moisture bags (usually in FOB)</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <td className="py-3 px-4 text-[#8B95A5] font-medium">Ocean freight (20&apos; to LAX)</td>
                <td className="py-3 px-4 text-right text-[#F2F0ED]">2,400</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">All-in; varies USD 1,700–3,400 by season — verify live with your forwarder</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <td className="py-3 px-4 text-[#8B95A5] font-medium">Marine insurance (0.3% of CIF value)</td>
                <td className="py-3 px-4 text-right text-[#F2F0ED]">35</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">Buy it. The savings vs a broken-container claim is lopsided.</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <td className="py-3 px-4 text-[#8B95A5] font-medium">US import duty (HTSUS 7005 / 7007)</td>
                <td className="py-3 px-4 text-right text-[#F2F0ED]">410</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">
                  4.9% MFN rate per 2026 USITC HTS; verify current classification at{" "}
                  <a href="https://hts.usitc.gov/" target="_blank" rel="noopener noreferrer">hts.usitc.gov</a>
                </td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <td className="py-3 px-4 text-[#8B95A5] font-medium">Customs broker + port fees</td>
                <td className="py-3 px-4 text-right text-[#F2F0ED]">650</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">Entry, bond, THC, chassis, pre-pull — US West Coast Q4 2026 market</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <td className="py-3 px-4 text-[#8B95A5] font-medium">Inland trucking to site (50 miles)</td>
                <td className="py-3 px-4 text-right text-[#F2F0ED]">550</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">Container drayage + flatbed if needed</td>
              </tr>
              <tr className="border-b border-[#3A4250]/40 bg-[#DAA745]/10">
                <td className="py-3 px-4 font-semibold text-[#DAA745]">Landed cost at site</td>
                <td className="py-3 px-4 text-right font-bold text-[#DAA745]">12,745</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">= USD 34.0 / m² delivered</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <strong>How we calculated this:</strong> line items are built bottom-up from the factory ex-works price. FOB adds inland trucking, export clearance and loading, typically absorbed into the per-m² FOB quote for routine lanes. Ocean freight is a per-container all-in rate from the Chinese FOB port to the named destination port, sourced from current forwarder quotes rather than published tariff — rates fluctuate roughly 30% between carriers in a single week and move seasonally with Chinese New Year and pre-US-holiday peaks. Marine insurance is calculated at 0.3% of CIF value (= FOB + freight). Import duty uses the current MFN rate for HTSUS heading 7005 (float glass) or 7007 (safety glass) — <a href="https://hts.usitc.gov/" target="_blank" rel="noopener noreferrer">verify current classification at hts.usitc.gov</a>. Broker, port fees and inland drayage are standard US West Coast market rates for a 20&apos; container in Q4 2026. For a specific project, replace each line with a live quote from the party quoting it; this table is a budget check, not a quotation.
        </p>

        <p>
          By comparison, the same specification sourced from a North American distributor typically runs USD 55–80 per m² delivered, depending on volume. The 40–60% delta is real and reproducible on orders above roughly 200 m² — below that threshold, freight and clearance fixed costs eat the saving.
        </p>

        <CostDisclaimer />

        <h2 id="red-flags">7 red flags that signal problems</h2>

        <p>
          These are patterns we&apos;ve seen on the Chinese side of the market over 15 years of domestic sales and a growing export pipeline. If you see two or more on the same supplier, walk.
        </p>

        <ol>
          <li>
            <strong>&quot;We can do any size&quot; without naming equipment.</strong> Legitimate factories cite furnace envelope and autoclave size. A supplier that can&apos;t name the equipment is reselling.
          </li>
          <li>
            <strong>Quote arrives in 10 minutes with no questions asked.</strong> A real production quote requires at least one clarification round on edge finish, hardware, Low-E orientation, or packing. An instant quote is a guess.
          </li>
          <li>
            <strong>No willingness to issue a Pro-Forma Invoice.</strong> A Pro-Forma is a 30-minute document. Refusal usually means the quoted price is unstable or the entity on the invoice is not the entity on the certificate.
          </li>
          <li>
            <strong>Payment terms demand 100% T/T in advance.</strong> Industry norm is 30% deposit on PO, 70% against copy of bill of lading. 100% T/T is a cash-flow problem the factory is trying to make you solve.
          </li>
          <li>
            <strong>Certificates in a different company name than the invoice.</strong> This is the single most common export-fraud pattern. The entity that holds the CCC must be the entity that invoices and ships.
          </li>
          <li>
            <strong>Vague on the Incoterm.</strong> &quot;All-in price&quot; and &quot;delivered price&quot; are not Incoterms. If the supplier won&apos;t commit to EXW, FOB, CIF or DDP, they do not know what they are selling.
          </li>
          <li>
            <strong>No pre-shipment inspection permitted.</strong> A factory that refuses third-party inspection access is a factory you cannot ship from.
          </li>
        </ol>

        <h2 id="faq">Frequently asked questions</h2>

        <FAQ items={faqItems} />

        <RelatedProductsCards slugs={article.relatedProductSlugs || []} />

        <LeadMagnetCTA variant="footer" articleSlug="how-to-import-glass-from-china" />
      </BlogArticleLayout>
    </>
  );
}
