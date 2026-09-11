"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useSectionProgress } from "@/lib/motion";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  // Reveal finishes at 35% into the section entering view, leaving the
  // rest of the scroll to just read the content normally.
  const progress = useSectionProgress(sectionRef, ["start end", "start 0.35"]);

  const x = useTransform(progress, [0, 1], [140, 0]);
  const scale = useTransform(progress, [0, 1], [0.94, 1]);
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const blurValue = useTransform(progress, [0, 0.7], [10, 0]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  const style = prefersReducedMotion ? undefined : { x, scale, opacity, filter };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-cream text-ink px-6 md:px-12 py-24 md:py-40 overflow-hidden"
    >
      <motion.div
        style={style}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 will-change-transform"
      >
        <span className="md:col-span-3 font-sans text-xs tracking-[0.2em] uppercase text-ink/50">
          01 — About
        </span>

        <div className="md:col-span-9">
          <p className="font-serif text-3xl md:text-5xl leading-snug">
            An advocate before the Madras High Court, an entrepreneur, and a
            former national-level boxer — Dr. Balaji Srinivasan brings
            discipline earned outside the courtroom into every case he takes.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl">
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
          </div>

          <div className="mt-14 aspect-[4/5] w-full max-w-sm bg-cream-soft border border-ink/10 flex items-center justify-center">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-ink/30">
              Portrait — placeholder
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}