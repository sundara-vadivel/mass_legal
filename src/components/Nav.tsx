"use client";

import { motion } from "framer-motion";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Practice", href: "#practice" },
  { label: "Legacy", href: "#legacy" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 mix-blend-difference"
    >
      <a
        href="#top"
        className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-cream"
      >
        Balaji Srinivasan
      </a>

      <nav className="hidden md:flex items-center gap-10">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-sans text-xs tracking-[0.2em] uppercase text-cream/80 hover:text-cream transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        className="font-sans text-xs tracking-[0.2em] uppercase text-cream border border-cream/40 rounded-full px-4 py-2 hover:bg-cream hover:text-charcoal transition-colors"
      >
        Enquire
      </a>
    </motion.header>
  );
}