import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, CheckCircle2, Mail, Phone, Database, Zap, 
  Server, ShieldCheck, AlertCircle, Loader2, Send, ExternalLink,
  Building2, Cpu, Check, Layers, Workflow, DollarSign, Clock, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TrustCarousel from '../components/TrustCarousel';
import DynamicHero from '../components/DynamicHero';
import BentoCapabilities from '../components/BentoCapabilities';
import ExecutiveCaseStudies from '../components/ExecutiveCaseStudies';
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

  // Discovery Session Contact Form
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    stream: 'Modern ERP & Operations',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [strategicTab, setStrategicTab] = useState<'benchmark' | 'protocol'>('benchmark');

  const validateContactForm = () => {
    const errors: Record<string, string> = {};
    if (!contactForm.name.trim()) {
      errors.name = isFr ? 'Votre nom est requis' : 'Your name is required';
    }
    if (!contactForm.email.trim()) {
      errors.email = isFr ? 'Courriel professionnel requis' : 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      errors.email = isFr ? 'Format de courriel invalide' : 'Please enter a valid work email';
    }
    if (!contactForm.company.trim()) {
      errors.company = isFr ? 'Nom de l’entreprise requis' : 'Company name is required';
    }
    if (!contactForm.message.trim()) {
      errors.message = isFr ? 'Veuillez préciser votre besoin' : 'Please describe your initiative or challenge';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!validateContactForm()) return;

    setFormStatus('submitting');
    try {
      // 1. Save entry to persistent Firestore & auto-dispatch notification to olabel@gmail.com
      await db.saveEntry('lead', {
        name: contactForm.name.trim(),
        email: contactForm.email.trim().toLowerCase(),
        company: contactForm.company.trim(),
        focusArea: contactForm.stream,
        bottleneck: contactForm.message.trim(),
        source: 'Homepage Discovery Form'
      });

      setFormStatus('success');
    } catch (err) {
      console.error('Failed to submit discovery request:', err);
      setFormStatus('error');
    }
  };

  const scrollToContact = (focusStream?: string) => {
    if (focusStream) {
      setContactForm(prev => ({ ...prev, stream: focusStream }));
    }
    const el = document.getElementById('discovery-contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // The Boutique Advantage Comparison Matrix
  const boutiqueComparison = [
    {
      dimension: isFr ? 'Accès à l’Équipe' : 'Engineering Partnership Access',
      bigConsulting: isFr ? 'Vendu par des associés, délégué à des analystes juniors' : 'Sold by senior partners, handed off to junior analysts',
      commodityMSP: isFr ? 'Centre d’appels généraliste réactif' : 'Helpdesk ticket queue resetting passwords and routers',
      oakivo: isFr ? 'Accompagnement direct par des fondateurs & architectes seniors' : 'Direct partnership with senior founders & principal architects'
    },
    {
      dimension: isFr ? 'Modernisation ERP' : 'Modern ERP Implementation Capability',
      bigConsulting: isFr ? 'Projets lourds sur 12 à 24 mois aux budgets à 7 chiffres' : 'Bloated 18-month implementations with 7-figure fees',
      commodityMSP: isFr ? 'Aucune compétence logicielle ou ERP d’entreprise' : 'Zero enterprise software or ERP integration capability',
      oakivo: isFr ? 'ERP moderne (Odoo) sur mesure opérationnel en moins de 90 jours' : 'Pragmatic turnkey modern ERP (Odoo) live in under 90 days'
    },
    {
      dimension: isFr ? 'Optimisation Cloud & FinOps' : 'Cloud FinOps Waste Reduction',
      bigConsulting: isFr ? 'Rapports théoriques sans changements concrets' : 'Theoretical advisory slide decks with zero live changes',
      commodityMSP: isFr ? 'Revente de licences sans gestion du gaspillage' : 'Marked-up cloud reseller licenses with unmanaged waste',
      oakivo: isFr ? 'Réduction garantie de 30–40% des factures AWS/Azure (Terraform)' : 'Guaranteed 30–40% AWS/Azure bill cut with Terraform IaC'
    },
    {
      dimension: isFr ? 'Sécurité & Souveraineté' : 'Security & Canadian Data Sovereignty',
      bigConsulting: isFr ? 'Dossiers théoriques sans surveillance continue' : 'High-overhead compliance binders that gather dust',
      commodityMSP: isFr ? 'Antivirus basique sans validation de conformité' : 'Basic commodity antivirus with unmonitored security gaps',
      oakivo: isFr ? 'Zéro Confiance, données 100% au Canada et audit LPRPDE / SOC 2 rapide' : 'Zero Trust IAM, 100% Canadian data residency & fast audit pass'
    },
    {
      dimension: isFr ? 'Délai vers le ROI' : 'Speed to Measurable ROI',
      bigConsulting: isFr ? '6 à 18 mois avant la moindre rentabilité' : '6 to 18 months before any software reaches production',
      commodityMSP: isFr ? 'Réactif aux pannes sans vision d’automatisation' : 'Purely reactive break-fix with zero strategic momentum',
      oakivo: isFr ? 'Gains mesurables (25+ h/semaine) dès les 30 premiers jours' : 'Measurable time savings (25+ hrs/wk) in 2–4 weeks'
    },
    {
      dimension: isFr ? 'Proximité Régionale' : 'Regional Accountability & Timezone',
      bigConsulting: isFr ? 'Équipes distantes à Toronto ou offshore' : 'Impersonal teams in Toronto or offshore ticket queues',
      commodityMSP: isFr ? 'Local mais capacités d’ingénierie restreintes' : 'Local presence but unable to automate core processes',
      oakivo: isFr ? '100% Bilingue (FR/EN) • Heure de l’Atlantique (Dieppe, N.-B.)' : '100% Bilingual (EN/FR) in Atlantic Standard Time (Dieppe, NB)'
    }
  ];

  return (
    <>
      <SEO 
        title="Sovereign Technology Engineering | Modern ERP & Cloud Architecture | Oakivo"
        description="Oakivo Solutions Inc. is a boutique technology engineering firm headquartered in Dieppe, NB. We replace spreadsheet chaos with turnkey Odoo ERP, cut 35% of cloud infrastructure waste, and guarantee Canadian data sovereignty."
        keywords="Modern ERP Atlantic Canada, Cloud FinOps Canada, DevSecOps New Brunswick, AWS Azure ca-central, Odoo implementation Dieppe, PIPEDA SOC 2 compliance automation, Sovereign technology engineering"
        canonical="/"
      />
      
      {/* ========================================================================= */}
      {/* 1. ACT I: THE MONOLITHIC COMMAND CENTER (HERO)                            */}
      {/* ========================================================================= */}
      <DynamicHero />

      {/* ========================================================================= */}
      {/* 2. ACT II: INSTITUTIONAL TRUST & CERTIFICATIONS MARQUEE                   */}
      {/* ========================================================================= */}
      <TrustCarousel />

      {/* ========================================================================= */}
      {/* 3. ACT III: THE 3 CORE DISCIPLINES (ASYMMETRIC BENTO GRID)                */}
      {/* ========================================================================= */}
      <BentoCapabilities onSchedule={(stream) => scrollToContact(stream)} />

      {/* ========================================================================= */}
      {/* 4. ACT IV: MEASURABLE IMPACT & QUANTIFIED CASE STUDIES                    */}
      {/* ========================================================================= */}
      <ExecutiveCaseStudies />

      {/* ========================================================================= */}
      {/* 5. ACT V: STRATEGIC BENCHMARK & EXECUTION PROTOCOL                        */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 bg-[#04070D] border-t border-white/[0.06]">
        <div className="container mx-auto max-w-6xl space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/[0.06]">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase select-none">
                <span>03</span>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span>{isFr ? 'CADRE STRATÉGIQUE & EXÉCUTION' : 'STRATEGIC BENCHMARK & PROTOCOL'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight">
                {isFr ? 'L’Excellence Boutique & la Rigueur d’Exécution' : 'The Boutique Advantage & Execution Model'}
              </h2>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                {isFr
                  ? 'Comparez notre atelier d’ingénierie aux grands cabinets et découvrez notre protocole de livraison en 3 étapes garantissant une mise en production en moins de 90 jours.'
                  : 'Compare our high-velocity boutique engineering model against traditional consultancies and discover our turnkey 90-day production cutover protocol.'}
              </p>
            </div>

            {/* Sub-Tabs: Benchmark vs Protocol */}
            <div className="flex items-center gap-2 bg-[#060A14] p-1.5 rounded-2xl border border-white/[0.08] shrink-0">
              <button
                type="button"
                onClick={() => setStrategicTab('benchmark')}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  strategicTab === 'benchmark'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isFr ? 'Comparatif Cabinets' : 'Why Oakivo Benchmark'}
              </button>
              <button
                type="button"
                onClick={() => setStrategicTab('protocol')}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  strategicTab === 'protocol'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isFr ? 'Protocole 3 Étapes' : '3-Phase Delivery Protocol'}
              </button>
            </div>
          </div>

          {/* Tab 1: Comparison Benchmark Table */}
          {strategicTab === 'benchmark' && (
            <div className="bg-[#090E1D]/90 rounded-3xl border border-white/[0.08] overflow-x-auto shadow-2xl transition-all duration-300">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[720px]">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-[#050811]">
                    <th className="p-5 font-mono text-slate-400 font-medium uppercase text-xs">{isFr ? 'Critère Stratégique' : 'Strategic Dimension'}</th>
                    <th className="p-5 font-mono text-slate-400 font-light uppercase text-xs">{isFr ? 'Grands Cabinets (Big 4)' : 'The Big 4 Monoliths'}</th>
                    <th className="p-5 font-mono text-slate-400 font-light uppercase text-xs">{isFr ? 'Dépanneurs IT / MSPs' : 'Commodity IT / MSPs'}</th>
                    <th className="p-5 font-mono text-cyan-400 font-bold uppercase text-xs bg-cyan-950/20 border-l border-r border-cyan-800/30">{isFr ? 'Oakivo (Atelier Boutique)' : 'Oakivo (Agile Boutique)'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-slate-300">
                  {boutiqueComparison.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                      <td className="p-5 font-medium text-white">{row.dimension}</td>
                      <td className="p-5 text-slate-400">{row.bigConsulting}</td>
                      <td className="p-5 text-slate-400">{row.commodityMSP}</td>
                      <td className="p-5 text-white font-medium bg-cyan-950/15 border-l border-r border-cyan-800/20 flex items-center gap-2.5">
                        <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                        <span>{row.oakivo}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 2: 3-Phase Execution Protocol */}
          {strategicTab === 'protocol' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300">
              <div className="p-8 rounded-3xl bg-[#090E1D]/90 border border-white/[0.08] space-y-4">
                <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Phase 01 · 14 Days</div>
                <h3 className="text-xl font-display font-bold text-white tracking-tight">
                  {isFr ? 'Audit & Spécifications' : 'Discovery & Architecture Blueprint'}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                  {isFr
                    ? 'Cartographie exhaustive des processus d’affaires, inventaire du gaspillage cloud et définition de la feuille de route technique avec calendrier fixe.'
                    : 'Rigorous mapping of operational data flows, FinOps cloud waste audit, and fixed-scope technical blueprint delivered within 14 days.'}
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#090E1D]/90 border border-white/[0.08] space-y-4">
                <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Phase 02 · 30–60 Days</div>
                <h3 className="text-xl font-display font-bold text-white tracking-tight">
                  {isFr ? 'Ingénierie & Intégration' : 'Immutable Build & Validation'}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                  {isFr
                    ? 'Configuration d’Odoo, pipelines Terraform IaC, automatisation des rapprochements bancaires et tests de charge sans interruption.'
                    : 'Turnkey Odoo customization, Terraform cloud infrastructure deployment, automated banking reconciliation, and rigorous zero-downtime testing.'}
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#090E1D]/90 border border-white/[0.08] space-y-4">
                <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Phase 03 · &lt; 90 Days</div>
                <h3 className="text-xl font-display font-bold text-white tracking-tight">
                  {isFr ? 'Bascule en Production' : 'Production Cutover & Governance'}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                  {isFr
                    ? 'Migration sécurisée des données, formation bilingue des équipes et accompagnement direct par les fondateurs à l’Heure de l’Atlantique.'
                    : 'Safe legacy data migration, direct bilingual executive training, and proactive 24/7 SLA governance in Atlantic Standard Time.'}
                </p>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ACT VII: DIRECT FOUNDER DISCOVERY & CONVERSION ANCHOR                  */}
      {/* ========================================================================= */}
      <section id="discovery-contact" className="py-24 md:py-36 px-6 sm:px-8 lg:px-12 bg-[#040815] border-t border-white/[0.06]">
        <div className="container mx-auto max-w-6xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            
            {/* Left Column: Direct Founder Access Promise & Coordinates */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-cyan-400 uppercase select-none">
                  <span>05</span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span>{isFr ? 'RENCONTRE AVEC LES FONDATEURS' : 'DIRECT SENIOR FOUNDER ACCESS'}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight">
                  {isFr 
                    ? 'Planifier Votre Session Découverte de 30 Minutes'
                    : 'Schedule Your 30-Minute Confidential Discovery Session'
                  }
                </h2>
                <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                  {isFr
                    ? 'Vous échangerez directement avec les associés seniors de notre bureau de Dieppe (N.-B.). Nous analyserons vos flux opérationnels, quantifierons le ROI immédiat et répondrons à vos questions. Zéro démarche commerciale.'
                    : 'You will speak directly with senior founding partners from our Dieppe, NB engineering office in Atlantic Standard Time. We evaluate your operations, pinpoint immediate ROI, and answer your questions. Zero sales pitch.'
                  }
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/[0.08] text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={15} className="text-cyan-400" />
                  <span>{isFr ? 'Accès direct aux fondateurs (aucun commercial junior)' : 'Direct founder engineering (no junior salespeople)'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={15} className="text-cyan-400" />
                  <span>{isFr ? '100% Confidentiel (entente de non-divulgation sur demande)' : '100% Confidential (NDA available on request)'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={15} className="text-cyan-400" />
                  <span>{isFr ? 'Réponse garantie sous 24 heures ouvrables' : 'Guaranteed response within 24 business hours'}</span>
                </div>
              </div>

              {/* Direct Founder Coordinates */}
              <div className="pt-6 border-t border-white/[0.08] space-y-3 text-xs font-mono text-slate-400">
                <div className="text-slate-300 font-semibold mb-1">
                  {isFr ? 'Bureau d’Ingénierie · Dieppe, N.-B.' : 'Engineering Hub · Dieppe, NB'}
                  {astTime && <span className="text-cyan-400 ml-2 font-normal">({astTime} AST)</span>}
                </div>
                <div>
                  <a href="mailto:hello@oakivo.com" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <Mail size={14} className="text-cyan-400" />
                    <span>hello@oakivo.com</span>
                  </a>
                </div>
                <div>
                  <a href="tel:+15068002440" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <Phone size={14} className="text-cyan-400" />
                    <span>+1 (506) 800-2440</span>
                  </a>
                </div>
              </div>

              {/* Interactive Tool Quick Links */}
              <div className="pt-6 border-t border-white/[0.08] flex items-center gap-4 text-xs font-mono">
                <Link to="/compliance-matrix" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span>Compliance Matrix</span>
                  <ExternalLink size={12} />
                </Link>
                <span className="text-slate-600">·</span>
                <Link to="/risk-calculator" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span>Risk Calculator</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>

            {/* Right Column: Clean, Streamlined Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#090E1D]/90 border border-white/[0.08] shadow-2xl">
                
                {formStatus === 'success' ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white">
                      {isFr ? 'Demande Reçue avec Succès' : 'Discovery Request Received'}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed">
                      {isFr
                        ? 'Un associé senior de notre bureau de Dieppe examinera vos informations et vous répondra sous 24h avec des propositions d’horaires.'
                        : 'A senior founder from our Dieppe engineering team will review your scope and follow up within 24 hours with direct meeting times.'
                      }
                    </p>
                    <div className="pt-2 flex justify-center gap-3">
                      <Link
                        to="/booking"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        <span>{isFr ? 'Choisir l’Heure sur Calendrier' : 'Pick Calendar Time Now'}</span>
                        <ArrowRight size={13} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setFormStatus('idle')}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                      >
                        {isFr ? 'Nouveau Message' : 'Send Another'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                    {/* Anti-spam honeypot */}
                    <input 
                      type="text" 
                      name="site_safety_check" 
                      value={honeypot} 
                      onChange={(e) => setHoneypot(e.target.value)} 
                      className="hidden" 
                      tabIndex={-1} 
                      autoComplete="off" 
                    />

                    {/* Stream Selection */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        {isFr ? 'Domaine d’Intérêt' : 'Practice Stream'}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'Modern ERP & Operations', labelEn: 'ERP & Operations', labelFr: 'ERP & Opérations' },
                          { id: 'Workflow Automation', labelEn: 'Workflow Automation', labelFr: 'Automatisation des Flux' },
                          { id: 'Cloud Architecture & FinOps', labelEn: 'Cloud & FinOps (-35%)', labelFr: 'Cloud & FinOps (-35%)' },
                          { id: 'Cybersecurity & Canadian Sovereignty', labelEn: 'Security & Sovereignty', labelFr: 'Sécurité & Souveraineté' }
                        ].map(st => (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => setContactForm(prev => ({ ...prev, stream: st.id }))}
                            className={`p-3 rounded-xl text-left text-xs font-mono transition-colors cursor-pointer border ${
                              contactForm.stream === st.id
                                ? 'bg-white text-slate-950 border-white font-semibold'
                                : 'bg-[#050811] border-white/[0.08] text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            {isFr ? st.labelFr : st.labelEn}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Form Inputs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          {isFr ? 'Nom complet *' : 'Full Name *'}
                        </label>
                        <input
                          type="text"
                          value={contactForm.name}
                          onChange={(e) => {
                            setContactForm(prev => ({ ...prev, name: e.target.value }));
                            if (formErrors.name) setFormErrors(prev => ({ ...prev, name: '' }));
                          }}
                          placeholder={isFr ? "Marc Tremblay" : "David MacLeod"}
                          className={`w-full px-4 py-3 rounded-xl bg-[#050811] border text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
                            formErrors.name ? 'border-red-500' : 'border-white/[0.08]'
                          }`}
                        />
                        {formErrors.name && <p className="mt-1 text-[11px] text-red-400">{formErrors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          {isFr ? 'Courriel d’affaires *' : 'Work Email *'}
                        </label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => {
                            setContactForm(prev => ({ ...prev, email: e.target.value }));
                            if (formErrors.email) setFormErrors(prev => ({ ...prev, email: '' }));
                          }}
                          placeholder="name@company.com"
                          className={`w-full px-4 py-3 rounded-xl bg-[#050811] border text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
                            formErrors.email ? 'border-red-500' : 'border-white/[0.08]'
                          }`}
                        />
                        {formErrors.email && <p className="mt-1 text-[11px] text-red-400">{formErrors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        {isFr ? 'Entreprise *' : 'Company Name *'}
                      </label>
                      <input
                        type="text"
                        value={contactForm.company}
                        onChange={(e) => {
                          setContactForm(prev => ({ ...prev, company: e.target.value }));
                          if (formErrors.company) setFormErrors(prev => ({ ...prev, company: '' }));
                        }}
                        placeholder={isFr ? "Logistique Atlantique Inc." : "Atlantic Supply Group Inc."}
                        className={`w-full px-4 py-3 rounded-xl bg-[#050811] border text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
                          formErrors.company ? 'border-red-500' : 'border-white/[0.08]'
                        }`}
                      />
                      {formErrors.company && <p className="mt-1 text-[11px] text-red-400">{formErrors.company}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        {isFr ? 'Description de votre défi ou initiative *' : 'Brief project scope or bottleneck *'}
                      </label>
                      <textarea
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => {
                          setContactForm(prev => ({ ...prev, message: e.target.value }));
                          if (formErrors.message) setFormErrors(prev => ({ ...prev, message: '' }));
                        }}
                        placeholder={isFr 
                          ? "Ex. Nous voulons remplacer nos tableurs par Odoo et automatiser notre facturation..."
                          : "E.g. We want to consolidate spreadsheets into Odoo ERP and automate billing..."
                        }
                        className={`w-full px-4 py-3 rounded-xl bg-[#050811] border text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
                          formErrors.message ? 'border-red-500' : 'border-white/[0.08]'
                        }`}
                      />
                      {formErrors.message && <p className="mt-1 text-[11px] text-red-400">{formErrors.message}</p>}
                    </div>

                    {formStatus === 'error' && (
                      <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                        <AlertCircle size={14} className="shrink-0" />
                        <span>{isFr ? "Erreur d'envoi. Veuillez nous écrire directement à hello@oakivo.com." : "Error submitting. Please email hello@oakivo.com."}</span>
                      </div>
                    )}

                    <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer disabled:opacity-50 shadow-md"
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <Loader2 size={13} className="animate-spin text-slate-950" />
                            <span>{isFr ? 'Envoi...' : 'Submitting...'}</span>
                          </>
                        ) : (
                          <>
                            <Send size={13} />
                            <span>{isFr ? 'Planifier Ma Session Découverte' : 'Schedule Discovery Session'}</span>
                          </>
                        )}
                      </button>

                      <span className="text-[11px] font-mono text-slate-500">
                        {isFr ? 'Réponse sous 24h · 100% Confidentiel' : '24h response · 100% confidential'}
                      </span>
                    </div>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
