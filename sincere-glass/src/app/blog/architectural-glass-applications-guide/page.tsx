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
import LoadCaseSelector from '@/components/blog/article-11/LoadCaseSelector';
import BuildupLab from '@/components/blog/article-11/BuildupLab';
import PendulumImpactSimulator from '@/components/blog/article-11/PendulumImpactSimulator';

const SLUG = 'balustrade-glass-specification';
const article = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`),
};

const toc: TOCItem[] = [
  { id: 'load-case', text: 'The Load Case Decides Everything', level: 2 },
  { id: 'framed-vs-frameless', text: 'Framed vs Frameless: Two Problems, Not One', level: 2 },
  { id: 'buildups', text: 'The Three Build-ups', level: 2 },
  { id: 'pendulum', text: 'Pendulum Impact: EN 12600', level: 2 },
  { id: 'codes', text: 'Regional Code Minimums', level: 2 },
  { id: 'hardware', text: 'Hardware Choice Changes the Glass', level: 2 },
  { id: 'pitfalls', text: 'Procurement Pitfalls', level: 2 },
  { id: 'faq', text: 'FAQ', level: 2 },
];

const faqItems = [
  {
    q: 'Can I use monolithic tempered glass for a frameless balustrade?',
    a: 'For public access and most commercial applications, no. Both EN 1991-1-1 (UK/EU) and IBC 2407 effectively require laminated construction so that a broken guard retains fragments and offers residual capacity. A monolithic tempered panel can disintegrate at once from a NiS inclusion or edge damage — the guard is simply gone. Monolithic tempered is still used in some private residential balconies with a continuous metal top-rail, where the top-rail becomes the fall-arrest element.',
  },
  {
    q: 'What is the minimum glass thickness for a 1.1 m-high balcony balustrade?',
    a: 'Thickness is not set by height alone. It is set by (1) horizontal line load at the handrail, (2) infill load across the panel, (3) span between fixings, and (4) mounting type. For a typical residential balcony with a base-shoe mount and 1.1 m span, 8 + 1.52 + 8 mm tempered laminated PVB is the common starting point. For a commercial balcony at the same height but under a 1.5 kN/m line load, the engineer will usually specify 10 + 1.52 + 10 mm tempered laminated with SGP interlayer when the geometry is cantilevered.',
  },
  {
    q: 'What is the difference between PVB and SGP for balustrade laminated glass?',
    a: 'PVB (polyvinyl butyral) is the standard interlayer in architectural laminated glass. It is soft and holds broken glass fragments in place. SGP (SentryGlas, an ionoplast) is roughly 100× stiffer than PVB at 20°C and about 5× stronger. For a cantilevered or no-top-rail balustrade where the glass is the structural element, SGP keeps the panel standing after both lites break; PVB will sag within hours. Framed balustrades with a continuous top-rail do not usually need SGP.',
  },
  {
    q: 'Why does EN 12600 use a 50 kg twin-tyre impactor instead of a steel ball?',
    a: 'The twin-tyre bag was designed to simulate a human body impact — the actual failure mode that balustrades protect against. A hard-body ball test (used elsewhere for roofs and skylights) measures a different failure: puncture by debris. Guard duty is about a person falling into or against the glass, which is a soft-body impact spread over an area. The 50 kg mass with twin bicycle-tyre contact pads replicates the force-area distribution of an adult body impact at the specified drop height.',
  },
  {
    q: 'Do I need heat-soaked tempered glass for balustrades?',
    a: 'In the EU, EN 14179 heat-soaked tempered glass is required or strongly recommended by most national codes for balustrades, specifically to reduce spontaneous breakage from nickel sulphide (NiS) inclusions. The heat-soak process holds tempered glass at ~290°C for several hours, triggering NiS-containing panels to break in the factory rather than years later on site. Outside the EU, heat-soak is sometimes optional but widely specified by engineers. For balustrades specifically, we recommend heat-soaking every lite — the consequence of a mid-service failure far outweighs the ~15% cost premium.',
  },
  {
    q: 'Can one glass balustrade panel replace both the infill and the top-rail?',
    a: 'Only when the panel is engineered as a structural element — frameless laminated with SGP interlayer, bonded into a structural base shoe or set in point-fixed spigots, and sized to carry the handrail line load as a cantilever. This configuration is permitted in most codes but is explicitly engineered, not a stock product. The build-up is almost always 15 mm + 1.52 SGP + 15 mm or heavier, and the installation requires a certified base channel from a manufacturer with wind/load test certificates.',
  },
  {
    q: 'What panel sizes can you temper and laminate for balustrades?',
    a: 'Our Wuhan plant tempers up to 3 m × 15 m and laminates up to 3 m × 15 m — the two jumbo lines are a key capability for frameless commercial projects where a continuous glass guard is architecturally specified without vertical joints. For most residential balustrades (panel width 1.0–1.5 m), size is not the constraint — glass make-up and heat-soak are.',
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
          Specifying balustrade glass goes wrong in a predictable way. The architect writes
          &quot;12 mm toughened&quot; on a drawing, the fabricator quotes it, and six months later
          an engineer flags that the make-up won&apos;t pass the local pendulum test — or worse,
          that the chosen product gives no post-breakage protection on a cantilevered geometry.
          The fix is a redesign and a cost blow-out.
        </p>

        <p>
          The root cause is almost always the same: the spec was written from the glass side
          (&quot;what thickness do I need?&quot;) instead of the load side (&quot;what load does
          this guard carry, and what happens when it breaks?&quot;). This article flips the order.
          We start with how balustrade loads are defined in the major codes, work through the three
          real-world build-ups, show which pendulum class each one passes, and finish with the
          hardware decisions that quietly drive the glass make-up — all from the perspective of
          what actually comes off our Wuhan tempering and laminating lines.
        </p>

        <h2 id="load-case">The Load Case Decides Everything</h2>

        <p>
          Every balustrade code works from four simultaneous load inputs:
        </p>

        <ol>
          <li>
            <strong>Horizontal line load</strong> at the top of the guard, applied as a continuous
            kN/m value along the handrail.
          </li>
          <li>
            <strong>Concentrated point load</strong>, applied anywhere on the panel surface or the
            handrail.
          </li>
          <li>
            <strong>Infill area load</strong>, applied across the glass as a uniformly distributed
            kN/m² pressure.
          </li>
          <li>
            <strong>Soft-body impact</strong> — a dynamic impact representing a person falling
            against the guard, tested per EN 12600 (Europe) or an analogous standard elsewhere.
          </li>
        </ol>

        <p>
          The combination of these four decides the glass make-up — not the panel height, not the
          brand of hardware, not the project&apos;s star rating. The selector below shows the
          values for the four use cases we quote most often from the factory floor.
        </p>

        <LoadCaseSelector />

        <p>
          A common error: specifiers pick the point load alone and ignore the line load. The line
          load is almost always the critical case for commercial balustrades because it generates
          the bending moment at the base-shoe clamp, which is where tempered laminated panels
          actually break in service. If a glass processor quotes a build-up without asking you for
          the line load, that&apos;s a signal to slow down.
        </p>

        <h2 id="framed-vs-frameless">Framed vs Frameless: Two Problems, Not One</h2>

        <p>
          Framed and frameless balustrades look similar from a distance. From a structural
          engineering standpoint, they are different problems.
        </p>

        <p>
          <strong>Framed balustrades</strong> rely on a continuous metal top-rail (and often a
          metal bottom channel) to carry the handrail line load. The glass panel acts as infill —
          its job is to resist the uniform area pressure and the soft-body impact, not to carry the
          cantilever moment. This permits lighter build-ups (8-1.52-8 PVB is routine) and lets the
          code treat the glass as a secondary element.
        </p>

        <p>
          <strong>Frameless balustrades</strong> have no top-rail at all, or at most a thin cap
          rail that is not structural. The glass is the cantilever. It carries the handrail line
          load through its own bending stiffness down into the base clamp. This changes everything:
          glass thickness roughly doubles, SGP interlayer becomes the default (not PVB), the
          clamping hardware becomes a structural element with its own certification, and
          post-breakage residual capacity becomes a code requirement in most jurisdictions. A
          frameless 1.1 m-high commercial balustrade typically arrives at 15 + 1.52 SGP + 15 mm or
          heavier.
        </p>

        <p>
          The common procurement mistake is quoting a frameless project at framed-system
          thicknesses because the drawing didn&apos;t make the distinction explicit. Any time the
          handrail is &quot;just a cap&quot; or absent, treat it as frameless and specify
          accordingly.
        </p>

        <h2 id="buildups">The Three Build-ups</h2>

        <p>
          Across every balustrade quote we price, roughly 95% of panels resolve to one of three
          build-ups. The lab below lets you flip between them and see the trade-off honestly —
          including the cost multiplier, which is often what quietly forces the final decision.
        </p>

        <BuildupLab />

        <p>
          A note on the monolithic tempered option: it still appears in some national annexes for
          private low-rise balconies with a continuous metal top-rail, where the top-rail is the
          actual fall-arrest element and the glass is infill. If the glass is doing any guard duty
          at all — if removing the glass means a person could fall — the monolithic tempered option
          should not be on the table in current practice. The code trend across EU, US, China and
          Australia over the past decade has been to tighten the requirements against monolithic
          tempered in balustrades specifically because of its all-or-nothing failure behaviour.
        </p>

        <div className="my-10 bg-gradient-to-r from-[#3A4250]/40 to-[#1C1F26] rounded-xl p-6 border border-[#DAA745]/30">
          <p className="text-sm text-[#F2F0ED] m-0 mb-3">
            Already have the load values and a geometry drawing?
          </p>
          <Link
            href="/contact"
            className="inline-block px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] font-bold rounded-lg hover:bg-[#c4963e] transition-colors no-underline"
          >
            Request a project-specific glass build-up quote →
          </Link>
        </div>

        <h2 id="pendulum">Pendulum Impact: EN 12600 and Why It Matters</h2>

        <p>
          EN 12600 is the European pendulum impact test and, in practice, has become the global
          reference for balustrade safety glazing. A 50 kg twin-tyre impactor (designed to
          replicate a human-body soft impact, not a projectile) is dropped at three heights — 190
          mm, 450 mm, 1200 mm — representing increasing levels of impact energy. The glass is rated
          by the highest class it passes without breaking unsafely.
        </p>

        <PendulumImpactSimulator />

        <p>
          For balustrade work, the Class 1(B)1 drop at 1200 mm is the one that matters. Most
          codes require Class 1(B)1 for frameless balustrades and anywhere the public can access
          the guard. Class 2(B)2 at 450 mm is accepted for framed residential balustrades in most
          jurisdictions. Class 3 is irrelevant to guard duty — it tests to a 190 mm drop, which is
          far below the impact energy of an adult falling against the guard.
        </p>

        <p>
          Two points that catch buyers off-guard: first, EN 12600 is a specimen test, not a
          system test. A build-up that passes Class 1 as a bare specimen can still fail in service
          if the mounting hardware or the panel geometry imposes stress concentrations the test
          didn&apos;t cover. Second, outside the EU, local codes often cite EN 12600 by reference
          (China&apos;s GB 15763.3 and Australia&apos;s AS/NZS 2208 use analogous but not identical
          tests). Always confirm which specific standard the project jurisdiction accepts before
          certifying the glass.
        </p>

        <h2 id="codes">Regional Code Minimums</h2>

        <p>
          Four code systems cover roughly 85% of the balustrade work we export. The intent is
          similar across them; the specific numbers and permitted build-ups are not.
        </p>

        <ul>
          <li>
            <strong>United States — IBC 2407 + ASCE 7-22 §4.5.1.</strong> Guards carrying public
            access require 0.73 kN/m horizontal line load (0.9 kN/m in some occupancies);
            concentrated 0.89 kN. Glass guards in commercial applications must use laminated glass
            with sufficient residual strength to continue to support the load after one or more
            lites break. Monolithic tempered is permitted only when backed by a top-rail that can
            carry the full load if the glass fails.
          </li>
          <li>
            <strong>European Union — EN 1991-1-1 + EN 12600 + national annexes.</strong> Horizontal
            line loads from 0.5 kN/m (Category A dwelling) up to 5.0 kN/m (Category C5 crowd
            areas). EN 12600 Class 2(B)2 minimum for framed residential, Class 1(B)1 for frameless
            or public access. EN 14179 heat-soaked tempered strongly recommended or required for
            tempered glass balustrades across most member states.
          </li>
          <li>
            <strong>China — GB 50210 + GB 15763.3 + JGJ 113.</strong> Balustrade glass must be
            laminated for buildings taller than 5 m, and for any application where fall height
            exceeds 5 m. Tempered glass alone is not accepted in frameless balustrades. The
            typical specified product is laminated tempered 8+1.52+8 mm minimum for residential,
            heavier for commercial.
          </li>
          <li>
            <strong>Australia / New Zealand — AS 1288 §7.</strong> Prescriptive build-up tables by
            panel height, fixing type and load category. Grade A safety glass (either tempered or
            laminated) required for all guard glazing. Frameless balustrades require laminated
            construction. SGP interlayer is explicitly recommended for cantilevered applications
            above 1 m.
          </li>
        </ul>

        <p>
          When exporting from China to one of these jurisdictions, we deliver the glass with the
          corresponding certification: CE marking for EU (EN 12600 + EN 14449 for laminated), SGCC
          and SGCC-equivalent reports for the US, ISO 9001 and the Chinese CCC certification for
          domestic reference, and NATA-equivalent test reports for Australia. Ask for the test
          reports before issuing a PO, not after — a factory that cannot produce the right report
          for your jurisdiction will slow the project at inspection.
        </p>

        <LeadMagnetCTA
          title="Global Glass Building Codes Comparison PDF"
          description="A 20-page side-by-side reference comparing balustrade and architectural glass requirements across IBC, EN, GB and AS codes. Use it to spec from any jurisdiction."
        />

        <h2 id="hardware">Hardware Choice Changes the Glass</h2>

        <p>
          The glass build-up and the mounting hardware are not independent decisions. Three common
          hardware families each push the glass spec in a different direction.
        </p>

        <p>
          <strong>Base shoe (U-channel).</strong> A continuous aluminium or stainless base channel
          that clamps the bottom edge of the glass with structural resin. This is the standard
          commercial mount: it distributes the bending moment uniformly along the panel base,
          allowing the thinnest viable build-up for the load case. Downside: the channel is
          visible as a 100–150 mm band at floor level, which some designers reject on aesthetic
          grounds.
        </p>

        <p>
          <strong>Standoff fittings (point-fixed).</strong> Stainless steel standoff bars pass
          through pre-drilled holes in the glass. Visually clean, structurally more demanding on
          the glass because stress concentrates around every hole. Build-up usually steps up one
          notch (from 8+1.52+8 to 10+1.52+10) and holes must be positioned per ANSI Z97.1 or EN
          12150 edge-distance rules. SGP interlayer is almost always specified because PVB tears
          around hole stress concentrations.
        </p>

        <p>
          <strong>Spigot mounts.</strong> Short vertical posts clamp the glass at two or three
          discrete points along the bottom edge. Common in pool fencing and some commercial
          interior balustrades. Loads are concentrated at each spigot, so the glass sees high
          local bending at those contact zones. Minimum build-up is typically 12 mm fully
          tempered monolithic (where codes permit) or 12+1.52+12 laminated for taller panels.
        </p>

        <p>
          If a hardware supplier quotes glass build-up without specifying their mounting system in
          the same document, treat the quote as incomplete. Every certified balustrade system is
          an engineered pair of glass + mount, and swapping either half without re-engineering
          invalidates the certification.
        </p>

        <h2 id="pitfalls">Procurement Pitfalls</h2>

        <ol>
          <li>
            <strong>Writing &quot;12 mm toughened&quot; on the drawing.</strong> Specifying by
            thickness alone forces the fabricator to guess the load case. The quote comes back at
            the thinnest permissible build-up for a generic residential application, and the
            engineer rejects it at submittals. Instead, specify the handrail line load (kN/m), the
            fall height, the mounting type, and let the fabricator propose the build-up.
          </li>
          <li>
            <strong>Skipping heat-soak on tempered laminated.</strong> A NiS failure in a 15 m
            frameless laminated run means replacing a lite that is often a factory-cut odd
            dimension with a 10–12 week lead time. Heat-soaking the tempered lites adds roughly
            15% to the base cost and eliminates virtually all post-install spontaneous breakage
            risk. For balustrades specifically, we treat it as non-optional.
          </li>
          <li>
            <strong>PVB where SGP is required.</strong> PVB and SGP look the same in a quote line
            item and often differ by only 1–3 USD/m² at the interlayer cost. The structural
            behaviour differs by 100× in stiffness and 5× in post-breakage retention. If the
            geometry is cantilevered or the top-rail is absent, SGP is the answer regardless of
            cost. The procurement team should never substitute PVB for SGP as a cost-saving
            exercise without the engineer re-signing the panel.
          </li>
          <li>
            <strong>Mixed-batch tempering on a long run.</strong> A 30 m continuous balustrade run
            delivered in three tempering batches will show visible optical difference between the
            batches under oblique light — slight anisotropy variations, roller-wave orientation,
            tint shift. Specify &quot;single-batch tempering&quot; on the PO for any balustrade
            where panels are visible side by side.
          </li>
          <li>
            <strong>No pendulum test certificate on file.</strong> If the fabricator cannot
            produce the EN 12600 (or local equivalent) test certificate for the exact build-up
            quoted, that build-up has not been tested — it has been assumed from engineering
            tables. For public access balustrades, the test certificate is required by code, not
            optional. Ask for it at quote stage.
          </li>
        </ol>

        <p>
          For context on where this fits in the broader architectural glass picture, our{' '}
          <Link href="/blog/architectural-glass-types-guide">
            architectural glass types buyer&apos;s guide
          </Link>{' '}
          lays out the five families of products, and the{' '}
          <Link href="/blog/curtain-wall-glass-specification">
            curtain wall glass specification guide
          </Link>{' '}
          covers the related but distinct problem of exterior facade glass. For bathroom
          applications where the glass is horizontal to the user rather than vertical, the{' '}
          <Link href="/blog/shower-glass-thickness-guide">
            shower glass thickness guide
          </Link>{' '}
          works through the equivalent decision tree.
        </p>

        <FAQ items={faqItems} />

        {article.buyerFaq && article.buyerFaq.length > 0 && (
          <FAQ items={article.buyerFaq} title="Procurement & Delivery" />
        )}

        <RelatedProductsCards slugs={article.relatedProductSlugs || []} />
      </BlogArticleLayout>
    </>
  );
}
