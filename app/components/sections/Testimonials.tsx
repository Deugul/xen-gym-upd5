import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Hajra Yousafzai",
    text: "Only been coming to this class for 2 weeks and I'm already hooked! The instructor is so knowledgeable and patient – they make sure everyone's form is correct, which is perfect as I'm new to Pilates. The studio is bright, clean, and the small class size means great individual attention. I can already feel better flexibility and less tension in my shoulders, plus the friendly atmosphere makes every session enjoyable.",
    stars: 5,
  },
  {
    name: "Juvaria Khalifa",
    text: "I truly can't say enough good things about this Pilates session. From the moment I walked in, I felt welcomed, supported, and genuinely cared for. You were incredibly hospitable, kind, and attentive, creating an environment that felt both professional and comforting. This was my very first Pilates lesson, and I'm so glad I decided to do it. Every part of the session was thoughtfully guided, motivating, and empowering, regardless of experience level. This is genuinely the best place ever to practice Pilates — not just for the physical benefits, but for the sense of community and encouragement throughout the class. I will definitely be coming back and recommending it to everyone I know.",
    stars: 5,
  },
  {
    name: "Em Khan",
    text: "I don't normally write reviews but this was honestly one of the most enjoyable Pilates experiences I've had. Doing Pilates for over a year now and this studio is by far the cutest studio in Yorkshire with a real sense of community, my instructor Aisha was so lovely she tailored the session to everyone's ability and was actively correcting form which is everything you want at a Pilates session! They also have a really nice drinks menu which is always a plus. Overall I would definitely recommend and will be back soon.",
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
