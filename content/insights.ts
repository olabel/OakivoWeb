export interface InsightPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
}

export const insightsData: InsightPost[] = [
  {
    id: "zero-trust-architecture-2026",
    title: "Zero-Trust Architecture: Beyond the Buzzword in 2026",
    excerpt: "A deep dive into how DevSecOps engineers are practically implementing Zero-Trust across containerized workloads and hybrid clouds.",
    content: "Zero-Trust is no longer a theoretical framework; it's a mandatory architecture for modern cloud operations. \n\n### 1. Identity as the New Perimeter\nIn a cloud-native world, IP addresses are ephemeral. We must shift our security perimeter from the network layer to the identity layer. Service meshes like Istio enforce mutual TLS (mTLS) between microservices, ensuring that every request is authenticated and authorized, regardless of its network origin.\n\n### 2. Continuous Verification\nTrust is never granted permanently. By integrating continuous context-aware access policies (using tools like BeyondCorp or Azure AD Conditional Access), we evaluate device health, geographic location, and behavioral anomalies for every single session.\n\n### 3. Least Privilege at the Container Level\nUsing Kubernetes RBAC and NetworkPolicies, we can restrict pod-to-pod communication. Implementing Seccomp profiles and AppArmor ensures that even if a container is compromised, the blast radius is severely limited.\n\nImplementing Zero-Trust requires a cultural shift in engineering, prioritizing security at the speed of deployment.",
    date: "2026-09-01",
    author: "Oakivo Research Team",
    category: "Cloud Security"
  },
  {
    id: "soc2-compliance-automation",
    title: "Automating SOC 2 Compliance in CI/CD Pipelines",
    excerpt: "How to stop treating compliance as an annual audit and start treating it as continuous code integration.",
    content: "For SaaS companies, achieving SOC 2 Type II compliance is often seen as a bottleneck. However, by leveraging DevSecOps automation, compliance becomes a byproduct of good engineering practices.\n\n### Infrastructure as Code (IaC) Scanning\nTools like Checkov or Terraform Cloud automatically scan IaC templates against SOC 2 controls. If a developer attempts to provision an S3 bucket without encryption, the CI pipeline fails immediately.\n\n### Evidence Collection via APIs\nGone are the days of taking screenshots for auditors. We build integrations that automatically query AWS Config, GitHub PR reviews, and Okta logs, generating real-time compliance dashboards. This continuous evidence collection reduces audit fatigue and ensures your security posture never drifts.\n\n### Vulnerability Management\nIntegrating Trivy or Snyk into the GitHub Actions pipeline ensures that no critical vulnerabilities are merged into the main branch, fulfilling the SOC 2 requirement for risk mitigation and continuous monitoring.",
    date: "2026-08-15",
    author: "Oakivo Compliance Team",
    category: "Compliance & DevSecOps"
  },
  {
    id: "pipeda-data-residency-aws",
    title: "Navigating PIPEDA Data Residency on AWS",
    excerpt: "A guide for Atlantic Canadian enterprises on structuring AWS architectures to meet strict Canadian data residency laws.",
    content: "Under the Personal Information Protection and Electronic Documents Act (PIPEDA), Canadian businesses must ensure adequate protection of personal data. When leveraging public clouds like AWS, data residency and sovereignty become critical architectural decisions.\n\n### Enforcing the Canada (Central) Region\nTo guarantee data does not leave Canadian borders, engineers must implement AWS Organizations Service Control Policies (SCPs). An SCP can explicitly deny any `ec2:*`, `s3:*`, or `rds:*` actions outside of the `ca-central-1` (Montreal) or `ca-west-1` (Calgary) regions.\n\n### KMS and Key Sovereignty\nData residency is not just about where the data rests, but who holds the keys. Using AWS Key Management Service (KMS) with Customer Managed Keys (CMKs) ensures that you retain cryptographic control over your data. For maximum sovereignty, some enterprises opt for CloudHSM to maintain single-tenant hardware security modules.\n\n### Cross-Region Replication Risks\nWhile designing for high availability, engineers must ensure that S3 Cross-Region Replication (CRR) or RDS Read Replicas do not inadvertently sync data to US-based regions. Architectural reviews must validate that disaster recovery zones remain strictly within Canadian territory.",
    date: "2026-07-22",
    author: "Oakivo Cloud Architects",
    category: "Architecture & Law"
  }
];
