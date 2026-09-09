"use client";

export default function About() {
  return (
    <section className="py-24 px-6 md:px-16 border-b border-ink/10 bg-parchment">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-bronze uppercase tracking-widest text-sm mb-4">Who We Are</p>
        <h2 className="text-3xl md:text-5xl font-display font-medium mb-8 text-ink">
          Structured Legal Solutions, Built on Integrity
        </h2>
        <p className="text-ink/60 text-base md:text-lg leading-relaxed mb-6">
          MASS Legal Associates is a Chennai-based legal firm delivering structured legal
          solutions for individuals, businesses, and institutions.
        </p>
        <p className="text-ink/60 text-base md:text-lg leading-relaxed">
          We combine strategic advocacy, corporate advisory, regulatory compliance, and
          dispute resolution to provide long-term legal security.
        </p>
      </div>
    </section>
  );
}