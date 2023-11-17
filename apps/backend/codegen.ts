import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../../schema.graphql",
  generates: {
    "src/lib/generated/resolver-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        // contextType: "../../context#GraphQLContext",
        strictScalars: true,
        scalars: {
          File: "File",
        },
        enumsAsTypes: true,
        skipTypename: true,
        useTypeImports: true,
      },
    },
  },
};

export default config;
