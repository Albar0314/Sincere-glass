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
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";
import RelatedProductsCards from "@/components/blog/RelatedProductsCards";
import TemperThicknessSelector from "@/components/blog/article-31/TemperThicknessSelector";
import LowIronTemperedClarityView from "@/components/blog/article-31/LowIronTemperedClarityView";
import LowIronTemperedPriceStack from "@/components/blog/article-31/LowIronTemperedPriceStack";
import { blogArticles } from "@/lib/blog-registry";
import { makeAlternates } from "@/lib/i18n";

const SLUG = "low-iron-tempered-glass";
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc: TOCItem[] = [
  { id: "verdict", text: "The 30-second verdict", level: 2 },
  { id: "what-it-is", text: "What low iron tempered glass is", level: 2 },
  { id: "how-much-clearer", text: "How much clearer is it", level: 2 },
  { id: "thickness", text: "Can every thickness be tempered", level: 2 },
  { id: "when-needed", text: "When you actually need it", level: 2 },
  { id: "heat-soak", text: "Heat soak and safety", level: 2 },
  { id: "cost", text: "What it costs", level: 2 },
  { id: "alternatives", text: "Low iron tempered vs the alternatives", level: 2 },
  { id: "specify", text: "How to specify it", level: 2 },
  { id: "faq", text: "FAQ", level: 2 },
];

const faqItems = [
  {
    q: "Is low iron glass stronger than regular glass after tempering?",
    a: "No. Low iron and standard clear temper to the same strength. Low iron only changes clarity and color; the toughening process and the resulting strength are identical.",
  },
  {
    q: "Can low iron glass be tempered at any thickness?",
    a: "Yes, across the usual 4 to 19 mm range. The iron content does not affect temperability; we toughen low iron on the same line as clear glass.",
  },
  {
    q: "Does low iron tempered glass still have a green tint?",
    a: "No. Removing the iron is what removes the green cast. Low iron keeps a near-colorless edge even at 12 mm and above, where clear glass looks distinctly green.",
  },
  {
    q: "Do I need heat soak on low iron tempered glass?",
    a: "Heat soak depends on the application, not the glass type. It is standard for railings, overhead and floors, advised for frameless showers, and optional for framed low-level glazing.",
  },
  {
    q: "How much more does low iron tempered cost than standard tempered?",
    a: "Budget roughly 20 to 25 percent over standard clear tempered for the glass itself. The premium is a smaller share of the total once hardware, freight and installation are counted.",
  },
  {
    q: "What are the common brand names for low iron glass?",
    a: "Starphire, Optiwhite, Diamant and UltraClear are the best known. They are all low iron float; specify the optical grade and thickness rather than the brand.",
  },
  {
    q: "Can low iron glass be both tempered and laminated?",
    a: "Yes. Low iron is often tempered first, then laminated for overhead and structural safety glazing. The low iron plies keep the whole build-up colorless.",
  },
  {
    q: "Is low iron worth it for a framed shower screen?",
    a: "For a thin framed screen the green tint is barely visible, so the premium is harder to justify. On thick frameless panels the clarity difference is obvious and usually worth it.",
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
            "Low iron tempered glass is ultra-clear glass that has been toughened. Same strength as standard tempered, far better clarity and no green tint.",
            "The iron content has no effect on tempering. Any thickness from 4 to 19 mm that we temper in clear, we temper in low iron.",
            "The clarity gap grows with thickness. On thick railings, floors and fins low iron is the obvious call; on thin framed glass it is often optional.",
            "Heat soak is driven by the application (railings, overhead, floors), not by choosing low iron.",
            "Budget about 20 to 25 percent over standard clear tempered for the glass, a smaller share once the whole job is priced.",
          ]}
        />

        <h2 id="verdict">The 30-second verdict</h2>
        <p>
          <strong>
            Specify low iron tempered glass when the edge and the color will be
            seen and the glass is 10 mm or thicker; for thin framed glass the
            premium is optional.
          </strong>{" "}
          Low iron tempered is simply ultra-clear (low iron) float that has been
          thermally toughened to safety glass. Tempering does not care about iron
          content, so you get the full strength of tempered glass with none of
          the green cast. The decision is almost never about strength and almost
          always about how visible the glass is. For the full background on the
          base material, see our{" "}
          <a href="/blog/low-iron-glass-complete-guide">complete guide to low iron glass</a>.
        </p>

        <h2 id="what-it-is">What low iron tempered glass is</h2>
        <p>
          Low iron tempered glass is one product made in two steps: a low iron
          melt, then thermal toughening. Standard float glass carries iron oxide
          that gives it a green tint; low iron float is made with far less iron
          (typically under 0.01 percent Fe2O3), which lifts light transmittance
          and removes the green. Toughening is the same process used on any
          tempered glass: the pane is heated to about 620 C and quenched, leaving
          the surface in compression so it is four to five times stronger than
          annealed glass and breaks into small, blunt granules. Common low iron
          names you will see on drawings are Starphire, Optiwhite, Diamant and
          UltraClear.
        </p>

        <h2 id="how-much-clearer">How much clearer is it</h2>
        <p>
          The clarity advantage is small at 4 mm and large by 19 mm, because iron
          absorption compounds with thickness. A standard clear pane loses a few
          points of light transmittance and greens up as it gets thicker, while
          low iron stays near colorless. Move the slider to see the gap at the
          thickness you are specifying.
        </p>
        <LowIronTemperedClarityView />
        <p>
          This is why low iron is almost mandatory on thick glass fins, floors
          and multi-layer laminated build-ups: the green of three or four stacked
          clear plies is unmistakable. The same comparison at a single thickness
          is covered in{" "}
          <a href="/blog/low-iron-glass-vs-clear-glass">low iron vs standard clear glass</a>.
        </p>

        <h2 id="thickness">Can every thickness be tempered</h2>
        <p>
          Yes, low iron tempers across the full 4 to 19 mm range that we run in
          clear glass, with no special handling. The limit on any job is panel
          size and oven capacity, not the glass chemistry. Use the qualifier to
          check thickness, practical panel size and whether the application calls
          for a heat soak.
        </p>
        <TemperThicknessSelector />

        <InlineQuoteCTA variant="default" />

        <h2 id="when-needed">When you actually need it</h2>
        <p>
          Reach for low iron tempered when the glass is a visible design element
          rather than a barrier you look through once. Frameless shower
          enclosures, glass railings and balustrades, display cases and retail
          vitrines, glass floors and stair treads, furniture tops and aquariums
          all benefit, and the benefit rises with thickness. Where the glass is
          framed, thin and purely functional, the green tint is hard to notice and
          standard clear tempered is the economical choice.
        </p>

        <h2 id="heat-soak">Heat soak and safety</h2>
        <p>
          Heat soak is decided by where the glass goes, not by choosing low iron.
          Tempered glass carries a small risk of spontaneous breakage from nickel
          sulfide inclusions; the heat soak test (EN 14179) holds the glass at
          about 290 C to force those inclusions to fail in the factory instead of
          on site. We treat it as standard for railings, overhead glazing and
          floors, advised for frameless shower panels, and optional for framed,
          low-level glazing. The deeper process detail lives in our{" "}
          <a href="/blog/heat-soaked-tempered-glass-guide">heat soak test guide</a>.
        </p>

        <h2 id="cost">What it costs</h2>
        <p>
          Expect roughly a 20 to 25 percent premium over standard clear tempered
          for the glass itself, before hardware, freight and installation. Because
          the glass is only part of a finished job, the premium is a smaller slice
          of the total than it looks on the per-square-meter line. Build up an
          estimate below.
        </p>
        <LowIronTemperedPriceStack />
        <CostDisclaimer variant="compact" />

        <h2 id="alternatives">Low iron tempered vs the alternatives</h2>
        <p>
          The honest comparison is against standard clear tempered, not against
          laminated or annealed, which answer different needs. The table below
          sets out where each lands.
        </p>
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Clarity</th>
              <th>Safety rating</th>
              <th>Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Low iron tempered</td>
              <td>Highest, no green</td>
              <td>Tempered safety glass</td>
              <td>Visible, thick, frameless</td>
            </tr>
            <tr>
              <td>Standard clear tempered</td>
              <td>Good, slight green</td>
              <td>Tempered safety glass</td>
              <td>Framed, thin, cost-led</td>
            </tr>
            <tr>
              <td>Low iron annealed</td>
              <td>Highest, no green</td>
              <td>Not safety glass</td>
              <td>Protected, non-impact use</td>
            </tr>
            <tr>
              <td>Low iron laminated</td>
              <td>Highest, no green</td>
              <td>Retains on breakage</td>
              <td>Overhead, structural, security</td>
            </tr>
          </tbody>
        </table>

        <LeadMagnetCTA
          variant="inline"
          articleSlug={SLUG}
          title="Spec'ing low iron tempered for a project?"
          description="Send us your sizes, thickness and application and we will confirm temperability, heat soak and a firm price."
        />

        <h2 id="specify">How to specify it</h2>
        <p>
          A clean specification names six things, so quoting is fast and there is
          no ambiguity on the line. Call out: the base glass as low iron float
          (and the optical grade if your client insists on a brand), the
          thickness, that it is thermally toughened to EN 12150 or ASTM C1048,
          whether heat soak to EN 14179 is required, the edgework, and any
          coating or lamination that follows. With those six, we can confirm
          temperability and panel size and return a firm quote.
        </p>

        <h2 id="faq">FAQ</h2>
        <FAQ items={faqItems} />

        <RelatedProductsCards
          slugs={["tempered-glass", "laminated-glass", "insulated-glass"]}
        />
      </BlogArticleLayout>
    </>
  );
}
