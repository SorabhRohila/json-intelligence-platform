import type { Metadata } from "next";
import { JsonSchemaGeneratorWorkspace } from "@/components/tools/RemainingWorkspaces";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata: Metadata = {
  title: "JSON Schema Generator",
  description: "Automatically infer a JSON Schema Draft-07 from any JSON sample.",
};

export default function JsonSchemaGeneratorWorkspacePage() {
  return (
    <main style={{ backgroundColor: "var(--bg-base,#000)", color: "var(--text-primary,#ededed)" }}>
      <ToolPageHero
        badge="JSON Schema Generator"
        title={
          <>
            Generate JSON
            <br />
            Schema Instantly
          </>
        }
        description="Automatically infer a JSON Schema Draft-07 from any JSON sample."
      />
      <section className="tool-page-shell">
        <JsonSchemaGeneratorWorkspace
          fileLabel="schema.json"
          outputId="json-schema-gen-output"
        />
      </section>
    </main>
  );
}
