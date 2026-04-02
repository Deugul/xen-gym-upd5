import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const meta: MetaFunction = () => [
  { title: "FAQs — XEN Studio" },
  { name: "description", content: "Answers to common questions about XEN Studio — classes, bookings, the studio and getting started." },
];

const sections = [
  {
    heading: "Getting Started",
    faqs: [
      {
        q: "What is reformer pilates?",
        a: "Reformer Pilates is a full-body workout performed on a specialised machine called a reformer. Using springs for resistance and a moving carriage, it helps you build strength, improve posture, increase flexibility and activate your core in a controlled, low-impact way. Think of it as strength training meets mindful movement — challenging, energising and surprisingly enjoyable.",
      },
      {
        q: "Never done pilates — is this for me?",
        a: "Absolutely. Reformer Pilates is perfect for beginners. The machine supports your body while you move, which makes exercises easier to learn and safer to perform. Our classes are designed to guide you step-by-step, so you will quickly gain confidence while getting stronger and feeling amazing. Everyone starts somewhere — and we will be with you every step of the way.",
      },
      {
        q: "Any advice? I am nervous!",
        a: "Come as you are and do not worry about being fit enough — that is what Pilates is for. Wear comfortable workout clothes, bring some grip socks if you have them (if not, we sell them in the studio) and arrive a few minutes early so we can show you around the reformer. Most importantly, listen to your body, take your time and enjoy the experience. By the end of the class you will feel stronger, longer and probably already planning your next session.",
      },
    ],
  },
  {
    heading: "The Class",
    faqs: [
      {
        q: "What do I need to bring?",
        a: "Just bring yourself and some grip socks (no slipping on the reformer!). If you do not have any, do not worry — we have some available at the studio to purchase.",
      },
      {
        q: "What do I wear?",
        a: "Anything you feel comfortable moving in. Think leggings, shorts or gym wear that allows you to stretch and move easily. Avoid anything too loose so our instructors can help with your form.",
      },
      {
        q: "How do I cancel or reschedule my class?",
        a: "Life happens. Simply cancel or reschedule through your booking account, giving at least 24 hours notice. Quick and easy.",
      },
      {
        q: "How long are the classes?",
        a: "All of our classes are 45 minutes of strength, stretch and feel-good movement on the reformer — just enough to challenge you and leave you feeling amazing.",
      },
    ],
  },
  {
    heading: "The Studio",
    faqs: [
      {
        q: "Is it women only?",
        a: "Yes. Our classes are women only, creating a comfortable, supportive space where you can move, build confidence and feel good in your body.",
      },
      {
        q: "Where are you based?",
        a: "You will find us at Bingley Street, Bradford, BD8 9AH — a boutique space designed for small, welcoming Reformer Pilates classes.",
      },
      {
        q: "Do you have parking?",
        a: "Yes. There is free street parking available nearby, so getting to class is easy and stress-free.",
      },
      {
        q: "What else do you offer?",
        a: "Alongside our Reformer Pilates classes, we also offer membership packages, 1-to-1 sessions and private group bookings — perfect for a personalised session or a fun workout with friends.",
      },
      {
        q: "Do you do membership packages?",
        a: "We do. You can choose from monthly class packages to help you stay consistent and make Pilates part of your routine.",
      },
    ],
  },
];

function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="border-b border-sand last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-medium text-sm sm:text-base text-white group-hover:text-forest transition-colors duration-200">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-forest"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-white/60 leading-relaxed max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-56 sm:h-64 flex items-center justify-center bg-cream overflow-hidden rounded-b-[2.5rem] mx-2 mt-2">
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-xs tracking-widest uppercase text-white/60 mb-3">XEN Studio</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">FAQs</h1>
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 space-y-20">
        {sections.map((section, si) => (
          <motion.div
            key={section.heading}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: si * 0.1 }}
          >
            {/* Section heading */}
            <div className="mb-8">
              <span className="text-xs tracking-widest uppercase text-white/40">0{si + 1}</span>
              <h2 className="font-display text-3xl sm:text-4xl mt-1">{section.heading}</h2>
              <div className="w-10 h-px bg-forest mt-3" />
            </div>

            {/* Accordion */}
            <div className="bg-cream-200 rounded-2xl px-6 sm:px-8 border border-white/5">
              {section.faqs.map((faq, fi) => (
                <AccordionItem key={faq.q} q={faq.q} a={faq.a} index={fi} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <section className="bg-cream py-16 text-center">
        <h2 className="font-display text-3xl sm:text-4xl mb-4">Ready to start?</h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto text-sm">Book your first class today — no experience needed.</p>
        <a
          href="https://momence.com/sign-in?hostId=230727"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          Book a Class
        </a>
      </section>
    </>
  );
}
