import { Link } from "@remix-run/react";

function IconInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconYoutube({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-cream">
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
              className="px-8 py-3 bg-white text-forest text-sm font-medium tracking-widest uppercase rounded-xl hover:bg-gray-100 transition-colors"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-display font-bold text-2xl tracking-tighter mb-1">XEN</div>
            <div className="font-body font-medium tracking-[0.3em] text-white/60 uppercase text-xs mb-4">Studio</div>
            <address className="not-italic text-white/70 text-sm leading-relaxed">
              XEN Studio<br />
              Broadway Retail Park<br />
              50 Queens Rd<br />
              Halifax HX1 3BJ
            </address>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="Instagram">
                <IconInstagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="Facebook">
                <IconFacebook size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="YouTube">
                <IconYoutube size={18} />
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
                { to: "/membership", label: "Membership" },
                { to: "/faq", label: "FAQ" },
                { to: "/shop/gift-cards", label: "Gift Cards" },
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
              <li className="flex justify-between gap-4"><span>Mon – Fri</span><span>8am – 9pm</span></li>
              <li className="flex justify-between gap-4"><span>Saturday</span><span>8am – 1pm</span></li>
              <li className="flex justify-between gap-4"><span>Sunday</span><span>8am – 1pm</span></li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Email</p>
              <a href="mailto:xenpilatesx@gmail.com" className="text-sm text-white/70 hover:text-white transition-colors">
                xenpilatesx@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© 2026 XEN Studio. All rights reserved.</p>
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
