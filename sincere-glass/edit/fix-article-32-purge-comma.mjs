// fix-article-32-purge-comma.mjs
// Repairs the comma that deploy-article-32.mjs's purge step absorbed into a
// comment. The "nothing to purge" branch inserted its marker comment directly
// after the secondaryKeywords closing `]`, pushing the array's trailing comma
// onto the end of the comment line (where `//` comments it out). That leaves
// secondaryKeywords without a terminating comma -> "Expected ',', got
// 'searchKeywords'".
//
// Broken shape (3 places: #24, #25, #31):
//     ]
//     // SHOWER-PURGE-V1:a32-shower-NN: scanned, nothing to purge,
//     searchKeywords: [
//
// Fixed shape:
//     ],
//     // SHOWER-PURGE-V1:a32-shower-NN: scanned, nothing to purge
//     searchKeywords: [
//
// Idempotent: once `]` already carries the comma the pattern no longer matches.
// Run from project root:  node fix-article-32-purge-comma.mjs
// Then:                   npm run build

import fs from "node:fs";
import path from "node:path";

const REGISTRY_PATH = path.join(process.cwd(), "src", "lib", "blog-registry.ts");

const raw = fs.readFileSync(REGISTRY_PATH, "utf8");

// `]` (no comma) + EOL + a32 SHOWER purge comment line whose trailing comma
// (the one immediately before EOL) is the displaced array comma.
const re =
  /(\][ \t]*)(\r?\n[ \t]*\/\/ SHOWER-PURGE-V1:a32-shower-\d+:[^\n]*?),([ \t]*\r?\n)/g;

let count = 0;
const fixed = raw.replace(re, (_m, closeBracket, commentLine, tail) => {
  count++;
  return `${closeBracket},${commentLine}${tail}`;
});

if (count === 0) {
  console.log(
    "[fix] no broken a32 purge commas found - already fixed, or markers differ. No change written."
  );
  process.exit(0);
}

fs.copyFileSync(REGISTRY_PATH, REGISTRY_PATH + ".bak");
fs.writeFileSync(REGISTRY_PATH, fixed, "utf8");
console.log(`[fix] moved ${count} displaced comma(s) back onto the ] line.`);
console.log("[fix] backup written to blog-registry.ts.bak");
console.log("[fix] now run: npm run build");
