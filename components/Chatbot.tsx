import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { X, Loader2, Sparkles, ArrowRight, Languages, Info, ShieldCheck, ExternalLink } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasUserMessages = messages.some(m => m.role === 'user');
    if (!hasUserMessages) {
      setMessages([{ 
        role: 'model', 
        text: language === 'en' 
          ? 'Hello! I am your Oakivo Digital Assistant. I use advanced reasoning to help you orchestrate your digital future. How can I assist you today?' 
          : 'Bonjour ! Je suis votre assistant numérique Oakivo. J\'utilise un raisonnement avancé pour vous aider à orchestrer votre avenir numérique. Comment puis-je vous aider aujourd\'hui ?' 
      }]);
    }
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (overrideInput?: string) => {
    const messageToSend = overrideInput || input.trim();
    if (!messageToSend || isTyping) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, { role: 'user', text: messageToSend }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          thinkingConfig: { thinkingBudget: 24000 },
          systemInstruction: `You are the expert AI Assistant for Oakivo Solutions Inc.
          Oakivo is a Canadian digital transformation company based in Dieppe, NB. 
          
          MANDATORY: You must respond in ${language === 'en' ? 'English' : 'French'}.
          
          Key Services: 
          1. Odoo ERP (Certified Partners) - implementation, migration, training. Focus on ROI and efficiency.
          2. Business Process Automation - RPA, custom AI agents, Microsoft Power Platform.
          3. Cybersecurity - SOC2, ISO 27001, Zero Trust, OT (Operational Technology) network security for energy/manufacturing.
          4. Cloud Strategy - Specialized in Canadian data residency (Azure Canada, AWS Canada Central).

          GUIDELINES (EEAT Alignment):
          - Demonstrate expertise in ERP lifecycle management.
          - Prioritize security and compliance in every recommendation.
          - Reference "The Oakivo Method" (Audit -> Architect -> Implement -> Scale).
          - Respond with professional, strategic, yet accessible language.
          - Use clear Markdown formatting.
          - If suggesting a consultation, mention it can be booked on the 'Contact' page.

          FORMATTING RULES:
          - Use ### for section headers.
          - Use **bold** for key concepts.
          - Use bullet points for steps or features.
          - Keep paragraphs short (2-3 sentences).`,
        },
      });

      const text = response.text || (language === 'en' ? "I encountered a processing error. Please try again." : "J'ai rencontré une erreur de traitement. Veuillez réessayer.");
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: language === 'en' ? "Maintenance in progress. Contact hello@oakivo.ca." : "Maintenance en cours. Contactez hello@oakivo.ca." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = language === 'en' 
    ? ["Odoo Benefits", "Cyber Audit", "Automation ROI"]
    : ["Avantages Odoo", "Audit Cyber", "ROI Autom."] ;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, idx) => {
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-oakivo-primary">$1</strong>');
      processed = processed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-oakivo-blue underline">$1</a>');
      
      if (line.trim().startsWith('### ')) {
        return <h3 key={idx} className="text-base font-bold text-oakivo-primary mt-4 mb-2 flex items-center gap-2" dangerouslySetInnerHTML={{ __html: processed.substring(4) }} />;
      }
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        return <div key={idx} className="flex gap-2 ml-2 mb-1">
          <span className="text-oakivo-secondary font-bold">•</span>
          <span dangerouslySetInnerHTML={{ __html: processed.substring(2) }} />
        </div>;
      }
      return <p key={idx} className={idx > 0 && line.trim() !== "" ? "mt-2" : ""} dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:scale-110 ${isOpen ? 'bg-white text-oakivo-primary rotate-90' : 'bg-oakivo-primary text-white'}`}
        aria-label="Toggle Assistant"
      >
        {isOpen ? <X size={24} /> : <div className="relative"><Logo className="w-8 h-8" /><div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-oakivo-secondary rounded-full border-2 border-oakivo-primary animate-pulse shadow-lg"></div></div>}
      </button>

      <div className={`absolute bottom-20 right-0 w-[440px] max-w-[95vw] h-[650px] bg-white rounded-3xl shadow-[0_35px_100px_-20px_rgba(0,0,0,0.5)] border border-gray-100 flex flex-col transition-all duration-500 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 pointer-events-none translate-y-10'}`}>
        
        {/* Header */}
        <div className="p-5 bg-oakivo-primary text-white rounded-t-3xl flex items-center justify-between shadow-lg">
           <div className="flex items-center gap-3">
              <Logo className="w-9 h-9" />
              <div>
                <h3 className="font-bold text-sm leading-none">Oakivo Intelligence</h3>
                <span className="text-[10px] text-oakivo-secondary font-bold uppercase tracking-widest flex items-center gap-1 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-oakivo-secondary animate-pulse"></span> {language === 'en' ? 'Strategic Engine Active' : 'Moteur Stratégique Actif'}
                </span>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <button 
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider"
              >
                <Languages size={14} className="text-oakivo-secondary" />
                {language.toUpperCase()}
              </button>
              <Sparkles className="text-oakivo-secondary opacity-50" size={18} />
           </div>
        </div>

        {/* Global Security Disclaimer */}
        <div className="bg-oakivo-surface px-5 py-2.5 border-b border-gray-100 flex items-center justify-between text-[10px] text-gray-500 font-semibold tracking-tight">
           <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-oakivo-secondary" />
              {language === 'en' ? 'Encrypted Strategy Portal' : 'Portail Stratégique Chiffré'}
           </div>
           <div className="opacity-50 flex items-center gap-1">
             v3.1.5 <Info size={10} />
           </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-5 scroll-smooth bg-[#fafbfc]">
           {messages.map((msg, i) => (
             <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-oakivo-primary text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'}`}>
                   {msg.role === 'model' ? renderMarkdown(msg.text) : msg.text}
                </div>
             </div>
           ))}
           {isTyping && (
             <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-gray-200 flex items-center gap-4 shadow-sm">
                   <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-oakivo-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-oakivo-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-oakivo-secondary rounded-full animate-bounce"></div>
                   </div>
                   <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-[0.15em]">{language === 'en' ? 'Reasoning...' : 'Réflexion...'}</span>
                </div>
             </div>
           )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-white rounded-b-3xl">
           {!isTyping && (
             <div className="flex flex-wrap gap-2 mb-5">
                {quickActions.map(action => (
                  <button 
                    key={action}
                    onClick={() => handleSend(action)}
                    className="text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-full hover:border-oakivo-secondary hover:text-oakivo-secondary transition-all shadow-sm hover:shadow-md active:scale-95"
                  >
                    {action}
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
                placeholder={language === 'en' ? "Discuss Odoo strategy, Automation or Cyber..." : "Stratégie Odoo, Automatisation, Cyber..."}
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-4.5 pl-6 pr-14 text-sm focus:outline-none focus:border-oakivo-primary focus:bg-white transition-all shadow-inner"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-2 bottom-2 w-11 h-11 bg-oakivo-primary text-white rounded-full flex items-center justify-center hover:bg-black transition-all disabled:opacity-50 shadow-lg active:scale-90"
              >
                <ArrowRight size={20} />
              </button>
           </div>
           <div className="mt-5 flex items-center justify-center gap-4">
              <p className="text-[9px] text-gray-400 font-bold tracking-tight uppercase">
                © {new Date().getFullYear()} Oakivo Solutions Inc.
              </p>
              <div className="h-1 w-1 bg-gray-200 rounded-full"></div>
              <a href="#/contact" className="text-[9px] text-oakivo-secondary font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
                {language === 'en' ? 'Book Audit' : 'Audit Technique'} <ExternalLink size={8} />
              </a>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
