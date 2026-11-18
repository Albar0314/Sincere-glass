// fix-registry-purge-comma.mjs
// One-off repair for the deploy-article-31 purge bug.
//
// The purge step emitted:
//     ]
//     // LIT-PURGE-V1:a31-litempered-24: ... ),   <- trailing comma ended up in the comment
//     searchKeywords: [
// which drops the comma that must separate secondaryKeywords from the next
// property. This moves the comma back onto the ] and strips it from the
// comment line, for every LIT-PURGE-V1:a31-litempered-* site (#24 and #25).
//
// Idempotent-ish: if no broken site is found it changes nothing.
// Backs up to blog-registry.ts.prefix.bak before writing.
//
// Run from project root:  node fix-registry-purge-comma.mjs
// Then:                   npm run build

import fs from "node:fs";
import path from "node:path";

const REG = path.join(process.cwd(), "src", "lib", "blog-registry.ts");
const raw = fs.readFileSync(REG, "utf8");

// ] + newline + a LIT-PURGE comment line whose LAST char is a comma.
// Greedy [^\r\n]* grabs the whole comment line, backtracks so the trailing
// comma matches literally; group 1 = the comment line without that comma.
const re = /\](\r?\n[ \t]*\/\/ LIT-PURGE-V1:a31-litempered-\d+:[^\r\n]*),/g;

const matches = raw.match(re);
if (!matches || matches.length === 0) {
  console.log("[fix] no broken purge site found - nothing to do (already fixed?).");
  process.exit(0);
}

fs.copyFileSync(REG, REG + ".prefix.bak");
const fixed = raw.replace(re, "],$1");
fs.writeFileSync(REG, fixed, "utf8");

console.log(`[fix] repaired ${matches.length} purge site(s):`);
for (const m of matches) {
  const marker = (m.match(/a31-litempered-\d+/) || ["?"])[0];
  console.log(`   - ${marker}`);
}
console.log("[fix] moved the comma from the comment back onto the ]. Run: npm run build");
