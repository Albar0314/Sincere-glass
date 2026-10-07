import { blogArticles } from '@/lib/blog-registry';
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
} from '@/components/blog/BlogArticleLayout';
import type { TOCItem } from '@/components/blog/BlogArticleLayout';
import TLDRBox from '@/components/blog/TLDRBox';
import CostDisclaimer from '@/components/blog/CostDisclaimer';
import RelatedProductsCards from '@/components/blog/RelatedProductsCards';
import LeadMagnetCTA from '@/components/blog/LeadMagnetCTA';
import BreakagePatternSVG from './BreakagePatternSVG';
import ManufacturingComparisonSVG from './ManufacturingComparisonSVG';
import DecisionMatrix from './DecisionMatrix';

const SLUG = 'tempered-glass-vs-laminated-glass';
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata = generateArticleMetadata(article);

const toc: TOCItem[] = [
  { id: 'how-each-glass-is-made', text: 'How Each Glass Is Made', level: 2 },
  { id: 'breakage-behavior', text: 'Breakage Behavior', level: 2 },
  { id: 'performance-comparison', text: '7 Performance Metrics', level: 2 },
  { id: 'application-guide', text: 'Application Decision Guide', level: 2 },
  { id: 'tempered-laminated-hybrid', text: 'Tempered Laminated Glass', level: 2 },
  { id: 'other-safety-glass', text: 'Other Safety Glass Options', level: 2 },
  { id: 'cost-and-lead-time', text: 'Cost & Lead Time', level: 2 },
  { id: 'how-to-choose', text: 'How to Choose', level: 2 },
  { id: 'faq', text: 'FAQ', level: 2 },
];

const faqItems: { q: string; a: string }[] = [
  {
    q: 'Is tempered glass stronger than laminated glass?',
    a: 'Tempered glass has higher impact strength — roughly 4–5× stronger than annealed glass per ANSI Z97.1-2015 Class A testing. However, laminated glass offers superior post-breakage performance: the PVB or SGP interlayer holds fragments in place, maintaining a barrier even after impact. The right choice depends on whether your application prioritizes pre-break strength or post-break retention.',
  },
  {
    q: 'Can you cut tempered glass after it is made?',
    a: 'No. Tempered glass cannot be cut, drilled, or edge-worked after tempering. All cutting and shaping must be finalized before the glass enters the furnace. This is why accurate dimensions on your order are critical. Laminated glass can technically be cut post-manufacture, but the interlayer makes it difficult and rarely advisable.',
  },
  {
    q: 'Which glass is better for soundproofing?',
    a: 'Laminated glass is significantly better at reducing noise, achieving STC ratings of 35–40+ versus tempered glass at STC 31–33. The PVB or SGP interlayer acts as a damping core that absorbs sound vibrations, especially in the 1,000–2,000 Hz range where speech and traffic noise concentrate.',
  },
  {
    q: 'Is laminated glass required for skylights?',
    a: 'In most building codes worldwide — including IBC 2021 §2406.4.1, China\u2019s GB 15763.3-2009, EN 14449:2005, and AS/NZS 2208:1996 — laminated glass is either required or strongly recommended for overhead glazing. The interlayer prevents broken shards from falling onto people below.',
  },
  {
    q: 'What is tempered laminated glass?',
    a: 'Tempered laminated glass combines both technologies: each glass ply is first tempered for higher impact resistance, then the plies are bonded with a PVB or SGP interlayer in an autoclave. This delivers the strength of tempered glass plus the fragment-retention and acoustic benefits of laminated. It is now standard for structural glass floors, high-rise curtain walls, and blast-resistant glazing.',
  },
  {
    q: 'How do I tell whether existing glass is tempered or laminated?',
    a: 'For tempered glass, look for a small etched certification stamp in one corner — CCC (China), ANSI Z97.1 (U.S.), or EN 12150 (Europe). For laminated glass, view the edge: you\u2019ll see a visible interlayer line between the plies. Tapping also helps — laminated glass produces a noticeably duller, dampened sound compared to the clear ring of tempered glass.',
  },
  {
    q: 'What is the MOQ for tempered or laminated glass export orders?',
    a: 'At Sincere Glass we work with project-based MOQs rather than rigid minimums. If your order volume covers a production run efficiently, we can accommodate orders starting from approximately 200 m\u00b2. Contact our sales team with your project specifications for a detailed quotation.',
  },
  {
    q: 'What certifications does Sincere Glass provide with export shipments?',
    a: 'We provide CCC (China Compulsory Certification), ISO 9001 quality management certification, and test reports per GB 15763.2/3 standards. For specific export markets we can arrange third-party testing to ANSI Z97.1 (U.S.), EN 12150/14449 (Europe), or AS/NZS 2208 (Australia) upon request.',
  },
  {
    q: 'What is your typical production lead time?',
    a: 'Standard tempered glass: 7–10 working days from order confirmation. Laminated glass: 10–15 working days. Tempered laminated glass: 15–20 working days for custom configurations. Rush orders may be possible depending on current production capacity — ask your account manager.',
  },
  {
    q: 'Can Sincere Glass arrange shipping to my country?',
    a: 'We offer FOB Wuhan factory pricing as standard and can also arrange CIF or door-to-door delivery through our logistics partners. Glass requires specialized wooden crating and container loading — our export packaging team handles this to minimize breakage risk during transit. Contact us for a shipping estimate to your destination.',
  },
];

export default function TemperedVsLaminatedPage() {
  const schemas = articleJsonLd(article, faqItems);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <BlogArticleLayout article={article} toc={toc}>
        {/* C9: Key Takeaways */}
        <TLDRBox
          takeaways={[
            'Tempered glass is 4–5× stronger than annealed glass but shatters completely on impact — ideal for interior doors, shower screens, and partitions.',
            'Laminated glass holds together after breakage thanks to its PVB/SGP interlayer — required by most building codes for overhead glazing and hurricane zones.',
            'Laminated glass blocks up to 99% of UV radiation and achieves STC 35–40+ sound reduction ratings, outperforming tempered on both metrics.',
            'Tempered laminated glass combines both technologies and is now standard for high-rise curtain walls, structural glass floors, and blast-resistant glazing.',
            'FOB factory reference pricing: tempered $8–25/m², laminated $18–50/m², tempered laminated $30–80/m² (2026, varies with specs and volume).',
          ]}
        />

        {/* ---- INTRO (C5: internal product links) ---- */}
        <p>
          When an architect specifies &ldquo;safety glass,&rdquo; the conversation quickly splits in two directions:{' '}
          <a href="/products/tempered-glass"><strong>tempered glass</strong></a> and{' '}
          <a href="/products/laminated-glass"><strong>laminated glass</strong></a>.
          Both are classified as safety glazing under{' '}
          <a href="https://codes.iccsafe.org/content/IBC2021P7" target="_blank" rel="noopener noreferrer">IBC 2021 &sect;2406</a>{' '}
          and China&rsquo;s GB 15763 series. Both can pass building-code inspections. And from across a room, most people cannot tell them apart.
        </p>
        <p>
          But the similarities end at the surface. Beneath it, tempered glass and laminated glass behave in fundamentally different ways &mdash; in how they are manufactured, how they break, how they handle sound, UV radiation, and forced entry, and ultimately, how much they cost.
        </p>
        <p>
          This guide breaks down the seven differences that matter most to buyers, architects, and project managers sourcing glass for commercial and residential projects.
        </p>

        {/* ---- SECTION 1: Manufacturing (C2: factory POV, C3: standards, C4: external links) ---- */}
        <h2 id="how-each-glass-is-made">Two Roads to Safety Glass: How Each Is Made</h2>
        <p>
          The performance gap between tempered and laminated glass starts in the factory. These are entirely different manufacturing processes, producing glass with different internal structures and different failure modes.
        </p>
        <p>
          <strong>Tempered glass</strong> (also called toughened glass) begins as standard annealed float glass. It is cut to final dimensions, edges are ground smooth, and then it enters a tempering furnace heated to approximately 620&nbsp;&deg;C (1,150&nbsp;&deg;F). <strong>In our 20,000&nbsp;m&sup2; Wuhan facility, each panel passes through our 3&nbsp;m&nbsp;&times;&nbsp;15&nbsp;m tempering furnace &mdash; one of two lines capable of processing jumbo-format architectural glass.</strong> The glass is then hit with high-pressure jets of cold air on both surfaces simultaneously. This &ldquo;quenching&rdquo; locks the outer surfaces into compression while the interior remains in tension, creating a stress balance that makes the glass 4&ndash;5&times; stronger than ordinary annealed glass per{' '}
          <a href="https://webstore.ansi.org/standards/z97" target="_blank" rel="noopener noreferrer">ANSI Z97.1-2015, Class&nbsp;A</a>{' '}
          impact testing (and EN&nbsp;12150-1:2015 in European markets).
        </p>
        <p>
          <strong>Laminated glass</strong> takes a different approach. Two or more sheets of glass are stacked with a polymer interlayer sandwiched between them &mdash; most commonly polyvinyl butyral (PVB) from suppliers like{' '}
          <a href="https://www.kuraray.com" target="_blank" rel="noopener noreferrer">Kuraray</a>{' '}
          or{' '}
          <a href="https://www.eastman.com/brands/saflex" target="_blank" rel="noopener noreferrer">Eastman Saflex</a>,
          though ionoplast materials like SentryGlas Plus (SGP) are used for structural applications. <strong>We bond the sandwich in our dual autoclaves, each accepting panels up to 3&nbsp;m&nbsp;&times;&nbsp;15&nbsp;m,</strong> where high temperature and pressure fuse everything into a single bonded unit conforming to GB&nbsp;15763.3-2009 &sect;5.2.1 performance requirements.
        </p>
        <p>
          One critical consequence: tempered glass cannot be cut, drilled, or reshaped after tempering. Every dimension must be finalized before the furnace. Laminated glass offers slightly more flexibility, though post-production cutting is messy and rarely recommended.
        </p>

        <ManufacturingComparisonSVG />

        {/* ---- SECTION 2: Breakage (C3: standards, C5: product links) ---- */}
        <h2 id="breakage-behavior">The Breakage Test: What Happens When Glass Fails</h2>
        <p>
          This is the single most important difference between{' '}
          <a href="/products/tempered-glass">tempered</a> and{' '}
          <a href="/products/laminated-glass">laminated glass</a>, and the one that drives most specification decisions.
        </p>
        <p>
          When tempered glass breaks, it disintegrates &mdash; rapidly and completely &mdash; into hundreds of small, roughly cuboid granules with blunted edges. This is by design: EN&nbsp;12150-1:2015 specifies that fragment counts must meet minimum thresholds in a 50&nbsp;mm&nbsp;&times;&nbsp;50&nbsp;mm test area. The result is far safer than the long, dagger-like shards of ordinary annealed glass, but the glass pane ceases to exist as a barrier. There is nothing left between inside and outside.
        </p>
        <p>
          Laminated glass, by contrast, cracks but stays in place. The interlayer holds the broken fragments together in a &ldquo;spider web&rdquo; pattern, maintaining the pane as a physical barrier even after impact. Broken laminated glass can still resist wind loads, keep out rain, and slow down an intruder &mdash; which is why{' '}
          <a href="https://codes.iccsafe.org/content/IBC2021P7" target="_blank" rel="noopener noreferrer">IBC 2021 &sect;2406.4.1</a>{' '}
          mandates it for overhead glazing and fall-risk locations.
        </p>

        <BreakagePatternSVG />

        {/* ---- SECTION 3: Performance (C4: external links, C5: product links) ---- */}
        <h2 id="performance-comparison">Performance Compared: 7 Metrics That Matter</h2>
        <p>
          Beyond breakage behavior, tempered and laminated glass diverge across several measurable categories. The table below summarizes the key differences.
        </p>

        <div className="my-10 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[#F2F0ED]">
                <th className="text-left py-3 pr-4 font-semibold text-[#F2F0ED]">Metric</th>
                <th className="text-left py-3 px-4 font-semibold text-[#F2F0ED]">Tempered Glass</th>
                <th className="text-left py-3 pl-4 font-semibold text-[#F2F0ED]">Laminated Glass</th>
              </tr>
            </thead>
            <tbody className="text-[#8B95A5]">
              <tr className="border-b border-[#3A4250]/30">
                <td className="py-3 pr-4 font-medium text-[#F2F0ED]">Impact Strength</td>
                <td className="py-3 px-4">4&ndash;5&times; annealed (ANSI Z97.1 Class&nbsp;A)</td>
                <td className="py-3 pl-4">Varies by interlayer; typically 2&ndash;3&times; annealed</td>
              </tr>
              <tr className="border-b border-[#3A4250]/30">
                <td className="py-3 pr-4 font-medium text-[#F2F0ED]">Post-Break Integrity</td>
                <td className="py-3 px-4">None &mdash; shatters completely</td>
                <td className="py-3 pl-4">High &mdash; interlayer holds fragments in frame</td>
              </tr>
              <tr className="border-b border-[#3A4250]/30">
                <td className="py-3 pr-4 font-medium text-[#F2F0ED]">Sound Insulation (STC)</td>
                <td className="py-3 px-4">STC 31&ndash;33</td>
                <td className="py-3 pl-4">STC 35&ndash;40+ (interlayer dampens vibration)</td>
              </tr>
              <tr className="border-b border-[#3A4250]/30">
                <td className="py-3 pr-4 font-medium text-[#F2F0ED]">UV Blocking</td>
                <td className="py-3 px-4">Minimal &mdash; same as regular glass</td>
                <td className="py-3 pl-4">Blocks up to 99% of UV radiation</td>
              </tr>
              <tr className="border-b border-[#3A4250]/30">
                <td className="py-3 pr-4 font-medium text-[#F2F0ED]">Security / Forced Entry</td>
                <td className="py-3 px-4">Low &mdash; one hit shatters the pane</td>
                <td className="py-3 pl-4">High &mdash; multiple impacts needed to penetrate</td>
              </tr>
              <tr className="border-b border-[#3A4250]/30">
                <td className="py-3 pr-4 font-medium text-[#F2F0ED]">Thermal Resistance</td>
                <td className="py-3 px-4">Withstands ~250&nbsp;&deg;C differential</td>
                <td className="py-3 pl-4">Lower; interlayer limits high-heat exposure</td>
              </tr>
              <tr className="border-b border-[#3A4250]/30">
                <td className="py-3 pr-4 font-medium text-[#F2F0ED]">Typical Cost (FOB)</td>
                <td className="py-3 px-4">$8&ndash;25/m&sup2; (6&nbsp;mm clear)</td>
                <td className="py-3 pl-4">$18&ndash;50/m&sup2; (6.38&nbsp;mm PVB)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Tempered glass wins on raw mechanical strength and thermal shock resistance &mdash; it tolerates temperature differentials of around 250&nbsp;&deg;C without cracking. Laminated glass wins on every metric that involves what happens <em>after</em> the glass is damaged: holding together, blocking UV, reducing noise, and resisting repeated impacts.
        </p>
        <p>
          Neither glass type inherently improves thermal insulation (U-value). For energy performance, both are typically incorporated into insulated glass units (IGUs) with air or argon gaps and combined with{' '}
          <a href="/products/low-e-glass">Low-E coatings</a> for solar control.
        </p>

        {/* C7: Mid-article lead magnet */}
        <LeadMagnetCTA variant="inline" articleSlug={SLUG} />

        {/* ---- SECTION 4: Applications ---- */}
        <h2 id="application-guide">Which Glass for Which Job? Application Decision Guide</h2>
        <p>
          The &ldquo;right&rdquo; glass depends on the application. The interactive table below rates tempered and laminated glass for eight common building scenarios. Click any row for more context.
        </p>

        <DecisionMatrix />

        <p>
          A general rule: wherever there is a risk of glass falling onto people (overhead installations, upper-floor fa&ccedil;ades), or where the glass must remain a barrier after impact (security, hurricane zones), laminated glass is the safer and often code-mandated choice per{' '}
          <a href="https://www.glass.org" target="_blank" rel="noopener noreferrer">National Glass Association</a>{' '}
          guidelines. Where the primary need is strength and cost-efficiency without an overhead fall risk (interior doors, shower screens, furniture), tempered glass is usually more practical.
        </p>

        {/* ---- SECTION 5: Hybrid ---- */}
        <h2 id="tempered-laminated-hybrid">The Best of Both Worlds: Tempered Laminated Glass</h2>
        <p>
          Increasingly, projects do not have to choose &mdash; they can use both.{' '}
          <strong>Tempered laminated glass</strong> combines the two technologies: each glass ply is first individually tempered, and then the tempered plies are bonded with a PVB or SGP interlayer in the autoclave.
        </p>
        <p>
          The result is a composite panel offering higher impact resistance plus post-breakage retention and acoustic benefits. This hybrid solution is now standard in several demanding applications:
        </p>
        <div className="my-6 space-y-3">
          {[
            ['Structural glass floors and stairs', 'need both walkable strength and fallout prevention'],
            ['High-rise curtain walls', 'must withstand wind loads and keep fragments in place at height'],
            ['Glass canopies and atriums', 'overhead glazing where strength and retention are both critical'],
            ['Blast-resistant glazing', 'military, embassy, and government buildings with security mandates'],
          ].map(([title, desc], i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-[#DAA745] mt-2 flex-shrink-0" />
              <p className="text-[#8B95A5]"><strong className="text-[#F2F0ED]">{title}</strong> &mdash; {desc}</p>
            </div>
          ))}
        </div>
        <p>
          The trade-off is cost: tempered laminated glass is more expensive than either option alone, and lead times are longer because the glass passes through two separate production lines. But for projects where failure is not an option, this hybrid approach is quickly becoming the industry default.
        </p>

        {/* ---- SECTION 6: Other options (C10: 3rd-option mention) ---- */}
        <h2 id="other-safety-glass">Other Safety Glass Options to Consider</h2>
        <p>
          While tempered and laminated glass cover the vast majority of architectural specifications, three other glass types occasionally enter the conversation. Understanding them helps you confirm whether tempered or laminated truly is the right fit &mdash; or whether an alternative deserves a closer look.
        </p>
        <div className="my-8 space-y-5">
          {[
            {
              name: 'Heat-Strengthened Glass',
              desc: 'Heated like tempered glass but cooled more slowly, producing roughly 2× the strength of annealed glass (versus 4–5× for fully tempered). It breaks into larger pieces rather than small cubes, making it useful as an inner ply in laminated assemblies where full tempering is not required. Governed by ASTM C1048.',
            },
            {
              name: 'Chemically Strengthened Glass',
              desc: 'Strengthened via ion exchange (potassium replaces sodium in the glass surface) rather than thermal quenching. Produces thinner, lighter panels with excellent optical clarity — common in aircraft windshields and smartphone screens, but rarely cost-effective for large architectural panels.',
            },
            {
              name: 'Annealed Float Glass',
              desc: 'The base material from which tempered and laminated glass are made. Cheapest option but offers no safety properties — breaks into dangerous sharp shards. Not suitable for any safety-glazing application. Governed by ASTM C1036.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-[#3A4250]/15 rounded-xl p-5 border border-[#3A4250]/30">
              <h3 className="text-sm font-semibold text-[#DAA745] mb-2">{item.name}</h3>
              <p className="text-sm text-[#8B95A5] leading-relaxed m-0">{item.desc}</p>
            </div>
          ))}
        </div>
        <p>
          For most architectural projects, the decision remains between tempered, laminated, or the tempered-laminated hybrid. If you are unsure which category fits your project, our engineering team can review your specs and recommend the optimal configuration &mdash;{' '}
          <a href="/contact">request a consultation</a>.
        </p>

        {/* ---- SECTION 7: Cost (C2: factory POV, C11: CostDisclaimer) ---- */}
        <h2 id="cost-and-lead-time">Cost, Lead Time &amp; MOQ: What Buyers Should Expect</h2>
        <p>
          Pricing for processed glass varies with thickness, size, coatings, and order volume, but a rough framework helps buyers budget:
        </p>

        <div className="my-8 grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Tempered Glass', price: '$8–25', note: 'per m² (6 mm clear)' },
            { label: 'Laminated Glass', price: '$18–50', note: 'per m² (6.38 mm PVB)' },
            { label: 'Tempered Laminated', price: '$30–80', note: 'per m² (varies by config)' },
          ].map((item, i) => (
            <div key={i} className="bg-[#3A4250]/20 rounded-xl p-5 border border-[#3A4250]/30 text-center">
              <p className="text-xs text-[#8B95A5] mb-1">{item.label}</p>
              <p className="text-2xl font-bold text-[#F2F0ED]">{item.price}</p>
              <p className="text-xs text-[#8B95A5] mt-1">{item.note}</p>
            </div>
          ))}
        </div>

        <CostDisclaimer />

        <p>
          Prices rise with Low-E coatings, larger panel sizes, tinted substrates, and premium interlayer types (SGP instead of PVB). Volume matters &mdash; most Chinese glass processors offer meaningful price breaks above 500&nbsp;m&sup2;.
        </p>
        <p>
          <strong>Lead times</strong> reflect the manufacturing complexity. <strong>Our standard tempered glass production cycle is 7&ndash;10 working days from order confirmation. Laminated glass takes 10&ndash;15 working days due to the additional autoclave bonding step. Tempered laminated glass may require 15&ndash;20 working days</strong> for custom configurations.
        </p>
        <p>
          <strong>MOQs</strong> vary by manufacturer. At Sincere Glass, we work with project-based MOQs rather than rigid minimums &mdash; if your order covers a production run efficiently, we can accommodate smaller volumes.{' '}
          <a href="/contact">Contact our team</a> for a detailed quotation.
        </p>

        {/* ---- SECTION 8: Decision Framework ---- */}
        <h2 id="how-to-choose">How to Choose the Right Glass for Your Project</h2>
        <p>
          If you are still unsure which glass to specify, walk through these three questions:
        </p>
        <div className="my-8 space-y-6">
          {[
            {
              q: 'Is the glass overhead or at height?',
              a: 'If broken glass could fall onto people, use laminated glass. IBC 2021 §2406.4.1, GB 15763.3-2009, and AS/NZS 2208:1996 all mandate or strongly recommend this, and liability exposure makes it non-negotiable.',
            },
            {
              q: 'Does the glass need to remain a barrier after impact?',
              a: 'Security glazing, hurricane zones, blast resistance, acoustic enclosures — anywhere the glass must keep working after it cracks — calls for laminated glass (or tempered laminated for maximum performance).',
            },
            {
              q: 'Is cost efficiency the priority with no overhead risk?',
              a: 'For interior applications — shower doors, office partitions, glass tables, shelving — tempered glass offers excellent safety at a lower cost. No interlayer means simpler production and faster delivery.',
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-[#3A4250] text-[#DAA745] flex items-center justify-center text-lg font-bold flex-shrink-0">{i + 1}</div>
              <div>
                <p className="font-semibold text-[#F2F0ED]">{item.q}</p>
                <p className="text-[#8B95A5] mt-1">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
        <p>
          When in doubt, consult your glass supplier early. A good manufacturer will ask about your building type, location, elevation, code requirements, and performance expectations &mdash; and recommend the right glass configuration before you commit to a purchase order.
        </p>

        {/* ---- SECTION 9: FAQ (C8: buyer-intent FAQ included) ---- */}
        <h2 id="faq">Frequently Asked Questions</h2>

        <h3 className="text-sm font-semibold text-[#DAA745] uppercase tracking-wider mt-8 mb-4">Technical FAQ</h3>
        <div className="space-y-6 my-4">
          {faqItems.slice(0, 6).map((faq, i) => (
            <div key={i} className="border-b border-[#3A4250]/30 pb-6 last:border-0">
              <h4 className="text-base font-semibold text-[#F2F0ED] mb-2">{faq.q}</h4>
              <p className="text-[#8B95A5] text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-semibold text-[#DAA745] uppercase tracking-wider mt-10 mb-4">Buyer &amp; Procurement FAQ</h3>
        <div className="space-y-6 my-4">
          {faqItems.slice(6).map((faq, i) => (
            <div key={i} className="border-b border-[#3A4250]/30 pb-6 last:border-0">
              <h4 className="text-base font-semibold text-[#F2F0ED] mb-2">{faq.q}</h4>
              <p className="text-[#8B95A5] text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* C6: Related Products */}
        <p>
          Already decided on laminated for safety? The next question is whether you also need
          insulated glass for thermal performance — see our{' '}
          <a href="/blog/insulated-glass-vs-laminated-glass">
            insulated vs laminated glass selection guide
          </a>{' '}
          for the five buyer scenarios where one, the other, or both make sense.
        </p>

        <p>
          Not sure if you need safety glass at all? See our{' '}
          <a href="/blog/tempered-glass-vs-annealed-glass">
            tempered vs annealed glass guide
          </a>{' '}
          for where code forbids plain float glass and when annealed is still the right pick.
        </p>
        <TechNote type="note" title="Zoom out to the full picture">
          <p>
            This article is one of three deep-dives in our architectural glass comparison series.
            For the full decision framework across all 9 architectural glass products — with an
            interactive 3-click selector — see our{' '}
            <a href="/blog/architectural-glass-types-guide">
              complete architectural glass types buyer's guide
            </a>.
          </p>
        </TechNote>

        <RelatedProductsCards slugs={['tempered-glass', 'laminated-glass', 'insulated-glass']} />

        {/* C7: Footer Lead Magnet CTA */}
        <LeadMagnetCTA variant="footer" articleSlug={SLUG} />

      </BlogArticleLayout>
    </>
  );
}
