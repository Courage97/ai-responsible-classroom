"use client";

import { useEffect, useState, useRef } from "react";

function getStartCount() {
  const now = new Date();
  const secondsSinceMidnight =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  return Math.floor(secondsSinceMidnight * 0.004141);
}

export default function UrgencyTicker() {
  const [count, setCount]       = useState(getStartCount);
  const [flashing, setFlashing] = useState(false);
  const intervalRef             = useRef(null);

  useEffect(() => {
    // Increment every 241 seconds (1 attack per 241s globally on campuses)
    intervalRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
      setFlashing(true);
      setTimeout(() => setFlashing(false), 200);
    }, 241000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <>
      {/* Inject keyframes once */}
      <style>{`
        @keyframes tickerPulse {
          0%   { transform: scale(1);   opacity: 1;   }
          50%  { transform: scale(1.5); opacity: 0.6; }
          100% { transform: scale(1);   opacity: 1;   }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "#042C53",
          borderTop: "1px solid rgba(192,57,43,0.4)",
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 16,
          paddingRight: 16,
          gap: 12,
        }}
      >
        {/* Left — LIVE dot + label */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#C0392B",
              animation: "tickerPulse 1.5s infinite",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 900,
              fontFamily: "Arial Black, sans-serif",
              color: "#C0392B",
              letterSpacing: "0.15em",
            }}
          >
            LIVE
          </span>
        </div>

        {/* Centre — message + counter */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "white",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Cyberattacks on educational institutions today:
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 900,
              fontFamily: "Arial Black, sans-serif",
              color: flashing ? "white" : "#C0392B",
              transition: "color 0.2s ease",
              flexShrink: 0,
            }}
          >
            {count.toLocaleString()}
          </span>
        </div>

        {/* Right — source */}
        <span
          style={{
            fontSize: 10,
            color: "#85B7EB",
            fontStyle: "italic",
            whiteSpace: "nowrap",
            flexShrink: 0,
            display: "none",
          }}
          className="ticker-source"
        >
          Source: Education Cybersecurity Report 2025
        </span>
      </div>

      {/* Show source label on wider screens */}
      <style>{`
        @media (min-width: 640px) {
          .ticker-source { display: block !important; }
        }
      `}</style>
    </>
  );
}