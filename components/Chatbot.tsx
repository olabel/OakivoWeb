import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  X, Sparkles, ArrowRight, ShieldCheck, User, Send, CheckCircle, 
  BrainCircuit, Activity, Terminal, ShieldAlert, Bot, HelpCircle
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

  const quickPrompts = [
    language === 'en' ? "Odoo 19 Implementation Cost?" : "Coût Odoo 19 ?",
    language === 'en' ? "Agentic AI Integration" : "Intégration IA Agentique",
    language === 'en' ? "PIPEDA / Data Sovereignty" : "Conformité LPRPDE",
    language === 'en' ? "Book Architectural Audit" : "Réserver un Audit"
  ];

  useEffect(() => {
    const hasUserMessages = messages.some(m => m.role === 'user');
    if (!hasUserMessages) {
      setMessages([{ 
        role: 'model', 
        text: language === 'en' 
          ? "Welcome to Oakivo Intelligence Hub. I am your Senior Architectural Assistant. How can I assist you with Odoo 19, Agentic AI, or PIPEDA compliance today?" 
          : "Bienvenue sur le Hub d'Intelligence Oakivo. Je suis votre Assistant d'Architecture Senior. Comment puis-je vous aider avec Odoo 19, l'IA Agentique ou la LPRPDE aujourd'hui ?" 
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
      // Fallback response generator if API key is not active
      let generatedText = "";
      
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: [...messages, { role: 'user', text: messageToSend }].map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          config: {
            systemInstruction: `You are the Oakivo Senior Architectural Assistant for Oakivo Solutions Inc.
            Company Focus: Canada's premier Odoo 19 Implementation Partner, Agentic AI, and Sovereign Zero-Trust Cybersecurity consultancy.
            Tone: High-precision, professional, direct, encouraging, technical.
            Key Offices: Montreal, Toronto, Dieppe / Moncton.
            If the user asks for quotes, implementation dates, or specific audits, offer a human lead architect handoff.
            Respond in ${language === 'en' ? 'English' : 'French'}.`,
          },
        });
        generatedText = response.text || "";
      } catch (err) {
        console.warn("Gemini API call used offline fallback mode:", err);
      }

      if (!generatedText) {
        // High-fidelity domain-aware fallback response
        const lowerMsg = messageToSend.toLowerCase();
        if (lowerMsg.includes('odoo') || lowerMsg.includes('erp') || lowerMsg.includes('cost')) {
          generatedText = language === 'en'
            ? "Oakivo specializes in Odoo 19 sovereign orchestration. Typical SME migrations range from 6 to 12 weeks with full CRA GST/HST tax module localization. Would you like to schedule a discovery call with a Principal Architect?"
            : "Oakivo est spécialisé dans l'orchestration souveraine d'Odoo 19. Les déploiements pour PME durent de 6 à 12 semaines avec intégration complète des modules fiscaux ARC. Souhaitez-vous échanger avec un architecte principal ?";
        } else if (lowerMsg.includes('ai') || lowerMsg.includes('agent') || lowerMsg.includes('automation')) {
          generatedText = language === 'en'
            ? "Our Agentic AI reasoning engines run directly inside your PIPEDA-compliant Canadian security perimeter. They automate repetitive document parsing, supply chain negotiation, and exception routing with sub-50ms latency."
            : "Nos moteurs d'IA Agentique fonctionnent directement dans votre périmètre de sécurité canadien LPRPDE. Ils automatisent l'analyse documentaire, la négociation de chaîne d'approvisionnement et le routage des exceptions.";
        } else if (lowerMsg.includes('pipeda') || lowerMsg.includes('security') || lowerMsg.includes('audit')) {
          generatedText = language === 'en'
            ? "All Oakivo deployments adhere strictly to PIPEDA, Quebec Law 25, and SOC2 Type II standards with 100% sovereign Canadian data residency in Montreal and Toronto data hubs."
            : "Toutes nos architectures respectent strictement la LPRPDE, la Loi 25 du Québec et les normes SOC2 Type II avec une résidence de données 100% canadienne à Montréal et Toronto.";
        } else {
          generatedText = language === 'en'
            ? "I have logged your technical query. Oakivo's engineering matrix covers Odoo 19, Agentic AI, and Zero-Trust architecture. Would you like to transmit your inquiry to a Principal Architect?"
            : "J'ai bien noté votre demande technique. La matrice Oakivo couvre Odoo 19, l'IA Agentique et l'architecture Zero-Trust. Souhaitez-vous transmettre cette demande à un architecte principal ?";
        }
      }

      setMessages(prev => [...prev, { role: 'model', text: generatedText }]);

      const keywords = ['meeting', 'quote', 'cost', 'audit', 'hire', 'schedule', 'réserver', 'découverte'];
      if (keywords.some(k => messageToSend.toLowerCase().includes(k) || generatedText.toLowerCase().includes(k))) {
         setMessages(prev => [...prev, { role: 'model', text: language === 'en' ? "Would you like to transmit your inquiry directly to a Senior Architect?" : "Souhaitez-vous transmettre votre demande à un Architecte Senior ?", isAction: true }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: language === 'en' ? "System gateway timeout. Please use our Technical Intake page to connect with an architect." : "Délai dépassé. Veuillez utiliser notre page Intake Technique." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveEntry('lead', { ...leadForm, source: 'Chat Assistant Intake' });
    setLeadStatus('success');
    setTimeout(() => {
      setShowLeadForm(false);
      setLeadStatus('idle');
      setLeadForm({ name: '', email: '', company: '' });
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: language === 'en' ? "Intelligence profile transmitted. A Principal Architect will contact you within 24 hours." : "Profil transmis. Un architecte principal vous contactera sous 24h." 
      }]);
    }, 1800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all relative ${
          isOpen ? 'bg-white text-oakivo-primary shadow-2xl scale-105' : 'bg-[#020504] text-white hover:scale-105'
        }`}
        aria-label="Toggle Oakivo AI Assistant"
      >
        {isOpen ? <X size={28} /> : <Sparkles size={26} className="text-oakivo-secondary" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-oakivo-secondary rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      <div className={`absolute bottom-20 right-0 w-[420px] max-w-[92vw] h-[620px] bg-white rounded-[36px] shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="p-6 bg-oakivo-primary text-white rounded-t-[36px] flex items-center justify-between border-b border-white/10">
           <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-oakivo-secondary/20 border border-oakivo-secondary/30 flex items-center justify-center text-oakivo-secondary">
                 <Bot size={20} />
              </div>
              <div>
                 <span className="font-bold text-sm block leading-none">Oakivo AI Agent</span>
                 <span className="text-[9px] font-mono-tech text-white/50 uppercase tracking-widest">Sovereign Architecture Core</span>
              </div>
           </div>
           <button 
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')} 
            className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full text-oakivo-secondary hover:bg-white/20 transition-all"
           >
            {language.toUpperCase()}
           </button>
        </div>

        {/* Message Container */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-oakivo-surface no-scrollbar">
           {messages.map((msg, i) => (
             <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] p-4 rounded-[22px] text-xs md:text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-oakivo-primary text-white rounded-br-none shadow-sm' 
                    : 'bg-white text-gray-800 rounded-bl-none border border-gray-100 shadow-sm'
                }`}>
                   {msg.text}
                   {msg.isAction && (
                     <button 
                      onClick={() => setShowLeadForm(true)} 
                      className="mt-3 w-full bg-oakivo-secondary text-black py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity"
                     >
                       Request Senior Architect Call
                     </button>
                   )}
                </div>
             </div>
           ))}

           {isTyping && (
             <div className="flex items-center gap-2 text-[10px] font-mono-tech text-oakivo-primary font-bold uppercase tracking-widest p-2">
                <Activity size={14} className="animate-spin text-oakivo-secondary" /> Reasoning Architecture...
             </div>
           )}

           {showLeadForm && (
             <form onSubmit={handleLeadSubmit} className="p-5 bg-white rounded-[24px] space-y-3 border border-gray-100 shadow-md">
                <p className="text-xs font-bold text-oakivo-primary">Connect with Principal Architect:</p>
                <input 
                  type="text" 
                  required 
                  placeholder="Full Name" 
                  value={leadForm.name} 
                  onChange={e => setLeadForm({...leadForm, name: e.target.value})} 
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:border-oakivo-primary focus:outline-none" 
                />
                <input 
                  type="email" 
                  required 
                  placeholder="Corporate Email" 
                  value={leadForm.email} 
                  onChange={e => setLeadForm({...leadForm, email: e.target.value})} 
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:border-oakivo-primary focus:outline-none" 
                />
                <input 
                  type="text" 
                  placeholder="Company Name" 
                  value={leadForm.company} 
                  onChange={e => setLeadForm({...leadForm, company: e.target.value})} 
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:border-oakivo-primary focus:outline-none" 
                />
                <button 
                  type="submit" 
                  className="w-full bg-oakivo-primary text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-opacity-95 transition-all"
                >
                  {leadStatus === 'success' ? 'Profile Saved!' : 'Submit Architecture Request'}
                </button>
             </form>
           )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold text-oakivo-primary whitespace-nowrap hover:bg-oakivo-primary hover:text-white transition-all"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-gray-100 flex gap-2 rounded-b-[36px]">
           <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && handleSend()} 
            placeholder={language === 'en' ? "Ask about Odoo 19, AI, or compliance..." : "Posez une question sur Odoo 19..."} 
            className="flex-grow bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-oakivo-primary" 
           />
           <button 
            onClick={() => handleSend()} 
            className="w-11 h-11 bg-oakivo-primary text-white rounded-2xl flex items-center justify-center hover:scale-105 transition-transform"
            aria-label="Send Message"
           >
            <ArrowRight size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
