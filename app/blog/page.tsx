import Link from "next/link";
import { getAllBlogs } from "@/lib/blogs";

export const metadata = {
  title: "Blog",
  description: "Read our latest JSON guides, developer tips, and formatting tutorials.",
};

export default function BlogPage() {
  const blogs = getAllBlogs();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#ededed",
        padding: "56px 16px 80px",
      }}
    >
      <style>{`
        .blog-shell {
          width: 100%;
          max-width: 1024px;
          margin: 0 auto;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          align-items: stretch;
        }

        .blog-link {
          display: block;
          text-decoration: none;
          color: inherit;
          height: 100%;
        }

        .blog-card {
          height: 100%;
          border: 1px solid #1f1f1f;
          background: linear-gradient(180deg, rgba(15,15,15,1) 0%, rgba(10,10,10,1) 100%);
          border-radius: 18px;
          padding: 22px;
          transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          box-shadow: 0 0 0 rgba(0,0,0,0);
          cursor: pointer;
        }

        .blog-card:hover {
          transform: translateY(-6px);
          border-color: #2f2f2f;
          box-shadow: 0 18px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.02) inset;
          background: linear-gradient(180deg, rgba(18,18,18,1) 0%, rgba(10,10,10,1) 100%);
        }

        .blog-card-title {
          font-size: 1.18rem;
          line-height: 1.4;
          margin: 0 0 10px;
          letter-spacing: -0.02em;
          color: #f5f5f5;
          transition: color 0.22s ease;
        }

        .blog-card:hover .blog-card-title {
          color: #ffffff;
        }

        .blog-card-desc {
          color: #a3a3a3;
          font-size: 0.95rem;
          line-height: 1.75;
          margin: 0 0 16px;
        }

        .blog-card-meta {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          font-size: 13px;
          color: #737373;
          margin-top: auto;
        }

        @media (max-width: 980px) {
          .blog-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="blog-shell">
        <div
          style={{
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              marginBottom: "14px",
              letterSpacing: "-0.03em",
            }}
          >
            Blog
          </h1>

          <p
            style={{
              maxWidth: "720px",
              margin: "0 auto",
              color: "#9ca3af",
              lineHeight: 1.8,
              fontSize: "1rem",
            }}
          >
            Helpful guides on JSON formatting, validation, minification, parsing,
            and common developer workflows.
          </p>
        </div>

        <div className="blog-grid">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="blog-link"
            >
              <article
                className="blog-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    alignSelf: "flex-start",
                    fontSize: "12px",
                    color: "#a3a3a3",
                    border: "1px solid #262626",
                    borderRadius: "999px",
                    padding: "6px 10px",
                    marginBottom: "14px",
                    background: "#111111",
                  }}
                >
                  {blog.category}
                </div>

                <h2 className="blog-card-title">{blog.title}</h2>

                <p className="blog-card-desc">{blog.description}</p>

                <div className="blog-card-meta">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
