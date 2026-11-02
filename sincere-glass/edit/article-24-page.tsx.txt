import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from '@/components/blog/BlogArticleLayout';
import TLDRBox from '@/components/blog/TLDRBox';
import LeadMagnetCTA from '@/components/blog/LeadMagnetCTA';
import RelatedProductsCards from '@/components/blog/RelatedProductsCards';
import { FAQ, TechNote } from '@/components/blog/blocks';
import IronContentComparator from '@/components/blog/pillar-low-iron/IronContentComparator';
import WhenToUseDecisionMatrix from '@/components/blog/pillar-low-iron/WhenToUseDecisionMatrix';
import CostPremiumCalculator from '@/components/blog/pillar-low-iron/CostPremiumCalculator';

const SLUG = 'low-iron-glass-complete-guide';
const article: BlogArticle = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata = generateArticleMetadata(article);

const toc: TOCItem[] = [
  { id: 'what-is-low-iron', text: 'What Makes Glass "Low Iron"', level: 2 },
  { id: 'iron-oxide-green-tint', text: 'Iron Oxide and the Green Tint Problem', level: 3 },
  { id: 'chemistry-comparison', text: 'Low Iron vs Standard Float: Chemistry', level: 3 },
  { id: 'visual-difference', text: 'Visual Difference You Can See', level: 2 },
  { id: 'transmission-numbers', text: 'Light Transmission: 91 vs 83 Percent', level: 3 },
  { id: 'edge-reveal', text: 'Edge Color: The Field Test', level: 3 },
  { id: 'color-fidelity', text: 'Color Fidelity Behind Glass', level: 3 },
  { id: 'when-to-use', text: 'When Low Iron Actually Matters', level: 2 },
  { id: 'thickness-rule', text: 'The Thickness Threshold Rule', level: 3 },
  { id: 'processing-options', text: 'Processing Options', level: 2 },
  { id: 'cost', text: 'Is Low Iron Worth the Premium', level: 2 },
  { id: 'premium-range', text: 'Typical Premium Range', level: 3 },
  { id: 'hidden-costs', text: 'Hidden Costs: Lead Time, MOQ', level: 3 },
  { id: 'standards', text: 'Standards and Spec Writing', level: 2 },
  { id: 'sourcing', text: 'Sourcing Low Iron Glass from China', level: 2 },
  { id: 'faq', text: 'FAQ', level: 2 },
];

const faqItems = [
  {
    q: 'What is low iron glass?',
    a: 'Low iron glass is a float glass variant in which the iron oxide (Fe2O3) content is reduced from a typical 0.10 to 0.15 percent down to below 0.01 percent. Removing the iron removes the green tint caused by iron absorbing red light, which raises visible light transmission from about 83 percent to about 91 percent at 10 mm thickness, and changes edge color from distinct green to near colorless. It is also sold under brand names like Starphire, Optiwhite, UltraClear, Diamant, and Extra Clear.',
  },
  {
    q: 'How much more expensive is low iron glass compared to standard clear?',
    a: 'Low iron glass typically carries a 30 to 100 percent price premium over standard float glass of the same thickness and processing. The gap widens at thinner sizes where production runs are smaller, and narrows at jumbo sizes where capacity utilization improves. For a typical 500 m2 tempered facade order at 8 mm thickness, expect a 40 to 60 percent total cost uplift. For a 50 m2 frameless shower project at 10 mm tempered, premium runs 35 to 50 percent but is almost always worth it because the glass is viewed from under 1 meter.',
  },
  {
    q: 'Is low iron glass stronger than regular glass?',
    a: 'No. Low iron and standard float glass have essentially the same mechanical strength because iron content does not meaningfully affect the silica glass structure. Low iron is only an optical change. When tempered, both low iron and standard glass meet the same safety glass standards (ASTM C1048, EN 12150, GB 15763.2). If strength is your concern, specify tempering or lamination, not low iron.',
  },
  {
    q: 'Does low iron glass have a green edge?',
    a: 'No. Removing the iron oxide removes the green tint, so low iron glass shows a near colorless edge, sometimes with a faint pale blue hint. This edge color difference is in fact the field test that specifiers and quality inspectors use to verify that a delivery is actually low iron rather than standard glass mislabeled.',
  },
  {
    q: 'What is the minimum thickness where low iron becomes necessary?',
    a: 'The industry rule of thumb is 10 mm. Below 10 mm the green cast of standard glass is subtle and often invisible except at exposed edges. At 10 mm and above the tint becomes clearly visible through the glass body, and above 15 mm standard glass can look distinctly bottle green. For any frameless detail (shower doors, balustrades, table tops) where the edge is exposed at close viewing distance, low iron is recommended regardless of thickness.',
  },
  {
    q: 'What is the difference between low iron glass and Starphire?',
    a: 'Starphire is a brand name of low iron glass manufactured by Vitro (formerly PPG). Low iron glass is the generic product category. Starphire competes with Pilkington Optiwhite, Guardian UltraClear, Saint-Gobain Diamant, AGC Clearsight, and ultra clear float from Chinese manufacturers including Taiwan Glass, CSG, and Xinyi. All are low iron glass with similar iron content specifications (under 0.01 percent Fe2O3) and comparable optical performance. The main difference is price and lead time, not optical quality.',
  },
];

const buyerFaqItems = [
  {
    q: 'What is the typical MOQ for low iron glass from a Chinese manufacturer?',
    a: 'Export MOQ for low iron glass is usually higher than standard clear because of smaller production batches. Expect 100 m2 minimum for stock thicknesses (6, 8, 10 mm) and 200 to 500 m2 for non-stock thicknesses or jumbo sizes. Our Wuhan facility can run low iron on standard tempering lines, so MOQ is 100 m2 for processed low iron tempered or laminated.',
  },
  {
    q: 'What is the lead time for low iron glass orders from China?',
    a: 'Add 5 to 10 working days to standard glass lead times because low iron substrate often needs to be ordered from a float glass supplier rather than taken from stock. Typical cycle: low iron tempered 15 to 20 working days from order confirmation, low iron laminated 20 to 25 working days, low iron IGU 20 to 25 working days. Ocean freight transit is additional.',
  },
  {
    q: 'Can you supply low iron glass with ASTM C1036 certification?',
    a: 'Yes. Our low iron substrate meets ASTM C1036 clear glass requirements and can be supplied with mill test reports. We also provide EN 572 compliance documentation for EU buyers and GB 11614 ultra clear float documentation for mixed-market projects. Specify your required standard in the inquiry.',
  },
];

export default function Page() {
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
        <TLDRBox takeaways={[
          'Low iron glass reduces iron oxide content from 0.10 to 0.15 percent down to below 0.01 percent, which removes the green tint and raises visible light transmission from about 83 to 91 percent.',
          'The decision rule is simple: thickness over 10 mm, exposed frameless edges, or a need for color fidelity behind the glass all justify low iron. Thin facade vision glass viewed from distance usually does not.',
          'Expect a 30 to 100 percent price premium over standard clear, widening at thinner sizes and narrowing at jumbo sizes. A 500 m2 tempered facade order sees roughly 40 to 60 percent total cost uplift.',
          'Low iron is sold under brand names including Starphire, Optiwhite, UltraClear, and Diamant, but the generic product from reputable manufacturers has essentially identical optical performance at lower cost.',
          'Our 20,000 m2 Wuhan facility processes low iron substrate on the same tempering, laminating, and IGU lines as standard clear, including jumbo panels up to 3.3 by 15 meters.',
        ]} />

        <p>
          Low iron glass is often described as a premium upgrade, but that framing misses the real decision.
          In some applications it is a non-negotiable spec requirement where standard clear will visibly fail
          the design. In others it is an aesthetic flourish that adds 30 to 100 percent to the glass budget
          with no visible benefit from street distance. The purpose of this guide is to give you the
          decision framework that separates the two, grounded in the chemistry of why the two glasses look
          different, the thickness thresholds where it starts to matter, and the realistic cost impact for a
          typical commercial project.
        </p>

        <p>
          By the end, specifiers will know when to write low iron into a BOQ and when it is wasted budget.
          Importers will know what to ask a Chinese supplier about iron content, MOQ, lead time, and
          certification. Project owners will know whether their contractor is upselling or correctly
          recommending a premium substrate for a real reason.
        </p>

        <h2 id="what-is-low-iron">What Makes Glass "Low Iron"</h2>

        <h3 id="iron-oxide-green-tint">Iron Oxide and the Green Tint Problem</h3>

        <p>
          Soda-lime float glass is made primarily from silica sand, soda ash, and limestone. The sand is the
          largest ingredient by mass, and the iron oxide that gives standard float its characteristic green
          tint is an impurity in the sand itself, not an added ingredient. Typical float glass contains 0.10
          to 0.15 percent iron oxide (Fe2O3) by weight. That seems like a small number, but iron is an
          unusually effective visible light absorber in the red and infrared wavelengths, so even a tenth of
          a percent is enough to produce the familiar greenish cast you see at the edge of any ordinary
          window pane.
        </p>

        <p>
          Low iron glass starts from a purified sand source that has had the iron bearing minerals (mostly
          hematite and limonite) removed through magnetic separation or flotation. The final glass contains
          less than 0.01 percent Fe2O3, roughly a tenfold reduction from standard float. The remaining
          composition (silica, soda, lime, trace alumina) is essentially identical to standard glass, which
          is why mechanical and thermal properties are unchanged. Only the optical signature is different.
        </p>

        <h3 id="chemistry-comparison">Low Iron vs Standard Float Glass: Chemistry</h3>

        <p>
          Standard float glass contains 0.10 to 0.15 percent iron oxide (Fe2O3), which absorbs red light and
          gives thick panels a visible green tint. Low iron glass reduces that iron content below 0.01
          percent, pushing visible light transmission from approximately 83 to 91 percent at 6 mm thickness.
          The difference compounds with thickness. At 19 mm, standard glass transmits only about 75 percent
          while low iron maintains around 89 percent. Edge color changes from distinct green to near
          colorless, which is the field test specifiers use to verify delivery.
        </p>

        <IronContentComparator />

        <h2 id="visual-difference">Visual Difference You Can Actually See</h2>

        <h3 id="transmission-numbers">Light Transmission Numbers: 91 vs 83 Percent</h3>

        <p>
          The headline optical number for low iron glass is visible light transmission (VLT). At 6 mm
          thickness, standard clear float typically transmits 88 to 90 percent of visible light, while low
          iron reaches 91 to 92 percent. The gap looks small on paper but widens quickly with thickness. By
          15 mm, standard float drops to around 78 percent while low iron stays near 90 percent. By 19 mm,
          the gap is 14 percentage points, which translates to a noticeably darker interior behind standard
          glass versus a clearly brighter space behind low iron.
        </p>

        <p>
          For energy performance projects (passive solar design, daylight autonomy targets, LEED credits for
          daylighting) the thicker your spec gets, the more low iron starts to earn its premium through
          delivered daylight rather than through aesthetics alone.
        </p>

        <h3 id="edge-reveal">Edge Color Reveal: The Giveaway Test</h3>

        <p>
          There is a simple field test every quality inspector should know. Place a glass sample on edge
          against a sheet of white paper. Standard clear float shows a distinct green stripe along the
          polished edge, deepening with thickness. Low iron shows a near colorless or faintly pale blue
          edge. The difference is impossible to miss on a 10 mm or thicker sample and is the single most
          reliable way to confirm a delivery is actually low iron rather than standard float mislabeled.
        </p>

        <TechNote type="tip" title="Quality Inspection Tip">
          <p>
            On jumbo orders, ask your supplier to prepare one 100 by 100 mm sample from the same batch as
            your production order. Compare the edge color against a standard clear reference sample from
            the same thickness. If both edges look the same shade of green, something is wrong, request a
            re-check against the mill certificate before accepting the shipment.
          </p>
        </TechNote>

        <h3 id="color-fidelity">Color Fidelity Behind Glass (Display Cases, Facades)</h3>

        <p>
          When something colored sits behind glass, the glass acts as a color filter. Standard float adds a
          green cast that shifts warm colors (red, yellow, orange) toward olive and dulls pure whites to
          slightly green-white. Low iron is near colorless, so what you see behind the glass is close to
          what the object actually looks like. This matters most in three contexts: retail showcases where
          merchandise colors must be true, museum vitrines where artifact color accuracy is required for
          scholarship, and aquariums where fish and coral colors are the entire point of the viewing
          experience.
        </p>

        <h2 id="when-to-use">When Low Iron Glass Actually Matters (And When It Doesn't)</h2>

        <p>
          Low iron glass earns its premium in three situations. First, when thickness exceeds 10 mm because
          the green tint becomes clearly visible. Second, when the glass displays something behind it with
          color fidelity requirements (retail showcases, museum vitrines, aquariums, solar panels). Third,
          when the edge is exposed in a frameless detail (shower doors, glass balustrades, table tops).
          For thin exterior facade glass under 8 mm viewed from distance, standard clear is usually
          indistinguishable and 30 to 50 percent cheaper. The decision almost always comes down to
          thickness, visibility, and viewing distance, not aesthetic preference alone.
        </p>

        <WhenToUseDecisionMatrix />

        <h3 id="thickness-rule">The Thickness Threshold Rule (Over 10 mm Equals Mandatory)</h3>

        <p>
          If a single rule of thumb has to guide the specification, it is this: at 10 mm and above, low iron
          becomes the default choice unless there is a specific cost reason to accept the green tint. Below
          10 mm the visual difference is subtle in the body of the glass and only visible at exposed edges.
          Above 15 mm standard glass starts to look distinctly bottle green when viewed through, which
          almost no client wants to see on a finished project. The 10 mm threshold aligns with the
          thickness where most frameless shower doors, structural glass balustrades, and premium furniture
          glass live.
        </p>

        <h2 id="processing-options">Low Iron Glass Processing Options</h2>

        <p>
          Low iron is a float glass substrate, which means it can be processed through all the normal
          secondary operations: tempering, lamination, insulated unit assembly, and coating. The processing
          itself does not degrade the low iron optical property, so a low iron tempered laminated IGU
          retains the near colorless appearance of the raw substrate.
        </p>

        <ul>
          <li><strong>Low Iron Tempered Glass:</strong> Standard tempering furnace, same cycle as clear tempered. Common for frameless showers, glass doors, balustrades, structural facades, and table tops. Our Wuhan facility runs low iron substrate on the same tempering lines as standard glass with no extra tooling.</li>
          <li><strong>Low Iron Laminated Glass:</strong> PVB or SGP interlayer bonded between two low iron panes. Common for overhead glazing, structural glass floors, and museum vitrines. Specify interlayer type separately, low iron does not change interlayer behavior.</li>
          <li><strong>Low Iron Insulated Glass Units:</strong> Standard IGU assembly with low iron on one or both panes. Common for high end residential, retail storefronts, and daylight critical facades. If budget forces a compromise, use low iron on the outboard pane only for maximum visual impact.</li>
          <li><strong>Low Iron with Low-E or Ceramic Frit:</strong> Fully compatible with soft coat and hard coat Low-E, as well as ceramic frit printing. The low iron substrate preserves color fidelity of printed patterns and keeps Low-E coatings from amplifying green cast.</li>
        </ul>

        <h2 id="cost">The Cost Question: Is Low Iron Worth the Premium</h2>

        <p>
          Low iron glass typically carries a 30 to 100 percent price premium over standard float, with the
          gap widening at thinner sizes (small production runs) and narrowing at jumbo sizes (where
          capacity utilization helps). A typical 500 m2 facade project using 8 mm tempered low iron will
          see roughly 40 to 60 percent total cost uplift versus standard clear tempered. For a 50 m2
          frameless shower project in 10 mm tempered, the premium runs 35 to 50 percent but is almost
          always worth it because the glass is viewed at edge distance under 1 meter.
        </p>

        <CostPremiumCalculator />

        <h3 id="premium-range">Typical Premium Range (30 to 100 Percent Over Standard)</h3>

        <p>
          The premium is not a single number, it depends on batch size, thickness, and your supplier
          relationship. In China domestic trade, low iron float runs about 1.6 to 1.9 times the standard
          clear float price for the same thickness, before processing. Tempered multiplies that gap because
          low iron substrate is more expensive but processing cost is the same, so the per-m2 delta grows
          with each secondary operation. IGUs with low iron on both panes can see 60 to 80 percent total
          premium over standard clear IGUs because the substrate cost is doubled.
        </p>

        <h3 id="hidden-costs">Hidden Costs: Sourcing Lead Time, MOQ, Shipping</h3>

        <p>
          Beyond the sticker premium, low iron carries three hidden costs. First is lead time: most Chinese
          factories do not stock low iron float, so they order it from a specialist supplier (CSG, Xinyi,
          Taiwan Glass) when the inquiry lands. This adds 5 to 10 working days before processing can even
          begin. Second is MOQ: because batches are smaller, suppliers typically require 100 m2 minimum for
          stock thicknesses and 200 to 500 m2 for jumbo or non-standard thicknesses. Third is
          substitutability: if the shipment is delayed or damaged, replacement low iron substrate takes
          longer to source than standard float, so project schedule risk is higher.
        </p>

        <TechNote type="warning" title="Specification Trap">
          <p>
            A common cost error is specifying low iron for the entire project when it is only required in
            specific locations. Spec low iron where it matters (frameless details, display zones, thick
            glass above 10 mm) and standard clear elsewhere. The savings on the standard clear portion
            often exceeds the premium on the low iron portion by several multiples.
          </p>
        </TechNote>

        <LeadMagnetCTA
          variant="inline"
          articleSlug="low-iron-glass-complete-guide"
          title="Free Download: Global Glass Building Codes Comparison"
          description="Side by side reference for architectural glass regulations across US IBC, EU EN, China GB, and Australia AS, including where low iron glass is required by code versus specified by design."
        />

        <h2 id="standards">Global Standards and Spec Writing</h2>

        <p>
          Writing low iron glass into a BOQ or spec is less standardized than it should be. Different
          regions reference different standards, and there is no single international designation for
          "low iron" the way there is for tempered or laminated glass. The three main systems you will
          encounter in international projects:
        </p>

        <ul>
          <li><strong>ASTM C1036 (United States):</strong> The clear flat glass standard includes a classification system for iron content, but does not use the term "low iron" directly. Specify "ultra clear low iron, Fe2O3 under 0.01 percent" to be unambiguous.</li>
          <li><strong>EN 572 (European Union):</strong> The float glass standard also does not mandate a "low iron" designation. Spec writers use "extra clear glass to EN 572 with Fe2O3 content below 0.015 percent" or reference specific brand equivalents such as "Pilkington Optiwhite or approved equal."</li>
          <li><strong>GB 11614 (China):</strong> The Chinese ultra clear float glass standard explicitly defines ultra clear glass by iron content and visible light transmission. Reference "GB 11614 ultra clear float, VLT over 91 percent at 6 mm" for unambiguous Chinese sourcing.</li>
        </ul>

        <h2 id="sourcing">Sourcing Low Iron Glass from China</h2>

        <p>
          China produces the largest share of global low iron float glass capacity, with CSG, Xinyi, Taiwan
          Glass, and Kibing operating dedicated low iron float lines that supply both domestic processors
          and international substrate buyers. Over the 2020 to 2026 period, Chinese low iron capacity
          roughly tripled as architectural demand grew globally, which has brought substrate prices down
          and shortened lead times.
        </p>

        <p>
          Named international brands (Starphire from Vitro, Optiwhite from Pilkington, UltraClear from
          Guardian, Diamant from Saint-Gobain, Clearsight from AGC) still command a premium of 20 to 40
          percent over Chinese low iron substrate with comparable iron content and VLT. For projects where
          the architect has spec'd a brand name, your supplier should either source the named brand or
          submit a technical submittal showing equivalent iron content, VLT, and spectral data for a
          Chinese alternative. Many projects accept the technical equivalent once documentation is
          provided.
        </p>

        <p>
          Sincere Glass sources low iron float from major Chinese float lines and processes it through our
          own tempering, laminating, and IGU operations in Wuhan. Our jumbo capability (3.3 by 15 meter
          tempering furnace and 3.3 by 15 meter laminating autoclave) covers the oversize facade and
          structural glass projects where low iron is most frequently specified. For buyers who need brand
          certification, we can also source and process Pilkington Optiwhite or Vitro Starphire substrate
          with full documentation on request.
        </p>

        <FAQ items={faqItems} />

        <h2 id="buyer-faq" className="text-2xl font-semibold text-[#F2F0ED] mt-12 mb-6">
          Buyer FAQ: Sourcing from Sincere Glass
        </h2>
        <FAQ items={buyerFaqItems} title="" />

        <RelatedProductsCards
          slugs={['tempered-glass', 'laminated-glass', 'enameled-glass']}
          heading="Products available in low iron substrate"
        />

        <LeadMagnetCTA
          variant="footer"
          articleSlug="low-iron-glass-complete-guide"
        />
      </BlogArticleLayout>
    </>
  );
}
