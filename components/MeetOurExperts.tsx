import React from 'react';
import { ShieldCheck, MapPin, CheckCircle2, Linkedin, Mail, Award, Sparkles, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ExpertMember {
  name: string;
  role: string;
  bio: string;
  credentials: string[];
  location: string;
  headshot: string;
  linkedin: string;
  languages?: string;
}

const MeetOurExperts: React.FC = () => {
  const { language, t } = useLanguage();

  const isFrench = language === 'fr';

  const expertsList: ExpertMember[] = [
    {
      name: "Ahmed Bello, M.Sc.",
      role: isFrench ? "Architecte Principal de Sécurité Infonuagique & Fondateur" : "Principal Cloud Security Architect & Founder",
      bio: isFrench 
        ? "Plus de 14 ans d'expérience dans la conception d'architectures infonuagiques résilientes, de périmètres Zéro Confiance et de plateformes DevSecOps hautement sécurisées pour les entreprises canadiennes." 
        : "14+ years architecting zero-trust cloud perimeters, Kubernetes policy engines, and mission-critical multi-tenant security platforms for Canadian enterprise and public sector.",
      credentials: ["M.Sc.", "CISSP", "AWS Security Specialist", "CKA (Kubernetes)"],
      location: "Dieppe, NB (AST)",
      headshot: "/team/ahmed-bello.jpg?v=4",
      linkedin: "https://www.linkedin.com/company/oakivo",
      languages: isFrench ? "Anglais (Engineering)" : "English (Engineering Lead)"
    },
    {
      name: "Funmilayo Akinsiku",
      role: isFrench ? "Architecte Responsable DevSecOps & Automatisation de Pipelines" : "Lead DevSecOps & Pipeline Automation Architect",
      bio: isFrench 
        ? "Spécialiste de la sécurité intégrée (Shift-Left) dans les pipelines CI/CD, de la signature cryptographique Cosign et de la politique sous forme de code éliminant les vulnérabilités avant la production." 
        : "Specializes in shift-left CI/CD guardrails, container cryptographic signing with Cosign, and automated Policy-as-Code to eliminate vulnerabilities before code reaches production.",
      credentials: ["P.Eng.", "CKS (K8s Security)", "Terraform Author", "ISO 27001 Lead"],
      location: "Dieppe, NB (AST)",
      headshot: "/team/funmilayo-akinsiku.jpg?v=2",
      linkedin: "https://www.linkedin.com/company/oakivo",
      languages: isFrench ? "100 % Bilingue (FR/EN)" : "100% Bilingual (EN/FR)"
    },
    {
      name: "Fawaz Bello",
      role: isFrench ? "Ingénieur Principal SRE & Remédiation des Menaces" : "Principal SRE & Threat Remediation Engineer",
      bio: isFrench 
        ? "Architecte d'infrastructures infonuagiques auto-cicatrisantes et de scénarios automatisés réactifs qui neutralisent les cybermenaces à la vitesse de la machine." 
        : "Architect of autonomous self-healing cloud infrastructure and event-driven incident containment runbooks that neutralize threats at machine speed.",
      credentials: ["Linux Foundation KCSP", "eBPF Observability", "AWS Solutions Architect Pro"],
      location: "Dieppe, NB (AST)",
      headshot: "/team/fawaz-bello.jpg?v=2",
      linkedin: "https://www.linkedin.com/company/oakivo",
      languages: isFrench ? "100 % Bilingue (FR/EN)" : "100% Bilingual (EN/FR)"
    },
    {
      name: "Taiwo Owoeye",
      role: isFrench ? "Analyste d'Affaires Senior & Stratégie DevSecOps" : "Senior Business Analyst & DevSecOps Strategist",
      bio: isFrench 
        ? "Fait le pont entre les impératifs d'affaires et les architectures techniques DevSecOps, traduisant les exigences réglementaires et de conformité en flux opérationnels rentables." 
        : "Bridges executive business goals with technical DevSecOps architectures, translating complex security compliance frameworks into actionable enterprise workflows and measurable ROI.",
      credentials: ["CBAP", "ITIL 4", "Agile & Compliance", "PIPEDA / Law 25 Specialist"],
      location: "Dieppe, NB (AST)",
      headshot: "/team/taiwo-owoeye.jpg?v=2",
      linkedin: "https://www.linkedin.com/company/oakivo",
      languages: isFrench ? "Anglais (Business Analyst)" : "English (Business Analyst)"
    }
  ];

  return (
    <section id="meet-our-experts" className="py-20 md:py-28 relative border-b border-white/[0.08] bg-slate-950/60">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase">
            <MapPin size={13} className="animate-pulse" />
            <span>{isFrench ? "Centre d'Ingénierie de Dieppe, N.-B." : "Dieppe, NB Engineering Hub"}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100">
            {isFrench ? "Rencontrez Nos Architectes DevSecOps Seniors" : "Meet Our Senior DevSecOps Architects"}
          </h2>

          <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl">
            {isFrench 
              ? "Accès direct à des architectes de sécurité infonuagique et des ingénieurs DevSecOps seniors basés à Dieppe, au Nouveau-Brunswick. 100 % bilingues (FR/EN), opérant dans le fuseau de l'Atlantique (HNA) sans file d'attente à l'étranger." 
              : "Direct access to senior cloud security architects and DevSecOps engineers based in Dieppe, New Brunswick. 100% bilingual (EN/FR), operating in Atlantic Standard Time with zero offshore ticket queues."}
          </p>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertsList.map((expert, idx) => (
            <div
              key={idx}
              id={`expert-card-${idx}`}
              className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 p-6 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div>
                {/* Headshot & Status Header */}
                <div className="relative mb-5">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-700/70 group-hover:border-cyan-400/80 transition-colors shadow-lg relative mx-auto">
                    <img
                      src={expert.headshot}
                      alt={expert.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Live Status Pill */}
                  <div className="flex justify-center mt-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{expert.location}</span>
                    </div>
                  </div>
                </div>

                {/* Name & Role */}
                <div className="text-center space-y-1 mb-4">
                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {expert.name}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-400">
                    {expert.role}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-400 leading-relaxed mb-5 font-light text-center">
                  {expert.bio}
                </p>

                {/* Credentials Chips */}
                <div className="space-y-2 mb-5">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold block text-center">
                    {isFrench ? "Certifications & Titres :" : "Verified Credentials:"}
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {expert.credentials.map((cred, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800/80 text-cyan-300 font-medium"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Language tag & LinkedIn */}
              <div className="pt-4 border-t border-slate-800/70 flex items-center justify-between mt-auto">
                <span className="text-[10px] font-mono text-slate-400">
                  {expert.languages || (isFrench ? "Bilingue (FR/EN)" : "Bilingual (EN/FR)")}
                </span>

                <a
                  href={expert.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${expert.name} LinkedIn`}
                  className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <Linkedin size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Dieppe Office Presence Note */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-900/60 via-cyan-950/20 to-slate-900/60 border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {isFrench ? "Aucune sous-traitance à l'étranger." : "Zero Offshore Outsourcing."}
              </h4>
              <p className="text-xs text-slate-400">
                {isFrench 
                  ? "Toutes nos interventions de sécurité et d'ingénierie sont exécutées par nos architectes basés à Dieppe, N.-B." 
                  : "All cloud security architectures and DevSecOps pipelines are engineered directly by our team in Dieppe, New Brunswick."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-lead-drawer'))}
            className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs tracking-wide transition-all cursor-pointer shrink-0"
          >
            {isFrench ? "Contacter Nos Architectes" : "Consult With Our Architects"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MeetOurExperts;
