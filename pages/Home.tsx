import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Loader2, 
  Mail, MapPin, Clock, Check, Sparkles, Calendar, PhoneCall, Terminal
} from 'lucide-react';
import SEO from '../components/SEO';
import DynamicHero from '../components/DynamicHero';
import CoreDisciplines from '../components/CoreDisciplines';
import HumanInTheLoopPrinciple from '../components/HumanInTheLoopPrinciple';
import SmallBizCaseStudies from '../components/SmallBizCaseStudies';
import SmallBizFaq from '../components/SmallBizFaq';
import SmallBizAiAuditModal from '../components/SmallBizAiAuditModal';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../utils/database';

export const Home: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  // Live Atlantic Time Clock (Dieppe, NB)
  const [astTime, setAstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat(isFr ? 'fr-CA' : 'en-CA', {
          timeZone: 'America/Moncton',
          hour: '2-digit',
          minute: '2-digit',
          hour12: !isFr
        });
        setAstTime(formatter.format(new Date()));
      } catch {
        setAstTime(new Date().toLocaleTimeString());
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [isFr]);

  // Streamlined 1-Field Fast Executive Consultation Dispatch
  const [contactInput, setContactInput] = useState('');
  const [selectedFocus, setSelectedFocus] = useState('Sales Acceleration (< 90s Lead Response)');
  const [honeypot, setHoneypot] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [inputError, setInputError] = useState('');

  const handleFastSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      setFormStatus('success');
      return;
    }
    const val = contactInput.trim();
    if (!val) {
      setInputError(isFr ? 'Veuillez saisir votre courriel ou téléphone' : 'Please provide your work email or phone');
      return;
    }
    setInputError('');
    setFormStatus('submitting');

    try {
      await db.saveEntry('lead', {
        contact: val,
        focusArea: selectedFocus,
        source: 'Homepage Streamlined Founder Fast-Track',
        timestamp: new Date().toISOString()
      });
      setFormStatus('success');
    } catch (err) {
      console.error('Failed to submit consultation request:', err);
      setFormStatus('error');
    }
  };

  const scrollToContact = (focusStream?: string) => {
    if (focusStream) {
      setSelectedFocus(focusStream);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToBlueprints = () => {
    const el = document.getElementById('blueprints');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openAuditModal = () => {
    window.dispatchEvent(new CustomEvent('open-ai-audit-modal'));
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#f7faf9] selection:bg-[#23c694]/30 selection:text-[#dffff1]">
      
      {/* Dynamic SEO Meta */}
      <SEO 
        title={isFr 
          ? "Oakivo | Automatisation Pratique, Ventes & Logiciels pour PME Canadiennes" 
          : "Oakivo | Applied Automation, Sales Growth & Custom Software for Canadian SMBs"
        }
        description={isFr
          ? "Développez vos ventes, réduisez vos charges administratives, lancez de nouveaux logiciels et sécurisez vos données canadiennes avec nos micro-systèmes d’IA silencieux. Garantie pilote de 30 jours sans risque."
          : "Increase sales, cut administrative overhead, launch custom software, and protect Canadian sovereign data with quiet automation. 14-day rapid sprints with our 30-day risk-free pilot guarantee."
        }
        keywords="increase sales small business, save cost automation, reduce small business operating costs, launch new product MVP Canada, small business cyber security Canada, AI automation small business, PIPEDA Law 25 compliance, custom web application, Atlantic Canada software developer"
      />

      {/* Global Interactive AI Audit Modal */}
      <SmallBizAiAuditModal />

      {/* 1. Calm, Minimalist Hero Section (Faithful to Nova Intelligence design) */}
      <DynamicHero 
        onOpenAudit={openAuditModal}
        onScrollToContact={() => scrollToContact()}
        onScrollToBlueprints={scrollToBlueprints}
      />

      {/* 2. The Four Core Disciplines (Spacious, Minimalist Editorial Grid) */}
      <CoreDisciplines 
        onSelectTopic={(topic) => scrollToContact(topic)} 
      />

      {/* 3. The Core Safeguard Philosophy: "AI Prepares, Humans Approve" */}
      <HumanInTheLoopPrinciple />

      {/* 4. Tested Operational Blueprints with Photography */}
      <SmallBizCaseStudies />

      {/* 5. Streamlined Founder Partnership & Low-Form Executive Console */}
      <section id="contact" className="py-24 bg-[#000000] border-t border-[#1e2d27]/70 relative">
        <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Direct Founder Access (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-3">
                <span className="nova-eyebrow text-[#23c694]">
                  {isFr ? 'ACCÈS DIRECT AUX FONDATEURS' : 'DIRECT FOUNDER ACCESS'}
                </span>
                
                <h2 className="text-3xl sm:text-5xl font-display font-light text-white tracking-tight">
                  {isFr 
                    ? 'Parlons de vos opérations.'
                    : 'Let’s look at your operations.'
                  }
                </h2>

                <p className="text-[#a8b0ad] text-sm sm:text-base leading-relaxed font-light">
                  {isFr
                    ? "Aucun commercial. Vous échangez directement avec les fondateurs et ingénieurs seniors à Dieppe (N.-B.). Nous auditons vos processus manuels et vous indiquons en toute franchise si un sprint de 14 jours est rentable pour votre entreprise."
                    : "Zero junior account reps or sales pitches. You talk directly with our engineering founders in Dieppe, New Brunswick. We review your workflows and provide a frank, honest assessment of what can be automated in a 14-day sprint."
                  }
                </p>
              </div>

              {/* Founder Guarantees (Clean Unboxed Grid) */}
              <div className="p-6 rounded-2xl bg-[#070a09] border border-[#1e2d27] space-y-3">
                <div className="text-xs font-mono text-[#7c8581] uppercase tracking-wider mb-2">
                  {isFr ? 'Nos Engagements d’Ingénierie :' : 'Our Engineering Commitments:'}
                </div>

                <div className="space-y-2.5 text-xs text-[#dce3e0] font-mono">
                  <div className="flex items-center gap-2.5">
                    <Check size={14} className="text-[#23c694] shrink-0" />
                    <span>{isFr ? 'Sprints à périmètre et tarif fixes (14 jours)' : 'Fixed-scope, fixed-investment 14-day sprint delivery'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check size={14} className="text-[#23c694] shrink-0" />
                    <span>{isFr ? 'Garantie pilote de 30 jours sans risque' : '30-day risk-free production pilot milestone'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check size={14} className="text-[#23c694] shrink-0" />
                    <span>{isFr ? 'Hébergement souverain 100% canadien (AWS ca-central-1)' : '100% Canadian data residency (AWS ca-central-1)'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check size={14} className="text-[#23c694] shrink-0" />
                    <span>{isFr ? 'Sas de sécurité humain « L’IA prépare, l’humain valide »' : 'Irrevocable human gate: "AI prepares, humans approve"'}</span>
                  </div>
                </div>
              </div>

              {/* Direct Founder Coordinates */}
              <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#7c8581] pt-2">
                <div className="flex items-center gap-2 text-[#a8b0ad]">
                  <MapPin size={13} className="text-[#23c694] shrink-0" />
                  <span>Dieppe, NB, Canada</span>
                  {astTime && (
                    <>
                      <span className="text-[#1e2d27]">·</span>
                      <span className="text-[#23c694]">{astTime} AST</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[#a8b0ad]">
                  <Mail size={13} className="text-[#23c694] shrink-0" />
                  <a href="mailto:founders@oakivo.ca" className="hover:text-[#23c694] transition-colors">
                    founders@oakivo.ca
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Zero-Friction 1-Step Executive Action Card (6 cols) */}
            <div className="lg:col-span-6">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#070a09] border border-[#23c694]/35 shadow-2xl relative overflow-hidden">
                
                {/* Soft Emerald Luster in corner */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#0f5e4a]/25 blur-3xl rounded-full pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  
                  <div className="flex items-center justify-between border-b border-[#1e2d27] pb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#23c694] uppercase tracking-wider font-semibold">
                      <Terminal size={14} />
                      <span>{isFr ? 'Ligne Directe Fondateurs' : 'Founder Direct Line'}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#7c8581] bg-[#000000] px-2.5 py-1 rounded-full border border-[#1e2d27]">
                      {isFr ? 'Réponse < 2h' : 'Response < 2h'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-light text-white mb-2">
                      {isFr ? 'Planifier une Session de Découverte' : 'Schedule an Executive Discovery'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#a8b0ad] font-light leading-relaxed">
                      {isFr 
                        ? 'Indiquez simplement votre courriel professionnel ou téléphone. Un fondateur vous contactera aujourd’hui pour une session de 15 minutes.' 
                        : 'Simply enter your work email or direct phone. A senior founder will follow up today for a 15-minute operational review.'}
                    </p>
                  </div>

                  {formStatus === 'success' ? (
                    <div className="p-6 rounded-2xl bg-[#0f5e4a]/20 border border-[#23c694]/50 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-[#23c694]/20 text-[#23c694] flex items-center justify-center mx-auto">
                        <CheckCircle2 size={20} />
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {isFr ? 'Demande transmise directement aux fondateurs.' : 'Sent directly to senior founders.'}
                      </div>
                      <p className="text-xs text-[#a8b0ad] font-mono">
                        {isFr 
                          ? 'Nous reviendrons vers vous d’ici 2 heures ouvrables.' 
                          : 'We will follow up with scheduling coordinates within 2 business hours.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setFormStatus('idle');
                          setContactInput('');
                        }}
                        className="text-xs text-[#23c694] underline hover:text-[#85e1bf] font-mono pt-2 cursor-pointer"
                      >
                        {isFr ? 'Envoyer une autre demande' : 'Submit another inquiry'}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFastSubmit} className="space-y-4">
                      {/* Honeypot */}
                      <input 
                        type="text" 
                        name="hp_check" 
                        value={honeypot} 
                        onChange={(e) => setHoneypot(e.target.value)} 
                        className="hidden" 
                        tabIndex={-1} 
                        autoComplete="off" 
                      />

                      {/* Focus Selector Tags */}
                      <div>
                        <span className="text-[11px] font-mono text-[#7c8581] uppercase tracking-wider block mb-2">
                          {isFr ? 'Votre priorité opérationnelle :' : 'Your primary focus:'}
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'Sales Acceleration (< 90s Lead Response)', label: isFr ? 'Ventes (< 90s)' : 'Sales (< 90s Lead)' },
                            { id: 'Operational Cost Reduction', label: isFr ? 'Zéro Saisie Comptable' : 'Zero Paperwork' },
                            { id: 'Custom Software / MVP Studio', label: isFr ? 'Logiciel Sur Mesure' : 'Custom Software' },
                            { id: 'Canadian Sovereign Cyber Security', label: isFr ? 'Souveraineté LPRPDE' : 'PIPEDA / Law 25' }
                          ].map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setSelectedFocus(item.id)}
                              className={`px-3 py-2 rounded-xl text-[11px] font-mono text-left transition-colors cursor-pointer border ${
                                selectedFocus === item.id
                                  ? 'bg-[#0f5e4a]/40 border-[#23c694] text-white font-medium shadow-[0_0_12px_rgba(35,198,148,0.2)]'
                                  : 'bg-[#000000]/50 border-[#1e2d27] text-[#7c8581] hover:text-[#dce3e0] hover:border-[#1e2d27]'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 1-Step Input Line */}
                      <div>
                        <label className="block text-xs font-mono text-[#a8b0ad] mb-1.5">
                          {isFr ? 'Courriel professionnel ou téléphone direct *' : 'Work email or direct phone *'}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={contactInput}
                            onChange={(e) => {
                              setContactInput(e.target.value);
                              if (inputError) setInputError('');
                            }}
                            placeholder={isFr ? "marc@entreprise.ca ou (506) 555-0192" : "marc@company.ca or (506) 555-0192"}
                            className={`w-full px-4 py-3.5 rounded-xl bg-[#000000]/60 border text-white text-sm focus:outline-none focus:border-[#23c694] transition-colors ${
                              inputError ? 'border-rose-500' : 'border-[#1e2d27]'
                            }`}
                          />
                        </div>
                        {inputError && (
                          <span className="text-[11px] text-rose-400 font-mono mt-1 block">{inputError}</span>
                        )}
                      </div>

                      {formStatus === 'error' && (
                        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono flex items-center gap-2">
                          <AlertCircle size={14} />
                          <span>{isFr ? 'Erreur lors de la transmission. Écrivez à founders@oakivo.ca.' : 'Transmission error. Please email founders@oakivo.ca directly.'}</span>
                        </div>
                      )}

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={formStatus === 'submitting'}
                          className="w-full nova-outline-btn justify-center cursor-pointer py-3.5"
                        >
                          {formStatus === 'submitting' ? (
                            <>
                              <Loader2 size={15} className="animate-spin text-[#23c694]" />
                              <span>{isFr ? 'Transmission directe...' : 'Sending to Founders...'}</span>
                            </>
                          ) : (
                            <>
                              <span>{isFr ? 'Prendre Rendez-vous (15 Min)' : 'Book Consultation (15 Min)'}</span>
                              <ArrowRight size={14} className="text-[#23c694]" />
                            </>
                          )}
                        </button>
                      </div>

                      {/* Secondary instant option: Launch 60s AI Audit modal */}
                      <div className="text-center pt-2">
                        <button
                          type="button"
                          onClick={openAuditModal}
                          className="text-xs font-mono text-[#7c8581] hover:text-[#23c694] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Sparkles size={12} className="text-[#23c694]" />
                          <span>{isFr ? 'Ou lancer le diagnostic d’éligibilité IA en 60s →' : 'Or run the 60-second AI readiness audit first →'}</span>
                        </button>
                      </div>

                    </form>
                  )}

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Direct & Honest FAQ Accordion */}
      <SmallBizFaq />

    </div>
  );
};

export default Home;
