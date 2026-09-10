"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-charcoal text-cream px-6 md:px-12 py-24 md:py-40 min-h-screen flex flex-col justify-between"
    >
      <div>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs tracking-[0.2em] uppercase text-gold"
        >
          07 — Get in Touch
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-serif italic text-4xl md:text-7xl leading-[1.05] max-w-4xl"
        >
          Committed to justice.
          <br />
          Dedicated to excellence.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl border-t border-cream/15 pt-10"
        >
          <div>
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-cream/40">
              Email
            </span>
            <p className="mt-2 font-serif text-lg">contact@masslegal.in</p>
          </div>
          <div>
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-cream/40">
              Phone
            </span>
            <p className="mt-2 font-serif text-lg">+91 00000 00000</p>
          </div>
          <div>
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-cream/40">
              Chambers
            </span>
            <p className="mt-2 font-serif text-lg">Madras High Court, Chennai</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-t border-cream/15 pt-8"
      >
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-cream/40">
          MASS Legal Associates
        </p>
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-cream/40">
          © {new Date().getFullYear()} Dr. Balaji Srinivasan. All rights reserved.
        </p>
      </motion.div>
    </section>
  );
}