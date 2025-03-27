import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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

// WebSocket Message Types
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  messageType: text("message_type").notNull(), // 'connection', 'broadcast', 'error'
  message: text("message").notNull(),
  sender: text("sender").notNull().default('Anonymous'),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertMessageSchema = createInsertSchema(chatMessages).pick({
  messageType: true,
  message: true,
  sender: true,
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

// Define WebSocket Message Interface
export const wsMessageSchema = z.object({
  type: z.enum(['connection', 'broadcast', 'error']),
  message: z.string(),
  sender: z.string().optional(),
  timestamp: z.string().optional(),
});

export type WSMessage = z.infer<typeof wsMessageSchema>;
