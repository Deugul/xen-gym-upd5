import { Link } from "@remix-run/react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center ${className}`} aria-label="XEN Gym Home">
      <div className="leading-none text-left">
        <div className="font-display font-bold text-forest tracking-tighter" style={{ fontSize: "22px", lineHeight: 1 }}>
          XEN
        </div>
        <div className="font-body font-medium tracking-[0.3em] text-forest uppercase" style={{ fontSize: "8px", lineHeight: 1.4 }}>
          GYM
        </div>
      </div>
    </Link>
  );
}
