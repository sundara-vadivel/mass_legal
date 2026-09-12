"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useSectionProgress } from "@/lib/motion";

const STEPS = [
  {
    n: "01",
    title: "Listens before he advises",
    detail: "Hears the full picture and what outcome matters to you first.",
  },
  {
    n: "02",
    title: "Builds the case on record",
    detail: "Meticulous research shapes a strategy built for your matter.",
  },
  {
    n: "03",
    title: "Argues it with discipline",
    detail: "Measured, evidence-led advocacy — never overstated.",
  },
  {
    n: "04",
    title: "Keeps you inside the process",
    detail: "Plain-language updates, and honesty about the odds, always.",
  },
];

const TAGS = ["Litigation Strategy", "Court Advocacy", "Negotiation", "Client Relations"];

export default function OurApproach() {
  const sectionRef = useRef<HTMLElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  const progress = useSectionProgress(sectionRef, ["start end", "start 0.35"]);

  const x = useTransform(progress, [0, 1], [-100, 0]);
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const blurValue = useTransform(progress, [0, 0.7], [8, 0]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  const style = prefersReducedMotion ? undefined : { x, opacity, filter };

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream text-ink px-6 md:px-12 py-10 md:py-14 overflow-hidden"
    >
      <motion.div style={style} className="max-w-6xl mx-auto will-change-transform">
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-ink/50">
          05 — Approach
        </span>

        <h2 className="mt-4 font-serif italic text-2xl md:text-4xl leading-snug max-w-2xl">
          Not what he&apos;s qualified in. What it&apos;s like to work with him.
        </h2>

        <div className="mt-8 md:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {STEPS.map((step) => (
            <div key={step.n} className="border-t border-ink/10 pt-3">
              <span className="font-serif italic text-xs text-gold">{step.n}</span>
              <h3 className="mt-2 font-sans text-sm md:text-base font-medium leading-snug">
                {step.title}
              </h3>
              <p className="mt-1.5 font-sans text-xs md:text-sm text-ink/60 leading-snug">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 font-serif italic text-base md:text-xl leading-snug max-w-2xl border-l-2 border-gold pl-4 md:pl-6">
          Integrity isn&apos;t a value on a wall here — he tells clients the
          truth about their case, even when it&apos;s not what they want to
          hear.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {TAGS.map((item) => (
            <span
              key={item}
              className="font-sans text-[11px] md:text-xs border border-ink/15 rounded-full px-3 py-1.5 text-ink/50 hover:bg-ink hover:text-cream hover:border-ink transition-colors cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}