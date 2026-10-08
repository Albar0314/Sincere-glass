// edit/scaffold-i18n.mjs
// 阶段 1：多语言基础设施脚手架
// 只新建文件，不修改任何现有文件
// 使用：node edit\scaffold-i18n.mjs

import fs from 'fs';
import path from 'path';

const root = process.cwd();
let created = 0;
let skipped = 0;

function writeFile(relPath, content) {
  const fullPath = path.resolve(root, relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (fs.existsSync(fullPath)) {
    console.log(`⚠️  已存在，跳过: ${relPath}`);
    skipped++;
    return;
  }
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`✅ 新建: ${relPath}`);
  created++;
}

// ============================================================
// 1. src/lib/i18n.ts
// ============================================================
writeFile('src/lib/i18n.ts', `// Locale configuration and URL helpers

export const LOCALES = ['en', 'es'] as const;
export const DEFAULT_LOCALE = 'en';

export type Locale = typeof LOCALES[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: '\\ud83c\\uddfa\\ud83c\\uddf8',
  es: '\\ud83c\\uddea\\ud83c\\uddf8',
};

/**
 * EN URLs stay at the root ('/products'), ES gets '/es/' prefix ('/es/products').
 * This function returns the correct path for a given locale.
 */
export function localizedPath(path: string, locale: Locale): string {
  // Normalize: ensure leading slash, strip any existing locale prefix
  let p = path.startsWith('/') ? path : '/' + path;
  for (const loc of LOCALES) {
    if (loc === DEFAULT_LOCALE) continue;
    const prefix = '/' + loc;
    if (p === prefix || p.startsWith(prefix + '/')) {
      p = p.slice(prefix.length) || '/';
      break;
    }
  }
  if (locale === DEFAULT_LOCALE) return p;
  return p === '/' ? '/' + locale : '/' + locale + p;
}

/**
 * Extract the locale from a URL pathname.
 * '/es/products/tempered-glass' -> 'es'
 * '/products/tempered-glass'    -> 'en' (default)
 */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg && (LOCALES as readonly string[]).includes(seg)) {
    return seg as Locale;
  }
  return DEFAULT_LOCALE;
}

/**
 * Strip locale prefix from a path.
 * '/es/products' -> '/products'
 * '/products'    -> '/products'
 */
export function stripLocale(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  if (locale === DEFAULT_LOCALE) return pathname;
  return pathname.replace('/' + locale, '') || '/';
}

export const SITE_URL = 'https://sincereglass.com';
`);

// ============================================================
// 2. src/middleware.ts
// ============================================================
writeFile('src/middleware.ts', `// Middleware: detects the current locale from URL and attaches it as a header.
// For now it's observational only — no redirects, no automatic language detection
// based on Accept-Language. This keeps behavior predictable while we validate the
// multilingual setup. Automatic language negotiation can be added later.

import { NextRequest, NextResponse } from 'next/server';
import { getLocaleFromPath } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = getLocaleFromPath(pathname);

  const response = NextResponse.next();
  response.headers.set('x-locale', locale);
  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals, API routes, and static assets
    '/((?!api|_next/static|_next/image|favicon.ico|images|videos|downloads|sitemap.xml|robots.txt).*)',
  ],
};
`);

// ============================================================
// 3. src/components/LanguageSwitcher.tsx
// ============================================================
writeFile('src/components/LanguageSwitcher.tsx', `"use client";

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  LOCALES,
  LOCALE_LABELS,
  LOCALE_FLAGS,
  getLocaleFromPath,
  localizedPath,
  stripLocale,
  type Locale,
} from '@/lib/i18n';

/**
 * Dropdown language switcher. Preserves the current page path when switching.
 * Drop it into the Header (desktop + mobile menu) when ready to activate.
 */
export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = getLocaleFromPath(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const switchTo = (loc: Locale) => {
    const basePath = stripLocale(pathname);
    const newPath = localizedPath(basePath, loc);
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div ref={ref} className={\`relative \${className}\`}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand-dark hover:text-brand-accent transition-colors"
      >
        <span>{LOCALE_FLAGS[currentLocale]}</span>
        <span>{LOCALE_LABELS[currentLocale]}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg min-w-[150px] z-50">
          {LOCALES.map((loc) => (
            <button
              key={loc}
              onClick={() => switchTo(loc)}
              className={\`w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-gray-50 \${
                loc === currentLocale ? 'text-brand-accent font-semibold' : 'text-brand-dark'
              }\`}
            >
              <span>{LOCALE_FLAGS[loc]}</span>
              <span>{LOCALE_LABELS[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
`);

// ============================================================
// 4. src/components/Hreflang.tsx
// ============================================================
writeFile('src/components/Hreflang.tsx', `import { LOCALES, DEFAULT_LOCALE, localizedPath, SITE_URL, type Locale } from '@/lib/i18n';

/**
 * Renders hreflang alternate links for SEO.
 * Place in each page's <head> (via metadata.alternates.languages) or as a
 * component in the root layout.
 *
 * Usage in page.tsx metadata:
 *   alternates: {
 *     canonical: 'https://sincereglass.com/products',
 *     languages: buildAlternates('/products'),
 *   }
 */
export function buildAlternates(canonicalPath: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    const hreflang = locale === DEFAULT_LOCALE ? 'en' : locale;
    alternates[hreflang] = SITE_URL + localizedPath(canonicalPath, locale as Locale);
  }
  // x-default points at the EN version
  alternates['x-default'] = SITE_URL + localizedPath(canonicalPath, DEFAULT_LOCALE);
  return alternates;
}

/**
 * Server Component that renders hreflang <link> tags directly (alternative to
 * putting them in metadata.alternates). Use this when metadata.alternates isn't
 * flexible enough.
 */
export default function Hreflang({ path }: { path: string }) {
  const alternates = buildAlternates(path);
  return (
    <>
      {Object.entries(alternates).map(([hreflang, url]) => (
        <link key={hreflang} rel="alternate" hrefLang={hreflang} href={url} />
      ))}
    </>
  );
}
`);

// ============================================================
// 5. translation/glossary/es.json
// ============================================================
writeFile('translation/glossary/es.json', JSON.stringify({
  "_meta": {
    "locale": "es",
    "note": "Glass industry EN->ES glossary. These terms MUST be used in translations and will be enforced via system prompt. Add/edit as the client/reviewer flags issues.",
    "lastUpdated": "2026-10-07"
  },
  "productTypes": {
    "tempered glass": "vidrio templado",
    "toughened glass": "vidrio templado",
    "laminated glass": "vidrio laminado",
    "insulated glass": "vidrio aislante",
    "insulated glass unit": "unidad de vidrio aislante",
    "IGU": "UVA (Unidad de Vidrio Aislante)",
    "double-glazed": "doble acristalamiento",
    "triple-glazed": "triple acristalamiento",
    "Low-E glass": "vidrio de baja emisividad (Low-E)",
    "low-emissivity glass": "vidrio de baja emisividad",
    "annealed glass": "vidrio recocido",
    "float glass": "vidrio flotado",
    "ceramic frit glass": "vidrio con frita cerámica",
    "enameled glass": "vidrio esmaltado",
    "curved tempered glass": "vidrio templado curvado",
    "bent glass": "vidrio curvado",
    "spandrel glass": "vidrio spandrel",
    "fire-resistant glass": "vidrio resistente al fuego",
    "safety glass": "vidrio de seguridad",
    "architectural glass": "vidrio arquitectónico"
  },
  "components": {
    "PVB": "PVB (polivinil butiral)",
    "SGP": "SGP (SentryGlas Plus)",
    "EVA": "EVA (etileno vinil acetato)",
    "interlayer": "lámina intermedia",
    "spacer": "perfil separador",
    "warm edge spacer": "perfil separador de borde cálido",
    "argon fill": "relleno de argón",
    "krypton fill": "relleno de criptón",
    "soft coat": "capa blanda",
    "hard coat": "capa dura",
    "coating": "recubrimiento",
    "pyrolytic coating": "recubrimiento pirolítico",
    "sputter coating": "recubrimiento por pulverización catódica",
    "primary seal": "sello primario",
    "secondary seal": "sello secundario",
    "desiccant": "desecante"
  },
  "performance": {
    "U-value": "valor U",
    "U-factor": "factor U",
    "thermal transmittance": "transmitancia térmica",
    "SHGC": "FS (Factor Solar)",
    "Solar Heat Gain Coefficient": "Coeficiente de Ganancia de Calor Solar",
    "visible transmittance": "transmitancia visible",
    "light transmission": "transmisión luminosa",
    "sound reduction": "reducción acústica",
    "sound insulation": "aislamiento acústico",
    "STC": "STC (Clase de Transmisión Sonora)",
    "Rw": "Rw",
    "thickness": "espesor",
    "panel": "panel",
    "pane": "hoja"
  },
  "processes": {
    "tempering": "templado",
    "lamination": "laminado",
    "edge polishing": "pulido de bordes",
    "beveling": "biselado",
    "cutting": "corte",
    "drilling": "perforado",
    "autoclave": "autoclave",
    "heat soak test": "ensayo de choque térmico",
    "quenching": "enfriamiento rápido"
  },
  "applications": {
    "curtain wall": "muro cortina",
    "facade": "fachada",
    "glazing": "acristalamiento",
    "shower enclosure": "mampara de ducha",
    "balustrade": "barandilla de vidrio",
    "skylight": "claraboya",
    "mullion": "montante",
    "storefront": "escaparate",
    "window wall": "muro ventana",
    "canopy": "marquesina"
  },
  "standards": {
    "CE marking": "marcado CE",
    "EN 12150": "EN 12150",
    "EN 14449": "EN 14449",
    "EN 1279": "EN 1279",
    "3C certification": "certificación 3C",
    "ASTM C1048": "ASTM C1048",
    "IBC": "IBC (Código Internacional de Construcción)",
    "ISO 9001": "ISO 9001",
    "SGCC": "SGCC"
  },
  "business": {
    "MOQ": "MOQ (Pedido Mínimo)",
    "Minimum Order Quantity": "Cantidad Mínima de Pedido",
    "lead time": "plazo de entrega",
    "container": "contenedor",
    "FCL": "FCL (Contenedor Completo)",
    "LCL": "LCL (Carga Consolidada)",
    "FOB": "FOB",
    "CIF": "CIF",
    "quotation": "cotización",
    "request a quote": "solicitar cotización",
    "get a quote": "obtener cotización",
    "contact us": "contáctenos",
    "export": "exportación",
    "foreign trade": "comercio exterior",
    "manufacturer": "fabricante",
    "supplier": "proveedor",
    "factory": "fábrica"
  },
  "brand": {
    "Sincere Glass": "Sincere Glass",
    "Wuhan": "Wuhan",
    "Hubei": "Hubei",
    "China": "China"
  }
}, null, 2));

// ============================================================
// 6. translation/config.example.mjs
// ============================================================
writeFile('translation/config.example.mjs', `// Translation API configuration.
// Copy this to config.mjs and fill in your credentials (config.mjs is gitignored).
//
// Your 国内中转站 should provide OpenAI-compatible endpoints. For Claude models,
// most relays accept Anthropic model names via the same OpenAI chat completions
// API path (/v1/chat/completions). Confirm with your provider's docs.

export default {
  // Long content (blog articles, product page body copy):
  // Claude gives best translation quality for technical/long-form.
  longContent: {
    baseURL: 'https://YOUR-RELAY.com/v1',     // relay base URL
    apiKey: 'sk-xxxxxxxxxxxx',                // relay API key
    model: 'claude-sonnet-4-5-20250929',      // or whatever model your relay exposes
    maxTokens: 8192,
    temperature: 0.3,                         // low temperature for consistency
  },

  // Short UI strings (buttons, labels, menu items):
  // GPT-4o-mini is cheap and fast; quality is fine for short text.
  uiStrings: {
    baseURL: 'https://YOUR-RELAY.com/v1',
    apiKey: 'sk-xxxxxxxxxxxx',
    model: 'gpt-4o-mini',
    maxTokens: 1024,
    temperature: 0.2,
  },

  // Request settings
  concurrency: 3,              // parallel API calls
  retryCount: 3,
  retryDelay: 2000,            // ms

  // Which locales to translate to
  targetLocales: ['es'],

  // Source locale (what the existing TSX is written in)
  sourceLocale: 'en',
};
`);

// ============================================================
// 7. translation/.gitignore
// ============================================================
writeFile('translation/.gitignore', `# Keep API credentials out of version control
config.mjs

# Translation cache (regenerated on demand)
cache/

# Audit reports (useful locally, not for repo)
reports/
`);

// ============================================================
// 8. translation/README.md
// ============================================================
writeFile('translation/README.md', `# Translation Pipeline

Multilingual infrastructure for Sincere Glass. Pilot language: Spanish (ES).

## Architecture

- **EN** stays at the root: \`sincereglass.com/products\`
- **ES** gets a prefix: \`sincereglass.com/es/products\`
- Translation runs at build time (or on demand), generating a mirror of the EN
  TSX tree under \`src/app/es/\` with text content replaced.
- Hash-based caching: unchanged content isn't re-translated.
- Industry glossary enforces consistent terminology (vidrio templado, valor U, etc.)

## Setup

1. Copy \`config.example.mjs\` to \`config.mjs\` and fill in your relay API credentials.
2. Review \`glossary/es.json\` and adjust any terms you want translated differently.
3. The pipeline script (coming in the next patch) reads these configs and
   translates specified page files.

## Files

- \`glossary/es.json\` — Industry terminology mapping (hard-enforced via system prompt)
- \`config.mjs\` — Your API credentials (gitignored)
- \`cache/\` — Content-hash-indexed translation cache (gitignored)
- \`reports/\` — Audit reports after each translation run (gitignored)

## Workflow (once pipeline is in place)

\`\`\`bash
# Translate a single page
node scripts/translate-page.mjs src/app/page.tsx es

# Translate everything
node scripts/translate-all.mjs es

# Review the audit report
cat translation/reports/es-latest.md
\`\`\`

## Glossary rules

The glossary is enforced via the translation system prompt. If a term in the
source EN text matches a glossary key (case-insensitive), the model is required
to use the corresponding ES term. Add new terms whenever you spot an
inconsistent translation during review.
`);

// ============================================================
// Done
// ============================================================
console.log(`
${'='.repeat(60)}
脚手架完成
${'='.repeat(60)}
新建文件: ${created}
跳过（已存在）: ${skipped}

下一步手动操作:
1. 复制 translation/config.example.mjs → translation/config.mjs
2. 填入你的中转站 base URL + API key + 模型名
3. 回到 Claude 告诉我:
   - config 填好了吗？
   - 中转站是否 OpenAI 兼容格式？
   - 用的是什么模型名？(e.g. claude-sonnet-4-5-20250929, gpt-4o-mini)

脚手架文件说明:
- src/lib/i18n.ts: 语言常量和 URL 工具
- src/middleware.ts: 请求路径检测（目前只打标，不重定向）
- src/components/LanguageSwitcher.tsx: 语言切换下拉（待集成到 Header）
- src/components/Hreflang.tsx: hreflang 组件
- translation/glossary/es.json: 玻璃行业术语表
- translation/config.example.mjs: API 配置模板
- translation/README.md: 流水线使用说明

本次不改动任何现有文件。可以 git diff 确认。
`);
