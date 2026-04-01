export const PRODUCT_FRAGMENT = `#graphql
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    productType
    tags
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 5) {
      nodes {
        url
        altText
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 10) {
      nodes {
        id
        title
        availableForSale
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

export const GET_PRODUCTS = `#graphql
  ${PRODUCT_FRAGMENT}
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      nodes {
        ...ProductFragment
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `#graphql
  ${PRODUCT_FRAGMENT}
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
`;

export const GET_COLLECTION = `#graphql
  ${PRODUCT_FRAGMENT}
  query GetCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
        width
        height
      }
      products(first: $first) {
        nodes {
          ...ProductFragment
        }
      }
    }
  }
`;
