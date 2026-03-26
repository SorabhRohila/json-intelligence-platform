export const metadata = {
  title: "Terms of Service | JSONPro",
  description: "Read the JSONPro Terms of Service.",
};

export default function TermsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#ededed", padding: "56px 16px 80px" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "14px", letterSpacing: "-0.03em" }}>
            Terms of Service
          </h1>

          <p style={{ color: "#888", marginBottom: "26px" }}>Last updated: March 26, 2026</p>

          <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
            These Terms of Service govern your access to and use of JSONPro, including the website,
            tools, blog content, and related services. Terms of service documents commonly include
            acceptable use, intellectual property, disclaimers, limitation of liability, termination,
            governing law, changes, and contact information [web:860][web:866][web:869].
          </p>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Acceptance of terms</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              By using JSONPro, you agree to be bound by these Terms of Service and any applicable laws
              and regulations. If you do not agree, you should not use the service.
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Use of the service</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              You may use the service only for lawful purposes. You agree not to misuse the tool,
              interfere with system performance, attempt unauthorized access, distribute malicious payloads,
              or use the platform in a way that harms the service or other users. Terms guidance commonly
              recommends clearly disclosing rules and restrictions for users [web:860][web:866].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Intellectual property</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              The website, branding, content, design, software, and related materials are owned by JSONPro
              or its licensors and are protected by applicable intellectual property laws. Terms templates
              commonly include an intellectual property clause [web:860][web:869].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Tool output and accuracy</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              JSONPro is provided as a productivity and informational tool. While we aim to provide useful
              and reliable functionality, we do not guarantee that all outputs, validations, or transformations
              will be error-free or suitable for every production use case.
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Third-party links and services</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              The website may include links to third-party websites or services. We are not responsible for
              the content, privacy practices, availability, or policies of third-party platforms.
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Termination or restriction</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              We may suspend, restrict, or terminate access to the service at any time if we believe
              a user has violated these terms, caused harm, or created security or legal risk.
              Terms guidance commonly recommends reserving this right [web:860][web:866].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Disclaimer of warranties</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              The service is provided on an “as is” and “as available” basis without warranties of any kind,
              whether express or implied. Terms templates commonly include an “AS IS” and “AS AVAILABLE”
              disclaimer [web:860][web:869].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Limitation of liability</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              To the maximum extent permitted by law, JSONPro will not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from use of the service.
              Limitation of liability is a standard clause in terms documentation [web:860][web:869].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Changes to these terms</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              We may update these Terms of Service from time to time. Continued use of the service after
              updates become effective constitutes acceptance of the revised terms.
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Contact information</h2>
            <p style={{ color: "#cfcfcf", lineHeight: 1.9 }}>
              JSONPro<br />
              Gurugram, Haryana, India<br />
              support@jsonpro.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
