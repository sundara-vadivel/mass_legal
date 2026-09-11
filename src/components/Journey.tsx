"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { useSectionProgress } from "@/lib/motion";

const MILESTONES = [
  {
    year: "2013",
    label: "Academic Foundation",
    detail:
      "B.Sc. Psychology, B.Tech Information Technology, and M.A. Human Rights — building a multidisciplinary lens ahead of law.",
  },
  {
    year: "2020",
    label: "Called to Practice",
    detail:
      "Commenced practice before the Madras High Court, taking on civil, criminal, constitutional, and commercial matters.",
  },
  {
    year: "2023",
    label: "President, MASS Legal Associates",
    detail:
      "Began leading MASS Legal Associates, expanding client-focused legal services and mentorship for junior advocates.",
  },
  {
    year: "Present",
    label: "Madras High Court Practice",
    detail:
      "Continues active litigation, advisory, and strategic legal planning across a wide range of practice areas.",
  },
];

function MilestoneRow({
  milestone,
  index,
  total,
  draw,
  reduced,
}: {
  milestone: (typeof MILESTONES)[number];
  index: number;
  total: number;
  draw: MotionValue<number>;
  reduced: boolean;
}) {
  const start = index / total;
  const end = (index + 0.7) / total;
  const opacity = useTransform(draw, [start, end], [0.2, 1]);
  const x = useTransform(draw, [start, end], [-20, 0]);
  const style = reduced ? undefined : { opacity, x };

  return (
    <motion.div
      style={style}
      className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-t border-cream/15"
    >
      <span className="md:col-span-3 font-serif text-4xl md:text-5xl text-gold">
        {milestone.year}
      </span>
      <span className="md:col-span-3 font-sans text-sm tracking-wide uppercase text-cream/90 self-center">
        {milestone.label}
      </span>
      <p className="md:col-span-6 font-sans text-sm md:text-base text-cream/60 leading-relaxed self-center">
        {milestone.detail}
      </p>
    </motion.div>
  );
}

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  // Spans the section's own scroll length so the line keeps drawing as
  // you scroll through the milestones, not just on entrance.
  const draw = useSectionProgress(sectionRef, ["start 0.75", "end 0.4"]);

  const lineScale = useTransform(draw, [0, 1], [0, 1]);
  const headingOpacity = useTransform(draw, [0, 0.15], [0, 1]);
  const headingY = useTransform(draw, [0, 0.15], [24, 0]);

  const lineStyle = prefersReducedMotion ? undefined : { scaleY: lineScale };
  const headingStyle = prefersReducedMotion ? undefined : { opacity: headingOpacity, y: headingY };

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative bg-charcoal text-cream px-6 md:px-12 py-24 md:py-40"
    >
      <div className="max-w-5xl mx-auto">
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
          02 — Journey
        </span>

        <motion.h2 style={headingStyle} className="mt-6 font-serif italic text-3xl md:text-5xl">
          A path built on preparation.
        </motion.h2>

        <div className="relative mt-20">
          <motion.div
            aria-hidden="true"
            style={lineStyle}
            className="absolute left-0 top-0 h-full w-px origin-top bg-gold/60"
          />
          <div className="flex flex-col pl-6 md:pl-10">
            {MILESTONES.map((m, i) => (
              <MilestoneRow
                key={m.year}
                milestone={m}
                index={i}
                total={MILESTONES.length}
                draw={draw}
                reduced={!!prefersReducedMotion}
              />
            ))}
            <div className="border-t border-cream/15" />
          </div>
        </div>
      </div>
    </section>
  );
}