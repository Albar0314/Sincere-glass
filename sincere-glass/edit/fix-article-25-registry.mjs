// fix-article-25-registry.mjs
// One-shot fixup: appends Article #25 registry entry only.
// Use when deploy-article-25.mjs failed at the registry step but components/page
// were already written. Idempotent (skips if slug already present).
//
// Run from project root: node edit\fix-article-25-registry.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SLUG = "low-iron-glass-vs-clear-glass";
const REGISTRY_FILE = path.join(ROOT, "src", "lib", "blog-registry.ts");

function readUtf8(p) {
  return fs.readFileSync(p, "utf8").replace(/^﻿/, "");
}
function writeUtf8(p, content) {
  fs.writeFileSync(p, content, { encoding: "utf8" });
}

const raw = readUtf8(REGISTRY_FILE);

// --- Guard: already present? ---
if (raw.includes(`slug: '${SLUG}'`) || raw.includes(`slug: "${SLUG}"`)) {
  console.log(`[skip] slug "${SLUG}" already present; nothing to do.`);
  process.exit(0);
}

// --- Backup (overwrites previous .bak if exists) ---
const BACKUP = REGISTRY_FILE + ".bak";
writeUtf8(BACKUP, raw);
console.log(`[backup] wrote ${BACKUP}`);

// --- Detect line ending used in the file ---
const EOL = raw.includes("\r\n") ? "\r\n" : "\n";
console.log(`[detect] line ending: ${EOL === "\r\n" ? "CRLF" : "LF"}`);

// --- Build a CRLF-tolerant regex for the array-end anchor ---
// Matches the last article's closing  },  then  ];  then the Utility comment,
// allowing either CRLF or LF between any of those lines.
const ANCHOR_RE = /(\r?\n)(\s*)\}\s*,\s*(\r?\n)\];\s*(\r?\n)(\s*)(\r?\n)\/\/\s*----\s*Utility functions/;

const match = raw.match(ANCHOR_RE);
if (!match) {
  // Fallback: show the tail so we can see what the file actually looks like.
  const tail = raw.slice(-400);
  console.error("[fail] array-end anchor regex did not match. Tail of file:\n---");
  console.error(tail);
  console.error("---\nPaste the above to Claude so a corrected anchor can be built.");
  process.exit(2);
}
console.log(`[match] anchor found at char offset ${match.index}, length ${match[0].length}`);

// --- Entry to splice in before the  ];  ---
// Note: entry starts with the  },  that closes the previous last article,
// then opens a new article object. The new article's closing  },  will come
// from the ANCHOR itself.
const entry =
  "  }," + EOL +
  "  {" + EOL +
  '    slug: "low-iron-glass-vs-clear-glass",' + EOL +
  '    title: "Low Iron Glass vs Clear Glass: The Edge Test, the Numbers, and When It Is Worth the Premium",' + EOL +
  '    excerpt: "Clear float glass is not actually clear. See the green edge test, the 91% vs 83% VLT gap, the 15 to 40% price premium, and the four scenarios where low iron earns it from a Wuhan glass factory.",' + EOL +
  '    targetKeyword: "low iron glass vs clear glass",' + EOL +
  "    secondaryKeywords: [" + EOL +
  '      "low iron vs clear glass",' + EOL +
  '      "ultra clear glass vs clear glass",' + EOL +
  '      "starphire vs clear glass",' + EOL +
  '      "low iron glass premium",' + EOL +
  '      "when to use low iron glass",' + EOL +
  "    ]," + EOL +
  "    searchKeywords: [" + EOL +
  '      "low iron glass vs clear glass",' + EOL +
  '      "low iron vs clear",' + EOL +
  '      "ultra clear vs clear",' + EOL +
  '      "starphire vs standard clear",' + EOL +
  '      "optiwhite vs clear",' + EOL +
  '      "when to use low iron",' + EOL +
  '      "low iron glass premium cost",' + EOL +
  '      "iron oxide glass green edge",' + EOL +
  '      "VLT low iron vs clear",' + EOL +
  '      "CRI low iron",' + EOL +
  '      "architectural glass selection",' + EOL +
  '      "low iron glass",' + EOL +
  '      "ultra clear glass",' + EOL +
  '      "clear float glass",' + EOL +
  '      "Fe2O3 glass",' + EOL +
  '      "超白玻璃 对比",' + EOL +
  '      "超白 普白",' + EOL +
  '      "低铁玻璃 普通玻璃",' + EOL +
  '      "玻璃选型 超白",' + EOL +
  "    ]," + EOL +
  '    publishDate: "2026-11-03",' + EOL +
  '    updatedDate: "2026-11-03",' + EOL +
  '    category: "Buyer Guide",' + EOL +
  '    tags: ["low iron glass", "clear glass", "ultra clear", "glass comparison", "architectural glass", "glass selection"],' + EOL +
  '    heroImage: "/images/blog/low-iron-vs-clear-hero.webp",' + EOL +
  '    heroImageAlt: "Two architectural glass samples standing on edge side by side on a white surface: standard clear float with a visible green edge at 10 mm thickness, and low iron glass with a near-colorless edge at the same thickness",' + EOL +
  '    heroImagePrompt: "Studio product photography, two 10 mm architectural glass samples standing vertically on edge side by side on a clean white matte surface, viewed from a 20-degree elevated angle. Left sample: standard clear float glass showing a distinct bottle-green edge color visible through the full 10 mm thickness. Right sample: low iron glass showing a near-colorless edge with only a very faint cool white tint, visibly more transparent than the left sample. Both samples the same height (300 mm) and width (200 mm) with crisp polished edges. Soft diffused daylight from above-left, shallow depth of field focused on the edges. Small typed white labels at the base reading Clear and Low Iron. Clean neutral grey background. No humans, no props. 4K photorealistic, museum catalog aesthetic.",' + EOL +
  "    author: {" + EOL +
  '      name: "Li Cheng",' + EOL +
  '      url: "https://sincereglass.com/about",' + EOL +
  '      title: "CEO at Sincere Glass",' + EOL +
  '      bio: "CEO at Sincere Glass with 10+ years in architectural glass. Oversees production and quality at our 20,000 m2 Wuhan facility.",' + EOL +
  '      image: "/images/author-images.jpg",' + EOL +
  "    }," + EOL +
  "    readingTime: 13," + EOL +
  "    featured: false," + EOL +
  '    reviewedBy: { name: "Albar", title: "Technical Lead" },' + EOL +
  '    articleType: "comparison",' + EOL +
  '    cluster: "comparison",' + EOL +
  '    relatedProductSlugs: ["laminated-glass", "tempered-glass", "insulated-glass"],' + EOL +
  "    translations: {}," + EOL +
  "    changelog: [" + EOL +
  '      { date: "2026-11-03", note: "Initial publish - Low Iron cluster article #1 under Pillar /blog/low-iron-glass-complete-guide" },' + EOL +
  "    ]," + EOL;

// --- Replace: splice entry in BEFORE the match's  }, so the match's
//     closing  },  becomes the closing of our new article instead.
const patched = raw.replace(ANCHOR_RE, (full, nl1, pad, nl2, nl3, pad2, nl4) => {
  // Rebuild the match tail using the same captured whitespace so we don't
  // accidentally change the file's existing formatting.
  return nl1 + entry + "  }," + nl2 + "];" + nl3 + pad2 + nl4 + "// ---- Utility functions";
});

if (patched === raw) {
  throw new Error("[fail] replace did not change the file (unexpected).");
}

writeUtf8(REGISTRY_FILE, patched);
console.log(`[write] registry entry appended -> ${REGISTRY_FILE}`);
console.log("\n[done] Now run: npm run build");
