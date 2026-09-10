"use client";

import { motion } from "framer-motion";

export default function ChapterWipe({ title }: { title: string }) {
  return (
    <section className="relative bg-charcoal text-cream min-h-[60vh] flex items-center justify-center px-6 overflow-hidden">
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic text-[12vw] md:text-[6vw] leading-none text-cream/90 text-center"
        >
          {title}
        </motion.h2>
      </div>
    </section>
  );
}