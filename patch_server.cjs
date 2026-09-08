const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

if (!content.includes('import helmet')) {
  content = content.replace('import express from "express";', 'import express from "express";\nimport helmet from "helmet";');
  
  // Add app.use(helmet()) right after const app = express();
  content = content.replace('const app = express();', 'const app = express();\n\n  // Security Headers\n  app.use(helmet({\n    contentSecurityPolicy: false, // Vite requires inline scripts in dev\n  }));');
  
  fs.writeFileSync('server.ts', content);
  console.log('Patched server.ts with helmet');
} else {
  console.log('helmet already present');
}
