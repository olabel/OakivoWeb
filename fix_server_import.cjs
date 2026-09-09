const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const importLine = `import fs from 'fs';\nimport { insightsData } from './content/insights';`;

content = content.replace("import fs from 'fs';", importLine);

fs.writeFileSync('server.ts', content);
