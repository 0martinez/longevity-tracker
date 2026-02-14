export interface SleepData {
  subjective?: number;
  awakenings?: number;
  notes?: string;
}

export interface JournalFrontmatter {
  date: string;
  timezone: string;
  sleep?: SleepData;
  [key: string]: unknown;
}

export interface JournalFile {
  frontmatter: JournalFrontmatter;
  content: string;
  inbox: string[];
  notes: string;
}

export interface IndexEntry {
  date: string;
  file: string;
  updatedAt: string;
}

export interface IndexFile {
  entries: IndexEntry[];
}

export interface AppendResult {
  ok: boolean;
  date: string;
  appended: number;
}

export interface DayResponse {
  date: string;
  markdown: string;
}
