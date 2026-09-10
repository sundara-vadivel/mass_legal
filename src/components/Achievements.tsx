"use client";

import { motion } from "framer-motion";

const FACTS = [
  { value: "2", label: "National Medals" },
  { value: "6×", label: "State Championship Medals" },
  { value: "TN", label: "Represented Tamil Nadu" },
];

export default function Achievements() {
  return (
    <section className="relative bg-cream text-ink px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs tracking-[0.2em] uppercase text-ink/50"
        >
          06 — Beyond the Courtroom
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-serif text-2xl md:text-4xl leading-snug max-w-2xl"
        >
          Before the courtroom, discipline was forged in the ring — a
          national-level boxer whose competitive career instilled the
          resilience he now brings to every case.
        </motion.p>

        <div className="mt-14 grid grid-cols-3 gap-6 md:gap-12 max-w-xl border-t border-ink/10 pt-10">
          {FACTS.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <span className="font-serif text-3xl md:text-4xl">
                {fact.value}
              </span>
              <p className="mt-2 font-sans text-xs tracking-wide uppercase text-ink/50">
                {fact.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}