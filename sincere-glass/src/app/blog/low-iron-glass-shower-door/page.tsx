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
import ShowerGlassWorthItAdvisor from "@/components/blog/article-32/ShowerGlassWorthItAdvisor";
import ShowerTintEdgeViewer from "@/components/blog/article-32/ShowerTintEdgeViewer";
import ShowerGlassCostCalculator from "@/components/blog/article-32/ShowerGlassCostCalculator";
import { blogArticles } from "@/lib/blog-registry";
import { makeAlternates } from "@/lib/i18n";

const SLUG = "low-iron-glass-shower-door";
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc: TOCItem[] = [
  { id: "verdict", text: "The 30-second verdict", level: 2 },
  { id: "what-it-is", text: "What low iron shower glass actually is", level: 2 },
  { id: "framed-frameless", text: "Framed vs frameless: where it matters", level: 2 },
  { id: "how-green", text: "How green is standard shower glass", level: 2 },
  { id: "thickness", text: "Which thickness for a shower", level: 2 },
  { id: "cost", text: "What it adds to the job", level: 2 },
  { id: "cleaning", text: "Cleaning, coatings and steam", level: 2 },
  { id: "alternatives", text: "Low iron vs the alternatives for a shower", level: 2 },
  { id: "specify", text: "How to order it", level: 2 },
  { id: "faq", text: "FAQ", level: 2 },
];

const faqItems = [
  {
    q: "Is low iron glass worth it for a shower door?",
    a: "On a frameless 8-12 mm enclosure, yes: the exposed edge of standard glass reads clearly green. On a thin framed screen the tint is hidden, so it is optional.",
  },
  {
    q: "Is low iron glass the same strength as a normal shower panel?",
    a: "Yes. Both are tempered to the same safety standard. Low iron only changes clarity and color; toughening and resulting strength are identical.",
  },
  {
    q: "What thickness should a low iron shower door be?",
    a: "Framed screens use 6 mm, semi-frameless 8 mm, and frameless 10-12 mm. Low iron is available across all of them with no change to tempering.",
  },
  {
    q: "Does a frameless low iron shower need heat soaking?",
    a: "Heat soak is advised for frameless shower panels because a spontaneous break is a safety and cost problem. It is driven by the application, not by choosing low iron.",
  },
  {
    q: "How much more does a low iron shower cost?",
    a: "Budget about 20-25% over standard clear on the glass line. Because hardware and install are fixed, it is a smaller share of the finished enclosure.",
  },
  {
    q: "Will low iron glass stop water spots and limescale?",
    a: "No glass type prevents hard-water spotting. Ask for an easy-clean hydrophobic coating; it works on both clear and low iron and is the real anti-spotting step.",
  },
  {
    q: "Is Starphire the same as low iron shower glass?",
    a: "Starphire is one brand of low iron float. Optiwhite, Diamant and UltraClear are equivalents. Specify the grade and thickness rather than the brand.",
  },
  {
    q: "Can low iron shower glass be both tempered and coated?",
    a: "Yes. The easy-clean coating is applied after tempering. Confirm the coating is rated for the toughened, humid shower environment before ordering.",
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
            "Low iron shower glass is the ultra-clear version of a normal tempered shower panel - same strength, no green tint.",
            "It is worth the premium on frameless 8-12 mm enclosures, where a fully exposed edge shows the green of standard glass. On thin framed screens it is optional.",
            "The green of standard glass compounds with thickness, so the thicker and more exposed the panel, the stronger the case for low iron.",
            "Heat soak is advised for frameless panels and is an application decision, not a low iron one.",
            "Budget roughly 20-25% over standard clear on the glass, a smaller share once hardware and install are counted.",
          ]}
        />

        <h2 id="verdict">The 30-second verdict</h2>
        <p>
          <strong>
            Choose low iron for a shower when the enclosure is frameless and 8 mm
            or thicker; on a thin, fully framed screen the premium is optional.
          </strong>{" "}
          A shower door is tempered safety glass either way - low iron simply
          removes the green cast you see at the edge and through thick panels. The
          decision is never about strength and almost always about how much of the
          glass edge is on show. For the base material behind all of this, see our{" "}
          <a href="/blog/low-iron-glass-complete-guide">complete guide to low iron glass</a>.
        </p>

        <h2 id="what-it-is">What low iron shower glass actually is</h2>
        <p>
          Low iron shower glass is standard shower glass made from a low iron melt.
          Ordinary float glass carries iron oxide that gives it a green tint; low
          iron float uses far less iron (typically under 0.01 percent Fe2O3), which
          removes the green and lifts clarity. It is then tempered to the same
          safety standard as any shower panel - heated and quenched so it is four
          to five times stronger than annealed glass and breaks into small, blunt
          granules. Whether it can be toughened at your thickness is covered in our{" "}
          <a href="/blog/low-iron-tempered-glass">low iron tempered specification guide</a>;
          the short answer for showers is yes, across 6 to 12 mm.
        </p>

        <h2 id="framed-frameless">Framed vs frameless: where it matters</h2>
        <p>
          The enclosure style decides most of the answer. A frame covers the edge,
          which is exactly where the green of standard glass is strongest, so a
          fully framed screen hides the one place low iron helps most. A frameless
          enclosure puts a thick, polished, fully exposed edge at eye level, where
          the color is unmistakable. Set your enclosure and thickness below for a
          direct call.
        </p>
        <ShowerGlassWorthItAdvisor />

        <InlineQuoteCTA variant="default" />

        <h2 id="how-green">How green is standard shower glass</h2>
        <p>
          The green is mild at 6 mm and obvious by 12 mm, because iron absorption
          compounds with the thickness of glass the light passes through. On a
          frameless panel you also see straight into the polished edge, which
          concentrates the color. Step through the thicknesses to see the
          difference at the edge.
        </p>
        <ShowerTintEdgeViewer />

        <h2 id="thickness">Which thickness for a shower</h2>
        <p>
          Shower glass is specified by enclosure type: 6 mm for framed screens,
          8 mm for semi-frameless, and 10 to 12 mm for frameless panels that carry
          their own weight on minimal hardware. Low iron is available across the
          whole range with no change to the tempering, so the thickness choice is
          driven by the enclosure and the hinge loads, not by the glass chemistry.
          The thicker you go, the more a low iron upgrade pays back visually.
        </p>

        <h2 id="cost">What it adds to the job</h2>
        <p>
          Expect a 20 to 25 percent premium over standard clear on the glass line
          itself. Because the hardware, edgework and installation are a fixed cost
          shared by both options, the premium is a smaller slice of the finished
          enclosure than the per-square-meter figure suggests. Build an estimate
          for your enclosure below.
        </p>
        <ShowerGlassCostCalculator />
        <CostDisclaimer variant="compact" />

        <h2 id="cleaning">Cleaning, coatings and steam</h2>
        <p>
          Low iron does not resist water spots or limescale any better than clear
          glass - clarity and spotting are separate problems. The real anti-spotting
          step is a hydrophobic easy-clean coating, applied after tempering, which
          works equally on clear and low iron. In a steam shower or a fully enclosed
          room, specify the coating as rated for high humidity and confirm it suits
          the toughened surface. If the build-up needs to retain on breakage for an
          overhead or bench panel, low iron can also be laminated.
        </p>

        <h2 id="alternatives">Low iron vs the alternatives for a shower</h2>
        <p>
          For a shower the real choice is low iron tempered versus standard clear
          tempered; laminated and coated options answer separate needs. The table
          sets out where each lands.
        </p>
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Clarity at the edge</th>
              <th>Best shower use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Low iron tempered</td>
              <td>Colorless, no green</td>
              <td>Frameless, thick, high-visibility enclosures</td>
            </tr>
            <tr>
              <td>Standard clear tempered</td>
              <td>Visible green edge</td>
              <td>Framed, thin, cost-led screens</td>
            </tr>
            <tr>
              <td>Low iron + easy-clean coating</td>
              <td>Colorless, resists spotting</td>
              <td>Premium frameless and hard-water areas</td>
            </tr>
            <tr>
              <td>Low iron laminated</td>
              <td>Colorless, retains on breakage</td>
              <td>Overhead panels, benches, steam-room ceilings</td>
            </tr>
          </tbody>
        </table>

        <LeadMagnetCTA
          variant="inline"
          articleSlug={SLUG}
          title="Pricing a low iron shower enclosure?"
          description="Send us the panel sizes, enclosure type and thickness and we will confirm temperability, heat soak and a firm price."
        />

        <h2 id="specify">How to order it</h2>
        <p>
          A clean shower order names six things so quoting is fast: the glass as low
          iron float (and the optical grade if a brand is specified), the thickness
          by enclosure type, that it is tempered to EN 12150 or ASTM C1048, whether
          heat soak to EN 14179 is required, the edgework and cut-outs for hinges
          and handles, and any easy-clean or laminated build-up. With those six we
          confirm temperability and panel size and return a firm quote.
        </p>

        <h2 id="faq">FAQ</h2>
        {/* SG-LOW-IRON-PROD-LINK-V1 */}
        <div className="my-8 rounded-xl border border-[#DAA745]/35 bg-[#3A4250]/15 p-5 text-sm text-[#F2F0ED]">
          <strong>Ordering 10mm or 12mm ultra-clear shower enclosures in volume?</strong> Explore our <a href="/products/low-iron-glass" className="text-[#DAA745] underline">low iron glass factory specifications and custom fabrication options</a> covering CNC cutouts, polished edges, and export crating from Wuhan.
        </div>

        <FAQ items={faqItems} />

        <RelatedProductsCards slugs={["low-iron-glass", "tempered-glass", "laminated-glass"]} />
      </BlogArticleLayout>
    </>
  );
}
