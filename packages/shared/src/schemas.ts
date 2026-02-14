import { z } from "zod";

export const dateParamSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
});

export const appendBodySchema = z.object({
  text: z.string().min(1, "Text must not be empty"),
});

export const sleepBodySchema = z.object({
  subjective: z.number().min(1).max(10).optional(),
  awakenings: z.number().int().min(0).optional(),
  notes: z.string().optional(),
});
