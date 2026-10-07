/**
 * deploy-article-6.mjs
 *
 * One-click deployment for Article #6 (how-is-insulated-glass-made).
 * Reads .tsx.txt templates from this script's directory and copies them to the
 * correct src/ paths. No embedded TSX strings — avoids all nesting bugs.
 *
 * REQUIRED template files in same edit\ folder:
 *   - IGUAnatomyExplorer.tsx.txt
 *   - GasConductivityChart.tsx.txt
 *   - SealLifespanTimeline.tsx.txt
 *   - article-6-page.tsx.txt
 *
 * Run: node edit\deploy-article-6.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));

const log = (m) => console.log(m);

function ensureDir(filePath) {
  const d = dirname(filePath);
  if (!existsSync(d)) mkdirSync(d, { recursive: true });
}

function copyTemplate(templateName, destPath) {
  const src = join(SCRIPT_DIR, templateName);
  if (!existsSync(src)) {
    log('❌ Template not found: ' + src);
    log('   Make sure all .tsx.txt files are in your edit\\ folder');
    return false;
  }
  const content = readFileSync(src, 'utf-8');
  ensureDir(destPath);
  writeFileSync(destPath, content, 'utf-8');
  log('✅ ' + destPath.replace(ROOT, '').replace(/\\/g, '/'));
  return true;
}

// ─── 1. Copy 3 components + page ────────────────────────────────────────────

const COMP_DIR = join(SRC, 'components', 'blog', 'article-6');

copyTemplate('IGUAnatomyExplorer.tsx.txt', join(COMP_DIR, 'IGUAnatomyExplorer.tsx'));
copyTemplate('GasConductivityChart.tsx.txt', join(COMP_DIR, 'GasConductivityChart.tsx'));
copyTemplate('SealLifespanTimeline.tsx.txt', join(COMP_DIR, 'SealLifespanTimeline.tsx'));

const PAGE_PATH = join(SRC, 'app', 'blog', 'how-is-insulated-glass-made', 'page.tsx');
copyTemplate('article-6-page.tsx.txt', PAGE_PATH);

// ─── 2. Append registry entry ───────────────────────────────────────────────

function patchRegistry() {
  const p = join(SRC, 'lib', 'blog-registry.ts');
  if (!existsSync(p)) { log('❌ blog-registry.ts not found'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes("'how-is-insulated-glass-made'")) {
    log('⚠️  Article #6 already in registry — skipping');
    return;
  }

  const parts = [
    "",
    "  {",
    "    slug: 'how-is-insulated-glass-made',",
    `    title: "How Is Insulated Glass Made? Inside the 25-Year Sealed System That Cuts Heat Loss by 70%",`,
    `    excerpt: "An IGU is not just two panes with a gap. Five components, 8 assembly stations, dual-seal chemistry, argon fill mechanics, and the QC tests that separate a 30-year unit from a 10-year failure. Factory walk-through from Wuhan.",`,
    "    targetKeyword: 'how is insulated glass made',",
    "    secondaryKeywords: ['insulated glass manufacturing', 'IGU production process', 'how insulated glass is made', 'double glazing production', 'insulated glass assembly'],",
    "    searchKeywords: [",
    "      'how is insulated glass made', 'insulated glass manufacturing', 'IGU production',",
    "      'double glazing production', 'IGU assembly', 'insulated glass unit production',",
    "      'how to make IGU', 'argon fill IGU', 'warm edge spacer', 'IGU dual seal',",
    "      'IGU', 'DGU', 'spacer bar', 'desiccant', 'PIB', 'silicone secondary seal',",
    "      '中空玻璃生产', '中空玻璃工艺', '中空玻璃组装', '氩气填充',",
    "    ],",
    "    publishDate: '2026-10-07',",
    "    updatedDate: '2026-10-07',",
    "    category: 'Technical Guide' as const,",
    "    tags: ['insulated glass', 'IGU', 'manufacturing', 'argon fill', 'warm-edge spacer', 'production process'],",
    "    heroImage: '/images/blog/how-insulated-glass-made-hero.webp',",
    "    heroImageAlt: 'Industrial insulated glass unit assembly line showing a large IGU being sealed with argon gas injection and dual seal application',",
    `    heroImagePrompt: 'Industrial photography of a modern automated insulated glass unit (IGU) production line. Center frame: a large architectural glass panel (approximately 2m x 3m) with visible aluminum spacer bar being assembled into a sealed IGU. Fine jets of argon gas filling the cavity between two glass lites, with black butyl primary seal visible along the edges and silicone secondary seal being applied by robotic arm. Background: continuous production line with multiple IGU panels at various stations. Industrial lighting from overhead with warm amber accent lighting on the glass creating subtle reflections. 25-degree camera angle from the operator viewing position, shallow depth of field focused on the central panel. Clean modern factory environment, visible safety barriers, pressure gauges, and gas supply lines. No humans in frame. 4K photorealistic, documentary-style, no text or watermarks.',`,
    "    author: DEFAULT_AUTHOR,",
    "    readingTime: 16,",
    "    featured: false,",
    "    reviewedBy: { name: 'Albar', title: 'Technical Lead' },",
    "    articleType: 'technical' as const,",
    "    cluster: 'technical',",
    "    relatedProductSlugs: ['insulated-glass', 'low-e-glass', 'laminated-glass'],",
    "    translations: {},",
    "    changelog: [",
    "      { date: '2026-10-07', note: 'Initial publish — third article in Technical Guides cluster (unlocks Pillar)' },",
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
  log('✅ blog-registry.ts — Article #6 entry appended');
}

patchRegistry();

// ─── 3. Add reciprocal links in Technical #1 and #2 ─────────────────────────

function addReciprocalLink(articleSlug, injectionLines) {
  const p = join(SRC, 'app', 'blog', articleSlug, 'page.tsx');
  if (!existsSync(p)) { log('⚠️  ' + articleSlug + ' not found — skip'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('how-is-insulated-glass-made')) {
    log('⚠️  ' + articleSlug + ' already links to Article #6 — skipping');
    return;
  }

  const marker = '<RelatedProductsCards';
  if (!c.includes(marker)) {
    log('⚠️  ' + articleSlug + ' — no RelatedProductsCards marker');
    return;
  }

  const injection = injectionLines.join('\n');
  c = c.replace(marker, injection + marker);
  writeFileSync(p, c);
  log('✅ ' + articleSlug + ' — reciprocal link to Article #6 added');
}

addReciprocalLink('how-is-tempered-glass-made', [
  "",
  '        <TechNote type="note" title="Complete the trilogy">',
  '          <p>',
  "            See the third fabrication process in our Technical Guides series:{' '}",
  '            <a href="/blog/how-is-insulated-glass-made">',
  "              how insulated glass units (IGUs) are made",
  "            </a>{' '}",
  "            — the 5-component sealed system, argon fill mechanics, and dual-seal",
  "            chemistry that determines whether an IGU lasts 10 or 30 years.",
  '          </p>',
  '        </TechNote>',
  "",
  "        ",
]);

addReciprocalLink('how-is-laminated-glass-made', [
  "",
  '        <TechNote type="note" title="Complete the trilogy">',
  '          <p>',
  "            See the third fabrication process in our Technical Guides series:{' '}",
  '            <a href="/blog/how-is-insulated-glass-made">',
  "              how insulated glass units (IGUs) are made",
  "            </a>{' '}",
  "            — many of our customers specify laminated-IGU combined units, which run",
  "            through both the lamination autoclave and the IGU assembly line in sequence.",
  '          </p>',
  '        </TechNote>',
  "",
  "        ",
]);

// ─── Done ───────────────────────────────────────────────────────────────────

log('');
log('━'.repeat(60));
log('🎉 Article #6 deployed. Technical cluster NOW HAS 3 ARTICLES.');
log('━'.repeat(60));
log('');
log('🏛️  TECHNICAL CLUSTER PILLAR UNLOCKED');
log('   Next session can build /blog/architectural-glass-manufacturing-guide');
log('   as the Technical cluster Pillar Page.');
log('');
log('Verify:');
log('  1. npm run build  → should pass');
log('  2. npm run dev    → visit /blog/how-is-insulated-glass-made');
log('  3. Generate hero image per heroImagePrompt in registry');
log('     → save to public/images/blog/how-insulated-glass-made-hero.webp');
log('  4. git push');
log('');
