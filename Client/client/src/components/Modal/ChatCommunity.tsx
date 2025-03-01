import { useEffect, useState } from "react";
import io from "socket.io-client";
// import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon, MessageSquareIcon } from "lucide-react";
import useAuth from "@/hooks/auth";

// Create socket connection outside component to prevent multiple connections
const socket = io("http://localhost:5000");

const ChatCommunity = () => {
  useAuth();
  const [messages, setMessages] = useState<{ username: string; text: string; timestamp: string }[]>([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("Anonymous");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Handle connection status
    socket.on("connect", () => {
      console.log("Connected to server");
      setConnected(true);
    });

    // Handle initial messages
    socket.on("initialMessages", (initialMessages) => {
      setMessages(initialMessages);
    });

    // Handle new messages
    socket.on("receiveMessage", (newMessage) => {
      console.log("Received message:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Handle errors
    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("connect");
      socket.off("initialMessages");
      socket.off("receiveMessage");
      socket.off("connect_error");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    
    const newMessage = { 
      username, 
      text: message,
      timestamp: new Date().toISOString()
    };
    
    // Send to server
    socket.emit("sendMessage", newMessage);
    
    // Add to local state (our own message won't come back from server)
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    
    // Clear input
    setMessage("");
  };

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-2xl p-6 bg-white shadow-xl rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquareIcon className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900">Community Chat</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Your name:</span>
            <Input 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="w-32 h-8 text-sm"
              placeholder="Username"
            />
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
        </div>
        
        <div className="h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50 mb-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              No messages yet. Be the first to say hello!
            </div>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-2 p-2 rounded ${msg.username === username ? 'bg-blue-100 ml-auto max-w-xs text-right' : 'bg-gray-200 max-w-xs'}`}
              >
                <div className="font-semibold text-blue-600">{msg.username}</div>
                <div className="text-gray-700">{msg.text}</div>
                <div className="text-xs text-gray-400">
                  {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ''}
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="flex gap-2">
          <Input 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..." 
            className="flex-grow"
            // disabled={!connected}
          />
          <Button onClick={sendMessage} disabled={!connected || message.trim() === ""}>
            <SendIcon className="w-5 h-5" />
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default ChatCommunity;