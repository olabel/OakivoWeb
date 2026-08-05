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
      verticals: 'Industries Served', 
      services: 'Services & Process', 
      work: 'Case Studies', 
      about: 'About Us', 
      contact: "Free Operational Audit", 
      careers: "Careers",
      booking: "Schedule Audit",
      compliance: "Security & Guarantee"
    },
    common: {
      cta_audit: "Book 15-Min Audit",
      cta_blueprint: "Request Solution Blueprint",
      cta_meet: "Meet Our Automation Team",
      cta_orchestrate: "Book Operational Audit",
      cta_mobile_sticky: "Book Free Audit",
      cta_schedule: "Schedule 15-Min Audit"
    },
    magnets: {
      erp: {
        title: "Accounting & ERP Automation",
        desc: "Automatically sync invoices, purchase orders, and payment logs directly into your existing accounting tools.",
        btn: "See How It Works"
      },
      cyber: {
        title: "Order & Inventory Synchronization",
        desc: "Connect your e-commerce, warehouse, and dispatch systems to eliminate double data entry.",
        btn: "Explore Integration"
      },
      ai: {
        title: "Done-For-You Workflow Automation",
        desc: "We build custom bridges between your daily software so your staff never has to copy-paste data again.",
        btn: "Learn More"
      },
      modern: {
        title: "Free Operational Audit",
        desc: "We analyze your daily staff tasks and pinpoint exact areas where manual data entry is draining your payroll.",
        btn: "Book Free Audit"
      }
    },
    home: {
      hero_label: "Done-For-You Business Workflow Automation",
      hero_title_main: "Stop Letting Tech Debt and Runaway Cloud Bills",
      hero_title_italic: "Eat Your Margins.",
      hero_title_end: "",
      hero_subtitle: "We build self-healing cloud platforms, automate legacy workflows, and lock down compliance—so your team can focus on shipping features, not firefighting infrastructure.",
      cta_primary: "Book a 15-Min Operational Audit",
      cta_secondary: "See How We Reduced Cloud Spend by 35%",
      trust_badges: {
        odoo: "Done-For-You Automation Partner",
        sovereignty: "Atlantic Canada Local Support",
        accounting: "Connects Existing Accounting Software",
        expert: "Zero New Software to Buy",
        location: "New Brunswick • Nova Scotia • PEI • NL"
      },
      matrix_title: "How We Help Atlantic Businesses",
      matrix_subtitle: "Grounded, done-for-you automation trusted by growing operations across Atlantic Canada.",
    },
    verticals: {
      hero_title: "Industries We Serve.",
      hero_subtitle: "Custom workflow automation tailored to the daily operational needs of Atlantic Canada businesses.",
      cards: [
        { title: "Seafood & Cold Chain Logistics", desc: "Automate harvest logging, temperature logs, and shipping manifests.", impact: "Saves 15+ hours per week in manual paperwork and inventory reconciliation." },
        { title: "Equipment Wholesale & Supply", desc: "Bridge parts ordering, customer inventory, and invoicing software.", impact: "Eliminates double entry across orders and customer billing records." },
        { title: "Transportation & Freight", desc: "Automatically match dispatch logs with driver manifests and accounting.", impact: "Accelerate billing cycles by up to 5 business days." },
        { title: "Construction & Field Contracting", desc: "Sync timesheets, job site expenses, and supplier receipts instantly.", impact: "Cuts admin overhead and eliminates lost job site receipt entries." },
        { title: "Retail & E-Commerce", desc: "Real-time stock synchronization between web storefronts and warehouse tools.", impact: "Prevated stockouts and eliminated manual order entry errors." },
        { title: "Professional Services", desc: "Automated client onboarding, contract routing, and invoice creation.", impact: "Reclaim up to 20 payroll hours per employee every single month." }
      ]
    },
    services: {
      hero_label: "Our Core Services",
      hero_title: "How We Eliminate <br/> Manual Data Entry.",
      list: [
        { title: "Accounting & Invoice Sync", desc: "Automatically transfer customer invoices, bills, and payment records into your existing accounting software.", insight: "No manual typing, zero copy-paste typos.", magnet: "erp" },
        { title: "Order & Inventory Bridges", desc: "Connect web orders, POS systems, and warehouse inventories so stock levels update instantly.", insight: "Real-time order flow without extra admin staff.", magnet: "cyber" },
        { title: "Custom Workflow Bridges", desc: "Connect email requests, PDF attachments, and spreadsheets directly into your core operational tools.", insight: "Save 10–20 staff hours every single week.", magnet: "ai" },
        { title: "Done-For-You System Setup", desc: "We handle 100% of the technical setup, testing, and monitoring so your team doesn't have to lift a finger.", insight: "Live and operating in 5 to 10 business days.", magnet: "modern" }
      ],
      cta_title: "Ready to stop wasting payroll on manual data entry?",
      cta_text: "Connect with an automation specialist for a free 15-minute diagnostic of your current daily workflow.",
      cta_btn: "Book Free Operational Audit"
    },
    caseStudies: {
      cases: [
        { id: 1, title: "Atlantic Wholesale Distributor", impact: "18 Hours Saved / Week", quote: "Oakivo connected our order forms directly with our accounting software. Our staff doesn't re-type orders anymore.", author: "Operations Director", problem: "Staff spending 20 hours a week copy-pasting order numbers.", solution: "Automated Order-to-Accounting Bridge." },
        { id: 2, title: "Maritime Freight Operations", impact: "Zero Invoice Typos", quote: "Billing used to take 4 days after delivery. Now invoices send automatically upon delivery confirmation.", author: "General Manager", problem: "Delayed invoicing due to manual paperwork processing.", solution: "Automated Dispatch & Invoicing Bridge." }
      ]
    },
    about: {
      hero_title: "Grounded Automation for Atlantic Canada.",
      hero_subtitle: "We help local business owners and operators stop wasting valuable staff time on repetitive software tasks.",
      standard_title: "The Oakivo Standard",
      standard_p1: "We believe technology should work for your staff, not give them extra homework. Our mission is to connect the tools you already use.",
      standard_p2: "No expensive new software subscriptions. No complicated technical jargon.",
      standard_p3: "Through practical software integration, we give your team back 10 to 20 hours every week.",
      leadership_title: "Our Team",
      team: [
        { name: "Marcus Vance", role: "Automation Specialist", bio: "Over 10 years helping Atlantic Canadian businesses streamline operations and eliminate manual data bottlenecks.", credentials: "Lead Automation Engineer", linkedin: "#" },
        { name: "Sarah Jenkins", role: "Systems Integration Lead", bio: "Specialist in building seamless connections between accounting, CRM, and inventory software.", credentials: "BSc Systems Science", linkedin: "#" }
      ]
    },
    blog: {
      hero_title: "Automation Insights.",
      hero_subtitle: "Practical advice on eliminating manual data entry, cutting administrative overhead, and scaling your business.",
      posts: [
        { id: 1, title: "The Hidden Payroll Leak: Manual Data Entry", excerpt: "How small copy-paste tasks between software tools are costing Atlantic Canadian businesses thousands in lost staff productivity.", category: "Operational Strategy", author: "Marcus Vance", date: "Jan 15, 2026", keyTakeawaysSummary: "Connecting existing tools saves an average of 15 hours per employee each week.", sections: { introduction: "Manual data entry is an invisible drain on company payroll.", discussion: "Staff forced to re-type invoices or order numbers spend hours on low-value tasks that software can do in seconds.", conclusion: "Connecting your existing tools eliminates the bottleneck without new software costs.", takeaways: ["No New Software", "10-20 Hours Saved"] } },
        { id: 2, title: "Why Buying New ERP Software Isn't Always the Answer", excerpt: "Before spending thousands on new software, see how connecting your current tools solves 90% of operational headaches.", category: "System Integration", author: "Sarah Jenkins", date: "Feb 02, 2026", keyTakeawaysSummary: "Integration is faster, cheaper, and less disruptive than full software overhauls.", sections: { introduction: "Replacing your software disrupts operations for months.", discussion: "Building automated bridges between your current tools gives you full automation in days rather than months.", conclusion: "Keep what works, automate the connection.", takeaways: ["Fast Setup", "Zero Disruption"] } }
      ]
    },
    careers: {
      hero_title: "Join Oakivo.",
      hero_subtitle: "We are building the leading done-for-you automation team in Atlantic Canada.",
      values: [
        { title: "Practical Impact", desc: "Solving real daily problems for local business owners." },
        { title: "Simplicity", desc: "No jargon. Straightforward, reliable solutions." },
        { title: "Responsiveness", desc: "Local, dedicated support across New Brunswick, Nova Scotia, PEI, and NL." },
        { title: "Craftsmanship", desc: "Bulletproof integrations that work quietly in the background." }
      ],
      apply_title: "Join Our Team",
      apply_text: "Are you passionate about building clean software integrations and helping local businesses scale?",
      apply_btn: "Submit Application",
      email_link: "hello@oakivo.com"
    },
    contact: {
      success_title: "Audit Request Submitted.",
      success_message: "An automation specialist will review your submitted workflow details and reach out within 24 hours.",
      form_title: "Book Free Operational Audit",
      label_name: "Your Name",
      label_email: "Work Email",
      label_q1: "What manual task takes up most of your team's time?",
      label_q2: "What software tools do you currently use?",
      label_q3: "How soon would you like to resolve this bottleneck?",
      placeholder_q1: "e.g. Copy-pasting order details from email into accounting...",
      placeholder_q2: "e.g. QuickBooks, Excel, Shopify, custom CRM...",
      placeholder_q3: "e.g. Next 1-2 weeks, within a month...",
      submit_btn: "Book My Free 15-Minute Operational Audit"
    },
    booking: {
      hero_title: "15-Minute Operational Audit.",
      hero_subtitle: "Select a convenient time for a brief, high-value review of your current workflow bottlenecks.",
      success_title: "Audit Confirmed.",
      success_message: "A calendar invite has been sent to your work email."
    }
  },
  fr: {
    nav: { 
      home: 'Accueil', 
      verticals: 'Industries Servies', 
      services: 'Services & Procédés', 
      work: 'Études de Cas', 
      about: 'À Propos', 
      contact: "Audit Opérationnel Gratuit", 
      careers: "Carrières",
      booking: "Planifier un Audit",
      compliance: "Garantie & Sécurité"
    },
    common: {
      cta_audit: "Réserver un Audit 15-Min",
      cta_blueprint: "Demander le Schéma de Solution",
      cta_meet: "Rencontrer l'Équipe",
      cta_orchestrate: "Réserver un Audit Opérationnel",
      cta_mobile_sticky: "Audit Gratuit",
      cta_schedule: "Planifier l'Audit Gratuit"
    },
    magnets: {
      erp: {
        title: "Automation Comptabilité & ERP",
        desc: "Synchronisez automatiquement factures et bons de commande directement dans vos outils comptables existants.",
        btn: "Voir Comment Ça Marche"
      },
      cyber: {
        title: "Synchronisation Commandes & Stocks",
        desc: "Connectez vos systèmes de vente et d'entrepôt pour éliminer la double saisie.",
        btn: "Explorer l'Intégration"
      },
      ai: {
        title: "Automatisation Clé en Main",
        desc: "Nous créons des ponts sur mesure entre vos logiciels quotidiens pour éliminer le copié-collé manuel.",
        btn: "En Savoir Plus"
      },
      modern: {
        title: "Audit Opérationnel Gratuit",
        desc: "Nous analysons vos tâches quotidiennes et identifions où la saisie manuelle fait perdre du temps à votre équipe.",
        btn: "Réserver l'Audit Gratuit"
      }
    },
    home: {
      hero_label: "Automatisation de Flux de Travail Clé en Main",
      hero_title_main: "Arrêtez de Laisser la Dette Technique",
      hero_title_italic: "Réduire Vos Marges.",
      hero_title_end: "",
      hero_subtitle: "Nous connectons les logiciels que vous utilisez déjà afin que votre équipe cesse de perdre des heures en saisie manuelle de données au Canada atlantique.",
      cta_primary: "Réserver un Audit Opérationnel de 15 Min",
      cta_secondary: "Découvrir Nos Études de Cas",
      trust_badges: {
        odoo: "Partenaire d'Automatisation Clé en Main",
        sovereignty: "Support Local au Canada Atlantique",
        accounting: "Connecte Vos Logiciels Existants",
        expert: "Aucun Nouveau Logiciel à Acheter",
        location: "Nouveau-Brunswick • Nouvelle-Écosse • Î.-P.-É. • T.-N.-L."
      },
      matrix_title: "Comment Nous Aidons les Entreprises Atlantiques",
      matrix_subtitle: "Une automatisation pragmatique et clé en main au service des PME du Canada atlantique.",
    },
    verticals: {
      hero_title: "Industries Que Nous Servons.",
      hero_subtitle: "Des automatisations sur mesure adaptées aux besoins opérationnels quotidiens des PME atlantiques.",
      cards: [
        { title: "Produits de la Mer & Logistique Frigorifique", desc: "Automatisez les journaux de récolte et les manifestes d'expédition.", impact: "Économise plus de 15 heures par semaine en gestion documentaire." },
        { title: "Grossistes d'Équipements & Distribution", desc: "Liez les commandes de pièces, les stocks et la facturation.", impact: "Élimine la double saisie des commandes et factures clients." },
        { title: "Transport & Fret", desc: "Associez automatiquement les journaux de répartition aux factures.", impact: "Accélère les cycles de facturation de jusqu'à 5 jours ouvrables." },
        { title: "Construction & Entrepreneurs", desc: "Synchronisez feuilles de temps, dépenses de chantier et reçus.", impact: "Réduit la charge administrative et élimine les reçus perdus." },
        { title: "Commerce de Détail & E-Commerce", desc: "Synchronisation des stocks en temps réel entre boutiques web et entrepôts.", impact: "Évite les ruptures de stock et les erreurs de commande." },
        { title: "Services Professionnels", desc: "Intégration automatique des clients, contrats et création de factures.", impact: "Récupère jusqu'à 20 heures de paie par employé chaque mois." }
      ]
    },
    services: {
      hero_label: "Nos Services Principaux",
      hero_title: "Comment Nous Éliminons <br/> la Saisie Manuelle de Données.",
      list: [
        { title: "Synchronisation Comptabilité & Factures", desc: "Transférez automatiquement factures et paiements dans votre logiciel comptable existant.", insight: "Saisie automatique, zéro faute de frappe.", magnet: "erp" },
        { title: "Ponts Commandes & Inventaire", desc: "Connectez vos ventes web, points de vente et stocks pour une mise à jour instantanée.", insight: "Gestion des stocks en temps réel sans personnel supplémentaire.", magnet: "cyber" },
        { title: "Ponts de Flux Sur Mesure", desc: "Connectez courriels, pièces jointes PDF et tableurs directement à vos outils principaux.", insight: "Économisez 10 à 20 heures par employé par semaine.", magnet: "ai" },
        { title: "Configuration Clé en Main", desc: "Nous gérons 100% de la configuration technique et des tests. Vous n'avez rien à gérer.", insight: "Opérationnel en 5 à 10 jours ouvrables.", magnet: "modern" }
      ],
      cta_title: "Prêt à arrêter de gaspiller votre paie en saisie manuelle ?",
      cta_text: "Échangez avec un spécialiste de l'automatisation pour un diagnostic gratuit de 15 minutes de vos processus.",
      cta_btn: "Réserver un Audit Opérationnel Gratuit"
    },
    caseStudies: {
      cases: [
        { id: 1, title: "Distributeur Grossiste Atlantique", impact: "18 Heures Économisées / Semaine", quote: "Oakivo a connecté nos bons de commande directement à notre logiciel comptable. Notre équipe ne ressaisit plus les commandes.", author: "Directeur des Opérations", problem: "L'équipe passait 20h par semaine à copier-coller des commandes.", solution: "Pont Automatisé Commandes-Comptabilité." },
        { id: 2, title: "Transporteur Maritime", impact: "Zéro Erreur de Facturation", quote: "La facturation prenait 4 jours. Maintenant, les factures s'envoient automatiquement dès confirmation de livraison.", author: "Directeur Général", problem: "Facturation retardée par le traitement manuel des documents.", solution: "Pont Automatisé Répartition & Facturation." }
      ]
    },
    about: {
      hero_title: "L'Automatisation Pragmatique au Canada Atlantique.",
      hero_subtitle: "Nous aidons les propriétaires d'entreprises locales à cesser de faire perdre du temps à leur personnel sur des tâches répétitives.",
      standard_title: "Le Standard Oakivo",
      standard_p1: "Nous croyons que la technologie doit travailler pour votre équipe. Notre mission est de connecter les outils que vous utilisez déjà.",
      standard_p2: "Pas de nouveaux abonnements coûteux. Pas de jargon technique.",
      standard_p3: "Grâce à des intégrations simples, nous redonnons 10 à 20 heures par semaine à votre équipe.",
      leadership_title: "Notre Équipe",
      team: [
        { name: "Marcus Vance", role: "Spécialiste de l'Automatisation", bio: "Plus de 10 ans à aider les entreprises du Canada atlantique à simplifier leurs opérations et éliminer les goulots d'étranglement.", credentials: "Ingénieur d'Automatisation Principal", linkedin: "#" },
        { name: "Sarah Jenkins", role: "Responsable Intégration Systèmes", bio: "Spécialiste de la connexion entre logiciels comptables, CRM et gestion des stocks.", credentials: "B.Sc. Science des Systèmes", linkedin: "#" }
      ]
    },
    blog: {
      hero_title: "Conseils en Automatisation.",
      hero_subtitle: "Des conseils pratiques pour éliminer la saisie manuelle, réduire la charge administrative et faire grandir votre entreprise.",
      posts: [
        { id: 1, title: "La Fuite de Paie Invisible: La Saisie Manuelle", excerpt: "Comment le copié-collé entre logiciels coûte des milliers de dollars aux entreprises du Canada atlantique.", category: "Stratégie Opérationnelle", author: "Marcus Vance", date: "15 Jan 2026", keyTakeawaysSummary: "Connecter vos outils fait gagner en moyenne 15 heures par employé par semaine.", sections: { introduction: "La saisie manuelle est une perte invisible sur la paie des entreprises.", discussion: "Le personnel forcé de ressaisir des factures perd des heures sur des tâches que des logiciels exécutent en secondes.", conclusion: "Connecter vos outils existants élimine le problème sans nouvel achat logiciel.", takeaways: ["Pas de Nouveau Logiciel", "10-20h Économisées"] } },
        { id: 2, title: "Pourquoi Acheter un Nouvel ERP N'Est Pas Toujours la Solution", excerpt: "Avant de dépenser des milliers dans un nouveau logiciel, découvrez comment connecter vos outils actuels résout 90% des problèmes.", category: "Intégration Système", author: "Sarah Jenkins", date: "02 Fév 2026", keyTakeawaysSummary: "L'intégration est plus rapide, moins chère et sans interruption de travail.", sections: { introduction: "Changer de logiciel perturbe les opérations pendant des mois.", discussion: "Créer des ponts automatisés entre vos outils offre une automatisation complète en quelques jours.", conclusion: "Gardez ce qui fonctionne, automatisez la connexion.", takeaways: ["Installation Rapide", "Zéro Perturbation"] } }
      ]
    },
    careers: {
      hero_title: "Rejoignez Oakivo.",
      hero_subtitle: "Nous bâtissons la meilleure équipe d'automatisation clé en main au Canada atlantique.",
      values: [
        { title: "Impact Pratique", desc: "Résoudre de vrais problèmes quotidiens pour les entreprises locales." },
        { title: "Simplicité", desc: "Pas de jargon. Des solutions simples et fiables." },
        { title: "Réactivité", desc: "Support local dédié au Nouveau-Brunswick, en Nouvelle-Écosse, à l'Î.-P.-É. et T.-N.-L." },
        { title: "Savoir-Faire", desc: "Des intégrations robustes qui fonctionnent en arrière-plan." }
      ],
      apply_title: "Postulez",
      apply_text: "Vous souhaitez créer des intégrations logicielles propres et aider les entreprises locales ?",
      apply_btn: "Soumettre Candidature",
      email_link: "hello@oakivo.com"
    },
    contact: {
      success_title: "Demande d'Audit Transmise.",
      success_message: "Un spécialiste de l'automatisation examinera vos détails et vous contactera sous 24h.",
      form_title: "Réserver un Audit Opérationnel Gratuit",
      label_name: "Votre Nom",
      label_email: "Courriel Professionnel",
      label_q1: "Quelle tâche manuelle prend le plus de temps à votre équipe ?",
      label_q2: "Quels logiciels utilisez-vous actuellement ?",
      label_q3: "Dans quel délai souhaitez-vous régler ce goulot d'étranglement ?",
      placeholder_q1: "ex. Copier-coller les détails de commande depuis les courriels vers la comptabilité...",
      placeholder_q2: "ex. QuickBooks, Excel, Shopify, CRM...",
      placeholder_q3: "ex. D'ici 1 à 2 semaines...",
      submit_btn: "Réserver Mon Audit Opérationnel Gratuit"
    },
    booking: {
      hero_title: "Audit Opérationnel de 15 Minutes.",
      hero_subtitle: "Choisissez un créneau horaire pour une brève évaluation de vos goulots d'étranglement.",
      success_title: "Audit Confirmé.",
      success_message: "Une invitation calendrier a été envoyée à votre courriel professionnel."
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
