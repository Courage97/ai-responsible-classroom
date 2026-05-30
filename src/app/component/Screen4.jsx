"use client";

import { useEffect, useRef, useState } from "react";
import ShareCard from "./ShareCard";
import PriorityAction from "./PriorityAction";
import Wordmark from "./shared/Wordmark";
import CornerBrackets from "./shared/CornerBrackets";
import ConsultantCTA from "./ConsultantCTA";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { dimensions } from "../data/questions";



// ── Helpers ──────────────────────────────────────────────
function getLetterGrade(percentage) {
  if (percentage >= 90) return { grade: "A+", label: "Exemplary",           color: "#1A9E6B" };
  if (percentage >= 80) return { grade: "A",  label: "AI Ready",            color: "#1A9E6B" };
  if (percentage >= 70) return { grade: "B",  label: "Progressing Well",    color: "#378ADD" };
  if (percentage >= 60) return { grade: "C",  label: "Progressing",         color: "#378ADD" };
  if (percentage >= 50) return { grade: "D",  label: "At Risk",             color: "#E07B1A" };
  if (percentage >= 40) return { grade: "D-", label: "Significant Risk",    color: "#E07B1A" };
  return                       { grade: "F",  label: "Urgent Action Needed", color: "#C0392B" };
}

function getScoreBand(percentage) {
  if (percentage >= 80) return { label: "AI Ready",             color: "#1A9E6B" };
  if (percentage >= 60) return { label: "Progressing",          color: "#378ADD" };
  if (percentage >= 40) return { label: "At Risk",              color: "#E07B1A" };
  return                       { label: "Urgent Action Needed", color: "#C0392B" };
}

function getRiskFlag(score) {
  if (score >= 25) return {
    label:      "LEADING",
    color:      "#1A9E6B",
    icon:       "✅",
    cardBg:     "#0C447C",
    borderColor: "rgba(26,158,107,0.6)",
    pulse:      false,
    critical:   false,
  };
  if (score >= 20) return {
    label:      "STRONG",
    color:      "#1A9E6B",
    icon:       "✅",
    cardBg:     "#0C447C",
    borderColor: "rgba(26,158,107,0.4)",
    pulse:      false,
    critical:   false,
  };
  if (score >= 15) return {
    label:      "MODERATE",
    color:      "#378ADD",
    icon:       "⚠️",
    cardBg:     "#0C447C",
    borderColor: "rgba(55,138,221,0.4)",
    pulse:      false,
    critical:   false,
  };
  if (score >= 10) return {
    label:      "AT RISK",
    color:      "#E07B1A",
    icon:       "⚠️",
    cardBg:     "#1A0F00",
    borderColor: "rgba(224,123,26,0.6)",
    pulse:      true,
    pulseColor: "#E07B1A",
    critical:   false,
  };
  return {
    label:      "CRITICAL EXPOSURE",
    color:      "#C0392B",
    icon:       "🔴",
    cardBg:     "#1A0000",
    borderColor: "#C0392B",
    pulse:      true,
    pulseColor: "#C0392B",
    critical:   true,
  };
}

function getDimBadge(score) {
  if (score >= 25) return { label: "Strong",   cls: "rac-badge-strong"   };
  if (score >= 15) return { label: "Moderate", cls: "rac-badge-moderate" };
  return                   { label: "Weak",     cls: "rac-badge-weak"     };
}

function getInstitutionLabel(type) {
  const map = {
    k12:          "K-12 School Assessment",
    higher:       "Higher Education Assessment",
    edtech:       "EdTech Startup Assessment",
    independent:  "Independent Educator Assessment",
  };
  return map[type] ?? "Institution Assessment";
}

function countByStatus(dimScores) {
  let strong = 0, moderate = 0, weak = 0;
  Object.values(dimScores).forEach((s) => {
    if (s >= 25) strong++;
    else if (s >= 15) moderate++;
    else weak++;
  });
  return { strong, moderate, weak };
}

// ── Recommendation Copy ───────────────────────────────────
const recommendations = {
  privacy: {
    title: "Data Privacy",
    icon: "🔒",
    color: "#378ADD",
    body: "Start with a simple vendor audit. Before adopting any new tool, ask three questions: What data is collected? Where is it stored? Can it be used to train external AI models? This alone puts you ahead of most institutions.",
  },
  policy: {
    title: "AI Usage Policy",
    icon: "📋",
    color: "#1A9E6B",
    body: "You do not need a 40-page document. Start with a one-page AI Acceptable Use Statement covering three areas: when AI is permitted, how students must disclose AI use, and what counts as academic integrity in an AI context.",
  },
  tool: {
    title: "Tool Readiness",
    icon: "🛠️",
    color: "#E07B1A",
    body: "Run a tool audit this term. List every AI tool currently in use across your institution. For each one ask: Is it rubric-aligned? Can we audit its outputs? Are staff trained on it? You will likely find tools being used that no one officially approved.",
  },
  cyber: {
    title: "Cyber Infrastructure",
    icon: "🛡️",
    color: "#C0392B",
    body: "Request a cybersecurity risk assessment from your IT team or a third-party provider this quarter. Focus on: LMS access controls, staff phishing awareness, and your incident response plan.",
  },
  workforce: {
    title: "Workforce Alignment",
    icon: "🎓",
    color: "#7B6FC4",
    body: "Map your current curriculum against three AI-era skills: AI literacy, data reasoning, and human-AI collaboration. Even adding one module per semester begins closing the gap between what you are teaching and what the job market now requires.",
  },
};

// ── Score Circle ──────────────────────────────────────────
function ScoreCircle({ percentage, band }) {
  const [displayed, setDisplayed]         = useState(0);
  const [pulse, setPulse]                 = useState(false);
  const [showGrade, setShowGrade]         = useState(false);
  const [showBandLabel, setShowBandLabel] = useState(false);

  const grade        = getLetterGrade(percentage);
  const radius       = 54;
  const circumference = 2 * Math.PI * radius;
  const offset       = circumference - (displayed / 100) * circumference;

  useEffect(() => {
    // Count-up over 1500ms at ~16ms intervals
    const duration  = 1500;
    const frames    = duration / 16;
    const increment = percentage / frames;
    let current     = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= percentage) {
        setDisplayed(percentage);
        clearInterval(timer);

        // Step 3 — pulse
        setPulse(true);
        setTimeout(() => setPulse(false), 300);

        // Step 4 — letter grade fade in
        setTimeout(() => setShowGrade(true), 200);

        // Step 5 — band label slide up
        setTimeout(() => setShowBandLabel(true), 400);
      } else {
        setDisplayed(Math.round(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [percentage]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 8 }}>

      {/* Score circle + grade badge row */}
      <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>

        {/* SVG ring */}
        <svg
          width="140" height="140"
          viewBox="0 0 140 140"
          style={{
            transform: pulse ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Track */}
          <circle
            cx="70" cy="70" r={radius}
            fill="none"
            stroke="rgba(55,138,221,0.15)"
            strokeWidth="10"
          />
          {/* Fill */}
          <circle
            cx="70" cy="70" r={radius}
            fill="none"
            stroke={band.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 70 70)"
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
          {/* Score number */}
          <text
            x="70" y="62"
            textAnchor="middle"
            fill="white"
            fontSize="36"
            fontWeight="900"
            fontFamily="Arial Black, sans-serif"
          >
            {displayed}
          </text>
          {/* /100 */}
          <text
            x="70" y="84"
            textAnchor="middle"
            fill="#85B7EB"
            fontSize="14"
            fontFamily="Inter, sans-serif"
          >
            / 100
          </text>
        </svg>

        {/* Letter grade badge — top right */}
        <div
          style={{
            position: "absolute",
            top: -8,
            right: -16,
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: `${grade.color}22`,
            border: `2px solid ${grade.color}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: showGrade ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 900,
              fontFamily: "Arial Black, sans-serif",
              color: grade.color,
              lineHeight: 1,
            }}
          >
            {grade.grade}
          </span>
          <span style={{ fontSize: 9, color: "#85B7EB", marginTop: 2, textAlign: "center", lineHeight: 1.2 }}>
            {grade.label}
          </span>
        </div>
      </div>

      {/* Band label — slides up */}
      <div
        style={{
          marginTop: 10,
          opacity: showBandLabel ? 1 : 0,
          transform: showBandLabel ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: band.color,
            letterSpacing: "-0.01em",
            marginBottom: 2,
          }}
        >
          {band.label}
        </p>
      </div>
    </div>
  );
}

// ── Section Label ─────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 800,
          color: "#85B7EB",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          backgroundColor: "rgba(55,138,221,0.2)",
        }}
      />
    </div>
  );
}

// ── Dimension Bar Row ─────────────────────────────────────
function DimensionRow({ dim, score, index }) {
  const [width, setWidth] = useState(0);
  const pct  = Math.round((score / 30) * 100);
  const risk = getRiskFlag(score);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(pct), 150 + index * 100);
    return () => clearTimeout(timer);
  }, [pct, index]);

  return (
    <>
      {/* Inject pulse keyframe */}
      <style>{`
        @keyframes riskBorderPulse {
          0%   { opacity: 1;   }
          50%  { opacity: 0.3; }
          100% { opacity: 1;   }
        }
        @keyframes riskBarPulse {
          0%   { opacity: 1;   }
          50%  { opacity: 0.6; }
          100% { opacity: 1;   }
        }
      `}</style>

      <div
        style={{
          backgroundColor: risk.cardBg,
          border: `1px solid ${risk.borderColor}`,
          borderRadius: 12,
          padding: "14px 14px 12px",
          marginBottom: 10,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Critical banner */}
        {risk.critical && (
          <div
            style={{
              backgroundColor: "rgba(192,57,43,0.2)",
              borderBottom: "1px solid rgba(192,57,43,0.4)",
              margin: "-14px -14px 12px",
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 900,
                fontFamily: "Arial Black, sans-serif",
                color: "#C0392B",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              ⚠️ IMMEDIATE ATTENTION REQUIRED
            </span>
          </div>
        )}

        {/* Pulsing left accent bar */}
        {risk.pulse && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              backgroundColor: risk.pulseColor,
              borderRadius: "12px 0 0 12px",
              animation: "riskBorderPulse 2s infinite",
            }}
          />
        )}

        {/* Row content */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            paddingLeft: risk.pulse ? 8 : 0,
          }}
        >
          <span style={{ fontSize: 15, width: 22, textAlign: "center", flexShrink: 0 }}>
            {risk.icon}
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: dim.color,
              width: 115,
              flexShrink: 0,
            }}
          >
            {dim.label}
          </span>

          {/* Score bar */}
          <div
            style={{
              flex: 1,
              height: 8,
              backgroundColor: risk.critical
                ? "rgba(192,57,43,0.2)"
                : risk.label === "AT RISK"
                ? "rgba(224,123,26,0.2)"
                : "rgba(55,138,221,0.15)",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${width}%`,
                backgroundColor: risk.color,
                borderRadius: 999,
                transition: "width 0.6s ease-out",
                animation:
                  risk.critical
                    ? "riskBarPulse 1.5s infinite"
                    : risk.label === "AT RISK"
                    ? "riskBarPulse 2s infinite"
                    : "none",
              }}
            />
          </div>

          <span
            style={{
              fontSize: 11,
              color: "#85B7EB",
              width: 34,
              textAlign: "right",
              flexShrink: 0,
            }}
          >
            {score}/30
          </span>

          {/* Risk badge */}
          <span
            style={{
              fontSize: 9,
              fontWeight: 900,
              fontFamily: "Arial Black, sans-serif",
              color: risk.color,
              backgroundColor: `${risk.color}22`,
              border: `1px solid ${risk.color}`,
              padding: "3px 7px",
              borderRadius: 999,
              whiteSpace: "nowrap",
              flexShrink: 0,
              letterSpacing: "0.06em",
            }}
          >
            {risk.label}
          </span>
        </div>
      </div>
    </>
  );
}
// ── Recommendation Card ───────────────────────────────────
function RecCard({ dim }) {
  const rec  = recommendations[dim.id];
  const risk = getRiskFlag(dim.score ?? 0);
  const isCritical = risk.critical;
  const isAtRisk   = risk.label === "AT RISK";

  const headerBg = isCritical
    ? "rgba(192,57,43,0.15)"
    : isAtRisk
    ? "rgba(224,123,26,0.15)"
    : "transparent";

  const headerBorder = isCritical
    ? "1px solid #C0392B"
    : isAtRisk
    ? "1px solid #E07B1A"
    : "none";

  const headerTitle = isCritical
    ? `🔴 CRITICAL — ${rec.title}`
    : isAtRisk
    ? `⚠️ AT RISK — ${rec.title}`
    : `${rec.icon} ${rec.title}`;

  return (
    <div
      style={{
        backgroundColor: risk.cardBg,
        borderRadius: 14,
        marginBottom: 10,
        overflow: "hidden",
        border: `1px solid ${risk.borderColor}`,
        position: "relative",
      }}
    >
      {/* Pulsing left accent */}
      {risk.pulse && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            backgroundColor: risk.pulseColor,
            animation: "riskBorderPulse 2s infinite",
          }}
        />
      )}

      {/* Header */}
      <div
        style={{
          backgroundColor: headerBg,
          border: headerBorder,
          borderRadius: "14px 14px 0 0",
          padding: "14px 18px 12px",
          paddingLeft: risk.pulse ? 22 : 18,
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 900,
            fontFamily: "Arial Black, sans-serif",
            color: rec.color,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: isCritical || isAtRisk ? 4 : 0,
          }}
        >
          {headerTitle}
        </p>

        {(isCritical || isAtRisk) && (
          <p
            style={{
              fontSize: 12,
              fontStyle: "italic",
              color: isCritical ? "#C0392B" : "#E07B1A",
              margin: 0,
            }}
          >
            {isCritical
              ? "This dimension requires immediate institutional attention."
              : "This dimension needs urgent prioritisation this term."}
          </p>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "14px 18px", paddingLeft: risk.pulse ? 22 : 18 }}>
        <p
          style={{
            fontSize: 13,
            color: "#85B7EB",
            lineHeight: 1.65,
            marginBottom: 10,
          }}
        >
          {rec.body}
        </p>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 700,
            color: "var(--color-sky)",
            padding: 0,
          }}
        >
          Learn more →
        </button>
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────
export default function Screen4({ scores, institutionType, onRetake }) {
  const [copied, setCopied] = useState(false);
  const { dimScores, percentage } = scores;
  const band = getScoreBand(percentage);
  const { strong, moderate, weak } = countByStatus(dimScores);

  const radarData = dimensions.map((dim) => ({
    subject: dim.label,
    score: dimScores[dim.id],
    fullMark: 30,
  }));

  const sorted = [...dimensions].sort(
    (a, b) => dimScores[a.id] - dimScores[b.id]
  );
  const weakest = sorted.slice(0, 2);

  const shareText = `I just assessed my institution's AI readiness with The Responsible AI Classroom tool.\nMy score: ${percentage}/100 — ${band.label}.\nHow does yours compare?\nBuilt by Barnabas Oyewole · The Learning Signal`;
  const recommendationsRef = useRef(null);

  function handleCopy() {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      className="animate-fadeIn"
      style={{
        backgroundColor: "var(--color-navy)",
        minHeight: "100vh",
        paddingBottom: "4rem",
      }}
    >
      <div
        className="relative px-6 pt-8 max-w-2xl mx-auto"
        style={{ minHeight: "100vh" }}
      >
        <CornerBrackets />
        <Wordmark />

        {/* ── Section A: Hero Band ── */}
<div
  style={{
    backgroundColor: "var(--color-navy-card)",
    border: "1px solid rgba(55,138,221,0.3)",
    borderRadius: 16,
    padding: "28px 20px 20px",
    marginTop: 20,
    marginBottom: 14,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  }}
>
  <ScoreCircle percentage={percentage} band={band} />

  <p style={{ fontSize: 13, color: "#85B7EB", marginTop: 6 }}>
    {getInstitutionLabel(institutionType)}
  </p>

  {/* Band progress bar */}
  <div
    style={{
      width: "100%",
      maxWidth: 300,
      height: 6,
      backgroundColor: "rgba(55,138,221,0.2)",
      borderRadius: 999,
      overflow: "hidden",
      margin: "12px auto 6px",
    }}
  >
    <div
      style={{
        height: "100%",
        width: `${percentage}%`,
        backgroundColor: band.color,
        borderRadius: 999,
        transition: "width 1.5s ease-out",
      }}
    />
  </div>
  <p style={{ fontSize: 11, color: "#85B7EB" }}>
    Overall score: {percentage} / 100
  </p>
</div>

        {/* ── Stat Summary Row ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {[
            { val: strong,   label: "Strong Areas",   color: "#1A9E6B" },
            { val: moderate, label: "Moderate Areas",  color: "#E07B1A" },
            { val: weak,     label: "Weak Areas",      color: "#C0392B" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                backgroundColor: "var(--color-navy-card)",
                border: "1px solid rgba(55,138,221,0.25)",
                borderRadius: 12,
                padding: "14px 12px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: item.color,
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {item.val}
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: "#85B7EB",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Section B: Radar Chart ── */}
        <SectionLabel>Dimension Overview</SectionLabel>
        <div
          style={{
            backgroundColor: "var(--color-navy-card)",
            border: "1px solid rgba(55,138,221,0.3)",
            borderRadius: 14,
            padding: "20px 16px",
            marginBottom: 20,
          }}
        >
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData} margin={{ top: 10, right: 36, bottom: 10, left: 36 }}>
              <PolarGrid stroke="rgba(55,138,221,0.2)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fill: "#85B7EB",
                  fontSize: 11,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                }}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#378ADD"
                strokeWidth={2}
                fill="#378ADD"
                fillOpacity={0.25}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

       {/* ── Section B2: Priority Action ── */}
        <PriorityAction
        scores={scores}
        recommendationsRef={recommendationsRef}
        />

        {/* ── Section C: Dimension Breakdown ── */}
        <SectionLabel>Score Breakdown</SectionLabel>
        <div style={{ marginBottom: 20 }}>
        {dimensions.map((dim, i) => (
            <DimensionRow
            key={dim.id}
            dim={dim}
            score={dimScores[dim.id]}
            index={i}
            />
        ))}
        </div>

        {/* ── Section D: Action Plan ── */}
        <div ref={recommendationsRef}>
        <SectionLabel>Your Action Plan</SectionLabel>
        </div>
        <div style={{ marginBottom: 20 }}>
        {weakest.map((dim) => (
            <RecCard
            key={dim.id}
            dim={{ ...dim, score: dimScores[dim.id] }}
            />
        ))}
        </div>

        
        {/* ── Section E: Share ── */}
<SectionLabel>Share Your Results</SectionLabel>
<div style={{ marginBottom: 20 }}>
  <ShareCard scores={scores} />
</div>
<ConsultantCTA percentage={percentage} />

        {/* ── Attribution Footer ── */}
        <div style={{ textAlign: "center", paddingBottom: "2rem" }}>
          <p style={{ fontSize: 11, color: "#85B7EB", lineHeight: 2 }}>
            Built by Barnabas Oyewole
          </p>
          <p style={{ fontSize: 11, color: "#85B7EB", lineHeight: 2 }}>
            STEM Instructor · Educator · Innovation Developer
          </p>
          <p style={{ fontSize: 11, color: "#85B7EB", lineHeight: 2 }}>
            Part of The Learning Signal series
          </p>
          <p style={{ fontSize: 11, color: "var(--color-sky)", fontWeight: 700, lineHeight: 2 }}>
            thelearningsignal
          </p>
        </div>
      </div>
    </div>
  );
}