import { GraphQLClient } from "graphql-request";

const endpoint =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://cms.sincereglass.com/graphql";

export const graphqlClient = new GraphQLClient(endpoint, {
  fetch: (url, options) =>
    fetch(url, { ...options, cache: "no-store" }),
  headers: {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "application/json",
  },
});
