"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useSectionProgress } from "@/lib/motion";

const AREAS = [
  {
    title: "Civil Litigation",
    question: "In a dispute over money, property, or a broken agreement?",
    detail:
      "He represents clients through the dispute with precision and strategic clarity, aiming for a resolution rather than a prolonged fight.",
  },
  {
    title: "Criminal Law",
    question: "Facing arrest, bail proceedings, or a criminal charge?",
    detail:
      "He builds a defense grounded in rigorous preparation and ethical advocacy, from the first hearing through trial.",
  },
  {
    title: "Constitutional Law",
    question: "Been denied a right the Constitution guarantees you?",
    detail:
      "Writ petitions and matters engaging fundamental rights before the High Court, argued directly and without delay.",
  },
  {
    title: "Property & Real Estate",
    question: "Buying, selling, or fighting over a property title?",
    detail:
      "Title disputes, documentation, and real estate transaction advisory — clean paperwork upfront, a firm defense if it comes to one.",
  },
  {
    title: "Commercial Litigation",
    question: "A business dispute threatening to escalate?",
    detail:
      "He resolves business disputes with a practical, outcome-focused approach rather than fighting for its own sake.",
  },
  {
    title: "Contract Drafting",
    question: "About to sign something you want ironclad?",
    detail:
      "Precise, enforceable agreements tailored to each client's objectives — written to prevent the dispute, not just win it.",
  },
  {
    title: "Arbitration & Mediation",
    question: "Want a dispute resolved without years in court?",
    detail:
      "Efficient dispute resolution outside traditional courtroom litigation, when that path serves the client better.",
  },
  {
    title: "Consumer Protection",
    question: "Been wronged by a company or unfair trade practice?",
    detail:
      "He advocates for consumer rights against unfair trade practices, holding companies to what they promised.",
  },
  {
    title: "Corporate Advisory",
    question: "Need ongoing legal counsel for your business?",
    detail:
      "Strategic legal counsel for corporate governance and compliance, so decisions hold up before they're ever challenged.",
  },
  {
    title: "Human Rights",
    question: "A matter of fundamental dignity at stake?",
    detail:
      "Committed representation in matters of fundamental human dignity, pursued with the same discipline as every other brief.",
  },
];

/**
 * Detects real hover capability (mouse/trackpad), not just screen width —
 * a tablet or touch laptop can be wide but still have no true hover, and a
 * narrow window on a desktop still does. `pointer: fine` rules out coarse
 * touch input; `hover: hover` rules out devices that only *simulate* hover
 * on tap-and-hold.
 */
function useHasHoverSupport() {
  // Lazy initializer runs once, synchronously, on first render — this is
  // reading current platform capability, not reacting to external state,
  // so it belongs here rather than in an effect-triggered setState.
  const [hasHover, setHasHover] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handler = (e: MediaQueryListEvent) => setHasHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return hasHover;
}

function PracticeCard({
  area,
  index,
  isOpen,
  hasHover,
  onOpen,
  onClose,
  onToggle,
}: {
  area: (typeof AREAS)[number];
  index: number;
  isOpen: boolean;
  hasHover: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 95%", "start 65%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const style = prefersReducedMotion ? undefined : { y, opacity };

  // Hover-capable devices: open on enter/focus, close on leave/blur.
  // Touch devices: tap toggles, since there's no real "leave" event.
  const interactionProps = hasHover
    ? {
        onMouseEnter: onOpen,
        onMouseLeave: onClose,
        onFocus: onOpen,
        onBlur: onClose,
      }
    : {
        onClick: onToggle,
      };

  return (
    <motion.div ref={itemRef} style={style} layout className="will-change-transform">
      <button
        type="button"
        aria-expanded={isOpen}
        {...interactionProps}
        className={`group w-full text-left border rounded-2xl px-6 py-6 transition-colors ${
          isOpen
            ? "border-ink bg-ink text-cream"
            : "border-ink/12 hover:border-ink/30"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span
              className={`font-sans text-xs ${
                isOpen ? "text-cream/50" : "text-ink/40"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-serif text-lg md:text-xl">{area.title}</h3>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className={`font-sans text-lg shrink-0 ${
              isOpen ? "text-cream/60" : "text-ink/40"
            }`}
          >
            +
          </motion.span>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="font-serif italic text-base md:text-lg text-cream leading-snug">
                {area.question}
              </p>
              <p className="mt-3 font-sans text-sm text-cream/70 leading-relaxed">
                {area.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function PracticeAreas() {
  const sectionRef = useRef<HTMLElement>(null!);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const hasHover = useHasHoverSupport();

  const progress = useSectionProgress(sectionRef, ["start end", "start 0.4"]);
  const scale = useTransform(progress, [0, 1], [0.96, 1]);
  const wrapperOpacity = useTransform(progress, [0, 1], [0, 1]);
  const headingY = useTransform(progress, [0, 0.55], [30, 0]);
  const headingOpacity = useTransform(progress, [0, 0.45], [0, 1]);

  const wrapperStyle = prefersReducedMotion ? undefined : { scale, opacity: wrapperOpacity };
  const headingStyle = prefersReducedMotion ? undefined : { y: headingY, opacity: headingOpacity };

  const { scrollYProgress: watermarkProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const watermarkY = useTransform(watermarkProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      id="practice"
      className="relative bg-cream text-ink px-6 md:px-12 py-24 md:py-40 overflow-hidden"
    >
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ y: watermarkY }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center will-change-transform"
        >
          <span className="select-none whitespace-nowrap font-serif italic text-[22vw] leading-none tracking-[-0.06em] text-ink/[0.035]">
            COUNSEL
          </span>
        </motion.div>
      )}

      <motion.div
        style={wrapperStyle}
        className="relative z-10 max-w-6xl mx-auto will-change-transform"
      >
        <motion.div style={headingStyle}>
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-ink/50">
            03 — Practice Areas
          </span>
          <h2 className="mt-6 font-serif italic text-3xl md:text-5xl max-w-xl">
            Is this your situation?
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AREAS.map((area, i) => (
            <PracticeCard
              key={area.title}
              area={area}
              index={i}
              isOpen={openIndex === i}
              hasHover={hasHover}
              onOpen={() => setOpenIndex(i)}
              onClose={() => setOpenIndex((cur) => (cur === i ? null : cur))}
              onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}