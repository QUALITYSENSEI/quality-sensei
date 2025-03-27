import React, { useEffect, useState, useRef } from 'react';
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Send, User, Trash2 } from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'connection' | 'broadcast' | 'error';
  message: string;
  sender?: string;
  timestamp: string;
}

export default function LiveChat() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [hasSetUsername, setHasSetUsername] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    if (!socket && isOpen) {
      connectWebSocket();
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [isOpen]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const connectWebSocket = () => {
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      console.log('Connecting to WebSocket at:', wsUrl);
      
      const newSocket = new WebSocket(wsUrl);
      
      newSocket.onopen = () => {
        console.log('WebSocket connection established');
        setIsConnected(true);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            type: 'connection',
            message: 'Connected to chat server',
            timestamp: new Date().toISOString()
          }
        ]);
      };
      
      newSocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received WebSocket message:', data);
          
          setMessages(prev => [
            ...prev,
            {
              id: Date.now().toString(),
              type: data.type,
              message: data.message,
              sender: data.sender,
              timestamp: data.timestamp
            }
          ]);
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };
      
      newSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            type: 'error',
            message: 'Error connecting to chat server',
            timestamp: new Date().toISOString()
          }
        ]);
      };
      
      newSocket.onclose = () => {
        console.log('WebSocket connection closed');
        setIsConnected(false);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            type: 'connection',
            message: 'Disconnected from chat server',
            timestamp: new Date().toISOString()
          }
        ]);
      };
      
      setSocket(newSocket);
    } catch (err) {
      console.error('Error setting up WebSocket:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasSetUsername) {
      if (username.trim()) {
        setHasSetUsername(true);
      }
      return;
    }
    
    if (inputMessage.trim() && socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        type: 'broadcast',
        message: inputMessage,
        sender: username || 'Anonymous'
      };
      
      socket.send(JSON.stringify(message));
      setInputMessage('');
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 flex flex-col",
      isOpen ? "h-96 w-80" : "h-12 w-12"
    )}>
      {/* Chat Button */}
      <button
        className={cn(
          "rounded-full p-3 flex items-center justify-center shadow-lg transition-all",
          theme === "dark" ? "bg-[#40E0D0] text-gray-900" : "bg-[#00BCD4] text-white",
          isOpen ? "w-12 h-12 ml-auto" : "w-12 h-12"
        )}
        onClick={toggleChat}
      >
        {isOpen ? "×" : "💬"}
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div className={cn(
          "flex flex-col mt-2 rounded-lg shadow-lg overflow-hidden transition-all",
          theme === "dark" ? "bg-gray-800" : "bg-white",
          "h-96 w-full"
        )}>
          {/* Chat Header */}
          <div className={cn(
            "px-4 py-3 flex items-center justify-between",
            theme === "dark" ? "bg-gray-900" : "bg-[#00BCD4]",
            theme === "dark" ? "text-white" : "text-white"
          )}>
            <h3 className="font-medium">Live Chat</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={clearMessages}
                className="p-1 rounded hover:bg-opacity-20 hover:bg-gray-700"
                title="Clear messages"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          {/* Messages Area */}
          <div className={cn(
            "flex-1 p-3 overflow-y-auto",
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          )}>
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500 italic">
                No messages yet
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={cn(
                      "mb-2 p-2 rounded",
                      msg.type === 'connection' 
                        ? "text-center text-xs text-gray-500 italic" 
                        : msg.type === 'error'
                          ? theme === "dark" ? "bg-red-900/30 text-red-200" : "bg-red-100 text-red-800"
                          : msg.sender === username
                            ? theme === "dark" ? "bg-[#40E0D0]/10 ml-auto max-w-[75%]" : "bg-[#00BCD4]/10 ml-auto max-w-[75%]"
                            : theme === "dark" ? "bg-gray-700 max-w-[75%]" : "bg-gray-100 max-w-[75%]"
                    )}
                  >
                    {msg.type !== 'connection' && (
                      <div className="flex items-center gap-1 text-xs mb-1">
                        <User size={12} />
                        <span className="font-medium">{msg.sender || 'System'}</span>
                      </div>
                    )}
                    <div>{msg.message}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          
          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700">
            {!hasSetUsername ? (
              <div className="flex flex-col gap-2">
                <label className={cn("text-sm", theme === "dark" ? "text-gray-300" : "text-gray-600")}>
                  Enter your name to join the chat:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your name"
                    className={cn(
                      "flex-1 px-3 py-2 rounded border",
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-900"
                    )}
                  />
                  <button
                    type="submit"
                    disabled={!username.trim()}
                    className={cn(
                      "px-4 py-2 rounded font-medium",
                      username.trim() 
                        ? theme === "dark" ? "bg-[#40E0D0] text-gray-900" : "bg-[#00BCD4] text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed",
                    )}
                  >
                    Join
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  className={cn(
                    "flex-1 px-3 py-2 rounded border",
                    theme === "dark" 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  )}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || !isConnected}
                  className={cn(
                    "p-2 rounded-full",
                    inputMessage.trim() && isConnected
                      ? theme === "dark" ? "bg-[#40E0D0] text-gray-900" : "bg-[#00BCD4] text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed",
                  )}
                >
                  <Send size={18} />
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}