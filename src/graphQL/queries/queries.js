import { gql } from "@apollo/client";

export const PRODUCTS = gql`
  query ($currency: Currency) {
    products {
      id
      title
      price(currency: $currency)
      image_url
    }
  }
`;
export const CURRENCY = gql`
  query {
    currency
  }
`;
