"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useSectionProgress } from "@/lib/motion";

const PILLARS = [
  { label: "Mission", text: "To deliver comprehensive legal services rooted in integrity, professionalism, and client-focused solutions." },
  { label: "Vision", text: "To set a benchmark in the legal profession through ethical, innovative, client-centric representation." },
  { label: "Values", text: "Accessible justice, legal awareness, professional ethics, and strategic advocacy in every matter." },
];

function PillarItem({ pillar }: { pillar: { label: string; text: string } }) {
  const ref = useRef<HTMLDivElement>(null!);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 60%"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const style = prefersReducedMotion ? undefined : { y, opacity };

  return (
    <motion.div ref={ref} style={style} className="border-t border-cream/15 pt-6">
      <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
        {pillar.label}
      </span>
      <p className="mt-4 font-serif text-lg md:text-xl text-cream/90 leading-relaxed">
        {pillar.text}
      </p>
    </motion.div>
  );
}

export default function VisionMission() {
  const sectionRef = useRef<HTMLElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  const progress = useSectionProgress(sectionRef, ["start end", "start 0.3"]);
  const scale = useTransform(progress, [0, 1], [0.88, 1]);
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const inset = useTransform(progress, [0, 1], [8, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% round 12px)`);

  // Decorative background layer only — moves opposite/slower than the
  // content for depth. No content added, purely a texture element.
  const bgY = useTransform(progress, [0, 1], [-30, 30]);

  const headingY = useTransform(progress, [0.1, 0.7], [40, 0]);
  const headingOpacity = useTransform(progress, [0.1, 0.55], [0, 1]);

  const wrapperStyle = prefersReducedMotion ? undefined : { scale, opacity, clipPath };
  const headingStyle = prefersReducedMotion ? undefined : { y: headingY, opacity: headingOpacity };
  const bgStyle = prefersReducedMotion ? undefined : { y: bgY };

  return (
    <section
      ref={sectionRef}
      id="legacy"
      className="relative bg-charcoal text-cream px-6 md:px-12 py-24 md:py-40 overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        style={bgStyle}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      >
        <span className="select-none whitespace-nowrap font-serif italic text-[22vw] leading-none text-cream/[0.03]">
          MASS
        </span>
      </motion.div>

      <motion.div style={wrapperStyle} className="relative z-10 max-w-6xl mx-auto will-change-transform">
        <motion.div style={headingStyle}>
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
            04 — MASS Legal Associates
          </span>
          <h2 className="mt-8 font-serif italic text-3xl md:text-6xl leading-snug max-w-4xl">
            A firm built on the belief that justice is earned, not assumed.
          </h2>
          <p className="mt-8 max-w-2xl font-sans text-sm md:text-base text-cream/60 leading-relaxed">
            As President of MASS Legal Associates, Dr. Balaji Srinivasan leads a
            practice committed to accessible justice, legal awareness, and
            strategic representation across a wide range of civil and criminal
            matters.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {PILLARS.map((pillar) => (
            <PillarItem key={pillar.label} pillar={pillar} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}