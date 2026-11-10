// edit/deploy-tools-phase2.mjs
// Phase 2: integrate /tools into sitemap, Header nav, and Cmd+K search.
// Pure patches to 3 existing files. No new files written.
// Idempotent via unique markers. Backups written as *.bak. CRLF-tolerant.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const MARK_SITEMAP = "TOOLS-PHASE2-V1:sitemap.tools";
const MARK_HEADER  = "TOOLS-PHASE2-V1:header.tools";
const MARK_SEARCH  = "TOOLS-PHASE2-V1:search.tools";

function readFile(p) { return fs.readFileSync(p, "utf8"); }
function writeFile(p, c) { fs.writeFileSync(p, c, "utf8"); }
function backup(p) {
  const bak = p + ".bak";
  fs.copyFileSync(p, bak);
  console.log("  backup -> " + path.relative(ROOT, bak));
}
function detectEOL(s) { return s.includes("\r\n") ? "\r\n" : "\n"; }

// -- sitemap.ts ---------------------------------------------------------------

function patchSitemap() {
  const p = path.join(ROOT, "src", "app", "sitemap.ts");
  if (!fs.existsSync(p)) throw new Error("Missing: src/app/sitemap.ts");
  let src = readFile(p);
  if (src.includes(MARK_SITEMAP)) {
    console.log("  sitemap.ts already patched - skipping");
    return;
  }
  const EOL = detectEOL(src);

  // 1) Import tools registry (after blog-registry import)
  const importAnchor = /import \{ blogArticles \} from "@\/lib\/blog-registry";/;
  if (!importAnchor.test(src)) {
    throw new Error("sitemap.ts: blog-registry import anchor not found.");
  }
  src = src.replace(
    importAnchor,
    [
      "// " + MARK_SITEMAP,
      "import { blogArticles } from \"@/lib/blog-registry\";",
      "import { tools } from \"@/lib/tools-registry\";",
    ].join(EOL)
  );

  // 2) Add /tools entry to staticPaths (after /blog)
  const blogStaticAnchor = /\{ path: "\/blog",\s+freq: "daily",\s+priority: 0\.8 \},/;
  if (!blogStaticAnchor.test(src)) {
    throw new Error("sitemap.ts: /blog staticPaths entry anchor not found.");
  }
  src = src.replace(
    blogStaticAnchor,
    [
      "{ path: \"/blog\",      freq: \"daily\",   priority: 0.8 },",
      "    { path: \"/tools\",     freq: \"weekly\",  priority: 0.8 },",
    ].join(EOL)
  );

  // 3) Add tools loop before return entries;
  const returnAnchor = /(\r?\n)(\s+)return entries;/;
  if (!returnAnchor.test(src)) {
    throw new Error("sitemap.ts: return entries anchor not found.");
  }
  src = src.replace(
    returnAnchor,
    "$1$2for (const tool of tools) {$1$2  const lastMod = tool.updatedDate || tool.publishDate;$1$2  for (const locale of LOCALES) {$1$2    entries.push(makeEntry(`/tools/${tool.slug}`, locale, lastMod, \"monthly\", 0.7));$1$2  }$1$2}$1$1$2return entries;"
  );

  backup(p);
  writeFile(p, src);
  console.log("  patched src/app/sitemap.ts");
}

// -- Header.tsx ---------------------------------------------------------------

function patchHeader() {
  const candidates = [
    "src/components/Header.tsx",
    "src/components/ui/Header.tsx",
  ];
  const p = candidates.map((c) => path.join(ROOT, c)).find(fs.existsSync);
  if (!p) throw new Error("Header.tsx not found at any known path.");
  let src = readFile(p);
  if (src.includes(MARK_HEADER)) {
    console.log("  Header.tsx already patched - skipping");
    return;
  }
  const EOL = detectEOL(src);

  // 1) Insert Tools entry into navLinks array (after blog)
  const navAnchor = /\{ key: "blog",\s+href: "\/blog" \},/;
  if (!navAnchor.test(src)) {
    throw new Error("Header.tsx: navLinks blog entry anchor not found.");
  }
  src = src.replace(
    navAnchor,
    [
      "{ key: \"blog\",      href: \"/blog\" },",
      "  // " + MARK_HEADER,
      "  { key: \"tools\",     href: \"/tools\" },",
    ].join(EOL)
  );

  // 2) Desktop render: wrap t() with inline fallback for tools key
  //    Pattern appears in both desktop map() and mobile map().
  //    We replace globally: {t(`nav.${link.key}`)} -> {link.key === "tools" ? "Tools" : t(`nav.${link.key}`)}
  const renderAnchor = /\{t\(`nav\.\$\{link\.key\}`\)\}/g;
  const matches = src.match(renderAnchor);
  if (!matches || matches.length < 2) {
    throw new Error("Header.tsx: nav label render anchor not found in both desktop and mobile (expected 2+ occurrences).");
  }
  src = src.replace(
    renderAnchor,
    "{link.key === \"tools\" ? \"Tools\" : t(`nav.${link.key}`)}"
  );

  backup(p);
  writeFile(p, src);
  console.log("  patched " + path.relative(ROOT, p));
}

// -- SearchModal.tsx ----------------------------------------------------------

function patchSearchModal() {
  const candidates = [
    "src/components/SearchModal.tsx",
    "src/components/ui/SearchModal.tsx",
    "src/components/search/SearchModal.tsx",
  ];
  const p = candidates.map((c) => path.join(ROOT, c)).find(fs.existsSync);
  if (!p) throw new Error("SearchModal.tsx not found at any known path.");
  let src = readFile(p);
  if (src.includes(MARK_SEARCH)) {
    console.log("  SearchModal.tsx already patched - skipping");
    return;
  }
  const EOL = detectEOL(src);

  // 1) Import getAllTools
  const importAnchor = /import \{ getAllArticles, CLUSTER_LABELS \} from '@\/lib\/blog-registry';/;
  if (!importAnchor.test(src)) {
    throw new Error("SearchModal.tsx: blog-registry import anchor not found.");
  }
  src = src.replace(
    importAnchor,
    [
      "// " + MARK_SEARCH,
      "import { getAllArticles, CLUSTER_LABELS } from '@/lib/blog-registry';",
      "import { getAllTools, CATEGORY_LABELS as TOOL_CATEGORY_LABELS } from '@/lib/tools-registry';",
    ].join(EOL)
  );

  // 2) Expand SearchItem type union
  const typeAnchor = /type: 'product' \| 'article';/;
  if (!typeAnchor.test(src)) {
    throw new Error("SearchModal.tsx: SearchItem type anchor not found.");
  }
  src = src.replace(typeAnchor, "type: 'product' | 'article' | 'tool';");

  // 3) Append tools to buildIndex before `return items;`
  const buildAnchor = /(\r?\n)(\s+)return items;/;
  if (!buildAnchor.test(src)) {
    throw new Error("SearchModal.tsx: buildIndex return anchor not found.");
  }
  const toolsIndexBlock = [
    "",
    "  const allTools = getAllTools();",
    "  allTools.forEach((t) => {",
    "    items.push({",
    "      type: 'tool',",
    "      title: t.shortTitle,",
    "      description: t.description,",
    "      href: `/tools/${t.slug}`,",
    "      tag: TOOL_CATEGORY_LABELS[t.category],",
    "      searchKeywords: [",
    "        t.targetKeyword,",
    "        ...(t.secondaryKeywords || []),",
    "        ...(t.searchKeywords || []),",
    "      ],",
    "    });",
    "  });",
    "",
  ].join(EOL);
  src = src.replace(buildAnchor, EOL + toolsIndexBlock + "$2return items;");

  // 4) Add toolResults filter after articleResults
  const filterAnchor = /const articleResults = results\.filter\(\(r\) => r\.type === 'article'\);/;
  if (!filterAnchor.test(src)) {
    throw new Error("SearchModal.tsx: articleResults filter anchor not found.");
  }
  src = src.replace(
    filterAnchor,
    [
      "const articleResults = results.filter((r) => r.type === 'article');",
      "  const toolResults = results.filter((r) => r.type === 'tool');",
    ].join(EOL)
  );

  // 5) Insert Tools section render block before the footer "results.length > 0" block
  //    Anchor: the closing of articleResults block followed by the footer block.
  //    We anchor on the line `        {results.length > 0 && (` after the articles closing.
  const sectionAnchor = /(\r?\n\s+\{results\.length > 0 && \(\r?\n\s+<div className="px-5 py-2\.5 border-t border-\[#3A4250\]\/30 flex items-center justify-between text-\[10px\] text-\[#8B95A5\]\/40">)/;
  if (!sectionAnchor.test(src)) {
    throw new Error("SearchModal.tsx: footer block anchor not found. Section render insert failed.");
  }
  const toolsSection = [
    "",
    "          {toolResults.length > 0 && (",
    "            <div className=\"px-3 pt-3 pb-3\">",
    "              <p className=\"px-2 text-[10px] font-medium text-[#8B95A5]/50 uppercase tracking-wider mb-1\">Tools</p>",
    "              {toolResults.map((r) => {",
    "                flatIndex++;",
    "                const idx = flatIndex;",
    "                return (",
    "                  <a",
    "                    key={r.href}",
    "                    href={r.href}",
    "                    onClick={(e) => { e.preventDefault(); router.push(r.href); onClose(); }}",
    "                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${",
    "                      activeIndex === idx ? 'bg-[#DAA745]/10 text-[#DAA745]' : 'text-[#F2F0ED] hover:bg-[#3A4250]/20'",
    "                    }`}",
    "                    onMouseEnter={() => setActiveIndex(idx)}",
    "                  >",
    "                    <div className=\"w-8 h-8 rounded bg-[#3A4250]/30 flex items-center justify-center shrink-0\">",
    "                      <svg className=\"w-4 h-4 text-[#8B95A5]\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" strokeWidth={1.5} aria-hidden=\"true\">",
    "                        <rect x=\"5\" y=\"3\" width=\"14\" height=\"18\" rx=\"2\" />",
    "                        <path strokeLinecap=\"round\" d=\"M8 7h8M8 11h2M12 11h4M8 15h2M12 15h4M8 19h2M12 19h4\" />",
    "                      </svg>",
    "                    </div>",
    "                    <div className=\"min-w-0 flex-1\">",
    "                      <p className=\"text-sm font-medium truncate\">{r.title}</p>",
    "                      <p className=\"text-xs text-[#8B95A5] truncate\">{r.description}</p>",
    "                    </div>",
    "                    {r.tag && (",
    "                      <span className=\"text-[10px] px-2 py-0.5 rounded-full bg-[#DAA745]/15 text-[#DAA745] shrink-0 hidden sm:inline\">",
    "                        {r.tag}",
    "                      </span>",
    "                    )}",
    "                  </a>",
    "                );",
    "              })}",
    "            </div>",
    "          )}",
    "",
  ].join(EOL);
  src = src.replace(sectionAnchor, EOL + toolsSection + "$1");

  // 6) Update placeholder hint chips to include a tool example
  const chipsAnchor = /\{\['tempered', 'IGU', 'soundproof', 'Low-E', '夹胶玻璃', 'curtain wall'\]/;
  if (chipsAnchor.test(src)) {
    src = src.replace(
      chipsAnchor,
      "{['tempered', 'IGU', 'ROI calculator', 'max panel size', 'Low-E', '夹胶玻璃']"
    );
  }

  // 7) Update search input placeholder text
  const placeholderAnchor = /placeholder="Search products, articles\.\.\. \(try 'soundproof', 'IGU', '隔音玻璃'\)"/;
  if (placeholderAnchor.test(src)) {
    src = src.replace(
      placeholderAnchor,
      "placeholder=\"Search products, articles, tools... (try 'ROI calculator', 'IGU', '隔音玻璃')\""
    );
  }

  backup(p);
  writeFile(p, src);
  console.log("  patched " + path.relative(ROOT, p));
}

// -- Main ---------------------------------------------------------------------

function main() {
  console.log("Tools Hub Phase 2 deploy");
  console.log("Root: " + ROOT);
  console.log("");

  console.log("[1/3] Patching sitemap.ts...");
  patchSitemap();

  console.log("[2/3] Patching Header.tsx...");
  patchHeader();

  console.log("[3/3] Patching SearchModal.tsx...");
  patchSearchModal();

  console.log("");
  console.log("Deploy complete. Next steps:");
  console.log("  1. npm run build");
  console.log("  2. Visit /sitemap.xml and verify /tools/* appear with hreflang");
  console.log("  3. Open any page, Ctrl+K, type 'calculator' -> tools appear under 'Tools' section");
  console.log("  4. Verify Tools link appears in Header nav (desktop + mobile) between Blog and Contact");
  console.log("");
  console.log("Known deferred items:");
  console.log("  - Header nav label 'Tools' is hard-coded (not in i18n dict yet).");
  console.log("    Add 'nav.tools' key to your i18n dict file so translate-all.mjs can localize it.");
  console.log("    Until then, the ES mirror will also show 'Tools' literally.");
  console.log("");
  console.log("Phase 2 follow-ups (manual):");
  console.log("  - scripts/translate-all.mjs: regenerate ES mirror to cover new /tools/* pages");
}

try {
  main();
} catch (e) {
  console.error("");
  console.error("Patch failed: " + e.message);
  console.error("Any files already patched this run were backed up to *.bak.");
  console.error("Fix the anchor or paste the current file content and rerun.");
  process.exit(1);
}
