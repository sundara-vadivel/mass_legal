"use client";

import { motion } from "framer-motion";

export default function ChairmansMessage() {
  return (
    <section className="relative bg-charcoal text-cream px-6 md:px-12 py-24 md:py-40">
      <div className="max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs tracking-[0.2em] uppercase text-gold"
        >
          A Word from the Chairman
        </motion.span>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-serif italic text-2xl md:text-4xl leading-relaxed text-cream/90"
        >
          &ldquo;I believe justice is earned — not assumed. Every client who
          walks through our doors carries a story that deserves discipline,
          honesty, and relentless preparation in return. That is the standard
          I hold myself and MASS Legal Associates to, in every matter, every
          time.&rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 flex items-center gap-6"
        >
          <div className="h-16 w-16 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center">
            <span className="font-sans text-[10px] tracking-widest uppercase text-cream/40">
              Sig.
            </span>
          </div>
          <div>
            <p className="font-serif text-lg text-cream">
              Dr. Balaji Srinivasan
            </p>
            <p className="font-sans text-xs tracking-widest uppercase text-cream/50">
              President, MASS Legal Associates
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}