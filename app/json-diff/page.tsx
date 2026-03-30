import type { Metadata } from "next";
import JsonDiffWorkspace from "@/components/tools/JsonDiffWorkspace";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata: Metadata = {
  title: "JSON Diff Comparator",
  description: "Deep-compare two JSON objects and see every added, removed, and changed field.",
};

export default function JsonDiffWorkspacePage() {
  return (
    <main style={{ backgroundColor: "var(--bg-base,#000)", color: "var(--text-primary,#ededed)" }}>
      <ToolPageHero
        badge="JSON Diff Comparator"
        title={
          <>
            Compare JSON
            <br />
            Side by Side
          </>
        }
        description="Deep-compare two JSON objects and see every added, removed, and changed field."
      />
      <section className="tool-page-shell">
        <JsonDiffWorkspace
          fileLabel="diff.json"
          outputId="json-diff-output"
        />
      </section>
    </main>
  );
}
