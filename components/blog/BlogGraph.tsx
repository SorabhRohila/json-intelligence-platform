export default function BlogGraph({
  bars,
  note,
}: {
  bars: {
    label: string;
    value: string;
    height: number;
    color?: string;
  }[];
  note?: string;
}) {
  return (
    <div className="blog-graph-card">
      {note ? (
        <p style={{ color: "var(--text-secondary, #888)", lineHeight: 1.85, marginBottom: 18 }}>
          {note}
        </p>
      ) : null}

      <div className="blog-graph">
        {bars.map((bar) => (
          <div className="blog-graph-bar-wrap" key={bar.label}>
            <div
              className="blog-graph-bar"
              style={{
                height: bar.height,
                background:
                  bar.color ||
                  "linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)",
              }}
            />
            <div style={{ marginTop: 10, color: "#aaa" }}>{bar.label}</div>
            <div style={{ fontSize: "0.9rem", color: "#888" }}>{bar.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
