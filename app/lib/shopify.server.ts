async function adminQuery(query: string) {
  const token = process.env.SHOPIFY_ADMIN_TOKEN ?? "";
  const store = process.env.SHOPIFY_STORE_DOMAIN ?? "xen-pilates.myshopify.com";
  const version = process.env.SHOPIFY_API_VERSION ?? "2024-10";

  const res = await fetch(
    `https://${store}/admin/api/${version}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!res.ok) {
    throw new Error(`Shopify Admin API error: ${res.status}`);
  }

  return res.json();
}

// Extract numeric ID from Shopify GID: "gid://shopify/ProductVariant/123" → "123"
export function gidToId(gid: string): string {
  return gid.split("/").pop() ?? gid;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: string;
  availableForSale: boolean;
  sku: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  onlineStoreUrl: string | null;
  priceRangeV2: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  images: {
    edges: { node: { url: string; altText: string | null } }[];
  };
  variants: {
    edges: { node: ShopifyVariant }[];
  };
}

export async function fetchProducts(): Promise<ShopifyProduct[]> {
  const json = await adminQuery(`{
    products(first: 24, sortKey: CREATED_AT, reverse: true, query: "status:active") {
      edges {
        node {
          id
          title
          handle
          description
          onlineStoreUrl
          priceRangeV2 {
            minVariantPrice { amount currencyCode }
          }
          images(first: 1) {
            edges { node { url altText } }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price
                availableForSale
                sku
              }
            }
          }
        }
      }
    }
  }`);

  return json?.data?.products?.edges?.map(
    (e: { node: ShopifyProduct }) => e.node
  ) ?? [];
}
