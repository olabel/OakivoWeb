import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Bot, Minus, Phone, Mail, Check, 
  Loader2, Calendar, Sparkles, RefreshCw, ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const QUICK_STARTERS_EN = [
  "How do you automate invoicing & quote-to-cash?",
  "Can you replace our outdated ERP spreadsheets?",
  "What makes your web design high-converting?",
  "How do I schedule a free discovery call?"
];

const QUICK_STARTERS_FR = [
  "Comment automatisez-vous la facturation et les devis ?",
  "Pouvez-vous remplacer nos tableurs ERP obsolètes ?",
  "Qu’est-ce qui rend vos sites web performants ?",
  "Comment réserver un appel de découverte gratuit ?"
];

const LiveChat: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const isFr = language === 'fr';

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  
  // Callback Request State
  const [showCallbackMode, setShowCallbackMode] = useState(false);
  const [callbackContact, setCallbackContact] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [isSubmittingCallback, setIsSubmittingCallback] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'init-1',
        type: 'bot',
        content: isFr
          ? "Bonjour et bienvenue chez Oakivo ! Nous concevons des logiciels de gestion modernes, automatisons vos flux opérationnels et concevons des sites web à haute conversion au Canada. Comment pouvons-nous vous aider aujourd'hui ?"
          : "Hello and welcome to Oakivo! We build clean business software, automate the daily workflow grind, and design high-converting websites. How can our founders help you today?",
        timestamp: new Date()
      }]);
    }
  }, [isFr]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, isTyping, showCallbackMode]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    // Check for email or phone lead capture
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = text.match(/(?:\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/);
    
    if (emailMatch || phoneMatch) {
      try {
        const capturedLead = {
          email: emailMatch ? emailMatch[0] : '',
          phone: phoneMatch ? phoneMatch[0] : '',
          chatSnippet: text,
          source: 'Live Chat Lead Detection',
          timestamp: new Date().toISOString()
        };
        db.saveEntry('lead', capturedLead);

        // Notify executive team
        fetch('/api/notify-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'lead',
            entryId: 'CHAT-' + Date.now(),
            data: capturedLead
          })
        }).catch(() => {});
      } catch (e) {
        console.warn('Lead capture exception:', e);
      }
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].slice(-10),
          language: language
        })
      });

      if (!response.ok) {
        throw new Error('Chat service temporarily unavailable');
      }

      const data = await response.json();
      const botReply = data.reply || (isFr 
        ? "Merci pour votre message ! Pour une étude approfondie de vos besoins, nous vous invitons à planifier un appel de découverte gratuit de 30 minutes avec nos associés fondateurs."
        : "Thank you for reaching out! For a tailored review of your operations, we invite you to book a free 30-minute discovery call directly with our senior founders.");

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          type: 'bot',
          content: botReply,
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      console.warn('Chat API error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          type: 'bot',
          content: isFr
            ? "Notre service de messagerie instantanée rencontre une forte demande. N'hésitez pas à nous envoyer un courriel directement à hello@oakivo.com ou à réserver un créneau sur notre calendrier."
            : "Our live advisor is currently experiencing high volume. You can reach our founders directly at hello@oakivo.com, or schedule a free 30-minute discovery on our calendar.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackContact.trim()) return;

    setIsSubmittingCallback(true);
    try {
      await db.saveEntry('lead', {
        contact: callbackContact,
        source: 'Live Chat Quick Callback Request',
        timestamp: new Date().toISOString()
      });

      // Dispatch alert to hello@oakivo.com & olabel@gmail.com
      fetch('/api/notify-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'lead',
          entryId: 'CALLBACK-' + Date.now(),
          data: {
            Type: 'Instant Callback Request',
            Contact: callbackContact,
            Source: 'Live Chat Widget'
          }
        })
      }).catch(() => {});

      setCallbackSubmitted(true);
      setTimeout(() => {
        setCallbackSubmitted(false);
        setShowCallbackMode(false);
        setCallbackContact('');
      }, 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingCallback(false);
    }
  };

  const handleResetChat = () => {
    setMessages([{
      id: `reset-${Date.now()}`,
      type: 'bot',
      content: isFr
        ? "Conversation réinitialisée. Comment pouvons-nous vous aider aujourd'hui ?"
        : "Conversation refreshed. How can our founders assist you today?",
      timestamp: new Date()
    }]);
  };

  const quickStarters = isFr ? QUICK_STARTERS_FR : QUICK_STARTERS_EN;

  return (
    <div className="fixed bottom-6 right-6 z-[80] font-sans antialiased">
      
      {/* 1. Floating Launch Trigger Button (When Closed) */}
      {!isOpen && (
        <motion.button
          onClick={handleOpen}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isFr ? "Ouvrir le chat en direct" : "Open live chat with founders"}
          className="group flex items-center gap-3 bg-[#0A0E17] hover:bg-[#0F1726] text-white border border-white/[0.12] hover:border-cyan-400/50 px-4 py-3 rounded-full shadow-2xl transition-all cursor-pointer"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-mono font-medium text-slate-200">
            {isFr ? 'Discussion Directe' : 'Chat with Founders'}
          </span>
          <MessageSquare size={16} className="text-cyan-400 group-hover:rotate-6 transition-transform" />
        </motion.button>
      )}

      {/* 2. Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`w-[92vw] sm:w-[380px] bg-[#090D16]/98 backdrop-blur-2xl border border-white/[0.12] rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col transition-all ${
              isMinimized ? 'h-16' : 'h-[520px] max-h-[82vh]'
            }`}
          >
            {/* Header */}
            <div className="bg-[#05080E] border-b border-white/[0.08] px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white tracking-tight">Oakivo Direct</span>
                    <span className="text-[10px] font-mono text-cyan-400">AST</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block -mt-0.5">
                    {isFr ? 'Fondateurs en direct · Dieppe, N.-B.' : 'Senior Founders · Dieppe, NB'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-400">
                {/* Language Switch */}
                <button
                  onClick={() => setLanguage(isFr ? 'en' : 'fr')}
                  title="Switch Language"
                  className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 hover:text-cyan-400 hover:bg-white/[0.05] transition-colors cursor-pointer"
                >
                  {isFr ? 'EN' : 'FR'}
                </button>

                {/* Reset History */}
                <button
                  onClick={handleResetChat}
                  title="Reset Chat"
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
                >
                  <RefreshCw size={13} />
                </button>

                {/* Minimize */}
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? "Expand" : "Minimize"}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
                >
                  <Minus size={14} />
                </button>

                {/* Close */}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Main Chat Body (When Not Minimized) */}
            {!isMinimized && (
              <>
                {/* Callback Mode Drawer (Optional) */}
                {showCallbackMode ? (
                  <div className="p-4 bg-slate-900/60 border-b border-white/[0.08] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Phone size={13} className="text-cyan-400" />
                        {isFr ? 'Demande de rappel téléphonique' : 'Request Founder Callback'}
                      </span>
                      <button
                        onClick={() => setShowCallbackMode(false)}
                        className="text-[11px] text-slate-400 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    {callbackSubmitted ? (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                        <Check size={14} />
                        <span>{isFr ? 'Rappel demandé ! Nous vous contactons sous peu.' : 'Callback request logged! We will call you shortly.'}</span>
                      </div>
                    ) : (
                      <form onSubmit={handleCallbackSubmit} className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={callbackContact}
                          onChange={(e) => setCallbackContact(e.target.value)}
                          placeholder={isFr ? "Votre numéro ou courriel..." : "Your phone or work email..."}
                          className="flex-1 bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                        <button
                          type="submit"
                          disabled={isSubmittingCallback}
                          className="px-3 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
                        >
                          {isSubmittingCallback ? <Loader2 size={13} className="animate-spin" /> : "Request"}
                        </button>
                      </form>
                    )}
                  </div>
                ) : null}

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
                  {messages.map((msg) => {
                    const isBot = msg.type === 'bot';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end justify-end'}`}
                      >
                        {isBot && (
                          <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                            <Bot size={13} className="text-cyan-400" />
                          </div>
                        )}

                        <div
                          className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                            isBot
                              ? 'bg-slate-900/80 border border-white/[0.08] text-slate-200'
                              : 'bg-cyan-500 text-slate-950 font-medium rounded-br-none shadow-sm'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                          <span
                            className={`text-[9px] block text-right mt-1 font-mono ${
                              isBot ? 'text-slate-500' : 'text-slate-900/70'
                            }`}
                          >
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                        <Bot size={13} className="text-cyan-400" />
                      </div>
                      <div className="bg-slate-900/80 border border-white/[0.08] px-3.5 py-2 rounded-2xl flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  )}

                  {/* Quick Starter Suggestions (Only when conversation is fresh) */}
                  {messages.length <= 2 && !isTyping && (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">
                        {isFr ? 'Questions fréquentes :' : 'Common inquiries:'}
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {quickStarters.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(q)}
                            className="text-left text-[11px] p-2 rounded-xl bg-slate-900/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/[0.06] transition-colors cursor-pointer flex items-center justify-between"
                          >
                            <span>{q}</span>
                            <ArrowRight size={11} className="text-cyan-400 shrink-0 ml-1.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Action Strip: Quick Calendar or Callback trigger */}
                <div className="px-3 py-1.5 bg-[#05080E] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                  <button
                    onClick={() => setShowCallbackMode(!showCallbackMode)}
                    className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Phone size={11} />
                    <span>{isFr ? 'Demander un rappel' : 'Request Callback'}</span>
                  </button>

                  <Link
                    to="/booking"
                    onClick={() => setIsOpen(false)}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold transition-colors"
                  >
                    <Calendar size={11} />
                    <span>{isFr ? 'Prendre RDV (30m)' : 'Book 30-Min Call'}</span>
                  </Link>
                </div>

                {/* Input Box */}
                <div className="p-3 bg-[#070A10] border-t border-white/[0.08] flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isFr ? "Écrivez votre message aux fondateurs..." : "Ask our founders anything..."}
                    className="flex-1 bg-slate-900/80 border border-white/[0.1] focus:border-cyan-400/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 font-bold transition-all cursor-pointer shrink-0"
                    aria-label="Send message"
                  >
                    <Send size={13} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveChat;
