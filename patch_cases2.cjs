const fs = require('fs');
let content = fs.readFileSync('components/CaseStudiesShowcase.tsx', 'utf8');

content = content.replace("id: 'global-logistics-ai',", "id: 'global-logistics-ai',\n      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80',\n      imageAlt: 'Maritime logistics process automation and Cloud Security infrastructure in Halifax',");

fs.writeFileSync('components/CaseStudiesShowcase.tsx', content);
console.log("Patched CaseStudiesShowcase.tsx");
