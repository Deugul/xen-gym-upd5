import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";

export const meta: MetaFunction = () => [
  { title: "Gallery — XEN Studio" },
  { name: "description", content: "Photos from XEN Studio Halifax." },
];

// Placeholder images — replace with your own uploads
const photos: string[] = [];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-64 flex items-center justify-center bg-cream overflow-hidden rounded-b-[2.5rem] mx-2 mt-2">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/hero-gallery.jpg')" }}
        />
        <div className="relative z-10 text-center text-white">
          <p className="text-xs tracking-widest uppercase text-white/60 mb-2">XEN Studio</p>
          <h1 className="font-display text-5xl md:text-6xl">Gallery</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {photos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <h2 className="font-display text-2xl">Gallery coming soon</h2>
          </motion.div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {photos.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="break-inside-avoid overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  className="w-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
