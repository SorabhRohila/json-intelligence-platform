"use client";

import { useRef, useState } from "react";

// ─── CSV Converter ─────────────────────────────────────────────────────────────
function jsonToCsv(data: unknown): { csv: string; error: string | null } {
  // Accepts array of objects, or a single object (wrapped into array)
  let rows: Record<string, unknown>[];

  if (Array.isArray(data)) {
    if (data.length === 0) return { csv: "", error: "Array is empty." };
    if (typeof data[0] !== "object" || data[0] === null) {
      // Flat array of primitives → single-column CSV
      rows = data.map((v) => ({ value: v }));
    } else {
      rows = data as Record<string, unknown>[];
    }
  } else if (typeof data === "object" && data !== null) {
    rows = [data as Record<string, unknown>];
  } else {
    return { csv: "", error: "Input must be a JSON object or array." };
  }

  // Collect all keys (union across all rows)
  const headers = Array.from(
    rows.reduce((set, row) => {
      Object.keys(row).forEach((k) => set.add(k));
      return set;
    }, new Set<string>())
  );

  const escape = (val: unknown): string => {
    if (val === null || val === undefined) return "";
    const str =
      typeof val === "object" ? JSON.stringify(val) : String(val);
    // Wrap in quotes if it contains comma, quote, or newline
    if (str.includes('"') || str.includes(",") || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const headerLine = headers.map(escape).join(",");
  const dataLines = rows.map((row) =>
    headers.map((h) => escape(row[h])).join(",")
  );

  return { csv: [headerLine, ...dataLines].join("\n"), error: null };
}

// ─── CSV Syntax Highlighter ────────────────────────────────────────────────────
function csvHighlight(csv: string): string {
  return csv
    .split("\n")
    .map((line, i) => {
      const cells = line.split(",");
      const highlighted = cells
        .map((cell) => {
          const trimmed = cell.trim();
          // Header row
          if (i === 0) {
            return `<span style="color:var(--json-key,#3291ff);font-weight:600">${cell}</span>`;
          }
          // Quoted string
          if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
            return `<span style="color:var(--json-string,#27c93f)">${cell}</span>`;
          }
          // Number
          if (trimmed !== "" && !isNaN(Number(trimmed))) {
            return `<span style="color:var(--json-number,#f5a623)">${cell}</span>`;
          }
          // Boolean
          if (trimmed === "true" || trimmed === "false") {
            return `<span style="color:var(--json-boolean,#ff0080)">${cell}</span>`;
          }
          // Empty / null
          if (trimmed === "") {
            return `<span style="color:var(--json-null,#888);font-style:italic">${cell || " "}</span>`;
          }
          return `<span style="color:var(--text-primary,#ededed)">${cell}</span>`;
        })
        .join('<span style="color:var(--text-secondary,#888)">,</span>');
      return highlighted;
    })
    .join("\n");
}

// ─── Props ─────────────────────────────────────────────────────────────────────
type JsonToCsvWorkspaceProps = {
  fileLabel?: string;
  inputLabel?: string;
  outputLabel?: string;
  outputId?: string;
};

// ─── Component ─────────────────────────────────────────────────────────────────
export default function JsonToCsvWorkspace({
  fileLabel = "converter.csv",
  inputLabel = "JSON Input",
  outputLabel = "CSV Output",
  outputId = "json-to-csv-output",
}: JsonToCsvWorkspaceProps) {
  const [inputVal, setInputVal] = useState("");
  const [outputHtml, setOutputHtml] = useState("");
  const [rawCsv, setRawCsv] = useState("");
  const [status, setStatus] = useState<{
    text: string;
    type: "default" | "success" | "error";
  }>({ text: "Ready", type: "default" });

  const currentJSONRef = useRef<unknown>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Parsing ────────────────────────────────────────────────────────────────
  function parseInput(raw = inputVal): boolean {
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

  // ── Actions ────────────────────────────────────────────────────────────────
  function actionConvert() {
    if (!parseInput()) return;
    const { csv, error } = jsonToCsv(currentJSONRef.current);
    if (error) {
      setStatus({ text: error, type: "error" });
      setOutputHtml("");
      setRawCsv("");
      return;
    }
    setRawCsv(csv);
    setOutputHtml(csvHighlight(csv));
    setStatus({ text: "Converted", type: "success" });
  }

  function actionValidate() {
    parseInput();
  }

  function actionClear() {
    setInputVal("");
    setOutputHtml("");
    setRawCsv("");
    currentJSONRef.current = null;
    setStatus({ text: "Ready", type: "default" });
  }

  function loadSample() {
    const sample = [
      { id: 1, name: "Alice", role: "Engineer", active: true, score: 98.5 },
      { id: 2, name: "Bob", role: "Designer", active: false, score: 87 },
      { id: 3, name: "Carol", role: "Manager", active: true, score: null },
    ];
    const str = JSON.stringify(sample, null, 4);
    setInputVal(str);
    currentJSONRef.current = sample;
    setStatus({ text: "Valid JSON", type: "success" });
    const { csv } = jsonToCsv(sample);
    setRawCsv(csv);
    setOutputHtml(csvHighlight(csv));
  }

  function copyOutput() {
    if (rawCsv) {
      navigator.clipboard.writeText(rawCsv);
      setStatus({ text: "Copied", type: "success" });
      setTimeout(() => parseInput(), 2000);
    }
  }

  function downloadOutput() {
    if (rawCsv) {
      const blob = new Blob([rawCsv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.csv";
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

  // ── Render ─────────────────────────────────────────────────────────────────
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
          {/* ── Title bar ── */}
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

          {/* ── Toolbar ── */}
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
            {/* Left: mode indicator (no tree mode for CSV — just a CSV badge) */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  background: "var(--bg-elevated,#141414)",
                  color: "var(--text-primary,#ededed)",
                  border: "1px solid var(--border-light,#333)",
                  borderRadius: 6,
                  fontFamily: "var(--font-ui,'Inter',sans-serif)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                }}
              >
                {/* Table icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M3 15h18" />
                  <path d="M9 3v18" />
                </svg>
                CSV
              </div>
            </div>

            {/* Right: actions */}
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

              {/* Primary action */}
              <button
                className="app-btn-hover"
                onClick={actionConvert}
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
                Convert
              </button>

              <button
                className="app-btn-hover"
                onClick={actionValidate}
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
                Validate
              </button>
            </div>
          </div>

          {/* ── Editor grid ── */}
          <div
            className="app-grid-inner"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, minHeight: 0, overflow: "hidden" }}
          >
            {/* Input panel */}
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
                placeholder={`Paste JSON here...\n\nExample:\n[\n  { "name": "Alice", "age": 30 },\n  { "name": "Bob",   "age": 25 }\n]`}
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

            {/* Output panel */}
            <div
              className="app-panel-item"
              style={{ display: "flex", flexDirection: "column", position: "relative", minHeight: 0, overflow: "hidden" }}
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
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {outputLabel}
                <div style={{ display: "flex", gap: 10, color: "var(--text-secondary,#888)" }}>
                  {/* Copy */}
                  <svg
                    onClick={copyOutput}
                    style={{ cursor: "pointer", width: 14, height: 14 }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  {/* Download */}
                  <svg
                    onClick={downloadOutput}
                    style={{ cursor: "pointer", width: 14, height: 14 }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
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
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* ── Status bar ── */}
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
            <div>CSV · UTF-8</div>
          </div>
        </div>
      </div>
    </div>
  );
}
