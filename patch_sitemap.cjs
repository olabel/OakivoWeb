const fs = require('fs');
let serverFile = fs.readFileSync('server.ts', 'utf8');
const sitemapLogic = `
  // Dynamic XML Sitemap Generator
  app.get('/sitemap.xml', (req, res) => {
    const siteUrl = 'https://www.oakivo.com';
    const routes = [
      '/', '/services', '/capabilities', '/case-studies', '/work', '/contact', 
      '/booking', '/methodology', '/careers', '/about', '/firm', '/industries', 
      '/admin-portal', '/privacy', '/compliance-matrix', '/brand-identity', 
      '/client-portal-demo'
    ];
    
    // Simulating dynamic routes from a database or config if needed
    const dynamicRoutes = [
      '/solutions/devsecops-automation',
      '/solutions/cloud-security',
      '/solutions/zero-trust',
      '/locations/dieppe',
      '/locations/halifax',
      '/locations/st-johns'
    ];
    
    const allRoutes = [...routes, ...dynamicRoutes];
    const currentDate = new Date().toISOString().split('T')[0];
    
    const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${allRoutes.map(route => \`  <url>
    <loc>\${siteUrl}\${route}</loc>
    <lastmod>\${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>\${route === '/' ? '1.0' : '0.8'}</priority>
  </url>\`).join('\\n')}
</urlset>\`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });
`;

serverFile = serverFile.replace("// Health check", sitemapLogic + "\\n  // Health check");
fs.writeFileSync('server.ts', serverFile);
console.log("Patched server.ts with dynamic sitemap generation.");
