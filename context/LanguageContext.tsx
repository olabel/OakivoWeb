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
    common: {
      cta_audit: "Initiate Strategic Audit",
      cta_blueprint: "Request Technical Blueprint",
      cta_meet: "Meet the Architects"
    },
    home: {
      hero_title_1: "Orchestrating",
      hero_title_2: "Digital Growth.",
      hero_subtitle: "Oakivo Solutions Inc. is Canada's premier engineering force for Agentic AI, Odoo 18 Orchestration, and Zero-Trust Cybersecurity. We turn technical debt into operational equity.",
      cta_primary: "Initiate Strategic Audit",
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
      cta_footer_btn: "Initiate Strategic Audit",
      trusted_by: "Engineering Success Across Canada",
      perspectives_title: "Expert Perspectives",
      view_insights: "Access Intel Vault"
    },
    about: {
      dna_label: "Corporate DNA",
      hero_title: "Re-Engineering the Canadian Enterprise.",
      hero_subtitle: "We reclaim business agility through surgical AI integration and unified data ecosystems.",
      standard_title: "The Oakivo Standard",
      standard_p1: "Founded in Atlantic Canada, Oakivo was born from a realization that traditional software implementation fails because it ignores the orchestration layer.",
      standard_p2: "We don't just sell software. We architect ecosystems where Agentic AI handles the mundane and humans drive the strategy.",
      standard_p3: "Our mission is to ensure every Canadian industrial leader has access to the same level of digital sovereignty and automation as global tech giants.",
      leadership_title: "Architectural Leadership",
      leadership_subtitle: "The minds orchestrating Canada's autonomous future.",
      values: [
        { title: "Precision First", text: "We measure twice and cut once. Every deployment is a surgical improvement of your business logic." },
        { title: "Data Sovereignty", text: "Your data stays in Canada. We prioritize SOC2 compliance and native residency." },
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
        },
        { 
          name: "Fawaz Bello", 
          credentials: "OSCP", 
          role: "Cyber Security Specialist", 
          bio: "Fawaz leads Oakivo's offensive security research, specializing in penetration testing for automated ERP environments and securing high-risk agentic AI interfaces.",
          expertise: ["Offensive Security", "Penetration Testing", "AI Interface Hardening"],
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
      cta_title: "Start Your Blueprint",
      cta_text: "Don't settle for legacy limitations. Let's build your autonomous future.",
      cta_btn: "Initiate Strategic Audit"
    },
    caseStudies: {
      hero_title: "Proven Outcomes.",
      hero_subtitle: "Analysis of how we transform complex challenges into competitive advantages.",
      cases: [
        { 
          title: "Atlantic Distribution Sync", 
          summary: "Automating 30,000 monthly SKUs across 5 locations using Odoo 18.", 
          problem: "Fragmented inventory tracking leading to 15% stock variance and operational lag.",
          solution: "Orchestrated Odoo 18 multi-warehouse logic with real-time AI inventory agents.",
          impact: "40% Efficiency Gain",
          quote: "Oakivo didn't just install software; they fixed our company's pulse.", 
          author: "James Miller, Operations Director"
        },
        { 
          title: "FinTrust Cyber Hardening", 
          summary: "Implementing Zero-Trust identity management for a national finance firm.", 
          problem: "Legacy perimeter security unable to withstand modern lateral-movement ransomware.",
          solution: "Deployment of a Zero-Trust identity mesh and SOC2-compliant data isolation layers.",
          impact: "Zero Breaches in 24 Months",
          quote: "Finally, a security partner that understands the business bottom line.", 
          author: "S. Chen, CTO"
        },
        { 
          title: "Northern Retail Automation", 
          summary: "AI-driven customer experience and supply chain replenishment.", 
          problem: "Manual re-ordering processes causing frequent stockouts and customer churn.",
          solution: "Integrated Agentic AI forecasting with automated Odoo purchasing workflows.",
          impact: "25% Revenue Growth",
          quote: "The AI doesn't just predict; it acts. We have regained our weekends.", 
          author: "L. Thompson, VP Retail"
        }
      ]
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
          videoUrl: "https://www.youtube.com/embed/N6j6x0qJbYk", 
          excerpt: "How Odoo 18's native AI and Oakivo's agentic workflows are reshaping mid-market productivity.", 
          sections: {
            introduction: "Odoo 18 marks a fundamental shift from record-keeping to active participant. We explore the architectural impact of AI in the ERP ecosystem.",
            takeaways: [
              "Agentic AI executes complex transactional logic autonomously.",
              "Intelligent OCR reduces manual entry by 40%.",
              "Real-time predictive replenishment is now standard."
            ],
            discussion: "At Oakivo, we prioritize the 'Orchestration' layer. It is not just about the tool; it is about how the tool interacts with your human capital.",
            conclusion: "The transition to an AI-first ERP is no longer optional for businesses looking to scale."
          }
        },
        { 
          id: 2, 
          date: "February 02, 2026", 
          title: "Zero-Trust: The Identity Perimeter", 
          category: "Cybersecurity", 
          author: "Sarah Jenkins",
          videoUrl: "https://www.youtube.com/embed/fD_hV6GzK1Y", 
          excerpt: "Securing the perimeter isn't enough. Why Zero-Trust is the only defense against modern ransomware targeting industrial sectors.", 
          sections: {
            introduction: "Identity is the new perimeter. Traditional firewalls are a relic of the past in a distributed workforce.",
            takeaways: [
              "Never trust, always verify: the core of Zero-Trust architecture.",
              "Micro-segmentation prevents lateral movement during a breach.",
              "Canadian data residency is a strategic requirement."
            ],
            discussion: "Oakivo's security audits focus on 'least-privilege' access controls. This ensures that even a compromised endpoint cannot access your critical ERP database.",
            conclusion: "Resilience is built into the blueprint, not added as a feature later."
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
    nav: { home: 'Accueil', verticals: 'Secteurs', services: 'Services', work: 'Réalisations', about: 'À Propos', contact: "Demander le Plan", careers: "Carrières" },
    common: {
      cta_audit: "Initier l'audit stratégique",
      cta_blueprint: "Demander le plan technique",
      cta_meet: "Rencontrez les architectes"
    },
    home: {
      hero_title_1: "Orchestrer",
      hero_title_2: "la Croissance.",
      hero_subtitle: "Oakivo Solutions Inc. est la force d'ingénierie numéro 1 au Canada pour l'IA, Odoo 18 et la cybersécurité. Nous transformons la deet technique en capital opérationnel."
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
