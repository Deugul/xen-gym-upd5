import { NavLink } from "@remix-run/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useCartStore } from "~/store/cart";

interface NavbarProps {
  user?: { name: string; picture: string | null } | null;
}

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/book", label: "Book a Class" },
  { to: "/shop", label: "Shop" },
  { to: "/membership", label: "Membership" },
  { to: "/cafe", label: "Cafe" },
  { to: "/faq", label: "FAQ" },
];

export function Navbar({ user }: NavbarProps) {
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
              <a href="https://www.instagram.com/xenpilates/" target="_blank" rel="noopener noreferrer" className="hidden lg:block text-white/60 hover:text-forest transition-colors" aria-label="Instagram">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://www.tiktok.com/@xenpilates?_r=1&_t=ZN-95EiDay9o8c" target="_blank" rel="noopener noreferrer" className="hidden lg:block text-white/60 hover:text-forest transition-colors" aria-label="TikTok">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" /></svg>
              </a>
              <a href="https://snapchat.com/t/zptcLgae" target="_blank" rel="noopener noreferrer" className="hidden lg:block text-white/60 hover:text-forest transition-colors" aria-label="Snapchat">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 2C9.33 2 7.4 3.37 6.57 5.46c-.28.71-.24 1.52-.22 2.26v.18c-.47.1-.96.05-1.38-.13-.18-.08-.38-.05-.5.1a.48.48 0 0 0-.06.5c.28.65.9 1.05 1.55 1.26-.04.17-.09.34-.14.51-.6 1.94-1.56 3.27-2.82 3.94a.49.49 0 0 0-.27.52c.04.24.23.42.47.46.8.13 1.38.43 1.75.89.18.22.16.47-.05.7-.32.35-.53.77-.53 1.21 0 .78.63 1.41 1.41 1.41.24 0 .47-.06.68-.17.7-.36 1.44-.54 2.2-.54.56 0 1.11.1 1.63.29.77.29 1.42.44 1.93.44s1.16-.15 1.93-.44c.52-.19 1.07-.29 1.63-.29.76 0 1.5.18 2.2.54.21.11.44.17.68.17.78 0 1.41-.63 1.41-1.41 0-.44-.21-.86-.53-1.21-.21-.23-.23-.48-.05-.7.37-.46.95-.76 1.75-.89.24-.04.43-.22.47-.46a.49.49 0 0 0-.27-.52c-1.26-.67-2.22-2-2.82-3.94-.05-.17-.1-.34-.14-.51.65-.21 1.27-.61 1.55-1.26a.48.48 0 0 0-.06-.5c-.12-.15-.32-.18-.5-.1-.42.18-.91.23-1.38.13v-.18c.02-.74.06-1.55-.22-2.26C16.6 3.37 14.67 2 12.017 2z" /></svg>
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

              {/* Profile / Auth */}
              {user ? (
                <NavLink to="/profile" className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-forest/20 border border-forest/30 text-forest font-display text-sm hover:bg-forest/30 transition-all" aria-label="My Profile">
                  {user.name[0].toUpperCase()}
                </NavLink>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <a
                    href="https://momence.com/sign-in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium tracking-widest uppercase px-3 py-1.5 rounded-lg bg-forest text-white hover:bg-forest/80 transition-all"
                  >
                    Sign in
                  </a>
                  <a
                    href="https://momence.com/sign-up/visitor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/40 hover:text-white/70 transition-colors"
                  >
                    Sign up
                  </a>
                </div>
              )}

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
                {user ? (
                  <NavLink to="/profile" onClick={() => setMobileOpen(false)} className="py-3 px-2 text-sm font-medium tracking-wide text-forest flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-forest/20 border border-forest/30 flex items-center justify-center text-xs font-display">
                      {user.name[0].toUpperCase()}
                    </span>
                    My Profile
                  </NavLink>
                ) : (
                  <>
                    <a
                      href="https://momence.com/sign-in"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="py-3 px-2 text-sm font-medium tracking-wide text-white/70 border-b border-sand/50"
                    >
                      Sign in
                    </a>
                    <a
                      href="https://momence.com/sign-up/visitor"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="py-3 px-2 text-sm font-medium tracking-wide text-white/70"
                    >
                      Sign up
                    </a>
                  </>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
