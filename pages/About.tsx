import React from 'react';
import { 
  ShieldCheck, ArrowRight, Zap, CheckCircle2, Users, Layers, TrendingUp, Clock,
  Terminal, GitBranch, Database, Activity, Lock, MapPin, Palette
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavRoute } from '../types';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import MeetOurExperts from '../components/MeetOurExperts';

const OperatingPrinciples = [
  {
    number: '01',
    title: 'Personal Touch & Direct Founder Access',
    icon: <Users size={24} className="text-cyan-400" />,
    description: 'No junior hand-offs or multi-tier ticket escalation. You work directly with experienced founders and senior engineers who take personal ownership of your outcomes.'
  },
  {
    number: '02',
    title: 'Pragmatic Modern ERP & Automation',
    icon: <Zap size={24} className="text-cyan-400" />,
    description: 'We replace messy spreadsheets and double-entry busywork with clean modern ERP systems, automated billing workflows, and back-office pipelines that pay for themselves.'
  },
  {
    number: '03',
    title: 'Creative Web Design & Digital Presence',
    icon: <Palette size={24} className="text-cyan-400" />,
    description: 'We craft high-converting, bespoke websites and digital brand experiences that help Canadian businesses gain serious credibility, rank on Google, and win new clients.'
  },
  {
    number: '04',
    title: 'Built-in Security & Canadian Sovereignty',
    icon: <ShieldCheck size={24} className="text-amber-400" />,
    description: 'Every software environment and database is fortified with sovereign Canadian hosting (AWS/Azure) and automated compliance (SOC 2, PIPEDA, Law 25) from day one.'
  }
];

const TrustMetrics = [
  { value: '100% Bilingual', label: 'English & French Engineering', subtext: 'Direct Dieppe, NB team' },
  { value: '< 15 Mins', label: 'Local Response SLA', subtext: 'Atlantic Standard Time' },
  { value: 'Weeks, Not Years', label: 'Rapid ERP & Web Deployment', subtext: 'Agile delivery model' },
  { value: '24/7/365', label: 'Continuous Automated Compliance', subtext: 'SOC 2 & PIPEDA ready' }
];

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const isFr = language === 'fr';

  const boutiqueComparison = [
    {
      parameter: isFr ? 'Modèle d\'Équipe' : 'Team & Leadership',
      bigConsulting: isFr ? 'Consultants juniors après la vente, bureaucratie lourde' : 'Junior staff post-pitch, heavy layers of bureaucracy',
      commodityMSP: isFr ? 'Techniciens de soutien généralistes (niveau 1)' : 'Tier-1 helpdesk & break-fix technicians',
      oakivo: isFr ? 'Accès direct aux fondateurs & ingénieurs seniors' : 'Direct senior founders & engineers on every project'
    },
    {
      parameter: isFr ? 'ERP Moderne & Opérations' : 'Modern ERP & Operations',
      bigConsulting: isFr ? 'Projets lourds à plusieurs millions de dollars et 12 mois de slides' : 'Multi-million dollar custom builds or SAP only',
      commodityMSP: isFr ? 'Aucune compétence en programmation ou ERP' : 'Zero ERP or business software capabilities',
      oakivo: isFr ? 'Déploiement ERP pragmatique et sur mesure en quelques semaines' : 'Pragmatic, tailored modern ERP delivering ROI in weeks'
    },
    {
      parameter: isFr ? 'Automatisation des Flux' : 'Workflow Automation',
      bigConsulting: isFr ? 'Intergiciels complexes et hors de prix' : 'Expensive custom middleware retainers',
      commodityMSP: isFr ? 'Bricolages manuels ou scripts fragiles' : 'Basic script / fragile manual fixes',
      oakivo: isFr ? 'Pipelines automatisés déterministes et auto-cicatrisants' : 'End-to-end resilient automated pipelines'
    },
    {
      parameter: isFr ? 'Conception Web Créative' : 'Creative Web Design',
      bigConsulting: isFr ? 'Sous-traité à des agences de branding tierces' : 'Outsourced to expensive third-party agencies',
      commodityMSP: isFr ? 'Modèles génériques lents et peu attrayants' : 'Slow cookie-cutter templates that fail to convert',
      oakivo: isFr ? 'Design sur mesure ultra-rapide, optimisé SEO et axé conversion' : 'Custom, blazing-fast websites engineered to convert'
    },
    {
      parameter: isFr ? 'Délai de Rentabilité' : 'Speed to Value',
      bigConsulting: isFr ? '6 à 12 mois de présentations PowerPoint' : '6–12 months of slide decks & discovery',
      commodityMSP: isFr ? 'Réactif au coup par coup' : 'Ad-hoc / reactive break-fix tickets',
      oakivo: isFr ? 'Prototypes fonctionnels et gains mesurables en semaines' : 'Working prototypes & ROI in weeks'
    },
    {
      parameter: isFr ? 'Proximité & Culture' : 'Local Touch & Culture',
      bigConsulting: isFr ? 'Équipes éloignées à Toronto ou à l\'étranger' : 'Remote Toronto / offshore call centers',
      commodityMSP: isFr ? 'Local mais portée technique très restreinte' : 'Local, but limited technical scope',
      oakivo: isFr ? '100 % Bilingue (FR/EN) • Heure de l\'Atlantique (HNA)' : '100% Bilingual (EN/FR) in Atlantic Standard Time'
    },
    {
      parameter: isFr ? 'Sécurité & Conformité' : 'Security & Compliance',
      bigConsulting: isFr ? 'Classeurs théoriques de 300 pages' : '300-page theoretical binders',
      commodityMSP: isFr ? 'Simple antivirus de base' : 'Basic antivirus installation only',
      oakivo: isFr ? 'Garde-fous automatisés continus (SOC 2, LPRPDE, Loi 25)' : 'Automated, continuous compliance guardrails'
    }
  ];

  return (
    <>
      <SEO 
        title="About Oakivo | Modern Software, Automation & Web Design Studio"
        description="Founded in Dieppe, New Brunswick, Oakivo delivers tailored modern ERP implementations, workflow automation, creative web design, and built-in cloud compliance with direct senior founder access."
        keywords="About Oakivo, Modern ERP Atlantic Canada, Creative Website Design Moncton, Workflow Automation New Brunswick, Cloud Engineers Dieppe NB, SOC 2 Canada"
        canonical="/about"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-technology-and-network-connections-background-loop-27411-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full linear-pill backdrop-blur-md">
              <MapPin size={13} className="text-cyan-400" />
              <span className="text-[11px] font-mono font-medium text-gray-300">
                Dieppe, New Brunswick • Atlantic Canada Authority
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-linear-tight text-slate-100 leading-[1.06]">
              {isFr ? 'L\'Approche Boutique Agile : ' : 'The Agile Boutique Advantage: '}<span className="text-linear-accent font-semibold">{isFr ? 'Proximité & Vélocité.' : 'Personal Touch & Velocity.'}</span>
            </h1>

            {/* Brand Mission Statement */}
            <div className="p-6 md:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 block">
                {isFr ? 'Notre Positionnement & Notre Raison d\'Être' : 'Our Positioning & Mission'}
              </span>
              <p className="text-base md:text-lg text-gray-200 font-normal leading-relaxed tracking-linear-normal">
                {isFr
                  ? 'Oakivo Solutions Inc. est implantée à Dieppe, au Nouveau-Brunswick. Nous concevons des implémentations Odoo ERP sur mesure, des automatisations de processus d\'affaires et des architectures infonuagiques résilientes pour les entreprises en croissance à travers le Canada atlantique.'
                  : 'Oakivo Solutions Inc. is headquartered in Dieppe, New Brunswick. We provide tailored Odoo ERP implementations, workflow automations, and resilient cloud engineering for growing businesses across Atlantic Canada.'
                }
              </p>
              <p className="text-xs text-gray-400 pt-1 leading-relaxed">
                {isFr
                  ? 'Contrairement aux méga-consultants distants qui délèguent vos projets à des juniors ou aux dépanneurs informatiques limités au matériel, notre équipe bilingue intervient directement avec les fondateurs dans votre fuseau horaire pour libérer votre temps et sécuriser vos systèmes.'
                  : 'Unlike national consulting monoliths that delegate work to junior staff after the pitch or commodity IT shops with zero software capabilities, our bilingual senior team works directly with founders in Atlantic Standard Time to eliminate operational toil and accelerate revenue.'
                }
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button onClick={() => window.dispatchEvent(new CustomEvent("open-lead-drawer"))}
                className="px-7 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2 group cursor-pointer"
              >
                <span>{t('common.cta_book_audit')}</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-16 md:py-24 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {TrustMetrics.map((metric, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 p-6 rounded-2xl border border-white/[0.08] text-center space-y-2"
              >
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-gray-200">
                  {metric.label}
                </div>
                <div className="text-[10px] font-mono text-cyan-400 font-medium">
                  {metric.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Operating Principles */}
      <section className="py-16 md:py-24 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-cyan-400">
              Our Principles
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-slate-100">
              Engineering-First Values
            </h2>
            <p className="text-sm md:text-base text-[#8A8F98]">
              How we defend critical infrastructure across New Brunswick, Nova Scotia, Prince Edward Island, and Newfoundland.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OperatingPrinciples.map((principle) => (
              <div 
                key={principle.number}
                className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-2xl p-6 md:p-8 border border-white/[0.08] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                    {principle.icon}
                  </div>
                  <span className="text-xl font-mono font-bold text-gray-500">
                    {principle.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    {principle.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#8A8F98] leading-relaxed mt-2">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Senior DevSecOps Architects (Dieppe, NB) */}
      <MeetOurExperts />

      {/* Comparison Matrix */}
      <section className="py-16 md:py-24 relative border-b border-white/[0.08]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-cyan-400">
              {isFr ? 'L’Avantage Oakivo' : 'The Oakivo Boutique Advantage'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-linear-tight text-slate-100">
              {isFr ? 'Comment nous nous démarquons' : 'How We Compare in Atlantic Canada'}
            </h2>
            <p className="text-sm md:text-base text-[#8A8F98]">
              {isFr 
                ? 'Ni cabinet de conseil lourd aux honoraires astronomiques, ni simple dépanneur informatique. Une équipe agile de haut niveau à vos côtés.'
                : 'Neither an overpriced global consultancy selling slideware, nor a commodity IT shop stuck resetting passwords. A high-touch, senior engineering partner.'
              }
            </p>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/[0.08] overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-4 md:p-5 font-mono text-gray-400 font-medium uppercase">Dimension</th>
                  <th className="p-4 md:p-5 font-mono text-white font-bold uppercase bg-cyan-500/10 border-x border-cyan-500/20">
                    Oakivo Solutions (Agile Boutique)
                  </th>
                  <th className="p-4 md:p-5 font-mono text-gray-400 font-medium uppercase">Legacy Consultancies (Big 4)</th>
                  <th className="p-4 md:p-5 font-mono text-gray-400 font-medium uppercase">Commodity MSPs & IT Shops</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-gray-300">
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Client Engagement & Personal Touch</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-cyan-500/5 border-x border-cyan-500/20 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                    <span>Direct access to senior founders in Atlantic Standard Time. Bilingual, dedicated accountability.</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">Sold by partners, handed off to junior consultants who learn on your dime.</td>
                  <td className="p-4 md:p-5 text-gray-400">Anonymous ticket queue, rigid call-center routing.</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Odoo ERP & Digital Transformation</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-cyan-500/5 border-x border-cyan-500/20 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                    <span>Turnkey implementation, clean data migrations, customized to your exact operations in weeks.</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">Massive SAP/NetSuite bloated 18-month projects with 7-figure budgets.</td>
                  <td className="p-4 md:p-5 text-gray-400">Zero ERP capability; purely install commodity desktop apps.</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Automation & Revenue Engineering</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-cyan-500/5 border-x border-cyan-500/20 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                    <span>Cross-system bots, automated invoicing, order sync, and CRM pipelines paying for themselves.</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">Lengthy advisory memos and strategy decks with no hands-on code.</td>
                  <td className="p-4 md:p-5 text-gray-400">Basic printer setups and password resets; no workflow automations.</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Speed to Measurable Value</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-cyan-500/5 border-x border-cyan-500/20 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                    <span>Live automations in 2 to 4 weeks; full ERP deployments in under 90 days.</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">6 to 18 months before any software actually goes into production.</td>
                  <td className="p-4 md:p-5 text-gray-400">Reactive repairs; never drives strategic business momentum.</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-white">Compliance, PIPEDA & Cloud Security</td>
                  <td className="p-4 md:p-5 text-white font-bold bg-cyan-500/5 border-x border-cyan-500/20 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                    <span>Built-in Canadian data residency, automated security controls, and pain-free audits.</span>
                  </td>
                  <td className="p-4 md:p-5 text-gray-400">High-overhead governance binders that gather dust on executive desks.</td>
                  <td className="p-4 md:p-5 text-gray-400">Off-the-shelf antivirus with unmonitored security gaps.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 rounded-2xl md:rounded-3xl p-8 md:p-14 border border-white/[0.08] text-center space-y-6 relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-linear-tight text-slate-100">
                {t('drawer.title')}
              </h2>
              <p className="text-sm md:text-base text-[#8A8F98] max-w-2xl mx-auto">
                {t('drawer.desc')}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => window.dispatchEvent(new CustomEvent("open-lead-drawer"))}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 group transition-all"
              >
                <span>{t('common.cta_book_audit')}</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
