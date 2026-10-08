/**
 * deploy-article-8.mjs
 *
 * One-click deployment for Article #8 (curtain-wall-glass-specification).
 * First article in Application cluster.
 *
 * REQUIRED template files in same edit\ folder:
 *   - CurtainWallSpecSelector.tsx.txt
 *   - BuildupCrossSection.tsx.txt
 *   - RegionalCodeTable.tsx.txt
 *   - article-8-page.tsx.txt
 *
 * Run: node edit\deploy-article-8.mjs
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
    return false;
  }
  const content = readFileSync(src, 'utf-8');
  ensureDir(destPath);
  writeFileSync(destPath, content, 'utf-8');
  log('✅ ' + destPath.replace(ROOT, '').replace(/\\/g, '/'));
  return true;
}

// ─── 1. Copy components + page ──────────────────────────────────────────────

const COMP_DIR = join(SRC, 'components', 'blog', 'article-8');

copyTemplate('CurtainWallSpecSelector.tsx.txt', join(COMP_DIR, 'CurtainWallSpecSelector.tsx'));
copyTemplate('BuildupCrossSection.tsx.txt', join(COMP_DIR, 'BuildupCrossSection.tsx'));
copyTemplate('RegionalCodeTable.tsx.txt', join(COMP_DIR, 'RegionalCodeTable.tsx'));

const PAGE_PATH = join(SRC, 'app', 'blog', 'curtain-wall-glass-specification', 'page.tsx');
copyTemplate('article-8-page.tsx.txt', PAGE_PATH);

// ─── 2. Append registry entry ───────────────────────────────────────────────

function patchRegistry() {
  const p = join(SRC, 'lib', 'blog-registry.ts');
  if (!existsSync(p)) { log('❌ blog-registry.ts not found'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes("'curtain-wall-glass-specification'")) {
    log('⚠️  Article #8 already in registry — skipping');
    return;
  }

  const parts = [
    "",
    "  {",
    "    slug: 'curtain-wall-glass-specification',",
    `    title: "Curtain Wall Glass Specification: Build-ups, Codes, and the 4 Objectives Every Spec Must Satisfy",`,
    `    excerpt: "The 4 objectives of curtain wall glass (safety, thermal, wind load, acoustic), 4 typical build-ups from basic to hurricane-rated, regional code requirements across IBC/EN/GB/AS, and the procurement pitfalls that create expensive problems later.",`,
    "    targetKeyword: 'curtain wall glass specification',",
    "    secondaryKeywords: ['curtain wall glass', 'glass for curtain wall', 'curtain wall glazing', 'facade glass specification', 'curtain wall glass types'],",
    "    searchKeywords: [",
    "      'curtain wall glass', 'curtain wall glass specification', 'glass for curtain wall',",
    "      'curtain wall glazing', 'facade glass', 'curtain wall glass types', 'facade glass specification',",
    "      'curtain wall IGU', 'curtain wall laminated glass', 'high-rise glass spec',",
    "      'curtain wall', 'facade', 'Low-E IGU', 'laminated IGU', 'SGP curtain wall',",
    "      '幕墙玻璃', '幕墙玻璃规格', '建筑幕墙玻璃', '幕墙玻璃选型', '幕墙中空玻璃',",
    "    ],",
    "    publishDate: '2026-10-07',",
    "    updatedDate: '2026-10-07',",
    "    category: 'Buyer Guide' as const,",
    "    tags: ['curtain wall', 'facade glass', 'specification', 'IGU', 'laminated glass', 'building codes'],",
    "    heroImage: '/images/blog/curtain-wall-glass-hero.webp',",
    "    heroImageAlt: 'Modern high-rise commercial building facade with curtain wall glass system showing uniform reflective glass panels and aluminum framing against blue sky',",
    `    heroImagePrompt: 'Professional architectural photography of a modern commercial high-rise building facade featuring a glass curtain wall system. Clean geometric pattern of large rectangular glass panels (approximately 1.5m x 3m each) held in slim aluminum framing. The glass has a subtle blue-green reflective tint from Low-E coating, reflecting partial sky and adjacent buildings. 25-degree upward camera angle capturing the facade from street level, with the building extending beyond the frame upward. Clear blue sky background with soft afternoon sunlight creating warm reflections on the glass. Clean modern architecture, no cluttered background elements, no visible humans or vehicles. Shallow depth of field focused on the mid-facade panels. 4K photorealistic, documentary architectural photography style, no text or watermarks.',`,
    "    author: DEFAULT_AUTHOR,",
    "    readingTime: 16,",
    "    featured: false,",
    "    reviewedBy: { name: 'Albar', title: 'Technical Lead' },",
    "    articleType: 'buyer-guide' as const,",
    "    cluster: 'application',",
    "    relatedProductSlugs: ['insulated-glass', 'laminated-glass', 'tempered-glass', 'low-e-glass', 'enameled-glass'],",
    "    translations: {},",
    "    changelog: [",
    "      { date: '2026-10-07', note: 'Initial publish — first article in Application cluster' },",
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
  log('✅ blog-registry.ts — Article #8 entry appended (first in Application cluster)');
}

patchRegistry();

// ─── Done ───────────────────────────────────────────────────────────────────

log('');
log('━'.repeat(60));
log('🎉 Article #8 deployed. Application cluster opened.');
log('━'.repeat(60));
log('');
log('Overall blog state:');
log('  • Comparison cluster: Pillar + 3 sub-articles');
log('  • Technical cluster:  Pillar + 3 sub-articles');
log('  • Application cluster: 1 sub-article  ← NEW');
log('  • Buyer-Guide cluster: 0');
log('  • Product cluster: 0');
log('');
log('Verify:');
log('  1. npm run build');
log('  2. npm run dev → visit /blog/curtain-wall-glass-specification');
log('  3. Generate hero image per heroImagePrompt');
log('     → save to public/images/blog/curtain-wall-glass-hero.webp');
log('  4. git push');
log('');
log('Application cluster: 1/3 — two more unlocks Pillar.');
log('');
