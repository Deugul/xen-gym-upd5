import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ShoppingBag, X, Plus, Minus, ShoppingCart } from "lucide-react";
import { fetchProducts } from "~/lib/shopify.server";
import type { ShopifyProduct, ShopifyVariant } from "~/lib/shopify.server";

function gidToId(gid: string): string {
  return gid.split("/").pop() ?? gid;
}

export const meta: MetaFunction = () => [
  { title: "Shop — XEN Studio" },
  { name: "description", content: "Premium gym wear, grip socks, supplements and accessories from XEN Studio." },
];

export async function loader() {
  try {
    const products = await fetchProducts();
    return { products, error: null };
  } catch (err) {
    console.error("Shop loader error:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return { products: [] as ShopifyProduct[], error: msg };
  }
}

interface CartItem {
  variantId: string;
  productTitle: string;
  variantTitle: string;
  price: string;
  currencyCode: string;
  imageUrl: string | null;
  quantity: number;
}

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

function buildCheckoutUrl(items: CartItem[]): string {
  const store = "xen-pilates.myshopify.com";
  const cartItems = items
    .map((item) => `${item.variantId}:${item.quantity}`)
    .join(",");
  return `https://${store}/cart/${cartItems}`;
}

export default function ShopPage() {
  const { products, error } = useLoaderData<typeof loader>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, i) => sum + parseFloat(i.price) * i.quantity,
    0
  );
  const currencyCode = cart[0]?.currencyCode ?? "GBP";

  function addToCart(product: ShopifyProduct, variant: ShopifyVariant) {
    const numericId = gidToId(variant.id);
    setCart((prev) => {
      const existing = prev.find((i) => i.variantId === numericId);
      if (existing) {
        return prev.map((i) =>
          i.variantId === numericId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          variantId: numericId,
          productTitle: product.title,
          variantTitle: variant.title === "Default Title" ? "" : variant.title,
          price: variant.price,
          currencyCode: product.priceRangeV2.minVariantPrice.currencyCode,
          imageUrl: product.images.edges[0]?.node.url ?? null,
          quantity: 1,
        },
      ];
    });
    setCartOpen(true);
  }

  function updateQty(variantId: string, delta: number) {
    setCart((prev) =>
      prev
        .map((i) =>
          i.variantId === variantId
            ? { ...i, quantity: i.quantity + delta }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  }

  function removeItem(variantId: string) {
    setCart((prev) => prev.filter((i) => i.variantId !== variantId));
  }

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

        {/* Cart icon */}
        <button
          onClick={() => setCartOpen(true)}
          className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white hover:border-forest transition-all"
        >
          <ShoppingCart size={16} />
          {totalItems > 0 && (
            <span className="text-xs font-medium text-forest">{totalItems}</span>
          )}
        </button>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Cart button bar */}
        {totalItems > 0 && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-forest text-forest text-sm font-medium hover:bg-forest hover:text-white transition-all duration-200"
            >
              <ShoppingCart size={15} />
              Cart ({totalItems}) · {formatPrice(totalPrice.toString(), currencyCode)}
            </button>
          </div>
        )}

        {(error || products.length === 0) && (
          <div className="text-center py-32">
            <ShoppingBag size={40} className="mx-auto text-white/20 mb-6" />
            <p className="text-white/40 text-sm">No products available right now. Check back soon.</p>
            {error && <p className="text-red-400/60 text-xs mt-2">{error}</p>}
          </div>
        )}

        {products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => {
              const image = product.images.edges[0]?.node;
              const firstVariant = product.variants.edges[0]?.node;
              const price = product.priceRangeV2.minVariantPrice;
              const available = firstVariant?.availableForSale ?? false;

              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-cream-200 border border-white/5 rounded-2xl overflow-hidden hover:border-forest/30 transition-all duration-200"
                >
                  {/* Image */}
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

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1 gap-3">
                    <p className="text-white text-sm font-medium leading-snug line-clamp-2">
                      {product.title}
                    </p>

                    {/* Variant selector if multiple */}
                    {product.variants.edges.length > 1 && (
                      <div className="flex flex-wrap gap-1">
                        {product.variants.edges.map(({ node }) => (
                          <span
                            key={node.id}
                            className="text-xs px-2 py-0.5 rounded-lg border border-white/10 text-white/50"
                          >
                            {node.title}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto flex items-center justify-between gap-2">
                      <span className="font-display text-forest text-lg">
                        {formatPrice(price.amount, price.currencyCode)}
                      </span>
                      {available && firstVariant ? (
                        <button
                          onClick={() => addToCart(product, firstVariant)}
                          className="text-xs font-medium tracking-widest uppercase px-3 py-1.5 rounded-lg border border-forest text-forest hover:bg-forest hover:text-white transition-all duration-200 whitespace-nowrap"
                        >
                          Add
                        </button>
                      ) : (
                        <span className="text-xs text-white/30">Sold out</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Gift Cards */}
        <div id="gift-cards" className="mt-12 sm:mt-16">
          <div className="mb-6">
            <h2 className="font-display text-2xl sm:text-3xl text-white">Gift Cards</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {[
              { label: "2 Classes", href: "https://momence.com/m/725421?g=gift" },
              { label: "3 Classes", href: "https://momence.com/m/725422?g=gift" },
            ].map((card) => (
              <a
                key={card.label}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 hover:border-forest/40 transition-all duration-300 aspect-[16/9] sm:aspect-[3/2]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#0a0a0a]" />
                <div className="absolute inset-0 bg-gradient-to-br from-forest/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 left-0 w-12 h-px bg-forest/40" />
                <div className="absolute top-0 left-0 w-px h-12 bg-forest/40" />
                <div className="absolute bottom-0 right-0 w-12 h-px bg-forest/40" />
                <div className="absolute bottom-0 right-0 w-px h-12 bg-forest/40" />
                <div className="relative z-10 px-6 pt-6">
                  <div className="flex flex-col leading-none">
                    <span className="font-display text-3xl text-white tracking-tighter">XÉN</span>
                    <span className="text-[9px] tracking-[0.35em] uppercase text-white/40 mt-0.5">Studio</span>
                  </div>
                </div>
                <div className="relative z-10 px-6 pb-6 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Gift Card</p>
                    <p className="font-display text-xl text-white">{card.label}</p>
                  </div>
                  <span className="text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-xl border border-forest text-forest group-hover:bg-forest group-hover:text-black transition-all duration-200">
                    Buy
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <div className="relative w-full max-w-sm bg-[#0d0d0d] border-l border-white/10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h2 className="font-display text-xl text-white">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-white/40 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {cart.length === 0 && (
                <div className="text-center py-20 text-white/30">
                  <ShoppingBag size={32} className="mx-auto mb-3" />
                  <p className="text-sm">Your cart is empty</p>
                </div>
              )}
              {cart.map((item) => (
                <div key={item.variantId} className="flex gap-3 bg-cream-200 rounded-xl p-3">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.productTitle}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.productTitle}</p>
                    {item.variantTitle && (
                      <p className="text-white/40 text-xs mt-0.5">{item.variantTitle}</p>
                    )}
                    <p className="text-forest text-sm mt-1">
                      {formatPrice(item.price, item.currencyCode)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.variantId, -1)}
                        className="w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-white text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.variantId, 1)}
                        className="w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30"
                      >
                        <Plus size={11} />
                      </button>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="ml-auto text-white/20 hover:text-white/60"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-5 py-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-white">
                  <span className="text-sm text-white/60">Total</span>
                  <span className="font-display text-xl">
                    {formatPrice(totalPrice.toString(), currencyCode)}
                  </span>
                </div>
                <a
                  href={buildCheckoutUrl(cart)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-xl bg-forest text-black font-medium tracking-wide text-sm hover:opacity-90 transition-opacity"
                >
                  Checkout on Shopify
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
