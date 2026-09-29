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
      capabilities: 'Services & Solutions', 
      industries: 'Industries', 
      insights: 'How We Work',
      firm: 'Why Oakivo', 
      contact: 'Discovery Call', 
      careers: 'Careers',
      booking: 'Schedule Discovery',
      compliance: 'Security & Compliance',
      grader: 'Readiness Grader',
      privacy: 'Privacy Policy',
      solutions: 'Solutions',
      locations: 'Locations',
      research: 'Insights'
    },
    trust: {
      soc2: "SOC 2 Type II Certified",
      iso27001: "ISO 27001 Compliant",
      pipeda: "PIPEDA Data Residency",
      bill_c26: "Bill C-26 (CCSPA) Ready",
      law25: "Law 25 (Quebec) Aligned",
      aws: "AWS Advanced Partner",
      k8s: "Kubernetes Certified (KCSP)",
      terraform: "HashiCorp Terraform Certified"
    },
    common: {
      step: "STEP",
      cta_book_audit: "Schedule Discovery (30 Min)",
      cta_audit: "Schedule 30-Min Discovery",
      cta_blueprint: "Get Your Growth Blueprint",
      cta_explore_arsenal: "Explore Solutions",
      cta_meet: "Meet Our Senior Team",
      cta_mobile_sticky: "Schedule Discovery",
      cta_schedule: "Schedule 30-Min Discovery",
      submitting: "Submitting Request...",
      success: "Discovery Request Submitted!",
      guarantee: "100% Bilingual (EN/FR) • Direct Founder Access • Dieppe, NB Headquarters",
      no_disruption: "Zero Disruption to Daily Operations",
      regional_focus: "Atlantic Canada Digital Partner",
      regional_sub: "Dieppe / Moncton • Halifax • Charlottetown • St. John's"
    },
    hero: {
      badge: "Modern ERP • Workflow Automation • Cloud Cybersecurity • Atlantic Canada",
      headline_main: "Smart Automation. Unified ERP.",
      headline_accent: "Enterprise Cybersecurity.",
      subtitle: "We modernize, automate, and secure growing Canadian businesses—from modern ERP operations and hands-free workflow automation to continuous cloud cybersecurity and compliance peace of mind.",
      cta: "Schedule 30-Minute Automation & Discovery Session",
      secondary_cta: "Explore Services & Solutions",
      guarantee: "100% Bilingual (EN/FR) • Direct Founder Access • Dieppe, NB Headquarters",
      video_tag: "HIGH-TOUCH DIGITAL TRANSFORMATION",
      video_desc: "Modern ERP operations, resilient workflow automations, and enterprise-grade cloud security tailored for Canadian businesses."
    },
    problem: {
      badge: "Common Operational Hurdles",
      title_main: "Disconnected Spreadsheets, Manual Toil, and Costly ERP Headaches.",
      title_accent: "We Solve All Three.",
      subtitle: "Growing companies in Atlantic Canada hit painful plateaus when business operations are trapped in manual double-entry, legacy software, or impersonal consulting retainers.",
      point1_title: "Siloed Data & Outgrown Spreadsheets",
      point1_desc: "Teams waste dozens of hours every week re-entering orders, customer data, and invoices across disconnected systems, resulting in costly errors and delayed shipments.",
      point1_solution: "We implement unified Odoo ERP solutions that centralize your CRM, sales, inventory, invoicing, and dispatch into a single, intuitive source of truth.",
      point1_stat: "Up to 60% reduction in admin overhead with unified Odoo",
      point2_title: "Slow Revenue Cycles & Cash Flow Leaks",
      point2_desc: "Manual quotes, slow invoice generation, and disconnected dispatch slow down your billing cycle and leave hard-earned money on the table.",
      point2_solution: "We build automated order-to-cash pipelines that trigger instant invoicing, payment reminders, and inventory reconciliation the moment orders are approved.",
      point2_stat: "Accelerated cycle-to-cash & zero lost orders",
      point3_title: "Compliance & Security Anxiety",
      point3_desc: "Enterprise clients, cyber insurers, and regulators require strict SOC 2, PIPEDA, and Law 25 compliance—terrifying business owners who fear endless paperwork.",
      point3_solution: "We engineer continuous compliance guardrails and Canadian cloud sovereignty directly into your workflows, making audits effortless and automatic.",
      point3_stat: "Continuous audit readiness & zero compliance panic"
    },
    arsenal: {
      badge: "The 4 Core Growth Pillars",
      title_main: "Digital Velocity. ",
      title_accent: "Built with Enterprise Rigor.",
      subtitle: "Four modular pillars designed to modernize your operations, automate repetitive toil, accelerate revenue, and guarantee total peace of mind.",
      pillar1_title: "Odoo ERP & Digital Transformation",
      pillar1_headline: "Replace Disjointed Systems with One Unified Business Engine.",
      pillar1_desc: "Outgrown your spreadsheets or legacy software? We deliver tailored Odoo ERP implementations (CRM, sales, inventory, accounting, and dispatch) customized to your exact operations without multi-million dollar bloat.",
      pillar1_feature1: "Custom Odoo ERP implementation, migration & module development.",
      pillar1_feature2: "Seamless integration with Canadian banks, shipping APIs, and payment gateways.",
      pillar1_feature3: "Direct founder guidance, team training, and zero daily operational downtime.",
      pillar1_tag: "Odoo ERP / Digital Transformation",

      pillar2_title: "Workflow & Revenue Automation",
      pillar2_headline: "Turn Manual Hand-Offs into Hands-Free Revenue Boosters.",
      pillar2_desc: "Eliminate manual double-entry, billing delays, and lost orders. We build deterministic, self-healing automated workflows that sync sales, orders, invoices, and dispatch across your entire stack.",
      pillar2_feature1: "Automated quote-to-cash and instant invoice reconciliation pipelines.",
      pillar2_feature2: "Real-time inventory synchronization across warehouses and sales channels.",
      pillar2_feature3: "Automated dispatch logging and instant client status notifications.",
      pillar2_tag: "Workflow Automation / Cash-Flow Boost",

      pillar3_title: "Cloud Architecture & DevOps Modernization",
      pillar3_headline: "Resilient Cloud Infrastructure Built for Scale.",
      pillar3_desc: "Stop suffering from server crashes, slow deployments, and messy configurations. We architect scalable cloud environments on AWS and Azure with automated CI/CD pipelines that let your team ship features rapidly.",
      pillar3_feature1: "Multi-cloud architecture and migration strictly within Canadian sovereign regions.",
      pillar3_feature2: "Automated CI/CD pipelines (GitHub Actions, GitLab) for zero-downtime releases.",
      pillar3_feature3: "Infrastructure-as-Code (Terraform / OpenTofu) with automated drift remediation.",
      pillar3_tag: "Cloud Architecture / DevOps",

      pillar4_title: "Painless Compliance & Security Assurance",
      pillar4_headline: "Enterprise-Grade Peace of Mind Without the Bureaucracy.",
      pillar4_desc: "Win larger enterprise contracts and satisfy cyber insurance requirements without fear. We engineer automated security guardrails that continuously validate your posture against SOC 2, PIPEDA, and Law 25.",
      pillar4_feature1: "Automated Cloud Security Posture Management (CSPM) with 24/7 continuous evidence.",
      pillar4_feature2: "Zero Trust access control and automated credential de-provisioning.",
      pillar4_feature3: "Canadian data residency guarantees (AWS ca-central-1, Azure Canada).",
      pillar4_tag: "SOC 2 / PIPEDA / Law 25"
    },
    steps: {
      badge: "How We Work",
      title_main: "From Friction to Flow in ",
      title_accent: "3 Pragmatic Steps.",
      subtitle: "No multi-month slide deck phases. No offshore ticket queues. Just high-touch engineering and measurable results.",
      step1_num: "1",
      step1_title: "Step 1: 30-Minute Discovery & Blueprint",
      step1_time: "Days 1–5",
      step1_desc: "We evaluate your operations, software bottlenecks, and growth goals in plain English. You receive a clear, actionable Digital Growth Blueprint with estimated ROI - not an impenetrable 200-page jargon PDF.",
      step2_num: "2",
      step2_title: "Step 2: Agile Sandbox Build & Integration",
      step2_time: "Weeks 2–4",
      step2_desc: "In an isolated staging sandbox, our engineers configure your Odoo ERP, workflow automations, and cloud pipelines. We test every workflow thoroughly before going live with zero disruption to daily business.",
      step3_num: "3",
      step3_title: "Step 3: Launch, Team Training & Local Support",
      step3_time: "Ongoing",
      step3_desc: "We train your staff, execute seamless cutovers, and provide direct, senior bilingual support in Atlantic Standard Time. As your business grows, your systems scale smoothly alongside you."
    },
    local_wedge: {
      badge: "The Atlantic Canada Boutique Advantage",
      title: "High-Touch Partnership with Senior Founders in Your Time Zone.",
      p1: "When an operational bottleneck threatens a major shipment or an invoice fails to sync, you don't need a tier-1 ticket queue from a faceless multi-national vendor in Toronto or overseas.",
      p2: "Headquartered in Dieppe, New Brunswick, Oakivo Solutions provides fully bilingual (English & French), founder-level partnership across Greater Moncton, Nova Scotia, PEI, and Newfoundland.",
      p3: "We combine the technical depth of top-tier consulting firms with the direct accountability, warmth, and responsiveness of a dedicated local partner."
    },
    outcomes: {
      badge: "Measurable Impact",
      title_main: "Engineered for Resilience. ",
      title_accent: "Proven in Production.",
      metric1_val: "0 Min",
      metric1_title: "Audit Preparation Panic",
      metric1_desc: "Continuous automated compliance evidence generation replaces chaotic manual spreadsheet gathering for SOC 2 and PIPEDA.",
      metric2_val: "2x",
      metric2_title: "Faster Safe Deployments",
      metric2_desc: "Security automated into CI/CD pipelines eliminates weeks of manual security gatekeeper delays.",
      metric3_val: "100%",
      metric3_title: "Bilingual Atlantic Engineering",
      metric3_desc: "Direct access to senior DevSecOps architects based in Dieppe, NB with zero offshore ticket queues.",
      proof_desc: "Oakivo engineers and maintains production cloud environments running multi-region Kubernetes clusters, automated compliance gates, and zero-trust IAM meshes.",
      proof_pillar1_title: "Automated Policy-as-Code",
      proof_pillar1_desc: "Deterministic OPA/Kyverno guardrails enforcing security policies before commits merge.",
      proof_pillar2_title: "Zero-Downtime Pipeline Cutover",
      proof_pillar2_desc: "Staged sandbox testing ensuring zero production interruption during security tool integration.",
      proof_pillar3_title: "Machine-Speed SRE Remediation",
      proof_pillar3_desc: "Automated event-driven runbooks that quarantine anomalies and rotate keys in milliseconds.",
      security_title: "Enterprise Compliance & Architectural Standards",
      security1_title: "Zero Trust Identity & Encryption",
      security1_desc: "TLS 1.3 in-transit, 256-Bit AES at rest, and tokenized short-lived OAuth 2.0 / mTLS credentials.",
      security2_title: "Automated Compliance Engines",
      security2_desc: "Continuous posture evaluation against PIPEDA, SOC 2 Type II, ISO 27001, and HIPAA benchmarks.",
      security3_title: "Canadian Data Sovereignty",
      security3_desc: "Architected strictly within Canadian sovereign cloud regions (AWS ca-central-1, Azure Canada Central)."
    },
    landing: {
      hero_headline: "Smart Automation. Unified ERP. Enterprise Cybersecurity.",
      hero_subheadline: "We modernize, automate, and secure growing Canadian businesses—from modern ERP operations and hands-free workflow automation to continuous cloud cybersecurity. No corporate consulting overhead. No junior hand-offs. Just direct senior partner accountability in Atlantic Standard Time.",
      strategic_headline: "The Agile Boutique Advantage",
      strategic_body: "Growing businesses in Atlantic Canada deserve better than impersonal mega-consultancies with 6-month slide decks or basic break-fix IT shops. We combine deep engineering muscle with direct founder accountability: unifying your operations with modern ERP, automating tedious workflows, boosting cash flow, and locking down cloud security and compliance from day one.",
      capabilities_headline: "Four Pillars of Digital Growth",
      cap1_title: "Modern ERP & Unified Operations",
      cap1_body: "Replace disjointed spreadsheets and legacy software with a single source of truth for CRM, sales, inventory, invoicing, and fulfillment.",
      cap2_title: "Workflow & Revenue Automation",
      cap2_body: "Automate quote-to-cash, inventory sync, and billing pipelines to eliminate manual double-entry and plug revenue leaks.",
      cap3_title: "Cloud Infrastructure & DevSecOps",
      cap3_body: "Scalable, resilient Canadian cloud infrastructure (AWS/Azure) with automated CI/CD release guardrails and 99.99% uptime.",
      cap4_title: "Cyber Security & Automated Compliance",
      cap4_body: "Continuous cloud security posture (CSPM), Zero Trust access, and automated evidence archives for PIPEDA, Law 25, and SOC 2 without operational friction.",
      methodology_headline: "How We Work",
      step1_title: "Discovery & Blueprint (Days 1–5)",
      step1_body: "A comprehensive 30-minute evaluation of your operational bottlenecks, software stack, security posture, and compliance goals followed by a clear, high-ROI execution blueprint.",
      step2_title: "Agile Implementation & Automation (Weeks 2–4)",
      step2_body: "Rapid deployment of modern ERP modules, automated workflow bridges, and hardened cloud guardrails in sandbox environments with zero disruption to live operations.",
      step3_title: "Continuous Local Support & Evolution (Ongoing)",
      step3_body: "Direct access to our senior bilingual team in Atlantic Standard Time for continuous optimization, proactive monitoring, and feature rollouts.",
    },
    drawer: {
      tag: "Oakivo Discovery & Growth Blueprint",
      title: "Schedule Your 30-Minute Discovery Session",
      desc: "No high-pressure sales pitch. One of our founders or senior engineers will evaluate your operational bottlenecks, modern ERP needs, workflow automations, or cybersecurity goals and outline a high-ROI blueprint.",
      name_label: "Your Name *",
      name_placeholder: "e.g. David Cormier",
      email_label: "Work Email *",
      email_placeholder: "e.g. david@enterprise.ca",
      company_label: "Company / Organization *",
      company_placeholder: "e.g. Maritime Logistics Inc.",
      focus_label: "Primary Focus Area *",
      focus_opt1: "Modern ERP Implementation & Migration",
      focus_opt2: "Workflow & Revenue Automation (Eliminate Manual Toil)",
      focus_opt3: "Cloud Infrastructure Modernization & DevSecOps",
      focus_opt4: "Cyber Security & Compliance (SOC 2, PIPEDA, Law 25)",
      focus_opt5: "General Digital Transformation Advisory",
      bottleneck_label: "What is your primary operational, software, or automation challenge? *",
      bottleneck_placeholder: "e.g. Disconnected software, manual invoice processing, upcoming audit, scaling Odoo ERP...",
      submit_btn: "Get Your Custom Growth Blueprint (30 Min)",
      submitting: "Scheduling Discovery Session...",
      success_title: "Discovery Session Request Received",
      success_desc: "A senior team member from our Dieppe office will review your requirements and reach out within 24 hours with schedule options.",
      success_close: "Close & Return to Site",
      footer_badge: "Agile Digital Transformation & ERP",
      footer_region: "Dieppe, New Brunswick Headquarters"
    },
    footer: {
      card_tag: "30-Minute Discovery Session",
      card_title: "Ready to automate workflows and modernize your operations?",
      card_desc: "Schedule a 30-minute discovery session with our senior team in Dieppe. We'll identify your highest-impact automation bottlenecks and outline a practical growth blueprint.",
      cta_audit: "Schedule 30-Minute Discovery Session",
      callout_tag: "30-Minute Discovery Session",
      callout_title: "Ready to automate workflows and modernize your operations?",
      callout_desc: "Schedule a 30-minute discovery session with our senior team in Dieppe. We'll identify your highest-impact automation bottlenecks and outline a practical growth blueprint.",
      callout_btn: "Schedule 30-Minute Discovery Session",
      brand_desc: "Oakivo Solutions Inc. is a high-touch digital transformation, Odoo ERP, workflow automation, and cloud engineering partner based in Dieppe, New Brunswick - empowering businesses across Atlantic Canada.",
      badge_title: "Dieppe, NB & Atlantic Canada",
      badge_desc: "Bilingual, senior-level engineering and ERP implementation for organizations across New Brunswick, Nova Scotia, PEI, and Newfoundland.",
      focus_tag: "Atlantic Canada Digital Partner",
      focus_desc: "Bilingual, senior-level engineering and ERP implementation for organizations across New Brunswick, Nova Scotia, PEI, and Newfoundland.",
      nav_title: "Navigation",
      nav_header: "Navigation",
      solutions_title: "Solutions Arsenal",
      solutions_header: "Solutions Arsenal",
      service_area: "Service Area",
      area_header: "Regional Presence",
      rights: "2026 Oakivo Solutions Inc. All rights reserved.",
      copyright: "© 2026 Oakivo Solutions Inc. All rights reserved.",
      privacy: "Privacy Policy",
      compliance: "Security & Compliance"
    },
    chatbot: {
      greeting: "Welcome to Oakivo Solutions! We help growing Canadian businesses unify operations with modern ERP, automate quote-to-cash workflows, deploy resilient cloud architectures, and ensure continuous cybersecurity & compliance. How can we assist you today?",
      placeholder: "Ask about modern ERP, workflow automation, cloud security, or discovery...",
      quick_prompts: [
        "Schedule 30-Min Discovery Session",
        "Modern ERP & Operations",
        "Workflow & Revenue Automation",
        "Cloud Architecture & DevOps",
        "Cybersecurity & Compliance (SOC 2, PIPEDA)"
      ],
      audit_btn: "Schedule 30-Min Discovery"
    },
    verticals: {
      hero_title: "Industry Modernization & Automation.",
      hero_subtitle: "Tailored Odoo ERP, workflow automation, and cloud security engineering built for Atlantic Canadian industries.",
      cards: [
        { title: "Logistics & Supply Chain", desc: "Unify warehouse inventory, dispatch APIs, and telematics in Odoo ERP with automated quote-to-cash pipelines.", impact: "Zero lost orders, 60% faster billing, and 99.99% system uptime." },
        { title: "Healthcare & MedTech", desc: "Automate PIPEDA & Law 25 compliance guardrails across patient records, digital scheduling, and sovereign cloud storage.", impact: "Continuous 24/7 audit readiness with cryptographically signed logs." },
        { title: "Retail & E-Commerce", desc: "Connect POS terminals, Shopify, warehouse stock, and automated invoicing under one real-time Odoo engine.", impact: "Automated inventory sync and zero double-entry errors." },
        { title: "Financial & Professional Services", desc: "Automate document billing, CRM pipeline tracking, and SOC 2 Type II compliance audit trails.", impact: "Accelerated cycle-to-cash and audit readiness in weeks." },
        { title: "Manufacturing & Industrial", desc: "Integrate bills of materials (BOM), production scheduling, and inventory in Odoo with automated floor dispatch.", impact: "Eliminate production delays and optimize raw material purchasing." },
        { title: "Public Sector & Crown Corps", desc: "Canadian data sovereignty enforcement, bilingual documentation, and hardened multi-cloud architecture.", impact: "Full adherence to Canadian Protected B cloud security controls." }
      ]
    },
    services: {
      hero_label: "Our Core Services",
      hero_title: "Odoo ERP, Workflow Automation & Digital Resilience.",
      service1_title: "Odoo ERP Implementation & Digital Transformation",
      service2_title: "Workflow & Revenue Automation",
      service3_title: "Cloud Architecture & DevOps Modernization",
      service4_title: "Painless Compliance & Security Assurance",
      list: [
        { title: "Odoo ERP & Digital Transformation", desc: "Replace disconnected spreadsheets and legacy software with a unified Odoo ERP for CRM, sales, inventory, invoicing, and dispatch.", insight: "Single source of truth with up to 60% less administrative overhead.", magnet: "erp" },
        { title: "Workflow & Revenue Automation", desc: "Automate quote-to-cash handoffs, instant invoice reconciliation, and inventory sync to plug revenue leaks.", insight: "Accelerated cash flow and zero double-entry errors.", magnet: "automation" },
        { title: "Cloud Architecture & DevOps", desc: "Scalable AWS and Azure infrastructure with automated CI/CD deployment pipelines and Canadian data sovereignty.", insight: "2x faster release velocity with 99.99% cloud uptime.", magnet: "devsecops" },
        { title: "Painless Compliance & Security", desc: "Continuous automated compliance evidence for SOC 2, PIPEDA, and Law 25 without distracting your core business.", insight: "24/7 continuous audit proof with zero pre-audit panic.", magnet: "cspm" }
      ],
      cta_title: "Ready to eliminate bottlenecks and automate your growth?",
      cta_text: "Connect with our founders and senior engineers for a 30-minute discovery review of your business operations.",
      cta_btn: "Schedule 30-Minute Discovery Session"
    },
    caseStudies: {
      hero_title: "Case Studies & Production Outcomes",
      hero_subtitle: "How Atlantic Canadian organizations transformed manual bottlenecks into automated competitive advantages.",
      cases: [
        { id: '1', title: "Atlantic Cold Chain Logistics Group", impact: "60% Faster Billing Cycle", quote: "Oakivo unified our multi-hub dispatch in Odoo and automated our invoice reconciliation. We eliminated billing delays and passed our enterprise audits with zero findings.", author: "VP of Operations", problem: "Disconnected dispatch software, manual invoicing delays, and unmonitored cloud access across four Atlantic distribution centers.", solution: "Odoo ERP Implementation & Automated Workflow Pipelines." },
        { id: '2', title: "Regional Health-Tech Provider", impact: "SOC 2 Type II in 6 Weeks", quote: "Instead of drowning in spreadsheets, Oakivo's automation engine continuously generated our compliance proof. Our enterprise contracts closed months ahead of schedule.", author: "Chief Technology Officer", problem: "Manual compliance audits stalled enterprise hospital contracts.", solution: "Automated Compliance & DevSecOps Pipeline Integration." }
      ]
    },
    about: {
      hero_title: "The Agile Boutique Advantage: Built for Growing Canadian Businesses.",
      hero_subtitle: "Headquartered in Dieppe, New Brunswick, we combine the engineering depth of top-tier consulting firms with the direct founder accountability, warmth, and agility of a dedicated local partner.",
      standard_title: "The Oakivo Advantage: Why Boutique Wins",
      standard_p1: "We believe growing companies shouldn't have to choose between impersonal global consultancies that drown you in slide decks and local IT shops that can't write code or deploy modern ERPs.",
      standard_p2: "Oakivo delivers the sweet spot: senior founders working directly on your projects, rapid prototypes in weeks instead of months, and end-to-end automation that delivers real, bottom-line ROI.",
      standard_p3: "Based in Dieppe, our bilingual team is fully accountable to our Atlantic community, delivering world-class Odoo ERP, workflow automation, and continuous compliance assurance.",
      leadership_title: "Engineering Leadership",
      experts_section_badge: "Dieppe, NB Engineering Hub",
      experts_section_title: "Meet Our Senior Founders & Engineers",
      experts_section_subtitle: "Direct access to senior cloud security architects, DevSecOps engineers, and business analysts based in Dieppe, New Brunswick. Bilingual support (EN/FR) with Atlantic Standard Time responsiveness and zero offshore queues.",
      experts_badge_location: "Dieppe, NB (AST)",
      experts_bilingual_tag: "Dieppe, NB Hub",
      team: [
        { 
          name: "Ahmed Bello, M.Sc.", 
          role: "Principal Cloud Security Architect & Founder", 
          bio: "12+ years designing zero-trust cloud architectures, least-privilege IAM controls, and secure multi-cloud environments for Canadian enterprises.", 
          credentials: ["M.Sc.", "CISSP", "AWS Security Specialist", "CKA (Kubernetes)"], 
          location: "Dieppe, NB",
          headshot: "/team/ahmed-bello.jpg?v=4",
          linkedin: "https://www.linkedin.com/company/oakivo" 
        },
        { 
          name: "Funmilayo Akinsiku, P.Eng.", 
          role: "DevSecOps & Pipeline Automation Engineer", 
          bio: "Specializes in automated container vulnerability scanning, declarative Kubernetes admission guardrails, and Infrastructure-as-Code modules using Terraform.", 
          credentials: ["P.Eng. (Alberta)", "CKS (Kubernetes Security)", "Terraform Associate"], 
          location: "Calgary, AB",
          headshot: "/team/funmilayo-akinsiku.jpg",
          linkedin: "https://www.linkedin.com/company/oakivo" 
        },
        { 
          name: "Fawaz Bello", 
          role: "Associate Cloud & DevSecOps Specialist", 
          bio: "Emerging cloud professional assisting with Prometheus and Grafana telemetry, CI/CD test automation, and proactive infrastructure operations.", 
          credentials: ["AWS Certified", "Linux Foundation Pathway", "Kubernetes Fundamentals"], 
          location: "Dieppe, NB",
          headshot: "/team/fawaz-bello.jpg",
          linkedin: "https://www.linkedin.com/company/oakivo" 
        },
        { 
          name: "Taiwo Owoeye", 
          role: "Business Analyst", 
          bio: "Business analyst specializing in requirements elicitation, current-state and future-state process mapping, agile sprint backlogs, and stakeholder alignment.", 
          credentials: ["Business Analysis (BA)", "Process Modeling", "Agile & Scrum", "Requirements Elicitation"], 
          location: "Dieppe, NB",
          headshot: "/team/taiwo-owoeye.jpg",
          linkedin: "https://www.linkedin.com/company/oakivo" 
        }
      ]
    },
    brochure: {
      download_btn: "Download PDF Brochure",
      downloading: "Generating PDF...",
      success: "Brochure downloaded successfully",
      error: "Failed to generate PDF. Please try again.",
      title: "Oakivo Solutions Inc. - Enterprise DevSecOps & Cloud Security",
      subtitle: "Service Offerings, Architecture Methodology & Atlantic Canada Case Studies"
    },
    methodology_timeline: {
      badge: "Interactive Client Journey",
      title_main: "Predictable Execution: ",
      title_accent: "The 3-Step Client Journey",
      subtitle: "Hover over each phase to inspect technical deliverables, architectural guardrails, and guaranteed business outcomes.",
      step1: {
        num: "01",
        name: "Security & Architecture Audit",
        duration: "Days 1–5",
        short_desc: "Diagnostic scan of cloud assets, CI/CD pipelines, ERP access topologies, and compliance gaps.",
        deliverables_title: "Key Deliverables & Artifacts:",
        deliverables: [
          "Prioritized Threat & Remediation Blueprint with CVE scoring",
          "Multi-cloud topology & IAM least-privilege matrix review",
          "Automated SOC 2 / PIPEDA compliance gap matrix",
          "Zero-trust network segmentation plan"
        ],
        badge: "Discovery & Scoring",
        outcome: "Clear risk scoring without confusing 200-page jargon PDFs."
      },
      step2: {
        num: "02",
        name: "Automated Pipeline & Sandbox Deployment",
        duration: "Weeks 2–4",
        short_desc: "Isolated staging implementation of CI/CD security gates, OPA Policy-as-Code, and automated guardrails.",
        deliverables_title: "Key Deliverables & Artifacts:",
        deliverables: [
          "Automated SAST, DAST & SBOM pipeline gates in GitHub Actions/GitLab",
          "Immutable Infrastructure-as-Code modules (Terraform / OpenTofu)",
          "Container vulnerability gating & Cosign image signing",
          "Zero-Downtime deployment cutover and team runbooks"
        ],
        badge: "Shift-Left Implementation",
        outcome: "Zero disruption to existing developer velocity or live workloads."
      },
      step3: {
        num: "03",
        name: "Continuous Managed DevSecOps & SRE Oversight",
        duration: "Ongoing",
        short_desc: "Continuous automated compliance monitoring, autonomous SRE self-healing runbooks, and direct AST support.",
        deliverables_title: "Key Deliverables & Artifacts:",
        deliverables: [
          "24/7/365 Continuous Cloud Security Posture Management (CSPM)",
          "Autonomous event-driven threat isolation and key rotation",
          "Continuous cryptographic audit evidence archives",
          "Direct AST senior DevSecOps architect support from Dieppe, NB"
        ],
        badge: "Autonomous Defense",
        outcome: "Audits become push-button exercises; infrastructure self-heals at machine speed."
      }
    },
    careers: {
      hero_title: "Join the Oakivo Engineering Team.",
      hero_subtitle: "We are building the elite DevSecOps and cloud security automation team in Atlantic Canada.",
      values: [
        { title: "Precision Engineering", desc: "We write clean, automated code that replaces manual toil with deterministic guardrails." },
        { title: "Zero Bureaucracy", desc: "No red tape or endless slide decks. We deliver functional, production-ready systems." },
        { title: "Atlantic Authority", desc: "Proudly based in Dieppe, NB, serving as the premier cybersecurity partner for our region." },
        { title: "Continuous Learning", desc: "Mastering bleeding-edge cloud technologies, Kubernetes internals, and SRE resilience." }
      ],
      apply_title: "Join Our Engineering Ranks",
      apply_text: "Are you a DevSecOps engineer, cloud architect, or security automation specialist looking to do world-class work in Atlantic Canada?",
      apply_btn: "Submit Engineering Profile",
      email_link: "careers@oakivo.com"
    },
    contact: {
      success_title: "Security Audit Request Confirmed.",
      success_message: "A senior DevSecOps architect from our Dieppe office will review your infrastructure details and contact you within 24 hours.",
      form_title: "Request 30-Minute Security Architecture Audit",
      label_name: "Your Name",
      label_email: "Work Email",
      label_q1: "What is your primary security or pipeline challenge?",
      label_q2: "What is your current cloud or infrastructure stack?",
      label_q3: "What is your target timeline for resolution?",
      placeholder_q1: "e.g. Upcoming SOC 2 audit, slow CI/CD deployments, securing ERP access...",
      placeholder_q2: "e.g. AWS, Azure, GCP, Kubernetes, GitHub Actions, SAP/Odoo...",
      placeholder_q3: "e.g. Next 30 days, immediate, Q4 review...",
      submit_btn: "Request 30-Minute Security Architecture Audit"
    },
    
    risk_calculator: {
      title: "Risk Assessment Calculator",
      subtitle: "Evaluate your DevSecOps maturity and infrastructure posture in 60 seconds.",
      questions: [
        {
          id: 1,
          category: "Infrastructure Deployment",
          title: "How do you currently provision and manage your cloud infrastructure?",
          options: [
            { id: '1a', label: "Manually via Cloud Provider Consoles (AWS/Azure GUI)" },
            { id: '1b', label: "Mix of manual processes and basic scripts" },
            { id: '1c', label: "Infrastructure-as-Code (Terraform, CloudFormation)" },
            { id: '1d', label: "IaC with integrated Policy-as-Code (OPA, Checkov)" }
          ]
        },
        {
          id: 2,
          category: "Access & Identity",
          title: "How is access to critical production workloads governed?",
          options: [
            { id: '2a', label: "Static passwords and shared credentials" },
            { id: '2b', label: "Standard MFA on primary accounts" },
            { id: '2c', label: "SSO with Role-Based Access Control (RBAC)" },
            { id: '2d', label: "Context-aware Zero-Trust (Device posture, mTLS)" }
          ]
        },
        {
          id: 3,
          category: "Threat Detection",
          title: "What is your primary mechanism for identifying security breaches?",
          options: [
            { id: '3a', label: "Reactive (Customer reports, apparent downtime)" },
            { id: '3b', label: "Manual log reviews and basic alerts" },
            { id: '3c', label: "Centralized SIEM with automated anomaly detection" },
            { id: '3d', label: "Kernel-level eBPF monitoring and AI-driven SOAR" }
          ]
        },
        {
          id: 4,
          category: "Compliance & Auditing",
          title: "How do you maintain compliance with regulatory frameworks (SOC 2, ISO 27001)?",
          options: [
            { id: '4a', label: "We do not formally track compliance" },
            { id: '4b', label: "Manual spreadsheet tracking and periodic audits" },
            { id: '4c', label: "Automated evidence collection (e.g., Vanta, Drata)" },
            { id: '4d', label: "Continuous compliance mapped directly to IaC pipelines" }
          ]
        }
      ],
      results: {
        score: "Risk Maturity Score",
        level: "Maturity Level:",
        critical: "Critical Risk Exposure",
        moderate: "Moderate Maturity",
        advanced: "Advanced DevSecOps",
        request_audit: "Request Comprehensive Architecture Audit",
        submit: "Submit Assessment"
      }
    },
    solutions_in_action: {
      badge: "Automation Visualized",
      title: "Solutions in Action",
      subtitle: "Don't just read about Zero-Trust. Watch our engineering architectures dynamically detect, isolate, and remediate threats in high-fidelity environments.",
      demo: "Architecture Demo",
      videos: [
        {
          id: "cspm",
          title: "Cloud Security (CSPM)",
          description: "Watch how our automated posture management instantly detects and remediates a misconfigured S3 bucket in real-time."
        },
        {
          id: "devsecops",
          title: "DevSecOps Pipelines",
          description: "See Policy-as-Code in action: A terraform deployment is automatically blocked pre-commit due to an exposed IAM role."
        },
        {
          id: "iam",
          title: "Zero Trust IAM",
          description: "Experience cryptographic identity verification blocking lateral movement from a compromised endpoint."
        },
        {
          id: "sre",
          title: "SRE Threat Remediation",
          description: "Watch our eBPF sensors detect zero-day ransomware behavior and autonomously sever the network connection."
        }
      ]
    },
    insights: {
      title: "Security Research & Insights",
      subtitle: "Authoritative analysis on zero-trust architecture, DevSecOps automation, and cloud compliance for Atlantic Canadian enterprises.",
      search_placeholder: "Search insights, architecture patterns, and compliance...",
      no_results: "No insights found",
      no_results_desc: "Adjust your search query to explore our research.",
      read_time: "min read",
      author: "By",
      back: "Back to all insights",
      read_article: "Read Article"
    },

    booking: {      hero_title: "30-Minute Security Architecture Audit.",
      hero_subtitle: "Schedule a focused, senior-level diagnostic review of your cloud infrastructure, CI/CD pipelines, and compliance readiness.",
      success_title: "Security Audit Scheduled.",
      success_message: "A calendar invitation and pre-audit questionnaire have been sent to your work email."
    },
    caps: {
      badge: "Our Expertise",
      title: "Core Capabilities",
      subtitle: "Foundational DevSecOps architecture engineered for scale, compliance, and velocity. We deliver enterprise-grade security without compromising deployment speed.",
      cta: "Explore Methodology",
      cspm_title: "Cloud Security Posture (CSPM)",
      cspm_desc: "Automated cloud misconfiguration detection across AWS, Azure, and GCP. Real-time drift detection for Infrastructure-as-Code with continuous SOC 2 and PIPEDA mapping.",
      cspm_f1: "Real-time drift detection",
      cspm_f2: "Continuous compliance mapping",
      cspm_f3: "Push-button audit evidence",
      ci_title: "DevSecOps Pipeline Engineering",
      ci_desc: "Shift-left CI/CD security automation. Build fast and secure every commit with automated SAST, DAST, and container scanning integrated directly into GitHub Actions or GitLab.",
      ci_f1: "Automated SAST & DAST",
      ci_f2: "Container image scanning",
      ci_f3: "CI/CD pipeline hardening",
      iam_title: "Zero-Trust Architecture",
      iam_desc: "Identity-first security perimeters. We replace legacy VPNs and static credentials with short-lived tokens, mTLS service meshes, and strict least-privilege IAM policies.",
      iam_f1: "Identity-first networking",
      iam_f2: "mTLS service meshes",
      iam_f3: "Just-in-time (JIT) access",
      odoo_title: "Odoo Implementation & Digital Transformation",
      odoo_desc: "Comprehensive business management through Odoo ERP integration. We streamline workflows, automate complex processes, and secure enterprise data for sustainable growth.",
      odoo_f1: "Custom Odoo integration",
      odoo_f2: "Process automation",
      odoo_f3: "ERP security hardening"
    },
    bento: {
      mod_title: "Stop Bleeding Engineering Hours to Manual Workflows.",
      mod_subtitle: "Legacy System Modernization & Custom API Automation",
      mod_desc: "Connect legacy ERPs to modern cloud applications with custom API bridges - no risky, multi-year rebuilds required.",
      mod_impact: "Risky Multi-Year Monolith Rebuilds Required",
      mod_f1: "Custom API bridges connecting legacy ERPs to modern cloud tools",
      mod_f2: "Automated workflow pipelines eliminating manual data entry",
      mod_f3: "Incremental modernization without operational downtime",
      mod_f4: "Zero-trust data validation across all integration endpoints",
      cloud_title: "Migrate to the Cloud Without the $50k Surprise Monthly Bill.",
      cloud_subtitle: "Predictable Cloud Migration & Fractional SRE",
      cloud_desc: "Get enterprise uptime, Kubernetes orchestration, and locked-in monthly spend hosted strictly on Canadian soil.",
      cloud_impact: "Average Monthly Cloud Spend Reduction",
      cloud_f1: "Locked-in monthly spend hosted strictly on Canadian soil",
      cloud_f2: "Kubernetes container orchestration & autoscaling",
      cloud_f3: "99.99% uptime guarantee with automated failover",
      cloud_f4: "Fractional SRE oversight and continuous infrastructure tuning",
      sec_title: "Ironclad Data Sovereignty. 100% PIPEDA-Compliant, Zero Breach Anxiety.",
      sec_subtitle: "PIPEDA-Compliant Cloud Architecture & Zero-Trust Security",
      sec_desc: "Embed automated vulnerability scanning and zero-trust access directly into your deployment pipeline.",
      sec_impact: "PIPEDA Compliance & Zero Breach Exposure",
      sec_f1: "Automated vulnerability scanning in CI/CD deployment pipelines",
      sec_f2: "Zero-trust access control and micro-segmentation",
      sec_f3: "100% PIPEDA & Law 25 compliance on Canadian nodes",
      sec_f4: "24/7 automated security threat monitoring & auditing",
      odoo_title: "Unify Your Business with Enterprise-Grade Odoo Implementation.",
      odoo_subtitle: "Odoo ERP Integration & Digital Transformation",
      odoo_desc: "Streamline workflows and scale efficiently with a comprehensive Odoo ERP tailored to your operational needs.",
      odoo_impact: "Operational Efficiency & Growth Scalability",
      odoo_f1: "End-to-end Odoo ERP implementation and custom module development",
      odoo_f2: "Seamless data migration from legacy accounting and CRM systems",
      odoo_f3: "Automated inventory, sales, and HR workflows",
      odoo_f4: "Built-in security hardening for enterprise data protection"
    },
    not_found: {
      badge: "HTTP 404 • Boundary Limit",
      title: "Perimeter Boundary Exceeded",
      subtitle: "The requested route or telemetry asset does not exist or has been relocated to an isolated enclave.",
      cta_home: "Return to Safe Harbor (Home)",
      cta_services: "Explore DevSecOps Capabilities",
      cta_compliance: "Canadian Compliance Hub",
      cta_audit: "Schedule Security Architecture Audit"
    },
    compliance_hub: {
      badge: "Canadian Regulatory Architecture",
      title: "Canadian Compliance Frameworks & Cloud Sovereignty",
      subtitle: "Deterministic, policy-driven security architectures engineered specifically for Canadian federally regulated sectors and provincial privacy mandates.",
      cta_schedule: "Schedule Architecture Review",
      cta_audit: "Request Audit Checklist",
      bill_c26_title: "Bill C-26 (CCSPA) Critical Cyber Systems",
      bill_c26_desc: "Mandatory cyber security programs, CSE incident reporting pipelines, and high-risk vendor mitigation for Canadian critical infrastructure.",
      pipeda_title: "PIPEDA & Law 25 Canadian Data Residency",
      pipeda_desc: "Strict domestic sovereign data residency (AWS ca-central-1, Azure Canada), Customer Managed Keys (CMK), and cross-border risk isolation.",
      soc2_title: "SOC 2 Type II Continuous Audit Automation",
      soc2_desc: "Automated Policy-as-Code evidence collection, GitOps compliance gates, and zero-panic audit readiness for Canadian SaaS enterprises."
    }
  },
  fr: {
    nav: { 
      home: 'Accueil', 
      capabilities: 'Services & Solutions', 
      industries: 'Industries', 
      insights: 'Notre Méthode',
      firm: 'Pourquoi Oakivo', 
      contact: 'Session Découverte', 
      careers: 'Carrières',
      booking: 'Planifier Découverte',
      compliance: 'Sécurité & Conformité',
      grader: 'Évaluateur',
      privacy: 'Politique de Confidentialité',
      solutions: 'Solutions',
      locations: 'Emplacements',
      research: 'Aperçus'
    },
    trust: {
      soc2: "Certifié SOC 2 Type II",
      iso27001: "Conforme ISO 27001",
      pipeda: "Résidence des Données LPRPDE",
      bill_c26: "Conforme Loi C-26 (LSPCY)",
      law25: "Conforme Loi 25 (Québec)",
      aws: "Partenaire Avancé AWS",
      k8s: "Certifié Kubernetes (KCSP)",
      terraform: "Certifié HashiCorp Terraform"
    },
    common: {
      step: "ÉTAPE",
      cta_book_audit: "Planifier Découverte (30 min)",
      cta_audit: "Planifier Découverte (30 min)",
      cta_blueprint: "Obtenir Votre Plan de Croissance",
      cta_explore_arsenal: "Explorer Nos Solutions",
      cta_meet: "Rencontrer Notre Équipe Senior",
      cta_mobile_sticky: "Planifier Découverte",
      cta_schedule: "Planifier Découverte (30 min)",
      submitting: "Envoi de la demande...",
      success: "Demande Transmise !",
      guarantee: "100 % Bilingue (FR/EN) • Accès Direct aux Fondateurs • Siège à Dieppe, N.-B.",
      no_disruption: "Zéro Interruption des Opérations Quotidiennes",
      regional_focus: "Partenaire Numérique au Canada Atlantique",
      regional_sub: "Dieppe / Moncton • Halifax • Charlottetown • St. John's"
    },
    hero: {
      badge: "ERP Moderne • Automatisation des Processus • Cybersécurité Cloud • Canada Atlantique",
      headline_main: "Automatisation Intelligente. ERP Unifié.",
      headline_accent: "Cybersécurité Inébranlable.",
      subtitle: "Nous modernisons, automatisons et sécurisons les entreprises canadiennes en pleine croissance — de l'unification ERP aux flux de travail automatisés, avec une cybersécurité infonuagique continue et la conformité intégrée.",
      cta: "Planifier une Session d'Automatisation & Découverte (30 min)",
      secondary_cta: "Explorer Nos Solutions & Services",
      guarantee: "100 % Bilingue (FR/EN) • Accès Direct aux Fondateurs • Siège Social à Dieppe, N.-B.",
      video_tag: "TRANSFORMATION NUMÉRIQUE SUR MESURE",
      video_desc: "ERP moderne unifié, automatisations de flux résilientes et cybersécurité infonuagique d'entreprise taillée pour le Canada atlantique."
    },
    problem: {
      badge: "Obstacles Opérationnels Majeurs",
      title_main: "Tableurs Déconnectés, Tâches Répétitives et ERP Bloquants.",
      title_accent: "Nous Réglons les Trois.",
      subtitle: "Les entreprises en croissance du Canada atlantique plafonnent lorsque leurs opérations dépendent de doubles saisies manuelles, de logiciels obsolètes ou de consultants distants.",
      point1_title: "Données Cloisonnées et Tableurs Dépassés",
      point1_desc: "Vos équipes perdent des heures précieuses à ressaisir commandes, clients et factures sur des logiciels distincts, causant erreurs et retards de livraison.",
      point1_solution: "Nous déployons une solution Odoo ERP unifiée centralisant CRM, ventes, inventaire, facturation et logistique en une source unique et intuitive.",
      point1_stat: "Jusqu'à 60 % de réduction de charge administrative grâce à Odoo unifié",
      point2_title: "Cycles de Facturation Lents et Pertes de Revenus",
      point2_desc: "La lenteur des devis, la facturation différée et la répartition manuelle ralentissent vos encaissements et vous font perdre des opportunités.",
      point2_solution: "Nous concevons des pipelines automatisés qui déclenchent immédiatement facturation, relances et synchronisation d'inventaire dès la confirmation de commande.",
      point2_stat: "Accélération du cycle d'encaissement et zéro commande perdue",
      point3_title: "Anxiété Liée à la Conformité et aux Cyber-Audits",
      point3_desc: "Vos grands comptes, assureurs et autorités exigent une conformité rigoureuse (SOC 2, LPRPDE, Loi 25) qui effraie les dirigeants par sa lourdeur.",
      point3_solution: "Nous intégrons des garde-fous de conformité continue et la souveraineté infonuagique canadienne directement dans vos flux, rendant les audits fluides et automatiques.",
      point3_stat: "Conformité continue 24/7 et zéro panique avant audit"
    },
    arsenal: {
      badge: "Les 4 Piliers de Croissance",
      title_main: "Vélocité Numérique. ",
      title_accent: "Rigueur d'Entreprise.",
      subtitle: "Quatre piliers modulaires conçus pour moderniser vos opérations, automatiser vos tâches répétitives, accélérer vos revenus et garantir une paix d'esprit totale.",
      pillar1_title: "Odoo ERP & Transformation Numérique",
      pillar1_headline: "Remplacez les Systèmes Disparates par un Moteur Unifié.",
      pillar1_desc: "Vos tableurs ou anciens logiciels atteignent leurs limites ? Nous assurons l'implémentation complète d'Odoo ERP (CRM, ventes, stocks, comptabilité, facturation et répartition) sur mesure, sans les coûts exorbitants des géants du secteur.",
      pillar1_feature1: "Implémentation, migration et développement sur mesure de modules Odoo ERP.",
      pillar1_feature2: "Intégration fluide avec banques canadiennes, transporteurs et passerelles de paiement.",
      pillar1_feature3: "Accompagnement direct par les fondateurs, formation d'équipe et zéro arrêt de production.",
      pillar1_tag: "Odoo ERP / Transformation Numérique",

      pillar2_title: "Automatisation des Flux & Accélération des Revenus",
      pillar2_headline: "Transformez les Tâches Manuelles en Accélérateurs de Revenus.",
      pillar2_desc: "Éliminez les doubles saisies, les retards de facturation et les commandes égarées. Nous créons des automatisations résilientes et auto-correctrices qui synchronisent l'ensemble de vos opérations.",
      pillar2_feature1: "Pipelines automatisés devis-facturation et réconciliation comptable instantanée.",
      pillar2_feature2: "Synchronisation des stocks en temps réel entre entrepôts et canaux de vente.",
      pillar2_feature3: "Historique automatisé des expéditions et notifications instantanées aux clients.",
      pillar2_tag: "Automatisation des Flux / Optimisation Financière",

      pillar3_title: "Modernisation Infonuagique & DevOps",
      pillar3_headline: "Infrastructures Infonuagiques Résilientes Taillées pour l'Échelle.",
      pillar3_desc: "Fini les pannes de serveurs et les déploiements laborieux. Nous concevons des environnements infonuagiques évolutifs sur AWS et Azure avec des pipelines CI/CD automatisés permettant à vos équipes d'innover rapidement.",
      pillar3_feature1: "Architecture et migration multi-cloud strictement au sein des régions souveraines canadiennes.",
      pillar3_feature2: "Pipelines CI/CD automatisés (GitHub Actions, GitLab) pour des déploiements sans interruption.",
      pillar3_feature3: "Infrastructure-as-Code (Terraform / OpenTofu) avec correction automatique des dérives.",
      pillar3_tag: "Architecture Cloud / DevOps",

      pillar4_title: "Conformité Simplifiée & Assurance Sécurité",
      pillar4_headline: "Sécurité de Niveau Entreprise sans Fardeau Bureaucratique.",
      pillar4_desc: "Remportez des contrats corporatifs majeurs et répondez aux exigences de cyber-assurance sans stress. Nous automatisons les garde-fous qui valident en continu votre conformité (SOC 2, LPRPDE, Loi 25).",
      pillar4_feature1: "Gestion automatisée de la posture infonuagique (CSPM) avec preuves 24/7.",
      pillar4_feature2: "Contrôle des accès Zéro Confiance et révocation instantanée des identifiants.",
      pillar4_feature3: "Garantie de souveraineté des données canadiennes (AWS ca-central-1, Azure Canada).",
      pillar4_tag: "SOC 2 / LPRPDE / Loi 25"
    },
    steps: {
      badge: "Notre Méthode",
      title_main: "De la Friction à la Fluidité en ",
      title_accent: "3 Étapes Pragmatiques.",
      subtitle: "Aucun mandat de consultation sans fin. Aucune file d'attente à l'étranger. Des résultats concrets et mesurables avec un accompagnement senior de proximité.",
      step1_num: "1",
      step1_title: "Étape 1 : Session Découverte & Plan de Croissance",
      step1_time: "Jours 1 à 5",
      step1_desc: "Nous évaluons vos freins opérationnels, vos outils actuels et vos objectifs d'affaires en langage clair. Vous recevez un plan de croissance numérique concret et chiffré - pas un rapport indigeste de 200 pages.",
      step2_num: "2",
      step2_title: "Étape 2 : Déploiement Agile & Intégration en Bac à Sable",
      step2_time: "Semaines 2 à 4",
      step2_desc: "Dans un environnement isolé, nos ingénieurs configurent votre Odoo ERP, vos automatisations de processus et vos flux cloud. Chaque flux est rigoureusement testé sans perturber vos activités quotidiennes.",
      step3_num: "3",
      step3_title: "Étape 3 : Lancement, Formation d'Équipe & Support Local",
      step3_time: "En Continu",
      step3_desc: "Nous formons votre personnel, assurons une transition fluide et demeurons à vos côtés avec un support senior bilingue dans le fuseau de l'Atlantique (HNA). Vos outils évoluent naturellement avec votre croissance."
    },
    local_wedge: {
      badge: "L'Avantage Boutique au Canada Atlantique",
      title: "Un Partenariat de Proximité avec les Fondateurs dans Votre Fuseau Horaire.",
      p1: "Lorsqu'un blocage opérationnel menace une expédition ou qu'une facture n'est pas synchronisée, vous n'avez pas besoin d'une file d'attente anonyme basée à Toronto ou à l'étranger.",
      p2: "Basée à Dieppe, au Nouveau-Brunswick, Oakivo Solutions vous donne un accès direct à ses fondateurs et ingénieurs seniors, 100 % bilingues (français et anglais), partout dans les provinces de l'Atlantique.",
      p3: "Nous combinons la puissance technique des grands cabinets avec la réactivité, l'écoute humaine et la franchise d'un partenaire local engagé."
    },
    outcomes: {
      badge: "Impact Mesurable",
      title_main: "Conçu pour la Résilience. ",
      title_accent: "Prouvé en Production.",
      metric1_val: "0 Min",
      metric1_title: "De Panique Avant les Audits",
      metric1_desc: "La collecte continue et automatisée des preuves de conformité remplace la recherche manuelle chaotique dans les tableurs pour SOC 2 et LPRPDE.",
      metric2_val: "2x",
      metric2_title: "Déploiements Sécurisés Plus Rapides",
      metric2_desc: "La sécurité intégrée aux pipelines CI/CD élimine les semaines d'attente des approbations manuelles.",
      metric3_val: "100%",
      metric3_title: "Ingénierie Atlantique Bilingue",
      metric3_desc: "Accès direct à des architectes DevSecOps seniors basés à Dieppe, N.-B., sans intermédiaires.",
      proof_desc: "Oakivo conçoit et gère des environnements infonuagiques de production exécutant des clusters Kubernetes multi-régions, des balises de conformité automatisées et des architectures IAM Zéro Confiance.",
      proof_pillar1_title: "Politique sous Forme de Code",
      proof_pillar1_desc: "Garde-fous OPA/Kyverno déterministes validant la sécurité avant la fusion du code.",
      proof_pillar2_title: "Bascule Sans Interruption",
      proof_pillar2_desc: "Tests étagés en bac à sable garantissant zéro interruption lors de l'intégration des outils de sécurité.",
      proof_pillar3_title: "Remédiation SRE à Vitesse Machine",
      proof_pillar3_desc: "Procédures automatisées réactives qui isolent les anomalies et renouvellent les clés en quelques millisecondes.",
      security_title: "Normes de Sécurité et de Conformité Entreprise",
      security1_title: "Identité Zéro Confiance & Chiffrement",
      security1_desc: "TLS 1.3 en transit, AES-256 au repos et jetons d'accès éphémères OAuth 2.0 / mTLS.",
      security2_title: "Moteurs de Conformité Automatisés",
      security2_desc: "Évaluation continue de la posture selon les normes LPRPDE, SOC 2 Type II, ISO 27001 et HIPAA.",
      security3_title: "Souveraineté des Données Canadiennes",
      security3_desc: "Architecturé rigoureusement dans les régions infonuagiques souveraines canadiennes (AWS ca-central-1, Azure Canada Central)."
    },
    landing: {
      hero_headline: "Automatisation Intelligente. ERP Unifié. Cybersécurité Inébranlable.",
      hero_subheadline: "Nous modernisons, automatisons et sécurisons les entreprises canadiennes en pleine croissance — de l'unification ERP aux flux de travail automatisés et à la cybersécurité infonuagique continue. Un partenariat direct avec les fondateurs dans votre fuseau horaire.",
      strategic_headline: "L'Avantage du Cabinet Agile & Boutique",
      strategic_body: "Les entreprises en croissance du Canada atlantique méritent mieux que des consultants impersonnels aux présentations théoriques sans fin ou des dépanneurs informatiques limités. Nous allions l'expertise d'ingénierie avancée à l'implication directe de nos fondateurs : unifier vos opérations avec un ERP moderne, automatiser vos tâches répétitives, accélérer vos liquidités et verrouiller la sécurité infonuagique dès le premier jour.",
      capabilities_headline: "Quatre Piliers de Croissance Numérique",
      cap1_title: "ERP Moderne & Opérations Unifiées",
      cap1_body: "Remplacez tableurs disparates et logiciels dépassés par une source unique de données pour CRM, ventes, stocks, facturation et logistique.",
      cap2_title: "Automatisation des Flux & Revenus",
      cap2_body: "Automatisez les pipelines devis-facturation, la synchronisation d'inventaire et les relances pour supprimer les erreurs et les fuites financières.",
      cap3_title: "Infrastructures Cloud & DevSecOps",
      cap3_body: "Infrastructures infonuagiques canadiennes résilientes (AWS/Azure) avec garde-fous CI/CD automatisés et 99,99% de disponibilité.",
      cap4_title: "Cybersécurité & Conformité Automatisée",
      cap4_body: "Collecte continue automatisée de preuves (SOC 2, LPRPDE, Loi 25), posture de sécurité CSPM et protection Zéro Confiance sans friction opérationnelle.",
      methodology_headline: "Notre Méthode",
      step1_title: "Session Découverte & Plan de Croissance (Jours 1 à 5)",
      step1_body: "Une évaluation ciblée de 30 minutes de vos processus, de vos outils, de votre sécurité et de vos objectifs, suivie d'un plan d'action concret à fort ROI.",
      step2_title: "Implémentation Agile en Bac à Sable (Semaines 2 à 4)",
      step2_body: "Déploiement rapide de modules ERP modernes, automatisations et garde-fous infonuagiques sécurisés dans un environnement dédié avec zéro interruption de vos activités.",
      step3_title: "Support Local Continu & Évolution (En Continu)",
      step3_body: "Accès direct à notre équipe bilingue senior dans le fuseau de l'Atlantique (HNA) pour l'optimisation continue et l'accompagnement.",
    },
    drawer: {
      tag: "Découverte & Plan de Croissance Oakivo",
      title: "Planifiez Votre Session Découverte de 30 Minutes",
      desc: "Sans démarche commerciale insistante. L'un de nos fondateurs ou ingénieurs seniors évaluera vos goulots d'étranglement, vos besoins ERP, vos automatisations ou votre sécurité pour tracer un plan d'action à fort retour sur investissement.",
      name_label: "Votre nom *",
      name_placeholder: "ex. David Cormier",
      email_label: "Courriel professionnel *",
      email_placeholder: "ex. david@entreprise.ca",
      company_label: "Entreprise / Organisation *",
      company_placeholder: "ex. Logistique Maritime Inc.",
      focus_label: "Domaine d'Intérêt Prioritaire *",
      focus_opt1: "Implémentation ou Migration ERP Moderne",
      focus_opt2: "Automatisation des Processus & Facturation",
      focus_opt3: "Modernisation Cloud & DevSecOps",
      focus_opt4: "Cybersécurité & Conformité (SOC 2, LPRPDE, Loi 25)",
      focus_opt5: "Conseil Général en Transformation Numérique",
      bottleneck_label: "Quel est votre principal défi opérationnel, logiciel ou d'automatisation ? *",
      bottleneck_placeholder: "ex. Logiciels déconnectés, facturation manuelle trop lente, audit à préparer, évolution Odoo...",
      submit_btn: "Obtenir Mon Plan de Croissance Personnalisé (30 Min)",
      submitting: "Planification en cours...",
      success_title: "Demande de Session Découverte Confirmée",
      success_desc: "Un membre senior de notre équipe de Dieppe examinera vos informations et vous contactera sous 24h avec des propositions d'horaires.",
      success_close: "Fermer et Revenir au Site",
      footer_badge: "Transformation Numérique Agile & ERP",
      footer_region: "Siège Social à Dieppe, Nouveau-Brunswick"
    },
    footer: {
      card_tag: "Session Découverte de 30 Min",
      card_title: "Prêt à automatiser vos opérations et moderniser vos systèmes ?",
      card_desc: "Planifiez une session découverte de 30 minutes avec nos experts à Dieppe. Nous identifierons vos gains d'efficacité prioritaires et tracerons votre feuille de route.",
      cta_audit: "Planifier une Session Découverte (30 min)",
      callout_tag: "Session Découverte de 30 Min",
      callout_title: "Prêt à automatiser vos opérations et moderniser vos systèmes ?",
      callout_desc: "Planifiez une session découverte de 30 minutes avec nos experts à Dieppe. Nous identifierons vos gains d'efficacité prioritaires et tracerons votre feuille de route.",
      callout_btn: "Planifier une Session Découverte (30 min)",
      brand_desc: "Oakivo Solutions Inc. est un partenaire de transformation numérique, d'implémentation Odoo ERP, d'automatisation des flux et d'ingénierie infonuagique basé à Dieppe, Nouveau-Brunswick.",
      badge_title: "Dieppe, N.-B. & Canada Atlantique",
      badge_desc: "Ingénierie bilingue de niveau senior et implémentation ERP pour les organisations du Nouveau-Brunswick, de la Nouvelle-Écosse, de l'Î.-P.-É. et de Terre-Neuve.",
      focus_tag: "Partenaire Numérique au Canada Atlantique",
      focus_desc: "Ingénierie bilingue de niveau senior et implémentation ERP pour les organisations du Nouveau-Brunswick, de la Nouvelle-Écosse, de l'Î.-P.-É. et de Terre-Neuve.",
      nav_title: "Navigation",
      nav_header: "Navigation",
      solutions_title: "Nos Solutions",
      solutions_header: "Nos Solutions",
      service_area: "Zone Desservie",
      area_header: "Présence Régionale",
      rights: "2026 Oakivo Solutions Inc. Tous droits réservés.",
      copyright: "© 2026 Oakivo Solutions Inc. Tous droits réservés.",
      privacy: "Politique de Confidentialité",
      compliance: "Sécurité & Conformité"
    },
    chatbot: {
      greeting: "Bienvenue chez Oakivo Solutions ! Nous aidons les entreprises canadiennes en pleine croissance à unifier leurs opérations avec un ERP moderne, automatiser leurs flux administratifs, sécuriser leur infonuagique et garantir leur conformité. Comment pouvons-nous vous aider aujourd'hui ?",
      placeholder: "Posez vos questions sur l'ERP moderne, l'automatisation, la cybersécurité ou notre accompagnement...",
      quick_prompts: [
        "Planifier Découverte (30 min)",
        "ERP Moderne & Opérations",
        "Automatisation des Flux",
        "Architecture Cloud & DevOps",
        "Cybersécurité & Conformité LPRPDE / SOC 2"
      ],
      audit_btn: "Planifier Découverte (30 min)"
    },
    verticals: {
      hero_title: "Modernisation & Automatisation par Secteur.",
      hero_subtitle: "Odoo ERP sur mesure, automatisation des processus et sécurité infonuagique conçus pour les entreprises du Canada atlantique.",
      cards: [
        { title: "Logistique & Chaîne d'Approvisionnement", desc: "Unifiez inventaire d'entrepôt, répartition et suivi de flotte dans Odoo avec des flux automatisés devis-facturation.", impact: "Zéro commande perdue, facturation 60 % plus rapide et disponibilité de 99,99 %." },
        { title: "Santé & Technologies Médicales", desc: "Automatisez les garde-fous de conformité LPRPDE et Loi 25 sur les dossiers patients, la prise de rendez-vous et le stockage souverain.", impact: "Préparation continue aux audits 24/7 avec journaux signés cryptographiquement." },
        { title: "Commerce de Détail & E-Commerce", desc: "Connectez caisses POS, Shopify, stocks en entrepôt et facturation automatisée sous un seul moteur Odoo temps réel.", impact: "Synchronisation des stocks en direct et suppression des doubles saisies." },
        { title: "Services Financiers & Corporatifs", desc: "Automatisez la facturation d'honoraires, le suivi du CRM et les pistes d'audit de conformité SOC 2 Type II.", impact: "Cycle de facturation accéléré et audits réussis en quelques semaines." },
        { title: "Manufacture & Industrie", desc: "Intégrez nomenclatures (BOM), planification de production et stocks dans Odoo avec répartition automatisée d'atelier.", impact: "Suppression des temps morts et optimisation des approvisionnements." },
        { title: "Secteur Public & Sociétés d'État", desc: "Souveraineté des données canadiennes, documentation bilingue et architecture multi-cloud durcie.", impact: "Conformité totale aux exigences infonuagiques canadiennes Protégé B." }
      ]
    },
    services: {
      hero_label: "Nos Services Principaux",
      hero_title: "Odoo ERP, Automatisation des Processus & Résilience Numérique.",
      service1_title: "Implémentation Odoo ERP & Transformation Numérique",
      service2_title: "Automatisation des Flux & Revenus",
      service3_title: "Modernisation Infonuagique & DevOps",
      service4_title: "Conformité Simplifiée & Assurance Sécurité",
      list: [
        { title: "Odoo ERP & Transformation Numérique", desc: "Remplacez tableurs et outils disparates par un Odoo ERP unifié pour CRM, ventes, stocks, facturation et répartition.", insight: "Source unique de vérité et jusqu'à 60 % de charge administrative en moins.", magnet: "erp" },
        { title: "Automatisation des Flux & Revenus", desc: "Automatisez les transmissions devis-commandes-factures et la réconciliation pour supprimer les pertes de revenus.", insight: "Encaissement plus rapide et zéro erreur de double saisie.", magnet: "automation" },
        { title: "Modernisation Cloud & DevOps", desc: "Infrastructures AWS et Azure résilientes avec pipelines CI/CD automatisés et souveraineté canadienne.", insight: "Déploiements 2x plus rapides avec 99,99 % de disponibilité.", magnet: "devsecops" },
        { title: "Conformité Simplifiée & Sécurité", desc: "Génération continue automatisée des preuves de conformité (SOC 2, LPRPDE, Loi 25) sans perturber vos équipes.", insight: "Preuves d'audit 24/7 et zéro panique administrative.", magnet: "cspm" }
      ],
      cta_title: "Prêt à supprimer les blocages et accélérer votre croissance ?",
      cta_text: "Échangez avec nos fondateurs et ingénieurs seniors pour un diagnostic de 30 minutes de vos processus d'affaires.",
      cta_btn: "Planifier une Session Découverte (30 min)"
    },
    caseStudies: {
      hero_title: "Études de Cas & Résultats Concrets",
      hero_subtitle: "Comment des organisations du Canada atlantique ont transformé leurs freins opérationnels en accélérateurs automatisés.",
      cases: [
        { id: '1', title: "Groupe Logistique Frigorifique Atlantique", impact: "Facturation 60 % Plus Rapide", quote: "Oakivo a unifié notre répartition multi-centres sous Odoo et automatisé notre réconciliation de factures. Nous avons supprimé les retards d'encaissement sans aucune faille d'audit.", author: "Directeur des Opérations", problem: "Logiciels de répartition déconnectés, retards de facturation manuelle et accès non surveillés dans quatre centres de distribution.", solution: "Implémentation Odoo ERP & Pipelines d'Automatisation." },
        { id: '2', title: "Fournisseur Régional de Technologies Médicales", impact: "SOC 2 Type II en 6 Semaines", quote: "Au lieu de nous noyer dans les tableurs, le moteur d'Oakivo a généré nos preuves en continu. Nos contrats majeurs ont été signés des mois d'avance.", author: "Directeur Général de la Technologie", problem: "Les audits manuels bloquaient les signatures de contrats hospitaliers majeurs.", solution: "Conformité Automatisée & Intégration DevSecOps." }
      ]
    },
    about: {
      hero_title: "L'Avantage du Cabinet Agile & Boutique : Conçu pour les Entreprises Canadiennes.",
      hero_subtitle: "Basés à Dieppe, au Nouveau-Brunswick, nous combinons l'excellence technique des grands cabinets avec la proximité, l'agilité et l'écoute directe des fondateurs.",
      standard_title: "Pourquoi l'Approche Boutique Fait la Différence",
      standard_p1: "Nous croyons que les entreprises en croissance ne devraient pas avoir à choisir entre des méga-consultants distants aux factures démesurées et des prestataires locaux incapables de programmer ou d'intégrer un ERP moderne.",
      standard_p2: "Oakivo offre le juste équilibre : des fondateurs et ingénieurs seniors travaillant directement sur vos projets, des prototypes opérationnels en quelques semaines et une automatisation rentable.",
      standard_p3: "Implantée à Dieppe, notre équipe bilingue s'engage pleinement auprès de la communauté atlantique pour livrer Odoo ERP, automatisations robustes et tranquillité de conformité.",
      leadership_title: "Direction de l'Ingénierie",
      experts_section_badge: "Centre d'Ingénierie de Dieppe, N.-B.",
      experts_section_title: "Rencontrez Nos Fondateurs & Ingénieurs Seniors",
      experts_section_subtitle: "Accès direct à des architectes de sécurité infonuagique, des ingénieurs DevSecOps et des analystes d'affaires basés à Dieppe, au Nouveau-Brunswick. Support bilingue (FR/EN) dans le fuseau de l'Atlantique (HNA) sans file d'attente à l'étranger.",
      experts_badge_location: "Dieppe, N.-B. (HNA)",
      experts_bilingual_tag: "Centre de Dieppe, N.-B.",
      team: [
        { 
          name: "Ahmed Bello, M.Sc.", 
          role: "Architecte Principal de Sécurité Infonuagique & Fondateur", 
          bio: "Plus de 12 ans d'expérience dans la conception d'architectures infonuagiques Zéro Confiance, de politiques de moindre privilège IAM et de nuages sécurisés pour les entreprises canadiennes.", 
          credentials: ["M.Sc.", "CISSP", "Spécialiste Sécurité AWS", "CKA (Kubernetes)"], 
          location: "Dieppe, N.-B.",
          headshot: "/team/ahmed-bello.jpg?v=4",
          linkedin: "https://www.linkedin.com/company/oakivo" 
        },
        { 
          name: "Funmilayo Akinsiku, P.Eng.", 
          role: "Ingénieure DevSecOps & Automatisation de Pipelines", 
          bio: "Spécialiste de l'analyse automatisée de conteneurs, des garde-fous d'admission déclaratifs Kubernetes et des modules d'Infrastructure-as-Code avec Terraform.", 
          credentials: ["ing. (Alberta)", "CKS (Sécurité Kubernetes)", "Associée Terraform"], 
          location: "Calgary, Alb.",
          headshot: "/team/funmilayo-akinsiku.jpg",
          linkedin: "https://www.linkedin.com/company/oakivo" 
        },
        { 
          name: "Fawaz Bello", 
          role: "Spécialiste Associé Infonuagique & DevSecOps", 
          bio: "Professionnel infonuagique émergent assistant la télémétrie Prometheus et Grafana, l'automatisation des tests CI/CD et la maintenance des opérations d'infrastructure.", 
          credentials: ["Certifié AWS", "Parcours Linux Foundation", "Bases Kubernetes"], 
          location: "Dieppe, N.-B.",
          headshot: "/team/fawaz-bello.jpg",
          linkedin: "https://www.linkedin.com/company/oakivo" 
        },
        { 
          name: "Taiwo Owoeye", 
          role: "Analyste d'Affaires", 
          bio: "Analyste d'affaires dédiée à la collecte des exigences fonctionnelles, à la cartographie des processus opérationnels, à la gestion du carnet agile et à l'alignement des parties prenantes.", 
          credentials: ["Analyse d'Affaires (BA)", "Modélisation de Processus", "Agile & Scrum", "Spécification des Besoins"], 
          location: "Dieppe, N.-B.",
          headshot: "/team/taiwo-owoeye.jpg",
          linkedin: "https://www.linkedin.com/company/oakivo" 
        }
      ]
    },
    brochure: {
      download_btn: "Télécharger la Brochure PDF",
      downloading: "Génération du PDF...",
      success: "Brochure téléchargée avec succès",
      error: "Échec de la génération du PDF. Veuillez réessayer.",
      title: "Oakivo Solutions Inc. - DevSecOps & Sécurité Infonuagique d'Entreprise",
      subtitle: "Offres de Services, Méthodologie d'Architecture & Études de Cas au Canada Atlantique"
    },
    methodology_timeline: {
      badge: "Parcours Client Interactif",
      title_main: "Exécution Prévisible : ",
      title_accent: "Le Parcours Client en 3 Étapes",
      subtitle: "Survolez chaque étape pour inspecter les livrables techniques, les garde-fous d'architecture et les résultats d'affaires garantis.",
      step1: {
        num: "01",
        name: "Audit d'Architecture & Sécurité",
        duration: "Jours 1 à 5",
        short_desc: "Diagnostic approfondi des actifs infonuagiques, des pipelines CI/CD, des accès ERP et des écarts de conformité.",
        deliverables_title: "Livrables Clés & Artefacts :",
        deliverables: [
          "Plan directeur de menaces et remédiation hiérarchisé avec pointage CVE",
          "Revue de topologie multi-cloud et de la matrice de moindre privilège IAM",
          "Matrice des écarts de conformité automatisée SOC 2 / LPRPDE",
          "Schéma de micro-segmentation réseau Zéro Confiance"
        ],
        badge: "Diagnostic & Évaluation",
        outcome: "Score de risque limpide sans rapport PDF indigeste de 200 pages."
      },
      step2: {
        num: "02",
        name: "Déploiement Automatisé en Bac à Sable",
        duration: "Semaines 2 à 4",
        short_desc: "Implémentation en environnement isolé de barrières CI/CD, de la politique OPA et de garde-fous automatisés.",
        deliverables_title: "Livrables Clés & Artefacts :",
        deliverables: [
          "Garde-fous SAST, DAST et SBOM dans GitHub Actions / GitLab",
          "Modules d'Infrastructure-as-Code immuables (Terraform / OpenTofu)",
          "Analyse de vulnérabilité de conteneurs et signature d'images Cosign",
          "Bascule en production sans interruption et guides opérationnels d'équipe"
        ],
        badge: "Intégration Shift-Left",
        outcome: "Zéro perturbation de la vélocité de vos développeurs ou des services en direct."
      },
      step3: {
        num: "03",
        name: "Supervision DevSecOps & SRE Continue",
        duration: "Continu",
        short_desc: "Surveillance de conformité continue, scénarios d'auto-cicatrisation SRE et soutien direct en heure de l'Atlantique.",
        deliverables_title: "Livrables Clés & Artefacts :",
        deliverables: [
          "Gestion continue de posture de sécurité infonuagique (CSPM) 24/7/365",
          "Isolation autonome des menaces et rotation automatique des clés",
          "Archives cryptographiques de preuves d'audit générées en continu",
          "Soutien direct d'architectes DevSecOps seniors depuis Dieppe, N.-B."
        ],
        badge: "Défense Autonome",
        outcome: "Les audits deviennent un simple bouton; votre infrastructure s'auto-cicatrise à la vitesse machine."
      }
    },
    careers: {
      hero_title: "Rejoignez l'Équipe d'Ingénierie Oakivo.",
      hero_subtitle: "Nous bâtissons l'équipe d'élite en DevSecOps et automatisation de sécurité infonuagique au Canada atlantique.",
      values: [
        { title: "Ingénierie de Précision", desc: "Nous écrivons du code propre qui remplace le travail manuel par des garde-fous déterministes." },
        { title: "Zéro Bureaucratie", desc: "Pas de paperasse interminable. Nous livrons des systèmes fonctionnels et éprouvés en production." },
        { title: "Autorité Régionale", desc: "Fièrement établis à Dieppe, N.-B., nous sommes le partenaire de cybersécurité de premier plan pour notre région." },
        { title: "Apprentissage Continu", desc: "Maîtrise des technologies infonuagiques de pointe, des composants internes de Kubernetes et de la résilience SRE." }
      ],
      apply_title: "Rejoignez Nos Rangs d'Ingénierie",
      apply_text: "Êtes-vous un ingénieur DevSecOps, un architecte cloud ou un spécialiste en automatisation de sécurité désireux de réaliser un travail de classe mondiale au Canada atlantique ?",
      apply_btn: "Soumettre Mon Profil d'Ingénierie",
      email_link: "carrieres@oakivo.com"
    },
    contact: {
      success_title: "Demande d'Audit de Sécurité Confirmée.",
      success_message: "Un architecte DevSecOps senior de notre bureau de Dieppe examinera vos détails d'infrastructure et vous contactera sous 24h.",
      form_title: "Demander Votre Audit d'Architecture de Sécurité (30 min)",
      label_name: "Votre Nom",
      label_email: "Courriel Professionnel",
      label_q1: "Quel est votre principal défi en sécurité ou pipeline ?",
      label_q2: "Quelle est votre pile technologique actuelle ?",
      label_q3: "Quel est votre horizon de résolution ?",
      placeholder_q1: "ex. Audit SOC 2 imminent, déploiements trop lents, sécurisation des accès ERP...",
      placeholder_q2: "ex. AWS, Azure, GCP, Kubernetes, GitHub Actions, SAP/Odoo...",
      placeholder_q3: "ex. 30 prochains jours, immédiat, planification Q4...",
      submit_btn: "Demander Mon Audit d'Architecture de Sécurité (30 min)"
    },
    
    risk_calculator: {
      title: "Calculateur d'Évaluation des Risques",
      subtitle: "Évaluez votre maturité DevSecOps et votre posture d'infrastructure en 60 secondes.",
      questions: [
        {
          id: 1,
          category: "Déploiement d'Infrastructure",
          title: "Comment provisionnez-vous et gérez-vous actuellement votre infrastructure cloud ?",
          options: [
            { id: '1a', label: "Manuellement via les consoles cloud (GUI AWS/Azure)" },
            { id: '1b', label: "Mélange de processus manuels et de scripts basiques" },
            { id: '1c', label: "Infrastructure-as-Code (Terraform, CloudFormation)" },
            { id: '1d', label: "IaC avec Policy-as-Code intégré (OPA, Checkov)" }
          ]
        },
        {
          id: 2,
          category: "Accès & Identité",
          title: "Comment l'accès aux charges de travail de production critiques est-il régi ?",
          options: [
            { id: '2a', label: "Mots de passe statiques et identifiants partagés" },
            { id: '2b', label: "MFA standard sur les comptes principaux" },
            { id: '2c', label: "SSO avec contrôle d'accès basé sur les rôles (RBAC)" },
            { id: '2d', label: "Zero-Trust sensible au contexte (Posture des appareils, mTLS)" }
          ]
        },
        {
          id: 3,
          category: "Détection des Menaces",
          title: "Quel est votre principal mécanisme d'identification des failles de sécurité ?",
          options: [
            { id: '3a', label: "Réactif (Rapports clients, temps d'arrêt apparent)" },
            { id: '3b', label: "Revues manuelles des journaux et alertes basiques" },
            { id: '3c', label: "SIEM centralisé avec détection automatisée des anomalies" },
            { id: '3d', label: "Surveillance eBPF au niveau du noyau et SOAR piloté par l'IA" }
          ]
        },
        {
          id: 4,
          category: "Conformité & Audit",
          title: "Comment maintenez-vous la conformité avec les cadres réglementaires (SOC 2, ISO 27001) ?",
          options: [
            { id: '4a', label: "Nous ne suivons pas formellement la conformité" },
            { id: '4b', label: "Suivi manuel par tableur et audits périodiques" },
            { id: '4c', label: "Collecte automatisée de preuves (ex: Vanta, Drata)" },
            { id: '4d', label: "Conformité continue cartographiée directement sur les pipelines IaC" }
          ]
        }
      ],
      results: {
        score: "Score de Maturité des Risques",
        level: "Niveau de Maturité :",
        critical: "Exposition Critique aux Risques",
        moderate: "Maturité Modérée",
        advanced: "DevSecOps Avancé",
        request_audit: "Demander un Audit d'Architecture Complet",
        submit: "Soumettre l'Évaluation"
      }
    },
    solutions_in_action: {
      badge: "L'Automatisation Visualisée",
      title: "Solutions en Action",
      subtitle: "Ne vous contentez pas de lire sur le Zéro-Confiance. Regardez nos architectures d'ingénierie détecter, isoler et corriger dynamiquement les menaces dans des environnements haute-fidélité.",
      demo: "Démo de l'Architecture",
      videos: [
        {
          id: "cspm",
          title: "Sécurité Cloud (CSPM)",
          description: "Regardez comment notre gestion de posture automatisée détecte et corrige instantanément un compartiment S3 mal configuré en temps réel."
        },
        {
          id: "devsecops",
          title: "Pipelines DevSecOps",
          description: "Découvrez la politique en tant que code en action : Un déploiement Terraform est automatiquement bloqué avant validation en raison d'un rôle IAM exposé."
        },
        {
          id: "iam",
          title: "Zéro-Confiance IAM",
          description: "Faites l'expérience d'une vérification d'identité cryptographique bloquant le mouvement latéral à partir d'un point d'extrémité compromis."
        },
        {
          id: "sre",
          title: "Remédiation de Menace SRE",
          description: "Observez nos capteurs eBPF détecter un comportement de ransomware de type zéro-jour et couper de manière autonome la connexion réseau."
        }
      ]
    },
    insights: {
      title: "Recherche & Aperçus Sécurité",
      subtitle: "Analyse experte sur l'architecture zéro confiance, l'automatisation DevSecOps et la conformité cloud pour les entreprises du Canada atlantique.",
      search_placeholder: "Rechercher des articles, des modèles d'architecture...",
      no_results: "Aucun article trouvé",
      no_results_desc: "Ajustez votre recherche pour explorer notre recherche.",
      read_time: "min de lecture",
      author: "Par",
      back: "Retour à tous les articles",
      read_article: "Lire l'article"
    },

    booking: {      hero_title: "Audit d'Architecture de Sécurité de 30 Minutes.",
      hero_subtitle: "Planifiez une révision diagnostique ciblée de votre infrastructure infonuagique, de vos pipelines CI/CD et de votre conformité.",
      success_title: "Audit de Sécurité Planifié.",
      success_message: "Une invitation calendrier et un questionnaire préparatoire ont été envoyés à votre courriel professionnel."
    },
    caps: {
      badge: "Notre Expertise",
      title: "Capacités Principales",
      subtitle: "Architecture DevSecOps fondamentale conçue pour l'échelle, la conformité et la vélocité. Nous offrons une sécurité de niveau entreprise sans compromettre la vitesse de déploiement.",
      cta: "Explorer la Méthodologie",
      cspm_title: "Posture de Sécurité Cloud (CSPM)",
      cspm_desc: "Détection automatisée des mauvaises configurations cloud sur AWS, Azure et GCP. Détection des dérives en temps réel pour l'Infrastructure-as-Code avec cartographie continue SOC 2 et LPRPDE.",
      cspm_f1: "Détection de dérive en temps réel",
      cspm_f2: "Cartographie continue de la conformité",
      cspm_f3: "Preuves d'audit en un clic",
      ci_title: "Ingénierie de Pipeline DevSecOps",
      ci_desc: "Automatisation de la sécurité CI/CD shift-left. Construisez rapidement et sécurisez chaque validation avec SAST, DAST et l'analyse de conteneurs automatisée intégrée directement dans GitHub Actions ou GitLab.",
      ci_f1: "SAST & DAST automatisés",
      ci_f2: "Analyse d'images de conteneurs",
      ci_f3: "Renforcement des pipelines CI/CD",
      iam_title: "Architecture Zéro Confiance",
      iam_desc: "Périmètres de sécurité basés sur l'identité. Nous remplaçons les VPN hérités et les informations d'identification statiques par des jetons à courte durée de vie, des maillages de services mTLS et des politiques IAM strictes du moindre privilège.",
      iam_f1: "Réseautage centré sur l'identité",
      iam_f2: "Maillages de services mTLS",
      iam_f3: "Accès juste à temps (JIT)",
      odoo_title: "Implémentation Odoo & Transformation Numérique",
      odoo_desc: "Gestion d'entreprise complète via l'intégration ERP Odoo. Nous rationalisons les flux de travail, automatisons les processus complexes et sécurisons les données d'entreprise pour une croissance durable.",
      odoo_f1: "Intégration Odoo sur mesure",
      odoo_f2: "Automatisation des processus",
      odoo_f3: "Renforcement de la sécurité de l'ERP"
    },
    bento: {
      mod_title: "Cessez de perdre des heures d'ingénierie sur des processus manuels.",
      mod_subtitle: "Modernisation de systèmes hérités & automatisation d'API sur mesure",
      mod_desc: "Connectez des ERP hérités aux applications cloud modernes avec des ponts API personnalisés - sans aucune refonte pluriannuelle risquée requise.",
      mod_impact: "Reconstructions de monolithes risquées",
      mod_f1: "Ponts API personnalisés connectant les ERP hérités aux outils cloud",
      mod_f2: "Pipelines de flux de travail automatisés éliminant la saisie manuelle",
      mod_f3: "Modernisation incrémentale sans temps d'arrêt opérationnel",
      mod_f4: "Validation de données Zéro Confiance sur tous les points d'intégration",
      cloud_title: "Migrez vers le Cloud sans facture mensuelle de 50 000 $.",
      cloud_subtitle: "Migration Cloud Prévisible & SRE Fractionnaire",
      cloud_desc: "Obtenez un temps de disponibilité d'entreprise, une orchestration Kubernetes et des dépenses mensuelles verrouillées, hébergés strictement sur le sol canadien.",
      cloud_impact: "Réduction moyenne des dépenses cloud mensuelles",
      cloud_f1: "Dépenses mensuelles verrouillées hébergées strictement sur le sol canadien",
      cloud_f2: "Orchestration et mise à l'échelle automatique des conteneurs Kubernetes",
      cloud_f3: "Garantie de disponibilité de 99,99% avec basculement automatisé",
      cloud_f4: "Supervision SRE fractionnaire et optimisation continue",
      sec_title: "Souveraineté des Données Blindée. 100% Conforme LPRPDE, Zéro Anxiété de Violation.",
      sec_subtitle: "Architecture Cloud Conforme LPRPDE & Sécurité Zéro Confiance",
      sec_desc: "Intégrez la détection automatisée des vulnérabilités et l'accès zéro confiance directement dans votre pipeline de déploiement.",
      sec_impact: "Conformité LPRPDE & Zéro Exposition aux Violations",
      sec_f1: "Détection des vulnérabilités automatisée dans les pipelines CI/CD",
      sec_f2: "Contrôle d'accès Zéro Confiance et micro-segmentation",
      sec_f3: "Conformité 100% LPRPDE et Loi 25 sur les nœuds canadiens",
      sec_f4: "Surveillance et audit 24/7 des menaces de sécurité automatisées",
      odoo_title: "Unifiez Votre Entreprise avec l'Implémentation Odoo de Niveau Entreprise.",
      odoo_subtitle: "Intégration Odoo ERP & Transformation Numérique",
      odoo_desc: "Rationalisez les flux de travail et évoluez efficacement grâce à un ERP Odoo complet et adapté à vos besoins opérationnels.",
      odoo_impact: "Efficacité Opérationnelle & Évolutivité de la Croissance",
      odoo_f1: "Implémentation ERP Odoo de bout en bout et développement de modules sur mesure",
      odoo_f2: "Migration transparente des données depuis les anciens systèmes CRM et comptables",
      odoo_f3: "Automatisation des flux de travail des stocks, des ventes et des RH",
      odoo_f4: "Renforcement de la sécurité intégrée pour la protection des données d'entreprise"
    },
    not_found: {
      badge: "HTTP 404 • Limite de Périmètre",
      title: "Périmètre Dépassé • Page Introuvable",
      subtitle: "La ressource ou télémétrie demandée n'existe pas ou a été déplacée vers une enclave sécurisée isolée.",
      cta_home: "Retour au Port Sécurisé (Accueil)",
      cta_services: "Explorer Nos Capacités DevSecOps",
      cta_compliance: "Matrice de Conformité Canadienne",
      cta_audit: "Planifier l'Audit d'Architecture"
    },
    compliance_hub: {
      badge: "Architecture Réglementaire Canadienne",
      title: "Cadres de Conformité Canadiens & Souveraineté Infonuagique",
      subtitle: "Architectures de sécurité déterministes basées sur des politiques de code, conçues spécifiquement pour les secteurs sous réglementation fédérale et les lois provinciales sur la vie privée.",
      cta_schedule: "Planifier une Révision d'Architecture",
      cta_audit: "Demander la Liste de Contrôle",
      bill_c26_title: "Loi C-26 (LSPCY) Cybersystèmes Essentiels",
      bill_c26_desc: "Programmes de cybersécurité obligatoires, signalement immédiat des incidents au CST et atténuation des risques liés aux tiers pour l'infrastructure essentielle.",
      pipeda_title: "LPRPDE & Loi 25 Résidence des Données Canadiennes",
      pipeda_desc: "Résidence stricte en sol canadien (AWS ca-central-1, Azure Canada), clés gérées par le client (CMK) et élimination des risques transfrontaliers.",
      soc2_title: "SOC 2 Type II Automatisation Continue d'Audit",
      soc2_desc: "Collecte automatisée de preuves par politique-en-code, barrières GitOps et préparation d'audit 24/7 sans panique pour les entreprises technologiques canadiennes."
    }
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Update html lang attribute when language changes
  React.useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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
