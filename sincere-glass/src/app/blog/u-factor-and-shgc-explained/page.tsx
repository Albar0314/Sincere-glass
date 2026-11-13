import type { Metadata } from "next";
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from "@/components/blog/BlogArticleLayout";
import TLDRBox from "@/components/blog/TLDRBox";
import CostDisclaimer from "@/components/blog/CostDisclaimer";
import LeadMagnetCTA from "@/components/blog/LeadMagnetCTA";
import FAQ from "@/components/blog/blocks/FAQ";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";
import RelatedProductsCards from "@/components/blog/RelatedProductsCards";
import UFactorRValueConverter from "@/components/blog/UFactorRValueConverter";
import ShgcClimateAdvisor from "@/components/blog/ShgcClimateAdvisor";
import WindowLabelDecoder from "@/components/blog/WindowLabelDecoder";
import { blogArticles } from "@/lib/blog-registry";
import { makeAlternates } from "@/lib/i18n";

const SLUG = "u-factor-and-shgc-explained";
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates("/blog/" + SLUG),
};

const toc: TOCItem[] = [
  { id: "verdict", text: "The 30-second verdict", level: 2 },
  { id: "what-is-u-factor", text: "What U-factor actually measures", level: 2 },
  { id: "what-is-shgc", text: "What SHGC actually measures", level: 2 },
  { id: "u-factor-vs-shgc", text: "U-factor vs SHGC: the two numbers together", level: 2 },
  { id: "u-and-r", text: "U-factor, R-value, and metric U-value", level: 2 },
  { id: "shgc-by-climate", text: "Choosing SHGC by climate zone", level: 2 },
  { id: "window-label", text: "Reading the whole window label", level: 2 },
  { id: "cog-vs-window", text: "Center-of-glass vs whole-window numbers", level: 2 },
  { id: "what-it-costs", text: "What better numbers cost", level: 2 },
  { id: "mistakes", text: "Five mistakes buyers make", level: 2 },
  { id: "how-we-spec", text: "How we spec glass at the factory", level: 2 },
  { id: "faq", text: "FAQ", level: 2 },
];

const faqItems: Array<{ q: string; a: string }> = [
  {
    q: "Is a lower U-factor always better?",
    a: "For heat loss, yes: lower U-factor means less heat escapes. But past a point the cost of a third pane outweighs the saving in mild climates, so match the number to the zone.",
  },
  {
    q: "What is a good U-factor for windows?",
    a: "A double pane Low-E argon IGU reaches about 0.28 to 0.30 (US units), which satisfies most cold US zones. Passive House targets 0.14 or below with triple glazing.",
  },
  {
    q: "What is a good SHGC?",
    a: "Hot, cooling-dominated climates want 0.25 or less. Cold climates can use 0.40 or more on south-facing glass to capture passive solar heat.",
  },
  {
    q: "What is the difference between U-factor and SHGC?",
    a: "U-factor rates heat loss by conduction; SHGC rates how much solar heat passes through. One controls winter bills, the other controls summer overheating.",
  },
  {
    q: "How do I convert U-factor to R-value?",
    a: "R-value is 1 divided by U-factor in the same unit system. A U-factor of 0.30 (US) equals an R-value of about 3.3.",
  },
  {
    q: "Why is my metric U-value a different number?",
    a: "Metric U-value (W/m2.K) is the US U-factor multiplied by 5.678. A US 0.30 is a metric 1.7, so always confirm which unit a spec sheet uses.",
  },
  {
    q: "Does a high SHGC reduce daylight?",
    a: "No. Daylight is measured by VT, not SHGC. A good Low-E coating can keep VT high while pushing SHGC down, so a room stays bright without overheating.",
  },
  {
    q: "Can Sincere Glass hit a target U-factor and SHGC?",
    a: "Yes. We build the IGU to a stated center-of-glass U-factor and SHGC by choosing the Low-E coating, cavity width, and gas fill, with test data on request.",
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
      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox
          takeaways={[
            "U-factor rates heat loss (lower is better); SHGC rates solar heat gain (lower keeps you cool, higher keeps you warm).",
            "U-factor controls your winter heating bill; SHGC controls summer overheating. They are set independently by the Low-E coating.",
            "R-value is just 1 divided by U-factor. US U-factor x 5.678 = metric U-value, so always check the units.",
            "Match SHGC to climate: 0.25 or less for hot zones, 0.40+ on south glass for cold zones.",
            "Spec the center-of-glass number with your glass supplier; the whole-window number also depends on the frame.",
          ]}
        />

        <section id="verdict">
          <h2>The 30-second verdict</h2>
          <p>
            <strong>
              If you only read two numbers on a window, read U-factor and SHGC: U-factor is heat
              lost through the glass (lower is better everywhere), and SHGC is solar heat let in
              (low for hot climates, higher for cold ones).
            </strong>{" "}
            U-factor decides how big your heating bill is in winter. SHGC decides whether a
            south-facing room bakes in summer or stays comfortable. They are controlled separately
            by the Low-E coating, so a good{" "}
            <a href="/blog/insulated-glass-complete-guide">insulated glass unit</a> can give you a
            low U-factor and whatever SHGC your climate needs at the same time.
          </p>
        </section>

        <section id="what-is-u-factor">
          <h2>What U-factor actually measures</h2>
          <p>
            U-factor measures how fast heat escapes through the window by conduction. It is the rate
            of heat flow per unit area per degree of temperature difference, so a lower U-factor
            means a better insulator. In US units it is expressed in Btu/(h.ft2.F) and usually runs
            from about 0.10 for the best triple glazing to 1.04 for a single pane.
          </p>
          <p>
            The number you see on a label is for the assembled unit, not the raw glass. Three things
            move it: the number of panes, the Low-E coating, and the gas in the cavity. A plain
            double pane sits near 0.48; add a Low-E coating and argon fill and the same unit drops
            to roughly 0.28, because the coating reflects radiant heat back into the room. The gas
            matters too - see how{" "}
            <a href="/blog/argon-vs-krypton-gas-fill-igu">argon and krypton fills compare</a>.
          </p>
        </section>

        <section id="what-is-shgc">
          <h2>What SHGC actually measures</h2>
          <p>
            SHGC, the Solar Heat Gain Coefficient, measures the fraction of the sun's heat that
            passes through the window. It runs from 0 to 1: an SHGC of 0.25 means a quarter of the
            incident solar energy ends up inside as heat. Unlike U-factor, there is no universally
            better direction - the right SHGC depends entirely on climate.
          </p>
          <p>
            In a hot climate a low SHGC is a cooling-bill saver. In a cold climate a higher SHGC on
            the south face is free winter heat. The Low-E coating is again the lever: a solar-control
            coating can cut SHGC to 0.25 while barely touching how much daylight gets through.
          </p>
        </section>

        <section id="u-factor-vs-shgc">
          <h2>U-factor vs SHGC: the two numbers together</h2>
          <p>
            U-factor and SHGC answer two different questions, and reading one without the other is
            the most common spec mistake. Think of U-factor as the insulation rating and SHGC as the
            sunglasses rating. The table below shows how four typical build-ups separate the two.
          </p>
          <table>
            <thead>
              <tr>
                <th>Glass build-up</th>
                <th>U-factor (US)</th>
                <th>SHGC</th>
                <th>Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Double pane, clear</td>
                <td>0.48</td>
                <td>0.70</td>
                <td>Mild zones, little sun</td>
              </tr>
              <tr>
                <td>Double pane, solar-control Low-E + argon</td>
                <td>0.28</td>
                <td>0.25</td>
                <td>Hot, cooling-dominated zones</td>
              </tr>
              <tr>
                <td>Double pane, high-gain Low-E + argon</td>
                <td>0.28</td>
                <td>0.45</td>
                <td>Cold zones, south glass</td>
              </tr>
              <tr>
                <td>Triple pane, 2x Low-E + argon</td>
                <td>0.15</td>
                <td>0.25</td>
                <td>Passive House, severe cold</td>
              </tr>
            </tbody>
          </table>
          <p>
            Notice rows two and three share a U-factor but differ in SHGC: same insulation, opposite
            solar strategy, set purely by which Low-E coating we laminate in. A third pane is a
            bigger jump than most projects need; we lay out when it pays in{" "}
            <a href="/blog/double-pane-vs-triple-pane-glass">double pane vs triple pane</a>.
          </p>
        </section>

        <section id="u-and-r">
          <h2>U-factor, R-value, and metric U-value</h2>
          <p>
            R-value and U-factor are the same information inverted: R-value is 1 divided by U-factor,
            so a U-factor of 0.30 is an R-value of about 3.3. Builders talk in R-value for walls and
            U-factor for windows, which trips people up. The converter below moves between them and
            between US and metric units in one place.
          </p>
          <UFactorRValueConverter />
          <p>
            The unit trap is real: a US U-factor of 0.30 is a metric U-value of 1.7 W/m2.K (multiply
            by 5.678). A European spec sheet quoting "Ug 1.1" is far better than a US sheet quoting
            "0.30", not worse, once you convert.
          </p>
        </section>

        <section id="shgc-by-climate">
          <h2>Choosing SHGC by climate zone</h2>
          <p>
            SHGC should be chosen from the climate zone and the facade orientation, not copied from a
            brochure. Cooling-dominated zones want a low SHGC on every face; heating-dominated zones
            want a higher SHGC on the south face and a low one everywhere else. Set your zone and
            orientation below for a target range.
          </p>
          <ShgcClimateAdvisor />
          <LeadMagnetCTA
            variant="inline"
            articleSlug={SLUG}
            title="Glass Performance Spec Sheet"
            description="Download our U-factor and SHGC reference table for every coating and build-up we run, with metric and US units side by side."
          />
        </section>

        <section id="window-label">
          <h2>Reading the whole window label</h2>
          <p>
            A window label carries up to five numbers, and the two that every energy code checks
            first are U-factor and SHGC. The rest - VT, air leakage, and condensation resistance -
            round out the picture. Click any number below to see what it means and what a good value
            looks like.
          </p>
          <WindowLabelDecoder />
        </section>

        <section id="cog-vs-window">
          <h2>Center-of-glass vs whole-window numbers</h2>
          <p>
            A glass supplier quotes the center-of-glass number; a window label quotes the
            whole-window number, and they are not the same. The center-of-glass U-factor describes
            the insulated glass unit itself. The whole-window U-factor blends in the frame and the
            edge of the glass, which are usually worse, so the whole-window figure is a little higher
            (less good).
          </p>
          <p>
            This matters when you compare quotes. If your fabricator quotes a center-of-glass
            U-factor of 0.24 and the finished window is rated 0.30, nobody is lying - the frame moved
            the number. When you buy glass from us, you are buying to the center-of-glass spec; the
            whole-window result depends on who makes the frame.
          </p>
        </section>

        <section id="what-it-costs">
          <h2>What better numbers cost</h2>
          <p>
            Better U-factor and SHGC come from the coating, the gas fill, and the pane count, and
            each step has a rough cost premium over clear double glazing. The table is a planning
            reference, not a quote.
          </p>
          <table>
            <thead>
              <tr>
                <th>Upgrade</th>
                <th>Typical U-factor (US)</th>
                <th>Premium over clear double</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Clear double pane, air</td>
                <td>0.48</td>
                <td>Baseline</td>
              </tr>
              <tr>
                <td>Add Low-E coating</td>
                <td>0.33</td>
                <td>+10 to 20 percent</td>
              </tr>
              <tr>
                <td>Low-E + argon fill</td>
                <td>0.28</td>
                <td>+15 to 25 percent</td>
              </tr>
              <tr>
                <td>Triple pane, 2x Low-E + argon</td>
                <td>0.15</td>
                <td>+60 to 90 percent</td>
              </tr>
            </tbody>
          </table>
          <CostDisclaimer variant="compact" />
        </section>

        <section id="mistakes">
          <h2>Five mistakes buyers make</h2>
          <p>These are the errors we correct most often on incoming specs.</p>
          <ol>
            <li>
              Specifying a low SHGC everywhere in a cold climate, which throws away free winter solar
              heat on the south face.
            </li>
            <li>
              Comparing a US U-factor against a metric U-value without converting, and picking the
              wrong glass by a factor of five.
            </li>
            <li>
              Chasing a lower U-factor with a third pane in a mild climate, where the payback runs
              past 20 years.
            </li>
            <li>
              Comparing a center-of-glass number from one supplier against a whole-window number from
              another.
            </li>
            <li>Assuming low SHGC means a dark room; VT, not SHGC, controls daylight.</li>
          </ol>
        </section>

        <section id="how-we-spec">
          <h2>How we spec glass at the factory</h2>
          <p>
            At our Wuhan line we build the IGU to a stated center-of-glass U-factor and SHGC, then
            back it with test data. We pick the Low-E coating for the SHGC the climate needs, set the
            cavity width and gas fill for the U-factor, and confirm both against EN 673 (U-value) and
            EN 410 (solar and light). If you send the target numbers and the climate zone, we return
            the build-up that hits them.
          </p>
          <InlineQuoteCTA variant="default" />
        </section>

        <section id="faq">
          <h2>FAQ</h2>
          <FAQ items={faqItems} />
        </section>

        <RelatedProductsCards slugs={["insulated-glass", "low-e-glass", "laminated-glass"]} />
      </BlogArticleLayout>
    </>
  );
}
