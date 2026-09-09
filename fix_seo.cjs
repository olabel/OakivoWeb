const fs = require('fs');
let content = fs.readFileSync('pages/ComplianceSEO.tsx', 'utf8');

content = content.replace(/\\\`/g, '`');
content = content.replace(/\\\$/g, '$');

fs.writeFileSync('pages/ComplianceSEO.tsx', content);
