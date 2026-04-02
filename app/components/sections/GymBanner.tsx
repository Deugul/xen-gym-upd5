import { motion } from "framer-motion";

export function GymBanner() {
  return (
    <section className="mx-2 my-2 rounded-3xl overflow-hidden relative h-[60vh] min-h-[320px]">
      <motion.div
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0"
      >
        <img
          src="/gym-banner.jpg"
          alt="XEN Studio studio"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 text-white"
      >
        <p className="text-xs tracking-widest uppercase text-white/60 mb-2">Halifax, West Yorkshire</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">
          A space built for you.
        </h2>
      </motion.div>
    </section>
  );
}
