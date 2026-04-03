import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
// billing toggle removed — prices shown at monthly rate
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Zap, Star, Crown, Users, Lock } from "lucide-react";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => [
  { title: "Membership — XEN Studio" },
  { name: "description", content: "Join XEN Studio. Choose a membership plan that works for you — drop-in, monthly or annual." },
];

const plans = [
  {
    id: "drop-in",
    icon: Zap,
    name: "1 off single class",
    tagline: "Try before you commit",
    price: { monthly: "18", annual: "18" },
    unit: "per class",
    highlight: false,
    features: [
      "Access to any single class",
      "All class types included",
      "No commitment required",
    ],
    notIncluded: [
      "Priority booking",
      "Guest passes",
    ],
    cta: "Book Now",
    to: "/book",
    external: false,
  },
  {
    id: "monthly-4",
    icon: Star,
    name: "4 classes a month",
    tagline: "Most popular",
    price: { monthly: "60", annual: "55" },
    unit: "per month",
    highlight: true,
    features: [
      "4 classes per month",
      "All class types included",
      "Priority booking",
      "Rollover 1 class per month",
    ],
    notIncluded: [],
    cta: "Book Now",
    to: "https://momence.com/X%C3%A9n-Pilates/membership/4-classes-a-month/710221",
    external: true,
  },
  {
    id: "monthly-8",
    icon: Crown,
    name: "8 classes a month",
    tagline: "Best value",
    price: { monthly: "110", annual: "99" },
    unit: "per month",
    highlight: false,
    badge: "Best Value",
    features: [
      "8 classes per month",
      "All class types included",
      "Priority booking",
      "Rollover 2 classes per month",
      "Cafe discount (10%)",
    ],
    notIncluded: [],
    cta: "Book Now",
    to: "https://momence.com/X%C3%A9n-Pilates/membership/8-classes-a-month/710222",
    external: true,
  },
  {
    id: "1to1",
    icon: Users,
    name: "1 to 1",
    tagline: "Personal training",
    price: { monthly: "45", annual: "45" },
    unit: "per session",
    highlight: false,
    features: [
      "Private one-to-one session",
      "Tailored programme",
      "All equipment included",
      "Flexible scheduling",
    ],
    notIncluded: [],
    cta: "Book Now",
    to: "https://momence.com/X%C3%A9n-Pilates/membership/1-to-1/710229",
    external: true,
  },
  {
    id: "studio-private",
    icon: Lock,
    name: "Studio private session",
    tagline: "Exclusive studio hire",
    price: { monthly: "95", annual: "95" },
    unit: "per session",
    highlight: false,
    badge: "Premium",
    features: [
      "Exclusive studio access",
      "Bring up to 4 guests",
      "Full equipment use",
      "Dedicated instructor",
      "Personalised class design",
    ],
    notIncluded: [],
    cta: "Book Now",
    to: "https://momence.com/X%C3%A9n-Pilates/membership/Book-the-studio-for-a-private-session-for-you-and-your-girls-(up-to-6)/710230",
    external: true,
  },
];

const faqs = [
  {
    q: "Can I freeze my membership?",
    a: "Yes. Monthly members can freeze for up to 4 weeks per year. Annual members can freeze for up to 8 weeks. Just drop us an email at xenpilatesx@gmail.com.",
  },
  {
    q: "What classes are included?",
    a: "All memberships include access to our full timetable: Reformer Pilates, HIIT, Strength, Yoga, Spin, Barre and more. Check the schedule for full details.",
  },
  {
    q: "Do I need to book in advance?",
    a: "Yes, all classes must be pre-booked. Members get priority access to booking windows.",
  },
  {
    q: "Is there a joining fee?",
    a: "No joining fee, ever. We believe in transparent pricing.",
  },
  {
    q: "Can I bring a friend?",
    a: "Monthly members receive 1 guest pass per month, Annual members receive 2. Additional guest passes can be purchased for £15 per class.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Monthly memberships can be cancelled with 30 days notice. Annual memberships are non-refundable but can be transferred to another person.",
  },
];

export default function MembershipPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative h-72 flex items-center justify-center bg-cream overflow-hidden rounded-b-[2.5rem] mx-2 mt-2">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/hero-membership.jpg')" }}
        />
        <div className="relative z-10 text-white px-4 w-full max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">Memberships</h1>
            <a
              href="https://momence.com/sign-in?hostId=230727"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start sm:self-auto border border-white/60 text-white text-xs sm:text-sm font-medium tracking-wide px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl hover:bg-white hover:text-forest transition-all duration-200 whitespace-nowrap"
            >
              Member Login
            </a>
          </div>
          <p className="text-white/70 max-w-lg text-sm sm:text-base">Choose a plan that fits your lifestyle. All classes, all levels.</p>
        </div>
      </section>


      {/* Plans */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-20 sm:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {plans.slice(0, 3).map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: plan.highlight ? 1.05 : 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: plan.highlight ? -6 : -4, transition: { duration: 0.25 } }}
                className={`relative flex flex-col p-8 rounded-3xl ${
                  plan.highlight
                    ? "bg-forest text-black shadow-2xl z-10"
                    : "bg-cream-200 border border-white/5 shadow-sm hover:shadow-lg transition-shadow duration-300"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-bark text-white text-xs px-4 py-1.5 tracking-widest uppercase whitespace-nowrap rounded-full">
                    {plan.badge}
                  </span>
                )}
                <div className={`w-11 h-11 flex items-center justify-center mb-5 rounded-xl ${plan.highlight ? "bg-black/20" : "bg-cream-100"}`}>
                  <Icon size={18} className={plan.highlight ? "text-black" : "text-forest"} />
                </div>
                <p className={`text-xs tracking-widest uppercase mb-1 ${plan.highlight ? "text-black/60" : "text-white/40"}`}>
                  {plan.tagline}
                </p>
                <h2 className="font-display text-2xl mb-4">{plan.name}</h2>
                <div className="mb-8">
                  <span className="font-display text-5xl inline-block">
                    £{plan.price.monthly}
                  </span>
                  <span className={`text-sm ml-1 ${plan.highlight ? "text-black/70" : "text-white/40"}`}>/{plan.unit}</span>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f, fi) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + fi * 0.04 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check size={14} className={`mt-0.5 flex-shrink-0 ${plan.highlight ? "text-black" : "text-forest"}`} />
                      {f}
                    </motion.li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className={`flex items-start gap-3 text-sm ${plan.highlight ? "text-black/40" : "text-white/30"}`}>
                      <span className="w-3.5 h-px mt-2 flex-shrink-0 bg-current" />
                      {f}
                    </li>
                  ))}
                </ul>

                {(plan as { external?: boolean }).external ? (
                  <a
                    href={plan.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${plan.highlight ? "btn-dark" : "btn-outline"} w-full text-center rounded-xl`}
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <Link
                    to={plan.to}
                    className={`${plan.highlight ? "btn-dark" : "btn-outline"} w-full text-center rounded-xl`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Personal / Private row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-10 md:max-w-2xl md:mx-auto">
          {plans.slice(3).map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="relative flex flex-col p-8 rounded-3xl bg-cream-200 border border-white/5 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-bark text-white text-xs px-4 py-1.5 tracking-widest uppercase whitespace-nowrap rounded-full">
                    {plan.badge}
                  </span>
                )}
                <div className="w-11 h-11 flex items-center justify-center mb-5 rounded-xl bg-cream-100">
                  <Icon size={18} className="text-forest" />
                </div>
                <p className="text-xs tracking-widest uppercase mb-1 text-white/40">{plan.tagline}</p>
                <h2 className="font-display text-2xl mb-4">{plan.name}</h2>
                <div className="mb-8">
                  <span className="font-display text-5xl inline-block">£{plan.price.monthly}</span>
                  <span className="text-sm ml-1 text-white/40">/{plan.unit}</span>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f, fi) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + fi * 0.04 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check size={14} className="mt-0.5 flex-shrink-0 text-forest" />
                      {f}
                    </motion.li>
                  ))}
                </ul>
                <a
                  href={plan.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full text-center rounded-xl"
                >
                  {plan.cta}
                </a>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
            <p className="text-xs tracking-widest uppercase text-white/40 mb-3">FAQs</p>
            <h2 className="font-display text-4xl">Common questions</h2>
          </motion.div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-cream-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-medium text-sm text-white">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`flex-shrink-0 text-forest transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-white/60 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-14 sm:py-20 text-center">
        <h2 className="font-display text-4xl mb-4">Still not sure?</h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">Try a single drop-in class first. No commitment, no pressure.</p>
        <Link to="/book" className="btn-ghost">Book a Drop-In Class</Link>
      </section>
    </>
  );
}
