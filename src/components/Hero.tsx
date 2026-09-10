"use client";

import { motion } from "framer-motion";

const headline = ["DR. BALAJI", "SRINIVASAN"];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen bg-charcoal text-cream flex flex-col justify-between overflow-hidden px-6 md:px-12 pt-32 pb-12"
    >
      <div className="flex-1 flex flex-col justify-center">
        {headline.map((line, i) => (
          <div key={line} className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: 0.2 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif font-light italic text-[13vw] md:text-[7vw] leading-[0.95] tracking-tight"
            >
              {line}
            </motion.h1>
          </div>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 max-w-md font-sans text-sm md:text-base text-cream/70 tracking-wide"
        >
          Advocate, Madras High Court — President, MASS Legal Associates.
          Justice earned through integrity, discipline, and relentless
          commitment.
        </motion.p>
      </div>

      <div className="flex items-end justify-between">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="font-sans text-xs tracking-[0.2em] uppercase text-cream/50"
        >
          Est. Practice — 2020
        </motion.span>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-cream/50">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-cream/40"
          />
        </motion.div>
      </div>
    </section>
  );
}