"use client";
import { useState } from "react";

type DiffEntry = { path: string; type: "added" | "removed" | "changed"; left?: unknown; right?: unknown };

function diffJson(left: unknown, right: unknown, path = ""): DiffEntry[] {
  const results: DiffEntry[] = [];
  if (JSON.stringify(left) === JSON.stringify(right)) return results;
  if (typeof left !== typeof right || Array.isArray(left) !== Array.isArray(right) || left === null || right === null) {
    results.push({ path: path || "root", type: "changed", left, right }); return results;
  }
  if (typeof left === "object" && typeof right === "object") {
    const lObj = left as Record<string, unknown>; const rObj = right as Record<string, unknown>;
    const allKeys = new Set([...Object.keys(lObj), ...Object.keys(rObj)]);
    for (const k of allKeys) {
      const p = path ? `${path}.${k}` : k;
      if (!(k in lObj)) results.push({ path: p, type: "added", right: rObj[k] });
      else if (!(k in rObj)) results.push({ path: p, type: "removed", left: lObj[k] });
      else results.push(...diffJson(lObj[k], rObj[k], p));
    }
    return results;
  }
  results.push({ path: path || "root", type: "changed", left, right });
  return results;
}

function renderDiff(diffs: DiffEntry[]): string {
  if (diffs.length === 0) return `<div style="color:var(--success,#10b981);padding:20px">✓ No differences found. Both JSON values are identical.</div>`;
  return diffs.map((d) => {
    const color = d.type === "added" ? "var(--json-string,#27c93f)" : d.type === "removed" ? "var(--error,#ef4444)" : "var(--json-number,#f5a623)";
    const icon = d.type === "added" ? "+" : d.type === "removed" ? "−" : "~";
    const pathHtml = `<span style="color:var(--json-key,#3291ff)">${d.path}</span>`;
    let detail = "";
    if (d.type === "changed") detail = ` <span style="color:var(--text-secondary,#888)">was</span> <span style="color:var(--error,#ef4444)">${JSON.stringify(d.left)}</span> <span style="color:var(--text-secondary,#888)">→</span> <span style="color:var(--json-string,#27c93f)">${JSON.stringify(d.right)}</span>`;
    else if (d.type === "added") detail = ` <span style="color:var(--text-secondary,#888)">=</span> <span style="color:var(--json-string,#27c93f)">${JSON.stringify(d.right)}</span>`;
    else detail = ` <span style="color:var(--text-secondary,#888)">=</span> <span style="color:var(--error,#ef4444)">${JSON.stringify(d.left)}</span>`;
    return `<div style="padding:6px 20px;display:flex;align-items:flex-start;gap:10px;border-bottom:1px solid var(--border,#262626)"><span style="color:${color};font-weight:700;font-size:1rem;min-width:16px">${icon}</span><span>${pathHtml}${detail}</span></div>`;
  }).join("");
}

type Props = { fileLabel?: string; outputId?: string };

export default function JsonDiffWorkspace({ fileLabel = "diff.json", outputId = "json-diff-output" }: Props) {
  const [leftVal, setLeftVal] = useState("");
  const [rightVal, setRightVal] = useState("");
  const [outputHtml, setOutputHtml] = useState("");
  const [status, setStatus] = useState<{ text: string; type: "default" | "success" | "error" }>({ text: "Ready", type: "default" });

  function actionDiff() {
    let left: unknown, right: unknown;
    try { left = JSON.parse(leftVal.trim()); } catch { setStatus({ text: "Left JSON is invalid", type: "error" }); return; }
    try { right = JSON.parse(rightVal.trim()); } catch { setStatus({ text: "Right JSON is invalid", type: "error" }); return; }
    const diffs = diffJson(left, right);
    setOutputHtml(renderDiff(diffs));
    setStatus({ text: diffs.length === 0 ? "Identical" : `${diffs.length} difference${diffs.length !== 1 ? "s" : ""} found`, type: diffs.length === 0 ? "success" : "error" });
  }

  function actionClear() { setLeftVal(""); setRightVal(""); setOutputHtml(""); setStatus({ text: "Ready", type: "default" }); }
  function loadSample() {
    setLeftVal(JSON.stringify({ name: "JSONPro", version: "1.0", features: ["format", "validate"], debug: false }, null, 2));
    setRightVal(JSON.stringify({ name: "JSONPro", version: "2.0", features: ["format", "validate", "diff"], debug: true, newField: "hello" }, null, 2));
  }
  const statusColor = status.type === "success" ? "var(--success,#10b981)" : status.type === "error" ? "var(--error,#ef4444)" : "var(--text-secondary,#888)";

  const panelStyle: React.CSSProperties = { display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" };
  const headerStyle: React.CSSProperties = { padding: "8px 20px", background: "color-mix(in srgb, var(--bg-surface,#0a0a0a) 50%, transparent)", borderBottom: "1px solid var(--border,#262626)", fontSize: "0.75rem", color: "var(--text-secondary,#888)", fontWeight: 500, flexShrink: 0 };
  const textareaStyle: React.CSSProperties = { flex: 1, width: "100%", background: "transparent", border: "none", color: "var(--text-primary,#ededed)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, padding: 20, resize: "none", outline: "none", lineHeight: 1.6, whiteSpace: "pre", overflow: "auto" };

  return (
    <div className="tool-glow-card"><div className="tool-glow-inner">
      <div className="workspace-shell" style={{ background: "var(--app-bg,#050505)", borderRadius: 13, display: "flex", flexDirection: "column", height: 700, width: "100%", position: "relative", zIndex: 1 }}>
        <div className="workspace-header-inline" style={{ background: "var(--app-surface,#0f0f0f)", padding: "12px 20px", borderBottom: "1px solid var(--border,#262626)", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "13px 13px 0 0" }}>
          <div style={{ display: "flex", gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", display: "block" }} /><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "block" }} /><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", display: "block" }} /></div>
          <span style={{ fontSize: "0.7rem", color: "var(--text-secondary,#888)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)" }}>{fileLabel}</span>
          <div />
        </div>
        <div className="workspace-toolbar-inline" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid var(--border,#262626)", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "var(--bg-elevated,#141414)", color: "var(--text-primary,#ededed)", border: "1px solid var(--border-light,#333)", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500 }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg>
              Diff
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <button className="app-btn-hover" onClick={loadSample} style={{ padding: "6px 12px", background: "transparent", color: "var(--text-secondary,#888)", border: "1px solid var(--border,#262626)", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}>Sample</button>
            <button className="app-btn-hover" onClick={actionClear} style={{ padding: "6px 12px", background: "transparent", color: "var(--text-secondary,#888)", border: "1px solid var(--border,#262626)", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}>Clear</button>
            <div style={{ width: 1, height: 14, background: "var(--border,#262626)", margin: "0 2px" }} />
            <button className="app-btn-hover" onClick={actionDiff} style={{ padding: "6px 12px", background: "var(--text-primary,#ededed)", color: "var(--bg-base,#000)", border: "1px solid var(--text-primary,#ededed)", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}>Compare</button>
          </div>
        </div>
        {/* Three-pane layout: left | right | diff output */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", flex: 1, minHeight: 0, overflow: "hidden" }}>
          <div style={{ ...panelStyle, borderRight: "1px solid var(--border,#262626)" }}>
            <div style={headerStyle}>JSON A (Original)</div>
            <textarea className="workspace-editor-inline" value={leftVal} onChange={(e) => setLeftVal(e.target.value)} spellCheck={false} placeholder="Paste original JSON..." style={textareaStyle} />
          </div>
          <div style={{ ...panelStyle, borderRight: "1px solid var(--border,#262626)" }}>
            <div style={headerStyle}>JSON B (Modified)</div>
            <textarea className="workspace-editor-inline" value={rightVal} onChange={(e) => setRightVal(e.target.value)} spellCheck={false} placeholder="Paste modified JSON..." style={textareaStyle} />
          </div>
          <div style={panelStyle}>
            <div style={headerStyle}>Differences</div>
            <div id={outputId} style={{ flex: 1, overflow: "auto", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: outputHtml || '<div style="padding:20px;color:var(--text-secondary,#888)">Paste JSON in both panels and click Compare.</div>' }} />
          </div>
        </div>
        <div style={{ padding: "8px 20px", background: "var(--app-surface,#0f0f0f)", borderTop: "1px solid var(--border,#262626)", display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary,#888)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", flexShrink: 0, borderRadius: "0 0 13px 13px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg style={{ width: 12, height: 12, color: statusColor }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{status.type === "success" ? (<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>) : (<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>)}</svg>
            <span>{status.text}</span>
          </div>
          <div>Deep Diff · UTF-8</div>
        </div>
      </div>
    </div></div>
  );
}
