"use client";

const STEPS = [
  {
    title: "Consultation",
    desc: "A confidential first meeting to understand your case, objectives, and concerns.",
  },
  {
    title: "Strategy & Assessment",
    desc: "Meticulous legal research and risk assessment to shape the right approach.",
  },
  {
    title: "Representation",
    desc: "Diligent, ethical advocacy through every stage of proceedings.",
  },
  {
    title: "Resolution",
    desc: "Clear communication and outcomes aligned with your objectives.",
  },
];

export default function OurApproach() {
  return (
    <section className="py-24 px-6 md:px-16 border-b border-ink/10 bg-parchment">
      <div className="max-w-6xl mx-auto">
        <p className="text-bronze uppercase tracking-widest text-sm mb-4 text-center">
          How We Work
        </p>
        <h2 className="text-3xl md:text-5xl font-display font-medium mb-14 text-center text-ink">
          Our Approach
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="border border-ink/10 rounded-sm p-6 hover:border-bronze/50 transition-colors duration-300"
            >
              <span className="font-display text-3xl text-bronze">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl text-ink mt-4 mb-2">{step.title}</h3>
              <p className="text-ink/60 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}