const fs = require('fs');
let content = fs.readFileSync('pages/Home.tsx', 'utf8');

const newSchema = `
  const localServiceSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "DevSecOps & Cloud Security",
      "provider": {
        "@type": "Organization",
        "name": "Oakivo Solutions"
      },
      "areaServed": {
        "@type": "City",
        "name": "Halifax",
        "containedInPlace": {
          "@type": "State",
          "name": "Nova Scotia"
        }
      },
      "description": "Premium DevSecOps, cloud security posture management, and compliance automation for enterprises in Halifax, NS."
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "DevSecOps & Cloud Security",
      "provider": {
        "@type": "Organization",
        "name": "Oakivo Solutions"
      },
      "areaServed": {
        "@type": "City",
        "name": "Moncton",
        "containedInPlace": {
          "@type": "State",
          "name": "New Brunswick"
        }
      },
      "description": "Expert Zero-Trust architecture and secure CI/CD pipeline implementation in Moncton, NB."
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "DevSecOps & Cloud Security",
      "provider": {
        "@type": "Organization",
        "name": "Oakivo Solutions"
      },
      "areaServed": {
        "@type": "City",
        "name": "St. John's",
        "containedInPlace": {
          "@type": "State",
          "name": "Newfoundland and Labrador"
        }
      },
      "description": "SOC 2 and ISO 27001 compliance readiness and security audits for St. John's, NL."
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "DevSecOps & Cloud Security",
      "provider": {
        "@type": "Organization",
        "name": "Oakivo Solutions"
      },
      "areaServed": {
        "@type": "City",
        "name": "Fredericton",
        "containedInPlace": {
          "@type": "State",
          "name": "New Brunswick"
        }
      },
      "description": "Advanced DevSecOps automation and security process optimization in Fredericton, NB."
    }
  ];
`;

if (!content.includes('localServiceSchema')) {
  // Replace standard SEO call
  content = content.replace(
    /const faqSchema = {[\s\S]*?\}    \]  \};/,
    (match) => match + '\n' + newSchema
  );

  content = content.replace(
    '<SEO \n        title="Oakivo Solutions | DevSecOps & Process Automation in Atlantic Canada"\n        description="Atlantic Canada\'s elite DevSecOps engineers. We implement robust cloud security, continuous compliance (SOC 2), and advanced process automation pipelines."\n        canonical="/"\n        schema={faqSchema}\n      />',
    '<SEO \n        title="Oakivo Solutions | DevSecOps & Process Automation in Atlantic Canada"\n        description="Atlantic Canada\'s elite DevSecOps engineers. We implement robust cloud security, continuous compliance (SOC 2), and advanced process automation pipelines."\n        canonical="/"\n        schema={[faqSchema, ...localServiceSchema]}\n      />'
  );

  fs.writeFileSync('pages/Home.tsx', content);
  console.log('Patched Home.tsx SEO with local service schema');
}
