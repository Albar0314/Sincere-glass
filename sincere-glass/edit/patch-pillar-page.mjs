/**
 * patch-pillar-page.mjs
 *
 * Delivers the first Pillar Page for the "comparison" cluster:
 * "Architectural Glass Types: The Complete Buyer's Guide"
 *
 * Target keyword: architectural glass types
 * Cluster: comparison (Pillar — hub for all comparison sub-articles)
 * URL: /blog/architectural-glass-types-guide
 *
 * This patch:
 *   1. Adds `isPillar?: boolean` to BlogArticle interface
 *   2. Creates 2 new interactive components:
 *      - GlassSelectorFlowchart (decision tree, click-through)
 *      - GlassFamilyMap (5-category SVG hierarchy map)
 *   3. Creates src/app/blog/architectural-glass-types-guide/page.tsx
 *   4. Appends Pillar entry to blog-registry.ts with isPillar: true
 *   5. Patches BlogCard.tsx to render special Pillar card styling
 *   6. Patches all 3 sub-articles to back-link to Pillar
 *
 * Run: node edit\patch-pillar-page.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const log = (m) => console.log(m);

function ensure(filePath, content) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(filePath, content, 'utf-8');
  log(`✅ ${filePath.replace(ROOT, '').replace(/\\/g, '/')}`);
}

// ─── 1. Add isPillar field to BlogArticle interface ─────────────────────────

function patchRegistryInterface() {
  const p = join(SRC, 'lib', 'blog-registry.ts');
  if (!existsSync(p)) { log('❌ blog-registry.ts not found'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('isPillar?:')) {
    log('⚠️  isPillar field already in interface — skipping');
    return;
  }

  // Insert isPillar?: boolean after `featured?: boolean;`
  if (c.includes('featured?: boolean;')) {
    c = c.replace(
      'featured?: boolean;',
      `featured?: boolean;
  /** Pillar Page: hub article linking to all sub-articles in its cluster */
  isPillar?: boolean;`
    );
    writeFileSync(p, c);
    log('✅ blog-registry.ts — isPillar?: boolean added to BlogArticle interface');
  } else {
    log('⚠️  Could not find featured?: boolean field — add isPillar manually');
  }
}

patchRegistryInterface();

// ─── 2. GlassSelectorFlowchart component ────────────────────────────────────

ensure(join(SRC, 'components', 'blog', 'pillar', 'GlassSelectorFlowchart.tsx'), `'use client';

import { useState } from 'react';

interface Step {
  id: string;
  question: string;
  options: { label: string; next: string }[];
}

interface Result {
  id: string;
  isResult: true;
  recommendation: string;
  reasoning: string;
  cta: { label: string; href: string }[];
}

type Node = Step | Result;

const nodes: Record<string, Node> = {
  start: {
    id: 'start',
    question: 'Where will this glass be installed?',
    options: [
      { label: 'In or near a door / shower / low window', next: 'safety-required' },
      { label: 'In an overhead location (skylight, canopy)', next: 'overhead' },
      { label: 'A standard window above 18 in from floor', next: 'standard-window' },
      { label: 'Interior frame / artwork / mirror', next: 'result-annealed' },
    ],
  },
  'safety-required': {
    id: 'safety-required',
    question: 'What matters most beyond basic safety?',
    options: [
      { label: 'Lowest cost, meets code', next: 'result-tempered' },
      { label: 'Sound reduction (street noise, acoustic)', next: 'result-laminated' },
      { label: 'Hurricane / security / forced-entry resistance', next: 'result-laminated-sgp' },
    ],
  },
  overhead: {
    id: 'overhead',
    question: 'Is energy performance also important?',
    options: [
      { label: 'Yes — need thermal insulation too', next: 'result-laminated-igu' },
      { label: 'No — just need to meet overhead code', next: 'result-laminated' },
    ],
  },
  'standard-window': {
    id: 'standard-window',
    question: 'Is heating/cooling cost a concern?',
    options: [
      { label: 'Yes — cold climate, high energy bills', next: 'result-igu-lowe' },
      { label: 'Mild climate, cost is primary concern', next: 'result-annealed-or-tempered' },
    ],
  },

  'result-tempered': {
    id: 'result-tempered',
    isResult: true,
    recommendation: 'Tempered Glass',
    reasoning: 'The cheapest code-compliant safety glass. 4-5× stronger than annealed, breaks into harmless granules. Perfect for doors, shower screens, and most code-mandated safety locations.',
    cta: [
      { label: 'View Tempered Glass product', href: '/products/tempered-glass' },
      { label: 'Read: Tempered vs Laminated comparison', href: '/blog/tempered-glass-vs-laminated-glass' },
    ],
  },
  'result-laminated': {
    id: 'result-laminated',
    isResult: true,
    recommendation: 'Laminated Glass (PVB)',
    reasoning: 'PVB interlayer holds broken pieces in place (code-required for overhead and railings), absorbs sound by 3-5 STC points, blocks 99% UV. The default safety glass for everything above safety-glass minimum.',
    cta: [
      { label: 'View Laminated Glass product', href: '/products/laminated-glass' },
      { label: 'Read: Tempered vs Laminated comparison', href: '/blog/tempered-glass-vs-laminated-glass' },
    ],
  },
  'result-laminated-sgp': {
    id: 'result-laminated-sgp',
    isResult: true,
    recommendation: 'Laminated Glass with SGP interlayer',
    reasoning: 'SentryGlas (SGP) is 100× stiffer and 5× stronger than PVB. The standard for hurricane zones, bullet-resistant glazing, structural balustrades, and forced-entry-resistant storefronts.',
    cta: [
      { label: 'View Laminated Glass product', href: '/products/laminated-glass' },
    ],
  },
  'result-laminated-igu': {
    id: 'result-laminated-igu',
    isResult: true,
    recommendation: 'Laminated IGU (combined)',
    reasoning: 'The premium facade specification: laminated outer lite handles safety + acoustics + UV, air gap + Low-E inner lite handle thermal. Standard for high-end facades and overhead applications in all climates.',
    cta: [
      { label: 'View Insulated Glass product', href: '/products/insulated-glass' },
      { label: 'Read: Insulated vs Laminated comparison', href: '/blog/insulated-glass-vs-laminated-glass' },
    ],
  },
  'result-igu-lowe': {
    id: 'result-igu-lowe',
    isResult: true,
    recommendation: 'Insulated Glass Unit with Low-E coating',
    reasoning: 'Standard IGU drops U-value from ~5.6 to ~2.6; adding Low-E and argon fill drops it to ~1.4-1.8. Cuts heating/cooling energy by 30-50%. The default thermal-performance spec for most climates.',
    cta: [
      { label: 'View Insulated Glass product', href: '/products/insulated-glass' },
      { label: 'View Low-E Glass product', href: '/products/low-e-glass' },
      { label: 'Read: Insulated vs Laminated comparison', href: '/blog/insulated-glass-vs-laminated-glass' },
    ],
  },
  'result-annealed-or-tempered': {
    id: 'result-annealed-or-tempered',
    isResult: true,
    recommendation: 'Tempered Glass (recommended) or Annealed (budget)',
    reasoning: 'If the location does not qualify as a code-defined hazardous location, annealed is permitted and ~3× cheaper. But tempered is still safer against thermal shock and wind load. For small cost differences on exposed windows, tempered is usually worth it.',
    cta: [
      { label: 'Read: Tempered vs Annealed comparison', href: '/blog/tempered-glass-vs-annealed-glass' },
      { label: 'View Tempered Glass product', href: '/products/tempered-glass' },
    ],
  },
  'result-annealed': {
    id: 'result-annealed',
    isResult: true,
    recommendation: 'Annealed Float Glass',
    reasoning: 'For non-safety interior applications — framed artwork, mirrors, non-impact interior partitions, greenhouse glazing — annealed is the correct choice. Cheaper, faster lead time, can be cut/drilled by the fabricator.',
    cta: [
      { label: 'Read: Tempered vs Annealed comparison', href: '/blog/tempered-glass-vs-annealed-glass' },
    ],
  },
};

function isResult(n: Node): n is Result {
  return (n as Result).isResult === true;
}

export default function GlassSelectorFlowchart() {
  const [currentId, setCurrentId] = useState('start');
  const [history, setHistory] = useState<string[]>([]);
  const current = nodes[currentId];

  function go(next: string) {
    setHistory([...history, currentId]);
    setCurrentId(next);
  }

  function back() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setCurrentId(prev);
  }

  function reset() {
    setHistory([]);
    setCurrentId('start');
  }

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium m-0">
          Interactive Selector
        </p>
        {history.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={back}
              className="text-xs text-[#8B95A5] hover:text-[#DAA745] transition-colors"
            >
              ← Back
            </button>
            <span className="text-xs text-[#8B95A5]/40">·</span>
            <button
              onClick={reset}
              className="text-xs text-[#8B95A5] hover:text-[#DAA745] transition-colors"
            >
              ⟲ Start over
            </button>
          </div>
        )}
      </div>

      {!isResult(current) ? (
        <div>
          <h3 className="text-xl font-semibold text-[#F2F0ED] mb-5 m-0">
            {current.question}
          </h3>
          <div className="space-y-2">
            {current.options.map((opt) => (
              <button
                key={opt.next}
                onClick={() => go(opt.next)}
                className="w-full text-left p-4 bg-[#1C1F26]/40 hover:bg-[#DAA745]/10 border border-[#3A4250]/40 hover:border-[#DAA745]/40 rounded-lg transition-all group"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#F2F0ED] group-hover:text-[#DAA745] transition-colors">
                    {opt.label}
                  </span>
                  <span className="text-[#8B95A5] group-hover:text-[#DAA745] transition-colors">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-[#DAA745]/5 border border-[#DAA745]/30 rounded-xl p-6">
          <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-2">
            Our recommendation
          </p>
          <h3 className="text-2xl font-bold text-[#F2F0ED] mb-3 m-0">
            {current.recommendation}
          </h3>
          <p className="text-[#8B95A5] leading-relaxed mb-5">
            {current.reasoning}
          </p>
          <div className="flex flex-wrap gap-2">
            {current.cta.map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#DAA745] text-[#1C1F26] rounded-full text-sm font-semibold hover:bg-[#c4952e] transition-colors no-underline"
              >
                {c.label} →
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
`);

// ─── 3. GlassFamilyMap component ────────────────────────────────────────────

ensure(join(SRC, 'components', 'blog', 'pillar', 'GlassFamilyMap.tsx'), `'use client';

import { useState } from 'react';

interface GlassNode {
  id: string;
  name: string;
  purpose: string;
  productHref?: string;
  articleHref?: string;
}

const families: { category: string; color: string; items: GlassNode[] }[] = [
  {
    category: 'Base Material',
    color: '#64748B',
    items: [
      { id: 'annealed', name: 'Annealed (Float)', purpose: 'The raw sheet. Cheap, cuttable, dangerous when broken.', articleHref: '/blog/tempered-glass-vs-annealed-glass' },
    ],
  },
  {
    category: 'Strengthened',
    color: '#FBBF24',
    items: [
      { id: 'heat-strengthened', name: 'Heat-Strengthened', purpose: '2× stronger than annealed; thermal stress resistant. Not safety glass.' },
      { id: 'tempered', name: 'Tempered', purpose: '4-5× stronger; safe granular breakage; code-compliant.', productHref: '/products/tempered-glass', articleHref: '/blog/tempered-glass-vs-annealed-glass' },
    ],
  },
  {
    category: 'Composite Safety',
    color: '#F97316',
    items: [
      { id: 'laminated-pvb', name: 'Laminated (PVB)', purpose: 'Fragment retention + sound + UV. Standard for overhead/railings.', productHref: '/products/laminated-glass', articleHref: '/blog/tempered-glass-vs-laminated-glass' },
      { id: 'laminated-sgp', name: 'Laminated (SGP)', purpose: '100× stiffer than PVB. Hurricane, structural, bullet-resistant.', productHref: '/products/laminated-glass' },
    ],
  },
  {
    category: 'Thermal Performance',
    color: '#60A5FA',
    items: [
      { id: 'igu', name: 'Insulated (IGU)', purpose: 'Sealed cavity + argon. Primary thermal insulator.', productHref: '/products/insulated-glass', articleHref: '/blog/insulated-glass-vs-laminated-glass' },
      { id: 'low-e', name: 'Low-E Coated', purpose: 'IR-reflective coating. Deployed inside IGU cavity.', productHref: '/products/low-e-glass' },
    ],
  },
  {
    category: 'Decorative / Specialty',
    color: '#A78BFA',
    items: [
      { id: 'enameled', name: 'Enameled (Ceramic Frit)', purpose: 'Color, pattern, solar control via printed ceramic ink.', productHref: '/products/enameled-glass' },
    ],
  },
];

export default function GlassFamilyMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-1">
          The Architectural Glass Family
        </p>
        <p className="text-sm text-[#8B95A5] m-0">
          Five categories, nine products. Hover any card to see what it solves.
        </p>
      </div>

      <div className="space-y-5">
        {families.map((family) => (
          <div key={family.category} className="relative">
            {/* Category label */}
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-1 h-5 rounded-full"
                style={{ backgroundColor: family.color }}
              />
              <h4 className="text-sm font-semibold text-[#F2F0ED] m-0">
                {family.category}
              </h4>
            </div>

            {/* Items in this family */}
            <div className="grid sm:grid-cols-2 gap-2 ml-4">
              {family.items.map((item) => {
                const active = hoveredId === item.id;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={\`p-3 rounded-lg border transition-all \${
                      active
                        ? 'border-[#DAA745]/40 bg-[#DAA745]/5'
                        : 'border-[#3A4250]/30 bg-[#1C1F26]/40'
                    }\`}
                    style={active ? { borderColor: family.color + '66' } : {}}
                  >
                    <p className={\`text-sm font-medium mb-1 m-0 \${
                      active ? 'text-[#DAA745]' : 'text-[#F2F0ED]'
                    }\`}>
                      {item.name}
                    </p>
                    <p className="text-xs text-[#8B95A5] leading-relaxed m-0 mb-2">
                      {item.purpose}
                    </p>
                    <div className="flex gap-3">
                      {item.productHref && (
                        <a
                          href={item.productHref}
                          className="text-xs text-[#DAA745] hover:underline"
                        >
                          Product →
                        </a>
                      )}
                      {item.articleHref && (
                        <a
                          href={item.articleHref}
                          className="text-xs text-[#DAA745] hover:underline"
                        >
                          Deep dive →
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

// ─── 4. Pillar Page: page.tsx ───────────────────────────────────────────────

ensure(join(SRC, 'app', 'blog', 'architectural-glass-types-guide', 'page.tsx'), `import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from '@/components/blog/BlogArticleLayout';
import TLDRBox from '@/components/blog/TLDRBox';
import LeadMagnetCTA from '@/components/blog/LeadMagnetCTA';
import RelatedProductsCards from '@/components/blog/RelatedProductsCards';
import { FAQ, TechNote } from '@/components/blog/blocks';
import GlassSelectorFlowchart from '@/components/blog/pillar/GlassSelectorFlowchart';
import GlassFamilyMap from '@/components/blog/pillar/GlassFamilyMap';

const SLUG = 'architectural-glass-types-guide';
const article: BlogArticle = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata = generateArticleMetadata(article);

const toc: TOCItem[] = [
  { id: 'why-pillar', text: 'Why This Guide Exists', level: 2 },
  { id: 'family-map', text: 'The Five Families of Architectural Glass', level: 2 },
  { id: 'selector', text: 'Interactive Selector: Find Your Glass in 3 Clicks', level: 2 },
  { id: 'annealed-section', text: '1. Annealed Glass — The Starting Point', level: 2 },
  { id: 'tempered-section', text: '2. Tempered Glass — The Default Safety Upgrade', level: 2 },
  { id: 'laminated-section', text: '3. Laminated Glass — Fragment Retention + Sound', level: 2 },
  { id: 'insulated-section', text: '4. Insulated Glass (IGU) — Thermal Performance', level: 2 },
  { id: 'coated-section', text: '5. Low-E & Enameled — Functional Coatings', level: 2 },
  { id: 'application-matrix', text: 'By Application: What to Spec Where', level: 2 },
  { id: 'procurement', text: 'Procurement Checklist', level: 2 },
  { id: 'faq', text: 'FAQ', level: 2 },
];

const faqItems = [
  {
    q: 'What is the single most important factor when choosing architectural glass?',
    a: 'It is almost always "where will this glass fail if it breaks, and who will be near it?" Building codes answer this question for you in most hazardous locations (doors, showers, overhead, railings), but for the remaining 50% of a project the question is cost vs performance across thermal, acoustic, and solar dimensions. Our 3-click selector above walks through this systematically.',
  },
  {
    q: 'Can one glass product do everything?',
    a: 'No — but a combined laminated IGU comes closest. It bundles the fragment-retention safety of laminated glass, the thermal insulation of an IGU, and the solar control of a Low-E coating into a single build-up. This is why it is the default spec for premium facades. The trade-off is cost (roughly 2× a plain tempered IGU) and lead time (15-20 working days vs 10-15 for single-process orders).',
  },
  {
    q: 'How do Chinese GB standards compare to US/EU standards for architectural glass?',
    a: 'For tempered glass: GB 15763.2-2005 and ASTM C1048 define surface stress thresholds within 10% of each other. For laminated: GB 15763.3-2009 aligns closely with EN 14449 and ANSI Z97.1. For IGU: GB/T 11944-2012 covers similar durability tests to EN 1279. Export-grade Chinese factories (ours included) manufacture to the stricter of the applicable standards. Buyers should request third-party test reports for the specific standard required in their market.',
  },
  {
    q: "What is the MOQ for custom architectural glass orders from Sincere Glass?",
    a: 'Standard MOQ is 50 square meters per product configuration. For jumbo panels (up to 3m × 15m), we can handle smaller volumes on the same production line since the setup effort is similar. For trial orders from new buyers we accept smaller MOQs with a nominal setup fee. Contact us with your drawings for a specific quote.',
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
          'Architectural glass divides into 5 families: base material (annealed), strengthened (tempered, heat-strengthened), composite safety (laminated), thermal (insulated/IGU), and functional coatings (Low-E, enameled).',
          'The right glass is a function of location, not preference — building codes dictate safety glass in doors, showers, overhead, and railings; thermal performance matters in most climates.',
          'For most buyer scenarios the answer is a stack: a laminated outer lite + Low-E coated IGU + warm-edge spacer. This is the premium facade standard.',
          'Each category below links to a dedicated deep-dive article and the matching product page.',
          'Chinese GB standards align closely with US ASTM and EU EN standards — export-grade factories manufacture to the stricter of the applicable thresholds.',
        ]} />

        <h2 id="why-pillar">Why This Guide Exists</h2>

        <p>
          "Which glass should I spec?" is the question we get more than any other. The honest
          answer is: there is no universal best glass — there is only the right <em>stack</em> of
          glass products for a specific location, climate, and budget. This guide gives you the
          decision framework and routes you to the detailed comparisons for whichever branch of
          the decision tree is relevant to your project.
        </p>

        <p>
          If you have landed here searching for "architectural glass types," what you actually
          need is probably one of these three answers:
        </p>

        <ul>
          <li>
            <strong>A quick decision</strong> — use the interactive selector below (3 clicks)
          </li>
          <li>
            <strong>A category overview</strong> — read the 5 family sections below, each ~200
            words with links to deeper material
          </li>
          <li>
            <strong>A deep technical comparison</strong> — follow the "Deep dive" links to our
            full comparison articles
          </li>
        </ul>

        <h2 id="family-map">The Five Families of Architectural Glass</h2>

        <p>
          Every architectural glass product is built from a base of annealed float glass with one
          or more secondary processes applied. The processes stack: a product can be tempered,
          then laminated, then assembled into an IGU with a Low-E coating. The map below shows
          the five categories and which products belong to each.
        </p>

        <GlassFamilyMap />

        <h2 id="selector">Interactive Selector: Find Your Glass in 3 Clicks</h2>

        <p>
          Answer three questions below. We will recommend a specific product configuration based
          on your scenario — and route you to the detailed article or product page that goes
          deeper.
        </p>

        <GlassSelectorFlowchart />

        <h2 id="annealed-section">1. Annealed Glass — The Starting Point</h2>

        <p>
          Annealed glass is plain float glass straight off the production line — slowly cooled
          to equalize internal stresses, resulting in a flat, optically clear sheet with almost
          no residual compressive stress. It is the raw material from which every other glass
          product is made. It is also the cheapest and fastest-lead-time option.
        </p>

        <p>
          The catch: annealed glass is <strong>not legal</strong> in most code-defined safety
          locations. It breaks into large, dagger-shaped shards. Modern building codes (IBC §2406,
          GB 50210, EN 12600) forbid annealed glass in doors, shower enclosures, railings,
          low-sill windows, and overhead glazing. It is still the correct choice for interior
          framed artwork, mirrors, non-impact interior partitions, and any location that
          doesn't qualify as code-defined "hazardous."
        </p>

        <TechNote type="tip" title="Deep dive available">
          <p>
            Read our full comparison:{' '}
            <a href="/blog/tempered-glass-vs-annealed-glass">
              Tempered Glass vs Annealed Glass: Why 'Regular' Glass Isn't Safe Enough for Most
              Modern Buildings
            </a>{' '}
            — covers code requirements, breakage patterns, and the specific scenarios where
            annealed remains the right pick.
          </p>
        </TechNote>

        <h2 id="tempered-section">2. Tempered Glass — The Default Safety Upgrade</h2>

        <p>
          Tempered glass takes annealed glass through a secondary heat-treatment: heated to
          ~620°C, then rapidly quenched with high-pressure air jets. The surface cools faster
          than the core, creating 90+ MPa of surface compressive stress. The result: 4-5× the
          strength of annealed, with a safe granular breakage pattern that satisfies code "safety
          glass" requirements.
        </p>

        <p>
          Tempered is the default upgrade when a location requires safety glass but the specific
          performance needs are modest. Shower enclosures, interior partition glass doors,
          storefronts, low-rise curtain walls, furniture glass — all typically specced as
          monolithic tempered. Our 3m × 15m tempering furnace in Wuhan is among the largest in
          Hubei province, so we can handle both standard-size orders and jumbo architectural
          panels.
        </p>

        <TechNote type="tip" title="Deep dives available">
          <p>
            <a href="/products/tempered-glass">Tempered Glass product page</a> — full specs,
            thickness range, standards, applications. <br />
            <a href="/blog/tempered-glass-vs-annealed-glass">Tempered vs Annealed</a> — when to
            step up from annealed. <br />
            <a href="/blog/tempered-glass-vs-laminated-glass">Tempered vs Laminated</a> — when
            tempered is NOT enough and you need laminated instead.
          </p>
        </TechNote>

        <LeadMagnetCTA variant="inline" articleSlug="architectural-glass-types-guide" />

        <h2 id="laminated-section">3. Laminated Glass — Fragment Retention + Sound</h2>

        <p>
          Laminated glass is two or more glass lites permanently bonded by a polymer interlayer
          — PVB (polyvinyl butyral) as standard, SGP (SentryGlas) for structural and
          hurricane-rated applications. When the glass breaks, the shards remain adhered to the
          interlayer instead of becoming airborne.
        </p>

        <p>
          This changes what laminated solves for. First, it is <em>required</em> by code for
          overhead glazing and most structural balustrades — any location where falling glass
          would be dangerous. Second, the PVB interlayer is a mechanical damper that absorbs
          airborne sound, raising STC by 3-5 points vs plain glass of equal thickness. Third,
          PVB inherently blocks 99% of UV radiation. For urban residential, acoustic-critical
          commercial, and any high-exposure location, laminated is the default choice.
        </p>

        <TechNote type="tip" title="Deep dives available">
          <p>
            <a href="/products/laminated-glass">Laminated Glass product page</a> — PVB vs SGP
            selection, interlayer thickness options, standards. <br />
            <a href="/blog/tempered-glass-vs-laminated-glass">Tempered vs Laminated</a> — side-by-side
            comparison across 7 dimensions. <br />
            <a href="/blog/insulated-glass-vs-laminated-glass">Insulated vs Laminated</a> — when to
            pick laminated over IGU for the same project.
          </p>
        </TechNote>

        <h2 id="insulated-section">4. Insulated Glass (IGU) — Thermal Performance</h2>

        <p>
          An insulated glass unit is two or more glass lites with a sealed cavity between them,
          filled with argon (standard) or krypton (premium) gas, and perimeter-sealed with a
          warm-edge spacer to minimize thermal bridging. The IGU does one thing extremely well:
          it reduces heat transfer across the glazing. A standard 6+12A+6 IGU achieves U-value
          ~2.6 W/m²·K; with Low-E coating and argon fill, U-value drops to ~1.4-1.8.
        </p>

        <p>
          IGU is the thermal performance workhorse of modern facades. It is also the baseline
          energy-code requirement in cold climates — single glazing is not permitted in most
          jurisdictions for exterior residential or commercial glazing. In our Wuhan facility
          we run two IGU production lines, including an ultra-large automatic argon-fill line
          that handles jumbo panels for high-rise facades.
        </p>

        <TechNote type="tip" title="Deep dives available">
          <p>
            <a href="/products/insulated-glass">Insulated Glass product page</a> — build-up
            configurations, U-value tables, SHGC values. <br />
            <a href="/blog/insulated-glass-vs-laminated-glass">IGU vs Laminated</a> — buyer-scenario
            decision guide for when to pick thermal vs safety glass (and when to combine them).
          </p>
        </TechNote>

        <h2 id="coated-section">5. Low-E &amp; Enameled — Functional Coatings</h2>

        <p>
          The fifth family is not standalone glass but <em>coatings applied to glass</em>, which
          are then assembled into IGU or laminated units. Two main types:
        </p>

        <ul>
          <li>
            <strong>Low-E (low-emissivity) coating</strong> — a microscopically thin metal-oxide
            layer (sputtered soft-coat or pyrolytic hard-coat) that reflects long-wave infrared
            heat radiation while transmitting visible light. Applied to the inner surface of a
            glass lite within an IGU cavity. Does not change the appearance of the glass. Can
            cut heating/cooling energy use by 30-50%.
          </li>
          <li>
            <strong>Enameled (ceramic frit) coating</strong> — ceramic ink printed onto the
            glass surface and fused in the tempering furnace. Used for solid color panels
            (spandrel glass), decorative patterns, solar shading, and privacy. Fully opaque or
            partially translucent based on dot pattern.
          </li>
        </ul>

        <TechNote type="tip" title="Product pages">
          <p>
            <a href="/products/low-e-glass">Low-E Glass product page</a> —
            soft-coat vs hard-coat, emissivity ranges, SHGC values. <br />
            <a href="/products/enameled-glass">Enameled Glass product page</a> —
            color options, pattern catalog, standards.
          </p>
        </TechNote>

        <h2 id="application-matrix">By Application: What to Spec Where</h2>

        <p>
          Working backwards from building location — the most common framework buyers actually
          use:
        </p>

        <ul>
          <li>
            <strong>Entrance doors and sidelights</strong>: Tempered minimum (code). Laminated
            if sound or forced-entry resistance matters.
          </li>
          <li>
            <strong>Curtain wall facades</strong>: Low-E coated IGU minimum. Add laminated
            outer lite in acoustic-critical or seismic/wind zones.
          </li>
          <li>
            <strong>Shower enclosures</strong>: Tempered (code requires safety glass; monolithic
            tempered is standard).
          </li>
          <li>
            <strong>Skylights and overhead glazing</strong>: Laminated required by code. Add
            IGU for thermal performance.
          </li>
          <li>
            <strong>Structural balustrades</strong>: Laminated with SGP interlayer (code
            requires post-breakage structural retention).
          </li>
          <li>
            <strong>Hurricane / impact zones</strong>: Laminated with SGP, tested per ASTM E1996
            (US) or equivalent.
          </li>
          <li>
            <strong>Spandrel panels</strong>: Enameled (ceramic frit) tempered. Backs opaque,
            front matches adjacent vision glass tint.
          </li>
          <li>
            <strong>Interior partitions and furniture</strong>: Tempered monolithic. Annealed if
            no impact risk and no code requirement.
          </li>
        </ul>

        <h2 id="procurement">Procurement Checklist</h2>

        <p>
          When you issue an RFQ to any glass supplier (us included), the following details
          minimize back-and-forth and get you accurate pricing:
        </p>

        <ol>
          <li><strong>Panel dimensions</strong> — width × height per panel, quantity per size</li>
          <li><strong>Glass build-up</strong> — thickness of each lite, interlayer type &amp; thickness, cavity width &amp; gas, coating type &amp; surface position</li>
          <li><strong>Edge treatment</strong> — polished flat, polished arrissed, pencil, bevel</li>
          <li><strong>Holes and cutouts</strong> — all drill-through dimensions and cutout coordinates (must be done pre-tempering)</li>
          <li><strong>Standards and certifications required</strong> — 3C, CE, SGCC, specific country compliance</li>
          <li><strong>Delivery terms</strong> — FOB which port, DDP which address</li>
          <li><strong>Target lead time</strong> — critical for jumbo orders where our furnace scheduling matters</li>
        </ol>

        <FAQ items={faqItems} />

        <RelatedProductsCards slugs={['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass']} heading="Explore the full product range" />

        <LeadMagnetCTA variant="footer" articleSlug="architectural-glass-types-guide" />
      </BlogArticleLayout>
    </>
  );
}
`);

// ─── 5. Append Pillar entry to registry ─────────────────────────────────────

function appendPillarEntry() {
  const p = join(SRC, 'lib', 'blog-registry.ts');
  if (!existsSync(p)) { log('❌ blog-registry.ts not found'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes("'architectural-glass-types-guide'")) {
    log('⚠️  Pillar entry already in registry — skipping');
    return;
  }

  const newEntry = `
  {
    slug: 'architectural-glass-types-guide',
    title: "Architectural Glass Types: The Complete Buyer's Guide",
    excerpt: "Five families of architectural glass, nine products, one decision framework. Interactive selector finds the right glass for your project in 3 clicks — with deep-dive links to every comparison.",
    targetKeyword: 'architectural glass types',
    secondaryKeywords: ['types of architectural glass', 'glass selection guide', 'architectural glass buyer guide', 'how to choose architectural glass'],
    searchKeywords: [
      'architectural glass types', 'types of architectural glass', 'glass selection guide',
      'how to choose architectural glass', 'glass buyer guide', 'glass pillar guide',
      'architectural glass family', 'glass selection framework',
      'IGU', 'PVB', 'SGP', 'Low-E', 'tempered laminated insulated',
      '建筑玻璃分类', '建筑玻璃选型', '建筑玻璃种类', '玻璃选型指南', '玻璃产品分类',
    ],
    publishDate: '2026-10-07',
    updatedDate: '2026-10-07',
    category: 'Buyer Guide' as const,
    tags: ['pillar', 'architectural glass', 'buyer guide', 'glass selection', 'tempered', 'laminated', 'insulated', 'low-e'],
    heroImage: '/images/blog/architectural-glass-types-hero.webp',
    heroImageAlt: 'Five architectural glass samples arranged in a vertical stack — annealed, tempered, laminated, insulated, and Low-E — showing the family hierarchy of architectural glass products',
    heroImagePrompt: 'Studio product photography, five rectangular architectural glass samples arranged in an elegant vertical stack on polished dark concrete, each sample slightly offset for visibility. Top to bottom: 1) plain clear annealed glass, 2) tempered glass with subtle optical distortion visible at edges, 3) laminated glass with visible PVB interlayer line, 4) insulated glass unit with visible aluminum spacer and dual panes, 5) Low-E coated glass with faint iridescent coating sheen. Each sample has a small warm amber label number (1-5) visible. Soft warm daylight from above-left, deep shadows below each sample, shallow depth of field on the stack. Clean neutral grey background, no humans, no text other than the small numbers. 4K photorealistic, museum-exhibit quality, museum catalog aesthetic.',
    author: DEFAULT_AUTHOR,
    readingTime: 14,
    featured: true,
    isPillar: true,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'comparison',
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-07', note: 'Initial pillar publish' },
    ],
  },`;

  const closingBracket = c.indexOf('];', c.indexOf('export const blogArticles'));
  if (closingBracket === -1) { log('❌ Could not locate blogArticles array end'); return; }
  c = c.slice(0, closingBracket) + newEntry + '\n' + c.slice(closingBracket);
  writeFileSync(p, c);
  log('✅ blog-registry.ts — Pillar entry appended with isPillar: true');
}

appendPillarEntry();

// ─── 6. Patch BlogCard.tsx for Pillar card styling ──────────────────────────

function patchBlogCard() {
  const p = join(SRC, 'components', 'blog', 'BlogCard.tsx');
  if (!existsSync(p)) { log('⚠️  BlogCard.tsx not found — skip'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('isPillar')) {
    log('⚠️  BlogCard already handles isPillar — skipping');
    return;
  }

  // Replace the "Featured" label with conditional: Pillar Guide if isPillar, else Featured
  if (c.includes('Featured')) {
    c = c.replace(
      /<span className="absolute top-4 left-4 text-xs bg-\[#DAA745\] text-\[#1C1F26\] px-3 py-1\.5 rounded font-medium">\s*Featured\s*<\/span>/,
      `<span className={\`absolute top-4 left-4 text-xs px-3 py-1.5 rounded font-medium \${
            article.isPillar
              ? 'bg-gradient-to-r from-[#DAA745] to-[#c4952e] text-[#1C1F26]'
              : 'bg-[#DAA745] text-[#1C1F26]'
          }\`}>
            {article.isPillar ? '✦ Pillar Guide' : 'Featured'}
          </span>`
    );
    writeFileSync(p, c);
    log('✅ BlogCard.tsx — Pillar badge styling added');
  } else {
    log('⚠️  BlogCard.tsx: Featured label not found as expected');
  }
}

patchBlogCard();

// ─── 7. Add Pillar back-links in all 3 sub-articles ─────────────────────────

function addPillarBackLink(articleSlug) {
  const p = join(SRC, 'app', 'blog', articleSlug, 'page.tsx');
  if (!existsSync(p)) { log(`⚠️  ${articleSlug} not found — skip`); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('architectural-glass-types-guide')) {
    log(`⚠️  ${articleSlug} already links to Pillar — skipping`);
    return;
  }

  const marker = '<RelatedProductsCards';
  if (c.includes(marker)) {
    const injection = [
      '<TechNote type="note" title="Zoom out to the full picture">',
      '          <p>',
      "            This article is one of three deep-dives in our architectural glass comparison series.",
      "            For the full decision framework across all 9 architectural glass products — with an",
      "            interactive 3-click selector — see our{' '}",
      '            <a href="/blog/architectural-glass-types-guide">',
      "              complete architectural glass types buyer's guide",
      '            </a>.',
      '          </p>',
      '        </TechNote>',
      '',
      '        ',
    ].join('\n');
    c = c.replace(marker, injection + marker);
    writeFileSync(p, c);
    log(`✅ ${articleSlug} — Pillar back-link added`);
  } else {
    log(`⚠️  ${articleSlug} — marker not found`);
  }
}

addPillarBackLink('tempered-glass-vs-laminated-glass');
addPillarBackLink('insulated-glass-vs-laminated-glass');
addPillarBackLink('tempered-glass-vs-annealed-glass');

// ─── Done ───────────────────────────────────────────────────────────────────

log('');
log('━'.repeat(60));
log('🏛️  PILLAR PAGE delivered.');
log('━'.repeat(60));
log('');
log('Files created:');
log('  src/components/blog/pillar/GlassSelectorFlowchart.tsx');
log('  src/components/blog/pillar/GlassFamilyMap.tsx');
log('  src/app/blog/architectural-glass-types-guide/page.tsx');
log('');
log('Files patched:');
log('  src/lib/blog-registry.ts   (+ isPillar field + Pillar entry)');
log('  src/components/blog/BlogCard.tsx   (+ ✦ Pillar Guide badge)');
log('  src/app/blog/tempered-glass-vs-laminated-glass/page.tsx   (+ Pillar back-link)');
log('  src/app/blog/insulated-glass-vs-laminated-glass/page.tsx   (+ Pillar back-link)');
log('  src/app/blog/tempered-glass-vs-annealed-glass/page.tsx    (+ Pillar back-link)');
log('');
log('All component props VERIFIED from source. No guessing this time.');
log('');
log('Next steps:');
log('  1. npm run build  → should pass cleanly');
log('  2. npm run dev    → /blog/architectural-glass-types-guide');
log('  3. Hero image: /public/images/blog/architectural-glass-types-hero.webp');
log('     (prompt provided below)');
log('  4. git push');
log('  5. Update SOP cluster-count table: pillar ✅ activated');
log('');
log('━'.repeat(60));
log('🎯 HERO IMAGE PROMPT (architectural-glass-types-hero.webp)');
log('━'.repeat(60));
log('');
log('Studio product photography, five rectangular architectural glass samples');
log('arranged in an elegant vertical stack on polished dark concrete, each');
log('sample slightly offset for visibility. Top to bottom: 1) plain clear');
log('annealed glass, 2) tempered glass with subtle optical distortion visible');
log('at edges, 3) laminated glass with visible PVB interlayer line, 4) insulated');
log('glass unit with visible aluminum spacer and dual panes, 5) Low-E coated');
log('glass with faint iridescent coating sheen. Each sample has a small warm');
log('amber label number (1-5) visible. Soft warm daylight from above-left, deep');
log('shadows below each sample, shallow depth of field on the stack. Clean');
log('neutral grey background, no humans, no text other than the small numbers.');
log('4K photorealistic, museum-exhibit quality, museum catalog aesthetic.');
log('');
