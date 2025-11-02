// lib/schemas/event.ts
import { z } from "zod";

export const eventSchema = z.object({
  event_name: z.string().min(3),
  event_location: z.string().min(1),
  description: z.string().optional().nullable(),
  event_date: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
    message: "Invalid date string",
  }),
  is_paid: z.boolean().default(false),
  category: z.enum(["tech", "concert", "fun", "workshop", "meetup"]),
  event_poster_url: z.string().url().optional().nullable(),
  social_links: z
    .record(z.string().url())
    .optional()
    .default({}),
  ticket_platform_url: z.string().url().optional().nullable(),
});
export type EventInput = z.infer<typeof eventSchema>;
