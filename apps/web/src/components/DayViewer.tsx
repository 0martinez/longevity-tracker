import { useEffect, useState } from "react";

interface Props {
  date: string;
  refreshKey: number;
}

export function DayViewer({ date, refreshKey }: Props) {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    fetch(`/api/journal/${date}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        if (!cancelled) setMarkdown(data.markdown);
      })
      .catch((err) => {
        if (!cancelled) setError((err as Error).message);
      });
    return () => {
      cancelled = true;
    };
  }, [date, refreshKey]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (markdown === null) return <p>Loading...</p>;

  return (
    <div>
      <h2>{date}</h2>
      <pre
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: 4,
          padding: "1rem",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          fontSize: "0.9rem",
        }}
      >
        {markdown}
      </pre>
    </div>
  );
}
