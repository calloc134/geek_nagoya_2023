import { Provider, createClient } from "urql";
import { devtoolsExchange } from "@urql/devtools";

const client = createClient({
  url: "http://localhost:4000/graphql",
  exchanges: [devtoolsExchange],
});

const UrqlProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider value={client}>{children}</Provider>;
};

export { UrqlProvider };
