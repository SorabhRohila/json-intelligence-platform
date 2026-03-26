export const metadata = {
  title: "Contact | JSONPro",
  description: "Contact JSONPro for support, feedback, or business inquiries.",
};

export default function ContactPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#ededed", padding: "56px 16px 80px" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "16px", letterSpacing: "-0.03em" }}>
            Contact
          </h1>

          <p style={{ color: "#a3a3a3", lineHeight: 1.9, marginBottom: "20px" }}>
            If you have questions, product feedback, partnership inquiries, bug reports, or support requests,
            you can contact JSONPro using the information below.
          </p>

          <div style={{ border: "1px solid #1f1f1f", borderRadius: "18px", background: "#0a0a0a", padding: "22px" }}>
            <p style={{ color: "#cfcfcf", margin: "0 0 12px" }}>
              <strong>Email:</strong> support@jsonpro.com
            </p>
            <p style={{ color: "#cfcfcf", margin: "0 0 12px" }}>
              <strong>General inquiries:</strong> hello@jsonpro.com
            </p>
            <p style={{ color: "#cfcfcf", margin: "0 0 12px" }}>
              <strong>Location:</strong> Gurugram, Haryana, India
            </p>
            <p style={{ color: "#cfcfcf", margin: 0 }}>
              <strong>Website:</strong> https://jsonpro.com
            </p>
          </div>

          <section style={{ marginTop: "34px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Support hours</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              We aim to respond to relevant support and business emails within a reasonable timeframe.
              Response times may vary based on inquiry type and workload.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
