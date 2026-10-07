/**
 * Hreflang alternate URL generator.
 *
 * Current state: English is the only published locale, so only the en + x-default
 * entries are emitted. When a Spanish/German/etc translation is published,
 * add its slug (or set to the English slug if URL-identical) to the article's
 * `translations` map and the helper will include it.
 */

export type Locale = 'en' | 'es' | 'de' | 'ar' | 'fr' | 'ru';

export const PLANNED_LOCALES: Locale[] = ['en', 'es', 'de', 'ar', 'fr', 'ru'];

const SITE_URL = 'https://sincereglass.com';

/**
 * Build the URL for a given locale + slug.
 * English lives at /blog/<slug>; other locales at /<locale>/blog/<slug>.
 */
export function buildLocalizedUrl(locale: Locale, slug: string): string {
  if (locale === 'en') return `${SITE_URL}/blog/${slug}`;
  return `${SITE_URL}/${locale}/blog/${slug}`;
}

/**
 * Generate the hreflang alternates object for Next.js Metadata.
 * Pass the article's `translations` map — only entries present there are emitted,
 * plus the English self-reference and an x-default pointing to English.
 */
export function hreflangAlternates(
  slug: string,
  translations: Partial<Record<Locale, string>> = {},
): Record<string, string> {
  const alternates: Record<string, string> = {};

  // Always emit English self-reference + x-default
  alternates['en'] = buildLocalizedUrl('en', slug);
  alternates['x-default'] = buildLocalizedUrl('en', slug);

  // Emit any locale that has a translation registered
  (Object.keys(translations) as Locale[]).forEach((loc) => {
    if (loc === 'en') return; // already set
    const translatedSlug = translations[loc];
    if (translatedSlug) {
      alternates[loc] = buildLocalizedUrl(loc, translatedSlug);
    }
  });

  return alternates;
}
