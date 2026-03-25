import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Vanakkam! Kya haal hai? I'm your DesiWood Assistant. How can I help you today? 🪵", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { text: input, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:5000/api/chatbot', { message: userMsg.text });
      setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Network error! Unable to reach backend magic.", isBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#cf5429] hover:bg-[#9b301a] text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-2xl w-80 sm:w-96 flex flex-col h-[500px] max-h-[80vh] border border-[#f6dfd1] overflow-hidden">
          {/* Header */}
          <div className="bg-[#652518] text-[#fcf1ec] p-4 flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-[#e59d7d]" />
              <h3 className="font-bold">DesiWood AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#fcf1ec] hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#fdf5f1]">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-line ${
                      msg.isBot 
                        ? 'bg-white border border-[#e59d7d] text-[#652518] rounded-tl-none shadow-sm' 
                        : 'bg-[#cf5429] text-white rounded-tr-none shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#e59d7d] text-[#652518] px-4 py-3 rounded-lg rounded-tl-none text-xs flex gap-1 items-center h-10 w-16">
                    <span className="w-1.5 h-1.5 bg-[#cf5429] rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-[#cf5429] rounded-full animate-bounce" style={{ animationDelay: '0.1s'}}></span>
                    <span className="w-1.5 h-1.5 bg-[#cf5429] rounded-full animate-bounce" style={{ animationDelay: '0.2s'}}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#f6dfd1] flex gap-2 w-full box-border">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 px-3 py-2 min-w-0 border border-[#e59d7d] rounded-md focus:outline-none focus:ring-1 focus:ring-[#cf5429] text-sm text-[#652518]"
            />
            <button 
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-[#cf5429] hover:bg-[#9b301a] text-white px-3 py-2 rounded-md transition-colors disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
