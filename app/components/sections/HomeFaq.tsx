import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="border-b border-sand/60 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
      >
        <span className="font-medium text-sm text-white group-hover:text-forest transition-colors duration-200">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-forest"
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-white/50 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function HomeFaq() {
  return (
    <section className="bg-sand py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-widest uppercase text-white/40 mb-3">Got questions?</p>
          <h2 className="font-display text-4xl sm:text-5xl">We have answers.</h2>
        </motion.div>

        {/* Stacked sections */}
        <div className="max-w-3xl mx-auto space-y-20">
          {sections.map((section, si) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: si * 0.08 }}
            >
              {/* Section heading */}
              <div className="mb-8">
                <span className="text-xs tracking-widest uppercase text-white/40">0{si + 1}</span>
                <h3 className="font-display text-3xl sm:text-4xl mt-1">{section.heading}</h3>
                <div className="w-10 h-px bg-forest mt-3" />
              </div>

              {/* Accordion card */}
              <div className="bg-cream-200 rounded-2xl px-6 sm:px-8 border border-white/5">
                {section.faqs.map((faq, fi) => (
                  <AccordionItem key={faq.q} q={faq.q} a={faq.a} index={fi} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
