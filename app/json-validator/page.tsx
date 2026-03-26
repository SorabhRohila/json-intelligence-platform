import type { Metadata } from "next";
import JsonFormatterWorkspace from "@/components/tools/JsonFormatterWorkspace";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata: Metadata = {
  title: "JSON Validator",
  description:
    "Validate JSON instantly in a premium local-first workspace with syntax checking and structured output.",
};

export default function JsonValidatorPage() {
  return (
    <main
      style={{
        backgroundColor: "var(--bg-base,#000)",
        color: "var(--text-primary,#ededed)",
      }}
    >
      <ToolPageHero
        badge="JSON Validator"
        title={
          <>
            Validate JSON
            <br />
            Instantly
          </>
        }
        description="Check JSON syntax, inspect structure, and catch malformed payloads in a compact premium workspace."
      />

      <section className="tool-page-shell">

        <JsonFormatterWorkspace
          fileLabel="validator.json"
          inputLabel="JSON Input"
          outputLabel="Validation Output"
          outputId="json-validator-output"
        />
      </section>
    </main>
  );
}
