"use client";
import { useRef, useState } from "react";

function jsonToYaml(data: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (data === null) return "null";
  if (typeof data === "boolean") return String(data);
  if (typeof data === "number") return String(data);
  if (typeof data === "string") {
    if (data.includes(":") || data.includes("#") || data.includes("\n") || data.includes("'") || data === "") return `"${data.replace(/"/g, '\\"')}"`;
    return data;
  }
  if (Array.isArray(data)) {
    if (data.length === 0) return "[]";
    return data.map((item) => {
      if (typeof item === "object" && item !== null) return `${pad}- \n${jsonToYaml(item, indent + 1).split("\n").map((l) => `${pad}  ${l}`).join("\n")}`;
      return `${pad}- ${jsonToYaml(item, indent)}`;
    }).join("\n");
  }
  if (typeof data === "object") {
    const entries = Object.entries(data as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    return entries.map(([k, v]) => {
      if (typeof v === "object" && v !== null && !Array.isArray(v) && Object.keys(v as object).length > 0) {
        return `${pad}${k}:\n${jsonToYaml(v, indent + 1)}`;
      }
      if (Array.isArray(v) && v.length > 0) {
        return `${pad}${k}:\n${jsonToYaml(v, indent + 1)}`;
      }
      return `${pad}${k}: ${jsonToYaml(v, indent)}`;
    }).join("\n");
  }
  return String(data);
}

function yamlHighlight(yaml: string): string {
  return yaml.split("\n").map((line) => {
    const keyMatch = line.match(/^(\s*)([\w-]+)(:)(.*)$/);
    if (keyMatch) {
      const [, space, key, colon, rest] = keyMatch;
      const coloredRest = rest.trim() === "" ? rest
        : rest.replace(/(".*?"|'.*?')/g, `<span style="color:var(--json-string,#27c93f)">$1</span>`)
              .replace(/\b(true|false)\b/g, `<span style="color:var(--json-boolean,#ff0080)">$1</span>`)
              .replace(/\b(null)\b/g, `<span style="color:var(--json-null,#888);font-style:italic">$1</span>`)
              .replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:var(--json-number,#f5a623)">$1</span>`);
      return `${space}<span style="color:var(--json-key,#3291ff)">${key}</span><span style="color:var(--text-secondary,#888)">${colon}</span>${coloredRest}`;
    }
    if (line.trim().startsWith("- ")) {
      return line.replace(/^(\s*-\s*)(.*)$/, (_, dash, val) => {
        const colored = val.replace(/(".*?"|'.*?')/g, `<span style="color:var(--json-string,#27c93f)">$1</span>`)
          .replace(/\b(true|false)\b/g, `<span style="color:var(--json-boolean,#ff0080)">$1</span>`)
          .replace(/\b(-?\d+(?:\.\d+)?)\b/g, `<span style="color:var(--json-number,#f5a623)">$1</span>`);
        return `<span style="color:var(--text-secondary,#888)">${dash}</span>${colored}`;
      });
    }
    return line;
  }).join("\n");
}

type Props = { fileLabel?: string; inputLabel?: string; outputLabel?: string; outputId?: string };

export default function JsonToYamlWorkspace({ fileLabel = "output.yaml", inputLabel = "JSON Input", outputLabel = "YAML Output", outputId = "json-to-yaml-output" }: Props) {
  const [inputVal, setInputVal] = useState("");
  const [outputHtml, setOutputHtml] = useState("");
  const [rawOutput, setRawOutput] = useState("");
  const [status, setStatus] = useState<{ text: string; type: "default" | "success" | "error" }>({ text: "Ready", type: "default" });
  const jsonRef = useRef<unknown>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function parseInput(raw = inputVal) {
    const t = raw.trim();
    if (!t) { setStatus({ text: "Ready", type: "default" }); jsonRef.current = null; return false; }
    try { jsonRef.current = JSON.parse(t); setStatus({ text: "Valid JSON", type: "success" }); return true; }
    catch { setStatus({ text: "Invalid JSON", type: "error" }); jsonRef.current = null; return false; }
  }
  function actionConvert() {
    if (!parseInput()) return;
    const yaml = jsonToYaml(jsonRef.current);
    setRawOutput(yaml); setOutputHtml(yamlHighlight(yaml)); setStatus({ text: "Converted", type: "success" });
  }
  function actionClear() { setInputVal(""); setOutputHtml(""); setRawOutput(""); jsonRef.current = null; setStatus({ text: "Ready", type: "default" }); }
  function loadSample() {
    const s = { app: "JSONPro", version: "2.0", debug: false, port: 3000, features: ["format", "validate", "convert"], database: { host: "localhost", port: 5432, name: "jsonpro_db" } };
    const str = JSON.stringify(s, null, 2); setInputVal(str); jsonRef.current = s; setStatus({ text: "Valid JSON", type: "success" });
    const yaml = jsonToYaml(s); setRawOutput(yaml); setOutputHtml(yamlHighlight(yaml));
  }
  function copyOutput() { if (rawOutput) { navigator.clipboard.writeText(rawOutput); setStatus({ text: "Copied", type: "success" }); setTimeout(() => parseInput(), 2000); } }
  function downloadOutput() { if (rawOutput) { const b = new Blob([rawOutput], { type: "text/yaml" }); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = "data.yaml"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(u); } }
  function handleInputChange(val: string) { setInputVal(val); if (debounceRef.current) clearTimeout(debounceRef.current); debounceRef.current = setTimeout(() => parseInput(val), 300); }
  const statusColor = status.type === "success" ? "var(--success,#10b981)" : status.type === "error" ? "var(--error,#ef4444)" : "var(--text-secondary,#888)";

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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              YAML
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {(["Sample", "Clear"] as const).map((label) => (<button key={label} className="app-btn-hover" onClick={label === "Sample" ? loadSample : actionClear} style={{ padding: "6px 12px", background: "transparent", color: "var(--text-secondary,#888)", border: "1px solid var(--border,#262626)", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}>{label}</button>))}
            <div style={{ width: 1, height: 14, background: "var(--border,#262626)", margin: "0 2px" }} />
            <button className="app-btn-hover" onClick={actionConvert} style={{ padding: "6px 12px", background: "var(--text-primary,#ededed)", color: "var(--bg-base,#000)", border: "1px solid var(--text-primary,#ededed)", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}>Convert</button>
            <button className="app-btn-hover" onClick={() => parseInput()} style={{ padding: "6px 12px", background: "transparent", color: "var(--text-secondary,#888)", border: "1px solid var(--border,#262626)", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}>Validate</button>
          </div>
        </div>
        <div className="app-grid-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, minHeight: 0, overflow: "hidden" }}>
          <div className="app-panel-item" style={{ display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden", borderRight: "1px solid var(--border,#262626)" }}>
            <div style={{ padding: "8px 20px", background: "color-mix(in srgb, var(--bg-surface,#0a0a0a) 50%, transparent)", borderBottom: "1px solid var(--border,#262626)", fontSize: "0.75rem", color: "var(--text-secondary,#888)", fontWeight: 500, flexShrink: 0 }}>{inputLabel}</div>
            <textarea className="workspace-editor-inline" value={inputVal} onChange={(e) => handleInputChange(e.target.value)} spellCheck={false} placeholder="Paste JSON here..." style={{ flex: 1, width: "100%", background: "transparent", border: "none", color: "var(--text-primary,#ededed)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, padding: 20, resize: "none", outline: "none", lineHeight: 1.6, whiteSpace: "pre", overflow: "auto" }} />
          </div>
          <div className="app-panel-item" style={{ display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
            <div style={{ padding: "8px 20px", background: "color-mix(in srgb, var(--bg-surface,#0a0a0a) 50%, transparent)", borderBottom: "1px solid var(--border,#262626)", fontSize: "0.75rem", color: "var(--text-secondary,#888)", fontWeight: 500, flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {outputLabel}
              <div style={{ display: "flex", gap: 10 }}>
                <svg onClick={copyOutput} style={{ cursor: "pointer", width: 14, height: 14 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <svg onClick={downloadOutput} style={{ cursor: "pointer", width: 14, height: 14 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </div>
            </div>
            <div id={outputId} className="workspace-editor-inline" dangerouslySetInnerHTML={{ __html: outputHtml }} style={{ flex: 1, width: "100%", background: "transparent", color: "var(--text-primary,#ededed)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, padding: 20, lineHeight: 1.6, whiteSpace: "pre", overflow: "auto" }} />
          </div>
        </div>
        <div style={{ padding: "8px 20px", background: "var(--app-surface,#0f0f0f)", borderTop: "1px solid var(--border,#262626)", display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary,#888)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", flexShrink: 0, borderRadius: "0 0 13px 13px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg style={{ width: 12, height: 12, color: statusColor }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{status.type === "success" ? (<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>) : (<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>)}</svg>
            <span>{status.text}</span>
          </div>
          <div>YAML · UTF-8</div>
        </div>
      </div>
    </div></div>
  );
}
