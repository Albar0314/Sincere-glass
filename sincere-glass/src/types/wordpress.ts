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

// ─── ACF: Product Specifications ─────────────────────────
export interface ProductSpecifications {
  glassType: string | null;
  thicknessRange: string | null;
  maxSize: string | null;
  colorOptions: string | null;
  certifications: string | null;
  processing: string | null;
  applications: string | null;
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
  productSpecifications: ProductSpecifications;
  seo?: WpSeo;
}

// ─── Menu ────────────────────────────────────────────────
export interface WpMenuItem {
  id: string;
  label: string;
  url: string;
  path: string;
  parentId: string | null;
}
