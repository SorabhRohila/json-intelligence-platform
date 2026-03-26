"use client";

import { useRef, useState } from "react";

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

function buildNode(data: unknown, key: string, isRoot = false): string {
  const isArr = Array.isArray(data);
  const keyStr = isRoot
    ? ""
    : `<span style="color:var(--json-key,#3291ff)">"${key}"</span><span style="color:var(--text-secondary,#888)">: </span>`;

  if (data === null) {
    return `<div class="tree-row" style="padding:4px 0;display:flex;">${keyStr}<span style="color:var(--json-null,#888);font-style:italic">null</span></div>`;
  }

  if (typeof data === "string") {
    return `<div class="tree-row" style="padding:4px 0;display:flex;">${keyStr}<span style="color:var(--json-string,#27c93f)">"${String(data).replace(/</g, "&lt;")}"</span></div>`;
  }

  if (typeof data === "number") {
    return `<div class="tree-row" style="padding:4px 0;display:flex;">${keyStr}<span style="color:var(--json-number,#f5a623)">${data}</span></div>`;
  }

  if (typeof data === "boolean") {
    return `<div class="tree-row" style="padding:4px 0;display:flex;">${keyStr}<span style="color:var(--json-boolean,#ff0080)">${data}</span></div>`;
  }

  const entries = Object.entries(data as object);
  if (entries.length === 0) {
    return `<div class="tree-row" style="padding:4px 0;display:flex;">${keyStr}<span style="color:var(--text-secondary,#888)">${isArr ? "[]" : "{}"}</span></div>`;
  }

  const brackets = isArr ? ["[", "]"] : ["{", "}"];
  const typeBadge = `<span style="font-size:0.7rem;background:var(--bg-elevated,#141414);border:1px solid var(--border,#262626);border-radius:4px;padding:1px 6px;margin-left:8px;color:var(--text-secondary,#888)">${isArr ? "Array" : "Object"} <span style="color:var(--text-primary,#ededed);font-weight:600">${entries.length}</span></span>`;

  let html = `<details open><summary>${keyStr}<span style="color:var(--text-secondary,#888)">${brackets[0]}</span>${typeBadge}</summary>`;
  entries.forEach(([k, v]) => {
    html += buildNode(v, k);
  });
  html += `<div class="tree-row bracket-close" style="padding:4px 0;margin-left:-20px;padding-left:20px;"><span style="color:var(--text-secondary,#888)">${brackets[1]}</span></div></details>`;
  return html;
}

type JsonFormatterWorkspaceProps = {
  fileLabel?: string;
  inputLabel?: string;
  outputLabel?: string;
  outputId?: string;
};

export default function JsonFormatterWorkspace({
  fileLabel = "workspace.json",
  inputLabel = "Input",
  outputLabel = "Output",
  outputId = "formatter-output-area",
}: JsonFormatterWorkspaceProps) {

  const [inputVal, setInputVal] = useState("");
  const [outputHtml, setOutputHtml] = useState("");
  const [treeHtml, setTreeHtml] = useState("");
  const [isTreeMode, setIsTreeMode] = useState(false);
  const [status, setStatus] = useState<{
    text: string;
    type: "default" | "success" | "error";
  }>({ text: "Ready", type: "default" });

  const currentJSONRef = useRef<unknown>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function parseInput(raw = inputVal) {
    const trimmed = raw.trim();
    if (!trimmed) {
      setStatus({ text: "Ready", type: "default" });
      currentJSONRef.current = null;
      return false;
    }

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
      if (isTreeMode) {
        setTreeHtml(buildNode(currentJSONRef.current, "root", true));
      }
    }
  }

  function actionMinify() {
    if (parseInput()) {
      setOutputHtml(syntaxHighlight(JSON.stringify(currentJSONRef.current)));
    }
  }

  function actionValidate() {
    parseInput();
  }

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
    setOutputHtml(syntaxHighlight(str));

    if (isTreeMode) {
      setTreeHtml(buildNode(sample, "root", true));
    }
  }

  function switchMode(mode: "code" | "tree") {
    const tree = mode === "tree";
    setIsTreeMode(tree);

    if (tree && currentJSONRef.current != null) {
      setTreeHtml(buildNode(currentJSONRef.current, "root", true));
    }
  }

  function copyOutput() {
    const el = document.getElementById(outputId);
    if (el?.innerText) {
      navigator.clipboard.writeText(el.innerText);
      setStatus({ text: "Copied", type: "success" });
      setTimeout(() => parseInput(), 2000);
    }
  }

  function downloadOutput() {
    const el = document.getElementById("formatter-output-area");
    if (el?.innerText) {
      const blob = new Blob([el.innerText], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  function handleInputChange(val: string) {
    setInputVal(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => parseInput(val), 300);
  }

  const statusColor =
    status.type === "success"
      ? "var(--success,#10b981)"
      : status.type === "error"
      ? "var(--error,#ef4444)"
      : "var(--text-secondary,#888)";

  return (
    <div className="tool-glow-card">
  <div className="tool-glow-inner">

        <div
          className="workspace-shell"
          style={{
            background: "var(--app-bg,#050505)",
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
            className="workspace-header-inline"
            style={{
              background: "var(--app-surface,#0f0f0f)",
              padding: "12px 20px",
              borderBottom: "1px solid var(--border,#262626)",
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
            <span style={{ fontSize: "0.7rem", color: "var(--text-secondary,#888)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)" }}>
              {fileLabel}

            </span>
            <div />
          </div>

          <div
            className="workspace-toolbar-inline"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 20px",
              borderBottom: "1px solid var(--border,#262626)",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <button
                className="app-btn-hover"
                onClick={() => switchMode("code")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  background: !isTreeMode ? "var(--bg-elevated,#141414)" : "transparent",
                  color: !isTreeMode ? "var(--text-primary,#ededed)" : "var(--text-secondary,#888)",
                  border: `1px solid ${!isTreeMode ? "var(--border-light,#333)" : "var(--border,#262626)"}`,
                  borderRadius: 6,
                  fontFamily: "var(--font-ui,'Inter',sans-serif)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "0.2s",
                }}
              >
                {"{ }"} Code
              </button>

              <button
                className="app-btn-hover"
                onClick={() => switchMode("tree")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  background: isTreeMode ? "var(--bg-elevated,#141414)" : "transparent",
                  color: isTreeMode ? "var(--text-primary,#ededed)" : "var(--text-secondary,#888)",
                  border: `1px solid ${isTreeMode ? "var(--border-light,#333)" : "var(--border,#262626)"}`,
                  borderRadius: 6,
                  fontFamily: "var(--font-ui,'Inter',sans-serif)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "0.2s",
                }}
              >
                Tree
              </button>
            </div>

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
                    color: "var(--text-secondary,#888)",
                    border: "1px solid var(--border,#262626)",
                    borderRadius: 6,
                    fontFamily: "var(--font-ui,'Inter',sans-serif)",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                >
                  {label}
                </button>
              ))}

              <div style={{ width: 1, height: 14, background: "var(--border,#262626)", margin: "0 2px" }} />

              <button
                className="app-btn-hover"
                onClick={actionFormat}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  background: "var(--text-primary,#ededed)",
                  color: "var(--bg-base,#000)",
                  border: "1px solid var(--text-primary,#ededed)",
                  borderRadius: 6,
                  fontFamily: "var(--font-ui,'Inter',sans-serif)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "0.2s",
                }}
              >
                Format
              </button>

              {(["Validate", "Minify"] as const).map((label) => (
                <button
                  key={label}
                  className="app-btn-hover"
                  onClick={label === "Validate" ? actionValidate : actionMinify}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 12px",
                    background: "transparent",
                    color: "var(--text-secondary,#888)",
                    border: "1px solid var(--border,#262626)",
                    borderRadius: 6,
                    fontFamily: "var(--font-ui,'Inter',sans-serif)",
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
          </div>

          <div className="app-grid-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, minHeight: 0, overflow: "hidden" }}>
            <div
              className="app-panel-item"
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                minHeight: 0,
                overflow: "hidden",
                borderRight: "1px solid var(--border,#262626)",
              }}
            >
              <div
                style={{
                  padding: "8px 20px",
                  background: "color-mix(in srgb, var(--bg-surface,#0a0a0a) 50%, transparent)",
                  borderBottom: "1px solid var(--border,#262626)",
                  fontSize: "0.75rem",
                  color: "var(--text-secondary,#888)",
                  fontWeight: 500,
                  flexShrink: 0,
                }}
              >
                {inputLabel}

              </div>

              <textarea
                className="workspace-editor-inline"
                value={inputVal}
                onChange={(e) => handleInputChange(e.target.value)}
                spellCheck={false}
                placeholder="Paste JSON here..."
                style={{
                  flex: 1,
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  color: "var(--text-primary,#ededed)",
                  fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
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

            <div className="app-panel-item" style={{ display: "flex", flexDirection: "column", position: "relative", minHeight: 0, overflow: "hidden" }}>
              <div
                style={{
                  padding: "8px 20px",
                  background: "color-mix(in srgb, var(--bg-surface,#0a0a0a) 50%, transparent)",
                  borderBottom: "1px solid var(--border,#262626)",
                  fontSize: "0.75rem",
                  color: "var(--text-secondary,#888)",
                  fontWeight: 500,
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {outputLabel}
                <div style={{ display: "flex", gap: 10, color: "var(--text-secondary,#888)" }}>
                  <svg onClick={copyOutput} style={{ cursor: "pointer", width: 14, height: 14 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <svg onClick={downloadOutput} style={{ cursor: "pointer", width: 14, height: 14 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
              </div>

              <div
  id={outputId}

                className="workspace-editor-inline"
                dangerouslySetInnerHTML={{ __html: outputHtml }}
                style={{
                  flex: 1,
                  width: "100%",
                  background: "transparent",
                  color: "var(--text-primary,#ededed)",
                  fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
                  fontSize: 13,
                  padding: 20,
                  lineHeight: 1.6,
                  whiteSpace: "pre",
                  overflow: "auto",
                  display: isTreeMode ? "none" : "block",
                }}
              />

              <div
                id="tree-view"
                className="workspace-tree-inline"
                dangerouslySetInnerHTML={{ __html: treeHtml }}
                style={{
                  flex: 1,
                  overflow: "auto",
                  padding: 20,
                  fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
                  fontSize: 13,
                  lineHeight: 1.6,
                  whiteSpace: "nowrap",
                  display: isTreeMode ? "block" : "none",
                }}
              />
            </div>
          </div>

          <div
            style={{
              padding: "8px 20px",
              background: "var(--app-surface,#0f0f0f)",
              borderTop: "1px solid var(--border,#262626)",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.75rem",
              color: "var(--text-secondary,#888)",
              fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
              flexShrink: 0,
              borderRadius: "0 0 13px 13px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg style={{ width: 12, height: 12, color: statusColor }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {status.type === "success" ? (
                  <>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </>
                ) : (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </>
                )}
              </svg>
              <span>{status.text}</span>
            </div>
            <div>UTF-8</div>
          </div>
        </div>
      </div>
    </div>
  );
}
