"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const trustItems = [
  {
    label: "100% Local Processing",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ width: 16, height: 16, flexShrink: 0, color: "var(--text-primary, #ededed)" }}
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "Fast Compression",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ width: 16, height: 16, flexShrink: 0, color: "var(--text-primary, #ededed)" }}
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    label: "No Ads",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ width: 16, height: 16, flexShrink: 0, color: "var(--text-primary, #ededed)" }}
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    label: "Developer Friendly",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ width: 16, height: 16, flexShrink: 0, color: "var(--text-primary, #ededed)" }}
      >
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
      </svg>
    ),
  },
];

const featureCards = [
  {
    title: "One-Click Minify",
    description: "Convert formatted JSON into a compact single-line payload instantly.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ width: 18, height: 18 }}
      >
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M12 12v9" />
        <path d="m8 17 4 4 4-4" />
      </svg>
    ),
  },
  {
    title: "Safe Local Processing",
    description: "Your JSON stays in the browser and never leaves your device.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ width: 18, height: 18 }}
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Ready for APIs",
    description: "Prepare payloads for requests, storage, logs, and transport with less size overhead.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ width: 18, height: 18 }}
      >
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
      </svg>
    ),
  },
];

function syntaxHighlight(json: string) {
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          return `<span style="color:var(--json-key,#3291ff)">${match.replace(/:$/, "")}</span><span style="color:var(--text-secondary,#888)">:</span>`;
        }
        return `<span style="color:var(--json-string,#27c93f)">${match}</span>`;
      }
      if (/true|false/.test(match)) {
        return `<span style="color:var(--json-boolean,#ff0080)">${match}</span>`;
      }
      if (/null/.test(match)) {
        return `<span style="color:var(--json-null,#888);font-style:italic">${match}</span>`;
      }
      return `<span style="color:var(--json-number,#f5a623)">${match}</span>`;
    }
  );
}

export default function HomePage() {
  const [inputVal, setInputVal] = useState("");
  const [outputHtml, setOutputHtml] = useState("");
  const [status, setStatus] = useState<{ text: string; type: "default" | "success" | "error" }>({
    text: "Ready",
    type: "default",
  });
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function parseInput(raw = inputVal) {
    const trimmed = raw.trim();
    if (!trimmed) {
      setStatus({ text: "Ready", type: "default" });
      return null;
    }

    try {
      const parsed = JSON.parse(trimmed);
      setStatus({ text: "Valid JSON", type: "success" });
      return parsed;
    } catch {
      setStatus({ text: "Invalid JSON", type: "error" });
      return null;
    }
  }

  function actionMinify() {
    const parsed = parseInput();
    if (!parsed) return;
    const minified = JSON.stringify(parsed);
    setOutputHtml(syntaxHighlight(minified));
    setStatus({ text: "JSON Minified", type: "success" });
  }

  function actionClear() {
    setInputVal("");
    setOutputHtml("");
    setStatus({ text: "Ready", type: "default" });
  }

  function loadSample() {
    const sample = {
      project: "JSONPro",
      isPremium: true,
      users: 1000000,
      features: ["Minify", "Validate", "Tree View"],
      api: null,
      meta: {
        env: "production",
        version: "1.0.0",
      },
    };

    const str = JSON.stringify(sample, null, 4);
    setInputVal(str);
    setOutputHtml(syntaxHighlight(JSON.stringify(sample)));
    setStatus({ text: "Sample Loaded", type: "success" });
  }

  function copyOutput() {
    const el = document.getElementById("output-area");
    if (el?.innerText) {
      navigator.clipboard.writeText(el.innerText);
      setStatus({ text: "Copied", type: "success" });
      setTimeout(() => {
        const parsed = parseInput();
        if (parsed) setStatus({ text: "JSON Minified", type: "success" });
      }, 1500);
    }
  }

  function downloadOutput() {
    const el = document.getElementById("output-area");
    if (!el?.innerText) return;

    const blob = new Blob([el.innerText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minified.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleInputChange(val: string) {
    setInputVal(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (!val.trim()) {
        setStatus({ text: "Ready", type: "default" });
        return;
      }
      parseInput(val);
    }, 300);
  }

  const statusColor =
    status.type === "success"
      ? "var(--success, #10b981)"
      : status.type === "error"
      ? "var(--error, #ef4444)"
      : "var(--text-secondary, #888)";

  return (
    <main className="homepage-main-compact">
      <section style={{ textAlign: "center", padding: "100px 0 60px" }}>
        <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 12px",
              background: "var(--bg-elevated, #141414)",
              border: "1px solid var(--border, #262626)",
              borderRadius: 99,
              fontSize: "0.8rem",
              color: "var(--text-secondary, #888)",
              marginBottom: 24,
              fontWeight: 500,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ color: "var(--accent, #0070f3)", width: 14, height: 14 }}
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            100% Local Processing
          </div>

          <div>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: 20,
                letterSpacing: "-0.04em",
              }}
            >
              Minify JSON
              <br />
              Instantly
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 3vw, 1.15rem)",
                color: "var(--text-secondary, #888)",
                maxWidth: 600,
                margin: "0 auto 40px",
              }}
            >
              Compress formatted JSON into a compact single-line payload for APIs, storage, and
              fast transfer. Everything runs locally in your browser.
            </p>
          </div>
        </div>
      </section>

      <section id="tools" style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
            padding: 1,
          }}
        >
          <style>{`
            @keyframes rotate-glow {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .glow-spin::before {
              content: "";
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: conic-gradient(from 0deg, transparent 0, transparent 70%, var(--border-light, #333) 80%, var(--accent, #0070f3) 95%, transparent 100%);
              animation: rotate-glow 4s linear infinite;
              z-index: 0;
            }
            .glow-spin {
              position: relative;
            }
            .app-btn-hover:hover {
              background: var(--bg-elevated, #141414) !important;
              color: var(--text-primary, #ededed) !important;
              border-color: var(--border-light, #333) !important;
            }
            @media (max-width: 768px) {
              .trust-strip-inner {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                padding: 20px !important;
                gap: 16px !important;
              }
              .steps-grid-inner {
                grid-template-columns: 1fr !important;
                gap: 16px !important;
              }
              .bento-grid-inner {
                grid-template-columns: 1fr !important;
                gap: 16px !important;
              }
              .app-grid-inner {
                display: flex !important;
                flex-direction: column !important;
              }
              .app-panel-item {
                border-right: none !important;
                border-bottom: 1px solid var(--border, #262626) !important;
              }
              .app-panel-item:last-child {
                border-bottom: none !important;
              }
            }
          `}</style>

          <div className="glow-spin" style={{ position: "relative" }}>
            <div
              style={{
                background: "var(--app-bg, #050505)",
                borderRadius: 13,
                display: "flex",
                flexDirection: "column",
                height: 700,
                width: "100%",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  background: "var(--app-surface, #0f0f0f)",
                  padding: "12px 20px",
                  borderBottom: "1px solid var(--border, #262626)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: "13px 13px 0 0",
                }}
              >
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", display: "block" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "block" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", display: "block" }} />
                </div>

                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-secondary, #888)",
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  }}
                >
                  minified.json
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 20px",
                  borderBottom: "1px solid var(--border, #262626)",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  {(["Sample", "Clear"] as const).map((label) => (
                    <button
                      key={label}
                      className="app-btn-hover"
                      onClick={label === "Sample" ? loadSample : actionClear}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 12px",
                        background: "transparent",
                        color: "var(--text-secondary, #888)",
                        border: "1px solid var(--border, #262626)",
                        borderRadius: 6,
                        fontFamily: "var(--font-ui, Inter, sans-serif)",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "0.2s",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <button
                    className="app-btn-hover"
                    onClick={actionMinify}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      background: "var(--text-primary, #ededed)",
                      color: "var(--bg-base, #000)",
                      border: "1px solid var(--text-primary, #ededed)",
                      borderRadius: 6,
                      fontFamily: "var(--font-ui, Inter, sans-serif)",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "0.2s",
                    }}
                  >
                    Minify
                  </button>
                </div>
              </div>

              <div
                className="app-grid-inner"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  flex: 1,
                  minHeight: 0,
                  overflow: "hidden",
                }}
              >
                <div
                  className="app-panel-item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    minHeight: 0,
                    overflow: "hidden",
                    borderRight: "1px solid var(--border, #262626)",
                  }}
                >
                  <div
                    style={{
                      padding: "8px 20px",
                      background: "color-mix(in srgb, var(--bg-surface, #0a0a0a) 50%, transparent)",
                      borderBottom: "1px solid var(--border, #262626)",
                      fontSize: "0.75rem",
                      color: "var(--text-secondary, #888)",
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    Input
                  </div>

                  <textarea
                    value={inputVal}
                    onChange={(e) => handleInputChange(e.target.value)}
                    spellCheck={false}
                    placeholder="Paste JSON here..."
                    style={{
                      flex: 1,
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      color: "var(--text-primary, #ededed)",
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 13,
                      padding: 20,
                      resize: "none",
                      outline: "none",
                      lineHeight: 1.6,
                      whiteSpace: "pre",
                      overflow: "auto",
                    }}
                  />
                </div>

                <div
                  className="app-panel-item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    minHeight: 0,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "8px 20px",
                      background: "color-mix(in srgb, var(--bg-surface, #0a0a0a) 50%, transparent)",
                      borderBottom: "1px solid var(--border, #262626)",
                      fontSize: "0.75rem",
                      color: "var(--text-secondary, #888)",
                      fontWeight: 500,
                      flexShrink: 0,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>Output</span>
                    <div style={{ display: "flex", gap: 10, color: "var(--text-secondary, #888)" }}>
                      <span
                        onClick={copyOutput}
                        style={{ cursor: "pointer", fontSize: "0.75rem" }}
                      >
                        Copy
                      </span>
                      <span
                        onClick={downloadOutput}
                        style={{ cursor: "pointer", fontSize: "0.75rem" }}
                      >
                        Download
                      </span>
                    </div>
                  </div>

                  <div
                    id="output-area"
                    dangerouslySetInnerHTML={{ __html: outputHtml }}
                    style={{
                      flex: 1,
                      width: "100%",
                      background: "transparent",
                      color: "var(--text-primary, #ededed)",
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: 13,
                      padding: 20,
                      lineHeight: 1.6,
                      whiteSpace: "pre",
                      overflow: "auto",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  padding: "8px 20px",
                  background: "var(--app-surface, #0f0f0f)",
                  borderTop: "1px solid var(--border, #262626)",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                  color: "var(--text-secondary, #888)",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  flexShrink: 0,
                  borderRadius: "0 0 13px 13px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg
                    style={{ width: 12, height: 12, color: statusColor }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {status.type === "success" ? (
                      <>
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </>
                    ) : status.type === "error" ? (
                      <>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </>
                    ) : (
                      <circle cx="12" cy="12" r="10" />
                    )}
                  </svg>
                  <span>{status.text}</span>
                </div>

                <div>UTF-8</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="trust-strip-inner"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 48,
            padding: 24,
            border: "1px solid var(--border, #262626)",
            borderRadius: 12,
            background: "var(--bg-surface, #0a0a0a)",
            fontSize: "0.85rem",
            fontWeight: 500,
            color: "var(--text-secondary, #888)",
            marginTop: 40,
          }}
        >
          {trustItems.map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" style={{ padding: "80px 0" }}>
        <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 5vw, 2.2rem)",
                marginBottom: 12,
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              How It Works
            </h2>
            <p
              style={{
                color: "var(--text-secondary, #888)",
                fontSize: "clamp(0.95rem, 3vw, 1.05rem)",
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              Turn expanded JSON into a compact payload in seconds.
            </p>
          </div>

          <div className="steps-grid-inner" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {[
              ["1", "Paste JSON", "Add formatted or messy JSON into the editor."],
              ["2", "Minify Instantly", "Remove extra spaces, line breaks, and indentation safely."],
              ["3", "Copy or Download", "Use the compact JSON in APIs, configs, or production workflows."],
            ].map(([num, title, desc]) => (
              <div key={title} style={{ textAlign: "center", position: "relative" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: "var(--bg-elevated, #141414)",
                    border: "1px solid var(--border, #262626)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    fontWeight: 600,
                    margin: "0 auto 20px",
                    color: "var(--text-primary, #ededed)",
                  }}
                >
                  {num}
                </div>
                <h3 style={{ fontSize: "1.05rem", marginBottom: 8 }}>{title}</h3>
                <p style={{ color: "var(--text-secondary, #888)", fontSize: "0.9rem" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" style={{ padding: "80px 0" }}>
        <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 5vw, 2.2rem)",
                marginBottom: 12,
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              Built for Speed
            </h2>
          </div>

          <div className="bento-grid-inner" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {featureCards.map((card) => (
              <div
                key={card.title}
                style={{
                  background: "var(--bg-surface, #0a0a0a)",
                  border: "1px solid var(--border, #262626)",
                  borderRadius: 12,
                  padding: 28,
                  transition: "border-color 0.3s, transform 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-light, #333)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border, #262626)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "var(--bg-elevated, #141414)",
                    border: "1px solid var(--border, #262626)",
                    color: "var(--text-primary, #ededed)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  {card.icon}
                </div>
                <h3 style={{ fontSize: "1.05rem", marginBottom: 8 }}>{card.title}</h3>
                <p style={{ color: "var(--text-secondary, #888)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            border: "1px solid var(--border, #262626)",
            borderRadius: 16,
            padding: "60px 24px",
            textAlign: "center",
            background: "var(--bg-surface, #0a0a0a)",
            marginBottom: 60,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            Start Minifying Instantly.
          </h2>

          <Link
            href="#tools"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              borderRadius: 99,
              fontWeight: 500,
              fontSize: "0.85rem",
              textDecoration: "none",
              transition: "transform 0.2s, opacity 0.2s",
              background: "var(--text-primary, #ededed)",
              color: "var(--bg-base, #000)",
              border: "1px solid transparent",
              marginTop: 20,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.02)";
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
            }}
          >
            Minify JSON Now
          </Link>
        </div>
      </div>

      <footer style={{ padding: "40px 0" }}>
        <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  letterSpacing: "-0.02em",
                  marginBottom: 12,
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="M12 12v9" />
                  <path d="m8 17 4 4 4-4" />
                </svg>
                JSONPro
              </div>
              <p style={{ color: "var(--text-secondary, #888)", fontSize: "0.85rem" }}>
                Fast, privacy-first JSON tools for developers.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.9rem", marginBottom: 16, color: "var(--text-primary, #ededed)" }}>
                Product
              </h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[
                  ["JSON Formatter", "/json-formatter"],
                  ["JSON Validator", "/json-validator"],
                  ["JSON Minifier", "/json-minifier"],
                ].map(([label, href]) => (
                  <li key={label} style={{ marginBottom: 10 }}>
                    <Link
                      href={href}
                      style={{
                        color: "var(--text-secondary, #888)",
                        textDecoration: "none",
                        fontSize: "0.85rem",
                        transition: "color 0.2s",
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: "0.9rem", marginBottom: 16, color: "var(--text-primary, #ededed)" }}>
                Legal
              </h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {["Privacy", "Terms"].map((label) => (
                  <li key={label} style={{ marginBottom: 10 }}>
                    <Link
                      href="#"
                      style={{
                        color: "var(--text-secondary, #888)",
                        textDecoration: "none",
                        fontSize: "0.85rem",
                        transition: "color 0.2s",
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid var(--border, #262626)",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              color: "var(--text-secondary, #888)",
              fontSize: "0.8rem",
            }}
          >
            <div>2026 JSONPro.</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
