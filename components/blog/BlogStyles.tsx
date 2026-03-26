export default function BlogStyles() {
  return (
    <style>{`
      * {
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
      }

      .blog-shell {
        background: var(--bg-base, #000);
        color: var(--text-primary, #ededed);
        width: 100%;
        overflow-x: hidden;
      }

      .blog-container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }

      .blog-narrow {
        width: 100%;
        max-width: 980px;
        margin: 0 auto;
      }

      .blog-breadcrumb {
        font-size: 0.88rem;
        color: var(--text-secondary, #888);
        margin-bottom: 20px;
        line-height: 1.6;
        word-break: break-word;
      }

      .blog-breadcrumb a,
      .blog-toc-card a,
      .blog-related-link {
        color: var(--text-secondary, #888);
        text-decoration: none;
      }

      .blog-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        border: 1px solid var(--border, #262626);
        background: var(--bg-elevated, #141414);
        border-radius: 999px;
        font-size: 0.78rem;
        color: var(--text-secondary, #888);
        margin-bottom: 18px;
      }

      .blog-title {
        font-size: clamp(1.9rem, 8vw, 4rem);
        line-height: 1.08;
        letter-spacing: -0.04em;
        margin: 0 0 16px;
      }

      .blog-description {
        font-size: 1rem;
        line-height: 1.75;
        color: var(--text-secondary, #888);
        max-width: 760px;
        margin: 0 0 24px;
      }

      .blog-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 10px 14px;
        font-size: 0.88rem;
        color: var(--text-secondary, #888);
        padding-bottom: 20px;
        border-bottom: 1px solid var(--border, #262626);
      }

      .blog-hero-card,
      .blog-card,
      .blog-toc-card,
      .blog-code,
      .blog-graph-card,
      .blog-faq-item,
      .blog-related-card {
        border: 1px solid var(--border, #262626);
        background: var(--bg-surface, #0a0a0a);
        border-radius: 16px;
      }

      .blog-hero-card {
        padding: 20px;
        background: linear-gradient(180deg, #0d0d0d 0%, #080808 100%);
      }

      .blog-highlight-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 18px;
        align-items: stretch;
      }

      .blog-preview-code {
        padding: 16px;
        font-family: var(--font-mono, "JetBrains Mono", monospace);
        font-size: 12px;
        line-height: 1.7;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: #cfcfcf;
        min-width: 0;
      }

      .blog-article-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
        align-items: start;
      }

      .blog-toc {
        position: relative;
        top: auto;
        align-self: auto;
        width: 100%;
        min-width: 0;
      }

      .blog-toc-card {
        padding: 16px;
      }

      .blog-toc-card ul {
        list-style: none;
        padding: 0;
        margin: 0;
        line-height: 1.85;
      }

      .blog-toc-card li {
        margin-bottom: 6px;
      }

      .blog-content {
        width: 100%;
        min-width: 0;
      }

      .blog-content section {
        margin-bottom: 36px;
      }

      .blog-content p,
      .blog-content li {
        color: var(--text-secondary, #888);
        line-height: 1.8;
        overflow-wrap: anywhere;
      }

      .blog-content ul,
      .blog-content ol {
        padding-left: 20px;
        margin: 0;
      }

      .blog-content h2,
      .blog-content h3,
      .blog-content h4,
      .blog-content h5 {
        word-break: break-word;
      }

      .blog-content h2 {
        font-size: 1.5rem;
        margin: 0 0 14px;
      }

      .blog-content h3 {
        font-size: 1.18rem;
        margin: 22px 0 10px;
      }

      .blog-content h4 {
        font-size: 1.02rem;
        margin: 18px 0 10px;
      }

      .blog-content h5 {
        font-size: 0.98rem;
        margin: 18px 0 10px;
        color: #cfcfcf;
      }

      .blog-table-wrap,
      .blog-code {
        width: 100%;
        overflow-x: auto;
      }

      .blog-table {
        width: 100%;
        min-width: 640px;
        border-collapse: collapse;
        border: 1px solid var(--border, #262626);
        font-size: 0.92rem;
      }

      .blog-table th,
      .blog-table td {
        text-align: left;
        padding: 14px;
        border-bottom: 1px solid var(--border, #262626);
        vertical-align: top;
      }

      .blog-table thead tr {
        background: var(--bg-surface, #0a0a0a);
      }

      .blog-code {
        padding: 16px;
        font-size: 12.5px;
        line-height: 1.7;
        color: #d7d7d7;
        white-space: pre;
      }

      .blog-graph-card {
        padding: 18px;
        overflow-x: auto;
      }

      .blog-graph {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 12px;
        min-width: 300px;
        height: 190px;
      }

      .blog-graph-bar-wrap {
        flex: 1;
        min-width: 0;
        text-align: center;
      }

      .blog-graph-bar {
        width: 100%;
        border-radius: 12px 12px 0 0;
      }

      .blog-faq-item {
        padding: 14px 16px;
        margin-bottom: 12px;
      }

      .blog-related-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 18px;
      }

      .blog-related-card {
        display: block;
        padding: 18px;
        text-decoration: none;
        min-width: 0;
      }

      .blog-footer {
        padding: 36px 0;
      }

      .blog-footer-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
        margin-bottom: 30px;
      }

      .blog-footer-bottom {
        border-top: 1px solid var(--border, #262626);
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: var(--text-secondary, #888);
        font-size: 0.8rem;
      }

      @media (min-width: 769px) {
        .blog-container {
          padding: 0 24px;
        }

        .blog-highlight-grid {
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          gap: 24px;
        }

        .blog-related-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .blog-footer-grid {
          grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr);
          gap: 40px;
        }

        .blog-footer-bottom {
          flex-direction: row;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .blog-content h2 {
          font-size: 1.7rem;
        }

        .blog-graph {
          min-width: 380px;
          height: 220px;
          gap: 14px;
        }
      }

      @media (min-width: 1025px) {
        .blog-article-grid {
          grid-template-columns: minmax(0, 240px) minmax(0, 1fr);
          gap: 40px;
        }

        .blog-toc {
          position: sticky;
          top: 24px;
          align-self: start;
        }

        .blog-related-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .blog-title {
          font-size: clamp(2.4rem, 5vw, 4.1rem);
        }

        .blog-description {
          font-size: 1.05rem;
        }

        .blog-meta {
          font-size: 0.92rem;
          gap: 14px;
          padding-bottom: 24px;
        }

        .blog-hero-card {
          padding: 28px;
        }

        .blog-toc-card {
          padding: 18px;
        }

        .blog-content section {
          margin-bottom: 44px;
        }

        .blog-content h2 {
          font-size: 1.85rem;
        }

        .blog-content h3 {
          font-size: 1.3rem;
        }

        .blog-table {
          min-width: 680px;
          font-size: 0.95rem;
        }

        .blog-code {
          padding: 18px;
          font-size: 13px;
        }

        .blog-graph-card {
          padding: 20px;
        }

        .blog-graph {
          min-width: 420px;
          height: 260px;
          gap: 18px;
        }
      }

      @media (max-width: 520px) {
        .blog-container {
          padding: 0 14px;
        }

        .blog-breadcrumb {
          font-size: 0.8rem;
        }

        .blog-title {
          font-size: clamp(1.7rem, 9vw, 2.2rem);
        }

        .blog-description {
          font-size: 0.94rem;
        }

        .blog-meta {
          font-size: 0.8rem;
        }

        .blog-content p,
        .blog-content li {
          font-size: 0.94rem;
        }
      }
    `}</style>
  );
}
