import { NavLink } from "@remix-run/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useCartStore } from "~/store/cart";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/book", label: "Book a Class" },
  { to: "/shop", label: "Shop" },
  { to: "/membership", label: "Membership" },
  { to: "/faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart, openCart } = useCartStore();
  const cartCount = cart?.totalQuantity ?? 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Main Nav */}
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          scrolled ? "bg-cream/95 backdrop-blur-md shadow-sm" : "bg-cream"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active text-forest" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <a href="https://momence.com/sign-in?hostId=230727" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-forest transition-colors" aria-label="Account">
                <User size={20} />
              </a>
              <button
                onClick={openCart}
                className="relative text-white/70 hover:text-forest transition-colors"
                aria-label={`Cart (${cartCount} items)`}
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-forest text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white/70 hover:text-forest transition-colors p-1"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-sand overflow-hidden bg-cream"
            >
              <nav className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `py-3 px-2 text-sm font-medium tracking-wide border-b border-sand/50 last:border-0 ${
                        isActive ? "text-forest" : "text-white/70"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
