const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

if (!content.includes('import { Toaster } from "sonner";')) {
  content = content.replace(
    "import { Analytics } from './components/Analytics';",
    "import { Analytics } from './components/Analytics';\nimport { Toaster } from 'sonner';"
  );
  
  content = content.replace(
    "<AppLayout />",
    "<Toaster theme=\"dark\" position=\"bottom-right\" />\n          <AppLayout />"
  );
  
  fs.writeFileSync('App.tsx', content);
}
