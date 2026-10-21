import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SLUG = 'sgp-vs-pvb-interlayer-cost';
const ART_DIR = join(ROOT, 'src', 'components', 'blog', 'article-17');
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

console.log('\n=== Deploying Article #17: SGP vs PVB Interlayer Cost ===\n');

mkdirSync(ART_DIR, { recursive: true });
mkdirSync(PAGE_DIR, { recursive: true });

copy('InterlayerCostCalculator.tsx.txt',   join(ART_DIR, 'InterlayerCostCalculator.tsx'));
copy('PerformanceVsCostMatrix.tsx.txt',    join(ART_DIR, 'PerformanceVsCostMatrix.tsx'));
copy('UseCaseMatcher.tsx.txt',             join(ART_DIR, 'UseCaseMatcher.tsx'));
copy('page-article-17-sgp-vs-pvb-interlayer-cost.tsx.txt', join(PAGE_DIR, 'page.tsx'));

// Append registry entry (idempotent)
const regPath = join(ROOT, 'src', 'lib', 'blog-registry.ts');
let reg = readFileSync(regPath, 'utf8');

if (reg.includes("slug: '" + SLUG + "'") || reg.includes('slug: "' + SLUG + '"')) {
  console.log('\n[skip] registry entry already present for ' + SLUG);
} else {
  // Keep every string containing an apostrophe in double quotes or template literals.
  // See /projects/.../preferences.md re: Article #12 architect's bug.
  const entry = [
    '',
    '  {',
    "    slug: '" + SLUG + "',",
    "    title: \"SGP vs PVB Interlayer Cost: When the Ionoplast Premium Pays Back (And When It Doesn't)\",",
    "    excerpt: \"The interlayer alone is 15 to 40 percent of a laminated glass invoice. A factory-perspective guide to the real cost delta of SGP vs PVB, the performance SGP actually buys, the six specification scenarios we see most often, and a lifecycle ROI framework from a Wuhan laminating line.\",",
    "    targetKeyword: 'sgp vs pvb interlayer cost',",
    "    secondaryKeywords: [",
    "      'sgp vs pvb cost',",
    "      'sgp interlayer price',",
    "      'pvb vs sgp price difference',",
    "      'ionoplast vs pvb cost',",
    "      'sentryglas vs pvb cost',",
    "      'when to use sgp instead of pvb',",
    "    ],",
    "    searchKeywords: [",
    "      'sgp vs pvb cost', 'sgp interlayer price', 'pvb vs sgp price difference',",
    "      'ionoplast vs pvb cost', 'sentryglas pvb comparison cost',",
    "      'when to use sgp interlayer', 'sgp premium laminated glass',",
    "      'SGP', 'PVB', 'SG', 'ionoplast', 'SentryGlas',",
    "      'SGP\\u5939\\u5c42\\u4ef7\\u683c', 'PVB\\u4e0eSGP\\u6210\\u672c'",
    "    ],",
    "    publishDate: '2026-10-21',",
    "    updatedDate: '2026-10-21',",
    "    category: 'Product Knowledge' as const,",
    "    tags: ['laminated glass', 'SGP', 'PVB', 'interlayer', 'cost analysis', 'product deep dive', 'buyer guide'],",
    "    heroImage: '/images/blog/sgp-vs-pvb-interlayer-cost-hero.webp',",
    "    heroImageAlt: 'Macro split-screen comparison of PVB and SGP laminated glass edges showing the warm-amber PVB interlayer on the left and the crystal-clear SGP ionoplast interlayer on the right',",
    "    heroImagePrompt: \"Macro split-screen studio photography of two laminated glass edge samples standing on polished dark concrete surface. Left sample: 10mm+PVB+10mm laminated glass, edge-on view showing the characteristic warm-amber translucent PVB interlayer (0.76mm thick band) sandwiched between two clear glass panes, subtle optical warmth and slight visible flex at the interlayer line. Right sample: 10mm+SGP+10mm laminated glass, edge-on view showing the crystal-clear SGP ionoplast interlayer (1.52mm thick band), visually rigid structural lattice appearance, no amber tint. Both samples labelled with small discreet brass tag at the base reading just 'PVB' and 'SGP' in minimal serif font. Dark #1C1F26 background with warm #DAA745 amber rim lighting raking across the glass edges from the left, highlighting the interlayer bands. Shallow depth of field focused precisely on both interlayer bands simultaneously. 16:9 cinematic composition, 25-degree slight-above camera angle. No humans, no additional text, no brand logos. 4K photorealistic, museum-exhibit quality, documentary industrial photography style.\",",
    "    author: DEFAULT_AUTHOR,",
    "    readingTime: 15,",
    "    featured: false,",
    "    reviewedBy: { name: 'Albar', title: 'Technical Lead' },",
    "    articleType: 'buyer-guide' as const,",
    "    cluster: 'product',",
    "    relatedProductSlugs: ['laminated-glass', 'tempered-glass', 'insulated-glass'],",
    "    tldr: [",
    "      \"On a 6-0.76-6 clear laminate, PVB is about 15 percent of FOB cost. Swap to 1.52 mm SGP and the interlayer jumps to 35-40 percent of the finished laminate.\",",
    "      \"SGP buys three things PVB cannot deliver at any thickness: 100x the shear modulus (composite action), hours of post-breakage retention, and open-edge durability in humid climates.\",",
    "      \"SGP is not an acoustic upgrade. Standard PVB outperforms SGP on STC at the same build-up; acoustic PVB beats both.\",",
    "      \"Mix PVB and SGP in the same project. Facade IGUs and interior partitions: PVB. Balustrade, overhead, and open-edge details: SGP.\",",
    "      \"Edge sealing, delamination remediation, and the hardware upside of thinner SGP build-ups are hidden cost lines that quietly swing lifecycle math.\",",
    "      \"Decision rule: if the application is structural or safety-critical, or the edge is exposed, or the warranty is 10+ years, SGP wins on lifecycle cost even when PVB wins on day 0.\",",
    "    ],",
    "    buyerFaq: [",
    "      {",
    "        q: \"What is the MOQ for SGP vs PVB laminated glass export orders?\",",
    "        a: \"Standard PVB laminated runs at 100 m2 MOQ. SGP is 200 m2 because the material is often stock-limited and the autoclave cycle is longer. Below those thresholds the per-m2 price steps up for both.\",",
    "      },",
    "      {",
    "        q: \"How much longer is the lead time for an SGP order?\",",
    "        a: \"Standard PVB ships 25-35 days from PO. SGP typically ships 35-45 days. The delta is driven by SGP material lead time at Kuraray or Trosifol plus the longer autoclave cycle. For time-critical orders we reserve the SGP material at PO signing.\",",
    "      },",
    "      {",
    "        q: \"Can you supply both PVB and SGP marks under one PO?\",",
    "        a: \"Yes. Most projects we ship include a mix. Consolidating under one supplier gets you matched glass tint across marks, consistent certification paperwork, and a single bill of lading. Mixing cost delta is marginal — the SGP marks carry their own cost; the PVB marks keep theirs.\",",
    "      },",
    "      {",
    "        q: \"What certifications do you supply with SGP laminated glass?\",",
    "        a: \"Mill test certificates for the base glass, EN 12150 or ASTM C1048 tempering reports with surface compressive stress values, EN 12600 pendulum impact test reports for the specific build-up, EN 14449 CE marking documentation for EU shipments, and the Kuraray or Trosifol interlayer certificate of analysis with batch traceability. Heat-soak (EN 14179) certificates when specified.\",",
    "      },",
    "      {",
    "        q: \"How do I RFQ an SGP vs PVB cost comparison from your plant?\",",
    "        a: \"Send the glass schedule with each mark's build-up (e.g. '10-1.52-10 tempered SGP') plus the quantities per mark. We return a line-by-line PVB and SGP comparison for marks where both are credible, so you see the real delta for your specific project rather than a generic index.\",",
    "      },",
    "    ],",
    "    translations: {},",
    "    changelog: [",
    "      { date: '2026-10-21', note: 'Initial publish — second article in Product Deep Dives cluster' },",
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
console.log('Next: npm run build  (verify locally), then commit and push.');
console.log('Hero image still needed: /public/images/blog/sgp-vs-pvb-interlayer-cost-hero.webp\n');
