"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useSectionProgress } from "@/lib/motion";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  const progress = useSectionProgress(sectionRef, ["start end", "start 0.4"], {
    stiffness: 160,
    damping: 32,
  });

  const y = useTransform(progress, [0, 1], [50, 0]);
  const scale = useTransform(progress, [0, 1], [0.97, 1]);
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const blurValue = useTransform(progress, [0, 0.7], [6, 0]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);
  // Headline moves slightly faster than its container — subtle foreground parallax.
  const headlineY = useTransform(progress, [0, 1], [70, 0]);

  const wrapperStyle = prefersReducedMotion ? undefined : { y, scale, opacity, filter };
  const headlineStyle = prefersReducedMotion ? undefined : { y: headlineY };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-charcoal text-cream px-6 md:px-12 py-24 md:py-40 min-h-screen flex flex-col justify-between overflow-hidden"
    >
      <motion.div style={wrapperStyle} className="will-change-transform">
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
          07 — Get in Touch
        </span>

        <motion.h2
          style={headlineStyle}
          className="mt-8 font-serif italic text-4xl md:text-7xl leading-[1.05] max-w-4xl"
        >
          Committed to justice.
          <br />
          Dedicated to excellence.
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl border-t border-cream/15 pt-10">
          <div>
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-cream/40">Email</span>
            <p className="mt-2 font-serif text-lg">masslegalassociates@gmail.com</p>
          </div>
          <div className="sm:ml-8">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-cream/40">Phone</span>
            <p className="mt-2 font-serif text-lg">+91 99622 88881</p>
          </div>
          <div>
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-cream/40">Location</span>
            <p className="mt-2 font-serif text-lg">53/2, Burkit Road, T.Nagar, Chennai 600017</p>
          </div>
        </div>
      </motion.div>

      <div className="mt-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-t border-cream/15 pt-8">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-cream/40">
          MASS Legal Associates
        </p>
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-cream/40">
          © {new Date().getFullYear()} Dr. Balaji Srinivasan. All rights reserved.
        </p>
      </div>
    </section>
  );
}