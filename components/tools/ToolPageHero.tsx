import { ReactNode } from "react";

type ToolPageHeroProps = {
  badge: string;
  title: ReactNode;
  description: string;
};

export default function ToolPageHero({
  badge,
  title,
  description,
}: ToolPageHeroProps) {
  return (
    <section className="tool-hero-shell">
      <div className="tool-hero-container">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "4px 12px",
            background: "var(--bg-elevated,#141414)",
            border: "1px solid var(--border,#262626)",
            borderRadius: 99,
            fontSize: "0.8rem",
            color: "var(--text-secondary,#888)",
            marginBottom: 24,
            fontWeight: 500,
          }}
        >
          {badge}
        </div>

        <h1
          className="mobile-compact-title"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: 20,
            letterSpacing: "-0.04em",
          }}
        >
          {title}
        </h1>

        <p
          className="mobile-compact-copy"
          style={{
            fontSize: "clamp(1rem, 3vw, 1.1rem)",
            color: "var(--text-secondary,#888)",
            maxWidth: 650,
            margin: "0 auto",
          }}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
