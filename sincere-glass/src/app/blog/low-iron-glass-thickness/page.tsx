import type { Metadata } from "next";
import Link from "next/link";
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from "@/components/blog/BlogArticleLayout";
import TLDRBox from "@/components/blog/TLDRBox";
import RelatedProductsCards from "@/components/blog/RelatedProductsCards";
import LeadMagnetCTA from "@/components/blog/LeadMagnetCTA";
import CostDisclaimer from "@/components/blog/CostDisclaimer";
import FAQ from "@/components/blog/blocks/FAQ";
import TechNote from "@/components/blog/blocks/TechNote";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";
import LowIronThicknessSelector from "@/components/blog/article-36/LowIronThicknessSelector";
import LowIronOpticalDecayChart from "@/components/blog/article-36/LowIronOpticalDecayChart";
import LowIronThicknessToleranceMatrix from "@/components/blog/article-36/LowIronThicknessToleranceMatrix";
import { blogArticles } from "@/lib/blog-registry";
import { makeAlternates } from "@/lib/i18n";

const SLUG = "low-iron-glass-thickness";
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc: TOCItem[] = [
  { id: "optical-decay-by-thickness", text: "Why Thickness Changes the Clarity Gap (Beer-Lambert Law)", level: 2 },
  { id: "thickness-by-thickness-guide", text: "4mm, 5mm, 6mm, 8mm, 10mm, 12mm, 15mm & 19mm Breakdown", level: 2 },
  { id: "interactive-thickness-selector", text: "Interactive Low Iron Thickness & Weight Calculator", level: 2 },
  { id: "wuhan-factory-envelope", text: "Wuhan Factory Stock, Tolerances & Jumbo Limits", level: 2 },
  { id: "monolithic-vs-laminated", text: "When to Split Thickness into Laminated Low Iron", level: 2 },
  { id: "thickness-cost-impact", text: "How Thickness Drives Price & Lead Time", level: 2 },
  { id: "faq", text: "Technical FAQ: Selecting Low Iron Glass Thickness", level: 2 },
];

const faqItems = [
  {
    q: "What thicknesses does low iron glass come in for architectural projects?",
    a: "Architectural low iron float glass is produced in standard nominal thicknesses of 4mm, 5mm, 6mm, 8mm, 10mm, 12mm, 15mm, and 19mm (3/16 in to 3/4 in). In our Wuhan facility, 6mm, 8mm, 10mm, and 12mm are kept on the floor for 100 m2 MOQ orders, while 4mm, 5mm, 15mm, and 19mm are drawn to batch order.",
  },
  {
    q: "Is 6mm low iron glass thick enough for commercial windows and insulated glass units?",
    a: "Yes. 6mm low iron glass (15.0 kg/m2, ~91.2% VLT) is the global commercial baseline for double-glazed IGUs (such as 6T+12Ar+6T) and white back-painted spandrels. Projects only need to step up to 8mm or 10mm lites when individual panel height exceeds 2.8 meters or design wind pressure exceeds 2.0 kPa.",
  },
  {
    q: "Should I choose 10mm or 12mm low iron glass for a frameless shower door or office partition?",
    a: "10mm low iron tempered glass (25.0 kg/m2) is the standard choice for frameless shower doors up to 850mm wide and office partitions up to 2,700mm tall. Step up to 12mm (30.0 kg/m2) for oversized pivot doors, tall 2.7m-3.2m partitions, or unsupported retail storefronts where extra flexural rigidity is required.",
  },
  {
    q: "At what thickness does low iron glass become visibly necessary over standard clear glass?",
    a: "At 10mm and thicker, the visual difference becomes unmistakable because ferric oxide absorption compounds exponentially with thickness. Standard 10mm clear drops to 86.0% VLT with a distinct bottle-green edge, whereas 10mm low iron holds 90.4% VLT with a crystal-neutral edge. At 4mm-6mm, low iron is mainly justified for pure-white back-painted glass or multi-pane laminated assemblies.",
  },
  {
    q: "Does low iron glass have the same structural strength as standard clear glass of the same thickness?",
    a: "Yes. Reducing Fe2O3 from ~0.11% to below 0.01% alters optical absorption, not mechanical modulus. Annealed and tempered low iron glass share identical density (2.5 kg/m2/mm), Young's modulus (70 GPa), and bending strength ratings under ASTM C1048-18 and EN 12150-1.",
  },
  {
    q: "What is the maximum panel size Sincere Glass can temper in 12mm, 15mm, and 19mm low iron glass?",
    a: "In our 20,000 m2 Wuhan facility, our horizontal tempering furnaces and laminating autoclaves process 12mm, 15mm, and 19mm low iron jumbo panels up to 3,300 mm x 15,000 mm, subject to raw jumbo float sheet availability and export container loading constraints.",
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
            "Low iron glass shares identical structural strength and weight (2.5 kg/m2/mm) with standard clear glass; you choose thickness for span, wind/crowd load, and hardware limits, then choose low iron to prevent green shift.",
            "4mm and 5mm suit splashbacks, furniture, and small residential IGUs; 6mm is the commercial IGU and white spandrel baseline; 10mm and 12mm dominate frameless showers, partitions, and storefronts; 15mm and 19mm serve jumbo lobbies and structural fins.",
            "The optical payoff scales exponentially with thickness: low iron gains only +1.5% VLT at 4mm, jumps to +4.4% at 10mm, and reaches +9.4% VLT at 19mm.",
            "In our 20,000 m2 Wuhan plant, 6mm, 8mm, 10mm, and 12mm low iron are floor-stocked (100 m2 MOQ, 15-20 working days), while 4mm, 5mm, 15mm, and 19mm require float-mill batch scheduling (200-500 m2 MOQ).",
            "For balustrades and overhead glazing under IBC 2024 Sec 2407 or EN 12600, split thick monolithic glass into laminated low iron (e.g., 8+1.52 SGP+8mm instead of 15mm mono) to maintain post-breakage retention.",
          ]}
        />

        <div className="my-8 rounded-xl border-l-4 border-[#DAA745] bg-[#3A4250]/20 p-5">
          <p className="text-sm text-[#F2F0ED] leading-relaxed m-0">
            <strong>Direct Thickness Rule:</strong> Low iron glass thickness selection follows a
            simple four-tier ladder: specify <strong>4mm-5mm</strong> for interior splashbacks and
            compact residential IGUs, <strong>6mm-8mm</strong> for commercial curtain wall IGUs and
            white ceramic-frit spandrels, <strong>10mm-12mm</strong> for frameless shower doors,
            office partitions, and retail storefronts, and <strong>15mm-19mm</strong> (or multi-ply
            SGP laminates) for jumbo lobby walls and structural glass fins.
          </p>
        </div>

        <p>
          Specifiers searching for 4mm, 5mm, 6mm, or 10mm{" "}
          <Link href="/products/low-iron-glass" className="text-[#DAA745] underline">
            low iron architectural glass
          </Link>{" "}
          face two linked decisions: how thick the pane must be to satisfy structural deflection and
          safety codes, and whether that thickness actually justifies the low iron substrate
          premium. Because iron oxide absorbs light exponentially as glass gets thicker, a thickness
          change of just 4 millimeters can turn a barely noticeable tint into a dark green stripe
          that triggers architectural punch-list rejection.
        </p>

        <p>
          This specification guide maps every commercial low iron thickness from 4mm to 19mm against
          VLT retention, weight per square meter, thickness tolerances under{" "}
          <strong>GB 11614-2022</strong>, <strong>ASTM C1036-21</strong>, and{" "}
          <strong>EN 572-2:2012</strong>, and real floor-stock availability inside our 20,000 m2
          Wuhan processing facility. For the broader optical chemistry and building-wide overview,
          refer to our{" "}
          <Link href="/blog/low-iron-glass-complete-guide" className="text-[#DAA745] underline">
            low iron glass complete specifier&apos;s guide
          </Link>
          .
        </p>

        <h2 id="optical-decay-by-thickness">
          Why Thickness Changes the Clarity Gap (Beer-Lambert Law)
        </h2>

        <p>
          Visible light loss inside float glass is governed by the Beer-Lambert absorption law: as
          light travels through thicker glass, ferrous iron ions (Fe2+) absorb red-spectrum
          wavelengths exponentially. Standard clear float glass carries ~0.11% Fe2O3 by weight, so
          doubling thickness from 6mm to 12mm cuts VLT from 89.0% down to 84.5% and deepens the
          polished edge to bottle-green. Low iron float keeps Fe2O3 below 0.01%, holding 12mm VLT at
          89.9% and 19mm VLT at 88.4% (compared to just 79.0% for 19mm standard clear).
        </p>

        <p>
          <strong>How the optical decay chart works:</strong> Click any thickness node from 4mm to
          19mm on the SVG curve below to compare Visible Light Transmittance (ISO 9050 / EN 410),
          simulated polished-edge color swatches, and the specifier verdict for low iron (&lt;0.01%
          Fe2O3) versus standard clear (~0.11% Fe2O3).
        </p>

        <LowIronOpticalDecayChart />

        <p>
          This exponential curve explains why 10mm is the commercial tipping point. If you are still
          deciding between ultra-clear and standard float at thinner gauges, review our side-by-side
          edge test in{" "}
          <Link href="/blog/low-iron-glass-vs-clear-glass" className="text-[#DAA745] underline">
            low iron glass vs. standard clear glass
          </Link>
          .
        </p>

        <h2 id="thickness-by-thickness-guide">
          4mm, 5mm, 6mm, 8mm, 10mm, 12mm, 15mm &amp; 19mm Breakdown
        </h2>

        <p>
          Nominal thickness dictates both structural rigidity (flexural stiffness scales with the
          cube of thickness, t^3) and factory supply-chain speed. Below is the exact engineering
          envelope for each standard thickness tier.
        </p>

        <div className="my-8 overflow-x-auto">
          <table
            className="w-full border-collapse text-sm"
            aria-label="Low iron glass thickness specification matrix from 4mm to 19mm including VLT, weight, tolerances, and typical applications, data verified 2026-11-25"
          >
            <caption className="text-left text-xs text-[#8B95A5] mb-2">
              Table 1: Complete Low Iron Glass Thickness Selection Matrix (4mm-19mm, ISO 9050 / ASTM
              C1036-21 / EN 572-2:2012). Data verified: 2026-11-25.
            </caption>
            <thead>
              <tr className="border-b border-[#3A4250]/60 text-left text-xs uppercase tracking-wider text-[#DAA745]">
                <th scope="col" className="py-3 pr-3">Thickness</th>
                <th scope="col" className="py-3 px-3">Imperial Equiv.</th>
                <th scope="col" className="py-3 px-3">Weight (kg/m2)</th>
                <th scope="col" className="py-3 px-3">VLT (Low Iron vs Clear)</th>
                <th scope="col" className="py-3 px-3">Typical Build-Up</th>
                <th scope="col" className="py-3 pl-3">Best-Fit Applications</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3A4250]/30 text-[#F2F0ED]">
              <tr>
                <th scope="row" className="py-3 pr-3 text-left font-mono font-bold text-[#DAA745]">4 mm</th>
                <td className="py-3 px-3 font-mono">5/32 in</td>
                <td className="py-3 px-3 font-mono">10.0</td>
                <td className="py-3 px-3 font-mono">91.5% vs 90.0% (+1.5%)</td>
                <td className="py-3 px-3">Annealed / Tempered / Back-Painted</td>
                <td className="py-3 pl-3">White kitchen splashbacks, display cases, solar covers</td>
              </tr>
              <tr>
                <th scope="row" className="py-3 pr-3 text-left font-mono font-bold text-[#DAA745]">5 mm</th>
                <td className="py-3 px-3 font-mono">3/16 in</td>
                <td className="py-3 px-3 font-mono">12.5</td>
                <td className="py-3 px-3 font-mono">91.3% vs 89.5% (+1.8%)</td>
                <td className="py-3 px-3">5T+9A+5T IGU / 5+5 Laminated</td>
                <td className="py-3 pl-3">Residential windows, cabinet doors, small interior shelves</td>
              </tr>
              <tr>
                <th scope="row" className="py-3 pr-3 text-left font-mono font-bold text-[#DAA745]">6 mm</th>
                <td className="py-3 px-3 font-mono">1/4 in</td>
                <td className="py-3 px-3 font-mono">15.0</td>
                <td className="py-3 px-3 font-mono">91.2% vs 89.0% (+2.2%)</td>
                <td className="py-3 px-3">6T+12Ar+6T IGU / White Ceramic Frit</td>
                <td className="py-3 pl-3">Commercial facades, white spandrels, 6+6 laminated skylights</td>
              </tr>
              <tr>
                <th scope="row" className="py-3 pr-3 text-left font-mono font-bold text-[#DAA745]">8 mm</th>
                <td className="py-3 px-3 font-mono">5/16 in</td>
                <td className="py-3 px-3 font-mono">20.0</td>
                <td className="py-3 px-3 font-mono">90.8% vs 87.5% (+3.3%)</td>
                <td className="py-3 px-3">8T+12Ar+8T IGU / 8+1.52+8 Lami</td>
                <td className="py-3 pl-3">High-wind IGUs, semi-frameless showers, balustrade laminates</td>
              </tr>
              <tr>
                <th scope="row" className="py-3 pr-3 text-left font-mono font-bold text-[#DAA745]">10 mm</th>
                <td className="py-3 px-3 font-mono">3/8 in</td>
                <td className="py-3 px-3 font-mono">25.0</td>
                <td className="py-3 px-3 font-mono">90.4% vs 86.0% (+4.4%)</td>
                <td className="py-3 px-3">Monolithic Tempered / 10+10 SGP</td>
                <td className="py-3 pl-3">Frameless shower doors, office partitions, interior doors</td>
              </tr>
              <tr>
                <th scope="row" className="py-3 pr-3 text-left font-mono font-bold text-[#DAA745]">12 mm</th>
                <td className="py-3 px-3 font-mono">1/2 in</td>
                <td className="py-3 px-3 font-mono">30.0</td>
                <td className="py-3 px-3 font-mono">89.9% vs 84.5% (+5.4%)</td>
                <td className="py-3 px-3">Monolithic Tempered / 12+12 SGP</td>
                <td className="py-3 pl-3">Luxury storefronts, tall frameless partitions, heavy doors</td>
              </tr>
              <tr>
                <th scope="row" className="py-3 pr-3 text-left font-mono font-bold text-[#DAA745]">15 mm</th>
                <td className="py-3 px-3 font-mono">5/8 in</td>
                <td className="py-3 px-3 font-mono">37.5</td>
                <td className="py-3 px-3 font-mono">89.2% vs 82.0% (+7.2%)</td>
                <td className="py-3 px-3">Jumbo Tempered + HST (EN 14179)</td>
                <td className="py-3 pl-3">Ground-floor lobby walls, freestanding storefronts, glass fins</td>
              </tr>
              <tr>
                <th scope="row" className="py-3 pr-3 text-left font-mono font-bold text-[#DAA745]">19 mm</th>
                <td className="py-3 px-3 font-mono">3/4 in</td>
                <td className="py-3 px-3 font-mono">47.5</td>
                <td className="py-3 px-3 font-mono">88.4% vs 79.0% (+9.4%)</td>
                <td className="py-3 px-3">Jumbo Tempered + HST / Structural</td>
                <td className="py-3 pl-3">Monumental glass fins, structural walls, large aquariums</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>4mm &amp; 5mm Low Iron Glass: Color-Critical Thin Substrates</h3>
        <p>
          4mm and 5mm low iron glass deliver only +1.5% to +1.8% VLT gain over standard clear float,
          so they are rarely specified for edge aesthetics alone. Their primary architectural role
          is eliminating green color shift on pure-white (RAL 9003 / 9010) back-painted{" "}
          <Link href="/products/enameled-glass" className="text-[#DAA745] underline">
            ceramic-frit enameled glass
          </Link>{" "}
          and residential{" "}
          <Link href="/products/insulated-glass" className="text-[#DAA745] underline">
            insulated glass units
          </Link>{" "}
          under 1.8 m2. In our Wuhan tempering furnaces, 4mm low iron requires tighter quench air
          pressure control to stay within ASTM C1048-18 bow limits (max 0.3% overall bow), so we
          cap 4mm tempered panel dimensions at 2,400 x 3,300 mm.
        </p>

        <h3>6mm &amp; 8mm Low Iron Glass: The Commercial Facade Workhorses</h3>
        <p>
          6mm low iron glass is the highest-volume ultra-clear thickness stocked across Chinese
          Tier-1 float mills (CSG, Xinyi, Taiwan Glass). It serves as the default lite thickness for
          commercial double-glazed IGUs (<code>6T + 12Ar + 6T</code>), white exterior spandrels, and
          two-ply architectural laminates (<code>6 + 1.52 PVB + 6</code>). Step up from 6mm to 8mm
          when curtain wall panels exceed 2,800 mm in height, sit in coastal high-wind zones (&gt;2.0
          kPa), or require deeper acoustic damping.
        </p>

        <h3>10mm &amp; 12mm Low Iron Glass: Frameless Architecture Standards</h3>
        <p>
          10mm and 12mm are where low iron{" "}
          <Link href="/products/tempered-glass" className="text-[#DAA745] underline">
            tempered safety glass
          </Link>{" "}
          delivers its highest visual return on investment. On exposed flat-polished edges viewed
          within 1.5 meters, 10mm standard clear shows a dark green perimeter that clashes with
          white marble or brushed brass hardware. Specify 10mm for standard{" "}
          <Link href="/blog/low-iron-glass-shower-door" className="text-[#DAA745] underline">
            frameless low iron shower doors
          </Link>{" "}
          (up to 850mm door width, ~48 kg for a 2,100 x 900 mm leaf) and interior partitions under
          2.7 meters; step up to 12mm for wider pivot doors, 2.7m-3.2m full-height office walls, and
          luxury retail storefronts. Review detailed tempering tolerances and CNC cutout rules in
          our{" "}
          <Link href="/blog/low-iron-tempered-glass" className="text-[#DAA745] underline">
            low iron tempered glass specification guide
          </Link>
          .
        </p>

        <h3>15mm &amp; 19mm Low Iron Glass: Jumbo Lobbies &amp; Structural Fins</h3>
        <p>
          At 15mm (37.5 kg/m2) and 19mm (47.5 kg/m2), standard clear glass absorbs so much visible
          light that panels appear distinctly dark emerald even straight-on. Low iron restores ~89%
          VLT and crisp water-white edges for tall lobby walls and cantilevered structural fins.
          Because thick tempered glass carries higher stored thermal energy, always pair 15mm and
          19mm exterior or overhead panels with <strong>EN 14179-1:2016</strong> heat-soak testing
          (HST) to screen out nickel sulfide inclusions.
        </p>

        <h2 id="interactive-thickness-selector">
          Interactive Low Iron Thickness &amp; Weight Calculator
        </h2>

        <p>
          <strong>How the thickness selector works:</strong> Choose one of seven architectural
          applications, dial in your panel height (800-4,500 mm) and width (500-3,000 mm), and
          toggle the high-load switch if your project faces wind pressure above 2.0 kPa or heavy
          crowd loads. The calculator outputs recommended nominal thickness (4-19 mm), single-lite
          unit weight (2.5 kg/m2/mm), total panel weight in kilograms, applicable building codes,
          and Wuhan floor-stock status - then pre-fills your factory quote request.
        </p>

        <LowIronThicknessSelector />

        <h2 id="wuhan-factory-envelope">
          Wuhan Factory Stock, Tolerances &amp; Jumbo Limits
        </h2>

        <p>
          Thickness availability directly affects both MOQ and project lead time. In our 20,000 m2
          Wuhan facility, we run 4 intelligent cutting lines, 4 edge-grinding lines, 2 tempering
          furnaces (max 3.3m x 15m), 2 high-pressure laminating autoclaves (max 3.3m x 15m), and 2
          insulated glass lines. Keeping 6mm, 8mm, 10mm, and 12mm Tier-1 Chinese low iron float on
          our warehouse racks lets us accept 100 m2 orders with 15-20 working day lead times.
          Thinner (4mm/5mm) and heavy jumbo (15mm/19mm) campaigns are pulled directly from float
          mills upon deposit confirmation.
        </p>

        <p>
          <strong>How the factory envelope matrix works:</strong> Toggle between Monolithic
          (4mm-19mm) and Laminated Low Iron Equivalents (5+5mm through 10+10mm) below to inspect exact
          weight, thickness tolerances per GB 11614-2022 / EN 572-2:2012, maximum tempered
          dimensions on our Wuhan lines, and floor-stock MOQ thresholds.
        </p>

        <LowIronThicknessToleranceMatrix />

        <TechNote type="note" title="Thickness Tolerance Matters for Frameless Hardware">
          <p>
            Under <strong>ASTM C1036-21</strong> and <strong>EN 572-2:2012</strong>, nominal 10mm
            and 12mm float glass carries a +/-0.3 mm thickness tolerance (meaning a 12mm pane can
            legally measure 11.7mm to 12.3mm), while 19mm glass carries up to +/-1.0 mm. Always
            verify patch-fitting gasket range and U-channel pocket clearance before locking 15mm or
            19mm shop drawings. For North American load-resistance calculations across thickness
            tiers, consult{" "}
            <a
              href="https://www.astm.org/e1300-16.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DAA745] underline"
            >
              ASTM E1300-16
            </a>{" "}
            and the{" "}
            <a
              href="https://www.glass.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DAA745] underline"
            >
              National Glass Association (NGA)
            </a>
            .
          </p>
        </TechNote>

        <h2 id="monolithic-vs-laminated">
          When to Split Thickness into Laminated Low Iron
        </h2>

        <p>
          A common specification mistake is ordering 15mm or 19mm monolithic tempered low iron for a
          balustrade, skylight, or tall storefront where building codes mandate post-breakage glass
          retention. Under <strong>IBC 2024 Sec 2407.1.2</strong>, monolithic tempered glass is no
          longer permitted for cantilevered guards unless a top rail is installed that remains
          intact if a pane breaks.
        </p>

        <p>
          Replacing a single thick pane with two thinner low iron lites bonded via a crystal-clear
          PVB or SentryGlas (SGP) interlayer in{" "}
          <Link href="/products/laminated-glass" className="text-[#DAA745] underline">
            low iron laminated glass
          </Link>{" "}
          solves three problems simultaneously:
        </p>

        <ul>
          <li>
            <strong>Code Compliance &amp; Safety Retention:</strong> An <code>8T + 1.52 SGP + 8T</code>{" "}
            build-up (17.52mm total) achieves higher post-breakage structural stiffness than 15mm
            monolithic glass while holding fragments in place upon impact.
          </li>
          <li>
            <strong>Faster Stock Availability:</strong> Because 6mm, 8mm, and 10mm low iron float are
            floor-stocked in Wuhan, fabricating <code>8+8</code> or <code>10+10</code> laminated
            panels often beats the mill-campaign wait time for 19mm monolithic jumbo plates.
          </li>
          <li>
            <strong>Acoustic Upgrade:</strong> Splitting 12mm monolithic into <code>6+1.52 PVB+6</code>{" "}
            lifts Sound Transmission Class from ~STC 34 to STC 38-40 without adding green edge tint
            when both lites use low iron substrate.
          </li>
        </ul>

        <LeadMagnetCTA
          variant="inline"
          articleSlug="low-iron-glass-thickness"
          title="Free PDF: Global Architectural Glass Building Codes Comparison"
          description="Verify minimum glass thickness, laminated guardrail mandates, and impact safety classes across US IBC, EU EN, China GB, and Australia AS."
        />

        <h2 id="thickness-cost-impact">How Thickness Drives Price &amp; Lead Time</h2>

        <p>
          Low iron glass pricing does not scale linearly with millimeters. Moving from 6mm to 10mm
          increases FOB Wuhan tempered pricing roughly in line with glass weight (+60% to +75% per
          m2), whereas jumping from 12mm to 15mm or 19mm triggers a steeper step-function jump due
          to slower float furnace pull rates and smaller mill campaigns. For exact 2026 FOB Wuhan
          unit rates across 6mm-19mm build-ups, see our{" "}
          <Link href="/blog/low-iron-glass-cost" className="text-[#DAA745] underline">
            2026 low iron glass cost breakdown
          </Link>
          , and review mill-certificate audit checks in our{" "}
          <Link href="/blog/low-iron-glass-suppliers" className="text-[#DAA745] underline">
            low iron glass suppliers buyer&apos;s checklist
          </Link>
          .
        </p>

        <CostDisclaimer variant="default" />

        <InlineQuoteCTA variant="dark" />

        <h2 id="faq">Technical FAQ: Selecting Low Iron Glass Thickness</h2>
        <FAQ items={faqItems} title="" />

        <RelatedProductsCards
          slugs={["low-iron-glass", "tempered-glass", "laminated-glass", "insulated-glass"]}
          heading="Sincere Glass Architectural Lines Available in 4-19mm Low Iron"
        />

        <LeadMagnetCTA variant="footer" articleSlug="low-iron-glass-thickness" />
      </BlogArticleLayout>
    </>
  );
}
