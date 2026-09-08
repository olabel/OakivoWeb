const fs = require('fs');

// Fix LeadDrawer
let leadContent = fs.readFileSync('components/LeadDrawer.tsx', 'utf8');
leadContent = leadContent.replace(/setErrors\({ \.\.\.errors, submit: /g, 'setErrors({ ...errors, bottleneck: ');
fs.writeFileSync('components/LeadDrawer.tsx', leadContent);

// Fix OptimizedImage
let optContent = fs.readFileSync('components/OptimizedImage.tsx', 'utf8');
optContent = optContent.replace(/fetchpriority=/g, 'fetchPriority=');
fs.writeFileSync('components/OptimizedImage.tsx', optContent);

// Fix SEO
let seoContent = fs.readFileSync('components/SEO.tsx', 'utf8');
seoContent = seoContent.replace(/hreflang=/g, 'hrefLang=');
fs.writeFileSync('components/SEO.tsx', seoContent);

console.log("Fixed lint errors");
