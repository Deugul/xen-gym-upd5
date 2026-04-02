import type { MetaFunction } from "@remix-run/node";
import { useEffect } from "react";

export const meta: MetaFunction = () => [
  { title: "Book a Class — XEN Gym" },
  { name: "description", content: "Browse and book classes at XEN Gym. Reformer, HIIT, Yoga, Spin and more." },
];

export default function BookPage() {
  useEffect(() => {
    // Load Momence widget script once
    if (document.getElementById("momence-script")) return;
    const script = document.createElement("script");
    script.id = "momence-script";
    script.src = "https://momence.com/widget/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative h-64 flex items-center justify-center bg-forest overflow-hidden rounded-b-[2.5rem] mx-2 mt-2">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1400&q=80')" }}
        />
        <div className="relative z-10 text-center text-white">
          <p className="text-xs tracking-widest uppercase text-white/60 mb-2">XEN Gym</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">Book a Class</h1>
        </div>
      </section>

      {/* Momence widget */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div
          className="momence-widget"
          data-host-id="230727"
          style={{ minHeight: "600px" }}
        />
      </div>
    </>
  );
}
