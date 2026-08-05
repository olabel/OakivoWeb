import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr';

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
      case_studies: 'Case Studies', 
      about: 'About Us', 
      contact: 'Free Audit', 
      careers: 'Careers',
      booking: 'Schedule Audit',
      compliance: 'Security & Guarantee',
      privacy: 'Privacy Policy',
      solutions: 'Solutions',
      locations: 'Locations'
    },
    common: {
      cta_book_invoice_audit: "Book Your Free 15-Minute Invoice Audit",
      cta_audit: "Book 15-Min Audit",
      cta_blueprint: "Request Solution Blueprint",
      cta_meet: "Meet Our Automation Team",
      cta_orchestrate: "Book Operational Audit",
      cta_mobile_sticky: "Book Free Audit",
      cta_schedule: "Schedule 15-Min Audit",
      submitting: "Submitting Request...",
      success: "Request Submitted!",
      guarantee: "No new software to buy. No pushy sales pitch. 100% Atlantic Canada focused.",
      no_software: "No new software to buy",
      regional_focus: "Atlantic Canada Regional Focus",
      regional_sub: "New Brunswick • Nova Scotia • PEI • NL"
    },
    hero: {
      badge: "Done-For-You Invoice & Bookkeeping Automation • Atlantic Canada",
      headline_main: "Can't Hire Office Admin Staff in Atlantic Canada?",
      headline_accent: "Automate the Busywork Instead.",
      subtitle: "We connect the accounting software you already use (like QuickBooks, Xero, or Sage) so invoices, customer payments, and billing records sync automatically—removing the need to fill office roles the local labour market can't supply.",
      cta: "Book Your Free 15-Minute Invoice Audit",
      guarantee: "No new software to buy. No pushy sales pitch. 100% Atlantic Canada focused."
    },
    problem: {
      badge: "The Regional Administrative Crunch",
      title_main: "Can't Fill Office Admin Roles?",
      title_accent: "Your Invoicing Is Where the Bottleneck Lives.",
      subtitle: "Atlantic Canada has the highest business hiring-difficulty rate in the country, and administrative roles rank among the hardest to fill. When office support isn't available, manual invoicing creates 3 major business headaches:",
      point1_title: "Unfillable Office Roles",
      point1_desc: "Trying to recruit office admin staff in a regional labour market where administrative and bookkeeping positions rank among the hardest to fill nationwide.",
      point1_stat: "62.4% Regional Labour Crunch Stat",
      point2_title: "Double Invoicing & Data Entry",
      point2_desc: "Current staff wasting hours copying identical customer details, PDF order totals, and billing items into QuickBooks, Xero, or Sage manually.",
      point2_stat: "10–15 hours lost every week",
      point3_title: "Blind Spots on Outstanding Bills",
      point3_desc: "Not knowing which invoices are paid or overdue without checking multiple systems or asking busy staff to build manual status spreadsheets.",
      point3_stat: "Slows down business cash flow"
    },
    steps: {
      badge: "Done-For-You Setup",
      title_main: "How It Works in ",
      title_accent: "3 Simple Steps",
      subtitle: "No new core software to buy. We connect what you already have.",
      step1_num: "1",
      step1_title: "Step 1: Map Your Billing Flow",
      step1_desc: "We map how invoice data currently moves between your team, email, work orders, and accounting software.",
      step2_num: "2",
      step2_title: "Step 2: Connect Existing Tools",
      step2_desc: "We build automated connectors between your existing software in a sandbox test environment with zero daily operational disruption.",
      step3_num: "3",
      step3_title: "Step 3: Sync Invoices Automatically",
      step3_desc: "Your invoices, customer payments, and billing records update automatically without manual data entry."
    },
    outcomes: {
      badge: "Evidence-Backed Results",
      title_main: "Proven Invoice Automation ",
      title_accent: "Outcomes",
      metric1_val: "10–15 Hours",
      metric1_title: "Reclaimed Per Week",
      metric1_desc: "Reclaim valuable office administrative payroll hours every single week by eliminating double-entry invoice typing.",
      metric2_val: "99%+ Accuracy",
      metric2_title: "Across Customer Billing",
      metric2_desc: "Eliminate manual copy-paste typos across line items, tax codes, and customer account numbers.",
      metric3_val: "62.4% SMBs",
      metric3_title: "Face Admin Hiring Crunch",
      metric3_desc: "Atlantic Canada has the highest rate in Canada of businesses unable to fill administrative roles.",
      proof_title: "Regional Business Proof Across All Four Provinces",
      proof1_loc: "Halifax, NS",
      proof1_title: "Atlantic Wholesale & Supply",
      proof1_saved: "14 hrs/wk saved",
      proof1_quote: "\"Our team used to manually re-type counter order tickets into QuickBooks Online. Oakivo built an automated bridge that posts completed invoices instantly.\"",
      proof2_loc: "Moncton, NB",
      proof2_title: "Maritime Equipment & Fleet",
      proof2_saved: "12 hrs/wk saved",
      proof2_quote: "\"Field work orders sat in paper folders for days before someone typed them into Xero. Now invoices post automatically upon customer sign-off.\"",
      proof3_loc: "Charlottetown, PEI",
      proof3_title: "Island Food Processing Co.",
      proof3_saved: "10 hrs/wk saved",
      proof3_quote: "\"We spent half of every Friday matching customer accounts against inventory sheets. Automated invoice syncing eliminated the weekend backlog completely.\""
    },
    drawer: {
      tag: "Oakivo Free 15-Min Audit",
      title: "Book Your Free 15-Minute Invoice Audit",
      desc: "No high-pressure sales pitch. One of our senior automation specialists will review your daily workflow and show you exactly where time is being lost—100% free of charge.",
      name_label: "Your Name *",
      name_placeholder: "e.g. Sarah Jenkins",
      email_label: "Work Email *",
      email_placeholder: "e.g. sarah@company.ca",
      bottleneck_label: "What is your biggest manual invoicing pain point right now? *",
      bottleneck_placeholder: "e.g. Typing invoice details from PDFs into QuickBooks, copy-pasting customer orders into accounting sheets...",
      submit_btn: "Book Your Free 15-Minute Invoice Audit",
      submitting: "Scheduling Audit...",
      success_title: "Operational Audit Request Received",
      success_desc: "One of our senior automation specialists will review your workflow request and contact you directly within 24 hours to schedule your 15-minute operational audit.",
      success_close: "Close & Return to Page",
      footer_badge: "Grounded Done-For-You Business Automation",
      footer_region: "Atlantic Canada Regional Operations"
    },
    footer: {
      card_tag: "Free 15-Minute Invoice Audit",
      card_title: "Ready to stop wasting payroll hours on manual invoicing?",
      card_desc: "Book a free 15-minute audit. We will review your current invoicing workflow and show you how connecting your existing software removes the need to fill scarce office admin roles.",
      cta_audit: "Book Your Free 15-Minute Invoice Audit",
      callout_tag: "Free 15-Minute Invoice Audit",
      callout_title: "Ready to stop wasting payroll hours on manual invoicing?",
      callout_desc: "Book a free 15-minute audit. We will review your current invoicing workflow and show you how connecting your existing software removes the need to fill scarce office admin roles.",
      callout_btn: "Book Your Free 15-Minute Invoice Audit",
      brand_desc: "Oakivo Solutions builds custom automated bridges between your existing accounting, inventory, and scheduling software so your team stops losing hours to manual data entry across Atlantic Canada.",
      badge_title: "Atlantic Canada Regional Focus",
      badge_desc: "Grounded, responsive done-for-you automation support for businesses in New Brunswick, Nova Scotia, Prince Edward Island, and Newfoundland.",
      focus_tag: "Atlantic Canada Regional Focus",
      focus_desc: "Grounded, responsive done-for-you automation support for businesses in New Brunswick, Nova Scotia, Prince Edward Island, and Newfoundland.",
      nav_title: "Navigation",
      nav_header: "Navigation",
      solutions_title: "Automation Solutions",
      solutions_header: "Automation Solutions",
      service_area: "Service Area",
      area_header: "Service Area",
      rights: "2026 Oakivo Solutions Inc. All rights reserved.",
      copyright: "© 2026 Oakivo Solutions Inc. All rights reserved.",
      privacy: "Privacy Policy",
      compliance: "Security Guarantee"
    },
    chatbot: {
      greeting: "Welcome to Oakivo Solutions! I am your AI Automation Assistant. We connect the software tools you already use so your team stops wasting hours on manual data entry across Atlantic Canada. How can I help you today?",
      placeholder: "Ask about workflow automation or audits...",
      quick_prompts: [
        "Free 15-Min Operational Audit?",
        "Do we need to buy new software?",
        "How fast is setup?",
        "Which tools can you connect?"
      ],
      audit_btn: "Book Free 15-Min Audit"
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
    verticals: {
      hero_title: "Industries We Serve.",
      hero_subtitle: "Custom workflow automation tailored to the daily operational needs of Atlantic Canada businesses.",
      cards: [
        { title: "Seafood & Cold Chain Logistics", desc: "Automate harvest logging, temperature logs, and shipping manifests.", impact: "Saves 15+ hours per week in manual paperwork and inventory reconciliation." },
        { title: "Equipment Wholesale & Supply", desc: "Bridge parts ordering, customer inventory, and invoicing software.", impact: "Eliminates double entry across orders and customer billing records." },
        { title: "Transportation & Freight", desc: "Automatically match dispatch logs with driver manifests and accounting.", impact: "Accelerate billing cycles by up to 5 business days." },
        { title: "Construction & Field Contracting", desc: "Sync timesheets, job site expenses, and supplier receipts instantly.", impact: "Cuts admin overhead and eliminates lost job site receipt entries." },
        { title: "Retail & E-Commerce", desc: "Real-time stock synchronization between web storefronts and warehouse tools.", impact: "Prevented stockouts and eliminated manual order entry errors." },
        { title: "Professional Services", desc: "Automated client onboarding, contract routing, and invoice creation.", impact: "Reclaim up to 20 payroll hours per employee every single month." }
      ]
    },
    services: {
      hero_label: "Our Core Services",
      hero_title: "How We Eliminate Manual Data Entry.",
      service1_title: "Accounting & Invoice Sync",
      service2_title: "Order & Inventory Synchronization",
      service3_title: "Dispatch & Work Order Automation",
      service4_title: "Financial & Systems Reporting",
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
      hero_title: "Case Studies & Regional Results",
      hero_subtitle: "Real stories from businesses in Atlantic Canada that eliminated manual invoicing and saved staff hours.",
      cases: [
        { id: '1', title: "Atlantic Wholesale Distributor", impact: "18 Hours Saved / Week", quote: "Oakivo connected our order forms directly with our accounting software. Our staff doesn't re-type orders anymore.", author: "Operations Director", problem: "Staff spending 20 hours a week copy-pasting order numbers.", solution: "Automated Order-to-Accounting Bridge." },
        { id: '2', title: "Maritime Freight Operations", impact: "Zero Invoice Typos", quote: "Billing used to take 4 days after delivery. Now invoices send automatically upon delivery confirmation.", author: "General Manager", problem: "Delayed invoicing due to manual paperwork processing.", solution: "Automated Dispatch & Invoicing Bridge." }
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
      verticals: 'Industries Desservies', 
      services: 'Services & Processus', 
      work: 'Études de Cas',
      case_studies: 'Études de Cas', 
      about: 'À Propos', 
      contact: 'Audit Gratuit', 
      careers: 'Carrières',
      booking: 'Planifier un Audit',
      compliance: 'Sécurité & Garantie',
      privacy: 'Politique de Confidentialité',
      solutions: 'Solutions',
      locations: 'Emplacements'
    },
    common: {
      cta_book_invoice_audit: "Réservez Votre Audit Gratuit de 15 Min",
      cta_audit: "Réserver un Audit de 15 Min",
      cta_blueprint: "Demander le Schéma de Solution",
      cta_meet: "Rencontrer l'Équipe",
      cta_orchestrate: "Réserver un Audit Opérationnel",
      cta_mobile_sticky: "Réserver un Audit Gratuit",
      cta_schedule: "Planifier l'Audit de 15 Min",
      submitting: "Envoi de la demande...",
      success: "Demande transmise !",
      guarantee: "Aucun nouveau logiciel à acheter. Sans pression commerciale. 100 % axé sur le Canada atlantique.",
      no_software: "Aucun nouveau logiciel à acheter",
      regional_focus: "Focus Régional Canada Atlantique",
      regional_sub: "Nouveau-Brunswick • Nouvelle-Écosse • Î.-P.-É. • T.-N.-L."
    },
    hero: {
      badge: "Automatisation de Facturation & Tenue de Livres Clé en Main • Canada Atlantique",
      headline_main: "Vous ne trouvez pas de personnel administratif au Canada atlantique ?",
      headline_accent: "Automatisez plutôt les tâches répétitives.",
      subtitle: "Nous connectons les logiciels comptables que vous utilisez déjà (QuickBooks, Xero ou Sage) afin que vos factures, paiements clients et pièces justificatives se synchronisent automatiquement.",
      cta: "Réservez Votre Audit Gratuit de 15 Min",
      guarantee: "Aucun nouveau logiciel à acheter. Sans pression commerciale. 100 % axé sur le Canada atlantique."
    },
    problem: {
      badge: "La Pénurie Administrative Régionale",
      title_main: "Impossible de recruter du personnel de bureau ?",
      title_accent: "Votre facturation est le véritable goulot d'étranglement.",
      subtitle: "Le Canada atlantique connaît la plus forte difficulté de recrutement d'entreprises au pays, et les postes administratifs figurent parmi les plus rares. En l'absence de soutien de bureau, la facturation manuelle crée 3 problèmes majeurs :",
      point1_title: "Postes Administratifs Introuvables",
      point1_desc: "Recruter du personnel administratif dans un marché régional où la tenue de livres fait partie des métiers les plus difficiles à combler au pays.",
      point1_stat: "62,4 % de tension sur la main-d'œuvre régionale",
      point2_title: "Double Saisie & Facturation Manuelle",
      point2_desc: "L'équipe actuelle perd des heures à copier manuellement les détails clients et les montants de commandes dans QuickBooks, Xero ou Sage.",
      point2_stat: "10 à 15 heures perdues chaque semaine",
      point3_title: "Manque de Visibilité sur les Factures",
      point3_desc: "Ne pas savoir quelles factures sont réglées ou en retard sans consulter plusieurs outils ou solliciter des tableaux manuels.",
      point3_stat: "Ralentit les flux de trésorerie"
    },
    steps: {
      badge: "Installation Clé en Main",
      title_main: "Comment ça marche en ",
      title_accent: "3 Étapes Simples",
      subtitle: "Aucun nouveau logiciel principal à acheter. Nous connectons vos outils actuels.",
      step1_num: "1",
      step1_title: "Étape 1 : Cartographier votre facturation",
      step1_desc: "Nous analysons le parcours de vos données de facturation entre votre équipe, vos courriels et vos logiciels comptables.",
      step2_num: "2",
      step2_title: "Étape 2 : Connecter vos outils existants",
      step2_desc: "Nous créons des connecteurs automatisés entre vos logiciels actuels dans un environnement de test sécurisé.",
      step3_num: "3",
      step3_title: "Étape 3 : Synchroniser automatiquement vos factures",
      step3_desc: "Vos factures, paiements clients et données comptables se mettent à jour automatiquement sans saisie manuelle."
    },
    outcomes: {
      badge: "Résultats Prouvés",
      title_main: "Résultats d'Automatisation de Facturation ",
      title_accent: "Prouvés",
      metric1_val: "10–15 Heures",
      metric1_title: "Récupérées par semaine",
      metric1_desc: "Récupérez de précieuses heures d'administration chaque semaine en éliminant la double saisie des factures.",
      metric2_val: "Précision > 99 %",
      metric2_title: "Sur toute la facturation",
      metric2_desc: "Éliminez les fautes de frappe manuelles sur les articles, taxes et numéros de comptes clients.",
      metric3_val: "62,4 % des PME",
      metric3_title: "Face à la pénurie administrative",
      metric3_desc: "Le Canada atlantique enregistre le taux le plus élevé de PME incapables de combler des postes administratifs.",
      proof_title: "Preuves Concrètes Dans les Quatre Provinces Atlantiques",
      proof1_loc: "Halifax, N.-É.",
      proof1_title: "Atlantic Wholesale & Supply",
      proof1_saved: "14 h/sem économisées",
      proof1_quote: "\"Notre équipe ressaisissait manuellement les commandes dans QuickBooks Online. Oakivo a créé un pont automatisé qui gère les factures instantanément.\"",
      proof2_loc: "Moncton, N.-B.",
      proof2_title: "Maritime Equipment & Fleet",
      proof2_saved: "12 h/sem économisées",
      proof2_quote: "\"Les bons de travail papier traînaient pendant des jours. Désormais, les factures s'envoient automatiquement dès la signature client.\"",
      proof3_loc: "Charlottetown, Î.-P.-É.",
      proof3_title: "Island Food Processing Co.",
      proof3_saved: "10 h/sem économisées",
      proof3_quote: "\"Nous passions tous nos vendredis à rapprocher les comptes et les stocks. La synchronisation automatique a supprimé tout retard.\""
    },
    drawer: {
      tag: "Audit Gratuit 15 Min Oakivo",
      title: "Réservez Votre Audit Gratuit de 15 Min",
      desc: "Sans pression commerciale. Un spécialiste examinera vos processus quotidiens et vous montrera exactement où vous perdez du temps, 100 % gratuitement.",
      name_label: "Votre nom *",
      name_placeholder: "ex. Marie Tremblay",
      email_label: "Courriel professionnel *",
      email_placeholder: "ex. marie@entreprise.ca",
      bottleneck_label: "Quelle est votre plus grande difficulté en facturation manuelle ? *",
      bottleneck_placeholder: "ex. Saisir les détails de factures PDF dans QuickBooks, copier-coller les commandes dans des tableurs...",
      submit_btn: "Réserver Mon Audit Gratuit de 15 Min",
      submitting: "Planification en cours...",
      success_title: "Demande d'Audit Opérationnel Reçue",
      success_desc: "Un spécialiste examinera votre demande et vous contactera sous 24h pour planifier votre audit opérationnel de 15 minutes.",
      success_close: "Fermer et Revenir à la Page",
      footer_badge: "Automatisation d'Entreprise Clé en Main",
      footer_region: "Opérations Régionales au Canada Atlantique"
    },
    footer: {
      card_tag: "Audit Gratuit de 15 Min",
      card_title: "Prêt à cesser de gaspiller vos heures en facturation manuelle ?",
      card_desc: "Réservez un audit gratuit de 15 minutes. Nous examinerons votre facturation actuelle et vous montrerons comment connecter vos outils.",
      cta_audit: "Réserver Mon Audit Gratuit de 15 Min",
      callout_tag: "Audit Gratuit de 15 Min",
      callout_title: "Prêt à cesser de gaspiller vos heures en facturation manuelle ?",
      callout_desc: "Réservez un audit gratuit de 15 minutes. Nous examinerons votre facturation actuelle et vous montrerons comment connecter vos outils.",
      callout_btn: "Réserver Mon Audit Gratuit de 15 Min",
      brand_desc: "Oakivo Solutions crée des ponts automatisés entre vos logiciels comptables, de gestion et de stocks pour éliminer la saisie manuelle au Canada atlantique.",
      badge_title: "Focus Régional Canada Atlantique",
      badge_desc: "Un soutien pragmatique et réactif en automatisation clé en main pour les entreprises du Nouveau-Brunswick, de la Nouvelle-Écosse, de l'Î.-P.-É. et de Terre-Neuve-et-Labrador.",
      focus_tag: "Focus Régional Canada Atlantique",
      focus_desc: "Un soutien pragmatique et réactif en automatisation clé en main pour les entreprises du Nouveau-Brunswick, de la Nouvelle-Écosse, de l'Î.-P.-É. et de Terre-Neuve-et-Labrador.",
      nav_title: "Navigation",
      nav_header: "Navigation",
      solutions_title: "Solutions d'Automatisation",
      solutions_header: "Solutions d'Automatisation",
      service_area: "Zones Desservies",
      area_header: "Zones Desservies",
      rights: "2026 Oakivo Solutions Inc. Tous droits réservés.",
      copyright: "© 2026 Oakivo Solutions Inc. Tous droits réservés.",
      privacy: "Politique de Confidentialité",
      compliance: "Garantie de Sécurité"
    },
    chatbot: {
      greeting: "Bienvenue chez Oakivo Solutions ! Je suis votre assistant d'automatisation. Nous connectons vos logiciels actuels pour éliminer la saisie manuelle de données au Canada atlantique. Comment puis-je vous aider aujourd'hui ?",
      placeholder: "Posez une question sur l'automatisation...",
      quick_prompts: [
        "Audit opérationnel gratuit ?",
        "Faut-il acheter de nouveaux logiciels ?",
        "Combien de temps prend l'installation ?",
        "Quels outils pouvez-vous connecter ?"
      ],
      audit_btn: "Réserver un Audit Gratuit de 15 Min"
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
      hero_title: "Comment Nous Éliminons la Saisie Manuelle de Données.",
      service1_title: "Synchronisation Comptabilité & Factures",
      service2_title: "Ponts Commandes & Inventaire",
      service3_title: "Automatisation Dispatch & Logistique",
      service4_title: "Rapports Financiers & Système",
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
      hero_title: "Études de Cas & Résultats Régionaux",
      hero_subtitle: "Découvrez comment des entreprises du Canada atlantique ont éliminé la facturation manuelle et économisé des heures de travail.",
      cases: [
        { id: '1', title: "Distributeur Grossiste Atlantique", impact: "18 Heures Économisées / Semaine", quote: "Oakivo a connecté nos bons de commande directement à notre logiciel comptable. Notre équipe ne ressaisit plus les commandes.", author: "Directeur des Opérations", problem: "L'équipe passait 20h par semaine à copier-coller des commandes.", solution: "Pont Automatisé Commandes-Comptabilité." },
        { id: '2', title: "Transporteur Maritime", impact: "Zéro Erreur de Facturation", quote: "La facturation prenait 4 jours. Maintenant, les factures s'envoient automatiquement dès confirmation de livraison.", author: "Directeur Général", problem: "Facturation retardée par le traitement manuel des documents.", solution: "Pont Automatisé Répartition & Facturation." }
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
