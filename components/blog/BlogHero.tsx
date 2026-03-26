import { BlogPost } from "@/lib/blog-types";
import Link from "next/link";

export default function BlogHero({ post }: { post: BlogPost }) {
  return (
    <section style={{ padding: "72px 0 32px" }}>
      <div className="blog-container">
        <div className="blog-narrow">
          <nav aria-label="Breadcrumb" className="blog-breadcrumb">
            <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / {post.title}
          </nav>

          <div className="blog-badge">{post.category}</div>

          <h1 className="blog-title">{post.title}</h1>

          <p className="blog-description">{post.description}</p>

          <div className="blog-meta">
            <span>By {post.author}</span>
            <span>{post.publishedAt}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
