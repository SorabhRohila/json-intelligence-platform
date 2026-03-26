import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#ededed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        <div
          style={{
            fontSize: "0.85rem",
            color: "#888",
            marginBottom: "12px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Error 404
        </div>

        <h1
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            marginBottom: "14px",
            letterSpacing: "-0.03em",
          }}
        >
          Page not found
        </h1>

        <p
          style={{
            color: "#a3a3a3",
            lineHeight: 1.8,
            marginBottom: "24px",
          }}
        >
          The page you are looking for does not exist, has moved, or is temporarily unavailable.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 18px",
            borderRadius: "999px",
            background: "#ededed",
            color: "#050505",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
