"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useSectionProgress } from "@/lib/motion";

function ScrubCounter({
  progress,
  target,
  suffix = "",
}: {
  progress: MotionValue<number>;
  target: number;
  suffix?: string;
}) {
  const raw = useTransform(progress, [0.15, 0.7], [0, target]);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(raw, "change", (v) => setDisplay(Math.round(v)));

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  const progress = useSectionProgress(sectionRef, ["start 0.8", "end 0.5"]);

  const y = useTransform(progress, [0, 0.3], [40, 0]);
  const opacity = useTransform(progress, [0, 0.3], [0, 1]);
  const style = prefersReducedMotion ? undefined : { y, opacity };

  return (
    <section ref={sectionRef} className="relative bg-cream text-ink px-6 md:px-12 py-24 md:py-32">
      <motion.div style={style} className="max-w-4xl mx-auto will-change-transform">
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-ink/50">
          06 — Beyond the Courtroom
        </span>

        <p className="mt-6 font-serif text-2xl md:text-4xl leading-snug max-w-2xl">
          Before the courtroom, discipline was forged in the ring — a
          national-level boxer whose competitive career instilled the
          resilience he now brings to every case.
        </p>

        <div className="mt-14 grid grid-cols-3 gap-6 md:gap-12 max-w-xl border-t border-ink/10 pt-10">
          <div>
            <span className="font-serif text-3xl md:text-4xl">
              {prefersReducedMotion ? "2" : <ScrubCounter progress={progress} target={2} />}
            </span>
            <p className="mt-2 font-sans text-xs tracking-wide uppercase text-ink/50">
              National Medals
            </p>
          </div>
          <div>
            <span className="font-serif text-3xl md:text-4xl">
              {prefersReducedMotion ? "6×" : <ScrubCounter progress={progress} target={6} suffix="×" />}
            </span>
            <p className="mt-2 font-sans text-xs tracking-wide uppercase text-ink/50">
              State Championship Medals
            </p>
          </div>
          <div>
            <span className="font-serif text-3xl md:text-4xl">TN</span>
            <p className="mt-2 font-sans text-xs tracking-wide uppercase text-ink/50">
              Represented Tamil Nadu
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}