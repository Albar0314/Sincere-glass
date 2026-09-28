import { GraphQLClient } from "graphql-request";

const endpoint =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://cms.sincereglass.com/graphql";

export const graphqlClient = new GraphQLClient(endpoint, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (compatible; SincereGlassFrontend/1.0; +https://sincereglass.com)",
    Accept: "application/json",
  },
});
