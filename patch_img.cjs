const fs = require('fs');
let content = fs.readFileSync('components/OptimizedImage.tsx', 'utf8');

content = content.replace('fetchPriority={fetchPriority}', 'fetchpriority={fetchPriority}');

fs.writeFileSync('components/OptimizedImage.tsx', content);
console.log("Patched OptimizedImage.tsx");
