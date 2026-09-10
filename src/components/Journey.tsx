"use client";

import { motion } from "framer-motion";

const MILESTONES = [
  {
    year: "2013",
    label: "Academic Foundation",
    detail:
      "B.Sc. Psychology, B.Tech Information Technology, and M.A. Human Rights — building a multidisciplinary lens ahead of law.",
  },
  {
    year: "2020",
    label: "Called to Practice",
    detail:
      "Commenced practice before the Madras High Court, taking on civil, criminal, constitutional, and commercial matters.",
  },
  {
    year: "2023",
    label: "President, MASS Legal Associates",
    detail:
      "Began leading MASS Legal Associates, expanding client-focused legal services and mentorship for junior advocates.",
  },
  {
    year: "Present",
    label: "Madras High Court Practice",
    detail:
      "Continues active litigation, advisory, and strategic legal planning across a wide range of practice areas.",
  },
];

export default function Journey() {
  return (
    <section id="journey" className="relative bg-charcoal text-cream px-6 md:px-12 py-24 md:py-40">
      <div className="max-w-5xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs tracking-[0.2em] uppercase text-gold"
        >
          02 — Journey
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 font-serif italic text-3xl md:text-5xl"
        >
          A path built on preparation.
        </motion.h2>

        <div className="mt-20 flex flex-col">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-t border-cream/15"
            >
              <span className="md:col-span-3 font-serif text-4xl md:text-5xl text-gold">
                {m.year}
              </span>
              <span className="md:col-span-3 font-sans text-sm tracking-wide uppercase text-cream/90 self-center">
                {m.label}
              </span>
              <p className="md:col-span-6 font-sans text-sm md:text-base text-cream/60 leading-relaxed self-center">
                {m.detail}
              </p>
            </motion.div>
          ))}
          <div className="border-t border-cream/15" />
        </div>
      </div>
    </section>
  );
}