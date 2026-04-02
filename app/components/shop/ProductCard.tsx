import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";

export interface MockProduct {
  id: string;
  handle: string;
  title: string;
  subtitle?: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  tag?: string;
  category: string;
}

interface ProductCardProps {
  product: MockProduct;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="group bg-cream-200 rounded-3xl overflow-hidden border border-white/5 shadow-sm hover:shadow-xl transition-shadow duration-400"
    >
      {/* Image */}
      <Link to={`/shop/${product.handle}`} className="block relative">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand m-3 rounded-2xl">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-107"
            loading="lazy"
          />
          {product.tag && (
            <span className="absolute top-3 left-3 bg-forest text-black text-xs px-3 py-1.5 tracking-widest uppercase rounded-full">
              {product.tag}
            </span>
          )}
          {/* Quick add button */}
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 0 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 right-3 bg-black text-forest w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-forest hover:text-black shadow-lg"
            aria-label={`Add ${product.title} to cart`}
            onClick={(e) => e.preventDefault()}
          >
            <ShoppingBag size={15} />
          </motion.button>
        </div>
      </Link>

      {/* Info */}
      <div className="px-5 pb-5 pt-2">
        <p className="text-xs tracking-widest uppercase text-white/40 font-medium mb-1 italic">
          {product.category}
        </p>

        <Link to={`/shop/${product.handle}`} className="block group/link">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-lg leading-snug text-white group-hover/link:text-forest transition-colors duration-200">
                {product.title}
              </h3>
              {product.subtitle && (
                <p className="text-sm text-white/40 mt-0.5">{product.subtitle}</p>
              )}
            </div>
            <ArrowRight
              size={16}
              className="text-white/30 group-hover/link:text-forest group-hover/link:translate-x-1 transition-all duration-200 mt-1.5 flex-shrink-0"
            />
          </div>
        </Link>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-sand">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">£{product.price}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-white/40 line-through">£{product.compareAtPrice}</span>
            )}
          </div>
          <button className="text-xs font-medium tracking-widest uppercase text-forest border border-forest px-3 py-1.5 rounded-lg hover:bg-forest hover:text-black transition-all duration-200">
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
