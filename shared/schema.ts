import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Note: This schema is only kept for reference, as the application is now fully static
// and does not use a database. User authentication and data storage functionality
// would need to be implemented differently in a production environment.

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// WebSocket message types
export const wsMessageSchema = z.object({
  type: z.enum(['connection', 'echo', 'notification', 'error']),
  message: z.string(),
  timestamp: z.number().optional(),
  data: z.any().optional(),
});

export type WSMessage = z.infer<typeof wsMessageSchema>;
