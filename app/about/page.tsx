export const metadata = {
  title: "About | JSONPro",
  description: "Learn more about JSONPro and why we built this JSON formatting and validation workspace.",
};

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#ededed", padding: "56px 16px 80px" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "16px", letterSpacing: "-0.03em" }}>
            About JSONPro
          </h1>

          <p style={{ color: "#a3a3a3", lineHeight: 1.9, marginBottom: "18px" }}>
            JSONPro is a developer-focused JSON workspace built to make formatting, validation, minification,
            and inspection faster and easier.
          </p>

          <p style={{ color: "#a3a3a3", lineHeight: 1.9, marginBottom: "18px" }}>
            The goal is simple: provide a fast, privacy-first tool that helps developers debug payloads,
            inspect nested objects, and work with JSON more confidently.
          </p>

          <section style={{ marginTop: "34px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>What we focus on</h2>
            <ul style={{ color: "#cfcfcf", lineHeight: 1.9, paddingLeft: "18px" }}>
              <li>Clean formatting and minification</li>
              <li>Reliable syntax validation</li>
              <li>Readable tree-based inspection</li>
              <li>Fast developer workflows with minimal friction</li>
              <li>Privacy-first handling wherever possible</li>
            </ul>
          </section>

          <section style={{ marginTop: "34px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Who it is for</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              JSONPro is designed for frontend developers, backend developers, QA teams, API testers,
              students, technical writers, and anyone who works with structured JSON data.
            </p>
          </section>

          <section style={{ marginTop: "34px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Contact</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              For general inquiries, partnerships, or support, contact us at hello@jsonpro.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
