"use client";
import { useState } from "react";

function evaluateJsonPath(data: unknown, path: string): unknown {
  if (!path || path === "$") return data;
  const parts = path.replace(/^\$\.?/, "").split(/\.|\[(\d+)\]/).filter(Boolean);
  let current: unknown = data;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    if (Array.isArray(current)) {
      const idx = parseInt(part, 10);
      if (!isNaN(idx)) { current = current[idx]; continue; }
      if (part === "*") return current;
    }
    if (typeof current === "object") {
      current = (current as Record<string, unknown>)[part];
    } else { return undefined; }
  }
  return current;
}

function syntaxHighlight(json: string): string {
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
    if (/^"/.test(match)) { if (/:$/.test(match)) return `<span style="color:var(--json-key,#3291ff)">${match.replace(/:$/, "").trim()}</span><span style="color:var(--text-secondary,#888)">: </span>`; return `<span style="color:var(--json-string,#27c93f)">${match}</span>`; }
    if (/true|false/.test(match)) return `<span style="color:var(--json-boolean,#ff0080)">${match}</span>`;
    if (/null/.test(match)) return `<span style="color:var(--json-null,#888);font-style:italic">${match}</span>`;
    return `<span style="color:var(--json-number,#f5a623)">${match}</span>`;
  });
}

type Props = { fileLabel?: string; outputId?: string };

export default function JsonPathTesterWorkspace({ fileLabel = "jsonpath.json", outputId = "json-path-output" }: Props) {
  const [jsonVal, setJsonVal] = useState("");
  const [pathVal, setPathVal] = useState("$.");
  const [outputHtml, setOutputHtml] = useState("");
  const [status, setStatus] = useState<{ text: string; type: "default" | "success" | "error" }>({ text: "Ready", type: "default" });

  function evaluate() {
    let data: unknown;
    try { data = JSON.parse(jsonVal.trim()); } catch { setStatus({ text: "Invalid JSON", type: "error" }); return; }
    try {
      const result = evaluateJsonPath(data, pathVal.trim());
      if (result === undefined) { setStatus({ text: "No match", type: "error" }); setOutputHtml('<div style="color:var(--text-secondary,#888);padding:20px">No value found at this path.</div>'); return; }
      const str = JSON.stringify(result, null, 2);
      setOutputHtml(syntaxHighlight(str)); setStatus({ text: "Match found", type: "success" });
    } catch (e) { setStatus({ text: "Path error", type: "error" }); }
  }

  function actionClear() { setJsonVal(""); setPathVal("$."); setOutputHtml(""); setStatus({ text: "Ready", type: "default" }); }
  function loadSample() {
    const s = { store: { name: "JSONPro", products: [{ id: 1, name: "Formatter", price: 0 }, { id: 2, name: "Validator", price: 9.99 }], owner: { name: "Dev", active: true } } };
    setJsonVal(JSON.stringify(s, null, 2)); setPathVal("$.store.products[0].name");
    const result = evaluateJsonPath(s, "$.store.products[0].name");
    setOutputHtml(syntaxHighlight(JSON.stringify(result, null, 2))); setStatus({ text: "Match found", type: "success" });
  }

  const statusColor = status.type === "success" ? "var(--success,#10b981)" : status.type === "error" ? "var(--error,#ef4444)" : "var(--text-secondary,#888)";

  return (
    <div className="tool-glow-card"><div className="tool-glow-inner">
      <div className="workspace-shell" style={{ background: "var(--app-bg,#050505)", borderRadius: 13, display: "flex", flexDirection: "column", height: 700, width: "100%", position: "relative", zIndex: 1 }}>
        <div className="workspace-header-inline" style={{ background: "var(--app-surface,#0f0f0f)", padding: "12px 20px", borderBottom: "1px solid var(--border,#262626)", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "13px 13px 0 0" }}><div style={{ display: "flex", gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", display: "block" }} /><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "block" }} /><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", display: "block" }} /></div><span style={{ fontSize: "0.7rem", color: "var(--text-secondary,#888)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)" }}>{fileLabel}</span><div /></div>
        {/* Path input bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", borderBottom: "1px solid var(--border,#262626)", background: "var(--app-surface,#0f0f0f)", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary,#888)", fontWeight: 500, whiteSpace: "nowrap" }}>JSONPath:</span>
          <input value={pathVal} onChange={(e) => setPathVal(e.target.value)} onKeyDown={(e) => e.key === "Enter" && evaluate()} placeholder="$.store.products[0].name" style={{ flex: 1, minWidth: 200, background: "var(--bg-elevated,#141414)", border: "1px solid var(--border,#262626)", borderRadius: 6, color: "var(--text-primary,#ededed)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, padding: "6px 12px", outline: "none" }} />
          <button className="app-btn-hover" onClick={loadSample} style={{ padding: "6px 12px", background: "transparent", color: "var(--text-secondary,#888)", border: "1px solid var(--border,#262626)", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}>Sample</button>
          <button className="app-btn-hover" onClick={actionClear} style={{ padding: "6px 12px", background: "transparent", color: "var(--text-secondary,#888)", border: "1px solid var(--border,#262626)", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}>Clear</button>
          <button className="app-btn-hover" onClick={evaluate} style={{ padding: "6px 12px", background: "var(--text-primary,#ededed)", color: "var(--bg-base,#000)", border: "1px solid var(--text-primary,#ededed)", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}>Run</button>
        </div>
        <div className="app-grid-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, minHeight: 0, overflow: "hidden" }}>
          <div className="app-panel-item" style={{ display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden", borderRight: "1px solid var(--border,#262626)" }}><div style={{ padding: "8px 20px", background: "color-mix(in srgb, var(--bg-surface,#0a0a0a) 50%, transparent)", borderBottom: "1px solid var(--border,#262626)", fontSize: "0.75rem", color: "var(--text-secondary,#888)", fontWeight: 500, flexShrink: 0 }}>JSON Input</div><textarea className="workspace-editor-inline" value={jsonVal} onChange={(e) => setJsonVal(e.target.value)} spellCheck={false} placeholder="Paste JSON here..." style={{ flex: 1, width: "100%", background: "transparent", border: "none", color: "var(--text-primary,#ededed)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, padding: 20, resize: "none", outline: "none", lineHeight: 1.6, whiteSpace: "pre", overflow: "auto" }} /></div>
          <div className="app-panel-item" style={{ display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}><div style={{ padding: "8px 20px", background: "color-mix(in srgb, var(--bg-surface,#0a0a0a) 50%, transparent)", borderBottom: "1px solid var(--border,#262626)", fontSize: "0.75rem", color: "var(--text-secondary,#888)", fontWeight: 500, flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>Result<svg onClick={() => { const el = document.getElementById(outputId); if (el?.innerText) navigator.clipboard.writeText(el.innerText); }} style={{ cursor: "pointer", width: 14, height: 14 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></div><div id={outputId} className="workspace-editor-inline" dangerouslySetInnerHTML={{ __html: outputHtml || '<div style="padding:20px;color:var(--text-secondary,#888)">Enter a JSONPath expression above and click Run.</div>' }} style={{ flex: 1, width: "100%", background: "transparent", color: "var(--text-primary,#ededed)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, padding: 20, lineHeight: 1.6, whiteSpace: "pre", overflow: "auto" }} /></div>
        </div>
        <div style={{ padding: "8px 20px", background: "var(--app-surface,#0f0f0f)", borderTop: "1px solid var(--border,#262626)", display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary,#888)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", flexShrink: 0, borderRadius: "0 0 13px 13px" }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><svg style={{ width: 12, height: 12, color: statusColor }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{status.type === "success" ? (<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>) : (<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>)}</svg><span>{status.text}</span></div><div>JSONPath · UTF-8</div></div>
      </div>
    </div></div>
  );
}
