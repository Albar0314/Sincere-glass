// purge-article-13-v1-entry.mjs
// Removes the v1.0 "how-to-import-glass-from-china" entry from blog-registry.ts
// so deploy-article-13.mjs can inject the v1.1 version.
// Usage: from project root → `node edit\purge-article-13-v1-entry.mjs`

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SLUG = "how-to-import-glass-from-china";

const registryPath = path.join(PROJECT_ROOT, "src/lib/blog-registry.ts");

if (!fs.existsSync(registryPath)) {
  console.error(`[purge] registry not found: ${registryPath}`);
  process.exit(1);
}

let registry = fs.readFileSync(registryPath, "utf8");

// Make a backup first — safe recovery if anything goes wrong
const backupPath = registryPath + ".backup-" + Date.now();
fs.writeFileSync(backupPath, registry, "utf8");
console.log(`  ✓ backup written: ${path.basename(backupPath)}`);

// Match the entry: from `  {\n    slug: "<SLUG>"` lazily to the next `  },\n`
// Also handles single-quoted slug form in case anything was hand-edited
const patterns = [
  new RegExp(`\\n  \\{\\n    slug: "${SLUG}",[\\s\\S]*?\\n  \\},\\n`, "g"),
  new RegExp(`\\n  \\{\\n    slug: '${SLUG}',[\\s\\S]*?\\n  \\},\\n`, "g"),
];

let totalRemoved = 0;
for (const pattern of patterns) {
  const matches = registry.match(pattern);
  if (matches) {
    totalRemoved += matches.length;
    registry = registry.replace(pattern, "\n");
  }
}

if (totalRemoved === 0) {
  console.log(`  → no v1.0 entry found for "${SLUG}"; nothing to purge`);
  process.exit(0);
}

if (totalRemoved > 1) {
  console.error(
    `  ✗ matched ${totalRemoved} entries — refusing to write. Restore from backup and inspect manually.`
  );
  process.exit(1);
}

fs.writeFileSync(registryPath, registry, "utf8");
console.log(`  ✓ removed 1 entry for "${SLUG}" from src/lib/blog-registry.ts`);
console.log(`\nNext: node edit\\deploy-article-13.mjs  (will inject the v1.1 entry)`);
console.log(`If anything looks wrong: copy ${path.basename(backupPath)} back over blog-registry.ts`);
