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
      arsenal: 'DevSecOps Arsenal', 
      services: 'Services & Pillars', 
      process: '3-Step Journey',
      work: 'Case Studies',
      case_studies: 'Case Studies', 
      about: 'About Us', 
      contact: 'Security Audit', 
      careers: 'Careers',
      booking: 'Schedule Audit',
      compliance: 'Security & Compliance',
      privacy: 'Privacy Policy',
      solutions: 'Solutions',
      locations: 'Locations'
    },
    common: {
      cta_book_audit: "Request 30-Minute Security Architecture Audit",
      cta_audit: "Request 30-Min Audit",
      cta_blueprint: "Get Remediation Blueprint",
      cta_explore_arsenal: "Explore DevSecOps Arsenal",
      cta_meet: "Meet Our Security Engineers",
      cta_mobile_sticky: "Request Security Audit",
      cta_schedule: "Schedule 30-Min Audit",
      submitting: "Submitting Request...",
      success: "Audit Request Submitted!",
      guarantee: "100% Bilingual Engineering (EN/FR) • Dieppe, NB Headquarters • Zero Daily Pipeline Disruption",
      no_disruption: "Zero Daily Pipeline Disruption",
      regional_focus: "Atlantic Canada Security Partner",
      regional_sub: "Dieppe / Moncton • Halifax • Charlottetown • St. John's"
    },
    hero: {
      badge: "DevSecOps & Cloud Security Automation • Dieppe, NB & Atlantic Canada",
      headline_main: "Ship Faster. Stay Unbreachable.",
      headline_accent: "Guaranteed.",
      subtitle: "We engineer automated cloud security, compliance guardrails, and DevSecOps pipelines for Atlantic Canadian businesses—protecting your mission-critical ERP, patient, customer, and logistics data without slowing down your software releases.",
      cta: "Request 30-Minute Security Architecture Audit",
      secondary_cta: "Explore Our DevSecOps Arsenal",
      guarantee: "100% Bilingual (EN/FR) • Dieppe, New Brunswick Headquarters • Zero Daily Pipeline Disruption",
      video_tag: "THE LIVING INFRASTRUCTURE MESH",
      video_desc: "Autonomous DevSecOps guardrails and real-time self-healing nodes active across Atlantic enterprise hybrid cloud environments."
    },
    problem: {
      badge: "Critical Business Risks",
      title_main: "Slow Deployments, Unchecked Cloud Sprawl, and Audit Nightmares.",
      title_accent: "We Fix All Three.",
      subtitle: "When security is handled manually or bolted on as an afterthought, modernizing Atlantic Canadian companies hit costly bottlenecks, failed compliance reviews, and dangerous attack vectors.",
      point1_title: "Failing Compliance Audits & Regulatory Delays",
      point1_desc: "Manual compliance reviews for SOC 2, HIPAA, PIPEDA, and PCI-DSS require hundreds of billable hours, frantic spreadsheet audits, and delayed contract signings.",
      point1_solution: "We replace manual audit prep with real-time, automated Cloud Security Posture Management that continuously enforces compliance guardrails. Your infrastructure stays audit-ready 24/7/365 with provable automated evidence generation.",
      point1_stat: "Zero audit panic with 24/7 continuous evidence",
      point2_title: "Stalled CI/CD Pipelines & Release Friction",
      point2_desc: "Security reviews done at the end of the development cycle block software deployments for weeks, creating bitter friction between engineering teams and risk officers.",
      point2_solution: "We embed automated static analysis, container scanning, and policy-as-code directly into your CI/CD pipelines so vulnerabilities are caught and resolved before code reaches staging. Your engineers ship rapidly with total confidence.",
      point2_stat: "10x faster release velocity with shift-left gates",
      point3_title: "Unsecured ERP Data & Zombie Access Permissions",
      point3_desc: "Core operational hubs—like SAP, Odoo, custom logistics dispatch systems, and accounting databases—are often riddled with over-privileged accounts, exposed API endpoints, and former employee credentials.",
      point3_solution: "We enforce strict Zero Trust architecture and automated identity lifecycle management across your ERP and connected microservices. Every transaction and credential is cryptographically validated and rotated automatically.",
      point3_stat: "Zero Trust least-privilege & instant de-provisioning"
    },
    arsenal: {
      badge: "The DevSecOps Arsenal",
      title_main: "Enterprise-Grade Security. ",
      title_accent: "Engineered by Automation.",
      subtitle: "Four modular, production-tested pillars designed to secure your cloud infrastructure, deployment pipelines, and ERP platforms.",
      pillar1_title: "Cloud Security Posture Management (CSPM) & Automated Compliance",
      pillar1_headline: "Turn Compliance from an Annual Nightmare into Continuous Assurance.",
      pillar1_desc: "Stop spending weeks digging through AWS, Azure, and Google Cloud consoles before audit season. We build automated compliance engines that continuously scan your multi-cloud environment against PIPEDA, SOC 2, ISO 27001, and NIST frameworks.",
      pillar1_feature1: "Automated cloud misconfiguration detection and instant policy enforcement.",
      pillar1_feature2: "Real-time drift detection for Infrastructure-as-Code (Terraform, OpenTofu, Pulumi).",
      pillar1_feature3: "Push-button audit reports and automated cryptographic evidence archives.",
      pillar1_tag: "CSPM / PIPEDA / SOC 2",

      pillar2_title: "DevSecOps Pipeline Engineering (Shift-Left Security)",
      pillar2_headline: "Build Fast. Break Nothing. Secure Every Single Commit.",
      pillar2_desc: "Security should accelerate your software delivery, not grind it to a halt. We engineer robust CI/CD security gates (GitHub Actions, GitLab CI, ArgoCD) that automatically vet source code, third-party libraries, container images, and Kubernetes manifests before deployment.",
      pillar2_feature1: "Automated SAST, DAST, and Software Bill of Materials (SBOM) generation.",
      pillar2_feature2: "Container image signing, vulnerability gating, and secret leakage prevention.",
      pillar2_feature3: "Policy-as-Code enforcement to guarantee zero unsecured code reaches production.",
      pillar2_tag: "CI/CD / Shift-Left / SBOM",

      pillar3_title: "ERP Security & Identity Lifecycle Management",
      pillar3_headline: "Protect the Financial & Operational Core of Your Business.",
      pillar3_desc: "Your ERP and CRM platforms hold your company's most sensitive trade secrets, financial records, and proprietary client logs. We implement granular Zero Trust access controls, automated role provisioning, and API authentication barriers that shield core systems from insider threats and external breaches.",
      pillar3_feature1: "Automated user onboarding and immediate offboarding de-provisioning.",
      pillar3_feature2: "Least-privilege role matrix implementation and tokenized API gateways.",
      pillar3_feature3: "Real-time anomalous data exfiltration monitoring across ERP records.",
      pillar3_tag: "Zero Trust / ERP / IAM",

      pillar4_title: "Automated Incident Remediation (SRE-Driven Security)",
      pillar4_headline: "Neutralize Threats at Machine Speed Before They Impact Operations.",
      pillar4_desc: "Human security analysts cannot respond in milliseconds. We apply Site Reliability Engineering (SRE) principles to your cybersecurity posture, writing automated event-driven runbooks that quarantine compromised workloads, rotate breached secrets, and patch configuration drifts instantaneously.",
      pillar4_feature1: "Automated playbook execution for DDoS, brute-force, and credential stuffing attacks.",
      pillar4_feature2: "Immutable logging, centralized SIEM ingestion, and automated snapshot forensics.",
      pillar4_feature3: "99.99% uptime resilience with self-healing cloud infrastructure.",
      pillar4_tag: "SRE / Autonomous Defense"
    },
    steps: {
      badge: "Predictable Execution",
      title_main: "From Vulnerable to Unbreachable in ",
      title_accent: "3 Structured Steps.",
      subtitle: "No open-ended consulting retainers. No disruptive downtime. Just precision DevSecOps engineering.",
      step1_num: "1",
      step1_title: "Step 1: Security & Architecture Audit",
      step1_time: "Days 1–5",
      step1_desc: "We perform a deep-dive scan of your cloud infrastructure, deployment pipelines, ERP access topologies, and compliance gaps. You receive a clear, plain-English Threat & Remediation Blueprint with prioritized risk scoring—not an impenetrable 200-page jargon PDF.",
      step2_num: "2",
      step2_title: "Step 2: Automated Pipeline & Policy Deployment",
      step2_time: "Weeks 2–4",
      step2_desc: "In an isolated staging sandbox, our engineers build your automated security guardrails, CI/CD gates, and Infrastructure-as-Code policies. We validate every rule with zero interruption to your live applications or staff workflow before going live.",
      step3_num: "3",
      step3_title: "Step 3: Continuous Managed DevSecOps & SRE Oversight",
      step3_time: "Ongoing",
      step3_desc: "Your pipelines and cloud assets are monitored by automated detection engines backed by senior local Atlantic engineering support. As your business scales and releases new features, your security automatically scales with you."
    },
    local_wedge: {
      badge: "The Dieppe & Atlantic Canada Advantage",
      title: "Enterprise Security Built by Engineers Who Live in Your Time Zone.",
      p1: "When a critical security alert fires or an audit deadline approaches, you don't need a tier-1 ticket queue from a faceless multi-national vendor in Toronto or overseas.",
      p2: "Headquartered in Dieppe, New Brunswick, Oakivo Solutions provides fully bilingual (English & French), senior-level DevSecOps and cloud security engineering to organizations throughout Greater Moncton, Nova Scotia, PEI, and Newfoundland.",
      p3: "We combine the ruthless technical standards of global enterprise engineering with the accountability, responsiveness, and trust of a dedicated Atlantic Canadian partner."
    },
    outcomes: {
      badge: "Measurable Impact",
      title_main: "Engineered for Resilience. ",
      title_accent: "Proven in Production.",
      metric1_val: "0 Min",
      metric1_title: "Audit Preparation Panic",
      metric1_desc: "Continuous automated compliance evidence generation replaces chaotic manual spreadsheet gathering for SOC 2 and PIPEDA.",
      metric2_val: "10x",
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
    drawer: {
      tag: "Oakivo 30-Minute Security Audit",
      title: "Request Your 30-Minute Security Architecture Audit",
      desc: "No high-pressure sales pitch. One of our senior DevSecOps specialists will evaluate your cloud infrastructure, deployment pipelines, or ERP access topology and provide a prioritized Threat & Remediation Blueprint—100% free.",
      name_label: "Your Name *",
      name_placeholder: "e.g. David Cormier",
      email_label: "Work Email *",
      email_placeholder: "e.g. david@enterprise.ca",
      company_label: "Company / Organization *",
      company_placeholder: "e.g. Maritime Logistics Inc.",
      bottleneck_label: "What is your primary cloud security, compliance, or pipeline challenge? *",
      bottleneck_placeholder: "e.g. Upcoming SOC 2 audit, slow CI/CD deployments, securing ERP access, container vulnerability scanning...",
      submit_btn: "Request 30-Minute Security Architecture Audit",
      submitting: "Scheduling Security Audit...",
      success_title: "Security Audit Request Confirmed",
      success_desc: "A senior DevSecOps architect from our Dieppe office will review your environment details and contact you within 24 hours with schedule options.",
      success_close: "Close & Return to Site",
      footer_badge: "Enterprise DevSecOps & Cloud Security",
      footer_region: "Dieppe, New Brunswick Headquarters"
    },
    footer: {
      card_tag: "30-Minute Security Audit",
      card_title: "Ready to ship faster without compromising security?",
      card_desc: "Request a 30-minute architecture review with our senior DevSecOps team in Dieppe. We'll identify your highest-risk vulnerabilities and map out an automated remediation path.",
      cta_audit: "Request 30-Minute Security Architecture Audit",
      callout_tag: "30-Minute Security Audit",
      callout_title: "Ready to ship faster without compromising security?",
      callout_desc: "Request a 30-minute architecture review with our senior DevSecOps team in Dieppe. We'll identify your highest-risk vulnerabilities and map out an automated remediation path.",
      callout_btn: "Request 30-Minute Security Architecture Audit",
      brand_desc: "Oakivo Solutions Inc. is a premium DevSecOps, Cloud Security, and Automation engineering firm based in Dieppe, New Brunswick—protecting Atlantic Canadian businesses across logistics, retail, healthcare, and enterprise.",
      badge_title: "Dieppe, NB & Atlantic Canada",
      badge_desc: "Bilingual, senior-level DevSecOps engineering for organizations across New Brunswick, Nova Scotia, PEI, and Newfoundland.",
      focus_tag: "Atlantic Canada Security Partner",
      focus_desc: "Bilingual, senior-level DevSecOps engineering for organizations across New Brunswick, Nova Scotia, PEI, and Newfoundland.",
      nav_title: "Navigation",
      nav_header: "Navigation",
      solutions_title: "Security Arsenal",
      solutions_header: "Security Arsenal",
      service_area: "Service Area",
      area_header: "Regional Presence",
      rights: "2026 Oakivo Solutions Inc. All rights reserved.",
      copyright: "© 2026 Oakivo Solutions Inc. All rights reserved.",
      privacy: "Privacy Policy",
      compliance: "Security & Compliance"
    },
    chatbot: {
      greeting: "Welcome to Oakivo Solutions! I am your DevSecOps & Cloud Security Assistant. We help Atlantic Canadian businesses automate cloud security, pass compliance audits, and secure ERP systems. How can I help you today?",
      placeholder: "Ask about CSPM, DevSecOps pipelines, or security audits...",
      quick_prompts: [
        "Request 30-Min Security Audit",
        "How does automated compliance work?",
        "What is Shift-Left Security?",
        "Securing ERP & Zero Trust"
      ],
      audit_btn: "Request 30-Min Security Audit"
    },
    verticals: {
      hero_title: "Industry Security Verticals.",
      hero_subtitle: "Specialized cloud security and DevSecOps engineering tailored to high-risk Atlantic Canadian industries.",
      cards: [
        { title: "Logistics & Supply Chain", desc: "Secure dispatch APIs, fleet telematics, and real-time inventory databases against ransomware and unauthorized access.", impact: "Zero unauthorized endpoint exposures and 99.99% system uptime." },
        { title: "Healthcare & MedTech", desc: "Automate PIPEDA & HIPAA compliance guardrails across patient records, cloud storage, and diagnostic microservices.", impact: "Continuous 24/7 audit readiness with cryptographically signed logs." },
        { title: "Retail & E-Commerce", desc: "Shield payment gateways, customer authentication pipelines, and POS ERP integrations against credential stuffing and data leaks.", impact: "PCI-DSS Level 1 posture enforcement with automated secret rotation." },
        { title: "Financial & Professional Services", desc: "Implement Zero Trust identity management, encrypted document pipelines, and immutable audit trails for strict regulatory oversight.", impact: "SOC 2 Type II compliance achieved in weeks rather than months." },
        { title: "Manufacturing & Industrial", desc: "Bridge IT/OT cloud connections with isolated security zones, tokenized machine access, and automated anomaly detection.", impact: "Guaranteed isolation of mission-critical production floor networks." },
        { title: "Public Sector & Crown Corps", desc: "Canadian data sovereignty enforcement, bilingual security documentation, and hardened multi-cloud architecture.", impact: "Full adherence to Canadian Protected B cloud security controls." }
      ]
    },
    services: {
      hero_label: "Our Core Services",
      hero_title: "The DevSecOps & Security Automation Arsenal.",
      service1_title: "Cloud Security Posture Management (CSPM)",
      service2_title: "DevSecOps Pipeline Engineering",
      service3_title: "ERP Security & Zero Trust IAM",
      service4_title: "Automated SRE Threat Remediation",
      list: [
        { title: "Cloud Security Posture Management", desc: "Continuous multi-cloud scanning, drift detection, and automated compliance evidence for PIPEDA, SOC 2, and ISO 27001.", insight: "24/7 audit readiness with automated remediation.", magnet: "cspm" },
        { title: "DevSecOps Pipeline Engineering", desc: "Embed SAST, DAST, SBOM generation, and container image security directly into GitHub Actions or GitLab CI.", insight: "Ship code 10x faster with zero unvetted dependencies.", magnet: "devsecops" },
        { title: "ERP Security & Identity Lifecycle", desc: "Granular Zero Trust role matrices, automated onboarding/offboarding de-provisioning, and tokenized API gateways for ERPs.", insight: "Eliminate zombie credentials and insider risk.", magnet: "erp" },
        { title: "Automated Incident Remediation", desc: "Event-driven security runbooks built with SRE principles to quarantine threats, rotate breached keys, and maintain 99.99% uptime.", insight: "Machine-speed mitigation without waiting for manual triage.", magnet: "sre" }
      ],
      cta_title: "Ready to harden your cloud infrastructure?",
      cta_text: "Connect with our senior DevSecOps architects for a 30-minute diagnostic review of your cloud security posture.",
      cta_btn: "Request 30-Minute Security Audit"
    },
    caseStudies: {
      hero_title: "Case Studies & Production Outcomes",
      hero_subtitle: "How Atlantic Canadian organizations transformed security bottlenecks into automated competitive advantages.",
      cases: [
        { id: '1', title: "Atlantic Cold Chain Logistics Group", impact: "Zero Ransomware Downtime", quote: "Oakivo hardened our multi-cloud dispatch infrastructure and automated our API authentication. We passed our enterprise security review without a single finding.", author: "VP of Technology", problem: "Vulnerable legacy ERP endpoints and unmonitored cloud access across four Atlantic distribution centers.", solution: "Zero Trust ERP Gateway & Automated Threat Remediation." },
        { id: '2', title: "Regional Health-Tech Provider", impact: "SOC 2 Type II in 6 Weeks", quote: "Instead of drowning in spreadsheets, Oakivo's CSPM engine continuously generated our compliance proof. Our enterprise contracts closed months ahead of schedule.", author: "Chief Technology Officer", problem: "Manual compliance audits stalled enterprise hospital contracts.", solution: "Automated Compliance & DevSecOps Pipeline Integration." }
      ]
    },
    about: {
      hero_title: "Elite DevSecOps Engineering for Atlantic Canada.",
      hero_subtitle: "Headquartered in Dieppe, New Brunswick, we protect critical systems, eliminate deployment friction, and automate compliance for forward-thinking organizations.",
      standard_title: "The Oakivo Security Standard",
      standard_p1: "We believe security should never be a slow, bureaucratic bottleneck. When engineered with precision automation, security becomes your company's greatest accelerator.",
      standard_p2: "No vague advisory reports. No offshore ticket routing. We write deterministic code, build production CI/CD guardrails, and harden infrastructure directly.",
      standard_p3: "Based in Dieppe, our bilingual engineers are accountable to our Atlantic neighbors, delivering enterprise-grade engineering with local dedication.",
      leadership_title: "Engineering Leadership",
      team: [
        { name: "DevSecOps Lead Architect", role: "Principal Cloud Security Architect", bio: "Over 12 years engineering high-availability cloud infrastructure, Kubernetes security gates, and automated compliance pipelines.", credentials: "CISSP, AWS Certified Security Specialist, CKA", linkedin: "#" },
        { name: "Automation & SRE Lead", role: "Site Reliability & Security Engineer", bio: "Specialist in event-driven security runbooks, Zero Trust ERP gateways, and automated threat containment.", credentials: "BSc Computer Science, Terraform Certified Associate", linkedin: "#" }
      ]
    },
    blog: {
      hero_title: "DevSecOps & Cloud Security Insights.",
      hero_subtitle: "Technical frameworks, threat analyses, and automation strategies for engineering leaders in Atlantic Canada.",
      posts: [
        { id: 1, title: "Why Traditional Security Audits Fail Modern Atlantic Enterprises", excerpt: "Annual point-in-time audits leave months of blind spots. Here is how continuous CSPM automation keeps your infrastructure permanently compliant.", category: "Cloud Security", author: "Oakivo Engineering", date: "Aug 15, 2026", keyTakeawaysSummary: "Continuous automated compliance reduces audit prep time by 90% and eliminates configuration drift.", sections: { introduction: "Point-in-time audits provide a false sense of security.", discussion: "Between annual reviews, infrastructure drifts, new cloud resources are spawned, and credentials leak. Continuous policy-as-code is the only sustainable answer.", conclusion: "Automate your evidence collection and stay audit-ready 365 days a year.", takeaways: ["Zero Audit Panic", "Continuous Evidence"] } },
        { id: 2, title: "Shifting Left: How Automated CI/CD Gates Eliminate Release Bottlenecks", excerpt: "Discover how embedding automated SAST, DAST, and container vulnerability scanning accelerates feature delivery rather than slowing it down.", category: "DevSecOps", author: "Oakivo Engineering", date: "Aug 20, 2026", keyTakeawaysSummary: "Catching vulnerabilities in CI/CD is 100x cheaper and 10x faster than fixing production breaches.", sections: { introduction: "Security reviews at the end of the sprint cause release delays and team friction.", discussion: "By automating security tests within the pull request workflow, engineers get instant feedback and fix issues before code merges.", conclusion: "Security becomes an automated velocity booster rather than a gatekeeper.", takeaways: ["10x Faster Releases", "Zero Unvetted Code"] } }
      ]
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
    booking: {
      hero_title: "30-Minute Security Architecture Audit.",
      hero_subtitle: "Schedule a focused, senior-level diagnostic review of your cloud infrastructure, CI/CD pipelines, and compliance readiness.",
      success_title: "Security Audit Scheduled.",
      success_message: "A calendar invitation and pre-audit questionnaire have been sent to your work email."
    }
  },
  fr: {
    nav: { 
      home: 'Accueil', 
      arsenal: 'Arsenal DevSecOps', 
      services: 'Services & Piliers', 
      process: 'Processus en 3 Étapes',
      work: 'Études de Cas',
      case_studies: 'Études de Cas', 
      about: 'À Propos', 
      contact: 'Audit de Sécurité', 
      careers: 'Carrières',
      booking: 'Planifier un Audit',
      compliance: 'Sécurité & Conformité',
      privacy: 'Politique de Confidentialité',
      solutions: 'Solutions',
      locations: 'Emplacements'
    },
    common: {
      cta_book_audit: "Demandez Votre Audit d'Architecture de Sécurité (30 min)",
      cta_audit: "Demander l'Audit (30 min)",
      cta_blueprint: "Obtenir le Plan de Remédiation",
      cta_explore_arsenal: "Explorer l'Arsenal DevSecOps",
      cta_meet: "Rencontrer Nos Ingénieurs en Sécurité",
      cta_mobile_sticky: "Demander l'Audit de Sécurité",
      cta_schedule: "Planifier l'Audit de 30 Min",
      submitting: "Envoi de la demande...",
      success: "Demande d'Audit Transmise !",
      guarantee: "Ingénierie 100 % Bilingue (EN/FR) • Siège à Dieppe, N.-B. • Zéro Interruption des Pipelines",
      no_disruption: "Zéro Interruption des Pipelines",
      regional_focus: "Partenaire de Sécurité au Canada Atlantique",
      regional_sub: "Dieppe / Moncton • Halifax • Charlottetown • St. John's"
    },
    hero: {
      badge: "Automatisation DevSecOps & Sécurité Infonuagique • Dieppe, N.-B. & Canada Atlantique",
      headline_main: "Déployez plus vite. Restez invulnérable.",
      headline_accent: "Garanti.",
      subtitle: "Nous concevons la sécurité infonuagique automatisée, les balises de conformité et les pipelines DevSecOps pour les entreprises du Canada atlantique—protégeant vos données ERP, clients, santé et logistique sans ralentir vos livraisons logicielles.",
      cta: "Demandez Votre Audit d'Architecture de Sécurité (30 min)",
      secondary_cta: "Explorer Notre Arsenal DevSecOps",
      guarantee: "100 % Bilingue (FR/EN) • Siège Social à Dieppe, Nouveau-Brunswick • Zéro Interruption de Service",
      video_tag: "MAILLAGE D'INFRASTRUCTURE EN TEMPS RÉEL",
      video_desc: "Garde-fous DevSecOps autonomes et nœuds auto-cicatrisants actifs dans les environnements infonuagiques hybrides atlantiques."
    },
    problem: {
      badge: "Risques d'Affaires Critiques",
      title_main: "Déploiements Lents, Prolifération Infonuagique et Cauchemars d'Audit.",
      title_accent: "Nous Réglons les Trois.",
      subtitle: "Lorsque la sécurité est gérée manuellement ou greffée après coup, les entreprises atlantiques en modernisation font face à des goulots d'étranglement coûteux, des échecs d'audit et des failles critiques.",
      point1_title: "Échecs d'Audits de Conformité et Retards Réglementaires",
      point1_desc: "Les vérifications manuelles pour SOC 2, HIPAA, LPRPDE et PCI-DSS exigent des centaines d'heures de tableurs et retardent la signature de contrats d'envergure.",
      point1_solution: "Nous remplaçons la préparation manuelle par une gestion automatisée de la posture de sécurité infonuagique (CSPM) qui applique les règles en continu. Votre infrastructure reste prête pour l'audit 24/7/365 avec génération automatique de preuves vérifiables.",
      point1_stat: "Zéro panique d'audit avec preuves générées en continu 24/7",
      point2_title: "Pipelines CI/CD Bloqués et Lenteur de Livraison",
      point2_desc: "Les révisions de sécurité en fin de cycle bloquent les déploiements logiciels pendant des semaines, créant des frictions majeures entre développeurs et responsables du risque.",
      point2_solution: "Nous intégrons l'analyse statique automatisée, l'analyse des conteneurs et la politique sous forme de code directement dans vos pipelines CI/CD. Les vulnérabilités sont corrigées avant la mise en production. Vos équipes déploient vite et en toute confiance.",
      point2_stat: "Déploiements 10x plus rapides grâce à la sécurité intégrée (Shift-Left)",
      point3_title: "Données ERP Non Sécurisées et Accès Orphelins",
      point3_desc: "Les systèmes centraux (SAP, Odoo, logiciels de répartition logistique, bases comptables) regorgent souvent de comptes surprivilégiés, d'API exposées et d'identifiants d'anciens employés.",
      point3_solution: "Nous appliquons une architecture Zéro Confiance stricte et la gestion automatisée du cycle de vie des identités sur vos ERP et microservices. Chaque transaction et jeton d'accès est validé cryptographiquement et renouvelé automatiquement.",
      point3_stat: "Moindre privilège Zéro Confiance & révocation instantanée"
    },
    arsenal: {
      badge: "L'Arsenal DevSecOps",
      title_main: "Sécurité de Niveau Entreprise. ",
      title_accent: "Conçue par l'Automatisation.",
      subtitle: "Quatre piliers modulaires et éprouvés en production pour sécuriser votre infrastructure infonuagique, vos pipelines et vos ERP.",
      pillar1_title: "Gestion de Posture Infonuagique (CSPM) & Conformité Automatisée",
      pillar1_headline: "Transformez la Conformité en Assurance Continue.",
      pillar1_desc: "Fini les semaines passées à fouiller les consoles AWS, Azure et Google Cloud avant les audits. Nous construisons des moteurs de conformité automatisés qui analysent en continu votre environnement multi-cloud selon les cadres LPRPDE, SOC 2, ISO 27001 et NIST.",
      pillar1_feature1: "Détection automatique des mauvaises configurations et application instantanée des politiques.",
      pillar1_feature2: "Détection en temps réel des dérives pour l'Infrastructure-as-Code (Terraform, OpenTofu, Pulumi).",
      pillar1_feature3: "Rapports d'audit instantanés et archives de preuves cryptographiques automatisées.",
      pillar1_tag: "CSPM / LPRPDE / SOC 2",

      pillar2_title: "Ingénierie de Pipelines DevSecOps (Sécurité Shift-Left)",
      pillar2_headline: "Développez Vite. Ne Cassez Rien. Sécurisez Chaque Commit.",
      pillar2_desc: "La sécurité doit accélérer la livraison logicielle, pas la paralyser. Nous concevons des barrières de sécurité CI/CD robustes (GitHub Actions, GitLab CI, ArgoCD) qui analysent automatiquement le code source, les bibliothèques tierces, les images de conteneurs et les manifests Kubernetes avant déploiement.",
      pillar2_feature1: "Génération automatisée SAST, DAST et inventaire logiciel SBOM.",
      pillar2_feature2: "Signature d'images de conteneurs et prévention des fuites de secrets.",
      pillar2_feature3: "Application de la politique sous forme de code garantissant zéro code vulnérable en production.",
      pillar2_tag: "CI/CD / Shift-Left / SBOM",

      pillar3_title: "Sécurité ERP & Gestion du Cycle de Vie des Identités",
      pillar3_headline: "Protégez le Cœur Financier et Opérationnel de Votre Entreprise.",
      pillar3_desc: "Vos plateformes ERP et CRM contiennent vos secrets commerciaux les plus sensibles, dossiers financiers et registres clients. Nous mettons en place des contrôles d'accès Zéro Confiance granulaires, l'attribution automatisée des rôles et des passerelles d'API sécurisées.",
      pillar3_feature1: "Attribution automatique des accès à l'embauche et révocation immédiate au départ.",
      pillar3_feature2: "Matrice des rôles au moindre privilège et passerelles API sécurisées par jetons.",
      pillar3_feature3: "Surveillance en temps réel de l'exfiltration anormale de données ERP.",
      pillar3_tag: "Zéro Confiance / ERP / IAM",

      pillar4_title: "Remédiation Automatisée des Incidents (Sécurité Orientée SRE)",
      pillar4_headline: "Neutralisez les Menaces à la Vitesse des Machines.",
      pillar4_desc: "Les analystes humains ne peuvent pas réagir en quelques millisecondes. Nous appliquons les principes de l'Ingénierie de Fiabilité de Site (SRE) à votre sécurité, avec des procédures automatisées qui isolent les charges compromises, renouvellent les clés compromises et corrigent les dérives instantanément.",
      pillar4_feature1: "Exécution automatisée de scénarios contre les attaques DDoS, force brute et credential stuffing.",
      pillar4_feature2: "Journalisation immuable, ingestion SIEM centralisée et analyse médico-légale instantanée.",
      pillar4_feature3: "Résilience et disponibilité de 99,99 % avec infrastructure infonuagique auto-cicatrisante.",
      pillar4_tag: "SRE / Défense Autonome"
    },
    steps: {
      badge: "Exécution Prévisible",
      title_main: "De Vulnérable à Invulnérable en ",
      title_accent: "3 Étapes Structurées.",
      subtitle: "Aucun mandat de consultation sans fin. Aucune interruption d'activité. Une ingénierie DevSecOps d'une précision chirurgicale.",
      step1_num: "1",
      step1_title: "Étape 1 : Audit de Sécurité & d'Architecture",
      step1_time: "Jours 1 à 5",
      step1_desc: "Nous réalisons une analyse approfondie de votre infrastructure infonuagique, de vos pipelines de déploiement, des accès ERP et des écarts de conformité. Vous recevez un plan clair de menaces et de remédiation avec hiérarchisation des risques.",
      step2_num: "2",
      step2_title: "Étape 2 : Déploiement Automatisé des Pipelines et Politiques",
      step2_time: "Semaines 2 à 4",
      step2_desc: "Dans un environnement bac à sable isolé, nos ingénieurs construisent vos balises de sécurité automatisées, vos contrôles CI/CD et vos politiques d'infrastructure-as-code avec zéro interruption pour vos applications en direct.",
      step3_num: "3",
      step3_title: "Étape 3 : DevSecOps Continu & Supervision SRE",
      step3_time: "En Continu",
      step3_desc: "Vos pipelines et actifs infonuagiques sont surveillés par des moteurs de détection automatisés soutenus par des ingénieurs seniors locaux au Canada atlantique. Votre sécurité évolue au rythme de votre croissance."
    },
    local_wedge: {
      badge: "L'Avantage Dieppe & Canada Atlantique",
      title: "Une Sécurité de Niveau Entreprise par des Ingénieurs de Votre Fuseau Horaire.",
      p1: "Lorsqu'une alerte critique survient ou qu'une date limite d'audit approche, vous n'avez pas besoin d'une file d'attente anonyme basée à Toronto ou à l'étranger.",
      p2: "Basée à Dieppe, au Nouveau-Brunswick, Oakivo Solutions fournit une ingénierie DevSecOps et de sécurité infonuagique de niveau senior, entièrement bilingue (français et anglais), aux organisations du Grand Moncton, de la Nouvelle-Écosse, de l'Î.-P.-É. et de Terre-Neuve.",
      p3: "Nous combinons les exigences techniques intransigeantes de l'ingénierie d'entreprise mondiale avec la responsabilité, la réactivité et la confiance d'un partenaire régional dévoué."
    },
    outcomes: {
      badge: "Impact Mesurable",
      title_main: "Conçu pour la Résilience. ",
      title_accent: "Prouvé en Production.",
      metric1_val: "0 Min",
      metric1_title: "De Panique Avant les Audits",
      metric1_desc: "La collecte continue et automatisée des preuves de conformité remplace la recherche manuelle chaotique dans les tableurs pour SOC 2 et LPRPDE.",
      metric2_val: "10x",
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
    drawer: {
      tag: "Audit de Sécurité Oakivo (30 Min)",
      title: "Demandez Votre Audit d'Architecture de Sécurité (30 Min)",
      desc: "Sans pression commerciale. Un de nos spécialistes DevSecOps seniors évaluera votre infrastructure infonuagique, vos pipelines ou vos accès ERP et vous remettra un plan de remédiation hiérarchisé—100 % gratuit.",
      name_label: "Votre nom *",
      name_placeholder: "ex. David Cormier",
      email_label: "Courriel professionnel *",
      email_placeholder: "ex. david@entreprise.ca",
      company_label: "Entreprise / Organisation *",
      company_placeholder: "ex. Logistique Maritime Inc.",
      bottleneck_label: "Quel est votre principal défi en sécurité, conformité ou pipeline ? *",
      bottleneck_placeholder: "ex. Audit SOC 2 imminent, déploiements CI/CD trop lents, sécurisation des accès ERP, vulnérabilités conteneurs...",
      submit_btn: "Demander Mon Audit d'Architecture de Sécurité (30 Min)",
      submitting: "Planification en cours...",
      success_title: "Demande d'Audit de Sécurité Confirmée",
      success_desc: "Un architecte DevSecOps senior de notre bureau de Dieppe examinera vos informations et vous contactera sous 24h avec des propositions de créneaux.",
      success_close: "Fermer et Revenir au Site",
      footer_badge: "DevSecOps & Sécurité Infonuagique d'Entreprise",
      footer_region: "Siège Social à Dieppe, Nouveau-Brunswick"
    },
    footer: {
      card_tag: "Audit de Sécurité de 30 Min",
      card_title: "Prêt à déployer plus vite sans compromettre votre sécurité ?",
      card_desc: "Demandez une révision d'architecture de 30 minutes avec nos experts DevSecOps à Dieppe. Nous identifierons vos risques prioritaires et tracerons une voie de remédiation automatisée.",
      cta_audit: "Demander Mon Audit d'Architecture de Sécurité (30 Min)",
      callout_tag: "Audit de Sécurité de 30 Min",
      callout_title: "Prêt à déployer plus vite sans compromettre votre sécurité ?",
      callout_desc: "Demandez une révision d'architecture de 30 minutes avec nos experts DevSecOps à Dieppe. Nous identifierons vos risques prioritaires et tracerons une voie de remédiation automatisée.",
      callout_btn: "Demander Mon Audit d'Architecture de Sécurité (30 Min)",
      brand_desc: "Oakivo Solutions Inc. est une firme d'ingénierie DevSecOps, de sécurité infonuagique et d'automatisation basée à Dieppe, Nouveau-Brunswick—protégeant les entreprises du Canada atlantique en logistique, commerce, santé et services corporatifs.",
      badge_title: "Dieppe, N.-B. & Canada Atlantique",
      badge_desc: "Ingénierie DevSecOps bilingue de niveau senior pour les entreprises du Nouveau-Brunswick, de la Nouvelle-Écosse, de l'Î.-P.-É. et de Terre-Neuve.",
      focus_tag: "Partenaire de Sécurité au Canada Atlantique",
      focus_desc: "Ingénierie DevSecOps bilingue de niveau senior pour les entreprises du Nouveau-Brunswick, de la Nouvelle-Écosse, de l'Î.-P.-É. et de Terre-Neuve.",
      nav_title: "Navigation",
      nav_header: "Navigation",
      solutions_title: "Arsenal de Sécurité",
      solutions_header: "Arsenal de Sécurité",
      service_area: "Zone Desservie",
      area_header: "Présence Régionale",
      rights: "2026 Oakivo Solutions Inc. Tous droits réservés.",
      copyright: "© 2026 Oakivo Solutions Inc. Tous droits réservés.",
      privacy: "Politique de Confidentialité",
      compliance: "Sécurité & Conformité"
    },
    chatbot: {
      greeting: "Bienvenue chez Oakivo Solutions ! Je suis votre assistant DevSecOps et sécurité infonuagique. Nous aidons les entreprises du Canada atlantique à automatiser leur sécurité, réussir leurs audits de conformité et sécuriser leurs ERP. Comment puis-je vous aider aujourd'hui ?",
      placeholder: "Posez une question sur le CSPM, les pipelines DevSecOps ou nos audits...",
      quick_prompts: [
        "Demander un Audit de Sécurité (30 min)",
        "Comment fonctionne la conformité automatisée ?",
        "Qu'est-ce que la sécurité Shift-Left ?",
        "Sécurisation ERP & Zéro Confiance"
      ],
      audit_btn: "Demander l'Audit (30 min)"
    },
    verticals: {
      hero_title: "Secteurs d'Activité Desservis.",
      hero_subtitle: "Sécurité infonuagique spécialisée et ingénierie DevSecOps adaptées aux industries à fort enjeu du Canada atlantique.",
      cards: [
        { title: "Logistique & Chaîne d'Approvisionnement", desc: "Sécurisez les API de répartition, la télématique de flotte et les stocks en temps réel contre les rançongiciels et les accès non autorisés.", impact: "Zéro exposition d'API et disponibilité système de 99,99 %." },
        { title: "Santé & Technologies Médicales", desc: "Automatisez les garde-fous de conformité LPRPDE et HIPAA sur les dossiers patients, le stockage infonuagique et les microservices de diagnostic.", impact: "Préparation continue aux audits 24/7 avec journaux signés cryptographiquement." },
        { title: "Commerce de Détail & E-Commerce", desc: "Protégez les passerelles de paiement, l'authentification des clients et les intégrations ERP POS contre le credential stuffing et les fuites.", impact: "Application rigoureuse de la posture PCI-DSS Niveau 1 avec rotation automatique des secrets." },
        { title: "Services Financiers & Corporatifs", desc: "Mise en œuvre de la gestion d'identité Zéro Confiance, pipelines de documents chiffrés et pistes d'audit immuables.", impact: "Conformité SOC 2 Type II atteinte en quelques semaines plutôt qu'en mois." },
        { title: "Manufacture & Industrie", desc: "Liez les réseaux industriels et infonuagiques IT/OT avec des zones de sécurité étanches et une détection automatique d'anomalies.", impact: "Isolation garantie des réseaux de plancher de production critiques." },
        { title: "Secteur Public & Sociétés d'État", desc: "Souveraineté des données canadiennes, documentation bilingue et architecture multi-cloud durcie.", impact: "Conformité totale aux exigences infonuagiques canadiennes Protégé B." }
      ]
    },
    services: {
      hero_label: "Nos Services Principaux",
      hero_title: "L'Arsenal DevSecOps & d'Automatisation de Sécurité.",
      service1_title: "Gestion de Posture Infonuagique (CSPM)",
      service2_title: "Ingénierie de Pipelines DevSecOps",
      service3_title: "Sécurité ERP & IAM Zéro Confiance",
      service4_title: "Remédiation d'Incidents Automatisée SRE",
      list: [
        { title: "Gestion de Posture Infonuagique (CSPM)", desc: "Analyse continue multi-cloud, détection des dérives et preuves automatisées de conformité pour LPRPDE, SOC 2 et ISO 27001.", insight: "Prêt pour les audits 24/7 avec remédiation instantanée.", magnet: "cspm" },
        { title: "Ingénierie de Pipelines DevSecOps", desc: "Intégrez SAST, DAST, inventaire SBOM et sécurité des conteneurs directement dans GitHub Actions ou GitLab CI.", insight: "Déployez 10x plus vite sans dépendances vulnérables.", magnet: "devsecops" },
        { title: "Sécurité ERP & Cycle de Vie des Identités", desc: "Matrices de rôles Zéro Confiance, attribution/révocation automatique des accès et passerelles d'API sécurisées.", insight: "Éliminez les accès orphelins et les risques internes.", magnet: "erp" },
        { title: "Remédiation Automatisée des Incidents", desc: "Scénarios de sécurité automatisés inspirés du SRE pour isoler les menaces, renouveler les clés compromises et maintenir 99,99 % de disponibilité.", insight: "Mitigation à la vitesse machine sans attente de tri manuel.", magnet: "sre" }
      ],
      cta_title: "Prêt à durcir votre infrastructure infonuagique ?",
      cta_text: "Échangez avec nos architectes DevSecOps seniors pour une révision diagnostique de 30 minutes de votre posture de sécurité.",
      cta_btn: "Demander l'Audit de Sécurité (30 min)"
    },
    caseStudies: {
      hero_title: "Études de Cas & Résultats en Production",
      hero_subtitle: "Comment des organisations du Canada atlantique ont transformé leurs freins de sécurité en avantages concurrentiels automatisés.",
      cases: [
        { id: '1', title: "Groupe Logistique Frigorifique Atlantique", impact: "Zéro Interruption par Rançongiciel", quote: "Oakivo a durci notre infrastructure de répartition multi-cloud et automatisé notre authentification API. Nous avons passé notre audit d'entreprise sans aucune anomalie.", author: "Vice-président Technologie", problem: "Points de terminaison ERP vulnérables et accès non surveillés dans quatre centres de distribution.", solution: "Passerelle ERP Zéro Confiance & Remédiation Automatisée des Menaces." },
        { id: '2', title: "Fournisseur Régional de Technologies Médicales", impact: "SOC 2 Type II en 6 Semaines", quote: "Au lieu de nous noyer dans les tableurs, le moteur CSPM d'Oakivo a généré nos preuves en continu. Nos contrats majeurs ont été signés des mois d'avance.", author: "Directeur Général de la Technologie", problem: "Les audits manuels bloquaient les signatures de contrats hospitaliers majeurs.", solution: "Conformité Automatisée & Intégration DevSecOps." }
      ]
    },
    about: {
      hero_title: "Ingénierie DevSecOps d'Élite au Canada Atlantique.",
      hero_subtitle: "Basés à Dieppe, au Nouveau-Brunswick, nous protégeons les systèmes critiques, éliminons les frictions de déploiement et automatisons la conformité.",
      standard_title: "Le Standard de Sécurité Oakivo",
      standard_p1: "Nous croyons que la sécurité ne devrait jamais être un frein bureaucratique lent. Lorsqu'elle est conçue avec une automatisation de pointe, elle devient le plus grand accélérateur de votre entreprise.",
      standard_p2: "Pas de rapports d'analyse vagues. Pas de tickets acheminés à l'étranger. Nous écrivons du code déterministe, construisons des garde-fous CI/CD de production et durcissons l'infrastructure directement.",
      standard_p3: "Implantés à Dieppe, nos ingénieurs bilingues sont engagés envers notre communauté atlantique, offrant une ingénierie d'entreprise de classe mondiale avec une écoute locale.",
      leadership_title: "Direction de l'Ingénierie",
      team: [
        { name: "Architecte Principal DevSecOps", role: "Architecte de Sécurité Infonuagique", bio: "Plus de 12 ans d'expérience dans la conception d'infrastructures infonuagiques haute disponibilité, la sécurité Kubernetes et les pipelines de conformité automatisée.", credentials: "CISSP, AWS Certified Security Specialist, CKA", linkedin: "#" },
        { name: "Responsable Automatisation & SRE", role: "Ingénieur en Fiabilité de Site & Sécurité", bio: "Spécialiste des procédures de sécurité réactives, des passerelles ERP Zéro Confiance et du confinement autonome des menaces.", credentials: "B.Sc. Informatique, Terraform Certified Associate", linkedin: "#" }
      ]
    },
    blog: {
      hero_title: "Perspectives DevSecOps & Sécurité Infonuagique.",
      hero_subtitle: "Cadres techniques, analyses de menaces et stratégies d'automatisation pour les leaders de l'ingénierie au Canada atlantique.",
      posts: [
        { id: 1, title: "Pourquoi les Audits Traditionnels Échouent Face aux Entreprises Modernes", excerpt: "Les audits annuels ponctuels laissent des mois d'angles morts. Découvrez comment l'automatisation CSPM continue maintient votre conformité 365 jours par an.", category: "Sécurité Infonuagique", author: "Ingénierie Oakivo", date: "15 Août 2026", keyTakeawaysSummary: "La conformité automatisée réduit le temps de préparation d'audit de 90 % et élimine les dérives de configuration.", sections: { introduction: "Les audits ponctuels procurent un faux sentiment de sécurité.", discussion: "Entre deux audits annuels, l'infrastructure dérive et les clés s'exposent. La politique sous forme de code continue est la seule solution durable.", conclusion: "Automatisez vos preuves et restez prêts pour l'audit 365 jours par an.", takeaways: ["Zéro Panique d'Audit", "Preuves Continues"] } },
        { id: 2, title: "Sécurité Intégrée (Shift-Left) : Accélérer les Déploiements Sans Risque", excerpt: "Découvrez comment l'intégration de SAST, DAST et de l'analyse des conteneurs dans vos flux Git accélère la livraison au lieu de la freiner.", category: "DevSecOps", author: "Ingénierie Oakivo", date: "20 Août 2026", keyTakeawaysSummary: "Détecter les failles dans le pipeline CI/CD est 100x moins cher et 10x plus rapide que de corriger des failles en production.", sections: { introduction: "Vérifier la sécurité en fin de sprint crée des retards et des tensions.", discussion: "En automatisant les tests dans les demandes de fusion, les développeurs corrigent les failles immédiatement avant déploiement.", conclusion: "La sécurité devient un propulseur de vélocité automatisé.", takeaways: ["Déploiements 10x Plus Rapides", "Zéro Code Vulnérable"] } }
      ]
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
    booking: {
      hero_title: "Audit d'Architecture de Sécurité de 30 Minutes.",
      hero_subtitle: "Planifiez une révision diagnostique ciblée de votre infrastructure infonuagique, de vos pipelines CI/CD et de votre conformité.",
      success_title: "Audit de Sécurité Planifié.",
      success_message: "Une invitation calendrier et un questionnaire préparatoire ont été envoyés à votre courriel professionnel."
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
