// patch-equipment-gallery-es-fix.mjs
// Fix for ES-only: Babel-generated return uses `return <>` instead of
// `return (\n<>\n...)`. v1 anchor missed it, so only ternary-close ran,
// leaving an orphan `)}`. Roll back ES then re-apply with ES-specific
// anchor.
//
// Prerequisite: ES file has been rolled back to its .bak state.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DRY = process.argv.includes("--dry");

const FILE = path.join(ROOT, "src", "_i18n", "es", "components", "EquipmentGallery.tsx");

const L = { video: "Video", photos: "Fotos" };

if (!fs.existsSync(FILE)) {
  console.error(`[fatal] ${FILE} not found`);
  process.exit(1);
}

const original = fs.readFileSync(FILE, "utf8");
const eol = original.includes("\r\n") ? "\r\n" : "\n";
let src = original;
const changes = [];

// Idempotency
if (/getEquipmentVideo/.test(src) && /setViewMode/.test(src) && /viewMode === "video"/.test(src)) {
  console.log("[skip] already fully patched");
  process.exit(0);
}

// --- 1. Imports ---
if (!/getEquipmentVideo/.test(src)) {
  const importBlockRe = /((?:^import[^\n]*\r?\n)+)/m;
  const m = src.match(importBlockRe);
  if (m) {
    const newImports =
      `import YouTubeEmbed from "@/components/YouTubeEmbed";${eol}` +
      `import { getEquipmentVideo } from "@/lib/equipment-videos";${eol}`;
    src = src.replace(importBlockRe, m[1] + newImports);
    changes.push("imports");
  }
}

// --- 2. State + useEffect ---
const stateAnchorRe = /(const \[lightboxIndex, setLightboxIndex\] = useState<number>\(0\);)/;
if (stateAnchorRe.test(src) && !/setViewMode/.test(src)) {
  const stateInsert =
    `${eol}` +
    `  const video = getEquipmentVideo(category.key);${eol}` +
    `  const [viewMode, setViewMode] = useState<"video" | "photos">(video ? "video" : "photos");${eol}` +
    `  useEffect(() => { setViewMode(video ? "video" : "photos"); }, [category.key, video]);`;
  src = src.replace(stateAnchorRe, `$1${stateInsert}`);
  changes.push("state + effect");
}

// --- 3. Return opener: ES uses `return <>\n      <div className="grid...` ---
// NOT wrapped in parens. Match this specific ES format.
const esReturnRe = /return <>\s*\r?\n\s*<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">/;
if (esReturnRe.test(src)) {
  const replacement =
    `return <>${eol}` +
    `      {video && (${eol}` +
    `        <div className="flex gap-2 mb-6 border-b border-gray-200">${eol}` +
    `          <button type="button" onClick={() => setViewMode("video")} className={"px-4 py-2 text-sm font-medium transition-colors " + (viewMode === "video" ? "border-b-2 border-brand-accent text-brand-dark" : "text-brand-muted hover:text-brand-dark")}>${eol}` +
    `            ${L.video}${eol}` +
    `          </button>${eol}` +
    `          <button type="button" onClick={() => setViewMode("photos")} className={"px-4 py-2 text-sm font-medium transition-colors " + (viewMode === "photos" ? "border-b-2 border-brand-accent text-brand-dark" : "text-brand-muted hover:text-brand-dark")}>${eol}` +
    `            ${L.photos}${eol}` +
    `          </button>${eol}` +
    `        </div>${eol}` +
    `      )}${eol}` +
    `      {viewMode === "video" && video ? (${eol}` +
    `        <div className="rounded-xl overflow-hidden mb-8">${eol}` +
    `          <YouTubeEmbed videoId={video.videoId} title={video.title} aspectRatio="16/9" />${eol}` +
    `        </div>${eol}` +
    `      ) : (${eol}` +
    `      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">`;
  src = src.replace(esReturnRe, replacement);
  changes.push("ES return + tabs + ternary opener");
} else {
  console.log("[warn] ES return anchor did not match. Current content near return:");
  const idx = src.indexOf("return <>");
  console.log(src.slice(Math.max(0, idx - 50), idx + 200));
}

// --- 4. Close ternary before Lightbox ---
const lightboxAnchorRe = /(\r?\n\s*)(\{\/\* Lightbox \*\/\})/;
if (lightboxAnchorRe.test(src) && !/\)\}\s*\r?\n\s*\{\/\* Lightbox \*\/\}/.test(src)) {
  src = src.replace(lightboxAnchorRe, `$1)}$1$2`);
  changes.push("close ternary");
}

if (src === original) {
  console.log("[noop] no changes made");
  process.exit(0);
}

console.log("");
console.log(`=== ES EquipmentGallery fix ${DRY ? "(DRY RUN)" : ""} ===`);
console.log("");
for (const c of changes) console.log(`  - ${c}`);
console.log("");

if (DRY) {
  console.log("DRY RUN complete. Re-run without --dry to apply.");
  process.exit(0);
}

const bak = FILE + ".bak";
if (!fs.existsSync(bak)) fs.writeFileSync(bak, original, "utf8");
fs.writeFileSync(FILE, src, "utf8");
console.log(`[done] ${path.relative(ROOT, FILE)}`);
console.log("");
console.log("Next: npm run build");
