"use client";

import { useRef } from "react";
import { dimensions } from "../data/questions";

function getScoreBand(percentage) {
  if (percentage >= 80) return { label: "AI READY",             color: "#1A9E6B" };
  if (percentage >= 60) return { label: "PROGRESSING",          color: "#378ADD" };
  if (percentage >= 40) return { label: "AT RISK",              color: "#E07B1A" };
  return                       { label: "URGENT ACTION NEEDED", color: "#C0392B" };
}

function getRiskLabel(score) {
  if (score >= 25) return { label: "LEADING",          color: "#1A9E6B" };
  if (score >= 20) return { label: "STRONG",           color: "#1A9E6B" };
  if (score >= 15) return { label: "MODERATE",         color: "#378ADD" };
  if (score >= 10) return { label: "AT RISK",          color: "#E07B1A" };
  return                   { label: "CRITICAL EXPOSURE", color: "#C0392B" };
}

// Tiebreaker priority order
const tiebreakOrder = ["cyber", "privacy", "policy", "tool", "workforce"];

const priorityText = {
  privacy:
    "Create a vendor data audit this week. List every EdTech tool in use, what data it collects, and where it is stored. This single action puts you ahead of 80% of institutions.",
  policy:
    "Write one sentence that answers: When is AI permitted in your courses and what must students disclose? That sentence is the foundation of your entire AI policy.",
  tool:
    "Run the 5-point vetting checklist on your top 3 AI tools this week. Any tool that fails 2 or more criteria needs an immediate review conversation.",
  cyber:
    "Schedule a 30-minute meeting with your IT lead this week. Ask one question: What is our incident response plan if a core platform is breached? If there is no clear answer, that is your starting point.",
  workforce:
    "Map your current curriculum against 3 skills: AI literacy, data reasoning, and human-AI collaboration. Find one existing module where AI literacy can be embedded without a full redesign.",
};

export default function PriorityAction({ scores, recommendationsRef }) {
  const { dimScores, percentage } = scores;
  const band = getScoreBand(percentage);

  // Find the lowest scoring dimension with tiebreaker
  const minScore = Math.min(...dimensions.map((d) => dimScores[d.id]));
  const tied     = dimensions.filter((d) => dimScores[d.id] === minScore);
  const priority = tied.length === 1
    ? tied[0]
    : tiebreakOrder
        .map((id) => tied.find((d) => d.id === id))
        .find(Boolean);

  const score    = dimScores[priority.id];
  const risk     = getRiskLabel(score);

  function handleScrollToRecs() {
    if (recommendationsRef?.current) {
      recommendationsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <>
      <style>{`
        @keyframes priorityBorderPulse {
          0%   { opacity: 1;   }
          50%  { opacity: 0.35; }
          100% { opacity: 1;   }
        }
      `}</style>

      <div
        style={{
          backgroundColor: `${band.color}1E`,
          border: `2px solid ${band.color}`,
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 20,
        }}
      >
        {/* Top strip */}
        <div
          style={{
            backgroundColor: `${band.color}33`,
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>🎯</span>
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
              Your #1 Priority This Week
            </span>
          </div>

          {/* Risk badge */}
          <span
            style={{
              fontSize: 9,
              fontWeight: 900,
              fontFamily: "Arial Black, sans-serif",
              color: risk.color,
              backgroundColor: `${risk.color}22`,
              border: `1px solid ${risk.color}`,
              padding: "3px 8px",
              borderRadius: 999,
              whiteSpace: "nowrap",
              letterSpacing: "0.06em",
              flexShrink: 0,
            }}
          >
            {risk.label}
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 20px 24px" }}>

          {/* Dimension name */}
          <p
            style={{
              fontSize: 22,
              fontWeight: 900,
              fontFamily: "Arial Black, sans-serif",
              color: "white",
              marginBottom: 6,
              lineHeight: 1.2,
            }}
          >
            {priority.icon} {priority.label}
          </p>

          {/* Score line */}
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: band.color,
              marginBottom: 16,
            }}
          >
            {score} / 30 — {risk.label}
          </p>

          {/* Priority action text */}
          <p
            style={{
              fontSize: 14,
              color: "#85B7EB",
              lineHeight: 1.7,
              marginBottom: 24,
            }}
          >
            {priorityText[priority.id]}
          </p>

          {/* CTA button */}
          <button
            onClick={handleScrollToRecs}
            style={{
              backgroundColor: band.color,
              color: "white",
              fontWeight: 900,
              fontFamily: "Arial Black, sans-serif",
              fontSize: 14,
              padding: "12px 24px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.02em",
              display: "block",
              width: "100%",
              marginBottom: 12,
              transition: "opacity 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = 0.85)}
            onMouseOut={(e)  => (e.currentTarget.style.opacity = 1)}
          >
            Get the Full Action Plan →
          </button>

          {/* PDF link placeholder */}
          <p style={{ textAlign: "center", margin: 0 }}>
            <span
              style={{
                fontSize: 12,
                color: "#85B7EB",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Download the complete Responsible AI Classroom Framework →
            </span>
          </p>
        </div>
      </div>
    </>
  );
}