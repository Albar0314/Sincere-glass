/**
 * deploy-pillar-technical.mjs
 *
 * One-click deployment for the TECHNICAL CLUSTER PILLAR PAGE:
 * "Architectural Glass Manufacturing — The Complete Buyer's Process Guide"
 *
 * This script:
 *   1. Copies 2 interactive components + page.tsx from .tsx.txt templates
 *   2. Appends Pillar registry entry (isPillar: true, featured: true)
 *   3. Adds back-links from all 3 Technical sub-articles to the Pillar
 *
 * REQUIRED template files in same edit\ folder:
 *   - ProcessSelector.tsx.txt
 *   - ProcessFamilyMap.tsx.txt
 *   - pillar-technical-page.tsx.txt
 *
 * Run: node edit\deploy-pillar-technical.mjs
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

// ─── 1. Copy 2 components + page ────────────────────────────────────────────

const COMP_DIR = join(SRC, 'components', 'blog', 'pillar-tech');

copyTemplate('ProcessSelector.tsx.txt', join(COMP_DIR, 'ProcessSelector.tsx'));
copyTemplate('ProcessFamilyMap.tsx.txt', join(COMP_DIR, 'ProcessFamilyMap.tsx'));

const PAGE_PATH = join(SRC, 'app', 'blog', 'architectural-glass-manufacturing-guide', 'page.tsx');
copyTemplate('pillar-technical-page.tsx.txt', PAGE_PATH);

// ─── 2. Append Pillar registry entry ────────────────────────────────────────

function patchRegistry() {
  const p = join(SRC, 'lib', 'blog-registry.ts');
  if (!existsSync(p)) { log('❌ blog-registry.ts not found'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes("'architectural-glass-manufacturing-guide'")) {
    log('⚠️  Technical Pillar already in registry — skipping');
    return;
  }

  const parts = [
    "",
    "  {",
    "    slug: 'architectural-glass-manufacturing-guide',",
    `    title: "Architectural Glass Manufacturing: The Complete Buyer's Process Guide",`,
    `    excerpt: "Three fabrication processes — tempering, lamination, IGU assembly — convert raw annealed glass into every architectural product. A buyer's map to which process creates what, which supplier capabilities matter, and how to audit a factory properly.",`,
    "    targetKeyword: 'architectural glass manufacturing process',",
    "    secondaryKeywords: ['glass manufacturing process', 'how is architectural glass made', 'glass fabrication process', 'glass production processes', 'architectural glass fabrication'],",
    "    searchKeywords: [",
    "      'architectural glass manufacturing', 'glass manufacturing process',",
    "      'glass fabrication', 'glass production processes', 'how is glass made',",
    "      'tempering lamination IGU', 'glass processing', 'glass factory process',",
    "      'tempering', 'lamination', 'IGU assembly', 'autoclave', 'glass furnace',",
    "      'glass pillar guide', 'glass manufacturing hub',",
    "      '建筑玻璃生产', '建筑玻璃工艺', '玻璃深加工', '玻璃制造流程',",
    "    ],",
    "    publishDate: '2026-10-07',",
    "    updatedDate: '2026-10-07',",
    "    category: 'Technical Guide' as const,",
    "    tags: ['architectural glass', 'manufacturing', 'tempering', 'lamination', 'IGU', 'pillar page', 'supplier audit'],",
    "    heroImage: '/images/blog/architectural-glass-manufacturing-hero.webp',",
    "    heroImageAlt: 'Modern architectural glass factory interior showing three parallel production lines: tempering furnace, lamination autoclave, and IGU assembly line, with large glass panels at various production stages',",
    `    heroImagePrompt: 'Wide-angle industrial photography of a modern architectural glass factory interior. Three distinct production lines visible in parallel: left side a horizontal tempering furnace with a glowing orange glass panel inside visible through the operator window, center a large cylindrical lamination autoclave (door open, racked laminated panels inside with visible translucent PVB interlayer), right side an IGU assembly station with a technician robot arm applying silicone secondary seal to an insulated glass unit. High ceiling with industrial lighting, polished concrete floor, visible safety barriers and overhead crane rails. Warm amber accent lighting from the tempering furnace glow pooling on nearby surfaces. 20-degree camera angle from a mezzanine viewing position, deep depth of field showing all three lines in focus. Clean modern factory environment, no humans in frame. 4K photorealistic, documentary-style, no text or watermarks.',`,
    "    author: DEFAULT_AUTHOR,",
    "    readingTime: 17,",
    "    featured: true,",
    "    reviewedBy: { name: 'Albar', title: 'Technical Lead' },",
    "    articleType: 'buyer-guide' as const,",
    "    cluster: 'technical',",
    "    isPillar: true,",
    "    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass'],",
    "    translations: {},",
    "    changelog: [",
    "      { date: '2026-10-07', note: 'Initial publish — Pillar Page for Technical Guides cluster' },",
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
  log('✅ blog-registry.ts — Technical Pillar entry appended (isPillar: true, featured: true)');
}

patchRegistry();

// ─── 3. Add back-link to Pillar in each Technical sub-article ───────────────

function addBackLink(articleSlug) {
  const p = join(SRC, 'app', 'blog', articleSlug, 'page.tsx');
  if (!existsSync(p)) { log('⚠️  ' + articleSlug + ' not found — skip'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('architectural-glass-manufacturing-guide')) {
    log('⚠️  ' + articleSlug + ' already links to Technical Pillar — skipping');
    return;
  }

  const marker = '<RelatedProductsCards';
  if (!c.includes(marker)) {
    log('⚠️  ' + articleSlug + ' — no RelatedProductsCards marker');
    return;
  }

  const injectionLines = [
    "",
    '        {/* Technical Pillar back-link */}',
    '        <TechNote type="note" title="Zoom out to the full picture">',
    '          <p>',
    "            This article is one of three deep-dives in our Technical Guides series.",
    "            For the buyer-level overview of all 3 fabrication processes and how they",
    "            map to supplier capabilities, see our{' '}",
    '            <a href="/blog/architectural-glass-manufacturing-guide">',
    "              complete architectural glass manufacturing guide",
    "            </a>.",
    '          </p>',
    '        </TechNote>',
    "",
    "        ",
  ];
  const injection = injectionLines.join('\n');

  c = c.replace(marker, injection + marker);
  writeFileSync(p, c);
  log('✅ ' + articleSlug + ' — back-link to Technical Pillar added');
}

addBackLink('how-is-tempered-glass-made');
addBackLink('how-is-laminated-glass-made');
addBackLink('how-is-insulated-glass-made');

// ─── Done ───────────────────────────────────────────────────────────────────

log('');
log('━'.repeat(60));
log('🏛️  TECHNICAL PILLAR DEPLOYED');
log('━'.repeat(60));
log('');
log('Technical cluster now has:');
log('  • 1 Pillar Page (architectural-glass-manufacturing-guide)');
log('  • 3 sub-articles (tempered / laminated / insulated production)');
log('  • Full bi-directional internal linking');
log('  • Interactive process selector tool');
log('');
log('Overall blog state:');
log('  • Comparison cluster: Pillar + 3 sub-articles');
log('  • Technical cluster:  Pillar + 3 sub-articles  ← NEW');
log('  • Application cluster: 0');
log('  • Buyer-Guide cluster: 0');
log('  • Product cluster: 0');
log('');
log('Verify:');
log('  1. npm run build');
log('  2. npm run dev → visit /blog/architectural-glass-manufacturing-guide');
log('  3. Generate hero image per heroImagePrompt in registry');
log('     → save to public/images/blog/architectural-glass-manufacturing-hero.webp');
log('  4. git push');
log('');
