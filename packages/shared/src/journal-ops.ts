import fs from "node:fs/promises";
import {
  journalDir,
  journalFilePath,
  indexFilePath,
  dataDir,
} from "./paths.js";
import { createJournalTemplate } from "./frontmatter.js";
import type { IndexFile } from "./types.js";

const DEFAULT_TIMEZONE = "Europe/Andorra";

export async function ensureJournalDir(root?: string): Promise<void> {
  await fs.mkdir(journalDir(root), { recursive: true });
}

export async function readJournalFile(
  date: string,
  root?: string,
): Promise<string | null> {
  try {
    return await fs.readFile(journalFilePath(date, root), "utf-8");
  } catch {
    return null;
  }
}

export async function ensureJournalFile(
  date: string,
  root?: string,
  timezone: string = DEFAULT_TIMEZONE,
): Promise<string> {
  await ensureJournalDir(root);
  const existing = await readJournalFile(date, root);
  if (existing !== null) return existing;
  const template = createJournalTemplate(date, timezone);
  await fs.writeFile(journalFilePath(date, root), template, "utf-8");
  return template;
}

export async function writeJournalFile(
  date: string,
  content: string,
  root?: string,
): Promise<void> {
  await ensureJournalDir(root);
  await fs.writeFile(journalFilePath(date, root), content, "utf-8");
}

export async function readIndex(root?: string): Promise<IndexFile> {
  try {
    const raw = await fs.readFile(indexFilePath(root), "utf-8");
    return JSON.parse(raw) as IndexFile;
  } catch {
    return { entries: [] };
  }
}

export async function updateIndex(
  date: string,
  root?: string,
): Promise<void> {
  await fs.mkdir(dataDir(root), { recursive: true });
  const index = await readIndex(root);
  const now = new Date().toISOString();
  const existing = index.entries.find((e) => e.date === date);
  if (existing) {
    existing.updatedAt = now;
  } else {
    index.entries.push({
      date,
      file: `journal/${date}.md`,
      updatedAt: now,
    });
  }
  // Sort descending by date
  index.entries.sort((a, b) => b.date.localeCompare(a.date));
  await fs.writeFile(indexFilePath(root), JSON.stringify(index, null, 2), "utf-8");
}
