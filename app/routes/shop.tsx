import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ShoppingBag } from "lucide-react";
import { shopify, PRODUCTS_QUERY } from "~/lib/shopify.server";

export const meta: MetaFunction = () => [
  { title: "Shop — XEN Studio" },
  { name: "description", content: "Premium gym wear, grip socks, supplements and accessories from XEN Studio." },
];

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  onlineStoreUrl: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  images: {
    edges: { node: { url: string; altText: string | null } }[];
  };
  variants: {
    edges: { node: { id: string; availableForSale: boolean } }[];
  };
}

export async function loader() {
  try {
    const { data, errors } = await shopify.request(PRODUCTS_QUERY, {
      variables: { first: 24 },
    });

    if (errors) {
      console.error("Shopify errors:", errors);
      return { products: [] as ShopifyProduct[], error: "Unable to load products" };
    }

    const products: ShopifyProduct[] =
      data?.products?.edges?.map((e: { node: ShopifyProduct }) => e.node) ?? [];

    return { products, error: null };
  } catch (err) {
    console.error("Shopify fetch error:", err);
    return { products: [] as ShopifyProduct[], error: "Unable to load products" };
  }
}

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export default function ShopPage() {
  const { products, error } = useLoaderData<typeof loader>();

  return (
    <>
      {/* Hero */}
      <section className="relative h-64 flex items-center justify-center bg-cream overflow-hidden rounded-b-[2.5rem] mx-2 mt-2">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/hero-shop.jpg')" }}
        />
        <div className="relative z-10 text-center text-white">
          <p className="text-xs tracking-widest uppercase text-white/60 mb-2">XEN Studio</p>
          <h1 className="font-display text-5xl md:text-6xl">Shop</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {(error || products.length === 0) && (
          <div className="text-center py-32">
            <ShoppingBag size={40} className="mx-auto text-white/20 mb-6" />
            <p className="text-white/40 text-sm">No products available right now. Check back soon.</p>
          </div>
        )}

        {products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => {
              const image = product.images.edges[0]?.node;
              const available = product.variants.edges[0]?.node.availableForSale;
              const price = product.priceRange.minVariantPrice;

              return (
                <a
                  key={product.id}
                  href={product.onlineStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-cream-200 border border-white/5 rounded-2xl overflow-hidden hover:border-forest/30 transition-all duration-200"
                >
                  <div className="aspect-square bg-white/5 overflow-hidden">
                    {image ? (
                      <img
                        src={image.url}
                        alt={image.altText ?? product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={32} className="text-white/20" />
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1 gap-2">
                    <p className="text-white text-sm font-medium leading-snug line-clamp-2">
                      {product.title}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-display text-forest text-lg">
                        {formatPrice(price.amount, price.currencyCode)}
                      </span>
                      {!available && (
                        <span className="text-xs text-white/30">Sold out</span>
                      )}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
