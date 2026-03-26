import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid #1a1a1a",
        marginTop: "80px",
        padding: "40px 16px 28px",
        background: "#050505",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1024px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "40px",
            marginBottom: "28px",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: "1.05rem",
                color: "#ededed",
                marginBottom: "12px",
                letterSpacing: "-0.02em",
              }}
            >
              JSONPro
            </div>

            <p
              style={{
                color: "#888",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                maxWidth: "260px",
                margin: 0,
              }}
            >
              The most powerful JSON toolkit for developers.
            </p>
          </div>

          <div>
            <h4
              style={{
                fontSize: "0.9rem",
                margin: "0 0 14px",
                color: "#ededed",
              }}
            >
              Product
            </h4>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: "10px",
              }}
            >
              <li>
                <Link
                  href="/#features"
                  style={{
                    color: "#888",
                    textDecoration: "none",
                    fontSize: "0.88rem",
                  }}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#tools"
                  style={{
                    color: "#888",
                    textDecoration: "none",
                    fontSize: "0.88rem",
                  }}
                >
                  Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  style={{
                    color: "#888",
                    textDecoration: "none",
                    fontSize: "0.88rem",
                  }}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontSize: "0.9rem",
                margin: "0 0 14px",
                color: "#ededed",
              }}
            >
              Legal
            </h4>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: "10px",
              }}
            >
              <li>
                <Link
                  href="/privacy"
                  style={{
                    color: "#888",
                    textDecoration: "none",
                    fontSize: "0.88rem",
                  }}
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  style={{
                    color: "#888",
                    textDecoration: "none",
                    fontSize: "0.88rem",
                  }}
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #1a1a1a",
            paddingTop: "18px",
            color: "#777",
            fontSize: "0.82rem",
          }}
        >
          © 2024 JSONPro.
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </footer>
  );
}
