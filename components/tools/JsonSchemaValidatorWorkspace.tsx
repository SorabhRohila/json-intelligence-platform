"use client";
import { useState } from "react";

type SchemaType = { type?: string | string[]; properties?: Record<string, SchemaType>; items?: SchemaType; required?: string[]; enum?: unknown[]; minimum?: number; maximum?: number; minLength?: number; maxLength?: number; pattern?: string; additionalProperties?: boolean | SchemaType };

function validateSchema(data: unknown, schema: SchemaType, path = "root"): string[] {
  const errors: string[] = [];
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const actualType = data === null ? "null" : Array.isArray(data) ? "array" : typeof data;
    if (!types.includes(actualType)) errors.push(`${path}: expected type ${types.join("|")}, got ${actualType}`);
  }
  if (schema.enum && !schema.enum.some((e) => JSON.stringify(e) === JSON.stringify(data))) errors.push(`${path}: value not in enum [${schema.enum.map((e) => JSON.stringify(e)).join(", ")}]`);
  if (typeof data === "number") {
    if (schema.minimum !== undefined && data < schema.minimum) errors.push(`${path}: ${data} is less than minimum ${schema.minimum}`);
    if (schema.maximum !== undefined && data > schema.maximum) errors.push(`${path}: ${data} exceeds maximum ${schema.maximum}`);
  }
  if (typeof data === "string") {
    if (schema.minLength !== undefined && data.length < schema.minLength) errors.push(`${path}: string length ${data.length} is less than minLength ${schema.minLength}`);
    if (schema.maxLength !== undefined && data.length > schema.maxLength) errors.push(`${path}: string length ${data.length} exceeds maxLength ${schema.maxLength}`);
    if (schema.pattern && !new RegExp(schema.pattern).test(data)) errors.push(`${path}: does not match pattern /${schema.pattern}/`);
  }
  if (typeof data === "object" && data !== null && !Array.isArray(data)) {
    const obj = data as Record<string, unknown>;
    if (schema.required) { for (const req of schema.required) { if (!(req in obj)) errors.push(`${path}: missing required field "${req}"`); } }
    if (schema.properties) { for (const [k, subSchema] of Object.entries(schema.properties)) { if (k in obj) errors.push(...validateSchema(obj[k], subSchema, `${path}.${k}`)); } }
  }
  if (Array.isArray(data) && schema.items) { data.forEach((item, i) => errors.push(...validateSchema(item, schema.items!, `${path}[${i}]`))); }
  return errors;
}

function renderErrors(errors: string[]): string {
  if (errors.length === 0) return `<div style="color:var(--success,#10b981);padding:20px;font-size:13px">✓ Data is valid against the schema. No errors found.</div>`;
  return errors.map((e) => `<div style="padding:8px 20px;border-bottom:1px solid var(--border,#262626);display:flex;gap:10px;align-items:flex-start"><span style="color:var(--error,#ef4444);font-weight:700">✕</span><span style="color:var(--text-primary,#ededed);font-size:13px;font-family:var(--font-mono,'JetBrains Mono',monospace)">${e}</span></div>`).join("");
}

type Props = { fileLabel?: string; outputId?: string };

export default function JsonSchemaValidatorWorkspace({ fileLabel = "schema.json", outputId = "json-schema-validator-output" }: Props) {
  const [dataVal, setDataVal] = useState("");
  const [schemaVal, setSchemaVal] = useState("");
  const [outputHtml, setOutputHtml] = useState("");
  const [status, setStatus] = useState<{ text: string; type: "default" | "success" | "error" }>({ text: "Ready", type: "default" });

  function actionValidate() {
    let data: unknown, schema: SchemaType;
    try { data = JSON.parse(dataVal.trim()); } catch { setStatus({ text: "Data JSON is invalid", type: "error" }); return; }
    try { schema = JSON.parse(schemaVal.trim()); } catch { setStatus({ text: "Schema JSON is invalid", type: "error" }); return; }
    const errors = validateSchema(data, schema);
    setOutputHtml(renderErrors(errors));
    setStatus({ text: errors.length === 0 ? "Valid ✓" : `${errors.length} error${errors.length !== 1 ? "s" : ""}`, type: errors.length === 0 ? "success" : "error" });
  }

  function actionClear() { setDataVal(""); setSchemaVal(""); setOutputHtml(""); setStatus({ text: "Ready", type: "default" }); }

  function loadSample() {
    setDataVal(JSON.stringify({ name: "Alice", age: 28, email: "alice@example.com", role: "admin" }, null, 2));
    setSchemaVal(JSON.stringify({ type: "object", required: ["name", "age", "email"], properties: { name: { type: "string", minLength: 1 }, age: { type: "number", minimum: 0, maximum: 120 }, email: { type: "string", pattern: "^[^@]+@[^@]+\\.[^@]+$" }, role: { type: "string", enum: ["admin", "user", "guest"] } } }, null, 2));
  }

  const statusColor = status.type === "success" ? "var(--success,#10b981)" : status.type === "error" ? "var(--error,#ef4444)" : "var(--text-secondary,#888)";
  const panelHeader: React.CSSProperties = { padding: "8px 20px", background: "color-mix(in srgb, var(--bg-surface,#0a0a0a) 50%, transparent)", borderBottom: "1px solid var(--border,#262626)", fontSize: "0.75rem", color: "var(--text-secondary,#888)", fontWeight: 500, flexShrink: 0 };
  const taStyle: React.CSSProperties = { flex: 1, width: "100%", background: "transparent", border: "none", color: "var(--text-primary,#ededed)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, padding: 20, resize: "none", outline: "none", lineHeight: 1.6, whiteSpace: "pre", overflow: "auto" };

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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Schema Validator
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <button className="app-btn-hover" onClick={loadSample} style={{ padding: "6px 12px", background: "transparent", color: "var(--text-secondary,#888)", border: "1px solid var(--border,#262626)", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}>Sample</button>
            <button className="app-btn-hover" onClick={actionClear} style={{ padding: "6px 12px", background: "transparent", color: "var(--text-secondary,#888)", border: "1px solid var(--border,#262626)", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}>Clear</button>
            <div style={{ width: 1, height: 14, background: "var(--border,#262626)", margin: "0 2px" }} />
            <button className="app-btn-hover" onClick={actionValidate} style={{ padding: "6px 12px", background: "var(--text-primary,#ededed)", color: "var(--bg-base,#000)", border: "1px solid var(--text-primary,#ededed)", borderRadius: 6, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", transition: "0.2s" }}>Validate</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", flex: 1, minHeight: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden", borderRight: "1px solid var(--border,#262626)" }}>
            <div style={panelHeader}>JSON Data</div>
            <textarea className="workspace-editor-inline" value={dataVal} onChange={(e) => setDataVal(e.target.value)} spellCheck={false} placeholder="Paste JSON data to validate..." style={taStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden", borderRight: "1px solid var(--border,#262626)" }}>
            <div style={panelHeader}>JSON Schema</div>
            <textarea className="workspace-editor-inline" value={schemaVal} onChange={(e) => setSchemaVal(e.target.value)} spellCheck={false} placeholder='Paste JSON Schema...\n\n{\n  "type": "object",\n  "required": ["name"],\n  "properties": {\n    "name": { "type": "string" }\n  }\n}' style={taStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
            <div style={panelHeader}>Validation Results</div>
            <div id={outputId} style={{ flex: 1, overflow: "auto", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: outputHtml || '<div style="padding:20px;color:var(--text-secondary,#888)">Fill in JSON Data and Schema, then click Validate.</div>' }} />
          </div>
        </div>
        <div style={{ padding: "8px 20px", background: "var(--app-surface,#0f0f0f)", borderTop: "1px solid var(--border,#262626)", display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary,#888)", fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", flexShrink: 0, borderRadius: "0 0 13px 13px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg style={{ width: 12, height: 12, color: statusColor }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{status.type === "success" ? (<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>) : (<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>)}</svg>
            <span>{status.text}</span>
          </div>
          <div>JSON Schema Draft-07</div>
        </div>
      </div>
    </div></div>
  );
}
