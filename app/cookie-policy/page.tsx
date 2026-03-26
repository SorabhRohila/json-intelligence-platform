export const metadata = {
  title: "Cookie Policy | JSONPro",
  description: "Read the JSONPro Cookie Policy.",
};

export default function CookiePolicyPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#ededed", padding: "56px 16px 80px" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "14px", letterSpacing: "-0.03em" }}>
            Cookie Policy
          </h1>

          <p style={{ color: "#888", marginBottom: "26px" }}>Last updated: March 26, 2026</p>

          <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
            This Cookie Policy explains how JSONPro uses cookies and similar tracking technologies
            when you visit our website. Cookie policy guidance commonly recommends explaining what cookies are,
            the categories used, the purpose of each category, any third-party cookies, how users can manage
            preferences, and contact details [web:864][web:865][web:867].
          </p>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>What are cookies</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              Cookies are small text files placed on a device when a user visits a website.
              They can help remember preferences, enable essential functions, measure usage,
              and improve performance [web:867].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Types of cookies we may use</h2>
            <ul style={{ color: "#cfcfcf", lineHeight: 1.9, paddingLeft: "18px" }}>
              <li>Essential cookies for core website functionality</li>
              <li>Analytics cookies to understand usage and improve the site</li>
              <li>Preference cookies to remember settings or interface choices</li>
              <li>Third-party cookies where external services are integrated</li>
            </ul>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              Cookie policy guidance commonly recommends categorizing cookies and explaining their purpose in detail [web:864][web:865][web:867].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Why we use cookies</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              Cookies may be used to keep the site functioning properly, remember preferences,
              understand how users interact with the website, and improve product experience and performance [web:861][web:867].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Managing cookie preferences</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              Users can typically manage cookies through browser settings, consent tools, or by clearing
              stored cookies from the device. Cookie policy templates commonly recommend telling users how
              they can opt out or adjust preferences [web:864][web:865][web:867].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Third-party technologies</h2>
            <p style={{ color: "#a3a3a3", lineHeight: 1.9 }}>
              If analytics or embedded services are used, those providers may set their own cookies
              or tracking technologies. Where applicable, users should review those third-party policies as well [web:864][web:865].
            </p>
          </section>

          <section style={{ marginTop: "32px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "12px" }}>Contact</h2>
            <p style={{ color: "#cfcfcf", lineHeight: 1.9 }}>
              For cookie-related questions, contact support@jsonpro.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
