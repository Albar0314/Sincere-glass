import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DRY_RUN = process.argv.includes("--dry-run");
const MARKER = "SG-ORPHAN-LINKS-202611";

const PATCHES = [
  {
    slug: "curtain-wall-glass-specification",
    targets: [
      "/blog/architectural-glass-applications-guide",
      "/blog/curved-glass-vs-flat-glass",
    ],
    bodyHtml:
      'Evaluating curtain walls alongside other building zones or curved elevations? Review our <Link href="/blog/architectural-glass-applications-guide" className="font-semibold text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-900">architectural glass applications guide</Link> for zone-by-zone code rules, and compare radius limits and unit economics in our <Link href="/blog/curved-glass-vs-flat-glass" className="font-semibold text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-900">curved glass vs. flat glass facade comparison</Link>.',
  },
  {
    slug: "shower-glass-thickness-guide",
    targets: ["/blog/architectural-glass-applications-guide"],
    bodyHtml:
      'Coordinating bathroom enclosures with balustrades, partitions, and exterior glazing on the same project? See our <Link href="/blog/architectural-glass-applications-guide" className="font-semibold text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-900">complete architectural glass applications guide</Link> for a unified building-zone specification matrix.',
  },
  {
    slug: "balustrade-glass-specification",
    targets: ["/blog/architectural-glass-applications-guide"],
    bodyHtml:
      'Need to align railing build-ups with curtain wall, skylight, and interior partition schedules? Check our <Link href="/blog/architectural-glass-applications-guide" className="font-semibold text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-900">architectural glass applications matrix by building zone</Link> for cross-zone glass selection rules.',
  },
  {
    slug: "architectural-glass-applications-guide",
    targets: ["/blog/spandrel-glass-guide"],
    bodyHtml:
      'Specifying opaque slab-edge or shadow-box panels alongside vision glazing? See our <Link href="/blog/spandrel-glass-guide" className="font-semibold text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-900">spandrel glass specification and thermal-stress guide</Link> covering ceramic frit, opacifiers, and heat-strengthening requirements.',
  },
  {
    slug: "architectural-glass-specification-guide",
    targets: ["/blog/spandrel-glass-guide"],
    bodyHtml:
      'For opaque facade zones where heat buildup, ceramic frit coverage, and fallout retention govern the spec, read our <Link href="/blog/spandrel-glass-guide" className="font-semibold text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-900">spandrel glass opacifier, fallout, and heat-strengthening guide</Link>.',
  },
  {
    slug: "architectural-glass-types-guide",
    targets: ["/blog/curved-glass-vs-flat-glass"],
    bodyHtml:
      'Considering cylindrical or bent elevations instead of segmented flat panels? Explore minimum bend radii, optical tolerances, and cost trade-offs in our <Link href="/blog/curved-glass-vs-flat-glass" className="font-semibold text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-900">curved glass vs. flat glass design and cost comparison</Link>.',
  },
];

function log(msg) {
  console.log((DRY_RUN ? "[DRY-RUN] " : "") + msg);
}

function patchFile(item) {
  const rel = path.join("src", "app", "blog", item.slug, "page.tsx");
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) {
    throw new Error("Missing file: " + rel);
  }

  let src = fs.readFileSync(full, "utf8");
  const eol = src.includes("\r\n") ? "\r\n" : "\n";

  if (src.includes(MARKER)) {
    log("[SKIP] Already patched (" + MARKER + "): " + rel);
    return;
  }

  const missingTargets = item.targets.filter((t) => !src.includes(t));
  if (missingTargets.length === 0) {
    log("[SKIP] All target links already present: " + rel);
    return;
  }

  // 1. Ensure next/link import exists
  const hasLink = /import\s+Link\s+from\s+["']next\/link["']/.test(src);
  if (!hasLink) {
    const firstImportRe = /^(import\s+[^\r\n]+;)(\r?\n)/m;
    if (!firstImportRe.test(src)) {
      throw new Error("Could not find import anchor in: " + rel);
    }
    src = src.replace(firstImportRe, '$1$2import Link from "next/link";' + eol);
    log("  + Added import Link from \"next/link\" -> " + rel);
  }

  // 2. Insert contextual link block right before <FAQ ... />
  const faqRe = /^([ \t]*)(<FAQ\b[^\r\n]*\/>)/m;
  const match = src.match(faqRe);
  if (!match) {
    throw new Error("Could not find <FAQ ... /> anchor in: " + rel);
  }
  const indent = match[1];
  const block = [
    indent + "{/* " + MARKER + " */}",
    indent + '<div className="my-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700">',
    indent + '  <strong className="text-slate-900">Related Guide: </strong>',
    indent + "  " + item.bodyHtml,
    indent + "</div>",
    "",
  ].join(eol);

  src = src.replace(faqRe, block + "$1$2");

  if (DRY_RUN) {
    log("[WOULD PATCH] " + rel + " -> +" + missingTargets.join(", "));
    return;
  }

  const bak = full + ".bak";
  if (!fs.existsSync(bak)) {
    fs.writeFileSync(bak, fs.readFileSync(full, "utf8"), "utf8");
  }
  fs.writeFileSync(full, src, "utf8");
  log("[PATCHED] " + rel + " -> +" + missingTargets.join(", "));
}

function main() {
  log("=== Running " + MARKER + " ===");
  for (const item of PATCHES) {
    patchFile(item);
  }
  log("=== Done! Run orphan check and `npm run build` next. ===");
}

main();