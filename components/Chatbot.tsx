import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { X, Loader2, Sparkles, ArrowRight, ShieldCheck, HelpCircle, ChevronRight, Mail, User, Send, CheckCircle, Bot, BrainCircuit, MessageCircleQuestion, LifeBuoy, Activity, Terminal, ShieldAlert, Cpu, Database } from 'lucide-react';
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
          ? 'Welcome to the Oakivo Strategy Portal. I am your specialized Support Architect. I can provide technical help with Odoo 18 migrations, Agentic AI implementations, and Zero-Trust infrastructure audits. How can I assist your organization today?' 
          : 'Bienvenue sur le Portail Stratégique Oakivo. Je suis votre architecte de support spécialisé. Je peux vous aider techniquement avec les migrations Odoo 18, les implémentations d\'IA Agente et les audits d\'infrastructure Zero-Trust. Comment puis-je aider votre organisation aujourd\'hui ?' 
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
          systemInstruction: `You are the "Oakivo Support Intelligence", the official technical support and strategy assistant for Oakivo Solutions Inc.
          HQ: Dieppe, New Brunswick, Canada.
          CORE FOCUS: Providing technical help, ROI analysis for Odoo 18, and architectural guidance for Agentic AI.
          TONE: Professional, sophisticated, highly helpful, and reassuring. Use terms like "Operational Resiliency", "Strategic Blueprinting", and "Technical Sovereignty".
          
          RESPONSE PROTOCOL:
          - Respond in ${language === 'en' ? 'English' : 'French'}.
          - Always offer clear technical insights first.
          - ESCALATION MONITORING: If the user asks a very difficult engineering question, or asks about pricing, complex integration blueprints, or a human meeting, or if you find yourself repeating the same technical concepts without resolution, EXPLICITLY RECOMMEND clicking the "Human Expert Handoff" option.
          - If the user seems frustrated or requires surgical precision that an AI cannot provide, guide them to the handoff form immediately.`,
        },
      });

      const text = response.text || "Technical handshake failed. Please refresh or contact support@oakivo.com.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Gemini Support Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: language === 'en' ? "Secure gateway timeout. Please retry or contact our technical hub directly." : "Délai d'attente dépassé. Veuillez réessayer ou contacter notre centre technique directement." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Include the conversation history in the lead submission
    const escalationPayload = {
      ...leadForm,
      source: 'Human Handoff (Support Chat)',
      chatHistory: messages.map(m => `[${m.role.toUpperCase()}]: ${m.text}`).join('\n\n')
    };
    
    db.saveEntry('lead', escalationPayload);
    setLeadStatus('success');
    
    setTimeout(() => {
      setShowLeadForm(false);
      setLeadStatus('idle');
      setLeadForm({ name: '', email: '', company: '' });
      setMessages(prev => [...prev, { role: 'model', text: language === 'en' ? 'Your case has been packaged and escalated to our Human Engineering team. A lead architect will contact you shortly via email for a deep-dive session.' : 'Votre dossier a été packagé et transmis à notre équipe d\'ingénierie humaine. Un architecte principal vous contactera sous peu par e-mail pour une session approfondie.' }]);
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
        className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-[0_30px_90px_rgba(0,0,0,0.3)] transition-all duration-700 transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-white text-oakivo-primary rotate-90' : 'bg-oakivo-primary text-white'}`}
        aria-label="Toggle Support Center"
      >
        {isOpen ? <X size={36} /> : <LifeBuoy size={36} className="animate-pulse" />}
      </button>

      <div className={`absolute bottom-20 lg:bottom-24 right-0 w-[500px] max-w-[92vw] h-[750px] bg-white rounded-[32px] lg:rounded-[48px] shadow-4xl border border-gray-100 flex flex-col transition-all duration-700 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 pointer-events-none translate-y-12'}`}>
        
        {/* Header */}
        <div className="p-8 lg:p-10 bg-oakivo-primary text-white rounded-t-[32px] lg:rounded-t-[48px] flex items-center justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-oakivo-secondary pointer-events-none">
              <LifeBuoy size={200} />
           </div>
           <div className="flex items-center gap-4 lg:gap-6 relative z-10">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/10 rounded-xl lg:rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-2xl">
                 <Logo className="w-8 h-8 lg:w-10 lg:h-10" withText={false} light={true} />
              </div>
              <div>
                <h3 className="font-bold text-xl lg:text-2xl tracking-tighter">Support Portal</h3>
                <span className="text-[10px] text-oakivo-secondary font-black uppercase tracking-[0.4em] flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-oakivo-secondary animate-pulse"></span> SYSTEM_LIVE
                </span>
              </div>
           </div>
           <button onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] relative z-10 border border-white/10 shadow-sm">
              {language.toUpperCase()}
           </button>
        </div>

        {/* Audit Compliance & Telemetry */}
        <div className="bg-oakivo-surface px-8 lg:px-10 py-3 lg:py-4 border-b border-gray-100 flex items-center justify-between text-[9px] lg:text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">
           <div className="flex items-center gap-3"><ShieldCheck size={16} className="text-oakivo-secondary" /> INSTITUTIONAL ENCRYPTION</div>
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-2"><Activity size={14} className="text-oakivo-secondary" /> 24ms</span>
           </div>
        </div>

        {/* Chat Feed */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 lg:p-10 space-y-8 lg:space-y-10 bg-gray-50/20 scroll-smooth no-scrollbar">
           {messages.map((msg, i) => (
             <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-500`}>
                <div className={`max-w-[90%] p-6 lg:p-8 rounded-[24px] lg:rounded-[32px] text-sm lg:text-[16px] leading-relaxed shadow-sm transition-all hover:shadow-vise-lg ${msg.role === 'user' ? 'bg-oakivo-primary text-white rounded-br-none shadow-2xl' : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'}`}>
                   {msg.role === 'model' ? renderMarkdown(msg.text) : msg.text}
                </div>
             </div>
           ))}
           {isTyping && (
             <div className="flex justify-start animate-in fade-in slide-in-from-left-4">
                <div className="bg-white p-6 lg:p-8 rounded-[24px] lg:rounded-[32px] rounded-bl-none border border-gray-100 flex items-center gap-5 shadow-sm">
                   <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 bg-oakivo-secondary rounded-full animate-bounce"></div>
                      <div className="w-2.5 h-2.5 bg-oakivo-secondary rounded-full animate-bounce [animation-delay:150ms]"></div>
                      <div className="w-2.5 h-2.5 bg-oakivo-secondary rounded-full animate-bounce [animation-delay:300ms]"></div>
                   </div>
                   <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em]">Reasoning...</span>
                </div>
             </div>
           )}

           {showLeadForm && (
             <div className="bg-white p-8 lg:p-10 rounded-[32px] lg:rounded-[40px] border border-oakivo-secondary/40 shadow-[0_40px_100px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-12 duration-1000">
                {leadStatus === 'success' ? (
                   <div className="text-center py-10 lg:py-12">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 text-oakivo-secondary shadow-inner">
                        <CheckCircle size={56} />
                      </div>
                      <h4 className="font-bold text-xl lg:text-2xl text-oakivo-primary mb-3 tracking-tight">Escalation Confirmed</h4>
                      <p className="text-sm text-gray-500 font-light">Redirecting to primary intelligence stream...</p>
                   </div>
                ) : (
                   <form onSubmit={handleLeadSubmit} className="space-y-6 lg:space-y-8">
                      <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-8">
                        <div className="w-12 h-12 bg-oakivo-surface rounded-xl flex items-center justify-center text-oakivo-secondary">
                          <User size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-oakivo-primary tracking-tight">Human Architect Handoff</h4>
                          <p className="text-[9px] lg:text-[10px] text-gray-400 font-black uppercase tracking-widest">Complex Inquiry Routing</p>
                        </div>
                      </div>
                      <div className="space-y-4 lg:space-y-6">
                        <div className="space-y-2">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-2">Identify Full Name</label>
                           <input 
                             type="text" required placeholder="John Doe" 
                             value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})}
                             className="w-full bg-gray-50 border border-gray-200 p-4 lg:p-5 rounded-xl lg:rounded-2xl text-base focus:outline-none focus:border-oakivo-primary focus:bg-white transition-all shadow-inner" 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-2">Organizational Email</label>
                           <input 
                             type="email" required placeholder="work@company.com" 
                             value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})}
                             className="w-full bg-gray-50 border border-gray-200 p-4 lg:p-5 rounded-xl lg:rounded-2xl text-base focus:outline-none focus:border-oakivo-primary focus:bg-white transition-all shadow-inner" 
                           />
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-oakivo-primary text-white py-5 lg:py-6 rounded-xl lg:rounded-2xl text-base font-bold hover:bg-black transition-all flex items-center justify-center gap-4 shadow-2xl group">
                        <ShieldAlert size={20} className="text-oakivo-secondary group-hover:scale-110 transition-transform" /> Initiate Human Audit
                      </button>
                      <button type="button" onClick={() => setShowLeadForm(false)} className="w-full text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] hover:text-oakivo-primary transition-all">
                        Return to Autonomous AI
                      </button>
                   </form>
                )}
             </div>
           )}
        </div>

        {/* Input Matrix */}
        <div className="p-6 lg:p-10 border-t border-gray-100 bg-white rounded-b-[32px] lg:rounded-b-[48px]">
           {!isTyping && !showLeadForm && (
             <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-8">
                {language === 'en' ? (
                  <>
                    <button onClick={() => handleSend("Tell me about Odoo 18 Migration Support")} className="text-[9px] lg:text-[11px] font-black border border-gray-100 px-4 py-2 lg:px-6 lg:py-2.5 rounded-xl hover:border-oakivo-secondary hover:text-oakivo-secondary transition-all uppercase tracking-widest flex items-center gap-2"><Database size={12}/> Migration Help</button>
                    <button onClick={() => handleSend("How can Agentic AI improve my ROI?")} className="text-[9px] lg:text-[11px] font-black border border-gray-100 px-4 py-2 lg:px-6 lg:py-2.5 rounded-xl hover:border-oakivo-secondary hover:text-oakivo-secondary transition-all uppercase tracking-widest flex items-center gap-2"><Cpu size={12}/> AI ROI Help</button>
                    <button onClick={() => setShowLeadForm(true)} className="text-[9px] lg:text-[11px] font-black bg-oakivo-secondary/10 border border-oakivo-secondary/30 text-oakivo-secondary px-4 py-2 lg:px-6 lg:py-2.5 rounded-xl hover:bg-oakivo-secondary hover:text-white transition-all uppercase tracking-widest flex items-center gap-2"><ShieldAlert size={12}/> Human Expert</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleSend("Aide à la migration Odoo 18")} className="text-[9px] lg:text-[11px] font-black border border-gray-100 px-4 py-2 lg:px-6 lg:py-2.5 rounded-xl hover:border-oakivo-secondary hover:text-oakivo-secondary transition-all uppercase tracking-widest flex items-center gap-2">Aide Migration</button>
                    <button onClick={() => handleSend("Aide à l'IA Agente")} className="text-[9px] lg:text-[11px] font-black border border-gray-100 px-4 py-2 lg:px-6 lg:py-2.5 rounded-xl hover:border-oakivo-secondary hover:text-oakivo-secondary transition-all uppercase tracking-widest flex items-center gap-2">Aide IA</button>
                    <button onClick={() => setShowLeadForm(true)} className="text-[9px] lg:text-[11px] font-black bg-oakivo-secondary/10 border border-oakivo-secondary/30 text-oakivo-secondary px-4 py-2 lg:px-6 lg:py-2.5 rounded-xl hover:bg-oakivo-secondary hover:text-white transition-all uppercase tracking-widest">Expert Humain</button>
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
                placeholder={language === 'en' ? "Query specialized support..." : "Poser une question technique..."}
                className="w-full bg-gray-50 border border-gray-200 rounded-[24px] lg:rounded-[32px] py-4 lg:py-6 pl-6 lg:pl-8 pr-16 lg:pr-20 text-sm lg:text-[17px] focus:outline-none focus:border-oakivo-primary focus:bg-white focus:shadow-inner transition-all duration-700 font-light"
                disabled={showLeadForm}
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping || showLeadForm}
                className="absolute right-2 lg:right-3 top-2 lg:top-3 bottom-2 lg:bottom-3 w-10 h-10 lg:w-14 lg:h-14 bg-oakivo-primary text-white rounded-xl lg:rounded-2xl flex items-center justify-center hover:bg-black transition-all disabled:opacity-30 shadow-2xl active:scale-90"
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