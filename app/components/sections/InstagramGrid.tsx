import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const photos = [
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
  "https://images.unsplash.com/photo-1534438327-a029bc926dea?w=400&q=80",
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&q=80",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
  "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&q=80",
  "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?w=400&q=80",
];

export function InstagramGrid() {
  return (
    <section className="py-16 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Instagram size={20} className="text-forest" />
          <a
            href="https://instagram.com/xengym"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-lg font-medium tracking-wider text-white/80 hover:text-forest transition-colors"
          >
            @xengym
          </a>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
          {photos.map((src, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/xengym"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square overflow-hidden group"
            >
              <img
                src={src}
                alt={`XEN Studio Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
