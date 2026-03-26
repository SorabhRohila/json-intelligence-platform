import { BlogSection } from "@/lib/blog-types";
import BlogTable from "./BlogTable";
import BlogGraph from "./BlogGraph";
import BlogFAQ from "./BlogFAQ";

function HeadingTag({
  level = 2,
  children,
}: {
  level?: 2 | 3 | 4 | 5;
  children: React.ReactNode;
}) {
  switch (level) {
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    default:
      return <h2>{children}</h2>;
  }
}

export default function BlogSectionRenderer({ section }: { section: BlogSection }) {
  return (
    <section id={section.id}>
      {"heading" in section && section.heading ? (
        <HeadingTag level={section.level}>{section.heading}</HeadingTag>
      ) : null}

      {section.type === "paragraph" ? <p>{section.content}</p> : null}

      {section.type === "list" ? (
        section.ordered ? (
          <ol>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        ) : (
          <ul>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )
      ) : null}

      {section.type === "table" ? (
        <BlogTable headers={section.headers} rows={section.rows} />
      ) : null}

      {section.type === "graph" ? (
        <BlogGraph bars={section.bars} note={section.note} />
      ) : null}

      {section.type === "code" ? (
        <pre className="blog-code">{section.code}</pre>
      ) : null}

      {section.type === "faq" ? <BlogFAQ items={section.items} /> : null}
    </section>
  );
}
