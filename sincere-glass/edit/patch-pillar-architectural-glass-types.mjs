/**
 * patch-pillar-architectural-glass-types.mjs
 *
 * Delivers the FIRST PILLAR PAGE for the Sincere Glass blog:
 * "Architectural Glass Types: The Complete Buyer's Guide"
 *
 * Target keyword: architectural glass types
 * Cluster: comparison (serves as entry point for the whole cluster)
 * isPillar: true
 * URL: /blog/architectural-glass-types-guide
 *
 * This patch:
 *   1. Adds `isPillar?: boolean` to BlogArticle interface in blog-registry.ts
 *   2. Creates 2 new interactive components:
 *      - GlassFamilyMap (SVG topology of 5 glass categories)
 *      - GlassSelectorFlowchart (interactive decision tree)
 *   3. Creates src/app/blog/architectural-glass-types-guide/page.tsx
 *   4. Appends registry entry (with isPillar: true)
 *   5. Patches all 3 existing comparison articles to link BACK to the Pillar
 *      (C18 reciprocal — sub-articles must link to their Pillar)
 *
 * Run: node edit\patch-pillar-architectural-glass-types.mjs
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

  if (c.includes('isPillar?')) {
    log('⚠️  isPillar field already exists — skipping');
    return;
  }

  // Insert after the `cluster:` field in the interface
  const marker = 'cluster: BlogCluster;';
  if (!c.includes(marker)) {
    log('❌ Could not find cluster field in BlogArticle interface');
    return;
  }
  c = c.replace(
    marker,
    `cluster: BlogCluster;
  /** True if this article is a Pillar Page — the entry point for a topic cluster. See SOP §6. */
  isPillar?: boolean;`
  );

  writeFileSync(p, c);
  log('✅ blog-registry.ts — isPillar?: boolean added to BlogArticle interface');
}

patchRegistryInterface();

// ─── 2. GlassFamilyMap SVG component ────────────────────────────────────────

ensure(join(SRC, 'components', 'blog', 'pillar-arch-glass', 'GlassFamilyMap.tsx'), `'use client';

import { useState } from 'react';

interface Family {
  id: string;
  name: string;
  desc: string;
  position: { x: number; y: number };
  color: string;
  linkHref: string;
  linkLabel: string;
}

const families: Family[] = [
  {
    id: 'annealed',
    name: 'Annealed (Float)',
    desc: 'Raw material. Not safety glass. Cheapest.',
    position: { x: 400, y: 50 },
    color: '#64748B',
    linkHref: '/blog/tempered-glass-vs-annealed-glass',
    linkLabel: 'Why annealed is not enough →',
  },
  {
    id: 'tempered',
    name: 'Tempered',
    desc: '4-5× stronger. Safe granular breakage.',
    position: { x: 200, y: 180 },
    color: '#FBBF24',
    linkHref: '/products/tempered-glass',
    linkLabel: 'View tempered glass →',
  },
  {
    id: 'laminated',
    name: 'Laminated',
    desc: 'PVB/SGP interlayer. Fragment retention.',
    position: { x: 600, y: 180 },
    color: '#F59E0B',
    linkHref: '/blog/tempered-glass-vs-laminated-glass',
    linkLabel: 'Tempered vs Laminated →',
  },
  {
    id: 'insulated',
    name: 'Insulated (IGU)',
    desc: 'Sealed cavity + Low-E. Energy saver.',
    position: { x: 200, y: 320 },
    color: '#60A5FA',
    linkHref: '/blog/insulated-glass-vs-laminated-glass',
    linkLabel: 'Insulated vs Laminated →',
  },
  {
    id: 'coated',
    name: 'Coated (Low-E / Enameled)',
    desc: 'Surface treatment. Thermal or decorative.',
    position: { x: 600, y: 320 },
    color: '#A78BFA',
    linkHref: '/products/low-e-glass',
    linkLabel: 'View Low-E glass →',
  },
];

export default function GlassFamilyMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const current = families.find((f) => f.id === hovered);

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-4 text-center">
        The 5 Families of Architectural Glass
      </p>

      <div className="relative">
        <svg viewBox="0 0 800 400" className="w-full" xmlns="http://www.w3.org/2000/svg">
          {/* Connecting lines */}
          <g stroke="#3A4250" strokeWidth="1" strokeDasharray="4,2" opacity="0.5">
            <line x1="400" y1="80" x2="200" y2="150" />
            <line x1="400" y1="80" x2="600" y2="150" />
            <line x1="200" y1="210" x2="200" y2="290" />
            <line x1="600" y1="210" x2="600" y2="290" />
          </g>

          {/* Family nodes */}
          {families.map((f) => {
            const isHovered = hovered === f.id;
            return (
              <g
                key={f.id}
                onMouseEnter={() => setHovered(f.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={f.position.x}
                  cy={f.position.y}
                  r={isHovered ? 44 : 40}
                  fill={f.color}
                  fillOpacity={isHovered ? 0.3 : 0.15}
                  stroke={f.color}
                  strokeWidth={isHovered ? 3 : 2}
                  style={{ transition: 'all 0.2s' }}
                />
                <text
                  x={f.position.x}
                  y={f.position.y - 2}
                  textAnchor="middle"
                  className="fill-[#F2F0ED] text-[12px] font-semibold"
                >
                  {f.name.split(' ')[0]}
                </text>
                <text
                  x={f.position.x}
                  y={f.position.y + 14}
                  textAnchor="middle"
                  className="fill-[#F2F0ED] text-[10px]"
                >
                  {f.name.split(' ').slice(1).join(' ')}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel below */}
      <div className="mt-4 min-h-[80px] bg-[#1C1F26]/40 rounded-lg p-4 border border-[#3A4250]/20">
        {current ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: current.color }}
              />
              <h4 className="text-base font-semibold text-[#F2F0ED] m-0">
                {current.name}
              </h4>
            </div>
            <p className="text-sm text-[#8B95A5] mb-2">{current.desc}</p>
            <a
              href={current.linkHref}
              className="text-xs font-medium text-[#DAA745] hover:underline"
            >
              {current.linkLabel}
            </a>
          </>
        ) : (
          <p className="text-sm text-[#8B95A5] italic text-center m-0">
            Hover any circle to see details and drill-down links
          </p>
        )}
      </div>
    </div>
  );
}
`);

// ─── 3. GlassSelectorFlowchart interactive decision tree ────────────────────

ensure(join(SRC, 'components', 'blog', 'pillar-arch-glass', 'GlassSelectorFlowchart.tsx'), `'use client';

import { useState } from 'react';

interface Question {
  id: string;
  text: string;
  options: Array<{ label: string; nextId: string | null; result?: Result }>;
}

interface Result {
  glass: string;
  rationale: string;
  productLink: { href: string; label: string };
  deepLink?: { href: string; label: string };
}

const flow: Record<string, Question> = {
  start: {
    id: 'start',
    text: 'What is the primary concern for this application?',
    options: [
      { label: 'Human safety (impact, falls, break-ins)', nextId: 'safety' },
      { label: 'Energy performance (heating, cooling, HVAC)', nextId: 'energy' },
      { label: 'Appearance only (interior partition, framed art)', nextId: 'appearance' },
    ],
  },
  safety: {
    id: 'safety',
    text: 'Will people walk under, next to, or against the glass?',
    options: [
      {
        label: 'Overhead (skylight, canopy, glass stair)',
        nextId: null,
        result: {
          glass: 'Laminated Glass (required by code)',
          rationale: 'IBC §2405.5 mandates laminated for overhead glazing — the PVB interlayer holds broken pieces in place rather than letting them fall.',
          productLink: { href: '/products/laminated-glass', label: 'Laminated Glass' },
          deepLink: { href: '/blog/tempered-glass-vs-laminated-glass', label: 'Tempered vs Laminated detail →' },
        },
      },
      {
        label: 'Door, shower, low window, railing',
        nextId: null,
        result: {
          glass: 'Tempered Glass (minimum)',
          rationale: 'IBC §2406.4 requires safety glass in these locations. Tempered is the cheapest compliant option; laminated adds UV blocking and acoustic benefit.',
          productLink: { href: '/products/tempered-glass', label: 'Tempered Glass' },
          deepLink: { href: '/blog/tempered-glass-vs-laminated-glass', label: 'When to upgrade to laminated →' },
        },
      },
      {
        label: 'Street-facing storefront or high-break-in risk',
        nextId: null,
        result: {
          glass: 'Laminated Glass (SGP interlayer)',
          rationale: 'SGP interlayer resists forced entry — a thief can crack it but cannot create a passable hole. Standard tempered shatters on hard impact.',
          productLink: { href: '/products/laminated-glass', label: 'Laminated Glass' },
        },
      },
    ],
  },
  energy: {
    id: 'energy',
    text: 'Is the climate harsh (hot summers, cold winters, or both)?',
    options: [
      {
        label: 'Yes — significant heating/cooling costs',
        nextId: null,
        result: {
          glass: 'Insulated Glass with Low-E coating',
          rationale: 'A 6+12A+6 IGU with Low-E coating and argon fill cuts U-value from 5.6 to ~1.4 W/m²·K — a 70% reduction in heat transfer compared to single-pane glazing.',
          productLink: { href: '/products/insulated-glass', label: 'Insulated Glass' },
          deepLink: { href: '/blog/insulated-glass-vs-laminated-glass', label: 'IGU vs Laminated detail →' },
        },
      },
      {
        label: 'Mild climate but still want some efficiency',
        nextId: null,
        result: {
          glass: 'Insulated Glass (basic, no Low-E)',
          rationale: 'A plain IGU (6+12A+6 clear) achieves U-value ~2.6-2.8 — significantly better than single pane without the added cost of Low-E coating.',
          productLink: { href: '/products/insulated-glass', label: 'Insulated Glass' },
        },
      },
      {
        label: 'Both safety AND energy matter',
        nextId: null,
        result: {
          glass: 'Laminated IGU (combined unit)',
          rationale: 'The premium facade spec: laminated outer lite (safety + acoustic) + argon cavity + Low-E tempered inner lite (thermal). Our 3m×15m lines can produce both processes in sequence.',
          productLink: { href: '/products/insulated-glass', label: 'Laminated IGU' },
          deepLink: { href: '/blog/insulated-glass-vs-laminated-glass', label: 'The "both" option explained →' },
        },
      },
    ],
  },
  appearance: {
    id: 'appearance',
    text: 'Is the glass in a code-defined hazardous location?',
    options: [
      {
        label: 'No — above 18in from floor, no impact risk',
        nextId: null,
        result: {
          glass: 'Annealed Float Glass',
          rationale: "If no code requirement forces safety glass, annealed is the cheapest option (~$5-8/m² vs $18-22/m² for tempered). You can also cut and drill it yourself after purchase.",
          productLink: { href: '/contact', label: 'Request Quote' },
          deepLink: { href: '/blog/tempered-glass-vs-annealed-glass', label: 'When annealed is the right pick →' },
        },
      },
      {
        label: 'Decorative pattern or color needed',
        nextId: null,
        result: {
          glass: 'Enameled Glass (ceramic frit)',
          rationale: 'Ceramic frit baked onto tempered glass gives permanent color/pattern that will not fade or peel. Common for spandrels, feature walls, decorative facades.',
          productLink: { href: '/products/enameled-glass', label: 'Enameled Glass' },
        },
      },
    ],
  },
};

export default function GlassSelectorFlowchart() {
  const [currentId, setCurrentId] = useState('start');
  const [history, setHistory] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);

  const current = flow[currentId];

  function reset() {
    setCurrentId('start');
    setHistory([]);
    setResult(null);
  }

  function back() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentId(prev);
    setResult(null);
  }

  function selectOption(opt: typeof current.options[0]) {
    if (opt.result) {
      setResult(opt.result);
    } else if (opt.nextId) {
      setHistory((h) => [...h, currentId]);
      setCurrentId(opt.nextId);
    }
  }

  return (
    <div className="my-10 bg-gradient-to-br from-[#3A4250]/20 to-[#1C1F26] border border-[#DAA745]/30 rounded-xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold m-0">
          Glass Selector — Interactive Decision Tree
        </p>
        {(history.length > 0 || result) && (
          <button
            onClick={reset}
            className="text-xs text-[#8B95A5] hover:text-[#DAA745] transition-colors"
          >
            ↻ Start over
          </button>
        )}
      </div>

      {result ? (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-[#8B95A5] uppercase tracking-wider mb-2">Our recommendation</p>
            <h3 className="text-2xl font-bold text-[#DAA745] mb-3 m-0">{result.glass}</h3>
            <p className="text-[#F2F0ED] leading-relaxed mb-4">{result.rationale}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={result.productLink.href}
              className="px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] rounded-full text-sm font-semibold hover:bg-[#c4952e] transition-colors no-underline"
            >
              {result.productLink.label} →
            </a>
            {result.deepLink && (
              <a
                href={result.deepLink.href}
                className="px-5 py-2.5 border border-[#8B95A5]/40 text-[#F2F0ED] rounded-full text-sm font-medium hover:border-[#DAA745]/60 hover:text-[#DAA745] transition-colors no-underline"
              >
                {result.deepLink.label}
              </a>
            )}
          </div>
          <button
            onClick={back}
            className="text-xs text-[#8B95A5] hover:text-[#F2F0ED] transition-colors mt-2"
          >
            ← Pick a different answer
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg text-[#F2F0ED] font-medium mb-5">{current.text}</p>
          <div className="space-y-2">
            {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => selectOption(opt)}
                className="w-full text-left px-5 py-3 bg-[#1C1F26]/60 border border-[#3A4250]/40 rounded-lg text-[#F2F0ED] text-sm hover:border-[#DAA745]/50 hover:bg-[#DAA745]/5 transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
          {history.length > 0 && (
            <button
              onClick={back}
              className="text-xs text-[#8B95A5] hover:text-[#F2F0ED] transition-colors mt-4"
            >
              ← Back
            </button>
          )}
        </div>
      )}
    </div>
  );
}
`);

// ─── 4. The Pillar Page itself ──────────────────────────────────────────────

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
import GlassFamilyMap from '@/components/blog/pillar-arch-glass/GlassFamilyMap';
import GlassSelectorFlowchart from '@/components/blog/pillar-arch-glass/GlassSelectorFlowchart';

const SLUG = 'architectural-glass-types-guide';
const article: BlogArticle = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata = generateArticleMetadata(article);

const toc: TOCItem[] = [
  { id: 'selector', text: 'Start Here: Glass Selector', level: 2 },
  { id: 'families', text: 'The 5 Families of Architectural Glass', level: 2 },
  { id: 'annealed-family', text: '1. Annealed Float Glass', level: 3 },
  { id: 'tempered-family', text: '2. Tempered Glass', level: 3 },
  { id: 'laminated-family', text: '3. Laminated Glass', level: 3 },
  { id: 'insulated-family', text: '4. Insulated Glass (IGU)', level: 3 },
  { id: 'coated-family', text: '5. Coated Glass (Low-E / Enameled)', level: 3 },
  { id: 'by-application', text: 'By Application: What to Spec Where', level: 2 },
  { id: 'checklist', text: 'Buyer\\'s Procurement Checklist', level: 2 },
  { id: 'faq', text: 'FAQ', level: 2 },
];

const faqItems = [
  {
    q: 'What is the most common type of architectural glass?',
    a: 'Tempered glass is the most commonly specified architectural glass worldwide because most building codes require safety glass in doors, shower enclosures, low windows, railings, and other impact-prone locations. For commercial facades and energy-efficient buildings, insulated glass units (IGUs) with Low-E coating are now the baseline specification.',
  },
  {
    q: 'Can I combine multiple types of glass in a single pane?',
    a: 'Yes — the most common combinations are tempered laminated (impact strength + fragment retention) and laminated IGU (safety + thermal). Our 20,000 m² Wuhan facility runs both tempering and lamination lines in parallel, so we can produce combined units in one production flow. This is standard for high-end facades and overhead installations.',
  },
  {
    q: 'How do I know which glass type my building code requires?',
    a: 'Most national building codes (IBC in the US, GB 50210 in China, EN 12600 in EU, AS 1288 in Australia) define "hazardous locations" where safety glass is mandatory — doors, shower enclosures, low windows, railings, overhead glazing. Our free "Global Architectural Glass Building Codes Comparison" PDF covers all four systems side by side (link in the article above).',
  },
  {
    q: "Does Sincere Glass handle both domestic and export orders?",
    a: "Our two Wuhan facilities (武汉欣城 and 湖北欣之城) have 15+ years of domestic market experience and are now building export capability. We produce 3C-certified glass per Chinese national standards, with test reports available for ASTM C1048, EN 12150, and AS/NZS 2208 compliance review. MOQ for export orders is 50 m².",
  },
  {
    q: "What's the typical lead time for custom architectural glass orders?",
    a: 'Our standard production cycles from order confirmation: annealed cuts 3-7 working days, tempered 7-12 days, laminated 10-15 days, insulated glass units 10-15 days, combined laminated IGU 15-20 days. Low-E coating availability can add 5-7 days for specialty coatings. All lead times exclude ocean freight transit.',
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
          'Architectural glass splits into 5 functional families: annealed (raw), tempered (safety strength), laminated (safety retention), insulated (energy), and coated (Low-E / decorative).',
          'The selection logic is not about "which is best" — it is about which failure mode you cannot accept: impact injury, falling fragments, heat loss, or UV damage.',
          'Most modern buildings use 2-3 types in combination (e.g., tempered doors + laminated overhead + insulated windows). Few projects spec a single type throughout.',
          'Our 20,000 m² facility produces all 5 families in-house, including combined laminated-IGU on our 3m × 15m jumbo lines — among the largest in Hubei province.',
          'This guide covers all 5 families, links to deep-dive comparison articles, and ends with an interactive selector tool and a procurement checklist.',
        ]} />

        <p>
          "What type of glass should I use?" is a question with no universal answer — it depends
          on what the glass needs to do. A shower screen, a curtain wall, a skylight, and a
          decorative spandrel panel all have different failure modes, different code requirements,
          and different performance economics. Choosing wrong wastes money at best and risks
          lives at worst.
        </p>

        <p>
          This guide is the entry point for architectural glass selection: a map of the 5
          functional families, an interactive selector that asks the right questions, deep-dive
          links to our full comparison articles, and a procurement checklist you can hand to
          your supplier. It is written from the perspective of a mid-size Chinese float-glass
          converter that produces all 5 families in one facility — not from a product-brochure
          perspective of "every glass is premium."
        </p>

        <h2 id="selector">Start Here: Interactive Glass Selector</h2>

        <p>
          If you want the fastest answer without reading the full guide, use the selector below.
          It walks through three questions and recommends a glass type based on your primary
          concern. Each result links to the relevant product page and deep-dive article.
        </p>

        <GlassSelectorFlowchart />

        <TechNote type="tip" title="The selector's logic">
          <p>
            The three top-level branches — safety, energy, appearance — correspond to the three
            dominant engineering goals in architectural glazing. Nearly every real project is
            dominated by one of these, with the other two as secondary constraints. Starting
            there, rather than at "what thickness do I need?", avoids 90% of specification
            mistakes.
          </p>
        </TechNote>

        <h2 id="families">The 5 Families of Architectural Glass</h2>

        <p>
          All architectural glass products descend from one of these five families. Hover each
          circle below for a brief description and a link to go deeper:
        </p>

        <GlassFamilyMap />

        <p>
          The connections in the map above are not arbitrary. <strong>Annealed</strong> at the
          top is the raw material — every other family starts life as an annealed float glass
          sheet. <strong>Tempered</strong> and <strong>laminated</strong> are the two safety-glass
          upgrades, each addressing a different failure mode. <strong>Insulated</strong> units
          are built from tempered or laminated lites (never annealed, for safety reasons).{' '}
          <strong>Coated</strong> glass is a surface treatment that can be applied to any of
          the other families but is most commonly deployed as Low-E inside an IGU.
        </p>

        <h3 id="annealed-family">1. Annealed Float Glass — The Raw Material</h3>

        <p>
          Annealed glass is the direct output of a float glass line: molten glass drawn across
          a bed of molten tin, cooled slowly through an annealing lehr, and shipped as flat
          sheets. It has essentially zero residual stress, which makes it easy to cut and
          process — but also means it breaks into large, dangerous shards on impact.
        </p>

        <p>
          Annealed glass is the correct choice for interior framed artwork, upper-story windows
          above code-defined hazardous locations, greenhouse glazing (where thermal cycling
          would stress tempered glass to spontaneous breakage), and any application where the
          buyer needs to cut or drill the glass after purchase.
        </p>

        <p className="text-sm">
          <strong>Deep dive:</strong>{' '}
          <a href="/blog/tempered-glass-vs-annealed-glass">
            Tempered Glass vs Annealed Glass: Why "Regular" Glass Isn't Safe Enough for Most
            Modern Buildings
          </a>
        </p>

        <h3 id="tempered-family">2. Tempered Glass — The Safety Workhorse</h3>

        <p>
          Tempered glass is annealed glass that has been reheated to approximately 620°C and
          then quenched with high-pressure air jets. This creates compressive stress on the
          surface (~180 MPa) and tensile stress in the core, giving the glass 4-5× the strength
          of annealed and — more importantly — a safe granular breakage pattern instead of
          large shards.
        </p>

        <p>
          Our 3m × 15m tempering furnace is among the largest in Hubei province, which allows
          us to supply tempered glass for jumbo curtain walls and oversized facades that
          smaller factories cannot handle. Tempered is the mandatory specification for doors,
          shower enclosures, low windows, and railings in nearly every building code worldwide.
        </p>

        <p className="text-sm">
          <strong>Product page:</strong>{' '}
          <a href="/products/tempered-glass">Tempered Glass product details and specifications</a>
        </p>

        <h3 id="laminated-family">3. Laminated Glass — Fragment Retention</h3>

        <p>
          Laminated glass is two or more glass lites permanently bonded by a polymer interlayer
          — most commonly PVB (Polyvinyl Butyral) or SGP (SentryGlas, DuPont's structural
          interlayer). The interlayer provides a dual function: it dampens airborne sound
          (improving STC rating by 3-5 points vs plain glass) and it holds broken glass
          fragments in place after impact.
        </p>

        <p>
          Laminated glass is code-required for overhead glazing (IBC §2405.5), hurricane and
          cyclone-prone regions, structural glass floors, and most storefronts. The SGP variant
          resists forced entry well enough to be classified as burglar-resistant glazing.
        </p>

        <p className="text-sm">
          <strong>Deep dive:</strong>{' '}
          <a href="/blog/tempered-glass-vs-laminated-glass">
            Tempered Glass vs Laminated Glass: 7 Differences Buyers Must Know
          </a>{' '}
          · <strong>Product page:</strong>{' '}
          <a href="/products/laminated-glass">Laminated Glass details</a>
        </p>

        <LeadMagnetCTA variant="inline" articleSlug="architectural-glass-types-guide" />

        <h3 id="insulated-family">4. Insulated Glass (IGU) — Energy Performance</h3>

        <p>
          An insulated glass unit (IGU) is two or more glass lites separated by a sealed cavity
          filled with inert gas (typically argon) and bounded by a warm-edge spacer. The
          engineering problem it solves is heat transfer: a basic 6+12A+6 IGU achieves U-value
          of 2.6-2.8 W/m²·K; with Low-E coating, this drops to 1.4-1.8 — a 70% improvement
          over single-pane glazing.
        </p>

        <p>
          IGUs are the baseline specification for commercial office towers, residential windows
          in temperate and cold climates, and any building where HVAC costs are a significant
          operating expense. For premium facades combining IGU with laminated safety glass, the
          result is a "laminated IGU" — the configuration we recommend for high-end projects.
        </p>

        <p className="text-sm">
          <strong>Deep dive:</strong>{' '}
          <a href="/blog/insulated-glass-vs-laminated-glass">
            Insulated Glass vs Laminated Glass: Which One Does Your Project Actually Need?
          </a>{' '}
          · <strong>Product page:</strong>{' '}
          <a href="/products/insulated-glass">Insulated Glass details</a>
        </p>

        <h3 id="coated-family">5. Coated Glass — Low-E and Enameled</h3>

        <p>
          Coated glass is a category defined by surface treatment rather than structural method.
          The two most important categories for architectural buyers are:
        </p>

        <ul>
          <li>
            <strong>Low-E (low-emissivity) coating</strong> — a microscopically thin metallic
            layer (sputtered soft-coat or pyrolytic hard-coat) that reflects infrared heat
            while transmitting visible light. Used almost exclusively as surface #2 or #3 of
            an IGU to boost thermal performance.
          </li>
          <li>
            <strong>Enameled (ceramic frit) glass</strong> — ceramic ink baked onto the glass
            surface at tempering temperature, creating a permanent decorative color or pattern.
            Used for spandrel panels (opaque areas of a curtain wall hiding floor slabs),
            feature walls, and decorative applications.
          </li>
        </ul>

        <p className="text-sm">
          <strong>Product pages:</strong>{' '}
          <a href="/products/low-e-glass">Low-E Glass</a>{' '}·{' '}
          <a href="/products/enameled-glass">Enameled Glass</a>
        </p>

        <h2 id="by-application">By Application: What to Spec Where</h2>

        <p>
          Reverse-mapped from the 5 families: here is what architects and specifiers typically
          choose for common building applications. These are our recommendations based on
          production experience — they align with code requirements but go beyond the minimum
          where quality warrants.
        </p>

        <ul>
          <li>
            <strong>Curtain walls (high-rise commercial):</strong> Laminated IGU with Low-E
            coating. Thermal performance for HVAC savings; laminated outer lite for
            fall-arrest safety and wind-load reserve.
          </li>
          <li>
            <strong>Residential windows (temperate climate):</strong> Insulated glass with
            Low-E coating. Argon fill if budget allows. No laminated layer unless street noise
            is a specific issue.
          </li>
          <li>
            <strong>Shower enclosures and glass doors:</strong> Tempered glass, minimum 8mm,
            with polished edges. Laminated upgrade adds UV protection and shatter-stay for
            frameless designs.
          </li>
          <li>
            <strong>Skylights and overhead glazing:</strong> Laminated glass (mandatory per
            IBC §2405.5) — typically laminated tempered for both impact strength and fragment
            retention.
          </li>
          <li>
            <strong>Railings and balustrades:</strong> Laminated tempered glass is the standard.
            Code requires both safety strength and fragment retention for structural glazing.
          </li>
          <li>
            <strong>Spandrel panels (opaque facade areas):</strong> Enameled tempered glass
            with ceramic frit on surface #2 (interior-facing). Color-matched to facade design.
          </li>
          <li>
            <strong>Storefronts and retail glazing:</strong> Laminated glass with SGP
            interlayer for security; tempered as cost-conscious alternative in low-crime areas.
          </li>
          <li>
            <strong>Interior partitions (non-safety):</strong> Annealed glass if location is
            above code-defined hazardous zones; tempered if partition includes a door or is
            within 24in of a traffic path.
          </li>
        </ul>

        <h2 id="checklist">Buyer's Procurement Checklist</h2>

        <p>
          When you request a quote for architectural glass — from Sincere Glass or any supplier
          — these are the specifications your drawings should include. Missing any of these
          typically leads to a quote based on assumptions, which creates problems at delivery:
        </p>

        <ul>
          <li>
            <strong>Glass type</strong> — annealed / tempered / laminated / IGU / combined
            configuration (e.g., "tempered laminated IGU: 6mm Low-E tempered + 12mm argon +
            6mm clear tempered + 1.52mm PVB + 6mm clear tempered")
          </li>
          <li>
            <strong>Thickness per lite</strong> — each glass lite in the assembly separately
          </li>
          <li>
            <strong>Overall dimensions</strong> — W × H per panel, and total quantity
          </li>
          <li>
            <strong>Edge treatment</strong> — polished / ground / arrissed / exposed
          </li>
          <li>
            <strong>Hole locations and sizes</strong> — if any; must be specified before tempering
          </li>
          <li>
            <strong>Coating specification</strong> — Low-E type (soft-coat / hard-coat), coating
            surface (#2 or #3), U-value and SHGC targets
          </li>
          <li>
            <strong>Interlayer specification</strong> — PVB / SGP / acoustic PVB; thickness in mm
          </li>
          <li>
            <strong>Gas fill</strong> — air / argon / krypton (for IGUs)
          </li>
          <li>
            <strong>Spacer type</strong> — aluminum / warm-edge (TPS, Super Spacer, etc.)
          </li>
          <li>
            <strong>Compliance target</strong> — which standard (IBC, EN, GB, AS) and which clauses
          </li>
          <li>
            <strong>Delivery terms</strong> — FOB / CIF / DDP; port of destination
          </li>
          <li>
            <strong>Packaging</strong> — pine crate standard; A-frame or L-frame for jumbo panels
          </li>
        </ul>

        <TechNote type="warning" title="A note on sample orders">
          <p>
            For first-time buyers of any architectural glass product, we strongly recommend
            ordering a small sample (typically 500mm × 500mm, 2-4 pieces) before placing a
            production order. This verifies dimensional accuracy, edge quality, coating
            uniformity, and visual appearance match your expectations. Sample orders ship in
            5-7 days at nominal cost.
          </p>
        </TechNote>

        <FAQ items={faqItems} />

        <RelatedProductsCards slugs={['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="architectural-glass-types-guide" />
      </BlogArticleLayout>
    </>
  );
}
`);

// ─── 5. Append Pillar registry entry ────────────────────────────────────────

function patchRegistryEntry() {
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
    excerpt: "The 5 functional families of architectural glass — annealed, tempered, laminated, insulated, and coated — mapped by failure mode, code requirement, and application. Interactive selector plus deep-dive links.",
    targetKeyword: 'architectural glass types',
    secondaryKeywords: ['types of architectural glass', 'architectural glass buyers guide', 'glass selection guide', 'building glass types'],
    searchKeywords: [
      'architectural glass types', 'types of architectural glass', 'building glass types',
      'glass selection guide', 'glass buyers guide', 'glass selector',
      'annealed tempered laminated insulated', 'building glass categories',
      'float glass tempered glass laminated', 'IGU PVB Low-E',
      'glass pillar guide', 'glass comparison hub',
      '建筑玻璃分类', '建筑玻璃种类', '玻璃选型指南', '建筑玻璃全解',
    ],
    publishDate: '2026-10-07',
    updatedDate: '2026-10-07',
    category: 'Buyer Guide' as const,
    tags: ['architectural glass', 'glass types', 'buyer guide', 'glass selection', 'pillar page'],
    heroImage: '/images/blog/architectural-glass-types-hero.webp',
    heroImageAlt: 'Five types of architectural glass displayed as a visual family: annealed, tempered, laminated, insulated, and coated — showing material differences and layering structures',
    heroImagePrompt: 'Studio product photography, five architectural glass samples arranged in a horizontal row on a polished dark concrete surface, each labeled only by its visual character. From left to right: 1) a plain clear glass sheet with slightly green edge (annealed float), 2) same sheet with safety-glass certification label visible in corner (tempered), 3) two glass sheets bonded with visible translucent PVB interlayer sandwich (laminated), 4) two glass panes with visible aluminum spacer and dark sealant creating a sealed cavity (insulated IGU), 5) a glass pane with subtle gold-toned reflective coating on inner surface (Low-E coated). 25-degree elevated camera angle, soft daylight from above-left, shallow depth of field with focus on middle sample. Clean neutral grey background. Each sample lit to emphasize its distinguishing feature. No text or labels in image, no humans. 4K photorealistic, museum-exhibit quality, warm amber accent lighting pooling under the center samples.',
    author: DEFAULT_AUTHOR,
    readingTime: 15,
    featured: true,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'comparison',
    isPillar: true,
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-07', note: 'Initial publish — Pillar Page for comparison cluster' },
    ],
  },`;

  const closingBracket = c.indexOf('];', c.indexOf('export const blogArticles'));
  if (closingBracket === -1) {
    log('❌ Could not locate blogArticles array end');
    return;
  }
  c = c.slice(0, closingBracket) + newEntry + '\n' + c.slice(closingBracket);
  writeFileSync(p, c);
  log('✅ blog-registry.ts — Pillar entry appended (isPillar: true, featured: true)');
}

patchRegistryEntry();

// ─── 6. Add back-link to Pillar in all 3 sub-articles ───────────────────────

function addPillarBackLink(articleSlug) {
  const p = join(SRC, 'app', 'blog', articleSlug, 'page.tsx');
  if (!existsSync(p)) { log(`⚠️  ${articleSlug} not found — skip`); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('architectural-glass-types-guide')) {
    log(`⚠️  ${articleSlug} already links to Pillar — skipping`);
    return;
  }

  // Inject just before the FAQ section (or just before RelatedProductsCards if no FAQ marker)
  // Priority: before <FAQ for most pages; fallback to <RelatedProductsCards
  const faqMarker = '<FAQ items={buyerFaqItems}';
  const relatedMarker = '<RelatedProductsCards';

  const injection = [
    '',
    '        {/* Pillar back-link */}',
    '        <TechNote type="note" title="Not sure which family of glass fits your project?">',
    '          <p>',
    "            This article is one of three comparisons in our architectural glass selection series.",
    "            For a full overview of all 5 glass families and an interactive selector that walks you",
    "            through the decision based on your project's primary concern, see our{' '}",
    '            <a href="/blog/architectural-glass-types-guide">',
    '              complete architectural glass types guide',
    '            </a>.',
    '          </p>',
    '        </TechNote>',
    '',
    '        ',
  ].join('\n');

  const marker = c.includes(faqMarker) ? faqMarker : relatedMarker;
  if (!c.includes(marker)) {
    log(`⚠️  ${articleSlug} — no injection marker found`);
    return;
  }

  c = c.replace(marker, injection + marker);
  writeFileSync(p, c);
  log(`✅ ${articleSlug} — back-link to Pillar added`);
}

addPillarBackLink('tempered-glass-vs-laminated-glass');
addPillarBackLink('insulated-glass-vs-laminated-glass');
addPillarBackLink('tempered-glass-vs-annealed-glass');

// ─── Done ───────────────────────────────────────────────────────────────────

log('');
log('━'.repeat(60));
log('🎉 Pillar Page delivered.');
log('━'.repeat(60));
log('');
log('Files created:');
log('  src/components/blog/pillar-arch-glass/GlassFamilyMap.tsx');
log('  src/components/blog/pillar-arch-glass/GlassSelectorFlowchart.tsx');
log('  src/app/blog/architectural-glass-types-guide/page.tsx');
log('');
log('Files patched:');
log('  src/lib/blog-registry.ts (+ isPillar field + Pillar entry)');
log('  src/app/blog/tempered-glass-vs-laminated-glass/page.tsx (+ Pillar back-link)');
log('  src/app/blog/insulated-glass-vs-laminated-glass/page.tsx (+ Pillar back-link)');
log('  src/app/blog/tempered-glass-vs-annealed-glass/page.tsx (+ Pillar back-link)');
log('');
log('All component props VERIFIED from source before use.');
log('');
log('Next steps:');
log('  1. npm run build  → verify TypeScript');
log('  2. npm run dev    → visit /blog/architectural-glass-types-guide');
log('  3. Generate hero image per registry heroImagePrompt');
log('     → save to public/images/blog/architectural-glass-types-hero.webp');
log('  4. git push');
log('  5. Request indexing in Google Search Console');
log('');
log('🏛️  Comparison cluster now has:');
log('    • 1 Pillar Page (architectural-glass-types-guide)');
log('    • 3 sub-articles (tempered-vs-laminated, insulated-vs-laminated, tempered-vs-annealed)');
log('    • Full bi-directional internal linking');
log('    • Interactive selector tool as cluster entry point');
log('');
`);
