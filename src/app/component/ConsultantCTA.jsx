"use client";

const LINKEDIN_URL = "https://www.linkedin.com/in/barnabasoyewole/";

const services = [
  "AI Readiness Assessment and Audit",
  "Responsible AI Policy Design",
  "Faculty Development and Training",
  "Curriculum AI Integration Strategy",
];

export default function ConsultantCTA({ percentage }) {
  if (percentage >= 50) return null;

  const isCritical = percentage < 40;

  const config = isCritical
    ? {
        bg:          "#1A0000",
        border:      "#C0392B",
        stripBg:     "rgba(192,57,43,0.2)",
        stripColor:  "#C0392B",
        stripText:   "🔴 YOUR INSTITUTION NEEDS SUPPORT",
        bulletColor: "#C0392B",
        btnBg:       "#C0392B",
        heading:
          "Your score indicates critical gaps that need professional guidance.",
      }
    : {
        bg:          "#1A0800",
        border:      "#E07B1A",
        stripBg:     "rgba(224,123,26,0.2)",
        stripColor:  "#E07B1A",
        stripText:   "⚠️ YOUR INSTITUTION HAS SIGNIFICANT GAPS",
        bulletColor: "#E07B1A",
        btnBg:       "#E07B1A",
        heading:
          "Your score suggests significant gaps that are worth addressing with support.",
      };

  return (
    <div
      style={{
        backgroundColor: config.bg,
        border: `2px solid ${config.border}`,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 24,
      }}
    >
      {/* Top label strip */}
      <div
        style={{
          backgroundColor: config.stripBg,
          padding: "10px 24px",
          borderBottom: `1px solid ${config.border}`,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 900,
            fontFamily: "Arial Black, sans-serif",
            color: config.stripColor,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {config.stripText}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "28px 24px 24px" }}>

        {/* Heading */}
        <p
          style={{
            fontSize: 22,
            fontWeight: 900,
            fontFamily: "Arial Black, sans-serif",
            color: "white",
            lineHeight: 1.3,
            marginBottom: 16,
          }}
        >
          {config.heading}
        </p>

        {/* Body text */}
        <p
          style={{
            fontSize: 15,
            color: "#85B7EB",
            lineHeight: 1.7,
            marginBottom: 20,
          }}
        >
          I work with educational institutions, EdTech teams, and STEM
          faculties to build responsible AI adoption frameworks — covering
          data privacy, policy design, tool readiness, cybersecurity
          awareness, and workforce alignment. If your institution scored
          below 50, these are not gaps you want to close alone or slowly.
        </p>

        {/* Services list */}
        <div style={{ marginBottom: 24 }}>
          {services.map((service) => (
            <div
              key={service}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  color: config.bulletColor,
                  fontSize: 16,
                  lineHeight: 1.4,
                  flexShrink: 0,
                }}
              >
                •
              </span>
              <span style={{ fontSize: 15, color: "white", lineHeight: 1.5 }}>
                {service}
              </span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
<div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
  <button
    onClick={() => window.open(LINKEDIN_URL, "_blank")}
    style={{
      flex: 1,
      backgroundColor: config.btnBg,
      color: "white",
      fontWeight: 900,
      fontFamily: "Arial Black, sans-serif",
      fontSize: 15,
      padding: "16px 0",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      letterSpacing: "0.02em",
      transition: "opacity 0.2s",
    }}
    onMouseOver={(e) => (e.currentTarget.style.opacity = 0.85)}
    onMouseOut={(e)  => (e.currentTarget.style.opacity = 1)}
  >
    Let's Talk →
  </button>

  <button
    onClick={() =>
      window.open(
        "https://api.whatsapp.com/send?phone=2348062794852&text=Hi%20Barnabas%2C%20I%20just%20completed%20the%20Responsible%20AI%20Classroom%20assessment%20and%20would%20like%20to%20discuss%20my%20results.",
        "_blank"
      )
    }
    style={{
      flex: 1,
      backgroundColor: "#25D366",
      color: "white",
      fontWeight: 900,
      fontFamily: "Arial Black, sans-serif",
      fontSize: 15,
      padding: "16px 0",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      letterSpacing: "0.02em",
      transition: "opacity 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
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
    WhatsApp
  </button>
</div>
        {/* LinkedIn line */}
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#85B7EB",
            marginBottom: 6,
          }}
        >
          Connect on LinkedIn · Barnabas Oyewole
        </p>

        {/* Tagline */}
        {/* Tagline */}
<p
  style={{
    textAlign: "center",
    fontSize: 13,
    fontStyle: "italic",
    color: "#85B7EB",
    marginBottom: 12,
  }}
>
  STEM Instructor · Educator · Innovation Developer
</p>

{/* Framework PDF */}
        <p style={{ textAlign: "center", margin: 0 }}>
          <a
            href="https://drive.google.com/file/d/1o4mqpjtBRW1QQZkzcWSnjzrVmy3uVcGO/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12,
              color: "#85B7EB",
              textDecoration: "underline",
            }}
          >
            Download the Responsible AI Classroom Framework →
          </a>
        </p>
      </div>
    </div>
  );
}