export const metadata = {
  title: "Disclaimer | JSONPro",
  description: "Read the JSONPro disclaimer.",
};

export default function DisclaimerPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#ededed", padding: "56px 16px 80px" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "14px", letterSpacing: "-0.03em" }}>
            Disclaimer
          </h1>

          <p style={{ color: "#888", marginBottom: "26px" }}>Last updated: March 26, 2026</p>

          <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
            JSONPro provides tools, educational content, and utility features for informational
            and productivity purposes only. The website and tool output should not be treated as
            legal, financial, security, or professional advice.
          </p>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Tool output disclaimer</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              Although we strive to provide reliable formatting, validation, and related functionality,
              we do not guarantee that all outputs are complete, error-free, secure, or suitable for every
              production environment. Users should independently verify outputs before relying on them.
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Content disclaimer</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              Blog posts, guides, examples, and educational material on JSONPro are provided for general
              informational purposes only and may not reflect every technical, legal, or business scenario.
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>External links</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              Any third-party links are provided for convenience only. We do not control or endorse
              third-party websites and are not responsible for their content, availability, or policies.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
