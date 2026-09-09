"use client";

const EDUCATION = [
  "B.Sc. Psychology",
  "B.Tech. Information Technology",
  "M.A. Human Rights",
  "LL.B.",
  "Honorary Ph.D. (Honoris Causa) in Law",
];

export default function Founder() {
  return (
    <section className="py-24 px-6 md:px-16 border-b border-ink/10 bg-parchment">
      <div className="max-w-5xl mx-auto">
        <p className="text-bronze uppercase tracking-widest text-sm mb-4 text-center">
          The Founder
        </p>
        <h2 className="text-3xl md:text-5xl font-display font-medium mb-3 text-center text-ink">
          Dr. Balaji Srinivasan
        </h2>
        <p className="text-center text-ink/50 text-sm md:text-base tracking-wide mb-14">
          Advocate · Legal Consultant · Entrepreneur · Event Industry Veteran · Sportsman
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          {/* Left: portrait placeholder */}
          <div className="md:col-span-2">
            <div className="aspect-[3/4] w-full bg-ink/5 border border-ink/10 rounded-sm flex items-center justify-center">
              <span className="text-ink/30 text-sm uppercase tracking-widest">
                Portrait Placeholder
              </span>
            </div>
            <p className="mt-4 text-center font-display text-lg text-ink">
              Advocate, Madras High Court
            </p>
            <p className="text-center text-bronze text-sm uppercase tracking-wide">
              President, MASS Legal Associates
            </p>
          </div>

          {/* Right: bio + education */}
          <div className="md:col-span-3">
            <p className="text-ink/70 text-base md:text-lg leading-relaxed mb-6">
              Dr. Balaji Srinivasan is an accomplished Advocate practicing before the Madras
              High Court, bringing a multidisciplinary foundation in psychology, technology,
              and human rights to his legal practice. His journey across law, entrepreneurship,
              event production, and competitive sport spans more than fifteen years, built on a
              foundation of discipline, leadership, and strategic thinking. Since commencing
              legal practice in 2020, he has represented clients with dedication, integrity, and
              meticulous legal research across civil, criminal, constitutional, commercial, and
              corporate matters.
            </p>
            <p className="text-ink/70 text-base md:text-lg leading-relaxed mb-10">
              As President of MASS Legal Associates, he leads a firm committed to accessible
              justice, legal awareness, and strategic legal representation — emphasizing
              meticulous preparation, ethical advocacy, and practical solutions tailored to
              each client&apos;s objectives.
            </p>

            <h3 className="font-display text-xl text-bronze mb-4">Education</h3>
            <ul className="space-y-3">
              {EDUCATION.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 border-b border-ink/10 pb-3 text-ink/70 text-base"
                >
                  <span className="text-bronze font-display text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <blockquote className="mt-10 border-l-2 border-bronze pl-6 italic text-ink/60 text-base md:text-lg">
              &quot;Every challenge is an opportunity to demonstrate integrity, discipline,
              and excellence — whether in the courtroom, the boardroom, the sporting arena,
              or large-scale event management.&quot;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}