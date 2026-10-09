// Locale configuration and URL helpers

export const LOCALES = ['en', 'es'] as const;
export const DEFAULT_LOCALE = 'en';

export type Locale = typeof LOCALES[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: '\ud83c\uddfa\ud83c\uddf8',
  es: '\ud83c\uddea\ud83c\uddf8',
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


/**
 * Build Next.js metadata.alternates for a given canonical path.
 * Emits <link rel="alternate" hreflang="en|es|x-default"> in the <head>.
 */
export function makeAlternates(
  canonicalPath: string,
  locale: Locale = DEFAULT_LOCALE,
): {
  canonical: string;
  languages: Record<string, string>;
} {
  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    const hreflang = loc === DEFAULT_LOCALE ? 'en' : loc;
    languages[hreflang] = SITE_URL + localizedPath(canonicalPath, loc);
  }
  languages['x-default'] = SITE_URL + localizedPath(canonicalPath, DEFAULT_LOCALE);
  return {
    canonical: SITE_URL + localizedPath(canonicalPath, locale),
    languages,
  };
} {
  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    const hreflang = loc === DEFAULT_LOCALE ? 'en' : loc;
    languages[hreflang] = SITE_URL + localizedPath(canonicalPath, loc);
  }
  languages['x-default'] = SITE_URL + localizedPath(canonicalPath, DEFAULT_LOCALE);
  return {
    canonical: SITE_URL + canonicalPath,
    languages,
  };
}
