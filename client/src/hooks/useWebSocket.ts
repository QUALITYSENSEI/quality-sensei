import { useState, useEffect, useRef, useCallback } from 'react';

export interface WebSocketMessage {
  type: 'connection' | 'broadcast' | 'error';
  message: string;
  sender?: string;
  timestamp: string;
}

interface UseWebSocketOptions {
  onMessage?: (message: WebSocketMessage) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  reconnectInterval?: number;
  reconnectAttempts?: number;
}

/**
 * Custom hook for managing WebSocket connections
 */
export function useWebSocket(options: UseWebSocketOptions = {}) {
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  const socket = useRef<WebSocket | null>(null);
  const reconnectCount = useRef(0);
  const reconnectTimerId = useRef<number | null>(null);
  
  const {
    onMessage,
    onOpen,
    onClose,
    onError,
    reconnectInterval = 5000,
    reconnectAttempts = 5
  } = options;
  
  /**
   * Connect to the WebSocket server
   */
  const connect = useCallback(() => {
    try {
      // Close any existing connection
      if (socket.current) {
        socket.current.close();
      }
      
      setConnectionError(null);
      
      // Create WebSocket connection with proper protocol based on current URL
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      
      const ws = new WebSocket(wsUrl);
      socket.current = ws;
      
      // Handle connection open
      ws.onopen = () => {
        setIsConnected(true);
        reconnectCount.current = 0;
        if (onOpen) onOpen();
      };
      
      // Handle incoming messages
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as WebSocketMessage;
          setMessages(prev => [...prev, data]);
          if (onMessage) onMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      // Handle connection close
      ws.onclose = () => {
        setIsConnected(false);
        if (onClose) onClose();
        
        // Attempt reconnection if not at max attempts
        if (reconnectCount.current < reconnectAttempts) {
          reconnectCount.current++;
          if (reconnectTimerId.current) window.clearTimeout(reconnectTimerId.current);
          reconnectTimerId.current = window.setTimeout(connect, reconnectInterval);
        } else {
          setConnectionError('Max reconnection attempts reached');
        }
      };
      
      // Handle errors
      ws.onerror = (error) => {
        setConnectionError('WebSocket connection error');
        if (onError) onError(error);
      };
    } catch (error) {
      setConnectionError('Failed to establish WebSocket connection');
      console.error('WebSocket connection error:', error);
    }
  }, [onMessage, onOpen, onClose, onError, reconnectInterval, reconnectAttempts]);
  
  /**
   * Send a message through the WebSocket connection
   */
  const sendMessage = useCallback((message: {message: string; sender?: string}) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(message));
      return true;
    }
    return false;
  }, []);
  
  /**
   * Disconnect from the WebSocket server
   */
  const disconnect = useCallback(() => {
    if (reconnectTimerId.current) {
      window.clearTimeout(reconnectTimerId.current);
      reconnectTimerId.current = null;
    }
    
    if (socket.current) {
      socket.current.close();
      socket.current = null;
    }
    
    setIsConnected(false);
  }, []);
  
  // Connect on component mount and disconnect on unmount
  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);
  
  return {
    isConnected,
    messages,
    sendMessage,
    connect,
    disconnect,
    connectionError
  };
}