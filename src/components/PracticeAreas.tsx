"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AREAS = [
  {
    title: "Civil Litigation",
    detail: "Representing clients through disputes with precision and strategic clarity.",
  },
  {
    title: "Criminal Law",
    detail: "Defending rights with rigorous preparation and ethical advocacy.",
  },
  {
    title: "Constitutional Law",
    detail: "Writ petitions and matters engaging fundamental rights before the High Court.",
  },
  {
    title: "Property & Real Estate",
    detail: "Title disputes, documentation, and real estate transaction advisory.",
  },
  {
    title: "Commercial Litigation",
    detail: "Resolving business disputes with a practical, outcome-focused approach.",
  },
  {
    title: "Contract Drafting",
    detail: "Precise, enforceable agreements tailored to each client's objectives.",
  },
  {
    title: "Arbitration & Mediation",
    detail: "Efficient dispute resolution outside traditional courtroom litigation.",
  },
  {
    title: "Consumer Protection",
    detail: "Advocating for consumer rights against unfair trade practices.",
  },
  {
    title: "Corporate Advisory",
    detail: "Strategic legal counsel for corporate governance and compliance.",
  },
  {
    title: "Human Rights",
    detail: "Committed representation in matters of fundamental human dignity.",
  },
];

export default function PracticeAreas() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="practice"
      className="relative bg-cream text-ink px-6 md:px-12 py-24 md:py-40"
    >
      <div className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs tracking-[0.2em] uppercase text-ink/50"
        >
          03 — Practice Areas
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 font-serif italic text-3xl md:text-5xl"
        >
          Where he practices.
        </motion.h2>

        <div className="mt-16">
          {AREAS.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group border-t border-ink/10 py-6 md:py-8 cursor-default"
            >
              <div className="flex items-baseline justify-between gap-6">
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="font-sans text-xs text-ink/40 w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-xl md:text-3xl group-hover:italic group-hover:text-ink transition-all">
                    {area.title}
                  </h3>
                </div>
                <motion.span
                  animate={{ rotate: hovered === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-sans text-lg text-ink/40 shrink-0"
                >
                  +
                </motion.span>
              </div>

              <AnimatePresence>
                {hovered === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="font-sans text-sm md:text-base text-ink/60 max-w-xl pl-10 md:pl-14 overflow-hidden"
                  >
                    {area.detail}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div className="border-t border-ink/10" />
        </div>
      </div>
    </section>
  );
}