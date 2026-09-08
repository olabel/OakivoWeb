const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// remove inline require
content = content.replace("const path = require('path');", "");
content = content.replace("import fsSync from 'fs';", "");
content = content.replace("fs.readFileSync", "fsSync.readFileSync");
content = content.replace("fsSync.readFileSync", "fs.readFileSync"); // undo previous mistake if any

// Add fs to top imports
if (!content.includes("import fs from 'fs';")) {
  content = content.replace("import path from 'path';", "import path from 'path';\nimport fs from 'fs';");
}

fs.writeFileSync('server.ts', content);
console.log("Properly fixed fs import at top level.");
