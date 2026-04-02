import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const previews = [
  "What is reformer pilates?",
  "Never done pilates — is this for me?",
  "What do I need to bring?",
  "Is it women only?",
];

export function FaqTeaser() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left — heading + CTA */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-widest uppercase text-white/40 mb-3">Got questions?</p>
          <h2 className="font-display text-4xl sm:text-5xl leading-tight mb-6">
            We have answers.
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            From your first class to memberships and studio info — everything you need to know before you arrive.
          </p>
          <Link
            to="/faq"
            className="btn-outline inline-flex items-center gap-2"
          >
            View all FAQs
            <ChevronRight size={15} />
          </Link>
        </motion.div>

        {/* Right — preview questions */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-3"
        >
          {previews.map((q, i) => (
            <motion.div
              key={q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
            >
              <Link
                to="/faq"
                className="group flex items-center justify-between bg-cream-200 border border-white/5 hover:border-forest/40 rounded-2xl px-5 py-4 transition-all duration-200"
              >
                <span className="text-sm font-medium text-white group-hover:text-forest transition-colors duration-200">
                  {q}
                </span>
                <ChevronRight
                  size={15}
                  className="flex-shrink-0 text-white/30 group-hover:text-forest transition-colors duration-200"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
