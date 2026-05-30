"use client";

import Wordmark from "./shared/Wordmark";
import CornerBrackets from "./shared/CornerBrackets";

const institutionTypes = [
  { id: "k12",        icon: "🏫", label: "K-12 School" },
  { id: "higher",     icon: "🎓", label: "Higher Education" },
  { id: "edtech",     icon: "🚀", label: "EdTech Startup" },
  { id: "independent",icon: "👤", label: "Independent Educator" },
];

export default function Screen2({ onNext, onBack, institutionType, setInstitutionType }) {
  return (
    <div className="rac-screen animate-fadeIn">
      <CornerBrackets />

      {/* Top Row */}
      <div className="flex items-start justify-between mb-8">
        <Wordmark />
        <button className="rac-back" onClick={onBack}>
          ← Back
        </button>
      </div>

      {/* Heading */}
      <div className="text-center mb-8">
        <h2
          className="text-white font-black mb-3"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", letterSpacing: "-0.01em" }}
        >
          Who are you assessing for?
        </h2>
        <p
          className="text-sm leading-relaxed max-w-sm mx-auto"
          style={{ color: "var(--color-light-blue)" }}
        >
          Select the option that best describes your institution or role.
        </p>
      </div>

      {/* Selection Cards — 2x2 Grid */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {institutionTypes.map((type) => {
          const isSelected = institutionType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setInstitutionType(type.id)}
              className="relative flex flex-col items-center justify-center text-center p-6 rounded-xl transition-all duration-200 active:scale-95"
              style={{
                backgroundColor: isSelected
                  ? "var(--color-mid-blue)"
                  : "var(--color-navy-card)",
                border: isSelected
                  ? "2px solid var(--color-sky)"
                  : "1px solid var(--border-sky-40)",
                cursor: "pointer",
                minHeight: "130px",
              }}
            >
              {/* Checkmark badge */}
              {isSelected && (
                <div
                  className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: "var(--color-sky)",
                    color: "var(--color-navy)",
                  }}
                >
                  ✓
                </div>
              )}

              <span className="text-3xl mb-3">{type.icon}</span>
              <span
                className="font-bold text-sm leading-snug"
                style={{ color: "white" }}
              >
                {type.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <button
        className="rac-btn-primary"
        onClick={onNext}
        disabled={!institutionType}
      >
        Continue →
      </button>
    </div>
  );
}