const fs = require('fs');

let content = fs.readFileSync('App.tsx', 'utf8');

const importLine = `import ComplianceSEO from './pages/ComplianceSEO';
import { LanguageProvider }`;

content = content.replace("import { LanguageProvider }", importLine);

const routeLine = `<Route path="/compliance/:slug" element={<ComplianceSEO />} />
                </Routes>`;

content = content.replace("</Routes>", routeLine);

fs.writeFileSync('App.tsx', content);
console.log("Injected route");
