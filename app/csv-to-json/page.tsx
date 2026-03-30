import type { Metadata } from "next";
import CsvToJsonWorkspace from "@/components/tools/CsvToJsonWorkspace";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata: Metadata = {
  title: "CSV to JSON Converter",
  description: "Parse CSV files into clean JSON arrays with automatic type detection.",
};

export default function CsvToJsonWorkspacePage() {
  return (
    <main style={{ backgroundColor: "var(--bg-base,#000)", color: "var(--text-primary,#ededed)" }}>
      <ToolPageHero
        badge="CSV to JSON Converter"
        title={
          <>
            Convert CSV
            <br />
            to JSON
          </>
        }
        description="Parse CSV files into clean JSON arrays with automatic type detection."
      />
      <section className="tool-page-shell">
        <CsvToJsonWorkspace
          fileLabel="output.json"
          outputId="csv-to-json-output"
        />
      </section>
    </main>
  );
}
