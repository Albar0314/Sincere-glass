import type { Metadata } from 'next';
import Script from 'next/script';
import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
} from '@/components/blog/BlogArticleLayout';
import TLDRBox from '@/components/blog/TLDRBox';
import FAQ from '@/components/blog/blocks/FAQ';
import LeadMagnetCTA from '@/components/blog/LeadMagnetCTA';
import RelatedProductsCards from '@/components/blog/RelatedProductsCards';
import CostDisclaimer from '@/components/blog/CostDisclaimer';
import { makeAlternates } from '@/lib/i18n';

import ThicknessPerformanceComparator from '@/components/blog/article-16/ThicknessPerformanceComparator';
import MaxPanelSizeCalculator from '@/components/blog/article-16/MaxPanelSizeCalculator';
import CostFactorBreakdown from '@/components/blog/article-16/CostFactorBreakdown';

const SLUG = '12mm-tempered-glass-specifications';
const article = blogArticles.find((a) => a.slug === SLUG) as BlogArticle;

const toc = [
  { id: 'why-12mm',            text: 'Why 12mm is the specification sweet spot', level: 2 },
  { id: 'performance-envelope',text: 'The 12mm performance envelope',            level: 2 },
  { id: 'max-panel-size',      text: 'Maximum panel size at 12mm',               level: 2 },
  { id: 'tolerance-quality',   text: 'Thickness tolerance and surface quality',  level: 2 },
  { id: 'thermal-acoustic',    text: 'Thermal and acoustic performance',         level: 2 },
  { id: 'applications',        text: 'Where 12mm is specified',                  level: 2 },
  { id: 'processing',          text: 'Edges, holes, and cutouts',                level: 2 },
  { id: 'certifications',      text: 'Certifications for 12mm tempered',         level: 2 },
  { id: 'cost-drivers',        text: 'Cost drivers for 12mm orders',             level: 2 },
  { id: 'thinner-or-thicker',  text: 'When to go thinner or thicker',            level: 2 },
  { id: 'faq',                 text: 'Buyer FAQ',                                level: 2 },
];

const faqItems = [
  {
    q: "What is the MOQ for 12mm tempered glass export orders from Sincere Glass?",
    a: "Our standard MOQ for export is one 20-foot container, which fits approximately 18 to 22 tonnes of 12mm tempered depending on panel sizes and crating. Mixed-thickness orders are accepted. For projects under one container, we can quote LCL (less-than-container) consolidation to common ocean hubs.",
  },
  {
    q: "What is the lead time for a 12mm tempered order from your Wuhan factory?",
    a: "Standard production cycle for 12mm tempered is 10 to 15 working days from order confirmation and deposit, assuming raw float is in stock (which it typically is for 12mm clear). Add 3 to 5 days for polished edges, 2 to 4 days for holes or cutouts, and 7 to 10 days for inland transport and port handling before loading. A single-container order to Shanghai or Ningbo port is usually ready to sail within 25 to 30 days of PO.",
  },
  {
    q: "Can you temper 12mm with custom shapes or holes?",
    a: "Yes, within tempering constraints. CNC-cut shapes, countersunk holes, notches, and cutouts are all processed before the tempering cycle. Tempered glass cannot be modified after the quench. Per GB 15763.2 §5.5, edge-to-hole distance must be at least 2x the glass thickness (24 mm minimum for 12mm), and hole-to-hole spacing must also be at least 2x thickness. We confirm feasibility against shop drawings before cutting.",
  },
  {
    q: "What certifications come with a 12mm tempered export shipment?",
    a: "Every shipment is accompanied by a certificate of conformity to GB 15763.2-2005 (Chinese safety glazing standard) and a copy of our China 3C (CCC) certificate. On request, we provide fragment-count test photos per sampled lot, surface compressive stress readings, SGS or BV third-party inspection reports (buyer-paid), and CE marking documentation to EN 12150-2 when the destination requires it. ANSI Z97.1 and CPSC 16 CFR 1201 certification can be arranged with additional lead time.",
  },
  {
    q: "How does Sincere Glass price 12mm tempered: per square meter or per piece?",
    a: "We quote per square meter for the glass itself, with surcharges itemized by edge treatment, holes, CNC shapes, and packaging class. Every quotation includes an itemized breakdown so you can see what each option adds. Volume breaks apply at full-container, two-container, and project-scale orders. Request a quotation through our contact form and we return it within one working day.",
  },
];

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates('/blog/' + SLUG),
};

export default function Page() {
  const schemas = articleJsonLd(article, faqItems);

  return (
    <>
      {schemas.map((s, i) => (
        <Script
          key={i}
          id={`article-jsonld-${i}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox
          takeaways={[
            "12mm is the specification sweet spot where strength, deflection control, and jumbo panel capability intersect: the default choice for 1.1 m balustrades, long-span canopies, and large-area storefronts.",
            "At our Wuhan facility we temper 12mm up to 3,000 x 15,000 mm, among the largest single-pane envelopes in Hubei province.",
            "GB 15763.2-2005 requires a minimum surface compressive stress of 90 MPa. A compliant 12mm tempered panel fragments into roughly 60 to 100 pieces in a 50 x 50 mm square.",
            "Cost factors beyond the glass itself: edge polishing adds roughly 18%, 5+ holes add 15%, CNC shapes add 12%, and plain rectangles with ground edges are the baseline.",
            "Common buyer mistake: specifying 12mm by habit when 10mm tempered-laminated (10.76 or 11.52 mm overall) would be safer and lighter for overhead and balustrade applications.",
          ]}
        />

        <p>
          Twelve-millimeter tempered is the default on more balustrade,
          storefront, and canopy drawings than any other single thickness. Not
          because it is the strongest glass we make, but because it sits at a
          specific intersection of structural capability, panel-size envelope,
          and cost that is hard to beat for mid-weight architectural work. This
          guide pulls together, from our Wuhan production line, what buyers
          need to decide and specify when they land on 12mm: the panel-size
          limits that depend on how the glass is supported, the tolerance and
          quality markers that separate a code-compliant 12mm from a borderline
          one, and the cost factors that move a quotation by 30 to 50% before
          the raw-glass price has changed.
        </p>

        <h2 id="why-12mm">Why 12mm is the specification sweet spot</h2>
        <p>
          Thickness in architectural glass is not a smooth dial. It is a step
          function governed by standard float production (3, 4, 5, 6, 8, 10,
          12, 15, 19 mm) and by the span limits each thickness clears. In our
          20,000 m^2 Wuhan facility, 12mm is where three thresholds converge
          at once: it clears the <a href="https://www.glass.org/" target="_blank" rel="nofollow noopener" className="text-[#DAA745] hover:underline">National Glass Association (NGA)</a> and GB
          15763.2 structural minimums for 1,100 mm free-standing balustrades
          under typical infill-load conditions, it stays within comfortable
          deflection for storefront spans up to about 3 m without laminating,
          and it keeps panel weight at 30 kg/m^2 - heavy but still within reach
          of a two-person installation crew without lifting equipment.
        </p>
        <p>
          Below 12mm the structural envelope narrows quickly. 10mm{' '}
          <a href="/products/tempered-glass" className="text-[#DAA745] hover:underline">tempered glass</a> handles smaller balustrades
          and standard storefronts but needs assistance (laminating,
          interlayers, or additional support) once panels exceed roughly 2.4 m
          in free span. Above 12mm the glass handles more load but doubles
          handling cost, requires roughly 25% more energy per tempering cycle,
          and ships in fewer panels per container. 12mm earns its
          default-choice status by covering the widest range of common
          architectural specifications before any of these cost or logistics
          penalties kick in.
        </p>

        <h2 id="performance-envelope">The 12mm performance envelope</h2>
        <p>
          Tempered glass is specified by the surface compressive stress locked
          in during the quench, a measure of how much energy is stored in the
          surface layer that resists tension. GB 15763.2-2005 §5.2.1 requires
          a minimum of 90 MPa for architectural tempered. Our standard 12mm
          cycle delivers 95 to 110 MPa, verified with a differential surface
          refractometer on sampled panels. That stress level is what gives
          12mm tempered a break load of roughly 36 kN/m^2 (about 4 to 5x
          annealed glass of the same thickness) and what produces the
          characteristic small-cuboid fragmentation pattern when the panel
          does break.
        </p>
        <p>
          Weight at 12mm is 30 kg/m^2 (float glass density is 2,500 kg/m^3).
          This matters more than most spec sheets suggest: a 2 x 3 m 12mm
          panel weighs 180 kg, which is the practical ceiling for two-person
          installation without a vacuum lifter. Larger-area 12mm projects
          should budget suction-cup lift equipment on site, which affects the
          installer quote as much as the glass itself.
        </p>

        <p>
          <strong>How the comparator works:</strong> the component below lets
          you cycle through five metrics - break load, maximum panel area,
          weight per square meter, relative cost index, and acoustic STC -
          across six standard tempered thicknesses (6, 8, 10, 12, 15, and 19
          mm). Each bar scales to the maximum value in the current metric.
          Clicking a thickness pins its row, with the detail card showing the
          exact figure and the typical architectural use at that thickness.
          Values are indicative based on GB 15763.2 physics (density 2,500
          kg/m^3, 90 MPa minimum surface stress) and horizontal 4-edge
          support with no wind load for max-area. Real project limits are
          driven by the specific support condition and load case.
        </p>

        <ThicknessPerformanceComparator />

        <h2 id="max-panel-size">Maximum panel size at 12mm</h2>
        <p>
          Our tempering furnace envelope is 3,000 x 15,000 mm, among the
          largest in Hubei province and matched on the laminating side by a
          3 x 15 m autoclave for projects that combine jumbo tempering with
          safety lamination. What the physical envelope allows and what a
          specific project should actually specify are different numbers,
          though. Panel-size limits for 12mm tempered depend on three things:
          how the glass is supported at the edges, the wind-load class of the
          installation, and the acceptable deflection limit (typically
          span/60 for infill, span/175 for edge-supported curtain-wall glass
          per GB 50113 and EN 13830).
        </p>

        <p>
          <strong>How the calculator works:</strong> the component below holds
          thickness at 12mm and takes two inputs: the support condition
          (4-edge framed, 2-edge clamped, or point-fixed via spider
          fittings) and the wind-load class (low below 1.0 kPa, medium 1.0 to
          2.5 kPa, high above 2.5 kPa typical of coastal and high-rise
          installations). It returns the indicative maximum width, height,
          and panel area for that combination, flags whether the result stays
          within our 3,000 x 15,000 mm production envelope, and surfaces a
          short note on the governing failure mode (deflection, edge-to-hole
          spacing, or rotation at fixings). Values follow GB 15763.2-2005 §5
          and{' '}
          <a href="https://www.astm.org/e1300-16.html" target="_blank" rel="nofollow noopener" className="text-[#DAA745] hover:underline">
            ASTM E1300
          </a>{' '}
          principles. A structural engineer should still verify the specific
          wind, support, and deflection limits of your project.
        </p>

        <MaxPanelSizeCalculator />

        <h2 id="tolerance-quality">Thickness tolerance and surface quality</h2>
        <p>
          "12mm" from a reputable factory is not exactly 12 mm. It is 12 mm
          within a defined tolerance band. GB 15763.2 inherits the thickness
          tolerance from GB 11614 (float glass), which allows plus/minus 0.3
          mm for 10 to 12 mm nominal thickness and plus/minus 0.5 mm for 15
          to 19 mm. EN 572-2 is tighter at plus/minus 0.2 mm for 12 mm float.
          If you are specifying for a tight glazing pocket, confirm which
          standard the quotation references. Our export shipments default to
          EN tolerance for European and Middle-Eastern destinations, GB
          tolerance for projects where domestic Chinese code applies.
        </p>

        <div className="overflow-x-auto my-6">
          <table
            aria-label="Thickness tolerance for 12mm nominal tempered glass per three major standards"
            className="w-full text-sm"
          >
            <caption className="text-xs text-[#8B95A5] mb-2 text-left caption-top">
              Thickness tolerance comparison for 12 mm nominal tempered glass across GB, EN, and ASTM standards &mdash; Data verified: 2026-10-20
            </caption>
            <thead>
              <tr className="border-b border-[#3A4250]/40">
                <th scope="col" className="text-left text-[#DAA745] text-xs uppercase tracking-wider py-2 pr-4">Standard</th>
                <th scope="col" className="text-left text-[#DAA745] text-xs uppercase tracking-wider py-2 pr-4">Tolerance</th>
                <th scope="col" className="text-left text-[#DAA745] text-xs uppercase tracking-wider py-2">Clause reference</th>
              </tr>
            </thead>
            <tbody className="text-[#8B95A5]">
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]">
                  GB 11614-2009 (China float, inherited by GB 15763.2)
                </th>
                <td className="py-2 pr-4">plus/minus 0.3 mm</td>
                <td className="py-2">GB 11614 §4.2 Table 2</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]">
                  EN 572-2:2012 (European float)
                </th>
                <td className="py-2 pr-4">plus/minus 0.2 mm</td>
                <td className="py-2">EN 572-2 §5.2 Table 2</td>
              </tr>
              <tr>
                <th scope="row" className="text-left font-normal py-2 pr-4 text-[#F2F0ED]">
                  ASTM C1036-21 (US flat glass)
                </th>
                <td className="py-2 pr-4">plus/minus 0.4 mm (Class 1)</td>
                <td className="py-2">ASTM C1036 §4.2 Table 4</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Surface quality on tempered glass is governed by the same
          visual-inspection standards as float: GB 11614 §5 for China, EN
          572-8 for Europe. The two defects we see most often on 12mm
          shipments inspected before loading are roller-wave distortion (an
          optical ripple from the tempering furnace rollers, worse at thicker
          gauges) and edge nickel-sulfide inclusions. In our 20,000 m^2 Wuhan
          plant we accept roller-wave peak-to-valley within 0.1 mm per EN
          12150-2 §5.2, and we heat-soak 12mm destined for frameless
          structural installations (overhead canopies, balustrades,
          point-fixed) to pre-fail panels carrying NiS inclusions on the
          ground rather than in the field.
        </p>

        <h2 id="thermal-acoustic">Thermal and acoustic performance</h2>
        <p>
          Monolithic 12mm tempered has essentially the same thermal and
          acoustic performance as 12mm annealed. Tempering changes the glass's
          structural behavior, not its heat-transfer or sound-transmission
          properties. U-value for monolithic 12mm is approximately 5.6 W/m^2.K
          (per EN 673), and single-pane STC is around 34 (per ASTM E90 lab
          testing). These numbers only improve substantially when 12mm is
          used as a component in an{' '}
          <a href="/products/insulated-glass" className="text-[#DAA745] hover:underline">
            insulated glass unit (IGU)
          </a>{' '}
          with a Low-E coating and argon fill, or when it is laminated with a
          PVB or acoustic PVB interlayer in a{' '}
          <a href="/products/laminated-glass" className="text-[#DAA745] hover:underline">
            laminated glass
          </a>{' '}
          assembly.
        </p>
        <p>
          For projects where thermal insulation matters, 12mm tempered is
          typically specified as the outer or inner lite of an IGU rather than
          monolithic. A 12 + 12A + 6 IGU with Low-E on surface 2 can push
          U-value below 1.6 W/m^2.K. For acoustic-critical applications, 10mm
          tempered laminated with 1.52 mm acoustic PVB on top of 12mm tempered
          reaches STC 42 to 45, which is the practical ceiling without going
          to triple glazing.
        </p>

        <h2 id="applications">Where 12mm is specified</h2>
        <p>The applications we see 12mm tempered specified for most often in our export order book:</p>
        <ul>
          <li>
            <strong>Frameless balustrades up to 1,100 mm high</strong> &mdash;
            code-compliant to GB 50352 and most IBC jurisdictions for infill
            load. See our{' '}
            <a href="/blog/balustrade-glass-specification" className="text-[#DAA745] hover:underline">
              balustrade glass specification guide
            </a>{' '}
            for load cases and tier selection.
          </li>
          <li><strong>Long-span canopies and awnings</strong> &mdash; single-pane 12mm up to 2.5 x 4 m with proper point-fixing hardware.</li>
          <li><strong>Large-area storefronts and display windows</strong> &mdash; single-pane up to about 2.4 x 3 m without laminating.</li>
          <li><strong>Shower doors and bath partitions over 2 m tall</strong> &mdash; stepping up from the typical 10mm shower spec when height or width demands more stiffness.</li>
          <li><strong>Glass fins and structural glazing</strong> &mdash; as a component in laminated fin build-ups, where 12 + 12 or 12 + 15 laminates handle wind loads on curtain-wall fins.</li>
          <li><strong>Jumbo single-pane display walls</strong> &mdash; our 3 x 15 m envelope at 12mm covers luxury retail flagships, auto showrooms, and museum vitrines in a single pane.</li>
          <li><strong>IGU outer or inner lite</strong> &mdash; for projects where the outer glass carries wind load and the inner lite is thinner or laminated.</li>
        </ul>

        <h2 id="processing">Edges, holes, and cutouts</h2>
        <p>
          Everything that modifies the glass must happen before tempering.
          The surface compressive stress locked in by the quench cannot be
          re-shaped. For 12mm, three processing categories drive both cost
          and lead time.
        </p>
        <p>
          <strong>Edges.</strong> As-cut edges are not acceptable for
          architectural tempered. The micro-cracks from scoring become stress
          concentrators in the quench and raise in-furnace breakage risk.
          Standard edge treatment is ground (seamed and chamfered, typical for
          framed glass), with polished edges (flat-polished, pencil-polished,
          or beveled) for exposed-edge applications like frameless balustrades
          and shower doors. Ground edges add roughly 8% to the base cost,
          polished add roughly 18%.
        </p>
        <p>
          <strong>Holes and cutouts.</strong> Point-fixing holes, hinge
          cutouts, and lock holes are drilled before tempering. GB 15763.2
          §5.5 and{' '}
          <a href="https://www.fgiaonline.org/" target="_blank" rel="nofollow noopener" className="text-[#DAA745] hover:underline">
            FGIA
          </a>{' '}
          industry guidance require edge-to-hole distance greater than or
          equal to 2x glass thickness (minimum 24 mm for 12mm) and
          hole-to-hole spacing greater than or equal to 2x thickness. Hole
          diameter should not exceed one-third of panel width. Each additional
          hole adds machining time and raises the risk of in-furnace
          breakage, so holes directly affect both the per-panel price and the
          yield assumption we build into project pricing.
        </p>
        <p>
          <strong>CNC shapes.</strong> Curved cuts, notches, and non-rectangular
          shapes require CNC water-jet or diamond-wheel profiling before
          tempering. Shape complexity does not scale linearly. A simple arc
          adds about 12% to the baseline, while complex radii and interior
          cutouts can double the processing time per panel. We quote these
          from your DWG shop drawings, not from written descriptions.
        </p>

        <LeadMagnetCTA
          variant="inline"
          articleSlug={SLUG}
          title="Free: 12mm tempered edge and hole detail reference"
          description="A printable DWG-compatible reference showing GB, EN, and ASTM edge-to-hole clearances, hinge-cutout templates, and standard point-fixing dimensions for 12mm tempered glass projects."
        />

        <h2 id="certifications">Certifications for 12mm tempered</h2>
        <p>
          Every 12mm tempered panel we ship carries a certificate of
          conformity to GB 15763.2-2005, the Chinese national standard for
          architectural safety glass, backed by our factory's China 3C (CCC)
          certification. For export destinations we can arrange additional
          conformity marking at the time of order:
        </p>
        <ul>
          <li>
            <strong>CE marking to EN 12150-2:2019</strong> &mdash; required for
            construction products placed on the EU market under{' '}
            <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32011R0305" target="_blank" rel="nofollow noopener" className="text-[#DAA745] hover:underline">
              Regulation (EU) No 305/2011 (CPR)
            </a>
            . Includes AVCP System 3 documentation (manufacturer DoP plus
            notified-body initial type testing).
          </li>
          <li><strong>ANSI Z97.1-2015 Class A</strong> &mdash; US safety glazing voluntary standard for architectural tempered. Required by reference in IBC 2021 §2406.1 for hazardous locations.</li>
          <li><strong>CPSC 16 CFR 1201 Category II</strong> &mdash; mandatory US federal safety glazing standard for shower doors, railings, and glass in the slide path of doors.</li>
          <li><strong>AS/NZS 2208:1996</strong> &mdash; Australian/New Zealand safety glazing standard, verified by SAI Global certification.</li>
          <li><strong>SGS or BV third-party inspection reports</strong> &mdash; pre-shipment verification of fragment count, surface stress, and dimensional compliance (buyer-paid service).</li>
        </ul>

        <h2 id="cost-drivers">Cost drivers for 12mm orders</h2>
        <p>
          The quoted price per square meter for 12mm tempered is roughly 2x
          that of 6mm tempered, but the raw-glass cost explains less than
          half of the gap. The rest sits in the processing and handling line
          items that buyers often skim past on quotations. Three categories
          drive 90% of the variance between a cheap 12mm quote and an
          expensive one: edge treatment (as-cut vs ground vs polished), hole
          and cutout count, and shape complexity.
        </p>

        <p>
          <strong>How the breakdown works:</strong> the component below shows
          the cost structure of a standard 12mm tempered panel as a stacked
          bar - raw 12mm float at 42% of baseline, tempering cycle at 28%, QC
          and packaging at 16%, and factory handling and overhead at 14%.
          Three toggles let you add typical processing surcharges: edge
          treatment (as-cut 0%, ground +8%, polished +18%), hole or cutout
          count (none 0%, 1 to 4 holes +6%, 5+ or cutouts +15%), and shape
          (rectangle 0%, CNC or curved +12%). The output is a relative
          multiplier against a plain-rectangle baseline, not a currency
          figure. Real pricing moves with panel size, order volume, and the
          current float-glass market.
        </p>

        <CostFactorBreakdown />

        <CostDisclaimer />

        <h2 id="thinner-or-thicker">When to go thinner or thicker</h2>
        <p>
          12mm tempered is a strong default, not an only answer. Four
          scenarios where we routinely recommend buyers specify something
          other than monolithic 12mm:
        </p>
        <ul>
          <li>
            <strong>Downsize to 10mm tempered-laminated (10.76 or 11.52 mm overall)</strong> for
            overhead glazing, balustrades, and shower doors. The lamination
            adds fragment retention that monolithic 12mm does not have. In
            many jurisdictions this is required by code for overhead use, not
            optional. See our{' '}
            <a href="/blog/tempered-glass-vs-laminated-glass" className="text-[#DAA745] hover:underline">
              tempered vs laminated comparison
            </a>{' '}
            for the full decision matrix.
          </li>
          <li><strong>Downsize to 10mm tempered</strong> for storefronts under 2.2 m free span and balustrades at 900 mm or lower. Lighter, cheaper, and structurally sufficient.</li>
          <li><strong>Upsize to 15mm tempered</strong> for structural glass fins, pool fencing over 1.2 m, and point-fixed canopies with wind load above 2.5 kPa. The step in bending stiffness is non-linear and worth the cost at these spans.</li>
          <li>
            <strong>Upsize to 19mm tempered</strong> for walk-on floor glass,
            long-span structural fins, and heavy balustrades at exposed-edge
            heights. 19mm is the standard for structural glass flooring,
            usually laminated for fragment retention.
          </li>
        </ul>
        <p>
          The{' '}
          <a href="/blog/tempered-glass-vs-annealed-glass" className="text-[#DAA745] hover:underline">
            tempered vs annealed comparison
          </a>{' '}
          covers when any tempered thickness is overkill (small decorative
          applications, interior partitions below code hazard-location
          thresholds) and when a thinner heat-strengthened or annealed panel
          is actually the correct choice.
        </p>

        <p className="text-sm text-[#8B95A5] mt-6">
          For the pillar view of how this product-level decision fits into a complete architectural glass specification, see our <a href="/blog/architectural-glass-specification-guide" className="text-[#DAA745] hover:underline">architectural glass specification guide</a>.
        </p>

        <FAQ items={faqItems} />

        <LeadMagnetCTA
          variant="footer"
          articleSlug={SLUG}
          title="Free: Global Architectural Glass Building Codes Comparison"
          description="A side-by-side 11-page PDF comparing US IBC, EU EN, China GB, and Australia AS requirements for tempered glass across all common applications. Free for architects, specifiers, and procurement teams."
        />

        <RelatedProductsCards
          slugs={article.relatedProductSlugs || ['tempered-glass', 'laminated-glass', 'low-e-glass']}
        />
      </BlogArticleLayout>
    </>
  );
}
