import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Sparkles, Minus, Phone, Mail, Check, Loader2, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../utils/database';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const LiveChat: React.FC = () => {
  const { t, language } = useLanguage();
  const isFr = language === 'fr';
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Quick Callback Request State
  const [showCallbackInput, setShowCallbackInput] = useState(false);
  const [callbackContact, setCallbackContact] = useState('');
  const [isSubmittingCallback, setIsSubmittingCallback] = useState(false);
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize and update greeting when language changes
  useEffect(() => {
    if (messages.length <= 1) {
      setMessages([{
        id: '1',
        type: 'bot',
        content: t('chatbot.greeting') || (isFr 
          ? "Bonjour et bienvenue chez Oakivo ! Nous concevons des logiciels de gestion clairs, automatisons les tâches répétitives, créons des sites web mémorables et sécurisons vos données au Canada. Comment pouvons-nous vous aider aujourd'hui ?"
          : "Hello! Welcome to Oakivo. We build clean business software, automate the everyday grind, design custom websites, and keep cloud data secure on Canadian soil. How can we help you today?"),
        timestamp: new Date(),
      }]);
    }
  }, [language, t, isFr]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, isTyping, showCallbackInput]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;

    const trimmed = text.trim();

    // Silent lead capture if user included an email in their message
    const emailMatch = trimmed.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      try {
        db.saveEntry('lead', {
          email: emailMatch[0],
          chatContent: trimmed,
          source: 'Live Chat In-Message Lead Capture',
          capturedAt: new Date().toISOString()
        });
      } catch (e) {
        console.warn('Chat lead save error:', e);
      }
    }

    const newUserMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Call our secure backend API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: [...messages, newUserMsg].slice(-10), // Send up to last 10 messages for context
          language: language
        }),
      });

      const data = await response.json();
      
      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.reply || (isFr 
          ? "Je vous invite à échanger directement avec nos fondateurs à Dieppe. Vous pouvez réserver un appel découverte de 30 minutes ci-dessous."
          : "Feel free to speak directly with our senior founders in Dieppe, NB. You can book a free 30-minute discovery call below or leave your email for a callback."),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newBotMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: isFr
          ? "Notre équipe d'ingénieurs à Dieppe est à votre disposition par courriel à hello@oakivo.com ou via le bouton ci-dessous."
          : "Our senior engineering team in Dieppe is available directly at hello@oakivo.com or via the booking button below.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackContact.trim()) return;

    setIsSubmittingCallback(true);
    try {
      await db.saveEntry('lead', {
        contact: callbackContact.trim(),
        email: callbackContact.includes('@') ? callbackContact.trim() : undefined,
        phone: !callbackContact.includes('@') ? callbackContact.trim() : undefined,
        chatTranscript: messages.map(m => `${m.type === 'user' ? 'Client' : 'Oakivo'}: ${m.content}`).join('\n'),
        source: 'Live Chat Direct Callback Request',
        submittedAt: new Date().toISOString()
      });

      setCallbackSubmitted(true);
      setShowCallbackInput(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'bot',
          content: isFr
            ? `Merci ! Nos fondateurs seniors basés à Dieppe (N.-B.) ont bien reçu votre demande (${callbackContact}). Nous vous contacterons sous 24h.`
            : `Thank you! Our senior partners in Dieppe, NB have received your details (${callbackContact}). We will review your questions and reach out within 24 hours.`,
          timestamp: new Date()
        }
      ]);
      toast.success(isFr ? 'Demande de rappel transmise !' : 'Founder Callback Dispatched');
    } catch (err) {
      console.error("Failed to save callback request:", err);
      toast.error(isFr ? "Erreur lors de l'enregistrement" : "Could not save request. Please email hello@oakivo.com.");
    } finally {
      setIsSubmittingCallback(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickPrompts = Array.isArray(t('chatbot.quick_prompts')) ? t('chatbot.quick_prompts') as unknown as string[] : [];

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open Oakivo Live Chat"
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-cyan-500 text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:bg-cyan-400 transition-colors flex items-center justify-center cursor-pointer"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '520px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 w-full max-w-[370px] bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/70">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 text-sm">Oakivo Concierge</h3>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                    <span>Dieppe, NB (AST) • Senior Founders Active</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  aria-label="Minimize chat"
                  className="p-1.5 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                >
                  <Minus size={16} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="p-1.5 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                        msg.type === 'user' 
                          ? 'bg-slate-800 text-slate-300' 
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      }`}>
                        {msg.type === 'user' ? <User size={14} /> : <Bot size={14} />}
                      </div>
                      
                      <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                        <div className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm leading-relaxed ${
                          msg.type === 'user' 
                            ? 'bg-cyan-600 text-white rounded-tr-sm' 
                            : 'bg-slate-800 text-slate-200 rounded-tl-sm'
                        }`}>
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 px-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {messages.length === 1 && quickPrompts.length > 0 && (
                    <div className="flex flex-col gap-2 mt-4 items-end pr-11">
                      {quickPrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(prompt)}
                          className="text-xs text-left px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/20 rounded-xl transition-colors cursor-pointer"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Optional Inline Callback Request Form */}
                  {showCallbackInput && (
                    <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-2">
                      <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold">
                        <span>{isFr ? 'Demande de rappel par les fondateurs :' : 'Request Senior Partner Callback:'}</span>
                        <button 
                          onClick={() => setShowCallbackInput(false)}
                          className="text-slate-500 hover:text-white"
                        >
                          <X size={12} />
                        </button>
                      </div>
                      <form onSubmit={handleCallbackSubmit} className="space-y-2">
                        <input
                          type="text"
                          required
                          value={callbackContact}
                          onChange={(e) => setCallbackContact(e.target.value)}
                          placeholder={isFr ? "Courriel ou téléphone" : "Work email or phone"}
                          className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
                        />
                        <button
                          type="submit"
                          disabled={isSubmittingCallback}
                          className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                        >
                          {isSubmittingCallback ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <Check size={13} />
                          )}
                          <span>{isFr ? 'Confirmer la demande' : 'Submit Callback Request'}</span>
                        </button>
                      </form>
                    </div>
                  )}

                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Bot size={14} />
                      </div>
                      <div className="px-4 py-3 bg-slate-800 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Action Discovery & Callback Toolbar */}
                <div className="px-3 py-2 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between text-[11px] gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCallbackInput(!showCallbackInput)}
                    className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Mail size={12} className="text-cyan-400" />
                    <span>{isFr ? 'Demander un rappel' : 'Request Callback'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      window.dispatchEvent(new CustomEvent('open-lead-drawer', {
                        detail: {
                          focus: isFr ? 'Discussion en Direct' : 'Live Chat Inquiry',
                          topic: isFr ? 'Session Découverte depuis le clavardage' : 'Discovery from Live Chat'
                        }
                      }));
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 shrink-0 cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <Calendar size={12} />
                    <span>{isFr ? 'Réserver 30 min' : 'Book 30-Min Call'}</span>
                  </button>
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-slate-800 bg-slate-900/40">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t('chatbot.placeholder') || "Type your message..."}
                      className="w-full bg-slate-800 border border-slate-700 text-xs md:text-sm text-slate-200 rounded-full pl-4 pr-12 py-2.5 focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-slate-500"
                    />
                    <button 
                      onClick={() => handleSend()}
                      disabled={!inputValue.trim()}
                      className="absolute right-1 p-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 rounded-full transition-colors cursor-pointer"
                    >
                      <Send size={14} className="translate-x-[1px] translate-y-[1px]" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;

