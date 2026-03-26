import type { Metadata } from "next";
import JsonToCsvWorkspace from "@/components/tools/JsonToCsvWorkspace";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata: Metadata = {
  title: "JSON to CSV Converter",
  description:
    "Convert JSON arrays and objects to clean CSV format instantly, locally in your browser.",
};

export default function JsonToCsvPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-base,#000)", color: "var(--text-primary,#ededed)" }}>
      <ToolPageHero
        badge="JSON to CSV"
        title={
          <>
            Convert JSON
            <br />
            to CSV Instantly
          </>
        }
        description="Paste any JSON array or object and get a clean, downloadable CSV file — all locally in your browser, zero data sent anywhere."
      />
      <section className="tool-page-shell">
        <JsonToCsvWorkspace
          fileLabel="converter.csv"
          inputLabel="JSON Input"
          outputLabel="CSV Output"
          outputId="json-to-csv-output"
        />
      </section>
    </main>
  );
}
