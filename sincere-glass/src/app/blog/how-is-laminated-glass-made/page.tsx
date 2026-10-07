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
import PVBvsSGPComparison from '@/components/blog/article-5/PVBvsSGPComparison';
import AutoclaveCurveChart from '@/components/blog/article-5/AutoclaveCurveChart';
import DelaminationFailureViewer from '@/components/blog/article-5/DelaminationFailureViewer';

const SLUG = 'how-is-laminated-glass-made';
const article: BlogArticle = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata = generateArticleMetadata(article);

const toc: TOCItem[] = [
  { id: 'not-just-glue', text: 'Lamination Is Not Just "Gluing Two Panes"', level: 2 },
  { id: 'interlayers', text: 'The Four Interlayer Technologies', level: 2 },
  { id: 'production-line', text: 'The Full Production Line', level: 2 },
  { id: 'autoclave', text: 'The Autoclave: Where Lamination Actually Happens', level: 2 },
  { id: 'can-be-cut', text: "Why Laminated Glass CAN Be Cut (Unlike Tempered)", level: 2 },
  { id: 'defects', text: 'Common Failures: Bubbles, Delamination, Haze', level: 2 },
  { id: 'when-to-spec', text: 'When to Spec Each Interlayer', level: 2 },
  { id: 'faq', text: 'Buyer FAQ', level: 2 },
];

const buyerFaqItems = [
  {
    q: 'How long does laminated glass take to produce?',
    a: 'The autoclave cycle itself is about 2.5 hours. Including cutting, cleaning, pre-press, and quality inspection, our standard production cycle is 10-15 working days from order confirmation. Combined laminated-IGU (laminated + insulated glass unit) runs 15-20 working days because it involves both the lamination autoclave and the IGU production line in sequence.',
  },
  {
    q: "What's the maximum size laminated glass we can produce?",
    a: 'Our 3m × 15m autoclave is among the largest in Hubei province, matching our tempering furnace capacity. This lets us produce jumbo laminated panels (and combined tempered-laminated panels) for structural glazing, large curtain walls, and ultra-wide canopies that smaller factories cannot handle.',
  },
  {
    q: 'Can laminated glass be cut after lamination?',
    a: 'Yes, if the glass lites inside are annealed. The interlayer is cut with a knife or heated wire after scoring and snapping the glass. However, laminated TEMPERED glass cannot be re-cut — tempering locks the glass permanently (see our tempered glass production guide for why). For modifications to tempered-laminated panels, new raw materials must be ordered.',
  },
  {
    q: 'What interlayer should I specify for a hurricane-prone region?',
    a: 'SGP (SentryGlas / Ionoplast) is the standard for hurricane and cyclone zones. It is ~100× stiffer than PVB post-break, which lets the broken panel continue to carry wind load until replaced. Minimum thickness 1.52mm SGP for Miami-Dade hurricane rating per TAS 201/202/203 test protocols. We produce SGP-laminated panels on the same line as PVB — specify "SGP" in your drawings.',
  },
  {
    q: 'Why do some laminated glass panels get bubbles after a few years?',
    a: 'This is usually not post-production bubble formation — it is pre-existing micro-bubbles that gradually expand due to interlayer stress. Caused by inadequate autoclave pressure during the de-airing phase. A properly produced laminated panel should remain bubble-free for the lifetime of the installation. Our batch records trace every panel back to specific autoclave cycle data, so field failures can be investigated and traced to root cause.',
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
          'Laminated glass is two or more glass panes permanently bonded by a polymer interlayer (PVB, SGP, EVA, or acoustic PVB) via a controlled heat + pressure cycle in an autoclave.',
          'The autoclave reaches ~140°C and 12 bar for roughly 30-40 minutes, chemically fusing the PVB with glass surfaces. Total cycle including ramp-up and cool-down: ~2.5 hours.',
          'PVB is the default interlayer (automotive, standard safety glass). SGP is ~3-5× the cost but ~100× stiffer post-break — the standard for hurricane zones and structural glazing.',
          'Unlike tempered glass, laminated glass CAN be cut after production (if the glass inside is annealed). However, laminated-TEMPERED glass cannot be re-cut.',
          'Most laminated glass defects (bubbles, haze, yellowing) trace back to interlayer handling and autoclave cycle control, not materials — process discipline is everything.',
        ]} />

        <p>
          "Laminated glass is just two panes with plastic in between" — this is technically
          true and almost completely wrong. The plastic interlayer is a precisely engineered
          thermoplastic that must be processed under exact temperature and pressure to form
          a permanent molecular bond with glass. Get the process wrong and you get bubbles,
          haze, or edge delamination that only shows up months later in the field.
        </p>

        <p>
          This article walks through what actually happens on a working lamination line
          — specifically ours in Wuhan, with our 3m × 15m autoclave (among the largest in
          Hubei province). It's the companion to our{' '}
          <a href="/blog/how-is-tempered-glass-made">tempered glass production walk-through</a>{' '}
          — many of our customers specify laminated-tempered glass, which combines both processes.
          For a broader framework, see our{' '}
          <a href="/blog/architectural-glass-types-guide">complete architectural glass types guide</a>.
        </p>

        <h2 id="not-just-glue">Lamination Is Not Just "Gluing Two Panes"</h2>

        <p>
          Lamination is a <strong>chemical fusion</strong>, not a mechanical adhesive. The
          interlayer (most commonly polyvinyl butyral, PVB) is a thermoplastic sheet that,
          under the right heat and pressure, forms covalent and hydrogen bonds with the
          hydroxyl groups on the glass surface. Done correctly, the bond is as strong as
          the glass itself — a lamination failure is almost always a glass failure, not a
          delamination.
        </p>

        <p>
          The <strong>safety value</strong> of laminated glass comes from this bond. When
          the glass breaks, fragments stay stuck to the interlayer rather than becoming
          airborne shards. For overhead glazing, hurricane zones, and storefront security,
          this is what building codes require (IBC 2021 §2405.5, §2406.4.4). The acoustic
          and UV-blocking benefits are secondary.
        </p>

        <TechNote type="note" title="PVB vs other interlayers">
          <p>
            PVB is the default — it was invented for automotive windshields in the 1930s and
            is still ~95% of the market by volume. But three other interlayers exist for
            specialized applications: SGP for structural and hurricane work, EVA for
            decorative inclusions, and acoustic PVB for noise-critical environments. The
            next section compares them.
          </p>
        </TechNote>

        <h2 id="interlayers">The Four Interlayer Technologies</h2>

        <p>
          Pick any 1-3 interlayers below to compare their specifications side-by-side:
        </p>

        <PVBvsSGPComparison />

        <p>
          The practical decision usually comes down to <strong>PVB vs SGP</strong>. PVB is
          the default workhorse for safety glazing in doors, shower enclosures, overhead
          canopies, and standard automotive windshields. SGP enters the picture when you
          need the laminated panel to <em>continue carrying load</em> after glass breakage
          — hurricane zones (per Miami-Dade TAS 201), structural glass floors, bomb-blast
          rated glazing, and railings where fall-arrest matters.
        </p>

        <p>
          EVA and acoustic PVB are niche — EVA for decorative projects with fabric or
          metal mesh inclusions (requires vacuum-oven processing instead of autoclave),
          acoustic PVB for premium residential facing busy streets where STC ratings
          above 36 are required.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug="how-is-laminated-glass-made" />

        <h2 id="production-line">The Full Production Line</h2>

        <p>
          Compared to tempering, lamination is a longer, more environmentally sensitive
          process. The key difference: tempering is a single thermal shock event; lamination
          is a sustained chemical bonding under tightly controlled humidity, cleanliness,
          and temperature. The production sequence:
        </p>

        <ol>
          <li>
            <strong>Glass preparation</strong> — Both lites are cut to final dimensions,
            edges finished, and washed with deionized water. For tempered-laminated panels,
            both lites are fully tempered <em>before</em> entering the lamination line.
          </li>
          <li>
            <strong>PVB sheet preparation</strong> — PVB arrives from suppliers (Kuraray,
            Eastman Saflex, Trosifol, DuPont) in moisture-sealed rolls. Climate-controlled
            prep room (~20°C, 25% RH max) prevents moisture absorption. Sheet is cut
            slightly oversized and inspected for wrinkles, inclusions, debris.
          </li>
          <li>
            <strong>Assembly</strong> — Glass+PVB+Glass sandwich is assembled in a dust-free
            clean room. Alignment matters — misalignment causes edge delamination later.
            Any single speck of debris between layers becomes a permanent visible defect.
          </li>
          <li>
            <strong>Pre-press (nip roller)</strong> — The sandwich passes through heated
            rubber rollers (~90°C, modest pressure) that squeeze out most of the trapped
            air and give the PVB initial tackiness. This step is what prevents large
            bubble formation in the autoclave.
          </li>
          <li>
            <strong>Autoclave cycle</strong> — The actual lamination event. 2.5 hours at
            peak 140°C and 12 bar. See the next section for the detailed cycle.
          </li>
          <li>
            <strong>Edge finishing + QC</strong> — Trimming of PVB overhang, final optical
            inspection, packaging in A-frame crates.
          </li>
        </ol>

        <p>
          The dust-free assembly room is where most mid-tier factories fail. A single
          cleaning crew mistake, a fiber from a worker's clothing, or an unfiltered air
          vent can contaminate dozens of panels before anyone notices. We run our
          assembly room with HEPA-filtered positive pressure and dedicated clean-room
          garments — overhead for a small factory, but necessary for consistent output.
        </p>

        <h2 id="autoclave">The Autoclave: Where Lamination Actually Happens</h2>

        <p>
          The autoclave is a large pressure vessel that heats and pressurizes the loaded
          panels together. The cycle is a precisely controlled temperature-pressure curve
          that forces the PVB to flow into every micro-cavity between the glass surfaces,
          then holds it there while the chemical bond forms.
        </p>

        <AutoclaveCurveChart />

        <p>
          The three most critical phases:
        </p>

        <ul>
          <li>
            <strong>De-airing (0-45 min):</strong> Pressure comes up <em>before</em>
            temperature reaches PVB flow point. This forces trapped air back into
            solution in the PVB where it can diffuse out, rather than remaining as
            permanent bubbles. Insufficient pressure here is the #1 cause of
            bubble defects.
          </li>
          <li>
            <strong>Dwell (75-110 min):</strong> Full temperature + pressure held for
            30-40 minutes. This is when the chemical bond forms. Too short a dwell
            → weak bond, future delamination. Too long → unnecessary energy cost
            and PVB degradation.
          </li>
          <li>
            <strong>Cool-down (110-140 min):</strong> Must remain at high pressure
            until temperature drops below PVB flow point (~90°C), or trapped air can
            re-emerge as bubbles. Rushing this step is false economy.
          </li>
        </ul>

        <p>
          Our autoclave is a 3m × 15m unit with programmable cycle control calibrated for
          each interlayer type (PVB, SGP, acoustic PVB) and glass build-up. For combined
          laminated-IGU production, the laminated outer lite comes off this autoclave and
          feeds directly into our{' '}
          <a href="/products/insulated-glass">insulated glass line</a> for assembly into
          the final IGU.
        </p>

        <h2 id="can-be-cut">Why Laminated Glass CAN Be Cut (Unlike Tempered)</h2>

        <p>
          A crucial difference from our{' '}
          <a href="/blog/how-is-tempered-glass-made">tempered glass article</a>: laminated
          glass can be cut after lamination, if the glass lites inside are annealed. The
          process:
        </p>

        <ol>
          <li>Score the glass on both surfaces with a conventional glass cutter wheel</li>
          <li>Snap along the score lines (both lites snap simultaneously)</li>
          <li>Cut the PVB interlayer with a sharp knife or heated nichrome wire</li>
          <li>Refinish the exposed glass edges</li>
        </ol>

        <TechNote type="warning" title="Important exception: tempered-laminated glass">
          <p>
            Laminated glass with <strong>tempered</strong> glass lites inside cannot be
            re-cut — tempering locks the glass permanently. Any attempt will shatter the
            tempered lite into granules. For modifications to tempered-laminated panels,
            new raw materials must be ordered and the entire lamination process repeated.
          </p>
        </TechNote>

        <p>
          This cuttability is why laminated annealed glass is often preferred for
          fabrication-heavy projects where field adjustments are expected, while
          laminated-tempered is reserved for applications where the final dimensions
          are fixed at design time.
        </p>

        <h2 id="defects">Common Failures: Bubbles, Delamination, Haze</h2>

        <p>
          Click through the common defects below to see what they look like, what causes
          them, and how a reputable factory prevents them:
        </p>

        <DelaminationFailureViewer />

        <p>
          For buyers evaluating a lamination supplier, the question is not "do defects
          happen?" (they occasionally do, in every factory) but "are defects traceable to
          a specific batch, autoclave cycle, or raw material lot?" We maintain complete
          batch records with autoclave cycle logs, PVB lot numbers, and glass source lot
          numbers for every production run. Field issues can be investigated and traced
          to root cause within 24 hours.
        </p>

        <h2 id="when-to-spec">When to Spec Each Interlayer</h2>

        <p>
          A practical decision guide based on common buyer scenarios:
        </p>

        <ul>
          <li>
            <strong>Standard safety glazing (shower, overhead, railing):</strong>{' '}
            PVB 0.76mm or 1.52mm. The default, lowest cost, meets all residential and
            most commercial safety codes.
          </li>
          <li>
            <strong>Hurricane-prone region (Florida, Caribbean, coastal Asia):</strong>{' '}
            SGP 1.52mm minimum, Miami-Dade NOA certified. Required for coastal
            commercial and residential construction in cyclone zones.
          </li>
          <li>
            <strong>Structural glass (floors, bridges, walkable surfaces):</strong>{' '}
            SGP 2.28mm, with careful engineering of post-break load capacity. Not a DIY
            decision — requires structural engineer sign-off.
          </li>
          <li>
            <strong>Acoustic-critical (street-facing residential, hospitals, hotels):</strong>{' '}
            Acoustic PVB 0.76mm. Boosts STC by 2-3 points over standard PVB. Pair with
            IGU for maximum acoustic performance.
          </li>
          <li>
            <strong>Decorative inclusions (fabric, mesh, dried flowers):</strong>{' '}
            EVA, processed in vacuum oven. Only for interior applications — not
            weather-resistant.
          </li>
          <li>
            <strong>Bomb-blast or forced-entry resistant:</strong> Multi-layer SGP build-up
            (3+ glass lites, 2+ interlayers). Specialty application, requires
            security-rated specification.
          </li>
        </ul>

        <p>
          For most architectural buyers, the choice is PVB (default) or SGP (upgraded).
          See our{' '}
          <a href="/products/laminated-glass">laminated glass product page</a> for
          standard build-ups and spec sheet, or our{' '}
          <a href="/blog/insulated-glass-vs-laminated-glass">insulated vs laminated
          selection guide</a> for the broader "do I need lamination at all?" decision.
        </p>

        {/* Pillar back-link */}
        <TechNote type="note" title="Zoom out to the full picture">
          <p>
            This article is the second in our Technical Guides series — a companion to our{' '}
            <a href="/blog/how-is-tempered-glass-made">tempered glass production walk-through</a>.
            For the broader framework of all 5 architectural glass families, see our{' '}
            <a href="/blog/architectural-glass-types-guide">complete architectural glass
            types buyer's guide</a>.
          </p>
        </TechNote>

        <FAQ items={buyerFaqItems} />

        <RelatedProductsCards slugs={['laminated-glass', 'tempered-glass', 'insulated-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="how-is-laminated-glass-made" />
      </BlogArticleLayout>
    </>
  );
}
