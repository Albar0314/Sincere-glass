import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from '@/components/blog/BlogArticleLayout';
import TLDRBox from '@/components/blog/TLDRBox';
import LeadMagnetCTA from '@/components/blog/LeadMagnetCTA';
import CostDisclaimer from '@/components/blog/CostDisclaimer';
import RelatedProductsCards from '@/components/blog/RelatedProductsCards';
import { FAQ, TechNote } from '@/components/blog/blocks';
import BuyerScenarioPicker from '@/components/blog/article-2/BuyerScenarioPicker';
import PerformanceRadarChart from '@/components/blog/article-2/PerformanceRadarChart';
import IGUvsLamiCrossSection from '@/components/blog/article-2/IGUvsLamiCrossSection';

const SLUG = 'insulated-glass-vs-laminated-glass';
const article: BlogArticle = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata = generateArticleMetadata(article);

const toc: TOCItem[] = [
  { id: 'five-scenarios', text: 'Five Buyers, Five Different Answers', level: 2 },
  { id: 'anatomy', text: 'What Each Glass Actually Is (Anatomy View)', level: 2 },
  { id: 'performance', text: 'Performance Head-to-Head: 5 Metrics', level: 2 },
  { id: 'combine', text: 'The "Both" Answer: Laminated IGU', level: 2 },
  { id: 'cost-reality', text: 'Cost & Lead Time Reality', level: 2 },
  { id: 'other-paths', text: 'Other Paths Buyers Consider', level: 2 },
  { id: 'faq', text: 'Buyer FAQ', level: 2 },
];

const buyerFaqItems = [
  {
    q: "What's the MOQ for insulated glass units from Sincere Glass?",
    a: "Our standard MOQ for custom IGU orders is 50 square meters, with no restriction on panel size up to our furnace maximum of 3m × 15m. For small boutique projects, we accept trial orders at reduced MOQ with a nominal setup fee. Contact our team for a quote.",
  },
  {
    q: 'Can you produce a laminated IGU (combined unit)?',
    a: 'Yes. Our 20,000 m² Wuhan facility runs both a 3m × 15m tempering furnace and a 3m × 15m high-pressure laminating autoclave, which means we can produce the laminated outer lite and bond it into an IGU in the same production flow. This is the configuration we recommend for premium facades.',
  },
  {
    q: 'What certifications ship with insulated and laminated glass?',
    a: "All insulated and laminated glass we produce is 3C (CCC) certified under China's mandatory product certification system — GB 15763.3-2009 for laminated glass, GB/T 11944-2012 for insulated glass. For export orders, we can also provide test reports suitable for CE, SGCC, or local-market compliance review on request.",
  },
  {
    q: "What's a typical lead time for a combined laminated IGU order?",
    a: 'For a custom laminated IGU order, our standard production cycle is 15-20 working days from order confirmation, depending on coating availability (Low-E) and the complexity of edge treatments. Simple IGU-only or laminated-only orders ship in 10-15 working days.',
  },
];

export default function Page() {
  return (
    <>
      {articleJsonLd(article, buyerFaqItems).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={[
          'Insulated glass (IGU) is for thermal insulation; laminated glass is for safety and sound.',
          'Low-E coated IGU can cut heating/cooling bills by 30-50% — laminated glass changes U-value negligibly.',
          'Laminated glass is code-required for overhead glazing, balustrades, and most storefronts; IGU is not.',
          'For premium facades, use a laminated IGU — the laminated lite handles safety/acoustics, the IGU handles thermal.',
          'Expect laminated IGU to cost roughly 1.6-2× a plain tempered IGU of equal spec.',
        ]} />

        <p>
          A buyer sends us drawings and asks: "Do I need insulated or laminated glass here?"
          This is the most common question we get after "what thickness?" — and the right answer
          almost never comes from a spec sheet. It comes from the <strong>problem the glass is
          solving</strong>: cold weather, street noise, impact risk, an overhead code requirement,
          or some combination of them. This guide walks through how to decide — not with a feature
          checklist, but with the five scenarios most buyers actually fit into.
        </p>

        <p>
          If you've already read our{' '}
          <a href="/blog/tempered-glass-vs-laminated-glass">
            comparison of tempered vs laminated glass
          </a>, you've seen the strength and safety dimension. This article is the
          complementary cut: insulation vs lamination, with the "do I need both?" question
          answered honestly.
        </p>

        <h2 id="five-scenarios">Five Buyers, Five Different Answers</h2>

        <p>
          Pick the scenario that most resembles your project. Our recommendation changes with
          the problem — the same specification table does not fit a Beijing office tower, a
          Parisian apartment facing a busy boulevard, and a Miami beachfront villa.
        </p>

        <BuyerScenarioPicker />

        <TechNote type="tip" title="A pattern in the recommendations">
          <p>
            Insulated glass wins when the <strong>envelope performance</strong> matters most —
            cold climates, HVAC-sensitive buildings. Laminated glass wins when{' '}
            <strong>human safety and user comfort</strong> matter most — overhead,
            street-facing, high-traffic. When both matter, you combine them. The decision is
            rarely about the glass itself; it's about which failure mode you can't accept.
          </p>
        </TechNote>

        <h2 id="anatomy">What Each Glass Actually Is (Anatomy View)</h2>

        <p>
          Specs lie about structure. Toggle the cross-section below to see what you're actually
          buying when you spec an IGU versus a laminated unit. Note that these are different{' '}
          <em>categories</em> of product — not alternatives in the sense that tempered and
          heat-strengthened are. One addresses energy; the other addresses impact and sound.
        </p>

        <IGUvsLamiCrossSection />

        <p>
          <strong>An IGU is a <em>system</em></strong>: two or more glass lites, a sealed cavity
          with gas fill (argon is standard; krypton for premium), warm-edge spacers to minimize
          thermal bridging at the perimeter, and typically a Low-E coating on the inner surface
          of one lite. The engineering problem it solves is <em>heat transfer</em>. Governed by{' '}
          <a href="https://www.en-standard.eu/csn-en-1279-1-glass-in-building-insulating-glass-units-part-1-generalities-system-description-rules-for-substitution-tolerances-and-visual-quality/" target="_blank" rel="noopener">EN 1279</a>{' '}
          (Europe) and GB/T 11944-2012 §5.3 (China).
        </p>

        <p>
          <strong>Laminated glass is a <em>bonded assembly</em></strong>: two or more glass lites
          permanently joined by a polymer interlayer (PVB is standard; SGP for structural/hurricane;
          EVA for decorative inclusions). The engineering problem it solves is <em>what happens on
          impact</em>: broken glass remains adhered to the interlayer instead of becoming airborne
          shards. Governed by{' '}
          <a href="https://codes.iccsafe.org/content/IBC2021P2/chapter-24-glass-and-glazing" target="_blank" rel="noopener">IBC 2021 §2406.4.1</a>{' '}
          and GB 15763.3-2009 §5.2.
        </p>

        <p>
          In our 20,000 m² Wuhan facility, we produce both on parallel lines — two insulated
          glass lines (one is an ultra-large automatic argon-fill line) and two high-pressure
          laminating autoclaves (one 3m × 15m, among the largest in Hubei province). This matters
          because a <em>combined</em> laminated-IGU unit requires both processes to run in
          sequence on compatible lites, and few mid-tier factories can do this in one shop.
        </p>

        <h2 id="performance">Performance Head-to-Head: 5 Metrics</h2>

        <p>
          Hover any metric below to see what it measures and why one product dominates. Note
          that <strong>no single product wins all five</strong> — this is why the "combined"
          option exists.
        </p>

        <PerformanceRadarChart />

        <p>
          Three honest observations about this chart:
        </p>

        <ul>
          <li>
            <strong>Thermal (U-value):</strong> A standard IGU achieves U-value of 2.6-2.8
            W/m²·K (6+12A+6 clear); with Low-E coating and argon fill, this drops to 1.4-1.8.
            A single laminated unit sits at ~5.6 — essentially the same as single glazing.
            There is no shortcut around physics here.
          </li>
          <li>
            <strong>Acoustic (STC):</strong> A plain 6mm IGU rates ~STC 29. A 6.38mm acoustic
            laminated unit rates ~STC 36. The PVB interlayer is a mechanical damper; the air
            gap is a mass-air-mass system that behaves differently across frequencies.
          </li>
          <li>
            <strong>Cost efficiency:</strong> This isn't absolute low price — it's performance
            per RMB. A laminated IGU scores lower because you're paying for both processes,
            but if your project genuinely needs both, splitting the specification into two
            separate products costs more and performs worse at the interfaces.
          </li>
        </ul>

        <LeadMagnetCTA variant="inline" articleSlug="insulated-glass-vs-laminated-glass" />

        <h2 id="combine">The "Both" Answer: Laminated IGU</h2>

        <p>
          For premium architectural projects — luxury residential, high-end hospitality,
          coastal/hurricane zones, acoustic-critical urban buildings — the answer is often
          "both," configured as a <strong>laminated IGU</strong>: a laminated outer lite + air
          gap + Low-E coated tempered inner lite. The outer lite handles impact and acoustic
          duty; the IGU cavity handles thermal duty.
        </p>

        <TechNote type="note" title="Typical premium facade spec">
          <p>
            Outer lite: <strong>6mm clear + 1.52mm SGP + 6mm clear</strong> laminated. <br />
            Cavity: <strong>12mm, argon-filled, warm-edge spacer</strong>. <br />
            Inner lite: <strong>6mm Low-E tempered</strong>, coating on surface #3. <br />
            Total build-up: ~31.52mm. U-value ~1.5 W/m²·K. STC ~38. Hurricane-rated. Low-E
            reflects IR heat without reducing daylight.
          </p>
        </TechNote>

        <p>
          If you are specifying a facade for a project that will outlive its building management
          team, this is the configuration we recommend — not because it's the most expensive,
          but because it addresses every failure mode a glass envelope can have simultaneously.
          See our{' '}
          <a href="/products/insulated-glass">insulated glass product page</a> for build-up
          options and our <a href="/products/laminated-glass">laminated glass page</a> for PVB
          vs SGP interlayer selection guidance.
        </p>

        <h2 id="cost-reality">Cost & Lead Time Reality</h2>

        <p>
          Approximate 2026 FOB Wuhan reference pricing for a 6mm clear baseline:
        </p>

        <ul>
          <li><strong>Monolithic tempered 6mm:</strong> ~$18-22 /m²</li>
          <li><strong>Insulated glass 6+12A+6 (clear):</strong> ~$42-50 /m²</li>
          <li><strong>Insulated with Low-E:</strong> ~$55-68 /m²</li>
          <li><strong>Laminated 6.38mm (PVB):</strong> ~$38-45 /m²</li>
          <li><strong>Laminated IGU (6+1.52+6/12A/6 Low-E):</strong> ~$95-120 /m²</li>
        </ul>

        <CostDisclaimer />

        <p>
          Lead times from our facility: IGU-only or laminated-only orders ship in 10-15 working
          days from order confirmation. Combined laminated IGU orders run 15-20 working days,
          with Low-E coating availability the typical bottleneck (we stock standard soft-coat
          Low-E glass but hard-coat and specialty coatings may add 5-7 days).
        </p>

        <h2 id="other-paths">Other Paths Buyers Consider</h2>

        <p>
          Not every project needs IGU or laminated. A few adjacent options worth knowing:
        </p>

        <ul>
          <li>
            <strong>Monolithic tempered glass</strong> — the cheapest safety glass. Appropriate
            for shower enclosures, interior partitions, furniture, non-overhead balustrades.
            See our{' '}
            <a href="/blog/tempered-glass-vs-laminated-glass">tempered vs laminated comparison</a>{' '}
            for the safety-glass selection logic.
          </li>
          <li>
            <strong>Low-E glass alone (monolithic)</strong> — rare in architectural applications
            because the coating must be protected inside a cavity to maintain emissivity. If a
            spec calls for "Low-E glass," it almost always means Low-E as part of an IGU. See
            our <a href="/products/low-e-glass">Low-E glass product page</a> for coating details.
          </li>
          <li>
            <strong>Enameled or ceramic frit glass</strong> — a surface treatment, not an
            alternative to IGU/laminated. Can be applied to either as spandrel treatment or
            decorative pattern. See our{' '}
            <a href="/products/enameled-glass">enameled glass page</a>.
          </li>
          <li>
            <strong>Triple-glazed IGU (6+12A+6+12A+6)</strong> — pushes U-value to ~0.8 but adds
            weight, cost, and makes handling difficult. Common in Passive House construction;
            rare elsewhere.
          </li>
        </ul>

        <FAQ items={buyerFaqItems} />

        <p>
          Starting further back in your decision? Our{' '}
          <a href="/blog/tempered-glass-vs-annealed-glass">
            tempered vs annealed glass comparison
          </a>{' '}
          covers why "regular" float glass is unsuitable for most modern building applications.
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

        <RelatedProductsCards slugs={['insulated-glass', 'laminated-glass', 'low-e-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="insulated-glass-vs-laminated-glass" />
      </BlogArticleLayout>
    </>
  );
}
