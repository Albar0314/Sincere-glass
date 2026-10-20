import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SLUG = '12mm-tempered-glass-specifications';
const ART_DIR = join(ROOT, 'src', 'components', 'blog', 'article-16');
const PAGE_DIR = join(ROOT, 'src', 'app', 'blog', SLUG);

function copy(templateName, destPath) {
  const src = join(__dirname, templateName);
  if (!existsSync(src)) {
    console.error('[miss] template not found: ' + templateName);
    return false;
  }
  const content = readFileSync(src, 'utf8');
  mkdirSync(dirname(destPath), { recursive: true });
  writeFileSync(destPath, content);
  console.log('[ok]   ' + destPath.replace(ROOT, '').replace(/\\/g, '/'));
  return true;
}

console.log('\n=== Deploying Article #16: 12mm Tempered Glass Specifications ===\n');

mkdirSync(ART_DIR, { recursive: true });
mkdirSync(PAGE_DIR, { recursive: true });

copy('ThicknessPerformanceComparator.tsx.txt', join(ART_DIR, 'ThicknessPerformanceComparator.tsx'));
copy('MaxPanelSizeCalculator.tsx.txt',         join(ART_DIR, 'MaxPanelSizeCalculator.tsx'));
copy('CostFactorBreakdown.tsx.txt',            join(ART_DIR, 'CostFactorBreakdown.tsx'));
copy('page-article-16-12mm-tempered-glass-specifications.tsx.txt', join(PAGE_DIR, 'page.tsx'));

// Append registry entry (idempotent)
const regPath = join(ROOT, 'src', 'lib', 'blog-registry.ts');
let reg = readFileSync(regPath, 'utf8');

if (reg.includes("slug: '" + SLUG + "'") || reg.includes('slug: "' + SLUG + '"')) {
  console.log('\n[skip] registry entry already present for ' + SLUG);
} else {
  const entry = [
    '',
    '  {',
    "    slug: '" + SLUG + "',",
    '    title: "12mm Tempered Glass: Specifications, Panel Limits, and When It\'s the Right Choice",',
    '    excerpt: "Why 12mm is the specification sweet spot for frameless balustrades, long-span canopies, and large-area storefronts \\u2014 plus panel-size limits, thickness tolerance, edge options, and the cost factors buyers rarely see on a quotation.",',
    "    targetKeyword: '12mm tempered glass',",
    "    secondaryKeywords: ['12mm toughened glass', '12mm tempered glass specifications', '12mm tempered glass max size', '12mm tempered glass price', '12mm safety glass'],",
    '    searchKeywords: [',
    "      '12mm tempered', '12mm tempered glass', '12mm toughened glass', '1/2 inch tempered glass',",
    "      '12mm safety glass', '12 mm tempered', 'half inch tempered',",
    "      'tempered glass thickness', 'tempered glass panel size', 'tempered balustrade glass',",
    "      'GB 15763.2', 'ASTM C1048', 'EN 12150', 'ANSI Z97.1',",
    "      '12\\u6beb\\u7c73\\u94a2\\u5316\\u73bb\\u7483', '12mm\\u94a2\\u5316\\u73bb\\u7483', '12\\u539a\\u94a2\\u5316', '\\u680f\\u6746\\u94a2\\u5316\\u73bb\\u7483', '\\u94a2\\u5316\\u539a\\u5ea6'",
    '    ],',
    "    publishDate: '2026-10-20',",
    "    updatedDate: '2026-10-20',",
    "    category: 'Product Knowledge' as const,",
    "    tags: ['tempered glass', '12mm', 'specifications', 'balustrade', 'storefront', 'product deep dive'],",
    "    heroImage: '/images/blog/12mm-tempered-glass-hero.webp',",
    "    heroImageAlt: 'Stack of 12mm tempered glass panels on a factory handling frame with cut edges clearly visible showing the exact thickness',",
    '    heroImagePrompt: "Industrial photography of a vertical stack of 12mm tempered architectural glass panels mounted on a steel handling frame inside a modern glass factory. Panels are approximately 2m x 3m, visibly 12mm thick on the exposed edges, with clear factory-fresh float-glass tint. Soft overhead industrial lighting with warm amber accent light pooling on the top edges revealing the exact thickness. Shallow depth of field focused on the exposed stack edges where thickness is visible. Clean neutral grey concrete floor, a dark painted steel A-frame holding the panels upright. 25-degree camera angle from the handling bay. No humans in frame, no visible text or branding. 4K photorealistic, documentary industrial style.",',
    '    author: DEFAULT_AUTHOR,',
    '    readingTime: 14,',
    '    featured: false,',
    "    reviewedBy: { name: 'Albar', title: 'Technical Lead' },",
    "    articleType: 'buyer-guide' as const,",
    "    cluster: 'product',",
    "    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'low-e-glass'],",
    '    translations: {},',
    '    changelog: [',
    "      { date: '2026-10-20', note: 'Initial publish \\u2014 first article in Product Deep Dives cluster' },",
    '    ],',
    '  },',
    '',
  ].join('\n');

  // Insert before the closing '];' of the blogArticles array
  const marker = /\n\];\s*\n\n\/\/ ---- Utility/;
  if (marker.test(reg)) {
    reg = reg.replace(marker, entry + '];\n\n// ---- Utility');
  } else {
    const idx = reg.lastIndexOf('];');
    if (idx > 0) {
      reg = reg.slice(0, idx) + entry + reg.slice(idx);
    } else {
      console.error('[fail] could not locate blogArticles closing bracket');
      process.exit(1);
    }
  }
  writeFileSync(regPath, reg);
  console.log('[ok]   appended registry entry');
}

console.log('\n=== Article #16 deployed. Push to GitHub to trigger Vercel. ===\n');
console.log('Post-publish checklist:');
console.log('  1. Verify article at https://sincereglass.com/blog/' + SLUG);
console.log('  2. Submit URL in Google Search Console');
console.log('  3. Load with JS disabled, verify SSR shadow paragraphs (C21) and table caption (C22)');
console.log('  4. Test site search: 12mm tempered, balustrade thickness, 12\\u6beb\\u7c73\\u94a2\\u5316\\u73bb\\u7483');
console.log('  5. Opens the Product Deep Dives cluster (1 of 3 needed for Pillar activation)');
