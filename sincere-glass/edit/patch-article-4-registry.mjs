/**
 * patch-article-4-registry.mjs
 *
 * Appends Article #4 registry entry to blog-registry.ts.
 * The TSX files are delivered separately — place them manually:
 *   src/components/blog/article-4/ProductionLineTimeline.tsx
 *   src/components/blog/article-4/TemperatureCurveChart.tsx
 *   src/components/blog/article-4/StressVisualization.tsx
 *   src/app/blog/how-is-tempered-glass-made/page.tsx
 *
 * Run: node edit\patch-article-4-registry.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const log = (m) => console.log(m);

function patchRegistry() {
  const p = join(SRC, 'lib', 'blog-registry.ts');
  if (!existsSync(p)) { log('❌ blog-registry.ts not found'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes("'how-is-tempered-glass-made'")) {
    log('⚠️  Article #4 already in registry — skipping');
    return;
  }

  const parts = [
    "",
    "  {",
    "    slug: 'how-is-tempered-glass-made',",
    `    title: "How Is Tempered Glass Made? A Factory-Floor Walk-Through of the 7-Phase Production Line",`,
    `    excerpt: "Not a textbook explanation. A production-floor walk-through: cutting tolerances, edge micro-cracks, 620°C furnace, the 15-second quench that locks in 4-5× strength, and the NiS risk nobody talks about. Written from a working Wuhan tempering line.",`,
    "    targetKeyword: 'how is tempered glass made',",
    "    secondaryKeywords: ['tempered glass manufacturing process', 'how tempered glass is made', 'tempered glass production', 'glass tempering process'],",
    "    searchKeywords: [",
    "      'how is tempered glass made', 'tempered glass manufacturing',",
    "      'glass tempering process', 'how to temper glass', 'tempered glass production line',",
    "      'glass quenching process', 'glass heat treatment', 'glass furnace tempering',",
    "      'tempering furnace', 'quench', 'surface compressive stress', 'NiS inclusion',",
    "      '钢化玻璃生产', '钢化玻璃工艺', '玻璃钢化流程', '玻璃淬火',",
    "    ],",
    "    publishDate: '2026-10-07',",
    "    updatedDate: '2026-10-07',",
    "    category: 'Technical Guide' as const,",
    "    tags: ['tempered glass', 'manufacturing', 'glass tempering', 'production process', 'quality control'],",
    "    heroImage: '/images/blog/how-tempered-glass-made-hero.webp',",
    "    heroImageAlt: 'Industrial glass tempering furnace with glowing orange glass panels passing through on ceramic rollers, viewed from the operator side',",
    `    heroImagePrompt: 'Industrial photography inside a modern glass tempering furnace. A large architectural glass panel (approximately 2m x 3m) glowing orange-red at ~620°C passing through a horizontal roller-hearth furnace on ceramic rollers, captured mid-production. Furnace interior with visible heating elements glowing deep red above and below the glass. Industrial lighting with warm amber glow from the furnace heat spilling onto adjacent dark machinery and concrete floor. 25-degree camera angle from the operator viewing window, shallow depth of field focused on the glowing glass panel. Realistic factory environment, visible safety barriers, no humans in frame. Dramatic contrast between the molten-looking orange glass and the surrounding dark industrial machinery. 4K photorealistic, documentary-style, no text or watermarks.',`,
    "    author: DEFAULT_AUTHOR,",
    "    readingTime: 14,",
    "    featured: false,",
    "    reviewedBy: { name: 'Albar', title: 'Technical Lead' },",
    "    articleType: 'technical' as const,",
    "    cluster: 'technical',",
    "    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'low-e-glass'],",
    "    translations: {},",
    "    changelog: [",
    "      { date: '2026-10-07', note: 'Initial publish — first article in Technical Guides cluster' },",
    "    ],",
    "  },",
    "",
  ];
  const newEntry = parts.join('\n');

  const closingBracket = c.indexOf('];', c.indexOf('export const blogArticles'));
  if (closingBracket === -1) {
    log('❌ Could not locate blogArticles array end');
    return;
  }
  c = c.slice(0, closingBracket) + newEntry + c.slice(closingBracket);
  writeFileSync(p, c);
  log('✅ blog-registry.ts — Article #4 entry appended (first in Technical cluster)');
}

log('');
log('🔧 Patch: Article #4 registry entry');
log('────────────────────────────────────────────────');
log('');

patchRegistry();

log('');
log('────────────────────────────────────────────────');
log('✅ Done. Now manually place these 4 TSX files:');
log('');
log('  1. ProductionLineTimeline.tsx  → src/components/blog/article-4/');
log('  2. TemperatureCurveChart.tsx   → src/components/blog/article-4/');
log('  3. StressVisualization.tsx     → src/components/blog/article-4/');
log('  4. article-4-page.tsx          → src/app/blog/how-is-tempered-glass-made/page.tsx');
log('     (rename to page.tsx when you drop it in)');
log('');
log('Then: npm run build → push.');
log('');
log('Note: Technical cluster now has 1 article (needs 2 more to unlock Pillar).');
log('');
