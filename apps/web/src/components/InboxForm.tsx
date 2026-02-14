import { useState } from "react";

interface Props {
  date: string;
  onDateChange: (date: string) => void;
  onAppended: () => void;
}

export function InboxForm({ date, onDateChange, onAppended }: Props) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch(`/api/journal/${date}/append`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Request failed");
      }
      const data = await res.json();
      setStatus(`Appended ${data.appended} entries`);
      setText("");
      onAppended();
    } catch (err) {
      setStatus(`Error: ${(err as Error).message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <label>
          Date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </label>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Coffee at 16:45&#10;Leg workout at 18:00"
        rows={4}
        style={{ width: "100%", fontFamily: "inherit", fontSize: "0.95rem" }}
      />
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <button type="submit" disabled={submitting || !text.trim()}>
          {submitting ? "Saving..." : "Append to Inbox"}
        </button>
        {status && <span>{status}</span>}
      </div>
    </form>
  );
}
