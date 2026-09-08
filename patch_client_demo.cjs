const fs = require('fs');
let content = fs.readFileSync('pages/ClientPortalDemo.tsx', 'utf8');

content = content.replace(/line\.includes/g, '(line || "").includes');

fs.writeFileSync('pages/ClientPortalDemo.tsx', content);
console.log("Patched ClientPortalDemo.tsx");
