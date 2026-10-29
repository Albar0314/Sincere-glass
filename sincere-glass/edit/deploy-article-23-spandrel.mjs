// deploy-article-23-spandrel.mjs
// Deploys Article #23: /blog/spandrel-glass-guide
// - Copies 3 interactive components + article page from edit/ templates
// - Appends registry entry (idempotent: skips if slug exists)
// - Inserts reciprocal "See also" links in #8 (curtain-wall), #12 (applications pillar), #22 (heat-soaked)
// - Adds InlineCTA link in ceramic-frit product page
// - Backs up every file it touches to <path>.bak before writing
// - All patches guarded by unique marker GROK-INSERT-V1:spandrel-xref

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EDIT = path.join(ROOT, "edit");
const SRC = path.join(ROOT, "src");
const SLUG = "spandrel-glass-guide";
const MARKER = "GROK-INSERT-V1:spandrel-xref";

function readTxt(name) {
  return fs.readFileSync(path.join(EDIT, name), "utf8");
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function backup(targetPath) {
  if (!fs.existsSync(targetPath)) return;
  const bak = targetPath + ".bak";
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(targetPath, bak);
    console.log(`  🔒 backup: ${path.relative(ROOT, bak)}`);
  }
}

function writeFile(targetPath, content) {
  ensureDir(path.dirname(targetPath));
  backup(targetPath);
  fs.writeFileSync(targetPath, content, "utf8");
  console.log(`  ✍  wrote:  ${path.relative(ROOT, targetPath)}`);
}

function patchFile(targetPath, patcher, { skipIfIncludes } = {}) {
  if (!fs.existsSync(targetPath)) {
    console.log(`  ⚠  skip (not found): ${path.relative(ROOT, targetPath)}`);
    return;
  }
  const original = fs.readFileSync(targetPath, "utf8");
  if (skipIfIncludes && original.includes(skipIfIncludes)) {
    console.log(`  ⏭  skip (already patched): ${path.relative(ROOT, targetPath)}`);
    return;
  }
  const patched = patcher(original);
  if (patched === original) {
    console.log(`  ⚠  patcher produced no change: ${path.relative(ROOT, targetPath)}`);
    return;
  }
  backup(targetPath);
  fs.writeFileSync(targetPath, patched, "utf8");
  console.log(`  🔧 patched: ${path.relative(ROOT, targetPath)}`);
}

// ---------- STEP 1: component files ----------
console.log("\n[1/5] Writing article-23 components...");
const compDir = path.join(SRC, "components", "blog", "article-23");
writeFile(
  path.join(compDir, "ConstructionMethodMatrix.tsx"),
  readTxt("ConstructionMethodMatrix.tsx.txt")
);
writeFile(
  path.join(compDir, "ThermalStressSimulator.tsx"),
  readTxt("ThermalStressSimulator.tsx.txt")
);
writeFile(
  path.join(compDir, "FacadeZonePicker.tsx"),
  readTxt("FacadeZonePicker.tsx.txt")
);

// ---------- STEP 2: article page ----------
console.log("\n[2/5] Writing article page...");
const pageDir = path.join(SRC, "app", "blog", SLUG);
writeFile(
  path.join(pageDir, "page.tsx"),
  readTxt("page-article-23-spandrel-glass-guide.tsx.txt")
);

// ---------- STEP 3: registry entry (idempotent) ----------
console.log("\n[3/5] Appending registry entry...");
const registryPath = path.join(SRC, "lib", "blog-registry.ts");
patchFile(
  registryPath,
  (src) => {
    const entry = `  {
    slug: "${SLUG}",
    title: "Spandrel Glass: Construction Methods, Thermal Stress & Specification Guide",
    description:
      "How to specify spandrel glass across 4 construction methods, prevent thermal breakage, match color to vision glass, and avoid the 5 most common facade spec mistakes.",
    cluster: "application",
    targetKeyword: "spandrel glass",
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
      "幕墙非视觉区玻璃",
      "彩釉背衬玻璃",
      "层间玻璃",
    ],
    author: "Li Cheng",
    reviewedBy: "Albar, Technical Lead",
    articleType: "Technical Guide",
    publishDate: "2026-10-29",
    updatedDate: "2026-10-29",
    readingTime: 15,
    featured: false,
    isPillar: false,
    heroImage: "/images/blog/spandrel-glass-hero.webp",
    heroImagePrompt:
      "Architectural photography, exterior facade of a modern 12-story commercial curtain wall building shot from street level at golden hour. Clear vision glass on floors with warm interior lighting visible; opaque dark-bronze ceramic frit spandrel panels concealing floor slabs — spandrel and vision glass visually distinct but tonally harmonized. Shallow depth of field on upper floors, crisp detail on mid-building spandrel/vision transition. No people, no logos, no text. Cinematic muted color grade, slight teal-orange split-tone. 16:9, photorealistic, shot on Phase One, f/5.6, ISO 100.",
    changelog: [
      { date: "2026-10-29", note: "Initial publication; SOP v2.3 compliant" },
    ],
  },
`;

    // Guard: skip if already there
    if (src.includes(`slug: "${SLUG}"`) || src.includes(`slug: '${SLUG}'`)) {
      console.log(`  ⏭  registry already has slug ${SLUG}`);
      return src;
    }

    // Use the specific anchor pattern, NOT lastIndexOf('];')
    const anchor = "  },\n];\n\n// ---- Utility functions";
    const idx = src.indexOf(anchor);
    if (idx === -1) {
      throw new Error(
        "Registry anchor not found. Expected '  },\\n];\\n\\n// ---- Utility functions' — do NOT fall back to lastIndexOf(']');"
      );
    }
    // Insert the new entry before the closing  },
    // The anchor is "  },\n];\n\n// ----"; we insert BEFORE the final  }, so new entry becomes
    //   },
    //   { new entry },
    // ];
    // Approach: replace the anchor with (previous closing  }, +  new entry +  ];\n\n// ----)
    const replacement = `  },\n${entry}];\n\n// ---- Utility functions`;
    return src.replace(anchor, replacement);
  },
  { skipIfIncludes: `slug: "${SLUG}"` }
);

// ---------- STEP 4: reciprocal "See also" links ----------
console.log("\n[4/5] Patching reciprocal cluster links...");

const seeAlsoBlock = `      {/* ${MARKER} */}
      <div className="my-8 rounded-xl border-l-4 border-brand-accent bg-brand-accent/10 p-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-accent">
          Related reading
        </p>
        <p className="text-sm text-brand-primary dark:text-brand-light">
          Specifying opaque facade zones?{" "}
          <Link href="/blog/${SLUG}" className="font-semibold text-brand-accent underline underline-offset-2">
            Read our Spandrel Glass Guide
          </Link>{" "}
          — covers construction methods, thermal stress, and color matching to vision glass.
        </p>
      </div>
`;

// Patch 1: curtain-wall-glass-specification
patchFile(
  path.join(SRC, "app", "blog", "curtain-wall-glass-specification", "page.tsx"),
  (src) => {
    const anchor = "<FAQ items={faqItems}";
    const idx = src.indexOf(anchor);
    if (idx === -1) return src;
    return src.slice(0, idx) + seeAlsoBlock + "\n      " + src.slice(idx);
  },
  { skipIfIncludes: MARKER }
);

// Patch 2: architectural-glass-applications-guide (pillar)
patchFile(
  path.join(SRC, "app", "blog", "architectural-glass-applications-guide", "page.tsx"),
  (src) => {
    const anchor = "<FAQ items={faqItems}";
    const idx = src.indexOf(anchor);
    if (idx === -1) return src;
    return src.slice(0, idx) + seeAlsoBlock + "\n      " + src.slice(idx);
  },
  { skipIfIncludes: MARKER }
);

// Patch 3: heat-soaked-tempered-glass-guide
patchFile(
  path.join(SRC, "app", "blog", "heat-soaked-tempered-glass-guide", "page.tsx"),
  (src) => {
    const anchor = "<FAQ items={faqItems}";
    const idx = src.indexOf(anchor);
    if (idx === -1) return src;
    return src.slice(0, idx) + seeAlsoBlock + "\n      " + src.slice(idx);
  },
  { skipIfIncludes: MARKER }
);

// ---------- STEP 5: ceramic frit product page CTA ----------
console.log("\n[5/5] Patching ceramic-frit product page...");
const ceramicFritPagePath = path.join(SRC, "app", "products", "ceramic-frit-glass", "page.tsx");
patchFile(
  ceramicFritPagePath,
  (src) => {
    const anchor = "<FAQ items={faqItems}";
    const idx = src.indexOf(anchor);
    if (idx === -1) {
      // Fallback: try just before WhySincere's closing — but safest is anchor on FAQ
      return src;
    }
    const block = `      {/* ${MARKER} */}
      <div className="my-8 rounded-xl border-l-4 border-brand-accent bg-brand-accent/10 p-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-accent">
          Specifying for facade spandrel?
        </p>
        <p className="text-sm text-brand-primary dark:text-brand-light">
          Our ceramic frit glass is used for commercial curtain-wall spandrel across the four construction methods explained in our{" "}
          <Link href="/blog/${SLUG}" className="font-semibold text-brand-accent underline underline-offset-2">
            Spandrel Glass Specification Guide
          </Link>.
        </p>
      </div>
`;
    return src.slice(0, idx) + block + "\n      " + src.slice(idx);
  },
  { skipIfIncludes: MARKER }
);

console.log("\n✅ Article #23 deploy complete.");
console.log("\nNext steps:");
console.log("  1. Run: npm run build");
console.log("  2. Verify: /blog/spandrel-glass-guide renders");
console.log("  3. Verify reciprocal links show on the 3 patched articles + ceramic-frit product page");
console.log("  4. Push to GitHub when build passes");
console.log("\nPatches are idempotent — safe to re-run. To revert, restore .bak files.");
