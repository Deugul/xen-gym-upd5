import { Link } from "@remix-run/react";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-forest text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-3">Stay in the flow</h2>
          <p className="text-white/70 text-sm mb-8 max-w-md mx-auto">
            Studio notes, fresh drops, and exclusive treats — nothing extra, just what you'll love.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm rounded-xl focus:outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-forest text-sm font-medium tracking-widest uppercase rounded-xl hover:bg-cream transition-colors"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-display font-bold text-2xl tracking-tighter mb-1">XEN</div>
            <div className="font-body font-medium tracking-[0.3em] text-white/60 uppercase text-xs mb-4">GYM</div>
            <address className="not-italic text-white/70 text-sm leading-relaxed">
              XEN Gym Studio<br />
              Broadway Retail Park<br />
              50 Queens Rd<br />
              Halifax HX1 3BJ
            </address>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-white/50 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/book", label: "Book a Class" },
                { to: "/shop", label: "Shop" },
                { to: "/cafe", label: "Cafe" },
                { to: "/membership", label: "Membership" },
                { to: "/about", label: "About Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-white/50 mb-4">Studio</h4>
            <ul className="space-y-2">
              {[
                { to: "/classes", label: "All Classes" },
                { to: "/instructors", label: "Instructors" },
                { to: "/shop/gift-cards", label: "Gift Cards" },
                { to: "/faqs", label: "FAQs" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-white/50 mb-4">Studio Hours</h4>
            <ul className="space-y-1.5 text-sm text-white/70">
              <li className="flex justify-between gap-4"><span>Mon – Fri</span><span>6:00 – 21:00</span></li>
              <li className="flex justify-between gap-4"><span>Saturday</span><span>7:00 – 18:00</span></li>
              <li className="flex justify-between gap-4"><span>Sunday</span><span>8:00 – 16:00</span></li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Email</p>
              <a href="mailto:hello@xengym.co.uk" className="text-sm text-white/70 hover:text-white transition-colors">
                hello@xengym.co.uk
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© 2026 XEN Gym. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
