// Admin API via OAuth 2.0 client credentials grant
// Token expires in 24h — cached in memory and refreshed automatically

interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

async function getAdminToken(): Promise<string> {
  const now = Date.now();

  // Return cached token if still valid (5 min buffer before expiry)
  if (tokenCache && tokenCache.expiresAt > now + 5 * 60 * 1000) {
    return tokenCache.token;
  }

  const store = process.env.SHOPIFY_STORE_DOMAIN ?? "xen-pilates.myshopify.com";
  const clientId = process.env.SHOPIFY_CLIENT_ID ?? "";
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET ?? "";

  const res = await fetch(`https://${store}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) {
    throw new Error(`Shopify token request failed: ${res.status}`);
  }

  const data = await res.json();
  tokenCache = {
    token: data.access_token,
    expiresAt: now + data.expires_in * 1000,
  };

  return tokenCache.token;
}

async function adminQuery(query: string) {
  const token = await getAdminToken();
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
