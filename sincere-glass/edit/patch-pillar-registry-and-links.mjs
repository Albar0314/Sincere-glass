/**
 * patch-pillar-registry-and-links.mjs
 *
 * Does ONLY the TypeScript edits for the Pillar Page:
 *   1. Adds `isPillar?: boolean` to BlogArticle interface in blog-registry.ts
 *   2. Appends the Pillar registry entry
 *   3. Adds back-links from all 3 sub-articles to the Pillar
 *
 * The actual TSX files (Pillar page.tsx + 2 components) are delivered as
 * separate files — place them manually at:
 *   src/components/blog/pillar-arch-glass/GlassFamilyMap.tsx
 *   src/components/blog/pillar-arch-glass/GlassSelectorFlowchart.tsx
 *   src/app/blog/architectural-glass-types-guide/page.tsx
 *
 * This avoids the template-string nesting bug of the previous patch script.
 *
 * Run: node edit\patch-pillar-registry-and-links.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const log = (m) => console.log(m);

// ─── 1. Add isPillar field to BlogArticle interface ─────────────────────────

function patchInterface() {
  const p = join(SRC, 'lib', 'blog-registry.ts');
  if (!existsSync(p)) { log('❌ blog-registry.ts not found'); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('isPillar?')) {
    log('⚠️  isPillar field already in interface — skipping');
    return;
  }

  const marker = 'cluster: BlogCluster;';
  if (!c.includes(marker)) {
    log('❌ Could not find `cluster: BlogCluster;` in interface');
    return;
  }
  c = c.replace(
    marker,
    'cluster: BlogCluster;\n  /** True if this article is a Pillar Page — the entry point for a topic cluster. See SOP §6. */\n  isPillar?: boolean;'
  );

  writeFileSync(p, c);
  log('✅ blog-registry.ts — isPillar?: boolean added to BlogArticle interface');
}

// ─── 2. Append Pillar registry entry ────────────────────────────────────────

function patchEntry() {
  const p = join(SRC, 'lib', 'blog-registry.ts');
  if (!existsSync(p)) return;
  let c = readFileSync(p, 'utf-8');

  if (c.includes("'architectural-glass-types-guide'")) {
    log('⚠️  Pillar entry already in registry — skipping');
    return;
  }

  // Build entry as string concatenation (no nested backticks)
  const parts = [
    "",
    "  {",
    "    slug: 'architectural-glass-types-guide',",
    `    title: "Architectural Glass Types: The Complete Buyer's Guide",`,
    `    excerpt: "The 5 functional families of architectural glass — annealed, tempered, laminated, insulated, and coated — mapped by failure mode, code requirement, and application. Interactive selector plus deep-dive links.",`,
    "    targetKeyword: 'architectural glass types',",
    "    secondaryKeywords: ['types of architectural glass', 'architectural glass buyers guide', 'glass selection guide', 'building glass types'],",
    "    searchKeywords: [",
    "      'architectural glass types', 'types of architectural glass', 'building glass types',",
    "      'glass selection guide', 'glass buyers guide', 'glass selector',",
    "      'annealed tempered laminated insulated', 'building glass categories',",
    "      'float glass tempered glass laminated', 'IGU PVB Low-E',",
    "      'glass pillar guide', 'glass comparison hub',",
    "      '建筑玻璃分类', '建筑玻璃种类', '玻璃选型指南', '建筑玻璃全解',",
    "    ],",
    "    publishDate: '2026-10-07',",
    "    updatedDate: '2026-10-07',",
    "    category: 'Buyer Guide' as const,",
    "    tags: ['architectural glass', 'glass types', 'buyer guide', 'glass selection', 'pillar page'],",
    "    heroImage: '/images/blog/architectural-glass-types-hero.webp',",
    "    heroImageAlt: 'Five types of architectural glass displayed as a visual family: annealed, tempered, laminated, insulated, and coated — showing material differences and layering structures',",
    `    heroImagePrompt: 'Studio product photography, five architectural glass samples arranged in a horizontal row on a polished dark concrete surface. From left to right: 1) plain clear annealed float glass, 2) tempered glass with safety-glass certification label visible, 3) laminated glass with visible translucent PVB interlayer sandwich, 4) insulated glass unit with visible aluminum spacer and dark sealant, 5) Low-E coated glass with subtle gold-toned reflective coating on inner surface. 25-degree elevated camera angle, soft daylight from above-left, shallow depth of field with focus on middle sample. Clean neutral grey background. No text or labels in image, no humans. 4K photorealistic, museum-exhibit quality, warm amber accent lighting pooling under the center samples.',`,
    "    author: DEFAULT_AUTHOR,",
    "    readingTime: 15,",
    "    featured: true,",
    "    reviewedBy: { name: 'Albar', title: 'Technical Lead' },",
    "    articleType: 'buyer-guide' as const,",
    "    cluster: 'comparison',",
    "    isPillar: true,",
    "    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass'],",
    "    translations: {},",
    "    changelog: [",
    "      { date: '2026-10-07', note: 'Initial publish — Pillar Page for comparison cluster' },",
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
  log('✅ blog-registry.ts — Pillar entry appended');
}

// ─── 3. Add back-link to Pillar in each sub-article ─────────────────────────

function addBackLink(articleSlug) {
  const p = join(SRC, 'app', 'blog', articleSlug, 'page.tsx');
  if (!existsSync(p)) { log(`⚠️  ${articleSlug} not found — skip`); return; }
  let c = readFileSync(p, 'utf-8');

  if (c.includes('architectural-glass-types-guide')) {
    log(`⚠️  ${articleSlug} already links to Pillar — skipping`);
    return;
  }

  const faqMarker = '<FAQ items={buyerFaqItems}';
  const faqMarker2 = '<FAQ items={faqItems}';
  const relatedMarker = '<RelatedProductsCards';

  // Build injection as array (no backticks)
  const injectionParts = [
    '',
    '        {/* Pillar back-link */}',
    '        <TechNote type="note" title="Not sure which family of glass fits your project?">',
    '          <p>',
    "            This article is one of three comparisons in our architectural glass selection series.",
    "            For a full overview of all 5 glass families and an interactive selector that walks you",
    "            through the decision based on your project\\'s primary concern, see our{\\' \\'}",
    '            <a href="/blog/architectural-glass-types-guide">',
    '              complete architectural glass types guide',
    '            </a>.',
    '          </p>',
    '        </TechNote>',
    '',
    '        ',
  ];
  const injection = injectionParts.join('\n')
    .replace(/\\'/g, "'");

  let marker = null;
  if (c.includes(faqMarker)) marker = faqMarker;
  else if (c.includes(faqMarker2)) marker = faqMarker2;
  else if (c.includes(relatedMarker)) marker = relatedMarker;

  if (!marker) {
    log(`⚠️  ${articleSlug} — no FAQ/RelatedProductsCards marker found`);
    return;
  }

  c = c.replace(marker, injection + marker);
  writeFileSync(p, c);
  log(`✅ ${articleSlug} — back-link to Pillar added`);
}

// ─── Run ────────────────────────────────────────────────────────────────────

log('');
log('🏛️  Patch: Pillar Page registry + back-links');
log('────────────────────────────────────────────────');
log('');

patchInterface();
log('');
patchEntry();
log('');
addBackLink('tempered-glass-vs-laminated-glass');
addBackLink('insulated-glass-vs-laminated-glass');
addBackLink('tempered-glass-vs-annealed-glass');

log('');
log('────────────────────────────────────────────────');
log('✅ Done. Now manually place these 3 TSX files:');
log('');
log('  1. GlassFamilyMap.tsx          → src/components/blog/pillar-arch-glass/');
log('  2. GlassSelectorFlowchart.tsx  → src/components/blog/pillar-arch-glass/');
log('  3. page.tsx                    → src/app/blog/architectural-glass-types-guide/');
log('');
log("(Create those two directories first if they don't exist.)");
log('');
log('Then: npm run build → push.');
log('');
