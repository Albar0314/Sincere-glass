/**
 * patch-blog-article-2.mjs
 *
 * Delivers Blog Article #2: "Insulated Glass vs Laminated Glass: Which One
 * Does Your Project Actually Need?"
 *
 * Target keyword: insulated glass vs laminated glass
 * Cluster: comparison
 * ArticleType: Comparison
 *
 * SOP v2.2 full compliance — all 20 components (C1-C20).
 *
 * This patch:
 *   1. Creates src/app/blog/insulated-glass-vs-laminated-glass/page.tsx
 *   2. Creates 3 new interactive components in src/components/blog/article-2/
 *   3. Appends new entry to src/lib/blog-registry.ts
 *   4. Patches Article #1 (tempered-vs-laminated) to add intra-cluster
 *      back-link in body (C18 reciprocal linking)
 *   5. Updates SOP cluster-count table (reminder in console)
 *
 * Run: node edit\patch-blog-article-2.mjs
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

// ─── 1. Interactive component: BuyerScenarioPicker ──────────────────────────

ensure(join(SRC, 'components', 'blog', 'article-2', 'BuyerScenarioPicker.tsx'), `'use client';

import { useState } from 'react';

interface Scenario {
  id: string;
  label: string;
  icon: string;
  problem: string;
  recommendation: 'insulated' | 'laminated' | 'both';
  reasoning: string;
  productLink: { href: string; label: string };
}

const scenarios: Scenario[] = [
  {
    id: 'cold-climate',
    label: 'Cold-climate office tower',
    icon: '❄️',
    problem: 'Heating bills eat 40% of operating budget; staff complain of window drafts.',
    recommendation: 'insulated',
    reasoning: 'U-value is the dominant performance metric. A double-pane IGU with argon fill and Low-E coating cuts heat loss by 60-70% vs single pane. Laminated glass alone changes U-value negligibly.',
    productLink: { href: '/products/insulated-glass', label: 'Insulated Glass' },
  },
  {
    id: 'street-noise',
    label: 'Street-facing residential, noisy district',
    icon: '🔊',
    problem: 'Traffic noise at 70+ dB, residents cannot sleep.',
    recommendation: 'laminated',
    reasoning: 'The PVB (or acoustic PVB) interlayer dampens airborne sound, raising STC rating by 3-5 points vs plain glass of equal thickness. A 6.38mm acoustic laminated unit outperforms a 6+12A+6 IGU for noise.',
    productLink: { href: '/products/laminated-glass', label: 'Laminated Glass' },
  },
  {
    id: 'skylight',
    label: 'Overhead skylight / canopy',
    icon: '🏛️',
    problem: 'Code requires glass that stays in place if broken (fall-arrest).',
    recommendation: 'laminated',
    reasoning: 'IBC 2021 §2405.5 mandates laminated glass for overhead glazing — tempered-only glass can rain shards. The PVB layer holds broken pieces in place. IGU adds thermal benefit but does not satisfy the safety requirement on its own.',
    productLink: { href: '/products/laminated-glass', label: 'Laminated Glass' },
  },
  {
    id: 'luxury-villa',
    label: 'Luxury villa, floor-to-ceiling glass',
    icon: '🏖️',
    problem: 'Needs thermal comfort + storm protection + quiet interior + security.',
    recommendation: 'both',
    reasoning: 'High-end facades combine both: a laminated outer lite (safety + sound) + air gap + Low-E tempered inner lite (thermal). This "laminated IGU" is standard for premium coastal projects and hurricane-prone regions.',
    productLink: { href: '/products/insulated-glass', label: 'Laminated IGU' },
  },
  {
    id: 'retail-storefront',
    label: 'Retail storefront, high-traffic street',
    icon: '🛍️',
    problem: 'Impact risk from carts, bags, break-in attempts.',
    recommendation: 'laminated',
    reasoning: 'Laminated glass with SGP interlayer resists forced entry — a thief can crack it but cannot create a passable hole. A standard IGU shatters on impact. For commercial storefronts facing public access, laminated is non-negotiable.',
    productLink: { href: '/products/laminated-glass', label: 'Laminated Glass' },
  },
];

const palette: Record<string, { bg: string; text: string; border: string }> = {
  insulated: { bg: 'bg-blue-500/10', text: 'text-blue-300', border: 'border-blue-500/30' },
  laminated: { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/30' },
  both: { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30' },
};

const label: Record<string, string> = {
  insulated: 'Insulated Glass (IGU)',
  laminated: 'Laminated Glass',
  both: 'Combine Both — Laminated IGU',
};

export default function BuyerScenarioPicker() {
  const [active, setActive] = useState(scenarios[0].id);
  const current = scenarios.find((s) => s.id === active)!;
  const colors = palette[current.recommendation];

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-wider text-[#DAA745] font-medium mb-4">
        Pick your scenario
      </p>

      {/* Scenario tabs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={\`p-3 rounded-lg border transition-all text-left \${
              active === s.id
                ? 'bg-[#DAA745]/10 border-[#DAA745]/40 text-[#F2F0ED]'
                : 'bg-[#1C1F26]/40 border-[#3A4250]/30 text-[#8B95A5] hover:text-[#F2F0ED] hover:border-[#3A4250]/60'
            }\`}
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xs leading-snug">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Scenario detail */}
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-[#8B95A5] font-medium mb-2">
            The problem
          </p>
          <p className="text-[#F2F0ED] leading-relaxed">{current.problem}</p>
        </div>

        <div className={\`border rounded-lg p-5 \${colors.bg} \${colors.border}\`}>
          <p className="text-xs uppercase tracking-wider font-medium mb-2 opacity-70">
            Recommendation
          </p>
          <p className={\`text-xl font-semibold mb-3 \${colors.text}\`}>
            {label[current.recommendation]}
          </p>
          <p className="text-[#F2F0ED]/90 leading-relaxed mb-4">{current.reasoning}</p>
          <a
            href={current.productLink.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#DAA745] hover:underline"
          >
            View {current.productLink.label} →
          </a>
        </div>
      </div>
    </div>
  );
}
`);

// ─── 2. Interactive component: PerformanceRadarChart ────────────────────────

ensure(join(SRC, 'components', 'blog', 'article-2', 'PerformanceRadarChart.tsx'), `'use client';

import { useState } from 'react';

type Metric = 'thermal' | 'acoustic' | 'safety' | 'solar' | 'cost';

interface Product {
  name: string;
  color: string;
  values: Record<Metric, number>; // 0-100
}

const products: Product[] = [
  {
    name: 'Insulated Glass (IGU)',
    color: '#60A5FA',
    values: { thermal: 90, acoustic: 55, safety: 40, solar: 85, cost: 55 },
  },
  {
    name: 'Laminated Glass',
    color: '#FBBF24',
    values: { thermal: 25, acoustic: 85, safety: 95, solar: 40, cost: 65 },
  },
  {
    name: 'Laminated IGU (combined)',
    color: '#34D399',
    values: { thermal: 90, acoustic: 90, safety: 95, solar: 85, cost: 35 },
  },
];

const metrics: { key: Metric; label: string; hint: string }[] = [
  { key: 'thermal', label: 'Thermal (U-value)', hint: 'Lower U-value = better insulation. IGU dominates here.' },
  { key: 'acoustic', label: 'Acoustic (STC)', hint: 'PVB interlayer absorbs airborne sound.' },
  { key: 'safety', label: 'Safety (Impact)', hint: 'Resistance to breakage AND fragment retention.' },
  { key: 'solar', label: 'Solar Control (SHGC)', hint: 'With Low-E coating in IGU, controls solar heat gain.' },
  { key: 'cost', label: 'Cost Efficiency', hint: 'Higher score = better value per sqm (not absolute low price).' },
];

export default function PerformanceRadarChart() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredMetric, setHoveredMetric] = useState<Metric | null>(null);

  // Radar geometry
  const size = 320;
  const center = size / 2;
  const radius = 110;
  const angleStep = (2 * Math.PI) / metrics.length;

  function point(value: number, i: number): [number, number] {
    const angle = -Math.PI / 2 + i * angleStep;
    const r = (value / 100) * radius;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  }

  function axisPoint(i: number): [number, number] {
    const angle = -Math.PI / 2 + i * angleStep;
    return [center + radius * Math.cos(angle), center + radius * Math.sin(angle)];
  }

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      {/* Product selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {products.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setActiveIdx(i)}
            className={\`px-4 py-2 rounded-full text-sm font-medium transition-all border \${
              activeIdx === i
                ? 'text-[#1C1F26]'
                : 'text-[#8B95A5] hover:text-[#F2F0ED] border-[#3A4250]/40'
            }\`}
            style={activeIdx === i ? { backgroundColor: p.color, borderColor: p.color } : {}}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
        {/* Radar SVG */}
        <div className="flex justify-center">
          <svg width={size} height={size} viewBox={\`0 0 \${size} \${size}\`}>
            {/* Grid rings */}
            {[0.25, 0.5, 0.75, 1].map((r) => (
              <polygon
                key={r}
                points={metrics
                  .map((_, i) => {
                    const [x, y] = point(r * 100, i);
                    return \`\${x},\${y}\`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#3A4250"
                strokeWidth="0.5"
                opacity={0.5}
              />
            ))}

            {/* Axes */}
            {metrics.map((_, i) => {
              const [x, y] = axisPoint(i);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="#3A4250"
                  strokeWidth="0.5"
                  opacity={0.4}
                />
              );
            })}

            {/* Data polygon */}
            <polygon
              points={metrics
                .map((m, i) => {
                  const [x, y] = point(products[activeIdx].values[m.key], i);
                  return \`\${x},\${y}\`;
                })
                .join(' ')}
              fill={products[activeIdx].color}
              fillOpacity={0.2}
              stroke={products[activeIdx].color}
              strokeWidth={2}
              style={{ transition: 'all 0.4s' }}
            />

            {/* Data dots */}
            {metrics.map((m, i) => {
              const [x, y] = point(products[activeIdx].values[m.key], i);
              return (
                <circle
                  key={m.key}
                  cx={x}
                  cy={y}
                  r={hoveredMetric === m.key ? 6 : 4}
                  fill={products[activeIdx].color}
                  style={{ transition: 'all 0.2s' }}
                />
              );
            })}

            {/* Metric labels */}
            {metrics.map((m, i) => {
              const [x, y] = axisPoint(i);
              const labelOffset = 20;
              const dx = (x - center) * (1 + labelOffset / radius);
              const dy = (y - center) * (1 + labelOffset / radius);
              return (
                <text
                  key={m.key}
                  x={center + dx}
                  y={center + dy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-[#8B95A5] text-[10px] font-medium cursor-pointer"
                  onMouseEnter={() => setHoveredMetric(m.key)}
                  onMouseLeave={() => setHoveredMetric(null)}
                  style={{ fill: hoveredMetric === m.key ? '#DAA745' : undefined }}
                >
                  {m.label}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Score breakdown */}
        <div className="space-y-2 min-w-[200px]">
          {metrics.map((m) => {
            const value = products[activeIdx].values[m.key];
            const active = hoveredMetric === m.key;
            return (
              <div
                key={m.key}
                className={\`p-2 rounded transition-colors \${
                  active ? 'bg-[#DAA745]/10' : ''
                }\`}
                onMouseEnter={() => setHoveredMetric(m.key)}
                onMouseLeave={() => setHoveredMetric(null)}
              >
                <div className="flex justify-between text-xs mb-1">
                  <span className={active ? 'text-[#DAA745]' : 'text-[#8B95A5]'}>
                    {m.label}
                  </span>
                  <span className="text-[#F2F0ED] font-mono">{value}</span>
                </div>
                <div className="h-1 bg-[#3A4250]/40 rounded">
                  <div
                    className="h-full rounded transition-all duration-500"
                    style={{ width: \`\${value}%\`, backgroundColor: products[activeIdx].color }}
                  />
                </div>
              </div>
            );
          })}
          {hoveredMetric && (
            <p className="text-xs text-[#8B95A5] italic mt-3 leading-relaxed">
              {metrics.find((m) => m.key === hoveredMetric)?.hint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
`);

// ─── 3. Interactive component: IGUvsLamiCrossSection (SVG) ──────────────────

ensure(join(SRC, 'components', 'blog', 'article-2', 'IGUvsLamiCrossSection.tsx'), `'use client';

import { useState } from 'react';

export default function IGUvsLamiCrossSection() {
  const [side, setSide] = useState<'igu' | 'lami'>('igu');

  return (
    <div className="my-10 bg-[#3A4250]/10 border border-[#3A4250]/20 rounded-xl p-6 md:p-8">
      {/* Toggle */}
      <div className="flex gap-2 mb-6 justify-center">
        <button
          onClick={() => setSide('igu')}
          className={\`px-5 py-2 rounded-full text-sm font-medium transition-colors \${
            side === 'igu'
              ? 'bg-blue-500 text-white'
              : 'bg-[#1C1F26]/40 text-[#8B95A5] border border-[#3A4250]/40'
          }\`}
        >
          Insulated Glass Cross-Section
        </button>
        <button
          onClick={() => setSide('lami')}
          className={\`px-5 py-2 rounded-full text-sm font-medium transition-colors \${
            side === 'lami'
              ? 'bg-amber-500 text-[#1C1F26]'
              : 'bg-[#1C1F26]/40 text-[#8B95A5] border border-[#3A4250]/40'
          }\`}
        >
          Laminated Glass Cross-Section
        </button>
      </div>

      <div className="flex justify-center">
        {side === 'igu' ? (
          <svg viewBox="0 0 500 240" className="w-full max-w-xl" xmlns="http://www.w3.org/2000/svg">
            {/* Outer glass pane */}
            <rect x="80" y="40" width="30" height="160" fill="#A5F3FC" fillOpacity="0.5" stroke="#60A5FA" strokeWidth="2" />
            {/* Spacer */}
            <rect x="110" y="40" width="120" height="160" fill="#1F2937" fillOpacity="0.2" />
            <rect x="110" y="40" width="120" height="12" fill="#64748B" />
            <rect x="110" y="188" width="120" height="12" fill="#64748B" />
            {/* Low-E coating hint */}
            <line x1="112" y1="40" x2="112" y2="200" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4,2" />
            {/* Inner glass pane */}
            <rect x="230" y="40" width="30" height="160" fill="#A5F3FC" fillOpacity="0.5" stroke="#60A5FA" strokeWidth="2" />

            {/* Labels */}
            <text x="95" y="30" textAnchor="middle" className="fill-[#F2F0ED] text-[11px] font-medium">Outer</text>
            <text x="95" y="220" textAnchor="middle" className="fill-[#8B95A5] text-[10px]">6mm Low-E</text>
            <text x="170" y="30" textAnchor="middle" className="fill-[#F2F0ED] text-[11px] font-medium">Argon-filled Gap</text>
            <text x="170" y="220" textAnchor="middle" className="fill-[#8B95A5] text-[10px]">12mm, warm-edge spacer</text>
            <text x="245" y="30" textAnchor="middle" className="fill-[#F2F0ED] text-[11px] font-medium">Inner</text>
            <text x="245" y="220" textAnchor="middle" className="fill-[#8B95A5] text-[10px]">6mm clear</text>

            {/* Arrows + annotations on the right */}
            <text x="300" y="60" className="fill-[#DAA745] text-[12px] font-medium">● Low-E coating</text>
            <text x="310" y="78" className="fill-[#8B95A5] text-[10px]">Reflects infrared heat</text>

            <text x="300" y="110" className="fill-[#DAA745] text-[12px] font-medium">● Argon gas fill</text>
            <text x="310" y="128" className="fill-[#8B95A5] text-[10px]">Thermal conductivity ~⅔ of air</text>

            <text x="300" y="160" className="fill-[#DAA745] text-[12px] font-medium">● Warm-edge spacer</text>
            <text x="310" y="178" className="fill-[#8B95A5] text-[10px]">Prevents edge condensation</text>
          </svg>
        ) : (
          <svg viewBox="0 0 500 240" className="w-full max-w-xl" xmlns="http://www.w3.org/2000/svg">
            {/* Outer glass */}
            <rect x="100" y="40" width="30" height="160" fill="#FEF3C7" fillOpacity="0.5" stroke="#FBBF24" strokeWidth="2" />
            {/* PVB interlayer */}
            <rect x="130" y="40" width="6" height="160" fill="#DC2626" fillOpacity="0.7" />
            {/* Inner glass */}
            <rect x="136" y="40" width="30" height="160" fill="#FEF3C7" fillOpacity="0.5" stroke="#FBBF24" strokeWidth="2" />

            {/* Crack simulation on outer only */}
            <path d="M 115 80 L 108 100 M 115 80 L 122 95 M 115 80 L 118 110" stroke="#1F2937" strokeWidth="1" opacity="0.6" />

            {/* Labels */}
            <text x="115" y="30" textAnchor="middle" className="fill-[#F2F0ED] text-[11px] font-medium">Outer</text>
            <text x="115" y="220" textAnchor="middle" className="fill-[#8B95A5] text-[10px]">5mm glass</text>
            <text x="133" y="30" textAnchor="middle" className="fill-[#DC2626] text-[10px] font-medium">PVB</text>
            <text x="133" y="220" textAnchor="middle" className="fill-[#8B95A5] text-[10px]">0.76mm</text>
            <text x="151" y="30" textAnchor="middle" className="fill-[#F2F0ED] text-[11px] font-medium">Inner</text>
            <text x="151" y="220" textAnchor="middle" className="fill-[#8B95A5] text-[10px]">5mm glass</text>

            {/* Arrows + annotations on the right */}
            <text x="220" y="60" className="fill-[#DAA745] text-[12px] font-medium">● PVB interlayer</text>
            <text x="230" y="78" className="fill-[#8B95A5] text-[10px]">Bonds glass; absorbs vibration/sound</text>

            <text x="220" y="110" className="fill-[#DAA745] text-[12px] font-medium">● On impact</text>
            <text x="230" y="128" className="fill-[#8B95A5] text-[10px]">Glass cracks but stays bonded to PVB</text>

            <text x="220" y="160" className="fill-[#DAA745] text-[12px] font-medium">● Blocks 99% UV</text>
            <text x="230" y="178" className="fill-[#8B95A5] text-[10px]">PVB inherently UV-filtering</text>
          </svg>
        )}
      </div>

      <p className="text-xs text-[#8B95A5] text-center mt-4 italic">
        {side === 'igu'
          ? 'Insulated Glass Unit (IGU) — two panes bonded around a sealed gas-filled cavity. Thermal performance is the engineered priority.'
          : 'Laminated Glass — two panes permanently bonded with a polymer interlayer. Safety and acoustic performance are the engineered priorities.'}
      </p>
    </div>
  );
}
`);

// ─── 4. Main article page.tsx ───────────────────────────────────────────────

ensure(join(SRC, 'app', 'blog', 'insulated-glass-vs-laminated-glass', 'page.tsx'), `import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, {
  generateArticleMetadata,
  articleJsonLd,
  type TOCItem,
} from '@/components/blog/BlogArticleLayout';
import TLDRBox from '@/components/blog/TLDRBox';
import LeadMagnetCTA from '@/components/blog/LeadMagnetCTA';
import CostDisclaimer from '@/components/blog/CostDisclaimer';
import RelatedProductsCards from '@/components/blog/RelatedProductsCards';
import { FAQ, TechNote } from '@/components/blog/blocks';
import BuyerScenarioPicker from '@/components/blog/article-2/BuyerScenarioPicker';
import PerformanceRadarChart from '@/components/blog/article-2/PerformanceRadarChart';
import IGUvsLamiCrossSection from '@/components/blog/article-2/IGUvsLamiCrossSection';

const SLUG = 'insulated-glass-vs-laminated-glass';
const article: BlogArticle = blogArticles.find((a) => a.slug === SLUG)!;

export const metadata = generateArticleMetadata(article);

const toc: TOCItem[] = [
  { id: 'five-scenarios', text: 'Five Buyers, Five Different Answers', level: 2 },
  { id: 'anatomy', text: 'What Each Glass Actually Is (Anatomy View)', level: 2 },
  { id: 'performance', text: 'Performance Head-to-Head: 5 Metrics', level: 2 },
  { id: 'combine', text: 'The "Both" Answer: Laminated IGU', level: 2 },
  { id: 'cost-reality', text: 'Cost & Lead Time Reality', level: 2 },
  { id: 'other-paths', text: 'Other Paths Buyers Consider', level: 2 },
  { id: 'faq', text: 'Buyer FAQ', level: 2 },
];

const buyerFaqItems = [
  {
    q: "What's the MOQ for insulated glass units from Sincere Glass?",
    a: "Our standard MOQ for custom IGU orders is 50 square meters, with no restriction on panel size up to our furnace maximum of 3m × 15m. For small boutique projects, we accept trial orders at reduced MOQ with a nominal setup fee. Contact our team for a quote.",
  },
  {
    q: 'Can you produce a laminated IGU (combined unit)?',
    a: 'Yes. Our 20,000 m² Wuhan facility runs both a 3m × 15m tempering furnace and a 3m × 15m high-pressure laminating autoclave, which means we can produce the laminated outer lite and bond it into an IGU in the same production flow. This is the configuration we recommend for premium facades.',
  },
  {
    q: 'What certifications ship with insulated and laminated glass?',
    a: "All insulated and laminated glass we produce is 3C (CCC) certified under China's mandatory product certification system — GB 15763.3-2009 for laminated glass, GB/T 11944-2012 for insulated glass. For export orders, we can also provide test reports suitable for CE, SGCC, or local-market compliance review on request.",
  },
  {
    q: "What's a typical lead time for a combined laminated IGU order?",
    a: 'For a custom laminated IGU order, our standard production cycle is 15-20 working days from order confirmation, depending on coating availability (Low-E) and the complexity of edge treatments. Simple IGU-only or laminated-only orders ship in 10-15 working days.',
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
        <TLDRBox items={[
          'Insulated glass (IGU) is for thermal insulation; laminated glass is for safety and sound.',
          'Low-E coated IGU can cut heating/cooling bills by 30-50% — laminated glass changes U-value negligibly.',
          'Laminated glass is code-required for overhead glazing, balustrades, and most storefronts; IGU is not.',
          'For premium facades, use a laminated IGU — the laminated lite handles safety/acoustics, the IGU handles thermal.',
          'Expect laminated IGU to cost roughly 1.6-2× a plain tempered IGU of equal spec.',
        ]} />

        <p>
          A buyer sends us drawings and asks: "Do I need insulated or laminated glass here?"
          This is the most common question we get after "what thickness?" — and the right answer
          almost never comes from a spec sheet. It comes from the <strong>problem the glass is
          solving</strong>: cold weather, street noise, impact risk, an overhead code requirement,
          or some combination of them. This guide walks through how to decide — not with a feature
          checklist, but with the five scenarios most buyers actually fit into.
        </p>

        <p>
          If you've already read our{' '}
          <a href="/blog/tempered-glass-vs-laminated-glass">
            comparison of tempered vs laminated glass
          </a>, you've seen the strength and safety dimension. This article is the
          complementary cut: insulation vs lamination, with the "do I need both?" question
          answered honestly.
        </p>

        <h2 id="five-scenarios">Five Buyers, Five Different Answers</h2>

        <p>
          Pick the scenario that most resembles your project. Our recommendation changes with
          the problem — the same specification table does not fit a Beijing office tower, a
          Parisian apartment facing a busy boulevard, and a Miami beachfront villa.
        </p>

        <BuyerScenarioPicker />

        <TechNote type="tip" title="A pattern in the recommendations">
          <p>
            Insulated glass wins when the <strong>envelope performance</strong> matters most —
            cold climates, HVAC-sensitive buildings. Laminated glass wins when{' '}
            <strong>human safety and user comfort</strong> matter most — overhead,
            street-facing, high-traffic. When both matter, you combine them. The decision is
            rarely about the glass itself; it's about which failure mode you can't accept.
          </p>
        </TechNote>

        <h2 id="anatomy">What Each Glass Actually Is (Anatomy View)</h2>

        <p>
          Specs lie about structure. Toggle the cross-section below to see what you're actually
          buying when you spec an IGU versus a laminated unit. Note that these are different{' '}
          <em>categories</em> of product — not alternatives in the sense that tempered and
          heat-strengthened are. One addresses energy; the other addresses impact and sound.
        </p>

        <IGUvsLamiCrossSection />

        <p>
          <strong>An IGU is a <em>system</em></strong>: two or more glass lites, a sealed cavity
          with gas fill (argon is standard; krypton for premium), warm-edge spacers to minimize
          thermal bridging at the perimeter, and typically a Low-E coating on the inner surface
          of one lite. The engineering problem it solves is <em>heat transfer</em>. Governed by{' '}
          <a href="https://www.en-standard.eu/csn-en-1279-1-glass-in-building-insulating-glass-units-part-1-generalities-system-description-rules-for-substitution-tolerances-and-visual-quality/" target="_blank" rel="noopener">EN 1279</a>{' '}
          (Europe) and GB/T 11944-2012 §5.3 (China).
        </p>

        <p>
          <strong>Laminated glass is a <em>bonded assembly</em></strong>: two or more glass lites
          permanently joined by a polymer interlayer (PVB is standard; SGP for structural/hurricane;
          EVA for decorative inclusions). The engineering problem it solves is <em>what happens on
          impact</em>: broken glass remains adhered to the interlayer instead of becoming airborne
          shards. Governed by{' '}
          <a href="https://codes.iccsafe.org/content/IBC2021P2/chapter-24-glass-and-glazing" target="_blank" rel="noopener">IBC 2021 §2406.4.1</a>{' '}
          and GB 15763.3-2009 §5.2.
        </p>

        <p>
          In our 20,000 m² Wuhan facility, we produce both on parallel lines — two insulated
          glass lines (one is an ultra-large automatic argon-fill line) and two high-pressure
          laminating autoclaves (one 3m × 15m, among the largest in Hubei province). This matters
          because a <em>combined</em> laminated-IGU unit requires both processes to run in
          sequence on compatible lites, and few mid-tier factories can do this in one shop.
        </p>

        <h2 id="performance">Performance Head-to-Head: 5 Metrics</h2>

        <p>
          Hover any metric below to see what it measures and why one product dominates. Note
          that <strong>no single product wins all five</strong> — this is why the "combined"
          option exists.
        </p>

        <PerformanceRadarChart />

        <p>
          Three honest observations about this chart:
        </p>

        <ul>
          <li>
            <strong>Thermal (U-value):</strong> A standard IGU achieves U-value of 2.6-2.8
            W/m²·K (6+12A+6 clear); with Low-E coating and argon fill, this drops to 1.4-1.8.
            A single laminated unit sits at ~5.6 — essentially the same as single glazing.
            There is no shortcut around physics here.
          </li>
          <li>
            <strong>Acoustic (STC):</strong> A plain 6mm IGU rates ~STC 29. A 6.38mm acoustic
            laminated unit rates ~STC 36. The PVB interlayer is a mechanical damper; the air
            gap is a mass-air-mass system that behaves differently across frequencies.
          </li>
          <li>
            <strong>Cost efficiency:</strong> This isn't absolute low price — it's performance
            per RMB. A laminated IGU scores lower because you're paying for both processes,
            but if your project genuinely needs both, splitting the specification into two
            separate products costs more and performs worse at the interfaces.
          </li>
        </ul>

        <LeadMagnetCTA variant="inline" />

        <h2 id="combine">The "Both" Answer: Laminated IGU</h2>

        <p>
          For premium architectural projects — luxury residential, high-end hospitality,
          coastal/hurricane zones, acoustic-critical urban buildings — the answer is often
          "both," configured as a <strong>laminated IGU</strong>: a laminated outer lite + air
          gap + Low-E coated tempered inner lite. The outer lite handles impact and acoustic
          duty; the IGU cavity handles thermal duty.
        </p>

        <TechNote type="note" title="Typical premium facade spec">
          <p>
            Outer lite: <strong>6mm clear + 1.52mm SGP + 6mm clear</strong> laminated. <br />
            Cavity: <strong>12mm, argon-filled, warm-edge spacer</strong>. <br />
            Inner lite: <strong>6mm Low-E tempered</strong>, coating on surface #3. <br />
            Total build-up: ~31.52mm. U-value ~1.5 W/m²·K. STC ~38. Hurricane-rated. Low-E
            reflects IR heat without reducing daylight.
          </p>
        </TechNote>

        <p>
          If you are specifying a facade for a project that will outlive its building management
          team, this is the configuration we recommend — not because it's the most expensive,
          but because it addresses every failure mode a glass envelope can have simultaneously.
          See our{' '}
          <a href="/products/insulated-glass">insulated glass product page</a> for build-up
          options and our <a href="/products/laminated-glass">laminated glass page</a> for PVB
          vs SGP interlayer selection guidance.
        </p>

        <h2 id="cost-reality">Cost & Lead Time Reality</h2>

        <p>
          Approximate 2026 FOB Wuhan reference pricing for a 6mm clear baseline:
        </p>

        <ul>
          <li><strong>Monolithic tempered 6mm:</strong> ~$18-22 /m²</li>
          <li><strong>Insulated glass 6+12A+6 (clear):</strong> ~$42-50 /m²</li>
          <li><strong>Insulated with Low-E:</strong> ~$55-68 /m²</li>
          <li><strong>Laminated 6.38mm (PVB):</strong> ~$38-45 /m²</li>
          <li><strong>Laminated IGU (6+1.52+6/12A/6 Low-E):</strong> ~$95-120 /m²</li>
        </ul>

        <CostDisclaimer />

        <p>
          Lead times from our facility: IGU-only or laminated-only orders ship in 10-15 working
          days from order confirmation. Combined laminated IGU orders run 15-20 working days,
          with Low-E coating availability the typical bottleneck (we stock standard soft-coat
          Low-E glass but hard-coat and specialty coatings may add 5-7 days).
        </p>

        <h2 id="other-paths">Other Paths Buyers Consider</h2>

        <p>
          Not every project needs IGU or laminated. A few adjacent options worth knowing:
        </p>

        <ul>
          <li>
            <strong>Monolithic tempered glass</strong> — the cheapest safety glass. Appropriate
            for shower enclosures, interior partitions, furniture, non-overhead balustrades.
            See our{' '}
            <a href="/blog/tempered-glass-vs-laminated-glass">tempered vs laminated comparison</a>{' '}
            for the safety-glass selection logic.
          </li>
          <li>
            <strong>Low-E glass alone (monolithic)</strong> — rare in architectural applications
            because the coating must be protected inside a cavity to maintain emissivity. If a
            spec calls for "Low-E glass," it almost always means Low-E as part of an IGU. See
            our <a href="/products/low-e-glass">Low-E glass product page</a> for coating details.
          </li>
          <li>
            <strong>Enameled or ceramic frit glass</strong> — a surface treatment, not an
            alternative to IGU/laminated. Can be applied to either as spandrel treatment or
            decorative pattern. See our{' '}
            <a href="/products/enameled-glass">enameled glass page</a>.
          </li>
          <li>
            <strong>Triple-glazed IGU (6+12A+6+12A+6)</strong> — pushes U-value to ~0.8 but adds
            weight, cost, and makes handling difficult. Common in Passive House construction;
            rare elsewhere.
          </li>
        </ul>

        <FAQ items={buyerFaqItems} />

        <RelatedProductsCards slugs={['insulated-glass', 'laminated-glass', 'low-e-glass']} />

        <LeadMagnetCTA variant="footer" />
      </BlogArticleLayout>
    </>
  );
}
`);

// ─── 5. Patch blog-registry.ts — append article #2 ──────────────────────────

function patchRegistry() {
  const p = join(SRC, 'lib', 'blog-registry.ts');
  if (!existsSync(p)) { log('❌ blog-registry.ts not found'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes("'insulated-glass-vs-laminated-glass'")) {
    log('⚠️  Article #2 already in registry — skipping');
    return;
  }

  const newEntry = `
  {
    slug: 'insulated-glass-vs-laminated-glass',
    title: 'Insulated Glass vs Laminated Glass: Which One Does Your Project Actually Need?',
    excerpt: 'IGU for thermal insulation. Laminated for safety and sound. Pick by scenario (not by spec sheet) with 5 buyer archetypes, performance radar comparison, and cost reality from a Wuhan factory.',
    targetKeyword: 'insulated glass vs laminated glass',
    secondaryKeywords: ['IGU vs laminated glass', 'laminated vs insulated', 'double glazing vs laminated', 'IG vs PVB glass'],
    searchKeywords: [
      'insulated vs laminated', 'laminated vs insulated', 'IGU vs laminated',
      'IG vs laminated', 'double glazing vs laminated', 'thermal vs acoustic glass',
      'IGU', 'PVB', 'SGP', 'U-value', 'STC', 'Low-E', 'argon fill',
      '中空玻璃 夹胶玻璃', '中空 夹胶 对比', '隔音 隔热 玻璃', '玻璃选型 中空 夹胶',
    ],
    publishDate: '2026-10-07',
    updatedDate: '2026-10-07',
    category: 'Buyer Guide' as const,
    tags: ['insulated glass', 'laminated glass', 'IGU', 'PVB', 'acoustic glass', 'thermal performance'],
    heroImage: '/images/blog/insulated-vs-laminated-hero.webp',
    heroImageAlt: 'Side-by-side cross-section comparison: insulated glass unit with argon gap vs laminated glass with PVB interlayer',
    heroImagePrompt: 'Studio product photography, two architectural glass samples side by side on polished dark concrete surface. Left: insulated glass unit cross-section showing two glass panes separated by a visible aluminum spacer with argon-gap, Low-E coating gives subtle gold tint to inner surface. Right: laminated glass cross-section showing two glass panes bonded by thin translucent PVB interlayer with one small spider-web crack held in place by the interlayer. 45-degree camera angle, soft daylight from above-left, shallow depth of field. Neutral grey and warm amber accent lighting. No text, no humans, 4K photorealistic, museum-exhibit quality.',
    author: DEFAULT_AUTHOR,
    readingTime: 11,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'comparison' as const,
    cluster: 'comparison',
    relatedProductSlugs: ['insulated-glass', 'laminated-glass', 'low-e-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-07', note: 'Initial publish' },
    ],
  },`;

  // Insert before the closing `];` of blogArticles array
  const closingBracket = c.indexOf('];', c.indexOf('export const blogArticles'));
  if (closingBracket === -1) {
    log('❌ Could not locate blogArticles array end');
    return;
  }
  c = c.slice(0, closingBracket) + newEntry + '\n' + c.slice(closingBracket);
  writeFileSync(p, c);
  log('✅ blog-registry.ts — Article #2 entry appended');
}

patchRegistry();

// ─── 6. Patch Article #1 — add reciprocal intra-cluster link ────────────────

function patchArticle1() {
  const p = join(SRC, 'app', 'blog', 'tempered-glass-vs-laminated-glass', 'page.tsx');
  if (!existsSync(p)) { log('⚠️  Article #1 page not found — skip reciprocal link'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('insulated-glass-vs-laminated-glass')) {
    log('⚠️  Article #1 already links to Article #2 — skipping');
    return;
  }

  // Find a reasonable injection point — just before the closing </BlogArticleLayout>
  const marker = '<RelatedProductsCards';
  if (c.includes(marker)) {
    const injection = [
      '<p>',
      '          Already decided on laminated for safety? The next question is whether you also need',
      '          insulated glass for thermal performance — see our{\' \'}',
      '          <a href="/blog/insulated-glass-vs-laminated-glass">',
      '            insulated vs laminated glass selection guide',
      '          </a>{\' \'}',
      '          for the five buyer scenarios where one, the other, or both make sense.',
      '        </p>',
      '',
      '        ',
    ].join('\n');
    c = c.replace(marker, injection + marker);
    writeFileSync(p, c);
    log('✅ Article #1 — reciprocal link to Article #2 added (satisfies C18)');
  } else {
    log('⚠️  Could not locate RelatedProductsCards in Article #1 — add link manually');
  }
}

patchArticle1();

// ─── Done ───────────────────────────────────────────────────────────────────

log('');
log('━'.repeat(60));
log('🎉 Article #2 delivered.');
log('━'.repeat(60));
log('');
log('Files created:');
log('  src/components/blog/article-2/BuyerScenarioPicker.tsx');
log('  src/components/blog/article-2/PerformanceRadarChart.tsx');
log('  src/components/blog/article-2/IGUvsLamiCrossSection.tsx');
log('  src/app/blog/insulated-glass-vs-laminated-glass/page.tsx');
log('');
log('Files patched:');
log('  src/lib/blog-registry.ts   (+ Article #2 entry)');
log('  src/app/blog/tempered-glass-vs-laminated-glass/page.tsx   (+ reciprocal link)');
log('');
log('Next steps:');
log('  1. npm run build  → verify TypeScript');
log('  2. npm run dev    → visit /blog/insulated-glass-vs-laminated-glass');
log('  3. Add hero image: /public/images/blog/insulated-vs-laminated-hero.webp');
log('     (use the heroImagePrompt from the registry entry)');
log('  4. git push → Vercel deploys');
log('  5. Google Search Console → Request Indexing');
log('  6. Update SOP cluster count table: comparison 1 → 2');
log('     (one more comparison article unlocks the Pillar Page)');
log('');
