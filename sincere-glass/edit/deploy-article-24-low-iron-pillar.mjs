// Deploy script: Article #24 — Low Iron Glass Pillar
//
// Usage (from project root): node edit\deploy-article-24-low-iron-pillar.mjs
//
// What this does:
//   1) Writes .bak of blog-registry.ts
//   2) Checks if slug already exists in registry (idempotent skip)
//   3) Creates 3 interactive component files under src/components/blog/pillar-low-iron/
//   4) Creates Pillar page at src/app/blog/low-iron-glass-complete-guide/page.tsx
//   5) Inserts registry entry before the "// ---- Utility functions" anchor
//
// All files written as UTF-8 without BOM, ASCII-only (no em-dash, no ×, no ·).
// Idempotent marker: GROK-INSERT-V1:article-24-low-iron-pillar

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const EDIT = __dirname;

const SLUG = 'low-iron-glass-complete-guide';
const INSERT_MARKER = 'GROK-INSERT-V1:article-24-low-iron-pillar';

// -------- Helpers --------

function writeUtf8NoBom(absPath, content) {
  mkdirSync(dirname(absPath), { recursive: true });
  // Node's writeFileSync writes raw bytes; passing a string with 'utf8' is
  // UTF-8 without BOM, which is what we want. Avoid PowerShell Out-File which
  // adds BOM by default.
  writeFileSync(absPath, content, { encoding: 'utf8' });
  const bytes = Buffer.byteLength(content, 'utf8');
  console.log(`  WROTE  ${absPath.replace(ROOT + '\\', '').replace(ROOT + '/', '')}  (${bytes} bytes)`);
}

function readTemplate(name) {
  const p = join(EDIT, name);
  if (!existsSync(p)) {
    throw new Error(`Template file not found: ${p}`);
  }
  // Templates are text; read as UTF-8. They must themselves be saved as
  // UTF-8 without BOM by the editor — the preferences rule.
  return readFileSync(p, 'utf8');
}

// -------- Step 1: Backup registry --------

const registryPath = join(ROOT, 'src', 'lib', 'blog-registry.ts');
if (!existsSync(registryPath)) {
  console.error('ERROR: blog-registry.ts not found at', registryPath);
  process.exit(1);
}

let registrySrc = readFileSync(registryPath, 'utf8');

const bakPath = registryPath + '.bak';
writeFileSync(bakPath, registrySrc, { encoding: 'utf8' });
console.log('[1/5] Backup written:', bakPath);

// -------- Step 2: Idempotent check --------

if (registrySrc.includes(`slug: '${SLUG}'`) || registrySrc.includes(`slug: "${SLUG}"`)) {
  console.log(`[SKIP] Slug '${SLUG}' already in registry. No-op deploy. Exiting cleanly.`);
  process.exit(0);
}

if (registrySrc.includes(INSERT_MARKER)) {
  console.log('[SKIP] Insert marker already present. No-op deploy. Exiting cleanly.');
  process.exit(0);
}

console.log('[2/5] Idempotency check passed. Proceeding to create files.');

// -------- Step 3: Create component files --------

const compDir = join(ROOT, 'src', 'components', 'blog', 'pillar-low-iron');

const compMappings = [
  { tpl: 'article-24-iron-content-comparator.tsx.txt', out: 'IronContentComparator.tsx' },
  { tpl: 'article-24-when-to-use-decision-matrix.tsx.txt', out: 'WhenToUseDecisionMatrix.tsx' },
  { tpl: 'article-24-cost-premium-calculator.tsx.txt', out: 'CostPremiumCalculator.tsx' },
];

console.log('[3/5] Creating 3 component files in', compDir);
for (const { tpl, out } of compMappings) {
  const content = readTemplate(tpl);
  writeUtf8NoBom(join(compDir, out), content);
}

// -------- Step 4: Create Pillar page file --------

const pageDir = join(ROOT, 'src', 'app', 'blog', SLUG);
const pageContent = readTemplate('article-24-page.tsx.txt');
console.log('[4/5] Creating Pillar page at', join(pageDir, 'page.tsx'));
writeUtf8NoBom(join(pageDir, 'page.tsx'), pageContent);

// -------- Step 5: Append registry entry --------

// Build the new registry entry. All strings use double quotes to avoid
// English apostrophe escaping issues (preferences rule after Article #12).
const registryEntry = `
  // ${INSERT_MARKER}
  {
    slug: "${SLUG}",
    title: "Low Iron Glass: The Complete Specifier's Guide (2026)",
    excerpt: "What makes glass low iron, when it is worth the 30 to 100 percent premium, and how to spec and source it from China. Interactive comparator, decision matrix, and budget calculator.",
    targetKeyword: "low iron glass",
    secondaryKeywords: [
      "ultra clear glass",
      "extra clear glass",
      "low iron glass vs clear glass",
      "low iron tempered glass",
      "starphire vs low iron glass",
      "is low iron glass worth it",
    ],
    searchKeywords: [
      "low iron glass",
      "ultra clear glass",
      "extra clear glass",
      "starphire",
      "optiwhite",
      "pilkington optiwhite",
      "guardian ultraclear",
      "saint gobain diamant",
      "low iron tempered glass",
      "low iron laminated glass",
      "high transparency glass",
      "iron free glass",
      "超白玻璃",
      "低铁玻璃",
    ],
    publishDate: "2026-11-03",
    updatedDate: "2026-11-03",
    category: "Product Knowledge" as const,
    tags: ["pillar", "low iron glass", "ultra clear glass", "product deep dive", "buyer guide", "specifier"],
    heroImage: "/images/blog/low-iron-glass-complete-guide-hero.webp",
    heroImageAlt: "Two architectural glass panels standing side by side on polished concrete: left panel is standard clear float with visible green edge, right panel is low iron ultra clear glass with near colorless edge, showing a vivid red rose behind each panel to demonstrate color fidelity difference",
    heroImagePrompt: "Studio product photography, two architectural glass panels standing vertically side by side on a polished dark grey concrete surface. Left panel: standard clear float glass, 15mm thick, showing a distinctly visible green tint along its exposed edge and a greenish cast through its body, small tag at base reads Standard Float. Right panel: low iron ultra clear glass, same 15mm thickness, with a near colorless water clear edge and crystal transparency showing a vivid red rose on a white background placed behind it, small tag at base reads Low Iron. Behind both panels: a subtle colored test chart with red yellow and blue bars demonstrating color fidelity difference. 30 degree elevated camera angle, soft daylight from above left, shallow depth of field focused on the edges. Clean neutral grey background, no humans, no text other than the two small tags. 4K photorealistic, museum exhibit comparison quality, dramatic clarity contrast.",
    author: DEFAULT_AUTHOR,
    readingTime: 18,
    featured: true,
    isPillar: true,
    reviewedBy: { name: "Albar", title: "Technical Lead" },
    tldr: [
      "Low iron glass reduces iron oxide content from 0.10 to 0.15 percent down to below 0.01 percent, which removes the green tint and raises visible light transmission from about 83 to 91 percent.",
      "The decision rule is simple: thickness over 10 mm, exposed frameless edges, or a need for color fidelity behind the glass all justify low iron. Thin facade vision glass viewed from distance usually does not.",
      "Expect a 30 to 100 percent price premium over standard clear, widening at thinner sizes and narrowing at jumbo sizes. A 500 m2 tempered facade order sees roughly 40 to 60 percent total cost uplift.",
      "Low iron is sold under brand names including Starphire, Optiwhite, UltraClear, and Diamant, but the generic product from reputable manufacturers has essentially identical optical performance at lower cost.",
      "Our 20,000 m2 Wuhan facility processes low iron substrate on the same tempering, laminating, and IGU lines as standard clear, including jumbo panels up to 3.3 by 15 meters.",
    ],
    buyerFaq: [
      {
        q: "What is the typical MOQ for low iron glass from a Chinese manufacturer?",
        a: "Export MOQ for low iron glass is usually higher than standard clear because of smaller production batches. Expect 100 m2 minimum for stock thicknesses and 200 to 500 m2 for non-stock thicknesses or jumbo sizes. Our Wuhan facility can run low iron on standard tempering lines, so MOQ is 100 m2 for processed low iron tempered or laminated.",
      },
      {
        q: "What is the lead time for low iron glass orders from China?",
        a: "Add 5 to 10 working days to standard glass lead times because low iron substrate often needs to be ordered from a float glass supplier rather than taken from stock. Typical cycle: low iron tempered 15 to 20 working days, low iron laminated 20 to 25 working days, low iron IGU 20 to 25 working days. Ocean freight transit is additional.",
      },
      {
        q: "Can you supply low iron glass with ASTM C1036 certification?",
        a: "Yes. Our low iron substrate meets ASTM C1036 clear glass requirements and can be supplied with mill test reports. We also provide EN 572 compliance documentation for EU buyers and GB 11614 ultra clear float documentation for mixed-market projects. Specify your required standard in the inquiry.",
      },
    ],
    relatedProductSlugs: ["tempered-glass", "laminated-glass", "enameled-glass"],
    articleType: "buyer-guide" as const,
    cluster: "product",
    translations: {},
    changelog: [
      { date: "2026-11-03", note: "Initial pillar publish" },
    ],
  },
`;

// Anchor: the exact sequence that marks the end of the registry array.
// From the existing registry pattern verified via memory and the live file.
const ANCHOR = `  },\n];\n\n// ---- Utility functions`;

if (!registrySrc.includes(ANCHOR)) {
  // Try a looser variant with CRLF
  const ANCHOR_CRLF = `  },\r\n];\r\n\r\n// ---- Utility functions`;
  if (registrySrc.includes(ANCHOR_CRLF)) {
    registrySrc = registrySrc.replace(ANCHOR_CRLF, `  },\r\n${registryEntry}\r\n];\r\n\r\n// ---- Utility functions`);
  } else {
    console.error('ERROR: Could not find insertion anchor in blog-registry.ts.');
    console.error('Expected anchor: "  },\\n];\\n\\n// ---- Utility functions" or CRLF variant.');
    console.error('Deploy aborted. Registry file untouched. Restore from .bak if needed.');
    process.exit(2);
  }
} else {
  registrySrc = registrySrc.replace(ANCHOR, `  },\n${registryEntry}\n];\n\n// ---- Utility functions`);
}

writeFileSync(registryPath, registrySrc, { encoding: 'utf8' });
console.log('[5/5] Registry entry inserted.');

console.log('');
console.log('==========================================');
console.log('DEPLOY COMPLETE: Article #24 Low Iron Pillar');
console.log('==========================================');
console.log('');
console.log('NEXT STEPS:');
console.log('  1. Run:  npm run build');
console.log('     (verify no TS/SWC errors — do not skip)');
console.log('  2. Open: http://localhost:3000/blog/' + SLUG + '  (if dev server running)');
console.log('     or:   npm run dev  then visit the URL above');
console.log('  3. Git commit + push to deploy to Vercel');
console.log('  4. Generate hero image via AI from the heroImagePrompt in');
console.log('     the registry entry, save as public/images/blog/' + SLUG + '-hero.webp');
console.log('  5. Request indexing in GSC: https://sincereglass.com/blog/' + SLUG);
console.log('');
console.log('ROLLBACK (if build fails):');
console.log('  copy /y ' + registryPath + '.bak ' + registryPath);
console.log('');
