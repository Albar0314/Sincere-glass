// patch-about-remove-videoschema.mjs
// Remove VideoSchema from About pages (EN + ES).
//
// Why: FactoryBrollLoop is now a static image (no video on About page).
// Leaving a VideoObject JSON-LD that claims /videos/factory-broll.mp4 is:
//   1. A 404 that structured-data validators flag
//   2. A Google structured-data policy violation (claiming content that
//      doesn't exist can trigger manual action)
//   3. Misleading to AI crawlers (Perplexity/ChatGPT) now that we care
//      about agentic browsing surfaces
//
// If you later add a <YouTubeEmbed videoId="TDjYxiRUZOM" /> to About for
// the factory walk-through, re-add VideoSchema with contentUrl pointing at
// the YouTube watch URL — don't resurrect the /videos/ mp4 reference.
//
// Patches both EN and ES mirror.
//
// Run from project root:
//   node edit\patch-about-remove-videoschema.mjs --dry
//   node edit\patch-about-remove-videoschema.mjs
//   npm run build

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DRY = process.argv.includes("--dry");

const FILES = [
  path.join(ROOT, "src", "app", "about", "page.tsx"),
  path.join(ROOT, "src", "app", "es", "about", "page.tsx"),
];

function patch(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`  [skip]  ${path.relative(ROOT, filePath)} (not found)`);
    return;
  }
  const original = fs.readFileSync(filePath, "utf8");
  let src = original;
  const changes = [];

  if (!/VideoSchema/.test(src)) {
    console.log(`  [skip]  ${path.relative(ROOT, filePath)} (already clean)`);
    return;
  }

  // --- 1. Remove the import line ---
  const importRe = /^\s*import\s+VideoSchema\s+from\s+["'][^"']+["'];\s*\r?\n/m;
  if (importRe.test(src)) {
    src = src.replace(importRe, "");
    changes.push("removed VideoSchema import");
  }

  // --- 2. Remove the <VideoSchema ... /> JSX element.
  // Two shapes seen in the source:
  //   EN (multi-line):
  //     <VideoSchema
  //       contentUrl="..."
  //       ...
  //     />
  //   ES (one line): <VideoSchema contentUrl="..." .../>
  // Both are self-closing JSX with no children. Match either.
  // Brace depth not required here because VideoSchema has no `{expr}` attrs
  // in the known sources; keep the match tight to avoid eating neighbors.
  let removed = 0;
  // Multi-line form
  src = src.replace(/<VideoSchema[\s\S]*?\/>\s*/g, () => {
    removed++;
    return "";
  });
  if (removed > 0) changes.push(`removed ${removed} VideoSchema element(s)`);

  if (src === original) {
    console.log(`  [noop]  ${path.relative(ROOT, filePath)} (no matches)`);
    return;
  }

  if (DRY) {
    console.log(`  [would]  ${path.relative(ROOT, filePath)}`);
    for (const c of changes) console.log(`            - ${c}`);
    return;
  }

  const bak = filePath + ".bak";
  if (!fs.existsSync(bak)) fs.writeFileSync(bak, original, "utf8");
  fs.writeFileSync(filePath, src, "utf8");
  console.log(`  [done]  ${path.relative(ROOT, filePath)}`);
  for (const c of changes) console.log(`            - ${c}`);
}

console.log("");
console.log(`=== About page: remove VideoSchema ${DRY ? "(DRY RUN)" : ""} ===`);
console.log("");
for (const f of FILES) patch(f);
console.log("");
if (DRY) {
  console.log("DRY RUN complete. Re-run without --dry to apply.");
} else {
  console.log("Next: npm run build");
}
