"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

// ─── Trust Strip ───────────────────────────────────────────────────────────────
const trustItems = [
  {
    label: "SOC 2 Ready",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, flexShrink: 0, color: "var(--text-primary, #ededed)" }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "Lightning Fast",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, flexShrink: 0, color: "var(--text-primary, #ededed)" }}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    label: "100% Offline",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, flexShrink: 0, color: "var(--text-primary, #ededed)" }}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    label: "No Ads",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, flexShrink: 0, color: "var(--text-primary, #ededed)" }}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

// ─── Feature Cards ─────────────────────────────────────────────────────────────
const featureCards = [
  {
    title: "Instant Formatting",
    description: "Beautify minified JSON with proper indentation, syntax highlighting, and spacing instantly.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M12 12v9" />
        <path d="m8 17 4 4 4-4" />
      </svg>
    ),
  },
  {
    title: "Strict Validation",
    description: "Validate syntax locally in your browser to catch missing commas and bracket errors.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: "Advanced Tree View",
    description: "Transform deeply nested arrays into a fully interactive, collapsible UI tree.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </svg>
    ),
  },
];

// ─── Syntax Highlighter ────────────────────────────────────────────────────────
function syntaxHighlight(json: string): string {
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          return `<span style="color:var(--json-key,#3291ff)">${match.replace(/:$/, "").trim()}</span><span style="color:var(--text-secondary,#888)">: </span>`;
        }
        return `<span style="color:var(--json-string,#27c93f)">${match}</span>`;
      } else if (/true|false/.test(match)) {
        return `<span style="color:var(--json-boolean,#ff0080)">${match}</span>`;
      } else if (/null/.test(match)) {
        return `<span style="color:var(--json-null,#888);font-style:italic">${match}</span>`;
      }
      return `<span style="color:var(--json-number,#f5a623)">${match}</span>`;
    }
  );
}

// ─── Tree Builder ──────────────────────────────────────────────────────────────
function buildNode(data: unknown, key: string, isRoot = false): string {
  const isArr = Array.isArray(data);
  const isObj = data !== null && typeof data === "object" && !isArr;
  const keyStr = isRoot
    ? ""
    : `<span style="color:var(--json-key,#3291ff)">"${key}"</span><span style="color:var(--text-secondary,#888)">: </span>`;

  if (data === null) return `<div style="padding:4px 0;display:flex;">${keyStr}<span style="color:var(--json-null,#888);font-style:italic">null</span></div>`;
  if (typeof data === "string") return `<div style="padding:4px 0;display:flex;">${keyStr}<span style="color:var(--json-string,#27c93f)">"${String(data).replace(/</g, "&lt;")}"</span></div>`;
  if (typeof data === "number") return `<div style="padding:4px 0;display:flex;">${keyStr}<span style="color:var(--json-number,#f5a623)">${data}</span></div>`;
  if (typeof data === "boolean") return `<div style="padding:4px 0;display:flex;">${keyStr}<span style="color:var(--json-boolean,#ff0080)">${data}</span></div>`;

  const entries = Object.entries(data as object);
  if (entries.length === 0) return `<div style="padding:4px 0;display:flex;">${keyStr}<span style="color:var(--text-secondary,#888)">${isArr ? "[]" : "{}"}</span></div>`;

  const brackets = isArr ? ["[", "]"] : ["{", "}"];
  const typeBadge = `<span style="font-size:0.7rem;background:var(--bg-elevated,#141414);border:1px solid var(--border,#262626);border-radius:4px;padding:1px 6px;margin-left:8px;color:var(--text-secondary,#888)">${isArr ? "Array" : "Object"} <span style="color:var(--text-primary,#ededed);font-weight:600">${entries.length}</span></span>`;

  let html = `<details open style="padding-left:20px;position:relative;"><summary style="list-style:none;cursor:pointer;display:flex;align-items:center;padding:4px 0;margin-left:-20px;">${keyStr}<span style="color:var(--text-secondary,#888)">${brackets[0]}</span> ${typeBadge}</summary>`;
  entries.forEach(([k, v]) => { html += buildNode(v, k); });
  html += `<div style="padding:4px 0;margin-left:-20px;padding-left:20px;"><span style="color:var(--text-secondary,#888)">${brackets[1]}</span></div></details>`;
  return html;
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function HomePage() {
  const [inputVal, setInputVal] = useState("");
  const [outputHtml, setOutputHtml] = useState("");
  const [treeHtml, setTreeHtml] = useState("");
  const [isTreeMode, setIsTreeMode] = useState(false);
  const [status, setStatus] = useState<{ text: string; type: "default" | "success" | "error" }>({ text: "Ready", type: "default" });
  const currentJSONRef = useRef<unknown>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  function parseInput(raw = inputVal) {
    const trimmed = raw.trim();
    if (!trimmed) { setStatus({ text: "Ready", type: "default" }); currentJSONRef.current = null; return false; }
    try {
      currentJSONRef.current = JSON.parse(trimmed);
      setStatus({ text: "Valid JSON", type: "success" });
      return true;
    } catch {
      setStatus({ text: "Invalid JSON", type: "error" });
      currentJSONRef.current = null;
      return false;
    }
  }

  function actionFormat() {
    if (parseInput()) {
      const formatted = JSON.stringify(currentJSONRef.current, null, 4);
      setOutputHtml(syntaxHighlight(formatted));
      if (isTreeMode) setTreeHtml(buildNode(currentJSONRef.current, "root", true));
    }
  }

  function actionMinify() {
    if (parseInput()) {
      setOutputHtml(syntaxHighlight(JSON.stringify(currentJSONRef.current)));
    }
  }

  function actionValidate() { parseInput(); }

  function actionClear() {
    setInputVal("");
    setOutputHtml("");
    setTreeHtml("");
    currentJSONRef.current = null;
    setStatus({ text: "Ready", type: "default" });
  }

  function loadSample() {
    const sample = {
      project: "JSONPro",
      isPremium: true,
      users: 1000000,
      features: ["Syntax Highlight", "Tree View", "No Auto-Zoom"],
      api: null,
    };
    const str = JSON.stringify(sample, null, 4);
    setInputVal(str);
    currentJSONRef.current = sample;
    setStatus({ text: "Valid JSON", type: "success" });
    const formatted = JSON.stringify(sample, null, 4);
    setOutputHtml(syntaxHighlight(formatted));
    if (isTreeMode) setTreeHtml(buildNode(sample, "root", true));
  }

  function switchMode(mode: "code" | "tree") {
    const tree = mode === "tree";
    setIsTreeMode(tree);
    if (tree && currentJSONRef.current != null) {
      setTreeHtml(buildNode(currentJSONRef.current, "root", true));
    }
  }

  function copyOutput() {
    const el = document.getElementById("output-area");
    if (el?.innerText) {
      navigator.clipboard.writeText(el.innerText);
      setStatus({ text: "Copied", type: "success" });
      setTimeout(() => parseInput(), 2000);
    }
  }

  function downloadOutput() {
    const el = document.getElementById("output-area");
    if (el?.innerText) {
      const blob = new Blob([el.innerText], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "data.json";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
  }

  function handleInputChange(val: string) {
    setInputVal(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => parseInput(val), 300);
  }

  const statusColor = status.type === "success" ? "var(--success,#10b981)" : status.type === "error" ? "var(--error,#ef4444)" : "var(--text-secondary,#888)";

  return (
    <main className="homepage-main-compact">


      {/* ── Hero ── */}
      <section style={{ textAlign: "center", padding: "100px 0 60px" }}>
        <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", background: "var(--bg-elevated,#141414)", border: "1px solid var(--border,#262626)", borderRadius: 99, fontSize: "0.8rem", color: "var(--text-secondary,#888)", marginBottom: 24, fontWeight: 500 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--accent,#0070f3)", width: 14, height: 14 }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            100% Local Processing
          </div>

          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.05, marginBottom: 20, letterSpacing: "-0.04em" }}>
            Format &amp; Validate<br />JSON Like a Pro
          </h1>

          <p style={{ fontSize: "clamp(1rem, 3vw, 1.15rem)", color: "var(--text-secondary,#888)", maxWidth: 600, margin: "0 auto 40px" }}>
            The definitive JSON workspace. Instant formatting, strict validation, and advanced tree structures. Zero data leaves your machine.
          </p>
        </div>
      </section>

      {/* ── App Workspace ── */}
      <div id="tools" style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* Glow wrapper */}
        <div style={{ position: "relative", width: "100%", borderRadius: 14, overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.15)", padding: 1 }}>
          {/* Rotating border via pseudo-element substitute */}
          <style>{`
            @keyframes rotate-glow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            .glow-spin::before {
              content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
              background: conic-gradient(from 0deg, transparent 0%, transparent 70%, var(--border-light,#333) 80%, var(--accent,#0070f3) 95%, transparent 100%);
              animation: rotate-glow 4s linear infinite; z-index: 0;
            }
            .glow-spin { position: relative; }
            .app-btn-hover:hover { background: var(--bg-elevated,#141414) !important; color: var(--text-primary,#ededed) !important; border-color: var(--border-light,#333) !important; }
            #tree-view details { padding-left: 20px; position: relative; }
            #tree-view details::before { content: ''; position: absolute; left: 6px; top: 22px; bottom: 0; width: 1px; background: var(--border-light,#333); }
            #tree-view details[open]::before { display: block; }
            #tree-view details:not([open])::before { display: none; }
            #tree-view summary { list-style: none; cursor: pointer; position: relative; display: flex; align-items: center; padding: 4px 0; margin-left: -20px; }
            #tree-view summary::-webkit-details-marker { display: none; }
            #tree-view summary::before { content: ''; display: inline-block; width: 0; height: 0; border-top: 4px solid transparent; border-bottom: 4px solid transparent; border-left: 6px solid var(--text-secondary,#888); margin-right: 8px; transition: transform 0.2s; }
            #tree-view details[open] > summary::before { transform: rotate(90deg); }
            #tree-view .tree-row:hover, #tree-view summary:hover { background: color-mix(in srgb, var(--text-primary,#ededed) 5%, transparent); border-radius: 4px; }
            @media (max-width: 768px) {
              .trust-strip-inner { display: grid !important; grid-template-columns: 1fr 1fr !important; padding: 20px !important; gap: 16px !important; }
              .steps-grid-inner { grid-template-columns: 1fr !important; gap: 16px !important; }
              .bento-grid-inner { grid-template-columns: 1fr !important; gap: 16px !important; }
              .app-grid-inner { display: flex !important; flex-direction: column !important; }
              .app-panel-item { border-right: none !important; border-bottom: 1px solid var(--border,#262626) !important; }
              .app-panel-item:last-child { border-bottom: none !important; }
            }
          `}</style>

          <div className="glow-spin" style={{ position: "relative" }}>
            {/* App inner */}
            <div style={{ background: "var(--app-bg,#050505)", borderRadius: 13, display: "flex", flexDirection: "column", height: 700, width: "100%", position: "relative", zIndex: 1 }}>

              {/* App header */}
              <div style={{ background: "var(--app-surface,#0f0f0f)", padding: "12px 20px", borderBottom: "1px solid var(--border,#262626)", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "13px 13px 0 0" }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", display: "block" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "block" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", display: "block" }} />
                </div>
                <span style={{ fontSize: "0.7rem", color: "var(--text-secondary,#888)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)" }}>workspace.json</span>
                <div />
              </div>

              {/* Toolbar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid var(--border,#262626)", flexWrap: "wrap", gap: 12 }}>
                {/* Left group */}
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <button
                    className="app-btn-hover"
                    onClick={() => switchMode("code")}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: !isTreeMode ? "var(--bg-elevated,#141414)" : "transparent", color: !isTreeMode ? "var(--text-primary,#ededed)" : "var(--text-secondary,#888)", border: `1px solid ${!isTreeMode ? "var(--border-light,#333)" : "var(--border,#262626)"}`, borderRadius: 6, fontFamily: "var(--font-ui,'Inter',sans-serif)", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}
                  >
                    {"{ }"} Code
                  </button>
                  <button
                    className="app-btn-hover"
                    onClick={() => switchMode("tree")}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: isTreeMode ? "var(--bg-elevated,#141414)" : "transparent", color: isTreeMode ? "var(--text-primary,#ededed)" : "var(--text-secondary,#888)", border: `1px solid ${isTreeMode ? "var(--border-light,#333)" : "var(--border,#262626)"}`, borderRadius: 6, fontFamily: "var(--font-ui,'Inter',sans-serif)", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                      <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" />
                    </svg>
                    Tree
                  </button>
                </div>

                {/* Right group */}
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  {(["Sample", "Clear"] as const).map((label) => (
                    <button
                      key={label}
                      className="app-btn-hover"
                      onClick={label === "Sample" ? loadSample : actionClear}
                      style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "transparent", color: "var(--text-secondary,#888)", border: "1px solid var(--border,#262626)", borderRadius: 6, fontFamily: "var(--font-ui,'Inter',sans-serif)", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}
                    >
                      {label}
                    </button>
                  ))}
                  <div style={{ width: 1, height: 14, background: "var(--border,#262626)", margin: "0 2px" }} />
                  <button
                    className="app-btn-hover"
                    onClick={actionFormat}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "var(--text-primary,#ededed)", color: "var(--bg-base,#000)", border: "1px solid var(--text-primary,#ededed)", borderRadius: 6, fontFamily: "var(--font-ui,'Inter',sans-serif)", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}
                  >
                    Format
                  </button>
                  {(["Validate", "Minify"] as const).map((label) => (
                    <button
                      key={label}
                      className="app-btn-hover"
                      onClick={label === "Validate" ? actionValidate : actionMinify}
                      style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "transparent", color: "var(--text-secondary,#888)", border: "1px solid var(--border,#262626)", borderRadius: 6, fontFamily: "var(--font-ui,'Inter',sans-serif)", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editor grid */}
              <div className="app-grid-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, minHeight: 0, overflow: "hidden" }}>
                {/* Input panel */}
                <div className="app-panel-item" style={{ display: "flex", flexDirection: "column", position: "relative", minHeight: 0, overflow: "hidden", borderRight: "1px solid var(--border,#262626)" }}>
                  <div style={{ padding: "8px 20px", background: "color-mix(in srgb, var(--bg-surface,#0a0a0a) 50%, transparent)", borderBottom: "1px solid var(--border,#262626)", fontSize: "0.75rem", color: "var(--text-secondary,#888)", fontWeight: 500, flexShrink: 0 }}>
                    Input
                  </div>
                  <textarea
                    value={inputVal}
                    onChange={(e) => handleInputChange(e.target.value)}
                    spellCheck={false}
                    placeholder="Paste JSON here..."
                    style={{ flex: 1, width: "100%", background: "transparent", border: "none", color: "var(--text-primary,#ededed)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, padding: 20, resize: "none", outline: "none", lineHeight: 1.6, whiteSpace: "pre", overflow: "auto" }}
                  />
                </div>

                {/* Output panel */}
                <div className="app-panel-item" style={{ display: "flex", flexDirection: "column", position: "relative", minHeight: 0, overflow: "hidden" }}>
                  <div style={{ padding: "8px 20px", background: "color-mix(in srgb, var(--bg-surface,#0a0a0a) 50%, transparent)", borderBottom: "1px solid var(--border,#262626)", fontSize: "0.75rem", color: "var(--text-secondary,#888)", fontWeight: 500, flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    Output
                    <div style={{ display: "flex", gap: 10, color: "var(--text-secondary,#888)" }}>
                      {/* Copy */}
                      <svg onClick={copyOutput} style={{ cursor: "pointer", width: 14, height: 14 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      {/* Download */}
                      <svg onClick={downloadOutput} style={{ cursor: "pointer", width: 14, height: 14 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </div>
                  </div>
                  <div
                    id="output-area"
                    dangerouslySetInnerHTML={{ __html: outputHtml }}
                    style={{ flex: 1, width: "100%", background: "transparent", color: "var(--text-primary,#ededed)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, padding: 20, lineHeight: 1.6, whiteSpace: "pre", overflow: "auto", display: isTreeMode ? "none" : "block" }}
                  />
                  <div
                    id="tree-view"
                    dangerouslySetInnerHTML={{ __html: treeHtml }}
                    style={{ flex: 1, overflow: "auto", padding: 20, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, lineHeight: 1.6, whiteSpace: "nowrap", display: isTreeMode ? "block" : "none" }}
                  />
                </div>
              </div>

              {/* App footer */}
              <div style={{ padding: "8px 20px", background: "var(--app-surface,#0f0f0f)", borderTop: "1px solid var(--border,#262626)", display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary,#888)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", flexShrink: 0, borderRadius: "0 0 13px 13px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg style={{ width: 12, height: 12, color: statusColor }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {status.type === "success" ? (
                      <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>
                    ) : (
                      <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>
                    )}
                  </svg>
                  <span>{status.text}</span>
                </div>
                <div>UTF-8</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Strip */}
        <div className="trust-strip-inner" style={{ display: "flex", justifyContent: "center", gap: 48, padding: 24, border: "1px solid var(--border,#262626)", borderRadius: 12, background: "var(--bg-surface,#0a0a0a)", fontSize: "0.85rem", fontWeight: 500, color: "var(--text-secondary,#888)", marginTop: 40 }}>
          {trustItems.map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── How It Works ── */}
      <section id="how-it-works" style={{ padding: "80px 0" }}>
        <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.2rem)", marginBottom: 12, fontWeight: 600, letterSpacing: "-0.03em" }}>How It Works</h2>
            <p style={{ color: "var(--text-secondary,#888)", fontSize: "clamp(0.95rem, 3vw, 1.05rem)", maxWidth: 600, margin: "0 auto" }}>
              From unreadable string to perfectly structured object instantly.
            </p>
          </div>

          <div className="steps-grid-inner" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {[
              ["1", "Paste Payload", "Drop unformatted JSON directly into the editor."],
              ["2", "Auto-Validate", "Engine catches missing commas or broken brackets."],
              ["3", "Export & Use", "Copy minified output or download the formatted file."],
            ].map(([num, title, desc]) => (
              <div key={title} style={{ textAlign: "center", position: "relative" }}>
                <div style={{ width: 40, height: 40, background: "var(--bg-elevated,#141414)", border: "1px solid var(--border,#262626)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 600, margin: "0 auto 20px", color: "var(--text-primary,#ededed)" }}>
                  {num}
                </div>
                <h3 style={{ fontSize: "1.05rem", marginBottom: 8 }}>{title}</h3>
                <p style={{ color: "var(--text-secondary,#888)", fontSize: "0.9rem" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: "80px 0" }}>
        <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.2rem)", marginBottom: 12, fontWeight: 600, letterSpacing: "-0.03em" }}>Built for Speed</h2>
          </div>

          <div className="bento-grid-inner" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {featureCards.map((card) => (
              <div
                key={card.title}
                style={{ background: "var(--bg-surface,#0a0a0a)", border: "1px solid var(--border,#262626)", borderRadius: 12, padding: 28, transition: "border-color 0.3s, transform 0.3s", cursor: "default" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-light,#333)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border,#262626)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--bg-elevated,#141414)", border: "1px solid var(--border,#262626)", color: "var(--text-primary,#ededed)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: "1.05rem", marginBottom: 8 }}>{card.title}</h3>
                <p style={{ color: "var(--text-secondary,#888)", fontSize: "0.9rem", lineHeight: 1.5 }}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ border: "1px solid var(--border,#262626)", borderRadius: 16, padding: "60px 24px", textAlign: "center", background: "var(--bg-surface,#0a0a0a)", marginBottom: 60 }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2rem)", fontWeight: 600, letterSpacing: "-0.03em" }}>Start Formatting Instantly.</h2>
          <Link
            href="#tools"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 24px", borderRadius: 99, fontWeight: 500, fontSize: "0.85rem", textDecoration: "none", transition: "transform 0.2s, opacity 0.2s", background: "var(--text-primary,#ededed)", color: "var(--bg-base,#000)", border: "1px solid transparent", marginTop: 20 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.02)"; (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            Open Workspace
          </Link>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{ padding: "40px 0" }}>
        <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            {/* Brand col */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: "1.05rem", letterSpacing: "-0.02em", marginBottom: 12 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m8 17 4 4 4-4" />
                </svg>
                JSONPro
              </div>
              <p style={{ color: "var(--text-secondary,#888)", fontSize: "0.85rem" }}>The most powerful JSON toolkit for developers.</p>
            </div>

            {/* Product col */}
            <div>
              <h4 style={{ fontSize: "0.9rem", marginBottom: 16, color: "var(--text-primary,#ededed)" }}>Product</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[["Features", "#features"], ["Tools", "#more-tools"]].map(([label, href]) => (
                  <li key={label} style={{ marginBottom: 10 }}>
                    <Link href={href} style={{ color: "var(--text-secondary,#888)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--text-primary,#ededed)")}
                      onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--text-secondary,#888)")}
                    >{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal col */}
            <div>
              <h4 style={{ fontSize: "0.9rem", marginBottom: 16, color: "var(--text-primary,#ededed)" }}>Legal</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {["Privacy", "Terms"].map((label) => (
                  <li key={label} style={{ marginBottom: 10 }}>
                    <Link href="#" style={{ color: "var(--text-secondary,#888)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--text-primary,#ededed)")}
                      onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--text-secondary,#888)")}
                    >{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border,#262626)", paddingTop: 24, display: "flex", justifyContent: "space-between", color: "var(--text-secondary,#888)", fontSize: "0.8rem" }}>
            <div>© 2024 JSONPro.</div>
          </div>
        </div>
      </footer>
    </main>
  );
}