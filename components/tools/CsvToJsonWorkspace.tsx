"use client";
import { useRef, useState } from "react";

function csvToJson(csv: string): { data: unknown[]; error: string | null } {
  const lines = csv.trim().split("\n").filter((l) => l.trim());
  if (lines.length < 2) return { data: [], error: "CSV must have at least a header row and one data row." };

  function parseLine(line: string): string[] {
    const result: string[] = [];
    let cur = ""; let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
        else { inQuotes = !inQuotes; }
      } else if (ch === "," && !inQuotes) { result.push(cur.trim()); cur = ""; }
      else { cur += ch; }
    }
    result.push(cur.trim());
    return result;
  }

  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map((line) => {
    const vals = parseLine(line);
    const obj: Record<string, unknown> = {};
    headers.forEach((h, i) => {
      const v = vals[i] ?? "";
      if (v === "") obj[h] = null;
      else if (v === "true") obj[h] = true;
      else if (v === "false") obj[h] = false;
      else if (!isNaN(Number(v)) && v !== "") obj[h] = Number(v);
      else obj[h] = v;
    });
    return obj;
  });
  return { data: rows, error: null };
}

function syntaxHighlight(json: string): string {
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
    if (/^"/.test(match)) {
      if (/:$/.test(match)) return `<span style="color:var(--json-key,#3291ff)">${match.replace(/:$/, "").trim()}</span><span style="color:var(--text-secondary,#888)">: </span>`;
      return `<span style="color:var(--json-string,#27c93f)">${match}</span>`;
    }
    if (/true|false/.test(match)) return `<span style="color:var(--json-boolean,#ff0080)">${match}</span>`;
    if (/null/.test(match)) return `<span style="color:var(--json-null,#888);font-style:italic">${match}</span>`;
    return `<span style="color:var(--json-number,#f5a623)">${match}</span>`;
  });
}

type Props = { fileLabel?: string; inputLabel?: string; outputLabel?: string; outputId?: string };

export default function CsvToJsonWorkspace({ fileLabel = "output.json", inputLabel = "CSV Input", outputLabel = "JSON Output", outputId = "csv-to-json-output" }: Props) {
  const [inputVal, setInputVal] = useState("");
  const [outputHtml, setOutputHtml] = useState("");
  const [rawOutput, setRawOutput] = useState("");
  const [status, setStatus] = useState<{ text: string; type: "default" | "success" | "error" }>({ text: "Ready", type: "default" });
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function actionConvert() {
    const t = inputVal.trim();
    if (!t) { setStatus({ text: "Ready", type: "default" }); return; }
    const { data, error } = csvToJson(t);
    if (error) { setStatus({ text: error, type: "error" }); return; }
    const json = JSON.stringify(data, null, 2);
    setRawOutput(json); setOutputHtml(syntaxHighlight(json)); setStatus({ text: `Converted — ${data.length} row${data.length !== 1 ? "s" : ""}`, type: "success" });
  }
  function actionClear() { setInputVal(""); setOutputHtml(""); setRawOutput(""); setStatus({ text: "Ready", type: "default" }); }
  function loadSample() {
    const s = `id,name,role,active,score\n1,Alice,Engineer,true,98.5\n2,Bob,Designer,false,87\n3,Carol,Manager,true,`;
    setInputVal(s);
    const { data } = csvToJson(s);
    const json = JSON.stringify(data, null, 2);
    setRawOutput(json); setOutputHtml(syntaxHighlight(json)); setStatus({ text: `Converted — ${data.length} rows`, type: "success" });
  }
  function copyOutput() { if (rawOutput) { navigator.clipboard.writeText(rawOutput); setStatus({ text: "Copied", type: "success" }); } }
  function downloadOutput() { if (rawOutput) { const b = new Blob([rawOutput], { type: "application/json" }); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = "data.json"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(u); } }
  function handleInputChange(val: string) { setInputVal(val); if (debounceRef.current) clearTimeout(debounceRef.current); debounceRef.current = setTimeout(() => { if (val.trim()) actionConvert(); else setStatus({ text: "Ready", type: "default" }); }, 400); }
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>
              JSON
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {(["Sample", "Clear"] as const).map((label) => (<button key={label} className="app-btn-hover" onClick={label === "Sample" ? loadSample : actionClear} style={{ padding: "6px 12px", background: "transparent", color: "var(--text-secondary,#888)", border: "1px solid var(--border,#262626)", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}>{label}</button>))}
            <div style={{ width: 1, height: 14, background: "var(--border,#262626)", margin: "0 2px" }} />
            <button className="app-btn-hover" onClick={actionConvert} style={{ padding: "6px 12px", background: "var(--text-primary,#ededed)", color: "var(--bg-base,#000)", border: "1px solid var(--text-primary,#ededed)", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}>Convert</button>
          </div>
        </div>
        <div className="app-grid-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, minHeight: 0, overflow: "hidden" }}>
          <div className="app-panel-item" style={{ display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden", borderRight: "1px solid var(--border,#262626)" }}>
            <div style={{ padding: "8px 20px", background: "color-mix(in srgb, var(--bg-surface,#0a0a0a) 50%, transparent)", borderBottom: "1px solid var(--border,#262626)", fontSize: "0.75rem", color: "var(--text-secondary,#888)", fontWeight: 500, flexShrink: 0 }}>{inputLabel}</div>
            <textarea className="workspace-editor-inline" value={inputVal} onChange={(e) => handleInputChange(e.target.value)} spellCheck={false} placeholder={"Paste CSV here...\n\nExample:\nname,age,city\nAlice,30,NYC\nBob,25,LA"} style={{ flex: 1, width: "100%", background: "transparent", border: "none", color: "var(--text-primary,#ededed)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, padding: 20, resize: "none", outline: "none", lineHeight: 1.6, whiteSpace: "pre", overflow: "auto" }} />
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
          <div>JSON · UTF-8</div>
        </div>
      </div>
    </div></div>
  );
}
