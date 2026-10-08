import { LOCALES, DEFAULT_LOCALE, localizedPath, SITE_URL, type Locale } from '@/lib/i18n';

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
