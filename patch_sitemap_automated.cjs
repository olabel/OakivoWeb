const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const sitemapCode = `
  // Automated Sitemap & Robots.txt Generation
  const DOMAIN = 'https://www.oakivo.com';
  
  app.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    
    // Read the App.tsx file directly to find all <Route path="..." /> declarations
    const fs = require('fs');
    const path = require('path');
    
    let routes = [];
    try {
      const appTsxContent = fs.readFileSync(path.join(process.cwd(), 'src', 'App.tsx'), 'utf8');
      const routeRegex = /<Route[^>]*path=["']([^"']+)["'][^>]*>/g;
      let match;
      while ((match = routeRegex.exec(appTsxContent)) !== null) {
        const routePath = match[1];
        if (!routePath.includes('*') && !routePath.includes(':')) {
           routes.push(routePath);
        }
      }
      
      // Fallback in case regex missed (or just merge with NavRoutes)
      if (routes.length === 0) {
        routes = ['/', '/verticals', '/industries', '/about', '/firm', '/services', '/capabilities', '/case-studies', '/contact', '/schedule', '/perspectives', '/insights', '/methodology', '/careers', '/privacy', '/compliance-matrix', '/brand-identity', '/client-portal-demo', '/solutions/invoice-automation', '/solutions/order-inventory-sync', '/solutions/dispatch-route-logging', '/solutions/custom-report-automation', '/locations/new-brunswick', '/locations/nova-scotia', '/locations/prince-edward-island', '/locations/newfoundland-labrador'];
      }
    } catch (e) {
      console.error("Error generating dynamic routes from App.tsx", e);
      routes = ['/'];
    }

    // Deduplicate
    routes = [...new Set(routes)];

    const today = new Date().toISOString().split('T')[0];

    const xmlUrls = routes.map(route => {
      let priority = '0.8';
      let changefreq = 'weekly';
      
      if (route === '/') {
        priority = '1.0';
        changefreq = 'daily';
      } else if (route.includes('/locations/') || route.includes('/solutions/')) {
        priority = '0.9';
        changefreq = 'weekly';
      } else if (route === '/insights') {
        priority = '0.9';
        changefreq = 'daily';
      } else if (route === '/privacy' || route === '/compliance-matrix') {
        priority = '0.5';
        changefreq = 'monthly';
      }

      // Skip admin portal
      if (route.includes('/admin-portal')) return '';

      return \`
  <url>
    <loc>\${DOMAIN}\${route}</loc>
    <lastmod>\${today}</lastmod>
    <changefreq>\${changefreq}</changefreq>
    <priority>\${priority}</priority>
  </url>\`;
    }).join('');

    const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${xmlUrls}
</urlset>\`;

    res.send(sitemap);
  });

  app.get('/robots.txt', (req, res) => {
    res.header('Content-Type', 'text/plain');
    res.send(\`User-agent: *
Allow: /
Disallow: /admin-portal
Disallow: /api/

Sitemap: \${DOMAIN}/sitemap.xml
\`);
  });
`;

// Replace the previous manual sitemapCode with this one
const startIdx = content.indexOf('// Automated Sitemap & Robots.txt Generation');
const endIdx = content.indexOf('  app.post(\'/api/contact\'');

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + sitemapCode + content.substring(endIdx);
  fs.writeFileSync('server.ts', content);
  console.log("Dynamically automated sitemap from App.tsx added");
} else {
  console.log("Couldn't find indices", startIdx, endIdx);
}
