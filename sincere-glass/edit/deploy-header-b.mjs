// deploy-header-b.mjs
// Deploys B-option Header restructure:
//   (1) Full rewrite of src/components/Header.tsx (9 nav items -> 4 grouped
//       dropdowns: Products mega / Company dropdown / Resources dropdown /
//       Contact top-level). Adds active-page indicator + hover underline
//       animation. .bak backup first.
//   (2) Patches src/lib/dict.ts to add nav.company / nav.resources / nav.tools
//       in both EN and ES blocks (locates each key's existing occurrence pair
//       and inserts the new key once per locale).
//
// Idempotent via marker SG-HEADER-B-V1 (trailing comment on Header.tsx)
// plus per-key presence checks in dict.ts.
//
// Usage from project root (D:\桌面\sincere-glass\sincere-glass\):
//   node deploy-header-b.mjs
//
// After success: npm run build.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const MARKER = 'SG-HEADER-B-V1';

function detectEOL(raw) { return raw.includes('\r\n') ? '\r\n' : '\n'; }
function stripBOM(s) { return s.charCodeAt(0) === 0xFEFF ? s.slice(1) : s; }
function log(msg) { console.log(msg); }

function readFile(relPath) {
  const abs = join(ROOT, relPath);
  if (!existsSync(abs)) return null;
  return { abs, raw: stripBOM(readFileSync(abs, 'utf8')) };
}
function backup(abs, raw) {
  const bak = abs + '.bak';
  if (!existsSync(bak)) {
    writeFileSync(bak, raw, 'utf8');
    log(`  backup: ${bak.replace(ROOT, '')}`);
  } else {
    log(`  backup exists (keeping older): ${bak.replace(ROOT, '')}`);
  }
}

// ============================================================================
// New Header.tsx content (B-option)
// ============================================================================

const HEADER_TSX = `"use client";

import { useSearch } from "@/components/SearchModal";
import Link from "@/components/LocalizedLink";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useT } from "@/lib/useT";
import { stripLocale } from "@/lib/i18n";

// --- Nav structure (B-option: grouped dropdowns) ---
const products = [
  { key: "tempered",       href: "/products/tempered-glass",         image: "/images/products/tempered.jpg" },
  { key: "insulated",      href: "/products/insulated-glass",        image: "/images/products/insulated.jpg" },
  { key: "laminated",      href: "/products/laminated-glass",        image: "/images/products/laminated.jpg" },
  { key: "curvedTempered", href: "/products/curved-tempered-glass",  image: "/images/products/curved-tempered.jpg" },
  { key: "enameled",       href: "/products/enameled-glass",         image: "/images/products/enameled.jpg" },
  { key: "lowE",           href: "/products/low-e-glass",            image: "/images/products/low-e.jpg" },
];

const companyLinks = [
  { key: "about",          href: "/about" },
  { key: "projects",       href: "/projects" },
  { key: "equipment",      href: "/equipment" },
  { key: "certifications", href: "/certifications" },
];

const resourceLinks = [
  { key: "blog",  href: "/blog" },
  { key: "tools", href: "/tools" },
];

const CONTACT_HREF = "/contact";

type DropdownKey = "products" | "company" | "resources" | null;

export default function Header() {
  const t = useT();
  const { openSearch } = useSearch();
  const pathname = usePathname() ?? "/";
  const currentPath = stripLocale(pathname);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState<DropdownKey>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns + mobile menu on route change
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  function enter(key: Exclude<DropdownKey, null>) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  }
  function leave() {
    closeTimer.current = setTimeout(() => setOpen(null), 200);
  }

  const isActive = (href: string) => {
    if (href === "/") return currentPath === "/";
    return currentPath === href || currentPath.startsWith(href + "/");
  };
  const isGroupActive = (hrefs: string[]) => hrefs.some(isActive);

  function topLinkClass(active: boolean) {
    return [
      "relative flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-colors",
      "after:absolute after:left-1/2 after:bottom-1 after:-translate-x-1/2 after:h-[1.5px] after:bg-brand-accent",
      "after:transition-all after:duration-200",
      active
        ? "text-white after:w-[calc(100%-1.5rem)]"
        : "text-white/70 hover:text-white after:w-0 hover:after:w-[calc(100%-1.5rem)]",
    ].join(" ");
  }

  const productsActive  = isActive("/products") || products.some(p => isActive(p.href));
  const companyActive   = isGroupActive(companyLinks.map(l => l.href));
  const resourcesActive = isGroupActive(resourceLinks.map(l => l.href));

  return (
    <header
      className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
        scrolled ? "bg-brand-dark/95 backdrop-blur-md shadow-lg" : "bg-brand-dark/80 backdrop-blur-sm"
      }\`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-[68px]">
          {/* Logo (acts as Home) */}
          <Link href="/" className="flex items-center gap-2.5" aria-label="Sincere Glass home">
            <Image
              src="/images/logo.png"
              alt="Sincere Glass"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
              priority
            />
            <span className="font-display text-lg font-bold text-white tracking-tight">
              Sincere Glass
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Products mega */}
            <div className="relative" onMouseEnter={() => enter("products")} onMouseLeave={leave}>
              <Link href="/products" className={topLinkClass(productsActive)}>
                {t("nav.products")}
                <svg className={\`w-3.5 h-3.5 transition-transform duration-200 \${open === "products" ? "rotate-180" : ""}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div
                className={\`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-brand-dark/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl transition-all duration-200 origin-top \${
                  open === "products" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }\`}
                onMouseEnter={() => enter("products")}
                onMouseLeave={leave}
              >
                <div className="p-5">
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-4">{t("nav.ourGlassProducts")}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {products.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-lg bg-white/5 overflow-hidden flex-shrink-0 border border-white/5 relative">
                          <Image src={p.image} alt={t(\`product.\${p.key}.name\`)} fill sizes="56px" className="object-cover" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-white group-hover:text-brand-accent transition-colors">{t(\`product.\${p.key}.name\`)}</span>
                          <span className="block text-xs text-white/40 mt-0.5">{t(\`product.\${p.key}.desc\`)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <Link href="/products" className="text-xs text-brand-accent hover:text-brand-accent-hover transition-colors">
                      {t("nav.viewAllProducts")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Company dropdown */}
            <div className="relative" onMouseEnter={() => enter("company")} onMouseLeave={leave}>
              <button type="button" className={topLinkClass(companyActive)}>
                {t("nav.company")}
                <svg className={\`w-3.5 h-3.5 transition-transform duration-200 \${open === "company" ? "rotate-180" : ""}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={\`absolute top-full left-0 mt-2 w-60 bg-brand-dark/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl transition-all duration-200 origin-top \${
                  open === "company" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }\`}
                onMouseEnter={() => enter("company")}
                onMouseLeave={leave}
              >
                <div className="py-2">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={\`block px-4 py-2.5 text-sm transition-colors \${
                        isActive(link.href)
                          ? "text-brand-accent bg-white/5"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }\`}
                    >
                      {t(\`nav.\${link.key}\`)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Resources dropdown */}
            <div className="relative" onMouseEnter={() => enter("resources")} onMouseLeave={leave}>
              <button type="button" className={topLinkClass(resourcesActive)}>
                {t("nav.resources")}
                <svg className={\`w-3.5 h-3.5 transition-transform duration-200 \${open === "resources" ? "rotate-180" : ""}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={\`absolute top-full left-0 mt-2 w-60 bg-brand-dark/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl transition-all duration-200 origin-top \${
                  open === "resources" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }\`}
                onMouseEnter={() => enter("resources")}
                onMouseLeave={leave}
              >
                <div className="py-2">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={\`block px-4 py-2.5 text-sm transition-colors \${
                        isActive(link.href)
                          ? "text-brand-accent bg-white/5"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }\`}
                    >
                      {t(\`nav.\${link.key}\`)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact (top-level) */}
            <Link href={CONTACT_HREF} className={topLinkClass(isActive(CONTACT_HREF))}>
              {t("nav.contact")}
            </Link>

            {/* Search icon (desktop) */}
            <button
              onClick={openSearch}
              className="ml-2 p-2 text-white/60 hover:text-white rounded-md hover:bg-white/5 transition-colors"
              aria-label={t("nav.search")}
              title={\`\${t("nav.search")} (Ctrl+K)\`}
            >
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            <LanguageSwitcher className="ml-1" />

            <a
              href="#quote"
              className="ml-2 px-5 py-2 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark text-sm font-semibold rounded-md transition-colors"
            >
              {t("nav.requestQuote")}
            </a>
          </nav>

          {/* Mobile right side: search icon + hamburger */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={openSearch}
              className="p-2 text-white/70 hover:text-white rounded-md"
              aria-label={t("nav.search")}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
            </button>
            <button
              className="p-2 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={t("nav.toggleNav")}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden pb-5 border-t border-white/10 pt-3">
            {/* Products */}
            <p className="text-xs text-white/30 font-medium uppercase tracking-wider mb-2 px-2">{t("nav.products")}</p>
            <div className="grid grid-cols-2 gap-1 mb-4">
              {products.map((p) => (
                <Link key={p.href} href={p.href} className={\`block text-sm py-2 px-2 rounded hover:bg-white/5 \${isActive(p.href) ? "text-brand-accent" : "text-white/70 hover:text-white"}\`}>
                  {t(\`product.\${p.key}.name\`)}
                </Link>
              ))}
            </div>

            {/* Company */}
            <div className="border-t border-white/5 pt-3">
              <p className="text-xs text-white/30 font-medium uppercase tracking-wider mb-2 px-2">{t("nav.company")}</p>
              <div className="mb-3">
                {companyLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={\`block py-2 px-2 text-sm rounded hover:bg-white/5 \${isActive(link.href) ? "text-brand-accent" : "text-white/70 hover:text-white"}\`}>
                    {t(\`nav.\${link.key}\`)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="border-t border-white/5 pt-3">
              <p className="text-xs text-white/30 font-medium uppercase tracking-wider mb-2 px-2">{t("nav.resources")}</p>
              <div className="mb-3">
                {resourceLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={\`block py-2 px-2 text-sm rounded hover:bg-white/5 \${isActive(link.href) ? "text-brand-accent" : "text-white/70 hover:text-white"}\`}>
                    {t(\`nav.\${link.key}\`)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="border-t border-white/5 pt-3">
              <Link href={CONTACT_HREF} className={\`block py-2 px-2 text-sm rounded hover:bg-white/5 \${isActive(CONTACT_HREF) ? "text-brand-accent" : "text-white/70 hover:text-white"}\`}>
                {t("nav.contact")}
              </Link>
            </div>

            <div className="border-t border-white/5 pt-3 mt-2 flex justify-center">
              <LanguageSwitcher />
            </div>
            <a href="#quote" className="block bg-brand-accent text-brand-dark text-center py-2.5 rounded-md font-semibold text-sm mt-3">
              {t("nav.requestQuote")}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

// ${MARKER}
`;

// ============================================================================
// 1) Replace Header.tsx
// ============================================================================
function deployHeader() {
  const relPath = 'src/components/Header.tsx';
  log(`\n> ${relPath}`);
  const f = readFile(relPath);
  if (!f) { log('  ERROR: Header.tsx not found'); return; }

  if (f.raw.includes(MARKER)) {
    log(`  SKIP: ${MARKER} already present`);
    return;
  }

  const eol = detectEOL(f.raw);
  const content = eol === '\r\n' ? HEADER_TSX.replace(/\n/g, '\r\n') : HEADER_TSX;

  backup(f.abs, f.raw);
  writeFileSync(f.abs, content, 'utf8');
  log(`  OK: wrote new Header.tsx (${content.length} bytes, EOL=${eol === '\r\n' ? 'CRLF' : 'LF'})`);
}

// ============================================================================
// 2) Patch dict.ts — add nav.company / nav.resources / nav.tools (EN + ES)
// ============================================================================

// Each entry: anchor key (must occur exactly twice in dict.ts — once per locale,
// in file order EN then ES), and the per-locale insertion line to add right
// after each occurrence.
const DICT_INSERTIONS = [
  {
    newKey: "'nav.company'",
    afterKey: 'nav\\.products',
    perLocale: [
      `'nav.company': 'Company',`,
      `'nav.company': 'Compañía',`,
    ],
  },
  {
    newKey: "'nav.resources'",
    afterKey: 'nav\\.blog',
    perLocale: [
      `'nav.resources': 'Resources',`,
      `'nav.resources': 'Recursos',`,
    ],
  },
  {
    newKey: "'nav.tools'",
    // Must come after nav.resources (dict grouping); anchor on blog again then
    // insert on next line after nav.resources (we chain by order of operations).
    // Simpler: just anchor on nav.blog too, insert BEFORE nav.resources insert.
    // To keep each insertion independent, anchor on nav.resources (which we
    // just inserted earlier this run). Handle via re-scan after each insertion.
    afterKey: 'nav\\.resources',
    perLocale: [
      `'nav.tools': 'Tools',`,
      `'nav.tools': 'Herramientas',`,
    ],
  },
];

function patchDict() {
  const relPath = 'src/lib/dict.ts';
  log(`\n> ${relPath}`);
  const f = readFile(relPath);
  if (!f) { log('  ERROR: dict.ts not found'); return; }

  const eol = detectEOL(f.raw);
  let out = f.raw;
  let totalChanges = 0;

  for (const ins of DICT_INSERTIONS) {
    if (out.includes(ins.newKey)) {
      log(`  SKIP ${ins.newKey}: already present`);
      continue;
    }

    // Find all occurrences of the anchor key line (one per locale).
    const anchorRe = new RegExp(`^([ \\t]*)'${ins.afterKey}':\\s*'[^']*',\\s*$`, 'gm');
    const matches = [...out.matchAll(anchorRe)];

    if (matches.length !== 2) {
      log(`  WARN ${ins.newKey}: expected 2 occurrences of '${ins.afterKey.replace('\\\\.', '.')}', found ${matches.length} - skipping`);
      continue;
    }

    // Insert in REVERSE order so earlier match indices aren't shifted.
    for (let i = matches.length - 1; i >= 0; i--) {
      const m = matches[i];
      const indent = m[1];
      const insertAt = m.index + m[0].length;
      const insertion = `${eol}${indent}${ins.perLocale[i]}`;
      out = out.slice(0, insertAt) + insertion + out.slice(insertAt);
    }
    log(`  OK ${ins.newKey}: inserted in EN + ES blocks`);
    totalChanges += 2;
  }

  if (totalChanges === 0) {
    log('  (no changes needed)');
    return;
  }
  backup(f.abs, f.raw);
  writeFileSync(f.abs, out, 'utf8');
  log(`  wrote dict.ts (${totalChanges} new line(s))`);
}

// ---------- run ----------
log(`# deploy-header-b.mjs`);
log(`# marker: ${MARKER}`);
log(`# root:   ${ROOT}`);

deployHeader();
patchDict();

log(`\nDone.`);
log(`NEXT: npm run build`);
log(`      (if build fails, restore from Header.tsx.bak / dict.ts.bak and report error)`);
