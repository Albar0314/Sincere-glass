import type { Metadata } from 'next';
import Link from 'next/link';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd, type TOCItem } from '@/components/blog/BlogArticleLayout';
import TLDRBox from '@/components/blog/TLDRBox';
import { FAQ } from '@/components/blog/blocks';
import LeadMagnetCTA from '@/components/blog/LeadMagnetCTA';
import RelatedProductsCards from '@/components/blog/RelatedProductsCards';
import CostDisclaimer from '@/components/blog/CostDisclaimer';
import InlineQuoteCTA from '@/components/products/InlineQuoteCTA';
import NiSInclusionLifecycle from '@/components/blog/article-22/NiSInclusionLifecycle';
import HSTCycleChart from '@/components/blog/article-22/HSTCycleChart';
import HSTRequirementChecker from '@/components/blog/article-22/HSTRequirementChecker';
import { blogArticles } from '@/lib/blog-registry';
import { makeAlternates } from '@/lib/i18n';

const SLUG = 'heat-soaked-tempered-glass-guide';
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc: TOCItem[] = [
  { id: 'tldr', text: 'The 30-second answer', level: 2 },
  { id: 'what-is-hst', text: 'What heat soak testing actually is', level: 2 },
  { id: 'nis-mechanism', text: 'Why tempered glass "spontaneously" breaks', level: 2 },
  { id: 'the-cycle', text: 'The HST cycle — EN 14179-1 in practice', level: 2 },
  { id: 'when-you-need-it', text: 'When you actually need HST', level: 2 },
  { id: 'alternatives', text: 'HST vs the alternatives', level: 2 },
  { id: 'standards', text: 'Standards reference matrix', level: 2 },
  { id: 'residual-risk', text: 'Residual risk after HST', level: 2 },
  { id: 'specifying', text: 'How to specify HST in your PO', level: 2 },
  { id: 'from-wuhan', text: 'From our Wuhan line', level: 2 },
  { id: 'faq', text: 'FAQ', level: 2 },
];

const faqItems = [
  {
    q: 'What is the minimum order quantity for heat-soaked tempered glass?',
    a: 'No panel-count minimum, but the economics change below one furnace load. Our HST oven holds roughly 8–12 m² of racked tempered glass per cycle. Below 5 m² of order volume, you pay the full cycle cost against fewer panels and the per-m² premium climbs sharply. For orders under 20 m², we typically consolidate with other projects on the same cycle; expect a 2–4 working day scheduling window.',
  },
  {
    q: 'How much more does HST tempered glass cost than standard tempered?',
    a: 'Expect +15–25% over equivalent non-HST tempered on the per-m² EXW price, depending on thickness, order volume, and whether you need per-batch certificates. Thicker glass (12 mm and up) sits at the higher end because fewer panels fit the oven per cycle. The premium covers the 8-hour oven cycle energy, loading labour, yield loss from in-oven fractures, and EN 14179-1 certificate issuance. Indicative, EXW Wuhan, Oct 2026 — not a quote.',
  },
  {
    q: 'How much does HST add to the lead time?',
    a: 'Typically +3–5 working days on top of standard tempered lead time. One HST cycle runs 7–8 hours (heating, 2-hour soak, controlled cooling), plus oven loading and unloading. For large orders we batch multiple cycles across 1–2 days. If you need per-batch EN 14179-1 compliance certificates, add one more day for the paperwork.',
  },
  {
    q: 'Does HST change the strength or breakage pattern of tempered glass?',
    a: 'No. HST is a thermal post-process that does not reduce surface compressive stress, change the fragment pattern per EN 12150 / ASTM C1048, or affect any mechanical property that matters for structural calculations. The only thing that changes is that any panel containing a critical-size NiS inclusion fractures inside the oven and is removed from the batch. HST-processed panels you receive are mechanically identical to standard tempered — just statistically safer against spontaneous fracture over the service life.',
  },
  {
    q: 'What certifications come with HST tempered glass?',
    a: 'Standard delivery includes a batch-level test report showing oven cycle time-temperature data, panel inventory in and out of the oven, and any in-oven fractures. On request we issue EN 14179-1:2016 compliance certificates per batch, which most European facade engineers require. For China 3C and GB/T 18701.2, HST is referenced as an optional qualification and we can issue matching documentation. For US projects, HST is not required under ASTM C1048 but we can provide the EN 14179-1 certificate as supplementary evidence for insurance.',
  },
  {
    q: 'Can HST be done on curved, laminated, or Low-E tempered glass?',
    a: 'Yes to all three with caveats. Curved tempered is routinely HST-processed; the oven racks accommodate curvature. For laminated glass, HST is done on the individual tempered plies before lamination — not on the finished laminated panel (the PVB or SGP interlayer would delaminate at 290°C). For Low-E tempered, soft coatings are stable at HST temperatures but you must specify HST before coating is applied, since post-HST coating is a different workflow. Always flag the full assembly spec at RFQ, not after the tempered plies are already made.',
  },
  {
    q: 'Does HST eliminate the risk of spontaneous breakage entirely?',
    a: 'No, but it reduces it by roughly an order of magnitude. Industry references (Kasper, 2019; CWCT TN 92) report that untreated tempered glass carries a spontaneous fracture rate of approximately 1 panel per 400 metric tonnes shipped. HST-processed glass carries approximately 1 per 2,000–4,000 tonnes, depending on soak quality and the fraction of NiS inclusions in the specific float glass source. HST catches critical-size inclusions reliably; it does not catch sub-critical inclusions that may grow slowly over decades. The residual risk is low enough to be insurable at standard rates for most facade projects.',
  },
  {
    q: 'How do I write "HST required" into my project specification?',
    a: 'The clean way: "All monolithic tempered glass panels used in [overhead glazing / facade installations above 10 m / public-area balustrades] shall be heat-soak-tested in accordance with EN 14179-1:2016, with per-batch compliance certificates provided prior to delivery." For projects following ASTM, cite EN 14179-1 as the test methodology since there is no equivalent US standard. For China GB/T 18701.2, add "热浸处理 (heat soak processing) 应符合 EN 14179-1 要求" and the Chinese factory will understand both the test and the certificate expectation.',
  },
];

export default function ArticlePage() {
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
        {/* TL;DR */}
        <TLDRBox takeaways={article.tldr || []} />

        <h2 id="what-is-hst" className="scroll-mt-24">What heat soak testing actually is</h2>
        <p>
          Heat soak testing is a post-tempering quality step. After a tempered glass panel comes off the quench, it goes into a second oven — the heat soak oven — that holds the glass at <strong className="text-[#DAA745]">290±10°C for a minimum of 2 hours</strong>. The oven is nothing special to look at: a steel chamber with calibrated heating elements, a loading rack for upright panels, and thermocouples that log the time-temperature profile for every batch. What it does to the glass is specific and useful. It accelerates a known failure mechanism — nickel sulfide (NiS) phase transition — so that any panel with a critical-size NiS inclusion breaks inside the oven rather than inside your building.
        </p>
        <p>
          HST is not a strength test. It does not improve the glass. It does not change the fragmentation pattern. It is a <em>yield filter</em>: you put a batch of tempered glass in, you take out roughly 999 out of every 1,000 panels, and the ones you keep carry an order-of-magnitude lower risk of fracturing without warning years later. The method is codified in <strong>EN 14179-1:2016</strong>, which specifies the time-temperature cycle, the glass core temperature verification, and the batch documentation requirements. On projects where "a tempered glass panel exploded on the 23rd floor" would be a headline, HST is how you prevent the headline.
        </p>

        <h2 id="nis-mechanism" className="scroll-mt-24">Why tempered glass "spontaneously" breaks</h2>
        <p>
          Every so often, a tempered glass panel in a building fractures with no impact, no load change, no visible cause. Facade engineers call it spontaneous breakage; the general public calls it "the glass exploded." The physics behind it has been understood since the 1960s and comes down to a specific contaminant: <strong>nickel sulfide inclusions</strong>, trace particles of NiS that form during float glass production when nickel from stainless steel equipment reacts with sulfur in the furnace atmosphere.
        </p>
        <p>
          NiS has a trick. At high temperature it crystallizes in a form called α-phase. At room temperature it slowly converts to a different form called β-phase. The β-phase occupies 2–4% more volume than the α-phase. In annealed float glass this volume change is irrelevant — the inclusion sits in a stress-free matrix and nothing happens. In tempered glass it is a different story. Tempering locks the glass surface into ~100 MPa of compressive stress and the glass core into ~50 MPa of tensile stress. A NiS inclusion sitting in the tensile core, slowly swelling by 2–4%, generates local stress that eventually exceeds the fracture limit. Then the whole panel fails in milliseconds, propagating from the inclusion in the signature "butterfly wing" pattern that forensics specialists recognize on recovered shards.
        </p>
        <p>
          The time from tempering to fracture is typically 1–7 years. The rate of α→β conversion depends on temperature — hotter environments (sun-exposed facades) convert faster. The size of the inclusion matters: particles below ~50 μm rarely generate enough stress to break the panel. Particles above ~300 μm are visible under inspection and would be rejected before tempering. The dangerous size range is 50–300 μm, which is invisible to the naked eye and small enough to pass quality inspection on the tempering line.
        </p>

        {/* SSR shadow for C21 — plain-prose methodology for AI crawlers */}
        <p className="sr-only">
          The following interactive visualizer walks through four stages of a NiS inclusion&apos;s lifecycle inside tempered glass. Stage 0: a 50–300 μm NiS particle survives float production and is trapped in the α-phase after the 15-second quench, no symptoms. Stage 1: at building ambient temperature over 1–3 years, the metastable α-phase slowly rearranges toward the β-phase; sun-exposed glass converts faster than shaded glass. Stage 2: between years 3 and 7, β-phase formation causes 2–4% volume expansion; if the inclusion sits in the tempered tensile core where internal stress is already −50 MPa, local stress crosses the fracture limit. Stage 3: fracture nucleates at the inclusion and propagates through the entire panel at approximately 1,500 m/s. Recovered shards show the characteristic "butterfly wing" pattern of two cuboid fragments cradling the inclusion, confirmable under microscope. HST accelerates stages 1–3 inside a controlled oven so that panels containing critical-size inclusions fail in the factory and never ship.
        </p>
        <NiSInclusionLifecycle />

        <h2 id="the-cycle" className="scroll-mt-24">The HST cycle — EN 14179-1 in practice</h2>
        <p>
          EN 14179-1:2016 is prescriptive about the time-temperature profile and lets the oven operator worry about getting there. The three requirements that matter: <strong>core temperature of the thickest glass in the load must reach 280–300°C</strong>, <strong>hold time at that temperature must be at least 2 hours</strong>, and <strong>a thermocouple embedded in a test panel of the thickest glass must verify the core temperature was achieved</strong>. Edge temperature, surface temperature, oven air temperature — none of those satisfy the standard. The physics cares about the core because that is where the NiS inclusion sits.
        </p>
        <p>
          The ramp phase takes roughly 2.5 hours from ambient to 290°C core — faster for thin glass, slower for 15 mm and 19 mm panels because the core lags the surface by 20–30 minutes. During the ramp, nothing useful happens for the NiS inclusions; they only start converting meaningfully once the core crosses 250°C. The 2-hour soak at 290°C is where the standard earns its keep: at this temperature, laboratory kinetics studies show that over 95% of critical-size NiS inclusions complete α→β conversion within the 2-hour window. Any panel containing a converted inclusion whose stress exceeds the fracture limit breaks inside the oven. We hear it as a muffled report, confirm the panel ID against the batch inventory, and remove the fragments at the next unload.
        </p>
        <p>
          Cooling takes another 3–3.5 hours. The cooling rate is not technically specified by EN 14179-1, but we hold ~50°C/hour to avoid thermal shock on the panels that survived the soak. End to end, one full cycle runs 7–8 hours; we typically run one cycle per day per oven. A panel that enters at 09:00 is unloaded, inspected, and documented by 18:00.
        </p>

        {/* SSR shadow for C21 */}
        <p className="sr-only">
          The following interactive chart visualizes the EN 14179-1 heat soak cycle in two views. The temperature view shows the standard time-temperature profile over 8 hours: a 2.5-hour ramp from 20°C to 290°C, a 2-hour hold at 290±10°C (highlighted in gold), and a controlled 3-hour cooling to ambient. The holding band is marked at 290°C to show the standard&apos;s target. The conversion view overlays α→β phase transition percentage for NiS inclusions at the holding temperature: conversion is negligible during the ramp, climbs rapidly once the core reaches 290°C, and exceeds 95% by the end of the 2-hour hold. Both curves show the same point: the 2-hour soak at 290°C is where critical-size NiS inclusions complete their phase transition and generate enough stress to fracture their host panel inside the oven rather than in service.
        </p>
        <HSTCycleChart />

        <InlineQuoteCTA variant="compact" />

        <h2 id="when-you-need-it" className="scroll-mt-24">When you actually need HST</h2>
        <p>
          HST is not free, and it is not universally mandatory. The decision is a function of four variables: how high the glass is installed, how large each panel is, what the installation type is, and whether people stand or walk below. The checker below is the same decision matrix our estimators use when a project drops a tempered glass RFQ and does not specify HST — we run through it to decide whether to recommend the client add HST before quoting.
        </p>
        <p>
          The hardest-and-fastest rule: <strong>overhead glazing with monolithic tempered glass</strong> is almost always HST territory under EN 14179-1 and most national annexes. A tempered glass panel directly over an occupied space, if it fractures spontaneously, drops hundreds of pounds of granulated glass on whoever is below. The second rule: <strong>high-rise facades with large panels above public walkways</strong> are the canonical insurance-driven scenario — HST is specified into the facade sub-contract regardless of what the code says, because a single incident is enough to end a facade contractor&apos;s standing with their insurer. Beyond those two, it becomes a judgment call driven by liability, visibility, and client-side risk tolerance.
        </p>

        {/* SSR shadow for C21 */}
        <p className="sr-only">
          The following interactive checker evaluates whether heat soak testing is required, strongly recommended, or optional for a given installation. It takes four inputs: building height at the install location (under 10 m, 10 to 30 m, over 30 m), panel area per lite (under 2 m², 2 to 5 m², over 5 m²), installation type (vertical facade, overhead glazing or skylight, balustrade or guardrail, interior partition or door), and whether there is public access below the installation. The checker applies three decision rules in order. First, overhead glazing with monolithic tempered glass returns "Required" with EN 14179-1 §4, DIN 18008-2 Annex A, and BS 6262-4 as references, since overhead monolithic tempered is explicitly within EN 14179-1 scope. Second, high-rise installations above 30 m with large panels or public access below return "Required" because this is the canonical insurance-driven scenario. Third, mid-rise vertical facades with public access return "Strongly recommended" because this height band drives the majority of spontaneous-fracture insurance claims even though it is not legally mandated. Elevated balustrades return "Strongly recommended" because the tempered plies in laminated balustrade assemblies should be HST-processed to avoid single-ply spontaneous failure reducing load capacity until replacement. Interior partitions and low-rise small panels without occupancy below return "Optional" because the ~1-in-400-tonne spontaneous fracture rate does not justify the premium. The verdict is advisory; local codes and the authority having jurisdiction override.
        </p>
        <HSTRequirementChecker />

        <h2 id="alternatives" className="scroll-mt-24">HST vs the alternatives</h2>
        <p>
          HST is not the only path to lower spontaneous-fracture risk. The three alternatives, in order of how often we see them specified:
        </p>
        <ol>
          <li>
            <strong>Laminated construction with ordinary tempered plies.</strong> If a NiS inclusion fractures one ply of a laminated panel, the PVB or SGP interlayer holds the fragments in place. The panel loses structural capacity until replacement but does not shed glass. For balustrades, overhead glazing, and public-area facades, laminated tempered is now standard construction regardless of HST status. The two measures stack rather than substitute: for overhead glazing, specify <em>laminated tempered with HST on the plies</em>, not one or the other.
          </li>
          <li>
            <strong>Heat-strengthened (HS) glass instead of fully tempered.</strong> HS glass has lower surface compression (24–52 MPa versus 100+ MPa for tempered) and correspondingly lower tensile core stress, which means NiS inclusions cannot generate enough stress to fracture the panel. Spontaneous breakage from NiS essentially does not happen in HS glass. The trade-off: HS is weaker (not safety glass by code) and breaks into large shards. For laminated construction where the interlayer provides post-breakage safety, HS plies are often the better choice than HST tempered. For monolithic safety-glazing applications, HS is not an option — you need the safe-fragmentation pattern of fully tempered.
          </li>
          <li>
            <strong>Chemically strengthened glass.</strong> Ion-exchange strengthened glass does not have the thermal-stress gradient that drives NiS fracture. It is also typically more expensive than HST tempered, limited in thickness, and specified mostly for aerospace and high-end architectural applications rather than mainstream facade work. If someone is proposing chemically strengthened glass for a facade cost-sensitive project, confirm the specification intent — the cost premium rarely tracks with the risk reduction compared to HST.
          </li>
        </ol>

        <h2 id="standards" className="scroll-mt-24">Standards reference matrix</h2>
        <p>
          Four jurisdictions, four approaches to HST. The common ground: EN 14179-1 is the only standard that fully specifies the HST test procedure, and it has become the de facto reference even in jurisdictions that do not formally adopt it.
        </p>
        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm border border-[#3A4250]/40">
            <caption className="text-left text-xs text-[#8B95A5] p-3 bg-[#3A4250]/20 border-b border-[#3A4250]/40">
              HST standards by jurisdiction. Data verified: 2026-10-28.
            </caption>
            <thead>
              <tr className="bg-[#3A4250]/30">
                <th scope="col" className="text-left p-3 text-[#F2F0ED] font-semibold border-b border-[#3A4250]/40">
                  Jurisdiction
                </th>
                <th scope="col" className="text-left p-3 text-[#F2F0ED] font-semibold border-b border-[#3A4250]/40">
                  Standard
                </th>
                <th scope="col" className="text-left p-3 text-[#F2F0ED] font-semibold border-b border-[#3A4250]/40">
                  HST status
                </th>
                <th scope="col" className="text-left p-3 text-[#F2F0ED] font-semibold border-b border-[#3A4250]/40">
                  Cycle spec
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#3A4250]/30">
                <th scope="row" className="text-left p-3 text-[#F2F0ED] font-medium">EU</th>
                <td className="p-3 text-[#8B95A5] font-mono text-xs">EN 14179-1:2016</td>
                <td className="p-3 text-[#8B95A5]">Full HST procedure. Required for overhead and most facade work by national annex.</td>
                <td className="p-3 text-[#8B95A5]">290±10°C core, 2 h hold</td>
              </tr>
              <tr className="border-b border-[#3A4250]/30 bg-[#3A4250]/10">
                <th scope="row" className="text-left p-3 text-[#F2F0ED] font-medium">UK</th>
                <td className="p-3 text-[#8B95A5] font-mono text-xs">BS 6262-4 / adopts EN 14179-1</td>
                <td className="p-3 text-[#8B95A5]">Recommended by CWCT TN 92; mandatory on most insured facade works.</td>
                <td className="p-3 text-[#8B95A5]">Per EN 14179-1</td>
              </tr>
              <tr className="border-b border-[#3A4250]/30">
                <th scope="row" className="text-left p-3 text-[#F2F0ED] font-medium">US</th>
                <td className="p-3 text-[#8B95A5] font-mono text-xs">ASTM C1048 §8 (optional)</td>
                <td className="p-3 text-[#8B95A5]">Not mandated by model codes. Specified by project insurer or client for high-rise.</td>
                <td className="p-3 text-[#8B95A5]">References EN 14179-1 as procedure</td>
              </tr>
              <tr className="border-b border-[#3A4250]/30 bg-[#3A4250]/10">
                <th scope="row" className="text-left p-3 text-[#F2F0ED] font-medium">China</th>
                <td className="p-3 text-[#8B95A5] font-mono text-xs">GB/T 18701.2 / JG/T 536</td>
                <td className="p-3 text-[#8B95A5]">Optional qualification; required on certain curtain-wall contracts.</td>
                <td className="p-3 text-[#8B95A5]">290±10°C core, 2 h hold</td>
              </tr>
              <tr>
                <th scope="row" className="text-left p-3 text-[#F2F0ED] font-medium">Australia</th>
                <td className="p-3 text-[#8B95A5] font-mono text-xs">AS 1288 / adopts EN 14179-1</td>
                <td className="p-3 text-[#8B95A5]">Recommended for overhead and high-rise facade; growing contractual uptake.</td>
                <td className="p-3 text-[#8B95A5]">Per EN 14179-1</td>
              </tr>
            </tbody>
          </table>
        </div>
        <CostDisclaimer />

        <h2 id="residual-risk" className="scroll-mt-24">Residual risk after HST</h2>
        <p>
          HST reduces spontaneous breakage risk by roughly an order of magnitude but does not eliminate it. Industry references put the untreated tempered rate at approximately <strong>1 panel per 400 metric tonnes shipped</strong>; HST-processed glass sits at approximately <strong>1 per 2,000–4,000 tonnes</strong>. The residual rate exists because sub-critical NiS inclusions — too small to generate immediate fracture at 290°C — can still grow slowly over decades and reach fracture threshold in service.
        </p>
        <p>
          For a 50,000 m² facade project built from HST tempered, this works out to approximately one potential spontaneous fracture across the service life of the building, versus roughly eight for the same facade built from untreated tempered. For projects where even one incident is unacceptable — hospital atria over patient areas, airport-concourse overhead, iconic retail flagships — HST is specified in combination with laminated construction so that the residual-risk incident is contained by the interlayer rather than becoming a falling-glass event.
        </p>
        <p>
          The two numbers worth remembering when discussing HST with facade engineers: a factor-of-5-to-10 risk reduction, and a cost premium of 15–25% on the tempered line item. Those are the trade-off at project scale.
        </p>

        <h2 id="specifying" className="scroll-mt-24">How to specify HST in your PO</h2>
        <p>
          A clean HST specification has three parts: the scope of what gets HST, the standard reference, and the documentation deliverable. Any one of those missing and the request comes back for clarification.
        </p>
        <ol>
          <li>
            <strong>Scope.</strong> State explicitly which panels are HST — all tempered in the order, or only specific installations. Example: "All monolithic tempered glass used in overhead glazing and in facade installations above 10 m shall be heat-soak-tested." Vague wording ("all safety glass to be heat soaked") creates ambiguity around laminated construction, where the HST applies to the plies not the finished panel.
          </li>
          <li>
            <strong>Standard reference.</strong> Cite EN 14179-1:2016 as the test methodology regardless of your project jurisdiction, since no equivalent exists in ASTM or AS. For Chinese projects, add GB/T 18701.2 as the local standard reference and specify "热浸处理 (heat soak processing) per EN 14179-1" in the Chinese-language technical specification.
          </li>
          <li>
            <strong>Documentation.</strong> Specify what certificates you need delivered with the glass. Default is a batch-level test report; for European facade contracts, specify per-batch EN 14179-1 compliance certificates. Our standard HST delivery includes the time-temperature log for the batch, panel inventory in and out of the oven, and the compliance certificate on request. Spell this out at RFQ to avoid "we did the HST but no one asked for the paperwork" delays at delivery.
          </li>
        </ol>
        <p>
          For procurement context on how HST fits into broader supplier qualification, see our guide on <Link href="/blog/architectural-glass-supplier-china-vetting" className="text-[#DAA745] underline">vetting a Chinese architectural glass supplier</Link>. For the production side — how the tempered glass that enters the HST oven got there in the first place — see <Link href="/blog/how-is-tempered-glass-made" className="text-[#DAA745] underline">how tempered glass is made</Link>.
        </p>

        {/* Lead magnet */}
        <LeadMagnetCTA variant="inline" articleSlug={SLUG} />

        <h2 id="from-wuhan" className="scroll-mt-24">From our Wuhan line</h2>
        <p>
          HST at Sincere Glass runs alongside our two tempering furnaces as a standard add-on service. Oven capacity is roughly 8–12 m² of racked glass per cycle, with one cycle per oven per day under normal scheduling. Our tempering line envelope — <strong className="text-[#DAA745]">panels up to 3.3 m × 15 m</strong> — carries into HST for all but the very largest panels, where we run split-cycle loading. All HST batches are logged with time-temperature traces for the thickest glass in the load; EN 14179-1:2016 compliance certificates are issued on request.
        </p>
        <p>
          If you are planning a facade, overhead glazing, or balustrade project and want to understand whether HST belongs in your specification, send the drawings and we will run them through the checker above and advise. For context on the broader tempered glass product category, see our <Link href="/products/tempered-glass" className="text-[#DAA745] underline">tempered glass product page</Link>. For the specifications of our largest-format tempered capability, see <Link href="/blog/jumbo-architectural-glass-panels" className="text-[#DAA745] underline">jumbo architectural glass panels</Link>, where HST becomes effectively mandatory at project scale. For the pillar context on how tempering fits with lamination and IGU assembly in manufacturing, start at our <Link href="/blog/architectural-glass-manufacturing-guide" className="text-[#DAA745] underline">architectural glass manufacturing guide</Link>.
        </p>

              {/* GROK-INSERT-V1:spandrel-xref */}
      <div className="my-8 rounded-xl border-l-4 border-brand-accent bg-brand-accent/10 p-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-accent">
          Related reading
        </p>
        <p className="text-sm text-brand-primary dark:text-brand-light">
          Specifying opaque facade zones?{" "}
          <Link href="/blog/spandrel-glass-guide" className="font-semibold text-brand-accent underline underline-offset-2">
            Read our Spandrel Glass Guide
          </Link>{" "}
          — covers construction methods, thermal stress, and color matching to vision glass.
        </p>
      </div>

      <FAQ items={faqItems} />

        <RelatedProductsCards slugs={article.relatedProductSlugs || []} />
      </BlogArticleLayout>
    </>
  );
}
