const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Find the sitemap endpoint and inject dynamic insight pages
const targetRegex = /allRoutes = \[\.\.\.new Set\(allRoutes\)\]\.filter\(route => !route\.includes\('\/admin-portal'\)\);/g;
const replacement = `allRoutes = [...new Set(allRoutes)].filter(route => !route.includes('/admin-portal'));

    try {
      insightsData.forEach(post => {
        allRoutes.push(\`/insights/\${post.id}\`);
      });
    } catch(e) {}
`;

content = content.replace(targetRegex, replacement);

fs.writeFileSync('server.ts', content);
