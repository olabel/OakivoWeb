import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  X, Sparkles, ArrowRight, User, Send, CheckCircle2, 
  Bot, Clock, ShieldCheck, Activity, MessageSquare
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string, isAction?: boolean}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', company: '', bottleneck: '' });
  const [leadStatus, setLeadStatus] = useState<'idle' | 'success'>('idle');
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    language === 'en' ? "Free 15-Min Operational Audit?" : "Audit opérationnel gratuit ?",
    language === 'en' ? "Do we need to buy new software?" : "Faut-il acheter de nouveaux logiciels ?",
    language === 'en' ? "How fast is setup?" : "Combien de temps prend l'installation ?",
    language === 'en' ? "Which tools can you connect?" : "Quels outils pouvez-vous connecter ?"
  ];

  useEffect(() => {
    const hasUserMessages = messages.some(m => m.role === 'user');
    if (!hasUserMessages) {
      setMessages([{ 
        role: 'model', 
        text: language === 'en' 
          ? "Welcome to Oakivo Solutions! I am your AI Automation Assistant. We connect the software tools you already use so your team stops wasting hours on manual data entry across Atlantic Canada. How can I help you today?" 
          : "Bienvenue chez Oakivo Solutions ! Je suis votre assistant d'automatisation. Nous connectons vos logiciels actuels pour éliminer la saisie manuelle de données au Canada atlantique. Comment puis-je vous aider aujourd'hui ?" 
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
      let generatedText = "";
      
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || '' });
        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: [...messages, { role: 'user', text: messageToSend }].map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          config: {
            systemInstruction: `You are Oakivo's AI Automation Assistant for Oakivo Solutions Inc.
            Core Focus: Done-For-You Business Workflow & System Automation in Atlantic Canada (New Brunswick, Nova Scotia, PEI, Newfoundland).
            Key Value Proposition: We connect the software businesses ALREADY use (QuickBooks, Excel, Shopify, custom CRMs, email, Google Workspace) so teams stop wasting hours on manual data entry, copy-pasting between systems, and repetitive admin work.
            Key Facts:
            - NO new software subscriptions to buy.
            - Setup takes 5 to 10 business days.
            - Reclaims 10 to 20 hours per employee every week.
            - Zero human copy-paste errors across orders & billing.
            - Primary CTA: Free 15-Minute Operational Audit with an automation specialist.
            Tone: High-clarity, practical, zero technical jargon, friendly, direct.
            Language: Respond in ${language === 'en' ? 'English' : 'French'}.`,
          },
        });
        generatedText = response.text || "";
      } catch (err) {
        console.warn("Gemini API call used offline fallback mode:", err);
      }

      if (!generatedText) {
        const lowerMsg = messageToSend.toLowerCase();
        if (lowerMsg.includes('buy') || lowerMsg.includes('software') || lowerMsg.includes('new') || lowerMsg.includes('cost')) {
          generatedText = language === 'en'
            ? "No, you do NOT need to buy any new software! We build custom automated bridges between the exact tools you already use (like QuickBooks, Excel, Shopify, email, or your current CRM). Everything happens seamlessly in the background."
            : "Non, vous n'avez AUCUN nouveau logiciel à acheter ! Nous créons des ponts automatisés sur mesure entre les outils que vous utilisez déjà (QuickBooks, Excel, Shopify, courriels, CRM). Tout fonctionne en arrière-plan.";
        } else if (lowerMsg.includes('fast') || lowerMsg.includes('time') || lowerMsg.includes('setup') || lowerMsg.includes('long')) {
          generatedText = language === 'en'
            ? "Our done-for-you workflow automation is typical setup and live in 5 to 10 business days. We handle 100% of the technical connection, testing, and verification so your team doesn't have to lift a finger."
            : "Nos automatisations clé en main sont configurées et opérationnelles en 5 à 10 jours ouvrables. Nous gérons 100 % de l'installation et des tests sans vous déranger.";
        } else if (lowerMsg.includes('audit') || lowerMsg.includes('15') || lowerMsg.includes('free') || lowerMsg.includes('book')) {
          generatedText = language === 'en'
            ? "Our Free 15-Minute Operational Audit is a quick, no-pressure chat where an automation specialist looks at your daily workflow to pinpoint exact areas where staff is losing hours on manual data entry."
            : "Notre audit opérationnel gratuit de 15 minutes est un échange simple sans pression. Un spécialiste étudie vos processus quotidiens pour identifier où votre équipe perd du temps en saisie manuelle.";
        } else if (lowerMsg.includes('tool') || lowerMsg.includes('connect') || lowerMsg.includes('quickbooks') || lowerMsg.includes('excel')) {
          generatedText = language === 'en'
            ? "We connect almost any software tool with an open API or export capability—including QuickBooks, Xero, Excel, Google Sheets, Shopify, WooCommerce, HubSpot, Salesforce, and custom SQL/inventory databases!"
            : "Nous connectons presque tous les outils logiciels—QuickBooks, Excel, Google Sheets, Shopify, WooCommerce, HubSpot, Salesforce et bases de données sur mesure !";
        } else {
          generatedText = language === 'en'
            ? "I'd love to help you reclaim staff hours! Oakivo connects your existing tools so you stop copy-pasting data. Would you like to request a free 15-minute operational audit with one of our specialists?"
            : "Je serais ravi de vous aider à gagner du temps ! Oakivo connecte vos outils actuels pour éliminer le copié-collé. Souhaitez-vous demander un audit opérationnel gratuit de 15 minutes ?";
        }
      }

      setMessages(prev => [...prev, { role: 'model', text: generatedText }]);

      const keywords = ['audit', 'book', 'schedule', 'speak', 'meet', 'cost', 'quote', 'réserver', 'contact'];
      if (keywords.some(k => messageToSend.toLowerCase().includes(k) || generatedText.toLowerCase().includes(k))) {
         setMessages(prev => [...prev, { role: 'model', text: language === 'en' ? "Would you like to book your free 15-minute operational audit right now?" : "Souhaitez-vous réserver votre audit opérationnel gratuit de 15 minutes dès maintenant ?", isAction: true }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: language === 'en' ? "Connection temporarily delayed. Please use our Free Operational Audit form on the website!" : "Connexion temporairement différée. Veuillez utiliser notre formulaire d'audit gratuit !" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveEntry('lead', { ...leadForm, source: 'Chat Assistant Operational Audit Intake', type: 'CHATBOT_AUDIT_REQUEST' });
    setLeadStatus('success');
    setTimeout(() => {
      setShowLeadForm(false);
      setLeadStatus('idle');
      setLeadForm({ name: '', email: '', company: '', bottleneck: '' });
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: language === 'en' ? "Thank you! An automation specialist will review your details and reach out within 24 hours to schedule your free 15-minute audit." : "Merci ! Un spécialiste de l'automatisation examinera vos détails et vous contactera sous 24h pour planifier votre audit gratuit." 
      }]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all relative border border-white/20 cursor-pointer ${
          isOpen ? 'bg-white text-black scale-105' : 'bg-[#0B0F17] text-white hover:scale-105'
        }`}
        aria-label="Toggle Oakivo AI Assistant"
      >
        {isOpen ? <X size={26} /> : <Bot size={28} className="text-emerald-400" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#070A0F] animate-pulse" />
        )}
      </button>

      <div className={`absolute bottom-20 right-0 w-[420px] max-w-[90vw] h-[600px] bg-[#0B0F17] rounded-[32px] shadow-2xl border border-white/10 flex flex-col transition-all duration-300 origin-bottom-right overflow-hidden ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        
        {/* Header */}
        <div className="p-5 bg-[#070A0F] text-white rounded-t-[32px] flex items-center justify-between border-b border-white/10">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                 <Bot size={22} />
              </div>
              <div>
                 <span className="font-extrabold text-sm block leading-none text-white">Oakivo Assistant</span>
                 <span className="text-[10px] font-mono-tech text-emerald-400 font-bold uppercase tracking-wider">Done-For-You Workflow Automation</span>
              </div>
           </div>
           <button 
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')} 
            className="text-[10px] font-mono-tech font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-emerald-400 hover:bg-white/20 transition-all cursor-pointer"
           >
            {language.toUpperCase()}
           </button>
        </div>

        {/* Message Container */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-4 bg-[#070A0F]/60 no-scrollbar">
           {messages.map((msg, i) => (
             <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-white text-black font-medium rounded-br-none shadow-sm' 
                    : 'bg-[#121722] text-gray-200 border border-white/10 rounded-bl-none shadow-sm'
                }`}>
                   {msg.text}
                   {msg.isAction && !showLeadForm && (
                     <button 
                      onClick={() => setShowLeadForm(true)} 
                      className="mt-3 w-full bg-emerald-400 text-black py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                     >
                       <Clock size={14} /> Book Free 15-Min Audit
                     </button>
                   )}
                </div>
             </div>
           ))}

           {isTyping && (
             <div className="flex items-center gap-2 text-[10px] font-mono-tech text-gray-400 font-bold uppercase tracking-wider p-2">
                <Activity size={14} className="animate-spin text-emerald-400" /> Analyzing request...
             </div>
           )}

           {showLeadForm && (
             <form onSubmit={handleLeadSubmit} className="p-5 bg-[#121722] rounded-2xl space-y-3 border border-white/10 shadow-lg animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles size={14} className="text-emerald-400" /> Free 15-Min Audit Request
                  </p>
                  <button type="button" onClick={() => setShowLeadForm(false)} className="text-gray-400 hover:text-white">
                    <X size={16} />
                  </button>
                </div>

                <input 
                  type="text" 
                  required 
                  placeholder="Your Name *" 
                  value={leadForm.name} 
                  onChange={e => setLeadForm({...leadForm, name: e.target.value})} 
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:border-white focus:outline-none" 
                />
                <input 
                  type="email" 
                  required 
                  placeholder="Work Email *" 
                  value={leadForm.email} 
                  onChange={e => setLeadForm({...leadForm, email: e.target.value})} 
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:border-white focus:outline-none" 
                />
                <textarea 
                  rows={2}
                  required 
                  placeholder="What manual task takes up most of your team's time?" 
                  value={leadForm.bottleneck} 
                  onChange={e => setLeadForm({...leadForm, bottleneck: e.target.value})} 
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:border-white focus:outline-none resize-none" 
                />
                <button 
                  type="submit" 
                  className="w-full bg-white text-black py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {leadStatus === 'success' ? (
                    <>
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      <span>Audit Request Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Book Free Operational Audit</span>
                    </>
                  )}
                </button>
             </form>
           )}
        </div>

        {/* Quick Prompts */}
        <div className="px-3 py-2 bg-[#070A0F] border-t border-white/10 flex gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-gray-300 whitespace-nowrap hover:bg-white hover:text-black transition-all cursor-pointer shrink-0"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-[#070A0F] border-t border-white/10 flex gap-2 rounded-b-[32px]">
           <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && handleSend()} 
            placeholder={language === 'en' ? "Ask about workflow automation or audits..." : "Posez une question sur l'automatisation..."} 
            className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white" 
           />
           <button 
            onClick={() => handleSend()} 
            className="w-10 h-10 bg-white text-black rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer shrink-0"
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
