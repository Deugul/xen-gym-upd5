import { Link } from "@remix-run/react";
import { motion } from "framer-motion";

export function GiftCard() {
  return (
    <section className="relative overflow-hidden bg-cream rounded-3xl mx-2 my-2">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&q=80')" }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-widest uppercase text-white/60 mb-3">Give the gift of wellness</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">
              Share the XEN Experience
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              Gift a class, a membership, or store credit. Perfect for someone who deserves to feel
              their best — give them the space to move, breathe, and reset.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop/gift-cards" className="btn-ghost">
                Shop Gift Cards
              </Link>
              <Link to="/membership" className="btn-outline border-white/30 text-white hover:bg-white hover:text-forest">
                View Memberships
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/gym-gift.jpg"
                alt="XEN Studio interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
