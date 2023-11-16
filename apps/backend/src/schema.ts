import { createSchema } from "graphql-yoga";
import { loadFilesSync } from "@graphql-tools/load-files";
import { QueryResolvers } from "./lib/generated/resolver-types";

const query_resolvers: QueryResolvers = {
  hello: async (_parent, _args, _context, _info) => {
    return {
      message: "Hello World!",
      url: "https://google.com",
    };
  },
};

export const schema = createSchema({
  typeDefs: [loadFilesSync("../../schema.graphql")],
  resolvers: {
    Query: query_resolvers,
  },
});
