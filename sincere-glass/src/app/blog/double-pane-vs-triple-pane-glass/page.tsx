import type { Metadata } from "next";
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from "@/components/blog/BlogArticleLayout";
import TLDRBox from "@/components/blog/TLDRBox";
import FAQ from "@/components/blog/blocks/FAQ";
import TechNote from "@/components/blog/blocks/TechNote";
import RelatedProductsCards from "@/components/blog/RelatedProductsCards";
import LeadMagnetCTA from "@/components/blog/LeadMagnetCTA";
import CostDisclaimer from "@/components/blog/CostDisclaimer";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";
import { blogArticles } from "@/lib/blog-registry";
import { makeAlternates } from "@/lib/i18n";
import PaneConfigurationComparator from "@/components/blog/article-27/PaneConfigurationComparator";
import TriplePaneROICalculator from "@/components/blog/article-27/TriplePaneROICalculator";
import ClimateZoneDecisionMatrix from "@/components/blog/article-27/ClimateZoneDecisionMatrix";

const SLUG = "double-pane-vs-triple-pane-glass";
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc: TOCItem[] = [
  { id: "verdict",      text: "The 30-second verdict",                 level: 2 },
  { id: "definitions",  text: "What 'double pane' and 'triple pane' really mean", level: 2 },
  { id: "thermal",      text: "The thermal performance gap",           level: 2 },
  { id: "cost",         text: "Cost reality: factory-gate and installed premium", level: 2 },
  { id: "worth-it",     text: "When triple pane is worth the premium", level: 2 },
  { id: "climate",      text: "Climate zone decision guide",            level: 2 },
  { id: "trade-offs",   text: "The 7 hidden trade-offs nobody lists",   level: 2 },
  { id: "frame",        text: "Weight, frames, and retrofit feasibility", level: 2 },
  { id: "noise-comfort",text: "Noise, condensation, and the comfort case", level: 2 },
  { id: "spec",         text: "How to specify triple pane in your PO",  level: 2 },
  { id: "faq",          text: "FAQ",                                     level: 2 },
];

const faqItems = [
  {
    q: "Is triple pane glass actually worth it?",
    a: "If heating degree days exceed 5,000 per year (IECC zone 5 and colder), yes - triple pane typically pays back in 10-15 years and permanently eliminates window-side condensation. In zones 3 and below, no - the premium is better spent on solar-control Low-E, shading, or better frames.",
  },
  {
    q: "How much more does triple pane cost than double pane?",
    a: "At the factory gate, a 4-12Ar-4-12Ar-4 double-Low-E triple IGU runs about 55-70% more per square meter than a 4-12Ar-4 single-Low-E double IGU of the same size. Installed premium is lower - roughly 35-50% - because frame and labor cost per window is only marginally higher.",
  },
  {
    q: "Does triple pane reduce noise better than double pane?",
    a: "Barely. Triple pane moves STC from about 32 to 35 - imperceptible to most ears. For noise, a laminated-glass IGU with dissimilar pane thicknesses and an acoustic PVB interlayer hits STC 38-42. Do not buy triple pane for noise.",
  },
  {
    q: "Can I retrofit triple pane into existing double pane frames?",
    a: "Rarely. Triple pane IGUs are typically 32-40mm thick vs 20-24mm for double. The sash and pocket depth must accommodate the extra thickness, and the heavier unit (about 50% more kg per square meter) often exceeds the hinge or operator load limit. Plan for new sashes or full window replacement.",
  },
  {
    q: "What is the U-factor of triple pane glass?",
    a: "Center-of-glass U is typically 0.7 to 1.0 W/m2K (0.12 to 0.18 BTU/h.ft2.F) for a 4-12Ar-4-12Ar-4 with two Low-E coatings. Whole-window U will be 0.1 to 0.3 higher depending on frame and edge seal. Krypton fill in narrower cavities can push U to 0.5-0.6.",
  },
  {
    q: "Should I use argon or krypton gas fill in triple pane?",
    a: "Argon by default - 90% argon fill is standard, cheap, and delivers most of the thermal benefit. Krypton is worth the premium only when the cavity width must shrink below 10mm (overall thickness constraints) - krypton is less sensitive to cavity width, argon needs 12-16mm to perform.",
  },
  {
    q: "Does triple pane reduce solar heat gain?",
    a: "Yes, modestly. Each extra lite and Low-E coating cuts SHGC by about 5-10%. Typical triple pane SHGC is 0.30-0.35 vs 0.35-0.40 for similar double pane. In cooling-dominated climates this helps - but a solar-control coating on double pane is more cost-effective.",
  },
  {
    q: "How long does a triple pane IGU last?",
    a: "Properly specified dual-seal triple pane IGU with warm-edge spacer should hit 25-30 years before seal failure. The same construction principles as double pane apply - PIB primary seal, silicone or polysulfide secondary, molecular sieve desiccant, and automated argon fill with QC gas sampling.",
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
            "Triple pane cuts center-of-glass U-factor roughly in half (1.6 to 0.8 W/m2K) vs a comparable double pane.",
            "Factory-gate premium is 55-70%; installed premium 35-50%. Payback 8-12 years in cold climates, 20+ years in warm ones.",
            "In IECC zones 5 and colder, triple pane is standard practice. In zones 3 and below it rarely pencils.",
            "Triple pane is the wrong solution for noise. Use laminated glass with dissimilar panes instead.",
            "Retrofit into existing double-pane sashes almost never works. Plan for new frames.",
          ]}
        />

        <section id="verdict">
          <h2>The 30-second verdict</h2>
          <p>
            <strong>If you are heating the building more than you are cooling it, triple pane pays off.</strong>{" "}
            Specifically: if your location sits in IECC climate zone 5 or colder (roughly 5,000+ heating degree days
            per year), the 55-70% factory-gate premium over double pane pays back in 10-15 years through reduced
            heating load, and permanently solves window-side condensation.
          </p>
          <p>
            <strong>If you are cooling more than heating, do not buy triple pane.</strong> Spend the same premium on
            a solar-control Low-E coating, external shading, and better frames - all three deliver more cooling
            performance per dollar than a third pane.
          </p>
          <p>
            This article walks through the actual numbers behind that verdict - thermal, cost, climate, and the
            trade-offs nobody writes in brochures.
          </p>
        </section>

        <section id="definitions">
          <h2>What &quot;double pane&quot; and &quot;triple pane&quot; really mean</h2>
          <p>
            A pane count alone tells you almost nothing. Two IGUs with the same pane count can differ by a factor of
            two on thermal performance depending on coating, gas fill, and spacer. Here is what is actually inside each:
          </p>
          <table>
            <thead>
              <tr>
                <th>Configuration</th>
                <th>Build-up</th>
                <th>U-factor (W/m2K)</th>
                <th>Weight (kg/m2)</th>
                <th>Thickness</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Standard double pane</td>
                <td>4 - 12 air - 4 (clear, no Low-E)</td>
                <td>2.7</td>
                <td>20</td>
                <td>20mm</td>
              </tr>
              <tr>
                <td>Premium double pane</td>
                <td>4 - 12 Ar - 4 (Low-E on surface 3)</td>
                <td>1.4 - 1.6</td>
                <td>20</td>
                <td>20mm</td>
              </tr>
              <tr>
                <td>Standard triple pane</td>
                <td>4 - 12 Ar - 4 - 12 Ar - 4 (2x Low-E)</td>
                <td>0.7 - 0.9</td>
                <td>30</td>
                <td>36mm</td>
              </tr>
              <tr>
                <td>Passive House triple</td>
                <td>4 - 16 Kr - 4 - 16 Kr - 4 (2x Low-E, warm-edge)</td>
                <td>0.5 - 0.6</td>
                <td>30</td>
                <td>44mm</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm italic text-slate-600">
            Values are center-of-glass under EN 673 boundary conditions. Whole-window U will be 0.1-0.3 higher
            depending on frame construction and edge seal.
          </p>
          <TechNote type="note" title="Key point">
            A premium double pane with Low-E and argon (U = 1.4) outperforms a cheap triple pane with air fill and
            no coating (U = 1.8). Pane count without the right coating and gas is marketing, not engineering.
          </TechNote>
        </section>

        <section id="thermal">
          <h2>The thermal performance gap</h2>
          <p>
            Put a pane in the middle of an IGU and you add a second insulating cavity. The second cavity delivers
            about the same thermal resistance as the first - roughly another R-2 - but it does so while the
            marginal cost of adding it is relatively high because you need a second coated lite and a second
            spacer assembly.
          </p>
          <p>
            The comparator below lets you cycle through the four metrics that actually matter when choosing between
            configurations. Pick a metric and the panel highlights which configuration wins.
          </p>

          <PaneConfigurationComparator />

          <p>
            Notice the thermal advantage is real and large - a 50% cut in center-of-glass U means about half the
            conductive heat loss through the glazed area. But the weight, thickness, and cost penalties are also
            real and need somewhere to go in your frame design and budget.
          </p>
        </section>

        <section id="cost">
          <h2>Cost reality: factory-gate and installed premium</h2>
          <p>
            Factory-gate premium for triple over double on a like-for-like basis (same panel size, same Low-E grade,
            same spacer) is typically 55-70%. The drivers:
          </p>
          <ul>
            <li>Third pane of glass - about +15% raw material</li>
            <li>Second Low-E coating - about +15% (sputter-coated Low-E glass is a priced input)</li>
            <li>Second spacer, desiccant, and seal set - about +10%</li>
            <li>Extra argon fill and QC time - about +5%</li>
            <li>Lower throughput on the IGU line (longer cycle time per unit) - about +10-15%</li>
          </ul>
          <p>
            Installed premium is lower because frame, labor, and shipping per window scale with window count, not
            IGU complexity. In residential retrofit pricing you typically see 35-50% premium per window for triple
            over double.
          </p>

          <table>
            <thead>
              <tr>
                <th>Project type</th>
                <th>Double pane (USD/m2 IGU)</th>
                <th>Triple pane (USD/m2 IGU)</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Volume residential (clear + Low-E)</td>
                <td>$85 - $110</td>
                <td>$145 - $185</td>
                <td>+65-70%</td>
              </tr>
              <tr>
                <td>Mid-rise commercial (laminated + Low-E)</td>
                <td>$140 - $180</td>
                <td>$230 - $290</td>
                <td>+60-65%</td>
              </tr>
              <tr>
                <td>Passive House (krypton, warm-edge)</td>
                <td>$160 - $220</td>
                <td>$320 - $420</td>
                <td>+90-100%</td>
              </tr>
            </tbody>
          </table>

          <CostDisclaimer variant="default" />
        </section>

        <section id="worth-it">
          <h2>When triple pane is worth the premium</h2>
          <p>
            The honest answer: it depends on your heating fuel cost, your climate, and your discount rate. The
            calculator below asks for those inputs and spits out payback. Try your zone with your actual utility rates.
          </p>

          <TriplePaneROICalculator />

          <p>
            <strong>Rules of thumb emerging from a few hundred of these calculations:</strong>
          </p>
          <ul>
            <li>Zone 6 or colder, gas heat at USD 1.50/therm or higher: payback under 10 years. Specify triple.</li>
            <li>Zone 5, electric resistance heat: payback 8-12 years. Specify triple.</li>
            <li>Zone 4, mixed fuel: payback 15-22 years. Consider for comfort or condensation reasons; not for pure ROI.</li>
            <li>Zone 3 or warmer: payback usually exceeds window lifetime. Stick with premium double pane.</li>
          </ul>
        </section>

        <section id="climate">
          <h2>Climate zone decision guide</h2>
          <p>
            ROI is only one reason to spec triple pane. For some projects, the deciding factor is condensation (northern
            European humid-cold winters), comfort (large glass areas occupied in winter), or a code target like Passive
            House that mandates U below 0.8. Pick your zone and priority:
          </p>

          <ClimateZoneDecisionMatrix />

          <p>
            In practice, Passive House and net-zero energy targets push triple pane into zones where ROI alone would
            not justify it - because the whole-building energy budget leaves no room for a window with U above 0.8.
          </p>
        </section>

        <LeadMagnetCTA
          variant="inline"
          articleSlug={SLUG}
          title="Spec sheet template: triple pane IGU for international projects"
          description="A fillable PO spec sheet covering build-up, coatings, gas fill, spacer, seal system, QC, and shipping. Download free."
        />

        <section id="trade-offs">
          <h2>The 7 hidden trade-offs nobody lists</h2>
          <p>
            Beyond the obvious cost and weight, triple pane brings a set of second-order consequences that often get
            discovered during installation or the first winter. In order of how often they bite:
          </p>
          <ol>
            <li>
              <strong>Reduced visible light transmittance.</strong> Each extra lite + Low-E coating cuts VT by 8-10%.
              A premium double pane at VT 0.78 becomes a triple pane at VT 0.65-0.70. In north-facing rooms this is
              noticeable; occupants may reach for lights earlier in the day.
            </li>
            <li>
              <strong>Lower SHGC in cooling-dominated hours.</strong> Great in winter heating. In shoulder seasons
              it means you also lose the free solar heat you would have gotten.
            </li>
            <li>
              <strong>Frame U often becomes the weak link.</strong> Once center-of-glass U drops below 1.0, the whole-window
              U is dominated by frame conduction and edge effects. A mediocre aluminum frame with triple pane can
              perform worse than a thermally-broken frame with premium double pane.
            </li>
            <li>
              <strong>Weight loads the hardware.</strong> 50% more mass per square meter can exceed hinge, pivot, or
              operator load limits. Casement windows with large sashes are especially affected.
            </li>
            <li>
              <strong>Edge deflection and bowing.</strong> Triple pane IGUs have two sealed cavities. Altitude change,
              temperature swing, or barometric pressure change can deflect the panes inward or outward, raising
              edge-seal stress and in extreme cases causing contact between the middle lite and outer lites.
              Capillary tubes solve this for shipping; capillary-free IGUs must stay within tight altitude bands.
            </li>
            <li>
              <strong>Field-replaceable glass goes away.</strong> A broken triple pane IGU is a factory order, not
              a stock item. Lead time for replacement is 4-8 weeks vs 2-3 weeks for standard double pane.
            </li>
            <li>
              <strong>Harder to recycle.</strong> Two cavities, two seals, two desiccant beds. End-of-life material
              recovery is lower per square meter.
            </li>
          </ol>
        </section>

        <section id="frame">
          <h2>Weight, frames, and retrofit feasibility</h2>
          <p>
            The thickness jump from 20mm (standard double) to 36mm (standard triple) is the single biggest
            constraint on whether you can retrofit triple into an existing building. Common frame pockets handle
            24-28mm max - fine for premium double pane with slightly wider spacers, nowhere near enough for triple.
          </p>
          <p>
            Weight matters more than most specs admit. A typical casement window sash at 0.8 x 1.5 m (1.2 m2) carries:
          </p>
          <ul>
            <li>Double pane IGU: about 24 kg of glass</li>
            <li>Triple pane IGU: about 36 kg of glass</li>
          </ul>
          <p>
            Multiply by a 3-meter commercial casement and you are looking at 90+ kg of glass per sash. Standard
            cam-action handles and friction stays are rated for 25-35 kg. You need heavy-duty hardware or operable
            geometry changes.
          </p>
          <TechNote type="warning" title="Retrofit reality check">
            In our order book, roughly 3 out of 4 double-to-triple retrofit inquiries get re-scoped to full window
            replacement once the frame assessment is complete. The savings on triple pane IGU over double pane is
            dwarfed by the cost of sashes that cannot handle the weight or thickness.
          </TechNote>

          <InlineQuoteCTA variant="default" />
        </section>

        <section id="noise-comfort">
          <h2>Noise, condensation, and the comfort case</h2>
          <h3>Noise</h3>
          <p>
            Adding a third pane of the same thickness does very little for sound transmission. The acoustic weakness
            is the coincidence frequency where panes of identical mass resonate together. A typical triple pane with
            three 4mm lites moves STC from about 32 to 35 - a difference most people cannot hear.
          </p>
          <p>
            If noise reduction is a real goal, the right approach is <strong>asymmetric laminated glass</strong>:
          </p>
          <ul>
            <li>6mm laminated (two 3mm panes + 0.76mm acoustic PVB) + 12mm air + 4mm: STC 38-40</li>
            <li>8.76mm laminated + 16mm air + 6mm: STC 40-42</li>
            <li>For city-center residential facing highways, this is the right spec - not triple pane.</li>
          </ul>
          <h3>Condensation</h3>
          <p>
            This is where triple pane shines in cold climates. On the coldest winter nights, the interior pane of a
            double-pane IGU can drop to 3-5 C - below the dew point for a humid interior. The result is water
            running down windows, mold around the frame, and a conversation with the architect.
          </p>
          <p>
            Triple pane keeps the interior pane 3-5 C warmer. In practice this moves the dew-point crossover from
            common (double pane in a humid winter residence) to very rare (triple pane in the same conditions).
          </p>
          <h3>Comfort</h3>
          <p>
            A warm interior pane surface has a second effect that does not show in U-factor numbers: it stops the
            cold-wall radiant discomfort you feel when sitting near a large window in winter. Occupants can place
            seating and desks at the glass line. In open-plan offices with floor-to-ceiling glazing in cold climates,
            this is often the deciding factor.
          </p>
        </section>

        <section id="spec">
          <h2>How to specify triple pane in your PO</h2>
          <p>
            A spec sheet that just says &quot;triple pane IGU&quot; gets you a wide range of quality. Here is what the
            PO should actually call out:
          </p>
          <ol>
            <li>
              <strong>Build-up:</strong> e.g. &quot;4mm clear + 12mm Ar + 4mm Low-E + 12mm Ar + 4mm clear; Low-E on
              surfaces 2 and 5; overall thickness 36mm nominal.&quot;
            </li>
            <li>
              <strong>Low-E coating spec:</strong> softcoat (sputtered), emissivity below 0.04, specify the target
              U-factor and SHGC range. Name the coating if you have a preference (Guardian ClimaGuard, Saint-Gobain
              Planitherm, or equivalent).
            </li>
            <li>
              <strong>Gas fill:</strong> argon 90% minimum fill at time of production, verified by sampling.
              Krypton only if explicitly needed for a thin-cavity Passive House build.
            </li>
            <li>
              <strong>Spacer system:</strong> warm-edge (stainless steel or thermoplastic) for Passive House / cold
              climates. Standard aluminum acceptable in Zone 4-5 if cost is the constraint.
            </li>
            <li>
              <strong>Seal system:</strong> dual seal - PIB primary, silicone or polysulfide secondary. Reject any
              single-seal offer for triple pane.
            </li>
            <li>
              <strong>Edge seal depth:</strong> 10-12mm minimum.
            </li>
            <li>
              <strong>QC:</strong> gas-fill sampling per lot, dew point test for desiccant performance, EN 1279 or
              ASTM E2190 durability class.
            </li>
            <li>
              <strong>Capillary tubes:</strong> required for air freight or shipment across significant altitude
              differences. Sealed off before glazing on arrival.
            </li>
            <li>
              <strong>Shipping:</strong> A-frame crates, edge-protected, arrows for lite orientation. Specify
              handling stress limits.
            </li>
          </ol>

          <p>
            For a project-specific spec sheet with your climate zone and performance targets filled in, request a
            quote - we will build the full data sheet including whole-window U and SHGC for your frame system.
          </p>

          <RelatedProductsCards slugs={["insulated-glass", "low-e-glass", "laminated-glass"]} />
        </section>
        {/* GROK-INSERT-V1:a28-gas-link */}
        <aside className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-amber-800">Related deep-dive</div>
          <p className="mt-2 text-sm text-slate-700">
            Choosing between argon and krypton for your IGU fill? Our full breakdown covers
            thermal conductivity, cavity width physics, EN 1279-3 leak rates, and when the
            krypton premium actually pays back.
          </p>
          <a href="/blog/argon-vs-krypton-gas-fill-igu" className="mt-3 inline-block text-sm font-semibold text-amber-900 underline">
            Read: Argon vs Krypton Gas Fill for IGU &rarr;
          </a>
        </aside>

        <section id="faq">
          <h2>FAQ</h2>
          <FAQ items={faqItems} />
        </section>
      </BlogArticleLayout>
    </>
  );
}
