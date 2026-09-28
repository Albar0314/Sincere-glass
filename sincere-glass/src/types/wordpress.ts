// ─── Yoast SEO fields (via WPGraphQL for Yoast) ─────────
export interface WpSeo {
  title: string;
  metaDesc: string;
  canonical: string;
  opengraphTitle: string;
  opengraphDescription: string;
  opengraphImage: {
    sourceUrl: string;
  } | null;
}

// ─── Featured Image ──────────────────────────────────────
export interface WpImage {
  sourceUrl: string;
  altText: string;
}

// ─── Post / Page ─────────────────────────────────────────
export interface WpPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage: {
    node: WpImage;
  } | null;
  author: {
    node: {
      name: string;
    };
  };
  seo: WpSeo;
}

export interface WpPage {
  title: string;
  slug: string;
  content: string;
  seo: WpSeo;
}

// ─── Product (Custom Post Type) ──────────────────────────
export interface WpProduct {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: {
    node: WpImage;
  } | null;
  seo: WpSeo;
  // ACF fields will be added here once configured
}

// ─── Menu ────────────────────────────────────────────────
export interface WpMenuItem {
  id: string;
  label: string;
  url: string;
  path: string;
  parentId: string | null;
}
