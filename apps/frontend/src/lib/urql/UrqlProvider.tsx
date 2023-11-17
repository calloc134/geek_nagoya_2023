import { Provider, createClient, fetchExchange, cacheExchange } from "urql";
import { devtoolsExchange } from "@urql/devtools";

const client = createClient({
  // 即席GraphQLサーバー
  url:
    import.meta.env.MODE === "development"
      ? "http://localhost:6173/api/graphql"
      : "https://geek2023nagoya.f5.si/api/graphql",
  exchanges: [cacheExchange, fetchExchange, devtoolsExchange],
});

const UrqlProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider value={client}>{children}</Provider>;
};

export { UrqlProvider };
