import { Link } from "@remix-run/react";
import { motion } from "framer-motion";

const features = [
  { label: "Shop", image: "/hex-shop.jpg", to: "/shop" },
  { label: "Book Classes", image: "/hex-book.jpg", to: "/book" },
  { label: "Cafe", image: "/hex-cafe.jpg", to: "/cafe" },
  { label: "Membership", image: "/hex-membership.jpg", to: "/membership" },
  { label: "Gallery", image: "/hex-gallery.jpg", to: "/gallery" },
];

export function FeatureCards() {
  const hexClip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

  return (
    <section className="py-16 md:py-20 bg-cream overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 md:mb-14 px-4"
      >
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">Explore</p>
        <h2 className="font-display text-3xl sm:text-4xl">Everything XEN</h2>
      </motion.div>

      {/* Mobile: 2-column card grid */}
      <div className="md:hidden px-4 grid grid-cols-2 gap-3">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className={i === 4 ? "col-span-2" : ""}
          >
            <Link
              to={f.to}
              className="group relative block rounded-2xl overflow-hidden aspect-square"
            >
              <img
                src={f.image}
                alt={f.label}
                className="w-full h-full object-cover transition-transform duration-500 group-active:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-active:bg-black/55 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end p-4">
                <p className="text-white font-body font-semibold text-sm tracking-[0.15em] uppercase drop-shadow-lg">
                  {f.label}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Desktop: hexagon honeycomb */}
      <div className="hidden md:flex flex-col items-center gap-0 select-none">
        {/* Row 1 — 3 hexagons */}
        <div className="flex justify-center gap-4">
          {features.slice(0, 3).map((f, i) => (
            <HexCard key={f.label} feature={f} index={i} hexClip={hexClip} />
          ))}
        </div>
        {/* Row 2 — 2 hexagons, offset */}
        <div className="flex justify-center gap-4" style={{ marginTop: "-52px" }}>
          {features.slice(3, 5).map((f, i) => (
            <HexCard key={f.label} feature={f} index={i + 3} hexClip={hexClip} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HexCard({
  feature,
  index,
  hexClip,
}: {
  feature: (typeof features)[0];
  index: number;
  hexClip: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <Link
        to={feature.to}
        className="group block relative"
        style={{ width: 260, height: 300 }}
      >
        <div className="w-full h-full overflow-hidden" style={{ clipPath: hexClip }}>
          <img
            src={feature.image}
            alt={feature.label}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors duration-300" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-white font-body font-semibold text-base tracking-[0.2em] uppercase mb-3 drop-shadow-lg">
            {feature.label}
          </p>
          <span className="border border-white text-white text-xs tracking-widest uppercase px-5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Learn More
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
