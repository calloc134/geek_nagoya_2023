import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../../schema.graphql",
  documents: ["src/**/**/*.tsx", "src/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "src/lib/generated/": {
      preset: "client",
      config: {
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
