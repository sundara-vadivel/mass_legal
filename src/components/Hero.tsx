"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-label", { y: 20, opacity: 0, duration: 0.9, delay: 0.15 })
        .from(".hero-line1", { y: 60, opacity: 0, duration: 1.1 }, "-=0.5")
        .from(".hero-line2", { y: 60, opacity: 0, duration: 1.1 }, "-=0.85")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.9 }, "-=0.6")
        .from(".hero-cta", { y: 15, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-scroll", { opacity: 0, duration: 1 }, "-=0.3");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-parchment"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[12%] top-0 h-full w-px bg-ink/[0.05]" />
          <div className="absolute right-[12%] top-0 h-full w-px bg-ink/[0.05]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <p className="hero-label text-bronze text-[11px] md:text-xs tracking-[0.4em] uppercase mb-10">
            Advocate · Madras High Court · President
          </p>

          <h1 className="font-display font-medium text-ink leading-[0.92]">
            <span className="hero-line1 block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Dr. Balaji
            </span>
            <span className="hero-line2 block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-bronze mt-1">
              Srinivasan
            </span>
          </h1>

          <p className="hero-sub mt-8 text-ink/55 text-base md:text-lg tracking-wide">
            Masters of Advocacy and Societal Support
          </p>

          <div className="hero-cta mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            
             <a href="#contact"
              className="px-9 py-3.5 bg-ink text-paper text-xs tracking-[0.2em] uppercase hover:bg-bronze transition-colors duration-300 interactive"
            >
              Schedule Consultation
            </a>
            <a
              href="#about"
              className="text-xs tracking-[0.2em] uppercase text-ink/60 hover:text-bronze transition-colors interactive"
            >
              Learn More ↓
            </a>
          </div>
        </div>

        <div className="hero-scroll absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3">
          <div className="w-10 h-px bg-bronze/60" />
          <p className="text-[10px] tracking-[0.35em] uppercase text-ink/35">Scroll</p>
        </div>
      </section>
    </div>
  );
}