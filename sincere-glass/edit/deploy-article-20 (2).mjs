// deploy-article-20.mjs
// Deploys Article #20: Curved Tempered Glass vs Flat Tempered Glass
// Comparison cluster, 4th article in cluster
//
// Usage from project root (D:\\桌面\\sincere-glass\\sincere-glass\\):
//   node edit\\deploy-article-20.mjs
//
// What it does:
//   1. Creates src/components/blog/article-20/ and copies the 3 interactive components
//   2. Copies the article page to src/app/blog/curved-tempered-glass-vs-flat-tempered-glass/page.tsx
//   3. Appends the registry entry to src/lib/blog-registry.ts (above the closing `];`)
//   4. Patches src/components/blog/RelatedProductsCards.tsx PRODUCT_MAP to add curved-tempered-glass
//   5. Adds reciprocal cluster links in tempered-vs-laminated and tempered-vs-annealed article pages
//      (anchors on `<FAQ items={faqItems}` \u2014 skips silently if not found)

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = process.cwd();
const EDIT = join(ROOT, 'edit');

function must(path) {
  const p = join(EDIT, path);
  if (!existsSync(p)) {
    console.error(`\u2717 Missing: edit/${path}`);
    process.exit(1);
  }
  return p;
}

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function log(msg) {
  console.log(msg);
}

// ───────────────────────────────────────────────────────────────────────
// 1. Interactive components
// ───────────────────────────────────────────────────────────────────────
const compDir = join(ROOT, 'src', 'components', 'blog', 'article-20');
ensureDir(compDir);

const components = [
  ['BendFeasibilityCalculator.tsx.txt', 'BendFeasibilityCalculator.tsx'],
  ['CurvedCostPremiumCalculator.tsx.txt', 'CurvedCostPremiumCalculator.tsx'],
  ['CurvatureTypeExplorer.tsx.txt', 'CurvatureTypeExplorer.tsx'],
];

for (const [src, dst] of components) {
  copyFileSync(must(src), join(compDir, dst));
  log(`\u2713 Wrote src/components/blog/article-20/${dst}`);
}

// ───────────────────────────────────────────────────────────────────────
// 2. Article page
// ───────────────────────────────────────────────────────────────────────
const pageDir = join(ROOT, 'src', 'app', 'blog', 'curved-tempered-glass-vs-flat-tempered-glass');
ensureDir(pageDir);
copyFileSync(must('page-article-20-curved-vs-flat-tempered.tsx.txt'), join(pageDir, 'page.tsx'));
log(`\u2713 Wrote src/app/blog/curved-tempered-glass-vs-flat-tempered-glass/page.tsx`);

// ───────────────────────────────────────────────────────────────────────
// 3. Append registry entry
// ───────────────────────────────────────────────────────────────────────
const registryPath = join(ROOT, 'src', 'lib', 'blog-registry.ts');
let registrySrc = readFileSync(registryPath, 'utf8');

const SLUG = 'curved-tempered-glass-vs-flat-tempered-glass';

if (registrySrc.includes(`slug: '${SLUG}'`) || registrySrc.includes(`slug: "${SLUG}"`)) {
  log(`\u26a0 Registry entry for ${SLUG} already exists \u2014 skipping append`);
} else {
  const entry = `
  {
    slug: "${SLUG}",
    title: "Curved Tempered Glass vs Flat Tempered Glass: When the Radius Earns Its Premium",
    excerpt: "A manufacturer\\u2019s side-by-side on curved vs flat tempered: the five project triggers that justify curved, the minimum-bend-radius table that kills most designs, the real cost premium, and the one curvature type no tempering line can produce.",
    targetKeyword: "curved tempered glass vs flat tempered glass",
    secondaryKeywords: [
      "curved vs flat tempered",
      "bent tempered glass vs flat",
      "curved tempered glass cost",
      "minimum bend radius tempered glass",
      "curved tempered glass specification",
    ],
    searchKeywords: [
      "curved tempered glass", "bent tempered glass", "curved vs flat tempered",
      "bent vs flat tempered", "curved toughened glass", "minimum bend radius",
      "glass bending", "cylindrical glass", "cold bent glass",
      "R_min tempered glass", "mold cost curved glass",
      "\\u5f2f\\u6a21\\u73bb\\u7483 \\u5e73\\u677f\\u73bb\\u7483", "\\u5f2f\\u94a2\\u73bb\\u7483", "\\u5f2f\\u66f2\\u73bb\\u7483"
    ],
    publishDate: "2026-10-27",
    updatedDate: "2026-10-27",
    category: "Buyer Guide" as const,
    tags: ["curved tempered glass", "bent glass", "tempered glass", "glass comparison", "architectural glass", "curved glass"],
    heroImage: "/images/blog/curved-vs-flat-tempered-hero.webp",
    heroImageAlt: "Side-by-side comparison of a curved tempered glass panel and a flat tempered glass panel on a factory inspection bench, showing the geometric difference and uniform surface finish of both",
    heroImagePrompt: "Studio product photography, two architectural tempered glass panels side by side on polished dark concrete surface in a modern factory inspection bay. Left: a single-axis cylindrically curved tempered glass panel (approximately 1500mm chord, 2000mm height, radius ~1200mm) standing upright, subtle blue-green tint from the glass, perfect optical surface showing a soft reflection of the factory environment. Right: a flat tempered glass panel of identical height and chord width, upright, matching tint. Between them a steel inspection bench with a radius gauge, laser distance meter, and QC paperwork. Soft daylight from above-left, warm amber accent light from side, shallow depth of field focused on the panels. Clean industrial environment with visible overhead crane rails and safety barriers in deep background. No humans in frame, no text, no watermarks. 4K photorealistic, documentary architectural photography style, museum-exhibit cleanliness.",
    author: DEFAULT_AUTHOR,
    readingTime: 13,
    featured: false,
    reviewedBy: { name: "Albar", title: "Technical Lead" },
    articleType: "comparison" as const,
    cluster: "comparison",
    tldr: [
      "Curved tempered is single-axis-curved tempered glass; same strength and breakage pattern as flat per GB 15763.2, just with a mold step added.",
      "Minimum bend radius scales with thickness: 500 mm at 6 mm, 1,100 mm at 12 mm, 2,200 mm at 19 mm on our Wuhan line. Below these floors the quench cracks the panel.",
      "Cost premium is +45\\u201365% for typical facade orders of 20\\u201350 panels on one radius: mold (fixed USD 800), bending surcharge (+35%), and scrap (+6%).",
      "Spherical (double-axis) curved tempered is not producible on any tempering line. The industry workaround is cold-bent laminated with flat tempered plies bent on site.",
      "Specify curved only when faceted flat panels would read as segmented, or when the structure behind the glass is already curved. Otherwise flat wins.",
    ],
    relatedProductSlugs: ["tempered-glass", "curved-tempered-glass", "laminated-glass"],
    translations: {},
    changelog: [
      { date: "2026-10-27", note: "Initial publish \\u2014 fourth article in Comparison cluster, supports new Curved Tempered Glass product page" },
    ],
  },
`;

  // Insert before the closing `];` of blogArticles array.
  const close = registrySrc.lastIndexOf('];');
  if (close < 0) {
    console.error('\u2717 Could not find closing `];` of blogArticles array in registry');
    process.exit(1);
  }
  registrySrc = registrySrc.slice(0, close) + entry + registrySrc.slice(close);
  writeFileSync(registryPath, registrySrc, 'utf8');
  log(`\u2713 Appended registry entry for ${SLUG}`);
}

// ───────────────────────────────────────────────────────────────────────
// 4. Patch RelatedProductsCards PRODUCT_MAP to add curved-tempered-glass
// ───────────────────────────────────────────────────────────────────────
const rpcPath = join(ROOT, 'src', 'components', 'blog', 'RelatedProductsCards.tsx');
let rpcSrc = readFileSync(rpcPath, 'utf8');

if (rpcSrc.includes(`'curved-tempered-glass'`) || rpcSrc.includes(`"curved-tempered-glass"`)) {
  log(`\u26a0 RelatedProductsCards already has curved-tempered-glass entry \u2014 skipping patch`);
} else {
  // Anchor on the enameled-glass entry (last in current map).
  const anchor = `'enameled-glass': {
    title: 'Enameled Glass',
    tagline: 'Ceramic frit for color, pattern, and solar control.',
    image: '/images/products/enameled-glass-card.jpg',
  },`;
  const insertion = anchor + `
  'curved-tempered-glass': {
    title: 'Curved Tempered Glass',
    tagline: 'Single-axis cylindrical. R\\u2098\\u1d62\\u2099 500mm at 6mm. Up to 2.6m tall.',
    image: '/images/products/curved-tempered-glass-card.jpg',
  },`;

  if (!rpcSrc.includes(anchor)) {
    log('\u26a0 Could not locate enameled-glass anchor in RelatedProductsCards \u2014 skipping');
  } else {
    rpcSrc = rpcSrc.replace(anchor, insertion);
    writeFileSync(rpcPath, rpcSrc, 'utf8');
    log(`\u2713 Patched RelatedProductsCards.tsx \u2014 added curved-tempered-glass entry`);
  }
}

// ───────────────────────────────────────────────────────────────────────
// 5. Reciprocal cluster links in existing comparison articles
//    Anchor on `<FAQ items={faqItems}` so we insert just before the FAQ.
// ───────────────────────────────────────────────────────────────────────
const reciprocalTargets = [
  {
    page: join(ROOT, 'src', 'app', 'blog', 'tempered-glass-vs-laminated-glass', 'page.tsx'),
    linkText: `\u2192 Read next in this cluster: <Link href="/blog/${SLUG}" className="text-[#DAA745] underline">Curved tempered glass vs flat tempered glass</Link>`,
  },
  {
    page: join(ROOT, 'src', 'app', 'blog', 'tempered-glass-vs-annealed-glass', 'page.tsx'),
    linkText: `\u2192 Read next in this cluster: <Link href="/blog/${SLUG}" className="text-[#DAA745] underline">Curved tempered glass vs flat tempered glass</Link>`,
  },
];

for (const { page, linkText } of reciprocalTargets) {
  if (!existsSync(page)) {
    log(`\u26a0 Reciprocal target not found: ${page} \u2014 skipping`);
    continue;
  }
  let src = readFileSync(page, 'utf8');
  if (src.includes(SLUG)) {
    log(`\u26a0 Already linked to ${SLUG} in ${page} \u2014 skipping`);
    continue;
  }
  const anchor = '<FAQ items={faqItems}';
  if (!src.includes(anchor)) {
    log(`\u26a0 No <FAQ items={faqItems} anchor in ${page} \u2014 skipping`);
    continue;
  }
  const paragraph = `
        <p className="text-sm text-[#8B95A5] my-6">${linkText}</p>

        `;
  src = src.replace(anchor, paragraph + anchor);
  writeFileSync(page, src, 'utf8');
  log(`\u2713 Added reciprocal cluster link in ${page}`);
}

log('');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
log('Article #20 deploy complete.');
log('');
log('Next steps:');
log('  1. Generate the hero image using the prompt in registry entry');
log('     (save as public/images/blog/curved-vs-flat-tempered-hero.webp)');
log('  2. If you have not already built the Curved Tempered Glass product');
log('     page, verify /products/curved-tempered-glass exists so the');
log('     RelatedProductsCards link resolves (otherwise swap the slug).');
log('  3. git add -A && git commit && push');
log('  4. After Vercel deploy, request indexing in GSC for the new URL.');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
