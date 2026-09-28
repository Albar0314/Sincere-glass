import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sincereglass.com";
const SITE_NAME = "Sincere Glass";

interface SeoInput {
  title?: string;
  metaDesc?: string;
  canonical?: string;
  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphImage?: { sourceUrl: string } | null;
}

/**
 * Convert Yoast SEO data from WPGraphQL into Next.js Metadata
 */
export function buildMetadata(seo?: SeoInput, fallback?: { title: string; description: string }): Metadata {
  const title = seo?.title || fallback?.title || SITE_NAME;
  const description =
    seo?.metaDesc ||
    fallback?.description ||
    "Professional glass manufacturer — tempered, insulated, laminated, and Low-E glass for global B2B buyers.";

  return {
    title,
    description,
    alternates: {
      canonical: seo?.canonical || undefined,
    },
    openGraph: {
      title: seo?.opengraphTitle || title,
      description: seo?.opengraphDescription || description,
      siteName: SITE_NAME,
      url: SITE_URL,
      type: "website",
      images: seo?.opengraphImage?.sourceUrl
        ? [{ url: seo.opengraphImage.sourceUrl }]
        : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
