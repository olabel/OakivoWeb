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
      verticals: 'Verticals',
      services: 'Services',
      work: 'Work',
      about: 'About',
      contact: "Let's Talk",
    },
    home: {
      hero_title_1: "Orchestrating the",
      hero_title_2: "Digital Future.",
      hero_subtitle: "We bridge the gap between complex enterprise technology and strategic business outcomes, engineering resilience for the modern economy.",
      cta_primary: "Start Your Transformation",
      insight_title: "In a world of constant disruption, agility is the only currency that matters.",
      insight_text_1: "Legacy systems are the silent killers of innovation. At Oakivo, we don't just implement software; we redesign your operational DNA.",
      insight_text_2: "From intelligent automation to bank-grade cybersecurity, our solutions are built to withstand market volatility and drive sustainable growth.",
      cap_auto_title: "Intelligent Automation",
      cap_auto_desc: "Redefining workforce potential with AI-driven workflows.",
      cap_eco_title: "Digital Ecosystems",
      cap_eco_desc: "Architecting cloud-native platforms for scale.",
      cap_mod_title: "Enterprise Modernization",
      cap_mod_desc: "Transforming core ERP systems into engines of insight.",
      cap_sec_title: "Cyber Resilience",
      cap_sec_desc: "Proactive defense strategies for a borderless world.",
      explore: "Explore Capability",
      impact_title: "Impact Stories",
      view_portfolio: "View Full Portfolio",
      read_case: "Read Case Study",
      cta_footer_title: "The future belongs to the agile.",
      cta_footer_text: "Don't just adapt to change. Lead it. Let's discuss your roadmap.",
      cta_footer_btn: "Partner With Us",
      trusted_by: "Trusted by industry leaders across Canada",
      perspectives_title: "Perspectives",
      view_insights: "View all insights"
    },
    verticals: {
      hero_title: "Expertise across industries.",
      hero_subtitle: "We understand the unique challenges of your sector. Our solutions are tailored to meet industry-specific regulations, workflows, and goals.",
      cards: [
        { title: "Manufacturing", desc: "Optimize production planning, shop floor control, and supply chain visibility with integrated ERP and IoT solutions." },
        { title: "Retail & E-commerce", desc: "Unify online and offline operations, manage inventory in real-time, and deliver seamless customer experiences." },
        { title: "Professional Services", desc: "Streamline project management, resource allocation, and billing to maximize billable hours and profitability." },
        { title: "Distribution & Logistics", desc: "Enhance warehouse efficiency, route planning, and inventory accuracy to reduce landed costs." },
        { title: "Public Sector", desc: "Modernize citizen services with secure, accessible digital platforms and automated administrative workflows." },
        { title: "Energy & Utilities", desc: "Secure critical infrastructure (OT) and optimize asset management with predictive maintenance and data analytics." }
      ]
    },
    about: {
      dna_label: "Our DNA",
      hero_title: "Architects of Change.",
      hero_subtitle: "\"We don't just optimize businesses; we engineer the digital ecosystems that will define the next decade of Canadian commerce.\"",
      standard_title: "The Oakivo Standard",
      standard_p1: "Founded in Halifax with a global vision, Oakivo was born from a singular realization: technology without strategy is just overhead.",
      standard_p2: "Too many consultancies focus on the 'what'—implementing a tool, patching a server, migrating a database. We focus on the 'why'. We bridge the critical gap between executive vision and technical execution.",
      standard_p3: "Our consultants are not just engineers; they are business strategists who speak code. Whether it's through automating mundane tasks or securing critical data, every solution we build is designed to drive tangible revenue growth and operational resilience.",
      journey_title: "Our Journey",
      values: [
        { title: "Radical Innovation", text: "Incremental change is not enough. We implement forward-thinking architectures that leapfrog the competition." },
        { title: "Absolute Integrity", text: "We operate with total transparency. If a technology doesn't serve your ROI, we won't recommend it." },
        { title: "Tangible Impact", text: "We don't measure success by hours billed. We measure it by costs reduced, risks mitigated, and revenue generated." }
      ],
      leadership_title: "Leadership",
      leadership_subtitle: "The minds steering the ship."
    },
    services: {
      hero_label: "Our Capabilities",
      hero_title: "We solve the problems others can't see.",
      list: [
        { title: "Digital Ecosystem Strategy", desc: "Transformation is not a project; it's a state of being. We move organizations from legacy silos to integrated digital ecosystems.", insight: "Most digital transformations fail due to lack of cultural alignment, not technology." },
        { title: "Intelligent Automation & AI", desc: "Efficiency is the baseline; intelligence is the advantage. We deploy RPA and Generative AI solutions that do more than automate tasks.", insight: "AI isn't about replacing humans; it's about giving them superpowers." },
        { title: "Enterprise Core Modernization", desc: "Your ERP is the nervous system of your enterprise. We specialize in complex ERP implementations (SAP, Oracle, NetSuite).", insight: "Clean data is the oil of the 21st century enterprise." },
        { title: "Cyber Resilience & Risk", desc: "In an interconnected world, trust is your most valuable asset. Our security-first approach moves beyond compliance to build true resilience.", insight: "Security is not a barrier to speed; it is the prerequisite for it." }
      ],
      method_title: "The Oakivo Method",
      method_subtitle: "A rigorous, proven framework for digital acceleration.",
      steps: [
        { title: "Audit & Discover", desc: "We map your current architecture and identify friction points." },
        { title: "Design & Architect", desc: "We blueprint a future-proof ecosystem aligned with business goals." },
        { title: "Build & Automate", desc: "Agile implementation of systems, driven by automation." },
        { title: "Amplify & Scale", desc: "Continuous optimization and data-driven scaling." }
      ],
      cta_title: "Innovation is waiting.",
      cta_text: "Stop patching legacy problems. Start building your future infrastructure today.",
      cta_btn: "Consult with our Experts"
    },
    caseStudies: {
      hero_title: "Selected Work",
      hero_subtitle: "Results speak louder than slides. Here is how we've helped Canadian enterprises engineer their future.",
      cases: [
        { title: "From Manual to Autonomous: A Supply Chain Revolution", summary: "We implemented a custom IoT mesh network that reduced manual tracking effort by 80% and provided real-time predictive inventory analytics." },
        { title: "Fortifying Fintech: Zero-Trust Cloud Migration", summary: "Migrating sensitive financial data to a SOC2 compliant cloud infrastructure while maintaining 99.999% uptime during the transition." },
        { title: "Unified Truth: Enterprise ERP Consolidation", summary: "Replacing 15 disparate legacy systems with a single, unified NetSuite instance, enabling real-time cross-country inventory visibility." },
        { title: "The 24/7 Workforce: AI Customer Service", summary: "Deploying a context-aware NLP model that autonomously resolves 40% of Tier-1 support tickets, improving customer satisfaction scores by 15 points." },
        { title: "Paperless Government: Digital Permitting", summary: "Digitizing paper-based permit processes, reducing approval times from weeks to days and increasing citizen transparency." },
        { title: "Securing the Grid: OT Network Hardening", summary: "Identified and patched critical vulnerabilities in operational technology (OT) networks for a major regional energy provider." }
      ]
    },
    contact: {
      hero_title: "Let's Build the Future.",
      hero_subtitle: "Whether you are ready to overhaul your ERP or just have a question about AI strategy, our team is ready to listen.",
      form_title: "Send us a message",
      form_response: "We usually respond within 24 hours.",
      label_name: "Name",
      label_email: "Email",
      label_company: "Company",
      label_message: "Message",
      btn_send: "Send Message",
      hq_title: "Headquarters",
      hq_visit: "Visit Us",
      hq_email: "Email Us",
      hq_call: "Call Us"
    },
    footer: {
      tagline_1: "Intelligence for the",
      tagline_2: "Digital Age.",
      newsletter_text: "Join 5,000+ executives receiving our monthly insights on automation, resilience, and digital strategy.",
      newsletter_placeholder: "Enter your email",
      col_capabilities: "Capabilities",
      col_company: "Company",
      col_global: "Global Presence",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      back_to_top: "Back to Top"
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      verticals: 'Secteurs',
      services: 'Services',
      work: 'Réalisations',
      about: 'À Propos',
      contact: "Parlons-nous",
    },
    home: {
      hero_title_1: "Orchestrer l'avenir",
      hero_title_2: "Numérique.",
      hero_subtitle: "Nous comblons le fossé entre la technologie d'entreprise complexe et les résultats stratégiques, en concevant la résilience pour l'économie moderne.",
      cta_primary: "Commencez votre transformation",
      insight_title: "Dans un monde en constante perturbation, l'agilité est la seule monnaie qui compte.",
      insight_text_1: "Les systèmes hérités sont les tueurs silencieux de l'innovation. Chez Oakivo, nous n'implémentons pas simplement des logiciels ; nous redessinons votre ADN opérationnel.",
      insight_text_2: "De l'automatisation intelligente à la cybersécurité de niveau bancaire, nos solutions sont conçues pour résister à la volatilité du marché et stimuler une croissance durable.",
      cap_auto_title: "Automatisation Intelligente",
      cap_auto_desc: "Redéfinir le potentiel de la main-d'œuvre avec des flux de travail pilotés par l'IA.",
      cap_eco_title: "Écosystèmes Numériques",
      cap_eco_desc: "Architecture de plateformes cloud-natives pour l'échelle.",
      cap_mod_title: "Modernisation d'Entreprise",
      cap_mod_desc: "Transformer les systèmes ERP centraux en moteurs d'analyse.",
      cap_sec_title: "Cyber Résilience",
      cap_sec_desc: "Stratégies de défense proactives pour un monde sans frontières.",
      explore: "Explorer la Capacité",
      impact_title: "Histoires d'Impact",
      view_portfolio: "Voir le Portfolio",
      read_case: "Lire l'Étude de Cas",
      cta_footer_title: "L'avenir appartient aux agiles.",
      cta_footer_text: "Ne vous contentez pas de vous adapter au changement. Dirigez-le. Discutons de votre feuille de route.",
      cta_footer_btn: "Associez-vous à nous",
      trusted_by: "Reconnu par les leaders de l'industrie à travers le Canada",
      perspectives_title: "Perspectives",
      view_insights: "Voir toutes les idées"
    },
    verticals: {
      hero_title: "Expertise sectorielle.",
      hero_subtitle: "Nous comprenons les défis uniques de votre secteur. Nos solutions sont adaptées pour répondre aux réglementations, flux de travail et objectifs spécifiques à l'industrie.",
      cards: [
        { title: "Fabrication", desc: "Optimisez la planification de la production, le contrôle de l'atelier et la visibilité de la chaîne d'approvisionnement avec des solutions ERP et IoT intégrées." },
        { title: "Commerce & E-commerce", desc: "Unifiez les opérations en ligne et hors ligne, gérez les stocks en temps réel et offrez des expériences client fluides." },
        { title: "Services Professionnels", desc: "Rationalisez la gestion de projet, l'allocation des ressources et la facturation pour maximiser les heures facturables et la rentabilité." },
        { title: "Distribution & Logistique", desc: "Améliorez l'efficacité des entrepôts, la planification des itinéraires et la précision des stocks pour réduire les coûts." },
        { title: "Secteur Public", desc: "Modernisez les services aux citoyens avec des plateformes numériques sécurisées et accessibles et des flux de travail administratifs automatisés." },
        { title: "Énergie & Services Publics", desc: "Sécurisez les infrastructures critiques (OT) et optimisez la gestion des actifs grâce à la maintenance prédictive et à l'analyse de données." }
      ]
    },
    about: {
      dna_label: "Notre ADN",
      hero_title: "Architectes du Changement.",
      hero_subtitle: "\"Nous n'optimisons pas seulement les entreprises ; nous concevons les écosystèmes numériques qui définiront la prochaine décennie du commerce canadien.\"",
      standard_title: "Le Standard Oakivo",
      standard_p1: "Fondée à Halifax avec une vision mondiale, Oakivo est née d'un constat singulier : la technologie sans stratégie n'est que frais généraux.",
      standard_p2: "Trop de consultants se concentrent sur le 'quoi'—implémenter un outil, patcher un serveur. Nous nous concentrons sur le 'pourquoi'. Nous comblons le fossé critique entre la vision exécutive et l'exécution technique.",
      standard_p3: "Nos consultants ne sont pas seulement des ingénieurs ; ce sont des stratèges d'affaires qui parlent code. Que ce soit par l'automatisation de tâches banales ou la sécurisation de données critiques, chaque solution que nous construisons vise la croissance des revenus.",
      journey_title: "Notre Parcours",
      values: [
        { title: "Innovation Radicale", text: "Le changement progressif ne suffit pas. Nous mettons en œuvre des architectures avant-gardistes qui surpassent la concurrence." },
        { title: "Intégrité Absolue", text: "Nous opérons en toute transparence. Si une technologie ne sert pas votre ROI, nous ne la recommanderons pas." },
        { title: "Impact Tangible", text: "Nous ne mesurons pas le succès en heures facturées. Nous le mesurons en coûts réduits, risques atténués et revenus générés." }
      ],
      leadership_title: "Leadership",
      leadership_subtitle: "Les esprits qui dirigent le navire."
    },
    services: {
      hero_label: "Nos Capacités",
      hero_title: "Nous résolvons les problèmes que d'autres ne voient pas.",
      list: [
        { title: "Stratégie d'Écosystème Numérique", desc: "La transformation n'est pas un projet ; c'est un état d'être. Nous faisons passer les organisations des silos hérités aux écosystèmes numériques intégrés.", insight: "La plupart des transformations échouent à cause du manque d'alignement culturel, pas de la technologie." },
        { title: "Automatisation Intelligente & IA", desc: "L'efficacité est la base ; l'intelligence est l'avantage. Nous déployons des solutions RPA et IA générative qui font plus qu'automatiser les tâches.", insight: "L'IA ne consiste pas à remplacer les humains ; il s'agit de leur donner des super-pouvoirs." },
        { title: "Modernisation du Cœur d'Entreprise", desc: "Votre ERP est le système nerveux de votre entreprise. Nous sommes spécialisés dans les implémentations ERP complexes (SAP, Oracle, NetSuite).", insight: "Les données propres sont le pétrole de l'entreprise du 21e siècle." },
        { title: "Cyber Résilience & Risque", desc: "Dans un monde interconnecté, la confiance est votre atout le plus précieux. Notre approche axée sur la sécurité va au-delà de la conformité.", insight: "La sécurité n'est pas un obstacle à la vitesse ; c'est son prérequis." }
      ],
      method_title: "La Méthode Oakivo",
      method_subtitle: "Un cadre rigoureux et éprouvé pour l'accélération numérique.",
      steps: [
        { title: "Audit & Découverte", desc: "Nous cartographions votre architecture actuelle et identifions les points de friction." },
        { title: "Conception & Architecture", desc: "Nous concevons un écosystème pérenne aligné sur les objectifs commerciaux." },
        { title: "Construction & Automatisation", desc: "Mise en œuvre agile des systèmes, pilotée par l'automatisation." },
        { title: "Amplification & Échelle", desc: "Optimisation continue et mise à l'échelle basée sur les données." }
      ],
      cta_title: "L'innovation vous attend.",
      cta_text: "Arrêtez de corriger les problèmes hérités. Commencez à construire votre infrastructure future dès aujourd'hui.",
      cta_btn: "Consultez nos experts"
    },
    caseStudies: {
      hero_title: "Travaux Sélectionnés",
      hero_subtitle: "Les résultats parlent plus fort que les diapositives. Voici comment nous avons aidé les entreprises canadiennes à concevoir leur avenir.",
      cases: [
        { title: "Du Manuel à l'Autonome : Une Révolution de la Chaîne Logistique", summary: "Nous avons mis en œuvre un réseau maillé IoT personnalisé qui a réduit l'effort de suivi manuel de 80% et fourni des analyses d'inventaire prédictives en temps réel." },
        { title: "Fortifier la Fintech : Migration Cloud Zero-Trust", summary: "Migration de données financières sensibles vers une infrastructure cloud conforme SOC2 tout en maintenant 99,999% de disponibilité." },
        { title: "Vérité Unifiée : Consolidation ERP d'Entreprise", summary: "Remplacement de 15 systèmes disparates par une instance NetSuite unifiée, permettant une visibilité des stocks en temps réel." },
        { title: "La Main-d'œuvre 24/7 : Service Client IA", summary: "Déploiement d'un modèle PNL conscient du contexte qui résout de manière autonome 40% des tickets de support de niveau 1." },
        { title: "Gouvernement Sans Papier : Permis Numériques", summary: "Numérisation des processus de permis papier, réduisant les délais d'approbation de semaines à jours." },
        { title: "Sécuriser le Réseau : Renforcement du Réseau OT", summary: "Identification et correction des vulnérabilités critiques dans les réseaux de technologie opérationnelle (OT) pour un fournisseur d'énergie régional." }
      ]
    },
    contact: {
      hero_title: "Construisons l'Avenir.",
      hero_subtitle: "Que vous soyez prêt à refondre votre ERP ou que vous ayez simplement une question sur la stratégie IA, notre équipe est prête à écouter.",
      form_title: "Envoyez-nous un message",
      form_response: "Nous répondons généralement sous 24 heures.",
      label_name: "Nom",
      label_email: "E-mail",
      label_company: "Entreprise",
      label_message: "Message",
      btn_send: "Envoyer le message",
      hq_title: "Siège Social",
      hq_visit: "Visitez-nous",
      hq_email: "Écrivez-nous",
      hq_call: "Appelez-nous"
    },
    footer: {
      tagline_1: "Intelligence pour",
      tagline_2: "l'Ère Numérique.",
      newsletter_text: "Rejoignez plus de 5 000 dirigeants recevant nos informations mensuelles sur l'automatisation, la résilience et la stratégie numérique.",
      newsletter_placeholder: "Entrez votre e-mail",
      col_capabilities: "Capacités",
      col_company: "Entreprise",
      col_global: "Présence Mondiale",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation",
      back_to_top: "Haut de Page"
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