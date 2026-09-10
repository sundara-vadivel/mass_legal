"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-cream text-ink px-6 md:px-12 py-24 md:py-40"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-3 font-sans text-xs tracking-[0.2em] uppercase text-ink/50"
        >
          01 — About
        </motion.span>

        <div className="md:col-span-9">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl md:text-5xl leading-snug"
          >
            An advocate before the Madras High Court, an entrepreneur, and a
            former national-level boxer — Dr. Balaji Srinivasan brings
            discipline earned outside the courtroom into every case he takes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl"
          >
            <p className="font-sans text-sm md:text-base text-ink/70 leading-relaxed">
              Since commencing practice in 2020, he has represented clients
              across civil, criminal, constitutional, commercial, and
              corporate matters — with meticulous research and unwavering
              integrity at the center of every brief.
            </p>
            <p className="font-sans text-sm md:text-base text-ink/70 leading-relaxed">
              Before law, he spent over a decade in India&apos;s event
              industry as a production specialist and DJ, and represented
              Tamil Nadu as a national-medal boxer — experience that shapes
              his strategic, disciplined approach to advocacy today.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 aspect-[4/5] w-full max-w-sm bg-cream-soft border border-ink/10 flex items-center justify-center"
          >
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-ink/30">
              Portrait — placeholder
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}