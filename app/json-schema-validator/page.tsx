import type { Metadata } from "next";
import JsonSchemaValidatorWorkspace from "@/components/tools/JsonSchemaValidatorWorkspace";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata: Metadata = {
  title: "JSON Schema Validator",
  description: "Validate any JSON payload against a JSON Schema and get detailed error reports.",
};

export default function JsonSchemaValidatorWorkspacePage() {
  return (
    <main style={{ backgroundColor: "var(--bg-base,#000)", color: "var(--text-primary,#ededed)" }}>
      <ToolPageHero
        badge="JSON Schema Validator"
        title={
          <>
            Validate JSON
            <br />
            Against a Schema
          </>
        }
        description="Validate any JSON payload against a JSON Schema and get detailed error reports."
      />
      <section className="tool-page-shell">
        <JsonSchemaValidatorWorkspace
          fileLabel="schema.json"
          outputId="json-schema-validator-output"
        />
      </section>
    </main>
  );
}
