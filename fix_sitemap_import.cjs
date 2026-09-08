const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// replace the inline requires
content = content.replace("const path = require('path');", "import fsSync from 'fs';");
content = content.replace("fs.readFileSync", "fsSync.readFileSync");

fs.writeFileSync('server.ts', content);
console.log("Fixed require in ESM context.");
