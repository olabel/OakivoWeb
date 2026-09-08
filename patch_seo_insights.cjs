const fs = require('fs');
let content = fs.readFileSync('pages/Insights.tsx', 'utf8');

const newSeo = `
      <SEO 
        title="Engineering Research & Insights | Oakivo Solutions"
        description="Authoritative research on Zero-Trust Architecture, Kubernetes Posture Management, and DevSecOps automation by Oakivo's cloud security architects."
        canonical="/insights"
        schema={blogSchema}
      />
`;

content = content.replace(
  /<SEO \s*title="Security Insights & Research \| Oakivo Solutions"\s*description="Deep-dive articles on Zero-Trust, DevSecOps automation, and Canadian data residency compliance \(PIPEDA, SOC 2\) by Oakivo engineers."\s*canonical="\/insights"\s*schema=\{blogSchema\}\s*\/>/g,
  newSeo
);

fs.writeFileSync('pages/Insights.tsx', content);
console.log("Insights SEO patched.");
