"use client";

import { motion } from "framer-motion";

const COMPETENCIES = [
  "Litigation Strategy",
  "Court Advocacy",
  "Legal Research",
  "Corporate Advisory",
  "Negotiation & Mediation",
  "Public Speaking",
  "Human Rights Advocacy",
  "Strategic Planning",
  "Client Relationship Management",
  "Technology Integration",
];

export default function OurApproach() {
  return (
    <section className="relative bg-cream text-ink px-6 md:px-12 py-24 md:py-40">
      <div className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs tracking-[0.2em] uppercase text-ink/50"
        >
          05 — Approach
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-serif italic text-3xl md:text-5xl max-w-2xl"
        >
          How he approaches every matter.
        </motion.h2>

        <div className="mt-16 flex flex-wrap gap-3 md:gap-4 max-w-4xl">
          {COMPETENCIES.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="font-sans text-sm md:text-base border border-ink/15 rounded-full px-5 py-2.5 hover:bg-ink hover:text-cream hover:border-ink transition-colors cursor-default"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}