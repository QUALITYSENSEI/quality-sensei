import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a basic HTTP server for static content only
  const httpServer = createServer(app);
  
  // No routes or API endpoints - this is a fully static application

  return httpServer;
}
