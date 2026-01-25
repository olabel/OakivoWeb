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
    nav: { home: 'Home', verticals: 'Industries', services: 'Services', work: 'Case Studies', about: 'About', contact: "Request Technical Blueprint", careers: "Careers" },
    home: {
      hero_title_1: "Orchestrating",
      hero_title_2: "Autonomous Growth.",
      hero_subtitle: "Oakivo Solutions Inc. empowers Canadian enterprises with Agentic AI Automation, Expert Odoo Orchestration, and Zero-Trust Cybersecurity.",
      cta_primary: "Request Technical Blueprint",
      insight_title: "AI & Automation is the new survival standard.",
      insight_text_1: "Legacy systems and manual workflows cost Canadian SMEs an average of 18% in lost margins every year. The future belongs to the autonomous.",
      insight_text_2: "At Oakivo, we build the digital infrastructure that handles the routine, so your team can focus on the extraordinary. AI-driven Odoo ERP is just the beginning.",
      cap_auto_title: "Agentic AI Automation",
      cap_auto_desc: "We deploy autonomous AI agents that execute complex business logic directly within your Odoo environment.",
      cap_eco_title: "Odoo 18 Orchestration",
      cap_eco_desc: "The world's most flexible ERP, supercharged with native AI for inventory and cash flow prediction.",
      cap_mod_title: "Autonomous Ecosystems",
      cap_mod_desc: "We bridge your existing stack with AI-driven pipelines that modernize operations overnight.",
      cap_sec_title: "Cyber Resilience",
      cap_sec_desc: "Zero-trust security frameworks that protect your AI assets and enterprise data with SOC2 standards.",
      explore: "Explore Solution Matrix",
      impact_title: "Measured Impact",
      view_portfolio: "Review Strategy Vault",
      read_case: "Review Success Story",
      cta_footer_title: "Blueprint Your Future.",
      cta_footer_text: "Join the top 5% of Canadian companies leveraging Agentic AI and Odoo Orchestration.",
      cta_footer_btn: "Request Technical Blueprint",
      trusted_by: "Engineering Success Across Canada",
      perspectives_title: "Expert Perspectives",
      view_insights: "Access Intel Vault"
    },
    about: {
      dna_label: "Corporate DNA",
      hero_title: "Re-Engineering the Canadian Enterprise.",
      hero_subtitle: "We are a strategic engineering force dedicated to reclaiming business agility through AI and unified systems.",
      standard_title: "The Oakivo Standard",
      standard_p1: "Founded in Atlantic Canada, Oakivo was born from a simple realization: traditional software implementation fails because it ignores the human element of orchestration.",
      standard_p2: "We don't just sell software. We architect ecosystems where AI handles the mundane and humans drive the strategy.",
      standard_p3: "Our mission is to ensure every Canadian SME has access to the same level of digital sovereignty and automation as global giants.",
      journey_title: "Our Trajectory",
      leadership_title: "Strategic Leadership",
      leadership_subtitle: "Architects of the autonomous future.",
      values: [
        { title: "Precision First", text: "We measure twice and cut once. Every deployment is a surgical improvement of your business logic." },
        { title: "Data Sovereignty", text: "Your data stays in Canada. We prioritize SOC2 compliance and local residency." },
        { title: "Radical Automation", text: "If a task can be automated, it should be. We push the boundaries of agentic AI." }
      ],
      team: [
        { name: "Ahmed Bello", credentials: "MBA, Odoo Expert", role: "CEO & Senior Architect", bio: "With over a decade in ERP orchestration, Ahmed leads the vision for autonomous industrial growth." }
      ]
    },
    services: {
      hero_label: "Solutions Matrix",
      hero_title: "Engineering Efficiency. <br/> At Scale.",
      list: [
        { title: "AI Automation", desc: "Agentic workflows that process data and trigger actions without human intervention.", insight: "Automation isn't just about speed; it's about consistency." },
        { title: "Odoo 18 ERP", desc: "The foundational nervous system for your entire organization.", insight: "A unified system is the only way to achieve true visibility." },
        { title: "Cloud Security", desc: "Hardening your digital perimeter with Zero-Trust principles.", insight: "Security is a feature, not an afterthought." },
        { title: "Managed Ops", desc: "24/7 technical monitoring and infrastructure support.", insight: "Uptime is the heartbeat of modern commerce." }
      ],
      method_title: "The Oakivo Method",
      method_subtitle: "A four-phase approach to total digital transformation.",
      steps: [
        { title: "Audit", desc: "Deep-dive mapping of existing silos and manual debt." },
        { title: "Architect", desc: "Designing a custom blueprint of AI and ERP synergy." },
        { title: "Implement", desc: "Surgical deployment with zero operational downtime." },
        { title: "Scale", desc: "Continuous optimization through data telemetry." }
      ],
      faq_title: "Common Inquiries",
      faq: [
        { q: "How long is a typical Odoo implementation?", a: "Standard mid-market deployments take 3-6 months depending on data complexity." },
        { q: "What is 'Agentic AI'?", a: "Unlike standard AI that just chats, Agentic AI can execute tasks like updating inventory or reconciling invoices." }
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
        { title: "Atlantic Distribution Sync", summary: "Automating 30,000 monthly SKUs across 5 locations using Odoo 18.", quote: "Oakivo didn't just install software; they fixed our company's pulse.", author: "J. Miller, Operations Dir" },
        { title: "FinTrust Cyber Hardening", summary: "Implementing Zero-Trust identity management for a national finance firm.", quote: "Finally, a security partner that understands the business bottom line.", author: "S. Chen, CTO" },
        { title: "Retail AI Integration", summary: "Deploying predictive stock models that reduced waste by 22% in 6 months.", quote: "The ROI was clear within the first quarter.", author: "R. Thompson, CEO" },
        { title: "Agentic Support Hub", summary: "Automating 70% of support tickets with native Odoo-AI integration.", quote: "Our team is finally doing high-value work.", author: "L. Green, CS Lead" }
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
      hero_subtitle: "We are hiring the next generation of Odoo architects and AI engineers to lead Canada's digital future.",
      culture_title: "Our Ecosystem",
      values: [
        { title: "Remote-First", desc: "Work from anywhere in Canada with our async-first culture." },
        { title: "Deep Ownership", desc: "Every engineer has a stake in the project's strategic outcome." },
        { title: "Infinite Learning", desc: "Generous budget for Odoo and AI certifications." },
        { title: "High Impact", desc: "See your code transform real-world industrial output." }
      ],
      apply_title: "Start Your Mission",
      apply_text: "We are always looking for senior Odoo developers and AI automation specialists.",
      apply_btn: "Submit Application",
      email_link: "careers@oakivo.com"
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
          excerpt: "How Odoo 18's native AI and Oakivo's agentic workflows are reshaping mid-market productivity.", 
          content: `### The AI Paradigm Shift
Odoo 18 has fundamentally integrated AI into the core user experience. At Oakivo, we've taken this further by deploying **Agentic Workflows** that automate entire departments.

**Why AI-Driven ERP?**
*   **Predictive Procurement:** Machine learning that anticipates stock-outs.
*   **Autonomous Accounting:** AI that reconciles 95% of bank statements without human touch.
*   **Conversational Logic:** Querying your enterprise data using natural language.

*Review our [Solution Matrix](#/services) to see how we deploy autonomous logic.*`
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
    nav: { home: 'Accueil', verticals: 'Secteurs', services: 'Services', work: 'Réalisations', about: 'À Propos', contact: "Audit Stratégique", careers: "Carrières" },
    home: {
      hero_title_1: "Orchestrer la",
      hero_title_2: "Croissance Autonome.",
      hero_subtitle: "Oakivo Solutions Inc. propulse les entreprises canadiennes avec l'automatisation IA, l'orchestration Odoo et la cybersécurité.",
      cta_primary: "Audit Stratégique",
      insight_title: "L'IA et l'automatisation sont les nouveaux standards.",
      insight_text_1: "Les systèmes hérités et les flux de travail manuels coûtent aux PME canadiennes en moyenne 18% de marges perdues chaque année.",
      insight_text_2: "Chez Oakivo, nous construisons l'infrastructure numérique qui gère la routine, pour que votre équipe puisse se concentrer sur l'extraordinaire.",
      cap_auto_title: "Automatisation par Agents IA",
      cap_auto_desc: "Nous déployons des agents IA autonomes qui exécutent une logique métier complexe directement dans Odoo.",
      cap_eco_title: "Orchestration Odoo 18",
      cap_eco_desc: "L'ERP le plus flexible au monde, boosté par l'IA native pour l'inventaire et les flux de trésorerie.",
      cap_mod_title: "Écosystèmes Autonomes",
      cap_mod_desc: "Nous relions votre pile existante à des pipelines pilotés par l'IA qui modernisent vos opérations.",
      cap_sec_title: "Cyber-Résilience",
      cap_sec_desc: "Cadres de sécurité Zero-Trust qui protègent vos actifs IA et vos données d'entreprise.",
      explore: "Explorer la Matrice",
      impact_title: "Impact Mesuré",
      view_portfolio: "Voir le Coffre-fort",
      read_case: "Lire le Succès",
      cta_footer_title: "Planifiez Votre Futur.",
      cta_footer_text: "Rejoignez le top 5% des entreprises canadiennes utilisant l'IA et l'orchestration Odoo.",
      cta_footer_btn: "Audit Stratégique",
      trusted_by: "Ingénierie de succès au Canada",
      perspectives_title: "Perspectives d'Experts",
      view_insights: "Accéder au Coffre-fort"
    },
    about: {
      dna_label: "ADN Corporatif",
      hero_title: "Ré-ingénierie de l'Entreprise Canadienne.",
      hero_subtitle: "Nous sommes une force d'ingénierie stratégique dédiée à restaurer l'agilité commerciale.",
      standard_title: "Le Standard Oakivo",
      standard_p1: "Fondé au Canada atlantique, Oakivo est né d'un constat simple : l'implémentation logicielle traditionnelle échoue car elle ignore l'élément humain.",
      standard_p2: "Nous n'installons pas juste des logiciels. Nous architecturons des écosystèmes.",
      standard_p3: "Notre mission est d'assurer la souveraineté numérique des PME canadiennes.",
      journey_title: "Notre Trajectoire",
      leadership_title: "Direction Stratégique",
      leadership_subtitle: "Architectes d'un futur autonome.",
      values: [
        { title: "Précision d'abord", text: "Chaque déploiement est une amélioration chirurgicale de votre logique métier." },
        { title: "Souveraineté des données", text: "Vos données restent au Canada. Conformité SOC2 garantie." },
        { title: "Automatisation Radicale", text: "Si une tâche peut être automatisée, elle doit l'être." }
      ],
      team: [
        { name: "Ahmed Bello", credentials: "MBA, Expert Odoo", role: "PDG et Architecte Senior", bio: "Avec plus d'une décennie d'expérience Odoo, Ahmed dirige la vision de la croissance industrielle." }
      ]
    },
    services: {
      hero_label: "Matrice de Solutions",
      hero_title: "Ingénierie de l'Efficacité. <br/> À l'échelle.",
      list: [
        { title: "Automatisation IA", desc: "Workflows intelligents qui agissent sans intervention humaine.", insight: "L'automatisation, c'est la cohérence." },
        { title: "Odoo 18 ERP", desc: "Le système nerveux central de votre organisation.", insight: "Un système unifié est la seule voie vers la visibilité." },
        { title: "Cyber-Sécurité", desc: "Protection de votre périmètre avec le Zero-Trust.", insight: "La sécurité est une priorité absolue." },
        { title: "Gestion Ops", desc: "Support technique et surveillance infrastructure 24/7.", insight: "La disponibilité est le coeur du commerce." }
      ],
      method_title: "La Méthode Oakivo",
      method_subtitle: "Une approche en quatre phases pour la transformation numérique.",
      steps: [
        { title: "Audit", desc: "Cartographie profonde des silos et de la dette manuelle." },
        { title: "Architecture", desc: "Conception d'un plan personnalisé d'IA et d'ERP." },
        { title: "Implémentation", desc: "Déploiement chirurgical sans interruption de service." },
        { title: "Optimisation", desc: "Amélioration continue par la télémétrie." }
      ],
      faq_title: "Questions Fréquentes",
      faq: [
        { q: "Combien de temps prend une implémentation ?", a: "Généralement de 3 à 6 mois selon la complexité." },
        { q: "C'est quoi l'IA Agente ?", a: "C'est une IA capable d'exécuter des tâches réelles comme facturer ou commander du stock." }
      ],
      cta_title: "Commencez Votre Plan",
      cta_text: "Bâtissons votre futur autonome dès aujourd'hui.",
      cta_btn: "Audit Stratégique"
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
        { title: "Atlantic Distribution Sync", summary: "Automatisation de 30,000 SKUs via Odoo 18.", quote: "Oakivo a réparé le pouls de notre entreprise.", author: "J. Miller, Dir Opérations" },
        { title: "FinTrust Cyber Hardening", summary: "Implémentation du Zero-Trust pour une firme financière.", quote: "Enfin un partenaire qui comprend les résultats nets.", author: "S. Chen, CTO" },
        { title: "Retail AI Integration", summary: "Réduction des pertes de 22% via l'IA prédictive.", quote: "Le ROI était clair dès le premier trimestre.", author: "R. Thompson, CEO" },
        { title: "Agentic Support Hub", summary: "Automatisation de 70% des tickets via l'IA native Odoo.", quote: "Notre équipe fait enfin du travail à haute valeur.", author: "L. Green, Support" }
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
      hero_subtitle: "Nous recrutons les futurs architectes Odoo et ingénieurs IA.",
      culture_title: "Notre Écosystème",
      values: [
        { title: "Télétravail", desc: "Travaillez de n'importe où au Canada." },
        { title: "Responsabilité", desc: "Chaque ingénieur a un rôle dans le résultat stratégique." },
        { title: "Apprentissage", desc: "Budget généreux pour les certifications Odoo et IA." },
        { title: "Impact", desc: "Voyez votre code transformer l'industrie réelle." }
      ],
      apply_title: "Commencez Votre Mission",
      apply_text: "Nous cherchons des experts Odoo et des spécialistes de l'automatisation IA.",
      apply_btn: "Soumettre ma candidature",
      email_link: "careers@oakivo.com"
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
          excerpt: "Comment l'IA native d'Odoo 18 et les agents d'Oakivo transforment la productivité.", 
          content: `### Le Changement de Paradigme IA
Odoo 18 a intégré l'IA au coeur de l'expérience utilisateur. Chez Oakivo, nous allons plus loin avec des agents autonomes.

*Découvrez notre [Matrice de Solutions](#/services) pour en savoir plus.*`
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