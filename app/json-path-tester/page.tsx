import type { Metadata } from "next";
import JsonPathTesterWorkspace from "@/components/tools/JsonPathTesterWorkspace";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata: Metadata = {
  title: "JSONPath Tester",
  description: "Write and test JSONPath expressions against any JSON data and see matches instantly.",
};

export default function JsonPathTesterWorkspacePage() {
  return (
    <main style={{ backgroundColor: "var(--bg-base,#000)", color: "var(--text-primary,#ededed)" }}>
      <ToolPageHero
        badge="JSONPath Tester"
        title={
          <>
            Test JSONPath
            <br />
            Expressions
          </>
        }
        description="Write and test JSONPath expressions against any JSON data and see matches instantly."
      />
      <section className="tool-page-shell">
        <JsonPathTesterWorkspace
          fileLabel="jsonpath.json"
          outputId="json-path-output"
        />
      </section>
    </main>
  );
}
