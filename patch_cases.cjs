const fs = require('fs');
let content = fs.readFileSync('components/CaseStudiesShowcase.tsx', 'utf8');

// 1. Add image to interface
content = content.replace('keyAchievements: string[];', 'keyAchievements: string[];\n  image: string;\n  imageAlt: string;');

// 2. Add images to the case studies data
content = content.replace("id: 'atlantic-manufacturing',", "id: 'atlantic-manufacturing',\n      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',\n      imageAlt: 'DevSecOps process automation in Atlantic Canada manufacturing facility',");

content = content.replace("id: 'fintrust-compliance',", "id: 'fintrust-compliance',\n      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80',\n      imageAlt: 'Cloud Security and compliance monitoring dashboard for FinTrust in Atlantic Canada',");

content = content.replace("id: 'maritime-logistics',", "id: 'maritime-logistics',\n      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80',\n      imageAlt: 'Maritime logistics process automation and Cloud Security infrastructure in Halifax',");

// Import OptimizedImage
if (!content.includes('OptimizedImage')) {
  content = content.replace("import LeadDrawer from './LeadDrawer';", "import LeadDrawer from './LeadDrawer';\nimport OptimizedImage from './OptimizedImage';");
}

fs.writeFileSync('components/CaseStudiesShowcase.tsx', content);
console.log("Patched CaseStudiesShowcase.tsx with images.");
