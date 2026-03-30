"use client";
import { useRef, useState } from "react";

// ─── SHARED SYNTAX HIGHLIGHT ──────────────────────────────────────────────────
function sh(json: string): string {
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (m) => {
    if (/^"/.test(m)) { if (/:$/.test(m)) return `<span style="color:var(--json-key,#3291ff)">${m.replace(/:$/,"").trim()}</span><span style="color:var(--text-secondary,#888)">: </span>`; return `<span style="color:var(--json-string,#27c93f)">${m}</span>`; }
    if (/true|false/.test(m)) return `<span style="color:var(--json-boolean,#ff0080)">${m}</span>`;
    if (/null/.test(m)) return `<span style="color:var(--json-null,#888);font-style:italic">${m}</span>`;
    return `<span style="color:var(--json-number,#f5a623)">${m}</span>`;
  });
}

function WS({ fileLabel, children, toolbar, statusText, statusType, footerRight = "UTF-8" }: { fileLabel: string; children: React.ReactNode; toolbar: React.ReactNode; statusText: string; statusType: "default"|"success"|"error"; footerRight?: string }) {
  const c = statusType === "success" ? "var(--success,#10b981)" : statusType === "error" ? "var(--error,#ef4444)" : "var(--text-secondary,#888)";
  return (
    <div className="tool-glow-card"><div className="tool-glow-inner">
      <div className="workspace-shell" style={{ background:"var(--app-bg,#050505)", borderRadius:13, display:"flex", flexDirection:"column", height:700, width:"100%", position:"relative", zIndex:1 }}>
        <div className="workspace-header-inline" style={{ background:"var(--app-surface,#0f0f0f)", padding:"12px 20px", borderBottom:"1px solid var(--border,#262626)", display:"flex", justifyContent:"space-between", alignItems:"center", borderRadius:"13px 13px 0 0" }}><div style={{ display:"flex", gap:8 }}><span style={{ width:10, height:10, borderRadius:"50%", background:"#ff5f56", display:"block" }}/><span style={{ width:10, height:10, borderRadius:"50%", background:"#ffbd2e", display:"block" }}/><span style={{ width:10, height:10, borderRadius:"50%", background:"#27c93f", display:"block" }}/></div><span style={{ fontSize:"0.7rem", color:"var(--text-secondary,#888)", fontFamily:"var(--font-mono,'JetBrains Mono',monospace)" }}>{fileLabel}</span><div/></div>
        <div className="workspace-toolbar-inline" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 20px", borderBottom:"1px solid var(--border,#262626)", flexWrap:"wrap", gap:12 }}>{toolbar}</div>
        {children}
        <div style={{ padding:"8px 20px", background:"var(--app-surface,#0f0f0f)", borderTop:"1px solid var(--border,#262626)", display:"flex", justifyContent:"space-between", fontSize:"0.75rem", color:"var(--text-secondary,#888)", fontFamily:"var(--font-mono,'JetBrains Mono',monospace)", flexShrink:0, borderRadius:"0 0 13px 13px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}><svg style={{ width:12, height:12, color:c }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{statusType==="success"?(<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>):(<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>)}</svg><span>{statusText}</span></div>
          <div>{footerRight}</div>
        </div>
      </div>
    </div></div>
  );
}

function Toolbar({ badge, badgeIcon, actions }: { badge: string; badgeIcon: React.ReactNode; actions: { label: string; onClick: () => void; primary?: boolean }[] }) {
  return (<>
    <div style={{ display:"flex", gap:8, alignItems:"center" }}><div style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px", background:"var(--bg-elevated,#141414)", color:"var(--text-primary,#ededed)", border:"1px solid var(--border-light,#333)", borderRadius:6, fontSize:"0.8rem", fontWeight:500 }}>{badgeIcon}{badge}</div></div>
    <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>{actions.map((a,i) => a.label === "|" ? <div key={i} style={{ width:1, height:14, background:"var(--border,#262626)", margin:"0 2px" }}/> : <button key={a.label} className="app-btn-hover" onClick={a.onClick} style={{ padding:"6px 12px", background:a.primary?"var(--text-primary,#ededed)":"transparent", color:a.primary?"var(--bg-base,#000)":"var(--text-secondary,#888)", border:`1px solid ${a.primary?"var(--text-primary,#ededed)":"var(--border,#262626)"}`, borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>{a.label}</button>)}</div>
  </>);
}

function Panel({ label, children, right }: { label: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="app-panel-item" style={{ display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}>
      <div style={{ padding:"8px 20px", background:"color-mix(in srgb, var(--bg-surface,#0a0a0a) 50%, transparent)", borderBottom:"1px solid var(--border,#262626)", fontSize:"0.75rem", color:"var(--text-secondary,#888)", fontWeight:500, flexShrink:0, display:"flex", justifyContent:"space-between", alignItems:"center" }}>{label}{right}</div>
      {children}
    </div>
  );
}

function CopyDownload({ raw, filename, mime }: { raw: string; filename: string; mime: string }) {
  return (
    <div style={{ display:"flex", gap:10 }}>
      <svg onClick={() => raw && navigator.clipboard.writeText(raw)} style={{ cursor:"pointer", width:14, height:14 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      <svg onClick={() => { if (!raw) return; const b=new Blob([raw],{type:mime}); const u=URL.createObjectURL(b); const a=document.createElement("a"); a.href=u; a.download=filename; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(u); }} style={{ cursor:"pointer", width:14, height:14 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </div>
  );
}

const TA = ({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <textarea className="workspace-editor-inline" value={value} onChange={(e) => onChange(e.target.value)} spellCheck={false} placeholder={placeholder || "Paste JSON here..."} style={{ flex:1, width:"100%", background:"transparent", border:"none", color:"var(--text-primary,#ededed)", fontFamily:"var(--font-mono,'JetBrains Mono',monospace)", fontSize:13, padding:20, resize:"none", outline:"none", lineHeight:1.6, whiteSpace:"pre", overflow:"auto" }} />
);

const OutputDiv = ({ id, html }: { id: string; html: string }) => (
  <div id={id} className="workspace-editor-inline" dangerouslySetInnerHTML={{ __html: html }} style={{ flex:1, width:"100%", background:"transparent", color:"var(--text-primary,#ededed)", fontFamily:"var(--font-mono,'JetBrains Mono',monospace)", fontSize:13, padding:20, lineHeight:1.6, whiteSpace:"pre", overflow:"auto" }} />
);

// ─── JSON FLATTENER ───────────────────────────────────────────────────────────
function flattenObj(obj: unknown, prefix = "", sep = "."): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  function walk(val: unknown, key: string) {
    if (val !== null && typeof val === "object" && !Array.isArray(val)) { for (const [k, v] of Object.entries(val as object)) walk(v, key ? `${key}${sep}${k}` : k); }
    else if (Array.isArray(val)) { val.forEach((v, i) => walk(v, `${key}[${i}]`)); }
    else { result[key] = val; }
  }
  walk(obj, prefix);
  return result;
}

function unflattenObj(flat: Record<string, unknown>): unknown {
  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(flat)) {
    const parts = key.replace(/\[(\d+)\]/g, ".$1").split(".");
    let cur: Record<string, unknown> = result;
    for (let i = 0; i < parts.length - 1; i++) { if (!(parts[i] in cur)) cur[parts[i]] = {}; cur = cur[parts[i]] as Record<string, unknown>; }
    cur[parts[parts.length - 1]] = val;
  }
  return result;
}

export function JsonFlattenerWorkspace({ fileLabel = "flattened.json", outputId = "json-flattener-output" }: { fileLabel?: string; outputId?: string }) {
  const [inputVal, setInputVal] = useState(""); const [outputHtml, setOutputHtml] = useState(""); const [rawOutput, setRawOutput] = useState("");
  const [mode, setMode] = useState<"flatten"|"unflatten">("flatten");
  const [status, setStatus] = useState<{ text: string; type: "default"|"success"|"error" }>({ text:"Ready", type:"default" });

  function run() {
    let data: unknown; try { data = JSON.parse(inputVal.trim()); } catch { setStatus({ text:"Invalid JSON", type:"error" }); return; }
    const result = mode === "flatten" ? flattenObj(data) : unflattenObj(data as Record<string,unknown>);
    const str = JSON.stringify(result, null, 2); setRawOutput(str); setOutputHtml(sh(str));
    setStatus({ text: mode === "flatten" ? `Flattened — ${Object.keys(result as object).length} keys` : "Unflattened", type:"success" });
  }
  function loadSample() { const s = { user: { name:"Alice", address:{ city:"NYC", zip:"10001" } }, scores:[98, 87, 76] }; setInputVal(JSON.stringify(s,null,2)); setMode("flatten"); }
  function actionClear() { setInputVal(""); setOutputHtml(""); setRawOutput(""); setStatus({ text:"Ready", type:"default" }); }

  return (
    <WS fileLabel={fileLabel} statusText={status.text} statusType={status.type} footerRight="Flat JSON · UTF-8"
      toolbar={<Toolbar badge={mode==="flatten"?"Flatten":"Unflatten"} badgeIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:13,height:13}}><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/></svg>} actions={[
        { label:"Flatten", onClick:()=>setMode("flatten"), primary: mode==="flatten" },
        { label:"Unflatten", onClick:()=>setMode("unflatten"), primary: mode==="unflatten" },
        { label:"|", onClick:()=>{} },
        { label:"Sample", onClick:loadSample }, { label:"Clear", onClick:actionClear }, { label:"|", onClick:()=>{} }, { label:"Run", onClick:run, primary:true }
      ]} />}
    >
      <div className="app-grid-inner" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", flex:1, minHeight:0, overflow:"hidden" }}>
        <div style={{ borderRight:"1px solid var(--border,#262626)", display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}><Panel label="JSON Input"><TA value={inputVal} onChange={setInputVal} /></Panel></div>
        <Panel label="Output" right={<CopyDownload raw={rawOutput} filename="flattened.json" mime="application/json" />}><OutputDiv id={outputId} html={outputHtml} /></Panel>
      </div>
    </WS>
  );
}

// ─── JSON TO TYPESCRIPT ───────────────────────────────────────────────────────
function jsonToTs(data: unknown, name = "Root", indent = 0): string {
  const pad = "  ".repeat(indent);
  if (data === null) return "null";
  if (typeof data === "boolean") return "boolean";
  if (typeof data === "number") return "number";
  if (typeof data === "string") return "string";
  if (Array.isArray(data)) {
    if (data.length === 0) return "unknown[]";
    const itemType = jsonToTs(data[0], name + "Item", indent);
    return `${itemType}[]`;
  }
  if (typeof data === "object") {
    const entries = Object.entries(data as Record<string, unknown>);
    if (entries.length === 0) return "Record<string, unknown>";
    const fields = entries.map(([k, v]) => `${pad}  ${k}: ${jsonToTs(v, k.charAt(0).toUpperCase()+k.slice(1), indent+1)};`).join("\n");
    return `{\n${fields}\n${pad}}`;
  }
  return "unknown";
}

export function JsonToTypeScriptWorkspace({ fileLabel = "types.ts", outputId = "json-to-ts-output" }: { fileLabel?: string; outputId?: string }) {
  const [inputVal, setInputVal] = useState(""); const [outputHtml, setOutputHtml] = useState(""); const [rawOutput, setRawOutput] = useState("");
  const [ifaceName, setIfaceName] = useState("MyType");
  const [status, setStatus] = useState<{ text: string; type: "default"|"success"|"error" }>({ text:"Ready", type:"default" });

  function run() {
    let data: unknown; try { data = JSON.parse(inputVal.trim()); } catch { setStatus({ text:"Invalid JSON", type:"error" }); return; }
    const typeStr = jsonToTs(data, ifaceName);
    const isObj = typeof data === "object" && data !== null && !Array.isArray(data);
    const output = isObj ? `export interface ${ifaceName} ${typeStr}` : `export type ${ifaceName} = ${typeStr};`;
    setRawOutput(output);
    // Highlight TS syntax
    const html = output
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/\b(export|interface|type)\b/g, `<span style="color:var(--json-boolean,#ff0080)">$1</span>`)
      .replace(/\b(string|number|boolean|null|unknown)\b/g, `<span style="color:var(--json-key,#3291ff)">$1</span>`)
      .replace(/([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*:)/g, `<span style="color:var(--text-primary,#ededed)">$1</span>`);
    setOutputHtml(html); setStatus({ text:"Types Generated", type:"success" });
  }
  function loadSample() { setInputVal(JSON.stringify({ id:1, name:"Alice", active:true, score:98.5, tags:["admin"], meta:{ created:"2024-01-01" } },null,2)); setIfaceName("User"); }
  function actionClear() { setInputVal(""); setOutputHtml(""); setRawOutput(""); setStatus({ text:"Ready", type:"default" }); }

  return (
    <WS fileLabel={fileLabel} statusText={status.text} statusType={status.type} footerRight="TypeScript · UTF-8"
      toolbar={<>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <span style={{ fontSize:"0.8rem", color:"var(--text-secondary,#888)" }}>Interface name:</span>
          <input value={ifaceName} onChange={(e)=>setIfaceName(e.target.value)} style={{ background:"var(--bg-elevated,#141414)", border:"1px solid var(--border,#262626)", borderRadius:6, color:"var(--text-primary,#ededed)", fontFamily:"var(--font-mono,'JetBrains Mono',monospace)", fontSize:13, padding:"4px 10px", outline:"none", width:120 }} />
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          <button className="app-btn-hover" onClick={loadSample} style={{ padding:"6px 12px", background:"transparent", color:"var(--text-secondary,#888)", border:"1px solid var(--border,#262626)", borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>Sample</button>
          <button className="app-btn-hover" onClick={actionClear} style={{ padding:"6px 12px", background:"transparent", color:"var(--text-secondary,#888)", border:"1px solid var(--border,#262626)", borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>Clear</button>
          <div style={{ width:1, height:14, background:"var(--border,#262626)", margin:"0 2px" }}/>
          <button className="app-btn-hover" onClick={run} style={{ padding:"6px 12px", background:"var(--text-primary,#ededed)", color:"var(--bg-base,#000)", border:"1px solid var(--text-primary,#ededed)", borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>Generate</button>
        </div>
      </>}
    >
      <div className="app-grid-inner" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", flex:1, minHeight:0, overflow:"hidden" }}>
        <div style={{ borderRight:"1px solid var(--border,#262626)", display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}><Panel label="JSON Input"><TA value={inputVal} onChange={setInputVal} /></Panel></div>
        <Panel label="TypeScript Output" right={<CopyDownload raw={rawOutput} filename="types.ts" mime="text/plain" />}><OutputDiv id={outputId} html={outputHtml} /></Panel>
      </div>
    </WS>
  );
}

// ─── JSON TO ZOD ──────────────────────────────────────────────────────────────
function jsonToZod(data: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (data === null) return "z.null()";
  if (typeof data === "boolean") return "z.boolean()";
  if (typeof data === "number") return Number.isInteger(data) ? "z.number().int()" : "z.number()";
  if (typeof data === "string") return "z.string()";
  if (Array.isArray(data)) { if (data.length === 0) return "z.array(z.unknown())"; return `z.array(${jsonToZod(data[0], indent)})`; }
  if (typeof data === "object") {
    const entries = Object.entries(data as Record<string, unknown>);
    if (entries.length === 0) return "z.record(z.unknown())";
    const fields = entries.map(([k, v]) => `${pad}  ${k}: ${jsonToZod(v, indent+1)},`).join("\n");
    return `z.object({\n${fields}\n${pad}})`;
  }
  return "z.unknown()";
}

export function JsonToZodWorkspace({ fileLabel = "schema.zod.ts", outputId = "json-to-zod-output" }: { fileLabel?: string; outputId?: string }) {
  const [inputVal, setInputVal] = useState(""); const [outputHtml, setOutputHtml] = useState(""); const [rawOutput, setRawOutput] = useState("");
  const [schemaName, setSchemaName] = useState("mySchema");
  const [status, setStatus] = useState<{ text: string; type: "default"|"success"|"error" }>({ text:"Ready", type:"default" });

  function run() {
    let data: unknown; try { data = JSON.parse(inputVal.trim()); } catch { setStatus({ text:"Invalid JSON", type:"error" }); return; }
    const zodStr = jsonToZod(data);
    const output = `import { z } from "zod";\n\nexport const ${schemaName} = ${zodStr};\n\nexport type ${schemaName.charAt(0).toUpperCase()+schemaName.slice(1)} = z.infer<typeof ${schemaName}>;`;
    setRawOutput(output);
    const html = output.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/\b(import|from|export|const|type|typeof)\b/g,`<span style="color:var(--json-boolean,#ff0080)">$1</span>`)
      .replace(/\b(z\.(object|array|string|number|boolean|null|unknown|record|infer))\b/g,`<span style="color:var(--json-key,#3291ff)">$1</span>`)
      .replace(/(".*?")/g,`<span style="color:var(--json-string,#27c93f)">$1</span>`);
    setOutputHtml(html); setStatus({ text:"Zod Schema Generated", type:"success" });
  }
  function loadSample() { setInputVal(JSON.stringify({ id:1, name:"Alice", active:true, email:"alice@example.com", score:98.5, tags:["admin"] },null,2)); setSchemaName("userSchema"); }
  function actionClear() { setInputVal(""); setOutputHtml(""); setRawOutput(""); setStatus({ text:"Ready", type:"default" }); }

  return (
    <WS fileLabel={fileLabel} statusText={status.text} statusType={status.type} footerRight="Zod · TypeScript"
      toolbar={<>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <span style={{ fontSize:"0.8rem", color:"var(--text-secondary,#888)" }}>Schema name:</span>
          <input value={schemaName} onChange={(e)=>setSchemaName(e.target.value)} style={{ background:"var(--bg-elevated,#141414)", border:"1px solid var(--border,#262626)", borderRadius:6, color:"var(--text-primary,#ededed)", fontFamily:"var(--font-mono,'JetBrains Mono',monospace)", fontSize:13, padding:"4px 10px", outline:"none", width:140 }} />
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          <button className="app-btn-hover" onClick={loadSample} style={{ padding:"6px 12px", background:"transparent", color:"var(--text-secondary,#888)", border:"1px solid var(--border,#262626)", borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>Sample</button>
          <button className="app-btn-hover" onClick={actionClear} style={{ padding:"6px 12px", background:"transparent", color:"var(--text-secondary,#888)", border:"1px solid var(--border,#262626)", borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>Clear</button>
          <div style={{ width:1, height:14, background:"var(--border,#262626)", margin:"0 2px" }}/>
          <button className="app-btn-hover" onClick={run} style={{ padding:"6px 12px", background:"var(--text-primary,#ededed)", color:"var(--bg-base,#000)", border:"1px solid var(--text-primary,#ededed)", borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>Generate</button>
        </div>
      </>}
    >
      <div className="app-grid-inner" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", flex:1, minHeight:0, overflow:"hidden" }}>
        <div style={{ borderRight:"1px solid var(--border,#262626)", display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}><Panel label="JSON Input"><TA value={inputVal} onChange={setInputVal} /></Panel></div>
        <Panel label="Zod Schema" right={<CopyDownload raw={rawOutput} filename="schema.zod.ts" mime="text/plain" />}><OutputDiv id={outputId} html={outputHtml} /></Panel>
      </div>
    </WS>
  );
}

// ─── JSON SORTER ──────────────────────────────────────────────────────────────
function sortJson(data: unknown, dir: "asc"|"desc", deep: boolean): unknown {
  if (Array.isArray(data)) return deep ? data.map((v) => sortJson(v, dir, deep)) : data;
  if (typeof data === "object" && data !== null) {
    const keys = Object.keys(data as object).sort((a,b) => dir==="asc" ? a.localeCompare(b) : b.localeCompare(a));
    const sorted: Record<string,unknown> = {};
    for (const k of keys) sorted[k] = deep ? sortJson((data as Record<string,unknown>)[k], dir, deep) : (data as Record<string,unknown>)[k];
    return sorted;
  }
  return data;
}

export function JsonSorterWorkspace({ fileLabel = "sorted.json", outputId = "json-sorter-output" }: { fileLabel?: string; outputId?: string }) {
  const [inputVal, setInputVal] = useState(""); const [outputHtml, setOutputHtml] = useState(""); const [rawOutput, setRawOutput] = useState("");
  const [dir, setDir] = useState<"asc"|"desc">("asc"); const [deep, setDeep] = useState(true);
  const [status, setStatus] = useState<{ text: string; type: "default"|"success"|"error" }>({ text:"Ready", type:"default" });

  function run() {
    let data: unknown; try { data = JSON.parse(inputVal.trim()); } catch { setStatus({ text:"Invalid JSON", type:"error" }); return; }
    const sorted = sortJson(data, dir, deep);
    const str = JSON.stringify(sorted, null, 2); setRawOutput(str); setOutputHtml(sh(str)); setStatus({ text:"Sorted", type:"success" });
  }
  function loadSample() { setInputVal(JSON.stringify({ zebra:1, apple:"fruit", mango:true, banana:{ zoo:1, ant:2 }, cherry:null },null,2)); }
  function actionClear() { setInputVal(""); setOutputHtml(""); setRawOutput(""); setStatus({ text:"Ready", type:"default" }); }

  return (
    <WS fileLabel={fileLabel} statusText={status.text} statusType={status.type} footerRight="Sorted · UTF-8"
      toolbar={<>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {(["asc","desc"] as const).map((d) => <button key={d} className="app-btn-hover" onClick={()=>setDir(d)} style={{ padding:"6px 12px", background:dir===d?"var(--bg-elevated,#141414)":"transparent", color:dir===d?"var(--text-primary,#ededed)":"var(--text-secondary,#888)", border:`1px solid ${dir===d?"var(--border-light,#333)":"var(--border,#262626)"}`, borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>{d==="asc"?"A → Z":"Z → A"}</button>)}
          <button className="app-btn-hover" onClick={()=>setDeep(!deep)} style={{ padding:"6px 12px", background:deep?"var(--bg-elevated,#141414)":"transparent", color:deep?"var(--text-primary,#ededed)":"var(--text-secondary,#888)", border:`1px solid ${deep?"var(--border-light,#333)":"var(--border,#262626)"}`, borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>Deep Sort</button>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          <button className="app-btn-hover" onClick={loadSample} style={{ padding:"6px 12px", background:"transparent", color:"var(--text-secondary,#888)", border:"1px solid var(--border,#262626)", borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>Sample</button>
          <button className="app-btn-hover" onClick={actionClear} style={{ padding:"6px 12px", background:"transparent", color:"var(--text-secondary,#888)", border:"1px solid var(--border,#262626)", borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>Clear</button>
          <div style={{ width:1, height:14, background:"var(--border,#262626)", margin:"0 2px" }}/>
          <button className="app-btn-hover" onClick={run} style={{ padding:"6px 12px", background:"var(--text-primary,#ededed)", color:"var(--bg-base,#000)", border:"1px solid var(--text-primary,#ededed)", borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>Sort</button>
        </div>
      </>}
    >
      <div className="app-grid-inner" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", flex:1, minHeight:0, overflow:"hidden" }}>
        <div style={{ borderRight:"1px solid var(--border,#262626)", display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}><Panel label="JSON Input"><TA value={inputVal} onChange={setInputVal} /></Panel></div>
        <Panel label="Sorted Output" right={<CopyDownload raw={rawOutput} filename="sorted.json" mime="application/json" />}><OutputDiv id={outputId} html={outputHtml} /></Panel>
      </div>
    </WS>
  );
}

// ─── JSON TABLE VIEWER ────────────────────────────────────────────────────────
function renderTable(data: unknown[]): string {
  if (!data.length) return '<div style="padding:20px;color:var(--text-secondary,#888)">Empty array.</div>';
  const keys = Array.from(new Set(data.flatMap((r) => typeof r==="object"&&r!==null ? Object.keys(r as object) : ["value"])));
  const thStyle = `padding:8px 14px;border-bottom:2px solid var(--border-light,#333);border-right:1px solid var(--border,#262626);color:var(--json-key,#3291ff);font-weight:600;font-size:0.75rem;white-space:nowrap;text-align:left`;
  const tdStyle = `padding:7px 14px;border-bottom:1px solid var(--border,#262626);border-right:1px solid var(--border,#262626);font-size:0.75rem;white-space:nowrap;max-width:200px;overflow:hidden;text-overflow:ellipsis`;
  const header = `<tr>${keys.map((k)=>`<th style="${thStyle}">${k}</th>`).join("")}</tr>`;
  const rows = data.map((row,i)=>{
    const bg = i%2===0?"transparent":"rgba(255,255,255,0.02)";
    const cells = keys.map((k)=>{
      const v = typeof row==="object"&&row!==null?(row as Record<string,unknown>)[k]:row;
      let color="var(--text-primary,#ededed)";
      if(v===null||v===undefined) color="var(--json-null,#888)";
      else if(typeof v==="boolean") color="var(--json-boolean,#ff0080)";
      else if(typeof v==="number") color="var(--json-number,#f5a623)";
      else if(typeof v==="string") color="var(--json-string,#27c93f)";
      const display = v===null||v===undefined?"null":typeof v==="object"?JSON.stringify(v):String(v);
      return `<td style="${tdStyle}color:${color};background:${bg}">${display}</td>`;
    });
    return `<tr>${cells.join("")}</tr>`;
  });
  return `<div style="overflow:auto;flex:1"><table style="border-collapse:collapse;width:100%;font-family:var(--font-mono,'JetBrains Mono',monospace)"><thead style="position:sticky;top:0;background:var(--app-surface,#0f0f0f)">${header}</thead><tbody>${rows.join("")}</tbody></table></div>`;
}

export function JsonTableViewerWorkspace({ fileLabel = "table.json", outputId = "json-table-output" }: { fileLabel?: string; outputId?: string }) {
  const [inputVal, setInputVal] = useState(""); const [outputHtml, setOutputHtml] = useState("");
  const [status, setStatus] = useState<{ text: string; type: "default"|"success"|"error" }>({ text:"Ready", type:"default" });
  const debounceRef = useRef<ReturnType<typeof setTimeout>|null>(null);

  function run(raw = inputVal) {
    const t = raw.trim(); if (!t) { setStatus({ text:"Ready", type:"default" }); setOutputHtml(""); return; }
    let data: unknown; try { data = JSON.parse(t); } catch { setStatus({ text:"Invalid JSON", type:"error" }); return; }
    if (!Array.isArray(data)) { setStatus({ text:"Input must be a JSON array", type:"error" }); return; }
    setOutputHtml(renderTable(data)); setStatus({ text:`${data.length} row${data.length!==1?"s":""}`, type:"success" });
  }
  function loadSample() { const s=[{id:1,name:"Alice",role:"Engineer",active:true,score:98.5},{id:2,name:"Bob",role:"Designer",active:false,score:87},{id:3,name:"Carol",role:"Manager",active:true,score:null}]; setInputVal(JSON.stringify(s,null,2)); setOutputHtml(renderTable(s)); setStatus({ text:"3 rows", type:"success" }); }
  function actionClear() { setInputVal(""); setOutputHtml(""); setStatus({ text:"Ready", type:"default" }); }
  function handleChange(val: string) { setInputVal(val); if (debounceRef.current) clearTimeout(debounceRef.current); debounceRef.current = setTimeout(()=>run(val), 400); }

  return (
    <WS fileLabel={fileLabel} statusText={status.text} statusType={status.type} footerRight="Table View · UTF-8"
      toolbar={<Toolbar badge="Table" badgeIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:13,height:13}}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>} actions={[{label:"Sample",onClick:loadSample},{label:"Clear",onClick:actionClear},{label:"|",onClick:()=>{}},{label:"Render",onClick:()=>run(),primary:true}]} />}
    >
      <div className="app-grid-inner" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", flex:1, minHeight:0, overflow:"hidden" }}>
        <div style={{ borderRight:"1px solid var(--border,#262626)", display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}><Panel label="JSON Array Input"><TA value={inputVal} onChange={handleChange} placeholder="Paste a JSON array of objects..." /></Panel></div>
        <div className="app-panel-item" style={{ display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}>
          <div style={{ padding:"8px 20px", background:"color-mix(in srgb, var(--bg-surface,#0a0a0a) 50%, transparent)", borderBottom:"1px solid var(--border,#262626)", fontSize:"0.75rem", color:"var(--text-secondary,#888)", fontWeight:500, flexShrink:0 }}>Table Output</div>
          <div id={outputId} style={{ flex:1, overflow:"auto", fontSize:13 }} dangerouslySetInnerHTML={{ __html: outputHtml || '<div style="padding:20px;color:var(--text-secondary,#888)">Paste a JSON array above to render the table.</div>' }} />
        </div>
      </div>
    </WS>
  );
}

// ─── JSON ESCAPE / UNESCAPE ───────────────────────────────────────────────────
export function JsonEscapeWorkspace({ fileLabel = "escaped.json", outputId = "json-escape-output" }: { fileLabel?: string; outputId?: string }) {
  const [inputVal, setInputVal] = useState(""); const [outputHtml, setOutputHtml] = useState(""); const [rawOutput, setRawOutput] = useState("");
  const [mode, setMode] = useState<"escape"|"unescape">("escape");
  const [status, setStatus] = useState<{ text: string; type: "default"|"success"|"error" }>({ text:"Ready", type:"default" });

  function run() {
    const t = inputVal.trim(); if (!t) { setStatus({ text:"Ready", type:"default" }); return; }
    try {
      let result: string;
      if (mode === "escape") { result = JSON.stringify(t); }
      else { result = JSON.parse(t); if (typeof result !== "string") { setStatus({ text:"Input must be a JSON string", type:"error" }); return; } }
      setRawOutput(result);
      const html = result.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
        .replace(/(\\n|\\t|\\r|\\\\|\\")/g, `<span style="color:var(--json-boolean,#ff0080)">$1</span>`);
      setOutputHtml(html); setStatus({ text:mode==="escape"?"Escaped":"Unescaped", type:"success" });
    } catch { setStatus({ text:"Invalid input", type:"error" }); }
  }
  function loadSample() { if (mode==="escape") setInputVal('Hello "World"\nThis is a tab:\there'); else setInputVal('"Hello \\"World\\"\\nThis is a tab:\\there"'); }
  function actionClear() { setInputVal(""); setOutputHtml(""); setRawOutput(""); setStatus({ text:"Ready", type:"default" }); }

  return (
    <WS fileLabel={fileLabel} statusText={status.text} statusType={status.type} footerRight="Escape · UTF-8"
      toolbar={<>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {(["escape","unescape"] as const).map((m)=><button key={m} className="app-btn-hover" onClick={()=>setMode(m)} style={{ padding:"6px 12px", background:mode===m?"var(--bg-elevated,#141414)":"transparent", color:mode===m?"var(--text-primary,#ededed)":"var(--text-secondary,#888)", border:`1px solid ${mode===m?"var(--border-light,#333)":"var(--border,#262626)"}`, borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>{m.charAt(0).toUpperCase()+m.slice(1)}</button>)}
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          <button className="app-btn-hover" onClick={loadSample} style={{ padding:"6px 12px", background:"transparent", color:"var(--text-secondary,#888)", border:"1px solid var(--border,#262626)", borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>Sample</button>
          <button className="app-btn-hover" onClick={actionClear} style={{ padding:"6px 12px", background:"transparent", color:"var(--text-secondary,#888)", border:"1px solid var(--border,#262626)", borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>Clear</button>
          <div style={{ width:1, height:14, background:"var(--border,#262626)", margin:"0 2px" }}/>
          <button className="app-btn-hover" onClick={run} style={{ padding:"6px 12px", background:"var(--text-primary,#ededed)", color:"var(--bg-base,#000)", border:"1px solid var(--text-primary,#ededed)", borderRadius:6, fontSize:"0.8rem", fontWeight:500, cursor:"pointer", transition:"0.2s" }}>{mode==="escape"?"Escape":"Unescape"}</button>
        </div>
      </>}
    >
      <div className="app-grid-inner" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", flex:1, minHeight:0, overflow:"hidden" }}>
        <div style={{ borderRight:"1px solid var(--border,#262626)", display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}><Panel label={mode==="escape"?"Raw String Input":"Escaped JSON String"}><TA value={inputVal} onChange={setInputVal} placeholder={mode==="escape"?'Enter raw text, e.g.:\nHello "World"\nNew line here':'"Hello \\"World\\"\\nNew line here"'} /></Panel></div>
        <Panel label={mode==="escape"?"Escaped Output":"Unescaped Output"} right={<CopyDownload raw={rawOutput} filename="escaped.txt" mime="text/plain" />}><OutputDiv id={outputId} html={outputHtml} /></Panel>
      </div>
    </WS>
  );
}

// ─── JWT DECODER ──────────────────────────────────────────────────────────────
function base64UrlDecode(str: string): string {
  str = str.replace(/-/g,"+").replace(/_/g,"/");
  while (str.length % 4) str += "=";
  try { return decodeURIComponent(atob(str).split("").map((c)=>"%"+("00"+c.charCodeAt(0).toString(16)).slice(-2)).join("")); }
  catch { return atob(str); }
}

export function JwtDecoderWorkspace({ fileLabel = "token.jwt", outputId = "jwt-decoder-output" }: { fileLabel?: string; outputId?: string }) {
  const [inputVal, setInputVal] = useState(""); const [outputHtml, setOutputHtml] = useState("");
  const [status, setStatus] = useState<{ text: string; type: "default"|"success"|"error" }>({ text:"Ready", type:"default" });

  function decode(raw = inputVal) {
    const t = raw.trim(); if (!t) { setStatus({ text:"Ready", type:"default" }); setOutputHtml(""); return; }
    const parts = t.split(".");
    if (parts.length !== 3) { setStatus({ text:"Invalid JWT (must have 3 parts)", type:"error" }); return; }
    try {
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      const now = Math.floor(Date.now()/1000);
      const expired = payload.exp && payload.exp < now;
      const expStr = payload.exp ? new Date(payload.exp*1000).toISOString() : null;

      function section(title: string, color: string, data: object) {
        return `<div style="margin-bottom:16px"><div style="padding:6px 20px;background:${color}18;border-left:3px solid ${color};font-size:0.7rem;font-weight:600;color:${color};letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0">${title}</div><div style="padding:12px 20px;font-family:var(--font-mono,'JetBrains Mono',monospace);font-size:13px">${sh(JSON.stringify(data,null,2))}</div></div>`;
      }
      let html = section("Header", "var(--json-key,#3291ff)", header) + section("Payload", "var(--json-string,#27c93f)", payload);
      html += `<div style="padding:8px 20px;border-top:1px solid var(--border,#262626);font-size:0.75rem;color:var(--text-secondary,#888);display:flex;gap:16px;flex-wrap:wrap">`;
      if (expStr) html += `<span>Expires: <span style="color:${expired?"var(--error,#ef4444)":"var(--success,#10b981)"}">${expStr}${expired?" (EXPIRED)":""}</span></span>`;
      html += `<span style="color:var(--text-secondary,#888)">Signature: <span style="color:var(--json-number,#f5a623)">${parts[2].substring(0,20)}…</span> (not verified)</span></div>`;
      setOutputHtml(html);
      setStatus({ text: expired?"Token expired":"Decoded", type: expired?"error":"success" });
    } catch { setStatus({ text:"Failed to decode JWT", type:"error" }); }
  }

  function loadSample() {
    const sample = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    setInputVal(sample); decode(sample);
  }
  function actionClear() { setInputVal(""); setOutputHtml(""); setStatus({ text:"Ready", type:"default" }); }
  function handleChange(val: string) { setInputVal(val); decode(val); }

  return (
    <WS fileLabel={fileLabel} statusText={status.text} statusType={status.type} footerRight="JWT · Base64Url"
      toolbar={<Toolbar badge="JWT Decoder" badgeIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:13,height:13}}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>} actions={[{label:"Sample",onClick:loadSample},{label:"Clear",onClick:actionClear}]} />}
    >
      <div style={{ display:"flex", flexDirection:"column", flex:1, minHeight:0, overflow:"hidden" }}>
        <div style={{ padding:"8px 20px", background:"color-mix(in srgb, var(--bg-surface,#0a0a0a) 50%, transparent)", borderBottom:"1px solid var(--border,#262626)", fontSize:"0.75rem", color:"var(--text-secondary,#888)", fontWeight:500 }}>JWT Token</div>
        <textarea className="workspace-editor-inline" value={inputVal} onChange={(e)=>handleChange(e.target.value)} spellCheck={false} placeholder="Paste JWT token here (eyJ...)" style={{ width:"100%", background:"transparent", border:"none", color:"var(--json-string,#27c93f)", fontFamily:"var(--font-mono,'JetBrains Mono',monospace)", fontSize:13, padding:20, resize:"none", outline:"none", lineHeight:1.6, whiteSpace:"pre-wrap", wordBreak:"break-all", height:100, flexShrink:0 }} />
        <div style={{ borderTop:"1px solid var(--border,#262626)", flex:1, overflow:"auto" }} dangerouslySetInnerHTML={{ __html: outputHtml || '<div style="padding:20px;color:var(--text-secondary,#888)">Paste a JWT above to decode header and payload.</div>' }} />
      </div>
    </WS>
  );
}

// ─── XML TO JSON ──────────────────────────────────────────────────────────────
function xmlToJson(xml: string): unknown {
  const parser = typeof DOMParser !== "undefined" ? new DOMParser() : null;
  if (!parser) throw new Error("DOMParser not available");
  const doc = parser.parseFromString(xml, "application/xml");
  const err = doc.querySelector("parsererror");
  if (err) throw new Error("Invalid XML: " + err.textContent);
  function nodeToObj(node: Element): unknown {
    const children = Array.from(node.children);
    if (children.length === 0) {
      const txt = node.textContent?.trim() ?? "";
      if (txt === "") return null; if (txt === "true") return true; if (txt === "false") return false;
      if (!isNaN(Number(txt)) && txt !== "") return Number(txt);
      return txt;
    }
    const result: Record<string, unknown> = {};
    for (const child of children) {
      const key = child.tagName; const val = nodeToObj(child);
      if (key in result) { if (!Array.isArray(result[key])) result[key] = [result[key]]; (result[key] as unknown[]).push(val); }
      else { result[key] = val; }
    }
    return result;
  }
  return nodeToObj(doc.documentElement);
}

export function XmlToJsonWorkspace({ fileLabel = "output.json", outputId = "xml-to-json-output" }: { fileLabel?: string; outputId?: string }) {
  const [inputVal, setInputVal] = useState(""); const [outputHtml, setOutputHtml] = useState(""); const [rawOutput, setRawOutput] = useState("");
  const [status, setStatus] = useState<{ text: string; type: "default"|"success"|"error" }>({ text:"Ready", type:"default" });
  const debounceRef = useRef<ReturnType<typeof setTimeout>|null>(null);

  function run(raw = inputVal) {
    const t = raw.trim(); if (!t) { setStatus({ text:"Ready", type:"default" }); return; }
    try { const result = xmlToJson(t); const str = JSON.stringify(result,null,2); setRawOutput(str); setOutputHtml(sh(str)); setStatus({ text:"Converted", type:"success" }); }
    catch (e: unknown) { setStatus({ text: e instanceof Error ? e.message : "Invalid XML", type:"error" }); }
  }
  function loadSample() { const s = `<?xml version="1.0"?>\n<user>\n  <id>1</id>\n  <name>Alice</name>\n  <active>true</active>\n  <score>98.5</score>\n  <tags><item>admin</item><item>user</item></tags>\n</user>`; setInputVal(s); run(s); }
  function actionClear() { setInputVal(""); setOutputHtml(""); setRawOutput(""); setStatus({ text:"Ready", type:"default" }); }
  function handleChange(val: string) { setInputVal(val); if (debounceRef.current) clearTimeout(debounceRef.current); debounceRef.current = setTimeout(()=>run(val), 400); }

  return (
    <WS fileLabel={fileLabel} statusText={status.text} statusType={status.type} footerRight="JSON · UTF-8"
      toolbar={<Toolbar badge="JSON" badgeIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:13,height:13}}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>} actions={[{label:"Sample",onClick:loadSample},{label:"Clear",onClick:actionClear},{label:"|",onClick:()=>{}},{label:"Convert",onClick:()=>run(),primary:true}]} />}
    >
      <div className="app-grid-inner" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", flex:1, minHeight:0, overflow:"hidden" }}>
        <div style={{ borderRight:"1px solid var(--border,#262626)", display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}><Panel label="XML Input"><TA value={inputVal} onChange={handleChange} placeholder="Paste XML here..." /></Panel></div>
        <Panel label="JSON Output" right={<CopyDownload raw={rawOutput} filename="output.json" mime="application/json" />}><OutputDiv id={outputId} html={outputHtml} /></Panel>
      </div>
    </WS>
  );
}

// ─── YAML TO JSON ─────────────────────────────────────────────────────────────
function yamlToJson(yaml: string): unknown {
  const lines = yaml.split("\n");
  const stack: { indent: number; obj: unknown; key?: string }[] = [];
  const root: Record<string, unknown> = {};
  stack.push({ indent: -1, obj: root });

  function parseValue(val: string): unknown {
    const t = val.trim();
    if (t === "null" || t === "~") return null;
    if (t === "true") return true; if (t === "false") return false;
    if (!isNaN(Number(t)) && t !== "") return Number(t);
    return t.replace(/^["']|["']$/g, "");
  }

  for (const rawLine of lines) {
    if (!rawLine.trim() || rawLine.trim().startsWith("#")) continue;
    const indent = rawLine.search(/\S/);
    const line = rawLine.trim();

    while (stack.length > 1 && stack[stack.length-1].indent >= indent) stack.pop();
    const parent = stack[stack.length-1];

    if (line.startsWith("- ")) {
      const val = parseValue(line.slice(2));
      if (!Array.isArray((parent.obj as Record<string,unknown>)[parent.key!])) (parent.obj as Record<string,unknown>)[parent.key!] = [];
      ((parent.obj as Record<string,unknown>)[parent.key!] as unknown[]).push(val);
      continue;
    }
    const colonIdx = line.indexOf(": ");
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx); const valStr = line.slice(colonIdx+2).trim();
      const target = parent.obj as Record<string, unknown>;
      if (!valStr) { target[key] = {}; stack.push({ indent, obj: target[key] as object, key }); }
      else { target[key] = parseValue(valStr); stack.push({ indent, obj: target, key }); }
    } else if (line.endsWith(":")) {
      const key = line.slice(0,-1).trim();
      (parent.obj as Record<string,unknown>)[key] = {};
      stack.push({ indent, obj: (parent.obj as Record<string,unknown>)[key] as object, key });
    }
  }
  return root;
}

export function YamlToJsonWorkspace({ fileLabel = "output.json", outputId = "yaml-to-json-output" }: { fileLabel?: string; outputId?: string }) {
  const [inputVal, setInputVal] = useState(""); const [outputHtml, setOutputHtml] = useState(""); const [rawOutput, setRawOutput] = useState("");
  const [status, setStatus] = useState<{ text: string; type: "default"|"success"|"error" }>({ text:"Ready", type:"default" });
  const debounceRef = useRef<ReturnType<typeof setTimeout>|null>(null);

  function run(raw = inputVal) {
    const t = raw.trim(); if (!t) { setStatus({ text:"Ready", type:"default" }); return; }
    try { const result = yamlToJson(t); const str = JSON.stringify(result,null,2); setRawOutput(str); setOutputHtml(sh(str)); setStatus({ text:"Converted", type:"success" }); }
    catch (e: unknown) { setStatus({ text: e instanceof Error ? e.message : "Invalid YAML", type:"error" }); }
  }
  function loadSample() { const s = `app: JSONPro\nversion: "2.0"\ndebug: false\nport: 3000\nfeatures:\n  - format\n  - validate\n  - convert\ndatabase:\n  host: localhost\n  port: 5432\n  name: jsonpro_db`; setInputVal(s); run(s); }
  function actionClear() { setInputVal(""); setOutputHtml(""); setRawOutput(""); setStatus({ text:"Ready", type:"default" }); }
  function handleChange(val: string) { setInputVal(val); if (debounceRef.current) clearTimeout(debounceRef.current); debounceRef.current = setTimeout(()=>run(val), 400); }

  return (
    <WS fileLabel={fileLabel} statusText={status.text} statusType={status.type} footerRight="JSON · UTF-8"
      toolbar={<Toolbar badge="JSON" badgeIcon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:13,height:13}}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>} actions={[{label:"Sample",onClick:loadSample},{label:"Clear",onClick:actionClear},{label:"|",onClick:()=>{}},{label:"Convert",onClick:()=>run(),primary:true}]} />}
    >
      <div className="app-grid-inner" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", flex:1, minHeight:0, overflow:"hidden" }}>
        <div style={{ borderRight:"1px solid var(--border,#262626)", display:"flex", flexDirection:"column", minHeight:0, overflow:"hidden" }}><Panel label="YAML Input"><TA value={inputVal} onChange={handleChange} placeholder="Paste YAML here..." /></Panel></div>
        <Panel label="JSON Output" right={<CopyDownload raw={rawOutput} filename="output.json" mime="application/json" />}><OutputDiv id={outputId} html={outputHtml} /></Panel>
      </div>
    </WS>
  );
}
