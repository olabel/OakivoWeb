import React from 'react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, ArrowRight, Calculator, ShieldCheck, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const isFr = language === 'fr';

  const triggerDiscoveryDrawer = () => {
    window.dispatchEvent(new CustomEvent('open-lead-drawer', {
      detail: {
        focus: 'General Digital Transformation Advisory',
        topic: 'Footer CTA: Discovery Session',
        industry: isFr ? 'Entreprise Canadienne' : 'Canadian Enterprise'
      }
    }));
  };

  return (
    <footer id="contact" className="bg-[#05070B] pt-20 pb-12 px-6 border-t border-white/[0.08] relative">
      <div className="container mx-auto max-w-7xl">
        
        {/* Pre-Footer Action Strip - Sleek, Minimalist, High Converting */}
        <div className="mb-20 p-8 md:p-10 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block">
              {isFr ? 'ACCÈS DIRECT AUX FONDATEURS' : 'DIRECT SENIOR FOUNDER PARTNERSHIP'}
            </span>
            <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">
              {isFr 
                ? 'Prêt à éliminer la friction administrative et accélérer vos revenus ?'
                : 'Ready to eliminate operational friction and accelerate company revenue?'
              }
            </h3>
            <p className="text-xs md:text-sm text-slate-400 font-light">
              {isFr
                ? 'Session confidentielle de 30 minutes sans engagement commercial pour cartographier vos gains d’automatisation.'
                : '30-minute confidential session with senior partners to evaluate bottlenecks and map high-ROI quick wins.'
              }
            </p>
          </div>

          <button
            type="button"
            onClick={triggerDiscoveryDrawer}
            className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-cyan-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <span>{isFr ? 'Planifier Ma Session (30 Min)' : 'Schedule 30-Min Discovery'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Main Footer Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/[0.08]">
          
          {/* Brand & Regional Presence Column */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <Link 
                to={NavRoute.HOME} 
                className="text-2xl font-display font-bold tracking-tight text-white flex items-center"
              >
                OAKIVO<span className="text-cyan-400">.</span>
              </Link>
              <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">
                {isFr ? 'Ingénierie & Transformation Boutique' : 'Boutique Technology Engineering'}
              </p>
            </div>

            <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed pr-6">
              {isFr
                ? 'Nous modernisons et automatisons les entreprises canadiennes en pleine croissance : ERP moderne unifié, flux de travail sans friction et conformité continue avec accès direct aux fondateurs.'
                : 'Tailored modern ERP, hands-free business workflow automations, and resilient cloud engineering for growing mid-market enterprises. Built in Atlantic Canada with direct senior founder accountability.'
              }
            </p>

            <div className="space-y-2.5 pt-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin size={13} className="text-cyan-400 shrink-0" />
                <span>Dieppe, NB (HQ) · Halifax · Charlottetown · St. John’s</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-cyan-400 shrink-0" />
                <a href="mailto:hello@oakivo.com" className="hover:text-cyan-400 transition-colors">
                  hello@oakivo.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-cyan-400 shrink-0" />
                <a href="tel:+15068002440" className="hover:text-cyan-400 transition-colors">
                  +1 (506) 800-2440
                </a>
              </div>
              <div className="pt-1 text-[11px] text-cyan-400 font-medium">
                {isFr ? 'Équipe 100% Bilingue • Heure de l’Atlantique (HNA)' : '100% Bilingual Team • Atlantic Standard Time'}
              </div>
            </div>
          </div>

          {/* Nav Directory Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Column 1: Core Solutions */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
                {isFr ? 'Solutions & Services' : 'Core Solutions'}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to={NavRoute.SERVICES} className="text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    {isFr ? 'ERP Moderne & Opérations Unifiées' : 'Modern ERP & Clean Operations'}
                  </Link>
                </li>
                <li>
                  <Link to={NavRoute.SERVICES} className="text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    {isFr ? 'Automatisation des Flux & Facturation' : 'Workflow & Billing Automation'}
                  </Link>
                </li>
                <li>
                  <Link to={NavRoute.SERVICES} className="text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    {isFr ? 'Conception Web Créative & Image Numérique' : 'Creative Website Design & Digital Exposure'}
                  </Link>
                </li>
                <li>
                  <Link to={NavRoute.SERVICES} className="text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    {isFr ? 'Cloud Souverain & Sécurité Concrète' : 'Sovereign Cloud & Practical Security'}
                  </Link>
                </li>
                <li>
                  <Link to="/compliance-matrix" className="text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    {isFr ? 'Conformité Continue (LPRPDE, SOC 2, Loi 25)' : 'Continuous Compliance (SOC 2, PIPEDA, Law 25)'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: The Firm & Methodology */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
                {isFr ? 'Le Cabinet Boutique' : 'The Boutique Firm'}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to={NavRoute.ABOUT} className="text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    {isFr ? 'Pourquoi Choisir Oakivo' : 'Why Oakivo (The Difference)'}
                  </Link>
                </li>
                <li>
                  <Link to={NavRoute.METHODOLOGY} className="text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    {isFr ? 'Méthodologie en 3 Étapes' : '3-Step Engagement Method'}
                  </Link>
                </li>
                <li>
                  <Link to={NavRoute.COMPLIANCE} className="text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    {isFr ? 'Souveraineté des Données Canada' : 'Canadian Data Sovereignty'}
                  </Link>
                </li>
                <li>
                  <Link to={NavRoute.CAREERS} className="text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    {isFr ? 'Carrières & Talents' : 'Careers & Engineering'}
                  </Link>
                </li>
                <li>
                  <Link to={NavRoute.CONTACT} className="text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    {isFr ? 'Contact Direct & Siège' : 'Contact Headquarters'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Interactive Tools & Resources */}
            <div className="space-y-4 col-span-2 md:col-span-1">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
                {isFr ? 'Outils & Évaluation' : 'Tools & Assessment'}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/services#roi-calculator" 
                    className="text-xs md:text-sm text-cyan-400 font-medium hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  >
                    <Calculator size={13} />
                    <span>{isFr ? 'Calculateur de RCI' : 'Automation ROI Calculator'}</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/30">Live</span>
                  </Link>
                </li>
                <li>
                  <Link to="/compliance-grader" className="text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                    <ShieldCheck size={13} />
                    <span>{isFr ? 'Évaluateur Réglementaire' : 'Compliance Readiness Grader'}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/compliance-matrix" className="text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    {isFr ? 'Matrice de Conformité' : 'Compliance Matrix (LPRPDE / SOC 2)'}
                  </Link>
                </li>
                <li>
                  <Link to="/insights" className="text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    {isFr ? 'Articles & Analyses Pratiques' : 'Modernization Insights'}
                  </Link>
                </li>
                <li>
                  <Link to="/risk-calculator" className="text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    {isFr ? 'Calculateur de Risque' : 'Risk & Vulnerability Calculator'}
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>
            © {new Date().getFullYear()} Oakivo Solutions Inc. · {isFr ? 'Tous droits réservés' : 'All rights reserved'}.
          </p>

          <div className="flex items-center gap-6">
            <Link to={NavRoute.PRIVACY} className="hover:text-slate-300 transition-colors">
              {isFr ? 'Confidentialité' : 'Privacy Policy'}
            </Link>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <Link to={NavRoute.COMPLIANCE} className="hover:text-slate-300 transition-colors">
              {isFr ? 'Sécurité & Données' : 'Security & Trust'}
            </Link>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <a 
              href="https://www.linkedin.com/company/oakivo" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Oakivo LinkedIn"
              className="hover:text-cyan-400 transition-colors"
            >
              <Linkedin size={14} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
