import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from "@apollo/client";

import { CURRENCY, PRODUCTS } from "./queries/queries";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_SERVER_URL,
  cache: new InMemoryCache(),
});

const GraphqlProvider = (props) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default GraphqlProvider;
export { useQuery, PRODUCTS, CURRENCY };
