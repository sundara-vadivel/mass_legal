"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

interface ChapterWipeProps {
  initial: ReactNode;
  incoming: ReactNode;
}

export default function ChapterWipe({
  initial,
  incoming,
}: ChapterWipeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const sections = [initial, incoming];
  const totalSections = sections.length;

  /*
   * ---------------------------------------------------------
   * SMOOTH SCROLL → HORIZONTAL MOVEMENT
   * ---------------------------------------------------------
   */

  useEffect(() => {
    let targetX = 0;
    let currentX = 0;

    let animationFrame: number;

    const handleScroll = () => {
      const container = containerRef.current;

      if (!container) return;

      const rect = container.getBoundingClientRect();

      const totalScrollableDistance =
        container.offsetHeight - window.innerHeight;

      if (totalScrollableDistance <= 0) return;

      /*
       * How far the user has travelled vertically
       * inside ChapterWipe.
       */
      const currentY = Math.min(
        Math.max(-rect.top, 0),
        totalScrollableDistance
      );

      /*
       * Convert vertical scroll → 0 to 1.
       */
      const progress =
        currentY / totalScrollableDistance;

      /*
       * Convert progress → horizontal movement.
       *
       * 0   = Hero
       * 100 = Chairman's Message
       */
      targetX = progress * 100;

      /*
       * Chapter indicator.
       */
      const activeIndex =
        Math.min(
          Math.round(progress),
          totalSections - 1
        );

      setCurrentIndex(activeIndex);
    };

    /*
     * Smooth animation loop.
     */
    const animate = () => {
      /*
       * Lower value = smoother/slower.
       *
       * 0.06 gives a cinematic slide.
       */
      currentX +=
        (targetX - currentX) * 0.06;

      if (trackRef.current) {
        trackRef.current.style.transform =
          `translate3d(-${currentX}vw, 0, 0)`;
      }

      animationFrame =
        requestAnimationFrame(animate);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    animationFrame =
      requestAnimationFrame(animate);

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      cancelAnimationFrame(animationFrame);
    };
  }, [totalSections]);

  /*
   * ---------------------------------------------------------
   * CONTINUOUS ARROW KEY SCROLLING
   * ---------------------------------------------------------
   *
   * Holding ArrowDown continuously scrolls the page.
   *
   * Releasing ArrowDown immediately stops it.
   */

  useEffect(() => {
    let animationFrame: number | null = null;

    let arrowDownHeld = false;
    let arrowUpHeld = false;

    const SCROLL_SPEED = 6;

    const isChapterActive = () => {
      const container = containerRef.current;

      if (!container) return false;

      const rect =
        container.getBoundingClientRect();

      return (
        rect.top <= 0 &&
        rect.bottom >= window.innerHeight
      );
    };

    const scrollLoop = () => {
      if (!isChapterActive()) {
        animationFrame = null;
        return;
      }

      if (arrowDownHeld) {
        window.scrollBy({
          top: SCROLL_SPEED,
          left: 0,
        });
      }

      if (arrowUpHeld) {
        window.scrollBy({
          top: -SCROLL_SPEED,
          left: 0,
        });
      }

      if (arrowDownHeld || arrowUpHeld) {
        animationFrame =
          requestAnimationFrame(scrollLoop);
      } else {
        animationFrame = null;
      }
    };

    const startScrolling = () => {
      if (animationFrame === null) {
        animationFrame =
          requestAnimationFrame(scrollLoop);
      }
    };

    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (
        e.key !== "ArrowDown" &&
        e.key !== "ArrowUp"
      ) {
        return;
      }

      if (!isChapterActive()) {
        return;
      }

      /*
       * Prevent the browser's default jump/
       * acceleration behavior.
       */
      e.preventDefault();

      if (e.key === "ArrowDown") {
        arrowDownHeld = true;
        arrowUpHeld = false;
      }

      if (e.key === "ArrowUp") {
        arrowUpHeld = true;
        arrowDownHeld = false;
      }

      startScrolling();
    };

    const handleKeyUp = (
      e: KeyboardEvent
    ) => {
      if (e.key === "ArrowDown") {
        arrowDownHeld = false;
      }

      if (e.key === "ArrowUp") {
        arrowUpHeld = false;
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "keyup",
      handleKeyUp
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "keyup",
        handleKeyUp
      );

      arrowDownHeld = false;
      arrowUpHeld = false;

      if (animationFrame !== null) {
        cancelAnimationFrame(
          animationFrame
        );
      }
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * UI
   * ---------------------------------------------------------
   */

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        height: `${totalSections * 100}vh`,
      }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden">

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex h-screen w-max will-change-transform"
        >
          {sections.map((section, index) => (
            <section
              key={index}
              className="h-screen w-screen flex-shrink-0 overflow-hidden"
            >
              {section}
            </section>
          ))}
        </div>

        {/* Chapter indicators */}
        <div className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-10 bg-bronze"
                  : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}