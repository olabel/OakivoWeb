import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  X, Loader2, Sparkles, ArrowRight, ShieldCheck, 
  ChevronRight, User, Send, CheckCircle, 
  BrainCircuit, Activity, Terminal, ShieldAlert, 
  Cpu, Database, MessageSquareText, Lightbulb, 
  Wand2, Zap
} from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string, isAction?: boolean}[]>([]);
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
          ? "I am the Oakivo Support Agent. I'm here to help you orchestrate Odoo 18 ecosystems, architect Agentic AI workflows, or audit your industrial cybersecurity. \n\nHow can I help you scale today?" 
          : "Je suis l'agent de support Oakivo. Je suis ici pour vous aider à orchestrer les écosystèmes Odoo 18, concevoir des flux d'IA Agente ou auditer votre cybersécurité industrielle. \n\nComment puis-je vous aider à évoluer aujourd'hui ?" 
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
          systemInstruction: `You are the "Oakivo Strategic Architect", an elite AI concierge for Oakivo Solutions Inc.
          HQ: Dieppe, NB.
          CORE MISSION: Guide users through industrial digital transformation.
          EXPERTISE: Odoo 18 (ERP), Agentic AI (reasoning engines), Zero-Trust Cybersecurity (industrial resilience).
          
          TONE: Institutional, precise, and visionary. 
          
          RULES:
          - If the user asks about pricing, complex bespoke engineering, or scheduling a meeting, provide a brief helpful overview then EXPLICITLY say "This request requires an Architectural Handoff. Would you like to connect with a human lead?".
          - Keep answers concise but high-fidelity. Use bullet points for technical steps.
          - Respond in ${language === 'en' ? 'English' : 'French'}.`,
        },
      });

      const text = response.text || "Transmission failed. Re-initiating handshake...";
      setMessages(prev => [...prev, { role: 'model', text }]);

      // Auto-trigger handoff suggestion if keywords detected
      const keywords = ['price', 'cost', 'hire', 'meeting', 'audit', 'specific', 'quote', 'prix', 'embaucher', 'rendez-vous'];
      if (keywords.some(k => text.toLowerCase().includes(k))) {
         setMessages(prev => [...prev, { role: 'model', text: "Ready for a deep-dive? Request a human architect to get a customized roadmap.", isAction: true }]);
      }

    } catch (error) {
      console.error("Agentic Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Logic gateway timeout. Please refresh or use the contact portal." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const escalationPayload = {
      ...leadForm,
      source: 'Agentic Chat Handoff',
      transcript: messages.map(m => `[${m.role.toUpperCase()}]: ${m.text}`).join('\n\n')
    };
    
    db.saveEntry('lead', escalationPayload);
    setLeadStatus('success');
    
    setTimeout(() => {
      setShowLeadForm(false);
      setLeadStatus('idle');
      setLeadForm({ name: '', email: '', company: '' });
      setMessages(prev => [...prev, { role: 'model', text: language === 'en' ? 'Handoff complete. A human architect has been assigned to your case.' : 'Handoff terminé. Un architecte humain a été affecté à votre dossier.' }]);
    }, 2000);
  };

  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, idx) => {
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) return <div key={idx} className="flex gap-2 ml-2 mb-2"><div className="w-1.5 h-1.5 rounded-full bg-oakivo-secondary mt-2 shrink-0" /><span dangerouslySetInnerHTML={{ __html: processed.substring(2) }} /></div>;
      return <p key={idx} className="mb-2" dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Floating Agent Orb */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-premium transition-all duration-700 transform hover:scale-110 active:scale-95 group relative ${isOpen ? 'bg-white text-oakivo-primary' : 'bg-[#020504] text-white'}`}
      >
        <div className={`absolute inset-0 rounded-full border-2 border-oakivo-secondary/30 ${!isOpen && 'animate-spin-slow'}`} />
        {isOpen ? <X size={32} /> : <Sparkles size={32} className="group-hover:text-oakivo-secondary transition-colors" />}
        {!isOpen && <div className="absolute -top-1 -right-1 w-5 h-5 bg-oakivo-secondary rounded-full border-4 border-white animate-pulse" />}
      </button>

      {/* Chat Window */}
      <div className={`absolute bottom-20 lg:bottom-24 right-0 w-[480px] max-w-[95vw] h-[720px] bg-white rounded-[40px] shadow-vise-xl border border-gray-100 flex flex-col transition-all duration-700 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 pointer-events-none translate-y-10'}`}>
        
        {/* Header: Institutional Grade */}
        <div className="p-8 bg-oakivo-primary text-white rounded-t-[40px] relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-5 text-oakivo-secondary">
              <BrainCircuit size={180} />
           </div>
           <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                    <Logo withText={false} light={true} className="h-7" />
                 </div>
                 <div>
                    <h3 className="font-bold text-lg tracking-tight">Oakivo Agent</h3>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-oakivo-secondary animate-pulse" />
                       <span className="text-[9px] font-black uppercase tracking-[0.3em] text-oakivo-secondary">Orchestrator Online</span>
                    </div>
                 </div>
              </div>
              <button onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest">
                {language}
              </button>
           </div>
        </div>

        {/* System Telemetry */}
        <div className="px-8 py-2.5 bg-oakivo-surface border-b border-gray-100 flex items-center justify-between text-[9px] text-gray-400 font-black uppercase tracking-[0.3em]">
           <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-oakivo-secondary" /> AES-256 SECURED</div>
           <div className="flex items-center gap-3"><Activity size={14} /> Latency: 42ms</div>
        </div>

        {/* Message Interface */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-8 bg-white no-scrollbar scroll-smooth">
           {messages.map((msg, i) => (
             <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-6 rounded-[28px] text-[15px] leading-relaxed transition-all ${
                  msg.role === 'user' 
                    ? 'bg-oakivo-primary text-white rounded-br-none shadow-vise' 
                    : msg.isAction
                      ? 'bg-oakivo-secondary/10 border border-oakivo-secondary/30 text-oakivo-primary rounded-bl-none'
                      : 'bg-oakivo-cloud/50 text-gray-800 rounded-bl-none border border-gray-100'
                }`}>
                   {msg.role === 'model' ? renderMarkdown(msg.text) : msg.text}
                   
                   {msg.isAction && (
                     <button 
                       onClick={() => setShowLeadForm(true)}
                       className="mt-4 w-full bg-oakivo-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm hover:bg-black transition-all"
                     >
                       <User size={16} className="text-oakivo-secondary" /> Request Handoff
                     </button>
                   )}
                </div>
             </div>
           ))}

           {isTyping && (
             <div className="flex justify-start">
                <div className="bg-oakivo-cloud/50 p-6 rounded-[28px] rounded-bl-none border border-gray-100 flex items-center gap-4">
                   <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-oakivo-secondary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-oakivo-secondary rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-oakivo-secondary rounded-full animate-bounce [animation-delay:0.4s]" />
                   </div>
                   <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Architect Reasoning...</span>
                </div>
             </div>
           )}

           {showLeadForm && (
             <div className="bg-white p-8 rounded-[32px] border border-oakivo-secondary/30 shadow-vise-xl animate-fade-in-up">
                {leadStatus === 'success' ? (
                   <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-oakivo-secondary shadow-inner">
                        <CheckCircle size={32} />
                      </div>
                      <h4 className="font-bold text-xl text-oakivo-primary mb-2">Escalated</h4>
                      <p className="text-sm text-gray-500 font-light">An architect will contact you via email.</p>
                   </div>
                ) : (
                   <form onSubmit={handleLeadSubmit} className="space-y-6">
                      <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                        <div className="w-10 h-10 bg-oakivo-primary rounded-xl flex items-center justify-center text-oakivo-secondary">
                          <ShieldAlert size={20} />
                        </div>
                        <h4 className="font-bold text-oakivo-primary">Human Handoff Form</h4>
                      </div>
                      <input 
                        type="text" required placeholder="Full Name" 
                        value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm focus:outline-none focus:border-oakivo-primary transition-all" 
                      />
                      <input 
                        type="email" required placeholder="Work Email" 
                        value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm focus:outline-none focus:border-oakivo-primary transition-all" 
                      />
                      <button type="submit" className="w-full bg-[#020504] text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-3">
                         Submit Request <ArrowRight size={18} className="text-oakivo-secondary" />
                      </button>
                      <button type="button" onClick={() => setShowLeadForm(false)} className="w-full text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        Return to AI Agent
                      </button>
                   </form>
                )}
             </div>
           )}
        </div>

        {/* Input & Context Chips */}
        <div className="p-8 border-t border-gray-100 bg-white rounded-b-[40px]">
           {!isTyping && !showLeadForm && messages.length < 5 && (
             <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
                {[
                  { label: "Odoo 18 Migration", icon: <Database size={12}/> },
                  { label: "Agentic AI ROI", icon: <BrainCircuit size={12}/> },
                  { label: "Security Audit", icon: <ShieldCheck size={12}/> }
                ].map((chip, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleSend(chip.label)}
                    className="flex items-center gap-2 whitespace-nowrap bg-gray-50 border border-gray-100 px-4 py-2 rounded-full text-[10px] font-bold text-gray-500 hover:bg-oakivo-secondary/10 hover:text-oakivo-primary transition-all uppercase tracking-widest"
                  >
                    {chip.icon} {chip.label}
                  </button>
                ))}
             </div>
           )}
           <div className="relative group">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'en' ? "Query specialized intelligence..." : "Poser une question..."}
                className="w-full bg-gray-50 border border-gray-100 rounded-[20px] py-5 pl-6 pr-16 text-[15px] focus:outline-none focus:border-oakivo-primary focus:bg-white transition-all shadow-inner font-light"
                disabled={showLeadForm}
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping || showLeadForm}
                className="absolute right-2 top-2 bottom-2 w-12 h-12 bg-oakivo-primary text-white rounded-xl flex items-center justify-center hover:bg-black transition-all disabled:opacity-30 active:scale-90"
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