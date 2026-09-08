const fs = require('fs');

const files = {
  'pages/ClientPortalDemo.tsx': {
    title: 'DevSecOps Portal Demo | Oakivo Atlantic Canada',
    desc: "Experience Oakivo's DevSecOps client dashboard. View simulated cloud security compliance scores, vulnerability scans, and process automation in Atlantic Canada."
  },
  'pages/BrandShowcase.tsx': {
    title: 'Brand Identity Concepts | Cloud Security Atlantic Canada',
    desc: "Explore Oakivo Solutions' brand identity concepts, designed for Atlantic Canada enterprises seeking DevSecOps, compliance, and process automation expertise."
  },
  'pages/ComplianceMatrix.tsx': {
    title: 'Compliance Matrix & DevSecOps Glossary | Oakivo',
    desc: "Comprehensive guide to DevSecOps terminology, cloud security frameworks, process automation, and Canadian compliance laws across Atlantic Canada."
  },
  'pages/CaseStudies.tsx': {
    title: 'Cloud Security & DevSecOps Case Studies | Oakivo',
    desc: "See how Atlantic Canada businesses achieve rapid SOC 2 compliance, lock down cloud security, and streamline DevSecOps process automation with Oakivo Solutions."
  },
  'pages/Booking.tsx': {
    title: 'Cloud Security & DevSecOps Audit | Oakivo Atlantic Canada',
    desc: "Schedule a DevSecOps and Cloud Security audit with Oakivo Solutions. Expert technical consultation covering compliance and process automation for Atlantic Canada."
  },
  'pages/Careers.tsx': {
    title: 'DevSecOps & Cloud Security Careers | Oakivo Atlantic Canada',
    desc: "Join Oakivo's elite team of DevSecOps engineers and cloud security specialists building advanced compliance and process automation solutions in Atlantic Canada."
  },
  'pages/Verticals.tsx': {
    title: 'Cloud Security & DevSecOps Industries | Oakivo Atlantic Canada',
    desc: "Bespoke DevSecOps and cloud security engineered for complex regulatory compliance environments and process automation across critical Atlantic Canada industries."
  },
  'pages/Contact.tsx': {
    title: 'Contact Oakivo | DevSecOps & Cloud Security Atlantic Canada',
    desc: "Start a conversation with Oakivo Solutions. We architect secure, compliant DevSecOps pipelines and process automation for cloud security in Atlantic Canada."
  },
  'pages/Methodology.tsx': {
    title: 'DevSecOps Engineering Methodology | Oakivo Atlantic Canada',
    desc: "Explore the Oakivo DevSecOps methodology. We build zero-trust cloud security architectures and process automation pipelines for compliance in Atlantic Canada."
  },
  'pages/Privacy.tsx': {
    title: 'Privacy & Cloud Security Policy | Oakivo Atlantic Canada',
    desc: "Oakivo's commitment to data privacy, cloud security protocols, DevSecOps compliance, and secure process automation workflows across Atlantic Canada."
  },
  'pages/Home.tsx': {
    title: 'DevSecOps & Cloud Security Automation | Oakivo Atlantic Canada',
    desc: "Atlantic Canada's elite DevSecOps engineers. We implement robust cloud security, continuous compliance (SOC 2), and advanced process automation pipelines."
  },
  'pages/Services.tsx': {
    title: 'DevSecOps & Cloud Security Services | Oakivo Atlantic Canada',
    desc: "Explore Oakivo's DevSecOps pillars: Cloud Security Management, CI/CD compliance, Zero Trust IAM, and process automation incident remediation in Atlantic Canada."
  },
  'pages/About.tsx': {
    title: 'About Oakivo | DevSecOps & Cloud Security Atlantic Canada',
    desc: "Oakivo Solutions is a premier DevSecOps and cloud security firm in Atlantic Canada, defending enterprises through strict compliance and process automation."
  }
};

for (const [file, seo] of Object.entries(files)) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Regex to completely replace the line starting with title= (ignoring leading spaces)
  content = content.replace(/^\s*title=.*$/m, `        title="${seo.title}"`);
  
  // Regex to completely replace the line starting with description=
  content = content.replace(/^\s*description=.*$/m, `        description="${seo.desc}"`);
  
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
