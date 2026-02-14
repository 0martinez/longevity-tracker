import { useEffect, useState } from "react";

interface IndexEntry {
  date: string;
  file: string;
  updatedAt: string;
}

interface Props {
  refreshKey: number;
  onSelect: (date: string) => void;
  selectedDate: string;
}

export function DayList({ refreshKey, onSelect, selectedDate }: Props) {
  const [entries, setEntries] = useState<IndexEntry[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/journal")
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setEntries(data.entries ?? []);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  if (entries.length === 0) return <p style={{ color: "#888" }}>No entries yet</p>;

  return (
    <div>
      <h3 style={{ margin: "0 0 0.5rem" }}>Days</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {entries.map((entry) => (
          <li key={entry.date} style={{ marginBottom: "0.25rem" }}>
            <button
              onClick={() => onSelect(entry.date)}
              style={{
                background: entry.date === selectedDate ? "#e0e0e0" : "transparent",
                border: "1px solid #ccc",
                borderRadius: 4,
                padding: "0.25rem 0.5rem",
                width: "100%",
                textAlign: "left",
                fontSize: "0.85rem",
              }}
            >
              {entry.date}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
