"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ChairmansMessage() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Soft fade + rise for the whole chapter
      gsap.from(sectionRef.current, {
        opacity: 0.4,
        y: 60,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 30%",
          scrub: 1,
        },
      });

      // Stagger the paragraphs
      gsap.from(textRefs.current, {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      // Signature line draw
      gsap.from(".signature-line", {
        scaleX: 0,
        duration: 1.4,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".signature-block",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="message"
      ref={sectionRef}
      className="relative min-h-screen py-32 md:py-40 px-6 md:px-16 bg-parchment border-b border-ink/5"
    >
      {/* Subtle vertical guide lines */}
      <div className="absolute left-[8%] top-0 h-full w-px bg-ink/5 hidden lg:block" />
      <div className="absolute right-[8%] top-0 h-full w-px bg-ink/5 hidden lg:block" />

      <div className="max-w-4xl mx-auto">
        {/* Chapter label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-display text-4xl text-bronze">II</span>
          <div className="h-px flex-1 bg-ink/10" />
          <p className="text-xs tracking-[0.3em] uppercase text-ink/40">
            Chairman’s Message
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-10">
          <p
            ref={(el) => { textRefs.current[0] = el; }}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-ink leading-snug"
          >
            Justice is not a destination.
            <br />
            It is a discipline.
          </p>

          <p
            ref={(el) => { textRefs.current[1] = el; }}
            className="text-ink/70 text-lg md:text-xl leading-relaxed max-w-3xl"
          >
            When I first entered the courtroom, I carried with me more than legal knowledge.
            I carried the weight of fifteen years spent building, leading, and performing under pressure —
            in boardrooms, on stages, and in the boxing ring. Every experience taught me the same truth:
            excellence is never accidental.
          </p>

          <p
            ref={(el) => { textRefs.current[2] = el; }}
            className="text-ink/70 text-lg md:text-xl leading-relaxed max-w-3xl"
          >
            At MASS Legal Associates, we do not merely represent clients.
            We stand with them. We prepare with the same intensity I once brought to the ring —
            meticulous, strategic, and unflinching. Integrity is not a slogan here; it is the only
            currency we accept.
          </p>

          <p
            ref={(el) => { textRefs.current[3] = el; }}
            className="text-ink/70 text-lg md:text-xl leading-relaxed max-w-3xl"
          >
            My promise is simple. Whether you come to us for litigation, corporate counsel,
            or complex dispute resolution, you will receive clear thinking, honest advice,
            and advocacy that never compromises on ethics. In a profession that often rewards
            the loudest voice, we choose the most prepared one.
          </p>

          <blockquote
            ref={quoteRef}
            className="border-l-2 border-bronze pl-8 my-16"
          >
            <p className="font-display text-2xl md:text-3xl text-ink/80 italic leading-relaxed">
              “Every challenge is an opportunity to demonstrate integrity, discipline,
              and excellence — whether in the courtroom, the boardroom, or the sporting arena.”
            </p>
          </blockquote>
        </div>

        {/* Signature block */}
        <div className="signature-block mt-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <div className="signature-line origin-left h-px w-48 bg-bronze mb-6" />
            <p className="font-display text-2xl text-ink">Dr. Balaji Srinivasan</p>
            <p className="text-bronze text-sm tracking-widest uppercase mt-1">
              Advocate, Madras High Court
            </p>
            <p className="text-ink/50 text-sm mt-1">
              President, MASS Legal Associates
            </p>
          </div>

          {/* Portrait placeholder – replace with real image later */}
          <div className="w-40 h-52 bg-ink/5 border border-ink/10 flex items-center justify-center">
            <span className="text-ink/30 text-xs tracking-widest uppercase text-center px-4">
              Professional<br />Portrait
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}