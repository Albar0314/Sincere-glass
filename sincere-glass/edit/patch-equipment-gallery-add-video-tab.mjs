// patch-equipment-gallery-add-video-tab.mjs
// Add Video/Photos tab toggle to EquipmentGallery component (the ACTUAL
// component used by /equipment page, not the dead EquipmentClient).
//
// Changes per file:
//   1. Add imports: YouTubeEmbed, getEquipmentVideo
//   2. Add state: video = getEquipmentVideo(category.key), viewMode toggle
//   3. Add useEffect to reset viewMode when category changes
//   4. Insert tabs + ternary render in JSX
//
// Patches both EN and ES mirror. ES tab labels use Spanish.
//
// Run from project root:
//   node edit\patch-equipment-gallery-add-video-tab.mjs --dry
//   node edit\patch-equipment-gallery-add-video-tab.mjs
//   npm run build

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DRY = process.argv.includes("--dry");

const FILES = [
  { path: path.join(ROOT, "src", "components", "EquipmentGallery.tsx"), lang: "en" },
  { path: path.join(ROOT, "src", "_i18n", "es", "components", "EquipmentGallery.tsx"), lang: "es" },
];

const LABELS = {
  en: { video: "Video", photos: "Photos" },
  es: { video: "Video", photos: "Fotos" },
};

function patch(file) {
  const { path: filePath, lang } = file;
  if (!fs.existsSync(filePath)) {
    console.log(`  [skip]  ${path.relative(ROOT, filePath)} (not found)`);
    return;
  }
  const original = fs.readFileSync(filePath, "utf8");
  const eol = original.includes("\r\n") ? "\r\n" : "\n";
  let src = original;
  const changes = [];
  const L = LABELS[lang];

  // --- Idempotency: already patched? ---
  if (/getEquipmentVideo/.test(src) && /setViewMode/.test(src)) {
    console.log(`  [skip]  ${path.relative(ROOT, filePath)} (already patched)`);
    return;
  }

  // --- 1. Add imports after the existing import block ---
  if (!/getEquipmentVideo/.test(src)) {
    const importBlockRe = /((?:^import[^\n]*\r?\n)+)/m;
    const m = src.match(importBlockRe);
    if (!m) {
      console.log(`  [warn]  ${path.relative(ROOT, filePath)}: no import block found`);
      return;
    }
    const newImports =
      `import YouTubeEmbed from "@/components/YouTubeEmbed";${eol}` +
      `import { getEquipmentVideo } from "@/lib/equipment-videos";${eol}`;
    src = src.replace(importBlockRe, m[1] + newImports);
    changes.push("added imports (YouTubeEmbed + getEquipmentVideo)");
  }

  // --- 2. Add state + useEffect after the lightboxIndex state line ---
  // Anchor: `const [lightboxIndex, setLightboxIndex] = useState<number>(0);`
  const stateAnchorRe = /(const \[lightboxIndex, setLightboxIndex\] = useState<number>\(0\);)/;
  if (stateAnchorRe.test(src) && !/setViewMode/.test(src)) {
    const stateInsert =
      `${eol}` +
      `  const video = getEquipmentVideo(category.key);${eol}` +
      `  const [viewMode, setViewMode] = useState<"video" | "photos">(video ? "video" : "photos");${eol}` +
      `  useEffect(() => { setViewMode(video ? "video" : "photos"); }, [category.key, video]);`;
    src = src.replace(stateAnchorRe, `$1${stateInsert}`);
    changes.push("added video state + viewMode state + reset effect");
  }

  // --- 3. Insert tabs + ternary opener before the main grid ---
  // Anchor: the exact return + fragment + grid open
  const returnAnchorRe = /return \(\s*\r?\n\s*<>\s*\r?\n\s*<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">/;
  if (returnAnchorRe.test(src)) {
    const replacement =
      `return (${eol}` +
      `    <>${eol}` +
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
    src = src.replace(returnAnchorRe, replacement);
    changes.push("added tabs + ternary opener in return");
  }

  // --- 4. Close the ternary before the Lightbox section ---
  // Anchor: `{/* Lightbox */}` preceded by blank line
  const lightboxAnchorRe = /(\r?\n\s*)(\{\/\* Lightbox \*\/\})/;
  if (lightboxAnchorRe.test(src) && !/\)\}\s*\r?\n\s*\{\/\* Lightbox \*\/\}/.test(src)) {
    src = src.replace(lightboxAnchorRe, `$1)}$1$2`);
    changes.push("closed ternary before Lightbox");
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
console.log(`=== EquipmentGallery: add Video/Photos tab ${DRY ? "(DRY RUN)" : ""} ===`);
console.log("");
for (const f of FILES) patch(f);
console.log("");
if (DRY) {
  console.log("DRY RUN complete. Re-run without --dry to apply.");
} else {
  console.log("Next: npm run build");
  console.log("");
  console.log("Expected on /equipment:");
  console.log("  - Tempering / Cutting / Edge Grinding / Laminating / Insulated Glass tabs");
  console.log("    show Video/Photos toggle, default = Video (YouTube thumbnail + play)");
  console.log("  - Ceramic Frit / Enameling tab: no toggle, photos only (no video assigned)");
}
