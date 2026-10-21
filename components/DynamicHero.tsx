import React, { useState, useId } from 'react';
import { 
  ArrowRight, ShieldCheck, Clock, CheckCircle2, 
  Calculator, Sliders, ChevronRight, Server, Zap, 
  Check, Lock, FileCheck, PhoneCall, Receipt, Sparkles, Building2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DynamicHeroProps {
  onOpenAudit?: () => void;
  onScrollToContact?: () => void;
  onScrollToBlueprints?: () => void;
}

type HeroTab = 'calculator' | 'architecture';

export const DynamicHero: React.FC<DynamicHeroProps> = ({ 
  onOpenAudit, 
  onScrollToContact,
  onScrollToBlueprints 
}) => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  // Active view inside the executive console card
  const [activeTab, setActiveTab] = useState<HeroTab>('calculator');

  // Interactive ROI Calculator State
  const [inboundVolume, setInboundVolume] = useState<number>(45); // monthly inquiries
  const [adminHoursPerWeek, setAdminHoursPerWeek] = useState<number>(14); // weekly admin hours

  const inboundSliderId = useId();
  const adminSliderId = useId();

  // Calculated benchmarks based on real Canadian SME figures:
  // - Speed-to-lead recovers ~18% more qualified quotes ($3,500 avg deal size)
  // - Admin automation saves ~75% of manual invoice/timesheet processing time at $38/hr blended cost
  const estimatedHoursSavedMonth = Math.round(adminHoursPerWeek * 4.33 * 0.75);
  const annualPayrollReclaimed = Math.round(estimatedHoursSavedMonth * 12 * 38);
  const potentialNewBidsWon = Math.max(1, Math.round(inboundVolume * 0.08));

  const handleContactClick = () => {
    if (onScrollToContact) {
      onScrollToContact();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBlueprintsClick = () => {
    if (onScrollToBlueprints) {
      onScrollToBlueprints();
    } else {
      const el = document.getElementById('blueprints');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAuditClick = () => {
    if (onOpenAudit) {
      onOpenAudit();
    } else {
      window.dispatchEvent(new CustomEvent('open-ai-audit-modal'));
    }
  };

  return (
    <section 
      id="hero" 
      aria-label={isFr ? "Accueil Oakivo Solutions" : "Oakivo Solutions Overview"} 
      className="relative min-h-[92vh] flex flex-col items-center justify-center bg-[#050811] text-white pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden border-b border-white/[0.08]"
    >
      {/* 
        Background Layer: Precision Architectural Blueprint Grid & Soft Ambient Luster
        Strictly static, zero video, zero distracting animations
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
        {/* Soft Radial Ambient Halos */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-emerald-500/[0.07] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] bg-cyan-500/[0.05] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 -left-24 w-[500px] h-[500px] bg-slate-500/[0.04] blur-[160px] rounded-full pointer-events-none" />

        {/* Crisp Hairline Engineering Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_40%,transparent_100%)] pointer-events-none" />
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl text-center">
        
        {/* Kicker: Canadian Identity & Engineering Focus (Zero-Pill Discipline) */}
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-slate-300 uppercase mb-8">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-white font-semibold">Oakivo Solutions</span>
          <span className="text-slate-600" aria-hidden="true">/</span>
          <span>{isFr ? 'Dieppe, Nouveau-Brunswick' : 'Dieppe, New Brunswick'}</span>
          <span className="text-slate-600 hidden sm:inline" aria-hidden="true">/</span>
          <span className="text-cyan-400 hidden sm:inline">{isFr ? 'Ingénierie Logicielle & Automatisation' : 'Software & Applied Automation'}</span>
        </div>

        {/* Masterpiece Headline: Disciplined, Grounded, Authoritative */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-semibold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto mb-6 text-balance">
          {isFr ? (
            <>
              Automatisation discrète et logiciels sur mesure pour les entreprises d'ici.
            </>
          ) : (
            <>
              Quiet automation and reliable custom software for Canadian business.
            </>
          )}
        </h1>

        {/* Measured, Honest Value Proposition */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed mb-10 text-balance">
          {isFr
            ? "Nous aidons les PME canadiennes à remporter plus de devis, éliminer la paperasse répétitive et déployer des logiciels robustes. Livré en sprints de 14 jours, avec hébergement souverain à Montréal et validation humaine à 100 %."
            : "We engineer production-grade systems that turn inbound leads into signed contracts, eliminate hours of manual paperwork, and launch bespoke web tools. Deployed in 14-day sprints with domestic Canadian hosting and 100% human-in-the-loop validation."
          }
        </p>

        {/* Dual Primary Action Pair */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            type="button"
            onClick={handleContactClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-medium text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg shadow-white/10 hover:shadow-white/20 active:scale-[0.99]"
          >
            <span>{isFr ? 'Échanger Avec un Ingénieur' : 'Talk With an Engineer'}</span>
            <ArrowRight size={14} />
          </button>

          <button 
            type="button"
            onClick={handleAuditClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-slate-900/80 hover:bg-white/[0.08] text-slate-200 hover:text-white font-medium text-xs font-mono tracking-wider border border-white/[0.15] hover:border-white/[0.3] transition-all duration-200 cursor-pointer backdrop-blur-md"
          >
            <Sparkles size={14} className="text-cyan-400" />
            <span>{isFr ? 'Diagnostic de Faisabilité (60s)' : '60-Second Readiness Audit'}</span>
          </button>
        </div>

        {/* 
          Centerpiece: The Sovereign Engineering Console
          Replacing the video and operational workflows with an exceptional, interactive, high-value asset
        */}
        <div className="relative mx-auto max-w-4xl text-left">
          
          {/* Subtle Accent Glow around the Console */}
          <div 
            className="absolute -inset-1 bg-gradient-to-r from-emerald-500/15 via-cyan-500/20 to-slate-500/10 rounded-2xl blur-xl opacity-75 pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="relative rounded-2xl bg-slate-950/95 border border-white/[0.12] shadow-2xl backdrop-blur-xl overflow-hidden">
            
            {/* Terminal Window Header Bar */}
            <div className="px-5 py-3.5 bg-white/[0.03] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-px bg-white/[0.1]" />
                <span className="text-xs font-mono text-slate-300 flex items-center gap-2">
                  <Server size={12} className="text-cyan-400" />
                  <span className="text-slate-400">oakivo ::</span>
                  <span className="text-white font-medium">{isFr ? 'console-ingenierie-pme' : 'smb-engineering-console'}</span>
                </span>
              </div>

              {/* Console Mode Switcher (Calculator vs Architecture Blueprint) */}
              <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-lg border border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setActiveTab('calculator')}
                  className={`px-3 py-1 rounded text-xs font-mono tracking-tight transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'calculator' 
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold shadow-xs' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Calculator size={12} />
                  <span>{isFr ? 'Simulateur d’Impact' : 'Impact Estimator'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('architecture')}
                  className={`px-3 py-1 rounded text-xs font-mono tracking-tight transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'architecture' 
                      ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-xs' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck size={12} />
                  <span>{isFr ? 'Sas de Contrôle Humain' : 'Safe Architecture'}</span>
                </button>
              </div>
            </div>

            {/* Console Content Body */}
            <div className="p-6 md:p-8">
              
              {activeTab === 'calculator' ? (
                /* TAB 1: Real-World Time & Revenue Estimator */
                <div className="space-y-6">
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
                    <div>
                      <h2 className="text-base font-semibold text-white">
                        {isFr ? 'Estimation Pratique de Gain de Temps & Revenus' : 'Practical Time & Revenue Yield Simulator'}
                      </h2>
                      <p className="text-xs text-slate-400 font-light mt-0.5">
                        {isFr 
                          ? 'Ajustez vos volumes actuels pour visualiser les heures récupérées et les devis sauvés.' 
                          : 'Adjust your current operating volume to see hours reclaimed and recovered quotes.'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                        {isFr ? 'Déploiement en 14 Jours' : '14-Day Sprint Ready'}
                      </span>
                    </div>
                  </div>

                  {/* Sliders Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    
                    {/* Slider 1: Monthly Inbound Leads */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor={inboundSliderId} className="text-xs font-mono text-slate-300 flex items-center gap-2">
                          <PhoneCall size={13} className="text-cyan-400" />
                          <span>{isFr ? 'Demandes & Appels / mois' : 'Monthly Inbound Inquiries'}</span>
                        </label>
                        <span className="text-sm font-mono font-semibold text-white bg-slate-900 px-2.5 py-0.5 rounded border border-white/[0.1]">
                          {inboundVolume}
                        </span>
                      </div>
                      <input 
                        id={inboundSliderId}
                        type="range"
                        min="10"
                        max="250"
                        step="5"
                        value={inboundVolume}
                        onChange={(e) => setInboundVolume(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        aria-label={isFr ? "Nombre de demandes par mois" : "Monthly inbound leads slider"}
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500">
                        <span>10 / mo</span>
                        <span>125 / mo</span>
                        <span>250+ / mo</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-light">
                        {isFr 
                          ? 'Réponse automatique en < 90s aux appels manqués et formulaires web.' 
                          : 'Automated <90s 2-way SMS/quote drafting for after-hours calls & web forms.'}
                      </p>
                    </div>

                    {/* Slider 2: Weekly Admin / Invoicing Hours */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor={adminSliderId} className="text-xs font-mono text-slate-300 flex items-center gap-2">
                          <Receipt size={13} className="text-emerald-400" />
                          <span>{isFr ? 'Heures de paperasse / sem.' : 'Weekly Admin Desk Hours'}</span>
                        </label>
                        <span className="text-sm font-mono font-semibold text-white bg-slate-900 px-2.5 py-0.5 rounded border border-white/[0.1]">
                          {adminHoursPerWeek} h
                        </span>
                      </div>
                      <input 
                        id={adminSliderId}
                        type="range"
                        min="4"
                        max="35"
                        step="1"
                        value={adminHoursPerWeek}
                        onChange={(e) => setAdminHoursPerWeek(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                        aria-label={isFr ? "Heures administratives par semaine" : "Weekly administrative hours slider"}
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500">
                        <span>4 h</span>
                        <span>18 h</span>
                        <span>35 h</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-light">
                        {isFr 
                          ? 'Saisie de factures fournisseurs, feuilles de temps et synchro comptable.' 
                          : 'Manual PDF invoice extraction, timesheets, and accounting ledger entry.'}
                      </p>
                    </div>

                  </div>

                  {/* Calculated Results Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    
                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                        {isFr ? 'Temps Récupéré' : 'Reclaimed Time'}
                      </span>
                      <div className="mt-2 flex items-baseline gap-1.5">
                        <span className="text-2xl font-bold font-mono text-white">~{estimatedHoursSavedMonth}</span>
                        <span className="text-xs text-slate-400 font-mono">{isFr ? 'h / mois' : 'hrs / mo'}</span>
                      </div>
                      <span className="text-[10px] text-cyan-400 font-mono mt-1">
                        {isFr ? 'Directement réinjectées dans les ventes' : 'Directly redirected to client work'}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                        {isFr ? 'Valeur Salariale Libérée' : 'Payroll Cost Saved'}
                      </span>
                      <div className="mt-2 flex items-baseline gap-1.5">
                        <span className="text-2xl font-bold font-mono text-emerald-400">
                          ${annualPayrollReclaimed.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">CAD / an</span>
                      </div>
                      <span className="text-[10px] text-emerald-400/80 font-mono mt-1">
                        {isFr ? 'Sur la base de 38 $/h chargé' : 'Based on $38/hr blended desk rate'}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                        {isFr ? 'Devis Gagnés Additionnels' : 'Rescued Proposals'}
                      </span>
                      <div className="mt-2 flex items-baseline gap-1.5">
                        <span className="text-2xl font-bold font-mono text-cyan-300">+{potentialNewBidsWon}</span>
                        <span className="text-xs text-slate-400 font-mono">{isFr ? 'devis / mois' : 'bids / mo'}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono mt-1">
                        {isFr ? 'Grâce à la réponse < 90 secondes' : 'Via instant speed-to-lead response'}
                      </span>
                    </div>

                  </div>

                  {/* Inline Action Link */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono border-t border-white/[0.06]">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock size={13} className="text-amber-400" />
                      <span>{isFr ? 'Étude de cas similaire : Récupération de 11h/semaine pour un distributeur canadien' : 'Typical sprint outcome: 11 hrs/wk reclaimed for Atlantic distributor'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleContactClick}
                      className="text-white hover:text-cyan-300 inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
                    >
                      <span>{isFr ? 'Configurer cette architecture pour votre équipe' : 'Deploy this architecture for your team'}</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>

                </div>
              ) : (
                /* TAB 2: The Safe Human-in-the-Loop Architecture */
                <div className="space-y-6">
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
                    <div>
                      <h2 className="text-base font-semibold text-white">
                        {isFr ? 'Le Protocole « L’IA Prépare, l’Humain Valide »' : 'The "AI Prepares, Humans Approve" Safety Protocol'}
                      </h2>
                      <p className="text-xs text-slate-400 font-light mt-0.5">
                        {isFr 
                          ? 'Pourquoi nos systèmes ne commettent jamais d’erreur autonome sur vos devis ou votre grand livre.' 
                          : 'Why our systems never dispatch unverified emails or make rogue ledger edits.'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                        {isFr ? 'Loi 25 & LPRPDE Conformes' : 'PIPEDA & Law 25 Compliant'}
                      </span>
                    </div>
                  </div>

                  {/* 3-Step Schematic Flow */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    
                    {/* Step 1 */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Étape / Step 01</span>
                        <Zap size={13} className="text-amber-400" />
                      </div>
                      <h3 className="text-xs font-semibold text-white">
                        {isFr ? 'Capture & Synthèse Inbound' : 'Inbound Capture & Extraction'}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                        {isFr 
                          ? 'Appel manqué, formulaire web ou facture PDF fournisseur reçu. L’agent extrait les lignes et calcule le montant exact en 15 secondes.' 
                          : 'Missed call, web bid, or vendor PDF arrives. System parses line items and drafts calculations in 15 seconds.'}
                      </p>
                      <div className="pt-1 text-[10px] font-mono text-slate-500">
                        ⚡ {isFr ? 'Délai moyen : 15s' : 'Execution time: ~15s'}
                      </div>
                    </div>

                    {/* Step 2 (The Gate) */}
                    <div className="p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/30 space-y-2 relative shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                          {isFr ? 'Sas Obligatoire' : 'Mandatory Gate'}
                        </span>
                        <Lock size={13} className="text-emerald-400" />
                      </div>
                      <h3 className="text-xs font-semibold text-emerald-300">
                        {isFr ? 'Sas de Validation Humaine' : 'Human Approval Air-Gap'}
                      </h3>
                      <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                        {isFr 
                          ? 'Rien ne part automatiquement. Le gestionnaire reçoit une alerte WhatsApp ou SMS et confirme d’un clic sur son téléphone.' 
                          : 'Nothing sends automatically. Manager receives a clean mobile preview and taps to approve, edit, or decline.'}
                      </p>
                      <div className="pt-1 text-[10px] font-mono text-emerald-400 font-medium">
                        🛡️ {isFr ? 'Zéro courriel fantôme' : 'Zero rogue dispatches'}
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Étape / Step 03</span>
                        <Server size={13} className="text-cyan-400" />
                      </div>
                      <h3 className="text-xs font-semibold text-white">
                        {isFr ? 'Exécution Souveraine Canada' : 'Sovereign Dispatch & Sync'}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                        {isFr 
                          ? 'Envoi instantané au client, synchronisation dans QuickBooks/Xero et archivage immuable sur AWS ca-central-1 à Montréal.' 
                          : 'Instant client dispatch, ledger sync to QuickBooks/ERP, and encrypted audit logging in Montreal AWS.'}
                      </p>
                      <div className="pt-1 text-[10px] font-mono text-cyan-400">
                        🍁 {isFr ? 'Données résidentes au Canada' : 'Domestic data residency'}
                      </div>
                    </div>

                  </div>

                  {/* Architecture Specs Bottom Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono border-t border-white/[0.06]">
                    <div className="flex items-center gap-2 text-slate-400">
                      <CheckCircle2 size={13} className="text-emerald-400" />
                      <span>{isFr ? 'Propriété intégrale du code source — aucun verrouillage propriétaire' : '100% client code ownership — zero vendor lock-in'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleBlueprintsClick}
                      className="text-white hover:text-emerald-300 inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
                    >
                      <span>{isFr ? 'Consulter les schémas techniques détaillés' : 'Inspect full technical blueprints'}</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

        {/* 
          Trust & Sovereignty Strip: Unboxed, Clean, Human 
          Zero-Pill Discipline
        */}
        <div className="pt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-2 text-slate-300">
            <Clock size={13} className="text-cyan-400" />
            <span>{isFr ? 'Sprints de livraison en 14 jours' : '14-Day Delivery Sprints'}</span>
          </span>
          
          <span className="text-slate-700 hidden sm:inline" aria-hidden="true">·</span>
          
          <span className="flex items-center gap-2 text-slate-300">
            <Server size={13} className="text-emerald-400" />
            <span>{isFr ? 'Hébergement Montréal (ca-central-1)' : 'Domestic AWS Montreal (ca-central-1)'}</span>
          </span>
          
          <span className="text-slate-700 hidden sm:inline" aria-hidden="true">·</span>
          
          <span className="flex items-center gap-2 text-slate-300">
            <ShieldCheck size={13} className="text-cyan-400" />
            <span>{isFr ? 'Loi 25 & LPRPDE Conformes' : 'PIPEDA & Law 25 Compliant'}</span>
          </span>
          
          <span className="text-slate-700 hidden sm:inline" aria-hidden="true">·</span>
          
          <span className="flex items-center gap-2 text-slate-300">
            <FileCheck size={13} className="text-slate-400" />
            <span>{isFr ? 'Garantie pilote de 30 jours' : '30-Day Risk-Free Pilot Guarantee'}</span>
          </span>
        </div>

      </div>
    </section>
  );
};

export default DynamicHero;
