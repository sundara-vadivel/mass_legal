"use client";
import { useState } from "react";

const CATEGORIES = [
  {
    label: "Litigation & Dispute Resolution",
    items: [
      { title: "Civil & Commercial Disputes", desc: "Contract disputes, debt recovery, and business litigation." },
      { title: "Criminal Defense", desc: "Representation in criminal matters and legal defense." },
      { title: "Writ Petitions", desc: "Constitutional remedies and writ proceedings." },
      { title: "Arbitration Support", desc: "Alternative dispute resolution mechanisms." },
      { title: "Property Law", desc: "Title disputes, ownership matters, and property litigation." },
      { title: "Family Law", desc: "Matrimonial, custody, and family dispute matters." },
      { title: "Human Rights", desc: "Advocacy and legal support in human rights matters." },
    ],
  },
  {
    label: "Corporate & Advisory",
    items: [
      { title: "Company Formation", desc: "Structuring and incorporation of business entities." },
      { title: "Contracts & Agreements", desc: "Drafting, review, and negotiation of commercial contracts." },
      { title: "Risk Assessment", desc: "Legal risk identification and mitigation strategies." },
      { title: "Legal Documentation", desc: "Comprehensive documentation for business operations." },
      { title: "Corporate Advisory", desc: "Strategic legal counsel for corporate governance." },
      { title: "Consumer Law", desc: "Consumer protection matters and dispute resolution." },
    ],
  },
  {
    label: "Real Estate & Compliance",
    items: [
      { title: "Title Verification", desc: "Property due diligence and title verification." },
      { title: "Land Dispute Resolution", desc: "Resolution of property and land-related disputes." },
      { title: "Registration Advisory", desc: "Guidance on property registration processes." },
      { title: "Labour Law Compliance", desc: "Ensuring adherence to labour regulations." },
      { title: "MSME Advisory", desc: "Legal advisory for micro, small & medium enterprises." },
      { title: "Statutory Filings & Audits", desc: "Regulatory filings and legal compliance audits." },
    ],
  },
];

export default function PracticeAreas() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 px-6 md:px-16 border-b border-ink/10 bg-paper">
      <div className="max-w-6xl mx-auto">
        <p className="text-bronze uppercase tracking-widest text-sm mb-4 text-center">
          What We Do
        </p>
        <h2 className="text-3xl md:text-5xl font-display font-medium mb-12 text-center text-ink">
          Core Practice Areas
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-sm text-sm tracking-wide border transition-colors duration-300 ${
                active === i
                  ? "bg-bronze text-paper border-bronze"
                  : "border-ink/15 text-ink/60 hover:border-bronze/50 hover:text-bronze"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES[active].items.map((item, i) => (
            <div
              key={i}
              className="border border-ink/10 rounded-sm p-6 hover:border-bronze/50 transition-colors duration-300"
            >
              <h3 className="font-display text-xl text-ink mb-2">{item.title}</h3>
              <p className="text-ink/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}