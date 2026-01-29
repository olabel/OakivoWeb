import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { X, Loader2, Sparkles, ArrowRight, ShieldCheck, HelpCircle, ChevronRight, Mail, User, Send, CheckCircle, Bot, BrainCircuit } from 'lucide-react';
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
          ? 'Welcome to the Oakivo Strategy Portal. I am your specialized AI Assistant for digital transformation. I can provide insights into Odoo 18 ROI, Agentic AI Orchestration, and Zero-Trust resilience. How may I assist your enterprise today?' 
          : 'Bienvenue sur le Portail Stratégique Oakivo. Je suis votre assistant IA spécialisé dans la transformation numérique. Je peux vous éclairer sur le ROI d\'Odoo 18, l\'IA Agente et la résilience Zero-Trust. Comment puis-je aider votre entreprise aujourd\'hui ?' 
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
      const modelName = 'gemini-3-flash-preview';
      
      const response = await ai.models.generateContent({
        model: modelName,
        contents: [...messages, { role: 'user', text: messageToSend }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          thinkingConfig: { thinkingBudget: 16000 },
          systemInstruction: `You are the "Oakivo Strategic Intelligence", the official AI representative for Oakivo Solutions Inc.
          HQ: Dieppe, New Brunswick, Canada.
          MISSION: Guide users through digital transformation with Odoo 18, Agentic AI, and Cybersecurity.
          TONE: Professional, sophisticated, architectural, and helpful. Use terms like "Strategic Orchestration", "Operational Telemetry", and "Zero-Trust Framework".
          
          RULES:
          - Respond in ${language === 'en' ? 'English' : 'French'}.
          - If the user has complex business logic needs, encourage them to "Talk to a Human Architect" via the in-chat form.
          - Promote "The Oakivo Standard": Audit, Architect, Implement, Scale.
          - Be concise but high-impact.`,
        },
      });

      const text = response.text || "Operational error. Reverting to technical failover. Please contact hello@oakivo.com.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Gemini Orchestration Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: language === 'en' ? "Secure gateway timeout. Please retry or contact our engineering hub directly." : "Délai d'attente dépassé. Veuillez réessayer ou contacter notre centre d'ingénierie directement." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveEntry('lead', { ...leadForm, source: 'Human Handoff (AI Chat)' });
    setLeadStatus('success');
    setTimeout(() => {
      setShowLeadForm(false);
      setLeadStatus('idle');
      setLeadForm({ name: '', email: '', company: '' });
      setMessages(prev => [...prev, { role: 'model', text: language === 'en' ? 'Request captured in our Strategy Vault. A human engineering lead will reach out within 24 hours.' : 'Demande enregistrée dans notre coffre-fort. Un ingénieur humain vous contactera sous 24 heures.' }]);
    }, 2000);
  };

  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, idx) => {
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-oakivo-primary">$1</strong>');
      if (line.trim().startsWith('### ')) return <h3 key={idx} className="text-lg font-bold text-oakivo-primary mt-6 mb-2 font-serif-display" dangerouslySetInnerHTML={{ __html: processed.substring(4) }} />;
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) return <div key={idx} className="flex gap-2 ml-2 mb-2"><ChevronRight size={14} className="text-oakivo-secondary mt-1 shrink-0" /><span className="text-gray-700" dangerouslySetInnerHTML={{ __html: processed.substring(2) }} /></div>;
      return <p key={idx} className="mb-2 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-18 h-18 rounded-full flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-700 transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-white text-oakivo-primary rotate-90' : 'bg-oakivo-primary text-white'}`}
      >
        {isOpen ? <X size={32} /> : <BrainCircuit size={32} />}
      </button>

      <div className={`absolute bottom-24 right-0 w-[450px] max-w-[92vw] h-[700px] bg-white rounded-[40px] shadow-4xl border border-gray-100 flex flex-col transition-all duration-700 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 pointer-events-none translate-y-12'}`}>
        
        {/* Header */}
        <div className="p-8 bg-oakivo-primary text-white rounded-t-[40px] flex items-center justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-5 text-oakivo-secondary">
              <BrainCircuit size={120} />
           </div>
           <div className="flex items-center gap-5 relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                 <Logo className="w-7 h-7" withText={false} light={true} />
              </div>
              <div>
                <h3 className="font-bold text-xl tracking-tight">Oakivo Strategy</h3>
                <span className="text-[9px] text-oakivo-secondary font-black uppercase tracking-[0.25em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-oakivo-secondary animate-pulse"></span> Intelligence Online
                </span>
              </div>
           </div>
           <button onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest relative z-10 border border-white/10">
              {language.toUpperCase()}
           </button>
        </div>

        {/* Audit Compliance */}
        <div className="bg-oakivo-surface px-8 py-3 border-b border-gray-100 flex items-center justify-between text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">
           <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-oakivo-secondary" /> SOC2 COMPLIANT HUB</div>
           <div className="flex items-center gap-2"><HelpCircle size={14} /> AI v5.0 ORCHESTRATOR</div>
        </div>

        {/* Chat Feed */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-8 bg-gray-50/20 scroll-smooth">
           {messages.map((msg, i) => (
             <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-6 rounded-3xl text-[15px] leading-relaxed shadow-sm transition-all hover:shadow-md ${msg.role === 'user' ? 'bg-oakivo-primary text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'}`}>
                   {msg.role === 'model' ? renderMarkdown(msg.text) : msg.text}
                </div>
             </div>
           ))}
           {isTyping && (
             <div className="flex justify-start animate-in fade-in slide-in-from-left-4">
                <div className="bg-white p-6 rounded-3xl rounded-bl-none border border-gray-100 flex items-center gap-4 shadow-sm">
                   <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-oakivo-secondary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-oakivo-secondary rounded-full animate-bounce [animation-delay:150ms]"></div>
                      <div className="w-2 h-2 bg-oakivo-secondary rounded-full animate-bounce [animation-delay:300ms]"></div>
                   </div>
                   <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Processing Logic...</span>
                </div>
             </div>
           )}

           {showLeadForm && (
             <div className="bg-white p-8 rounded-3xl border border-oakivo-secondary/40 shadow-2xl animate-in slide-in-from-bottom-8 duration-700">
                {leadStatus === 'success' ? (
                   <div className="text-center py-6">
                      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-oakivo-secondary">
                        <CheckCircle size={48} />
                      </div>
                      <h4 className="font-bold text-xl text-oakivo-primary mb-2">Handoff Scheduled</h4>
                      <p className="text-xs text-gray-500 font-light">Redirecting back to intelligence stream...</p>
                   </div>
                ) : (
                   <form onSubmit={handleLeadSubmit} className="space-y-6">
                      <h4 className="font-bold text-sm text-oakivo-primary uppercase tracking-[0.2em] border-b border-gray-100 pb-4 flex items-center gap-3">
                        <User size={18} className="text-oakivo-secondary" /> Human Consultant Handoff
                      </h4>
                      <div className="space-y-4">
                        <input 
                          type="text" required placeholder="Full Name" 
                          value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})}
                          className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl text-sm focus:outline-none focus:border-oakivo-primary focus:bg-white transition-all" 
                        />
                        <input 
                          type="email" required placeholder="Professional Email" 
                          value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})}
                          className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl text-sm focus:outline-none focus:border-oakivo-primary focus:bg-white transition-all" 
                        />
                      </div>
                      <button type="submit" className="w-full bg-oakivo-primary text-white py-4 rounded-2xl text-sm font-bold hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl">
                        <Send size={18} /> Initiate Human Audit
                      </button>
                      <button type="button" onClick={() => setShowLeadForm(false)} className="w-full text-[10px] text-gray-400 font-black uppercase tracking-widest hover:text-oakivo-primary transition-all">
                        Resume AI Interaction
                      </button>
                   </form>
                )}
             </div>
           )}
        </div>

        {/* Input Matrix */}
        <div className="p-8 border-t border-gray-100 bg-white rounded-b-[40px]">
           {!isTyping && !showLeadForm && (
             <div className="flex flex-wrap gap-2 mb-6">
                {language === 'en' ? (
                  <>
                    <button onClick={() => handleSend("Explain Odoo 18 ROI")} className="text-[10px] font-black border border-gray-100 px-4 py-2 rounded-xl hover:border-oakivo-secondary hover:text-oakivo-secondary transition-all uppercase tracking-widest">Odoo 18 ROI</button>
                    <button onClick={() => handleSend("Agentic AI Strategy")} className="text-[10px] font-black border border-gray-100 px-4 py-2 rounded-xl hover:border-oakivo-secondary hover:text-oakivo-secondary transition-all uppercase tracking-widest">Agentic AI</button>
                    <button onClick={() => setShowLeadForm(true)} className="text-[10px] font-black bg-oakivo-secondary/10 border border-oakivo-secondary/30 text-oakivo-secondary px-4 py-2 rounded-xl hover:bg-oakivo-secondary hover:text-white transition-all uppercase tracking-widest">Request Human</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleSend("ROI d'Odoo 18")} className="text-[10px] font-black border border-gray-100 px-4 py-2 rounded-xl hover:border-oakivo-secondary hover:text-oakivo-secondary transition-all uppercase tracking-widest">ROI Odoo 18</button>
                    <button onClick={() => handleSend("Stratégie d'IA Agente")} className="text-[10px] font-black border border-gray-100 px-4 py-2 rounded-xl hover:border-oakivo-secondary hover:text-oakivo-secondary transition-all uppercase tracking-widest">IA Agente</button>
                    <button onClick={() => setShowLeadForm(true)} className="text-[10px] font-black bg-oakivo-secondary/10 border border-oakivo-secondary/30 text-oakivo-secondary px-4 py-2 rounded-xl hover:bg-oakivo-secondary hover:text-white transition-all uppercase tracking-widest">Expert Humain</button>
                  </>
                )}
             </div>
           )}
           <div className="relative group">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'en' ? "Query our Strategic Hub..." : "Questionnez notre Hub..."}
                className="w-full bg-gray-50 border border-gray-200 rounded-3xl py-5 pl-7 pr-16 text-[15px] focus:outline-none focus:border-oakivo-primary focus:bg-white focus:shadow-inner transition-all duration-500"
                disabled={showLeadForm}
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping || showLeadForm}
                className="absolute right-3 top-3 bottom-3 w-12 h-12 bg-oakivo-primary text-white rounded-2xl flex items-center justify-center hover:bg-black transition-all disabled:opacity-30 shadow-lg"
              >
                <ArrowRight size={24} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;