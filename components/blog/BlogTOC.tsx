import { BlogSection } from "@/lib/blog-types";

export default function BlogTOC({ sections }: { sections: BlogSection[] }) {
  const items = sections.filter((section) => section.id && section.heading);

  return (
    <aside className="blog-toc">
      <div className="blog-toc-card">
        <h2 style={{ fontSize: "1rem", marginBottom: 14 }}>Contents</h2>
        <ul>
          {items.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.heading}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
