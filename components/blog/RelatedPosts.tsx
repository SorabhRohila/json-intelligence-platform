import { BlogPost } from "@/lib/blog-types";
import Link from "next/link";

export default function RelatedPosts({
  posts,
  currentSlug,
}: {
  posts: BlogPost[];
  currentSlug: string;
}) {
  const related = posts.filter((post) => post.slug !== currentSlug).slice(0, 3);

  if (!related.length) return null;

  return (
    <section style={{ marginBottom: 48 }}>
      <h2>Related posts</h2>
      <div className="blog-related-grid">
        {related.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-related-card">
            <div style={{ fontSize: "0.8rem", color: "#888", marginBottom: 10 }}>{post.category}</div>
            <div style={{ fontSize: "1.05rem", color: "#ededed", fontWeight: 600, marginBottom: 8 }}>
              {post.title}
            </div>
            <p style={{ color: "#888", lineHeight: 1.7 }}>{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
