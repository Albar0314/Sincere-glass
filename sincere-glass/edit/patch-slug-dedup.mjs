// Fix: products/[slug] was also pre-rendering slugs that have a dedicated page
// (e.g. /products/insulated-glass), so two routes produced the same path.
// After this patch [slug] only generates slugs WITHOUT src/app/products/<slug>/page.tsx.
// Marker: SG-SLUG-DEDUP-V1. Idempotent, CRLF-tolerant, .bak next to each file.
// Run from project root:  node edit\patch-slug-dedup.mjs   then   npm run build
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const MARKER = "SG-SLUG-DEDUP-V1";
const FILES = [
  { path: "src/app/products/[slug]/page.tsx", required: true },
  { path: "src/app/es/products/[slug]/page.tsx", required: false },
];

let failed = false;
for (const f of FILES) {
  if (!existsSync(f.path)) {
    if (f.required) { console.error("ABORT: missing " + f.path); process.exit(1); }
    console.log("SKIP " + f.path + " (not present)");
    continue;
  }
  const raw = readFileSync(f.path, "utf8");
  if (raw.includes(MARKER)) { console.log("SKIP " + f.path + " (already patched)"); continue; }
  const EOL = raw.includes("\r\n") ? "\r\n" : "\n";

  const fnRe = /^export function generateStaticParams\(\) \{[ \t]*\r?\n[ \t]*return products\.map\(\(p\) => \(\{ slug: p\.slug \}\)\);[ \t]*\r?\n\}[ \t]*\r?\n/gm;
  const hits = [...raw.matchAll(fnRe)];
  if (hits.length !== 1) {
    console.error("MISS " + f.path + ": generateStaticParams anchor matched " + hits.length + " times (expected 1). File NOT changed.");
    const i = raw.indexOf("generateStaticParams");
    console.error("---- context ----");
    console.error(i >= 0 ? raw.slice(Math.max(0, i - 100), i + 300) : raw.slice(0, 400));
    if (f.required) failed = true;
    continue;
  }
  const replacement = [
    "// " + MARKER + ": slugs with a dedicated src/app/products/<slug>/page.tsx are served by that page.",
    "// Do not pre-render them here too, or two routes emit the same path.",
    "function hasDedicatedPage(slug: string): boolean {",
    '  return existsSync(join(process.cwd(), "src", "app", "products", slug, "page.tsx"));',
    "}",
    "",
    "export function generateStaticParams() {",
    "  return products.filter((p) => !hasDedicatedPage(p.slug)).map((p) => ({ slug: p.slug }));",
    "}",
    "",
  ].join(EOL);
  const m = hits[0];
  let next = raw.slice(0, m.index) + replacement + raw.slice(m.index + m[0].length);

  // imports: add after the first import line (whole-line anchor)
  const impRe = /^import [^\r\n]*;[ \t]*\r?\n/m;
  const im = next.match(impRe);
  if (!im) { console.error("MISS " + f.path + ": no import line found. File NOT changed."); if (f.required) failed = true; continue; }
  const imports = 'import { existsSync } from "node:fs";' + EOL + 'import { join } from "node:path";' + EOL;
  next = next.slice(0, im.index + im[0].length) + imports + next.slice(im.index + im[0].length);

  writeFileSync(f.path + ".bak", raw, "utf8");
  writeFileSync(f.path, next, "utf8");
  console.log("OK   " + f.path + " (backup: page.tsx.bak)");
}
if (failed) process.exit(1);
console.log("\nDone. Now run: npm run build, then check the route table (see chat).");
