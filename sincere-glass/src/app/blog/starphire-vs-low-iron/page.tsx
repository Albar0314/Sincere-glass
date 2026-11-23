import type { Metadata } from "next";
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from "@/components/blog/BlogArticleLayout";
import TLDRBox from "@/components/blog/TLDRBox";
import FAQ from "@/components/blog/blocks/FAQ";
import CostDisclaimer from "@/components/blog/CostDisclaimer";
import LeadMagnetCTA from "@/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/components/blog/RelatedProductsCards";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";
import { blogArticles } from "@/lib/blog-registry";
import { makeAlternates } from "@/lib/i18n";

import StarphireValueAdvisor from "@/components/blog/article-33/StarphireValueAdvisor";
import BrandClarityComparator from "@/components/blog/article-33/BrandClarityComparator";
import StarphirePremiumCalculator from "@/components/blog/article-33/StarphirePremiumCalculator";

const SLUG = "starphire-vs-low-iron";
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc: TOCItem[] = [
  { id: "verdict", text: "The 30-second verdict", level: 2 },
  { id: "what-is-starphire", text: "What Starphire actually is", level: 2 },
  { id: "side-by-side", text: "Starphire vs low iron, side by side", level: 2 },
  { id: "does-it-show", text: "Does the difference actually show?", level: 2 },
  { id: "cost", text: "What the brand premium costs", level: 2 },
  { id: "when-worth-it", text: "When Starphire is worth it", level: 2 },
  { id: "how-to-specify", text: "How to specify it the right way", level: 2 },
  { id: "faq", text: "FAQ", level: 2 },
];

const faqItems = [
  {
    q: "Is Starphire the same as low iron glass?",
    a: "Yes. Starphire is Vitro's brand name for low-iron glass. It is one low-iron product among several, not a different material from generic low-iron.",
  },
  {
    q: "Is Starphire clearer than other low iron glass?",
    a: "No meaningful difference. Starphire, Optiwhite and Diamant all sit near 0.01% Fe2O3 and about 91% light transmittance, so the edge color and clarity are effectively the same.",
  },
  {
    q: "Why is Starphire more expensive?",
    a: "You pay for the brand, batch-to-batch consistency and documented specs — not extra clarity. Expect roughly 20-30% over generic low-iron of the same thickness.",
  },
  {
    q: "What are good alternatives to Starphire?",
    a: "Optiwhite (Pilkington), Diamant (Saint-Gobain) and reputable generic low-iron are all in the same optical class. Any of them matches Starphire in normal use.",
  },
  {
    q: "Should I use Starphire for a shower door?",
    a: "Low iron is worth it for a thick frameless shower; the Starphire brand specifically only if a client or spec names it. Generic low-iron gives the same look for less.",
  },
  {
    q: "How can I tell low iron from standard clear glass?",
    a: "Look at a cut edge. Standard clear shows a distinct green that deepens with thickness; low iron looks near-colorless. The face of the panel barely shows it.",
  },
  {
    q: "Does low iron glass come tempered?",
    a: "Yes. Low iron can be tempered, laminated or coated like any float glass. For showers and railings it is almost always toughened to safety standards.",
  },
  {
    q: "Can Sincere Glass supply low iron glass?",
    a: "Yes. We supply low-iron glass (tempered, laminated or coated) from our Wuhan facility, matched to the optical class you need, with or without a named brand.",
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
      <BlogArticleLayout
        article={article}
        toc={toc}
        ctaTitle="Need low iron glass without the brand markup?"
        ctaDescription="Sincere Glass supplies ultra-clear low-iron glass matched to your spec. Send your sizes for a reference price."
      >
        <section id="verdict">
          <h2>The 30-second verdict</h2>
          <p>
            <strong>
              Starphire is low iron glass — a brand name, not a clearer material.
              Pay for it only when a spec or client names the brand, or when
              documented consistency matters on a high-visibility job. Otherwise
              generic low-iron gives the same near-colorless result for 20-30%
              less.
            </strong>
          </p>
          <p>
            If your glass is thick, on close view, and tint would be obvious
            (frameless showers, display cases, glass furniture), choose low
            iron. Whether that low iron is Starphire, Optiwhite, Diamant or
            unbranded is a budget and paperwork decision, not an optical one.
          </p>

          <TLDRBox
            takeaways={[
              "Starphire = Vitro's (ex-PPG) brand of low-iron glass, not a separate glass type.",
              "Starphire, Optiwhite and Diamant are the same optical class: ~0.01% Fe2O3, ~91% light transmittance.",
              "The brand premium is roughly 20-30% over generic low-iron — paid for consistency and spec sheets, not clarity.",
              "Standard clear float has ~10x the iron and a visible green edge; that is the real comparison that matters.",
              "Specify by Fe2O3 / light transmittance, not by brand, unless the client requires the name.",
            ]}
          />
        </section>

        <StarphireValueAdvisor />

        <section id="what-is-starphire">
          <h2>What Starphire actually is</h2>
          <p>
            Starphire is a brand of low-iron glass, made by Vitro Architectural
            Glass (the former PPG glass business). Low-iron glass removes most of
            the iron oxide (Fe2O3) that gives ordinary float glass its green
            tint, so the glass transmits more light and shows almost no color at
            the edge.
          </p>
          <p>
            That is the whole trick, and every low-iron brand uses it. Pilkington
            sells it as Optiwhite, Saint-Gobain as Diamant, Guardian as
            UltraClear, and many float lines — including ours — produce unbranded
            low-iron to the same chemistry. Starphire is simply the name people
            recognize first, which is why it gets written into specs as a
            shorthand for &ldquo;ultra-clear glass.&rdquo;
          </p>
        </section>

        <section id="side-by-side">
          <h2>Starphire vs low iron, side by side</h2>
          <p>
            On the numbers that decide clarity, Starphire and other low-irons
            line up almost exactly — and standard clear is the outlier.
          </p>

          <table>
            <thead>
              <tr>
                <th>Glass</th>
                <th>Iron (Fe2O3)</th>
                <th>Light transmittance (6&nbsp;mm)</th>
                <th>Edge color</th>
                <th>Relative price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Starphire (Vitro)</td>
                <td>~0.007%</td>
                <td>~91%</td>
                <td>Near-colorless</td>
                <td>Highest</td>
              </tr>
              <tr>
                <td>Optiwhite (Pilkington)</td>
                <td>~0.01%</td>
                <td>~91%</td>
                <td>Near-colorless</td>
                <td>High</td>
              </tr>
              <tr>
                <td>Diamant (Saint-Gobain)</td>
                <td>~0.01%</td>
                <td>~91%</td>
                <td>Near-colorless</td>
                <td>High</td>
              </tr>
              <tr>
                <td>Generic low-iron</td>
                <td>~0.01%</td>
                <td>~90-91%</td>
                <td>Near-colorless</td>
                <td>Moderate</td>
              </tr>
              <tr>
                <td>Standard clear float</td>
                <td>~0.10%</td>
                <td>~86%</td>
                <td>Distinct green</td>
                <td>Lowest</td>
              </tr>
            </tbody>
          </table>
          <p>
            Figures are typical published ranges for ~6&nbsp;mm glass and vary by
            maker and batch. The pattern, not the decimal, is the point: the four
            low-irons cluster together and standard clear sits well apart.
          </p>

          <BrandClarityComparator />
        </section>

        <section id="does-it-show">
          <h2>Does the difference actually show?</h2>
          <p>
            Between Starphire and another quality low-iron, almost never — between
            low-iron and standard clear, often. The eye reads glass color at the
            exposed edge and through stacked or thick panels. A single 6&nbsp;mm
            pane shows little; a 12&nbsp;mm frameless shower panel or a glass
            display vitrine shows a lot.
          </p>
          <p>
            So the honest comparison for most buyers is not Starphire vs another
            brand — it is low-iron vs standard clear. Once you have chosen
            low-iron, swapping Starphire for Optiwhite, Diamant or good generic
            glass is not something a client will see in the finished job.
          </p>

          <InlineQuoteCTA variant="default" />
        </section>

        <section id="cost">
          <h2>What the brand premium costs</h2>
          <p>
            The brand premium is real but modest — typically 20-30% over generic
            low-iron, and it buys paperwork and consistency rather than a better
            look. Use the calculator to see the figure for your own area and
            thickness.
          </p>

          <StarphirePremiumCalculator />

          <CostDisclaimer variant="compact" />
        </section>

        <section id="when-worth-it">
          <h2>When Starphire is worth it</h2>
          <p>
            Pay for the Starphire name in a short, specific list of cases — and
            only those. If none applies, generic low-iron is the rational choice.
          </p>
          <ul>
            <li>
              <strong>A spec or client names it.</strong> Architects and brands
              often write &ldquo;Starphire&rdquo; into documents. Substituting
              then is a contractual decision, not a technical one.
            </li>
            <li>
              <strong>Large matched runs.</strong> If dozens of panels must look
              identical over time, a single branded line reduces batch-to-batch
              variation risk.
            </li>
            <li>
              <strong>Documentation matters.</strong> Some projects need a named
              product with published, traceable optical data on file.
            </li>
          </ul>
          <p>
            For a one-off shower, a storefront, railings or furniture with no
            brand requirement, generic low-iron of the right thickness and safety
            rating is the better value every time.
          </p>
        </section>

        <section id="how-to-specify">
          <h2>How to specify it the right way</h2>
          <p>
            Specify by property, not by brand, so any qualified supplier can meet
            it. Write the Fe2O3 target (around 0.01%) or a minimum light
            transmittance (for example &ge;90% at 6&nbsp;mm), plus thickness and
            the safety processing you need (tempered to EN&nbsp;12150 /
            ASTM&nbsp;C1048, laminated, or coated).
          </p>
          <p>
            If a client insists on a brand name, write &ldquo;Starphire or
            approved equal&rdquo; — that keeps the recognizable name while letting
            you quote Optiwhite, Diamant or matched generic low-iron without a
            variation. Standard clear float is covered by EN&nbsp;572 and
            ASTM&nbsp;C1036 if you want the baseline reference.
          </p>

          <LeadMagnetCTA
            variant="footer"
            articleSlug={SLUG}
            title="Spec'ing low iron glass?"
            description="Tell us your thickness, size and finish and we'll quote ultra-clear low-iron — named brand or approved equal — from our Wuhan line."
          />
        </section>

        <section id="faq">
          <h2>FAQ</h2>
          {/* SG-ART34-RECIP-V1 */}
          <div className="my-8 rounded-xl border border-[#DAA745]/30 bg-[#3A4250]/15 p-5 text-sm text-[#F2F0ED]">
            <strong>Looking beyond brand markup?</strong> Explore how cutting yield, MOQ, fabrication dilution, and ocean freight shape your final rate in our <a href="/blog/low-iron-glass-cost" className="text-[#DAA745] underline">full low iron glass cost stack (FOB vs. landed)</a>.
          </div>

          <FAQ items={faqItems} />
        </section>

        <RelatedProductsCards slugs={["tempered-glass", "laminated-glass"]} />
      </BlogArticleLayout>
    </>
  );
}
