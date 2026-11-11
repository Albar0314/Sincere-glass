// fix-article-28.mjs
// One-shot repair for two bugs in the article-28 deploy:
//   Bug 1: cannib purge "scanned, no terms to purge" comment stranded the
//          trailing comma of the secondaryKeywords array in #26 and #5.
//   Bug 2: page.tsx imports getArticleBySlug, which does not exist in
//          lib/blog-registry.ts. Replace with blogArticles.find(...).
//
// Idempotent. Safe to re-run. Backs up both files to .bak-fix before writing.
//
// Run from project root:  node fix-article-28.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

// ---------- Fix 1: Registry ----------

const regPath = path.join(ROOT, "src", "lib", "blog-registry.ts");
if (!fs.existsSync(regPath)) {
  console.error(`[fix] registry not found: ${regPath}`);
  process.exit(1);
}

const regOrig = fs.readFileSync(regPath, "utf8");

/*
 Bug pattern (CRLF-tolerant). Deploy script produced one of two shapes:

 Shape A (no terms to purge branch):
   secondaryKeywords: [...]<EOL>
       // GROK-PURGE-V1:a28-gas-fill-*: scanned, no terms to purge,<EOL>

 The original had "],<EOL>" and the deploy script's replacement captured
 only "]" ($3), appending "<EOL>    // marker" AFTER $3 and BEFORE the
 original ",". The "," ended up on the comment line, becoming part of
 the comment. Result: the array line has no trailing comma.

 Fix: collapse the stranded comment line and restore the ",".
*/

// Match: "]" + EOL + optional whitespace + comment line + EOL
// The comment line itself may end with "," which was the stranded comma.
const strandedRe = /\](\r?\n)[ \t]*\/\/\s*GROK-PURGE-V1:a28-gas-fill-[^\r\n]*(\r?\n)/g;

let regFixed = regOrig.replace(strandedRe, "],$1");

if (regFixed !== regOrig) {
  fs.writeFileSync(regPath + ".bak-fix", regOrig, "utf8");
  fs.writeFileSync(regPath, regFixed, "utf8");
  console.log(`[fix] registry: patched (backup at ${regPath}.bak-fix)`);
} else {
  console.log("[fix] registry: no stranded purge comment found, nothing to do");
}

// ---------- Fix 2: page.tsx ----------

const pagePath = path.join(
  ROOT,
  "src",
  "app",
  "blog",
  "argon-vs-krypton-gas-fill-igu",
  "page.tsx"
);

if (!fs.existsSync(pagePath)) {
  console.error(`[fix] page.tsx not found: ${pagePath}`);
  process.exit(1);
}

const pageOrig = fs.readFileSync(pagePath, "utf8");
let pageFixed = pageOrig;

// Replace the bad import
pageFixed = pageFixed.replace(
  /import\s*\{\s*getArticleBySlug\s*\}\s*from\s*["']@\/lib\/blog-registry["'];?/,
  'import { blogArticles } from "@/lib/blog-registry";'
);

// Replace the call site
pageFixed = pageFixed.replace(
  /const\s+article\s*=\s*getArticleBySlug\(SLUG\)!\s*;?/,
  'const article = blogArticles.find((a) => a.slug === SLUG)!;'
);

if (pageFixed !== pageOrig) {
  fs.writeFileSync(pagePath + ".bak-fix", pageOrig, "utf8");
  fs.writeFileSync(pagePath, pageFixed, "utf8");
  console.log(`[fix] page.tsx: patched (backup at ${pagePath}.bak-fix)`);
} else {
  console.log("[fix] page.tsx: no getArticleBySlug usage found, nothing to do");
}

console.log("");
console.log("Done. Next: npm run build");
