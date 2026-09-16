import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, Lock, FileCheck, Server, AlertTriangle, CheckCircle2, ChevronRight, Globe, Database, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

interface GlossaryTerm {
  id: string;
  term: string;
  termFr?: string;
  category: 'Compliance Frameworks' | 'Cloud Security' | 'DevSecOps' | 'Data Privacy';
  categoryFr?: string;
  definition: string;
  definitionFr?: string;
  importance: string;
  importanceFr?: string;
  oakivoApproach: string;
  oakivoApproachFr?: string;
  dedicatedUrl?: string;
}

const glossaryData: GlossaryTerm[] = [
  {
    id: 'bill-c26',
    term: 'Bill C-26 (Critical Cyber Systems Protection Act - CCSPA)',
    termFr: 'Loi C-26 (Loi sur la protection des cybersystèmes essentiels - LSPCY)',
    category: 'Compliance Frameworks',
    categoryFr: 'Cadres de Conformité',
    definition: 'Canadian federal legislation establishing mandatory cyber security baselines, mandatory immediate cyber incident reporting pipelines to CSE / CCCS, and binding supply-chain cyber directions for federally regulated critical infrastructure operators (telecommunications, energy, transport, and banking).',
    definitionFr: 'Législation fédérale canadienne établissant des normes obligatoires de cybersécurité, le signalement obligatoire et immédiat des incidents au CST / CCCS, et des directives contraignantes sur la chaîne logistique pour les opérateurs d\'infrastructures essentielles (télécoms, énergie, transport, banques).',
    importance: 'Administrative Monetary Penalties (AMPs) of up to $15,000,000 CAD per violation and potential criminal liability for corporate officers failing to comply with binding Cyber Security Directions.',
    importanceFr: 'Sanctions administratives pécuniaires (SAP) pouvant atteindre 15 000 000 $ CA par infraction et responsabilité pénale des dirigeants en cas de non-respect des directives contraignantes.',
    oakivoApproach: 'We engineer automated Cyber Security Programs (CSP), establish automated telemetry pipelines directly mapped to CCCS reporting formats, and enforce container supply chain validation (SBOM & Cosign signatures) via Policy-as-Code.',
    oakivoApproachFr: 'Nous automatisons les Programmes de Cybersécurité (PCS), créons des pipelines de télémétrie vers le CCCS et validons la chaîne logistique (SBOM et Cosign) par politiques de code.',
    dedicatedUrl: '/compliance/bill-c26'
  },
  {
    id: 'pipeda',
    term: 'PIPEDA (Personal Information Protection and Electronic Documents Act)',
    termFr: 'LPRPDE (Loi sur la protection des renseignements personnels et les documents électroniques)',
    category: 'Data Privacy',
    categoryFr: 'Confidentialité des Données',
    definition: 'The Canadian federal privacy law for private-sector organizations. Sets out strict ground rules for how businesses must collect, handle, store, and process personal information during commercial activity.',
    definitionFr: 'Loi fédérale canadienne sur la protection des renseignements personnels pour le secteur privé. Établit les règles régissant la collecte, l\'utilisation et la conservation des données personnelles.',
    importance: 'Mandatory domestic data residency and strict 72-hour breach reporting. Exposure to cross-border data transfer legal challenges and reputational fallout from unencrypted leaks.',
    importanceFr: 'Résidence des données sur le sol canadien obligatoire et notification des atteintes sous 72h. Risques juridiques accrus en cas de transferts transfrontaliers non chiffrés.',
    oakivoApproach: 'We architect sovereign Canadian cloud enclaves (AWS ca-central-1, ca-west-1, Azure Canada) using Customer Managed Keys (CMK) under domestic custody, mathematically neutralizing US CLOUD Act extraction risks.',
    oakivoApproachFr: 'Nous concevons des enclaves infonuagiques souveraines canadiennes (AWS ca-central-1, Azure Canada) avec clés gérées par le client (CMK), neutralisant les risques liés au CLOUD Act américain.',
    dedicatedUrl: '/compliance/pipeda'
  },
  {
    id: 'law-25',
    term: 'Quebec Law 25 (Loi 25 sur la protection des données personnelles)',
    termFr: 'Loi 25 du Québec (Modernisation de la protection des renseignements personnels)',
    category: 'Data Privacy',
    categoryFr: 'Confidentialité des Données',
    definition: 'Quebec\'s comprehensive privacy overhaul aligning provincial standards with European GDPR. Mandates Privacy Impact Assessments (PIAs) prior to transferring data outside Quebec and grants citizens robust privacy rights.',
    definitionFr: 'Réforme québécoise alignée sur le RGPD européen. Impose des Évaluations des Facteurs relatifs à la Vie Privée (ÉFVP) avant tout transfert hors Québec et accorde des droits stricts aux citoyens.',
    importance: 'Penalties up to $25,000,000 CAD or 4% of worldwide turnover, with direct personal liability for Chief Privacy Officers and senior corporate executives.',
    importanceFr: 'Sanctions pécuniaires pouvant atteindre 25 000 000 $ CA ou 4 % du chiffre d\'affaires mondial, avec responsabilité personnelle des dirigeants d\'entreprise.',
    oakivoApproach: 'We automate automated data mapping, localized encryption, and consent tracking directly in your cloud infrastructure, guaranteeing full compliance with Quebec statutory mandates.',
    oakivoApproachFr: 'Nous automatisons la cartographie des données, le chiffrement localisé et la gestion des consentements directement dans votre infrastructure infonuagique.',
    dedicatedUrl: '/compliance/pipeda'
  },
  {
    id: 'soc2',
    term: 'SOC 2 Type II (System and Organization Controls 2)',
    termFr: 'SOC 2 Type II (Rapports sur les contrôles d\'organisation)',
    category: 'Compliance Frameworks',
    categoryFr: 'Cadres de Conformité',
    definition: 'An auditing procedure that ensures service providers securely manage data to protect client interests across five Trust Service Criteria: Security, Availability, Processing Integrity, Confidentiality, and Privacy over a 3-12 month period.',
    definitionFr: 'Procédure d\'audit certifiant la sécurité opérationnelle des prestataires de services selon cinq critères de confiance sur une période continue de 3 à 12 mois.',
    importance: 'Mandatory for B2B SaaS and enterprise tech vendors. Without SOC 2 Type II, enterprise procurement teams routinely block software adoption and cancel contracts.',
    importanceFr: 'Indispensable pour les éditeurs SaaS B2B et fournisseurs technologiques. Sans rapport SOC 2 Type II, les équipes d\'achats corporatives bloquent l\'adoption de vos solutions.',
    oakivoApproach: 'We eliminate manual screenshot fatigue by automating evidence extraction via Policy-as-Code hooks into GitHub, Terraform, and AWS/Azure. Continuous compliance without quarterly audit panic.',
    oakivoApproachFr: 'Nous éliminons les captures d\'écran manuelles grâce à l\'extraction automatisée de preuves via des politiques de code dans GitHub, Terraform et AWS/Azure. Zéro panique d\'audit.',
    dedicatedUrl: '/compliance/soc2'
  },
  {
    id: 'iso-27001',
    term: 'ISO/IEC 27001:2022',
    termFr: 'ISO/CEI 27001:2022',
    category: 'Compliance Frameworks',
    categoryFr: 'Cadres de Conformité',
    definition: 'The premier international standard for Information Security Management Systems (ISMS). Provides a systematic, risk-based approach to managing sensitive organizational information assets.',
    definitionFr: 'La référence internationale pour les systèmes de gestion de la sécurité de l\'information (SMSI). Approche systématique et basée sur les risques.',
    importance: 'The global benchmark for enterprise trust and international government tenders across Europe, the Americas, and Asia-Pacific.',
    importanceFr: 'La norme mondiale de référence pour les marchés publics internationaux et les grandes entreprises multinationales.',
    oakivoApproach: 'We map Infrastructure-as-Code directly to ISO 27001 Annex A controls, providing your auditors with a live, cryptographically verifiable security posture.',
    oakivoApproachFr: 'Nous mappons l\'Infrastructure-as-Code directement sur les contrôles de l\'Annexe A de l\'ISO 27001, offrant aux auditeurs des preuves vérifiables en temps réel.'
  },
  {
    id: 'cspm',
    term: 'CSPM (Cloud Security Posture Management)',
    termFr: 'CSPM (Gestion de la posture de sécurité infonuagique)',
    category: 'Cloud Security',
    categoryFr: 'Sécurité Infonuagique',
    definition: 'Continuous automated detection and remediation of cloud infrastructure misconfigurations, compliance drift, and unauthorized access across AWS, Azure, and GCP.',
    definitionFr: 'Détection et remédiation continues des mauvaises configurations, des dérives de conformité et des accès non autorisés sur AWS, Azure et GCP.',
    importance: 'Over 95% of cloud security breaches stem from customer misconfigurations (exposed storage buckets, over-permissive security groups, unrotated keys).',
    importanceFr: 'Plus de 95 % des failles de sécurité dans le cloud résultent de mauvaises configurations internes (compartiments ouverts, clés non révoquées).',
    oakivoApproach: 'We embed continuous CSPM into CI/CD pipelines to scan Terraform and Kubernetes manifests prior to deployment, preventing drift before code reaches production.',
    oakivoApproachFr: 'Nous intégrons le CSPM dans les pipelines CI/CD pour analyser les manifestes Terraform et Kubernetes avant leur déploiement en production.'
  },
  {
    id: 'zero-trust',
    term: 'Zero-Trust Architecture (ZTA)',
    termFr: 'Architecture Zéro-Confiance (ZTA)',
    category: 'Cloud Security',
    categoryFr: 'Sécurité Infonuagique',
    definition: 'A security design model where no actor or service inside or outside the network boundary is implicitly trusted. Every access request is dynamically authenticated, authorized, and encrypted.',
    definitionFr: 'Modèle de sécurité où aucun acteur ou service n\'est implicitement fiable. Chaque requête est authentifiée, autorisée et chiffrée dynamiquement.',
    importance: 'Legacy VPNs create flat internal networks. Once breached, attackers move laterally unrestricted. Zero-Trust microsegments workloads and neutralizes lateral movement.',
    importanceFr: 'Les VPN traditionnels exposent l\'ensemble du réseau en cas d\'intrusion. Le Zéro-Confiance isole chaque charge de travail et stoppe les mouvements latéraux.',
    oakivoApproach: 'We deploy Identity-Aware Proxies, short-lived ephemeral credentials, and mutual TLS (mTLS) service meshes across all Kubernetes and serverless microservices.',
    oakivoApproachFr: 'Nous déployons des proxys basés sur l\'identité, des jetons d\'accès éphémères et du mTLS sur l\'ensemble de vos microservices Kubernetes.'
  },
  {
    id: 'sast-dast',
    term: 'SAST & DAST Shift-Left Automation',
    termFr: 'Automatisation SAST & DAST (Shift-Left)',
    category: 'DevSecOps',
    categoryFr: 'DevSecOps',
    definition: 'Static Application Security Testing (SAST) inspects source code for vulnerabilities in pull requests. Dynamic Application Security Testing (DAST) tests running applications against adversarial attacks.',
    definitionFr: 'Les tests statiques (SAST) analysent le code source dans les pull requests. Les tests dynamiques (DAST) simulent des cyberattaques sur les applications en cours d\'exécution.',
    importance: 'Remediating a vulnerability in production costs up to 100x more than catching it during local development or in automated CI/CD pull requests.',
    importanceFr: 'Corriger une faille de sécurité en production coûte jusqu\'à 100 fois plus cher que de l\'intercepter au stade du code source dans les pipelines CI/CD.',
    oakivoApproach: 'We build non-disruptive, blazing-fast SAST/DAST gates into GitHub Actions and GitLab CI, delivering automated inline remediation guidance to developers without slowing release velocity.',
    oakivoApproachFr: 'Nous intégrons des barrières de sécurité SAST/DAST rapides et non bloquantes dans GitHub Actions et GitLab CI, accélérant vos déploiements en toute sécurité.'
  }
];

const categories = ['All', 'Compliance Frameworks', 'Data Privacy', 'Cloud Security', 'DevSecOps'] as const;

const ComplianceMatrix: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { t, language } = useLanguage();

  const isFr = language === 'fr';

  const filteredData = glossaryData.filter(item => {
    const termText = isFr && item.termFr ? item.termFr : item.term;
    const defText = isFr && item.definitionFr ? item.definitionFr : item.definition;
    const matchesSearch = termText.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          defText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO 
        title={isFr 
          ? "Matrice de Conformité Canadienne & Préparation d'Audit | Loi C-26, LPRPDE, SOC 2 | Oakivo"
          : "Canadian Compliance Matrix & Audit Readiness | Bill C-26, PIPEDA, SOC 2 | Oakivo"}
        description={isFr
          ? "Matrice complète des exigences de conformité canadiennes et DevSecOps : Loi C-26, LPRPDE, Loi 25, SOC 2 Type II et ISO 27001 pour entreprises fédérales et de l'Atlantique."
          : "Comprehensive Canadian regulatory compliance matrix: Bill C-26, PIPEDA, Law 25, SOC 2 Type II, and ISO 27001 engineering for federally regulated and Atlantic Canadian enterprises."}
        keywords="Bill C-26 Critical Cyber Systems compliance roadmap, SOC 2 Type II audit readiness checklist Canada, PIPEDA vs. HIPAA cloud storage architecture, DevSecOps Moncton, Cloud Security New Brunswick"
        canonical="/compliance-matrix"
      />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-[#070A0F] border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-6 border border-cyan-500/20">
            <Shield size={14} /> 
            {isFr ? "Architecture Réglementaire & Sécurité Canadienne" : "Canadian Regulatory & Security Architecture"}
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-100 tracking-tight mb-6">
            {isFr ? "Matrice de Conformité & Préparation d'Audit" : "Canadian Compliance & Audit Matrix"}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-light max-w-3xl leading-relaxed mb-8">
            {isFr 
              ? "Démystifier le paysage réglementaire canadien (Loi C-26, LPRPDE, Loi 25) et les cadres internationaux (SOC 2, ISO 27001). Découvrez comment Oakivo automatise la conformité directement dans vos pipelines de déploiement."
              : "Demystifying Canadian data sovereignty (Bill C-26, PIPEDA, Law 25) and international compliance frameworks (SOC 2, ISO 27001). See how Oakivo engineers automated compliance directly into your deployment pipelines."}
          </p>

          {/* Quick Landing Page Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="text-xs font-mono text-slate-500 self-center">
              {isFr ? "Guides Spécialisés :" : "Deep-Dive Landing Pages:"}
            </span>
            <Link 
              to="/compliance/bill-c26"
              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium hover:bg-cyan-500/20 transition-colors flex items-center gap-1.5"
            >
              Bill C-26 (CCSPA) Roadmap <ArrowRight size={12} />
            </Link>
            <Link 
              to="/compliance/pipeda"
              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium hover:bg-cyan-500/20 transition-colors flex items-center gap-1.5"
            >
              PIPEDA & Law 25 Cloud <ArrowRight size={12} />
            </Link>
            <Link 
              to="/compliance/soc2"
              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium hover:bg-cyan-500/20 transition-colors flex items-center gap-1.5"
            >
              SOC 2 Type II Automation <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 bg-[#070A0F]/90 backdrop-blur-md border-b border-slate-900 sticky top-20 z-30">
        <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder={isFr ? "Rechercher (ex. Loi C-26, LPRPDE, SOC 2)..." : "Search frameworks (e.g., Bill C-26, PIPEDA, SOC 2)..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl py-2.5 pl-12 pr-4 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-500 font-light"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map(category => {
              const label = isFr ? (
                category === 'All' ? 'Tous' :
                category === 'Compliance Frameworks' ? 'Cadres Réglementaires' :
                category === 'Data Privacy' ? 'Vie Privée' :
                category === 'Cloud Security' ? 'Sécurité Cloud' :
                'DevSecOps'
              ) : category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors ${
                    activeCategory === category 
                      ? 'bg-cyan-400 text-slate-950 font-bold' 
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Matrix Grid */}
      <section className="py-16 bg-[#070A0F] min-h-[70vh]">
        <div className="container mx-auto px-6 max-w-5xl">
          {filteredData.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-950/40">
              <AlertTriangle className="mx-auto text-slate-500 mb-4" size={40} />
              <h3 className="text-lg font-bold text-slate-300 mb-2">
                {isFr ? "Aucun terme trouvé" : "No frameworks found"}
              </h3>
              <p className="text-slate-500 text-sm">
                {isFr ? "Ajustez vos filtres ou termes de recherche." : "Try adjusting your search query or category filter."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredData.map(item => {
                const title = isFr && item.termFr ? item.termFr : item.term;
                const definition = isFr && item.definitionFr ? item.definitionFr : item.definition;
                const importance = isFr && item.importanceFr ? item.importanceFr : item.importance;
                const approach = isFr && item.oakivoApproachFr ? item.oakivoApproachFr : item.oakivoApproach;

                return (
                  <div 
                    key={item.id} 
                    className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-100 mb-2">{title}</h2>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                          {item.category === 'Compliance Frameworks' && <FileCheck size={12} />}
                          {item.category === 'Data Privacy' && <Shield size={12} />}
                          {item.category === 'Cloud Security' && <Lock size={12} />}
                          {item.category === 'DevSecOps' && <Server size={12} />}
                          {isFr && item.categoryFr ? item.categoryFr : item.category}
                        </span>
                      </div>

                      {item.dedicatedUrl && (
                        <Link 
                          to={item.dedicatedUrl}
                          className="self-start md:self-auto px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold hover:bg-cyan-500/20 transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                          {isFr ? "Guide Détaillé" : "Deep-Dive Guide"}
                          <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5 border-b border-slate-800/60 pb-1">
                            {isFr ? "Définition Légale & Portée" : "Definition & Scope"}
                          </h4>
                          <p className="text-slate-300 text-sm leading-relaxed font-light">{definition}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1.5 border-b border-slate-800/60 pb-1">
                            {isFr ? "Impact Corporatif & Sanctions" : "Business Impact & Penalties"}
                          </h4>
                          <p className="text-slate-400 text-sm leading-relaxed font-light">{importance}</p>
                        </div>
                      </div>
                      
                      <div className="bg-slate-950/80 p-6 rounded-xl border border-slate-800/60 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                              {isFr ? "L'Approche DevSecOps Oakivo" : "The Oakivo Approach"}
                            </h4>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed font-light">
                            {approach}
                          </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
                          <span>Status: Audit-Ready</span>
                          <Link to="/schedule" className="text-cyan-400 hover:underline">
                            {isFr ? "Consulter un Architecte →" : "Consult Architect →"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ComplianceMatrix;
