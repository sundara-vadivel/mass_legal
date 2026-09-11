"use client";

import { useScroll, useSpring, type MotionValue } from "framer-motion";
import type { RefObject } from "react";


export const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];


interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

/**
 * Scroll progress scoped to a single section, lightly spring-smoothed.
 * Lenis (SmoothScroll.tsx) already smooths raw scroll input, so this
 * spring is only removing spring-mass jitter — not stacking a second
 * heavy smoothing layer on top, which would read as laggy.
 *
 * Default offset ["start end", "start start"]: progress is 0 the moment
 * the section's top enters the viewport bottom, 1 once its top reaches
 * the viewport top. Pass an earlier second stop (e.g. "start 0.4") to
 * have the reveal finish while there's still room left to scroll
 * through the section's own content.
 */
export function useSectionProgress(
  ref: RefObject<HTMLElement>,
  offset: [string, string] = ["start end", "start start"],
  spring: SpringConfig = {}
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    // Framer Motion's offset type is a narrow string-literal union;
    // this helper intentionally accepts any valid pair as plain strings.
    offset: offset as never,
  });

  return useSpring(scrollYProgress, {
    stiffness: spring.stiffness ?? 200,
    damping: spring.damping ?? 30,
    mass: spring.mass ?? 0.2,
  });
}