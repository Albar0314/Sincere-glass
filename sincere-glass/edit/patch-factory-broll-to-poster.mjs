// patch-factory-broll-to-poster.mjs
// Convert FactoryBrollLoop from <video src="/videos/factory-broll.mp4"> to a
// static <Image> component. Fixes 404 on hero/About/CompanySnapshot sections.
//
// Design:
//   - Preserves component API (overlayColor, overlayOpacity, className, children)
//     so no call sites need to change.
//   - Accepts a new optional `poster` prop; defaults to /images/hero-factory.jpg
//     (confirmed to exist, used by HeroSection too).
//   - Uses next/image with fill + priority=false (not LCP-critical in these
//     secondary sections) + sizes="100vw".
//   - Removes the misleading `<video>` autoplay semantics; adds a subtle fade-in
//     so the swap is visually smoother than a hard image load.
//   - Also patches ES mirror if present.
//
// Run from project root:
//   node edit\patch-factory-broll-to-poster.mjs --dry
//   node edit\patch-factory-broll-to-poster.mjs
//   npm run build

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DRY = process.argv.includes("--dry");

const EN_PATH = path.join(ROOT, "src", "components", "FactoryBrollLoop.tsx");
const ES_PATH = path.join(ROOT, "src", "_i18n", "es", "components", "FactoryBrollLoop.tsx");

const NEW_CONTENT = `import Image from "next/image";

interface Props {
  overlayOpacity?: number;
  className?: string;
  children?: React.ReactNode;
  /** Which brand color overlays the image. Defaults to brand dark. */
  overlayColor?: string;
  /** Path to the poster image. Defaults to /images/hero-factory.jpg. */
  poster?: string;
  /** Alt text for the poster image. Optional; blank by default since image is decorative. */
  posterAlt?: string;
}

/**
 * Factory b-roll section as a static poster image with brand overlay.
 *
 * Was previously a silent autoplay mp4 at /videos/factory-broll.mp4, but
 * we no longer ship raw mp4 assets through the Vercel bundle (bandwidth
 * cost + repo bloat). Video content now lives on YouTube and is embedded
 * per-section via YouTubeEmbed where motion adds value. For hero
 * backgrounds the static image gives the same visual weight without the
 * autoplay bandwidth, LCP penalty, or iframe chrome.
 */
export default function FactoryBrollLoop({
  overlayOpacity = 0.55,
  overlayColor = "#1C1F26",
  className = "",
  children,
  poster = "/images/hero-factory.jpg",
  posterAlt = "",
}: Props) {
  return (
    <div className={\`relative overflow-hidden \${className}\`}>
      <Image
        src={poster}
        alt={posterAlt}
        fill
        sizes="100vw"
        quality={75}
        className="object-cover object-center"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: overlayColor, opacity: overlayOpacity }}
        aria-hidden="true"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
`;

function patch(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`  [skip]  ${path.relative(ROOT, filePath)} (not found)`);
    return { skipped: true };
  }

  const old = fs.readFileSync(filePath, "utf8");

  // Idempotency: if already imports next/image and doesn't reference /videos/, skip.
  if (/from\s+["']next\/image["']/.test(old) && !/\/videos\//.test(old)) {
    console.log(`  [skip]  ${path.relative(ROOT, filePath)} (already migrated)`);
    return { skipped: true };
  }

  if (DRY) {
    console.log(`  [would]  ${path.relative(ROOT, filePath)}  (${old.length} -> ${NEW_CONTENT.length} bytes)`);
    return { dry: true };
  }

  const bak = filePath + ".bak";
  if (!fs.existsSync(bak)) fs.writeFileSync(bak, old, "utf8");
  fs.writeFileSync(filePath, NEW_CONTENT, "utf8");
  console.log(`  [done]  ${path.relative(ROOT, filePath)}  (${old.length} -> ${NEW_CONTENT.length} bytes, .bak saved)`);
  return { done: true };
}

console.log("");
console.log(`=== FactoryBrollLoop -> static poster ${DRY ? "(DRY RUN)" : ""} ===`);
console.log("");

patch(EN_PATH);
patch(ES_PATH);

console.log("");
if (DRY) {
  console.log("DRY RUN complete. Re-run without --dry to apply.");
} else {
  console.log("Next steps:");
  console.log("  1. Manually remove <VideoSchema> from pages that no longer host a video");
  console.log("     (search: Select-String src\\ -Pattern 'VideoSchema' -Include *.tsx)");
  console.log("     — leaving a VideoObject JSON-LD without a real video is a Google violation.");
  console.log("  2. npm run build");
  console.log("  3. Verify About / home CompanySnapshot sections show the poster image");
}
