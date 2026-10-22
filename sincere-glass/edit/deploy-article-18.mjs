import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SLUG = 'jumbo-architectural-glass-panels';
const ART_DIR = join(ROOT, 'src', 'components', 'blog', 'article-18');
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

console.log('\n=== Deploying Article #18: Jumbo Architectural Glass Panels ===\n');

mkdirSync(ART_DIR, { recursive: true });
mkdirSync(PAGE_DIR, { recursive: true });

copy('JumboCapabilityExplorer.tsx.txt',   join(ART_DIR, 'JumboCapabilityExplorer.tsx'));
copy('TransportCrateVisualizer.tsx.txt',  join(ART_DIR, 'TransportCrateVisualizer.tsx'));
copy('JumboRFQBuilder.tsx.txt',           join(ART_DIR, 'JumboRFQBuilder.tsx'));
copy('page-article-18-jumbo-architectural-glass-panels.tsx.txt', join(PAGE_DIR, 'page.tsx'));

// Append registry entry (idempotent).
// All content strings inside the registry entry are wrapped in double-quotes
// so apostrophes (can't, don't, it's, architect's, supplier's, world's) are safe.
// See /projects/.../preferences.md re: Article #12 architect's single-quote bug.
const regPath = join(ROOT, 'src', 'lib', 'blog-registry.ts');
let reg = readFileSync(regPath, 'utf8');

if (reg.includes("slug: '" + SLUG + "'") || reg.includes('slug: "' + SLUG + '"')) {
  console.log('\n[skip] registry entry already present for ' + SLUG);
} else {
  const entry = [
    '',
    '  {',
    "    slug: '" + SLUG + "',",
    "    title: \"Jumbo Architectural Glass Panels: Capability, Specs, and Sourcing for 3 m x 15 m Builds\",",
    "    excerpt: \"Jumbo glass starts at the point most factories can't produce it. A capability-driven guide to the physical limits of oversized tempered, laminated, and insulated panels, the four hard gates that filter the global supplier set, the transport reality from port to crane, and the 10-field RFQ that stops a landmark facade from drifting over budget. Written from a Wuhan line that runs 3 m x 15 m tempering and dry-laminating daily.\",",
    "    targetKeyword: 'jumbo architectural glass panels',",
    "    secondaryKeywords: [",
    "      'oversized tempered glass',",
    "      'large format glass panels',",
    "      'jumbo tempered glass size',",
    "      'maximum glass panel size',",
    "      '3m x 15m glass',",
    "      'oversized architectural glass',",
    "    ],",
    "    searchKeywords: [",
    "      'jumbo glass', 'jumbo architectural glass', 'oversized glass panels',",
    "      'oversized tempered glass', 'large format glass', 'maximum tempered glass size',",
    "      'jumbo laminated glass', 'jumbo IGU', 'oversized IG unit',",
    "      'jumbo furnace', 'large architectural glass panels',",
    "      '3m x 15m glass', '3000 x 15000 mm glass', 'ultra-jumbo glass',",
    "      '\\u8d85\\u5927\\u73bb\\u7483', '\\u8d85\\u5927\\u5c3a\\u5bf8\\u94a2\\u5316\\u73bb\\u7483',",
    "      '\\u5de8\\u578b\\u73bb\\u7483\\u5e55\\u5899', '\\u5f02\\u578b\\u8d85\\u5927\\u5939\\u80f6\\u73bb\\u7483'",
    "    ],",
    "    publishDate: '2026-10-22',",
    "    updatedDate: '2026-10-22',",
    "    category: 'Product Knowledge' as const,",
    "    tags: ['tempered glass', 'laminated glass', 'insulated glass', 'jumbo glass', 'oversized glass', 'procurement', 'product deep dive'],",
    "    heroImage: '/images/blog/jumbo-architectural-glass-panels-hero.webp',",
    "    heroImageAlt: 'Industrial photography of a 3 m by 15 m jumbo tempered architectural glass panel being lifted vertically by overhead crane rig from a jumbo tempering furnace in a modern factory',",
    "    heroImagePrompt: \"Wide-angle industrial photography inside a modern jumbo glass tempering plant. Centerpiece: a single 3 m x 15 m ultra-large tempered architectural glass panel suspended vertically by an overhead gantry crane with specialized vacuum-cup lifting rig gripping the top edge. Panel appears pristine with a subtle warm reflection catching rim-light from the still-visible furnace glow in the background. Scale is emphasized by a human-less environment with proportional industrial elements: the panel visibly reaches from near the polished concrete floor to several meters below the high factory ceiling. Behind the panel, the open end of a horizontal roller-hearth jumbo tempering furnace is visible, interior still radiating warm orange glow from heating elements. Overhead ceiling-mounted crane rail runs the full length of the frame. Industrial lighting with warm amber accent from the furnace creating subtle highlights across the glass surface and polished concrete floor. 25-degree camera angle from mezzanine viewing position, deep depth of field keeping both the panel and the furnace in focus. Clean modern factory environment, no humans in frame, no visible text or watermarks. 4K photorealistic, documentary industrial photography style, museum-exhibit quality lighting.\",",
    "    author: DEFAULT_AUTHOR,",
    "    readingTime: 17,",
    "    featured: false,",
    "    reviewedBy: { name: 'Albar', title: 'Technical Lead' },",
    "    articleType: 'buyer-guide' as const,",
    "    cluster: 'product',",
    "    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass'],",
    "    tldr: [",
    "      \"Jumbo is not one threshold. Tempered mono jumps to jumbo past 2.6 x 5 m, laminated past 2.5 x 6 m, and sealed IGU past 2.5 x 4 m. Mix them at RFQ and get three different no answers.\",",
    "      \"Four hard gates filter global jumbo capability: tempering furnace envelope, laminating autoclave, IG assembly line, and transport. Any single gate failing blocks the panel.\",",
    "      \"The Sincere Wuhan envelope is 3 x 15 m tempering, 3 x 15 m dry-laminating autoclave, and 3 x 6 m sealed IG. Beyond 3 x 15 m, the global supplier count collapses to the low hundreds.\",",
    "      \"Transport almost never bottlenecks jumbo. 40 ft high-cube handles up to 11.8 m longest side; flat rack covers 12 m; breakbulk handles the rest. Port handling and site crane access collapse projects first.\",",
    "      \"Three failure modes become serious at jumbo scale: uneven quench thermal breakage, roller wave distortion, and delamination edge creep. Supplier quality systems that catch these are the ones that survive the warranty period.\",",
    "      \"On RFQ, the five confirm-explicitly questions a jumbo-capable factory should answer in its first reply are the shortlist filter. A supplier who dodges question one is not jumbo-ready.\",",
    "    ],",
    "    buyerFaq: [",
    "      {",
    "        q: \"What is the MOQ for jumbo architectural glass export orders?\",",
    "        a: \"Standard jumbo tempered monolithic MOQ is 50 m2 at our Wuhan plant. Jumbo laminated runs 100 m2 MOQ. Jumbo sealed IGU is 150 m2. Below those thresholds the per-m2 price steps up because jumbo-line setup and furnace-fill-factor costs cannot be amortized across the order.\",",
    "      },",
    "      {",
    "        q: \"How long is lead time for jumbo tempered glass vs standard sizes?\",",
    "        a: \"Standard-size tempered ships 25 to 35 days from PO. Jumbo tempered monolithic ships 8 to 10 weeks because jumbo furnace slot allocation is scheduled 4 to 6 weeks out. Jumbo laminated adds 2 to 3 weeks for the autoclave cycle and interlayer lead time. Jumbo IGU adds 1 to 2 weeks beyond that. For time-critical orders we reserve the jumbo-line slot at PO signing.\",",
    "      },",
    "      {",
    "        q: \"Can you supply jumbo and standard-size panels under one PO?\",",
    "        a: \"Yes, and we recommend it on mixed-bay projects. Jumbo panels for the landmark bays, standard-size panels for the regular bays, consolidated under one PO. You get matched glass tint across all marks, consistent certification paperwork, a single bill of lading, and often a materially lower blended per-m2 price than quoting the jumbo and standard panels to separate suppliers.\",",
    "      },",
    "      {",
    "        q: \"What certifications do you supply with jumbo architectural glass?\",",
    "        a: \"Mill test certificate for the base float glass, EN 12150 or ASTM C1048 tempering report with surface compressive stress values, EN 14179 heat-soak certificate (included by default on all jumbo tempered), EN 12543 or ASTM C1172 lamination certificate with Kuraray or Trosifol or Eastman interlayer batch traceability, EN 1279 IGU durability report with argon fill rate measurement, EN 14449 CE marking documentation for EU shipments. SGCC certification for US bid work on request.\",",
    "      },",
    "      {",
    "        q: \"How do I RFQ jumbo glass from your plant?\",",
    "        a: \"Use the RFQ builder in this article to generate a 10-field RFQ block, then send it to our export team at the address on our contact page. The 10 fields are the minimum we need to quote accurately; the five confirm-explicitly questions in the generated RFQ are the ones we answer in our first reply so you can shortlist us against other suppliers on equal information.\",",
    "      },",
    "    ],",
    "    translations: {},",
    "    changelog: [",
    "      { date: '2026-10-22', note: 'Initial publish \\u2014 third article in Product Deep Dives cluster (activates Pillar threshold)' },",
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
console.log('Next steps:');
console.log('  1. npm run build  (verify locally)');
console.log('  2. commit + push to main (Vercel auto-deploys)');
console.log('  3. Generate hero image per prompt in registry (/public/images/blog/jumbo-architectural-glass-panels-hero.webp)');
console.log('  4. GSC: Request Indexing for https://sincereglass.com/blog/' + SLUG);
console.log('  5. Product cluster now at 3 articles -> Product Pillar activation unlocked (next session)\n');
