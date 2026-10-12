// deploy-article-11.mjs
// Deploys balustrade-glass-specification article (Application cluster #3 — unlocks Pillar eligibility).
// Run from project root:  node edit\deploy-article-11.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.cwd();
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const SLUG = 'balustrade-glass-specification';
const SHORT = 'article-11';

// Try these source directories in order — stops at the first one that has the templates.
const SRC_DIR_CANDIDATES = [
  path.join(ROOT, 'edit', 'article-11'),
  path.join(SCRIPT_DIR, 'article-11'),
  SCRIPT_DIR,
  path.join(ROOT, 'edit'),
];

function findSrcDir() {
  for (const dir of SRC_DIR_CANDIDATES) {
    if (
      fs.existsSync(path.join(dir, 'LoadCaseSelector.tsx')) ||
      fs.existsSync(path.join(dir, 'LoadCaseSelector.tsx.txt'))
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

// ─── Component + page file placements ──────────────────────────────────
const FILES = [
  {
    fromCandidates: ['LoadCaseSelector.tsx.txt', 'LoadCaseSelector.tsx'],
    to: `src/components/blog/${SHORT}/LoadCaseSelector.tsx`,
  },
  {
    fromCandidates: ['BuildupLab.tsx.txt', 'BuildupLab.tsx'],
    to: `src/components/blog/${SHORT}/BuildupLab.tsx`,
  },
  {
    fromCandidates: ['PendulumImpactSimulator.tsx.txt', 'PendulumImpactSimulator.tsx'],
    to: `src/components/blog/${SHORT}/PendulumImpactSimulator.tsx`,
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

// ─── Registry entry ────────────────────────────────────────────────────
const REGISTRY_PATH = path.join(ROOT, 'src', 'lib', 'blog-registry.ts');

const REGISTRY_ENTRY = `
  {
    slug: 'balustrade-glass-specification',
    title: 'Balustrade Glass Specification: Loads, Build-ups, and the Pendulum Test That Decides the Spec',
    excerpt: "Balustrade glass is not specified by thickness — it is specified by load case and failure behaviour. The 4 load inputs, 3 real-world build-ups (monolithic / PVB / SGP), EN 12600 impact classes, and the hardware decisions that quietly drive the glass make-up. Factory-perspective guide from a Wuhan laminating line.",
    targetKeyword: 'balustrade glass specification',
    secondaryKeywords: [
      'glass balustrade specification',
      'glass balustrade thickness',
      'glass railing specification',
      'balcony glass specification',
      'frameless glass balustrade',
      'laminated glass balustrade',
    ],
    searchKeywords: [
      'balustrade glass', 'balustrade glass specification', 'glass balustrade',
      'glass railing specification', 'glass guard specification',
      'frameless glass balustrade', 'laminated glass balustrade',
      'balcony glass thickness', 'glass railing thickness',
      'EN 12600', 'EN 1991-1-1', 'ASCE 7', 'IBC 2407', 'AS 1288', 'GB 50210',
      'SGP SentryGlas', 'PVB laminated', 'pendulum impact test',
      '栏杆玻璃', '玻璃栏杆', '阳台玻璃栏杆', '夹胶玻璃栏板', '栏板玻璃',
    ],
    publishDate: '2026-10-12',
    updatedDate: '2026-10-12',
    category: 'Buyer Guide' as const,
    tags: ['balustrade', 'glass railing', 'laminated glass', 'tempered glass', 'SGP', 'EN 12600', 'building codes', 'application'],
    heroImage: '/images/blog/balustrade-glass-hero.webp',
    heroImageAlt: 'Modern frameless glass balustrade on a commercial mezzanine with slim base-shoe mounting and continuous laminated panels',
    heroImagePrompt: 'Professional architectural photography of a modern commercial mezzanine with a frameless glass balustrade. Four large laminated glass panels (approximately 1.5m wide by 1.1m high each) mounted in a continuous slim stainless-steel base shoe, no top-rail, creating an uninterrupted glass guard along the mezzanine edge. The glass has a subtle greenish tint from the SGP interlayer visible at the laminated edge seam. Polished concrete floor on the mezzanine side, visible atrium drop beyond the glass showing a clean modern commercial interior with warm wood accents. 25-degree camera angle looking along the balustrade run with shallow depth of field focused on the mid-panel, mounting hardware visible but understated. Soft daylight from an atrium skylight above casting cool natural light on the glass with warm amber accent lighting on nearby surfaces. Clean modern architecture, no humans in frame, no cluttered background elements, no text or watermarks. 4K photorealistic, architectural documentary style.',
    author: DEFAULT_AUTHOR,
    readingTime: 15,
    featured: false,
    reviewedBy: { name: 'Albar', title: 'Technical Lead' },
    articleType: 'buyer-guide' as const,
    cluster: 'application' as const,
    relatedProductSlugs: ['laminated-glass', 'tempered-glass', 'insulated-glass'],
    tldr: [
      'Balustrade glass is specified by load case, not thickness. The four inputs are: horizontal line load (kN/m), concentrated point load, infill area load, and soft-body impact class (EN 12600).',
      'Framed and frameless balustrades are different structural problems. Frameless makes the glass a cantilever and roughly doubles the required thickness.',
      'Monolithic tempered is now restricted in most codes for guard duty. The default commercial build-up is 8+1.52+8 PVB (framed) or 10+1.52+10 SGP (frameless).',
      'EN 12600 Class 1(B)1 — 1200 mm pendulum drop — is required for frameless or public-access balustrades. Class 2(B)2 (450 mm) is the residential minimum.',
      'Mounting hardware drives the glass spec. Base shoe allows the thinnest viable build-up; standoff fittings and spigots step the glass up one notch.',
      'Heat-soaked (EN 14179) tempered is non-optional for balustrade work. The ~15% cost premium eliminates spontaneous NiS failure after installation.',
    ],
    buyerFaq: [
      {
        q: "What's the typical MOQ for custom balustrade glass orders?",
        a: 'Our standard MOQ for laminated tempered balustrade glass is 100 m² per order, or roughly 60 panels at typical 1.5 m × 1.1 m dimensions. For specialty build-ups (SGP interlayer, jumbo sizes above 3 m, custom coloured interlayer) MOQ steps up to 200 m². We quote smaller runs case-by-case, especially for repeat projects.',
      },
      {
        q: 'How long does a balustrade glass order take from PO to shipment?',
        a: 'Standard build-ups ship in 25–35 days from PO. Heat-soaked tempered laminated with PVB: 30 days. SGP laminated: 35–40 days (SGP interlayer has a slightly longer autoclave cycle and is sometimes stock-limited). Jumbo sizes above 3 m: add 7–10 days for scheduling the jumbo line. Sea freight to EU/US/AU adds 25–40 days depending on route.',
      },
      {
        q: 'What test certificates do you provide with balustrade glass shipments?',
        a: 'Every shipment includes mill test certificates for the base glass, EN 12150 or ASTM C1048 tempering certificates with surface compressive stress values, EN 12600 or equivalent pendulum impact test reports for the specific build-up, EN 14179 heat-soak test certificates when specified, and SGP/PVB interlayer MSDS and performance datasheets. For EU shipments we provide CE marking documentation per EN 14449.',
      },
    ],
    translations: {},
    changelog: [
      { date: '2026-10-12', note: 'Initial publish — third article in Application cluster, unlocks Pillar eligibility' },
    ],
  },
`;

function appendRegistryEntry() {
  if (!fs.existsSync(REGISTRY_PATH)) {
    console.error(`[deploy] registry not found: ${REGISTRY_PATH}`);
    process.exit(1);
  }
  let txt = fs.readFileSync(REGISTRY_PATH, 'utf8');

  if (txt.includes(`slug: 'balustrade-glass-specification'`)) {
    console.log('[deploy] registry entry already present — skipping');
    return;
  }

  // Insert new entry just before the closing `];` of the blogArticles array.
  // Marker: the first `\n];\n` after `export const blogArticles`.
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

// ─── Run ───────────────────────────────────────────────────────────────
console.log(`[deploy] Article #11: ${SLUG}`);
console.log(`[deploy] Source: ${SRC_DIR}`);
console.log(`[deploy] Target root: ${ROOT}`);
console.log('');

copyAll();
appendRegistryEntry();

console.log('');
console.log('[deploy] DONE. Next steps:');
console.log('  1. Review changes in your git client');
console.log('  2. Run `npm run build` locally to catch any TS errors before pushing');
console.log('  3. git commit + push → Vercel auto-deploys');
console.log('  4. (Optional) Add reciprocal intra-cluster back-links in:');
console.log('     - src/app/blog/curtain-wall-glass-specification/page.tsx');
console.log('     - src/app/blog/shower-glass-thickness-guide/page.tsx');
console.log('  5. Place hero image at: public/images/blog/balustrade-glass-hero.webp');
console.log('     (prompt in registry heroImagePrompt field)');
console.log('  6. SOP §6: Application cluster now at 3 articles — Pillar Page activation unlocked');
