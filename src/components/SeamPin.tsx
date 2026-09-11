"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

interface SeamPinProps {
  outgoing: ReactNode;
  incoming: ReactNode;
  /** Extra scroll room (in vh) the pin holds for, beyond one viewport. */
  bufferVh?: number;
  /** Bg class applied to the pinned stage so empty space around shorter
   *  content still reads as one continuous panel (e.g. "bg-charcoal"). */
  stageClassName?: string;
}

/**
 * A true "overlap" transition: `outgoing` stays visually pinned (sticky)
 * while `incoming` slides up on top of it as the user scrolls through a
 * buffer zone, then normal document flow resumes. Only use this when
 * `outgoing`'s content comfortably fits one viewport — it's rendered
 * inside a `h-screen overflow-hidden` stage, so taller content would clip.
 */
export default function SeamPin({
  outgoing,
  incoming,
  bufferVh = 70,
  stageClassName = "",
}: SeamPinProps) {
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

  const outScale = useTransform(progress, [0, 1], [1, 0.94]);
  const outOpacity = useTransform(progress, [0, 1], [1, 0.85]);
  const outBlurValue = useTransform(progress, [0, 1], [0, 6]);
  const outFilter = useTransform(outBlurValue, (v) => `blur(${v}px)`);

  const inYValue = useTransform(progress, [0, 1], [bufferVh, 0]);
  const inY = useTransform(inYValue, (v) => `${v}vh`);

  if (prefersReducedMotion) {
    // No scroll-jacking for reduced-motion users — just stack normally.
    return (
      <>
        {outgoing}
        {incoming}
      </>
    );
  }

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative"
        style={{ height: `calc(100vh + ${bufferVh}vh)` }}
      >
        <div
          className={`sticky top-0 z-0 h-screen w-full overflow-hidden flex items-center justify-center ${stageClassName}`}
        >
          <motion.div
            style={{ scale: outScale, opacity: outOpacity, filter: outFilter }}
            className="w-full will-change-transform"
          >
            {outgoing}
          </motion.div>
        </div>
      </div>

      <motion.div
        style={{ y: inY, marginTop: `-${bufferVh}vh` }}
        className="relative z-10 will-change-transform"
      >
        {incoming}
      </motion.div>
    </>
  );
}