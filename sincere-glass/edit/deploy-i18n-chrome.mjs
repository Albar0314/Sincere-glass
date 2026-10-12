#!/usr/bin/env node
/**
 * Patch: multi-language UI chrome (Header, Footer, QuoteModal, Blog listing + cards).
 *
 * Introduces a lightweight dict + useT() hook so shared Client Components
 * can self-translate based on URL locale (en = root, es = /es/*).
 *
 * No Next.js middleware changes needed. No per-page locale props needed.
 * blog/page.tsx stays a Server Component — its hero + cluster tabs + empty state
 * are factored into Client sub-components (BlogHero, ClusterTabs, BlogEmptyState).
 *
 * Also: redirects ES mirror copies of these shared components (under
 * src/_i18n/es/components/) back to the EN originals via `export { default } from ...`,
 * so any ES mirror page that imports from the mirror tree picks up the new EN originals
 * (which handle ES themselves via useT + usePathname).
 *
 * Run from project root:
 *   node edit/deploy-i18n-chrome.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Template → destination mapping ─────────────────────────────────────────
const FILES = [
  { tmpl: "tmpl_lib_dict.ts.txt",                       dest: "src/lib/dict.ts" },
  { tmpl: "tmpl_lib_useT.ts.txt",                       dest: "src/lib/useT.ts" },
  { tmpl: "tmpl_components_Header.tsx.txt",             dest: "src/components/Header.tsx" },
  { tmpl: "tmpl_components_Footer.tsx.txt",             dest: "src/components/Footer.tsx" },
  { tmpl: "tmpl_components_QuoteModal.tsx.txt",         dest: "src/components/QuoteModal.tsx" },
  { tmpl: "tmpl_components_blog_BlogCard.tsx.txt",      dest: "src/components/blog/BlogCard.tsx" },
  { tmpl: "tmpl_components_blog_ClusterTabs.tsx.txt",   dest: "src/components/blog/ClusterTabs.tsx" },
  { tmpl: "tmpl_components_blog_BlogListingChrome.tsx.txt", dest: "src/components/blog/BlogListingChrome.tsx" },
  { tmpl: "tmpl_app_blog_page.tsx.txt",                 dest: "src/app/blog/page.tsx" },
];

// ─── ES mirror paths to redirect back to EN originals ───────────────────────
const ES_MIRROR_REDIRECTS = [
  { mirror: "src/_i18n/es/components/Header.tsx",             to: "@/components/Header" },
  { mirror: "src/_i18n/es/components/Footer.tsx",             to: "@/components/Footer" },
  { mirror: "src/_i18n/es/components/QuoteModal.tsx",         to: "@/components/QuoteModal" },
  { mirror: "src/_i18n/es/components/blog/BlogCard.tsx",      to: "@/components/blog/BlogCard" },
  { mirror: "src/_i18n/es/components/blog/ClusterTabs.tsx",   to: "@/components/blog/ClusterTabs" },
  { mirror: "src/_i18n/es/components/blog/BlogListingChrome.tsx", to: "@/components/blog/BlogListingChrome" },
];

console.log("Deploying i18n UI chrome patch\n");

// ─── 1. Copy templates to destinations ──────────────────────────────────────
let okCount = 0;
for (const { tmpl, dest } of FILES) {
  const src = path.join(__dirname, tmpl);
  const abs = path.resolve(dest);
  if (!fs.existsSync(src)) {
    console.error(`  MISSING template:  ${tmpl}`);
    continue;
  }
  const content = fs.readFileSync(src, "utf8");
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
  console.log(`  WRITE:  ${dest}`);
  okCount++;
}

console.log("");

// ─── 2. Redirect ES mirror shared components to EN originals ────────────────
let redirectCount = 0;
let mirrorSkipCount = 0;
for (const { mirror, to } of ES_MIRROR_REDIRECTS) {
  const abs = path.resolve(mirror);
  if (!fs.existsSync(abs)) {
    mirrorSkipCount++;
    continue;
  }
  const content =
    "// Auto-generated: redirect to EN original.\n" +
    "// The original handles ES via dict/useT internally (locale from URL).\n" +
    `export { default } from "${to}";\n`;
  fs.writeFileSync(abs, content, "utf8");
  console.log(`  REDIRECT:  ${mirror}  →  ${to}`);
  redirectCount++;
}

console.log("");
console.log(
  `Done. ${okCount} files written, ${redirectCount} ES mirrors redirected, ${mirrorSkipCount} mirrors not present (skipped).`,
);
console.log("");
console.log("Next:");
console.log("  1. git diff --stat   (sanity check)");
console.log("  2. npm run build     (confirm it compiles — MANDATORY before push)");
console.log("  3. If build ok: git add -A && git commit && git push");
console.log("");
console.log("Then open the live ES site after Vercel deploys and check:");
console.log("  - /es/              Header + Footer + Request Quote button in ES");
console.log("  - /es/blog          Hero title, cluster tabs, Featured badge, date, 'min de lectura' all in ES");
console.log("  - Click Request Quote on /es/ page → modal opens in ES");
console.log("");
console.log("Known NOT fixed by this patch (next session):");
console.log("  - Blog article page BODY (prose, FAQ, CTA inside each /blog/<slug>/ page)");
console.log("  - Blog article metadata.title/description for each article");
console.log("  - Any other product-page / about-page English leaks in sub-components");
