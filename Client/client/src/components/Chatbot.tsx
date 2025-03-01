import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your health assistant. How can I help you today?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Voice assistant states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const recognitionRef = useRef(null);
  const synth = useRef(window.speechSynthesis);

  const OPENAI_API_KEY =
    import.meta.env.VITE_API_KEY; // Replace with your OpenAI API key

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setInput(transcript);
        // Auto-send after voice input
        setTimeout(() => {
          handleSend(new CustomEvent('speech-input'));
        }, 500);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        // Only restart if we're still in listening mode
        if (isListening) {
          recognitionRef.current.start();
        }
      };
    } else {
      console.warn('Speech recognition not supported in this browser');
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      synth.current.cancel();
    };
  }, []);

  // Toggle speech recognition
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Toggle speech synthesis
  const toggleSpeaking = () => {
    setSpeechEnabled(!speechEnabled);
    if (isSpeaking) {
      synth.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Speak text using speech synthesis
  const speakText = (text) => {
    if (!speechEnabled) return;
    
    synth.current.cancel(); // Stop any current speech
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synth.current.speak(utterance);
  };

  const handleSend = async (e) => {
    if (e.preventDefault) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a intelligent health assistant specializing in menstruating. Your role is to provide users with accurate health insights, notify them about unusual drops in heart rate and temperature even if not detected on the IoT device, and offer information on menstruation and related precautions.\n\nYou should:\n- Be friendly, informative, and supportive.\n- Provide scientifically accurate health and wellness information.\n- Offer real-time monitoring insights when data is available.\n- Detect and notify users of unusual heart rate or temperature drops even if the IoT device does not detect them.\n- Help users understand and interpret their temperature and heart rate trends.\n- Provide guidance on menstrual health, including cycle tracking, symptoms, and hygiene precautions.\n- Suggest preventive measures for abnormal health readings.\n- Explain IoT functionality in simple terms for non-technical users.\n- Avoid giving medical diagnoses but recommend consulting a doctor for serious concerns.\n\nIf a user asks unrelated or inappropriate questions, politely steer the conversation back to health, IoT monitoring, or menstruation-related topics.",
            },
            {
              role: "user",
              content: input,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const botMessage = {
        text: response.data.choices[0].message.content,
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
      
      // Speak the bot's response
      speakText(botMessage.text);
      
    } catch (error) {
      console.error("Error communicating with OpenAI API:", error);
      const errorMessage = {
        text: "Sorry, I couldn't process your request at the moment.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
      speakText(errorMessage.text);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-full w-16 h-16 p-0"
        >
          {isOpen ? <X /> : <MessageCircle />}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 z-50 w-80"
          >
            <Card>
              <CardContent className="p-4">
                <div className="h-80 overflow-y-auto mb-4 space-y-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`${
                        msg.isUser
                          ? "ml-auto bg-primary text-white"
                          : "mr-auto bg-gray-100"
                      } p-2 rounded-lg max-w-[80%]`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  {loading && (
                    <div className="mr-auto bg-gray-100 p-2 rounded-lg max-w-[80%]">
                      Typing...
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 mb-2">
                  <Button 
                    type="button" 
                    variant={isListening ? "destructive" : "outline"}
                    onClick={toggleListening}
                    className="h-8 w-8 p-0"
                  >
                    {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant={speechEnabled ? "default" : "outline"}
                    onClick={toggleSpeaking}
                    className="h-8 w-8 p-0"
                  >
                    {speechEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </Button>
                </div>
                
                <form onSubmit={handleSend} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Type your message..."}
                    className="flex-1"
                    disabled={loading}
                  />
                  <Button type="submit" disabled={loading}>
                    Send
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}