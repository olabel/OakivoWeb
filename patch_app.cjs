const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

if (!content.includes('import Insights from')) {
  content = content.replace(
    "import ClientPortalDemo from './pages/ClientPortalDemo';",
    "import ClientPortalDemo from './pages/ClientPortalDemo';\nimport Insights from './pages/Insights';"
  );
  
  content = content.replace(
    '<Route path={NavRoute.CLIENT_DEMO} element={<ClientPortalDemo />} />',
    '<Route path={NavRoute.CLIENT_DEMO} element={<ClientPortalDemo />} />\n          <Route path="/insights" element={<Insights />} />'
  );

  fs.writeFileSync('App.tsx', content);
  console.log('Patched App.tsx for Insights');
} else {
  console.log('Insights already in App.tsx');
}
