import { Link } from "@remix-run/react";
import { motion } from "framer-motion";

export function About() {
  return (
    <section className="bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">
            Shape your body.<br />Shift your mindset.
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Movement is at the heart of what we do. It helps you build strength, improve mobility, and take a
            moment to slow down. Whether you're completely new or have years of experience, our classes are
            designed to be welcoming, effective, and accessible for all levels. It's a chance to move with purpose,
            breathe deeper, and invest in your wellbeing.
          </p>
          <Link to="/about" className="btn-primary">
            The XEN Approach
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
