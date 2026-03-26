"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Tools", href: "#more-tools" },
];

export default function SiteHeader() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // On mount, read persisted theme (same key as PHP: 'jsonpro-theme')
  useEffect(() => {
    const saved = (localStorage.getItem("jsonpro-theme") as "dark" | "light") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("jsonpro-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    // nav-wrapper: sticky, top-4, z-50, px-6, pointer-events-none
    <div className="sticky top-4 z-50 px-6 pointer-events-none"
         style={{ position: "sticky", top: "16px", zIndex: 100, padding: "0 24px", pointerEvents: "none" }}>
      <nav
        style={{
          pointerEvents: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
          maxWidth: "900px",
          margin: "0 auto",
          background: "color-mix(in srgb, var(--bg-surface, #0a0a0a) 25%, transparent)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--border, #262626)",
          borderRadius: "100px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: 600,
            fontSize: "1.05rem",
            letterSpacing: "-0.02em",
            color: "var(--text-primary, #ededed)",
            textDecoration: "none",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: "var(--text-primary, #ededed)" }}
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v9" />
            <path d="m8 17 4 4 4-4" />
          </svg>
          JSONPro
        </Link>

        {/* Nav links — hidden on mobile via CSS (no hamburger, matching PHP) */}
        <div
          className="nav-links"
          style={{
            display: "flex",
            gap: "32px",
            color: "var(--text-secondary, #888)",
            fontSize: "0.85rem",
            fontWeight: 500,
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                color: "inherit",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.color = "var(--text-primary, #ededed)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.color = "var(--text-secondary, #888)")
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            title="Toggle Theme"
            aria-label="Toggle theme"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-secondary, #888)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px",
              borderRadius: "50%",
              transition: "color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary, #ededed)";
              (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-elevated, #141414)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary, #888)";
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            {theme === "dark" ? (
              /* Sun icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              /* Moon icon for light mode */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* CTA button */}
          <Link
            href="#tools"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "99px",
              fontWeight: 500,
              fontSize: "0.85rem",
              cursor: "pointer",
              textDecoration: "none",
              transition: "transform 0.2s, opacity 0.2s",
              background: "var(--text-primary, #ededed)",
              color: "var(--bg-base, #000)",
              border: "1px solid transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.02)";
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
            }}
          >
            Open Tool
          </Link>
        </div>
      </nav>

      {/* Mobile: hide nav-links (matching PHP — no hamburger menu) */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          nav {
            padding: 10px 16px !important;
            border-radius: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}