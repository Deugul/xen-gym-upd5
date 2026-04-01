import { Link } from "@remix-run/react";
import { motion } from "framer-motion";

const features = [
  {
    label: "Shop",
    image: "https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=700&q=80",
    to: "/shop",
  },
  {
    label: "Book Classes",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&q=80",
    to: "/book",
  },
  {
    label: "Cafe",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80",
    to: "/cafe",
  },
  {
    label: "Membership",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=80",
    to: "/membership",
  },
  {
    label: "Gallery",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=700&q=80",
    to: "/gallery",
  },
];

export function FeatureCards() {
  return (
    <section className="py-20 bg-cream overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">Explore</p>
        <h2 className="font-display text-4xl">Everything XEN</h2>
      </motion.div>

      {/* Hexagon grid */}
      <div className="flex flex-col items-center gap-0 select-none">
        {/* Row 1 — 3 hexagons */}
        <div className="flex justify-center gap-4">
          {features.slice(0, 3).map((f, i) => (
            <HexCard key={f.label} feature={f} index={i} />
          ))}
        </div>
        {/* Row 2 — 2 hexagons, offset down and centered between row 1 */}
        <div className="flex justify-center gap-4" style={{ marginTop: "-52px" }}>
          {features.slice(3, 5).map((f, i) => (
            <HexCard key={f.label} feature={f} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HexCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  // Pointy-top hexagon clip path
  const hexClip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

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
        {/* Hexagon shape */}
        <div
          className="w-full h-full overflow-hidden"
          style={{ clipPath: hexClip }}
        >
          {/* Background image */}
          <img
            src={feature.image}
            alt={feature.label}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors duration-300" />
        </div>

        {/* Text overlay — centered inside hex */}
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
