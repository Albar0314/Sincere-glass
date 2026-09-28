import { GraphQLClient } from "graphql-request";

const endpoint =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  "https://cms.sincereglass.com/graphql";

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
  },
});
