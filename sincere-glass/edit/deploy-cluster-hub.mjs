// edit/deploy-cluster-hub.mjs
// Run from project root:  node edit\deploy-cluster-hub.mjs
//
// Ships the topic-cluster hub + @graph schema upgrade:
//   1. src/lib/blog-clusters.ts            (new)
//   2. src/components/blog/ClusterHub.tsx  (new)
//   3. src/components/blog/BlogArticleLayout.tsx  (overwrite — @graph articleJsonLd)
//   4. injects <ClusterHub/> into the two Nov-cycle pillar pages (#24, #26)
//
// Marker: SG-CLUSTER-HUB-V1. Idempotent — re-running is safe.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "src");

function copyTemplate(txtName, destRel) {
  const src = join(__dirname, txtName);
  const dest = join(SRC, destRel);
  if (!existsSync(src)) {
    console.error(`  ✗ template missing in edit/: ${txtName}`);
    return false;
  }
  writeFileSync(dest, readFileSync(src, "utf8"));
  console.log(`  ✓ wrote src/${destRel}`);
  return true;
}

console.log("\n[1/2] Writing new + updated files…");
let ok = true;
ok = copyTemplate("blog-clusters.ts.txt", "lib/blog-clusters.ts") && ok;
ok = copyTemplate("ClusterHub.tsx.txt", "components/blog/ClusterHub.tsx") && ok;
ok = copyTemplate("BlogArticleLayout.tsx.txt", "components/blog/BlogArticleLayout.tsx") && ok;

if (!ok) {
  console.error("\nAborted: one or more templates were missing. Drop all *.txt into edit/ and retry.\n");
  process.exit(1);
}

console.log("\n[2/2] Injecting <ClusterHub/> into pillar pages…");

const PILLARS = [
  { slug: "low-iron-glass-complete-guide" },
  { slug: "insulated-glass-complete-guide" },
];

const IMPORT_LINE = `import ClusterHub from "@/components/blog/ClusterHub";`;
const CLOSE_TAG = "</BlogArticleLayout>";

for (const { slug } of PILLARS) {
  const pagePath = join(SRC, "app", "blog", slug, "page.tsx");
  if (!existsSync(pagePath)) {
    console.error(`  ✗ page not found: src/app/blog/${slug}/page.tsx — skipped`);
    continue;
  }
  let code = readFileSync(pagePath, "utf8");

  if (code.includes("ClusterHub")) {
    console.log(`  = ${slug}: already has ClusterHub — skipped (idempotent)`);
    continue;
  }

  const closeIdx = code.lastIndexOf(CLOSE_TAG);
  if (closeIdx === -1) {
    console.error(
      `  ✗ ${slug}: no </BlogArticleLayout> found — NOT modified. ` +
        `Paste this page to Claude so the injection point can be confirmed.`
    );
    continue;
  }

  // 1) import at top of file (always valid)
  code = IMPORT_LINE + "\n" + code;

  // 2) render just before the closing layout tag (end of article body,
  //    after FAQ, before author bio which the layout renders itself)
  const injectAt = code.lastIndexOf(CLOSE_TAG);
  const render = `      {/* SG-CLUSTER-HUB-V1 */}\n      <ClusterHub pillarSlug="${slug}" />\n    `;
  code = code.slice(0, injectAt) + render + code.slice(injectAt);

  writeFileSync(pagePath, code);
  console.log(`  ✓ ${slug}: import + <ClusterHub/> injected`);
}

console.log(
  "\nDone. Next: `npm run build` locally to verify, then commit/push.\n" +
    "Validate schema at https://validator.schema.org/ on the two pillar URLs once live.\n"
);
