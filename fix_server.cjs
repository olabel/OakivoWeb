const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');
content = content.replace('\\n  // Health check', '\n  // Health check');
fs.writeFileSync('server.ts', content);
