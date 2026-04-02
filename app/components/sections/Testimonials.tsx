import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Harpreet Panesar",
    text: "A hidden gem in Halifax! The studio has an amazing vibe and beautiful decor, which is exactly what you need for a great workout. The space is calming, the instructors are really helpful and always there to guide you. Would highly recommend to anyone looking for a reformer pilates class in Halifax.",
    stars: 5,
  },
  {
    name: "Nicole",
    text: "Absolutely love this Pilates studio! All the instructors and staff members are incredible. The studio itself is beautifully designed, and creates such a positive environment to move in. 100% would highly recommend.",
    stars: 5,
  },
  {
    name: "Zakiya Ahmed",
    text: "I've been to XEN Studio a couple of times now and absolutely loved it and I've got two more classes already lined up! The studio has such a welcoming and positive vibe. The instructors are genuinely kind, supportive, and made me feel comfortable right away — even as a newcomer. Each class was not only a great workout but also a lot of fun.",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-forest text-forest" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-xs tracking-widest uppercase text-white/50 mb-3">Reviews</p>
        <h2 className="font-display text-4xl">Real results. Real voices.</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-sand p-8 rounded-2xl"
          >
            <p className="font-display text-base font-medium mb-4">— {t.name}</p>
            <p className="text-sm text-white/60 leading-relaxed mb-6">{t.text}</p>
            <Stars count={t.stars} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
