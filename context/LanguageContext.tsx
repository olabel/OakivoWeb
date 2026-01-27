
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
      services: 'Services', 
      work: 'Case Studies', 
      about: 'About', 
      contact: "Request Blueprint", 
      careers: "Careers" 
    },
    home: {
      hero_title_1: "Orchestrating",
      hero_title_2: "Digital Growth.",
      hero_subtitle: "Oakivo Solutions Inc. is Canada's premier engineering force for Agentic AI, Odoo 18 Orchestration, and Zero-Trust Cybersecurity. We turn technical debt into operational equity.",
      cta_primary: "Start Transformation Audit",
      stats_label: "Engineering Impact",
      stats_1_val: "482K+",
      stats_1_lbl: "Hours Reclaimed",
      stats_2_val: "99.9%",
      stats_2_lbl: "Uptime Standard",
      stats_3_val: "SOC2",
      stats_3_lbl: "Security Standard",
      matrix_title: "Transformation Matrix",
      matrix_subtitle: "Our core engineering pillars for modern Canadian enterprises.",
      transformation_title: "The Transformation Journey",
      transformation_subtitle: "A surgical, data-driven approach to reclaiming business agility.",
      maturity_title: "Digital Maturity Index",
      maturity_subtitle: "Where does your organization stand in the autonomous economy?",
      cta_footer_title: "Blueprint Your Future.",
      cta_footer_text: "Join the top 5% of Canadian companies leveraging Agentic AI and Odoo Orchestration.",
      cta_footer_btn: "Request Strategic Audit",
      trusted_by: "Engineering Success Across Canada",
      perspectives_title: "Expert Perspectives",
      view_insights: "Access Intel Vault"
    },
    about: {
      dna_label: "Corporate DNA",
      hero_title: "Re-Engineering the Canadian Enterprise.",
      hero_subtitle: "We reclaim business agility through surgical AI integration and unified data ecosystems.",
      standard_title: "The Oakivo Standard",
      standard_p1: "Founded in Atlantic Canada, Oakivo was born from a simple realization: traditional software implementation fails because it ignores the human element of orchestration.",
      standard_p2: "We don't just sell software. We architect ecosystems where AI handles the mundane and humans drive the strategy.",
      standard_p3: "Our mission is to ensure every Canadian SME has access to the same level of digital sovereignty and automation as global giants.",
      leadership_title: "Architectural Leadership",
      leadership_subtitle: "The minds orchestrating Canada's autonomous future.",
      values: [
        { title: "Precision First", text: "We measure twice and cut once. Every deployment is a surgical improvement of your business logic." },
        { title: "Data Sovereignty", text: "Your data stays in Canada. We prioritize SOC2 compliance and local residency." },
        { title: "Radical Automation", text: "If a task can be automated, it should be. We push the boundaries of agentic AI." }
      ],
      team: [
        { 
          name: "Ahmed Bello", 
          credentials: "MBA, Odoo Certified Architect", 
          role: "CEO & Senior Systems Orchestrator", 
          bio: "With over 15 years in enterprise resource planning, Ahmed specializes in de-coupling legacy systems and integrating high-performance AI agents into industrial workflows.",
          expertise: ["Strategic AI", "ERP Orchestration", "Operational Scaling"],
          linkedin: "https://linkedin.com/company/oakivo"
        },
        { 
          name: "Sarah Jenkins", 
          credentials: "MSc Computer Science, CISSP", 
          role: "Director of Cyber Resilience", 
          bio: "Sarah leads our security audit division, ensuring every automation pipeline adheres to Zero-Trust principles and the highest Canadian data privacy standards.",
          expertise: ["Zero-Trust Architecture", "Data Sovereignty", "SOC2 Compliance"],
          linkedin: "https://linkedin.com/company/oakivo"
        }
      ]
    },
    services: {
      hero_label: "Solutions Matrix",
      hero_title: "Engineering Efficiency. <br/> At Scale.",
      list: [
        { title: "Agentic AI Automation", desc: "Autonomous workflows that process data and trigger actions without human intervention.", insight: "Automation isn't just about speed; it's about consistency and reliability." },
        { title: "Odoo 18 Orchestration", desc: "The foundational nervous system for your entire organization, unified and powerful.", insight: "A unified system is the only way to achieve true enterprise visibility." },
        { title: "Cyber-Security Audits", desc: "Hardening your digital perimeter with Zero-Trust principles and SOC2 readiness.", insight: "Security is a strategic feature, not a technical afterthought." },
        { title: "Modernization Strategy", desc: "24/7 technical monitoring and managed infrastructure support.", insight: "Uptime is the heartbeat of modern commerce." }
      ],
      method_title: "The Oakivo Method",
      method_subtitle: "A four-phase approach to total digital transformation.",
      steps: [
        { title: "Audit", desc: "Deep-dive mapping of existing silos and manual technical debt." },
        { title: "Architect", desc: "Designing a custom blueprint of AI and ERP synergy." },
        { title: "Implement", desc: "Surgical deployment with zero operational downtime." },
        { title: "Scale", desc: "Continuous optimization through data telemetry and BI." }
      ],
      faq_title: "Technical Inquiries",
      faq: [
        { q: "How long is a typical Odoo implementation?", a: "Standard mid-market deployments take 3-6 months depending on data complexity." },
        { q: "What is 'Agentic AI'?", a: "AI capable of executing tasks (e.g., reconciling invoices) directly in your ERP." }
      ],
      cta_title: "Start Your Blueprint",
      cta_text: "Don't settle for legacy limitations. Let's build your autonomous future.",
      cta_btn: "Request Technical Blueprint"
    },
    verticals: {
      cards: [
        { title: "Manufacturing", desc: "Predictive maintenance and real-time shop floor synchronization." },
        { title: "Retail", desc: "Unified commerce and AI-driven inventory replenishment." },
        { title: "Distribution", desc: "Logistics automation and multi-warehouse optimization." },
        { title: "Finance", desc: "Automated reconciliation and Zero-Trust data vaults." },
        { title: "Public Sector", desc: "Digital citizen portals and legacy system migration." },
        { title: "Healthcare", desc: "Secure data pipelines and automated patient scheduling." }
      ]
    },
    caseStudies: {
      hero_title: "Proven Outcomes.",
      hero_subtitle: "Analysis of how we transform complex challenges into competitive advantages.",
      cases: [
        { 
          title: "Atlantic Distribution Sync", 
          summary: "Automating 30,000 monthly SKUs across 5 locations using Odoo 18.", 
          quote: "Oakivo didn't just install software; they fixed our company's pulse.", 
          author: "James Miller, Operations Director",
          impact: "40% Efficiency Gain"
        },
        { 
          title: "FinTrust Cyber Hardening", 
          summary: "Implementing Zero-Trust identity management for a national finance firm.", 
          quote: "Finally, a security partner that understands the business bottom line.", 
          author: "S. Chen, CTO",
          impact: "Zero Breaches in 24 Months"
        }
      ]
    },
    contact: {
      hero_title: "Begin Your Audit.",
      hero_subtitle: "Connect with our senior engineers to map your digital trajectory.",
      form_title: "Project Inquiry",
      form_response: "Expect a response from a technical lead within 24 hours.",
      label_name: "Full Name",
      label_email: "Work Email",
      label_company: "Organization",
      label_message: "Operational Overview",
      btn_send: "Request Blueprint",
      btn_sending: "Processing...",
      success_title: "Inquiry Captured",
      success_message: "Your operational overview is being reviewed by our engineering lead.",
      hq_title: "Regional Presence",
      hq_visit: "Visit Our Hub",
      hq_address_1: "21 Delta St.",
      hq_address_2: "Dieppe, NB E1A 3R5",
      hq_email: "Intelligence Inquiries",
      hq_call: "Direct Line",
      hq_phone: "+1 (506) 857-4000"
    },
    careers: {
      hero_title: "Join the Elite.",
      hero_subtitle: "We are shaping the future of Canadian enterprise. No open roles? We still want to hear from elite talent.",
      culture_title: "Our Ecosystem",
      values: [
        { title: "Remote-First", desc: "Work from anywhere in Canada with our async-first culture." },
        { title: "Deep Ownership", desc: "Every engineer has a stake in the project's strategic outcome." },
        { title: "Infinite Learning", desc: "Generous budget for Odoo and AI certifications." },
        { title: "High Impact", desc: "See your code transform real-world industrial output." }
      ],
      apply_title: "Spontaneous Applications",
      apply_text: "We are always seeking senior Odoo architects and AI automation specialists.",
      apply_btn: "Submit Technical Profile",
      email_link: "hr@oakivo.com"
    },
    blog: {
      hero_title: "The Intel Vault",
      hero_subtitle: "Expert analysis on AI orchestration, ERP trends, and Cybersecurity for the Canadian market.",
      posts: [
        { 
          id: 1, 
          date: "January 15, 2026", 
          title: "The AI Revolution in Odoo 18", 
          category: "AI & ERP", 
          author: "Ahmed Bello",
          excerpt: "How Odoo 18's native AI and Oakivo's agentic workflows are reshaping mid-market productivity.", 
          sections: {
            introduction: "Odoo 18 marks a fundamental shift from a simple record-keeping system to an active participant in business operations.",
            takeaways: [
              "Agentic AI moves beyond 'chatting' to executing complex transactional logic.",
              "Odoo 18 provides 30% faster data entry through intelligent OCR.",
              "Autonomous procurement is now a reality for mid-market manufacturing."
            ],
            discussion: "At Oakivo, we've observed that the true power of Odoo 18 lies in its orchestration of data across departments.",
            conclusion: "The transition to an AI-first ERP is no longer optional for businesses looking to scale in 2026."
          }
        }
      ]
    },
    footer: {
      tagline_1: "Orchestrating AI.", tagline_2: "Building Futures.",
      newsletter_text: "Get actionable technical intelligence on AI Automation and Odoo delivered to your inbox.",
      newsletter_placeholder: "Corporate email address",
      newsletter_btn: "Subscribe",
      col_capabilities: "Solutions Matrix", col_company: "Oakivo Inc.", col_global: "Regional Presence",
      privacy: "Privacy Policy", terms: "Terms of Service", back_to_top: "Top"
    }
  },
  fr: {
    nav: { 
      home: 'Accueil', 
      verticals: 'Secteurs', 
      services: 'Services', 
      work: 'Réalisations', 
      about: 'À Propos', 
      contact: "Audit Stratégique", 
      careers: "Carrières" 
    },
    home: {
      hero_title_1: "Orchestrer la",
      hero_title_2: "Transformation Numérique.",
      hero_subtitle: "Oakivo Solutions Inc. est la force d'ingénierie numéro 1 au Canada pour l'IA, Odoo 18 et la cybersécurité. Nous transformons la dette technique en capital opérationnel.",
      cta_primary: "Audit de Transformation",
      stats_label: "Impact Ingénierie",
      stats_1_val: "482K+",
      stats_1_lbl: "Heures Récupérées",
      stats_2_val: "99.9%",
      stats_2_lbl: "Standard Disponibilité",
      stats_3_val: "SOC2",
      stats_3_lbl: "Standard Sécurité",
      matrix_title: "Matrice de Transformation",
      matrix_subtitle: "Nos piliers centraux pour les entreprises canadiennes modernes.",
      transformation_title: "Le Parcours de Transformation",
      transformation_subtitle: "Une approche chirurgicale basée sur les données pour restaurer l'agilité commerciale.",
      maturity_title: "Indice de Maturité Numérique",
      maturity_subtitle: "Où se situe votre organisation dans l'économie autonome ?",
      cta_footer_title: "Planifiez Votre Futur.",
      cta_footer_text: "Rejoignez le top 5% des entreprises canadiennes utilisant l'IA et Odoo.",
      cta_footer_btn: "Demander l'Audit Stratégique",
      trusted_by: "Ingénierie de succès au Canada",
      perspectives_title: "Perspectives d'Experts",
      view_insights: "Accéder au Coffre-fort"
    },
    about: {
      dna_label: "ADN Corporatif",
      hero_title: "Ré-ingénierie de l'Entreprise Canadienne.",
      hero_subtitle: "Nous restaurons l'agilité commerciale par l'intégration chirurgicale de l'IA.",
      standard_title: "Le Standard Oakivo",
      standard_p1: "Fondé au Canada atlantique, Oakivo est né d'un constat simple : l'implémentation logicielle traditionnelle échoue.",
      standard_p2: "Nous n'installons pas juste des logiciels. Nous architecturons des écosystèmes.",
      standard_p3: "Notre mission est d'assurer la souveraineté numérique des PME canadiennes.",
      leadership_title: "Direction Architecturale",
      leadership_subtitle: "Les esprits orchestrant le futur autonome du Canada.",
      values: [
        { title: "Précision d'abord", text: "Chaque déploiement est une amélioration chirurgicale de votre logique métier." },
        { title: "Souveraineté des données", text: "Vos données restent au Canada. Conformité SOC2 garantie." },
        { title: "Automatisation Radicale", text: "Si une tâche peut être automatisée, elle doit l'être." }
      ],
      team: [
        { 
          name: "Ahmed Bello", 
          credentials: "MBA, Architecte Certifié Odoo", 
          role: "PDG et Orchestrateur de Systèmes Senior", 
          bio: "Avec plus de 15 ans d'expérience, Ahmed se spécialise dans le découplage des systèmes hérités.",
          expertise: ["IA Stratégique", "Orchestration ERP", "Croissance Opérationnelle"],
          linkedin: "https://linkedin.com/company/oakivo"
        }
      ]
    },
    services: {
      hero_label: "Matrice de Solutions",
      hero_title: "Ingénierie de l'Efficacité. <br/> À l'échelle.",
      list: [
        { title: "Automatisation IA", desc: "Workflows intelligents qui agissent sans intervention humaine.", insight: "L'automatisation, c'est la cohérence." },
        { title: "Odoo 18 ERP", desc: "Le système nerveux central de votre organisation.", insight: "Un système unifié est la seule voie vers la visibilité." },
        { title: "Cyber-Sécurité", desc: "Protection de votre périmètre avec le Zero-Trust.", insight: "La sécurité est une priorité stratégique." },
        { title: "Modernisation Stratégique", desc: "Support technique et surveillance infrastructure 24/7.", insight: "La disponibilité est le coeur du commerce." }
      ],
      method_title: "La Méthode Oakivo",
      method_subtitle: "Une approche en quatre phases.",
      steps: [
        { title: "Audit", desc: "Cartographie profonde des silos." },
        { title: "Architecture", desc: "Conception d'un plan personnalisé." },
        { title: "Implémentation", desc: "Déploiement chirurgical." },
        { title: "Optimisation", desc: "Amélioration continue." }
      ],
      faq_title: "Questions Techniques",
      faq: [
        { q: "Combien de temps prend une implémentation ?", a: "Généralement de 3 à 6 mois." },
        { q: "C'est quoi l'IA Agente ?", a: "Une IA capable d'exécuter des tâches réelles dans votre ERP." }
      ],
      cta_title: "Commencez Votre Plan",
      cta_text: "Bâtissons votre futur autonome dès aujourd'hui.",
      cta_btn: "Demander l'Audit"
    },
    verticals: {
      cards: [
        { title: "Manufacture", desc: "Maintenance prédictive et synchronisation d'usine." },
        { title: "Vente au détail", desc: "Commerce unifié et réapprovisionnement piloté par l'IA." },
        { title: "Distribution", desc: "Automatisation logistique et optimisation d'entrepôt." },
        { title: "Finance", desc: "Réconciliation automatisée et coffres-forts de données." },
        { title: "Secteur Public", desc: "Portails citoyens et migration de systèmes hérités." },
        { title: "Santé", desc: "Pipelines de données sécurisés et planification automatisée." }
      ]
    },
    caseStudies: {
      hero_title: "Résultats Prouvés.",
      hero_subtitle: "Analyse de notre capacité à transformer les défis en avantages.",
      cases: [
        { 
          title: "Atlantic Distribution Sync", 
          summary: "Automatisation de 30,000 SKUs via Odoo 18.", 
          quote: "Oakivo a réparé le pouls de notre entreprise.", 
          author: "J. Miller, Dir Opérations",
          impact: "Gain d'Efficacité de 40%"
        }
      ]
    },
    contact: {
      hero_title: "Commencez Votre Audit.",
      hero_subtitle: "Contactez nos ingénieurs pour définir votre trajectoire.",
      form_title: "Demande de Projet",
      form_response: "Réponse d'un responsable technique sous 24h.",
      label_name: "Nom Complet",
      label_email: "Email Professionnel",
      label_company: "Organisation",
      label_message: "Aperçu Opérationnel",
      btn_send: "Demander l'Audit",
      btn_sending: "Envoi...",
      success_title: "Demande Capturée",
      success_message: "Votre aperçu est en cours d'examen par notre chef ingénieur.",
      hq_title: "Présence Régionale",
      hq_visit: "Visitez Notre Hub",
      hq_address_1: "21 Delta St.",
      hq_address_2: "Dieppe, NB E1A 3R5",
      hq_email: "Intelligence Inquiries",
      hq_call: "Ligne Directe",
      hq_phone: "+1 (506) 857-4000"
    },
    careers: {
      hero_title: "Rejoignez l'Élite.",
      hero_subtitle: "Nous façonnons l'avenir de l'entreprise canadienne.",
      culture_title: "Notre Écosystème",
      values: [
        { title: "Remote-First", desc: "Travaillez de n'importe où au Canada." },
        { title: "Responsabilité", desc: "Chaque ingénieur a un rôle dans le résultat stratégique." },
        { title: "Apprentissage", desc: "Budget généreux pour les certifications Odoo et IA." },
        { title: "Impact", desc: "Voyez votre code transformer l'industrie réelle." }
      ],
      apply_title: "Candidatures Spontanées",
      apply_text: "Nous cherchons toujours des experts Odoo et des spécialistes de l'automatisation IA.",
      apply_btn: "Soumettre ma candidature",
      email_link: "hr@oakivo.com"
    },
    blog: {
      hero_title: "Le Coffre-fort d'Intelligence",
      hero_subtitle: "Analyse d'experts sur l'IA, l'ERP et la Cyber-sécurité au Canada.",
      posts: [
        { 
          id: 1, 
          date: "15 Janvier 2026", 
          title: "La Révolution IA dans Odoo 18", 
          category: "IA et ERP", 
          author: "Ahmed Bello",
          excerpt: "Comment l'IA native d'Odoo 18 et les agents d'Oakivo transforment la productivité.", 
          sections: {
            introduction: "Odoo 18 marque un tournant fondamental...",
            takeaways: [
              "L'IA Agente exécute une logique transactionnelle.",
              "Saisie 30% plus rapide.",
              "Approvisionnement autonome."
            ],
            discussion: "La véritable puissance d'Odoo 18...",
            conclusion: "La transition vers un ERP axé sur l'IA n'est plus optionnelle."
          }
        }
      ]
    },
    footer: {
      tagline_1: "Orchestrer l'IA.", tagline_2: "Bâtir le Futur.",
      newsletter_text: "Recevez l'intelligence technique sur l'IA et Odoo directement dans votre boîte mail.",
      newsletter_placeholder: "Email corporatif",
      newsletter_btn: "S'abonner",
      col_capabilities: "Matrice de Solutions", col_company: "Oakivo Inc.", col_global: "Présence Régionale",
      privacy: "Confidentialité", terms: "Conditions", back_to_top: "Haut"
    }
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    return value as unknown as string;
  };

  return (
    /* Fix: Wrap Provider in JSX tags */
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
