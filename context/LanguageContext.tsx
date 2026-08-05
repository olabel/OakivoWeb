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
    nav: { 
      home: 'Home', 
      verticals: 'Industries', 
      services: 'Expertise', 
      work: 'Impact', 
      about: 'Architecture', 
      contact: "Technical Intake", 
      careers: "Careers",
      booking: "Schedule",
      compliance: "Compliance"
    },
    common: {
      cta_audit: "Technical Intake",
      cta_blueprint: "Request Blueprint",
      cta_meet: "Meet the Architects",
      cta_orchestrate: "Begin Audit",
      cta_mobile_sticky: "Start Intake",
      cta_schedule: "Schedule Discovery"
    },
    magnets: {
      erp: {
        title: "Odoo 19 Resilience Brief",
        desc: "Is your legacy infrastructure ready for the Odoo 19 sovereign shift? Audit your structural gaps today.",
        btn: "Access Brief"
      },
      cyber: {
        title: "Zero-Trust Hardening Guide",
        desc: "A PIPEDA-specific roadmap for securing Canadian industrial assets against lateral movement.",
        btn: "Get Security Roadmap"
      },
      ai: {
        title: "Agentic AI Economics",
        desc: "Calculate the ROI of autonomous reasoning engines within industrial manufacturing workflows.",
        btn: "Download Scorecard"
      },
      modern: {
        title: "Legacy Debt Audit",
        desc: "Quantify the cost of technical debt vs. the ROI of a sovereign cloud migration.",
        btn: "Initiate Audit"
      }
    },
    home: {
      hero_label: "Industrial-Grade Systems Engineering",
      hero_title_main: "Stop Letting Tech Debt and Runaway Cloud Bills",
      hero_title_italic: "Eat Your Margins.",
      hero_title_end: "",
      hero_subtitle: "We build self-healing cloud platforms, automate legacy workflows, and lock down PIPEDA compliance—so your team can focus on shipping features, not firefighting infrastructure.",
      cta_primary: "Book a 15-Min Infrastructure Audit",
      cta_secondary: "See How We Reduced Cloud Spend by 35%",
      trust_badges: {
        odoo: "Official Odoo 19 Implementation Partner",
        sovereignty: "PIPEDA / SOC2 Sovereignty",
        accounting: "CRA-Compliant Logic",
        expert: "Principal-Led Architecture",
        location: "Dieppe • Toronto • Montreal"
      },
      matrix_title: "The Engineering Matrix",
      matrix_subtitle: "Hands-on platform engineering trusted by growing logistics, finance, and industrial teams across Atlantic Canada.",
    },
    verticals: {
      hero_title: "Sector-Specific Logic.",
      hero_subtitle: "High-fidelity digital frameworks designed for the unique structural constraints of Canadian industry.",
      cards: [
        { title: "Manufacturing", desc: "Digital threads for the shop floor.", impact: "Real-time OEE tracking, PLM integration, and CRA-compliant cost accounting." },
        { title: "Logistics & Supply Chain", desc: "Global supply chain orchestration.", impact: "Automated customs logic, multi-warehouse synchronization, and sovereign tracking." },
        { title: "Professional Services", desc: "Operational fidelity for SMEs.", impact: "Project accounting automation, resource capacity planning, and SOC2 alignment." },
        { title: "Finance & Fintech", desc: "Sovereign data protocols.", impact: "Zero-Trust residency for sensitive financial logic and automated audit trails." },
        { title: "Energy & Infrastructure", desc: "Resilient asset management.", impact: "IoT-driven preventative maintenance and predictive load balancing matrices." },
        { title: "Public Sector & Health", desc: "Civic digital maturity.", impact: "Scalable service nodes with strict PIPEDA adherence and sovereign cloud hosting." }
      ]
    },
    services: {
      hero_label: "Technical Pillars",
      hero_title: "How we scale <br/> industrial velocity.",
      list: [
        { title: "Agentic AI Orchestration", desc: "We build autonomous reasoning engines that handle complex decision-making within your local security perimeter.", insight: "True industrial AI requires low-latency local inference.", magnet: "ai" },
        { title: "Odoo 19 Implementation", desc: "End-to-end orchestration of Odoo 19. We specialize in migrating legacy technical debt into a unified, CRA-compliant core.", insight: "ERP is not software; it is your business logic.", magnet: "erp" },
        { title: "Cyber-Resilience & PIPEDA", desc: "Zero-Trust perimeter hardening and data residency strategies for sensitive Canadian assets.", insight: "Compliance is the baseline, resilience is the goal.", magnet: "cyber" },
        { title: "Industrial Modernization", desc: "De-risking the transition from legacy on-premise silos to a scalable, sovereign cloud architecture.", insight: "Speed is a byproduct of structural simplicity.", magnet: "modern" }
      ],
      cta_title: "Ready to de-risk your growth?",
      cta_text: "Connect with a senior architect for a high-fidelity diagnostic of your current infrastructure.",
      cta_btn: "Start Technical Discovery"
    },
    caseStudies: {
      cases: [
        { id: 1, title: "Atlantic Hub Modernization", impact: "42% Yield Increase", quote: "Oakivo redesigned our entire operational logic in under 90 days.", author: "Director of Operations", problem: "Fragmented legacy data silos.", solution: "Odoo 19 Sovereign Implementation." },
        { id: 2, title: "FinTech Compliance Audit", impact: "100% Audit Readiness", quote: "Zero-Trust is now the foundation of our client trust model.", author: "CTO, FinTrust", problem: "SOC2 compliance gaps.", solution: "Cyber-Resilience Hardening." }
      ]
    },
    about: {
      hero_title: "Architecting the infrastructure of tomorrow.",
      hero_subtitle: "A boutique engineering firm focused on the high-fidelity orchestration of enterprise systems.",
      standard_title: "The Oakivo Standard",
      standard_p1: "We believe that software should be an asset, not a constraint. Our mission is to provide the 'Sovereign Operating System' for Canadian industry.",
      standard_p2: "Control the data, control the logic, control the future.",
      standard_p3: "Through deep expertise in Odoo 19 and Agentic AI, we deliver systems that are both resilient and autonomous.",
      leadership_title: "The Architects",
      team: [
        { name: "Ahmed Bello", role: "Principal Architect", bio: "Over 15 years of systems engineering. Specialist in ERP orchestration and AI-logic fusion.", credentials: "MEng, PMP", linkedin: "#" },
        { name: "Sarah Chen", role: "AI Systems Lead", bio: "Leading researcher in autonomous reasoning agents and neural orchestration.", credentials: "PhD Artificial Intelligence", linkedin: "#" },
        { name: "Jean-Pierre Tremblay", role: "Cybersecurity Director", bio: "Specialist in PIPEDA compliance and Zero-Trust industrial hardening.", credentials: "CISSP, CISM", linkedin: "#" }
      ]
    },
    blog: {
      hero_title: "Intel Vault.",
      hero_subtitle: "Strategic analysis on Odoo 19, Agentic AI, and Cybersecurity for the Canadian market.",
      posts: [
        { id: 1, title: "The Odoo 19 Sovereign Shift", excerpt: "Why local data residency is the new industrial standard for Canadian SMEs.", category: "ERP Strategy", author: "Ahmed Bello", date: "Jan 12, 2026", keyTakeawaysSummary: "Localized nodes outperform global clouds in compliance.", sections: { introduction: "The shift to sovereign data is accelerating.", discussion: "Global clouds often fail local residency requirements.", conclusion: "Localized Odoo is the future.", takeaways: ["Local Hosting", "CRA Logic"] } },
        { id: 2, title: "Agentic AI in Logistics", excerpt: "How autonomous reasoning is reducing supply chain latency by 30%.", category: "AI Automation", author: "Sarah Chen", date: "Feb 04, 2026", keyTakeawaysSummary: "Reasoning engines reduce human-in-the-loop bottlenecks.", sections: { introduction: "AI is moving from chatbots to agents.", discussion: "Agents negotiate supply chain shifts in real-time.", conclusion: "Start your journey with logic cores.", takeaways: ["Latency reduction", "Decision automation"] } }
      ]
    },
    careers: {
      hero_title: "Join the Orchestration.",
      hero_subtitle: "We are looking for architects, orchestrators, and visionaries.",
      values: [
        { title: "Sovereignty", desc: "Local data residency and local impact." },
        { title: "Fidélité", desc: "High-precision engineering without compromise." },
        { title: "Resilience", desc: "Systems built to withstand the unexpected." },
        { title: "Innovation", desc: "Pioneering the Agentic AI future." }
      ],
      apply_title: "Technical Intake",
      apply_text: "Are you ready to architect the future of Canadian industry?",
      apply_btn: "Submit Profile",
      email_link: "careers@oakivo.com"
    },
    contact: {
      success_title: "Intake Successfully Transmitted.",
      success_message: "An architect will review your diagnostic profile and respond within 24 hours.",
      form_title: "Initiate Discovery",
      label_name: "Principal Name",
      label_email: "Corporate Email (Secure)",
      label_q1: "Main operational bottleneck?",
      label_q2: "Required compliance timeline?",
      label_q3: "Estimated orchestration budget?",
      placeholder_q1: "e.g. Fragmentation between WMS and Accounting...",
      placeholder_q2: "e.g. Immediate, Q3 2026, or Discovery Phase",
      placeholder_q3: "e.g. $50k-$100k, $250k+, or Enterprise",
      submit_btn: "Transmit Intelligence Profile"
    },
    booking: {
      hero_title: "Architectural Session.",
      hero_subtitle: "Book a direct 45-minute discovery consultation with a principal architect.",
      success_title: "Session Confirmed.",
      success_message: "A secure meeting invite with calendar credentials has been dispatched to your corporate inbox."
    }
  },
  fr: {
    nav: { 
      home: 'Accueil', 
      verticals: 'Industries', 
      services: 'Expertise', 
      work: 'Impact', 
      about: 'Architecture', 
      contact: "Intake Technique", 
      careers: "Carrières",
      booking: "Planifier",
      compliance: "Conformité"
    },
    common: {
      cta_audit: "Intake Technique",
      cta_blueprint: "Demander le Schéma",
      cta_meet: "Rencontrer les Architectes",
      cta_orchestrate: "Commencer l'Audit",
      cta_mobile_sticky: "Démarrer l'Intake",
      cta_schedule: "Planifier la Découverte"
    },
    magnets: {
      erp: {
        title: "Fiche de Résilience Odoo 19",
        desc: "Votre infrastructure est-elle prête pour le virage souverain Odoo 19 ? Auditez vos écarts dès aujourd'hui.",
        btn: "Accéder à la Fiche"
      },
      cyber: {
        title: "Guide de Renforcement Zero-Trust",
        desc: "Feuille de route spécifique LPRPDE pour sécuriser les actifs industriels canadiens contre les mouvements latéraux.",
        btn: "Obtenir la Feuille de Route"
      },
      ai: {
        title: "Économie de l'IA Agentique",
        desc: "Calculez le ROI des moteurs de raisonnement autonomes dans les flux de fabrication industrielle.",
        btn: "Télécharger la Fiche de Score"
      },
      modern: {
        title: "Audit de la Dette Technique",
        desc: "Quantifiez le coût de la dette technique par rapport au ROI d'une migration cloud souveraine.",
        btn: "Initier l'Audit"
      }
    },
    home: {
      hero_label: "Ingénierie de Systèmes Industriels",
      hero_title_main: "Architecture de",
      hero_title_italic: "noyaux",
      hero_title_end: "numériques résilients.",
      hero_subtitle: "Oakivo Solutions Inc. orchestre la complexité d'Odoo 19 et de l'IA Agentique. Nous sécurisons la croissance industrielle canadienne par la transformation numérique souveraine Zero-Trust.",
      cta_primary: "Initialiser la Découverte Technique",
      cta_secondary: "Explorer la Logique Sectorielle",
      trust_badges: {
        odoo: "Partenaire d'Implémentation Officiel Odoo 19",
        sovereignty: "Souveraineté LPRPDE / SOC2",
        accounting: "Logique Conforme à l'ARC",
        expert: "Architecture Dirigée par des Principaux",
        location: "Dieppe • Toronto • Montréal"
      },
      matrix_title: "La Matrice d'Ingénierie",
      matrix_subtitle: "Logique opérationnelle validée pour la fabrication, la logistique et les services professionnels à haut risque.",
    },
    verticals: {
      hero_title: "Logique Sectorielle Spécifique.",
      hero_subtitle: "Cadres numériques haute fidélité conçus pour les contraintes structurelles uniques de l'industrie canadienne.",
      cards: [
        { title: "Fabrication", desc: "Threads numériques pour l'atelier.", impact: "Suivi TRS en temps réel, intégration PLM et comptabilité de gestion conforme à l'ARC." },
        { title: "Logistique & Chaîne d'Approvisionnement", desc: "Orchestration globale.", impact: "Logique douanière automatisée, synchronisation multi-entrepôts et suivi souverain." },
        { title: "Services Professionnels", desc: "Fidélité opérationnelle pour PME.", impact: "Automatique comptable par projet, planification des capacités et alignement SOC2." },
        { title: "Finance & Fintech", desc: "Protocole de données souveraines.", impact: "Résidence Zero-Trust pour les données financières sensibles et pistes d'audit." },
        { title: "Énergie & Infrastructure", desc: "Gestion d'actifs résiliente.", impact: "Maintenance préventive IoT et matrices d'équilibrage prédictif des charges." },
        { title: "Secteur Public & Santé", desc: "Maturité numérique civique.", impact: "Nœuds de service échelons avec respect strict de la LPRPDE et hébergement souverain." }
      ]
    },
    services: {
      hero_label: "Piliers Techniques",
      hero_title: "Comment nous accélérons <br/> la vélocité industrielle.",
      list: [
        { title: "Orchestration d'IA Agentique", desc: "Moteurs de raisonnement autonomes opérant dans votre périmètre de sécurité local.", insight: "L'IA industrielle exige une inférence locale à très faible latence.", magnet: "ai" },
        { title: "Implémentation Odoo 19", desc: "Orchestration complète d'Odoo 19. Migration de la dette technique vers un noyau unifié conforme ARC.", insight: "Un ERP n'est pas un logiciel; c'est votre logique d'affaires.", magnet: "erp" },
        { title: "Cyber-Résilience & LPRPDE", desc: "Renforcement du périmètre Zero-Trust et stratégies de résidence des données canadiennes.", insight: "La conformité est le minimum, la résilience est l'objectif.", magnet: "cyber" },
        { title: "Modernisation Industrielle", desc: "Transition sécurisée des silos hérités vers une architecture cloud souveraine et évolutive.", insight: "La vitesse est un sous-produit de la simplicité structurelle.", magnet: "modern" }
      ],
      cta_title: "Prêt à sécuriser votre croissance ?",
      cta_text: "Échangez avec un architecte principal pour un diagnostic haute fidélité de votre infrastructure.",
      cta_btn: "Lancer la Découverte Technique"
    },
    caseStudies: {
      cases: [
        { id: 1, title: "Modernisation du Hub Atlantique", impact: "+42% de Rendement", quote: "Oakivo a repensé notre logique opérationnelle en moins de 90 jours.", author: "Directeur des Opérations", problem: "Silos de données hérités et fragmentés.", solution: "Implémentation Souveraine d'Odoo 19." },
        { id: 2, title: "Audit de Conformité FinTech", impact: "Prêt à 100% pour l'Audit", quote: "Zero-Trust est désormais le socle de notre modèle de confiance client.", author: "CTO, FinTrust", problem: "Écarts de conformité SOC2.", solution: "Renforcement de Cyber-Résilience." }
      ]
    },
    about: {
      hero_title: "Concevoir l'infrastructure de demain.",
      hero_subtitle: "Cabinet d'ingénierie spécialisé dans l'orchestration haute fidélité de systèmes d'entreprise.",
      standard_title: "Le Standard Oakivo",
      standard_p1: "Nous croyons que le logiciel doit être un actif, pas une contrainte. Notre mission est de fournir le 'Système d'Exploitation Souverain' pour l'industrie canadienne.",
      standard_p2: "Contrôlez les données, contrôlez la logique, maîtrisez l'avenir.",
      standard_p3: "Grâce à notre expertise en Odoo 19 et IA Agentique, nous livrons des systèmes à la fois résilients et autonomes.",
      leadership_title: "Les Architectes",
      team: [
        { name: "Ahmed Bello", role: "Architecte Principal", bio: "Plus de 15 ans d'ingénierie système. Spécialiste de l'orchestration ERP et de la fusion IA-Logique.", credentials: "M.Ing., PMP", linkedin: "#" },
        { name: "Sarah Chen", role: "Responsable Systèmes IA", bio: "Chercheuse de pointe en agents autonomes de raisonnement et orchestration neurale.", credentials: "Ph.D. Intelligence Artificielle", linkedin: "#" },
        { name: "Jean-Pierre Tremblay", role: "Directeur Cybersécurité", bio: "Spécialiste de la conformité LPRPDE / Loi 25 et du renforcement industriel Zero-Trust.", credentials: "CISSP, CISM", linkedin: "#" }
      ]
    },
    blog: {
      hero_title: "Vault d'Intelligence.",
      hero_subtitle: "Analyses stratégiques sur Odoo 19, l'IA Agentique et la cybersécurité pour le marché canadien.",
      posts: [
        { id: 1, title: "Le Virage Souverain Odoo 19", excerpt: "Pourquoi la résidence locale des données est la nouvelle norme industrielle pour les PME canadiennes.", category: "Stratégie ERP", author: "Ahmed Bello", date: "12 Jan 2026", keyTakeawaysSummary: "Les nœuds localisés surpassent les clouds mondiaux en conformité.", sections: { introduction: "Le virage vers les données souveraines s'accélère.", discussion: "Les clouds mondiaux manquent souvent les exigences locales de résidence.", conclusion: "L'Odoo localisé est l'avenir.", takeaways: ["Hébergement Local", "Logique ARC"] } },
        { id: 2, title: "L'IA Agentique en Logistique", excerpt: "Comment le raisonnement autonome réduit la latence de la chaîne d'approvisionnement de 30%.", category: "Automation IA", author: "Sarah Chen", date: "04 Fév 2026", keyTakeawaysSummary: "Les moteurs de raisonnement réduisent les goulots d'étranglement humains.", sections: { introduction: "L'IA passe des chatbots aux agents.", discussion: "Les agents négocient les changements de chaîne en temps réel.", conclusion: "Commencez votre parcours avec des noyaux de logique.", takeaways: ["Réduction de latence", "Automation des décisions"] } }
      ]
    },
    careers: {
      hero_title: "Rejoignez l'Orchestration.",
      hero_subtitle: "Nous recherchons des architectes, orchestrateurs et visionnaires.",
      values: [
        { title: "Souveraineté", desc: "Résidence des données et impact local." },
        { title: "Fidélité", desc: "Ingénierie haute précision sans compromis." },
        { title: "Résilience", desc: "Des systèmes conçus pour résister à l'imprévu." },
        { title: "Innovation", desc: "Pionniers de l'avenir de l'IA Agentique." }
      ],
      apply_title: "Intake Technique",
      apply_text: "Êtes-vous prêt à concevoir l'avenir de l'industrie canadienne ?",
      apply_btn: "Soumettre Profil",
      email_link: "careers@oakivo.com"
    },
    contact: {
      success_title: "Intake Transmis avec Succès.",
      success_message: "Un architecte examinera votre profil diagnostic et répondra sous 24h.",
      form_title: "Initier la Découverte",
      label_name: "Nom du Dirigeant",
      label_email: "Courriel d'Entreprise (Sécurisé)",
      label_q1: "Goulot d'étranglement opérationnel principal ?",
      label_q2: "Échéancier de conformité requis ?",
      label_q3: "Budget d'orchestration estimé ?",
      placeholder_q1: "ex. Fragmentation entre WMS et Comptabilité...",
      placeholder_q2: "ex. Immédiat, T3 2026, ou Phase de Découverte",
      placeholder_q3: "ex. 50k$-100k$, 250k$+ ou Enterprise",
      submit_btn: "Transmettre le Profil d'Intelligence"
    },
    booking: {
      hero_title: "Session d'Architecture.",
      hero_subtitle: "Réservez une consultation directe de 45 minutes avec un architecte principal.",
      success_title: "Session Confirmée.",
      success_message: "Une invitation sécurisée avec calendrier a été transmise à votre boîte professionnelle."
    }
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations[language];

    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to English if missing
        let fallback: any = translations['en'];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return key;
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }

    return typeof current === 'string' ? current : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
