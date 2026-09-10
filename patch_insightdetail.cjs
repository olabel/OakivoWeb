const fs = require('fs');
let content = fs.readFileSync('pages/InsightDetail.tsx', 'utf8');

// Change dynamic import to static
content = content.replace(
  "import { InsightPost } from '../content/insights';",
  "import { InsightPost, insightsData } from '../content/insights';"
);

content = content.replace(
  "const { insightsData } = await import('../content/insights');",
  "// static import used instead"
);

fs.writeFileSync('pages/InsightDetail.tsx', content);
