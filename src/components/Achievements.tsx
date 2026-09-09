"use client";

const STATS = [
  { value: "2", label: "National Medals", sub: "Representing Tamil Nadu" },
  { value: "6×", label: "State Champion", sub: "Gold & Silver, Senior and Junior" },
  { value: "Heavy", label: "Weight Division", sub: "Amateur Boxing" },
];

export default function Achievements() {
  return (
    <section className="py-24 px-6 md:px-16 border-b border-ink/10 bg-paper">
      <div className="max-w-5xl mx-auto">
        <p className="text-bronze uppercase tracking-widest text-sm mb-4 text-center">
          Beyond the Courtroom
        </p>
        <h2 className="text-3xl md:text-5xl font-display font-medium mb-4 text-center text-ink">
          National-Level Boxer
        </h2>
        <p className="text-center text-ink/50 text-sm md:text-base tracking-wide mb-14">
          Known in the ring as &quot;Drago&quot; and the &quot;Prince of the Ring&quot;
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="border border-ink/10 rounded-sm p-8 text-center hover:border-bronze/50 transition-colors duration-300"
            >
              <p className="font-display text-4xl text-bronze mb-2">{stat.value}</p>
              <p className="text-ink text-base mb-1">{stat.label}</p>
              <p className="text-ink/50 text-sm">{stat.sub}</p>
            </div>
          ))}
        </div>

        <p className="text-ink/70 text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
          Dr. Balaji represented Tamil Nadu at both School and University Nationals, earning
          two national medals in amateur boxing, and has been featured in sports magazines
          for his aggressive style and commanding ring presence. The discipline, courage, and
          resilience forged in competitive sport continue to shape his approach to advocacy —
          the same strategic thinking and composure under pressure that define his legal
          practice.
        </p>
      </div>
    </section>
  );
}