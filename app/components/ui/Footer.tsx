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

function IconTiktok({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}

function IconSnapchat({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.017 2C9.33 2 7.4 3.37 6.57 5.46c-.28.71-.24 1.52-.22 2.26v.18c-.47.1-.96.05-1.38-.13-.18-.08-.38-.05-.5.1a.48.48 0 0 0-.06.5c.28.65.9 1.05 1.55 1.26-.04.17-.09.34-.14.51-.6 1.94-1.56 3.27-2.82 3.94a.49.49 0 0 0-.27.52c.04.24.23.42.47.46.8.13 1.38.43 1.75.89.18.22.16.47-.05.7-.32.35-.53.77-.53 1.21 0 .78.63 1.41 1.41 1.41.24 0 .47-.06.68-.17.7-.36 1.44-.54 2.2-.54.56 0 1.11.1 1.63.29.77.29 1.42.44 1.93.44s1.16-.15 1.93-.44c.52-.19 1.07-.29 1.63-.29.76 0 1.5.18 2.2.54.21.11.44.17.68.17.78 0 1.41-.63 1.41-1.41 0-.44-.21-.86-.53-1.21-.21-.23-.23-.48-.05-.7.37-.46.95-.76 1.75-.89.24-.04.43-.22.47-.46a.49.49 0 0 0-.27-.52c-1.26-.67-2.22-2-2.82-3.94-.05-.17-.1-.34-.14-.51.65-.21 1.27-.61 1.55-1.26a.48.48 0 0 0-.06-.5c-.12-.15-.32-.18-.5-.1-.42.18-.91.23-1.38.13v-.18c.02-.74.06-1.55-.22-2.26C16.6 3.37 14.67 2 12.017 2z" />
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
              Xén Pilates<br />
              Bingley Street<br />
              Bradford BD8 9AH
            </address>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/xenpilates/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="Instagram">
                <IconInstagram size={18} />
              </a>
              <a href="https://www.tiktok.com/@xenpilates?_r=1&_t=ZN-95EiDay9o8c" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="TikTok">
                <IconTiktok size={18} />
              </a>
              <a href="https://snapchat.com/t/zptcLgae" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="Snapchat">
                <IconSnapchat size={18} />
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
