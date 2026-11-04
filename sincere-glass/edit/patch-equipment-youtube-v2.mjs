// patch-equipment-youtube-v2.mjs
// v2 fixes the multi-line destructuring bug in v1:
//   v1 used `function\s+VideoPlaceholder\s*\([\s\S]*?\n\}/m` which matched the
//   FIRST `\n}` — inside the ES file's multi-line type annotation `}: {` — and
//   left the rest as orphan code. v2 uses a brace-balanced scan from the
//   function's body-opening `{` to its matching `}` so multi-line
//   destructuring is handled correctly.
//
// Mapping (locked 2026-11-03):
//   Cutting            -> YLkfJbK1XpA  (line-cutting)
//   Edge Polishing     -> 1XwGWynxkJE  (line-edge-grinding)
//   Tempering          -> expE_icthfo  (furnace-tempering)
//   Insulated Glass    -> qcSV4WG8nL0  (line-insulated-glass)
//   Laminating         -> inNYYEAnWOo  (autoclave-laminated-1)
//   Enameling          -> (null)       coming-soon placeholder kept
//
// Patches both EN and ES mirror.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DRY = process.argv.includes("--dry");

const FILES = [
  path.join(ROOT, "src", "components", "equipment", "EquipmentClient.tsx"),
  path.join(ROOT, "src", "_i18n", "es", "components", "equipment", "EquipmentClient.tsx"),
];

const VIDEO_MAP = {
  "/videos/cutting.mp4": "YLkfJbK1XpA",
  "/videos/edge-polishing.mp4": "1XwGWynxkJE",
  "/videos/tempering.mp4": "expE_icthfo",
  "/videos/igu-assembly.mp4": "qcSV4WG8nL0",
  "/videos/laminating.mp4": "inNYYEAnWOo",
};

// Brace-balanced scan: given src and an index at a `{`, return the index
// AFTER the matching `}`. Handles nested braces, quoted strings, and
// JSX expression braces.
function findMatchingBrace(src, openBraceIdx) {
  if (src[openBraceIdx] !== "{") return -1;
  let depth = 1;
  let i = openBraceIdx + 1;
  let stringChar = null;
  while (i < src.length) {
    const c = src[i];
    if (stringChar) {
      if (c === "\\" && i + 1 < src.length) { i += 2; continue; }
      if (c === stringChar) stringChar = null;
    } else if (c === '"' || c === "'" || c === "`") {
      stringChar = c;
    } else if (c === "/" && src[i + 1] === "/") {
      // Line comment: skip to end of line
      const nl = src.indexOf("\n", i);
      i = nl === -1 ? src.length : nl;
      continue;
    } else if (c === "/" && src[i + 1] === "*") {
      // Block comment
      const end = src.indexOf("*/", i + 2);
      i = end === -1 ? src.length : end + 2;
      continue;
    } else if (c === "{") {
      depth++;
    } else if (c === "}") {
      depth--;
      if (depth === 0) return i + 1;
    }
    i++;
  }
  return -1;
}

function patch(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`  [skip]  ${path.relative(ROOT, filePath)} (not found)`);
    return;
  }
  const original = fs.readFileSync(filePath, "utf8");
  const eol = original.includes("\r\n") ? "\r\n" : "\n";
  let src = original;
  const changes = [];

  // --- Idempotency ---
  if (/import\s+YouTubeEmbed/.test(src) && !/\/videos\//.test(src)) {
    console.log(`  [skip]  ${path.relative(ROOT, filePath)} (already migrated)`);
    return;
  }

  // --- 1. Add YouTubeEmbed import ---
  if (!/import\s+YouTubeEmbed/.test(src)) {
    const importBlockRe = /((?:^import[^\n]*\r?\n)+)/m;
    const m = src.match(importBlockRe);
    if (m) {
      src = src.replace(importBlockRe, m[1] + `import YouTubeEmbed from "@/components/YouTubeEmbed";${eol}`);
      changes.push("added YouTubeEmbed import");
    }
  }

  // --- 2. Replace video paths with videoId ---
  let replaced = 0;
  src = src.replace(/video:\s*"(\/videos\/[^"]+)"/g, (full, pathStr) => {
    replaced++;
    const videoId = VIDEO_MAP[pathStr];
    return videoId ? `videoId: "${videoId}"` : `videoId: null`;
  });
  if (replaced > 0) changes.push(`replaced ${replaced} video paths`);

  // --- 3. Replace VideoPlaceholder function using brace-balanced scan ---
  // Find `function VideoPlaceholder` keyword start
  const funcKeywordRe = /\bfunction\s+VideoPlaceholder\b/;
  const funcMatch = src.match(funcKeywordRe);
  if (funcMatch) {
    const funcStart = funcMatch.index;
    // Find the function body's opening brace: scan forward past the
    // parameter list (which has its own `()` and possibly destructuring
    // braces), then find the first `{` that opens the function body.
    // Strategy: after the function name, find `(`, then its matching `)`,
    // then the first `{` after that.
    let i = funcStart + funcMatch[0].length;
    // Skip whitespace
    while (i < src.length && /\s/.test(src[i])) i++;
    if (src[i] !== "(") {
      console.log(`  [warn]  ${path.relative(ROOT, filePath)}: expected '(' after function name at ${i}`);
    } else {
      // Find matching ) using paren counting (with brace nesting for destructuring)
      let parenDepth = 1;
      let braceDepth = 0;
      let stringChar = null;
      i++;
      while (i < src.length && parenDepth > 0) {
        const c = src[i];
        if (stringChar) {
          if (c === "\\" && i + 1 < src.length) { i += 2; continue; }
          if (c === stringChar) stringChar = null;
        } else if (c === '"' || c === "'" || c === "`") {
          stringChar = c;
        } else if (c === "{") braceDepth++;
        else if (c === "}") braceDepth--;
        else if (c === "(" && braceDepth === 0) parenDepth++;
        else if (c === ")" && braceDepth === 0) parenDepth--;
        i++;
      }
      // Now i is after the `)`. Find the function body's `{`
      while (i < src.length && /\s/.test(src[i])) i++;
      if (src[i] !== "{") {
        console.log(`  [warn]  ${path.relative(ROOT, filePath)}: expected '{' for function body`);
      } else {
        const bodyEnd = findMatchingBrace(src, i);
        if (bodyEnd === -1) {
          console.log(`  [warn]  ${path.relative(ROOT, filePath)}: could not find function body close`);
        } else {
          // Replace from funcStart to bodyEnd with new function
          const newFn = `function VideoPlaceholder({ videoId, label }: { videoId: string | null; label: string }) {
  if (videoId) {
    return (
      <div className="rounded-xl overflow-hidden">
        <YouTubeEmbed videoId={videoId} title={label + " production line"} aspectRatio="16/9" />
      </div>
    );
  }
  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-brand-dark/5 border border-brand-light">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-lighter">
        <svg className="w-12 h-12 text-brand-muted/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
        </svg>
        <p className="mt-2 text-xs text-brand-muted/50">{label} video coming soon</p>
      </div>
    </div>
  );
}`;
          src = src.slice(0, funcStart) + newFn + src.slice(bodyEnd);
          changes.push("rewrote VideoPlaceholder (brace-balanced)");
        }
      }
    }
  }

  // --- 4. Update JSX usage ---
  const usageRe = /<VideoPlaceholder\s+src=\{cat\.video\}\s+label=\{cat\.category\}\s*\/>/g;
  if (usageRe.test(src)) {
    src = src.replace(usageRe, `<VideoPlaceholder videoId={cat.videoId} label={cat.category} />`);
    changes.push("updated JSX usage");
  }

  if (src === original) {
    console.log(`  [noop]  ${path.relative(ROOT, filePath)}`);
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
console.log(`=== EquipmentClient -> YouTube migration v2 ${DRY ? "(DRY RUN)" : ""} ===`);
console.log("");
for (const f of FILES) patch(f);
console.log("");
if (DRY) {
  console.log("DRY RUN complete. Re-run without --dry to apply.");
} else {
  console.log("Next: npm run build");
}
