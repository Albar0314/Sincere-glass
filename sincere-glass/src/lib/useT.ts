"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPath } from "./i18n";
import { translate } from "./dict";

/**
 * Returns a bound translation function for the current URL's locale.
 * Must be called from a Client Component.
 *
 * Usage:
 *   const t = useT();
 *   <h1>{t('blog.hero.title')}</h1>
 *   <p>{t('blog.emptyInCluster', { cluster: 'Comparisons' })}</p>
 */
export function useT() {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPath(pathname);
  return (key: string, vars?: Record<string, string>) =>
    translate(key, locale, vars);
}

/** Current URL's locale ('en' | 'es'). Client-only. */
export function useLocale() {
  const pathname = usePathname() ?? "/";
  return getLocaleFromPath(pathname);
}
