import { motion } from "framer-motion";

function IconInstagram({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const photos = [
  "/insta-1.jpg",
  "/insta-2.jpg",
  "/insta-3.jpg",
  "/insta-4.jpg",
  "/insta-5.jpg",
  "/insta-6.jpg",
];

export function InstagramGrid() {
  return (
    <section className="py-14 sm:py-20 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <IconInstagram size={20} className="text-forest" />
          <a
            href="https://www.instagram.com/xenpilates/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-lg font-medium tracking-wider text-white/80 hover:text-forest transition-colors"
          >
            @xenpilates
          </a>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
          {photos.map((src, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/xenpilates/"
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
