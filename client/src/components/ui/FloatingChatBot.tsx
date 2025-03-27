import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, AlertCircle, Wifi } from "lucide-react";
import type { WSMessage } from "@/../../shared/schema";

// Predefined FAQ responses
const faqResponses = [
  {
    question: "What courses do you offer?",
    answer: "We offer a variety of software testing courses including Manual Testing, Selenium Automation, API Testing, and more. Check our Courses section for the full catalog."
  },
  {
    question: "How long are the courses?",
    answer: "Our courses range from 3 to 8 weeks depending on the complexity. Each course lists its duration on the course page."
  },
  {
    question: "Do you offer certification?",
    answer: "Yes, upon successful completion of any course, you'll receive a Quality Sensei certification that can be added to your LinkedIn profile."
  },
  {
    question: "Are there any prerequisites?",
    answer: "Basic computer knowledge is required for all courses. Some advanced courses may have specific prerequisites, which are listed on their respective pages."
  },
  {
    question: "How can I contact support?",
    answer: "You can reach our support team via email at support@qualitysensei.com or through the contact form on our website."
  }
];

interface Message {
  id: string;
  text: string;
  fromUser: boolean;
}

export default function FloatingChatBot() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "👋 Hi there! I'm the Quality Sensei assistant. How can I help you with software testing?",
      fromUser: false
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const websocketRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Setup WebSocket connection
  useEffect(() => {
    // Only connect when the chat is open to save resources
    if (!isOpen) {
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
      }
      return;
    }
    
    if (!websocketRef.current && !isConnecting) {
      connectWebSocket();
    }
    
    // Cleanup on unmount
    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, [isOpen]);
  
  const connectWebSocket = () => {
    try {
      setIsConnecting(true);
      
      // Determine the correct WebSocket protocol based on current connection
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      
      console.log("Connecting to WebSocket server at:", wsUrl);
      
      const socket = new WebSocket(wsUrl);
      
      socket.onopen = () => {
        console.log("WebSocket connection established");
        setIsConnected(true);
        setIsConnecting(false);
        
        // Add system message about connection
        const connectedMessage: Message = {
          id: `system-${Date.now()}`,
          text: "Connected to chat server",
          fromUser: false
        };
        setMessages(prev => [...prev, connectedMessage]);
      };
      
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as WSMessage;
          console.log("Received WebSocket message:", data);
          
          // Handle different message types
          if (data.type === 'connection') {
            // Connection confirmation - already handled in onopen
          } else if (data.type === 'echo') {
            // Server echo response - could be used for UI feedback
            console.log("Echo from server:", data.message);
          } else if (data.type === 'error') {
            // Error message from server
            const errorMessage: Message = {
              id: `error-${Date.now()}`,
              text: `Error: ${data.message}`,
              fromUser: false
            };
            setMessages(prev => [...prev, errorMessage]);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };
      
      socket.onclose = (event) => {
        console.log("WebSocket connection closed:", event.code, event.reason);
        setIsConnected(false);
        websocketRef.current = null;
        
        // If the chat is still open, try to reconnect
        if (isOpen) {
          const disconnectMessage: Message = {
            id: `system-${Date.now()}`,
            text: "Disconnected from chat server. Reconnecting...",
            fromUser: false
          };
          setMessages(prev => [...prev, disconnectMessage]);
          
          // Attempt to reconnect after a short delay
          setTimeout(() => {
            if (isOpen) {
              connectWebSocket();
            }
          }, 3000);
        }
      };
      
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
        setIsConnecting(false);
      };
      
      websocketRef.current = socket;
    } catch (error) {
      console.error("Error setting up WebSocket:", error);
      setIsConnecting(false);
      setIsConnected(false);
      
      // Fallback to local mode
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Unable to connect to chat server. Using offline mode.",
        fromUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };
  
  const toggleChat = () => setIsOpen(prev => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      fromUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Try to send message via WebSocket if connected
    if (isConnected && websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
      try {
        // Send message to server
        websocketRef.current.send(JSON.stringify({
          type: 'echo',
          message: inputValue,
          timestamp: Date.now()
        }));
      } catch (error) {
        console.error("Error sending message via WebSocket:", error);
      }
    }
    
    setInputValue("");
    
    // Find a matching FAQ or give default response (as fallback or enhancement)
    setTimeout(() => {
      const faq = faqResponses.find(f => 
        f.question.toLowerCase().includes(inputValue.toLowerCase()) ||
        inputValue.toLowerCase().includes(f.question.toLowerCase())
      );
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: faq 
          ? faq.answer 
          : "Thanks for your message! For specific questions, please contact our support team through the contact form.",
        fromUser: false
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        className={cn(
          "fixed bottom-5 right-5 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-40",
          theme === "dark" 
            ? "bg-[#40E0D0] text-gray-800" 
            : "bg-[#00BCD4] text-white"
        )}
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "fixed bottom-24 right-5 w-80 sm:w-96 rounded-lg shadow-xl z-40 overflow-hidden flex flex-col",
              theme === "dark" ? "bg-gray-800" : "bg-white"
            )}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className={cn(
              "p-4 flex items-center",
              theme === "dark" ? "bg-gray-700" : "bg-[#00BCD4] text-white"
            )}>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
                <span className="text-lg">🔍</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Quality Sensei Assistant</h3>
                <p className="text-xs opacity-80">Ask me anything about our courses</p>
              </div>
              {/* Connection status indicator */}
              <div className="ml-2 flex items-center">
                {isConnecting ? (
                  <span className="flex items-center text-xs">
                    <Wifi size={14} className="animate-pulse mr-1" />
                    Connecting...
                  </span>
                ) : isConnected ? (
                  <span className="flex items-center text-xs">
                    <Wifi size={14} className="text-green-400 mr-1" />
                    Online
                  </span>
                ) : (
                  <span className="flex items-center text-xs">
                    <AlertCircle size={14} className="text-yellow-400 mr-1" />
                    Offline
                  </span>
                )}
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 max-h-96 min-h-[300px]">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  className={cn(
                    "mb-3 max-w-[80%] p-3 rounded-lg break-words",
                    message.fromUser 
                      ? "ml-auto bg-blue-500 text-white rounded-tr-none" 
                      : message.id.startsWith('system') || message.id.startsWith('error')
                        ? "mx-auto text-center text-xs py-1 bg-opacity-70 dark:bg-opacity-70 " + 
                          (message.id.startsWith('error')
                            ? (theme === "dark" ? "bg-red-900 text-red-100" : "bg-red-100 text-red-800")
                            : (theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"))
                        : `mr-auto ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"} rounded-tl-none`
                  )}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.text}
                </motion.div>
              ))}
              {/* This empty div is used as a ref for auto-scrolling */}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question..."
                className={cn(
                  "flex-1 p-2 rounded border focus:outline-none focus:ring-2",
                  theme === "dark" 
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-[#40E0D0]" 
                    : "bg-white border-gray-300 text-gray-800 focus:ring-[#00BCD4]"
                )}
              />
              <button
                type="submit"
                className={cn(
                  "ml-2 p-2 rounded-lg",
                  theme === "dark" 
                    ? "bg-[#40E0D0] text-gray-800" 
                    : "bg-[#00BCD4] text-white"
                )}
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}