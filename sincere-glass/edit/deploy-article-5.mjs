/**
 * deploy-article-5.mjs
 *
 * TRUE one-click deployment for Article #5 (how-is-laminated-glass-made).
 *
 * This script does NOT embed any TSX content. Instead it reads the .tsx.txt
 * template files from the same directory and writes them to their final paths.
 * This completely avoids the template-string-nesting bugs that plagued earlier
 * patches.
 *
 * REQUIRED: all 4 template files must sit in the same `edit\` folder next to
 * this script:
 *   - PVBvsSGPComparison.tsx.txt
 *   - AutoclaveCurveChart.tsx.txt
 *   - DelaminationFailureViewer.tsx.txt
 *   - article-5-page.tsx.txt
 *
 * Run: node edit\deploy-article-5.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname, resolve } from 'path';
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

// ─── 1. Copy 3 interactive components ───────────────────────────────────────

const COMP_DIR = join(SRC, 'components', 'blog', 'article-5');

copyTemplate('PVBvsSGPComparison.tsx.txt', join(COMP_DIR, 'PVBvsSGPComparison.tsx'));
copyTemplate('AutoclaveCurveChart.tsx.txt', join(COMP_DIR, 'AutoclaveCurveChart.tsx'));
copyTemplate('DelaminationFailureViewer.tsx.txt', join(COMP_DIR, 'DelaminationFailureViewer.tsx'));

// ─── 2. Copy the page.tsx ───────────────────────────────────────────────────

const PAGE_PATH = join(SRC, 'app', 'blog', 'how-is-laminated-glass-made', 'page.tsx');
copyTemplate('article-5-page.tsx.txt', PAGE_PATH);

// ─── 3. Append registry entry ───────────────────────────────────────────────

function patchRegistry() {
  const p = join(SRC, 'lib', 'blog-registry.ts');
  if (!existsSync(p)) { log('❌ blog-registry.ts not found'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes("'how-is-laminated-glass-made'")) {
    log('⚠️  Article #5 already in registry — skipping');
    return;
  }

  const parts = [
    "",
    "  {",
    "    slug: 'how-is-laminated-glass-made',",
    `    title: "How Is Laminated Glass Made? Inside the Autoclave That Chemically Fuses Glass to PVB",`,
    `    excerpt: "Not just 'two panes with plastic between.' A factory walk-through of the lamination autoclave cycle: 140°C, 12 bar, 2.5 hours — plus the PVB vs SGP decision, dust-free assembly, and the defects nobody writes about.",`,
    "    targetKeyword: 'how is laminated glass made',",
    "    secondaryKeywords: ['laminated glass manufacturing process', 'how laminated glass is made', 'laminated glass production', 'glass lamination process'],",
    "    searchKeywords: [",
    "      'how is laminated glass made', 'laminated glass manufacturing',",
    "      'glass lamination process', 'how to laminate glass', 'laminated glass production line',",
    "      'autoclave lamination', 'PVB lamination', 'SGP lamination',",
    "      'autoclave', 'PVB', 'SGP', 'SentryGlas', 'EVA interlayer', 'acoustic PVB',",
    "      '夹胶玻璃生产', '夹胶玻璃工艺', '玻璃夹胶流程', 'PVB夹胶',",
    "    ],",
    "    publishDate: '2026-10-07',",
    "    updatedDate: '2026-10-07',",
    "    category: 'Technical Guide' as const,",
    "    tags: ['laminated glass', 'manufacturing', 'autoclave', 'PVB', 'SGP', 'production process'],",
    "    heroImage: '/images/blog/how-laminated-glass-made-hero.webp',",
    "    heroImageAlt: 'Industrial glass lamination autoclave with large laminated glass panels being loaded into the cylindrical pressure vessel, viewed from the loading end',",
    `    heroImagePrompt: 'Industrial photography of a glass lamination autoclave facility. A large cylindrical autoclave (approximately 3m diameter, 15m long) in a modern factory, cylindrical door open at the loading end revealing a stack of multi-layer architectural glass panels on a loading rack ready to enter. The glass panels show the characteristic translucent PVB interlayer sandwich (3 layers: glass + PVB + glass) with slight blue-green tint. Industrial lighting from overhead fluorescents mixing with warm amber accent lighting on the autoclave shell. Visible pressure gauges, control panel, and safety barriers in the frame. 20-degree camera angle from the operator viewing position, shallow depth of field focused on the open autoclave door and loaded panels. Clean industrial environment, no humans in frame. 4K photorealistic, documentary-style, no text or watermarks.',`,
    "    author: DEFAULT_AUTHOR,",
    "    readingTime: 15,",
    "    featured: false,",
    "    reviewedBy: { name: 'Albar', title: 'Technical Lead' },",
    "    articleType: 'technical' as const,",
    "    cluster: 'technical',",
    "    relatedProductSlugs: ['laminated-glass', 'tempered-glass', 'insulated-glass'],",
    "    translations: {},",
    "    changelog: [",
    "      { date: '2026-10-07', note: 'Initial publish — second article in Technical Guides cluster' },",
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
  log('✅ blog-registry.ts — Article #5 entry appended');
}

patchRegistry();

// ─── 4. Add reciprocal link in Technical #1 (how-is-tempered-glass-made) ────

function addReciprocalLink() {
  const p = join(SRC, 'app', 'blog', 'how-is-tempered-glass-made', 'page.tsx');
  if (!existsSync(p)) { log('⚠️  Article #4 (tempered-glass-made) not found — skip reciprocal link'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('how-is-laminated-glass-made')) {
    log('⚠️  Article #4 already links to Article #5 — skipping');
    return;
  }

  const marker = '<RelatedProductsCards';
  if (!c.includes(marker)) {
    log('⚠️  Could not find RelatedProductsCards marker in Article #4');
    return;
  }

  const injectionParts = [
    "",
    '        <TechNote type="note" title="Companion read">',
    '          <p>',
    "            Now that you know how tempered glass is made, see how its companion safety",
    "            product is produced in our{' '}",
    '            <a href="/blog/how-is-laminated-glass-made">',
    "              laminated glass production walk-through",
    "            </a>{' '}",
    "            — autoclave chemistry, PVB vs SGP interlayer selection, and the defects that",
    "            trace back to process discipline.",
    '          </p>',
    '        </TechNote>',
    "",
    "        ",
  ];
  const injection = injectionParts.join('\n');

  c = c.replace(marker, injection + marker);
  writeFileSync(p, c);
  log('✅ Article #4 (tempered-glass-made) — reciprocal link to Article #5 added');
}

addReciprocalLink();

// ─── Done ───────────────────────────────────────────────────────────────────

log('');
log('━'.repeat(60));
log('🎉 Article #5 deployed. Technical cluster now has 2 articles.');
log('━'.repeat(60));
log('');
log('Verify:');
log('  1. npm run build  → should pass');
log('  2. npm run dev    → visit /blog/how-is-laminated-glass-made');
log('  3. Generate hero image per heroImagePrompt in registry');
log('     → save to public/images/blog/how-laminated-glass-made-hero.webp');
log('  4. git push');
log('');
log('Technical cluster: 2/3 articles — one more unlocks Pillar.');
log('');
