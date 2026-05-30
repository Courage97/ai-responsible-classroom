"use client";

import Wordmark from "./shared/Wordmark";
import CornerBrackets from "./shared/CornerBrackets";

const dimensions = [
  { icon: "🔒", label: "Data Privacy" },
  { icon: "📋", label: "AI Usage Policy" },
  { icon: "🛠️", label: "Tool Readiness" },
  { icon: "🛡️", label: "Cyber Infrastructure" },
  { icon: "🎓", label: "Workforce Alignment" },
];

export default function Screen1({ onNext }) {
  return (
    <div className="rac-screen animate-fadeIn">
      <CornerBrackets />

      {/* Wordmark */}
      <Wordmark />

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center py-10">

        <h1
          className="text-white font-black leading-tight mb-4"
          style={{ fontSize: "clamp(2rem, 6vw, 2.75rem)", letterSpacing: "-0.02em" }}
        >
          Is Your Institution
          <br />
          AI Ready?
        </h1>

        <p
          className="mb-8 max-w-md leading-relaxed"
          style={{ color: "var(--color-light-blue)", fontSize: "1rem" }}
        >
          A free 3-minute self-assessment across 5 critical dimensions
          of responsible AI adoption in education.
        </p>

        {/* Dimension Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {dimensions.map((d) => (
            <div key={d.label} className="rac-pill">
              <span>{d.icon}</span>
              <span>{d.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="rac-btn-primary" onClick={onNext}>
          Start Assessment →
        </button>

        {/* Tagline */}
        <p
          className="mt-6 text-sm italic"
          style={{ color: "var(--color-light-blue)" }}
        >
          "Signal through the noise. Every week."
        </p>
      </div>
    </div>
  );
}