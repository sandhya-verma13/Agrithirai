
import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, User, Send, CircleHelp, Zap, MessageSquare, Leaf, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock conversation for demo
const initialMessages = [
  {
    id: 1,
    sender: 'ai',
    text: "Hello! I'm your AI farming assistant. How can I help you today?",
    timestamp: new Date().toISOString()
  }
];

type Message = {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
};

const suggestedQuestions = [
  "What are the best crops to plant in June?",
  "How can I improve soil fertility naturally?",
  "Tell me about the latest government schemes for farmers",
  "How do I deal with tomato blight?",
  "What's the optimal irrigation schedule for rice?"
];

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string = input) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: text,
      timestamp: new Date().toISOString()
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      // Generate AI response based on user input
      let response = '';
      
      if (text.toLowerCase().includes('government scheme') || text.toLowerCase().includes('subsidy')) {
        response = "There are several government schemes available for farmers. The PM-KISAN scheme provides ₹6000 per year to eligible farmers. The Pradhan Mantri Fasal Bima Yojana offers crop insurance. Would you like me to provide more details about these schemes or guide you to our Schemes page?";
      } else if (text.toLowerCase().includes('weather') || text.toLowerCase().includes('rain')) {
        response = "Weather forecasting is crucial for agricultural planning. You can check detailed weather forecasts for your location on our Weather page. Would you like me to guide you there?";
      } else if (text.toLowerCase().includes('crop') || text.toLowerCase().includes('plant')) {
        response = "For detailed information about crops, including planting times, care instructions, and market prices, you can visit our Crops section. Would you like specific information about a particular crop?";
      } else if (text.toLowerCase().includes('equipment') || text.toLowerCase().includes('machinery')) {
        response = "Modern farming equipment can significantly improve productivity. Our Equipment page has information on the latest technologies and related government subsidies. What specific equipment are you interested in?";
      } else {
        response = "Thank you for your question. I'm here to help with any farming-related queries. Could you provide more specific details so I can give you the most relevant information?";
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        sender: 'ai',
        text: response,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Layout>
      <section className="pt-16 pb-24">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl font-display font-bold mb-4">AI Assistant</h1>
            <p className="text-xl text-muted-foreground">
              Your virtual farming expert available 24/7 to answer all your agriculture-related questions.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_3fr] gap-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sample Questions</CardTitle>
                  <CardDescription>
                    Try asking our AI assistant about these topics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left hover:bg-primary/5"
                      onClick={() => sendMessage(question)}
                    >
                      <CircleHelp className="h-4 w-4 mr-2 text-primary" />
                      <span className="truncate">{question}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Zap className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Farming Knowledge</h4>
                      <p className="text-sm text-muted-foreground">Expert advice on all aspects of agriculture</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">24/7 Assistance</h4>
                      <p className="text-sm text-muted-foreground">Instant answers to your farming questions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Leaf className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Crop Guidance</h4>
                      <p className="text-sm text-muted-foreground">Detailed information on crop management</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FileText className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Scheme Information</h4>
                      <p className="text-sm text-muted-foreground">Updates on government subsidies and programs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="h-[70vh] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-primary" />
                  Farming Assistant
                </CardTitle>
                <CardDescription>
                  Ask any question related to farming, crops, weather, or government schemes.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto pb-0">
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                          <Avatar className={message.sender === 'user' ? 'bg-primary/10' : 'bg-secondary'}>
                            <AvatarFallback>
                              {message.sender === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`rounded-lg p-3 ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <p className="text-sm">{message.text}</p>
                            <span className={`text-xs mt-1 block ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                              {formatTimestamp(message.timestamp)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex gap-3 max-w-[80%]">
                          <Avatar className="bg-secondary">
                            <AvatarFallback>
                              <Bot className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="rounded-lg p-3 bg-muted flex items-center">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <form 
                  className="flex w-full items-center space-x-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                >
                  <Input
                    placeholder="Type your question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto mt-16">
            <Card>
              <CardHeader>
                <CardTitle>Navigate to Other Features</CardTitle>
                <CardDescription>Our AI assistant can guide you to other sections of AgriThirai for more specific information.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-between h-auto py-3">
                    <div className="flex items-center">
                      <Bot className="h-5 w-5 mr-2 text-primary" />
                      <span>Weather Forecasts</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="justify-between h-auto py-3">
                    <div className="flex items-center">
                      <Bot className="h-5 w-5 mr-2 text-primary" />
                      <span>Government Schemes</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="justify-between h-auto py-3">
                    <div className="flex items-center">
                      <Bot className="h-5 w-5 mr-2 text-primary" />
                      <span>Crop Information</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="justify-between h-auto py-3">
                    <div className="flex items-center">
                      <Bot className="h-5 w-5 mr-2 text-primary" />
                      <span>Market Prices</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AIAssistant;
