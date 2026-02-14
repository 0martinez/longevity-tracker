import matter from "gray-matter";
import type { JournalFile, JournalFrontmatter, SleepData } from "./types.js";

export function createJournalTemplate(
  date: string,
  timezone: string,
): string {
  return `---
date: ${date}
timezone: ${timezone}
---

## Inbox

## Notes
`;
}

export function parseJournal(raw: string): JournalFile {
  const { data, content } = matter(raw);
  const frontmatter = data as JournalFrontmatter;

  const inboxMatch = content.match(
    /## Inbox\n([\s\S]*?)(?=\n## |\n*$)/,
  );
  const inboxSection = inboxMatch ? inboxMatch[1] : "";
  const inbox = inboxSection
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim());

  const notesMatch = content.match(/## Notes\n([\s\S]*?)(?=\n## |\n*$)/);
  const notes = notesMatch ? notesMatch[1].trim() : "";

  return { frontmatter, content, inbox, notes };
}

export function appendToInbox(raw: string, lines: string[]): string {
  const bullets = lines.map((l) => `- ${l}`).join("\n");
  const inboxHeading = "## Inbox\n";
  const idx = raw.indexOf(inboxHeading);
  if (idx === -1) {
    // No Inbox section found — append at the end before ## Notes
    const notesIdx = raw.indexOf("## Notes");
    if (notesIdx === -1) return raw + `\n## Inbox\n${bullets}\n`;
    return (
      raw.slice(0, notesIdx) +
      `## Inbox\n${bullets}\n\n` +
      raw.slice(notesIdx)
    );
  }

  const afterInbox = idx + inboxHeading.length;

  // Find the next ## heading after Inbox
  const nextHeading = raw.indexOf("\n## ", afterInbox);
  if (nextHeading === -1) {
    // No heading after Inbox — append at end
    const trimmed = raw.trimEnd();
    return trimmed + "\n" + bullets + "\n";
  }

  // Insert bullets before the next heading
  const insertPos = nextHeading;
  return raw.slice(0, insertPos) + bullets + "\n" + raw.slice(insertPos);
}

export function updateSleepFrontmatter(
  raw: string,
  sleep: SleepData,
): string {
  const { data, content } = matter(raw);
  const existing = (data.sleep as SleepData) ?? {};
  data.sleep = { ...existing, ...sleep };
  // Preserve date as string (gray-matter parses YYYY-MM-DD into Date objects)
  if (data.date instanceof Date) {
    data.date = data.date.toISOString().split("T")[0];
  }
  return matter.stringify(content, data);
}
