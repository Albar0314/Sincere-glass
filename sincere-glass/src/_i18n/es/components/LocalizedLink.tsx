"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { getLocaleFromPath, localizedPath, DEFAULT_LOCALE } from "@/lib/i18n";
type Props = Omit<LinkProps, "href"> & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
  href: LinkProps["href"];
  children?: ReactNode;
};

/**
 * Drop-in replacement for Next.js <Link> that automatically prefixes the href
 * with the current locale, if the user is browsing a non-default locale.
 *
 * - "/about" on an ES page → "/es/about"
 * - "/about" on an EN page → "/about" (unchanged)
 * - External URLs, hash links, and non-string hrefs pass through unchanged.
 */
const LocalizedLink = forwardRef<HTMLAnchorElement, Props>(function LocalizedLink({
  href,
  children,
  ...rest
}, ref) {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPath(pathname);
  let resolvedHref: LinkProps["href"] = href;
  if (typeof href === "string" && href.startsWith("/") && locale !== DEFAULT_LOCALE) {
    resolvedHref = localizedPath(href, locale);
  }
  return <Link ref={ref} href={resolvedHref} {...rest}>
      {children}
    </Link>;
});
export default LocalizedLink;