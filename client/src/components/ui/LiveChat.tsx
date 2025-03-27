import React, { useEffect, useState, useRef } from 'react';
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Send, User, Trash2, FileWarning } from "lucide-react";
import { useWebSocket, type WebSocketMessage } from '@/hooks/useWebSocket';

/**
 * Live chat component using WebSockets
 */
export default function LiveChat() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [localMessages, setLocalMessages] = useState<WebSocketMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const [hasSetUsername, setHasSetUsername] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize WebSocket with custom hook
  const {
    isConnected,
    messages: wsMessages,
    sendMessage,
    connect,
    connectionError
  } = useWebSocket({
    onOpen: () => {
      // No need to handle this separately as messages are tracked in the hook
    },
    onMessage: (message) => {
      // Messages are tracked in the hook state
    }
  });

  // Connect only when the chat is open
  useEffect(() => {
    if (isOpen) {
      connect();
    }
  }, [isOpen, connect]);

  // Update local messages from the WebSocket hook
  useEffect(() => {
    setLocalMessages(wsMessages);
  }, [wsMessages]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [localMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasSetUsername) {
      if (username.trim()) {
        setHasSetUsername(true);
      }
      return;
    }
    
    if (inputMessage.trim() && isConnected) {
      sendMessage({
        message: inputMessage,
        sender: username || 'Anonymous'
      });
      setInputMessage('');
    }
  };

  const clearMessages = () => {
    setLocalMessages([]);
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
        aria-label={isOpen ? "Close chat" : "Open chat"}
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
              <span className={cn(
                "w-2 h-2 rounded-full",
                isConnected ? "bg-green-500" : "bg-red-500"
              )} title={isConnected ? "Connected" : "Disconnected"} />
              <button
                onClick={clearMessages}
                className="p-1 rounded hover:bg-opacity-20 hover:bg-gray-700"
                title="Clear messages"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          {/* Connection Error */}
          {connectionError && (
            <div className={cn(
              "p-2 flex items-center gap-2 text-sm",
              theme === "dark" ? "bg-red-900/30 text-red-200" : "bg-red-100 text-red-800"
            )}>
              <FileWarning size={16} />
              <span>{connectionError}</span>
            </div>
          )}
          
          {/* Messages Area */}
          <div className={cn(
            "flex-1 p-3 overflow-y-auto",
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          )}>
            {localMessages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500 italic">
                No messages yet
              </div>
            ) : (
              <>
                {localMessages.map((msg, index) => (
                  <div 
                    key={index}
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