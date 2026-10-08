// Middleware: detects the current locale from URL and attaches it as a header.
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
