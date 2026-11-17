// Fix: Article #30 registry entry is missing the required `author` field.
// Inserts `author: DEFAULT_AUTHOR,` into that one entry. Idempotent, .bak, CRLF-safe.
// Run from project root:  node edit\fix-article-30-author.mjs   then   npm run build
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const F = "src/lib/blog-registry.ts";
const SLUG = "insulated-glass-spacer-warm-edge-vs-aluminum";
if (!existsSync(F)) { console.error("ABORT: missing " + F); process.exit(1); }

let raw = readFileSync(F, "utf8");
const EOL = raw.includes("\r\n") ? "\r\n" : "\n";

// Unique anchor: this entry's heroImageAlt line. Insert author right after it.
const anchorRe = /^([ \t]*)heroImageAlt: "Macro cross-section of an insulated glass unit edge[^\r\n]*,[ \t]*$/m;
const m = raw.match(anchorRe);
if (!m) {
  // maybe already fixed
  const slugIdx = raw.indexOf("slug: '" + SLUG + "'");
  if (slugIdx >= 0 && /author:\s*DEFAULT_AUTHOR/.test(raw.slice(slugIdx, slugIdx + 1200))) {
    console.log("Already fixed (author present in the #30 entry). No change.");
    process.exit(0);
  }
  console.error("ABORT: heroImageAlt anchor for #30 not found and author not already present.");
  console.error("Check that deploy-article-30 ran and inserted the entry.");
  process.exit(1);
}

const indent = m[1];
// guard: if author already in this entry, do nothing
const after = raw.slice(m.index, m.index + 1200);
if (/author:\s*DEFAULT_AUTHOR/.test(after)) { console.log("Already fixed. No change."); process.exit(0); }

const insertion = m[0] + EOL + indent + "author: DEFAULT_AUTHOR,";
const next = raw.slice(0, m.index) + insertion + raw.slice(m.index + m[0].length);

// sanity: DEFAULT_AUTHOR must exist in the file
if (!/DEFAULT_AUTHOR/.test(raw)) {
  console.error("ABORT: DEFAULT_AUTHOR is not defined in blog-registry.ts - would not compile. No change.");
  process.exit(1);
}

writeFileSync(F + ".bak", raw, "utf8");
writeFileSync(F, next, "utf8");
console.log("OK: inserted `author: DEFAULT_AUTHOR,` into the #30 entry (backup: blog-registry.ts.bak).");
console.log("Now run: npm run build");
