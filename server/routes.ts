import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { WebSocket } from "ws";
import { wsMessageSchema, type WSMessage } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a basic HTTP server for static content only
  const httpServer = createServer(app);
  
  // Create a WebSocket server with secure settings
  const wss = new WebSocketServer({ 
    server: httpServer, 
    path: '/ws',
    // Prevent WebSocket server from allowing cross-site attacks
    verifyClient: (info, callback) => {
      // In a production app, you would check origin against allowed origins
      // For this example, we're accepting all origins since it's a local app
      callback(true);
    }
  });
  
  wss.on('connection', (ws, req) => {
    console.log('WebSocket client connected');
    
    // Send welcome message
    const welcomeMessage: WSMessage = {
      type: 'connection',
      message: 'Connected to WebSocket server',
      timestamp: Date.now()
    };
    
    ws.send(JSON.stringify(welcomeMessage));
    
    // Handle messages from client
    ws.on('message', (messageBuffer) => {
      try {
        const messageStr = messageBuffer.toString();
        console.log('Received message:', messageStr);
        
        // Try to parse and validate the message
        try {
          const parsedMessage = JSON.parse(messageStr);
          const validatedMessage = wsMessageSchema.safeParse(parsedMessage);
          
          if (validatedMessage.success) {
            // Message is valid, process it
            // Echo the message back
            if (ws.readyState === WebSocket.OPEN) {
              const response: WSMessage = {
                type: 'echo',
                message: `Echo: ${validatedMessage.data.message}`,
                timestamp: Date.now()
              };
              ws.send(JSON.stringify(response));
            }
          } else {
            // Invalid message format
            const errorMessage: WSMessage = {
              type: 'error',
              message: 'Invalid message format',
              timestamp: Date.now()
            };
            ws.send(JSON.stringify(errorMessage));
          }
        } catch (parseError) {
          // JSON parsing error
          const errorMessage: WSMessage = {
            type: 'error',
            message: 'Invalid JSON',
            timestamp: Date.now()
          };
          ws.send(JSON.stringify(errorMessage));
        }
      } catch (error) {
        console.error('Error processing message:', error);
        // Send a generic error message
        const errorMessage: WSMessage = {
          type: 'error',
          message: 'Server error processing message',
          timestamp: Date.now()
        };
        
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(errorMessage));
        }
      }
    });
    
    // Handle disconnection
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
    
    // Handle errors
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });
  
  return httpServer;
}
