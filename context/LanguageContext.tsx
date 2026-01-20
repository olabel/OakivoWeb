import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, any>> = {
  en: {
    nav: { home: 'Home', verticals: 'Industries', services: 'Services', work: 'Case Studies', about: 'About', contact: "Contact", careers: "Careers" },
    home: {
      hero_title_1: "Orchestrating the",
      hero_title_2: "Digital Future.",
      hero_subtitle: "Oakivo Solutions empowers Canadian businesses with enterprise-grade Odoo implementation, intelligent automation, and cybersecurity resilience. Serving Atlantic Canada and Nationwide.",
      cta_primary: "Book a Consultation",
      insight_title: "Agility is the new currency for Canadian Business.",
      insight_text_1: "Legacy systems stall growth. As Canada's leading digital transformation agency, we replace outdated infrastructure with scalable, cloud-native ERP solutions like Odoo.",
      insight_text_2: "From automating payroll in Halifax to securing supply chains in Toronto, our certified consultants engineer workflows that drive measurable ROI.",
      cap_auto_title: "Business Process Automation",
      cap_auto_desc: "Eliminate manual data entry with custom RPA and AI workflows.",
      cap_eco_title: "Odoo ERP Implementation",
      cap_eco_desc: "Unified cloud ERP for inventory, accounting, and CRM.",
      cap_mod_title: "Legacy Modernization",
      cap_mod_desc: "Migrate on-premise servers to secure cloud infrastructure.",
      cap_sec_title: "Cybersecurity & Compliance",
      cap_sec_desc: "SOC2-ready security audits and zero-trust architecture.",
      explore: "View Service",
      impact_title: "Proven Results",
      view_portfolio: "View Case Studies",
      read_case: "Read Success Story",
      cta_footer_title: "Ready to Scale Your Operations?",
      cta_footer_text: "Join the top 5% of Canadian companies leveraging AI and Odoo ERP. Schedule your free discovery call today.",
      cta_footer_btn: "Get a Quote",
      trusted_by: "Trusted by industry leaders across Canada",
      perspectives_title: "Tech Insights",
      view_insights: "Read the Blog"
    },
    verticals: {
      hero_title: "Industry-Specific Solutions.",
      hero_subtitle: "Tailored ERP and automation strategies for Canada's key sectors.",
      cards: [
        { title: "Manufacturing & IoT", desc: "Real-time Odoo MRP integration, shop floor control, and predictive maintenance for Canadian manufacturers." },
        { title: "Retail & E-commerce", desc: "Omnichannel Odoo POS, unified inventory management, and automated shipping logistics." },
        { title: "Professional Services", desc: "Project accounting, timesheet automation, and resource planning to maximize billable utilization." },
        { title: "Distribution & Logistics", desc: "Warehouse Management Systems (WMS), barcode scanning, and landed cost tracking." },
        { title: "Public Sector", desc: "Secure, accessible digital citizen services and automated permit processing for municipalities." },
        { title: "Energy & Utilities", desc: "OT network security hardening and asset management for critical infrastructure providers." }
      ]
    },
    about: {
      dna_label: "Our Mission",
      hero_title: "Canada's Digital Architects.",
      hero_subtitle: "\"We don't just install software; we re-engineer Canadian businesses for the global digital economy.\"",
      standard_title: "The Oakivo Standard",
      standard_p1: "Headquartered in Dieppe, New Brunswick, Oakivo Solutions is a premier digital consultancy serving Atlantic Canada and the nation.",
      standard_p2: "We bridge the gap between complex technology (like Odoo ERP and Azure) and strategic business goals.",
      standard_p3: "Our team consists of certified Odoo experts, cloud architects, and cybersecurity analysts.",
      journey_title: "Our Roadmap",
      values: [
        { title: "Radical Innovation", text: "We implement forward-thinking architectures that leapfrog the competition." },
        { title: "Absolute Integrity", text: "We operate with total transparency. If a technology doesn't serve your ROI, we won't recommend it." },
        { title: "Tangible Impact", text: "We don't measure success by hours billed. We measure it by costs reduced and revenue generated." }
      ],
      leadership_title: "Executive Leadership",
      leadership_subtitle: "Certified specialists driving Canadian enterprise innovation.",
      team: [
        { name: "Ahmed Bello", role: "Chief Executive Officer", bio: "15+ years of experience in Enterprise Resource Planning and Operational Strategy. Certified Odoo Consultant.", credentials: "MBA, PMP" },
        { name: "Sarah Chen", role: "Chief Technology Officer", bio: "Specialist in Cloud Architecture and Legacy Modernization. Formerly lead architect for major FinTech infrastructures.", credentials: "M.Sc. Computer Science, Azure Solutions Architect" },
        { name: "James Thorne", role: "Head of Strategy", bio: "Leading digital transformation roadmaps for the Canadian Public Sector and Energy utilities.", credentials: "B.Eng, vCIO Certified" },
        { name: "Elena Rodriguez", role: "Director of Cybersecurity", bio: "SOC2 Compliance Lead and Zero Trust strategist. Expert in OT Network hardening.", credentials: "CISSP, CISM" }
      ]
    },
    services: {
      hero_label: "Our Expertise",
      hero_title: "End-to-End Digital Transformation.",
      list: [
        { title: "Odoo ERP Implementation", desc: "As certified partners, we customize Odoo to unify your accounting, inventory, and CRM. Say goodbye to data silos.", insight: "Unified data decreases operational costs by an average of 23%." },
        { title: "Intelligent Automation & AI", desc: "We deploy Microsoft Power Automate and custom AI agents to handle repetitive tasks.", insight: "Automation can reclaim up to 30% of employee time annually." },
        { title: "Digital Strategy Consulting", desc: "Virtual CIO (vCIO) services to align your tech stack with business KPIs.", insight: "Technology without strategy is just overhead." },
        { title: "Cybersecurity & Governance", desc: "Vulnerability assessments, penetration testing, and SOC2 compliance readiness.", insight: "The average cost of a data breach in Canada is over $6M." }
      ],
      method_title: "The Oakivo Method",
      method_subtitle: "A proven framework for low-risk, high-reward implementation.",
      steps: [
        { title: "Audit & Discover", desc: "Deep-dive analysis of current workflows and tech debt." },
        { title: "Architect", desc: "Solution design focusing on Odoo modularity and cloud security." },
        { title: "Implement", desc: "Agile deployment with rigorous testing and data migration." },
        { title: "Scale", desc: "Ongoing support, training, and feature expansion." }
      ],
      cta_title: "Transform Your Business Today",
      cta_text: "Stop struggling with spreadsheets and legacy systems.",
      cta_btn: "Book Your Assessment"
    },
    caseStudies: {
      hero_title: "Client Success Stories",
      hero_subtitle: "See how we've helped Canadian businesses optimize operations and secure their data.",
      cases: [
        { title: "Supply Chain Automation with Odoo", summary: "Implemented Odoo Inventory & Manufacturing for an Atlantic Canada logistics firm, reducing stockouts by 45%.", quote: "Oakivo gave us visibility we never thought possible.", author: "VP Operations, Atlantic Logistics" },
        { title: "Fintech Cloud Security Migration", summary: "Migrated legacy on-premise servers to Azure with Zero Trust architecture for a Toronto fintech.", quote: "Flawless execution. We met our SOC2 requirements.", author: "CTO, FinTrust Canada" },
        { title: "Retail ERP Consolidation", summary: "unified 15 disparate POS systems into a single Odoo instance for a national retail chain.", quote: "Finally, a single source of truth for our sales data.", author: "CEO, Northern Retail Group" },
        { title: "AI Customer Support Agents", summary: "Deployed LLM-powered support bots to handle Tier 1 inquiries, reducing ticket volume by 40%.", quote: "Our support costs dropped significantly.", author: "Director of Support, TechFlow" },
        { title: "Municipal Digital Permitting", summary: "Created a secure web portal for citizen permit applications, cutting processing time by 70%.", quote: "A massive leap forward in digital services.", author: "City Planner, City Services Dept" },
        { title: "OT Network Hardening", summary: "Secured operational technology networks for a regional energy provider against ransomware.", quote: "Oakivo's expertise in OT security is unmatched.", author: "CISO, Maritime Energy" }
      ]
    },
    blog: {
      hero_title: "Digital Insights",
      hero_subtitle: "Expert analysis on Odoo, ERP trends, AI, and Cybersecurity.",
      posts: [
        { id: 1, date: "May 20, 2024", title: "Why Odoo is the Best ERP for Canadian SMEs", category: "ERP Strategy", excerpt: "Comparing Odoo vs. SAP and NetSuite. Why modular open-source wins.", content: "Canadian SMEs need agility. Odoo offers a modular approach that legacy giants like SAP cannot match. Learn more in our <a href='#/services'>Services</a> page and see how we help <a href='#/verticals'>Manufacturers</a>." },
        { id: 2, date: "May 12, 2024", title: "Bill C-27 and Data Privacy", category: "Compliance", excerpt: "Understanding the CPPA and ensuring compliance.", content: "Bill C-27 represents a paradigm shift. Oakivo's <a href='#/services'>Cybersecurity Services</a> ensure you are ready for these new regulations." },
        { id: 3, date: "April 28, 2024", title: "Implementing Zero Trust Architecture", category: "Cybersecurity", excerpt: "Securing remote workforces in Atlantic Canada.", content: "The perimeter is no longer a building; it's an identity. See our approach to <a href='#/services'>Security and Governance</a> for modern firms." },
        { id: 4, date: "April 15, 2024", title: "The ROI of Robotic Process Automation", category: "Automation", excerpt: "Automating invoice processing saves 20+ hours a week.", content: "Automation reclamation is the goal. Explore our <a href='#/services'>Intelligent Automation solutions</a> to reclaim your team's time." },
        { id: 5, date: "April 02, 2024", title: "Cloud Sovereignty in Canada", category: "Cloud Infrastructure", excerpt: "Azure vs AWS Canada technical comparison.", content: "For Canadian healthcare and legal firms, data residency is non-negotiable. Learn about our <a href='#/services'>Strategy Consulting</a> for regulated industries." },
        { id: 6, date: "March 20, 2024", title: "AI-Driven Forecasting in Odoo 17", category: "Artificial Intelligence", excerpt: "Predicting demand surges before they happen.", content: "Layering AI onto Odoo reporting engine allows proactive inventory management. Read our <a href='#/case-studies'>Case Studies</a> to see it in action." }
      ]
    },
    careers: {
      hero_title: "Work Without Boundaries.",
      hero_subtitle: "Join a remote-first team of experts. We value output over hours.",
      culture_title: "The Oakivo Way",
      values: [
        { title: "Remote First", desc: "Work from anywhere in Canada. We focus on results, not punch clocks." },
        { title: "Learning", desc: "Paid certifications for Odoo, Azure, and CISSP." },
        { title: "Deep Work", desc: "We protect your focus time. Minimized meetings, maximized output." },
        { title: "Transparency", desc: "Open financials and strategy sharing with the whole team." }
      ],
      apply_title: "Join the Team",
      apply_text: "We are always looking for Odoo Developers, Solution Architects, and Sales professionals.",
      apply_btn: "Send Application",
      email_link: "hr@oakivo.com"
    },
    contact: {
      hero_title: "Let's Build Your Future.",
      hero_subtitle: "Looking for an Odoo partner in Atlantic Canada? Let's talk.",
      form_title: "Request a Technical Audit",
      form_response: "Your request has been routed to our technical architecture team.",
      label_name: "Name",
      label_email: "Work Email",
      label_company: "Company",
      label_message: "Project/Audit Details",
      btn_send: "Request Consult",
      btn_sending: "Routing...",
      success_title: "Consultation Requested",
      success_message: "Thank you. An Oakivo architect will contact you to schedule your discovery call.",
      hq_title: "Headquarters",
      hq_visit: "Visit Us",
      hq_address_1: "21 Delta Street",
      hq_address_2: "Dieppe, NB, E1A 7B8",
      hq_email: "Email Us",
      hq_call: "Call Us",
      hq_phone: "506-899-4941"
    },
    footer: {
      tagline_1: "Build Smarter.", tagline_2: "Grow Faster.",
      newsletter_text: "Get actionable tips on ERP, Automation, and Security delivered to your inbox.",
      newsletter_placeholder: "Enter work email",
      newsletter_btn: "Subscribe",
      col_capabilities: "Solutions", col_company: "Company", col_global: "Locations",
      privacy: "Privacy Policy", terms: "Terms of Service", back_to_top: "Top"
    }
  },
  fr: {
    nav: { home: 'Accueil', verticals: 'Secteurs', services: 'Services', work: 'Réalisations', about: 'À Propos', contact: "Contact", careers: "Carrières" },
    home: {
      hero_title_1: "Orchestrer le",
      hero_title_2: "Futur Numérique.",
      hero_subtitle: "Oakivo Solutions propulse les entreprises canadiennes avec l'implantation Odoo et la cybersécurité.",
      cta_primary: "Réserver une consultation",
      insight_title: "L'agilité est la nouvelle monnaie.",
      insight_text_1: "Les systèmes hérités freinent la croissance.",
      insight_text_2: "De l'automatisation à Halifax à la sécurisation à Toronto.",
      cap_auto_title: "Automatisation",
      cap_auto_desc: "Éliminez la saisie manuelle avec la RPA.",
      cap_eco_title: "ERP Odoo",
      cap_eco_desc: "ERP cloud unifié.",
      cap_mod_title: "Modernisation",
      cap_mod_desc: "Migration vers le cloud sécurisé.",
      cap_sec_title: "Cybersécurité",
      cap_sec_desc: "Audits de sécurité SOC2.",
      explore: "Voir le service",
      impact_title: "Résultats",
      view_portfolio: "Voir les réalisations",
      read_case: "Lire",
      cta_footer_title: "Prêt à évoluer ?",
      cta_footer_text: "Rejoignez le top 5% des entreprises.",
      cta_footer_btn: "Obtenir un devis",
      trusted_by: "Reconnu au Canada",
      perspectives_title: "Insights",
      view_insights: "Lire le blog"
    },
    verticals: {
      hero_title: "Solutions Sectorielles.",
      hero_subtitle: "Stratégies ERP sur mesure pour les secteurs clés.",
      cards: [
        { title: "Fabrication & IoT", desc: "Intégration Odoo MRP en temps réel." },
        { title: "Commerce & E-commerce", desc: "Odoo POS omnicanal." },
        { title: "Services Professionnels", desc: "Comptabilité de projet." },
        { title: "Distribution & Logistique", desc: "Gestion d'entrepôt unifiée." },
        { title: "Secteur Public", desc: "Services citoyens numériques." },
        { title: "Énergie & Services Publics", desc: "Sécurisation des réseaux OT." }
      ]
    },
    about: {
      dna_label: "Notre Mission",
      hero_title: "Architectes Numériques.",
      hero_subtitle: "\"Nous réingénierons les entreprises canadiennes.\"",
      standard_title: "Le Standard Oakivo",
      standard_p1: "Basée à Dieppe, Nouveau-Brunswick.",
      standard_p2: "Nous comblons le fossé technologique.",
      standard_p3: "Experts certifiés Odoo.",
      journey_title: "Parcours",
      values: [
        { title: "Innovation", text: "Architectures avant-gardistes." },
        { title: "Intégrité", text: "Transparence totale." },
        { title: "Impact", text: "Coûts réduits, revenus générés." }
      ],
      leadership_title: "Direction Executive",
      leadership_subtitle: "Spécialistes certifiés pour l'innovation.",
      team: [
        { name: "Ahmed Bello", role: "Président-Directeur Général", bio: "Plus de 15 ans d'expérience en ERP et stratégie opérationnelle. Consultant Odoo certifié.", credentials: "MBA, PMP" },
        { name: "Sarah Chen", role: "Directrice de la Technologie", bio: "Spécialiste en architecture cloud et modernisation. Ancienne architecte principale pour infrastructures FinTech.", credentials: "M.Sc., Azure Architect" },
        { name: "James Thorne", role: "Directeur de la Stratégie", bio: "Responsable des feuilles de route de transformation pour le secteur public et l'énergie.", credentials: "B.Eng, vCIO" },
        { name: "Elena Rodriguez", role: "Directrice de la Cybersécurité", bio: "Responsable de la conformité SOC2 et stratégie Zero Trust.", credentials: "CISSP, CISM" }
      ]
    },
    services: {
      hero_label: "Expertise",
      hero_title: "Transformation Numérique.",
      list: [
        { title: "Implantation Odoo", desc: "Partenaires certifiés.", insight: "Réduction de 23% des coûts." },
        { title: "Automatisation & IA", desc: "RPA et agents IA.", insight: "Récupérez 30% de temps." },
        { title: "Conseil Stratégique", desc: "Services de vCIO.", insight: "La stratégie d'abord." },
        { title: "Cybersécurité", desc: "SOC2 et Zero Trust.", insight: "Souveraineté des données." }
      ],
      method_title: "Méthode",
      method_subtitle: "Cadre éprouvé.",
      steps: [{ title: "Audit", desc: "Analyse." }, { title: "Architecture", desc: "Design." }, { title: "Implantation", desc: "Déploiement." }, { title: "Mise à l'échelle", desc: "Support." }],
      cta_title: "Transformez-vous", cta_text: "Finis les tableurs.", cta_btn: "Évaluation"
    },
    caseStudies: {
      hero_title: "Réalisations", hero_subtitle: "Découvrez nos succès.",
      cases: [
        { title: "Logistique Odoo", summary: "Réduction des ruptures.", quote: "Visibilité accrue.", author: "VP Opérations" },
        { title: "Migration Cloud", summary: "Zero Trust pour Fintech.", quote: "Exécution parfaite.", author: "CTO" },
        { title: "Détail ERP", summary: "Unification POS.", quote: "Source unique.", author: "PDG" },
        { title: "Support IA", summary: "Bots LLM.", quote: "Coûts en baisse.", author: "Directeur" },
        { title: "Permis Publics", summary: "Portail citoyen.", quote: "Bond en avant.", author: "Urbaniste" },
        { title: "Sécurité OT", summary: "Hardi réseaux.", quote: "Expertise inégalée.", author: "CISO" }
      ]
    },
    blog: {
      hero_title: "Insights", hero_subtitle: "Odoo, IA et Cybersécurité.",
      posts: [
        { id: 1, date: "20 Mai 2024", title: "Pourquoi Odoo ?", category: "Stratégie ERP", excerpt: "Modularité vs SAP.", content: "Agilité pour PME. Voir nos <a href='#/services'>Services</a> et <a href='#/verticals'>Secteurs</a>." },
        { id: 2, date: "12 Mai 2024", title: "Loi C-27", category: "Conformité", excerpt: "Confidentialité au Canada.", content: "Soyez prêt. Voir nos services de <a href='#/services'>Sécurité</a>." }
      ]
    },
    careers: {
      hero_title: "Travailler Sans Frontières.", hero_subtitle: "Rejoignez-nous.", culture_title: "Méthode Oakivo",
      values: [{ title: "Télétravail", desc: "De partout au Canada." }, { title: "Apprentissage", desc: "Certifications." }, { title: "Focus", desc: "Travail profond." }, { title: "Transparence", desc: "Finances ouvertes." }],
      apply_title: "Rejoignez l'Équipe", apply_text: "Cherchons dévs Odoo.", apply_btn: "Candidater", email_link: "hr@oakivo.com"
    },
    contact: {
      hero_title: "Bâtissons.", hero_subtitle: "Parlons Odoo.", form_title: "Audit Technique", form_response: "Votre demande est en cours de routage.", label_name: "Nom", label_email: "E-mail", label_company: "Entreprise", label_message: "Détails", btn_send: "Consultation", btn_sending: "Envoi...", success_title: "Demande reçue", success_message: "Un architecte vous contactera.", hq_title: "Siège", hq_visit: "Visite", hq_address_1: "21 Rue Delta", hq_address_2: "Dieppe, NB", hq_email: "E-mail", hq_call: "Appel", hq_phone: "506-899-4941"
    },
    footer: {
      tagline_1: "Bâtir Mieux.", tagline_2: "Grandir Plus Vite.", newsletter_text: "Conseils ERP.", newsletter_placeholder: "E-mail pro", newsletter_btn: "S'abonner", col_capabilities: "Solutions", col_company: "Entreprise", col_global: "Lieux", privacy: "Confidentialité", terms: "Conditions", back_to_top: "Haut"
    }
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) { if (value === undefined) return key; value = value[k]; }
    return value as unknown as string;
  };
  return (<LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>);
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
