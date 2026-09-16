import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, MapPin, CheckCircle2, ShieldCheck, Clock, ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadDrawer from '../components/LeadDrawer';
import { NavRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LocationData {
  name: string;
  regionCode: string;
  keyHubs: string[];
  heroTitle: string;
  heroSubtitle: string;
  regionalContext: string;
  commonWorkflows: string[];
  localProof: {
    client: string;
    city: string;
    result: string;
  };
}

const locationsMap: Record<string, LocationData> = {
  'new-brunswick': {
    name: 'New Brunswick',
    regionCode: 'CA-NB',
    keyHubs: ['Moncton', 'Dieppe', 'Fredericton', 'Saint John', 'Miramichi'],
    heroTitle: 'DevSecOps & Cloud Security in New Brunswick (Moncton & Dieppe)',
    heroSubtitle: 'Continuous SOC 2 compliance, Bill C-26 readiness, and automated zero-trust cloud infrastructure for New Brunswick enterprises.',
    regionalContext: 'From cybersecurity and fintech clusters in Moncton and Dieppe to critical supply chains in Saint John and government contractors in Fredericton, New Brunswick enterprises require robust cloud security posture management (CSPM) and automated DevSecOps pipelines that withstand modern regulatory scrutiny.',
    commonWorkflows: [
      'Moncton DevSecOps: Automated CI/CD security gating and Policy-as-Code',
      'Dieppe Cloud Security: Continuous SOC 2 and PIPEDA audit evidence collection',
      'Saint John Infrastructure: Terraform AWS EKS hardening and CIS benchmark validation'
    ],
    localProof: {
      client: 'Atlantic Supply Chain & Enterprise Logistics',
      city: 'Moncton, NB',
      result: 'Automated 100% of SOC 2 evidence collection and hardened AWS EKS clusters against lateral movement.'
    }
  },
  'alberta': {
    name: 'Alberta',
    regionCode: 'CA-AB',
    keyHubs: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge'],
    heroTitle: 'DevSecOps & Cloud Security in Alberta (Calgary & Edmonton)',
    heroSubtitle: 'Terraform AWS EKS hardening, Bill C-26 energy infrastructure security, and continuous compliance for Alberta tech leaders.',
    regionalContext: 'Calgary and Edmonton tech hubs in energy, fintech, and enterprise software demand resilient, high-velocity cloud engineering. Oakivo engineers hardened Kubernetes clusters, automated zero-trust IAM, and SOC 2 Type II readiness across Western Canada.',
    commonWorkflows: [
      'Calgary Cloud Security: Terraform AWS EKS hardening and Kyverno admission controls',
      'Edmonton Energy Infrastructure: Bill C-26 critical cyber systems defense & continuous monitoring',
      'Western FinTech: Multi-account AWS architecture with PIPEDA data sovereignty'
    ],
    localProof: {
      client: 'Calgary Energy SaaS Platform',
      city: 'Calgary, AB',
      result: 'Hardened production EKS infrastructure to 99.99% uptime and passed SOC 2 Type II audit with zero findings.'
    }
  },
  'ontario': {
    name: 'Ontario',
    regionCode: 'CA-ON',
    keyHubs: ['Toronto', 'Ottawa', 'Waterloo', 'Mississauga', 'Kitchener'],
    heroTitle: 'Enterprise DevSecOps & Cloud Compliance in Ontario (Toronto & Ottawa)',
    heroSubtitle: 'SOC 2 Type II audit readiness, Bill C-26 compliance roadmaps, and sovereign Kubernetes infrastructure for Ontario enterprises.',
    regionalContext: 'Serving Toronto financial institutions, Waterloo scale-ups, and Ottawa federal defense contractors, Oakivo provides certified DevSecOps engineering, Policy-as-Code automation, and sovereign cloud architectures.',
    commonWorkflows: [
      'Toronto FinTech: Continuous SOC 2 Type II & PCI-DSS compliance automation',
      'Ottawa Federal Contractors: Sovereign cloud architecture and Bill C-26 alignment',
      'Waterloo Scale-Ups: Automated shift-left SAST/DAST container security pipelines'
    ],
    localProof: {
      client: 'Financial Technology Provider',
      city: 'Toronto, ON',
      result: 'Reduced compliance audit preparation time by 75% with automated evidence pipelines.'
    }
  },
  'nova-scotia': {
    name: 'Nova Scotia',
    regionCode: 'CA-NS',
    keyHubs: ['Halifax', 'Dartmouth', 'Sydney', 'Truro', 'New Glasgow'],
    heroTitle: 'DevSecOps & Cloud Security Architecture in Nova Scotia (Halifax)',
    heroSubtitle: 'Helping Nova Scotia defense, health-tech, and marine enterprises implement zero-trust cloud infrastructure and continuous compliance.',
    regionalContext: 'Nova Scotia businesses in Halifax, Dartmouth, and Sydney are scaling rapidly across ocean tech, defense, and healthcare. Oakivo provides Terraform AWS EKS hardening, PIPEDA data sovereignty, and automated DevSecOps.',
    commonWorkflows: [
      'Halifax Health-Tech: PIPEDA and PHIA compliant sovereign cloud storage architecture',
      'Dartmouth Defense: Zero-trust microsegmentation and automated container scanning',
      'Sydney Ocean Tech: Offshore telemetry security and resilient edge computing'
    ],
    localProof: {
      client: 'Atlantic Marine & Technology Supply',
      city: 'Halifax, NS',
      result: 'Implemented automated CI/CD security scanning across 40+ microservices.'
    }
  },
  'prince-edward-island': {
    name: 'Prince Edward Island',
    regionCode: 'CA-PE',
    keyHubs: ['Charlottetown', 'Summerside', 'Cornwall', 'Stratford'],
    heroTitle: 'DevSecOps & Cloud Security in Prince Edward Island',
    heroSubtitle: 'Connecting cloud security, automated compliance, and resilient infrastructure for PEI enterprises.',
    regionalContext: 'PEI organizations face growing digital demands in bioscience, food processing, and financial services. Oakivo helps island businesses implement robust cloud security postures without expanding internal headcount.',
    commonWorkflows: [
      'Charlottetown Bioscience: Encrypted sovereign data pipelines adhering to PIPEDA',
      'Summerside Food Processing: Secure IoT telemetry and cloud infrastructure',
      'Island Financial: SOC 2 Type II audit readiness and automated evidence gathering'
    ],
    localProof: {
      client: 'Island Food Processing Cooperative',
      city: 'Charlottetown, PEI',
      result: 'Deployed secure cloud infrastructure with 100% automated backup encryption.'
    }
  },
  'newfoundland-labrador': {
    name: 'Newfoundland & Labrador',
    regionCode: 'CA-NL',
    keyHubs: ["St. John's", 'Corner Brook', 'Grand Falls-Windsor', 'Gander', 'Labrador City'],
    heroTitle: "Done-For-You Workflow Automation in Newfoundland & Labrador",
    heroSubtitle: "Connecting operations, dispatch, and financial software for Newfoundland and Labrador businesses.",
    regionalContext: "Operating across vast distances requires tight communication between field teams, warehouses, and head offices in St. John's and Corner Brook. We connect your existing software endpoints so work logs and invoices flow without manual delays.",
    commonWorkflows: [
      "St. John's Fleet Operations: Automated equipment hour tracking to job costing",
      "Corner Brook Supply: Synchronizing purchase orders with vendor invoices",
      "Labrador Industrial: Remote site time tracking pushed to payroll"
    ],
    localProof: {
      client: 'NL Logistics & Field Services',
      city: "St. John's, NL",
      result: 'Cut billing turnaround time from 7 days to 2 hours after job completion.'
    }
  }
};

const LocationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { t, language } = useLanguage();
  const isFr = language === 'fr';

  const locKey = slug || 'new-brunswick';
  const location = locationsMap[locKey] || locationsMap['new-brunswick'];

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `Oakivo Solutions - ${location.name}`,
    'description': location.heroSubtitle,
    'address': {
      '@type': 'PostalAddress',
      'addressRegion': location.name,
      'addressCountry': 'CA'
    },
    'areaServed': location.keyHubs.map(hub => ({
      '@type': 'City',
      'name': `${hub}, ${location.name}`
    }))
  };

  return (
    <>
      <SEO 
        title={`DevSecOps & Cloud Security ${location.name} | Moncton, Calgary & Halifax | Oakivo`}
        description={`Elite DevSecOps automation, zero-trust cloud infrastructure, SOC 2 compliance readiness, and Terraform AWS EKS hardening for enterprises in ${location.name}.`}
        keywords={`DevSecOps ${location.name}, Cloud Security ${location.name}, DevSecOps Moncton, Cloud Security New Brunswick, Terraform AWS EKS hardening consultant Calgary / Toronto / Halifax, SOC 2 Type II audit readiness checklist Canada, Bill C-26 Critical Cyber Systems compliance roadmap`}
        canonical={`/locations/${locKey}`}
        schema={localBusinessSchema}
      />

      <section className="bg-slate-950 text-white pt-36 pb-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          <Link to={NavRoute.HOME} className="inline-flex items-center gap-2 text-cyan-400 mb-8 hover:underline font-mono font-bold uppercase tracking-wider text-xs">
            <ArrowLeft size={16} /> {isFr ? "Retour à l'accueil" : "Back to Home"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full mb-6">
            <MapPin size={16} className="text-cyan-400" />
            <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
              {isFr ? `Ingénierie Régionale • ${location.name}` : `Regional Engineering • ${location.name}`}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 mb-6">
            {location.heroTitle}
          </h1>

          <p className="text-base md:text-xl text-[#8A8F98] leading-relaxed font-normal mb-8">
            {location.heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} /> {isFr ? "Planifier un Audit DevSecOps" : "Schedule Security Architecture Audit"}
            </button>
            <Link
              to="/compliance-matrix"
              className="px-6 py-4 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 font-semibold text-xs tracking-wide transition-all inline-flex items-center gap-2"
            >
              <Shield size={16} className="text-cyan-400" /> {isFr ? "Consulter la Matrice Réglementaire" : "View Compliance Matrix"}
            </Link>
          </div>
        </div>
      </section>

      <Section className="bg-slate-900 text-white py-20 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-16">
          
          {/* Key Hubs */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin size={18} className="text-cyan-400" /> 
              {isFr ? `Pôles Économiques Desservis en ${location.name}` : `Serving Key Business Communities in ${location.name}`}
            </h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {location.keyHubs.map((hub, i) => (
                <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-cyan-300">
                  {hub}
                </span>
              ))}
            </div>
          </div>

          {/* Regional Context */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              {isFr ? "Contexte Opérationnel et Réglementaire" : "Local Operational Context"}
            </h2>
            <p className="text-base text-gray-300 leading-relaxed font-light">{location.regionalContext}</p>
          </div>

          {/* Typical Regional Integrations */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              {isFr ? `Solutions de Sécurité et Automatisation Déployées en ${location.name}` : `Common Security & DevSecOps Solutions in ${location.name}`}
            </h2>
            <div className="space-y-3">
              {location.commonWorkflows.map((flow, i) => (
                <div key={i} className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-gray-200 font-medium">{flow}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Canadian Compliance Deep-Dive Callout */}
          <div className="bg-gradient-to-r from-cyan-950/40 to-slate-950 border border-cyan-500/30 rounded-3xl p-8 space-y-4">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-widest block">
              {isFr ? "Cadres Fédéraux & Souveraineté Canadienne" : "Canadian Sovereign Cloud & Federal Mandates"}
            </span>
            <h3 className="text-xl font-bold text-white">
              {isFr 
                ? "Alignement Immédiat avec la Loi C-26, la LPRPDE et la Loi 25"
                : "Continuous Alignment with Bill C-26, PIPEDA & Law 25"}
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              {isFr
                ? "Les entreprises canadiennes doivent prouver leur souveraineté des données et leur conformité continue. Découvrez nos architectures de référence et roadmaps d'audit spécialisées."
                : "Canadian enterprises must guarantee domestic data residency and proactive threat telemetry. Explore our high-intent architecture checklists and dedicated compliance roadmaps."}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link 
                to="/compliance/bill-c26"
                className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium hover:bg-cyan-500/30 transition-colors flex items-center gap-1.5"
              >
                Bill C-26 (CCSPA) Roadmap <ArrowRight size={12} />
              </Link>
              <Link 
                to="/compliance/pipeda"
                className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium hover:bg-cyan-500/30 transition-colors flex items-center gap-1.5"
              >
                PIPEDA Sovereign Cloud <ArrowRight size={12} />
              </Link>
              <Link 
                to="/compliance/soc2"
                className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium hover:bg-cyan-500/30 transition-colors flex items-center gap-1.5"
              >
                SOC 2 Type II Checklist <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Local Outcome */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-4">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-widest block">
              {isFr ? "Étude de Cas Régionale" : "Regional Client Spotlight"}
            </span>
            <h3 className="text-xl font-bold text-white">{location.localProof.client} ({location.localProof.city})</h3>
            <p className="text-sm text-gray-300 leading-relaxed font-light">{location.localProof.result}</p>
          </div>

          {/* Final Callout */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 text-center space-y-6">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">
              {isFr ? "Consultation Stratégique" : "Operational & Security Audit"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {isFr 
                ? `Passez vos audits sans friction et sécurisez vos systèmes en ${location.name}.`
                : `Eliminate audit anxiety and harden your cloud posture in ${location.name}.`}
            </h2>
            <p className="text-xs md:text-sm text-gray-400 font-light max-w-xl mx-auto">
              {isFr
                ? "Planifiez une session de 30 minutes avec un architecte DevSecOps sénior pour évaluer votre posture infonuagique et votre conformité."
                : "Schedule a 30-minute architecture review with an Oakivo DevSecOps specialist to evaluate your cloud security and compliance posture."}
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-black font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} /> {isFr ? "Planifier un Audit DevSecOps" : "Schedule Security Architecture Audit"}
            </button>
          </div>

        </div>
      </Section>

      <LeadDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default LocationDetail;
