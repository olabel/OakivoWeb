import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { X, Loader2, Sparkles, ArrowRight, ShieldCheck, ExternalLink, Brain, Bot, HelpCircle, ChevronRight, Mail, User, Building, Send, CheckCircle } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', company: '' });
  const [leadStatus, setLeadStatus] = useState<'idle' | 'success'>('idle');
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasUserMessages = messages.some(m => m.role === 'user');
    if (!hasUserMessages) {
      setMessages([{ 
        role: 'model', 
        text: language === 'en' 
          ? 'Welcome to the Oakivo Intelligence Portal. I am your strategic AI assistant. I can help with Odoo 18 ROI modeling, AI Automation architecture, and Cybersecurity readiness. How can I guide your transformation today?' 
          : 'Bienvenue sur le portail d\'intelligence Oakivo. Je suis votre assistant stratégique IA. Je peux vous aider avec la modélisation du ROI d\'Odoo 18, l\'architecture d\'automatisation IA et la cybersécurité. Comment puis-je vous guider aujourd\'hui ?' 
      }]);
    }
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, showLeadForm]);

  const handleSend = async (overrideInput?: string) => {
    const messageToSend = overrideInput || input.trim();
    if (!messageToSend || isTyping) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-3-flash-preview';
      
      const response = await ai.models.generateContent({
        model,
        contents: [...messages, { role: 'user', text: messageToSend }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          thinkingConfig: { thinkingBudget: 24576 },
          systemInstruction: `You are the expert Strategic AI for Oakivo Solutions Inc.
          Oakivo: Dieppe, NB based digital transformation leader.
          
          PRIMARY MISSION: Help users understand Odoo 18 ROI, AI Automation (Agentic Workflows), and Zero-Trust Cybersecurity.
          LANGUAGE: Respond in ${language === 'en' ? 'English' : 'French'}.
          
          STRATEGIC TONE: Authoritative, expert, yet approachable. Mention "The Oakivo Standard" (Audit, Architect, Implement, Scale).
          
          If the user asks for pricing or complex consultation, suggest they "Talk to a Human Architect" using the feature in this chat window.`,
        },
      });

      const text = response.text || "I encountered a processing error. Please contact our human architects at hello@oakivo.com.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Service temporarily restricted. Please contact hello@oakivo.com." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveEntry('lead', { ...leadForm, source: 'Chatbot Follow-up' });
    setLeadStatus('success');
    setTimeout(() => {
      setShowLeadForm(false);
      setLeadStatus('idle');
      setLeadForm({ name: '', email: '', company: '' });
      setMessages(prev => [...prev, { role: 'model', text: language === 'en' ? 'Thank you. A senior human architect will contact you within 24 hours regarding your complex inquiry.' : 'Merci. Un architecte humain senior vous contactera sous 24 heures concernant votre demande complexe.' }]);
    }, 2000);
  };

  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, idx) => {
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-oakivo-primary">$1</strong>');
      if (line.trim().startsWith('### ')) return <h3 key={idx} className="text-lg font-bold text-oakivo-primary mt-6 mb-2" dangerouslySetInnerHTML={{ __html: processed.substring(4) }} />;
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) return <div key={idx} className="flex gap-2 ml-2 mb-1"><ChevronRight size={14} className="text-oakivo-secondary mt-1 shrink-0" /><span dangerouslySetInnerHTML={{ __html: processed.substring(2) }} /></div>;
      return <p key={idx} className="mb-2" dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-4xl transition-all duration-500 transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-white text-oakivo-primary rotate-90' : 'bg-oakivo-primary text-white'}`}
        aria-label="Toggle Assistant"
      >
        {isOpen ? <X size={28} /> : <Bot size={28} />}
      </button>

      <div className={`absolute bottom-24 right-0 w-[450px] max-w-[90vw] h-[650px] bg-white rounded-[32px] shadow-4xl border border-gray-100 flex flex-col transition-all duration-500 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 pointer-events-none translate-y-10'}`}>
        
        {/* Header */}
        <div className="p-6 bg-oakivo-primary text-white rounded-t-[32px] flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                 <Logo className="w-6 h-6" withText={false} light={true} />
              </div>
              <div>
                <h3 className="font-bold">Oakivo Intelligence</h3>
                <span className="text-[10px] text-oakivo-secondary font-bold uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-oakivo-secondary animate-pulse"></span> Engine Online
                </span>
              </div>
           </div>
           <button onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest">
              {language.toUpperCase()}
           </button>
        </div>

        {/* Security Bar */}
        <div className="bg-oakivo-surface px-6 py-2 border-b border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
           <div className="flex items-center gap-2"><ShieldCheck size={12} className="text-oakivo-secondary" /> SOC2 COMPLIANT</div>
           <div className="flex items-center gap-2"><HelpCircle size={12} /> AI CORE v4.2</div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-gray-50/30">
           {messages.map((msg, i) => (
             <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-oakivo-primary text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'}`}>
                   {msg.role === 'model' ? renderMarkdown(msg.text) : msg.text}
                </div>
             </div>
           ))}
           {isTyping && (
             <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-gray-100 flex items-center gap-3 shadow-sm">
                   <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-oakivo-secondary rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-oakivo-secondary rounded-full animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-oakivo-secondary rounded-full animate-bounce delay-150"></div>
                   </div>
                   <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Architecting Response...</span>
                </div>
             </div>
           )}

           {showLeadForm && (
             <div className="bg-white p-6 rounded-2xl border border-oakivo-secondary/30 shadow-xl animate-in slide-in-from-bottom-4">
                {leadStatus === 'success' ? (
                   <div className="text-center py-4">
                      <CheckCircle className="mx-auto text-oakivo-secondary mb-4" size={40} />
                      <h4 className="font-bold text-oakivo-primary">Inquiry Logged</h4>
                      <p className="text-xs text-gray-500">Redirecting to chat...</p>
                   </div>
                ) : (
                   <form onSubmit={handleLeadSubmit} className="space-y-4">
                      <h4 className="font-bold text-sm text-oakivo-primary uppercase tracking-widest border-b border-gray-100 pb-2 flex items-center gap-2">
                        <User size={14} className="text-oakivo-secondary" /> Request Human Follow-up
                      </h4>
                      <div>
                        <input 
                          type="text" required placeholder="Full Name" 
                          value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})}
                          className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs focus:outline-none focus:border-oakivo-primary" 
                        />
                      </div>
                      <div>
                        <input 
                          type="email" required placeholder="Work Email" 
                          value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})}
                          className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs focus:outline-none focus:border-oakivo-primary" 
                        />
                      </div>
                      <button type="submit" className="w-full bg-oakivo-primary text-white p-3 rounded-xl text-xs font-bold hover:bg-black transition-all flex items-center justify-center gap-2">
                        <Send size={14} /> Send to Engineering Hub
                      </button>
                      <button type="button" onClick={() => setShowLeadForm(false)} className="w-full text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-red-500 transition-all">
                        Back to AI Chat
                      </button>
                   </form>
                )}
             </div>
           )}
        </div>

        {/* Action Tray */}
        <div className="p-6 border-t border-gray-100 bg-white rounded-b-[32px]">
           {!isTyping && !showLeadForm && (
             <div className="flex flex-wrap gap-2 mb-4">
                {language === 'en' ? (
                  <>
                    <button onClick={() => handleSend("Tell me about Odoo 18 ROI")} className="text-[10px] font-bold border border-gray-100 px-3 py-1.5 rounded-lg hover:border-oakivo-secondary hover:text-oakivo-secondary transition-all">Odoo 18 ROI</button>
                    <button onClick={() => handleSend("Explain AI Automation")} className="text-[10px] font-bold border border-gray-100 px-3 py-1.5 rounded-lg hover:border-oakivo-secondary hover:text-oakivo-secondary transition-all">AI Automation</button>
                    <button onClick={() => setShowLeadForm(true)} className="text-[10px] font-bold bg-oakivo-secondary/10 border border-oakivo-secondary/20 text-oakivo-secondary px-3 py-1.5 rounded-lg hover:bg-oakivo-secondary hover:text-white transition-all">Talk to a Human</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleSend("Parlez-moi du ROI d'Odoo 18")} className="text-[10px] font-bold border border-gray-100 px-3 py-1.5 rounded-lg hover:border-oakivo-secondary hover:text-oakivo-secondary transition-all">ROI Odoo 18</button>
                    <button onClick={() => handleSend("Expliquer l'automatisation IA")} className="text-[10px] font-bold border border-gray-100 px-3 py-1.5 rounded-lg hover:border-oakivo-secondary hover:text-oakivo-secondary transition-all">IA Automation</button>
                    <button onClick={() => setShowLeadForm(true)} className="text-[10px] font-bold bg-oakivo-secondary/10 border border-oakivo-secondary/20 text-oakivo-secondary px-3 py-1.5 rounded-lg hover:bg-oakivo-secondary hover:text-white transition-all">Parler à un humain</button>
                  </>
                )}
             </div>
           )}
           <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'en' ? "Ask about Odoo, AI, or Security..." : "Posez une question sur Odoo, l'IA..."}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-5 pr-14 text-sm focus:outline-none focus:border-oakivo-primary focus:bg-white transition-all"
                disabled={showLeadForm}
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping || showLeadForm}
                className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-oakivo-primary text-white rounded-xl flex items-center justify-center hover:bg-black transition-all disabled:opacity-50"
              >
                <ArrowRight size={20} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;