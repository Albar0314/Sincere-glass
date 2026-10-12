// deploy-article-12.mjs
// Deploys architectural-glass-applications-guide — Application Pillar Page
// Completes Application cluster: Pillar + 3 sub-articles (curtain-wall, balustrade, shower).
// Run from project root:  node edit\deploy-article-12.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.cwd();
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const SLUG = 'architectural-glass-applications-guide';
const SHORT = 'article-12';

const SRC_DIR_CANDIDATES = [
  path.join(ROOT, 'edit', SHORT),
  path.join(SCRIPT_DIR, SHORT),
  SCRIPT_DIR,
  path.join(ROOT, 'edit'),
];

function findSrcDir() {
  for (const dir of SRC_DIR_CANDIDATES) {
    if (
      fs.existsSync(path.join(dir, 'ApplicationZoneExplorer.tsx')) ||
      fs.existsSync(path.join(dir, 'ApplicationZoneExplorer.tsx.txt'))
    ) {
      return dir;
    }
  }
  return null;
}

const SRC_DIR = findSrcDir();
if (!SRC_DIR) {
  console.error('[deploy] cannot locate template files. Tried:');
  SRC_DIR_CANDIDATES.forEach((d) => console.error('  - ' + d));
  process.exit(1);
}

const FILES = [
  {
    fromCandidates: ['ApplicationZoneExplorer.tsx.txt', 'ApplicationZoneExplorer.tsx'],
    to: `src/components/blog/${SHORT}/ApplicationZoneExplorer.tsx`,
  },
  {
    fromCandidates: ['ApplicationGlassMatrix.tsx.txt', 'ApplicationGlassMatrix.tsx'],
    to: `src/components/blog/${SHORT}/ApplicationGlassMatrix.tsx`,
  },
  {
    fromCandidates: ['GlazingScheduleReader.tsx.txt', 'GlazingScheduleReader.tsx'],
    to: `src/components/blog/${SHORT}/GlazingScheduleReader.tsx`,
  },
  {
    fromCandidates: ['page.tsx.txt', 'page.tsx'],
    to: `src/app/blog/${SLUG}/page.tsx`,
  },
];

function copyAll() {
  for (const f of FILES) {
    let srcPath = null;
    for (const candidate of f.fromCandidates) {
      const p = path.join(SRC_DIR, candidate);
      if (fs.existsSync(p)) {
        srcPath = p;
        break;
      }
    }
    if (!srcPath) {
      console.error(
        `[deploy] MISSING source for ${f.to} — tried: ${f.fromCandidates.join(', ')} in ${SRC_DIR}`,
      );
      process.exit(1);
    }
    const dstPath = path.join(ROOT, f.to);
    fs.mkdirSync(path.dirname(dstPath), { recursive: true });
    fs.copyFileSync(srcPath, dstPath);
    console.log(`[deploy] wrote ${f.to}  (from ${path.basename(srcPath)})`);
  }
}

const REGISTRY_PATH = path.join(ROOT, 'src', 'lib', 'blog-registry.ts');

const REGISTRY_ENTRY = `
  {
    slug: 'architectural-glass-applications-guide',
    title: "Architectural Glass Applications: The Complete Buyer's Zone Guide",
    excerpt: "Six application zones cover 95% of commercial glazing — facade, interior, balustrade, shower, skylight, floor. Each has its own code, its own loads, its own default build-up. Interactive building explorer, decoded glazing schedule, and the zone-by-product decision matrix.",
    targetKeyword: 'architectural glass applications',
    secondaryKeywords: [
      'glass by application',
      'glass selection by application',
      'architectural glazing applications',
      'glass application guide',
      'glazing applications guide',
    ],
    searchKeywords: [
      'architectural glass applications', 'glass applications', 'glazing applications',
      'glass by application', 'glass selection by application',
      'application pillar guide', 'glass zone guide',
      'glazing schedule', 'glass spec sheet', 'glass application matrix',
      'facade glass', 'balustrade glass', 'shower glass', 'skylight glass', 'interior glass',
      'glass floor', 'glass stair', 'IGU facade', 'laminated balustrade',
      '建筑玻璃应用', '建筑玻璃选型', '幕墙 栏杆 淋浴 天窗', '玻璃应用场景', '按应用选玻璃',
    ],
    publishDate: '2026-10-12',
    updatedDate: '2026-10-12',
    category: 'Buyer Guide' as const,
    tags: ['pillar', 'architectural glass', 'applications', 'facade', 'balustrade', 'shower', 'skylight', 'glazing schedule', 'specification'],
    heroImage: '/images/blog/architectural-glass-applications-hero.webp',
    heroImageAlt: 'Modern mixed-use commercial building interior cutaway showing six distinct glass application zones — curtain wall facade, interior glass partition, atrium balustrade, shower enclosure, overhead skylight, and glass floor landing — in one unified architectural scene',
    heroImagePrompt: 'Wide-angle architectural illustration photograph of a modern mixed-use commercial building interior, cutaway cross-section view showing six distinct glass application zones in one scene: a floor-to-ceiling curtain wall facade on the far left reflecting cool daylight, an interior glass office partition center-left with subtle acoustic laminated edge visible, a frameless glass atrium balustrade with slim stainless base shoe center-right overlooking a lower atrium level, a frameless shower enclosure visible through an open bathroom door on the right, a geometric glass skylight overhead casting patterned light, and a small structural glass stair tread visible in the lower right. Clean modern architecture with polished concrete floors, warm wood accents, exposed structural steel. Each glass zone has subtle warm amber highlight showing its position. 25-degree camera angle with deep depth of field, cinematic daylight from the skylight above mixing with warm interior lighting. No humans in frame, no cluttered details, no text or watermarks. 4K photorealistic, museum-exhibit quality, documentary architectural style.',
    author: DEFAULT_AUTHOR,
    readingTime: 16,
    featured: true,
    isPillar: true,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'application' as const,
    relatedProductSlugs: ['tempered-glass', 'laminated-glass', 'insulated-glass', 'low-e-glass', 'enameled-glass'],
    tldr: [
      'Specify glass by application zone, not by product. Each of the six zones (facade / interior / balustrade / shower / skylight / floor) has its own code, loads, and default build-up.',
      'A glazing schedule compresses an entire specification into one line of notation. Reading it correctly — especially the surface number (#2 vs #3) and interlayer type (PVB vs SGP) — is where most specification errors hide.',
      'The decision flows in one direction: application → loads → required failure mode → build-up → certification. Starting from a product and working backward produces over-engineered facades and under-engineered balustrades.',
      'Tempered monolithic is restricted or forbidden in most life-safety applications (balustrade, skylight, floor) because it offers zero post-breakage retention. The shower is the one zone where it dominates.',
      'IGU and Low-E IGU dominate facade and overhead zones but are explicitly inappropriate for balustrade, shower, and floor applications. Any "IGU" outside facade/overhead is a probable specification error.',
      'One project typically has 3–5 distinct glass marks. A single "project glass" is almost always wrong — it either over-specifies partitions or under-specifies safety-critical zones.',
    ],
    buyerFaq: [
      {
        q: 'Can one factory supply all glass marks on a project, or do I need multiple vendors?',
        a: 'We can supply all five families (tempered, laminated, IGU, Low-E IGU, enameled) from the Wuhan plant for any project where the dimensions and quantities meet MOQ. The advantage of single-source is consistent certification paperwork, matched glass tint across marks (small colour differences between batches become visible when panels are adjacent), and consolidated shipping. For projects below 300 m² total, single-source is almost always more economical than multi-vendor.',
      },
      {
        q: 'What is the fastest turnaround for a mixed-mark project?',
        a: 'A typical project with 4-5 marks totalling 500–1500 m² ships 35–45 days from PO with full certification paperwork. Facade IGU and balustrade laminated are the critical-path items because they require the IGU line and the autoclave respectively — both operate on scheduled cycles. Shower and partition tempered run on the tempering line directly and are rarely the bottleneck. Sea freight to EU/US/AU adds 25–40 days.',
      },
      {
        q: 'Can you work from an architect\'s drawing set directly, or do you need a glass schedule?',
        a: 'Both. Our estimating team routinely reads full drawing sets (plans, sections, elevations) and extracts a glass schedule when the architect has not provided one — this is included in the quote process for projects over 500 m². For smaller projects we ask for the schedule or a filled-in RFQ template; working from scratch for small volumes delays the quote by 2-3 days.',
      },
    ],
    translations: {},
    changelog: [
      { date: '2026-10-12', note: 'Initial pillar publish — Application cluster Pillar Page, completing the three-pillar architecture (Types / Manufacturing / Applications)' },
    ],
  },
`;

function appendRegistryEntry() {
  if (!fs.existsSync(REGISTRY_PATH)) {
    console.error(`[deploy] registry not found: ${REGISTRY_PATH}`);
    process.exit(1);
  }
  let txt = fs.readFileSync(REGISTRY_PATH, 'utf8');

  if (txt.includes(`slug: 'architectural-glass-applications-guide'`)) {
    console.log('[deploy] registry entry already present — skipping');
    return;
  }

  const anchor = 'export const blogArticles: BlogArticle[] = [';
  const anchorIdx = txt.indexOf(anchor);
  if (anchorIdx === -1) {
    console.error('[deploy] cannot find blogArticles anchor');
    process.exit(1);
  }
  const closingIdx = txt.indexOf('\n];', anchorIdx);
  if (closingIdx === -1) {
    console.error('[deploy] cannot find closing ]; for blogArticles');
    process.exit(1);
  }
  const before = txt.slice(0, closingIdx);
  const after = txt.slice(closingIdx);
  const updated = before + REGISTRY_ENTRY + after;
  fs.writeFileSync(REGISTRY_PATH, updated, 'utf8');
  console.log(`[deploy] appended registry entry for ${SLUG}`);
}

console.log(`[deploy] Article #12 (Application PILLAR): ${SLUG}`);
console.log(`[deploy] Source: ${SRC_DIR}`);
console.log(`[deploy] Target root: ${ROOT}`);
console.log('');

copyAll();
appendRegistryEntry();

console.log('');
console.log('[deploy] DONE. Next steps:');
console.log('  1. Review changes in your git client');
console.log('  2. Run `npm run build` locally to catch any TS errors');
console.log('  3. git commit + push → Vercel auto-deploys');
console.log('  4. Place hero image at: public/images/blog/architectural-glass-applications-hero.webp');
console.log('     (prompt in registry heroImagePrompt field)');
console.log('  5. Application cluster now complete: Pillar + 3 sub-articles.');
console.log('     Three-pillar architecture achieved (Types / Manufacturing / Applications).');
