"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/*
|------------------------------------------------------------------------
| STATIC TIMELINE CONSTANTS
|------------------------------------------------------------------------
|
| Everything that doesn't depend on measured viewport width lives here,
| at module scope, so it's created once (not re-allocated every render)
| and so every curve that's meant to move "together" visibly shares the
| same breakpoints. Only the horizontal "left" targets depend on actual
| pixel width (see `groupLeft` inside the component) — everything else
| below is pure percentage / vh / scale math.
|
| 0.00 – 0.22   name+label own the screen, centered
| 0.22 – 0.55   shrinking + drifting toward the left rail
| 0.55 – 0.78   settling into its resting, left-aligned position
| 0.78 – 1.00   hero holds — composition is finished, scroll continues
|
*/

// NOTE: framer-motion's `useTransform` wants mutable arrays for both the
// input range and the output range — `as const` tuples get rejected as
// readonly, so these are deliberately plain (mutable) array literals.

const T = [0, 0.22, 0.5, 0.68, 0.78];

const GROUP_X = ["-50%", "-50%", "-43%", "-20%", "0%"];
const GROUP_SCALE = [1.18, 1.08, 0.96, 0.82, 0.72];
const GROUP_Y = ["0vh", "-1vh", "-4vh", "-8vh", "-8vh"];
const GROUP_TRACKING = ["-0.045em", "-0.03em", "-0.025em", "-0.015em", "-0.01em"];
const GROUP_OPACITY = [1, 1, 1, 0.96, 0.96];
const LABEL_OPACITY_STOPS = [0, 0.12, 0.3];
const LABEL_OPACITY = [0, 0.6, 1];

const BG_SCALE_STOPS = [0, 0.35, 0.65, 0.78];
const BG_SCALE = [1.2, 1.08, 1, 0.96];
const BG_OPACITY_STOPS = [0, 0.15, 0.4, 0.7, 0.78, 1];
const BG_OPACITY = [0, 0.025, 0.05, 0.07, 0.08, 0.08];

const LIGHT_OPACITY_STOPS = [0, 0.25, 0.55, 0.78, 1];
const LIGHT_OPACITY = [0.02, 0.045, 0.07, 0.1, 0.1];
const LIGHT_SCALE_STOPS = [0, 0.4, 0.78, 1];
const LIGHT_SCALE = [0.8, 1, 1.15, 1.15];

const DESC_OPACITY_STOPS = [0.38, 0.5, 0.7, 0.78, 1];
const DESC_OPACITY = [0, 0.5, 1, 1, 1];
const DESC_Y_STOPS = [0.38, 0.55, 0.78];
const DESC_Y = ["40px", "0px", "0px"];
const DESC_X = ["35px", "0px", "0px"];
// Fully-formed `blur(...)` strings — never interpolate a MotionValue
// inside a template literal, it stringifies to "[object Object]".
const DESC_BLUR_STOPS = [0.38, 0.55];
const DESC_BLUR = ["blur(8px)", "blur(0px)"];

const PRACTICE_OPACITY_STOPS = [0.52, 0.66, 0.78, 1];
const PRACTICE_OPACITY = [0, 0.7, 1, 1];
const PRACTICE_Y_STOPS = [0.52, 0.68];
const PRACTICE_Y = ["25px", "0px"];

const SCROLL_OPACITY_STOPS = [0, 0.08, 0.18];
const SCROLL_OPACITY = [1, 0.5, 0];

const PROGRESS_STOPS = [0, 0.78, 1];
const PROGRESS_SCALE = [0, 1, 1];

const MOBILE_BREAKPOINT = 768;
const DESKTOP_WIDTH_FALLBACK = 1280;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  /*
  |--------------------------------------------------------------------------
  | VIEWPORT WIDTH (only needed for the final left-aligned resting position)
  |--------------------------------------------------------------------------
  |
  | Lazily initialized from window.innerWidth where available, so the very
  | first client render already has a sane value instead of 0 — that's
  | what previously caused the name to flash to the left edge on load.
  | `mounted` gates opacity for the first frame as an extra safety net in
  | case the SSR-rendered fallback differs from the real width.
  |
  */

  // Always start from the SSR-safe fallback so the server-rendered HTML and
// the client's first (hydration) render match exactly. The real width is
// applied a moment later, once mounted — that's a normal post-hydration
// update, not a mismatch.
const [viewportWidth, setViewportWidth] = useState(DESKTOP_WIDTH_FALLBACK);

useEffect(() => {
  setViewportWidth(window.innerWidth);
  const updateViewport = () => setViewportWidth(window.innerWidth);
  window.addEventListener("resize", updateViewport);
  return () => window.removeEventListener("resize", updateViewport);
}, []);

  const finalLeft = viewportWidth < MOBILE_BREAKPOINT ? 24 : 48;

  /*
  |--------------------------------------------------------------------------
  | SCROLL PROGRESS
  |--------------------------------------------------------------------------
  */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Lenis (see SmoothScroll.tsx) already smooths raw scroll input, so this
  // spring is intentionally light — just enough to soften spring-mass
  // jitter without stacking two heavy smoothing layers on top of each
  // other, which reads as laggy/rubber-banded rather than fluid. Drop the
  // useSpring entirely and use `scrollYProgress` directly if you want 1:1
  // scroll response.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.2,
  });

  /*
  |--------------------------------------------------------------------------
  | NAME + LABEL GROUP
  |--------------------------------------------------------------------------
  |
  | Label and name share ONE transform (left/x/y/scale). They are laid out
  | as normal DOM siblings (label, then name, with a margin between them)
  | inside this single group, so their relative spacing is real layout —
  | not two independently-animated coordinates that can drift into each
  | other. This is what actually fixes the overlap bug: it can't recur no
  | matter how the curves below get retuned.
  |
  */

  const groupLeft = useTransform(
    smoothProgress,
    T,
    [viewportWidth / 2, viewportWidth / 2, viewportWidth * 0.43, viewportWidth * 0.22, finalLeft]
  );
  const groupX = useTransform(smoothProgress, T, GROUP_X);
  const groupY = useTransform(smoothProgress, T, GROUP_Y);
  const groupScale = useTransform(smoothProgress, T, GROUP_SCALE);
  const groupTracking = useTransform(smoothProgress, T, GROUP_TRACKING);
  const groupOpacity = useTransform(smoothProgress, T, GROUP_OPACITY);
  const labelOpacity = useTransform(smoothProgress, LABEL_OPACITY_STOPS, LABEL_OPACITY);

  /*
  |--------------------------------------------------------------------------
  | GIANT BACKGROUND WORD
  |--------------------------------------------------------------------------
  */

  const backgroundScale = useTransform(smoothProgress, BG_SCALE_STOPS, BG_SCALE);
  const backgroundOpacity = useTransform(smoothProgress, BG_OPACITY_STOPS, BG_OPACITY);
  const backgroundY = useTransform(smoothProgress, [0, 0.78], ["8vh", "-6vh"]);

  /*
  |--------------------------------------------------------------------------
  | DESCRIPTION
  |--------------------------------------------------------------------------
  */

  const descriptionOpacity = useTransform(smoothProgress, DESC_OPACITY_STOPS, DESC_OPACITY);
  const descriptionY = useTransform(smoothProgress, DESC_Y_STOPS, DESC_Y);
  const descriptionX = useTransform(smoothProgress, DESC_Y_STOPS, DESC_X);
  const descriptionFilter = useTransform(smoothProgress, DESC_BLUR_STOPS, DESC_BLUR);

  /*
  |--------------------------------------------------------------------------
  | PRACTICE YEAR / SCROLL INDICATOR / AMBIENT LIGHT / PROGRESS LINE
  |--------------------------------------------------------------------------
  */

  const practiceOpacity = useTransform(smoothProgress, PRACTICE_OPACITY_STOPS, PRACTICE_OPACITY);
  const practiceY = useTransform(smoothProgress, PRACTICE_Y_STOPS, PRACTICE_Y);
  const scrollOpacity = useTransform(smoothProgress, SCROLL_OPACITY_STOPS, SCROLL_OPACITY);
  const lightOpacity = useTransform(smoothProgress, LIGHT_OPACITY_STOPS, LIGHT_OPACITY);
  const lightScale = useTransform(smoothProgress, LIGHT_SCALE_STOPS, LIGHT_SCALE);
  const progressScaleX = useTransform(smoothProgress, PROGRESS_STOPS, PROGRESS_SCALE);

  /*
  |--------------------------------------------------------------------------
  | EXTERNAL EVENTS (e.g. for a Nav progress indicator)
  |--------------------------------------------------------------------------
  |
  | NOTE: these are only useful if something is actually listening for
  | them (e.g. Nav.tsx). Confirm that listener exists before relying on
  | this — otherwise it's just dispatching into the void.
  |
  */

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("heroProgress", { detail: latest }));
  });

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("heroIntro", { detail: true }));
    return () => {
      window.dispatchEvent(new CustomEvent("heroIntro", { detail: false }));
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | REDUCED MOTION FALLBACK
  |--------------------------------------------------------------------------
  |
  | The full version pins the section for 300vh and scroll-jacks a fairly
  | aggressive scale/position animation. That's a real problem for anyone
  | with `prefers-reduced-motion` set (vestibular disorders etc). Give
  | them the same content as a normal, short, gently-fading hero instead.
  |
  */

  if (prefersReducedMotion) {
    return (
      <section
        id="top"
        aria-label="Dr. Balaji Srinivasan — Advocate, Madras High Court"
        className="relative min-h-screen bg-charcoal text-cream flex flex-col justify-center gap-8 overflow-hidden px-6 md:px-12 py-24"
      >
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-cream/30" />
          <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-cream/40">
            Advocate · Madras High Court
          </span>
        </div>
        <h1 className="font-serif font-light italic text-[13vw] md:text-[7vw] leading-[0.95] tracking-tight">
          <span className="block">DR. BALAJI</span>
          <span className="block">SRINIVASAN</span>
        </h1>
        <p className="max-w-lg font-sans text-sm md:text-base leading-relaxed tracking-wide text-cream/60">
          Advocate, Madras High Court — President, MASS Legal Associates.
          Justice earned through integrity, discipline, and relentless
          commitment.
        </p>
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-cream/40">
          Est. Practice — 2020
        </span>
      </section>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Dr. Balaji Srinivasan — Advocate, Madras High Court"
      className="relative h-[300vh] bg-charcoal text-cream"
    >
      <div className="sticky top-0 h-screen overflow-hidden px-6 md:px-12 pt-8 md:pt-10 pb-10">
        {/* ================================================================ */}
        {/* AMBIENT LIGHT (decorative) */}
        {/* ================================================================ */}

        <motion.div
          aria-hidden="true"
          style={{ opacity: lightOpacity, scale: lightScale }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/[0.08] blur-[150px] will-change-transform"
        />

        {/* ================================================================ */}
        {/* GIANT BACKGROUND TEXT (decorative) */}
        {/* ================================================================ */}

        <motion.div
          aria-hidden="true"
          style={{ scale: backgroundScale, y: backgroundY, opacity: backgroundOpacity }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden will-change-transform"
        >
          <span className="select-none whitespace-nowrap font-serif font-light italic text-[28vw] md:text-[24vw] leading-none tracking-[-0.08em]">
            ADVOCATE
          </span>
        </motion.div>

        {/* ================================================================ */}
        {/* NAME + LABEL GROUP — single shared transform, no overlap possible */}
        {/* ================================================================ */}

        <motion.div
          style={{
            left: groupLeft,
            x: groupX,
            y: groupY,
            scale: groupScale,
            letterSpacing: groupTracking,
            opacity: groupOpacity,
          }}
          className="absolute top-1/2 z-20 origin-left -translate-y-1/2 whitespace-nowrap will-change-transform"
        >
          <motion.div
            style={{ opacity: labelOpacity }}
            className="mb-4 md:mb-6 flex items-center gap-4"
          >
            <span className="h-px w-8 bg-cream/30" />
            <span className="font-sans text-[9px] md:text-[10px] tracking-[0.28em] uppercase text-cream/40">
              Advocate · Madras High Court
            </span>
          </motion.div>

          {/* One semantic heading for the name — two visual lines inside it. */}
          <h1 className="font-serif font-light italic text-[13vw] md:text-[10vw] lg:text-[8.5vw] leading-[0.86]">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                DR. BALAJI
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                SRINIVASAN
              </motion.span>
            </div>
          </h1>
        </motion.div>

        {/* ================================================================ */}
        {/* DESCRIPTION */}
        {/* ================================================================ */}

        <motion.div
          style={{
            opacity: descriptionOpacity,
            y: descriptionY,
            x: descriptionX,
            filter: descriptionFilter,
          }}
          className="absolute left-6 md:left-12 bottom-[20%] z-20 max-w-lg will-change-transform"
        >
          <div className="mb-5 h-px w-12 bg-cream/30" />
          <p className="font-sans text-sm md:text-base leading-relaxed tracking-wide text-cream/60">
            Advocate, Madras High Court — President, MASS Legal Associates.
            Justice earned through integrity, discipline, and relentless
            commitment.
          </p>
        </motion.div>

        {/* ================================================================ */}
        {/* PRACTICE YEAR */}
        {/* ================================================================ */}

        <motion.div
          style={{ opacity: practiceOpacity, y: practiceY }}
          className="absolute bottom-10 left-6 md:left-12 z-20 flex flex-col gap-2"
        >
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.28em] uppercase text-cream/30">
            Est. Practice
          </span>
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-cream/60">
            2020
          </span>
        </motion.div>

        {/* ================================================================ */}
        {/* SCROLL INDICATOR */}
        {/* ================================================================ */}

        <motion.div
          style={{ opacity: scrollOpacity }}
          className="absolute bottom-10 right-6 md:right-12 z-20 flex flex-col items-center gap-3"
        >
          <span className="font-sans text-[9px] md:text-[10px] tracking-[0.28em] uppercase text-cream/40">
            Scroll
          </span>
          <div className="relative h-12 w-px overflow-hidden bg-cream/10">
            <motion.div
              animate={{ y: ["-120%", "220%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 top-0 h-1/2 w-full bg-cream/60"
            />
          </div>
        </motion.div>

        {/* ================================================================ */}
        {/* CORNER MARKS (decorative) */}
        {/* ================================================================ */}

        <div aria-hidden="true" className="pointer-events-none absolute right-6 top-24 md:right-12">
          <div className="h-8 w-8 border-r border-t border-cream/10" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute bottom-24 left-6 md:left-12">
          <div className="h-8 w-8 border-b border-l border-cream/10" />
        </div>

        {/* ================================================================ */}
        {/* FILM GRAIN — sits above the content so it actually reads as a   */}
        {/* unifying texture over the whole frame, not just the background */}
        {/* ================================================================ */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.8'/%3E%3C/svg%3E\")",
          }}
        />

        {/* ================================================================ */}
        {/* PROGRESS LINE */}
        {/* ================================================================ */}

        <motion.div
          style={{ scaleX: progressScaleX }}
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-40 h-px origin-left bg-cream/30"
        />
      </div>
    </section>
  );
}