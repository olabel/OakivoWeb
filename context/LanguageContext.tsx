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
      contact: "Contact",
      careers: "Careers"
    },
    home: {
      hero_title_1: "Premier Odoo ERP &",
      hero_title_2: "Digital Transformation Partners.",
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
      hero_subtitle: "Tailored ERP and automation strategies for Canada's key sectors. We understand the regulatory and operational nuances of your industry.",
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
      standard_p1: "Headquartered in Dieppe, New Brunswick, Oakivo Solutions is a premier digital consultancy serving Atlantic Canada and the nation. We recognized a gap in the market: businesses were buying software but failing to achieve transformation.",
      standard_p2: "We bridge the gap between complex technology (like Odoo ERP and Azure) and strategic business goals. Our 'Strategy-First' approach ensures every line of code drives revenue or reduces cost.",
      standard_p3: "Our team consists of certified Odoo experts, cloud architects, and cybersecurity analysts dedicated to operational excellence. We are the partner for growth-minded Canadian SMEs.",
      journey_title: "Our Roadmap",
      values: [
        { title: "Radical Innovation", text: "We implement forward-thinking architectures that leapfrog the competition." },
        { title: "Absolute Integrity", text: "We operate with total transparency. If a technology doesn't serve your ROI, we won't recommend it." },
        { title: "Tangible Impact", text: "We don't measure success by hours billed. We measure it by costs reduced and revenue generated." }
      ],
      leadership_title: "Leadership Team",
      leadership_subtitle: "The strategists behind your success.",
      team: [
        { name: "Ahmed Bello", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
        { name: "Sarah Chen", role: "CTO", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop" },
        { name: "James Thorne", role: "Head of Strategy", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" },
        { name: "Elena Rodriguez", role: "Lead Architect", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop" }
      ]
    },
    services: {
      hero_label: "Our Expertise",
      hero_title: "End-to-End Digital Transformation.",
      list: [
        { title: "Odoo ERP Implementation", desc: "As certified partners, we customize Odoo to unify your accounting, inventory, and CRM. Say goodbye to data silos.", insight: "Unified data decreases operational costs by an average of 23%." },
        { title: "Intelligent Automation & AI", desc: "We deploy Microsoft Power Automate and custom AI agents to handle repetitive tasks, freeing your team for high-value work.", insight: "Automation can reclaim up to 30% of employee time annually." },
        { title: "Digital Strategy Consulting", desc: "Virtual CIO (vCIO) services to align your tech stack with business KPIs. Roadmap planning for scaling SMEs.", insight: "Technology without strategy is just overhead." },
        { title: "Cybersecurity & Governance", desc: "Vulnerability assessments, penetration testing, and SOC2 compliance readiness for Canadian data sovereignty.", insight: "The average cost of a data breach in Canada is over $6M." }
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
      cta_text: "Stop struggling with spreadsheets and legacy systems. Upgrade to a modern digital backbone.",
      cta_btn: "Book Your Assessment"
    },
    caseStudies: {
      hero_title: "Client Success Stories",
      hero_subtitle: "See how we've helped Canadian businesses optimize operations and secure their data.",
      cases: [
        { 
          title: "Supply Chain Automation with Odoo", 
          summary: "Implemented Odoo Inventory & Manufacturing for an Atlantic Canada logistics firm, reducing stockouts by 45%.", 
          quote: "Oakivo gave us visibility we never thought possible. Odoo has changed how we ship.",
          author: "VP Operations, Atlantic Logistics"
        },
        { 
          title: "Fintech Cloud Security Migration", 
          summary: "Migrated legacy on-premise servers to Azure with Zero Trust architecture for a Toronto fintech.", 
          quote: "Flawless execution. We met our SOC2 requirements three months ahead of schedule.",
          author: "CTO, FinTrust Canada"
        },
        { 
          title: "Retail ERP Consolidation", 
          summary: " unified 15 disparate POS systems into a single Odoo instance for a national retail chain.", 
          quote: "Finally, a single source of truth for our sales data across all provinces.",
          author: "CEO, Northern Retail Group"
        },
        { 
          title: "AI Customer Support Agents", 
          summary: "Deployed LLM-powered support bots to handle Tier 1 inquiries, reducing ticket volume by 40%.", 
          quote: "Our support costs dropped significantly while customer satisfaction went up.",
          author: "Director of Support, TechFlow"
        },
        { 
          title: "Municipal Digital Permitting", 
          summary: "Created a secure web portal for citizen permit applications, cutting processing time by 70%.", 
          quote: "A massive leap forward in digital citizen services.",
          author: "City Planner, City Services Dept"
        },
        { 
          title: "OT Network Hardening", 
          summary: "Secured operational technology networks for a regional energy provider against ransomware.", 
          quote: "Oakivo's expertise in OT security is unmatched in the region.",
          author: "CISO, Maritime Energy"
        }
      ]
    },
    blog: {
      hero_title: "Digital Insights",
      hero_subtitle: "Expert analysis on Odoo, ERP trends, AI, and Cybersecurity for Canadian Leaders.",
      posts: [
        { 
          id: 1, 
          date: "May 20, 2024", 
          title: "Why Odoo is the Best ERP for Canadian SMEs in 2024", 
          category: "ERP Strategy",
          excerpt: "Comparing Odoo vs. SAP and NetSuite. Why modular open-source architecture wins on flexibility and cost-of-ownership.",
          content: "Canadian SMEs need agility. Odoo offers a modular approach that legacy giants like SAP cannot match. With its open-source core, Odoo allows businesses to start with only what they need—Accounting and CRM, for instance—and scale seamlessly into Manufacturing and E-commerce. For a Canadian leader, this means avoiding the 'big bang' implementation risk while achieving a unified source of truth."
        },
        { 
          id: 2, 
          date: "May 12, 2024", 
          title: "Bill C-27 and Data Privacy: Is Your Business Ready?", 
          category: "Compliance",
          excerpt: "Understanding the Consumer Privacy Protection Act (CPPA) and how to ensure your digital stack is compliant.",
          content: "Bill C-27 represents a paradigm shift in how personal information is handled in Canada. Compliance isn't just a legal checkbox; it's a trust factor for your customers. At Oakivo, we help organizations audit their data flows, particularly within ERP systems, to ensure that residency requirements and encryption standards meet the new CPPA criteria. Proactive governance is the best defense against the heavy penalties outlined in the new act."
        },
        { 
          id: 3, 
          date: "April 28, 2024", 
          title: "Implementing Zero Trust Architecture in Atlantic Canada", 
          category: "Cybersecurity",
          excerpt: "Moving beyond the firewall. How to secure remote workforces in Halifax and Moncton.",
          content: "The perimeter is no longer a building; it's an identity. In Atlantic Canada, where remote work is a strategic advantage for talent acquisition, Zero Trust is essential. We implement granular access controls where 'never trust, always verify' is the default. By leveraging MFA and identity-based networking, we ensure that your Odoo instance and shared drives are only accessible to the right person, on a secure device, at the right time."
        },
        { 
          id: 4, 
          date: "April 15, 2024", 
          title: "The ROI of Robotic Process Automation (RPA)", 
          category: "Automation",
          excerpt: "Real-world examples of how automating invoice processing can save 20+ hours a week.",
          content: "Automation isn't about replacement; it's about reclamation. We recently implemented an RPA bot for a client in Dieppe that monitors an AP mailbox, extracts data from PDFs using AI, and enters it directly into Odoo. The result? 25 hours of manual data entry reclaimed weekly, allowing their finance team to focus on strategic forecasting rather than transactional bookkeeping."
        },
        {
          id: 5,
          date: "April 02, 2024",
          title: "Cloud Sovereignty: Azure Canada vs AWS Canada",
          category: "Cloud Infrastructure",
          excerpt: "A technical comparison of data residency capabilities for regulated industries.",
          content: "For Canadian healthcare and legal firms, data residency is non-negotiable. Both Azure and AWS now offer robust Canadian regions (Toronto and Montreal), but their integration with local compliance frameworks varies. Oakivo architects multi-cloud solutions that ensure your sensitive IP remains on Canadian soil, preventing 'data sprawl' and ensuring compliance with provincial privacy acts."
        },
        {
          id: 6,
          date: "March 20, 2024",
          title: "Predictive Analytics in Odoo: The Future of Inventory",
          category: "Artificial Intelligence",
          excerpt: "How to use your ERP data to predict demand surges before they happen.",
          content: "Most inventory systems are reactive. By layering AI onto Odoo’s reporting engine, we enable businesses to spot seasonal trends and supply chain disruptions weeks in advance. Using historical sales data and external market signals, predictive models can suggest optimal reorder points, reducing landed costs and ensuring you never lose a sale to a stockout."
        },
        {
          id: 7,
          date: "March 05, 2024",
          title: "Securing the Hybrid Workforce: A 2025 Roadmap",
          category: "Cybersecurity",
          excerpt: "Tactical steps to harden your systems as hybrid work becomes the permanent standard.",
          content: "As we move into 2025, the hybrid model is no longer an experiment. Security strategies must evolve from 'patching holes' to 'holistic resilience.' This roadmap covers hardware-level security, VPN-less access, and the critical role of employee security training in preventing social engineering attacks."
        },
        {
          id: 8,
          date: "February 22, 2024",
          title: "Manufacturing 4.0: Connecting the Shop Floor",
          category: "Digital Transformation",
          excerpt: "Using IoT and ERP to create a 'Smart Factory' environment in New Brunswick.",
          content: "Manufacturing in New Brunswick is facing a labor challenge. The solution lies in high-tech connectivity. By integrating shop floor sensors directly with Odoo's Manufacturing module, we provide real-time OEE (Overall Equipment Effectiveness) tracking. Know exactly why a machine is down, the moment it happens, and automate maintenance alerts."
        },
        {
          id: 9,
          date: "February 10, 2024",
          title: "Odoo vs. SAP: A TCO Comparison for SMEs",
          category: "ERP Strategy",
          excerpt: "Deciding between a legacy giant and a modern agile ERP? Here's the data.",
          content: "We break down the Total Cost of Ownership over 5 years. While SAP offers brand recognition, the licensing and implementation overhead often exceeds SME budgets. Odoo’s 'User-based' pricing and rapid deployment model typically deliver a 40% lower TCO while matching 90% of SAP’s core enterprise functionality."
        },
        {
          id: 10,
          date: "January 28, 2024",
          title: "Generative AI for Business Operations",
          category: "Artificial Intelligence",
          excerpt: "Beyond ChatGPT: How custom LLMs can transform your internal documentation.",
          content: "Imagine a bot that has read every policy, project report, and email in your company. We build custom 'Knowledge Agents' that allow your employees to ask questions like 'What was the resolution for the Smith project?' and get instant, accurate answers based only on your private internal data."
        },
        {
          id: 11,
          date: "January 15, 2024",
          title: "Digital Transformation: The Cultural Hurdle",
          category: "Leadership",
          excerpt: "Why 70% of transformations fail, and how to ensure yours isn't one of them.",
          content: "Software is the easy part. Change management is the hard part. We explore the 'Oakivo Method' for securing stakeholder buy-in, training resistant staff, and creating a culture that embraces continuous digital evolution rather than fearing it."
        },
        {
          id: 12,
          date: "January 02, 2024",
          title: "The Future of Open Source in Enterprise",
          category: "Tech Trends",
          excerpt: "Why the world's largest companies are moving away from proprietary 'locked' systems.",
          content: "Vendor lock-in is the enemy of innovation. We discuss the rise of open-source standards in the enterprise stack and why flexibility, community-driven security, and lower long-term costs are making systems like Odoo the first choice for modern CIOs."
        }
      ]
    },
    careers: {
      hero_title: "Work Without Boundaries.",
      hero_subtitle: "Join a remote-first team of Odoo experts, developers, and strategists. We value output over hours.",
      culture_title: "The Oakivo Way",
      values: [
        { title: "Remote First", desc: "Work from anywhere in Canada. We focus on results, not punch clocks." },
        { title: "Continuous Learning", desc: "Paid certifications for Odoo, Azure, and CISSP." },
        { title: "Deep Work", desc: "We protect your focus time. Minimized meetings." },
        { title: "Transparency", desc: "Open financials and strategy sharing with the whole team." }
      ],
      apply_title: "Join the Team",
      apply_text: "We are always looking for Odoo Developers, Solution Architects, and Sales professionals.",
      apply_btn: "Send Application",
      email_link: "hr@oakivo.com"
    },
    contact: {
      hero_title: "Let's Build Your Future.",
      hero_subtitle: "Looking for an Odoo partner or IT consulting in Atlantic Canada? Let's talk.",
      form_title: "Contact Us",
      form_response: "We usually respond within 24 hours.",
      label_name: "Name",
      label_email: "Work Email",
      label_company: "Company",
      label_message: "Project Details",
      btn_send: "Send Message",
      btn_sending: "Sending...",
      success_title: "Message Sent",
      success_message: "Thank you. An Oakivo consultant will contact you shortly.",
      hq_title: "Headquarters",
      hq_visit: "Visit Us",
      hq_address_1: "21 Delta Street",
      hq_address_2: "Dieppe, NB, E1A 7B8",
      hq_email: "Email Us",
      hq_call: "Call Us",
      hq_phone: "506-899-4941"
    },
    footer: {
      tagline_1: "Build Smarter.",
      tagline_2: "Grow Faster.",
      newsletter_text: "Get actionable tips on ERP, Automation, and Security delivered to your inbox.",
      newsletter_placeholder: "Enter your work email",
      newsletter_btn: "Subscribe",
      col_capabilities: "Solutions",
      col_company: "Company",
      col_global: "Locations",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      back_to_top: "Top"
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      verticals: 'Secteurs',
      services: 'Services',
      work: 'Réalisations',
      about: 'À Propos',
      contact: "Contact",
      careers: "Carrières"
    },
    home: {
      hero_title_1: "Partenaires Odoo ERP &",
      hero_title_2: "Transformation Numérique.",
      hero_subtitle: "Oakivo Solutions propulse les entreprises canadiennes avec l'implantation Odoo, l'automatisation intelligente et la cybersécurité. Au service du Canada atlantique et national.",
      cta_primary: "Réserver une consultation",
      insight_title: "L'agilité est la nouvelle monnaie des affaires.",
      insight_text_1: "Les systèmes hérités freinent la croissance. En tant qu'agence de transformation numérique de premier plan, nous remplaçons l'infrastructure obsolète par des solutions ERP évolutives comme Odoo.",
      insight_text_2: "De l'automatisation de la paie à Halifax à la sécurisation des chaînes d'approvisionnement à Toronto, nos consultants certifiés conçoivent des flux de travail rentables.",
      cap_auto_title: "Automatisation des Affaires",
      cap_auto_desc: "Éliminez la saisie manuelle avec la RPA et l'IA.",
      cap_eco_title: "Implantation ERP Odoo",
      cap_eco_desc: "ERP cloud unifié pour l'inventaire, la comptabilité et le CRM.",
      cap_mod_title: "Modernisation",
      cap_mod_desc: "Migration des serveurs sur site vers le cloud sécurisé.",
      cap_sec_title: "Cybersécurité & Conformité",
      cap_sec_desc: "Audits de sécurité SOC2 et architecture Zero Trust.",
      explore: "Voir le service",
      impact_title: "Résultats Prouvés",
      view_portfolio: "Voir les études de cas",
      read_case: "Lire l'histoire",
      cta_footer_title: "Prêt à faire évoluer vos opérations ?",
      cta_footer_text: "Rejoignez le top 5% des entreprises canadiennes tirant parti de l'IA et d'Odoo. Planifiez votre appel découverte gratuit.",
      cta_footer_btn: "Obtenir un devis",
      trusted_by: "Reconnu par les leaders de l'industrie à travers le Canada",
      perspectives_title: "Insights Tech",
      view_insights: "Lire le blog"
    },
    verticals: {
      hero_title: "Solutions Sectorielles.",
      hero_subtitle: "Stratégies ERP et d'automatisation sur mesure pour les secteurs clés du Canada.",
      cards: [
        { title: "Fabrication & IoT", desc: "Intégration Odoo MRP en temps réel, contrôle d'atelier et maintenance prédictive." },
        { title: "Commerce & E-commerce", desc: "Odoo POS omnicanal, gestion des stocks unifiée et logistique automatisée." },
        { title: "Services Professionnels", desc: "Comptabilité de projet, automatisation des feuilles de temps et planification des ressources." },
        { title: "Distribution & Logistique", desc: "Systèmes de gestion d'entrepôt (WMS), scannage de codes-barres et suivi des coûts." },
        { title: "Secteur Public", desc: "Services citoyens numériques sécurisés et traitement automatisé des permis." },
        { title: "Énergie & Services Publics", desc: "Sécurisation des réseaux OT et gestion des actifs pour les infrastructures critiques." }
      ]
    },
    about: {
      dna_label: "Notre Mission",
      hero_title: "Architectes Numériques.",
      hero_subtitle: "\"Nous n'installons pas seulement des logiciels ; nous réingénierons les entreprises canadiennes.\"",
      standard_title: "Le Standard Oakivo",
      standard_p1: "Basée à Dieppe, Nouveau-Brunswick, Oakivo Solutions est une agence de conseil numérique de premier plan. Nous avons identifié une lacune : les entreprises achetaient des logiciels sans réussir leur transformation.",
      standard_p2: "Nous comblons le fossé entre la technologie complexe (comme Odoo et Azure) et les objectifs stratégiques. Notre approche 'Stratégie d'abord' garantit le ROI.",
      standard_p3: "Notre équipe est composée d'experts certifiés Odoo, d'architectes cloud et d'analystes en cybersécurité.",
      journey_title: "Notre Parcours",
      values: [
        { title: "Innovation Radicale", text: "Nous mettons en œuvre des architectures avant-gardistes." },
        { title: "Intégrité Absolue", text: "Transparence totale. Si une technologie ne sert pas votre ROI, nous ne la recommanderons pas." },
        { title: "Impact Tangible", text: "Nous mesurons le succès par les coûts réduits et les revenus générés." }
      ],
      leadership_title: "Équipe de Direction",
      leadership_subtitle: "Les stratèges derrière votre succès.",
      team: [
        { name: "Ahmed Bello", role: "PDG et Fondateur", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
        { name: "Sarah Chen", role: "CTO", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop" },
        { name: "James Thorne", role: "Responsable de la Stratégie", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" },
        { name: "Elena Rodriguez", role: "Architecte Principal", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop" }
      ]
    },
    services: {
      hero_label: "Notre Expertise",
      hero_title: "Transformation Numérique de A à Z.",
      list: [
        { title: "Implantation ERP Odoo", desc: "Partenaires certifiés, nous personnalisons Odoo pour unifier votre comptabilité et inventaire.", insight: "Les données unifiées réduisent les coûts opérationnels de 23%." },
        { title: "Automatisation Intelligente & IA", desc: "Nous déployons Microsoft Power Automate et des agents IA pour gérer les tâches répétitives.", insight: "L'automatisation peut récupérer jusqu'à 30% du temps employé." },
        { title: "Conseil Stratégique Numérique", desc: "Services de vCIO pour aligner votre stack technologique avec les KPI d'affaires.", insight: "La technologie sans stratégie n'est que frais généraux." },
        { title: "Cybersécurité & Gouvernance", desc: "Tests d'intrusion et conformité SOC2 pour la souveraineté des données canadiennes.", insight: "Le coût moyen d'une violation de données au Canada dépasse 6M$." }
      ],
      method_title: "La Méthode Oakivo",
      method_subtitle: "Un cadre éprouvé pour une implantation à faible risque.",
      steps: [
        { title: "Audit & Découverte", desc: "Analyse approfondie des flux de travail actuels." },
        { title: "Architecture", desc: "Conception axée sur la modularité Odoo et la sécurité cloud." },
        { title: "Implantation", desc: "Déploiement agile avec tests rigoureux." },
        { title: "Mise à l'échelle", desc: "Support continu et expansion des fonctionnalités." }
      ],
      cta_title: "Transformez Votre Entreprise",
      cta_text: "Arrêtez de lutter avec des tableurs. Passez à une infrastructure numérique moderne.",
      cta_btn: "Réservez votre évaluation"
    },
    caseStudies: {
      hero_title: "Succès Clients",
      hero_subtitle: "Découvrez comment nous aidons les entreprises canadiennes à optimiser leurs opérations.",
      cases: [
        { 
          title: "Automatisation Chaîne Logistique Odoo", 
          summary: "Implantation d'Odoo Inventaire & Fabrication pour une firme logistique, réduisant les ruptures de 45%.", 
          quote: "Oakivo nous a donné une visibilité jamais vue. Odoo a tout changé.",
          author: "VP Opérations, Atlantic Logistics"
        },
        { 
          title: "Migration Cloud Fintech", 
          summary: "Migration vers Azure avec architecture Zero Trust pour une fintech de Toronto.", 
          quote: "Exécution sans faille. Conformité SOC2 atteinte en avance.",
          author: "CTO, FinTrust Canada"
        },
        { 
          title: "Consolidation ERP Détail", 
          summary: "Unification de 15 systèmes POS disparates dans une instance Odoo unique.", 
          quote: "Enfin une source unique de vérité pour nos ventes.",
          author: "PDG, Northern Retail Group"
        },
        { 
          title: "Agents de Support IA", 
          summary: "Déploiement de bots LLM pour le support niveau 1, réduisant le volume de 40%.", 
          quote: "Nos coûts de support ont chuté tandis que la satisfaction a augmenté.",
          author: "Directeur Support, TechFlow"
        },
        { 
          title: "Permis Numériques Municipaux", 
          summary: "Création d'un portail web sécurisé pour les citoyens.", 
          quote: "Un bond en avant pour les services aux citoyens.",
          author: "Urbaniste, Ville de Moncton"
        },
        { 
          title: "Sécurisation Réseau OT", 
          summary: "Sécurisation des réseaux OT pour un fournisseur d'énergie régional.", 
          quote: "L'expertise d'Oakivo en sécurité OT est inégalée.",
          author: "CISO, Maritime Energy"
        }
      ]
    },
    blog: {
      hero_title: "Insights Numériques",
      hero_subtitle: "Analyses expertes sur Odoo, l'IA et la Cybersécurité.",
      posts: [
        { 
          id: 1, 
          date: "20 Mai 2024", 
          title: "Pourquoi Odoo est le meilleur ERP pour les PME en 2024", 
          category: "Stratégie ERP",
          excerpt: "Comparaison Odoo vs SAP et NetSuite. Pourquoi l'architecture open-source l'emporte.",
          content: "Les PME canadiennes ont besoin d'agilité. Odoo offre une approche modulaire que les géants comme SAP ne peuvent égaler. Avec son noyau open-source, Odoo permet aux entreprises de commencer avec seulement ce dont elles ont besoin—Comptabilité et CRM, par exemple—et d'évoluer de manière transparente vers la fabrication et le commerce électronique."
        },
        { 
          id: 2, 
          date: "12 Mai 2024", 
          title: "Loi C-27 et Confidentialité des Données", 
          category: "Conformité",
          excerpt: "Comprendre la CPPA et assurer la conformité de votre stack.",
          content: "La loi C-27 représente un changement de paradigme dans la gestion des informations personnelles au Canada. La conformité n'est pas seulement une case à cocher juridique ; c'est un facteur de confiance pour vos clients. Chez Oakivo, nous aidons les organisations à auditer leurs flux de données pour garantir que les exigences de résidence et les normes de cryptage répondent aux nouveaux critères de la CPPA."
        },
        { 
          id: 3, 
          date: "28 Avril 2024", 
          title: "Architecture Zero Trust au Canada Atlantique", 
          category: "Cybersécurité",
          excerpt: "Au-delà du pare-feu. Sécuriser le travail à distance à Halifax et Moncton.",
          content: "Le périmètre n'est plus un bâtiment ; c'est une identité. Dans le Canada atlantique, où le travail à distance est un avantage stratégique pour l'acquisition de talents, le Zero Trust est essentiel. Nous mettons en œuvre des contrôles d'accès granulaires où 'ne jamais faire confiance, toujours vérifier' est le défaut."
        },
        { 
          id: 4, 
          date: "15 Avril 2024", 
          title: "Le ROI de la RPA", 
          category: "Automatisation",
          excerpt: "Exemples concrets d'automatisation des factures.",
          content: "L'automatisation n'est pas une question de remplacement ; c'est une question de récupération. Nous avons récemment mis en œuvre un bot RPA pour un client à Dieppe qui surveille une boîte aux lettres AP, extrait les données des PDF à l'aide de l'IA et les saisit directement dans Odoo."
        },
        {
          id: 5,
          date: "02 Avril 2024",
          title: "Souveraineté Cloud : Azure vs AWS Canada",
          category: "Infrastructure Cloud",
          excerpt: "Comparaison technique pour les industries régulées.",
          content: "Pour les cabinets de santé et juridiques canadiens, la résidence des données n'est pas négociable. Azure et AWS proposent désormais des régions canadiennes robustes (Toronto et Montréal), mais leur intégration aux cadres de conformité locaux varie. Oakivo conçoit des solutions multi-cloud qui garantissent que votre PI sensible reste sur le sol canadien."
        },
        {
          id: 6,
          date: "20 Mars 2024",
          title: "Analytique Prédictive dans Odoo",
          category: "Intelligence Artificielle",
          excerpt: "Utiliser vos données ERP pour prévoir les hausses de demande.",
          content: "La plupart des systèmes d'inventaire sont réactifs. En superposant l'IA sur le moteur de reporting d'Odoo, nous permettons aux entreprises de repérer les tendances saisonnières et les perturbations de la chaîne d'approvisionnement des semaines à l'avance."
        },
        {
          id: 7,
          date: "05 Mars 2024",
          title: "Sécuriser le Travail Hybride : Feuille de route 2025",
          category: "Cybersécurité",
          excerpt: "Étapes tactiques pour renforcer vos systèmes.",
          content: "Le modèle hybride n'est plus une expérience. Les stratégies de sécurité doivent évoluer vers une résilience globale, couvrant la sécurité au niveau du matériel et l'accès sans VPN."
        },
        {
          id: 8,
          date: "22 Février 2024",
          title: "Manufacture 4.0 au Nouveau-Brunswick",
          category: "Transformation Numérique",
          excerpt: "Connecter l'atelier à l'ERP pour une usine intelligente.",
          content: "L'industrie manufacturière au Nouveau-Brunswick fait face à un défi de main-d'œuvre. La solution réside dans la connectivité de haute technologie, intégrant les capteurs de l'atelier directement au module de fabrication d'Odoo."
        },
        {
          id: 9,
          date: "10 Février 2024",
          title: "Odoo vs SAP : Comparaison du Coût de Détention",
          category: "Stratégie ERP",
          excerpt: "Choisir entre un géant historique et un ERP agile moderne.",
          content: "Nous décomposons le coût total de possession sur 5 ans. Le modèle de déploiement rapide d'Odoo offre généralement un TCO 40% inférieur tout en égalant 90% des fonctionnalités d'entreprise de SAP."
        },
        {
          id: 10,
          date: "28 Janvier 2024",
          title: "L'IA Générative pour les Opérations",
          category: "Intelligence Artificielle",
          excerpt: "Au-delà de ChatGPT : Transformer votre documentation interne.",
          content: "Imaginez un bot qui a lu chaque politique et rapport de projet de votre entreprise. Nous construisons des agents de connaissance personnalisés qui permettent à vos employés d'obtenir des réponses précises basées sur vos données internes."
        },
        {
          id: 11,
          date: "15 Janvier 2024",
          title: "Transformation Numérique : Le Défi Culturel",
          category: "Leadership",
          excerpt: "Pourquoi 70% des transformations échouent.",
          content: "Le logiciel est la partie facile. La gestion du changement est la partie difficile. Nous explorons la méthode Oakivo pour obtenir l'adhésion des parties prenantes et former le personnel."
        },
        {
          id: 12,
          date: "02 Janvier 2024",
          title: "L'Avenir de l'Open Source en Entreprise",
          category: "Tendances Tech",
          excerpt: "Pourquoi les grandes entreprises s'éloignent des systèmes verrouillés.",
          content: "Le verrouillage propriétaire est l'ennemi de l'innovation. Nous discutons de la montée des normes open source et pourquoi la flexibilité et la sécurité pilotée par la communauté deviennent le premier choix des DSI modernes."
        }
      ]
    },
    careers: {
      hero_title: "Travailler Sans Frontières.",
      hero_subtitle: "Rejoignez une équipe à distance d'experts Odoo.",
      culture_title: "La Méthode Oakivo",
      values: [
        { title: "Télétravail d'Abord", desc: "Travaillez de partout au Canada." },
        { title: "Apprentissage Continu", desc: "Certifications payées pour Odoo, Azure." },
        { title: "Travail Profond", desc: "Nous protégeons votre concentration." },
        { title: "Transparence", desc: "Finances et stratégie partagées." }
      ],
      apply_title: "Rejoignez l'Équipe",
      apply_text: "Nous recherchons des développeurs Odoo et architectes.",
      apply_btn: "Envoyer une Candidature",
      email_link: "hr@oakivo.com"
    },
    contact: {
      hero_title: "Construisons l'Avenir.",
      hero_subtitle: "Besoin d'un partenaire Odoo ou conseil IT ? Parlons-nous.",
      form_title: "Contactez-nous",
      form_response: "Nous répondons sous 24h.",
      label_name: "Nom",
      label_email: "E-mail Pro",
      label_company: "Entreprise",
      label_message: "Détails du Projet",
      btn_send: "Envoyer",
      btn_sending: "Envoi...",
      success_title: "Message Envoyé",
      success_message: "Merci. Un consultant Oakivo vous contactera bientôt.",
      hq_title: "Siège Social",
      hq_visit: "Visitez-nous",
      hq_address_1: "21 Rue Delta",
      hq_address_2: "Dieppe, NB, E1A 7B8",
      hq_email: "Écrivez-nous",
      hq_call: "Appelez-nous",
      hq_phone: "506-899-4941"
    },
    footer: {
      tagline_1: "Construire Mieux.",
      tagline_2: "Grandir Plus Vite.",
      newsletter_text: "Recevez nos conseils sur l'ERP et l'automatisation.",
      newsletter_placeholder: "Votre e-mail pro",
      newsletter_btn: "S'abonner",
      col_capabilities: "Solutions",
      col_company: "Entreprise",
      col_global: "Emplacements",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation",
      back_to_top: "Haut"
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