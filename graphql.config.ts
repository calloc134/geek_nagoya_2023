import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: "*.graphql",
  documents: ["apps/frontend/src/**/**/*.tsx", "apps/frontend/src/**/*.tsx"],
};

export default config;
