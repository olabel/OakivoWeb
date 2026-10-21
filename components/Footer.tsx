import React from 'react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, ArrowRight, Calculator, ShieldCheck, Linkedin } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const triggerDiscoveryDrawer = () => {
    window.dispatchEvent(new CustomEvent('open-lead-drawer', {
      detail: {
        focus: 'Executive Consultation Advisory',
        topic: 'Footer CTA: Executive Consultation',
        industry: isFr ? 'Entreprise Canadienne' : 'Canadian Enterprise'
      }
    }));
  };

  return (
    <footer id="footer" className="bg-[#000000] pt-20 pb-12 px-6 sm:px-8 lg:px-12 border-t border-[#1e2d27]/70 relative text-[#f7faf9]">
      <div className="container mx-auto max-w-7xl">
        
        {/* Pre-Footer Action Strip - Sleek, KPMG Executive Standard */}
        <div className="mb-20 p-8 md:p-10 rounded-3xl bg-[#070a09] border border-[#23c694]/35 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#0f5e4a]/20 blur-3xl rounded-full pointer-events-none" />

          <div className="space-y-2 max-w-2xl relative z-10">
            <span className="nova-eyebrow text-[#23c694]">
              {isFr ? 'ACCÈS DIRECT AUX ASSOCIÉS' : 'DIRECT SENIOR PARTNER CONSULTATION'}
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-light text-white tracking-tight">
              {isFr 
                ? 'Prêt à évaluer vos gains d’automatisation ?'
                : 'Ready to evaluate your applied automation gains?'
              }
            </h3>
            <p className="text-xs md:text-sm text-[#a8b0ad] font-light leading-relaxed">
              {isFr
                ? 'Session de travail confidentielle de 30 minutes avec nos associés fondateurs pour auditer vos processus et cartographier un déploiement concret.'
                : 'Confidential 30-minute working session with our founding partners to assess operational bottlenecks and map an actionable systems blueprint.'
              }
            </p>
          </div>

          <button
            type="button"
            onClick={triggerDiscoveryDrawer}
            className="shrink-0 nova-outline-btn cursor-pointer py-3.5 px-6 relative z-10"
          >
            <span>{isFr ? 'Planifier une Consultation (30 Min)' : 'Book Executive Consultation (30 Min)'}</span>
            <ArrowRight size={14} className="text-[#23c694]" />
          </button>
        </div>

        {/* Main Footer Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#1e2d27]/70">
          
          {/* Brand & Regional Presence Column */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <Link 
                to={NavRoute.HOME} 
                className="inline-block focus:outline-none"
                aria-label="Oakivo Solutions homepage"
              >
                <Logo size="lg" />
              </Link>
            </div>

            <p className="text-xs md:text-sm text-[#a8b0ad] font-light leading-relaxed pr-6">
              {isFr
                ? 'Couche d’intelligence et systèmes autonomes pour entreprises canadiennes : accélération des devis en 45s, suppression de la paperasse comptable et souveraineté totale des données.'
                : 'Applied intelligence and autonomous systems for Canadian enterprise: under-45-second quote acceleration, paperless accounting workflows, and 100% sovereign Canadian data residency.'
              }
            </p>

            <div className="space-y-2.5 pt-2 text-xs font-mono text-[#7c8581]">
              <div className="flex items-center gap-2 text-[#dce3e0]">
                <MapPin size={13} className="text-[#23c694] shrink-0" />
                <span>Dieppe, NB (HQ) · Montreal ca-central-1 AWS</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-[#23c694] shrink-0" />
                <a href="mailto:founders@oakivo.ca" className="hover:text-[#23c694] transition-colors">
                  founders@oakivo.ca
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-[#23c694] shrink-0" />
                <a href="tel:+15068002440" className="hover:text-[#23c694] transition-colors">
                  +1 (506) 800-2440
                </a>
              </div>
              <div className="pt-1 text-[11px] text-[#23c694] font-medium">
                {isFr ? 'Équipe 100% Bilingue · Heure de l’Atlantique (HNA)' : '100% Bilingual Practice · Atlantic Standard Time (AST)'}
              </div>
            </div>
          </div>

          {/* Nav Directory Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Column 1: Core Solutions */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#f7faf9]">
                {isFr ? 'Services & Systèmes' : 'Services & Systems'}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to={NavRoute.SERVICES} className="text-xs md:text-sm text-[#a8b0ad] hover:text-[#23c694] transition-colors">
                    {isFr ? 'Moteur de Ventes & Devis Immédiats' : 'Speed-to-Lead & Quote Engines'}
                  </Link>
                </li>
                <li>
                  <Link to={NavRoute.SERVICES} className="text-xs md:text-sm text-[#a8b0ad] hover:text-[#23c694] transition-colors">
                    {isFr ? 'Zéro Saisie & Synchronisation ERP' : 'Zero-Typing Accounting & ERP'}
                  </Link>
                </li>
                <li>
                  <Link to={NavRoute.SERVICES} className="text-xs md:text-sm text-[#a8b0ad] hover:text-[#23c694] transition-colors">
                    {isFr ? 'Studio Logiciel & MVPs Sur Mesure' : 'Custom Software & MVP Studio'}
                  </Link>
                </li>
                <li>
                  <Link to={NavRoute.SERVICES} className="text-xs md:text-sm text-[#a8b0ad] hover:text-[#23c694] transition-colors">
                    {isFr ? 'Souveraineté Cloud & Conformité LPRPDE' : 'PIPEDA & Law 25 Cloud Residency'}
                  </Link>
                </li>
                <li>
                  <Link to="/verticals" className="text-xs md:text-sm text-[#a8b0ad] hover:text-[#23c694] transition-colors">
                    {isFr ? 'Secteurs d’Industrie Ciblés' : 'Industry Verticals'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: The Firm & Governance */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#f7faf9]">
                {isFr ? 'Le Cabinet' : 'The Practice'}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to={NavRoute.ABOUT} className="text-xs md:text-sm text-[#a8b0ad] hover:text-[#23c694] transition-colors">
                    {isFr ? 'Pourquoi Oakivo' : 'Why Oakivo'}
                  </Link>
                </li>
                <li>
                  <Link to="/case-studies" className="text-xs md:text-sm text-[#a8b0ad] hover:text-[#23c694] transition-colors">
                    {isFr ? 'Études de Cas & Résultats' : 'Client Case Studies'}
                  </Link>
                </li>
                <li>
                  <Link to="/insights" className="text-xs md:text-sm text-[#a8b0ad] hover:text-[#23c694] transition-colors">
                    {isFr ? 'Perspectives & Analyses' : 'Executive Insights'}
                  </Link>
                </li>
                <li>
                  <Link to={NavRoute.CONTACT} className="text-xs md:text-sm text-[#a8b0ad] hover:text-[#23c694] transition-colors">
                    {isFr ? 'Siège Social & Contact' : 'Headquarters & Inquiries'}
                  </Link>
                </li>
                <li>
                  <Link to={NavRoute.CAREERS} className="text-xs md:text-sm text-[#a8b0ad] hover:text-[#23c694] transition-colors">
                    {isFr ? 'Carrières en Ingénierie' : 'Engineering Careers'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Interactive Tools & Audits */}
            <div className="space-y-4 col-span-2 md:col-span-1">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#f7faf9]">
                {isFr ? 'Diagnostics & Outils' : 'Audits & Tools'}
              </h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent('open-ai-audit-modal'))}
                    className="text-xs md:text-sm text-[#23c694] font-medium hover:text-[#85e1bf] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calculator size={13} />
                    <span>{isFr ? 'Audit d’Éligibilité IA (60s)' : '60-Second AI Audit'}</span>
                    <span className="text-[10px] font-mono text-[#23c694] px-1.5 py-0.5 rounded-full bg-[#0f5e4a]/30 border border-[#23c694]/40">Live</span>
                  </button>
                </li>
                <li>
                  <Link to="/compliance-grader" className="text-xs md:text-sm text-[#a8b0ad] hover:text-[#23c694] transition-colors flex items-center gap-1.5">
                    <ShieldCheck size={13} />
                    <span>{isFr ? 'Évaluateur Réglementaire' : 'Compliance Readiness Grader'}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/compliance-matrix" className="text-xs md:text-sm text-[#a8b0ad] hover:text-[#23c694] transition-colors">
                    {isFr ? 'Matrice de Conformité LPRPDE' : 'PIPEDA / Law 25 Matrix'}
                  </Link>
                </li>
                <li>
                  <Link to="/risk-calculator" className="text-xs md:text-sm text-[#a8b0ad] hover:text-[#23c694] transition-colors">
                    {isFr ? 'Calculateur de Vulnérabilités' : 'Risk & Security Calculator'}
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#7c8581]">
          <p>
            © {new Date().getFullYear()} Oakivo Solutions Inc. · {isFr ? 'Tous droits réservés' : 'All rights reserved'}.
          </p>

          <div className="flex items-center gap-6">
            <Link to={NavRoute.PRIVACY} className="hover:text-[#f7faf9] transition-colors">
              {isFr ? 'Confidentialité' : 'Privacy Policy'}
            </Link>
            <span className="text-[#36423d]" aria-hidden="true">·</span>
            <Link to={NavRoute.COMPLIANCE} className="hover:text-[#f7faf9] transition-colors">
              {isFr ? 'Sécurité & Données' : 'Security & Trust'}
            </Link>
            <span className="text-[#36423d]" aria-hidden="true">·</span>
            <a 
              href="https://www.linkedin.com/company/oakivo" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Oakivo LinkedIn"
              className="hover:text-[#23c694] transition-colors"
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
