import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SLUG = 'curved-glass-vs-flat-glass';
const ART_DIR = join(ROOT, 'src', 'components', 'blog', 'article-20');
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

console.log('\n=== Deploying Article #20: Curved Glass vs Flat Glass ===\n');

mkdirSync(ART_DIR, { recursive: true });
mkdirSync(PAGE_DIR, { recursive: true });

copy('CurvedPremiumCalculator.tsx.txt',   join(ART_DIR, 'CurvedPremiumCalculator.tsx'));
copy('ShapeRequirementChecker.tsx.txt',   join(ART_DIR, 'ShapeRequirementChecker.tsx'));
copy('ProjectFitAdvisor.tsx.txt',         join(ART_DIR, 'ProjectFitAdvisor.tsx'));
copy('page-article-20-curved-glass-vs-flat-glass.tsx.txt', join(PAGE_DIR, 'page.tsx'));

// --- Patch RelatedProductsCards PRODUCT_MAP (idempotent) ---
const rpPath = join(ROOT, 'src', 'components', 'blog', 'RelatedProductsCards.tsx');
if (existsSync(rpPath)) {
  let rp = readFileSync(rpPath, 'utf8');
  if (rp.includes("'curved-tempered-glass':")) {
    console.log('[skip] RelatedProductsCards PRODUCT_MAP already has curved-tempered-glass');
  } else {
    // Anchor: the enameled-glass entry, add curved-tempered-glass after it
    const marker = /('enameled-glass':\s*\{[\s\S]*?\},)/;
    if (!marker.test(rp)) {
      console.error('[warn] could not find enameled-glass anchor in RelatedProductsCards.tsx');
      console.error('       curved-tempered-glass will not appear in Related Products — add manually.');
    } else {
      const newEntry = [
        "  'curved-tempered-glass': {",
        "    title: 'Curved Tempered Glass',",
        "    tagline: 'Hot-bent from a 500 mm minimum radius. Up to 3.3 m \\u00d7 15 m per panel.',",
        "    image: '/images/products/curved-tempered.jpg',",
        "  },",
      ].join('\n');
      rp = rp.replace(marker, '$1\n' + newEntry);
      writeFileSync(rpPath, rp);
      console.log('[ok]   RelatedProductsCards.tsx PRODUCT_MAP patched');
    }
  }
} else {
  console.log('[skip] RelatedProductsCards.tsx not found at expected path');
}

// --- Append registry entry (idempotent) ---
const regPath = join(ROOT, 'src', 'lib', 'blog-registry.ts');
let reg = readFileSync(regPath, 'utf8');

if (reg.includes("slug: '" + SLUG + "'") || reg.includes('slug: "' + SLUG + '"')) {
  console.log('\n[skip] registry entry already present for ' + SLUG);
} else {
  const entry = [
    '',
    '  {',
    "    slug: '" + SLUG + "',",
    "    title: \"Curved Glass vs Flat Glass: When the Shape Premium Is Worth It (And When It Is Not)\",",
    "    excerpt: \"Flat tempered glass is the default; curved is what you reach for when a specific constraint forces it. A factory-side guide to the real cost delta, the geometry decisions that actually require a curve, and six project scenarios with specific build-up and cost recommendations from a Wuhan line that produces both.\",",
    "    targetKeyword: 'curved glass vs flat glass',",
    "    secondaryKeywords: [",
    "      'curved vs flat glass',",
    "      'curved vs flat tempered',",
    "      'bent glass vs flat glass',",
    "      'when to use curved glass',",
    "      'curved vs flat facade',",
    "      'curved glass cost comparison',",
    "    ],",
    "    searchKeywords: [",
    "      'curved glass vs flat glass', 'curved vs flat tempered', 'bent glass vs flat',",
    "      'curved vs flat facade', 'when to use curved glass', 'curved glass comparison',",
    "      'curved glass cost', 'curved tempered price', 'flat vs bent glass',",
    "      'curved', 'bent', 'flat', 'cylindrical', 'spherical', 'free-form',",
    "      '\\u5f2f\\u94a2\\u73bb\\u7483 \\u5e73\\u73bb\\u7483', '\\u5f2f\\u73bb\\u7483\\u5bf9\\u6bd4', '\\u70ed\\u5f2f\\u5e73\\u73bb\\u7483'",
    "    ],",
    "    publishDate: '2026-10-26',",
    "    updatedDate: '2026-10-26',",
    "    category: 'Buyer Guide' as const,",
    "    tags: ['curved glass', 'flat glass', 'tempered glass', 'comparison', 'facade', 'cost analysis'],",
    "    heroImage: '/images/blog/curved-vs-flat-glass-hero.webp',",
    "    heroImageAlt: 'Side-by-side comparison of a curved tempered glass panel on the left and a flat tempered glass panel on the right, both standing vertically on polished dark concrete under warm amber industrial lighting',",
    "    heroImagePrompt: \"Studio product photography, two architectural tempered glass panels standing vertically side by side on polished dark concrete surface. Left panel: curved tempered glass, approximately 2 m tall, single-axis cylindrical curve at roughly 1,500 mm radius, warm amber reflections subtly flowing across the curved surface. Right panel: flat tempered glass of identical height, same thickness, same dark concrete reflection at the base. Both panels edge-lit from above-left with warm amber accent lighting creating subtle golden rim highlights. Dark industrial backdrop (#1C1F26) with amber accent (#DAA745) rim lighting raking from the left. 25-degree slight-above camera angle, shallow depth of field focused on both panels simultaneously. Visible depth and transparency through both panels. 16:9 cinematic composition. No humans, no additional props, no text, no watermarks. 4K photorealistic, museum-exhibit quality, documentary industrial photography style.\",",
    "    author: DEFAULT_AUTHOR,",
    "    readingTime: 14,",
    "    featured: false,",
    "    reviewedBy: { name: 'Albar', title: 'Technical Lead' },",
    "    articleType: 'comparison' as const,",
    "    cluster: 'comparison',",
    "    relatedProductSlugs: ['curved-tempered-glass', 'tempered-glass', 'laminated-glass'],",
    "    tldr: [",
    "      \"Flat tempered glass is the architectural default. Curved is what you reach for when a specific geometric or visual constraint forces it, not a stylistic equivalent.\",",
    "      \"Curved cost premium: 70-110 percent over flat for standard cylindrical radii, 120-200 percent for tight radii under 800 mm, with spherical and free-form adding another 50 and 95 percent respectively.\",",
    "      \"Flat still wins on cost per square meter, panel-size envelope, repair availability, standards uniformity, and container shipping efficiency (650-800 m2 per 40ft vs 350-550 m2 curved).\",",
    "      \"Curved earns the premium when: (1) geometry physically demands it, (2) visual continuity matters at the viewing distance, (3) panels are large enough that facet joints would read, (4) budget absorbs the premium. Fewer than four pressure factors usually means hybrid is the right answer.\",",
    "      \"Hybrid strategy keeps the glass premium under 25 percent of pure-curved budget: curved at ground-floor focal zones, faceted flat for upper floors and back-of-house.\",",
    "      \"Lead time delta: 25-35 days curved cylindrical, 35-55 days spherical, 45-70 days free-form (vs 20-30 days flat). Budget mold archival and 1-2 spare panels on high-risk ground-floor curved installations.\",",
    "    ],",
    "    buyerFaq: [",
    "      {",
    "        q: \"Can you quote both curved and flat options line-by-line for one project?\",",
    "        a: \"Yes, and we recommend it. Send the glass schedule with each mark's intended spec. We return a comparison showing curved price, flat price, and the delta for every mark where both are credible. The decision then belongs to the design team with real numbers rather than a generic index.\",",
    "      },",
    "      {",
    "        q: \"What is the smallest project you will quote curved tempered on?\",",
    "        a: \"No hard minimum for cylindrical panels — single-panel orders are possible using our reusable steel molds. For spherical and free-form, 4 panels per unique profile is typical to keep per-unit mold cost reasonable. For projects under 10 m2 of curved glass, discuss directly — we may suggest a slightly adjusted radius that matches an existing archived mold to avoid new tooling cost.\",",
    "      },",
    "      {",
    "        q: \"Do you ship curved and flat orders in the same container?\",",
    "        a: \"Yes, routinely. Curved panels ship in custom nested cradles that occupy more volume per m2 than flat A-frame crates, so mixed-load container efficiency depends on the ratio. We provide a loading diagram at RFQ showing exact m2 per container for your specific order mix so you can model freight accurately before PO.\",",
    "      },",
    "      {",
    "        q: \"Will your curved tempered glass meet US and EU safety standards?\",",
    "        a: \"Yes. Our curved tempered is produced to GB 15763.2 (China safety glass) and EN 12150 (European tempered glass standard). It carries China 3C (CCC) certification. For export orders we provide EN 12150 test reports as standard and ANSI Z97.1 test reports on request. For Australian projects, AS 1288 compliance documentation is also available.\",",
    "      },",
    "      {",
    "        q: \"How do I lock down a quote for a project that is still in design development?\",",
    "        a: \"Send what you have — even a schematic layout and target radius range is enough for a planning-grade quote. We mark it clearly as planning estimate on the RFQ response and lock it only when the drawings are at construction-document stage. This lets your design team budget the glass line without waiting for final drawings.\",",
    "      },",
    "    ],",
    "    translations: {},",
    "    changelog: [",
    "      { date: '2026-10-26', note: 'Initial publish — fourth article in Comparison cluster, first curved-glass article in blog' },",
    "    ],",
    "  },",
    '',
  ].join('\n');

  // Insert before the closing `];` of blogArticles array.
  const marker = '\n];\n\n// ---- Utility functions ----';
  if (!reg.includes(marker)) {
    console.error('\n[fail] could not locate registry closing marker. Manual append required.');
    process.exit(1);
  }

  reg = reg.replace(marker, entry + '];\n\n// ---- Utility functions ----');
  writeFileSync(regPath, reg);
  console.log('[ok]   registry entry appended for ' + SLUG);
}

console.log('\n=== Done ===\n');
console.log('Next:');
console.log('  1. npm run build         (verify locally)');
console.log('  2. commit and push');
console.log('  3. node scripts\\translate-all.mjs    (ES mirror)');
console.log('');
console.log('Hero image still needed:');
console.log('  /public/images/blog/curved-vs-flat-glass-hero.webp');
console.log('  (AI prompt in registry entry heroImagePrompt field)');
console.log('');
