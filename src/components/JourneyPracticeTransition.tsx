"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export default function JourneyPracticeTransition({
  bufferVh = 60,
}: {
  bufferVh?: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.2,
  });

  const leftX = useTransform(progress, [0.15, 1], ["0%", "-100%"]);
  const rightX = useTransform(progress, [0.15, 1], ["0%", "100%"]);

  const zoomScale = useTransform(progress, [0, 0.65], [0.4, 1.6]);
  const zoomOpacity = useTransform(progress, [0, 0.3, 0.65], [0, 0.5, 0]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: `calc(100vh + ${bufferVh}vh)` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-cream flex items-center justify-center">
        <motion.span
          aria-hidden="true"
          style={{ scale: zoomScale, opacity: zoomOpacity }}
          className="absolute select-none whitespace-nowrap font-serif italic text-[22vw] leading-none tracking-[-0.06em] text-ink/40 will-change-transform"
        >
          COUNSEL
        </motion.span>

        <motion.div
          aria-hidden="true"
          style={{ x: leftX }}
          className="absolute inset-y-0 left-0 z-10 w-1/2 bg-charcoal will-change-transform"
        />
        <motion.div
          aria-hidden="true"
          style={{ x: rightX }}
          className="absolute inset-y-0 right-0 z-10 w-1/2 bg-charcoal will-change-transform"
        />
      </div>
    </div>
  );
}