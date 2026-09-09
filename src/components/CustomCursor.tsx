"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const gavelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const gavel = gavelRef.current;
    if (!dot || !ring || !gavel) return;

    // Skip entirely on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power3.out" });
      gsap.to(gavel, { x: e.clientX, y: e.clientY, duration: 0.45, ease: "power3.out" });
    };

    const onMouseEnter = () => {
      gsap.to(ring, { scale: 1.5, opacity: 0, duration: 0.3 });
      gsap.to(gavel, { opacity: 1, rotate: -15, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(gavel, { opacity: 0, rotate: -25, duration: 0.25 });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactive = document.querySelectorAll("a, button, .interactive");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
      <div ref={gavelRef} className="cursor-gavel hidden md:block">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <path d="M14.5 4.5l5 5M9 10l-5 5M14.5 4.5L9 10M19.5 9.5L14 15" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 20h6M5 19l2-2" strokeLinecap="round" />
          <rect x="13" y="2" width="3" height="7" rx="0.5" transform="rotate(45 14.5 5.5)" fill="currentColor" opacity="0.9" />
        </svg>
      </div>
    </>
  );
}