// deploy-article-10-shower-glass-thickness.mjs
// Deploys Article #10: "Shower Glass Thickness Guide" (Application cluster #2)
// Run from project root:
//   node edit\deploy-article-10-shower-glass-thickness.mjs
//
// Reads 4 template files from this directory:
//   - page.tsx.txt
//   - ThicknessCalculator.tsx.txt
//   - HardwareLoadVisualizer.tsx.txt
//   - GlobalCodeMatrix.tsx.txt
//
// Writes to:
//   - src/app/blog/shower-glass-thickness-guide/page.tsx
//   - src/components/blog/article-10/ThicknessCalculator.tsx
//   - src/components/blog/article-10/HardwareLoadVisualizer.tsx
//   - src/components/blog/article-10/GlobalCodeMatrix.tsx
//
// Also:
//   - Appends article entry to src/lib/blog-registry.ts
//   - Adds reciprocal link from existing curtain-wall article (same cluster)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = process.cwd();

const SLUG = 'shower-glass-thickness-guide';
const CLUSTER = 'application';

// ---------- 1. File copy map ----------
const FILES = [
  {
    from: path.join(__dirname, 'page.tsx.txt'),
    to: path.join(PROJECT_ROOT, 'src', 'app', 'blog', SLUG, 'page.tsx'),
  },
  {
    from: path.join(__dirname, 'ThicknessCalculator.tsx.txt'),
    to: path.join(PROJECT_ROOT, 'src', 'components', 'blog', 'article-10', 'ThicknessCalculator.tsx'),
  },
  {
    from: path.join(__dirname, 'HardwareLoadVisualizer.tsx.txt'),
    to: path.join(PROJECT_ROOT, 'src', 'components', 'blog', 'article-10', 'HardwareLoadVisualizer.tsx'),
  },
  {
    from: path.join(__dirname, 'GlobalCodeMatrix.tsx.txt'),
    to: path.join(PROJECT_ROOT, 'src', 'components', 'blog', 'article-10', 'GlobalCodeMatrix.tsx'),
  },
];

console.log('━'.repeat(72));
console.log('Deploy: Article #10 — Shower Glass Thickness Guide');
console.log('━'.repeat(72));

// Step 1: Copy template files
console.log('\n[1/3] Copying template files...');
for (const { from, to } of FILES) {
  if (!fs.existsSync(from)) {
    console.error(`  ✗ Template missing: ${from}`);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  const content = fs.readFileSync(from, 'utf8');
  fs.writeFileSync(to, content, 'utf8');
  console.log(`  ✓ ${path.relative(PROJECT_ROOT, to)}`);
}

// ---------- 2. Append registry entry ----------
const REGISTRY_PATH = path.join(PROJECT_ROOT, 'src', 'lib', 'blog-registry.ts');
console.log('\n[2/3] Updating blog-registry.ts...');

if (!fs.existsSync(REGISTRY_PATH)) {
  console.error(`  ✗ Registry not found: ${REGISTRY_PATH}`);
  process.exit(1);
}

let registry = fs.readFileSync(REGISTRY_PATH, 'utf8');

// Guard: if already registered, skip insertion.
if (registry.includes(`slug: '${SLUG}'`)) {
  console.log(`  ⚠ Entry for ${SLUG} already exists in registry — skipping append.`);
} else {
  const entry = `
  {
    slug: '${SLUG}',
    title: "Shower Glass Thickness Guide: 5, 8, 10 or 12 mm — Which Is Right for Your Enclosure?",
    excerpt: "Four variables decide shower glass thickness: support type, use case, panel geometry, and local code. Interactive selector, hardware-load math, and the global code map (CPSC / EN / GB / AS) in one factory-floor guide.",
    targetKeyword: 'shower glass thickness guide',
    secondaryKeywords: ['shower door glass thickness', 'frameless shower glass thickness', '10mm vs 12mm shower glass', 'shower enclosure glass thickness', 'how thick should shower glass be'],
    searchKeywords: [
      'shower glass thickness', 'shower door thickness', 'frameless shower glass thickness',
      '10mm vs 12mm shower glass', 'how thick should shower glass be', 'shower enclosure glass',
      'walk-in shower glass thickness', 'tempered shower door glass',
      'CPSC 1201', 'EN 14428', 'GB 15763.2', 'AS 1288', 'tempered glass', 'safety glazing',
      '淋浴房玻璃厚度', '淋浴玻璃', '钢化淋浴房', '无框淋浴房 厚度',
    ],
    publishDate: '2026-10-12',
    updatedDate: '2026-10-12',
    category: 'Buyer Guide' as const,
    tags: ['shower glass', 'tempered glass', 'safety glass', 'frameless shower', 'bathroom glass', 'glass specification'],
    heroImage: '/images/blog/shower-glass-thickness-hero.webp',
    heroImageAlt: 'Frameless 10mm clear tempered shower enclosure with brass hinges, warm bathroom lighting, showing the typical panel geometry of a residential walk-in shower',
    heroImagePrompt: 'Professional architectural interior photography of a modern luxury bathroom featuring a frameless walk-in shower enclosure. 10 mm clear tempered glass panels, approximately 2000 mm tall × 900 mm wide, held by brushed brass wall-mounted clamps and a single pivot hinge on the door. Edge of the glass visible showing the characteristic clean polished arris. Warm bathroom lighting from a wall sconce creates soft reflections and highlights the glass thickness at the edge. Background: matte beige large-format porcelain tile walls, polished brass fixtures, a floor-standing rainfall shower head. 30-degree camera angle from the bathroom entrance, shallow depth of field focused on the glass edge and hinge detail. No humans in frame. Clean neutral palette with warm amber accent lighting matching Sincere Glass brand (dark #1C1F26, amber #DAA745 undertones). 4K photorealistic, architectural digest style, no text or watermarks.',
    author: DEFAULT_AUTHOR,
    readingTime: 15,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'application',
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'low-e-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-12', note: 'Initial publish — second article in Application cluster' },
    ],
  },
`;

  // Insert before closing "];" of blogArticles array.
  const closer = '\n];';
  const idx = registry.lastIndexOf(closer);
  if (idx === -1) {
    console.error('  ✗ Could not find closing "];" of blogArticles — manual edit required.');
    process.exit(1);
  }
  registry = registry.slice(0, idx) + entry + registry.slice(idx);
  fs.writeFileSync(REGISTRY_PATH, registry, 'utf8');
  console.log(`  ✓ Appended ${SLUG} entry to blog-registry.ts`);
}

// ---------- 3. Reciprocal cluster link ----------
// Add an in-context link from the curtain-wall article back to this new one.
const CURTAIN_WALL_PAGE = path.join(
  PROJECT_ROOT,
  'src',
  'app',
  'blog',
  'curtain-wall-glass-specification',
  'page.tsx'
);
console.log('\n[3/3] Adding reciprocal link in curtain-wall article (same cluster)...');

if (!fs.existsSync(CURTAIN_WALL_PAGE)) {
  console.log(`  ⚠ Curtain-wall article not found at expected path — skipping reciprocal link.`);
  console.log(`     Expected: ${path.relative(PROJECT_ROOT, CURTAIN_WALL_PAGE)}`);
  console.log(`     Add this link manually inside the article body:`);
  console.log(`       <Link href="/blog/${SLUG}">shower glass thickness guide</Link>`);
} else {
  let curtain = fs.readFileSync(CURTAIN_WALL_PAGE, 'utf8');
  if (curtain.includes(`/blog/${SLUG}`)) {
    console.log(`  ⚠ Reciprocal link already present in curtain-wall article — skipping.`);
  } else {
    // Append a one-line "see also" sentence right before the final closing BlogArticleLayout tag.
    // Finds the last occurrence of "</BlogArticleLayout>" and inserts just before it.
    const marker = '</BlogArticleLayout>';
    const idx = curtain.lastIndexOf(marker);
    if (idx === -1) {
      console.log(`  ⚠ Could not find </BlogArticleLayout> in curtain-wall article — add link manually.`);
    } else {
      const seeAlso = `\n        <p className="text-sm text-[#8B95A5] italic mt-8">\n          See also: our <Link href="/blog/${SLUG}">shower glass thickness guide</Link> for the same specification discipline applied to bathroom enclosures.\n        </p>\n      `;
      // Guard: only insert if a Link import is already present (common in page.tsx)
      if (!curtain.includes("import Link")) {
        console.log(`  ⚠ Link import missing in curtain-wall article — insert manually.`);
      } else {
        curtain = curtain.slice(0, idx) + seeAlso + curtain.slice(idx);
        fs.writeFileSync(CURTAIN_WALL_PAGE, curtain, 'utf8');
        console.log(`  ✓ Reciprocal link added to curtain-wall article`);
      }
    }
  }
}

console.log('\n' + '━'.repeat(72));
console.log('Deploy complete.');
console.log('━'.repeat(72));
console.log('\nNext steps:');
console.log('  1. git status  → verify files written');
console.log('  2. npm run build  → smoke test (optional)');
console.log('  3. git add . && git commit -m "feat(blog): add shower glass thickness guide (article #10)"');
console.log('  4. Push to GitHub → Vercel auto-deploys');
console.log('  5. Submit URL to Google Search Console:');
console.log(`     https://sincereglass.com/blog/${SLUG}`);
console.log('  6. Generate hero image per prompt in registry entry → upload to /public/images/blog/shower-glass-thickness-hero.webp');
console.log('');
