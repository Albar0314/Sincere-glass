// deploy-article-15.mjs
// Run from project root: `node edit\deploy-article-15.mjs`
//
// Deploys Blog Article #15: `/blog/architectural-glass-supplier-china-vetting`
// - Copies 3 interactive components → src/components/blog/article-15/
// - Copies article page             → src/app/blog/architectural-glass-supplier-china-vetting/page.tsx
// - Appends registry entry          → src/lib/blog-registry.ts (idempotent)
// - Adds reciprocal link to #13     → src/app/blog/how-to-import-glass-from-china/page.tsx (3 fallback anchors)

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const ROOT = process.cwd();
const EDIT = join(ROOT, 'edit');
const SLUG = 'architectural-glass-supplier-china-vetting';

// ─── 1. Templates to copy ──────────────────────────────────────────────────
const copies = [
  {
    from: 'RiskExposureProfiler.tsx.txt',
    to: 'src/components/blog/article-15/RiskExposureProfiler.tsx',
  },
  {
    from: 'CertVerifier.tsx.txt',
    to: 'src/components/blog/article-15/CertVerifier.tsx',
  },
  {
    from: 'VideoAuditChecklist.tsx.txt',
    to: 'src/components/blog/article-15/VideoAuditChecklist.tsx',
  },
  {
    from: 'page-article-15-architectural-glass-supplier-china-vetting.tsx.txt',
    to: `src/app/blog/${SLUG}/page.tsx`,
  },
];

for (const { from, to } of copies) {
  const src = join(EDIT, from);
  const dst = join(ROOT, to);
  if (!existsSync(src)) {
    console.error(`[FAIL] Missing template: ${src}`);
    process.exit(1);
  }
  mkdirSync(dirname(dst), { recursive: true });
  const content = readFileSync(src, 'utf8');
  writeFileSync(dst, content);
  console.log(`[OK]   ${to}`);
}

// ─── 2. Registry entry (idempotent) ────────────────────────────────────────
const registryPath = join(ROOT, 'src/lib/blog-registry.ts');
const registrySrc = readFileSync(registryPath, 'utf8');

const ENTRY_MARKER = `slug: "${SLUG}"`;
if (registrySrc.includes(ENTRY_MARKER) || registrySrc.includes(`slug: '${SLUG}'`)) {
  console.log(`[skip] Registry already contains ${SLUG}`);
} else {
  // Entry uses double-quoted strings throughout to safely include apostrophes
  // ("buyer's", "won't", "don't") without escape risk (per project SOP rule).
  const entry = `
  {
    slug: "${SLUG}",
    title: "How to Vet a China Glass Supplier: A 5-Risk Threat Model from the Factory Floor",
    excerpt: "The deep-dive playbook on supplier vetting: five independent risks, the free document checks that cost nothing, the 90-minute video audit script by station, the eight certifications decoded against their public registries, and the signals that are negotiable vs the ones to walk away from.",
    targetKeyword: "how to vet a china glass supplier",
    secondaryKeywords: [
      "china glass supplier audit",
      "vet glass manufacturer china",
      "glass factory audit checklist",
      "verify china glass factory",
      "chinese glass supplier verification",
    ],
    searchKeywords: [
      "how to vet a china glass supplier",
      "china glass supplier audit",
      "glass factory audit checklist",
      "verify china glass factory",
      "vet glass manufacturer china",
      "chinese glass supplier verification",
      "glass supplier vetting",
      "glass supplier due diligence",
      "pre-shipment inspection glass",
      "SGCC verification",
      "CNAS",
      "GSXT",
      "SGS CCIC BV",
      "DoP CE marking",
      "NANDO",
      "工厂审核",
      "玻璃厂验厂",
      "供应商审核清单",
      "营业执照查询",
      "企查查 天眼查",
    ],
    publishDate: "2026-10-15",
    updatedDate: "2026-10-15",
    category: "Buyer Guide" as const,
    tags: [
      "supplier vetting",
      "china sourcing",
      "factory audit",
      "pre-shipment inspection",
      "certification verification",
      "GB 15763",
      "EN 12150",
      "CE marking",
      "ANSI Z97.1",
      "buyer guide",
    ],
    heroImage: "/images/blog/supplier-vetting-hero.webp",
    heroImageAlt: "A buyer on a video call conducting a live factory audit, laptop showing a split view of a Chinese glass tempering furnace line next to a vetting checklist, business licence document on the desk",
    heroImagePrompt: "Documentary photography, over-the-shoulder shot of a business buyer at a wooden office desk conducting a live video audit of a Chinese glass factory. Laptop screen fills the center of the frame showing a split view: left side a live video feed of a glass tempering furnace with glowing orange glass panels inside and a factory operator holding a smartphone camera, right side a digital checklist with checkboxes next to station names like 'cutting', 'tempering', 'IGU assembly'. On the desk next to the laptop: a printed business licence document, a notepad with handwritten notes, a coffee cup, and a smartphone showing a WhatsApp video call interface. Warm afternoon window light from the left casting soft shadows. Shallow depth of field focused on the laptop screen. Clean modern office setting, no identifying brand marks or logos. No humans in frame beyond the buyer's hands on the keyboard at the lower edge. 4K photorealistic, documentary journalism style, no text or watermarks beyond what appears naturally in the on-screen interfaces.",
    author: DEFAULT_AUTHOR,
    readingTime: 18,
    featured: false,
    reviewedBy: { name: "Albar", title: "Technical Lead" },
    articleType: "buyer-guide" as const,
    cluster: "buyer-guide",
    relatedProductSlugs: ["tempered-glass", "laminated-glass", "insulated-glass"],
    translations: {},
    changelog: [
      { date: "2026-10-15", note: "Initial publish — third article in Buyer-Guide cluster (unlocks Pillar activation)" },
    ],
  },
`;

  // Insert before the closing `];` of the blogArticles array.
  // Find the last `];` after `export const blogArticles`.
  const arrStart = registrySrc.indexOf('export const blogArticles');
  if (arrStart === -1) {
    console.error('[FAIL] Could not find `export const blogArticles` in registry');
    process.exit(1);
  }
  // Find the matching closing `];` after arrStart
  const closingIdx = registrySrc.indexOf('\n];', arrStart);
  if (closingIdx === -1) {
    console.error('[FAIL] Could not find closing `];` of blogArticles array');
    process.exit(1);
  }
  const updated =
    registrySrc.slice(0, closingIdx) + entry + registrySrc.slice(closingIdx);
  writeFileSync(registryPath, updated);
  console.log('[OK]   src/lib/blog-registry.ts (entry appended)');
}

// ─── 3. Reciprocal link in Article #13 ─────────────────────────────────────
const a13Path = join(ROOT, 'src/app/blog/how-to-import-glass-from-china/page.tsx');
if (!existsSync(a13Path)) {
  console.warn(`[WARN] Article #13 not found at ${a13Path} — skipping reciprocal link`);
} else {
  const a13 = readFileSync(a13Path, 'utf8');
  const marker = `/blog/${SLUG}`;
  if (a13.includes(marker)) {
    console.log('[skip] Article #13 already links to this article');
  } else {
    // Candidate anchors: the earliest tag that signals the Red Flags / Supplier Verification
    // section footer where a "see also" line fits naturally.
    const linkLine = `\n      <p className="text-sm text-[#8B95A5] italic my-6">\n        For the deep-dive playbook on supplier vetting — the 5-risk threat model, cert verifier, and the 90-minute video audit script —\n        see <a href="/blog/${SLUG}" className="text-[#DAA745]">how to vet a china glass supplier</a>.\n      </p>\n`;

    // Try 3 fallback anchors in order
    const anchors = [
      { marker: '<SupplierVerificationScorecard', position: 'before' },
      { marker: '{/* Stage 1 */}', position: 'after' },
      { marker: '<h2 id="stage-1', position: 'before' },
    ];

    let patched = null;
    for (const a of anchors) {
      const idx = a13.indexOf(a.marker);
      if (idx === -1) continue;
      if (a.position === 'before') {
        patched = a13.slice(0, idx) + linkLine + a13.slice(idx);
      } else {
        // after the full tag/line
        const lineEnd = a13.indexOf('\n', idx);
        patched = a13.slice(0, lineEnd + 1) + linkLine + a13.slice(lineEnd + 1);
      }
      console.log(`[OK]   Article #13 patched (anchor: ${a.marker})`);
      break;
    }

    if (patched) {
      writeFileSync(a13Path, patched);
    } else {
      console.warn('[WARN] No matching anchor in Article #13 — add reciprocal link manually:');
      console.warn(`       <a href="/blog/${SLUG}">how to vet a china glass supplier</a>`);
    }
  }
}

console.log('\n[done] Article #15 deployed. Review changes, then git add + commit + push.');
console.log('       Vercel will auto-build from main.');
