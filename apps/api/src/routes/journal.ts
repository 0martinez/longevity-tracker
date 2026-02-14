import { Router } from "express";
import {
  dateParamSchema,
  appendBodySchema,
  sleepBodySchema,
  readIndex,
  ensureJournalFile,
  appendToInbox,
  writeJournalFile,
  updateIndex,
  updateSleepFrontmatter,
} from "@longevity/shared";

const router = Router();
const TIMEZONE = process.env.DEFAULT_TIMEZONE ?? "Europe/Andorra";

// GET /journal — list index entries
router.get("/journal", async (_req, res, next) => {
  try {
    const index = await readIndex();
    res.json(index);
  } catch (err) {
    next(err);
  }
});

// GET /journal/:date — read (or create) a day's journal
router.get("/journal/:date", async (req, res, next) => {
  try {
    const { date } = dateParamSchema.parse(req.params);
    const markdown = await ensureJournalFile(date, undefined, TIMEZONE);
    res.json({ date, markdown });
  } catch (err) {
    next(err);
  }
});

// POST /journal/:date/append — append lines to Inbox
router.post("/journal/:date/append", async (req, res, next) => {
  try {
    const { date } = dateParamSchema.parse(req.params);
    const { text } = appendBodySchema.parse(req.body);

    let raw = await ensureJournalFile(date, undefined, TIMEZONE);
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    raw = appendToInbox(raw, lines);
    await writeJournalFile(date, raw);
    await updateIndex(date);

    res.json({ ok: true, date, appended: lines.length });
  } catch (err) {
    next(err);
  }
});

// POST /journal/:date/sleep — upsert sleep frontmatter
router.post("/journal/:date/sleep", async (req, res, next) => {
  try {
    const { date } = dateParamSchema.parse(req.params);
    const sleep = sleepBodySchema.parse(req.body);

    let raw = await ensureJournalFile(date, undefined, TIMEZONE);
    raw = updateSleepFrontmatter(raw, sleep);
    await writeJournalFile(date, raw);
    await updateIndex(date);

    res.json({ ok: true, date });
  } catch (err) {
    next(err);
  }
});

export default router;
