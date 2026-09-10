var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);

// content/insights.ts
var insightsData = [
  {
    id: "ai-governance-eu-act-2026",
    title: "AI Governance and the EU AI Act: Navigating the New Regulatory Frontier",
    excerpt: "A strategic briefing on how multinational enterprises must operationalize compliance with the EU AI Act across their machine learning pipelines.",
    keyTakeaways: [
      "The EU AI Act classifies AI systems by risk, imposing stringent transparency and data governance requirements on 'high-risk' applications.",
      "Organizations must implement AI Bill of Materials (AI-BOM) to track model lineage, training datasets, and weight adjustments.",
      "Non-compliance carries existential financial penalties, far exceeding GDPR thresholds.",
      "CISOs must integrate LLM output validation and adversarial prompt defense directly into CI/CD security gating."
    ],
    content: "### Executive Summary\n\nThe enforcement of the European Union Artificial Intelligence Act (EU AI Act) represents a watershed moment in global technology regulation. Moving beyond theoretical ethics, the Act codifies rigorous, auditable standards for the development and deployment of AI systems. For multinational enterprises, treating AI governance as a downstream legal exercise is a fundamental miscalculation. Chief Information Security Officers (CISOs) and Chief Data Officers (CDOs) must architect programmatic compliance directly into their MLOps pipelines to mitigate existential regulatory risk.\n\n### 1. The Risk-Based Taxonomy\n\nThe EU AI Act operates on a tiered risk classification system. Systems deemed 'unacceptable risk' (e.g., untargeted biometric scraping) are outright banned. However, the operational complexity lies in the 'high-risk' tier\u2014encompassing AI used in critical infrastructure, employment, credit scoring, and law enforcement. High-risk systems demand exhaustive documentation, mandatory human oversight mechanisms, and cryptographically provable data governance standards. Organizations must immediately baseline their existing AI portfolios against this taxonomy.\n\n### 2. Operationalizing the AI Bill of Materials (AI-BOM)\n\nJust as the Software Bill of Materials (SBOM) revolutionized supply chain security, the AI-BOM is the new foundational artifact for AI governance. Enterprises can no longer deploy 'black box' models. An AI-BOM must dynamically track the lineage of foundational models, the provenance and copyright status of fine-tuning datasets, and the cryptographic hash of model weights. If a regulatory body audits an algorithmic decision (e.g., a denied loan application), the enterprise must be capable of tracing that output back to the specific training data epochs that influenced it.\n\n### 3. Adversarial AI and Runtime Validation\n\nThe Act explicitly mandates robustness against adversarial attacks and data poisoning. Traditional cybersecurity perimeters do not protect against prompt injection or model inversion. Engineering teams must implement dedicated AI firewalls and output validation layers. These runtime controls evaluate incoming prompts for malicious intent and sanitize LLM outputs before they are presented to the end-user, ensuring the model does not leak PII or violate established guardrails.\n\n### 4. The Strategic Imperative for the Board\n\nThe financial penalties for non-compliance are severe, capping at 7% of global annual turnover\u2014significantly exceeding GDPR limits. The boardroom mandate is clear: AI innovation cannot outpace governance. Organizations must establish cross-functional AI Ethics Committees, empowered to veto deployments that fail to meet strict auditability and robustness criteria. By shifting AI governance left, enterprises transform regulatory compliance from a liability into a competitive differentiator in the trusted AI market.",
    date: "2026-09-09",
    author: "Oakivo Policy & Governance",
    category: "AI Governance",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "cnapp-ebpf-runtime-security",
    title: "The Evolution of Cloud-Native Security: Harnessing eBPF for Deep Runtime Visibility",
    excerpt: "How extended Berkeley Packet Filter (eBPF) is revolutionizing Cloud-Native Application Protection Platforms (CNAPP) by providing zero-instrumentation observability.",
    keyTakeaways: [
      "Traditional sidecar proxies and agent-based security introduce unacceptable latency and operational overhead in dense Kubernetes clusters.",
      "eBPF enables security telemetry extraction directly from the Linux kernel without altering application code or restarting workloads.",
      "Next-generation CNAPPs leverage eBPF to unify container security, network microsegmentation, and runtime threat detection.",
      "Security teams achieve unprecedented visibility into system calls, allowing for instantaneous termination of anomalous processes."
    ],
    content: "### Executive Summary\n\nThe complexity of modern, highly ephemeral microservice architectures has outpaced the capabilities of traditional security instrumentation. Deploying heavyweight security agents or sidecar proxies into every Kubernetes pod creates unsustainable resource overhead and increases the attack surface. The paradigm is shifting toward extended Berkeley Packet Filter (eBPF)\u2014a revolutionary kernel-level technology. By leveraging eBPF, organizations can deploy comprehensive Cloud-Native Application Protection Platforms (CNAPP) that deliver zero-instrumentation, high-performance security observability across the entire cloud estate.\n\n### 1. The Friction of Traditional Instrumentation\n\nHistorically, securing a containerized workload required injecting a security agent into the container image or deploying a sidecar container (e.g., within an Istio service mesh). This approach is fraught with friction: it requires modifying deployment manifests, consumes significant CPU/memory resources per pod, and creates blind spots if an agent fails to initialize or is intentionally bypassed by a sophisticated attacker. In environments scaling to tens of thousands of pods, this architecture is operationally untenable.\n\n### 2. The Mechanics of eBPF Security\n\neBPF allows sandboxed programs to run directly within the Linux kernel\u2014the absolute lowest level of the operating system stack. Because every container on a host node shares the same underlying kernel, an eBPF program can observe every system call, network packet, and file system operation generated by any container, instantaneously. This 'zero-instrumentation' approach means applications are secured the millisecond they are scheduled, without requiring any changes to the application code, Dockerfiles, or Kubernetes manifests.\n\n### 3. Unifying CNAPP Capabilities\n\nThe integration of eBPF is transforming the CNAPP landscape. Instead of disparate tools for Cloud Security Posture Management (CSPM), Cloud Workload Protection (CWP), and network security, eBPF provides a unified telemetry stream. A modern CNAPP utilizing eBPF can simultaneously map network topologies, detect unauthorized privilege escalations (e.g., a container attempting to mount the host filesystem), and enforce microsegmentation policies at line-rate speeds.\n\n### 4. Real-Time Threat Mitigation\n\nVisibility is only half the equation; eBPF also empowers active mitigation. Because eBPF programs operate at the kernel level, they can instantly terminate a process or drop a network packet before the malicious action completes. If an attacker exploits a zero-day vulnerability and attempts a reverse shell, the eBPF program intercepts the anomalous `execve` system call and terminates the process in microseconds. For security engineering teams, mastering eBPF is no longer optional; it is the foundational requirement for securing the next generation of cloud-native infrastructure.",
    date: "2026-09-08",
    author: "Oakivo Infrastructure Security",
    category: "Cloud Architecture",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "ai-in-devsecops",
    title: "Autonomous Threat Modeling: Generative AI as a Force Multiplier in DevSecOps",
    excerpt: "An executive analysis of how large language models and autonomous agents are restructuring infrastructure-as-code validation and threat matrix generation.",
    keyTakeaways: [
      "Manual threat modeling (STRIDE) creates unacceptable CI/CD bottlenecks in fast-paced product engineering.",
      "LLM-driven AI agents can autonomously generate comprehensive threat matrices from IaC templates.",
      "Closed-loop auto-remediation rewrites IaC vulnerabilities pre-deployment, reducing MTTR from days to minutes.",
      "Security teams must transition from manual reviewers to governance engineers managing AI guardrails."
    ],
    content: "### Executive Summary\n\nThe integration of artificial intelligence within DevSecOps has transitioned from experimental code-completion utilities to core architectural necessity. For enterprises operating in highly regulated jurisdictions, the manual generation of threat models (e.g., STRIDE) and the human-dependent remediation of infrastructure-as-code (IaC) vulnerabilities represent unacceptable operational bottlenecks. By deploying specialized Large Language Models (LLMs) trained on cloud security paradigms, organizations can achieve autonomous, continuous threat modeling and immediate remediation, drastically reducing the time-to-secure while optimizing engineering resource allocation.\n\n### 1. The Bottleneck of Manual Threat Modeling\n\nHistorically, threat modeling required senior security architects to manually parse proposed network topologies, data flow diagrams, and IaC templates to identify potential vectors for spoofing, tampering, repudiation, information disclosure, denial of service, and elevation of privilege (STRIDE). In a continuous integration/continuous deployment (CI/CD) environment where infrastructure changes occur dozens of times a day, this manual review cycle is fundamentally incompatible with the speed of modern product engineering. The result is either a severe degradation in release velocity or, more commonly, the acceptance of unquantified risk.\n\n### 2. Autonomous Threat Matrix Generation via LLMs\n\nModern DevSecOps pipelines now utilize specialized generative AI agents to process IaC templates (such as Terraform, AWS CloudFormation, or Kubernetes manifests) at the pull-request stage. These models ingest the architectural intent and autonomously generate comprehensive threat matrices. \n\nBy understanding the semantic relationships between cloud resources\u2014for example, recognizing that an AWS Lambda function with overly permissive IAM roles communicating with an unencrypted RDS instance constitutes an escalation vector\u2014the AI immediately outputs a structured risk assessment. This allows security teams to focus on strategic risk mitigation rather than routine discovery.\n\n### 3. Closed-Loop Auto-Remediation\n\nIdentification without remediation yields marginal operational value. The current frontier involves closed-loop auto-remediation. When a static analysis tool (e.g., Checkov, Trivy) or an AI agent flags an IaC vulnerability, autonomous systems are now configured to generate and commit the required patch. \n\nFor instance, if a developer attempts to deploy an S3 bucket lacking KMS encryption and versioning, the pipeline halts. The AI agent rewrites the Terraform block, injects the mandatory `server_side_encryption_configuration` and `versioning` parameters, and submits a secondary pull request for human approval. This reduces the Mean Time to Remediation (MTTR) from days to minutes.\n\n### 4. Strategic Implications for Security Leadership\n\nThe deployment of autonomous DevSecOps agents necessitates a structural shift in how security teams operate. Security professionals must transition from being operators who execute manual reviews to governance engineers who design and maintain the guardrails within which the AI operates. The strategic imperative for Chief Information Security Officers (CISOs) is to baseline their current IaC review latency and aggressively pilot LLM-driven threat modeling workflows to maintain competitive release velocity without sacrificing compliance.",
    date: "2026-09-08",
    author: "Oakivo Research Group",
    category: "AI & Automation",
    readTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "zero-trust-architecture-2026",
    title: "Operationalizing Zero-Trust: Beyond the Network Perimeter",
    excerpt: "A strategic blueprint for implementing Zero-Trust architecture across distributed microservices and ephemeral cloud workloads.",
    keyTakeaways: [
      "Traditional perimeter defenses are obsolete in hybrid-cloud and remote workforce environments.",
      "Cryptographic identity\u2014not IP addresses\u2014must become the primary security boundary.",
      "Authorization must be context-aware and continuously evaluated throughout the user session.",
      "Microsegmentation restricts the blast radius of localized container breaches by enforcing default-deny policies."
    ],
    content: "### Executive Summary\n\nThe paradigm of a defensible network perimeter is obsolete. The proliferation of remote workforces, hybrid-cloud environments, and ephemeral containerized workloads has dissolved traditional boundaries. Zero-Trust Architecture (ZTA) operates on a foundational premise: trust is never implicitly granted based on network location. Instead, continuous, context-aware verification is required for every request. Implementing ZTA is not a product acquisition; it is a fundamental re-architecting of identity, network policy, and telemetry.\n\n### 1. Identity as the Primary Security Boundary\n\nIn a cloud-native ecosystem, IP addresses are volatile. Security posture must pivot from network-centric controls (firewalls, VPNs) to identity-centric authorization. This necessitates the implementation of strong, cryptographically backed identities for both human users and machine workloads. Service meshes, such as Istio or Linkerd, have emerged as the standard mechanism for enforcing mutual Transport Layer Security (mTLS) between microservices. This ensures that a compromised container cannot laterally access adjacent services without explicit cryptographic authorization.\n\n### 2. Continuous Contextual Authorization\n\nAuthentication is a point-in-time event; authorization must be continuous. Advanced Zero-Trust deployments leverage context-aware proxies (e.g., Google BeyondCorp, Azure AD Conditional Access) that evaluate telemetry data for every session. Risk engines analyze variables including device health posture, geographic origin, behavioral anomalies, and time of access. If a user's risk score elevates during an active session\u2014perhaps due to anomalous data exfiltration patterns\u2014the system dynamically revokes access or prompts for step-up authentication. Trust is treated as a highly transient state.\n\n### 3. Microsegmentation at the Workload Level\n\nTraditional network segmentation via VLANs is insufficiently granular for modern architectures. Microsegmentation enforces strict, default-deny network policies at the individual workload or pod level. Using Kubernetes NetworkPolicies or host-based agents, organizations can mandate that 'Service A' can only communicate with 'Service B' on a specific port, explicitly blocking all other egress or ingress traffic. This severely restricts the blast radius of any localized breach, preventing lateral movement.\n\n### 4. The Path Forward for Engineering Teams\n\nTransitioning to a Zero-Trust posture requires meticulous planning to avoid disrupting critical business operations. Organizations must begin by mapping all application dependencies and data flows\u2014a phase often referred to as 'discovery mode.' Once communication patterns are baselined, policies can be enforced incrementally. Engineering teams must prioritize declarative infrastructure and policy-as-code to ensure that Zero-Trust principles are immutable components of the deployment pipeline.",
    date: "2026-09-01",
    author: "Oakivo Architecture Practice",
    category: "Cloud Security",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "soc2-compliance-automation",
    title: "Continuous Compliance: Engineering SOC 2 Readiness into CI/CD Pipelines",
    excerpt: "Transforming regulatory compliance from an annual, reactive audit process into a continuous, automated engineering discipline.",
    keyTakeaways: [
      "Point-in-time compliance audits suffer from dangerous 'compliance drift' as infrastructure changes.",
      "Policy-as-Code (PaC) prevents developers from merging infrastructure changes that violate SOC 2 constraints.",
      "Automated evidence collection via cloud APIs removes manual screenshotting and human error.",
      "Embedding compliance checks early in the CI pipeline drastically reduces audit preparation time."
    ],
    content: "### Executive Summary\n\nFor enterprise software providers, SOC 2 Type II compliance is a mandatory commercial prerequisite. However, the traditional approach to maintaining compliance relies on manual evidence collection, periodic point-in-time audits, and reactive remediation. This model imposes significant operational overhead and introduces the risk of compliance drift between audit cycles. High-performing engineering teams treat compliance not as a distinct operational phase, but as an automated, continuous process embedded directly within the CI/CD pipeline.\n\n### 1. The Fallacy of Point-in-Time Audits\n\nA clean SOC 2 report demonstrates compliance at a specific moment in time. In environments where infrastructure is deployed dynamically via code, manual configuration checks are immediately rendered obsolete. Compliance drift occurs when unauthorized changes, manual overrides, or unpatched vulnerabilities are introduced post-audit. To mitigate this risk, controls must be evaluated continuously, blocking non-compliant changes before they reach production.\n\n### 2. Implementing Policy-as-Code (PaC)\n\nThe foundation of continuous compliance is Policy-as-Code. By codifying regulatory requirements (e.g., encryption at rest, multi-factor authentication, network isolation) into declarative rules using frameworks like Open Policy Agent (OPA) or Checkov, compliance becomes a testable artifact. During the CI phase, infrastructure-as-code templates are evaluated against these policies. If a developer attempts to merge a pull request that provisions a public-facing database, the PaC engine automatically fails the build, preventing the compliance violation proactively.\n\n### 3. Automated Evidence Collection\n\nThe most resource-intensive aspect of a SOC 2 audit is the gathering of operational evidence. Manual screenshotting of configuration panels is inefficient and prone to human error. Modern DevSecOps pipelines leverage API integrations to query configuration states directly from cloud providers (AWS Config, Azure Policy), identity providers (Okta, Entra ID), and version control systems (GitHub, GitLab). This data is aggregated into real-time compliance dashboards, providing auditors with cryptographically verifiable, continuous evidence of control adherence.\n\n### 4. Operational ROI\n\nAutomating SOC 2 compliance generates a measurable return on investment. By shifting compliance checks left\u2014into the developer workflow\u2014organizations eliminate the costly rework associated with late-stage security reviews. Additionally, automated evidence collection reduces audit preparation time by upwards of 70%, allowing engineering teams to remain focused on feature development and revenue-generating activities.",
    date: "2026-08-15",
    author: "Oakivo Compliance & Audit Strategy",
    category: "Compliance & DevSecOps",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "pipeda-data-residency-aws",
    title: "Architecting for PIPEDA: Data Sovereignty and Cloud Infrastructure Strategy",
    excerpt: "A comprehensive guide to structuring AWS architectures to ensure strict adherence to Canadian data residency and privacy mandates.",
    keyTakeaways: [
      "Service Control Policies (SCPs) guarantee data remains strictly within Canadian physical boundaries.",
      "Total cryptographic sovereignty requires Customer Managed Keys (CMKs) rather than standard cloud-provider keys.",
      "Disaster recovery and automated replication targets must be heavily audited to prevent cross-border data spillage.",
      "Continuous runtime monitoring tools are critical for detecting deviations from data residency baselines."
    ],
    content: "### Executive Summary\n\nThe Personal Information Protection and Electronic Documents Act (PIPEDA) mandates stringent controls over the storage, processing, and cross-border transfer of Canadian personal data. For enterprises leveraging public cloud providers such as Amazon Web Services (AWS), ensuring data residency and sovereignty requires deliberate architectural strategy. Organizations must implement programmatic guardrails to prevent inadvertent data exfiltration and retain total cryptographic control over sensitive workloads.\n\n### 1. Geographic Restrictions via Service Control Policies (SCPs)\n\nEnsuring data remains within Canadian borders requires enforcing geographic restrictions at the organizational level. AWS Organizations allows administrators to deploy Service Control Policies (SCPs) that supersede local IAM permissions. A properly configured SCP explicitly denies all data creation, modification, or storage actions (e.g., `ec2:RunInstances`, `s3:PutObject`, `rds:CreateDBInstance`) outside of the designated Canadian regions (typically `ca-central-1` in Montreal and `ca-west-1` in Calgary). This ensures that even highly privileged administrators cannot inadvertently provision infrastructure in non-compliant jurisdictions.\n\n### 2. Cryptographic Sovereignty and Key Management\n\nData residency addresses where data physically resides; data sovereignty addresses who exercises absolute control over that data. Under PIPEDA, protecting data from unauthorized foreign access is paramount. Relying solely on AWS Managed Keys is insufficient for high-risk workloads, as the cloud provider retains underlying access to the key material. Enterprises must utilize AWS Key Management Service (KMS) with Customer Managed Keys (CMKs), ideally backed by a CloudHSM (Hardware Security Module) cluster. This architecture ensures that the enterprise maintains exclusive control over the cryptographic material, providing mathematical assurance against unauthorized data access.\n\n### 3. Mitigating Risks in Disaster Recovery Architectures\n\nHigh availability requirements often necessitate cross-region data replication. However, automated disaster recovery mechanisms introduce substantial compliance risks. Engineering teams must rigorously audit replication configurations\u2014such as S3 Cross-Region Replication (CRR), RDS Read Replicas, and DynamoDB Global Tables\u2014to ensure synchronization targets remain strictly within approved Canadian regions. Any architectural drift that replicates PII to a US-based or European region constitutes a severe breach of data residency mandates.\n\n### 4. The Governance Mandate\n\nCompliance in the cloud is a shared responsibility. While AWS secures the underlying physical infrastructure, the enterprise is entirely responsible for the secure configuration of the workload. Organizations must implement continuous monitoring tools, such as AWS Config and Security Hub, to rapidly detect and alert on any architectural changes that deviate from established PIPEDA residency baselines.",
    date: "2026-07-22",
    author: "Oakivo Architecture Practice",
    category: "Architecture & Law",
    readTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "k8s-posture-management",
    title: "Kubernetes Security Posture Management (KSPM) for Highly Regulated Industries",
    excerpt: "Advanced methodologies for hardening Kubernetes clusters against lateral movement and privilege escalation in financial and healthcare environments.",
    keyTakeaways: [
      "The Kubernetes API control plane must be isolated from public internet exposure to prevent cluster-wide compromise.",
      "Dynamic admission controllers reject insecure container deployment requests at the orchestration level.",
      "Network policies operating on a 'Default Deny' framework restrict internal lateral movement between microservices.",
      "Continuous auditing agents automatically map cluster configurations against CIS Kubernetes Benchmarks."
    ],
    content: "### Executive Summary\n\nKubernetes has established itself as the de facto operating system of the cloud. However, its default configuration posture optimizes for developer velocity and operational ease, rather than stringent security. For institutions subject to strict regulatory frameworks such as PCI-DSS or HIPAA, deploying default Kubernetes clusters exposes the organization to severe operational risk. Implementing comprehensive Kubernetes Security Posture Management (KSPM) requires hardening the control plane, enforcing dynamic admission controls, and restricting lateral network movement.\n\n### 1. Hardening the Control Plane Surface Area\n\nThe Kubernetes API server acts as the central nervous system of the cluster. If compromised, an attacker gains unfettered access to all workloads and secrets. The API server must never be exposed to the public internet. Access must be strictly restricted to internal Virtual Private Cloud (VPC) subnets, fortified by bastion hosts or zero-trust network access (ZTNA) gateways. Additionally, comprehensive audit logging must be enabled and routed to an immutable, external storage vault to ensure forensic integrity during incident response.\n\n### 2. Enforcing Dynamic Admission Control\n\nOrganizations cannot rely on developer discipline to ensure secure pod configurations. Dynamic admission controllers provide a mandatory interception point before a pod is scheduled onto a node. By implementing tools such as Open Policy Agent (OPA) Gatekeeper or Kyverno, security teams can enforce rigid compliance rules using declarative policies. These policies automatically reject manifests that attempt to run containers as the root user (`runAsNonRoot: true`), request privileged escalation rights, or attempt to mount sensitive host filesystems (e.g., `/var/run/docker.sock`).\n\n### 3. Restricting Lateral Movement via Network Policies\n\nBy default, Kubernetes environments are highly permissive; all pods within a cluster can communicate freely with one another. This flat network topology facilitates rapid lateral movement in the event of a container compromise. Organizations must implement a 'Default Deny' network policy architecture across all namespaces. Security teams must then explicitly whitelist requisite ingress and egress communication pathways on a microservice-by-microservice basis. This microsegmentation contains the blast radius of a potential breach to the affected pod.\n\n### 4. Continuous Configuration Auditing\n\nKubernetes clusters are highly dynamic, and configuration drift is inevitable. Engineering teams must deploy continuous scanning agents to evaluate the cluster against established frameworks, such as the CIS Kubernetes Benchmark. Automated KSPM tools provide real-time visibility into misconfigurations, ensuring that the cluster remains compliant with stringent regulatory standards despite rapid deployment cycles.",
    date: "2026-06-10",
    author: "Oakivo Infrastructure Security",
    category: "Container Security",
    readTime: "9 min read",
    coverImage: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "cyber-resilience-genai-era",
    title: "Cyber Resilience in the Age of GenAI: The Boardroom Imperative",
    excerpt: "Why traditional perimeter security is failing against AI-generated attack vectors and how executives are restructuring their defense mechanisms.",
    keyTakeaways: [
      "AI-driven attacks have rendered traditional perimeter defense mechanisms largely ineffective.",
      "Organizations must pivot from 'breach prevention' to 'cyber resilience' and rapid continuity recovery.",
      "Synthetic identity fraud and deepfakes necessitate multi-modal biometric and cryptographic authentication.",
      "Board-level governance must mandate continuous stress-testing of incident response protocols using adversarial AI."
    ],
    content: "### Executive Summary\n\nThe democratization of Generative AI has permanently altered the cybersecurity threat landscape. Attackers are no longer constrained by human capital or technical proficiency; LLMs now autonomously write polymorphic malware, craft highly personalized spear-phishing campaigns, and orchestrate deepfake social engineering. In response, enterprise cybersecurity strategies must evolve from attempting to construct an impenetrable perimeter to engineering true 'Cyber Resilience'\u2014the operational capacity to absorb, mitigate, and rapidly recover from a successful breach.\n\n### 1. The Erosion of Perimeter Efficacy\n\nTraditional cybersecurity paradigms relied heavily on signature-based detection and heuristic firewalls. These static defenses are fundamentally incapable of mitigating AI-generated polymorphic code, which alters its cryptographic signature upon every execution. Organizations must assume breach. The focus must aggressively shift toward runtime behavioral analysis, leveraging defensive AI models capable of identifying anomalous execution patterns and halting lateral movement in real-time, independent of known signatures.\n\n### 2. Defending Against Synthetic Identity Exploitation\n\nThe proliferation of high-fidelity voice and video cloning has effectively weaponized executive identities. Standard multi-factor authentication (MFA) protocols\u2014particularly those relying on SMS or voice approval\u2014are increasingly vulnerable to AI-assisted interception and social engineering. High-assurance environments must mandate FIDO2-compliant hardware security keys (e.g., YubiKeys) and cryptographic biometric verification to completely eliminate the reliance on human-verifiable authenticators.\n\n### 3. Adversarial AI as a Defensive Strategy\n\nTo counter AI-driven offensives, organizations must deploy AI-driven defensives. 'Red teaming' can no longer be a quarterly manual exercise. Forward-looking CISOs are deploying continuous, autonomous penetration testing agents. These defensive AI models simulate novel, complex attack vectors across the corporate infrastructure 24/7, identifying zero-day vulnerabilities and misconfigurations before malicious actors can exploit them.\n\n### 4. Board-Level Governance and Recovery Architecture\n\nCyber resilience is ultimately a metric of recovery speed. Board directors must mandate strict Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO) specifically tailored for catastrophic ransomware scenarios. This requires the implementation of immutable, air-gapped data vaults and automated infrastructure-as-code rebuild pipelines, ensuring the enterprise can restore critical operations from a known-clean state in hours, rather than weeks.",
    date: "2026-09-05",
    author: "Oakivo Executive Strategy",
    category: "Strategic Risk & AI",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "supply-chain-cyber-risk",
    title: "Securing the Digital Supply Chain: Vendor Risk Management in the Cloud Era",
    excerpt: "A comprehensive framework for auditing and securing third-party API integrations, SaaS vendors, and open-source dependencies.",
    keyTakeaways: [
      "Third-party vendor breaches represent the single largest vector for enterprise data exfiltration.",
      "Traditional vendor questionnaires (e.g., SIG) are inadequate and must be replaced by continuous security telemetry monitoring.",
      "Software Bill of Materials (SBOMs) must be strictly mandated to track open-source dependencies across the SDLC.",
      "API gateways and explicit rate-limiting are required to contain potential fallout from compromised vendor connections."
    ],
    content: "### Executive Summary\n\nThe modern enterprise does not operate in isolation; it is a highly interconnected web of SaaS applications, external APIs, and open-source libraries. Consequently, the organization's security posture is only as robust as its weakest third-party integration. The exploitation of digital supply chains\u2014where attackers compromise a trusted vendor to access the primary target\u2014has become the preferred methodology for advanced persistent threats (APTs). Securing this expanded perimeter requires replacing static vendor questionnaires with continuous, telemetry-based risk management and strict zero-trust API enforcement.\n\n### 1. The Fallacy of Static Vendor Questionnaires\n\nHistorically, Vendor Risk Management (VRM) relied on annual security questionnaires and the exchange of SOC 2 reports. This static approach provides a point-in-time illusion of security, entirely failing to capture the dynamic reality of cloud infrastructure drift. Leading organizations are pivoting to continuous VRM platforms that monitor external vendor attack surfaces in real-time\u2014tracking exposed ports, expired certificates, and unpatched edge vulnerabilities\u2014triggering immediate alerts when a vendor's risk score deteriorates.\n\n### 2. Operationalizing Software Bill of Materials (SBOM)\n\nThe ubiquitous reliance on open-source software (OSS) introduces significant inherited risk, as demonstrated by severe vulnerabilities like Log4j. Organizations must mandate the generation and ingestion of Software Bill of Materials (SBOMs) throughout their CI/CD pipelines. By maintaining a cryptographic inventory of all internal and external dependencies, security teams can instantaneously identify and isolate vulnerable microservices the moment a new CVE is disclosed, drastically reducing the exploitation window.\n\n### 3. Hardening Third-Party API Integrations\n\nAPIs represent the primary conduit for inter-organization data exchange and, conversely, data exfiltration. Trusting a vendor's API implicitly is an architectural failure. Organizations must route all third-party traffic through hardened API gateways. These gateways enforce strict mutual TLS (mTLS), aggressively rate-limit requests to prevent bulk data scraping, and validate JSON schemas in real-time to block malicious payload injections.\n\n### 4. Designing for Vendor Compromise\n\nZero-Trust principles must extend to B2B relationships. Organizations must design architectures assuming that a tier-one SaaS vendor will eventually be compromised. This involves implementing rigorous Principle of Least Privilege (PoLP) for OAuth tokens, ensuring external applications only have access to the absolute minimum data required for their function. Furthermore, robust data loss prevention (DLP) protocols must actively monitor egress traffic bound for vendor domains, blocking anomalous data transfers automatically.",
    date: "2026-08-28",
    author: "Oakivo Compliance & Audit Strategy",
    category: "Supply Chain Risk",
    readTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "quantum-safe-cryptography-ciso",
    title: "Quantum-Safe Cryptography: A CISO's Timeline for Post-Quantum Migration",
    excerpt: "Strategic imperatives for transitioning enterprise cryptographic infrastructure to NIST-approved post-quantum algorithms before Q-Day.",
    keyTakeaways: [
      "Harvest Now, Decrypt Later (HNDL) attacks mean quantum threats pose an immediate risk to highly classified data.",
      "Organizations must immediately baseline their cryptographic inventory to identify vulnerable RSA and ECC implementations.",
      "The transition to NIST-standardized Post-Quantum Cryptography (PQC) requires extensive hardware and network capacity planning.",
      "Crypto-agility must become a core architectural requirement for all newly developed software and hardware systems."
    ],
    content: "### Executive Summary\n\nThe advent of Cryptographically Relevant Quantum Computers (CRQCs) poses an existential threat to modern digital infrastructure. Algorithms currently relying on integer factorization (RSA) and discrete logarithms (ECC)\u2014which secure internet communications, financial transactions, and digital identities\u2014will be effortlessly compromised by Shor's algorithm. While a functional CRQC may be a decade away, the 'Harvest Now, Decrypt Later' (HNDL) strategy employed by nation-state actors makes this an immediate boardroom priority. Chief Information Security Officers (CISOs) must initiate the migration to Post-Quantum Cryptography (PQC) today.\n\n### 1. The Immediate Threat: Harvest Now, Decrypt Later\n\nData with a long shelf-life\u2014such as healthcare records, financial ledgers, and national security intelligence\u2014is currently being intercepted and stored by adversaries. When a CRQC becomes available (an event colloquially known as 'Q-Day'), this encrypted data will be retroactively decrypted. For organizations holding highly sensitive data subject to strict regulatory lifecycles, the cryptographic clock has already run out. Mitigation requires immediately transitioning high-value data transmission tunnels (e.g., VPNs, SD-WANs) to quantum-resistant encryption protocols.\n\n### 2. Cryptographic Discovery and Inventory\n\nThe most significant hurdle in PQC migration is poor visibility. Most enterprises do not possess an accurate inventory of where and how cryptography is deployed within their applications, network appliances, and third-party dependencies. The immediate mandate for security leaders is the execution of an exhaustive cryptographic discovery process. This involves utilizing automated scanning tools to map key lengths, cipher suites, and certificate authorities across the entire hybrid cloud ecosystem, forming the baseline for the migration roadmap.\n\n### 3. Transitioning to NIST-Standardized Algorithms\n\nIn August 2024, NIST formalized the first set of post-quantum cryptographic standards (FIPS 203, 204, and 205). Replacing legacy algorithms with these new lattice-based and stateless hash-based algorithms is not a trivial swap. PQC algorithms generally require significantly larger key sizes and signature payloads, which can severely impact network latency and storage overhead. Engineering teams must conduct rigorous performance testing on legacy hardware, IoT devices, and low-bandwidth connections to ensure operational continuity during the upgrade.\n\n### 4. Engineering Crypto-Agility\n\nThe transition to PQC provides a strategic opportunity to fundamentally redesign how cryptography is managed. Organizations must abandon hard-coded cryptographic implementations. Instead, they must engineer 'Crypto-Agility'\u2014the architectural ability to rapidly swap cryptographic algorithms and key material without requiring substantial code rewrites or system downtime. By abstracting cryptography into dedicated, centrally managed microservices or HSMs, the enterprise ensures resilience not just against the quantum threat, but against all future algorithmic vulnerabilities.",
    date: "2026-08-10",
    author: "Oakivo Research Group",
    category: "Cryptography & Future Tech",
    readTime: "9 min read",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "atlantic-canada-critical-infrastructure-zero-trust",
    title: "Securing the Eastern Seaboard: Zero-Trust for Atlantic Canada's Critical Infrastructure",
    excerpt: "An architectural blueprint for defending offshore energy grids, transatlantic cable hubs, and maritime logistics networks against state-sponsored disruption.",
    keyTakeaways: [
      "Atlantic Canada's strategic position makes its marine and energy infrastructure prime targets for Advanced Persistent Threats (APTs).",
      "Traditional IT/OT (Operational Technology) air-gapping is failing; modern telemetry requires secure IT/OT convergence via Zero-Trust.",
      "Cryptographic microsegmentation must be deployed on SCADA systems managing offshore drilling and port logistics.",
      "Maritime supply chains must mandate Software Bill of Materials (SBOM) tracking to prevent kinetic disruption via digital vectors."
    ],
    content: "### Executive Summary\n\nAtlantic Canada occupies a uniquely strategic vector in the global geopolitical landscape. The region serves as the primary terminus for transatlantic telecommunications cables, a booming offshore energy sector, and highly integrated maritime logistics hubs (such as the Port of Halifax). However, this density of critical infrastructure has elevated the region into a primary target for state-sponsored Advanced Persistent Threats (APTs) seeking to inflict kinetic disruption via digital means. Securing this ecosystem requires abandoning legacy 'air-gapped' models in favor of rigorous Zero-Trust IT/OT convergence.\n\n### 1. The Myth of the Air Gap in Modern Maritime Tech\n\nHistorically, Operational Technology (OT)\u2014the systems controlling physical machinery on offshore rigs or autonomous cranes at ports\u2014was isolated from IT networks via a theoretical 'air gap'. This is no longer operationally viable. The demand for real-time telemetry, predictive maintenance, and remote diagnostics has forced IT and OT systems to converge. Unfortunately, many of these OT protocols (e.g., Modbus) were designed without intrinsic encryption or authentication. When perimeter firewalls fail, lateral movement from a compromised corporate IT laptop into the OT control layer is trivial.\n\n### 2. Cryptographic Microsegmentation of SCADA Systems\n\nTo defend Atlantic Canada's energy and port infrastructure, organizations must implement Zero-Trust microsegmentation at the protocol level. A compromised HVAC sensor on a marine vessel must not be able to communicate with the vessel's propulsion control system. By deploying identity-aware proxies and enforcing mutual TLS (mTLS) even on internal networks, security teams ensure that every SCADA (Supervisory Control and Data Acquisition) command is cryptographically verified against the explicit identity of the requestor, effectively neutralizing lateral movement.\n\n### 3. Supply Chain Security and Transatlantic Vectors\n\nThe Port of Halifax and regional maritime corridors are heavily dependent on third-party SaaS logistics software and international shipping manifests. The compromise of a third-party vendor (supply chain attack) can instantly halt cargo throughput. Regional authorities and enterprises must mandate real-time API traffic inspection and require Software Bill of Materials (SBOM) artifacts from all maritime software vendors. Trusting a vendor implicitly is an architectural flaw; continuous posture validation must be enforced on all B2B API integrations.\n\n### 4. The Mandate for Regional Cyber Resilience\n\nThe economic engine of Atlantic Canada relies on the unbroken continuity of these physical systems. Boards of Directors across the region's energy and logistics sectors must recognize that a cyber attack is no longer merely a data privacy issue\u2014it is a physical safety and geopolitical risk. Mandating Zero-Trust Architecture across all critical OT systems is the defining executive imperative for the next decade.",
    date: "2026-09-09",
    author: "Oakivo Maritime Security Practice",
    category: "Critical Infrastructure",
    readTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "data-residency-health-tech-atlantic-canada",
    title: "Navigating Data Sovereignty: Cloud Architectures for Atlantic Canada's Health-Tech Sector",
    excerpt: "How emerging health-tech firms in Nova Scotia and Newfoundland can architect globally scalable cloud pipelines while strictly adhering to PHIA and PIPEDA.",
    keyTakeaways: [
      "Health-tech innovation in Atlantic Canada requires balancing global cloud scalability with stringent provincial data residency laws.",
      "Relying on AWS or Azure 'Canada Central' regions is insufficient without Customer Managed Keys (CMKs) to ensure cryptographic sovereignty.",
      "Architectures must implement automated redaction pipelines to anonymize Protected Health Information (PHI) before utilizing global LLM APIs.",
      "Continuous Policy-as-Code enforcement prevents accidental cross-border data replication during CI/CD deployments."
    ],
    content: "### Executive Summary\n\nAtlantic Canada is rapidly emerging as a premier innovation hub for health-tech and biomedical research. Startups and established institutions in Halifax, St. John's, and Moncton are building AI-driven diagnostic tools and massive patient telemetry data lakes. However, this innovation collides directly with some of the most stringent data residency regulations in North America, including federal PIPEDA and provincial frameworks like Nova Scotia's PHIA. Architecting for these constraints without sacrificing the computational power of public clouds (AWS, GCP, Azure) requires engineering absolute cryptographic sovereignty.\n\n### 1. The Distinction Between Residency and Sovereignty\n\nA common architectural fallacy among health-tech founders is conflating data residency with data sovereignty. Simply provisioning an AWS S3 bucket in the `ca-central-1` (Montreal) region fulfills residency (the data physically sits in Canada). However, if the encryption keys are managed entirely by the cloud provider, a foreign government entity could theoretically compel the provider to hand over the decrypted data under acts like the US CLOUD Act. True sovereignty requires health-tech firms to implement Customer Managed Keys (CMKs) backed by localized Hardware Security Modules (HSMs). The enterprise\u2014not the cloud provider\u2014must hold the mathematical ability to decrypt the data.\n\n### 2. Safeguarding PHI in the Age of LLMs\n\nThe integration of Large Language Models (LLMs) into health-tech platforms offers unprecedented diagnostic assistance, but introduces severe data spillage risks. Sending raw Protected Health Information (PHI) to global AI APIs (which may route processing through US data centers) is a catastrophic regulatory breach. Oakivo engineers architectures that deploy localized, open-weights models (running entirely within Canadian borders) to act as Anonymization Proxies. These local models aggressively redact all PHI from a dataset before the sanitized query is allowed to egress to a more powerful global API for complex reasoning.\n\n### 3. Policy-as-Code for Cross-Border Replication\n\nModern cloud architectures rely heavily on automated disaster recovery and read-replicas. Without programmatic guardrails, a junior engineer could easily deploy a Terraform script that replicates a Nova Scotian patient database to an `us-east-1` failover region, triggering an immediate compliance incident. Health-tech organizations must deploy Policy-as-Code frameworks (such as Open Policy Agent) directly into their CI/CD pipelines. These tools analyze infrastructure changes pre-deployment and automatically block any action attempting to provision data storage or replication outside of explicitly whitelisted Canadian regions.\n\n### 4. The Competitive Advantage of Compliance\n\nFor Atlantic Canadian health-tech firms seeking to scale, robust data sovereignty is not merely a legal hurdle\u2014it is a powerful commercial differentiator. By transparently engineering architectures that mathematically guarantee the protection of PHI against both breaches and foreign subpoena, these organizations build the ultimate currency in healthcare: unshakeable institutional trust.",
    date: "2026-09-08",
    author: "Oakivo Compliance & Data Sovereignty",
    category: "Health-Tech & Compliance",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"
  }
];

// server.ts
var import_cors = __toESM(require("cors"), 1);
var import_helmet = __toESM(require("helmet"), 1);
var import_express_rate_limit = __toESM(require("express-rate-limit"), 1);
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_genai = require("@google/genai");
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.set("trust proxy", 1);
  app.use(
    (0, import_helmet.default)({
      contentSecurityPolicy: process.env.NODE_ENV === "production" ? {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "https://apis.google.com",
            "https://www.gstatic.com",
            "https://www.googletagmanager.com"
          ],
          // Removed unsafe-inline and unsafe-eval to prevent XSS
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          // unsafe-inline kept ONLY for Framer Motion animation styles
          fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
          imgSrc: ["'self'", "data:", "https://*", "blob:"],
          connectSrc: ["'self'", "https://*", "wss://*"],
          frameSrc: ["'self'", "https://*.firebaseapp.com"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          upgradeInsecureRequests: []
        }
      } : false,
      // Keep CSP off in dev to avoid Vite HMR issues
      crossOriginEmbedderPolicy: false,
      hsts: {
        maxAge: 31536e3,
        // 1 year
        includeSubDomains: true,
        preload: true
      },
      frameguard: {
        action: "deny"
        // Prevent clickjacking
      },
      xContentTypeOptions: true,
      // X-Content-Type-Options: nosniff
      hidePoweredBy: true
    })
  );
  app.use((0, import_cors.default)());
  app.use(import_express.default.json({ limit: "10kb" }));
  const apiLimiter = (0, import_express_rate_limit.default)({
    windowMs: 15 * 60 * 1e3,
    // 15 minutes
    max: 100,
    // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests from this IP, please try again after 15 minutes" }
  });
  const formLimiter = (0, import_express_rate_limit.default)({
    windowMs: 60 * 60 * 1e3,
    // 1 hour window
    max: 5,
    // limit each IP to 5 form submissions per hour
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many form submissions from this IP, please try again after an hour. For urgent matters, email us directly." }
  });
  const chatLimiter = (0, import_express_rate_limit.default)({
    windowMs: 15 * 60 * 1e3,
    // 15 minutes
    max: 15,
    // limit each IP to 15 chat interactions per 15 minutes
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Chat limit reached to prevent AI abuse. Please try again later or contact us directly." }
  });
  app.use("/api/", apiLimiter);
  let transporter;
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    transporter = import_nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      connectionTimeout: 2e3,
      // 2 seconds timeout so it doesn't hang UI
      greetingTimeout: 2e3,
      socketTimeout: 2e3,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else {
    transporter = {
      sendMail: async (info) => {
        console.log("--- MOCK EMAIL SENT ---");
        console.log("To:", info.to);
        console.log("Subject:", info.subject);
        console.log("Text:", info.text);
        console.log("-----------------------");
        return { messageId: "mock-id" };
      }
    };
  }
  const escapeHtml = (unsafe) => {
    if (typeof unsafe !== "string") return unsafe;
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  };
  const logFormSubmission = (req, res, next) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    let maskedIp = "unknown";
    if (ip !== "unknown") {
      if (ip.includes(":")) {
        const parts = ip.split(":");
        maskedIp = parts.slice(0, Math.max(1, parts.length - 2)).join(":") + ":***:***";
      } else {
        const parts = ip.split(".");
        maskedIp = parts.slice(0, Math.max(1, parts.length - 1)).join(".") + ".***";
      }
    }
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    console.log(`[SECURITY_LOG] Form Submission Attempt | Time: ${timestamp} | Endpoint: ${req.originalUrl} | IP: ${maskedIp}`);
    next();
  };
  app.post("/api/book-audit", formLimiter, logFormSubmission, async (req, res) => {
    try {
      const { name, email, company, message, urgency } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }
      if (name.length > 100 || email.length > 150 || message.length > 5e3 || company && company.length > 100 || urgency && urgency.length > 50) {
        return res.status(400).json({ error: "Input exceeds maximum allowed length." });
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Invalid email format." });
      }
      const mailOptions = {
        from: process.env.SMTP_USER || '"Oakivo System" <no-reply@oakivo.com>',
        to: process.env.CONTACT_EMAIL || "olabel@gmail.com, ahmed.bello@oakivo.com",
        subject: `[High Priority] Security Audit Request - ${company || name}`,
        text: `New Security Audit Request

Name: ${name}
Email: ${email}
Company: ${company || "N/A"}
Urgency: ${urgency || "Normal"}

Message:
${message}`,
        html: `<h2>New Security Audit Request</h2>
               <p><strong>Name:</strong> ${escapeHtml(name)}</p>
               <p><strong>Email:</strong> ${escapeHtml(email)}</p>
               <p><strong>Company:</strong> ${escapeHtml(company || "N/A")}</p>
               <p><strong>Urgency:</strong> ${escapeHtml(urgency || "Normal")}</p>
               <hr/>
               <p><strong>Message:</strong></p>
               <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`
      };
      try {
        await transporter.sendMail(mailOptions);
      } catch (mailError) {
        console.error("Email send failed (likely due to sandbox environment blocking port), continuing anyway:", mailError);
      }
      res.json({ success: true, message: "Your request has been prioritized and dispatched to our engineering team." });
    } catch (error) {
      console.error("API processing error:", error);
      res.status(500).json({ error: "Failed to process request. Please try again later." });
    }
  });
  app.post("/api/notify-form", logFormSubmission, async (req, res) => {
    try {
      const { type, data, entryId } = req.body;
      let htmlContent = `<h2>New Form Submission: ${type.toUpperCase()}</h2>`;
      htmlContent += `<p><strong>Entry ID:</strong> ${entryId}</p><hr/>`;
      let textContent = `New Form Submission: ${type.toUpperCase()}
Entry ID: ${entryId}

`;
      for (const [key, value] of Object.entries(data)) {
        const safeKey = escapeHtml(key);
        const safeValue = escapeHtml(String(value));
        htmlContent += `<p><strong>${safeKey}:</strong> ${safeValue}</p>`;
        textContent += `${safeKey}: ${safeValue}
`;
      }
      const mailOptions = {
        from: process.env.SMTP_USER || '"Oakivo System" <no-reply@oakivo.com>',
        to: process.env.CONTACT_EMAIL || "olabel@gmail.com, ahmed.bello@oakivo.com",
        subject: `[Oakivo] New ${type} Submission`,
        text: textContent,
        html: htmlContent
      };
      try {
        await transporter.sendMail(mailOptions);
      } catch (mailError) {
        console.error("Email send failed:", mailError);
      }
      res.json({ success: true });
    } catch (error) {
      console.error("API processing error:", error);
      res.status(500).json({ error: "Failed to process request." });
    }
  });
  app.post("/api/chat", chatLimiter, async (req, res) => {
    try {
      const { messages, language } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Valid messages array is required." });
      }
      if (messages.length > 50) {
        return res.status(400).json({ error: "Too many messages in history." });
      }
      for (const msg of messages) {
        if (!msg.content || typeof msg.content !== "string" || msg.content.length > 2e3) {
          return res.status(400).json({ error: "Message content must be a string under 2000 characters." });
        }
        if (msg.type !== "user" && msg.type !== "bot") {
          return res.status(400).json({ error: "Invalid message type." });
        }
      }
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "AI capabilities are currently unavailable." });
      }
      const ai = new import_genai.GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
      const formattedContents = messages.map((msg) => ({
        role: msg.type === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      }));
      const langInstruction = language === "fr" ? "Vous devez r\xE9pondre en fran\xE7ais. " : "You must reply in English. ";
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: formattedContents,
        config: {
          systemInstruction: langInstruction + "You are an expert DevSecOps sales engineer and security consultant for Oakivo. Keep your answers concise, professional, and helpful. Guide the user towards scheduling a compliance audit or security consultation."
        }
      });
      res.json({ reply: response.text });
    } catch (error) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: "Failed to process AI response." });
    }
  });
  app.get("/rss.xml", (req, res) => {
    const siteUrl = "https://www.oakivo.com";
    let rssItems = "";
    try {
      insightsData.forEach((post) => {
        rssItems += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/insights/${post.id}</link>
      <guid>${siteUrl}/insights/${post.id}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <category><![CDATA[${post.category}]]></category>
    </item>`;
      });
    } catch (e) {
      console.error("Error generating RSS", e);
    }
    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Oakivo Security Insights</title>
    <link>${siteUrl}/insights</link>
    <description>Authoritative research on Zero-Trust Architecture, Kubernetes Posture Management, and DevSecOps automation by Oakivo.</description>
    <language>en-us</language>
    <lastBuildDate>${(/* @__PURE__ */ new Date()).toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />${rssItems}
  </channel>
</rss>`;
    res.header("Content-Type", "application/xml");
    res.send(rssFeed);
  });
  app.get("/sitemap.xml", (req, res) => {
    const siteUrl = "https://www.oakivo.com";
    let allRoutes = [];
    try {
      const appTsxContent = import_fs.default.readFileSync(import_path.default.join(process.cwd(), "src", "App.tsx"), "utf8");
      const routeRegex = /<Route[^>]*path=["']([^"']+)["'][^>]*>/g;
      let match;
      while ((match = routeRegex.exec(appTsxContent)) !== null) {
        const routePath = match[1];
        if (!routePath.includes("*") && !routePath.includes(":")) {
          allRoutes.push(routePath);
        }
      }
    } catch (e) {
      console.error("Error generating dynamic routes from App.tsx", e);
      allRoutes = ["/", "/services", "/case-studies", "/contact", "/insights"];
    }
    allRoutes = [...new Set(allRoutes)].filter((route) => !route.includes("/admin-portal"));
    try {
      insightsData.forEach((post) => {
        allRoutes.push(`/insights/${post.id}`);
      });
    } catch (e) {
    }
    const currentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const sitemapUrls = allRoutes.map((route) => {
      let priority = "0.8";
      let changefreq = "weekly";
      if (route === "/") {
        priority = "1.0";
        changefreq = "daily";
      } else if (route.includes("/locations/") || route.includes("/solutions/")) {
        priority = "0.9";
        changefreq = "weekly";
      } else if (route === "/insights") {
        priority = "0.9";
        changefreq = "daily";
      } else if (route === "/privacy" || route === "/compliance-matrix") {
        priority = "0.5";
        changefreq = "monthly";
      }
      return `  <url>
    <loc>https://www.oakivo.com${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }).join("\n");
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>`;
    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  });
  app.get("/robots.txt", (req, res) => {
    res.header("Content-Type", "text/plain");
    res.send(`User-agent: *
Allow: /
Disallow: /admin-portal
Disallow: /api/

Sitemap: https://www.oakivo.com/sitemap.xml
`);
  });
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", secure: true });
  });
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.use((req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Secure Backend] Server running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
