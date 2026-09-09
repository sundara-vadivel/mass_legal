// src/components/SmoothScrollProvider.tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    lenisInstance?: Lenis;
  }
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.lenisInstance = lenis;

    // ONE driver only: gsap.ticker runs lenis's internal raf.
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Tell ScrollTrigger whenever Lenis actually scrolls — without this,
    // pin/scrub effects (like your chapter wipe) go stale or never fire.
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      window.lenisInstance = undefined;
    };
  }, []);

  return <>{children}</>;
}