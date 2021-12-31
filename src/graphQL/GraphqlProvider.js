import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from "@apollo/client";

import { CURRENCY, PRODUCTS } from "./queries/queries";

const client = new ApolloClient({
  uri: "https://pangaea-interviews.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

const GraphqlProvider = (props) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default GraphqlProvider;
export { useQuery, PRODUCTS, CURRENCY };
