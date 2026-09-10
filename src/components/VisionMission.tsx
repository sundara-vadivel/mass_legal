"use client";

import { motion } from "framer-motion";

const PILLARS = [
  {
    label: "Mission",
    text: "To deliver comprehensive legal services rooted in integrity, professionalism, and client-focused solutions.",
  },
  {
    label: "Vision",
    text: "To set a benchmark in the legal profession through ethical, innovative, client-centric representation.",
  },
  {
    label: "Values",
    text: "Accessible justice, legal awareness, professional ethics, and strategic advocacy in every matter.",
  },
];

export default function VisionMission() {
  return (
    <section
      id="legacy"
      className="relative bg-charcoal text-cream px-6 md:px-12 py-24 md:py-40"
    >
      <div className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs tracking-[0.2em] uppercase text-gold"
        >
          04 — MASS Legal Associates
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-serif italic text-3xl md:text-6xl leading-snug max-w-4xl"
        >
          A firm built on the belief that justice is earned, not assumed.
        </motion.h2>

        <p className="mt-8 max-w-2xl font-sans text-sm md:text-base text-cream/60 leading-relaxed">
          As President of MASS Legal Associates, Dr. Balaji Srinivasan leads a
          practice committed to accessible justice, legal awareness, and
          strategic representation across a wide range of civil and criminal
          matters.
        </p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-t border-cream/15 pt-6"
            >
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
                {pillar.label}
              </span>
              <p className="mt-4 font-serif text-lg md:text-xl text-cream/90 leading-relaxed">
                {pillar.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}