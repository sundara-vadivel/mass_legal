"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const CHAPTERS = [
  { id: "home", label: "I", title: "Introduction" },
  { id: "about", label: "II", title: "Who We Are" },
  { id: "vision", label: "III", title: "Vision & Mission" },
  { id: "founder", label: "IV", title: "Founder" },
  { id: "practice", label: "V", title: "Practice Areas" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el && window.lenisInstance) {
      window.lenisInstance.scrollTo(el, { offset: -20 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-paper/95 backdrop-blur-md border-b border-ink/8 py-3" : "py-5"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="font-display text-xl tracking-wide text-ink interactive"
          >
            MASS <span className="text-bronze">Legal</span>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => scrollTo(ch.id)}
                className="group flex items-center gap-2 text-[13px] tracking-widest uppercase text-ink/50 hover:text-bronze transition-colors interactive"
              >
                <span className="font-display text-base text-bronze/80 group-hover:text-bronze">
                  {ch.label}
                </span>
                <span className="hidden xl:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {ch.title}
                </span>
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:inline-flex px-5 py-2 border border-bronze/50 text-bronze text-xs tracking-widest uppercase hover:bg-bronze hover:text-paper transition-all duration-300 interactive"
          >
            Consult
          </button>

          <button
            className="lg:hidden text-ink interactive p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-paper flex flex-col justify-center px-10"
          >
            <div className="space-y-5">
              {CHAPTERS.map((ch, i) => (
                <motion.button
                  key={ch.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  onClick={() => scrollTo(ch.id)}
                  className="flex items-baseline gap-5 text-left interactive group"
                >
                  <span className="font-display text-3xl text-bronze w-10">{ch.label}</span>
                  <span className="text-2xl text-ink group-hover:text-bronze transition-colors">
                    {ch.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}