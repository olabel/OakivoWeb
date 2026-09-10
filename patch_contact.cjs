const fs = require('fs');
let content = fs.readFileSync('pages/Contact.tsx', 'utf8');
content = content.replace(/506899491/g, '5068994941');
content = content.replace(/506-899-0491/g, '506-899-4941');
fs.writeFileSync('pages/Contact.tsx', content);
