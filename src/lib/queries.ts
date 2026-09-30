import { gql } from "graphql-request";

// ─── Pages ───────────────────────────────────────────────
export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      title
      content
      slug
      seo {
        title
        metaDesc
        canonical
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

// ─── Posts (Blog / News) ─────────────────────────────────
export const GET_POSTS = gql`
  query GetPosts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        seo {
          title
          metaDesc
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
      date
      modified
      slug
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      seo {
        title
        metaDesc
        canonical
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

// ─── Products (Custom Post Type + ACF Fields) ────────────
export const GET_PRODUCTS = gql`
  query GetProducts($first: Int = 50) {
    products(first: $first) {
      nodes {
        id
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        productSpecifications {
          glassType
          thicknessRange
          maxSize
          colorOptions
          certifications
          processing
          applications
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      title
      content
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }      
      productSpecifications {
        glassType
        thicknessRange
        maxSize
        colorOptions
        certifications
        processing
        applications
      }
      seo {
        title
        metaDesc
        canonical
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

export const GET_ALL_PRODUCT_SLUGS = gql`
  query GetAllProductSlugs {
    products(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

// ─── Menus ───────────────────────────────────────────────
export const GET_MENU = gql`
  query GetMenu($slug: ID!) {
    menu(id: $slug, idType: SLUG) {
      menuItems {
        nodes {
          id
          label
          url
          path
          parentId
        }
      }
    }
  }
`;

// ─── General Settings ────────────────────────────────────
export const GET_SETTINGS = gql`
  query GetSettings {
    generalSettings {
      title
      description
    }
  }
`;
