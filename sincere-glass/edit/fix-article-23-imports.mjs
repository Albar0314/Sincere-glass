// fix-article-23-imports.mjs
// Fixes the import block of src/app/blog/spandrel-glass-guide/page.tsx:
// - Switches all component imports from named `{ X }` to default `X` form
// - Corrects TLDRBox path:  blog/blocks → blog
// - Corrects InlineQuoteCTA path:  components → components/products
// - Idempotent: detects already-fixed state and skips
// - Backs up current page.tsx to .bak before writing

import fs from "node:fs";
import path from "node:path";

const PAGE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "blog",
  "spandrel-glass-guide",
  "page.tsx"
);

if (!fs.existsSync(PAGE_PATH)) {
  console.error("❌ page.tsx not found at:", PAGE_PATH);
  process.exit(1);
}

const original = fs.readFileSync(PAGE_PATH, "utf8");

// Idempotency guard
if (original.includes('import TLDRBox from "@/components/blog/TLDRBox"')) {
  console.log("⏭  imports already fixed; nothing to do");
  process.exit(0);
}

// Backup
const bak = PAGE_PATH + ".bak-imports";
if (!fs.existsSync(bak)) {
  fs.copyFileSync(PAGE_PATH, bak);
  console.log("🔒 backup:", bak);
}

// Replace the whole import block at the top (deterministic — all 8 lines together)
const OLD_BLOCK = `import { TLDRBox } from "@/components/blog/blocks/TLDRBox";
import { FAQ } from "@/components/blog/blocks/FAQ";
import { TechNote } from "@/components/blog/blocks/TechNote";
import { InlineQuoteCTA } from "@/components/InlineQuoteCTA";
import { LeadMagnetCTA } from "@/components/blog/LeadMagnetCTA";
import { AuthorBioBox } from "@/components/blog/AuthorBioBox";
import { RelatedProductsCards } from "@/components/blog/RelatedProductsCards";
import { CostDisclaimer } from "@/components/blog/CostDisclaimer";`;

const NEW_BLOCK = `import TLDRBox from "@/components/blog/TLDRBox";
import FAQ from "@/components/blog/blocks/FAQ";
import TechNote from "@/components/blog/blocks/TechNote";
import InlineQuoteCTA from "@/components/products/InlineQuoteCTA";
import LeadMagnetCTA from "@/components/blog/LeadMagnetCTA";
import AuthorBioBox from "@/components/blog/AuthorBioBox";
import RelatedProductsCards from "@/components/blog/RelatedProductsCards";
import CostDisclaimer from "@/components/blog/CostDisclaimer";`;

if (!original.includes(OLD_BLOCK)) {
  console.error("❌ expected import block not found verbatim.");
  console.error("    Open page.tsx and manually replace the 8 import lines with:");
  console.error("\n" + NEW_BLOCK + "\n");
  process.exit(1);
}

// Also fix BlogArticleLayout import (named → default)
let patched = original.replace(OLD_BLOCK, NEW_BLOCK);

const OLD_LAYOUT = `import { BlogArticleLayout } from "@/components/blog/BlogArticleLayout";`;
const NEW_LAYOUT = `import BlogArticleLayout from "@/components/blog/BlogArticleLayout";`;
if (patched.includes(OLD_LAYOUT)) {
  patched = patched.replace(OLD_LAYOUT, NEW_LAYOUT);
  console.log("✅ fixed BlogArticleLayout import");
}

fs.writeFileSync(PAGE_PATH, patched, "utf8");
console.log("✅ import block rewritten in:", PAGE_PATH);
console.log("\nRun: npm run build");
console.log("\nIf build fails next on a Props error:");
console.log("  → send the error + the Head output of the component source");
console.log("  → I'll return a second patch for the component call sites.");
