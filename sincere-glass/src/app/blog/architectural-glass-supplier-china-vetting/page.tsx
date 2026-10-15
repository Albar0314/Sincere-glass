import type { Metadata } from 'next';
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from '@/components/blog/BlogArticleLayout';
import TLDRBox from '@/components/blog/TLDRBox';
import LeadMagnetCTA from '@/components/blog/LeadMagnetCTA';
import CostDisclaimer from '@/components/blog/CostDisclaimer';
import RelatedProductsCards from '@/components/blog/RelatedProductsCards';
import FAQ from '@/components/blog/blocks/FAQ';
import { blogArticles } from '@/lib/blog-registry';
import { makeAlternates } from '@/lib/i18n';
import RiskExposureProfiler from '@/components/blog/article-15/RiskExposureProfiler';
import CertVerifier from '@/components/blog/article-15/CertVerifier';
import VideoAuditChecklist from '@/components/blog/article-15/VideoAuditChecklist';

const SLUG = 'architectural-glass-supplier-china-vetting';
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates('/blog/' + SLUG),
};

const toc: TOCItem[] = [
  { id: 'the-5-risks', text: 'The 5 risks of buying glass from a stranger', level: 2 },
  { id: 'risk-1-trading', text: 'Risk 1: Trading company masquerading as a factory', level: 2 },
  { id: 'risk-2-certs', text: 'Risk 2: Fake or expired certifications', level: 2 },
  { id: 'risk-3-capacity', text: 'Risk 3: Fabricated production capacity', level: 2 },
  { id: 'risk-4-quality', text: 'Risk 4: Quality theatre on the showroom sample', level: 2 },
  { id: 'risk-5-financial', text: 'Risk 5: Mid-order financial collapse', level: 2 },
  { id: 'exposure-profiler', text: 'Measure your exposure', level: 2 },
  { id: 'cert-verifier', text: 'Decode the certification', level: 2 },
  { id: 'video-audit', text: 'The 90-minute video audit', level: 2 },
  { id: 'red-flags', text: '12 red flags that should pause the PO', level: 2 },
  { id: 'walk-away', text: 'When to walk away vs renegotiate', level: 2 },
  { id: 'faq', text: 'Buyer FAQ', level: 2 },
];

const buyerFaq = [
  {
    q: 'Can I visit the factory in person before placing an order?',
    a: 'Yes, and most serious Chinese suppliers welcome it. Standard practice is a 1-day visit for a $100K+ order, often combined with other factory visits in the same city. You arrange your own visa and travel; the factory arranges airport pickup and a translator. If a supplier refuses an in-person visit, treat that as a Risk 1 signal — a real factory has nothing to hide.',
  },
  {
    q: 'Do Chinese glass factories accept third-party pre-shipment inspection?',
    a: 'Standard practice. SGS, Bureau Veritas (BV), Intertek, and CCIC all offer glass inspection in Wuhan, Shahe, Dongguan, and other glass hubs. Cost runs $300–800 per inspection day. Book 7+ days ahead. A supplier who refuses or stalls on third-party inspection is signalling they do not want their claims verified.',
  },
  {
    q: 'What if the supplier sends only photos of certifications, not the full PDF?',
    a: 'That is a Risk 2 signal. A real test report is 10+ pages: scope, test method, numerical results, lab seal, authorised signatory. A photo of a cover page is not evidence; it is marketing. Insist on the full PDF with a verifiable report number, then cross-check that number at the CNAS lab directory or the issuing lab’s own site.',
  },
  {
    q: 'How do I know the GB test report is real and not forged?',
    a: 'Three checks. First, the issuing lab must be listed on the CNAS directory with glass-testing in its accreditation scope. Second, the report ID should return no duplicate hits on Baidu — forgeries get reused across suppliers. Third, call the lab directly with the report number; CNAS labs will confirm or deny. The whole verification takes under 30 minutes.',
  },
  {
    q: 'What is the difference between a factory and a "工贸一体" (manufacturer+trader) company?',
    a: 'A pure factory produces only; a 工贸一体 (gong-mao-yi-ti) runs both production and trading under one roof. The latter is legitimate — it means the factory handles its own exports instead of selling through an agent. The red flag is a trading company that calls itself a factory. Check the business licence registered scope: if it says 销售 (sales) only, no 生产 (production), it is a trader regardless of what the website says.',
  },
  {
    q: 'Can I get a physical sample before committing to a container?',
    a: 'Yes. Sample pieces (300×300mm or 500×500mm) are standard; expect to pay for samples plus courier (~$50–200 per courier shipment via DHL/FedEx). What the sample confirms: edge quality, coating appearance, interlayer clarity, dimensional accuracy. What it cannot confirm: whether the production run will match the sample. A sample is a necessary but insufficient check — the audit protocol above exists because samples are easy to curate.',
  },
];

const faqForSchema = buyerFaq;

export default function Page() {
  const schemas = articleJsonLd(article, faqForSchema);

  return (
    <BlogArticleLayout article={article} toc={toc}>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <TLDRBox
        takeaways={[
          'Buying glass from a Chinese supplier you have never met concentrates five distinct risks: legitimacy, capability, quality, financial, and logistics. Audit each one, not the vendor overall.',
          'The two document checks that cost nothing: business licence from GSXT.gov.cn (verifies the company exists and the scope includes manufacturing), and CNAS lab registry (verifies the test report issuer is accredited).',
          'The one audit that scales: a 90-minute live video walk-through across 8 production stations. Record it. Keep the photos. Repeat annually for returning suppliers.',
          'Pre-shipment inspection by SGS / BV / CCIC costs $300–800 per day and is non-negotiable for strict-code destinations (US / EU / AU). It is cheaper than one rejected container.',
          'A supplier that resists third-party inspection, refuses to show the furnace control screen, or ships CE certifications without a Declaration of Performance is telling you something. Believe them.',
        ]}
      />

      <p>
        You have never met this supplier. You found them on Alibaba, or at a Canton Fair booth, or
        through a referral two WhatsApp groups removed from anyone you trust. Their website shows a
        factory floor you cannot verify, certifications you have not seen, and a sales rep who
        answers at 2 a.m. The quote is 25&nbsp;% under the next-cheapest option. Everyone before you
        who paid for silence from this supplier is a cautionary tale you have not heard yet.
      </p>

      <p>
        Vetting is not about proving the supplier is honest. It is about reducing the number of ways
        the deal can fail, in sequence, so that the first failure stops you before the money
        moves. This article is a factory operator&rsquo;s view of that process, written from a
        20,000&nbsp;m² production floor in Wuhan: the five risks we see buyers underweight, the
        document checks that cost nothing, the audit protocol that scales, and the moments to walk
        away rather than renegotiate.
      </p>

      <p>
        For the surrounding buyer journey &mdash; who to buy from, how to budget, how payment and
        shipping fit together &mdash; see our{' '}
        <a href="/blog/how-to-import-glass-from-china">
          complete guide to importing architectural glass from China
        </a>
        . This article is the deep-dive on the supplier-vetting stage specifically.
      </p>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="the-5-risks">The 5 risks of buying glass from a stranger</h2>

      <p>
        Buyers often think of supplier vetting as one risk &mdash; &ldquo;is this company
        legitimate?&rdquo; &mdash; and build a single scorecard around it. In practice there are
        five, and they fail independently. A legitimate factory with no QC maturity will ship you
        the wrong product on time. A capable factory with weak cash flow will disappear mid-order
        after collecting your deposit. Treating these as one bucket means you miss the one that
        actually matters for your deal.
      </p>

      <div className="my-6 overflow-x-auto">
        <table
          className="w-full text-sm text-left"
          aria-label="The five supplier risks and what they look like in practice"
        >
          <caption className="text-xs text-[#8B95A5] italic text-left pb-3 caption-top">
            Table 1. Five risk dimensions, how each one presents, and the primary detection method.
            Framework: our vetting experience with 200+ buyers; cross-checked against Alibaba
            Trade Assurance dispute categories. Data verified: 2026-10-15.
          </caption>
          <thead>
            <tr className="border-b border-[#3A4250]/40">
              <th scope="col" className="py-3 pr-4 text-xs font-semibold text-[#DAA745] uppercase tracking-wider">
                Risk
              </th>
              <th scope="col" className="py-3 pr-4 text-xs font-semibold text-[#DAA745] uppercase tracking-wider">
                What it looks like
              </th>
              <th scope="col" className="py-3 text-xs font-semibold text-[#DAA745] uppercase tracking-wider">
                Primary detection
              </th>
            </tr>
          </thead>
          <tbody className="text-[#F2F0ED]">
            <tr className="border-b border-[#3A4250]/20">
              <th scope="row" className="py-3 pr-4 font-semibold whitespace-nowrap">Legitimacy</th>
              <td className="py-3 pr-4">Trader rebranded as factory; address not verifiable; licence scope is &ldquo;sales&rdquo; only.</td>
              <td className="py-3">Business licence pull from GSXT + address verification + registered-scope read.</td>
            </tr>
            <tr className="border-b border-[#3A4250]/20">
              <th scope="row" className="py-3 pr-4 font-semibold whitespace-nowrap">Capability</th>
              <td className="py-3 pr-4">Website shows jumbo panels; actual furnace is 2.4&nbsp;m wide. Website shows curved glass; no bending oven exists.</td>
              <td className="py-3">Live video audit of each production line relevant to your spec.</td>
            </tr>
            <tr className="border-b border-[#3A4250]/20">
              <th scope="row" className="py-3 pr-4 font-semibold whitespace-nowrap">Quality</th>
              <td className="py-3 pr-4">Showroom samples perfect; production run has edge chips, coating defects, dimensional drift.</td>
              <td className="py-3">Independent pre-shipment inspection (SGS / BV / CCIC) + verified test reports matched to SKU.</td>
            </tr>
            <tr className="border-b border-[#3A4250]/20">
              <th scope="row" className="py-3 pr-4 font-semibold whitespace-nowrap">Financial</th>
              <td className="py-3 pr-4">Collects deposit, stalls on production, eventually goes dark. Legal action in China is slow and expensive.</td>
              <td className="py-3">Enterprise credit report (企查查 / 天眼查) + payment term structure + trade credit insurance.</td>
            </tr>
            <tr>
              <th scope="row" className="py-3 pr-4 font-semibold whitespace-nowrap">Logistics</th>
              <td className="py-3 pr-4">Container arrives with breakage from poor crating, wrong HS code triggers customs delay, insurance claim denied.</td>
              <td className="py-3">
                See our{' '}
                <a href="/blog/glass-shipping-container-loading-guide" className="text-[#DAA745]">
                  container loading guide
                </a>{' '}
                for the operational playbook.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        The next five sections take each risk in turn: what we see when it goes wrong, the specific
        checks that prevent it, and the standards you can point to in a PO or spec document to make
        the check contractually binding.
      </p>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="risk-1-trading">Risk 1: Trading company masquerading as a factory</h2>

      <p>
        The most common mismatch between what a supplier claims and what they are. A trading
        company subcontracts to a real factory, marks up 10&ndash;20&nbsp;%, and sells itself to
        you as the manufacturer. In the best case this is just paying extra for a middleman you did
        not need. In the worst case, your QC claims rest on a factory the trader will not name,
        certifications issued to a different entity, and no recourse when the production run drifts
        from the sample.
      </p>

      <p>
        The distinction matters because China&rsquo;s regulatory records are precise about it. Every
        registered Chinese company has a business licence (营业执照) with a
        registered scope line (经营范围). A manufacturer’s scope includes
        生产 (production) or 制造 (manufacturing). A pure trader’s scope says
        销售 (sales) only. A 工贸一体 (gong-mao-yi-ti) company legitimately
        has both &mdash; those are factories that handle their own exports instead of selling
        through an agent, which is a good structure.
      </p>

      <h3>How to verify</h3>
      <ol>
        <li>
          Pull the business licence yourself from{' '}
          <a href="https://www.gsxt.gov.cn" target="_blank" rel="noopener noreferrer">
            GSXT.gov.cn
          </a>{' '}
          (National Enterprise Credit Information Publicity System). It is free and public. Search
          by company name or Uniform Social Credit Code (18 characters). Read the registered scope
          line.
        </li>
        <li>
          Match the registered address against Baidu Maps street view (百度地图). A
          factory address should show a factory, not an office tower.
        </li>
        <li>
          Compare the registered scope against the claim on the supplier&rsquo;s website. &ldquo;We
          are a leading tempered glass manufacturer&rdquo; from a company whose scope says
          销售 only is a documentation mismatch, not a marketing exaggeration.
        </li>
      </ol>

      <p>
        None of this costs money. It takes under 15 minutes once you know where to look. The
        suppliers it filters out are the ones where every subsequent check would have been
        theatre.
      </p>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="risk-2-certs">Risk 2: Fake or expired certifications</h2>

      <p>
        Certifications fail buyer vetting in three ways: forged outright, legitimately issued but
        expired, or issued for a different product than what you are quoting. The second and third
        are more common than the first and harder to detect, because the paperwork looks authentic
        until you check the specifics.
      </p>

      <p>
        The baseline standards for architectural glass are jurisdiction-specific: China uses GB
        15763 (safety glazing) and GB 11944 (IGU), the EU uses EN 12150 (tempered), EN 14449
        (laminated), and EN 1279 (IGU) under CE marking, the US references ANSI Z97.1 and
        CPSC&nbsp;16 CFR 1201, Australia uses AS 1288. Each system has a different issuing authority
        and a different public registry where you can verify a certificate number. The CertVerifier
        below walks the eight most common certifications your supplier will put in front of you,
        with the format of each certification number and the official URL where you confirm it.
      </p>

      <h3>Three questions to ask about any certification</h3>
      <ol>
        <li>
          <strong>Who issued it?</strong> The issuing lab or notified body must be accredited for
          glass testing specifically. In China that means CNAS accreditation with glass scope. In
          the EU that means a Notified Body listed on the EU NANDO database with the relevant
          hEN&nbsp;(harmonised standard) in scope. In the US that means an SGCC-member lab.
        </li>
        <li>
          <strong>What product does it cover?</strong> A test report for 6&nbsp;mm tempered does not
          cover 10&nbsp;mm tempered. A DoP for one laminated build-up (6-1.52-6 PVB) does not cover a
          different build-up (8-1.52-8 SGP). Match the certification document line-by-line against
          your actual purchase order spec.
        </li>
        <li>
          <strong>Is it current?</strong> ISO 9001 runs on a 3-year cycle. 3C certifications
          typically renew every 5 years. Lab test reports have no legal expiry but should be no more
          than 2&ndash;3 years old to reflect current production. Dates matter.
        </li>
      </ol>

      <LeadMagnetCTA
        variant="inline"
        articleSlug={SLUG}
        title="Download the global glass codes reference"
        description="One PDF with the clauses, test methods, and acceptance criteria across US IBC, EU EN, China GB, and Australia AS — handy to attach to a supplier RFP so there is no ambiguity about which standard the quote covers."
      />

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="risk-3-capacity">Risk 3: Fabricated production capacity</h2>

      <p>
        A website shows a 3&nbsp;m×15&nbsp;m jumbo tempered line. The actual furnace is
        2.4&nbsp;m wide. A website shows curved tempered facades on a landmark building. There is
        no bending oven on the premises. A website claims 500,000&nbsp;m² annual output. The
        site is one building with two edging lines.
      </p>

      <p>
        Capacity fraud is harder to detect from paperwork alone because there is no public registry
        of factory equipment. The cheapest fix is the one we built the VideoAuditChecklist for
        below: a 90-minute live walk-through where the supplier takes a phone around the production
        floor on your call. The script is specific &mdash; which machines to show, what should be
        on the operator screen, what the surroundings should look like. Fakers cannot pass it,
        because they would have to borrow a factory for the hour.
      </p>

      <h3>What capability actually means for your spec</h3>
      <ul>
        <li>
          <strong>Jumbo tempered (&gt; 2.4&nbsp;m wide):</strong> Requires a wide-bed horizontal
          tempering furnace. The width is a fixed physical constraint. Measure it on video.
        </li>
        <li>
          <strong>Curved / bent tempered:</strong> Requires a bending oven (different machine from
          flat tempering). Should see curved panels on the shop floor if the supplier does this
          regularly.
        </li>
        <li>
          <strong>SGP laminated:</strong> Requires an autoclave sized for the panel and SentryGlas
          interlayer stock in cold storage. PVB and SGP use the same autoclave but different
          interlayer handling.
        </li>
        <li>
          <strong>Low-E IGU:</strong> Requires an argon fill station with concentration meter, dual
          seal (butyl primary + silicone secondary), and warm-edge spacer tooling. All three must be
          present for a defensible Low-E IGU claim.
        </li>
        <li>
          <strong>Ceramic frit / enamelled:</strong> Requires a screen-printing station + ceramic
          frit kiln (different from the tempering furnace, often integrated line). The pattern
          selection they can show you is the proof.
        </li>
      </ul>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="risk-4-quality">Risk 4: Quality theatre on the showroom sample</h2>

      <p>
        The sample a supplier sends is their best piece of glass. Edge-polished by hand, inspected
        under good lighting, packed in foam. Production glass is made in bulk under time pressure
        with QC sampling every nth panel. The gap between the two is where buyers get hurt.
      </p>

      <p>
        The protective step is pre-shipment inspection by an independent third party. SGS, Bureau
        Veritas, Intertek, and CCIC all offer glass inspection services in the main Chinese glass
        hubs (Shahe, Wuhan, Dongguan, Qingdao). An inspector attends the factory one or two days
        before the container seal, pulls a representative sample from the finished production run,
        and tests against your PO specification. Cost runs $300&ndash;800 per inspection day. You
        receive a report with photos, dimensional measurements, and defect counts within 48 hours.
      </p>

      <p>
        For strict-code destinations &mdash; US, EU, Australia, Canada &mdash; third-party
        pre-shipment inspection is non-negotiable in our view. The cost of one rejected container
        at the destination port (demurrage + re-export + lost project schedule) is 50&ndash;100 times
        the inspection fee. The inspection also creates a documentary record you can use if a
        downstream warranty dispute arises.
      </p>

      <h3>What a good inspection report covers</h3>
      <ul>
        <li>Sample size and selection method (random vs targeted).</li>
        <li>Dimensional accuracy against PO drawings, measured on multiple panels.</li>
        <li>Visual defects per panel: scratches, inclusions, edge chips, coating defects.</li>
        <li>Where applicable: tempered fragmentation test on one sacrificial panel, IGU dew-point test, lamination edge adhesion check.</li>
        <li>Photos of crating method, container number, seal number.</li>
      </ul>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="risk-5-financial">Risk 5: Mid-order financial collapse</h2>

      <p>
        The failure mode nobody wants to think about: supplier takes the deposit, starts production,
        runs out of operating cash before shipment, cannot deliver. In the mild version they ship
        late with reduced-quality material. In the hard version they go dark, phones disconnected,
        office empty. Legal recourse in China is theoretically available but slow and
        jurisdictional &mdash; a $100K dispute rarely justifies the cost of pursuit from overseas.
      </p>

      <p>
        Prevention is a mix of credit screening and payment structure. The enterprise credit
        services 企查查 (qichacha.com) and 天眼查 (tianyancha.com) both
        publish Chinese company credit records: legal disputes, administrative penalties,
        equity-freeze actions, tax arrears, debt default records. A clean record is not a guarantee;
        a record of lawsuits in the glass industry is a strong signal.
      </p>

      <h3>Payment structure as risk management</h3>
      <ul>
        <li>
          <strong>Trial order (&lt; $20K):</strong> 100&nbsp;% TT in advance is acceptable if the
          business-licence and video-audit checks pass. The exposure is bounded.
        </li>
        <li>
          <strong>Standard order ($20K&ndash;$100K):</strong> 30&nbsp;% TT deposit / 70&nbsp;% TT
          against B/L copy is the common structure. The supplier produces on your deposit; you
          release the balance when goods are proven to be in transit.
        </li>
        <li>
          <strong>Large order (&gt; $100K):</strong> LC at sight from a reputable bank. Yes it is
          slower; yes it has fees. It is the single most effective hedge against mid-order
          collapse. Avoid LC usance (deferred payment) for new suppliers &mdash; it transfers your
          credit risk to the bank but exposes you to post-shipment disputes.
        </li>
        <li>
          <strong>Trade credit insurance:</strong> Sinosure (Chinese export credit insurer) and
          Coface, Atradius, Euler Hermes (European credit insurers) offer buyer-side coverage. For
          repeat buyers this is cheaper than LC fees across a year of orders.
        </li>
      </ul>

      <CostDisclaimer variant="compact" />

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="exposure-profiler">Measure your exposure</h2>

      {/* SSR shadow for C21 compliance: explains the interactive to AI crawlers that don't execute JS */}
      <p>
        The profiler below takes four inputs &mdash; deal size, your relationship with the
        supplier, destination strictness, and product complexity &mdash; and computes five weighted
        risk scores. Legitimacy risk weights relationship history heaviest. Capability risk weights
        product complexity. Quality risk weights destination code strictness. Financial risk weights
        deal size. Logistics risk weights deal size and destination. The overall score drops you
        into one of four verdict tiers (green / yellow / orange / red), each with a concrete
        protocol: a first-time $500K enterprise order to the US lands in red (full on-site audit,
        LC at sight, staged shipments); a repeat $50K order of simple tempered to SE Asia lands in
        green (standard due diligence sufficient).
      </p>

      <RiskExposureProfiler />

      <p>
        The protocol the tool recommends is not optional advice. It is the baseline we would apply
        to our own first order in that scenario. Scale up on signals you catch during the audit;
        scale down only after 2&ndash;3 clean deliveries build track record.
      </p>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="cert-verifier">Decode the certification</h2>

      {/* SSR shadow for C21 compliance */}
      <p>
        The verifier below covers the eight certifications buyers see most often in the glass
        trade: Chinese GB 15763.2 (tempered), GB 15763.3 (laminated), GB/T 11944 (IGU); EU EN
        12150-2 and EN 14449; US ANSI Z97.1; EU CE marking; and ISO 9001. For each one it shows the
        issuing body, the number format the certificate should carry, the public registry URL where
        you confirm it, a three-step verification protocol, and the fake patterns we see most
        frequently (photos-only, mismatched product scope, expired expiry dates). Select the
        certification your supplier handed you to see its verification path.
      </p>

      <CertVerifier />

      <p>
        None of these verification steps requires paid services. All eight registries are public.
        The one hour you spend verifying certifications end-to-end on a new supplier saves the
        6&ndash;12 months of back-and-forth that follows a project rejection on code grounds.
      </p>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="video-audit">The 90-minute video audit &mdash; script by station</h2>

      {/* SSR shadow for C21 compliance */}
      <p>
        The checklist below is an eight-station live video walk-through covering reception / office
        (10 min), cutting (8 min), edging (6 min), tempering (10 min), lamination (10 min), IGU
        assembly (8 min), QC lab (8 min), and warehouse / shipping (5 min). For each station it
        lists the three specific requests to make of the camera operator (what to show, close up
        on, open up), the pass criteria that distinguish a real line from a staged one, and the
        photos to save for your file. Each station also lists one walk-away signal &mdash; the
        specific observation that should end the audit and the relationship. Expand each station
        to see the detail. Record the call; keep the photos.
      </p>

      <VideoAuditChecklist />

      <p>
        We run this audit from the other side &mdash; buyers walk us through it on WhatsApp calls
        most weeks. Suppliers who are confident about their line pass it comfortably. Suppliers who
        are not either refuse the call, insist on scheduling it two weeks out so they can prepare
        (which defeats the purpose), or try to narrate from a static set of pre-recorded videos.
        All three are useful information.
      </p>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="red-flags">12 red flags that should pause the PO</h2>

      <p>
        None of these are automatically disqualifying. Any one of them is a reason to slow down,
        ask one more question, insist on one more verification step. Three or more of them in the
        same supplier is a reason to walk.
      </p>

      <ol>
        <li>The business licence registered scope is 销售 (sales) only, not 生产 (production).</li>
        <li>The quote is more than 20&nbsp;% below the next-cheapest comparable offer with no explanation.</li>
        <li>Payment terms demand 100&nbsp;% TT in advance for an order over $50K.</li>
        <li>Certifications are provided only as JPEG photos, not full PDF reports.</li>
        <li>The sales rep speaks fluently about products but cannot answer basic process questions (furnace brand, quench time, interlayer type).</li>
        <li>Website shows capability (jumbo, curved, SGP) that the video audit cannot confirm on the floor.</li>
        <li>Supplier refuses live video audit or insists on a scheduled time two weeks out.</li>
        <li>Supplier refuses third-party pre-shipment inspection or insists on their own inspector.</li>
        <li>Address does not match on Baidu Maps street view, or matches but shows an office building with no visible production.</li>
        <li>Enterprise credit record (企查查) shows recent lawsuits, equity-freeze actions, or tax arrears.</li>
        <li>Reference customers are all from the same country / channel and none can be independently contacted.</li>
        <li>Communication rhythm suddenly accelerates on payment timing and slows on technical questions.</li>
      </ol>

      {/* ─────────────────────────────────────────────────────────── */}
      <h2 id="walk-away">When to walk away vs renegotiate</h2>

      <p>
        Red flags are not binary. A supplier can earn back trust by addressing the signal
        directly, and sometimes that process surfaces a stronger relationship than you would have
        had otherwise. The question is which signals are negotiable and which are not.
      </p>

      <h3>Negotiable: process signals</h3>
      <ul>
        <li>Payment terms &mdash; most suppliers will shift from 100&nbsp;% TT to 30/70 if the buyer insists.</li>
        <li>Third-party inspection &mdash; standard-of-practice; a supplier who initially resists usually agrees once asked firmly.</li>
        <li>Lead time &mdash; often inflated in the first quote; worth testing.</li>
        <li>Sample delivery &mdash; a supplier who hesitates to send samples usually has operational issues, not fraud intent. Fixable.</li>
      </ul>

      <h3>Not negotiable: identity signals</h3>
      <ul>
        <li>Business licence scope does not include manufacturing &mdash; this is a documentation fact, not a negotiation.</li>
        <li>Furnace width does not match the panel size quoted &mdash; physical constraint; no amount of discussion changes it.</li>
        <li>Certifications are forged (verified against the issuing registry) &mdash; walk, and report to the registry.</li>
        <li>Credit record shows glass-industry lawsuits in the past 24 months &mdash; the pattern is more important than the stated cause.</li>
      </ul>

      <p>
        The useful mental model: process signals are things the supplier can change for you.
        Identity signals are what the supplier is. You renegotiate the first and walk from the
        second.
      </p>

      {/* ─────────────────────────────────────────────────────────── */}
      <FAQ items={buyerFaq} title="Buyer FAQ" />

      {/* ─────────────────────────────────────────────────────────── */}
      <RelatedProductsCards
        slugs={article.relatedProductSlugs || ['tempered-glass', 'laminated-glass', 'insulated-glass']}
      />

      {/* ─────────────────────────────────────────────────────────── */}
      <section className="my-14">
        <h2 className="text-sm font-semibold text-[#DAA745] uppercase tracking-wider mb-5 m-0">
          More in Buyer&rsquo;s Guide
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="/blog/how-to-import-glass-from-china"
            className="block rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 p-5 hover:border-[#DAA745]/60 transition-colors no-underline"
          >
            <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-2">
              Companion article
            </div>
            <div className="text-base font-semibold text-[#F2F0ED] mb-2">
              How to Import Architectural Glass from China
            </div>
            <p className="text-xs text-[#8B95A5] leading-relaxed m-0">
              The complete buyer journey &mdash; from quote to clearance &mdash; across five
              stages. This article covers Stage 1 (vetting) in depth.
            </p>
          </a>
          <a
            href="/blog/glass-shipping-container-loading-guide"
            className="block rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 p-5 hover:border-[#DAA745]/60 transition-colors no-underline"
          >
            <div className="text-xs text-[#DAA745] uppercase tracking-wider mb-2">
              Companion article
            </div>
            <div className="text-base font-semibold text-[#F2F0ED] mb-2">
              Glass Container Shipping: The Factory Playbook
            </div>
            <p className="text-xs text-[#8B95A5] leading-relaxed m-0">
              Crating, loading, insurance, HS codes. Once vetting is done, this is the operational
              layer under the shipment itself.
            </p>
          </a>
        </div>
      </section>

      <LeadMagnetCTA
        variant="footer"
        articleSlug={SLUG}
        title="Keep the vetting documents in one place"
        description="Download the global glass codes reference and keep it alongside your supplier audit files. The PDF covers US IBC, EU EN, China GB, and Australia AS clauses most relevant to tempered, laminated, insulated, and Low-E glass procurement."
      />
    </BlogArticleLayout>
  );
}
