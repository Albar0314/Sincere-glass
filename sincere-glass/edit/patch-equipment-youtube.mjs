// patch-equipment-youtube.mjs
// Migrate EquipmentClient from /videos/*.mp4 to YouTube videoId + YouTubeEmbed.
// Covers 5 of 6 categories (Enameling has no video yet — placeholder preserved).
//
// Mapping (locked 2026-11-03):
//   Cutting            -> YLkfJbK1XpA  (line-cutting)
//   Edge Polishing     -> 1XwGWynxkJE  (line-edge-grinding)
//   Tempering          -> expE_icthfo  (furnace-tempering)
//   Insulated Glass    -> qcSV4WG8nL0  (line-insulated-glass)
//   Laminating         -> inNYYEAnWOo  (autoclave-laminated-1)
//   Enameling          -> (no video)   coming-soon placeholder kept
//
// Patches both EN and ES mirror files.
//
// Run from project root:
//   node edit\patch-equipment-youtube.mjs --dry
//   node edit\patch-equipment-youtube.mjs
//   npm run build

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DRY = process.argv.includes("--dry");

const FILES = [
  path.join(ROOT, "src", "components", "equipment", "EquipmentClient.tsx"),
  path.join(ROOT, "src", "_i18n", "es", "components", "equipment", "EquipmentClient.tsx"),
];

// Maps the existing video path to its YouTube videoId.
// Any path not here (currently only enameling.mp4) becomes videoId: null.
const VIDEO_MAP = {
  "/videos/cutting.mp4": "YLkfJbK1XpA",
  "/videos/edge-polishing.mp4": "1XwGWynxkJE",
  "/videos/tempering.mp4": "expE_icthfo",
  "/videos/igu-assembly.mp4": "qcSV4WG8nL0",
  "/videos/laminating.mp4": "inNYYEAnWOo",
  // "/videos/enameling.mp4" intentionally absent -> null
};

function patch(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`  [skip]  ${path.relative(ROOT, filePath)} (not found)`);
    return;
  }
  const original = fs.readFileSync(filePath, "utf8");
  const eol = original.includes("\r\n") ? "\r\n" : "\n";
  let src = original;

  // --- Idempotency check ---
  if (/import\s+YouTubeEmbed/.test(src) && !/\/videos\//.test(src)) {
    console.log(`  [skip]  ${path.relative(ROOT, filePath)} (already migrated)`);
    return;
  }

  let changes = [];

  // --- 1. Add YouTubeEmbed import after existing imports ---
  if (!/import\s+YouTubeEmbed/.test(src)) {
    // Insert after the last existing import line
    const importBlockRe = /((?:^import[^\n]*\r?\n)+)/m;
    const m = src.match(importBlockRe);
    if (m) {
      const insertion = `import YouTubeEmbed from "@/components/YouTubeEmbed";${eol}`;
      src = src.replace(importBlockRe, m[1] + insertion);
      changes.push("added YouTubeEmbed import");
    }
  }

  // --- 2. Replace `video: "/videos/*.mp4"` lines with `videoId: "..."` ---
  let replacedVideos = 0;
  src = src.replace(/video:\s*"(\/videos\/[^"]+)"/g, (full, pathStr) => {
    const videoId = VIDEO_MAP[pathStr];
    replacedVideos++;
    if (videoId) return `videoId: "${videoId}"`;
    return `videoId: null`;
  });
  if (replacedVideos > 0) changes.push(`replaced ${replacedVideos} video paths`);

  // --- 3. Rewrite VideoPlaceholder component body ---
  // Match: function VideoPlaceholder({ src, label }: { src: string; label: string }) { ... }
  // Replace up through its closing `}`.
  const placeholderRe = /function\s+VideoPlaceholder\s*\([\s\S]*?\n\}/m;
  if (placeholderRe.test(src)) {
    const newPlaceholder = `function VideoPlaceholder({ videoId, label }: { videoId: string | null; label: string }) {
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
    src = src.replace(placeholderRe, newPlaceholder);
    changes.push("rewrote VideoPlaceholder");
  }

  // --- 4. Update the JSX usage ---
  // Match: <VideoPlaceholder src={cat.video} label={cat.category} />
  const usageRe = /<VideoPlaceholder\s+src=\{cat\.video\}\s+label=\{cat\.category\}\s*\/>/g;
  if (usageRe.test(src)) {
    src = src.replace(usageRe, `<VideoPlaceholder videoId={cat.videoId} label={cat.category} />`);
    changes.push("updated JSX usage");
  }

  // --- 5. Remove the now-unused useState import if it only served VideoPlaceholder ---
  // (We won't; useState is used elsewhere in this file. Leave it.)

  if (src === original) {
    console.log(`  [noop]  ${path.relative(ROOT, filePath)} (no matches found)`);
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
console.log(`=== EquipmentClient -> YouTube migration ${DRY ? "(DRY RUN)" : ""} ===`);
console.log("");
for (const f of FILES) patch(f);
console.log("");
if (DRY) {
  console.log("DRY RUN complete. Re-run without --dry to apply.");
} else {
  console.log("Next: npm run build");
}
