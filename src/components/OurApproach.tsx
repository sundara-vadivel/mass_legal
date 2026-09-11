"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useSectionProgress } from "@/lib/motion";

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
  const sectionRef = useRef<HTMLElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  const progress = useSectionProgress(sectionRef, ["start end", "start 0.35"]);

  const x = useTransform(progress, [0, 1], [-140, 0]);
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const blurValue = useTransform(progress, [0, 0.7], [10, 0]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  const style = prefersReducedMotion ? undefined : { x, opacity, filter };

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream text-ink px-6 md:px-12 py-24 md:py-40 overflow-hidden"
    >
      <motion.div style={style} className="max-w-6xl mx-auto will-change-transform">
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-ink/50">
          05 — Approach
        </span>

        <h2 className="mt-6 font-serif italic text-3xl md:text-5xl max-w-2xl">
          How he approaches every matter.
        </h2>

        <div className="mt-16 flex flex-wrap gap-3 md:gap-4 max-w-4xl">
          {COMPETENCIES.map((item) => (
            <span
              key={item}
              className="font-sans text-sm md:text-base border border-ink/15 rounded-full px-5 py-2.5 hover:bg-ink hover:text-cream hover:border-ink transition-colors cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}