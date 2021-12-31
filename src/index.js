import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ApolloProvider from "./graphQL/GraphqlProvider";

import CartContextProvider from "./contextApi/CartContext";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
