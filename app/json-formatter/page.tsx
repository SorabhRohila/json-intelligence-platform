import type { Metadata } from "next";
import JsonFormatterWorkspace from "@/components/tools/JsonFormatterWorkspace";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata: Metadata = {
  title: "JSON Formatter",
  description:
    "Format, validate, minify, and inspect JSON locally in a compact premium workspace.",
};

export default function JsonFormatterPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-base,#000)", color: "var(--text-primary,#ededed)" }}>
      <ToolPageHero
        badge="JSON Formatter"
        title={
          <>
            Format JSON
            <br />
            Instantly
          </>
        }
        description="Beautify, validate, minify, and inspect JSON locally in a compact premium workspace."
      />

      <section className="tool-page-shell">

        <JsonFormatterWorkspace
          fileLabel="formatter.json"
          inputLabel="Raw JSON"
          outputLabel="Formatted Output"
          outputId="json-formatter-output"
        />
      </section>
    </main>
  );
}
