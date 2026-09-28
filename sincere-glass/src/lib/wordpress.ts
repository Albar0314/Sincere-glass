import { graphqlClient } from "./graphql-client";
import {
  GET_PAGE_BY_SLUG,
  GET_POSTS,
  GET_POST_BY_SLUG,
  GET_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  GET_ALL_PRODUCT_SLUGS,
  GET_MENU,
  GET_SETTINGS,
} from "./queries";
import type { WpProduct } from "@/types/wordpress";

// ─── Pages ───────────────────────────────────────────────
export async function getPageBySlug(slug: string) {
  const data = await graphqlClient.request<{ page: any }>(GET_PAGE_BY_SLUG, {
    slug,
  });
  return data.page;
}

// ─── Posts ────────────────────────────────────────────────
export async function getPosts(first = 10, after?: string) {
  const data = await graphqlClient.request<{ posts: any }>(GET_POSTS, {
    first,
    after,
  });
  return data.posts;
}

export async function getPostBySlug(slug: string) {
  const data = await graphqlClient.request<{ post: any }>(GET_POST_BY_SLUG, {
    slug,
  });
  return data.post;
}

// ─── Products ────────────────────────────────────────────
export async function getProducts(first = 50) {
  const data = await graphqlClient.request<{
    products: { nodes: WpProduct[] };
  }>(GET_PRODUCTS, { first });
  return data.products;
}

export async function getProductBySlug(slug: string) {
  const data = await graphqlClient.request<{ product: WpProduct | null }>(
    GET_PRODUCT_BY_SLUG,
    { slug }
  );
  return data.product;
}

export async function getAllProductSlugs() {
  const data = await graphqlClient.request<{
    products: { nodes: { slug: string }[] };
  }>(GET_ALL_PRODUCT_SLUGS);
  return data.products.nodes.map((node) => node.slug);
}

// ─── Menus ───────────────────────────────────────────────
export async function getMenu(slug: string) {
  const data = await graphqlClient.request<{ menu: any }>(GET_MENU, { slug });
  return data.menu;
}

// ─── Settings ────────────────────────────────────────────
export async function getSettings() {
  const data = await graphqlClient.request<{ generalSettings: any }>(
    GET_SETTINGS
  );
  return data.generalSettings;
}
