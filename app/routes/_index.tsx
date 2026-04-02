import type { MetaFunction } from "@remix-run/node";
import { Hero } from "~/components/sections/Hero";
import { About } from "~/components/sections/About";
import { FeatureCards } from "~/components/sections/FeatureCards";
import { GiftCard } from "~/components/sections/GiftCard";
import { Testimonials } from "~/components/sections/Testimonials";
import { InstagramGrid } from "~/components/sections/InstagramGrid";
import { GymBanner } from "~/components/sections/GymBanner";
import { FaqTeaser } from "~/components/sections/FaqTeaser";

export const meta: MetaFunction = () => [
  { title: "XEN Gym — Find Your Ground | Halifax, West Yorkshire" },
  { name: "description", content: "Premium gym and reformer pilates studio in Halifax. Strength training, HIIT, yoga, spin and more. Find your ground at XEN." },
];

export default function Index() {
  return (
    <>
      <Hero />
      <About />
      <FeatureCards />
      <GiftCard />
      <FaqTeaser />
      <Testimonials />
      <GymBanner />
      <InstagramGrid />
    </>
  );
}
