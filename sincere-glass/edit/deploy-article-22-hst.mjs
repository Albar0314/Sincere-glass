// deploy-article-22-hst.mjs
// Deploys Article #22: Heat Soaked Tempered Glass: What It Is, When You Need It, How to Specify
// Technical cluster — 4th sub-article under Technical Guides
//
// Usage from project root (D:\桌面\sincere-glass\sincere-glass\):
//   node edit\deploy-article-22-hst.mjs
//
// What it does:
//   1. Creates src/components/blog/article-22/ and copies the 3 interactive components
//   2. Copies the article page to src/app/blog/heat-soaked-tempered-glass-guide/page.tsx
//   3. Appends the registry entry to src/lib/blog-registry.ts
//      (SAFER anchor than lastIndexOf('];') per 2026-10-27 lesson:
//       inserts before the specific `  },\n];\n\n// ---- Utility functions` marker)
//   4. Idempotency: skips registry append if slug already present
//   5. Auto-backups every file it touches to <path>.bak (overwrites prior .bak)
//   6. Patches reciprocal cluster links into:
//        - src/app/blog/how-is-tempered-glass-made/page.tsx         (Technical #1)
//        - src/app/blog/jumbo-architectural-glass-panels/page.tsx   (Product cluster — HST matters most at jumbo)
//      Each patch is marked with GROK-INSERT-V1:hst for idempotent re-runs.

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const EDIT = join(ROOT, 'edit');
const SLUG = 'heat-soaked-tempered-glass-guide';
const PATCH_MARK = 'GROK-INSERT-V1:hst';

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

function backup(path) {
  if (existsSync(path)) {
    copyFileSync(path, path + '.bak');
  }
}

function log(msg) {
  console.log(msg);
}

// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// 1. Interactive components  \u2192  src/components/blog/article-22/
// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const compDir = join(ROOT, 'src', 'components', 'blog', 'article-22');
ensureDir(compDir);

const components = [
  ['NiSInclusionLifecycle.tsx.txt',   'NiSInclusionLifecycle.tsx'],
  ['HSTCycleChart.tsx.txt',           'HSTCycleChart.tsx'],
  ['HSTRequirementChecker.tsx.txt',   'HSTRequirementChecker.tsx'],
];

for (const [src, dst] of components) {
  const dstPath = join(compDir, dst);
  backup(dstPath);
  copyFileSync(must(src), dstPath);
  log(`\u2713 Wrote src/components/blog/article-22/${dst}`);
}

// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// 2. Article page  \u2192  src/app/blog/<slug>/page.tsx
// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const pageDir = join(ROOT, 'src', 'app', 'blog', SLUG);
ensureDir(pageDir);
const pageDst = join(pageDir, 'page.tsx');
backup(pageDst);
copyFileSync(must('page-article-22-heat-soaked-tempered-glass.tsx.txt'), pageDst);
log(`\u2713 Wrote src/app/blog/${SLUG}/page.tsx`);

// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// 3. Registry entry — SAFER anchor than lastIndexOf('];')
// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const registryPath = join(ROOT, 'src', 'lib', 'blog-registry.ts');
let registrySrc = readFileSync(registryPath, 'utf8');

// All strings use double quotes — safe for apostrophes (buyerFaq / tldr / excerpt)
if (registrySrc.includes(`slug: '${SLUG}'`) || registrySrc.includes(`slug: "${SLUG}"`)) {
  log(`\u26a0 Registry entry for ${SLUG} already exists \u2014 skipping append`);
} else {
  const entry = `
  {
    slug: "${SLUG}",
    title: "Heat Soaked Tempered Glass: What It Is, When You Need It, How to Specify",
    excerpt: "A factory walk-through of EN 14179-1 heat soak testing: the nickel sulfide mechanism behind spontaneous breakage, the 290\u00b0C/2h cycle inside the oven, when HST is required vs recommended vs optional, and how to write it into a PO without triggering clarifying emails.",
    targetKeyword: "heat soaked tempered glass",
    secondaryKeywords: [
      "heat soak test tempered glass",
      "heat soak testing EN 14179",
      "nickel sulfide tempered glass",
      "spontaneous breakage tempered glass",
      "HST tempered glass certificate",
    ],
    searchKeywords: [
      "heat soaked tempered glass", "heat soak testing", "heat soak test tempered",
      "HST tempered glass", "EN 14179-1 heat soak", "nickel sulfide inclusion",
      "NiS inclusion", "spontaneous breakage tempered glass", "tempered glass self-destruct",
      "tempered glass exploding", "safety glass heat soak", "jumbo tempered HST",
      "overhead glazing HST", "facade HST", "heat soak oven cycle", "alpha beta phase NiS",
      "\u70ed\u6d78\u5904\u7406", "\u94a2\u5316\u73bb\u7483\u81ea\u7206", "\u786b\u5316\u9542 \u94a2\u5316\u73bb\u7483"
    ],
    publishDate: "2026-10-28",
    updatedDate: "2026-10-28",
    category: "Technical Guide" as const,
    tags: ["tempered glass", "heat soak testing", "HST", "EN 14179", "quality control", "facade glass", "spontaneous breakage"],
    heroImage: "/images/blog/heat-soaked-tempered-glass-hero.webp",
    heroImageAlt: "Interior of a modern industrial heat soak oven with large tempered glass panels racked vertically on steel frames at 290 degrees Celsius, visible temperature gauges and warm amber heating element glow",
    heroImagePrompt: "Interior view of a modern industrial heat soak oven. Large tempered glass panels (approximately 3m x 2m) racked vertically on steel frames inside the chamber, visible through the open loading door. Visible temperature gauges in the foreground reading 290 degrees Celsius. Warm orange-amber ambient lighting from heating elements along the chamber walls, slight thermal haze visible around the panels. Single large glass panel in sharp focus mid-frame catching the amber light with subtle refraction, surrounding panels in shallow depth of field. Cinematic photo, 16:9 aspect ratio. No people, no logos, no text overlay. Industrial realism with muted color grading aligned to the Sincere Glass brand palette (dark navy backdrop with amber accent lighting). Documentary architectural photography style, 4K photorealistic, museum-exhibit cleanliness.",
    author: DEFAULT_AUTHOR,
    readingTime: 15,
    featured: false,
    reviewedBy: { name: "Albar", title: "Technical Lead" },
    articleType: "technical" as const,
    cluster: "technical",
    tldr: [
      "Heat soak testing (HST) is a 290\u00b1 10\u00b0C / 2-hour post-tempering oven cycle per EN 14179-1 that forces critical-size nickel sulfide inclusions to fracture their host panels inside the factory instead of inside your building 1\u20137 years later.",
      "HST is required for overhead glazing almost everywhere, and for high-rise facades with public access below under most European codes. It is strongly recommended for mid-rise facades and elevated balustrades, and optional for interior partitions and small low-rise panels.",
      "Cost premium is +15\u201325% over standard tempered on the per-m\u00b2 EXW price; lead time adds 3\u20135 working days. One oven cycle runs 7\u20138 hours end to end.",
      "HST reduces spontaneous fracture rate from ~1 per 400 tonnes shipped to ~1 per 2,000\u20134,000 tonnes \u2014 roughly an order of magnitude. Residual risk is non-zero but insurable at standard rates.",
      "Specify EN 14179-1:2016 as the test method even on US and AU projects, since no equivalent standard exists in ASTM C1048 or AS 1288. Always ask for per-batch compliance certificates at RFQ.",
    ],
    buyerFaq: [
      { q: "Does Sincere Glass issue EN 14179-1 compliance certificates per batch?", a: "Yes, on request at RFQ. Default delivery includes a batch-level test report with time-temperature log; the formal EN 14179-1:2016 compliance certificate is issued on request and adds about one working day for paperwork." },
      { q: "Can HST be scheduled on the same lead time as standard tempered?", a: "Add 3\u20135 working days to standard tempered lead time. For orders under 20 m\u00b2 we batch with other projects on the same cycle; expect a 2\u20134 day scheduling window on top." },
    ],
    relatedProductSlugs: ["tempered-glass", "laminated-glass", "insulated-glass"],
    translations: {},
    changelog: [
      { date: "2026-10-28", note: "Initial publish \u2014 fourth article in Technical Guides cluster" },
    ],
  },
`;

  // Prefer specific anchor — the one marked in preferences as safe.
  // Pattern: a registry entry closing `  },\n` immediately followed by `];\n\n// ---- Utility functions`
  const ANCHOR = '  },\n];\n\n// ---- Utility functions';
  const anchorIdx = registrySrc.indexOf(ANCHOR);

  if (anchorIdx < 0) {
    // Fallback: look for the utility-functions marker alone and insert `  },\n];` before it.
    const fallbackAnchor = '// ---- Utility functions';
    const fIdx = registrySrc.indexOf(fallbackAnchor);
    if (fIdx < 0) {
      console.error('\u2717 Could not find registry insertion anchor. Aborting.');
      console.error('   Expected to find: "  },\\n];\\n\\n// ---- Utility functions"');
      console.error('   or at minimum:    "// ---- Utility functions"');
      process.exit(1);
    }
    console.warn('\u26a0 Full anchor not found; falling back to utility-functions marker.');
    console.warn('   Review the diff manually: git diff src/lib/blog-registry.ts');
    // Insert entry just before `  },\n];` which we have to find backwards from fallback.
    const beforeClose = registrySrc.lastIndexOf('  },\n];', fIdx);
    if (beforeClose < 0) {
      console.error('\u2717 Could not find `  },\\n];` closing before utility-functions marker.');
      process.exit(1);
    }
    const insertAt = beforeClose + '  },\n'.length; // insert after last entry, before `];`
    backup(registryPath);
    registrySrc = registrySrc.slice(0, insertAt) + entry.trimStart() + registrySrc.slice(insertAt);
  } else {
    // Primary anchor path.
    // Insert entry between the last `  },\n` and the `];\n\n// ---- Utility functions`.
    // That means we insert AFTER the `  },\n` that is part of the anchor.
    const insertAt = anchorIdx + '  },\n'.length;
    backup(registryPath);
    registrySrc = registrySrc.slice(0, insertAt) + entry.trimStart() + registrySrc.slice(insertAt);
  }

  writeFileSync(registryPath, registrySrc, 'utf8');
  log(`\u2713 Appended registry entry for ${SLUG}`);
}

// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// 4. Reciprocal cluster links
//    Anchor on `<FAQ items={faqItems}` so we insert just before the FAQ.
//    Each insertion wrapped with ${PATCH_MARK} comment for idempotency.
// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const reciprocalTargets = [
  {
    page: join(ROOT, 'src', 'app', 'blog', 'how-is-tempered-glass-made', 'page.tsx'),
    linkText: `\u2192 For long-term spontaneous-breakage mitigation on high-rise facades and jumbo panels, see our <Link href="/blog/${SLUG}" className="text-[#DAA745] underline">heat soak testing guide (EN 14179-1)</Link>.`,
  },
  {
    page: join(ROOT, 'src', 'app', 'blog', 'jumbo-architectural-glass-panels', 'page.tsx'),
    linkText: `\u2192 At jumbo scale, nickel-sulfide spontaneous-breakage risk compounds across panel count \u2014 see our <Link href="/blog/${SLUG}" className="text-[#DAA745] underline">heat soak testing guide</Link> for when to specify HST.`,
  },
];

for (const { page, linkText } of reciprocalTargets) {
  if (!existsSync(page)) {
    log(`\u26a0 Reciprocal target not found: ${page} \u2014 skipping`);
    continue;
  }
  let src = readFileSync(page, 'utf8');
  if (src.includes(PATCH_MARK) || src.includes(SLUG)) {
    log(`\u26a0 Already linked to ${SLUG} or ${PATCH_MARK} present in ${page} \u2014 skipping`);
    continue;
  }
  const anchor = '<FAQ items={faqItems}';
  if (!src.includes(anchor)) {
    log(`\u26a0 No <FAQ items={faqItems} anchor in ${page} \u2014 skipping`);
    continue;
  }
  const paragraph = `
        {/* ${PATCH_MARK} */}
        <p className="text-sm text-[#8B95A5] my-6">${linkText}</p>

        `;
  backup(page);
  src = src.replace(anchor, paragraph + anchor);
  writeFileSync(page, src, 'utf8');
  log(`\u2713 Added reciprocal cluster link in ${page}`);
}

log('');
log('\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501');
log('Article #22 (Heat Soaked Tempered Glass) deploy complete.');
log('');
log('Next steps:');
log('  1. Run `npm run build` NOW (per project SOP: no stacked deploys).');
log('  2. Review `git diff src/lib/blog-registry.ts` to confirm the entry');
log('     landed between the last `  },` and the `];` of blogArticles.');
log('  3. Generate the hero image using the prompt in the registry entry');
log('     (save as public/images/blog/heat-soaked-tempered-glass-hero.webp).');
log('  4. Commit and push:');
log('     git add -A && git commit -m "Article #22: Heat Soaked Tempered Glass" && git push');
log('  5. After Vercel deploy, request indexing in GSC for the new URL.');
log('  6. On next scheduled `translate-all.mjs` run, ES version auto-generates.');
log('');
log('Rollback (if needed):');
log('  copy /Y src\\lib\\blog-registry.ts.bak src\\lib\\blog-registry.ts');
log('  copy /Y src\\app\\blog\\how-is-tempered-glass-made\\page.tsx.bak \\');
log('       src\\app\\blog\\how-is-tempered-glass-made\\page.tsx');
log('  copy /Y src\\app\\blog\\jumbo-architectural-glass-panels\\page.tsx.bak \\');
log('       src\\app\\blog\\jumbo-architectural-glass-panels\\page.tsx');
log('\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501');
