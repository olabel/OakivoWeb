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
      standard_p3: "Our team consists of Odoo experts, cloud architects, and cybersecurity analysts.",
      journey_title: "Our Roadmap",
      values: [
        { title: "Radical Innovation", text: "We implement forward-thinking architectures that leapfrog the competition." },
        { title: "Absolute Integrity", text: "We operate with total transparency. If a technology doesn't serve your ROI, we won't recommend it." },
        { title: "Tangible Impact", text: "We don't measure success by hours billed. We measure it by costs reduced and revenue generated." }
      ],
      leadership_title: "Executive Leadership",
      leadership_subtitle: "Certified specialists driving Canadian enterprise innovation.",
      team: [
        { name: "Ahmed Bello", role: "Chief Executive Officer", bio: "15+ years of experience in Enterprise Resource Planning and Operational Strategy. Senior Odoo Architect.", credentials: "MBA, PMP" },
        { name: "Sarah Chen", role: "Chief Technology Officer", bio: "Specialist in Cloud Architecture and Legacy Modernization. Formerly lead architect for major FinTech infrastructures.", credentials: "M.Sc. Computer Science, Azure Solutions Architect" },
        { name: "James Thorne", role: "Head of Strategy", bio: "Leading digital transformation roadmaps for the Canadian Public Sector and Energy utilities.", credentials: "B.Eng, vCIO Certified" },
        { name: "Elena Rodriguez", role: "Director of Cybersecurity", bio: "SOC2 Compliance Lead and Zero Trust strategist. Expert in OT Network hardening.", credentials: "CISSP, CISM" }
      ]
    },
    services: {
      hero_label: "Our Expertise",
      hero_title: "End-to-End Digital Transformation.",
      list: [
        { title: "Odoo ERP Implementation", desc: "As specialized partners, we customize Odoo to unify your accounting, inventory, and CRM. Say goodbye to data silos.", insight: "Unified data decreases operational costs by an average of 23%." },
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
      faq_title: "Frequently Asked Questions",
      faq: [
        { q: "What is the typical timeline for an Odoo implementation?", a: "A standard Phase 1 (MVP) implementation usually takes between 3 to 6 months. This timeline depends on the number of modules, the complexity of your current workflows, and the volume of data being migrated." },
        { q: "How do you measure the ROI of business automation?", a: "We focus on two primary metrics: 'Time Reclaimed' (hours saved on manual tasks) and 'Error Reduction Rate'. Most of our clients see a full return on investment within 12 to 18 months of deployment." },
        { q: "Do you provide training for our internal team?", a: "Absolutely. Every implementation project includes a dedicated training phase with custom workshops and documentation. We ensure your team is fully capable of managing the system independently post-launch." },
        { q: "Is Odoo secure enough for sensitive financial data?", a: "Yes. As cybersecurity experts, we implement Odoo with advanced hardening layers, including MFA, encrypted databases, and hosting within SOC2-compliant Canadian cloud regions." }
      ],
      cta_title: "Transform Your Business Today",
      cta_text: "Stop struggling with spreadsheets and legacy systems.",
      cta_btn: "Book Your Assessment"
    },
    caseStudies: {
      hero_title: "Client Success Stories",
      hero_subtitle: "See how we've helped Canadian businesses optimize operations and secure their data through precision engineering.",
      cases: [
        { title: "Supply Chain Automation with Odoo", summary: "Implemented Odoo Inventory & Manufacturing for an Atlantic Canada logistics firm, reducing stockouts by 45% and optimizing lead times.", quote: "Oakivo gave us visibility we never thought possible in our maritime logistics operations.", author: "VP Operations, Atlantic Logistics" },
        { title: "Fintech Cloud Security Migration", summary: "Migrated legacy on-premise servers to Azure with Zero Trust architecture for a Toronto fintech, achieving SOC2 readiness.", quote: "Flawless execution. We met our compliance requirements ahead of schedule with Zero Trust.", author: "CTO, FinTrust Canada" },
        { title: "Retail ERP Consolidation", summary: "unified 15 disparate POS systems into a single Odoo instance for a national retail chain with real-time inventory sync.", quote: "Finally, a single source of truth for our sales data across all provinces.", author: "CEO, Northern Retail Group" },
        { title: "AI Customer Support Agents", summary: "Deployed LLM-powered support bots to handle Tier 1 inquiries, reducing ticket volume by 40% and improving satisfaction scores.", quote: "Our support costs dropped significantly while our response time hit sub-1-minute marks.", author: "Director of Support, TechFlow" },
        { title: "Municipal Digital Permitting", summary: "Created a secure web portal for citizen permit applications, cutting processing time by 70% for city planners.", quote: "A massive leap forward in digital services for our citizens. Highly secure and accessible.", author: "City Planner, City Services Dept" },
        { title: "OT Network Hardening", summary: "Secured operational technology networks for a regional energy provider against emerging ransomware threats.", quote: "Oakivo's expertise in OT security is unmatched. They secured our grid when others couldn't.", author: "CISO, Maritime Energy" }
      ]
    },
    blog: {
      hero_title: "Digital Insights",
      hero_subtitle: "Expert analysis on Odoo, ERP trends, AI, and Cybersecurity for the Canadian market.",
      posts: [
        { 
          id: 1, 
          date: "January 15, 2026", 
          title: "Why Odoo is the Best ERP for Canadian SMEs", 
          category: "ERP Strategy", 
          excerpt: "Comparing Odoo vs. SAP and NetSuite. Why modular open-source wins for growth-oriented Canadian firms.", 
          content: `### The Strategic Shift in ERP
For decades, Canadian mid-market firms were trapped in a binary choice: settle for underpowered accounting tools or suffer the crushing complexity of "Big ERP" systems designed for multinational conglomerates.

**Odoo has fundamentally disrupted this landscape.** As a modular, API-first platform, it allows Atlantic Canadian businesses to start lean—focusing on core pillars like Inventory and Accounting—before horizontally scaling into Manufacturing, CRM, or E-commerce.

### Key Competitive Advantages for Canada:
*   **Modular Scalability:** Unlike NetSuite, where you pay for bloated features from day one, Odoo's "app-based" model ensures your tech debt remains low while your agility stays high.
*   **Native Canadian Localization:** From automated **GST/HST/PST** multi-regional tax handling to precise Canadian Payroll modules, Odoo is engineered for our specific regulatory environment.
*   **The TCO Equation:** Open-source architecture means lower licensing overhead, allowing you to reinvest that capital into custom workflow engineering rather than recurring subscription fees.

### Strategic Takeaways
The objective of an Oakivo implementation is **Data Unification**. When your sales team, warehouse managers, and finance leads all operate from a single, real-time source of truth, you eliminate the operational "fog" that stalls growth.

*Is your current tech stack holding you back? View our [Services](#/services) page to see our implementation roadmap.*`
        },
        { 
          id: 2, 
          date: "December 12, 2025", 
          title: "Bill C-27 and Data Privacy in Canada", 
          category: "Compliance", 
          excerpt: "Understanding the Consumer Privacy Protection Act (CPPA) and ensuring compliance for Canadian private enterprises.", 
          content: `### The Dawn of the CPPA
The regulatory landscape in Canada is undergoing its most radical transformation since the inception of PIPEDA. **Bill C-27**, which introduces the **Consumer Privacy Protection Act (CPPA)**, brings monumental changes to how private sector organizations must manage personal information.

Failure to comply is no longer just a reputation risk; it's an existential financial one. Serious violations can result in fines of up to **5% of global revenue** or $25 million.

### Three Pillars of Compliance for 2026:
1.  **Data Portability & Disposal:** Customers now possess the legal right to request their data be transferred or permanently deleted. Your ERP must have the granular control to execute these requests without affecting core business integrity.
2.  **Consent Management:** Passive consent is dead. The CPPA requires clear, affirmative consent for data collection, with strict transparency on how that data is utilized.
3.  **Algorithmic Accountability:** If your business uses AI to automate decisions (e.g., credit approvals or recruitment), you must maintain clear documentation explaining the logic behind those automated outcomes.

### The Oakivo Security Layer
We help Canadian firms architect **Compliance-by-Design**. By centralizing all customer data within a secured Odoo environment hosted in **Canadian Azure Regions**, we ensure you maintain absolute data residency and a clear, immutable audit trail for CPPA inquiries.

*Ensure your organization is CPPA-ready. Contact our [Cybersecurity Leads](#/contact) for a compliance audit.*`
        },
        { 
          id: 3, 
          date: "November 28, 2025", 
          title: "Implementing Zero Trust Architecture", 
          category: "Cybersecurity", 
          excerpt: "Securing remote and hybrid workforces in Atlantic Canada using zero-trust principles and identity-centric security.", 
          content: `### Beyond the Office Firewall
The traditional "Moat and Castle" approach to IT security—where everything inside the office network is trusted—is officially obsolete. With hybrid work now the standard in Dieppe, Moncton, and Halifax, your data is being accessed from hundreds of unmanaged residential networks.

**Zero Trust** is not a product; it is a strategic mindset: **Never Trust, Always Verify.**

### The Core Components of Zero Trust:
*   **Identity is the New Perimeter:** We replace legacy VPNs with Identity-Aware Proxies. Every single access request to your Odoo ERP is verified using Multi-Factor Authentication (MFA) and device health checks.
*   **Micro-Segmentation:** If a breach occurs on one workstation, our architecture ensures the threat cannot "move laterally" to your critical accounting or HR servers.
*   **Continuous Analytics:** We deploy AI-driven monitoring that detects anomalous behavior—like a user logging in from Toronto and Vancouver simultaneously—and triggers automatic lockout.

### Strategic Resilience
Oakivo's Zero Trust framework ensures that your workforce remains productive anywhere in Canada without compromising the security of your most sensitive intellectual property.

*Protect your hybrid team. [Schedule a Security Audit](#/contact) with our CISSP-certified architects.*`
        },
        { 
          id: 4, 
          date: "October 15, 2025", 
          title: "The ROI of Robotic Process Automation (RPA)", 
          category: "Automation", 
          excerpt: "How automating high-volume invoice processing and data entry saves 20+ hours a week for Canadian finance teams.", 
          content: `### Eliminating the "Manual Tax"
High-growth Canadian companies are often held back by a hidden "Manual Tax"—the cost of paying skilled professionals to perform repetitive, low-value data entry. Manual data processing is not only slow but carries a **1-3% error rate**, which compounds into significant financial discrepancies over time.

### High-Impact Automation Targets:
1.  **Accounts Payable:** AI-powered OCR (Optical Character Recognition) extracts data from vendor invoices and creates draft bills in Odoo for one-click approval.
2.  **Order Orchestration:** Automatically syncing customer data between Shopify, Amazon, and Odoo without a single manual keystroke.
3.  **Client Onboarding:** Standardizing the collection of KYC (Know Your Customer) documents and syncing them to the CRM.

### Measuring Tangible Success
At Oakivo, we calculate RPA success using **"Hours Reclaimed."** For an industrial client in Atlantic Canada, we automated their manifest processing, reclaiming **15 hours of productivity per week** for their logistics lead. 

This allowed her to transition from data entry to **strategic supply chain optimization**, resulting in a 12% reduction in shipping costs within the first quarter.

*Ready to reclaim your team's time? Explore our [Intelligent Automation](#/services) solutions.*`
        },
        { 
          id: 5, 
          date: "February 10, 2026", 
          title: "Maritime Logistics & Odoo 18", 
          category: "Industrial Strategy", 
          excerpt: "How IoT-connected ERP systems are revolutionizing the East Coast supply chain and port operations.", 
          content: `### Digital Transformation at the Port
The Atlantic Maritime corridor is the lifeblood of our regional economy. Yet, many logistics firms still struggle with "visibility gaps"—periods where cargo location and true landed costs are unknown. 

**Odoo 18** represents a paradigm shift for maritime operations when integrated with modern **IoT (Internet of Things)** technology.

### The Maritime Tech Stack:
*   **Real-Time Fleet Telematics:** Integrating GPS and engine sensor data directly into the Odoo Maintenance module to prevent mid-transit breakdowns.
*   **Smart WMS (Warehouse Management):** Utilizing barcode-driven workflows that sync with Odoo Inventory, allowing port managers to view real-time throughput from any device.
*   **Automated Landed Costing:** Instant calculations of duties, maritime insurance, and port fees to ensure your profit margins are protected on every shipment.

### The competitive Edge
Visibility is no longer a luxury; it is the primary differentiator. Logistics firms that can provide their clients with real-time, automated status updates and precise billing will always outperform legacy operators.

*Witness the impact of maritime tech in our [Case Studies](#/case-studies) section.*`
        },
        { 
          id: 6, 
          date: "February 01, 2026", 
          title: "Generative AI for ERP Workflows", 
          category: "Artificial Intelligence", 
          excerpt: "Leveraging Large Language Models (LLMs) to automate Odoo CRM and streamline project management data entry.", 
          content: `### AI: Beyond the Chatbot
The real value of **Generative AI** in the enterprise isn't in generating text, but in **orchestrating complex workflows**. At Oakivo, we integrate LLMs (Large Language Models) directly into your Odoo ERP to act as an "Agentic Layer."

### Practical AI Integrations for 2026:
1.  **Semantic Search:** Sales teams can query their CRM using natural language (e.g., "Show me all clients in NB who haven't ordered in 6 months and have a high sentiment score").
2.  **Voice-to-ERP:** Field technicians describe a site repair into their mobile device. The AI extracts the core issue, creates a service ticket in Odoo, and schedules a follow-up visit based on technician availability.
3.  **Automated Response Orchestration:** Intelligent support agents that can not only answer customer queries but also trigger Odoo actions like issuing a return label or updating a shipping address.

### The Human-Centric AI Approach
We believe AI should **augment human intelligence**, not replace it. Our "Humans-in-the-Loop" architecture ensures that AI handles the heavy cognitive lifting while your experts retain final strategic approval.

*Lead the AI revolution in your industry. See our [Automation Expertise](#/services).*`
        }
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
      standard_p3: "Experts Odoo.",
      journey_title: "Parcours",
      values: [
        { title: "Innovation", text: "Architectures avant-gardistes." },
        { title: "Intégrité", text: "Transparence totale." },
        { title: "Impact", text: "Coûts réduits, revenus générés." }
      ],
      leadership_title: "Direction Executive",
      leadership_subtitle: "Spécialistes certifiés pour l'innovation.",
      team: [
        { name: "Ahmed Bello", role: "Président-Directeur Général", bio: "Plus de 15 ans d'expérience en ERP et stratégie opérationnelle. Expert Odoo.", credentials: "MBA, PMP" },
        { name: "Sarah Chen", role: "Directrice de la Technologie", bio: "Spécialiste en architecture cloud et modernisation. Ancienne architecte principale pour infrastructures FinTech.", credentials: "M.Sc., Azure Architect" },
        { name: "James Thorne", role: "Directeur de la Stratégie", bio: "Responsable des feuilles de route de transformation pour le secteur public et l'énergie.", credentials: "B.Eng, vCIO" },
        { name: "Elena Rodriguez", role: "Directrice de la Cybersécurité", bio: "Responsable de la conformité SOC2 et stratégie Zero Trust.", credentials: "CISSP, CISM" }
      ]
    },
    services: {
      hero_label: "Expertise",
      hero_title: "Transformation Numérique.",
      list: [
        { title: "Implantation Odoo", desc: "Partenaires spécialisés.", insight: "Réduction de 23% des coûts." },
        { title: "Automatisation & IA", desc: "RPA et agents IA.", insight: "Récupérez 30% de temps." },
        { title: "Conseil Stratégique", desc: "Services de vCIO.", insight: "La stratégie d'abord." },
        { title: "Cybersécurité", desc: "SOC2 et Zero Trust.", insight: "Souveraineté des données." }
      ],
      method_title: "Méthode",
      method_subtitle: "Cadre éprouvé.",
      steps: [{ title: "Audit", desc: "Analyse." }, { title: "Architecture", desc: "Design." }, { title: "Implantation", desc: "Déploiement." }, { title: "Mise à l'échelle", desc: "Support." }],
      faq_title: "Questions Fréquemment Posées",
      faq: [
        { q: "Quel est le délai typique pour une implantation Odoo ?", a: "Une implantation standard de la phase 1 (MVP) prend généralement entre 3 et 6 mois. Ce délai dépend du nombre de modules et de la complexité des flux de travail." },
        { q: "Comment mesurez-vous le ROI de l'automatisation ?", a: "Nous suivons le 'Temps Récupéré' et le 'Taux de Réduction des Erreurs'. La plupart des clients voient un retour sur investissement complet sous 12 à 18 mois." },
        { q: "Offrez-vous une formation pour notre équipe ?", a: "Oui, chaque projet inclut des ateliers de formation et une documentation personnalisée pour assurer l'adoption du système." },
        { q: "Odoo est-il assez sécurisé pour mes données financières ?", a: "Absolument. Nous implantons Odoo avec des couches de sécurité avancées, incluant le MFA et un hébergement cloud certifié SOC2 au Canada." }
      ],
      cta_title: "Transformez-vous", cta_text: "Finis les tableurs.", cta_btn: "Évaluation"
    },
    caseStudies: {
      hero_title: "Réalisations", hero_subtitle: "Découvrez nos succès grâce à l'ingénierie de précision.",
      cases: [
        { title: "Logistique Odoo", summary: "Réduction des ruptures de stock.", quote: "Visibilité accrue pour nos opérations maritimes.", author: "VP Opérations" },
        { title: "Migration Cloud", summary: "Zero Trust pour Fintech.", quote: "Exécution parfaite et conformité atteinte.", author: "CTO" },
        { title: "Détail ERP", summary: "Unification POS.", quote: "Source unique de vérité pour nos ventes.", author: "PDG" },
        { title: "Support IA", summary: "Bots LLM.", quote: "Coûts en baisse et satisfaction en hausse.", author: "Directeur" },
        { title: "Permis Publics", summary: "Portail citoyen.", quote: "Bond en avant dans les services publics.", author: "Urbaniste" },
        { title: "Sécurité OT", summary: "Hardi réseaux.", quote: "Expertise inégalée en sécurité industrielle.", author: "CISO" }
      ]
    },
    blog: {
      hero_title: "Insights", hero_subtitle: "Odoo, IA et Cybersécurité.",
      posts: [
        { id: 1, date: "15 Janvier 2026", title: "Pourquoi Odoo ?", category: "Stratégie ERP", excerpt: "Modularité vs SAP.", content: "### Points Clés\n* **Modularité :** Construisez uniquement ce dont vous avez besoin.\n* **Efficacité :** Coût total de possession réduit.\n* **Localisation :** Support natif des taxes canadiennes.\n\nAgilité pour PME. Voir nos <a href='#/services'>Services</a> et <a href='#/verticals'>Secteurs</a>." },
        { id: 2, date: "12 Décembre 2025", title: "Loi C-27", category: "Conformité", excerpt: "Confidentialité au Canada.", content: "### Points Clés\n* **CPPA :** Programmes obligatoires de gestion de la vie privée.\n* **Souveraineté :** Enjeux de résidence des données au Canada.\n* **Amendes :** Sanctions sévères en cas de non-compliance.\n\nSoyez prêt. Voir nos services de <a href='#/services'>Sécurité</a>." }
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