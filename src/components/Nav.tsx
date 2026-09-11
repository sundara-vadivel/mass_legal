"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Practice", href: "#practice" },
  { label: "Legacy", href: "#legacy" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [heroProgress, setHeroProgress] = useState(0);

  /*
   * -------------------------------------------------------
   * LISTEN TO HERO SCROLL PROGRESS
   * -------------------------------------------------------
   */

  useEffect(() => {
    const handleHeroProgress = (event: Event) => {
      const customEvent = event as CustomEvent<number>;

      setHeroProgress(customEvent.detail);
    };

    window.addEventListener("heroProgress", handleHeroProgress);

    return () => {
      window.removeEventListener("heroProgress", handleHeroProgress);
    };
  }, []);

  /*
   * -------------------------------------------------------
   * SMOOTH NAVBAR REVEAL
   * -------------------------------------------------------
   */

  const progress = useMotionValue(heroProgress);

  useEffect(() => {
    progress.set(heroProgress);
  }, [heroProgress, progress]);

  const smoothProgress = useSpring(progress, {
    stiffness: 70,
    damping: 24,
    mass: 0.3,
  });

  /*
   * Navbar begins appearing around 20% of hero scroll.
   * Fully visible around 50%.
   */

  const navOpacity = useTransform(
    smoothProgress,
    [0.18, 0.28, 0.48],
    [0, 0.4, 1]
  );

  const navY = useTransform(
    smoothProgress,
    [0.18, 0.48],
    [-35, 0]
  );

  /*
   * -------------------------------------------------------
   * LOGO
   * -------------------------------------------------------
   */

  const logoX = useTransform(
    smoothProgress,
    [0.18, 0.45],
    [-35, 0]
  );

  const logoOpacity = useTransform(
    smoothProgress,
    [0.18, 0.35, 0.48],
    [0, 0.5, 1]
  );

  /*
   * -------------------------------------------------------
   * NAV LINKS
   * -------------------------------------------------------
   */

  const linksX = useTransform(
    smoothProgress,
    [0.24, 0.5],
    [30, 0]
  );

  const linksOpacity = useTransform(
    smoothProgress,
    [0.25, 0.4, 0.5],
    [0, 0.5, 1]
  );

  /*
   * -------------------------------------------------------
   * ENQUIRE BUTTON
   * -------------------------------------------------------
   */

  const enquireX = useTransform(
    smoothProgress,
    [0.3, 0.52],
    [35, 0]
  );

  const enquireOpacity = useTransform(
    smoothProgress,
    [0.3, 0.43, 0.52],
    [0, 0.5, 1]
  );

  /*
   * -------------------------------------------------------
   * BACKGROUND
   * -------------------------------------------------------
   *
   * The navbar starts transparent.
   * Once the hero is sufficiently revealed, a very subtle
   * background appears so navigation remains readable.
   */

  const navBackground = useTransform(
    smoothProgress,
    [0.35, 0.55, 0.75],
    [
      "rgba(0,0,0,0)",
      "rgba(0,0,0,0.03)",
      "rgba(0,0,0,0.08)",
    ]
  );

  return (
    <motion.header
      style={{
        opacity: navOpacity,
        y: navY,
        backgroundColor: navBackground,
      }}
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        flex
        items-center
        justify-between
        px-6
        py-6
        md:px-12
        md:py-8
        backdrop-blur-[2px]
      "
    >
      {/* ===================================================
          LOGO
          =================================================== */}

      <motion.a
        href="#top"
        style={{
          x: logoX,
          opacity: logoOpacity,
        }}
        className="
          group
          relative
          font-sans
          text-xs
          md:text-sm
          tracking-[0.2em]
          uppercase
          text-cream
        "
      >
        Balaji Srinivasan

        {/* Animated logo underline */}
        <span
          className="
            absolute
            -bottom-1
            left-0
            h-px
            w-0
            bg-cream/60
            transition-all
            duration-500
            group-hover:w-full
          "
        />
      </motion.a>

      {/* ===================================================
          DESKTOP NAVIGATION
          =================================================== */}

      <motion.nav
        style={{
          x: linksX,
          opacity: linksOpacity,
        }}
        className="
          hidden
          md:flex
          items-center
          gap-10
        "
      >
        {LINKS.map((link, index) => (
          <motion.a
            key={link.href}
            href={link.href}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={
              heroProgress > 0.25
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 10,
                  }
            }
            transition={{
              duration: 0.5,
              delay: index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              group
              relative
              font-sans
              text-xs
              tracking-[0.2em]
              uppercase
              text-cream/70
              transition-colors
              duration-300
              hover:text-cream
            "
          >
            {link.label}

            {/* Sliding underline */}
            <span
              className="
                absolute
                -bottom-2
                left-0
                h-px
                w-0
                bg-cream/50
                transition-all
                duration-500
                ease-out
                group-hover:w-full
              "
            />
          </motion.a>
        ))}
      </motion.nav>

      {/* ===================================================
          ENQUIRE
          =================================================== */}

      <motion.a
        href="#contact"
        style={{
          x: enquireX,
          opacity: enquireOpacity,
        }}
        className="
          group
          relative
          overflow-hidden
          rounded-full
          border
          border-cream/30
          px-4
          py-2
          font-sans
          text-xs
          tracking-[0.2em]
          uppercase
          text-cream
          transition-all
          duration-500
          hover:border-cream
        "
      >
        {/* Hover fill */}
        <span
          className="
            absolute
            inset-0
            -z-10
            origin-left
            scale-x-0
            bg-cream
            transition-transform
            duration-500
            ease-out
            group-hover:scale-x-100
          "
        />

        <span className="relative transition-colors duration-500 group-hover:text-charcoal">
          Enquire
        </span>
      </motion.a>
    </motion.header>
  );
}

