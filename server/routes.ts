import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);
  
  // Create WebSocket server on a distinct path
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Track connected clients
  const clients = new Set<WebSocket>();
  
  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    clients.add(ws);
    
    // Send welcome message
    ws.send(JSON.stringify({
      type: 'connection',
      message: 'Connected to Quality Sensei WebSocket server',
      timestamp: new Date().toISOString()
    }));
    
    // Handle messages from clients
    ws.on('message', async (message) => {
      console.log('Received message:', message.toString());
      try {
        const data = JSON.parse(message.toString());
        
        // Broadcast message to all connected clients
        if (data.type === 'broadcast') {
          // Store message in database
          const savedMessage = await storage.createChatMessage({
            messageType: data.type,
            message: data.message,
            sender: data.sender || 'Anonymous'
          });
          
          const broadcastData = {
            type: 'broadcast',
            message: data.message,
            sender: data.sender || 'Anonymous',
            timestamp: savedMessage.timestamp.toISOString()
          };
          
          // Send to all connected clients
          clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(broadcastData));
            }
          });
        }
      } catch (err) {
        console.error('Error processing WebSocket message:', err);
      }
    });
    
    // Handle client disconnection
    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
      clients.delete(ws);
    });
  });

  return httpServer;
}
