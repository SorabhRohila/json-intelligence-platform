import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blogs";

export default function BlogLayout({ post }: { post: BlogPost }) {
  const maxGraphValue = Math.max(...post.graph.points.map((item) => item.value));

  return (
    <main
      style={{
        background: "#050505",
        color: "#ededed",
        minHeight: "100vh",
        padding: "48px 16px 80px",
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
            maxWidth: "760px",
            margin: "0 auto 28px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: "999px",
              border: "1px solid #262626",
              background: "#111111",
              color: "#a3a3a3",
              fontSize: "12px",
              marginBottom: "16px",
            }}
          >
            {post.category}
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              lineHeight: 1.08,
              margin: "0 0 16px",
              letterSpacing: "-0.03em",
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "#a3a3a3",
              margin: "0 0 18px",
            }}
          >
            {post.description}
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
              color: "#888",
              fontSize: "14px",
            }}
          >
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
          }}
        >
          <figure
            style={{
              margin: "0 0 28px",
              border: "1px solid #1f1f1f",
              background: "#0a0a0a",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption
              style={{
                padding: "12px 16px",
                fontSize: "14px",
                color: "#8f8f8f",
                borderTop: "1px solid #1f1f1f",
              }}
            >
              {post.image.caption}
            </figcaption>
          </figure>

          <article
            style={{
              border: "1px solid #1f1f1f",
              background: "#0a0a0a",
              borderRadius: "20px",
              padding: "28px 20px",
            }}
          >
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.9,
                color: "#d4d4d4",
                marginTop: 0,
                marginBottom: "28px",
              }}
            >
              {post.content.intro}
            </p>

            {post.content.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                style={{
                  marginBottom: "32px",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.55rem",
                    lineHeight: 1.2,
                    marginBottom: "14px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {section.title}
                </h2>

                {section.body.map((paragraph, index) => (
                  <p
                    key={index}
                    style={{
                      fontSize: "1rem",
                      lineHeight: 1.9,
                      color: "#cfcfcf",
                      margin: "0 0 14px",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <section style={{ marginBottom: "32px" }}>
              <h2
                style={{
                  fontSize: "1.55rem",
                  marginBottom: "16px",
                  letterSpacing: "-0.02em",
                }}
              >
                {post.graph.title}
              </h2>

              <div
                style={{
                  border: "1px solid #1f1f1f",
                  borderRadius: "16px",
                  background: "#080808",
                  padding: "18px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gap: "14px",
                  }}
                >
                  {post.graph.points.map((item) => (
                    <div key={item.label}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "6px",
                          fontSize: "14px",
                          color: "#a3a3a3",
                        }}
                      >
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>

                      <div
                        style={{
                          height: "10px",
                          borderRadius: "999px",
                          background: "#151515",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${(item.value / maxGraphValue) * 100}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #ffffff 0%, #7c7c7c 100%)",
                            borderRadius: "999px",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section style={{ marginBottom: "32px" }}>
              <h2
                style={{
                  fontSize: "1.55rem",
                  marginBottom: "16px",
                  letterSpacing: "-0.02em",
                }}
              >
                {post.table.title}
              </h2>

              <div
                style={{
                  overflowX: "auto",
                  border: "1px solid #1f1f1f",
                  borderRadius: "16px",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: "640px",
                    background: "#080808",
                  }}
                >
                  <thead>
                    <tr>
                      {post.table.headers.map((header) => (
                        <th
                          key={header}
                          style={{
                            textAlign: "left",
                            padding: "14px 16px",
                            fontSize: "14px",
                            color: "#f5f5f5",
                            borderBottom: "1px solid #1f1f1f",
                            background: "#101010",
                          }}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {post.table.rows.map((row, index) => (
                      <tr key={index}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            style={{
                              padding: "14px 16px",
                              fontSize: "14px",
                              color: "#cfcfcf",
                              borderBottom:
                                index !== post.table.rows.length - 1
                                  ? "1px solid #171717"
                                  : "none",
                            }}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section
              style={{
                border: "1px solid #1f1f1f",
                background: "linear-gradient(180deg, #101010 0%, #0a0a0a 100%)",
                borderRadius: "18px",
                padding: "22px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#8f8f8f",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Recommended Tool
              </div>

              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "1.3rem",
                  color: "#f5f5f5",
                }}
              >
                {post.tool.title}
              </h3>

              <p
                style={{
                  margin: "0 0 18px",
                  color: "#a3a3a3",
                  lineHeight: 1.8,
                }}
              >
                {post.tool.description}
              </p>

              <Link
                href={post.tool.buttonHref}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  background: "#ededed",
                  color: "#050505",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                {post.tool.buttonText}
              </Link>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}
