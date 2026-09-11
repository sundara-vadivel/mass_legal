"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useSectionProgress } from "@/lib/motion";

const AREAS = [
  { title: "Civil Litigation", detail: "Representing clients through disputes with precision and strategic clarity." },
  { title: "Criminal Law", detail: "Defending rights with rigorous preparation and ethical advocacy." },
  { title: "Constitutional Law", detail: "Writ petitions and matters engaging fundamental rights before the High Court." },
  { title: "Property & Real Estate", detail: "Title disputes, documentation, and real estate transaction advisory." },
  { title: "Commercial Litigation", detail: "Resolving business disputes with a practical, outcome-focused approach." },
  { title: "Contract Drafting", detail: "Precise, enforceable agreements tailored to each client's objectives." },
  { title: "Arbitration & Mediation", detail: "Efficient dispute resolution outside traditional courtroom litigation." },
  { title: "Consumer Protection", detail: "Advocating for consumer rights against unfair trade practices." },
  { title: "Corporate Advisory", detail: "Strategic legal counsel for corporate governance and compliance." },
  { title: "Human Rights", detail: "Committed representation in matters of fundamental human dignity." },
];

function PracticeItem({
  area,
  index,
  hovered,
  setHovered,
}: {
  area: { title: string; detail: string };
  index: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  // Each item tracks its OWN entry into view, so the stagger is driven
  // by scroll position (items further down the list reveal later
  // because you have to scroll further to reach them) rather than a
  // fixed time delay.
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 95%", "start 60%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [36, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const style = prefersReducedMotion ? undefined : { y, opacity };

  return (
    <motion.div
      ref={itemRef}
      style={style}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className="group border-t border-ink/10 py-6 md:py-8 cursor-default"
    >
      <div className="flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-4 md:gap-8">
          <span className="font-sans text-xs text-ink/40 w-6">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-serif text-xl md:text-3xl group-hover:italic group-hover:text-ink transition-all">
            {area.title}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: hovered === index ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="font-sans text-lg text-ink/40 shrink-0"
        >
          +
        </motion.span>
      </div>

      <AnimatePresence>
        {hovered === index && (
          <motion.p
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-sm md:text-base text-ink/60 max-w-xl pl-10 md:pl-14 overflow-hidden"
          >
            {area.detail}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PracticeAreas() {
  const sectionRef = useRef<HTMLElement>(null!);
  const [hovered, setHovered] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const progress = useSectionProgress(sectionRef, ["start end", "start 0.4"]);
  const scale = useTransform(progress, [0, 1], [0.96, 1]);
  const wrapperOpacity = useTransform(progress, [0, 1], [0, 1]);
  // Heading resolves slightly ahead of the wrapper scale finishing.
  const headingY = useTransform(progress, [0, 0.55], [30, 0]);
  const headingOpacity = useTransform(progress, [0, 0.45], [0, 1]);

  const wrapperStyle = prefersReducedMotion ? undefined : { scale, opacity: wrapperOpacity };
  const headingStyle = prefersReducedMotion ? undefined : { y: headingY, opacity: headingOpacity };

  return (
    <section
      ref={sectionRef}
      id="practice"
      className="relative bg-cream text-ink px-6 md:px-12 py-24 md:py-40 overflow-hidden"
    >
      <motion.div style={wrapperStyle} className="max-w-6xl mx-auto will-change-transform">
        <motion.div style={headingStyle}>
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-ink/50">
            03 — Practice Areas
          </span>
          <h2 className="mt-6 font-serif italic text-3xl md:text-5xl">
            Where he practices.
          </h2>
        </motion.div>

        <div className="mt-16">
          {AREAS.map((area, i) => (
            <PracticeItem
              key={area.title}
              area={area}
              index={i}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
          <div className="border-t border-ink/10" />
        </div>
      </motion.div>
    </section>
  );
}