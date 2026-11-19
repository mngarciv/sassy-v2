import pageInfoFragment from "../fragments/page-info";
import productFragment from "../fragments/product";

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts(
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
  ) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsPageQuery = /* GraphQL */ `
  query getProductsPage(
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    products(
      sortKey: $sortKey
      reverse: $reverse
      query: $query
      first: $first
      after: $after
      last: $last
      before: $before
    ) {
      edges {
        node {
          ...product
        }
      }
      pageInfo {
        ...pageInfo
      }
    }
  }
  ${productFragment}
  ${pageInfoFragment}
`;
