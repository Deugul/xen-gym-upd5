const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN!;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || "2024-10";

const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_API_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache,
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data as T;
}
