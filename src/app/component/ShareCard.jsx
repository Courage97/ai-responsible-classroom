"use client";

import { useState } from "react";
import { dimensions } from "../data/questions";

function getLetterGrade(percentage) {
  if (percentage >= 90) return { grade: "A+", label: "Exemplary",          color: "#1A9E6B" };
  if (percentage >= 80) return { grade: "A",  label: "AI Ready",           color: "#1A9E6B" };
  if (percentage >= 70) return { grade: "B",  label: "Progressing Well",   color: "#378ADD" };
  if (percentage >= 60) return { grade: "C",  label: "Progressing",        color: "#378ADD" };
  if (percentage >= 50) return { grade: "D",  label: "At Risk",            color: "#E07B1A" };
  if (percentage >= 40) return { grade: "D-", label: "Significant Risk",   color: "#E07B1A" };
  return                       { grade: "F",  label: "Urgent Action Needed", color: "#C0392B" };
}

function getScoreBand(percentage) {
  if (percentage >= 80) return { label: "AI READY",             color: "#1A9E6B" };
  if (percentage >= 60) return { label: "PROGRESSING",          color: "#378ADD" };
  if (percentage >= 40) return { label: "AT RISK",              color: "#E07B1A" };
  return                       { label: "URGENT ACTION NEEDED", color: "#C0392B" };
}

const dimShortNames = {
  privacy:   "Data Privacy",
  policy:    "AI Policy",
  tool:      "Tool Ready",
  cyber:     "Cyber",
  workforce: "Workforce",
};

export default function ShareCard({ scores }) {
  const [copied, setCopied] = useState(false);
  const { dimScores, percentage } = scores;

  const grade = getLetterGrade(percentage);
  const band  = getScoreBand(percentage);

  // Highest and lowest dimension for share text
  const sorted   = [...dimensions].sort((a, b) => dimScores[a.id] - dimScores[b.id]);
  const lowest   = sorted[0];
  const highest  = sorted[sorted.length - 1];

  const shareText =
`I just assessed my institution's AI readiness with The Responsible AI Classroom tool.

My score: ${percentage}/100 — Grade ${grade.grade} — ${band.label}
My strongest area: ${highest.label}
My biggest gap: ${lowest.label}

How does your institution compare?
Take the free 3-minute assessment.

Built by Barnabas Oyewole
STEM Instructor · Educator · Innovation Developer

#ResponsibleAIClassroom #TheLearningSignal #EdTech #AIinEducation`;

  function handleCopy() {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div>
      {/* ── Score Card ── */}
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          margin: "0 auto",
          aspectRatio: "1 / 1",
          backgroundColor: "#042C53",
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {/* Corner brackets */}
        {[
          { top: 8,    left: 8,    borderTop: "2px solid #378ADD", borderLeft:   "2px solid #378ADD" },
          { top: 8,    right: 8,   borderTop: "2px solid #378ADD", borderRight:  "2px solid #378ADD" },
          { bottom: 8, left: 8,    borderBottom: "2px solid #378ADD", borderLeft:  "2px solid #378ADD" },
          { bottom: 8, right: 8,   borderBottom: "2px solid #378ADD", borderRight: "2px solid #378ADD" },
        ].map((style, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 12,
              height: 12,
              ...style,
            }}
          />
        ))}

        {/* Top strip */}
        <div
          style={{
            backgroundColor: "#0C447C",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 900,
              fontFamily: "Arial Black, sans-serif",
              color: "white",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            THE RESPONSIBLE AI CLASSROOM
          </span>
          <span style={{ fontSize: 11, color: "#85B7EB" }}>
            By Barnabas Oyewole
          </span>
        </div>

        {/* Centre section */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 24px 12px",
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: "#85B7EB",
              fontStyle: "italic",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            My AI Readiness Score
          </p>

          {/* Score + grade badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  fontSize: 64,
                  fontWeight: 900,
                  fontFamily: "Arial Black, sans-serif",
                  color: "white",
                  lineHeight: 1,
                }}
              >
                {percentage}
              </span>
              <span
                style={{
                  fontSize: 24,
                  color: "#85B7EB",
                  fontFamily: "Arial Black, sans-serif",
                  verticalAlign: "super",
                  marginLeft: 4,
                }}
              >
                /100
              </span>
            </div>

            {/* Grade badge */}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: `${grade.color}22`,
                border: `2px solid ${grade.color}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  fontFamily: "Arial Black, sans-serif",
                  color: grade.color,
                  lineHeight: 1,
                }}
              >
                {grade.grade}
              </span>
              <span style={{ fontSize: 8, color: "#85B7EB", marginTop: 1, textAlign: "center" }}>
                {grade.label}
              </span>
            </div>
          </div>

          {/* Band label */}
          <p
            style={{
              fontSize: 16,
              fontWeight: 900,
              fontFamily: "Arial Black, sans-serif",
              color: band.color,
              letterSpacing: "0.05em",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            {band.label}
          </p>

          {/* Mini dimension bars */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
            {dimensions.map((dim) => {
              const pct = Math.round((dimScores[dim.id] / 30) * 100);
              return (
                <div
                  key={dim.id}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <span style={{ fontSize: 10, width: 14, textAlign: "center", flexShrink: 0 }}>
                    {dim.icon}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      color: "#85B7EB",
                      width: 70,
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {dimShortNames[dim.id]}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 6,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderRadius: 999,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        backgroundColor: dim.color,
                        borderRadius: 999,
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 9, color: "#85B7EB", width: 28, textAlign: "right", flexShrink: 0 }}>
                    {dimScores[dim.id]}/30
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            backgroundColor: "#0C447C",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ fontSize: 10, color: "#85B7EB", margin: 0, lineHeight: 1.6 }}>
              🔒 Data · 📋 Policy · 🛠️ Tools
            </p>
            <p style={{ fontSize: 10, color: "#85B7EB", margin: 0, lineHeight: 1.6 }}>
              🛡️ Cyber · 🎓 Workforce
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 900,
                fontFamily: "Arial Black, sans-serif",
                color: "#378ADD",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              #ResponsibleAIClassroom
            </p>
            <p style={{ fontSize: 10, color: "#85B7EB", margin: 0, lineHeight: 1.6 }}>
              Take the free assessment →
            </p>
          </div>
        </div>
      </div>

      {/* Screenshot hint */}
      <p
        style={{
          textAlign: "center",
          fontSize: 12,
          fontStyle: "italic",
          color: "#85B7EB",
          margin: "10px 0 14px",
        }}
      >
        Screenshot the card above to share your score on LinkedIn or WhatsApp
      </p>

      {/* Copy button */}
<button
  onClick={handleCopy}
  style={{
    width: "100%",
    backgroundColor: copied ? "#1A9E6B" : "#0C447C",
    border: `1px solid ${copied ? "#1A9E6B" : "rgba(55,138,221,0.4)"}`,
    color: "white",
    fontWeight: 700,
    fontSize: 14,
    padding: "14px 0",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background-color 0.2s, border-color 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 10,
  }}
>
  {copied ? "✅ Copied to clipboard!" : "📋 Copy Share Text"}
</button>

{/* WhatsApp share button */}
<button
  onClick={() => {
    const text = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?phone=2348062794852&text=${text}`, "_blank");
  }}
  style={{
    width: "100%",
    backgroundColor: "#25D366",
    color: "white",
    fontWeight: 700,
    fontSize: 14,
    padding: "14px 0",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "opacity 0.2s",
    marginBottom: 10,
  }}
  onMouseOver={(e) => (e.currentTarget.style.opacity = 0.85)}
  onMouseOut={(e)  => (e.currentTarget.style.opacity = 1)}
>
  <svg
    width="18" height="18"
    viewBox="0 0 24 24"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.14 1.534 5.876L0 24l6.29-1.51A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.88 9.88 0 01-5.047-1.38l-.361-.214-3.736.897.934-3.62-.236-.373A9.844 9.844 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118c5.468 0 9.882 4.415 9.882 9.882 0 5.468-4.414 9.882-9.882 9.882z"/>
  </svg>
  Share via WhatsApp
</button>
    </div>
  );
}