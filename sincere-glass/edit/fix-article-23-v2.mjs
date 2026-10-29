// fix-article-23-v2.mjs — complete rewrite of Article #23 to match REAL component APIs
// (first delivery used wrong Props/paths/schema because I didn't verify against actual sources)
//
// Does:
//   1. Removes the previously-inserted (broken) registry entry for spandrel-glass-guide
//   2. Inserts a correct registry entry using the actual BlogArticle interface
//   3. Overwrites src/app/blog/spandrel-glass-guide/page.tsx with the correct component usage
//   4. Backs up every file it touches to <path>.bak-v2 before writing
//   5. Idempotent — safe to re-run
//
// Does NOT touch:
//   - The 3 component files under src/components/blog/article-23/ (those were correct)
//   - The 4 reciprocal "See also" patches on other articles (those used anchors + markers; left in place)

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EDIT = path.join(ROOT, "edit");
const SRC = path.join(ROOT, "src");
const SLUG = "spandrel-glass-guide";

function backup(targetPath, suffix = ".bak-v2") {
  if (!fs.existsSync(targetPath)) return;
  const bak = targetPath + suffix;
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(targetPath, bak);
    console.log(`  🔒 backup: ${path.relative(ROOT, bak)}`);
  }
}

// ---------- STEP 1: overwrite page.tsx with correct version ----------
console.log("\n[1/2] Overwriting page.tsx with corrected version...");
const pageTarget = path.join(SRC, "app", "blog", SLUG, "page.tsx");
const pageSource = path.join(EDIT, "page-article-23-spandrel.tsx.txt");
if (!fs.existsSync(pageSource)) {
  console.error(`❌ missing: ${pageSource}`);
  process.exit(1);
}
backup(pageTarget);
fs.writeFileSync(pageTarget, fs.readFileSync(pageSource, "utf8"), "utf8");
console.log(`  ✍  wrote:  ${path.relative(ROOT, pageTarget)}`);

// ---------- STEP 2: fix registry entry ----------
console.log("\n[2/2] Replacing registry entry with correct schema...");
const registryPath = path.join(SRC, "lib", "blog-registry.ts");
if (!fs.existsSync(registryPath)) {
  console.error(`❌ missing: ${registryPath}`);
  process.exit(1);
}

let src = fs.readFileSync(registryPath, "utf8");
backup(registryPath);

// 2a. Delete any existing entry for this slug (both quote styles)
function removeExistingEntry(source, slug) {
  // Find the object that contains this slug, delete from "  {" to matching "  }," including trailing newline
  const slugPatterns = [`slug: "${slug}"`, `slug: '${slug}'`];
  for (const pat of slugPatterns) {
    const slugIdx = source.indexOf(pat);
    if (slugIdx === -1) continue;

    // Walk backward to find the opening "  {\n" of this object
    let openIdx = source.lastIndexOf("\n  {\n", slugIdx);
    if (openIdx === -1) {
      // Try the alternate opening form
      openIdx = source.lastIndexOf("  {\n", slugIdx);
    }
    if (openIdx === -1) {
      throw new Error(`Found slug ${slug} but could not locate object opening brace`);
    }
    // We want to delete from the \n before "  {" so result stays clean
    const deleteStart = openIdx; // this is \n position

    // Walk forward to find the matching "  },\n" (end of this object)
    // Use brace counting from the "{" character after "  "
    const braceStart = source.indexOf("{", deleteStart);
    let depth = 0;
    let i = braceStart;
    for (; i < source.length; i++) {
      const ch = source[i];
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) break;
      }
    }
    if (depth !== 0) throw new Error(`Unmatched braces when deleting entry for ${slug}`);
    // Advance past "},\n" if present
    let endIdx = i + 1;
    if (source.slice(endIdx, endIdx + 2) === ",\n") endIdx += 2;
    else if (source[endIdx] === ",") endIdx += 1;

    const removed = source.slice(0, deleteStart) + source.slice(endIdx);
    console.log(`  🗑  removed existing entry (pattern: ${pat})`);
    return removeExistingEntry(removed, slug); // recurse in case of duplicates
  }
  return source;
}
src = removeExistingEntry(src, SLUG);

// 2b. Build correct entry (uses DEFAULT_AUTHOR; apostrophe-safe double quotes)
const correctEntry = `  {
    slug: "${SLUG}",
    title: "Spandrel Glass: Construction Methods, Thermal Stress & Specification Guide",
    excerpt:
      "How to specify spandrel glass across 4 construction methods, prevent thermal breakage, match color to vision glass, and avoid the 5 most common facade spec mistakes. Factory-floor view from Wuhan.",
    targetKeyword: "spandrel glass",
    secondaryKeywords: [
      "spandrel glass thickness",
      "spandrel vs vision glass",
      "shadow box vs spandrel",
      "ceramic frit spandrel",
      "spandrel panel construction",
    ],
    searchKeywords: [
      "spandrel glass",
      "spandrel glass thickness",
      "spandrel vs vision glass",
      "shadow box vs spandrel",
      "ceramic frit spandrel",
      "opacifier spandrel glass",
      "spandrel glass heat soak",
      "spandrel panel construction",
      "spandrel color matching",
      "spandrel facade",
      "幕墙非视觉区玻璃",
      "彩釉背衬玻璃",
      "层间玻璃",
    ],
    publishDate: "2026-10-29",
    updatedDate: "2026-10-29",
    category: "Technical Guide" as const,
    tags: [
      "spandrel glass",
      "ceramic frit",
      "curtain wall",
      "thermal stress",
      "facade",
      "heat-strengthened",
    ],
    heroImage: "/images/blog/spandrel-glass-hero.webp",
    heroImageAlt:
      "Modern high-rise commercial curtain wall facade showing dark bronze ceramic frit spandrel panels alternating with clear vision glass at golden hour",
    heroImagePrompt:
      "Architectural photography, exterior facade of a modern 12-story commercial curtain wall building shot from street level at golden hour. Clear vision glass on floors with warm interior lighting visible; opaque dark-bronze ceramic frit spandrel panels concealing floor slabs — spandrel and vision glass visually distinct but tonally harmonized. Shallow depth of field on upper floors, crisp detail on mid-building spandrel/vision transition. No people, no logos, no text. Cinematic muted color grade, slight teal-orange split-tone. 16:9, photorealistic, shot on Phase One, f/5.6, ISO 100.",
    author: DEFAULT_AUTHOR,
    reviewedBy: { name: "Albar", title: "Technical Lead" },
    articleType: "technical" as const,
    cluster: "application",
    relatedProductSlugs: ["enameled-glass", "tempered-glass", "insulated-glass"],
    translations: {},
    changelog: [
      { date: "2026-10-29", note: "Initial publish — Application cluster, 4th article" },
    ],
    readingTime: 15,
    featured: false,
  },
`;

// 2c. Insert before the specific anchor
const anchor = "];\n\n// ---- Utility functions";
const anchorIdx = src.indexOf(anchor);
if (anchorIdx === -1) {
  // Fallback anchor without the exact spacing
  const fallback = "];\n// ---- Utility functions";
  const fIdx = src.indexOf(fallback);
  if (fIdx === -1) {
    throw new Error("Registry closing anchor not found. Open registry and insert manually before '];\\n\\n// ---- Utility functions'");
  }
  src = src.slice(0, fIdx) + correctEntry + src.slice(fIdx);
} else {
  src = src.slice(0, anchorIdx) + correctEntry + src.slice(anchorIdx);
}

fs.writeFileSync(registryPath, src, "utf8");
console.log(`  ✍  wrote:  ${path.relative(ROOT, registryPath)}`);

console.log("\n✅ Article #23 v2 fix complete.");
console.log("\nNext:");
console.log("  npm run build");
console.log("\nIf build still fails, send me the exact error — I'll fix in the next pass.");
console.log("All backups kept with .bak-v2 suffix; .bak from v1 also preserved.");
