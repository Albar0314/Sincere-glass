// deploy-article-14.mjs
// Deploys Article #14 — glass-shipping-container-loading-guide
// Buyer-Guide cluster (2/3 — advances toward Pillar activation at 3)
//
// Run from project root:
//   node edit/deploy-article-14.mjs
//
// What this script does:
//   1. Copies 3 interactive component templates to src/components/blog/article-14/
//   2. Copies the article page template to src/app/blog/glass-shipping-container-loading-guide/page.tsx
//   3. Appends the registry entry to src/lib/blog-registry.ts (idempotent — skips if slug exists)
//   4. Attempts to add a reciprocal link from Article #13 (how-to-import-glass-from-china) back to #14.
//      If the target section is not found, prints a manual-edit instruction instead of failing.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..'); // one level up from edit/
const SRC = join(ROOT, 'src');

const SLUG = 'glass-shipping-container-loading-guide';

// -----------------------------------------------------------------------------
// 1. Component files
// -----------------------------------------------------------------------------

const COMPONENT_DIR = join(SRC, 'components', 'blog', 'article-14');
mkdirSync(COMPONENT_DIR, { recursive: true });

const components = [
  'CrateTypeSelector',
  'ContainerLoadingLab',
  'DamageRiskMap',
];

for (const name of components) {
  const src = join(__dirname, `${name}.tsx.txt`);
  const dst = join(COMPONENT_DIR, `${name}.tsx`);
  if (!existsSync(src)) {
    console.error(`✗ Missing template: ${src}`);
    process.exit(1);
  }
  writeFileSync(dst, readFileSync(src, 'utf8'), 'utf8');
  console.log(`✓ ${dst}`);
}

// -----------------------------------------------------------------------------
// 2. Article page
// -----------------------------------------------------------------------------

const PAGE_DIR = join(SRC, 'app', 'blog', SLUG);
mkdirSync(PAGE_DIR, { recursive: true });
const pageSrc = join(__dirname, 'page-article-14.tsx.txt');
const pageDst = join(PAGE_DIR, 'page.tsx');
if (!existsSync(pageSrc)) {
  console.error(`✗ Missing template: ${pageSrc}`);
  process.exit(1);
}
writeFileSync(pageDst, readFileSync(pageSrc, 'utf8'), 'utf8');
console.log(`✓ ${pageDst}`);

// -----------------------------------------------------------------------------
// 3. Registry entry
// -----------------------------------------------------------------------------

const REGISTRY_PATH = join(SRC, 'lib', 'blog-registry.ts');
let registry = readFileSync(REGISTRY_PATH, 'utf8');

if (registry.includes(`slug: '${SLUG}'`) || registry.includes(`slug: "${SLUG}"`)) {
  console.log(`• Registry entry for ${SLUG} already exists — skipped.`);
} else {
  const entry = `
  {
    slug: '${SLUG}',
    title: "Glass Container Shipping: The Factory Playbook for Crating, Loading, and Zero-Damage Delivery",
    excerpt: "The operational guide behind every architectural glass container we seal: 4 crate types, weight-vs-volume math, the 7-step loading protocol, the 6 damage zones to design against, FCL vs LCL, ICC marine insurance, HS codes, and the 5 pre-seal photos every buyer should demand.",
    targetKeyword: 'glass container shipping',
    secondaryKeywords: [
      'shipping glass in containers',
      'glass container loading',
      'glass container packaging',
      'glass FCL vs LCL',
      'how to ship glass from china',
      'glass sea freight packaging',
    ],
    searchKeywords: [
      'glass container shipping', 'shipping glass in containers', 'glass container loading',
      'glass FCL', 'glass LCL', 'how to ship glass from china', 'glass sea freight',
      'glass packaging export', 'glass crate types', 'A-frame glass crate',
      'L-type glass crate', 'glass container weight', '20DC glass', '40HQ glass',
      'ISPM-15', 'ICC A clause', 'marine insurance glass', 'HS code 7007', 'HS code 7008',
      '玻璃海运', '玻璃集装箱', '玻璃出口装柜', '玻璃海运包装',
    ],
    publishDate: '2026-10-14',
    updatedDate: '2026-10-14',
    category: 'Buyer Guide',
    tags: ['logistics', 'export packaging', 'container shipping', 'marine insurance', 'HS codes', 'buyer guide'],
    heroImage: '/images/blog/glass-shipping-container-loading-hero.webp',
    heroImageAlt: 'Open 40-foot high-cube shipping container at a dock showing vertically crated architectural glass panels secured with ratchet straps, moisture absorber bags visible near ceiling',
    heroImagePrompt: "Industrial dock photography, late afternoon: a 40-foot high-cube shipping container with its rear doors fully open, revealing custom-built wooden A-frame crates stacked vertically against both side walls, each crate holding large architectural glass panels wrapped in foam padding and translucent plastic sheeting. Yellow ratchet straps clearly visible securing crates to interior tie-down rails. White moisture-absorber bags hanging from ceiling tie-down loops near the top of the container. Warm amber-golden sunlight streaming in through the open doors, casting long directional light across the glass stack and polished concrete dock floor. Weathered concrete port apron, forklift tines partially visible on the lower-left edge, container number stencilled on door panel. 25-degree camera angle slightly below the container doorway looking in, deep depth of field showing crates in the front and the rear door frame simultaneously. Clean industrial dock environment, no humans in frame. 4K photorealistic, documentary logistics-photography style, no text on crates or overlays.",
    author: DEFAULT_AUTHOR,
    readingTime: 17,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'buyer-guide',
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass'],
    translations: {},
    changelog: [
      { date: '2026-10-14', note: 'Initial publish — Buyer-Guide cluster article 2 of 3 (Pillar activates at 3)' },
    ],
  },
`;

  // Insert before the closing "];" of blogArticles array
  const marker = /\n\];\s*\n\n\/\/ ---- Utility functions ----/;
  if (!marker.test(registry)) {
    console.error('✗ Could not find insertion point in blog-registry.ts. Manual registry edit required.');
    process.exit(1);
  }
  registry = registry.replace(marker, `\n${entry}];\n\n// ---- Utility functions ----`);
  writeFileSync(REGISTRY_PATH, registry, 'utf8');
  console.log(`✓ Registry entry appended to ${REGISTRY_PATH}`);
}

// -----------------------------------------------------------------------------
// 4. Reciprocal intra-cluster link — Article #13 → Article #14
// -----------------------------------------------------------------------------

const SIBLING_PAGE = join(SRC, 'app', 'blog', 'how-to-import-glass-from-china', 'page.tsx');
if (!existsSync(SIBLING_PAGE)) {
  console.warn(`⚠ Could not find sibling page at ${SIBLING_PAGE}`);
  console.warn(`  Add a link to /blog/${SLUG} inside Article #13 manually (C18 intra-cluster linking rule).`);
} else {
  let sibling = readFileSync(SIBLING_PAGE, 'utf8');
  const alreadyLinked = sibling.includes(`/blog/${SLUG}`);
  if (alreadyLinked) {
    console.log(`• Article #13 already links to /blog/${SLUG} — reciprocal link OK.`);
  } else {
    // Try several insertion anchors in decreasing order of specificity
    const anchors = [
      // Anchor 1: a "More in Buyer's Guide" section (if the first article added one)
      {
        pattern: /(More in Buyer['’]s Guide[\s\S]{0,80}<div[^>]*>)/,
        insert: `$1\n            <a href="/blog/${SLUG}" className="block rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 hover:border-[#DAA745]/60 transition-colors p-5 no-underline">\n              <div className="text-xs text-[#DAA745] uppercase tracking-wider font-semibold mb-1">Buyer&apos;s Guide</div>\n              <div className="text-base font-semibold text-[#F2F0ED] mb-1">Glass Container Shipping: The Factory Playbook</div>\n              <div className="text-xs text-[#8B95A5] leading-relaxed">Crating, loading protocol, 6 damage zones, FCL vs LCL, marine insurance and HS codes — everything that happens after you place the order.</div>\n            </a>`,
      },
      // Anchor 2: ContainerLoadCalculator usage — Article #13 has one
      {
        pattern: /(<ContainerLoadCalculator[^/]*\/>)/,
        insert: `$1\n\n        <p className="text-sm text-[#8B95A5] italic mt-2">\n          For the operational pack side of this — crate types, loading protocol, damage prevention, insurance, and the pre-seal photo checklist — see our deep dive on <a href="/blog/${SLUG}">glass container shipping</a>.\n        </p>`,
      },
      // Anchor 3: FAQ open — put a reference sentence right before the FAQ heading
      {
        pattern: /(<FAQ\s)/,
        insert: `<p className="text-sm text-[#8B95A5] italic my-6">\n          Operational companion to this article: <a href="/blog/${SLUG}">glass container shipping — the factory playbook for crating, loading, and zero-damage delivery</a>.\n        </p>\n\n        $1`,
      },
    ];

    let patched = false;
    for (const { pattern, insert } of anchors) {
      if (pattern.test(sibling)) {
        sibling = sibling.replace(pattern, insert);
        patched = true;
        console.log(`✓ Reciprocal link added to Article #13 (anchor: ${pattern.source.slice(0, 40)}…)`);
        break;
      }
    }

    if (patched) {
      writeFileSync(SIBLING_PAGE, sibling, 'utf8');
    } else {
      console.warn(`⚠ No matching anchor in Article #13. Add a link to /blog/${SLUG} manually.`);
      console.warn(`  Suggested anchor text: "Operational companion: glass container shipping — the factory playbook."`);
    }
  }
}

console.log('\n=== Deploy complete ===');
console.log(`Next steps:`);
console.log(`  1. git add src/components/blog/article-14 src/app/blog/${SLUG} src/lib/blog-registry.ts src/app/blog/how-to-import-glass-from-china/page.tsx`);
console.log(`  2. git commit -m "Add Article #14 glass-shipping-container-loading-guide + reciprocal link"`);
console.log(`  3. git push → Vercel auto-deploys`);
console.log(`  4. Submit URL to Google Search Console for indexing`);
console.log(`  5. Verify SSR shadow + table captions by loading /blog/${SLUG} with JS disabled (SOP v2.3 checklist)`);
