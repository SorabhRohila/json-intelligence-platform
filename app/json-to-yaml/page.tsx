import type { Metadata } from "next";
import JsonToYamlWorkspace from "@/components/tools/JsonToYamlWorkspace";
import ToolPageHero from "@/components/tools/ToolPageHero";

export const metadata: Metadata = {
  title: "JSON to YAML Converter",
  description: "Transform JSON configs into clean, human-readable YAML format instantly.",
};

export default function JsonToYamlWorkspacePage() {
  return (
    <main style={{ backgroundColor: "var(--bg-base,#000)", color: "var(--text-primary,#ededed)" }}>
      <ToolPageHero
        badge="JSON to YAML Converter"
        title={
          <>
            Convert JSON
            <br />
            to YAML
          </>
        }
        description="Transform JSON configs into clean, human-readable YAML format instantly."
      />
      <section className="tool-page-shell">
        <JsonToYamlWorkspace
          fileLabel="output.yaml"
          outputId="json-to-yaml-output"
        />
      </section>
    </main>
  );
}
