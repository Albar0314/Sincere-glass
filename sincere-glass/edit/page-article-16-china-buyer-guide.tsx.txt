import type { Metadata } from "next";
import { blogArticles } from "@/lib/blog-registry";
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from "@/components/blog/BlogArticleLayout";
import TLDRBox from "@/components/blog/TLDRBox";
import LeadMagnetCTA from "@/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/components/blog/RelatedProductsCards";
import CostDisclaimer from "@/components/blog/CostDisclaimer";
import FAQ from "@/components/blog/blocks/FAQ";
import { makeAlternates } from "@/lib/i18n";

import SourcingLifecycleMap from "@/components/blog/article-16/SourcingLifecycleMap";
import BuyerArchetypeSelector from "@/components/blog/article-16/BuyerArchetypeSelector";
import SourcingBudgetEstimator from "@/components/blog/article-16/SourcingBudgetEstimator";

const SLUG = "architectural-glass-china-buyer-guide";
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const TOC: TOCItem[] = [
  { id: "who-this-is-for", text: "Who This Guide Is For", level: 2 },
  { id: "why-china", text: "Why China (and When It is Not the Right Call)", level: 2 },
  { id: "lifecycle", text: "The Sourcing Lifecycle: 6 Phases", level: 2 },
  { id: "archetype", text: "Buyer Archetype → Recommended Path", level: 2 },
  { id: "budget", text: "Budget Reality Check", level: 2 },
  { id: "five-risks", text: "The 5 Risks First-Time Buyers Underestimate", level: 2 },
  { id: "hub-nav", text: "When to Use Which Chapter", level: 2 },
  { id: "faq", text: "Frequently Asked Questions", level: 2 },
];

const FAQ_ITEMS = [
  {
    q: "Can I buy architectural glass directly from a Chinese factory as a small overseas buyer?",
    a: "Yes. Factories like ours regularly ship single-container orders (roughly 250–400 m² of IGU, more for monolithic tempered) to overseas distributors and single-project contractors. The practical minimum for a direct FOB order is one 20-foot container; below that, LCL shipments and middleman costs usually push unit prices back up to the point where a local distributor is cheaper.",
  },
  {
    q: "What is a realistic lead time from signed PO to glass on site?",
    a: "For a mid-complexity Low-E IGU order of 1–2 containers: 4–6 weeks production, 4–6 weeks ocean transit (China to US West Coast or EU Mediterranean), 1–2 weeks customs and inland. Call it 10–14 weeks door-to-door with no surprises. Jumbo panels, SGP lamination, or coated specialty glass can add 2–3 weeks. Build at least a 2-week schedule buffer at the install side.",
  },
  {
    q: "What payment terms should I expect from a first-time Chinese supplier?",
    a: "30% T/T on PO signing, 70% T/T against copy of bill of lading before container release is the typical first-order structure. L/C at sight is possible but factories often price it 2–4% higher to cover bank fees and risk. After 2–3 successful shipments, repeat buyers can usually negotiate 20/80 or L/C 30 days without a surcharge. 100% T/T upfront is a red flag; refuse it.",
  },
  {
    q: "Do Chinese factories hold the certifications my project actually requires?",
    a: "The baseline is ISO 9001 (quality system) and Chinese 3C (CCC) certification for safety glass, which most reputable factories hold. For destination-market certifications — CE marking for EU, SGCC for US safety glazing, AS/NZS 2208 for Australia — availability varies by factory and by product line. Confirm the exact certification holder, product scope, issuing body, and expiry date before contract. The supplier vetting guide covers how to verify these without taking the factory's word for it.",
  },
  {
    q: "Who is responsible if glass arrives damaged?",
    a: "Depends on the Incoterm. Under FOB (common for container shipments), risk transfers to you once the glass is loaded onto the vessel. Marine insurance (ICC A clause is strongest for architectural glass) is on you to arrange and claim. Under DDP, the factory covers risk through to your destination, but DDP pricing adds significant markup and factories often sub-contract the import clearance, so arrival-condition disputes get murky. Most direct-import architectural glass buyers run FOB + their own insurance.",
  },
  {
    q: "What is the difference between a factory and a trading company, and does it matter?",
    a: "A factory owns the production lines and controls quality directly. A trading company places orders at multiple factories on your behalf, typically marking up 5–15%. Trading companies can be legitimate — they add value for buyers who need a single contact handling multiple product lines from multiple factories. Problems arise when a trading company presents itself as a factory, because you lose direct visibility into which factory is making your glass and whether it has the capability you specified. The vetting guide shows how to tell them apart.",
  },
  {
    q: "How do I handle quality disputes if a shipment arrives defective?",
    a: "Three practical steps: (1) Photograph every defective panel before unloading, with the container seal and bill of lading in the same frame as proof of pre-opening condition. (2) File the marine insurance claim within 7 days of arrival (ICC A clauses typically have strict notification windows). (3) Open a dispute with the factory in writing, referencing the contractual defect tolerance and liquidated damages clauses. Factories that want repeat business usually resolve legitimate claims with partial credit or replacement in the next shipment; factories that stall are telling you something about the relationship.",
  },
  {
    q: "Do I need a Chinese-speaking agent or inspector in China?",
    a: "Not required, but valuable for first-time buyers. Third-party inspection firms (SGS, Bureau Veritas, Intertek, TÜV) run Chinese-staffed inspection services starting around $300–$500 per pre-shipment check. They send a certified inspector to the factory floor, run your spec checklist, photograph the loaded container, and issue a report before container seal. For contractors on single projects where a bad shipment stops the job, this is cheap insurance. For repeat buyers, you can usually negotiate with the factory to let your inspector into mid-production.",
  },
];

export default function ChinaBuyerGuidePillarPage() {
  const schemas = articleJsonLd(article, FAQ_ITEMS);

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <BlogArticleLayout
        article={article}
        toc={TOC}
        ctaTitle="Sourcing architectural glass from China?"
        ctaDescription="Sincere Glass runs a 20,000 m² Wuhan facility with jumbo 3m × 15m tempering and lamination lines. Send your specification and we will come back with a line-item quote, lead time, and the certifications your project needs."
      >
        <TLDRBox
          takeaways={[
            "China produces most of the world's architectural glass, but factory capability varies enormously. The right question is not whether to source from China — it is which factory, verified how, under what contract.",
            "There are 6 phases in the sourcing lifecycle. Three of them (vetting, RFQ, shipping) have dedicated deep-dive guides. Use this page to decide which phase you are in and jump to the right one.",
            "The 4 buyer archetypes (distributor, contractor, architect, developer) optimize for different things. Your reading priority through this cluster depends on which one you are.",
            "Landed cost for mid-complexity Low-E IGU runs roughly $60–$110/m² landed at destination port, depending on volume and freight mode. Any one-number quote without specification scrutiny is quoting on hidden assumptions.",
            "The 5 risks first-time buyers underestimate: capability mismatch, specification drift, quality drift post-first-shipment, Incoterm/insurance mismatch, and dispute recourse. Each is covered in detail in a dedicated chapter.",
          ]}
        />

        <p className="lead">
          If you are reading this page, you are probably at one of three starting points: a project specification in hand with no supplier yet, a shortlist of Chinese factories with no way to tell which one to pick, or a first shipment that did not go as planned and a decision to make about shipment number two. This guide is a hub. It will not teach you everything about any single topic — the deep-dive chapters do that. It will help you figure out which chapter you need, in what order, and what questions to be asking before you place your next order.
        </p>

        <h2 id="who-this-is-for">Who This Guide Is For — and Which Chapter You Actually Need</h2>

        <p>
          The Buyer&apos;s Guide cluster on this site is written for people buying architectural glass from Chinese factories directly, not through a local distributor. That includes four very different kinds of buyers, each with different concerns.
        </p>

        <p>
          A small distributor who imports 1–3 containers at a time and resells domestically cares most about consistent quality batch to batch and payment terms that match their cash flow. A general contractor sourcing glass for a single building project cares about on-time delivery to site and about not being the person who has to explain why install stopped for three weeks. An architect writing specifications cares about whether the glass they specified can actually be made at the sizes drawn and about whether their specification will survive the value-engineering phase. A developer with a project pipeline cares about preferred-supplier agreements, standardized SKUs across projects, and quality tracking over 2–3 years.
        </p>

        <p>
          Those four buyer types read these guides in different orders and lean on different parts of them. The interactive selector in section 4 maps each buyer type to a recommended reading sequence. If you jump straight to that section, nothing in this guide requires you to read it top-to-bottom first.
        </p>

        <h2 id="why-china">Why China for Architectural Glass (And When It is Not the Right Call)</h2>

        <p>
          China produces roughly half of the world&apos;s flat glass, with large concentrations of fabrication capability in Guangdong, Jiangsu, Shandong, and Hubei. For architectural buyers, three practical facts drive the sourcing decision.
        </p>

        <p>
          <strong>First, scale and specialization.</strong> A mid-tier Chinese fabricator typically runs 2–4 tempering furnaces, 1–3 lamination autoclaves, and 1–2 IGU assembly lines in a single 20,000 m² facility. Our own Wuhan factory, for example, has 4 cutting lines, 4 edge-grinding lines, 2 tempering furnaces (including one that handles jumbo 3m × 15m panels), 2 IGU lines, and 2 lamination autoclaves (one also 3m × 15m). This matters because jumbo panels — above about 2.5m × 6m — are hard to source outside China at competitive pricing. The capability exists in Europe and North America but typically through specialty fabricators at a 40–80% premium.
        </p>

        <p>
          <strong>Second, unit pricing.</strong> On commodity architectural glass — standard-size clear tempered, basic laminated, standard-size Low-E IGU — FOB Chinese pricing runs roughly 40–60% below equivalent European or North American manufacturing cost. Freight and duty close part of that gap, but landed pricing to most global markets still favors China by 15–35% for mid-volume orders.
        </p>

        <p>
          <strong>Third, lead time flexibility.</strong> Chinese factories operating multiple parallel production lines can usually accept a new order into a 4–6 week production slot without major re-scheduling. European and North American fabricators with fuller order books often quote 8–16 week production windows for the same work.
        </p>

        <p>
          <strong>Where China is not the right call.</strong> If your project needs a specific tested system certification that only a handful of global fabricators hold — hurricane impact-rated systems to Miami-Dade NOA, for example, or specific bomb-blast ratings — the certified product list may not include a Chinese-made alternative. If your project volume is tiny (one or two panels), the per-container overhead on direct import kills the price advantage. And if your schedule is so tight that any shipping delay stops the job, a domestic fabricator with 2-week delivery wins over a China import with a 10-week lead time, even at higher unit cost.
        </p>

        <p>
          The honest version: China is the default for mid-volume commodity architectural glass. For specialty certifications, tiny orders, or extremely tight schedules, verify there is no local alternative before defaulting to import.
        </p>

        <h2 id="lifecycle">The Sourcing Lifecycle: 6 Phases from Spec to Site</h2>

        <p>
          Sourcing architectural glass from a Chinese factory is a 6-phase process that typically takes 14–24 weeks from the moment you decide to source until the glass is on your site. Each phase has a different owner, a different time budget, and a different set of risks. The interactive map below is both a mental model and a navigation tool: click any phase to see what happens, and jump to the dedicated deep-dive guide if one exists for that phase.
        </p>

        <p>
          <em>How to read it:</em> the pipeline runs left to right across the six phases — define specification, shortlist factories, vet suppliers, RFQ and sampling, production and inspection, ship and land. Each phase shows its owner (you, the factory, or a third party), its typical time budget in weeks, a plain-prose summary of what happens, and the key risks that live at that phase. Phases 3, 4, and 6 have deep-dive articles — the detail link appears when they do. Phases 1, 2, and 5 are covered within this hub guide and in the FAQ.
        </p>

        <SourcingLifecycleMap />

        <p>
          Two things to notice about the lifecycle. First, the three phases with deep-dive guides are the three where things most commonly go wrong: supplier vetting (phase 3), RFQ and contracting (phase 4), and shipping (phase 6). The other three phases are not risk-free, but their failures are usually in your control. Second, the time budget is dominated by production (phase 5) and shipping (phase 6). If you compress elsewhere, you save weeks; if you compress on those two, you buy months of trouble.
        </p>

        <h2 id="archetype">Buyer Archetype → Recommended Sourcing Path</h2>

        <p>
          Not every buyer should run the same playbook. A small distributor who places 4–8 repeat orders a year optimizes differently from a contractor on a one-shot project; an architect writing a specification needs a different lens than a developer with a project pipeline. The selector below maps the four most common buyer archetypes to a recommended sourcing path and a reading order through this cluster.
        </p>

        <p>
          <em>How to read it:</em> pick the archetype that best fits your situation. The panel below shows typical order volume, the three or four things you should be optimizing for, a one-paragraph recommended sourcing path, and your reading priority through the three deep-dive chapters — ranked, with a short explanation of why each one matters for your archetype. Each archetype also carries a single &quot;one thing to avoid&quot; — the mistake we see most often from that type of buyer.
        </p>

        <BuyerArchetypeSelector />

        <p>
          Pick the archetype that fits best; nothing stops you from reading the chapters in a different order. The point of the selector is that the hierarchy of concerns changes with your situation. A one-time contractor who optimizes like a repeat distributor over-invests in long-term supplier development; a repeat distributor who optimizes like a one-time contractor over-inspects every shipment and burns margin.
        </p>

        <LeadMagnetCTA
          variant="inline"
          articleSlug={SLUG}
          title="Free: Global Architectural Glass Building Codes Comparison"
          description="A side-by-side reference for architectural glass regulations across US IBC, EU EN, China GB, and Australia AS — useful when writing specs or verifying what a Chinese factory can actually certify to."
        />

        <h2 id="budget">Budget Reality Check: What Does China-Sourced Glass Actually Cost?</h2>

        <p>
          The hardest part of sourcing is not finding a factory — it is building a budget range you can defend to your own team or client. Most first-time buyers underestimate the gap between FOB price and landed cost. Freight, duty, destination handling, and inland transport typically add 20–45% on top of FOB pricing, depending on volume, mode, and destination.
        </p>

        <p>
          <em>How to read it:</em> enter your total project area in square meters, pick the complexity tier that matches what you are buying, and pick the freight mode. The estimator shows FOB (ex-factory Wuhan), freight, duty, and total landed cost — all as ranges, not single numbers. Below the headline, the breakdown shows which component drives which part of the range. If your inputs point at a mismatch (FCL with too little volume, or LCL with too much), the warning banner surfaces it. All figures assume typical US/EU main-port destinations and are refreshed quarterly.
        </p>

        <SourcingBudgetEstimator />

        <CostDisclaimer />

        <p>
          Two patterns worth understanding before you quote these numbers to anyone. The first is that the FOB range for every complexity tier is wide for a reason: edge finish, hole positions, coating choice, interlayer brand (Trosifol vs generic PVB, Kuraray SGP vs lookalike), and panel size variance within an order all move price by $5–$25/m² each. A factory quoting the low end of our range is quoting on narrower options than one quoting the high end; comparing &quot;unit price&quot; without comparing specifications is the single most common sourcing mistake.
        </p>

        <p>
          The second pattern is that duty and destination charges are volatile. US tariffs on Chinese architectural glass have ranged from 4.9% baseline (HS 7005) up to over 25% during trade-war surcharges. EU duties are more stable (3.0% for most HS 7007 laminated). Confirm your HS code with your customs broker before locking a budget, and check that classification against the actual spec once samples arrive — misclassified glass gets held at port and sometimes reclassified at a higher rate.
        </p>

        <h2 id="five-risks">The 5 Risks First-Time Buyers Underestimate</h2>

        <p>
          Every sourcing deep-dive in this cluster is organized around one or more of these five risks. Listing them here is a map, not a replacement for the detail.
        </p>

        <p>
          <strong>Risk 1 · Capability mismatch.</strong> The factory can take your order on paper but cannot actually produce it to spec. Common versions: a factory that laminates PVB taking an SGP order (different interlayer, different autoclave cycle, different QC), or a factory with a 2.4m-wide tempering furnace taking an order with 2.8m-wide panels. Mitigation is video audit of the specific production lines running your spec, with your panels&apos; dimensions visible on-screen against the equipment. Covered in the <a href="/blog/architectural-glass-supplier-china-vetting">supplier vetting guide</a>.
        </p>

        <p>
          <strong>Risk 2 · Specification drift.</strong> You wrote &quot;laminated glass, PVB interlayer, 1.52 mm&quot; and the factory quoted on that; after PO signing, they ask whether a generic PVB is acceptable instead of the branded one you had in mind. If you say yes to save a few dollars, you have just lost traceability and warranty backing. The mitigation is a specification tight enough that cheaper substitutes get rejected at submittal review, and a contract that lists approved interlayer brands by name.
        </p>

        <p>
          <strong>Risk 3 · Quality drift after the first shipment.</strong> The first shipment is immaculate because the factory wants the account. By shipment three or four, panel-level defect rates have crept up and the factory assumes you will not catch it because the install crew is already pouring sealant. Mitigation is per-shipment inspection — not just the first one — and a defect-rate running average tracked by month. Covered in the <a href="/blog/architectural-glass-supplier-china-vetting">supplier vetting guide</a>.
        </p>

        <p>
          <strong>Risk 4 · Incoterm and insurance mismatch.</strong> You signed FOB because the price was lower, but you did not arrange marine insurance appropriate for architectural glass; a container tips during port handling, and the standard cargo insurance pays out the raw material value, not the fabricated panel value. Mitigation is picking the Incoterm with your eyes open and matching insurance scope to the actual exposure. Covered in the <a href="/blog/how-to-import-glass-from-china">5-stage import guide</a> and the <a href="/blog/glass-shipping-container-loading-guide">container loading playbook</a>.
        </p>

        <p>
          <strong>Risk 5 · Dispute recourse.</strong> Something goes wrong — delayed shipment, defect rate above tolerance, wrong color — and your contract either does not specify how disputes resolve, or specifies a forum (Chinese courts, CIETAC arbitration) that is slow and expensive to pursue from outside China. Mitigation is a dispute-resolution clause in writing from the start, with the forum, the governing law, and the escalation steps specified. The practical fallback for most first-time buyers is to hold enough payment back (via L/C or 70/30 T/T) that walking away from a bad final payment is cheaper for the factory than fighting it.
        </p>

        <h2 id="hub-nav">When to Use Which Chapter of This Guide</h2>

        <p>
          Use this as a jump table for the Buyer&apos;s Guide cluster.
        </p>

        <div className="my-6 overflow-x-auto">
          <table
            className="w-full text-sm border-collapse"
            aria-label="Jump table: which Buyer's Guide chapter covers which situation"
          >
            <caption className="text-left text-xs text-[#8B95A5] italic pb-3">
              Hub navigation table — pick your situation and jump to the chapter that covers it. Data verified: 2026-10-19.
            </caption>
            <thead>
              <tr className="border-b border-[#DAA745]/40">
                <th scope="col" className="text-left py-2.5 px-3 text-[#DAA745] font-semibold">
                  If you are here
                </th>
                <th scope="col" className="text-left py-2.5 px-3 text-[#DAA745] font-semibold">
                  Read this chapter
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#3A4250]/30">
                <td scope="row" className="py-3 px-3 text-[#F2F0ED]/90 align-top">
                  You have a specification and a shortlist of factories, and you need to verify them before RFQ.
                </td>
                <td className="py-3 px-3 align-top">
                  <a href="/blog/architectural-glass-supplier-china-vetting" className="text-[#DAA745] no-underline hover:underline">
                    Supplier Vetting Threat Model →
                  </a>
                </td>
              </tr>
              <tr className="border-b border-[#3A4250]/30">
                <td scope="row" className="py-3 px-3 text-[#F2F0ED]/90 align-top">
                  You have a vetted factory and you are preparing to send the RFQ, sign the contract, and order a sample.
                </td>
                <td className="py-3 px-3 align-top">
                  <a href="/blog/how-to-import-glass-from-china" className="text-[#DAA745] no-underline hover:underline">
                    5-Stage Import Journey →
                  </a>
                </td>
              </tr>
              <tr className="border-b border-[#3A4250]/30">
                <td scope="row" className="py-3 px-3 text-[#F2F0ED]/90 align-top">
                  You have a signed PO and the factory is about to ship. You need to understand crating, container loading, and insurance.
                </td>
                <td className="py-3 px-3 align-top">
                  <a href="/blog/glass-shipping-container-loading-guide" className="text-[#DAA745] no-underline hover:underline">
                    Container Loading Playbook →
                  </a>
                </td>
              </tr>
              <tr>
                <td scope="row" className="py-3 px-3 text-[#F2F0ED]/90 align-top">
                  You are earlier than all of the above — you have a project and need to decide if China sourcing fits at all.
                </td>
                <td className="py-3 px-3 text-[#8B95A5] italic align-top">
                  Stay on this page. Sections 2, 4, and 5 above are the right starting point.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          The three deep-dive chapters are intentionally sequenced. If you read them in reverse order of your project stage — vetting first, then import mechanics, then container shipping — you will cover the risks in the same order they arrive on your calendar.
        </p>

        <RelatedProductsCards
          slugs={["tempered-glass", "laminated-glass", "insulated-glass", "low-e-glass", "enameled-glass"]}
          heading="Products referenced across this cluster"
        />

        <FAQ items={FAQ_ITEMS} />

        <LeadMagnetCTA variant="footer" articleSlug={SLUG} />
      </BlogArticleLayout>
    </>
  );
}
