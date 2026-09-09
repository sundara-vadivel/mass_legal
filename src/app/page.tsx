"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChairmansMessage from "@/components/Chairmansmessage";
import ChapterWipe from "@/components/ChapterWipe";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <Navbar />

      <ChapterWipe
        initial={<Hero />}
        incoming={<ChairmansMessage />}
      />
    </main>
  );
}