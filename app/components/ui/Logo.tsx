import { Link } from "@remix-run/react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center ${className}`} aria-label="XEN Gym Home">
      <img
        src="/xen-logo.png"
        alt="XEN"
        className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
      />
    </Link>
  );
}
