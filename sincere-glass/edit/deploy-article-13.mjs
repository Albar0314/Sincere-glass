// deploy-article-13.mjs (v1.1)
// Deploys Buyer-Guide cluster first article: "How to Import Glass from China"
// Usage: from project root → `node edit\deploy-article-13.mjs`
//
// v1.1 (2026-10-13):
//   - Added US destination-pair buyerFaq entry (long-tail capture + Featured Snippet candidate)
//   - Page template rewritten with SSR methodology shadows (C21), table caption/aria + source links (C22), "How we calculated" paragraph (C22)
//   - Script injects C21/C22-shipped marker into changelog

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

const SLUG = "how-to-import-glass-from-china";

function abs(p) {
  return path.join(PROJECT_ROOT, p);
}
function readTpl(name) {
  const p = path.join(__dirname, name);
  if (!fs.existsSync(p)) {
    throw new Error(`[deploy] missing template: ${p}`);
  }
  return fs.readFileSync(p, "utf8");
}
function writeFile(target, content) {
  const dir = path.dirname(target);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(target, content, "utf8");
  console.log(`  ✓ ${path.relative(PROJECT_ROOT, target)}`);
}

console.log("\n==== Deploying Article #13 v1.1: How to Import Glass from China ====\n");

// ─── 1. Interactive components ──────────────────────────────────────
console.log("1/4 Writing interactive components...");
const componentsDir = abs("src/components/blog/article-13");

writeFile(
  path.join(componentsDir, "SupplierVerificationScorecard.tsx"),
  readTpl("SupplierVerificationScorecard.tsx.txt")
);
writeFile(
  path.join(componentsDir, "IncotermsExplorer.tsx"),
  readTpl("IncotermsExplorer.tsx.txt")
);
writeFile(
  path.join(componentsDir, "ContainerLoadCalculator.tsx"),
  readTpl("ContainerLoadCalculator.tsx.txt")
);

// ─── 2. Article page ────────────────────────────────────────────────
console.log("\n2/4 Writing article page (v1.1)...");
writeFile(
  abs(`src/app/blog/${SLUG}/page.tsx`),
  readTpl("page-article-13-how-to-import-glass-from-china.tsx.txt")
);

// ─── 3. Append registry entry ───────────────────────────────────────
console.log("\n3/4 Appending registry entry (with v1.1 FAQ)...");

const registryPath = abs("src/lib/blog-registry.ts");
if (!fs.existsSync(registryPath)) {
  throw new Error(`[deploy] registry not found: ${registryPath}`);
}
let registry = fs.readFileSync(registryPath, "utf8");

if (registry.includes(`slug: "${SLUG}"`) || registry.includes(`slug: '${SLUG}'`)) {
  console.log("  → entry already present; checking whether to upgrade in place");
  // v1.1 marker — if changelog already has it, don't touch
  if (registry.includes("v1.1: SSR methodology shadow + table caption + US FAQ")) {
    console.log("  → v1.1 already applied; skipping registry injection");
  } else {
    console.log("  ⚠ v1.0 entry present. To upgrade: manually delete the v1.0 entry");
    console.log("    for how-to-import-glass-from-china from src/lib/blog-registry.ts,");
    console.log("    then re-run this script.");
  }
} else {
  const REGISTRY_ENTRY = `
  {
    slug: "how-to-import-glass-from-china",
    title: "How to Import Architectural Glass from China: A Buyer's 5-Stage Playbook",
    excerpt: "The 5-stage import journey architects and glazing contractors actually run — supplier scorecard, Incoterms explorer, container load calculator, and a worked landed-cost build-up from an operating Wuhan factory.",
    targetKeyword: "how to import glass from China",
    secondaryKeywords: [
      "import glass from China",
      "China glass supplier verification",
      "architectural glass sourcing China",
      "China glass FOB CIF",
      "import tempered glass from China",
      "import laminated glass from China to US",
    ],
    searchKeywords: [
      "import glass from China", "how to import glass", "China glass supplier",
      "sourcing glass from China", "China glass factory", "glass procurement China",
      "import laminated glass from China to US", "import tempered glass from China",
      "FOB glass China", "CIF glass China", "DDP glass",
      "Incoterms 2020 glass", "VGM SOLAS glass", "glass container loading",
      "architectural glass import", "China glass MOQ", "China glass CCC verification",
      "进口中国玻璃", "中国玻璃供应商", "玻璃出口", "玻璃外贸", "幕墙玻璃采购",
    ],
    publishDate: "2026-10-13",
    updatedDate: "2026-10-13",
    category: "Buyer Guide" as const,
    tags: ["buyer guide", "sourcing", "import", "Incoterms", "freight", "supplier verification", "China manufacturing"],
    heroImage: "/images/blog/how-to-import-glass-from-china-hero.webp",
    heroImageAlt: "A Chinese glass factory loading dock with a 20-foot shipping container being loaded with crated architectural glass panels destined for export",
    heroImagePrompt: "Industrial documentary photography of a modern Chinese architectural glass factory loading dock. Foreground: a 20-foot steel shipping container with its doors open, revealing standing A-frame crates holding large laminated and tempered glass panels (approximately 1.5m x 2.5m) carefully loaded with wooden dunnage and corner protectors visible, the glass showing subtle blue-green Low-E tint. A forklift with soft forks is positioned mid-loading, lifting an A-frame crate toward the container. Background: clean modern factory loading bay, polished concrete floor, 'EXPORT' zone markings, overhead gantry crane rails, late-afternoon warm amber sunlight pouring in from an open bay door creating long shadows. Visible shipping documents on a clipboard on a nearby pallet. 25-degree camera angle from behind the loading forklift. Shallow depth of field focused on the container doorway and crated glass inside. No humans in frame, no visible brand logos, no text or watermarks. 4K photorealistic, documentary industrial photography style, warm late-afternoon lighting with warm amber accents on the dark steel container.",
    author: DEFAULT_AUTHOR,
    readingTime: 18,
    featured: false,
    reviewedBy: { name: "Albar", title: "Technical Lead" },
    articleType: "buyer-guide" as const,
    cluster: "buyer-guide",
    relatedProductSlugs: ["tempered-glass", "laminated-glass", "insulated-glass", "low-e-glass"],
    translations: {},
    tldr: [
      "A direct China buy saves 30–50% vs local supply on orders above roughly 200 m² — below that threshold freight and clearance fixed costs eat the margin.",
      "The 5-stage journey: shortlist (3–5 vetted factories) → verify (credentials + sample + audit) → specify (unambiguous RFQ) → logistics (Incoterms + VGM) → QC (pre-shipment inspection + container loading).",
      "FOB is the right default Incoterm for most glass buyers; CIF buries freight you can't verify; DDP sounds attractive but is rarely well executed.",
      "A 20-foot container is the right choice for architectural glass: the limit is weight (~24 tonnes), not cube (33 m³) — a 40' HQ earns its place only when panels exceed ~2.6 m height.",
      "Worked example: 100 panels of 6-1.52-6 laminate (375 m²) land in Los Angeles at ~USD 34/m² all-in, versus ~USD 55–80/m² from a local distributor.",
    ],
    buyerFaq: [
      {
        q: "What does it typically cost to import laminated glass from China to the United States?",
        a: "A worked example: one 20-foot container of 6-1.52-6 clear laminated glass from Shanghai (approximately 375 m², or 100 panels of 1500×2500 mm) lands in Los Angeles at roughly USD 12,500–13,500 total — about USD 33–36 per m² delivered. The build-up: glass FOB (~USD 22/m²), ocean freight (~USD 2,400 per 20'), 4.9% MFN duty under HTSUS 7007, 0.3% marine insurance, customs broker and port fees, plus ~50-mile inland drayage. The same specification sourced from a US distributor typically runs USD 55–80 per m² delivered — a 40–55% delta that only scales above roughly 200 m² where freight and clearance fixed costs are absorbed. Verify current duty rates at hts.usitc.gov and get a live ocean freight quote before committing to a budget.",
      },
      {
        q: "What is the MOQ for architectural glass export orders from China?",
        a: "Most Chinese glass factories, Sincere Glass included, accept orders starting at one 20-foot container (approximately 200–400 m² depending on glass thickness and panel size). Below that volume, per-m² freight and clearance costs climb sharply and local supply usually wins. For specialty or small-batch orders, a trading company can consolidate but at a markup.",
      },
      {
        q: "What certifications do I need from a Chinese glass supplier for export shipments?",
        a: "The baseline is ISO 9001:2015 and the China 3C (CCC) certificate under GB 15763.2-2005 (tempered) or GB 15763.3-2009 (laminated). For Europe, you additionally need EN 12150-1:2015 and EN 14449:2005 test reports to support CE marking. For North America, ANSI Z97.1-2015 or CPSC 16 CFR 1201 test reports where safety-glazing categories apply. Always verify the certificate number on the issuing body's website rather than trusting a PDF.",
      },
      {
        q: "What is the typical lead time for a custom glass order from China?",
        a: "From our Wuhan plant, standard tempered glass runs 25–35 days from PO to ex-works ready. Laminated and Low-E coated glass runs 30–45 days because the coating lead time and interlayer cure window stack sequentially. Insulated glass units with Low-E are similar. Add 1–2 weeks for pre-shipment inspection and container loading, then transit time (18–35 days by sea depending on destination).",
      },
      {
        q: "What's the difference between FOB and CIF when quoting glass from China?",
        a: "FOB (Free On Board) means the seller gets the goods onto the vessel at a Chinese port; the buyer handles ocean freight, insurance, destination clearance and delivery. CIF (Cost, Insurance, Freight) adds ocean freight and minimum marine insurance to the seller's scope, through arrival at the destination port. Risk still transfers to the buyer at the Chinese port of loading under both — a common misunderstanding. FOB is the default for buyers with their own forwarder; CIF simplifies budgeting but can be more expensive than FOB plus independent freight.",
      },
      {
        q: "Can Sincere Glass ship DDP (duty paid) to my country?",
        a: "DDP service for architectural glass is possible for specific destinations but introduces significant risk the seller cannot always manage well — local permits, customs classification disputes, destination trucking variability. For most buyers we recommend FOB Shanghai or Ningbo with your preferred forwarder, or CIF to a named port if you want a landed-at-port number. We're happy to quote DDP for established destinations; email the contact page to request a specific lane.",
      },
      {
        q: "What payment terms should I expect from a Chinese glass factory?",
        a: "Industry norm for first orders is 30% T/T deposit on PO confirmation, 70% T/T balance against a copy of the bill of lading (or against pre-shipment inspection report, if third-party inspection is used). L/C at sight is accepted for larger orders. 100% advance payment is a red flag — a serious factory should not need it. For repeat business some suppliers extend to 20/80 or offer OA (open account) terms after 2–3 successful shipments.",
      },
    ],
    changelog: [
      { date: "2026-10-13", note: "Initial publish — first article in Buyer's Guide cluster. v1.1: SSR methodology shadow + table caption + US FAQ" },
    ],
  },
`;

  const marker = /\n\];\s*\n\n\/\/ ---- Utility functions ----/;
  if (!marker.test(registry)) {
    throw new Error(
      "[deploy] couldn't locate end of blogArticles[] in registry; check regex"
    );
  }
  registry = registry.replace(marker, `${REGISTRY_ENTRY}];\n\n// ---- Utility functions ----`);
  fs.writeFileSync(registryPath, registry, "utf8");
  console.log("  ✓ src/lib/blog-registry.ts (entry appended)");
}

// ─── 4. Update SOP §6 cluster-count table ───────────────────────────
console.log("\n4/4 Updating SOP cluster-count table...");

const sopPath = abs("claude/blog-sop-v2.md");
if (fs.existsSync(sopPath)) {
  let sop = fs.readFileSync(sopPath, "utf8");
  const bgRow = /\| buyer-guide \| 0 \| ❌ Need 3 \|/;
  if (bgRow.test(sop)) {
    sop = sop.replace(bgRow, "| buyer-guide | 1 | ❌ Need 2 more |");
    fs.writeFileSync(sopPath, sop, "utf8");
    console.log("  ✓ claude/blog-sop-v2.md (buyer-guide: 1/3)");
  } else {
    console.log("  → SOP buyer-guide row not matched (may already be updated); skipping");
  }
} else {
  console.log("  → SOP file not found; skipping");
}

console.log("\n==== Deployed v1.1 ====");
console.log(`\nNext steps:
  1. If upgrading from a v1.0 deploy already pushed:
       Delete the "how-to-import-glass-from-china" entry from src/lib/blog-registry.ts
       and re-run this script to insert the v1.1 entry with the US FAQ.
  2. git status  → verify changes
  3. npm run build  → smoke-test TypeScript compilation
  4. git add . && git commit -m "feat(blog): article #13 v1.1 — SSR methodology + traceable costs + US FAQ"
  5. git push  → Vercel auto-deploys
  6. GSC request-indexing: https://sincereglass.com/blog/${SLUG}
  7. Generate hero image per prompt in registry → save to public/images/blog/${SLUG}-hero.webp
`);
