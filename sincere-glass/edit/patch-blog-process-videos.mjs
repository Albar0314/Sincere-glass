// patch-blog-process-videos.mjs
//
// Wires the 3 process videos (tempering furnace / laminating autoclave / IGU line)
// into the 3 how-is-X-made blog articles:
//
//   /blog/how-is-tempered-glass-made     + expE_icthfo  before #why-stress-matters
//   /blog/how-is-laminated-glass-made    + inNYYEAnWOo  before #can-be-cut
//   /blog/how-is-insulated-glass-made    + qcSV4WG8nL0  before #spacer-decision
//
// Per article:
//   - inject imports (YouTubeEmbed + VideoSchema) above `const SLUG`
//   - inject <VideoSchema .../> above <BlogArticleLayout ...> (Google indexing)
//   - inject video section (h3 + caption + <YouTubeEmbed />) above the chosen <h2>
//   - sweep known-safe PowerShell GBK garbage characters that leaked into these
//     files when they were saved on a Chinese Windows box
//
// Garbage sweep covers only characters whose replacement is one-to-one and
// zero-ambiguity: '鈥?' -> '-', '脳' -> '×', '掳' -> '°', '虏' -> '²',
// '卤' -> '±', '鈫?' -> '→', '路' -> '·'.
// NOT swept: '鈮?' and similar — the trailing '?' can represent a lost digit
// (e.g. '鈮?0 fragments' is really '≥40 fragments', not '≥0'). A warning is
// printed per file if any such pattern is detected.
//
// Safety rails (per project SOP, memory):
//   - .bak backup per file
//   - idempotency: unique per-file anchor "SG-BLOG-VIDEO-V1:<slug>" (first line)
//   - preserves file EOL style
//   - no changes to src/_i18n/es/ mirror - run scripts/translate-all.mjs after
//
// Usage:  node edit\patch-blog-process-videos.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ANCHOR_PREFIX = "SG-BLOG-VIDEO-V1";

const ARTICLES = [
  {
    slug: "how-is-tempered-glass-made",
    videoId: "expE_icthfo",
    videoName: "Tempering Furnace in Operation",
    videoDesc:
      "Oversized tempering furnace at Sincere Glass processing architectural panels up to 3.3 m x 15 m. Automated loading, heating above softening point, controlled high-velocity air quenching.",
    uploadDate: "2026-11-03",
    insertBeforeH2: 'why-stress-matters',
    sectionEyebrow: "See it in motion",
    sectionTitle: "The tempering furnace at work",
    sectionBody:
      "Thirty seconds of our Wuhan tempering line - automatic loading, roller-hearth transit at approximately 620°C, high-velocity air quench. The temperature curve above shows what the glass is going through at each second of this clip.",
    embedTitle: "Tempering Furnace at Sincere Glass",
  },
  {
    slug: "how-is-laminated-glass-made",
    videoId: "inNYYEAnWOo",
    videoName: "Laminated Glass High-Pressure Autoclave",
    videoDesc:
      "High-pressure autoclave at Sincere Glass processing PVB and SGP interlayer laminated glass at 140 C and 12 bar. Jumbo autoclave capacity 3.3 m x 15 m.",
    uploadDate: "2026-11-03",
    insertBeforeH2: 'can-be-cut',
    sectionEyebrow: "See it in motion",
    sectionTitle: "The autoclave at work",
    sectionBody:
      "Our Wuhan autoclave - the 3.3 m x 15 m unit referenced throughout this section. The pressure-temperature cycle above describes what is happening behind the vessel door during the 2.5 hour run.",
    embedTitle: "Laminated Glass Autoclave at Sincere Glass",
  },
  {
    slug: "how-is-insulated-glass-made",
    videoId: "qcSV4WG8nL0",
    videoName: "Insulated Glass (IGU) Production Line",
    videoDesc:
      "Dual-seal IGU assembly line at Sincere Glass with automated spacer bending, desiccant filling, and argon gas injection at 90 percent plus fill rate consistency.",
    uploadDate: "2026-11-03",
    insertBeforeH2: 'spacer-decision',
    sectionEyebrow: "See it in motion",
    sectionTitle: "The IGU assembly line at work",
    sectionBody:
      "Our automatic IGU line - spacer bending, desiccant fill, pre-press, argon injection and secondary seal cure, all running in sequence. The 8 stations listed above correspond to what you see on the line in this clip.",
    embedTitle: "IGU Production Line at Sincere Glass",
  },
];

// Known-safe one-to-one garbage substitutions
const GARBAGE_MAP = [
  ["鈥?", "-"],  // em/en dash
  ["脳", "×"],   // multiplication sign
  ["掳", "°"],   // degree
  ["虏", "²"],   // superscript 2
  ["卤", "±"],   // plus-minus
  ["鈫?", "→"],  // arrow right
  ["路", "·"],   // middle dot
];

// Patterns that MAY carry an eaten digit — only warn, do not auto-fix
const WARN_PATTERNS = [
  "鈮?", // ≥ with ambiguous following digit
];

// ---------- helpers ----------
function detectEOL(src) {
  return src.includes("\r\n") ? "\r\n" : "\n";
}

function backup(file) {
  const bak = file + ".bak";
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(file, bak);
    console.log(`  backup -> ${path.relative(ROOT, bak)}`);
  } else {
    console.log(`  backup already exists, keeping original`);
  }
}

function writeFile(file, content, eol) {
  const normalized = content.replace(/\r?\n/g, eol);
  fs.writeFileSync(file, normalized, "utf8");
  console.log(
    `  wrote -> ${path.relative(ROOT, file)} (${normalized.length} bytes, ${eol === "\r\n" ? "CRLF" : "LF"})`
  );
}

function sweepGarbage(src) {
  let count = 0;
  for (const [bad, good] of GARBAGE_MAP) {
    const parts = src.split(bad);
    if (parts.length > 1) {
      count += parts.length - 1;
      src = parts.join(good);
    }
  }
  const warnings = [];
  for (const bad of WARN_PATTERNS) {
    const parts = src.split(bad);
    if (parts.length > 1) {
      warnings.push(`  WARN: ${parts.length - 1} occurrence(s) of "${bad}" (may have eaten a digit) - please verify manually`);
    }
  }
  return { src, swept: count, warnings };
}

function injectImports(src, eol) {
  // Anchor: `const SLUG = '...';`
  const re = /(const\s+SLUG\s*=\s*['"][^'"]+['"]\s*;?)/;
  if (!re.test(src)) throw new Error("imports anchor (const SLUG) not found");
  const addition =
    `import YouTubeEmbed from '@/components/YouTubeEmbed';` + eol +
    `import VideoSchema from '@/components/VideoSchema';` + eol + eol;
  return src.replace(re, (m) => addition + m);
}

function injectVideoSchema(src, eol, article) {
  // Anchor: `<BlogArticleLayout article={article} toc={toc}>`
  const re = /(<BlogArticleLayout\s+article=\{article\}\s+toc=\{toc\}>)/;
  if (!re.test(src)) throw new Error("VideoSchema anchor (<BlogArticleLayout>) not found");
  const schema =
    `<VideoSchema` + eol +
    `        videoId="${article.videoId}"` + eol +
    `        name="${article.videoName}"` + eol +
    `        description="${article.videoDesc}"` + eol +
    `        uploadDate="${article.uploadDate}"` + eol +
    `      />` + eol + eol +
    `      `;
  return src.replace(re, schema + "$1");
}

function injectVideoSection(src, eol, article) {
  // Anchor: `<h2 id="<section>">`
  const re = new RegExp(`(<h2\\s+id="${article.insertBeforeH2}">)`);
  if (!re.test(src)) {
    throw new Error(`video section anchor (<h2 id="${article.insertBeforeH2}">) not found`);
  }
  const block =
    `<div className="my-10 not-prose rounded-xl border border-brand-light bg-brand-lighter/50 p-5 md:p-6">` + eol +
    `          <div className="text-xs uppercase tracking-wider text-brand-accent font-semibold mb-2">` + eol +
    `            ${article.sectionEyebrow}` + eol +
    `          </div>` + eol +
    `          <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-2">` + eol +
    `            ${article.sectionTitle}` + eol +
    `          </h3>` + eol +
    `          <p className="text-sm text-brand-muted leading-relaxed mb-5">` + eol +
    `            ${article.sectionBody}` + eol +
    `          </p>` + eol +
    `          <YouTubeEmbed` + eol +
    `            videoId="${article.videoId}"` + eol +
    `            title="${article.embedTitle}"` + eol +
    `            aspectRatio="16/9"` + eol +
    `          />` + eol +
    `        </div>` + eol + eol +
    `        `;
  return src.replace(re, block + "$1");
}

function processArticle(article) {
  const target = path.join(
    ROOT,
    "src",
    "app",
    "blog",
    article.slug,
    "page.tsx"
  );
  const anchor = `${ANCHOR_PREFIX}:${article.slug}`;

  console.log(`\n[${article.slug}]`);
  if (!fs.existsSync(target)) {
    console.error(`  [FATAL] target not found: ${target}`);
    process.exit(1);
  }
  let src = fs.readFileSync(target, "utf8");
  if (src.includes(anchor)) {
    console.log(`  file already patched (anchor "${anchor}" found) -- skipping`);
    return;
  }
  const eol = detectEOL(src);

  // 1. sweep garbage
  const sweepResult = sweepGarbage(src);
  src = sweepResult.src;
  console.log(`  garbage sweep: ${sweepResult.swept} replacements`);
  for (const w of sweepResult.warnings) console.log(w);

  // 2. imports
  src = injectImports(src, eol);
  console.log(`  imports: YouTubeEmbed + VideoSchema inserted above const SLUG`);

  // 3. VideoSchema JSON-LD
  src = injectVideoSchema(src, eol, article);
  console.log(`  VideoSchema: inserted above <BlogArticleLayout>`);

  // 4. Video section
  src = injectVideoSection(src, eol, article);
  console.log(`  video section: inserted above <h2 id="${article.insertBeforeH2}">`);

  // 5. stamp anchor as first-line comment
  src = `// ${anchor}` + eol + src;

  backup(target);
  writeFile(target, src, eol);
}

// ---------- main ----------
console.log("=== patch-blog-process-videos.mjs ===");
console.log("CWD: " + ROOT);

try {
  for (const a of ARTICLES) processArticle(a);
  console.log("\n=== DONE ===");
  console.log("Next steps:");
  console.log("  1. npm run build        (verify compile)");
  console.log("  2. npm run dev          (visual check at /blog/how-is-*-made)");
  console.log("  3. If any WARN was printed above, inspect those lines manually");
  console.log("  4. node scripts/translate-all.mjs    (sync ES mirror)");
  console.log("  5. git add + commit + push");
} catch (err) {
  console.error("\n[PATCH FAILED]", err?.message || err);
  if (err?.stack) console.error(err.stack);
  process.exit(1);
}
