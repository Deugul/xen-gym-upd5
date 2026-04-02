import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Hero } from "~/components/sections/Hero";
import { About } from "~/components/sections/About";
import { FeatureCards } from "~/components/sections/FeatureCards";
import { GiftCard } from "~/components/sections/GiftCard";
import { Testimonials } from "~/components/sections/Testimonials";
import { GymBanner } from "~/components/sections/GymBanner";
import { InstagramGrid } from "~/components/sections/InstagramGrid";

export const meta: MetaFunction = () => [
  { title: "XEN Studio — Find Your Ground | Halifax, West Yorkshire" },
  { name: "description", content: "Premium gym and reformer pilates studio in Halifax. Strength training, HIIT, yoga, spin and more. Find your ground at XEN." },
];

export default function Index() {
  return (
    <>
      <Hero />
      <About />
      <FeatureCards />
      <GiftCard />
      <Testimonials />
      <section className="bg-cream py-20 text-center">
        <p className="text-xs tracking-widest uppercase text-forest mb-3">Support</p>
        <h2 className="font-display text-4xl sm:text-5xl mb-4">Got questions?</h2>
        <p className="text-white/60 mb-8 max-w-md mx-auto">Everything you need to know about classes, bookings and the studio.</p>
        <Link to="/faq" className="btn-ghost">View FAQs</Link>
      </section>
      <GymBanner />
      <InstagramGrid />
    </>
  );
}
