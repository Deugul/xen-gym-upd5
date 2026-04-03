import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { ProductCard, type MockProduct } from "~/components/shop/ProductCard";

export const meta: MetaFunction = () => [
  { title: "Shop — XEN Studio" },
  { name: "description", content: "Premium gym wear, grip socks, supplements and accessories from XEN Studio." },
];

const products: MockProduct[] = [
  { id: "1", handle: "grip-socks-white", title: "Grip Socks", subtitle: "Cute. Comfy. Grippy.", price: "18.00", image: "https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=700&q=80", category: "Accessories", tag: "Bestseller" },
  { id: "2", handle: "grip-socks-black", title: "Grip Socks — Black", subtitle: "Sleek & non-slip.", price: "18.00", image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=700&q=80", category: "Accessories" },
  { id: "3", handle: "xen-training-tee", title: "XEN Training Tee", subtitle: "Lightweight performance fit.", price: "45.00", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&q=80", category: "Apparel", tag: "New" },
  { id: "4", handle: "xen-seamless-leggings", title: "Seamless Leggings", subtitle: "Move freely, all day.", price: "65.00", compareAtPrice: "85.00", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=700&q=80", category: "Apparel" },
  { id: "5", handle: "xen-sports-bra", title: "XEN Sports Bra", subtitle: "Medium support, minimal design.", price: "42.00", image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=700&q=80", category: "Apparel" },
  { id: "6", handle: "resistance-bands", title: "Resistance Band Set", subtitle: "3 resistance levels included.", price: "28.00", image: "https://images.unsplash.com/photo-1598971457999-ca4ef48a9a74?w=700&q=80", category: "Equipment" },
  { id: "7", handle: "yoga-mat-forest", title: "XEN Yoga Mat", subtitle: "Forest green, 6mm cushion.", price: "55.00", image: "https://images.unsplash.com/photo-1601925228100-40e8dab8a33f?w=700&q=80", category: "Equipment" },
  { id: "8", handle: "whey-protein-vanilla", title: "Whey Protein", subtitle: "Vanilla — 30g protein per serve.", price: "38.00", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=80", category: "Supplements", tag: "New" },
  { id: "9", handle: "gift-card", title: "Gift Card", subtitle: "Give the gift of movement.", price: "50.00", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&q=80", category: "Gift Cards", tag: "Gift" },
];

const categories = ["All", "Gift Cards"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

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
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 sm:mb-10 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-xs font-medium tracking-widest uppercase border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-forest text-black border-forest"
                  : "bg-transparent text-white/60 border-white/10 hover:border-forest hover:text-forest"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="font-display text-2xl mb-2">No products found</p>
            <p className="text-sm text-white/40">Try selecting a different category</p>
          </div>
        )}

      </div>
    </>
  );
}
