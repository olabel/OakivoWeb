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
      contact: "Initiate Audit", 
      careers: "Careers" 
    },
    common: {
      cta_audit: "Initiate Systemic Audit",
      cta_blueprint: "Request Strategic Blueprint",
      cta_meet: "Meet the Architects",
      cta_orchestrate: "Orchestrate Growth"
    },
    home: {
      hero_label: "Engineering Industrial Resilience",
      hero_title_main: "Orchestrating the",
      hero_title_italic: "digital",
      hero_title_end: "future.",
      hero_subtitle: "Oakivo Solutions Inc. orchestrates mission-critical Odoo 18 ecosystems and Agentic AI reasoning engines to de-couple technical debt from Canadian enterprise expansion.",
      cta_primary: "Engineer Autonomy",
      cta_secondary: "Inspect Intelligence",
      stats_label: "Empirical Outcomes",
      stats_1_val: "482K+",
      stats_1_lbl: "Autonomous Cycles",
      stats_2_val: "99.99%",
      stats_2_lbl: "Architecture Uptime",
      stats_3_val: "SOC2",
      stats_3_lbl: "Security Standard",
      matrix_title: "The Orchestration Matrix",
      matrix_subtitle: "Enterprise-grade automation backed by native Canadian data residency and senior systems engineering.",
    },
    about: {
      dna_label: "Technical Heritage",
      hero_title: "Architecting Canada's Autonomous Future.",
      hero_subtitle: "We replace operational friction with industrial-grade intelligence through surgical ERP orchestration and Agentic AI.",
      standard_title: "The Oakivo Doctrine",
      standard_p1: "Oakivo Solutions was established to bridge the 'Digital Execution Gap'—where standard software fails the structural complexity of Canadian industrial operations.",
      standard_p2: "We don't just implement software; we re-engineer the fundamental logic of the enterprise, ensuring data flows without latency and processes act without hesitation.",
      standard_p3: "Our commitment to technical sovereignty means your organization maintains complete control over its intelligence assets, hosted locally and secured by Zero-Trust principles.",
      leadership_title: "Principal Architects",
      leadership_subtitle: "The engineering minds leading Canada's digital maturity.",
      values: [
        { title: "Surgical Precision", text: "We de-couple technical debt through high-fidelity engineering that respects the nuances of industrial workflows." },
        { title: "Sovereign Intelligence", text: "Client data is held in native Canadian residency, secured by SOC2-aligned protocols and Zero-Trust identity mesh." },
        { title: "Agentic Autonomy", text: "We believe processes should think for themselves. Our workflows initiate corrective actions, not just passive alerts." }
      ],
      team: [
        { 
          name: "Ahmed Bello", 
          credentials: "MBA, Odoo Principal", 
          role: "CEO & Senior Systems Orchestrator", 
          bio: "An industry veteran with 15+ years in ERP strategy, Ahmed specializes in reconciling legacy technical debt with modern, high-velocity Agentic AI interfaces.",
          expertise: ["Systemic ROI", "ERP Architecture", "Agentic Strategy"],
          linkedin: "https://linkedin.com/company/oakivo"
        },
        { 
          name: "Sarah Jenkins", 
          credentials: "MSc CS, CISSP", 
          role: "Director of Cyber Resilience", 
          bio: "Sarah manages our security-first posture, ensuring all automation pipelines meet institutional standards for data sovereignty and resilience.",
          expertise: ["Zero-Trust Protocol", "Compliance Auditing", "Data Security"],
          linkedin: "https://linkedin.com/company/oakivo"
        },
        { 
          name: "Fawaz Bello", 
          credentials: "OSCP", 
          role: "Offensive Security Lead", 
          bio: "Specializing in industrial system hardening, Fawaz ensures the integrity of automated ERP environments through proactive penetration testing and AI protection.",
          expertise: ["Penetration Testing", "Security Research", "Vulnerability Management"],
          linkedin: "https://linkedin.com/company/oakivo"
        }
      ]
    },
    services: {
      hero_label: "Engineering Pillars",
      hero_title: "Operational Excellence. <br/> Re-engineered.",
      list: [
        { title: "Agentic AI Orchestration", desc: "Developing autonomous reasoning engines that act upon your business data in real-time, removing human bottlenecks from high-frequency decisions.", insight: "AI shouldn't just summarize; it should autonomously execute." },
        { title: "Odoo 18 Orchestration", desc: "Surgical deployment of the Odoo 18 ERP ecosystem, providing a high-fidelity single source of truth for multi-location industrial operations.", insight: "Unity is the prerequisite for institutional visibility." },
        { title: "Cybersecurity Resilience", desc: "Hardening your industrial perimeter with Zero-Trust identity management and preparing organizations for SOC2 Type II certification.", insight: "Security is the foundation of operational trust." },
        { title: "Industrial Modernization", desc: "A precision roadmap to migrate legacy infrastructure into cloud-native environments with 24/7 technical telemetry.", insight: "Legacy systems are the silent inhibitors of enterprise scaling." }
      ],
      cta_title: "Initiate Your Roadmap",
      cta_text: "Do not allow legacy software to dictate your organizational potential. Connect with our architects.",
      cta_btn: "Orchestrate Autonomy"
    },
    verticals: {
      cards: [
        { title: "Manufacturing 4.0", desc: "Predictive OEE tracking and automated supply chain replenishment integrated directly into shop-floor hardware logic." },
        { title: "Smart Logistics", desc: "Multi-warehouse orchestration using Agentic AI for route optimization and real-time inventory reconciliation." },
        { title: "Professional Firms", desc: "Automated billing cycles and resource allocation for high-growth engineering and consultancy services." },
        { title: "Enterprise Retail", desc: "Omnichannel Odoo synchronization with 100% data accuracy across global e-commerce and POS networks." },
        { title: "Public Sector Tech", desc: "Scalable, secure, and compliant infrastructure built to maintain the highest levels of Canadian data sovereignty." },
        { title: "Financial Hubs", desc: "Automated reconciliation and Zero-Trust reporting layers for mission-critical financial operations." }
      ]
    },
    caseStudies: {
      hero_title: "Measurable Impact.",
      hero_subtitle: "Empirical proof of digital transformation delivering industrial-grade ROI for the Canadian market.",
      cases: [
        { 
          title: "Supply Chain Sync", 
          summary: "Automating 30,000 monthly movements across 5 regional hubs using Odoo 18.", 
          problem: "Fragmentation causing 15% inventory variance and critical replenishment latency.",
          solution: "Orchestrated Odoo 18 multi-warehouse logic with predictive Agentic AI replenishment bots.",
          impact: "40% Operational Velocity Gain",
          quote: "Oakivo didn't just install a system; they provided the lens through which we view our future.", 
          author: "J. Miller, Ops Director"
        },
        { 
          title: "Institutional Cyber Defense", 
          summary: "Zero-Trust identity management for a high-frequency Canadian finance firm.", 
          problem: "Legacy firewalls were unable to prevent sophisticated lateral movement threats.",
          solution: "Total deployment of a Zero-Trust identity mesh and SOC2-compliant data isolation.",
          impact: "100% Breach Prevention",
          quote: "Technical security that finally matches our organizational risk profile.", 
          author: "S. Chen, CTO"
        },
        { 
          title: "Retail Logic Engine", 
          summary: "AI-driven demand forecasting and automated retail fulfillment orchestration.", 
          problem: "Manual procurement cycles resulting in stockouts and lost revenue opportunities.",
          solution: "Integration of Agentic AI logic with Odoo purchasing to automate the vendor sync loop.",
          impact: "25% YoY Revenue Growth",
          quote: "The system thinks, acts, and optimizes while we focus on brand strategy.", 
          author: "L. Thompson, VP Retail"
        }
      ]
    },
    contact: {
      form_title: "Technical Inquiry",
      label_name: "Full Name",
      label_email: "Corporate Email",
      label_company: "Organization",
      label_message: "Operational Overview",
      hq_title: "Engineering Headquarters",
      success_title: "Intake Verified",
      success_message: "Your inquiry has been logged in the Oakivo Vault. An architect will respond within one business day."
    },
    careers: {
      hero_title: "Join the Architects.",
      hero_subtitle: "Help build the autonomous engine for Canada's leading organizations. Remote-first, technical-first.",
      values: [
        { title: "Technical Sovereignty", desc: "We believe in the power of local engineering to solve complex global problems." },
        { title: "High-Fidelity Work", desc: "We value deep work, clean architecture, and measurable client results." },
        { title: "Adaptive Remote Culture", desc: "Work from anywhere in Canada with the best tools and asynchronous freedom." },
        { title: "Continuous Research", desc: "Stay at the absolute edge of Odoo 18, Agentic AI, and Cyber Resilience." }
      ],
      apply_title: "Spontaneous Intake",
      apply_text: "Don't see a matching blueprint? Transmit your technical profile for future orchestration.",
      apply_btn: "Transmit Profile",
      email_link: "careers@oakivo.com"
    },
    blog: {
      hero_title: "Intelligence Vault",
      hero_subtitle: "Deep-dive analysis on the orchestration of AI, ERP, and Cybersecurity in Canada.",
      posts: [
        { 
          id: 1, 
          date: "Jan 15, 2026", 
          title: "The Agentic Shift in Odoo 18", 
          category: "AI Strategy", 
          author: "Ahmed Bello",
          videoUrl: "https://www.youtube.com/embed/N6j6x0qJbYk", 
          excerpt: "Moving beyond passive ERPs: How Agentic AI in Odoo 18 is automating the mid-market decision loop.", 
          sections: {
            introduction: "Odoo 18 represents the first true 'Thinking ERP'. By integrating agentic logic, we are removing human latency from core business processes.",
            takeaways: [
              "Agentic AI acts as an autonomous worker, not just an assistant.",
              "Native Odoo 18 AI tools drastically reduce administrative overhead.",
              "Strategic orchestration is the differentiator between automation and noise."
            ],
            discussion: "Oakivo focuses on the logic-layer of ERP. We ensure your AI doesn't just read data, but acts on it to drive tangible operational resilience.",
            conclusion: "The enterprise of 2026 will be defined by its ability to de-couple human labor from data processing."
          }
        },
        { 
          id: 2, 
          date: "Feb 02, 2026", 
          title: "Industrial Zero-Trust Protocols", 
          category: "Resilience", 
          author: "Sarah Jenkins",
          videoUrl: "https://www.youtube.com/embed/fD_hV6GzK1Y", 
          excerpt: "Why the perimeter is dead: Building a Zero-Trust identity mesh for the Canadian industrial sector.", 
          sections: {
            introduction: "Perimeter security is obsolete. In a world of distributed assets, identity is the only reliable security boundary.",
            takeaways: [
              "Micro-segmentation is the cure for lateral movement attacks.",
              "Continuous authentication ensures persistent system integrity.",
              "Compliance is a byproduct of good engineering, not a target."
            ],
            discussion: "We implement Zero-Trust as a native feature of every Odoo deployment, protecting your most sensitive intellectual assets.",
            conclusion: "True resilience is measured by how quickly you can recover, not just how hard you are to hit."
          }
        }
      ]
    },
    footer: {
      tagline_1: "Orchestrating AI.", 
      tagline_2: "Building Futures.",
      ai_prop_title: "The AI Orchestration Advantage",
      ai_prop_text: "Oakivo orchestrates agentic intelligence into the core of your Odoo ERP, turning manual workflows into autonomous profit engines. We de-couple technical debt from your growth trajectory.",
      ai_pillar_1: "Autonomous Logic",
      ai_pillar_2: "Zero-Trust Security",
      ai_pillar_3: "Operational ROI",
      newsletter_text: "Technical intelligence briefings on AI and ERP.",
      newsletter_placeholder: "Corporate Email Address",
      newsletter_btn: "Transmit",
      col_capabilities: "Solutions Matrix", 
      col_company: "Oakivo Hub", 
      col_global: "Regional Presence",
      privacy: "Privacy Protocol", 
      terms: "Terms of Service", 
      back_to_top: "Top",
      hq_location: "Moncton-Dieppe, NB",
      hq_label: "Atlantic Hub"
    }
  },
  fr: {
    nav: { 
      home: 'Accueil', 
      verticals: 'Secteurs', 
      services: 'Expertise', 
      work: 'Impact', 
      about: 'Architecture', 
      contact: "Initier l'Audit", 
      careers: "Carrières" 
    },
    common: {
      cta_audit: "Initier l'audit systémique",
      cta_blueprint: "Demander le plan stratégique",
      cta_meet: "Rencontrez les architectes",
      cta_orchestrate: "Orchestrer la croissance"
    },
    home: {
      hero_label: "Ingénierie de la Résilience Industrielle",
      hero_title_main: "Orchestrer le",
      hero_title_italic: "futur",
      hero_title_end: "numérique.",
      hero_subtitle: "Oakivo Solutions Inc. orchestre des écosystèmes Odoo 18 critiques et des moteurs de raisonnement d'IA agente pour libérer la croissance canadienne.",
    },
    verticals: {
      cards: [
        { title: "Manufacture 4.0", desc: "Suivi OEE prédictif et réapprovisionnement industriel automatisé intégré directement dans la logique de l'équipement." },
        { title: "Logistique Intelligente", desc: "Orchestration multi-entrepôts utilisant l'IA agente pour l'optimisation des itinéraires." }
      ]
    },
    contact: {
      form_title: "Enquête Technique",
      label_name: "Nom Complet",
      label_email: "E-mail Professionnel",
      label_company: "Organisation",
      label_message: "Aperçu Opérationnel",
      hq_title: "Siège de l'Ingénierie",
      success_title: "Demande Vérifiée",
      success_message: "Votre demande a été enregistrée. Un architecte vous répondra sous un jour ouvrable."
    },
    careers: {
      hero_title: "Rejoignez les Architectes.",
      hero_subtitle: "Aidez à bâtir le moteur autonome des plus grandes organisations du Canada.",
      values: [],
      apply_title: "Candidature Spontanée",
      apply_text: "Transmettez votre profil technique pour une future orchestration.",
      apply_btn: "Transmettre le Profil",
      email_link: "careers@oakivo.com"
    },
    footer: {
      tagline_1: "Orchestrer l'IA.", 
      tagline_2: "Bâtir l'avenir.",
      ai_prop_title: "L'avantage de l'orchestration IA",
      ai_prop_text: "Oakivo orchestre l'intelligence agente au cœur de votre ERP Odoo, transformant les flux de travail manuels en moteurs de profit autonomes.",
      ai_pillar_1: "Logique autonome",
      ai_pillar_2: "Sécurité Zero-Trust",
      ai_pillar_3: "ROI Opérationnel",
      newsletter_text: "Bulletins d'intelligence technique sur l'IA et l'ERP.",
      newsletter_placeholder: "Adresse e-mail de l'entreprise",
      newsletter_btn: "Transmettre",
      col_capabilities: "Solutions", 
      col_company: "Oakivo Hub", 
      col_global: "Présence régionale",
      privacy: "Protocole de confidentialité", 
      terms: "Conditions d'utilisation", 
      back_to_top: "Haut",
      hq_location: "Moncton-Dieppe, NB",
      hq_label: "Atlantic Hub"
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