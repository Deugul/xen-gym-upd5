import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Leaf, Zap, UtensilsCrossed } from "lucide-react";

export const meta: MetaFunction = () => [
  { title: "Cafe — XEN Gym" },
  { name: "description", content: "Fuel your body at XEN Cafe. Smoothies, protein bowls, specialty coffee and healthy snacks." },
];

const menu = {
  "Hot Drinks": {
    icon: Coffee,
    items: [
      { name: "Flat White", description: "Double espresso with silky steamed milk", price: "3.50" },
      { name: "Matcha Latte", description: "Ceremonial grade matcha with oat milk", price: "4.20" },
      { name: "Turmeric Latte", description: "Golden milk blend with coconut milk", price: "4.00" },
      { name: "Americano", description: "Double espresso with hot water", price: "3.00" },
      { name: "Chai Latte", description: "Spiced chai with steamed oat milk", price: "4.00" },
    ],
  },
  "Cold Drinks": {
    icon: Leaf,
    items: [
      { name: "Cold Brew", description: "12-hour slow-brewed black coffee", price: "4.00" },
      { name: "Iced Matcha", description: "Ceremonial matcha over ice with oat milk", price: "4.50" },
      { name: "Coconut Water", description: "100% natural, no added sugar", price: "3.00" },
      { name: "Kombucha", description: "Raw organic fermented tea — rotating flavours", price: "3.80" },
    ],
  },
  "Smoothies": {
    icon: Zap,
    items: [
      { name: "Green Machine", description: "Spinach, banana, mango, ginger, coconut water", price: "6.50" },
      { name: "Berry Blast", description: "Mixed berries, banana, almond milk, honey", price: "6.00" },
      { name: "Tropical Glow", description: "Pineapple, mango, turmeric, coconut milk", price: "6.50" },
      { name: "Peanut Power", description: "Banana, peanut butter, oat milk, cacao", price: "6.50" },
      { name: "Protein Shake", description: "Whey protein, banana, almond milk, honey — 30g protein", price: "7.50" },
    ],
  },
  "Bowls & Food": {
    icon: UtensilsCrossed,
    items: [
      { name: "Acai Bowl", description: "Frozen acai, granola, banana, mixed berries, coconut flakes, honey", price: "9.50" },
      { name: "Protein Bowl", description: "Quinoa, grilled chicken, avocado, roasted veg, tahini dressing", price: "12.00" },
      { name: "Overnight Oats", description: "Oats, chia seeds, almond milk, berries, maple syrup", price: "6.00" },
      { name: "Avocado Toast", description: "Sourdough, avocado, poached egg, chilli flakes, microgreens", price: "9.00" },
      { name: "Energy Balls (x3)", description: "Dates, oats, nut butter, cacao, coconut", price: "4.50" },
      { name: "Banana Bread", description: "Homemade, gluten-free option available", price: "3.50" },
    ],
  },
};

type MenuCategory = keyof typeof menu;

export default function CafePage() {
  const [activeTab, setActiveTab] = useState<MenuCategory>("Hot Drinks");
  const { items } = menu[activeTab];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden rounded-b-[2.5rem] mx-2 mt-2">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/cafe.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-widest uppercase text-white/60 mb-3"
          >
            XEN Gym
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl mb-6"
          >
            Cafe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-lg max-w-md mx-auto"
          >
            Fuel your body. Nourish your mind.
          </motion.p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-sand py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-3xl mb-4">Made for movers</h2>
          <p className="text-gray-600 leading-relaxed">
            Every item on our menu is crafted to support your performance and recovery.
            From post-class protein bowls to pre-workout smoothies and specialty coffee —
            everything is made fresh, with ingredients you can feel good about.
          </p>
        </div>
      </section>

      {/* Menu */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Tab nav */}
        <div className="flex flex-wrap gap-2 justify-center mb-14">
          {(Object.keys(menu) as MenuCategory[]).map((cat) => {
            const { icon: TabIcon } = menu[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide border transition-all duration-200 ${
                  activeTab === cat
                    ? "bg-forest text-white border-forest"
                    : "bg-transparent text-gray-600 border-sand hover:border-forest hover:text-forest"
                }`}
              >
                <TabIcon size={14} />
                {cat}
              </button>
            );
          })}
        </div>

        {/* Items */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start justify-between gap-6 p-6 bg-sand hover:bg-cream-200 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-medium text-base mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <span className="font-display text-lg text-forest whitespace-nowrap">£{item.price}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Photo strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {[
          "/cafe-1.jpg",
          "/cafe-2.jpg",
          "/cafe-3.jpg",
          "/cafe-4.jpg",
        ].map((src, i) => (
          <div key={i} className="aspect-square overflow-hidden">
            <img
              src={src}
              alt={`Cafe food ${i + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-forest text-white py-20 text-center">
        <h2 className="font-display text-4xl mb-4">Visit us today</h2>
        <p className="text-white/70 mb-8">Open to members and non-members. No booking required for the cafe.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/book" className="btn-ghost">Book a Class</a>
          <a href="/membership" className="btn-outline border-white/30 text-white hover:bg-white hover:text-forest">Join XEN</a>
        </div>
      </section>
    </>
  );
}
