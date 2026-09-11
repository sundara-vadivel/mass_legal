"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useSectionProgress } from "@/lib/motion";

export default function ChairmansMessage() {
  const sectionRef = useRef<HTMLElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  const progress = useSectionProgress(sectionRef, ["start end", "start 0.35"]);

  const insetValue = useTransform(progress, [0, 1], [30, 0]);
  const clipPath = useTransform(insetValue, (v) => `inset(${v}% 0% ${v}% 0% round 16px)`);
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const scale = useTransform(progress, [0, 1], [0.97, 1]);
  const markY = useTransform(progress, [0, 1], [40, -20]);

  const wrapperStyle = prefersReducedMotion ? undefined : { clipPath, opacity, scale };
  const markStyle = prefersReducedMotion ? undefined : { y: markY };

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal text-cream px-6 md:px-12 py-24 md:py-40 overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        style={markStyle}
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none font-serif text-[40vw] leading-none text-cream/[0.04]"
      >
        &ldquo;
      </motion.div>

      <motion.div
        style={wrapperStyle}
        className="relative z-10 max-w-4xl mx-auto will-change-transform"
      >
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
          A Word from the Chairman
        </span>

        <blockquote className="mt-8 font-serif italic text-2xl md:text-4xl leading-relaxed text-cream/90">
          &ldquo;I believe justice is earned — not assumed. Every client who
          walks through our doors carries a story that deserves discipline,
          honesty, and relentless preparation in return. That is the standard
          I hold myself and MASS Legal Associates to, in every matter, every
          time.&rdquo;
        </blockquote>

        <div className="mt-14 flex items-center gap-6">
          <div className="h-16 w-16 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center">
            <span className="font-sans text-[10px] tracking-widest uppercase text-cream/40">
              Sig.
            </span>
          </div>
          <div>
            <p className="font-serif text-lg text-cream">Dr. Balaji Srinivasan</p>
            <p className="font-sans text-xs tracking-widest uppercase text-cream/50">
              President, MASS Legal Associates
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}