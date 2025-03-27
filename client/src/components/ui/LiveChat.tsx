import React, { useState, useEffect, useRef } from 'react';
import { useWebSocket, WebSocketMessage } from '@/hooks/useWebSocket';
import { useTheme } from '@/contexts/ThemeContext';
import { cn, debounce } from '@/lib/utils';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { nanoid } from 'nanoid';

// Chat message interface
interface Message {
  id: string;
  text: string;
  sender: string;
  isUser: boolean;
  timestamp: Date;
}

interface LiveChatProps {
  defaultOpen?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
  title?: string;
  welcomeMessage?: string;
  userDisplayName?: string;
}

export default function LiveChat({
  defaultOpen = false,
  position = 'bottom-right',
  className,
  title = 'Live Support',
  welcomeMessage = 'Welcome to Quality Sensei! How can we help you today?',
  userDisplayName = 'You'
}: LiveChatProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Connect to WebSocket server
  const {
    isConnected,
    messages: wsMessages,
    sendMessage,
    connectionError
  } = useWebSocket({
    onMessage: (wsMessage) => {
      handleIncomingMessage(wsMessage);
    }
  });
  
  // Add welcome message on first connection
  useEffect(() => {
    if (isConnected && messages.length === 0) {
      setMessages([
        {
          id: nanoid(),
          text: welcomeMessage,
          sender: 'Quality Sensei Assistant',
          isUser: false,
          timestamp: new Date()
        }
      ]);
    }
  }, [isConnected, welcomeMessage]);
  
  // Handle incoming WebSocket messages
  const handleIncomingMessage = (wsMessage: WebSocketMessage) => {
    const newMessage: Message = {
      id: nanoid(),
      text: wsMessage.message,
      sender: wsMessage.sender || 'Quality Sensei Assistant',
      isUser: false,
      timestamp: new Date(wsMessage.timestamp)
    };
    
    setMessages((prev) => [...prev, newMessage]);
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // Create a new message
    const newMessage: Message = {
      id: nanoid(),
      text: messageText,
      sender: userDisplayName,
      isUser: true,
      timestamp: new Date()
    };
    
    // Add message to local state
    setMessages((prev) => [...prev, newMessage]);
    
    // Send message through WebSocket if connected
    if (isConnected) {
      sendMessage({
        message: messageText,
        sender: userDisplayName
      });
    }
    
    // Clear input
    setMessageText('');
  };
  
  // Handle keypress (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Format time from date
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  }[position];
  
  // Toggle chat window
  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };
  
  return (
    <div className={cn('fixed z-50', positionClasses, className)}>
      {/* Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggleChat}
            className={cn(
              'flex items-center justify-center p-3 rounded-full shadow-lg',
              theme === 'dark' 
                ? 'bg-[#40E0D0] text-gray-900 hover:bg-[#30d0c0]' 
                : 'bg-[#00BCD4] text-white hover:bg-[#00a5bb]'
            )}
            aria-label="Open chat"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'w-80 sm:w-96 rounded-lg shadow-xl overflow-hidden flex flex-col',
              theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            )}
            style={{ height: '450px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div 
              className={cn(
                'p-3 flex items-center justify-between',
                theme === 'dark' ? 'bg-gray-900' : 'bg-[#00BCD4] text-white'
              )}
            >
              <div>
                <h3 className="font-medium">{title}</h3>
                <div className="flex items-center text-xs">
                  {isConnected ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      <span>Online</span>
                    </>
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                      <span>Offline</span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-1.5 rounded-full hover:bg-black/10 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Messages Container */}
            <div className={cn(
              'flex-1 overflow-y-auto p-3 space-y-3',
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            )}>
              {connectionError && (
                <div className="p-2 rounded bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs">
                  Failed to connect to chat server. Please try again later.
                </div>
              )}
              
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex flex-col max-w-[85%] rounded-lg p-2.5 break-words',
                    msg.isUser 
                      ? 'ml-auto bg-blue-500 text-white' 
                      : theme === 'dark'
                        ? 'bg-gray-700'
                        : 'bg-white shadow-sm'
                  )}
                >
                  <span className="text-sm mb-1">{msg.text}</span>
                  <div className="flex justify-between items-center mt-1 text-xs opacity-80">
                    <span>{msg.isUser ? '' : msg.sender}</span>
                    <time>{formatTime(msg.timestamp)}</time>
                  </div>
                </div>
              ))}
              
              {/* Scroll to bottom anchor */}
              <div ref={messageEndRef} />
            </div>
            
            {/* Input Area */}
            <div className={cn(
              'p-3 border-t',
              theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200'
            )}>
              <div className="flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className={cn(
                    'flex-1 p-2 rounded-l-md border border-r-0',
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
                  )}
                  disabled={!isConnected}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!isConnected || !messageText.trim()}
                  className={cn(
                    'p-2 rounded-r-md border',
                    theme === 'dark' 
                      ? 'bg-[#40E0D0] border-[#40E0D0] text-gray-900 hover:bg-[#30d0c0] disabled:bg-gray-700 disabled:border-gray-700 disabled:text-gray-500' 
                      : 'bg-[#00BCD4] border-[#00BCD4] text-white hover:bg-[#00a5bb] disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400'
                  )}
                >
                  {isConnected ? <Send size={18} /> : <Loader2 size={18} className="animate-spin" />}
                </button>
              </div>
              
              {/* Status message */}
              <div className="mt-1.5 text-xs text-center opacity-70">
                {!isConnected && 'Connecting to chat server...'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}