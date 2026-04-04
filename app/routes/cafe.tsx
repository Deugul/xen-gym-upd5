import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => [
  { title: "Cafe — Xén Pilates" },
  { name: "description", content: "Unwind before or after your class at the Xén Cafe. Specialty matcha, coffee, and drinks in a calm, welcoming space." },
];

export default function CafePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[75vh] flex items-end justify-center overflow-hidden rounded-b-[2.5rem] mx-2 mt-2">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/cafe.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 text-center text-white px-4 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-widest uppercase text-white/60 mb-3"
          >
            Xén Pilates
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-8xl mb-4"
          >
            The Cafe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-white/75 text-base sm:text-lg max-w-sm mx-auto"
          >
            Slow down. Sip something good.
          </motion.p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-widest uppercase text-white/40 mb-4">A place to be</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-6 leading-snug">
            Your space before and after class
          </h2>
          <p className="text-white/60 leading-relaxed text-base sm:text-lg">
            The Xén Cafe is designed to be more than just a drink stop. It's a calm, beautiful space where you can
            arrive early, settle in, and get centred — or stay a little longer after class to let the good feeling last.
            Whether you're after a ceremonial matcha, a specialty flat white, or something cold and refreshing,
            everything is crafted with care and served in a space you'll actually want to be in.
          </p>
        </motion.div>
      </section>

      {/* Two-image split */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-1 mx-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="aspect-[4/3] overflow-hidden rounded-2xl"
        >
          <img src="/cafe-3.jpg" alt="Xén Cafe drinks" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="aspect-[4/3] overflow-hidden rounded-2xl"
        >
          <img src="/cafe-4.jpg" alt="Xén Cafe space" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
        </motion.div>
      </section>

      {/* Drinks highlight */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-widest uppercase text-white/40 mb-4">On the menu</p>
            <h2 className="font-display text-3xl sm:text-4xl mb-6">Made with intention</h2>
            <p className="text-white/60 leading-relaxed mb-8">
              From ceremonial grade matcha and cold brew to smoothies and plant-based snacks —
              every drink and bite on our menu is chosen to complement how you move and how you feel.
              No rush, no noise. Just good things, made well.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {["Matcha Latte", "Flat White", "Iced Matcha", "Cold Brew", "Smoothies", "Healthy Snacks"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
          {/* Matcha image with XEN logo overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl"
          >
            <img src="/insta-2.jpg" alt="Matcha at Xén" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/30 flex items-end justify-center pb-8">
              <div className="text-center">
                <div className="font-display font-bold text-3xl tracking-tighter text-white">XÈN</div>
                <div className="font-body tracking-[0.35em] text-white/70 uppercase text-xs mt-0.5">Pilates</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full-width image */}
      <section className="mx-2 mb-1">
        <div className="relative h-64 sm:h-96 overflow-hidden rounded-3xl">
          <img src="/insta-6.jpg" alt="Xén cafe vibe" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <p className="font-display text-3xl sm:text-5xl text-white text-center px-4">
              Stay a little longer.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-20 text-center mx-2 my-2 rounded-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl mb-4">Come in. Stay a while.</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            The cafe is open to all — members and guests. No booking needed. Just show up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book" className="btn-ghost">Book a Class</Link>
            <Link to="/membership" className="btn-outline border-white/30 text-white hover:bg-white hover:text-forest">View Membership</Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
