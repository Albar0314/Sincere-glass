import type { Metadata } from "next";
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from "@/components/blog/BlogArticleLayout";
import TLDRBox from "@/components/blog/TLDRBox";
import CostDisclaimer from "@/components/blog/CostDisclaimer";
import LeadMagnetCTA from "@/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/components/blog/RelatedProductsCards";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";
import FAQ from "@/components/blog/blocks/FAQ";
import Link from "@/components/LocalizedLink";
import { blogArticles } from "@/lib/blog-registry";
import { makeAlternates } from "@/lib/i18n";
import SpacerConductivityComparator from "@/components/blog/article-30/SpacerConductivityComparator";
import SpacerCondensationChecker from "@/components/blog/article-30/SpacerCondensationChecker";
import SpacerSelectorMatrix from "@/components/blog/article-30/SpacerSelectorMatrix";

const SLUG = "insulated-glass-spacer-warm-edge-vs-aluminum";
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc: TOCItem[] = [
  { id: "verdict", text: "The 30-second verdict", level: 2 },
  { id: "what-spacer-does", text: "What the spacer actually does", level: 2 },
  { id: "aluminum", text: "Aluminum spacers: the baseline", level: 2 },
  { id: "warm-edge-families", text: "Warm edge: the four families", level: 2 },
  { id: "psi-value", text: "The number that matters: psi-value", level: 2 },
  { id: "condensation", text: "Condensation: where spacers earn their keep", level: 2 },
  { id: "durability", text: "Durability and 25-year gas retention", level: 2 },
  { id: "cost", text: "What warm edge costs", level: 2 },
  { id: "which-spacer", text: "Which spacer for your project", level: 2 },
  { id: "supply", text: "What we supply", level: 2 },
  { id: "faq", text: "FAQ", level: 2 },
];

const faqItems = [
  { q: "What is a warm edge spacer?", a: "A spacer bar made of low-conductivity material (stainless steel, plastic hybrid, foam or thermoplastic) instead of aluminum, so the glass edge stays warmer and loses less heat." },
  { q: "Is warm edge worth the extra cost?", a: "In heating-dominated climates and condensation-prone buildings, yes. It raises the edge temperature a few degrees, which cuts edge condensation and modestly improves the whole-window U-factor." },
  { q: "How much warmer is a warm edge spacer?", a: "At a cold outdoor condition the glass edge typically runs a few degrees Celsius warmer than with aluminum. The exact gain depends on the glass build-up, frame and modelling method." },
  { q: "What is the psi-value of a spacer?", a: "Psi is the linear thermal transmittance along the glass edge, in W per metre per degree. Aluminum is around 0.08, good warm edge spacers are around 0.03. Lower is better." },
  { q: "Does the spacer affect the U-value?", a: "Yes, through the edge-of-glass zone. The spacer does not change the center-of-glass U-value but it changes the whole-window U-factor, which is what energy codes assess." },
  { q: "Which warm edge spacer is best?", a: "Foam and thermoplastic (TPS) give the lowest conductivity; stainless steel is the cheapest step up from aluminum. The right pick depends on climate, indoor humidity and budget." },
  { q: "Do you offer warm edge spacers?", a: "Yes. Our insulated glass lines run aluminum and warm edge spacer options; tell us the climate and performance target and we will recommend a build-up." },
  { q: "Can warm edge spacers be used in jumbo IGUs?", a: "Yes, within the unit size and structural limits of each spacer system. Rigid systems suit very large lites; we confirm the spacer against the panel size at quote stage." },
];

export default function Page() {
  const schemas = articleJsonLd(article, faqItems);
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <BlogArticleLayout article={article} toc={toc}>
        <h2 id="verdict">The 30-second verdict</h2>
        <p>
          <strong>
            Choose a warm edge spacer whenever the climate is heating-dominated or the building runs humid indoors;
            keep aluminum only for mild climates where first cost is the single driver.
          </strong>{" "}
          The spacer is the metal or polymer frame that holds the two panes apart at the edge of an insulated glass
          unit. Aluminum conducts heat, so it creates a cold strip around the glass perimeter where heat escapes and
          condensation forms first. Warm edge spacers swap that conductive bar for a low-conductivity material, lifting
          the edge temperature a few degrees. That is the whole decision.
        </p>
        <TLDRBox
          takeaways={[
            "The spacer sets the glass apart at the edge; aluminum conducts heat and makes a cold edge, warm edge spacers do not.",
            "Warm edge raises the edge-of-glass temperature a few degrees Celsius, which cuts edge condensation and modestly improves the whole-window U-factor.",
            "Psi-value is the number to compare: aluminum around 0.08 W/mK, good warm edge around 0.03.",
            "If the climate is cold or the interior is humid, specify warm edge. If the climate is mild and budget rules, aluminum is acceptable.",
            "Foam and TPS are the warmest; stainless steel is the cheapest warm edge step up from aluminum.",
          ]}
        />

        <h2 id="what-spacer-does">What the spacer actually does</h2>
        <p>
          The spacer does three jobs at once: it fixes the cavity width, it holds the desiccant that keeps the cavity
          dry, and it carries the primary seal that keeps the argon in. It is set and sealed as one of the first steps
          on the line - we walk through that in{" "}
          <Link href="/blog/how-is-insulated-glass-made">how the spacer is set and sealed on the line</Link>. Because it
          runs the full perimeter of every unit, its material decides how cold the glass edge gets.
        </p>

        <h2 id="aluminum">Aluminum spacers: the baseline</h2>
        <p>
          Aluminum is the default because it is cheap, rigid and easy to bend, but it is also a thermal bridge. The bar
          conducts interior heat straight to the cold outer pane, pulling the edge temperature down and leaving a visible
          cold band a couple of centimetres wide around the glass. In a warm, humid room that band is where fog and
          water appear first, long before the center of the glass.
        </p>

        <h2 id="warm-edge-families">Warm edge: the four families</h2>
        <p>
          Warm edge is not one product but four approaches, ranked roughly from cheapest to warmest. Stainless steel is
          a thin, less conductive metal bar - the smallest step off aluminum. TGI hybrids use a plastic body with a thin
          steel foil as the vapor barrier. TPS (thermoplastic spacer) is extruded as a warm polymer bead with no rigid
          bar at all. Silicone foam is a flexible foam strip with the lowest conductivity of the group.
        </p>
        <table aria-label="Warm edge spacer families">
          <caption>Spacer families, cheapest to warmest. Indicative psi-values for a Low-E argon double unit. Data verified: 2026-11-17.</caption>
          <thead>
            <tr><th scope="col">Spacer</th><th scope="col">Make-up</th><th scope="col">psi (W/mK)</th><th scope="col">Relative cost</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Aluminum</th><td>Conductive metal bar</td><td>~0.08</td><td>Base</td></tr>
            <tr><th scope="row">Stainless steel</th><td>Thin, less conductive metal</td><td>~0.05</td><td>Low premium</td></tr>
            <tr><th scope="row">TGI hybrid</th><td>Plastic body + steel foil</td><td>~0.035</td><td>Medium</td></tr>
            <tr><th scope="row">TPS</th><td>Applied polymer bead</td><td>~0.033</td><td>Medium</td></tr>
            <tr><th scope="row">Silicone foam</th><td>Flexible foam strip</td><td>~0.030</td><td>Higher</td></tr>
          </tbody>
        </table>

        <h2 id="psi-value">The number that matters: psi-value</h2>
        <p>
          Compare spacers on psi-value, the heat lost along the glass edge per metre of perimeter per degree - lower is
          better. The slider below shows how each spacer sets the edge-of-glass temperature as the outdoor temperature
          drops, with indoor air held at 21 C. At a cold outdoor condition an aluminum edge can sit several degrees
          colder than a foam or TPS edge, which is exactly the gap that drives condensation and edge heat loss. The
          default view is outdoor -10 C.
        </p>
        <SpacerConductivityComparator />
        <p>
          The spacer only changes the edge zone, not the center of the glass. To see how that edge effect folds into the
          rating codes actually assess, read{" "}
          <Link href="/blog/u-factor-and-shgc-explained">how edge effects fold into the whole-window U-factor</Link>.
        </p>

        <h2 id="condensation">Condensation: where spacers earn their keep</h2>
        <p>
          Edge condensation, not energy, is the problem warm edge most reliably solves. Water forms wherever a surface
          is colder than the room air dew point, and the spacer sets how cold the edge gets. The checker below takes
          your indoor humidity and outdoor temperature, works out the dew point, and shows whether an aluminum edge and
          a warm edge edge stay dry. The default is 55% indoor humidity at -5 C outdoor.
        </p>
        <SpacerCondensationChecker />

        <h2 id="durability">Durability and 25-year gas retention</h2>
        <p>
          A spacer system is only as good as the seal it carries for the life of the unit. The gas fill behind that seal
          is a separate decision - see{" "}
          <Link href="/blog/argon-vs-krypton-gas-fill-igu">the gas fill inside the cavity</Link>. Rigid systems
          (aluminum, stainless, TGI) take a conventional dual seal; applied systems (TPS, foam) integrate the primary
          seal into the spacer itself. All of them can reach a 25-year service life when the secondary seal, desiccant
          and assembly are right; the spacer material changes the edge temperature, not the fundamental lifespan.
        </p>

        <h2 id="cost">What warm edge costs</h2>
        <p>
          Warm edge adds a small premium per unit, not a large one. Stainless steel is the cheapest step off aluminum;
          foam and TPS sit higher. Against the cost of the glass, coating and gas fill, the spacer line item is minor,
          which is why specifiers in cold or humid projects usually treat warm edge as the default rather than an
          upgrade.
        </p>
        <CostDisclaimer variant="compact" />
        <LeadMagnetCTA
          variant="inline"
          articleSlug={SLUG}
          title="Global glass building codes, compared"
          description="Download the free comparison of US, EU, China and Australia requirements for insulated and coated glass."
        />

        <h2 id="which-spacer">Which spacer for your project</h2>
        <p>
          The right spacer is a function of climate and indoor humidity, not a single best answer. The selector below
          maps your climate and priority to a recommended spacer family. Weighing a bigger thermal upgrade at the same
          time? Compare it against{" "}
          <Link href="/blog/double-pane-vs-triple-pane-glass">stepping up to triple glazing</Link>, and read{" "}
          <Link href="/blog/insulated-glass-complete-guide">the complete IGU specification guide</Link> for the whole
          build-up.
        </p>
        <SpacerSelectorMatrix />

        <h2 id="supply">What we supply</h2>
        <p>
          Our insulated glass lines run both aluminum and warm edge spacer options on the same units, including jumbo
          sizes up to 3.3 m x 15 m within each spacer system's structural limits. Tell us the climate, the indoor
          conditions and the performance target, and we will recommend a spacer and a full build-up rather than leaving
          it as a line on your order.
        </p>
        <InlineQuoteCTA variant="default" />
        <RelatedProductsCards slugs={["insulated-glass", "low-e-glass"]} heading="Related products" />

        <FAQ items={faqItems} />
      </BlogArticleLayout>
    </>
  );
}
