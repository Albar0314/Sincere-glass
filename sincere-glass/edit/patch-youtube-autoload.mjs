// patch-youtube-autoload.mjs
// Add `autoLoad` prop to YouTubeEmbed so callers can skip click-to-load.
// When autoLoad=true: iframe renders immediately with YouTube native controls,
// but WITHOUT autoplay=1 (user still clicks native play to start).
// When autoLoad=false (default): existing click-to-load behavior preserved.
//
// Then: set autoLoad on the 5 product-page embeds.
// Other callers (Equipment, Projects, Contact, Blog) unchanged.
//
// Run from project root:
//   node edit\patch-youtube-autoload.mjs --dry
//   node edit\patch-youtube-autoload.mjs
//   npm run build

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DRY = process.argv.includes("--dry");

// ---- YouTubeEmbed component (full rewrite, both EN and ES mirror) ----

const YOUTUBE_EMBED_NEW = `'use client';

import { useState } from 'react';

interface Props {
  videoId: string;
  title: string;
  /** 'maxresdefault' when uploader provided 1080p source, else 'hqdefault' */
  thumbnailQuality?: 'hqdefault' | 'maxresdefault';
  /** CSS aspect-ratio string, e.g. "16/9", "21/9", "4/3" */
  aspectRatio?: string;
  className?: string;
  /**
   * When true: skip the click-to-load thumbnail. Render the YouTube iframe
   * immediately with native player controls, but WITHOUT autoplay. User
   * still clicks native play to start. Use on pages where the video is the
   * focal content (product pages, hero sections). Keep false (default) for
   * embeds buried mid-content where click-to-load keeps initial weight low.
   */
  autoLoad?: boolean;
}

/**
 * YouTube embed with two modes:
 *   - Default (autoLoad=false): click-to-load. Shows static thumbnail + play
 *     button; only on click does the iframe mount (and autoplays, since the
 *     click is itself an intent-to-play). Keeps LCP + bandwidth low and
 *     delays YouTube cookies until user opts in.
 *   - autoLoad=true: iframe renders on mount with native YouTube controls
 *     visible. No autoplay (would be hostile on page load); user clicks
 *     native play. Right choice when the video IS the content.
 */
export default function YouTubeEmbed({
  videoId,
  title,
  thumbnailQuality = 'maxresdefault',
  aspectRatio = '16/9',
  className = '',
  autoLoad = false,
}: Props) {
  const [loaded, setLoaded] = useState<boolean>(autoLoad);
  const thumb = \`https://i.ytimg.com/vi/\${videoId}/\${thumbnailQuality}.jpg\`;

  // Only add autoplay=1 when the iframe mounts because of a user click
  // (i.e. click-to-load path). When autoLoad put us straight into iframe
  // mode, respect the user by NOT auto-starting playback.
  const embedUrl = \`https://www.youtube.com/embed/\${videoId}?rel=0&modestbranding=1\${autoLoad ? '' : '&autoplay=1'}\`;

  return (
    <div
      className={\`relative w-full rounded-xl overflow-hidden bg-[#1C1F26] group \${className} \${loaded ? '' : 'cursor-pointer'}\`}
      style={{ aspectRatio: aspectRatio.replace('/', ' / ') }}
      onClick={!loaded ? () => setLoaded(true) : undefined}
      role={!loaded ? 'button' : undefined}
      aria-label={!loaded ? \`Play video: \${title}\` : undefined}
    >
      {!loaded ? (
        <>
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = \`https://i.ytimg.com/vi/\${videoId}/hqdefault.jpg\`;
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#DAA745] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 md:w-8 md:h-8 text-[#1C1F26] ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-3 left-4 right-4 text-[#F2F0ED] text-sm font-medium drop-shadow-lg">
            {title}
          </div>
        </>
      ) : (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      )}
    </div>
  );
}
`;

const COMPONENT_FILES = [
  path.join(ROOT, "src", "components", "YouTubeEmbed.tsx"),
  path.join(ROOT, "src", "_i18n", "es", "components", "YouTubeEmbed.tsx"),
];

const PRODUCT_PAGES = [
  path.join(ROOT, "src", "app", "products", "tempered-glass", "page.tsx"),
  path.join(ROOT, "src", "app", "products", "laminated-glass", "page.tsx"),
  path.join(ROOT, "src", "app", "products", "insulated-glass", "page.tsx"),
  path.join(ROOT, "src", "app", "products", "curved-tempered-glass", "page.tsx"),
];

function patchComponent(filePath) {
  if (!fs.existsSync(filePath)) {
    return { skipped: true, reason: "not found" };
  }
  const original = fs.readFileSync(filePath, "utf8");
  if (/autoLoad\?:\s*boolean/.test(original) && /autoLoad = false/.test(original)) {
    return { skipped: true, reason: "already has autoLoad prop" };
  }
  if (DRY) return { dry: true, delta: YOUTUBE_EMBED_NEW.length - original.length };
  const bak = filePath + ".bak";
  if (!fs.existsSync(bak)) fs.writeFileSync(bak, original, "utf8");
  fs.writeFileSync(filePath, YOUTUBE_EMBED_NEW, "utf8");
  return { done: true };
}

function patchProductPage(filePath) {
  if (!fs.existsSync(filePath)) {
    return { skipped: true, reason: "not found" };
  }
  const original = fs.readFileSync(filePath, "utf8");
  // Match <YouTubeEmbed ...aspectRatio="16/9" />  that does NOT already have autoLoad
  const re = /(<YouTubeEmbed\b[^>]*aspectRatio="16\/9")\s*\/>/g;
  let count = 0;
  const newSrc = original.replace(re, (full, before) => {
    if (full.includes("autoLoad")) return full;
    count++;
    return `${before} autoLoad />`;
  });
  if (count === 0) return { skipped: true, reason: "no matching embeds (maybe already patched)" };
  if (newSrc === original) return { skipped: true, reason: "no change" };
  if (DRY) return { dry: true, count };
  const bak = filePath + ".bak";
  if (!fs.existsSync(bak)) fs.writeFileSync(bak, original, "utf8");
  fs.writeFileSync(filePath, newSrc, "utf8");
  return { done: true, count };
}

console.log("");
console.log(`=== YouTubeEmbed autoLoad ${DRY ? "(DRY RUN)" : ""} ===`);
console.log("");

console.log("1. Component files:");
for (const f of COMPONENT_FILES) {
  const rel = path.relative(ROOT, f).replace(/\\/g, "/");
  const r = patchComponent(f);
  if (r.skipped) console.log(`   [skip]  ${rel}  (${r.reason})`);
  else if (r.dry) console.log(`   [would] ${rel}  (delta ${r.delta} bytes)`);
  else console.log(`   [done]  ${rel}`);
}

console.log("");
console.log("2. Product pages (adding autoLoad to <YouTubeEmbed ... aspectRatio=\"16/9\" />):");
for (const f of PRODUCT_PAGES) {
  const rel = path.relative(ROOT, f).replace(/\\/g, "/");
  const r = patchProductPage(f);
  if (r.skipped) console.log(`   [skip]  ${rel}  (${r.reason})`);
  else if (r.dry) console.log(`   [would] ${rel}  (${r.count} embed(s))`);
  else console.log(`   [done]  ${rel}  (${r.count} embed(s))`);
}

console.log("");
if (DRY) {
  console.log("DRY RUN complete. Re-run without --dry to apply.");
} else {
  console.log("Next: npm run build");
  console.log("");
  console.log("Expected behavior on product pages:");
  console.log("  - YouTube iframe renders immediately (no thumbnail + play-button step)");
  console.log("  - Native YouTube controls visible, user clicks play to start");
  console.log("  - No autoplay (would be hostile on page load)");
  console.log("");
  console.log("Equipment / Blog / Projects / Contact pages: unchanged click-to-load behavior.");
}
