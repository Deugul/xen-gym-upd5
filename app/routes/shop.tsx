import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "Shop — XEN Studio" },
  { name: "description", content: "Premium gym wear, grip socks, supplements and accessories from XEN Studio." },
];

export default function ShopPage() {
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
        <div className="text-center py-32">
          <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Shop</p>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">Coming Soon</h2>
          <p className="text-white/50 text-sm">Our shop is on its way. Check back soon.</p>
        </div>
      </div>
    </>
  );
}
