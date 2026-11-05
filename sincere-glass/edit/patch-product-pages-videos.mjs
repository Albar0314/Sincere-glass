// patch-product-pages-videos.mjs
// Insert YouTube video embeds into 4 product pages (5 embed points total).
// Mapping locked 2026-11-03.
//
// Pages + anchors:
//   /products/tempered-glass          after <ManufacturingProcess />      expE_icthfo
//   /products/laminated-glass         after <LayerBuilder />               inNYYEAnWOo
//   /products/insulated-glass         after <GasFillComparison />          qcSV4WG8nL0
//   /products/curved-tempered-glass   after <BendingProductionTimeline />  FUGOpDGbca0 (inline in existing section)
//   /products/curved-tempered-glass   before FAQ section                   Ct-LqD0WTVg (new section)
//
// ASCII-only copy (no unicode punctuation) per project encoding SOP.
//
// Run from project root:
//   node edit\patch-product-pages-videos.mjs --dry
//   node edit\patch-product-pages-videos.mjs
//   npm run build

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DRY = process.argv.includes("--dry");

// ---- Theme templates ---------------------------------------------------

// Standard dark section for tempered/laminated/insulated (uses brand-* tokens)
function brandDarkSection(indent, videoId, title, caption) {
  const I = indent;
  return (
    `${I}<section className="py-16 md:py-20 bg-brand-dark border-t border-white/10">\n` +
    `${I}  <div className="max-w-5xl mx-auto px-6 md:px-12">\n` +
    `${I}    <div className="mb-6">\n` +
    `${I}      <p className="text-xs uppercase tracking-wider text-brand-accent font-semibold mb-2">Factory footage</p>\n` +
    `${I}      <h2 className="font-display text-2xl md:text-3xl font-bold text-white">${title}</h2>\n` +
    `${I}      <p className="mt-2 text-sm text-white/60">${caption}</p>\n` +
    `${I}    </div>\n` +
    `${I}    <div className="rounded-xl overflow-hidden">\n` +
    `${I}      <YouTubeEmbed videoId="${videoId}" title="${title}" aspectRatio="16/9" />\n` +
    `${I}    </div>\n` +
    `${I}  </div>\n` +
    `${I}</section>`
  );
}

// Inline video block inside curved-tempered's existing BendingProductionTimeline section
function curvedInlineBlock(indent, videoId, title, caption) {
  const I = indent;
  return (
    `${I}<div className="mt-10">\n` +
    `${I}  <div className="rounded-xl overflow-hidden">\n` +
    `${I}    <YouTubeEmbed videoId="${videoId}" title="${title}" aspectRatio="16/9" />\n` +
    `${I}  </div>\n` +
    `${I}  <p className="mt-3 text-xs text-[#8B95A5]">${caption}</p>\n` +
    `${I}</div>`
  );
}

// Standalone section for curved-tempered video 2 (hex colors, matching page style)
function curvedHexSection(indent, videoId, title, caption, kicker) {
  const I = indent;
  return (
    `${I}<section className="bg-[#1C1F26] py-16 border-t border-[#3A4250]/40">\n` +
    `${I}  <div className="max-w-5xl mx-auto px-6">\n` +
    `${I}    <div className="mb-6 max-w-3xl">\n` +
    `${I}      <div className="text-xs uppercase tracking-wider text-[#DAA745] font-semibold mb-3">${kicker}</div>\n` +
    `${I}      <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F2F0ED]">${title}</h2>\n` +
    `${I}      <p className="mt-2 text-sm text-[#8B95A5]">${caption}</p>\n` +
    `${I}    </div>\n` +
    `${I}    <div className="rounded-xl overflow-hidden">\n` +
    `${I}      <YouTubeEmbed videoId="${videoId}" title="${title}" aspectRatio="16/9" />\n` +
    `${I}    </div>\n` +
    `${I}  </div>\n` +
    `${I}</section>`
  );
}

// ---- Patch definitions ------------------------------------------------

const PATCHES = [
  {
    slug: "tempered-glass",
    inserts: [
      {
        kind: "after-component-line",
        anchor: "<ManufacturingProcess />",
        build: (indent) => brandDarkSection(
          indent,
          "expE_icthfo",
          "Inside the tempering furnace",
          "Our oversized tempering furnace in operation - jumbo panels up to 3.3 m x 15 m."
        ),
      },
    ],
  },
  {
    slug: "laminated-glass",
    inserts: [
      {
        kind: "after-component-line",
        anchor: "<LayerBuilder />",
        build: (indent) => brandDarkSection(
          indent,
          "inNYYEAnWOo",
          "Inside the laminating autoclave",
          "PVB and SGP laminated glass cycling through the high-pressure autoclave at 140 C and 12 bar."
        ),
      },
    ],
  },
  {
    slug: "insulated-glass",
    inserts: [
      {
        kind: "after-component-line",
        anchor: "<GasFillComparison />",
        build: (indent) => brandDarkSection(
          indent,
          "qcSV4WG8nL0",
          "Dual-seal IGU production line",
          "Automated spacer bending, desiccant filling, and argon injection - 90 percent plus fill rate consistency."
        ),
      },
    ],
  },
  {
    slug: "curved-tempered-glass",
    inserts: [
      {
        kind: "after-component-line",
        anchor: "<BendingProductionTimeline />",
        build: (indent) => curvedInlineBlock(
          indent,
          "FUGOpDGbca0",
          "The bending-tempering line in operation",
          "Float glass loaded, heated past softening, bent to the target radius, and air-quenched on our curved tempering furnace."
        ),
      },
      {
        kind: "before-anchor",
        // The whole FAQ section opener (unique in this file)
        anchor: `<section className="bg-[#1C1F26] py-16 border-t border-[#3A4250]/40">`,
        // Must match a specific one — the one directly before FAQ. We will
        // disambiguate by requiring the following lines to contain <FAQ>.
        anchorRequiresFollow: `<FAQ items={faqItems}`,
        build: (indent) => curvedHexSection(
          indent,
          "Ct-LqD0WTVg",
          "Curved panels in finished-goods inventory",
          "Finished curved tempered panels staged for packing and shipment at our Wuhan warehouse. Social proof that what we quote, we actually produce.",
          "In our warehouse"
        ),
      },
    ],
  },
];

// ---- Patch engine -----------------------------------------------------

function ensureImport(src, eol) {
  if (/import\s+YouTubeEmbed\s+from\s+["']@\/components\/YouTubeEmbed["']/.test(src)) {
    return { src, changed: false };
  }
  const importBlockRe = /((?:^import[^\n]*\r?\n)+)/m;
  const m = src.match(importBlockRe);
  if (!m) return { src, changed: false, error: "no import block" };
  const insertion = `import YouTubeEmbed from "@/components/YouTubeEmbed";${eol}`;
  return { src: src.replace(importBlockRe, m[1] + insertion), changed: true };
}

function patchFile(filePath, inserts) {
  if (!fs.existsSync(filePath)) {
    return { skipped: true, reason: "not found" };
  }
  const original = fs.readFileSync(filePath, "utf8");
  const eol = original.includes("\r\n") ? "\r\n" : "\n";
  let src = original;
  const changes = [];

  // Idempotency: if any of our target videoIds are already in the file, skip
  const targetVideoIds = inserts.map((i) => {
    // Extract videoId from the built block (hacky but works)
    const built = i.build("");
    const m = built.match(/videoId="([^"]+)"/);
    return m ? m[1] : null;
  }).filter(Boolean);

  for (const vid of targetVideoIds) {
    if (src.includes(`videoId="${vid}"`)) {
      return { skipped: true, reason: `already has videoId ${vid}` };
    }
  }

  // 1. Add import
  const imp = ensureImport(src, eol);
  if (imp.error) return { error: imp.error };
  if (imp.changed) {
    src = imp.src;
    changes.push("added YouTubeEmbed import");
  }

  // 2. Apply each insert (in order; descending position handled per-insert)
  // Collect all insertion points first, then apply descending
  const positioned = [];
  for (const ins of inserts) {
    let pos = -1;
    let indent = "";
    let anchorLen = 0;

    if (ins.kind === "after-component-line") {
      // Match the whole line containing the component, capture leading whitespace
      const re = new RegExp(
        `(^|\\r?\\n)([ \\t]*)` + escapeRegExp(ins.anchor) + `[ \\t]*(\\r?\\n)`,
        "m"
      );
      const m = src.match(re);
      if (!m) return { error: `anchor not found: ${ins.anchor}` };
      pos = m.index + m[0].length;  // insert AFTER this line (incl trailing newline)
      indent = m[2];
      anchorLen = 0; // insert, not replace
    } else if (ins.kind === "before-anchor") {
      // Find the specific occurrence disambiguated by anchorRequiresFollow
      const anchorRe = new RegExp(
        `(^|\\r?\\n)([ \\t]*)` + escapeRegExp(ins.anchor),
        "gm"
      );
      let match;
      while ((match = anchorRe.exec(src)) !== null) {
        const windowStart = match.index + match[0].length;
        const window = src.slice(windowStart, windowStart + 500);
        if (window.includes(ins.anchorRequiresFollow)) {
          // Insert BEFORE this match. match[1] is leading newline (or empty at file start)
          pos = match.index + match[1].length;  // position of the indent/anchor start
          indent = match[2];
          anchorLen = 0;
          break;
        }
      }
      if (pos === -1) {
        return { error: `before-anchor not found (with follow ${ins.anchorRequiresFollow})` };
      }
    }

    positioned.push({ pos, indent, insert: ins });
  }

  // Apply descending by position so earlier offsets don't shift
  positioned.sort((a, b) => b.pos - a.pos);
  for (const p of positioned) {
    const block = p.insert.build(p.indent);
    const blockWithTrailing = block + eol + eol; // one blank line after
    if (p.insert.kind === "after-component-line") {
      src = src.slice(0, p.pos) + blockWithTrailing + src.slice(p.pos);
      changes.push(`inserted video after ${p.insert.anchor} (videoId: ${extractVideoId(block)})`);
    } else if (p.insert.kind === "before-anchor") {
      src = src.slice(0, p.pos) + blockWithTrailing + src.slice(p.pos);
      changes.push(`inserted new section before FAQ (videoId: ${extractVideoId(block)})`);
    }
  }

  if (src === original) {
    return { noop: true };
  }

  return { newSrc: src, original, changes };
}

function extractVideoId(block) {
  const m = block.match(/videoId="([^"]+)"/);
  return m ? m[1] : "?";
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ---- Driver -----------------------------------------------------------

console.log("");
console.log(`=== Product page video embeds ${DRY ? "(DRY RUN)" : ""} ===`);
console.log("");

let totalPatched = 0;
let totalErrors = 0;

for (const p of PATCHES) {
  const filePath = path.join(ROOT, "src", "app", "products", p.slug, "page.tsx");
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, "/");
  const result = patchFile(filePath, p.inserts);

  if (result.skipped) {
    console.log(`  [skip]  ${relPath}  (${result.reason})`);
    continue;
  }
  if (result.error) {
    console.log(`  [error] ${relPath}  (${result.error})`);
    totalErrors++;
    continue;
  }
  if (result.noop) {
    console.log(`  [noop]  ${relPath}  (nothing to change)`);
    continue;
  }

  if (DRY) {
    console.log(`  [would] ${relPath}`);
    for (const c of result.changes) console.log(`            - ${c}`);
    totalPatched++;
    continue;
  }

  const bak = filePath + ".bak";
  if (!fs.existsSync(bak)) fs.writeFileSync(bak, result.original, "utf8");
  fs.writeFileSync(filePath, result.newSrc, "utf8");
  console.log(`  [done]  ${relPath}`);
  for (const c of result.changes) console.log(`            - ${c}`);
  totalPatched++;
}

console.log("");
console.log(`Patched: ${totalPatched} file(s), errors: ${totalErrors}`);
console.log("");
if (DRY) {
  console.log("DRY RUN complete. Re-run without --dry to apply.");
} else if (totalErrors === 0) {
  console.log("Next: npm run build");
}
