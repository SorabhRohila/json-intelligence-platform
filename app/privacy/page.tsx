export const metadata = {
  title: "Privacy Policy | JSONPro",
  description: "Read the JSONPro privacy policy.",
};

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#ededed", padding: "56px 16px 80px" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "14px", letterSpacing: "-0.03em" }}>
            Privacy Policy
          </h1>

          <p style={{ color: "#888", marginBottom: "26px" }}>Last updated: March 26, 2026</p>

          <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
            This Privacy Policy explains how JSONPro collects, uses, stores, and protects information
            when you use our website, tools, and related services. Privacy policies typically explain
            what information is collected, how it is used, how cookies and tracking work, how data is protected,
            and how users can contact the business about privacy-related matters [web:856][web:844].
          </p>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Information we may collect</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              Depending on how you use the site, we may collect information such as your email address,
              messages sent through contact forms, usage data, browser/device information, IP address,
              and analytics-related information. Privacy policy guidance commonly recommends disclosing what
              information is collected and how it is collected [web:856][web:844].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>How we use information</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              We may use collected information to provide and improve the service, respond to inquiries,
              maintain site security, troubleshoot issues, analyze usage patterns, and improve user experience.
              Privacy policies commonly describe how collected data is used and why it is needed [web:856].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>JSON content processed in the tool</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              If the tool processes JSON locally in the browser, we aim to keep that workflow privacy-first and
              minimize unnecessary transmission of payload data. If any server-side processing, logging, analytics,
              or third-party integrations are used in the future, this policy should be updated to reflect that.
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Cookies and tracking technologies</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              We may use cookies or similar technologies for essential functionality, analytics, preferences,
              and performance monitoring. Privacy guidance recommends clearly disclosing cookies, log files,
              analytics, and opt-out mechanisms where applicable [web:856][web:859][web:862].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Third-party services</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              We may use third-party tools or infrastructure providers for hosting, analytics, performance monitoring,
              email communication, or similar services. If third-party services place cookies or process personal data,
              users should be informed about those relationships in the privacy and cookie documentation [web:859][web:865].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Data retention and security</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              We take reasonable steps to protect information and limit retention to what is necessary for operational,
              legal, or security purposes. Privacy guidance commonly recommends disclosing how data is stored and protected
              as part of a transparent privacy policy [web:856].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Your choices</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              Depending on your location and applicable law, you may have rights to request access, correction,
              deletion, or limitation of personal data processing, and you may also be able to manage cookies
              through browser or consent settings. Privacy policy guidance commonly recommends describing
              opt-out or user control options [web:856][web:844].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Changes to this policy</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              We may update this Privacy Policy from time to time. When material changes are made, we may revise
              the effective date and update the content on this page.
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Contact us</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              Privacy documentation commonly recommends including business contact information such as email,
              address, and website contact method [web:844][web:856].
            </p>
            <p style={{ color: "#cfcfcf", lineHeight: 1.9 }}>
              Email: support@jsonpro.com<br />
              Website: https://jsonpro.com/contact<br />
              Location: Gurugram, Haryana, India
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
