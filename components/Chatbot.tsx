import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  X, Sparkles, ArrowRight, User, Send, CheckCircle2, 
  Bot, Clock, ShieldCheck, Activity, MessageSquare, Terminal, Building2
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
    language === 'en' ? "Book 30-Min Security Audit" : "Réserver un audit de sécurité 30 min",
    language === 'en' ? "How does DevSecOps speed up shipping?" : "Comment DevSecOps accélère les livraisons ?",
    language === 'en' ? "Continuous SOC 2 / PIPEDA compliance?" : "Conformité continue SOC 2 / PIPEDA ?",
    language === 'en' ? "Local presence in Dieppe, NB?" : "Présence locale à Dieppe, NB ?"
  ];

  useEffect(() => {
    const hasUserMessages = messages.some(m => m.role === 'user');
    if (!hasUserMessages) {
      setMessages([{ 
        role: 'model', 
        text: language === 'en' 
          ? "Welcome to Oakivo Solutions Inc. Headquartered in Dieppe, New Brunswick, we engineer premium DevSecOps pipelines, automated cloud security (CSPM), and autonomous incident remediation for Atlantic Canadian enterprises. How can I assist your engineering and security teams today?" 
          : "Bienvenue chez Oakivo Solutions Inc. Basés à Dieppe au Nouveau-Brunswick, nous concevons des pipelines DevSecOps de pointe, la sécurité infonuagique automatisée (CSPM) et la remédiation autonome d'incidents pour les entreprises du Canada atlantique. Comment puis-je vous aider aujourd'hui ?" 
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
          model: 'gemini-2.5-flash',
          contents: [...messages, { role: 'user', text: messageToSend }].map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          config: {
            systemInstruction: `You are Oakivo's Senior DevSecOps & Cloud Security Technical Assistant for Oakivo Solutions Inc. (Dieppe, New Brunswick).
            Core Pillars:
            1. Cloud Security Posture Management (CSPM): Continuous multi-cloud scanning (AWS, Azure, GCP), Infrastructure-as-Code drift detection (Terraform, OpenTofu), and automated compliance archives for SOC 2, PIPEDA, ISO 27001.
            2. DevSecOps Pipeline Engineering: Shift-left automated security gates (SAST, DAST, SBOM, container signing) in GitHub Actions, GitLab CI, ArgoCD. Catch issues in milliseconds in pull requests.
            3. ERP Security & IAM: Zero Trust identity mesh, sub-second offboarding, role matrix implementation, and automated token rotation.
            4. Automated Incident Remediation (SRE): Autonomous threat neutralization, secret rotation, and immutable audit trails with 99.99% uptime.
            
            Key Local Differentiator:
            - Headquartered in Dieppe, New Brunswick.
            - Direct bilingual (EN/FR) senior DevSecOps architects.
            - Local Atlantic Standard Time (AST) operations and < 15 minute critical response SLA.
            - 100% Canadian Data Sovereignty.
            - Primary CTA: 30-Minute Security Architecture Audit with a senior DevSecOps lead.
            
            Tone: Highly knowledgeable, precise, grounded, zero fluff, friendly, professional.
            Language: Always respond in ${language === 'en' ? 'English' : 'French'}.`,
          },
        });
        generatedText = response.text || "";
      } catch (err) {
        console.warn("Gemini API call used offline fallback mode:", err);
      }

      if (!generatedText) {
        const lowerMsg = messageToSend.toLowerCase();
        if (lowerMsg.includes('audit') || lowerMsg.includes('30') || lowerMsg.includes('free') || lowerMsg.includes('book') || lowerMsg.includes('schedule')) {
          generatedText = language === 'en'
            ? "Our 30-Minute Security Architecture Audit pairs your team directly with a senior DevSecOps engineer. We evaluate your current cloud configuration, CI/CD pipelines, and compliance exposure, providing a prioritized remediation blueprint with zero sales pressure."
            : "Notre audit d'architecture de sécurité de 30 minutes vous met directement en relation avec un ingénieur DevSecOps sénior. Nous analysons vos infrastructures infonuagiques, vos pipelines CI/CD et votre conformité réglementaire pour vous fournir un plan d'action concret.";
        } else if (lowerMsg.includes('speed') || lowerMsg.includes('fast') || lowerMsg.includes('devsecops') || lowerMsg.includes('pipeline') || lowerMsg.includes('slow')) {
          generatedText = language === 'en'
            ? "DevSecOps actually speeds up deployment cycles! By shifting security checks directly into automated CI/CD pull requests (SAST, container scanning, secret detection), vulnerabilities are caught in milliseconds during development instead of causing weeks of pre-release delays."
            : "DevSecOps accélère vos cycles de déploiement ! En intégrant les vérifications directement dans vos pipelines CI/CD (SAST, conteneurs, détection de secrets), les vulnérabilités sont corrigées en millisecondes sans bloquer les livraisons.";
        } else if (lowerMsg.includes('soc') || lowerMsg.includes('pipeda') || lowerMsg.includes('compliance') || lowerMsg.includes('audit')) {
          generatedText = language === 'en'
            ? "Our CSPM engines continuously scan multi-cloud infrastructure and automatically archive cryptographically signed compliance evidence 24/7/365. This eliminates stressful annual manual audit preparations for SOC 2, PIPEDA, and ISO 27001."
            : "Nos moteurs CSPM analysent vos environnements infonuagiques en continu et archivent automatiquement les preuves cryptographiques pour SOC 2 et la LPRPDE (PIPEDA) 24/7/365.";
        } else if (lowerMsg.includes('dieppe') || lowerMsg.includes('local') || lowerMsg.includes('atlantic') || lowerMsg.includes('canada') || lowerMsg.includes('bilingual')) {
          generatedText = language === 'en'
            ? "We are proudly headquartered in Dieppe, New Brunswick! Our entire team operates in Atlantic Standard Time, providing 100% bilingual (EN/FR) senior engineering and a sub-15-minute response SLA for Atlantic Canadian enterprises."
            : "Nous sommes fièrement basés à Dieppe, au Nouveau-Brunswick ! Notre équipe opère à l'heure de l'Atlantique et offre un service 100 % bilingue (FR/EN) avec un SLA de réponse critique de moins de 15 minutes.";
        } else {
          generatedText = language === 'en'
            ? "Oakivo Solutions protects mission-critical systems across Atlantic Canada through automated DevSecOps, CSPM compliance, and autonomous threat remediation. Would you like to schedule a 30-minute security architecture audit with one of our senior engineers?"
            : "Oakivo Solutions sécurise les infrastructures critiques au Canada atlantique par le DevSecOps automatisé et la conformité continue. Souhaitez-vous planifier un audit d'architecture de sécurité de 30 minutes ?";
        }
      }

      setMessages(prev => [...prev, { role: 'model', text: generatedText }]);

      const keywords = ['audit', 'book', 'schedule', 'speak', 'meet', 'cost', 'quote', 'réserver', 'contact'];
      if (keywords.some(k => messageToSend.toLowerCase().includes(k) || generatedText.toLowerCase().includes(k))) {
         setMessages(prev => [...prev, { role: 'model', text: language === 'en' ? "Would you like to schedule your 30-minute security architecture audit right now?" : "Souhaitez-vous planifier votre audit de sécurité de 30 minutes dès maintenant ?", isAction: true }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: language === 'en' ? "Connection temporarily delayed. Please use our Security Architecture Audit form on the site!" : "Connexion temporairement différée. Veuillez utiliser le formulaire d'audit sur le site !" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveEntry('lead', { ...leadForm, source: 'Chat Assistant Security Audit Intake', type: 'CHATBOT_SECURITY_AUDIT_REQUEST' });
    setLeadStatus('success');
    setTimeout(() => {
      setShowLeadForm(false);
      setLeadStatus('idle');
      setLeadForm({ name: '', email: '', company: '', bottleneck: '' });
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: language === 'en' ? "Thank you! A senior DevSecOps engineer will review your details and reach out within 24 hours to coordinate your 30-minute security audit." : "Merci ! Un ingénieur DevSecOps sénior examinera vos informations et vous contactera sous 24h pour organiser votre audit de sécurité." 
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
        aria-label="Toggle Oakivo Security Assistant"
      >
        {isOpen ? <X size={26} /> : <Terminal size={26} className="text-emerald-400" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#070A0F] animate-pulse" />
        )}
      </button>

      <div className={`absolute bottom-20 right-0 w-[440px] max-w-[92vw] h-[620px] bg-[#0B0F17] rounded-[32px] shadow-2xl border border-white/10 flex flex-col transition-all duration-300 origin-bottom-right overflow-hidden ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        
        {/* Header */}
        <div className="p-5 bg-[#070A0F] text-white rounded-t-[32px] flex items-center justify-between border-b border-white/10">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                 <Terminal size={20} />
              </div>
              <div>
                 <span className="font-extrabold text-sm block leading-none text-white">Oakivo Security AI</span>
                 <span className="text-[10px] font-mono-tech text-emerald-400 font-bold uppercase tracking-wider">DevSecOps & Cloud Security</span>
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
                       <Clock size={14} /> Request 30-Min Security Audit
                     </button>
                   )}
                </div>
             </div>
           ))}

           {isTyping && (
             <div className="flex justify-start">
               <div className="bg-[#121722] border border-white/10 p-3.5 rounded-2xl text-xs text-gray-400 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                 <span className="font-mono-tech text-[11px]">Analyzing security context...</span>
               </div>
             </div>
           )}

           {showLeadForm && (
             <div className="bg-[#121722] border border-emerald-500/30 p-5 rounded-2xl space-y-3 shadow-lg">
               <div className="flex items-center justify-between pb-2 border-b border-white/10">
                 <span className="text-xs font-bold text-white uppercase font-mono-tech tracking-wider">30-Min Security Audit Intake</span>
                 <button onClick={() => setShowLeadForm(false)} className="text-gray-400 hover:text-white text-xs">Cancel</button>
               </div>

               {leadStatus === 'success' ? (
                 <div className="py-4 text-center space-y-2">
                   <CheckCircle2 size={28} className="text-emerald-400 mx-auto" />
                   <p className="text-xs font-bold text-white">Security Audit Request Received!</p>
                 </div>
               ) : (
                 <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                   <input
                     type="text"
                     required
                     placeholder="Full Name *"
                     value={leadForm.name}
                     onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                     className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white"
                   />
                   <input
                     type="email"
                     required
                     placeholder="Work Email *"
                     value={leadForm.email}
                     onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                     className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white"
                   />
                   <input
                     type="text"
                     placeholder="Company / Organization"
                     value={leadForm.company}
                     onChange={e => setLeadForm({ ...leadForm, company: e.target.value })}
                     className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white"
                   />
                   <textarea
                     required
                     rows={2}
                     placeholder="Primary security or cloud challenge *"
                     value={leadForm.bottleneck}
                     onChange={e => setLeadForm({ ...leadForm, bottleneck: e.target.value })}
                     className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white resize-none"
                   />
                   <button
                     type="submit"
                     className="w-full py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-all cursor-pointer"
                   >
                     Confirm Audit Request
                   </button>
                 </form>
               )}
             </div>
           )}
        </div>

        {/* Quick Prompts */}
        <div className="p-3 bg-[#070A0F] border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
           {quickPrompts.map((prompt, i) => (
             <button
               key={i}
               onClick={() => handleSend(prompt)}
               className="shrink-0 text-[11px] font-mono-tech px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-emerald-500/40 transition-all cursor-pointer"
             >
               {prompt}
             </button>
           ))}
        </div>

        {/* Footer Input */}
        <div className="p-4 bg-[#0B0F17] border-t border-white/10">
           <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'en' ? "Ask about DevSecOps, CSPM, or compliance..." : "Posez une question sur DevSecOps, CSPM, conformité..."} 
                className="w-full bg-white/5 border border-white/15 rounded-full pl-4 pr-12 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="absolute right-1.5 w-8 h-8 rounded-full bg-white hover:bg-gray-100 disabled:opacity-30 text-black flex items-center justify-center transition-all cursor-pointer"
              >
                 <Send size={13} />
              </button>
           </form>
        </div>

      </div>
    </div>
  );
};

export default Chatbot;
