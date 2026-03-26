export default function BlogFAQ({
  items,
}: {
  items: {
    question: string;
    answer: string;
  }[];
}) {
  return (
    <div>
      {items.map((item) => (
        <details key={item.question} className="blog-faq-item">
          <summary style={{ cursor: "pointer", fontWeight: 600 }}>{item.question}</summary>
          <p style={{ marginTop: 12 }}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
