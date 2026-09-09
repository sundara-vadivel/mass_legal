"use client";

export default function VisionMission() {
  return (
    <section className="py-24 px-6 md:px-16 border-b border-ink/10 bg-paper">
      <div className="max-w-5xl mx-auto">
        <p className="text-bronze uppercase tracking-widest text-sm mb-4 text-center">
          Our Foundation
        </p>
        <h2 className="text-3xl md:text-5xl font-display font-medium mb-14 text-center text-ink">
          Vision &amp; Mission
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-ink/10 rounded-sm p-8 hover:border-bronze/50 transition-colors duration-300">
            <h3 className="font-display text-2xl text-bronze mb-3">Our Vision</h3>
            <p className="text-ink/70 text-base leading-relaxed">
              To be a trusted legal partner known for strategic clarity and ethical advocacy.
            </p>
          </div>

          <div className="border border-ink/10 rounded-sm p-8 hover:border-bronze/50 transition-colors duration-300">
            <h3 className="font-display text-2xl text-bronze mb-3">Our Mission</h3>
            <p className="text-ink/70 text-base leading-relaxed">
              To protect client interests through structured legal planning, effective
              representation, and preventive legal strategies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}