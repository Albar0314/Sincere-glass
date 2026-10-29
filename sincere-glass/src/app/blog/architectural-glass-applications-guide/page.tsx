import type { Metadata } from 'next';
import Link from '@/components/LocalizedLink';
import { blogArticles } from '@/lib/blog-registry';
import { makeAlternates } from '@/lib/i18n';
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from '@/components/blog/BlogArticleLayout';
import TLDRBox from '@/components/blog/TLDRBox';
import RelatedProductsCards from '@/components/blog/RelatedProductsCards';
import LeadMagnetCTA from '@/components/blog/blocks/LeadMagnetCTA';
import FAQ from '@/components/blog/blocks/FAQ';
import ApplicationZoneExplorer from '@/components/blog/article-12/ApplicationZoneExplorer';
import ApplicationGlassMatrix from '@/components/blog/article-12/ApplicationGlassMatrix';
import GlazingScheduleReader from '@/components/blog/article-12/GlazingScheduleReader';

const SLUG = 'architectural-glass-applications-guide';
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc: TOCItem[] = [
  { id: 'zones', text: 'The 6 Application Zones of a Building', level: 2 },
  { id: 'schedule', text: 'How to Read a Glazing Schedule', level: 2 },
  { id: 'framework', text: 'Application → Glass → Code Framework', level: 2 },
  { id: 'matrix', text: 'The Zone × Product Matrix', level: 2 },
  { id: 'deep-dives', text: 'Deep Dives', level: 2 },
  { id: 'coming', text: 'Applications Coming Next', level: 2 },
  { id: 'faq', text: 'FAQ', level: 2 },
];

const faqItems = [
  {
    q: 'Why can\'t I just pick glass by thickness?',
    a: 'Thickness is an output, not an input. The right glass is determined by the application — specifically by the loads it must carry, the failure mode the code demands, and the hardware it mates with. A 10 mm tempered that is perfect for a shower door is forbidden on a frameless balustrade; a 6 mm laminated that works for a residential balcony cannot handle a commercial facade. Start from the application, work through loads and codes, and thickness falls out as a result.',
  },
  {
    q: 'Which code jurisdictions does Sincere Glass certify to?',
    a: 'We regularly produce for CE/EN markets (Europe, UK, GCC), SGCC-certified for North America (US and Canada), AS/NZS tested for Australia and New Zealand, and GB-certified for domestic China and some Asian markets. For a project in another jurisdiction, we can usually certify to the nearest major standard — Latin America typically accepts CE or SGCC, SE Asia typically accepts GB or EN, and the GCC accepts CE. Always confirm the specific test report required with the local authority before placing the order.',
  },
  {
    q: 'What does the "#2" in "Low-E#2" mean?',
    a: 'Glass surfaces in an IGU are numbered from outside in: surface #1 is the exterior face of the outboard lite, #2 is the interior face of the outboard lite (inside the cavity), #3 is the exterior face of the inboard lite (also inside the cavity), and #4 is the interior face of the inboard lite (facing the room). Low-E coating position matters: #2 is standard for cooling-dominated climates (keeps solar heat out), #3 is more common in heating-dominated climates (keeps room heat in). Specifying #2 vs #3 changes the SHGC and U-value by roughly 10–15%.',
  },
  {
    q: 'Do I need laminated glass if I\'m already using tempered?',
    a: 'Depends on the application. Tempered glass is safe when it breaks (small granules instead of daggers), but when it breaks the entire panel is gone. Laminated glass holds fragments in place after breakage — the glass stays in the opening. For overhead applications (skylights), balustrades, structural glass floors, and anywhere a code requires post-breakage retention, laminated is mandatory even if tempered. For shower doors, interior partitions, and simple vision glass in curtain walls, tempered alone is usually sufficient.',
  },
  {
    q: 'Can I use the same glass build-up across multiple applications in one project?',
    a: 'Only when the loads and codes genuinely align. In practice, one project usually has three to five distinct glass marks — a facade build-up (Low-E IGU), an interior safety build-up (tempered or laminated monolithic), a balustrade build-up (tempered laminated SGP), a shower build-up (monolithic tempered), and sometimes a floor or skylight assembly. Trying to specify a single "project glass" that covers all applications leads either to over-specifying (paying for structural SGP on a simple partition) or under-specifying (putting non-laminated IGU in an overhead application where code requires fallout retention).',
  },
  {
    q: 'How detailed should my spec be before requesting a quote?',
    a: 'For each glass mark, we need: location in the building, panel dimensions (or range), framing or support type, applicable code jurisdiction, and any special performance requirements (U-value target, acoustic rating, hurricane rating). Even without exact dimensions, these five inputs let us propose the correct build-up and give an accurate price. A spec that says only "10 mm toughened for balcony" without the geometry or line load forces us to assume the worst case and either over-quote or ask the questions anyway.',
  },
];

export default function Page() {
  const schemas = articleJsonLd(article, faqItems);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={article.tldr || []} />

        <p>
          Most people who buy architectural glass arrive at the decision from the wrong end. They
          start with a product (&quot;tempered glass&quot; or &quot;Low-E&quot;) and try to fit it
          into their project. The result is a schedule full of over-engineered facade glass and
          under-engineered balustrades, because product-first specifying skips the actual
          question the code is asking: where in the building is this glass, and what does it have
          to do there?
        </p>

        <p>
          This is the hub guide to Sincere Glass&apos;s Applications cluster. It walks through
          the six application zones that cover roughly 95% of commercial and residential glazing
          work, shows how a real glazing schedule compresses the decision into one line, and
          points to our deep-dive guides for the three applications we&apos;ve documented in
          detail. Every link out from this page is to a factory-perspective article written from
          our Wuhan production floor — the content you&apos;re looking for when you need the
          actual spec, not a product brochure.
        </p>

        <h2 id="zones">The 6 Application Zones of a Building</h2>

        <p>
          Walk through any modern commercial building and the glass work breaks into six
          repeating zones. Each zone has its own primary code reference, its own loading, and its
          own characteristic glass make-up. Click any zone in the diagram below to see what gets
          specified there, and why.
        </p>

        <ApplicationZoneExplorer />

        <p>
          Three of these zones — facade, balustrade, and shower — we&apos;ve already written
          detailed buyer guides for. The other three (interior partitions, skylights, glass
          floors) are documented in less detail here but represent major cluster expansion over
          the next months. The glazing contractor&apos;s mental model is almost always
          zone-first: a drawing arrives, they identify which zone each glass mark serves, and
          only then do they choose the build-up.
        </p>

        <h2 id="schedule">How to Read a Glazing Schedule</h2>

        <p>
          A glazing schedule is a table on an architect&apos;s drawing that lists every unique
          glass mark on the project. Each row encodes an entire specification in notation that
          looks cryptic until you&apos;ve read a few hundred of them. The four schedule entries
          below are typical of what arrives at our factory via the glazing contractor — click any
          row to decode what the shorthand actually requires.
        </p>

        <GlazingScheduleReader />

        <p>
          Two symbols buyers routinely misread: the surface number (#1 through #4 for an IGU; the
          Low-E coating position changes SHGC by 10–15% depending on which surface it&apos;s on),
          and the interlayer designation (PVB vs SGP look the same in a line item but behave 100×
          differently in a cantilevered application). When you receive a schedule from an
          architect, verify these two with the glass fabricator before placing an order — a
          missing &quot;SGP&quot; or a mistyped &quot;#3&quot; vs &quot;#2&quot; can derail a
          project at submittals.
        </p>

        <h2 id="framework">Application → Glass → Code Framework</h2>

        <p>
          The decision never flows the other way. The sequence that works, every time:
        </p>

        <ol>
          <li>
            <strong>Identify the application zone.</strong> Facade, interior, balustrade, shower,
            skylight, floor. Each has its own code and its own default build-up.
          </li>
          <li>
            <strong>Confirm the loads.</strong> Wind pressure for facade, horizontal line load
            for balustrade, snow and hail for skylight, concentrated person-impact for shower,
            live load for floor. These numbers come from the project engineer, not the glass
            supplier.
          </li>
          <li>
            <strong>Determine the failure mode the code requires.</strong> Fallout resistance for
            overhead glass, post-breakage residual capacity for balustrade, safety breakage
            pattern for human-impact zones. This is what forces laminated vs tempered.
          </li>
          <li>
            <strong>Select the build-up that satisfies both.</strong> Thickness, interlayer type
            and position, coating position, cavity gas, framing method — all fall out of the
            previous three decisions.
          </li>
          <li>
            <strong>Verify certification.</strong> CE/SGCC/GB/AS marking appropriate to the
            project jurisdiction. Request test reports before issuing the PO, not after.
          </li>
        </ol>

        <p>
          If you can&apos;t work backward from a specified build-up to each of these five
          decisions, the spec is incomplete and will likely be challenged at construction
          administration review.
        </p>

        <h2 id="matrix">The Zone × Product Matrix</h2>

        <p>
          Here&apos;s the compressed view of which products are standard, acceptable, rare, or
          not permitted across the six zones. Use it as a cross-check against any schedule
          you&apos;re reviewing — if a zone/product combination is marked &quot;not
          permitted&quot; and appears in the spec, either there&apos;s an engineered exception on
          file or there&apos;s a specification error to resolve.
        </p>

        <ApplicationGlassMatrix />

        <p>
          Two patterns are worth noting. First, tempered monolithic is restricted or forbidden
          across most &quot;life safety&quot; applications (balustrade, skylight, floor) because
          when it breaks it&apos;s gone — there&apos;s no fragment retention. The one zone where
          it dominates is the shower, because the shower enclosure is below head height and
          enclosed by waterproofing, which bounds the consequence of breakage. Second, IGU and
          Low-E IGU dominate the facade and overhead zones but are explicitly inappropriate for
          balustrade, shower, and floor applications where the glass needs to be laminated for
          post-breakage behaviour. The product &quot;IGU&quot; and the zone &quot;facade&quot;
          are almost synonymous in modern commercial practice; outside those zones, IGU usually
          means a specification error.
        </p>

        <div className="my-10 bg-gradient-to-r from-[#3A4250]/40 to-[#1C1F26] rounded-xl p-6 border border-[#DAA745]/30">
          <p className="text-sm text-[#F2F0ED] m-0 mb-3">
            Have a glazing schedule to review?
          </p>
          <Link
            href="/contact"
            className="inline-block px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] font-bold rounded-lg hover:bg-[#c4963e] transition-colors no-underline"
          >
            Send it over — we&apos;ll quote line by line →
          </Link>
        </div>

        <h2 id="deep-dives">Deep Dives: Three Applications We&apos;ve Documented in Detail</h2>

        <p>
          Each guide below is a factory-perspective walk through one application zone — the
          loads, the codes, the build-ups we actually quote, and the procurement pitfalls
          buyers run into most often.
        </p>

        <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/blog/curtain-wall-glass-specification"
            className="group block p-5 rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 hover:border-[#DAA745]/60 transition-colors no-underline"
          >
            <div className="text-[11px] uppercase tracking-wider text-[#DAA745] mb-2">
              Facade
            </div>
            <h3 className="text-base font-semibold text-[#F2F0ED] mb-2 m-0 group-hover:text-[#DAA745] transition-colors">
              Curtain Wall Glass Specification
            </h3>
            <p className="text-xs text-[#8B95A5] leading-relaxed m-0">
              Four objectives (safety, thermal, wind, acoustic), four typical build-ups, and the
              regional code requirements for high-rise facade glass across IBC/EN/GB/AS.
            </p>
            <p className="text-xs text-[#DAA745] mt-3 m-0 font-medium">Read guide →</p>
          </Link>

          <Link
            href="/blog/balustrade-glass-specification"
            className="group block p-5 rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 hover:border-[#DAA745]/60 transition-colors no-underline"
          >
            <div className="text-[11px] uppercase tracking-wider text-[#DAA745] mb-2">
              Balustrade
            </div>
            <h3 className="text-base font-semibold text-[#F2F0ED] mb-2 m-0 group-hover:text-[#DAA745] transition-colors">
              Balustrade Glass Specification
            </h3>
            <p className="text-xs text-[#8B95A5] leading-relaxed m-0">
              Load case decides everything. Framed vs frameless, PVB vs SGP, EN 12600 pendulum
              classes, and the hardware decisions that drive the glass make-up.
            </p>
            <p className="text-xs text-[#DAA745] mt-3 m-0 font-medium">Read guide →</p>
          </Link>

          <Link
            href="/blog/shower-glass-thickness-guide"
            className="group block p-5 rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 hover:border-[#DAA745]/60 transition-colors no-underline"
          >
            <div className="text-[11px] uppercase tracking-wider text-[#DAA745] mb-2">
              Shower
            </div>
            <h3 className="text-base font-semibold text-[#F2F0ED] mb-2 m-0 group-hover:text-[#DAA745] transition-colors">
              Shower Glass Thickness Guide
            </h3>
            <p className="text-xs text-[#8B95A5] leading-relaxed m-0">
              What drives the 8/10/12 mm decision — hinge load, door width, and the four global
              code frameworks for shower enclosure safety glazing.
            </p>
            <p className="text-xs text-[#DAA745] mt-3 m-0 font-medium">Read guide →</p>
          </Link>
        </div>

        <h2 id="coming">Applications Coming Next</h2>

        <p>
          The three application guides above cover the zones we quote most heavily out of our
          Wuhan plant. Three more deep dives are in the production queue:
        </p>

        <ul>
          <li>
            <strong>Skylight glass specification</strong> — snow and hail loads, mandatory
            laminated inner lites, fallout resistance, and the growing shift from PVB to SGP for
            overhead public-access skylights.
          </li>
          <li>
            <strong>Interior glass partition specification</strong> — acoustic STC targets,
            tempered vs laminated for different occupancy types, framing methods, and the
            emerging code treatment of glass as fire-rated partition in modern office tenants.
          </li>
          <li>
            <strong>Structural glass floors and stair treads</strong> — the triple-laminated SGP
            make-up, live load safety factors, slip-resistance surface finishes, and the
            engineering certification path that separates a structural glass floor from a
            cosmetic one.
          </li>
        </ul>

        <p>
          For the broader context on how glass products relate to each other, our{' '}
          <Link href="/blog/architectural-glass-types-guide">
            architectural glass types buyer&apos;s guide
          </Link>{' '}
          covers the five product families, and the{' '}
          <Link href="/blog/architectural-glass-manufacturing-guide">
            architectural glass manufacturing guide
          </Link>{' '}
          walks through the three fabrication processes (tempering, lamination, IGU assembly)
          that produce every product in this matrix.
        </p>

        <LeadMagnetCTA
          title="Global Glass Building Codes Comparison PDF"
          description="A 20-page side-by-side reference comparing architectural glass code requirements across IBC, EN, GB and AS standards — organized by application zone."
        />

              {/* GROK-INSERT-V1:spandrel-xref */}
      <div className="my-8 rounded-xl border-l-4 border-brand-accent bg-brand-accent/10 p-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-accent">
          Related reading
        </p>
        <p className="text-sm text-brand-primary dark:text-brand-light">
          Specifying opaque facade zones?{" "}
          <Link href="/blog/spandrel-glass-guide" className="font-semibold text-brand-accent underline underline-offset-2">
            Read our Spandrel Glass Guide
          </Link>{" "}
          — covers construction methods, thermal stress, and color matching to vision glass.
        </p>
      </div>

      <FAQ items={faqItems} />

        {article.buyerFaq && article.buyerFaq.length > 0 && (
          <FAQ items={article.buyerFaq} title="Procurement & Delivery" />
        )}

        <RelatedProductsCards slugs={article.relatedProductSlugs || []} />
      </BlogArticleLayout>
    </>
  );
}
